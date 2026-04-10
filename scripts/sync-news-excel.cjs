const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const sheetBaseUrl = 'https://docs.google.com/spreadsheets/d/1RN00ODnuj6F7hlGtvgIIN0d9_1u2UsoTwHQ2KkkKxa0/export?format=csv';
const gids = {
    ai_news: '0',
    news: '148983926'
};

/**
 * Transforms a Google Drive view link into a direct thumbnail URL
 * Supports /d/FILE_ID and id=FILE_ID formats
 */
function transformGDriveUrl(url) {
    if (!url || typeof url !== 'string') return url;
    
    // If it's already a direct lh3 or thumbnail URL, return it
    if (url.includes('googleusercontent.com') || url.includes('drive.google.com/thumbnail')) {
        return url;
    }

    // Try to extract ID from /d/ID or id=ID
    const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || 
                  url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    
    if (idMatch && idMatch[1]) {
        // Return public thumbnail endpoint with decent width
        return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
    }
    
    return url;
}

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
        const oldAiNews = json.ai_news?.items_list || [];
        json.ai_news.items_list = aiNewsItems.map(item => {
            const rawLink = item.link_url || item.link || "";
            let title = item[`title_${lang}`];
            let description = item[`description_${lang}`];
            const fallbackTitle = item.title_en || item.title || "";
            const fallbackDesc = item.description_en || item.description || "";

            // Check if there is an existing local translation that we shouldn't overwrite
            if (lang !== 'en' && (!title || !description)) {
                const existing = oldAiNews.find(i => (i.link && i.link === rawLink) || (i.title && i.title === fallbackTitle && fallbackTitle !== ""));
                if (existing) {
                    if (!title && existing.title && existing.title !== fallbackTitle) title = existing.title;
                    if (!description && existing.description && existing.description !== fallbackDesc) description = existing.description;
                }
            }

            title = title || fallbackTitle;
            description = description || fallbackDesc;

            const rawImage = item.image_url || item.image || "";
            
            const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url.split('?')[0]);
            
            let finalImage = transformGDriveUrl(rawImage);
            if (!finalImage && isImage(rawLink)) finalImage = transformGDriveUrl(rawLink);

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
        const oldNews = json.news?.items_list || [];
        json.news.items_list = projectEventsItems.map(item => {
            const rawLink = item.link_url || item.link || "";
            let title = item[`title_${lang}`];
            let description = item[`description_${lang}`];
            const fallbackTitle = item.title_en || item.title || "";
            const fallbackDesc = item.description_en || item.description || "";

            // Check if there is an existing local translation that we shouldn't overwrite
            if (lang !== 'en' && (!title || !description)) {
                const existing = oldNews.find(i => (i.link && i.link === rawLink) || (i.title && i.title === fallbackTitle && fallbackTitle !== ""));
                if (existing) {
                    if (!title && existing.title && existing.title !== fallbackTitle) title = existing.title;
                    if (!description && existing.description && existing.description !== fallbackDesc) description = existing.description;
                }
            }

            title = title || fallbackTitle;
            description = description || fallbackDesc;

            const rawImage = item.image_url || item.image || "";
            
            const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url.split('?')[0]);
            
            let finalImage = transformGDriveUrl(rawImage);
            if (!finalImage && isImage(rawLink)) finalImage = transformGDriveUrl(rawLink);

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
