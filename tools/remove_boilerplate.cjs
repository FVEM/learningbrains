const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

const boilerplatePatterns = [
    /Learning Brains – Integrated On the-job/i,
    /Learning Systems for Industrial Reskilling/i,
    /Erasmus\+ Program 2025-1-ES01-KA220-VET-000351934/i,
    /This project has been funded with support from the European Commission.*?contained therein\./i,
    /\[Link\]/i,
    /website article/i,
    /^date:.*$/im,
    /^topic:.*$/im,
    /^link\s*$/im
];

locales.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        let changed = false;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        ['ai_news', 'news'].forEach(section => {
            if (data[section] && Array.isArray(data[section].items_list)) {
                data[section].items_list.forEach(item => {
                    if (item.type === 'ARTICLE' && item.content) {
                        let lines = item.content.split(/\r?\n/);
                        let startIdx = 0;
                        const normalizedTitle = (item._source_title || item.title || '').toLowerCase().trim();

                        for (let i = 0; i < lines.length; i++) {
                            const line = lines[i].trim();
                            if (!line) continue;

                            const isMeta = boilerplatePatterns.some(p => p.test(line));
                            const isTitle = normalizedTitle && line.toLowerCase() === normalizedTitle;

                            if (isMeta || isTitle) continue;

                            startIdx = i;
                            break;
                        }

                        const newContent = lines.slice(startIdx).join('\n').trim();
                        if (newContent !== item.content) {
                            item.content = newContent;
                            changed = true;
                        }
                    }
                });
            }
        });

        if (changed) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Cleaned boilerplate in ${lang}.json`);
        }
    }
});
