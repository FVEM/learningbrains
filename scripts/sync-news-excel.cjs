const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const excelCsvUrl = 'https://docs.google.com/spreadsheets/d/1RN00ODnuj6F7hlGtvgIIN0d9_1u2UsoTwHQ2KkkKxa0/export?format=csv&gid=0';

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

async function sync() {
    console.log("Fetching latest news from Google Sheet...");
    const response = await fetch(excelCsvUrl);
    const text = await response.text();
    
    const items = parseCSV(text);
    console.log(`Found ${items.length} news items.`);

    for (const lang of locales) {
        const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        json.ai_news.items_list = items.map(item => {
            return {
                title: item.title_en || item.title || "",
                description: item.description_en || item.description || "",
                link: item.link_url || item.link || "",
                category: item.category || "",
                date: item.date || "",
                image: item.image_url || item.image || "",
                badge: item.badge_text || item.badge || ""
            };
        });

        fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
        console.log(`Updated ${lang}.json`);
    }
}

sync().catch(console.error);
