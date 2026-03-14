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
    const headers = [];
    
    // Simple CSV parser that handles quotes and commas
    lines.forEach((line, index) => {
        if (!line.trim()) return;
        
        const matches = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if (!matches) return;
        
        const cleanCols = matches.map(col => col.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
        
        if (index === 0) {
            headers.push(...cleanCols);
        } else {
            const obj = {};
            headers.forEach((header, i) => {
                obj[header.toLowerCase()] = cleanCols[i] || "";
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
        
        // Simple comparison: check item count and titles of the first items
        const currentAiCount = enJson.ai_news.items_list.length;
        const currentProjectCount = enJson.news.items_list.length;
        
        const newAiTitles = aiNewsItems.map(i => i.title_en || i.title).join('|');
        const oldAiTitles = enJson.ai_news.items_list.map(i => i.title).join('|');
        
        const newProjectTitles = projectEventsItems.map(i => i.title_en || i.title).join('|');
        const oldProjectTitles = enJson.news.items_list.map(i => i.title).join('|');

        if (newAiTitles === oldAiTitles && newProjectTitles === oldProjectTitles) {
            console.log("✅ Content is already synchronized. No changes detected between Google Sheet and Web.");
            return; 
        } else {
            console.log("🔄 Changes detected! Updating local files...");
            console.log(`- AI News: ${currentAiCount} -> ${aiNewsItems.length} items`);
            console.log(`- Project Events: ${currentProjectCount} -> ${projectEventsItems.length} items`);
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
            return {
                title,
                description,
                link: item.link_url || item.link || "",
                category: item.category || "",
                date: item.date || "",
                image: item.image_url || item.image || "",
                badge: item.badge_text || item.badge || ""
            };
        }).filter(item => item.title.trim() !== "");

        // Sync Project News
        json.news.items_list = projectEventsItems.map(item => {
            const title = item[`title_${lang}`] || item.title_en || item.title || "";
            const description = item[`description_${lang}`] || item.description_en || item.description || "";
            return {
                title,
                category: item.category || "",
                description,
                link: item.link_url || item.link || ""
            };
        }).filter(item => item.title.trim() !== "");

        fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
        console.log(`Successfully updated ${lang}.json`);
    }
}

sync().catch(console.error);
