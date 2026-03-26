const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

locales.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.ai_news && Array.isArray(data.ai_news.items_list)) {
            // Filter out items that have link === "#"
            const originalLength = data.ai_news.items_list.length;
            data.ai_news.items_list = data.ai_news.items_list.filter(item => item.link !== "#");

            if (data.ai_news.items_list.length !== originalLength) {
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                console.log(`Cleaned up ${lang}.json (removed ${originalLength - data.ai_news.items_list.length} dummy items)`);
            } else {
                console.log(`No dummy items found in ${lang}.json`);
            }
        }
    }
});
