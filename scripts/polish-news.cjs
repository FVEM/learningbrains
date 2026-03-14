const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

locales.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    json.ai_news.items_list = json.ai_news.items_list.map(item => {
        if (item.title.includes("SPRI") || item.image === "Research") {
            return {
                ...item,
                image: "/images/news/spri_ai_2026.png",
                badge: item.badge || item.category || "GENERAL/EU"
            };
        }
        return item;
    });

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log(`Final polish for ${lang}.json`);
});
