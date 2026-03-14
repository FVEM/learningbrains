const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['es', 'de', 'it', 'pt', 'sk'];

// Manually read .env file since npm install is restricted
function getApiKey() {
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) return null;
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/VITE_OPENAI_API_KEY=(.+)/);
    return match ? match[1].trim() : null;
}

const OPENAI_API_KEY = getApiKey();

const langNames = {
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'sk': 'Slovak'
};

async function translateText(text, targetLang) {
    if (!text || text.trim() === "") return "";
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a professional translator for an Erasmus+ project called "Learning Brains" about AI in vocational education and industrial reskilling. Translate the following text into ${langNames[targetLang]}. Keep the professional and technical tone. Return ONLY the translated text.`
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                temperature: 0.3
            })
        });

        const data = await response.json();
        if (data.error) {
            console.error(`OpenAI Error: ${data.error.message}`);
            return text;
        }
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error(`Translation error for ${targetLang}:`, error);
        return text;
    }
}

async function translateLocales() {
    // Read English as source
    const enPath = path.join(localesDir, 'en.json');
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    for (const lang of locales) {
        const langPath = path.join(localesDir, `${lang}.json`);
        let langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

        console.log(`Checking translations for ${lang}...`);
        let updated = false;

        // Process AI News
        if (enData.ai_news && enData.ai_news.items_list) {
            for (let i = 0; i < enData.ai_news.items_list.length; i++) {
                const enItem = enData.ai_news.items_list[i];
                const langItem = langData.ai_news.items_list[i];

                // If the item doesn't exist or is different (based on title/desc similarity or presence)
                // We check if the translation matches the English version, if so, it needs translation
                if (!langItem || langItem.title === enItem.title || langItem.description === enItem.description) {
                    console.log(`Translating AI News item: ${enItem.title} -> ${lang}`);
                    const translatedTitle = await translateText(enItem.title, lang);
                    const translatedDesc = await translateText(enItem.description, lang);
                    
                    if (!langData.ai_news.items_list[i]) {
                        langData.ai_news.items_list[i] = { ...enItem };
                    }
                    
                    langData.ai_news.items_list[i].title = translatedTitle;
                    langData.ai_news.items_list[i].description = translatedDesc;
                    updated = true;
                }
            }
        }

        // Process Project Events (news)
        if (enData.news && enData.news.items_list) {
            for (let i = 0; i < enData.news.items_list.length; i++) {
                const enItem = enData.news.items_list[i];
                const langItem = langData.news.items_list[i];

                if (!langItem || langItem.title === enItem.title || langItem.description === enItem.description) {
                    console.log(`Translating Project Event: ${enItem.title} -> ${lang}`);
                    const translatedTitle = await translateText(enItem.title, lang);
                    const translatedDesc = await translateText(enItem.description, lang);

                    if (!langData.news.items_list[i]) {
                        langData.news.items_list[i] = { ...enItem };
                    }

                    langData.news.items_list[i].title = translatedTitle;
                    langData.news.items_list[i].description = translatedDesc;
                    updated = true;
                }
            }
        }

        if (updated) {
            fs.writeFileSync(langPath, JSON.stringify(langData, null, 2));
            console.log(`Saved translations for ${lang}`);
        } else {
            console.log(`No updates needed for ${lang}`);
        }
    }
}

translateLocales().catch(console.error);
