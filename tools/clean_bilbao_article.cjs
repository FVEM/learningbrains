const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

// The actual starting text of the third article in each language
const startTexts = {
    'en': 'The city of Bilbao recently',
    'es': 'Recientemente, la ciudad de Bilbao',
    'de': 'Die Stadt Bilbao war kürzlich',
    'it': 'La città di Bilbao ha recentemente',
    'pt': 'A cidade de Bilbao recentemente',
    'sk': 'Mesto Bilbao nedávno hostilo'
};

locales.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        let changed = false;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        ['ai_news', 'news'].forEach(section => {
            if (data[section] && Array.isArray(data[section].items_list)) {
                data[section].items_list.forEach(item => {
                    if (item.type === 'ARTICLE' && item.content) {
                        const startText = startTexts[lang];
                        if (startText && item.content.includes(startText)) {
                            // Find where the actual content starts
                            const idx = item.content.indexOf(startText);
                            if (idx > 0) { // meaning there is boilerplate before it
                                item.content = item.content.substring(idx);
                                changed = true;
                            }
                        }
                    }
                });
            }
        });

        if (changed) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Cleaned boilerplate for Bilbao article in ${lang}.json`);
        }
    }
});
