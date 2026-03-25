const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const sheetBaseUrl = 'https://docs.google.com/spreadsheets/d/1RN00ODnuj6F7hlGtvgIIN0d9_1u2UsoTwHQ2KkkKxa0/export?format=csv';
const gids = {
    ai_news: '0',
    news: '148983926'
};

function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    const result = [];
    let headers = [];
    
    lines.forEach((line, index) => {
        if (!line.trim() && index !== 0) return;
        
        const row = [];
        let inQuotes = false;
        let currentValue = "";
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    currentValue += '"'; // Handle escaped quotes
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(currentValue.trim());
                currentValue = "";
            } else {
                currentValue += char;
            }
        }
        row.push(currentValue.trim());
        
        const cleanCols = row.map(col => col.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
        
        if (index === 0) {
            headers = cleanCols.map(h => h.toLowerCase());
        } else if (cleanCols.length > 1 || cleanCols[0] !== "") {
            const obj = {};
            headers.forEach((header, i) => {
                obj[header] = cleanCols[i] || "";
            });
            result.push(obj);
        }
    });
    return result;
}

async function fetchSheetData(gid) {
    const url = `${sheetBaseUrl}&gid=${gid}`;
    const response = await fetch(url);
    const text = await response.text();
    return parseCSV(text);
}

async function sync() {
    console.log("Checking for updates in Google Sheet...");
    
    const aiNewsItems = await fetchSheetData(gids.ai_news);
    const projectEventsItems = await fetchSheetData(gids.news);

    // Read current English data for comparison
    const enPath = path.join(__dirname, '..', 'src', 'locales', 'en.json');
    let hasChanges = false;
    
    if (fs.existsSync(enPath)) {
        const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
        
        // Helper to generate a simplified list for comparison
        const getAiCompareList = (items) => items.map(item => ({
            title: item.title_en || item.title || "",
            description: item.description_en || item.description || "",
            link: item.link_url || item.link || "",
            date: item.date || "",
            badge: item.badge_text || item.badge || ""
        })).filter(i => i.title.trim() !== "");

        const getProjectCompareList = (items) => items.map(item => ({
            title: item.title_en || item.title || "",
            description: item.description_en || item.description || "",
            link: item.link_url || item.link || "",
            date: item.date || "",
            image: item.image_url || item.image || "",
            badge: item.badge_text || item.badge || ""
        })).filter(i => i.title.trim() !== "");

        const newAiList = getAiCompareList(aiNewsItems);
        const oldAiList = enJson.ai_news.items_list.map(i => ({
            title: i.title,
            description: i.description,
            link: i.link,
            date: i.date || "",
            image: i.image || "",
            badge: i.badge || ""
        }));

        const newProjectList = getProjectCompareList(projectEventsItems);
        const oldProjectList = enJson.news.items_list.map(i => ({
            title: i.title,
            description: i.description,
            link: i.link,
            date: i.date || "",
            image: i.image || "",
            badge: i.badge || ""
        }));

        if (JSON.stringify(newAiList) === JSON.stringify(oldAiList) && 
            JSON.stringify(newProjectList) === JSON.stringify(oldProjectList)) {
            console.log("✅ Content is already synchronized. No changes detected between Google Sheet and Web.");
            return; 
        } else {
            console.log("🔄 Changes detected in Sheet content! Updating local files...");
            hasChanges = true;
        }
    } else {
        console.log("First time sync, generating locale files...");
        hasChanges = true;
    }

    if (!hasChanges) return;

    for (const lang of locales) {
        const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
        // ... (rest of the logic remains same but I'll provide full function for clarity)
        if (!fs.existsSync(filePath)) continue;
        
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Sync AI News
        json.ai_news.items_list = aiNewsItems.map(item => {
            const title = item[`title_${lang}`] || item.title_en || item.title || "";
            const description = item[`description_${lang}`] || item.description_en || item.description || "";
            const rawLink = item.link_url || item.link || "";
            const rawImage = item.image_url || item.image || "";
            
            const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url.split('?')[0]);
            
            let finalImage = rawImage;
            if (!finalImage && isImage(rawLink)) finalImage = rawLink;

            const transformGDriveUrl = (url) => {
                if (!url) return url;
                const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
                }
                return url;
            };

            finalImage = transformGDriveUrl(finalImage);

            // Ensure local paths have leading slash
            if (finalImage && !finalImage.startsWith('http') && !finalImage.startsWith('/')) {
                finalImage = '/' + finalImage;
            }

            return {
                title,
                description,
                link: rawLink,
                category: item.category || "",
                date: item.date || "",
                image: finalImage,
                badge: item.badge_text || item.badge || ""
            };
        }).filter(item => item.title.trim() !== "");

        // Sync Project News
        json.news.items_list = projectEventsItems.map(item => {
            const title = item[`title_${lang}`] || item.title_en || item.title || "";
            const description = item[`description_${lang}`] || item.description_en || item.description || "";
            const rawLink = item.link_url || item.link || "";
            const rawImage = item.image_url || item.image || "";
            
            const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url.split('?')[0]);
            
            let finalImage = rawImage;
            if (!finalImage && isImage(rawLink)) finalImage = rawLink;

            const transformGDriveUrl = (url) => {
                if (!url) return url;
                const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
                }
                return url;
            };

            finalImage = transformGDriveUrl(finalImage);

            // Ensure local paths have leading slash
            if (finalImage && !finalImage.startsWith('http') && !finalImage.startsWith('/')) {
                finalImage = '/' + finalImage;
            }

            return {
                title,
                category: item.category || "",
                description,
                link: rawLink,
                date: item.date || "",
                image: finalImage,
                badge: item.badge_text || item.badge || ""
            };
        }).filter(item => item.title.trim() !== "");

        fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
        console.log(`Successfully updated ${lang}.json`);
    }
}

sync().catch(console.error);
