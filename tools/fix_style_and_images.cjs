const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

// Helper to fix Google Drive links to be more robust
function fixImageUrl(url) {
    if (url && url.includes('drive.google.com/thumbnail')) {
        const match = url.match(/id=([^&]+)/);
        if (match && match[1]) {
            // Using lh3.googleusercontent.com/d/ID which is more reliable for embedding
            return `https://lh3.googleusercontent.com/d/${match[1]}`;
        }
    }
    return url;
}

locales.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) return;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    // Process both news sections
    ['ai_news', 'news'].forEach(section => {
        if (data[section] && Array.isArray(data[section].items_list)) {
            data[section].items_list.forEach(item => {
                // 1. Fix Image URLs
                if (item.image) {
                    const newUrl = fixImageUrl(item.image);
                    if (newUrl !== item.image) {
                        item.image = newUrl;
                        changed = true;
                    }
                }

                // 2. Fix Paragraphs for the translated articles (only if it's not English)
                // We look for common patterns to split merged paragraphs back into separate ones
                if (lang !== 'en' && item.type === 'ARTICLE' && item.content) {
                    const originalContent = item.content;
                    
                    // The AI often merged paragraphs separated by a single newline into one, 
                    // or put them on the same line. 
                    // We'll replace the common double-newline with single newline to match English style
                    // and ensure there are no double spaces causing "espacios entre puntos".
                    let newContent = item.content
                        .replace(/\n\n/g, '\n') // Standardize to single newline like English
                        .replace(/ {2,}/g, ' ') // Remove double spaces
                        .trim();

                    // Specific fix for the Bilbao article which we know is merged 2-by-2
                    if (newContent.includes('Bilbao')) {
                        // Attempt to split where the English version has splits
                        // Example: splitting after specific sentences that we know end a paragraph
                        const splits = {
                            'es': [
                                'S.L.', 
                                'transnacional.', 
                                'reales.', 
                                'industrial.'
                            ],
                            'it': [
                                'S.L..', 
                                'transnazionale.', 
                                'reali.', 
                                'industriale.'
                            ],
                            'de': [
                                'S.L..', 
                                'Zusammenarbeit.', 
                                'Arbeitsumgebungen.', 
                                'Industriekontexte.'
                            ]
                        };

                        if (splits[lang]) {
                            splits[lang].forEach(sentenceEnd => {
                                const regex = new RegExp(sentenceEnd.replace('.', '\\.') + ' ', 'g');
                                if (newContent.match(regex)) {
                                    newContent = newContent.replace(regex, sentenceEnd + '\n');
                                    changed = true;
                                }
                            });
                        }
                    }

                    if (newContent !== originalContent) {
                        item.content = newContent;
                        changed = true;
                    }
                }
            });
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Fixed images and styling in ${lang}.json`);
    }
});
