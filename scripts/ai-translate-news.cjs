const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

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
    'en': 'English',
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'sk': 'Slovak'
};

async function translateText(text, targetLang, customPrompt = null) {
    if (!text || text.trim() === "") return "";
    
    const systemPrompt = customPrompt || `You are a professional editorial translator for an Erasmus+ project called "Learning Brains" (AI in vocational education and industrial reskilling).
                        Your task is to ensure the text in ${langNames[targetLang]} feels like a premium journal article:
                        - If the source is already in ${langNames[targetLang]}, return it exactly as is.
                        - Identify 1-2 key insightful sentences and wrap them in double quotes (e.g., "AI is the future of learning.") in a separate paragraph to create a Pull Quote.
                        - Format all section subheadings in ALL CAPS (e.g., KEY BENEFITS) on their own line.
                        - Use **bold text** for important technical terms or key concepts.
                        - Enhance reading rhythm using bullet points (- ) where appropriate.
                        - Maintain a professional, technical, yet engaging tone.
                        - Return ONLY the final ${langNames[targetLang]} text without metadata or explanations.`;

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
                        content: systemPrompt
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
    // We'll read English file but also potentially update it
    const enPath = path.join(localesDir, 'en.json');
    let enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    // Step 1: Pre-process English to fix any Spanish/other language leaks
    console.log("Checking if English (en.json) needs fixes for non-English content...");
    let enUpdated = false;
    
    // Check AI News in EN
    for (let i = 0; i < (enData.ai_news?.items_list?.length || 0); i++) {
        const item = enData.ai_news.items_list[i];
        // Heuristic: If it looks like Spanish (has Spanish-only words or just run it through GPT for safety if it's new)
        // For simplicity, we can just run it through the "fixer" prompt if it's the first time we see it 
        // Or check for common Spanish words like "y", "en", "para", "de" mixed with accent marks
        const hasSpanishVibe = /[áéíóúñ]/i.test(item.title) || /\b(de|la|en|el|y|para|con)\b/i.test(item.title);
        
        if (hasSpanishVibe) {
            console.log(`Potential non-English content in en.json (AI News): "${item.title}". Fixing...`);
            const fixedTitle = await translateText(item.title, 'en');
            const fixedDesc = await translateText(item.description, 'en');
            
            if (fixedTitle !== item.title || fixedDesc !== item.description) {
                enData.ai_news.items_list[i].title = fixedTitle;
                enData.ai_news.items_list[i].description = fixedDesc;
                enUpdated = true;
            }
        }
    }

    // Check Project News in EN
    for (let i = 0; i < (enData.news?.items_list?.length || 0); i++) {
        const item = enData.news.items_list[i];
        const hasSpanishVibe = /[áéíóúñ]/i.test(item.title) || /\b(de|la|en|el|y|para|con)\b/i.test(item.title);
        
        if (hasSpanishVibe) {
            console.log(`Potential non-English content in en.json (Project News): "${item.title}". Fixing...`);
            const fixedTitle = await translateText(item.title, 'en');
            const fixedDesc = await translateText(item.description, 'en');
            
            if (fixedTitle !== item.title || fixedDesc !== item.description) {
                enData.news.items_list[i].title = fixedTitle;
                enData.news.items_list[i].description = fixedDesc;
                enUpdated = true;
            }
        }
    }

    if (enUpdated) {
        fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
        console.log("Updated en.json with fixed English translations.");
    }

    // Step 2: Translate to other languages using (now fixed) enData as source
    const targetLocales = locales.filter(l => l !== 'en');

    for (const lang of targetLocales) {
        const langPath = path.join(localesDir, `${lang}.json`);
        let langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

        console.log(`Checking translations for ${lang}...`);
        let updated = false;

        // Process AI News
        if (enData.ai_news && enData.ai_news.items_list) {
            for (let i = 0; i < enData.ai_news.items_list.length; i++) {
                const enItem = enData.ai_news.items_list[i];
                const langItem = langData.ai_news.items_list[i];

                const needsTranslation = !langItem || 
                                       langItem.title === enItem.title || 
                                       (enItem.content && (!langItem.content || langItem.content === enItem.content));

                if (needsTranslation) {
                    console.log(`Translating AI News item: ${enItem.title} -> ${lang}`);
                    const translatedTitle = await translateText(enItem.title, lang);
                    const translatedDesc = await translateText(enItem.description, lang);
                    
                    let translatedContent = "";
                    if (enItem.content) {
                        console.log(`  - Translating content for: ${enItem.title} (${enItem.content.length} chars)`);
                        const contentPrompt = `Translate this technical article about AI in industry to ${langNames[lang]}. 
                        EDITORIAL RULES:
                        1. Select 1-2 key insightful sentences and present them as a PULL QUOTE (in double quotes "").
                        2. Ensure any subheadings are in ALL CAPS.
                        3. Use **bold emphasis** for key terms.
                        4. Maintain professional tone and perfect paragraph structure for a magazine-like feel.
                        Return ONLY the translated content.`;
                        translatedContent = await translateText(enItem.content, lang, contentPrompt);
                    }
                    
                    if (!langData.ai_news.items_list[i]) {
                        langData.ai_news.items_list[i] = { ...enItem };
                    }
                    
                    langData.ai_news.items_list[i].title = translatedTitle;
                    langData.ai_news.items_list[i].description = translatedDesc;
                    if (translatedContent) langData.ai_news.items_list[i].content = translatedContent;
                    
                    updated = true;
                }
            }
        }

        // Process Project Events (news)
        if (enData.news && enData.news.items_list) {
            for (let i = 0; i < enData.news.items_list.length; i++) {
                const enItem = enData.news.items_list[i];
                const langItem = langData.news.items_list[i];

                const needsTranslation = !langItem || 
                                       langItem.title === enItem.title || 
                                       (enItem.content && (!langItem.content || langItem.content === enItem.content));

                if (needsTranslation) {
                    console.log(`Translating Project Event: ${enItem.title} -> ${lang}`);
                    const translatedTitle = await translateText(enItem.title, lang);
                    const translatedDesc = await translateText(enItem.description, lang);

                    let translatedContent = "";
                    if (enItem.content) {
                        translatedContent = await translateText(enItem.content, lang);
                    }

                    if (!langData.news.items_list[i]) {
                        langData.news.items_list[i] = { ...enItem };
                    }

                    langData.news.items_list[i].title = translatedTitle;
                    langData.news.items_list[i].description = translatedDesc;
                    if (translatedContent) langData.news.items_list[i].content = translatedContent;
                    
                    updated = true;
                }
            }
        }

        // Process Articles
        if (enData.articles && enData.articles.items_list) {
            if (!langData.articles) langData.articles = { items_list: [] };
            if (!langData.articles.items_list) langData.articles.items_list = [];

            for (let i = 0; i < enData.articles.items_list.length; i++) {
                const enItem = enData.articles.items_list[i];
                const langItem = langData.articles.items_list[i];

                if (!langItem || !langItem.title || !langItem.description || langItem.title === enItem.title || langItem.description === enItem.description) {
                    console.log(`Translating Article: ${enItem.title} -> ${lang}`);
                    
                    const titlePrompt = `Translate this article title to ${langNames[lang]}: "${enItem.title}"`;
                    const descPrompt = `Based on the title "${enItem.title}" and this excerpt: "${enItem.description}", create a professional summary paragraph in ${langNames[lang]} (exactly 2 or 3 sentences long) that functions as a high-quality abstract for the article. Return ONLY the translation.`;

                    const translatedTitle = await translateText(enItem.title, lang, titlePrompt);
                    const translatedDesc = await translateText(enItem.description, lang, descPrompt);

                    if (!langData.articles.items_list[i]) {
                        langData.articles.items_list[i] = { ...enItem };
                    }

                    langData.articles.items_list[i].title = translatedTitle;
                    langData.articles.items_list[i].description = translatedDesc;
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
