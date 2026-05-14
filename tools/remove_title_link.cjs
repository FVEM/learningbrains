const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

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
                        
                        // Let's aggressively strip the first few lines if they are just the title or [Link] or empty
                        for (let i = 0; i < lines.length; i++) {
                            const line = lines[i].trim();
                            if (!line) {
                                startIdx = i + 1;
                                continue;
                            }
                            if (line === '[Link]') {
                                startIdx = i + 1;
                                continue;
                            }
                            
                            // Check if this line is substantially similar to the title
                            const title = (item._source_title || item.title || '').replace(/[\.\s]*$/, '').toLowerCase();
                            const current = line.replace(/[\.\s]*$/, '').toLowerCase();
                            
                            if (title && current === title) {
                                startIdx = i + 1;
                                continue;
                            }
                            
                            break;
                        }

                        if (startIdx > 0) {
                            const newContent = lines.slice(startIdx).join('\n').trim();
                            if (newContent !== item.content) {
                                item.content = newContent;
                                changed = true;
                            }
                        }
                    }
                });
            }
        });

        if (changed) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Cleaned title/link from top of ${lang}.json`);
        }
    }
});
