const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/** Read API key from .env without requiring dotenv */
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

/**
 * System prompt for translating article body content.
 * Enforces plain paragraph structure — no headers, bullets or bold formatting.
 */
const CONTENT_PROMPT = (lang) =>
    `Translate the following text to ${langNames[lang]}.
Maintain the original paragraph structure and tone exactly.
Do NOT add extra headers, bullet points, bold text, pull quotes or any formatting.
Return ONLY the translated text, nothing else.`;

/**
 * System prompt for translating short fields (title, description).
 */
const SHORT_PROMPT = (lang) =>
    `Translate the following text to ${langNames[lang]}.
Maintain the original meaning and tone.
Return ONLY the translated text, nothing else.`;

// ---------------------------------------------------------------------------
// OpenAI helper
// ---------------------------------------------------------------------------

async function translateText(text, targetLang, customPrompt = null) {
    if (!text || text.trim() === '') return '';

    const systemPrompt = customPrompt || SHORT_PROMPT(targetLang);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user',   content: text }
                ],
                temperature: 0.3
            })
        });

        const data = await response.json();
        if (data.error) {
            console.error(`  ⚠ OpenAI Error: ${data.error.message}`);
            return text; // Fall back to original rather than crashing
        }
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error(`  ⚠ Translation error for ${targetLang}:`, error.message);
        return text;
    }
}

// ---------------------------------------------------------------------------
// Quality checks — detect items that need (re-)translation
// ---------------------------------------------------------------------------

/**
 * Returns true if a translated item needs to be re-translated.
 * Checks for: missing translation, title still in English, corrupted title,
 * content still in English, or content with leftover AI formatting.
 */
function needsTranslation(enItem, langItem, lang) {
    if (!langItem) return { yes: true, reason: 'missing' };

    // Title is identical to English source
    if (langItem.title && langItem.title.trim() === enItem.title.trim()) {
        return { yes: true, reason: 'untranslated-title' };
    }

    // Title has doubled in length or contains editorial artefacts — sign of corruption
    const isCorrupted = langItem.title &&
        (langItem.title.length > enItem.title.length * 2.5 ||
         langItem.title.includes('KEY INSIGHTS'));
    if (isCorrupted) return { yes: true, reason: 'corrupted-title' };

    // Content exists in English but no translated content exists yet
    if (enItem.content && (!langItem.content || langItem.content.trim() === '')) {
        return { yes: true, reason: 'missing-content' };
    }

    // Content is identical to the English source
    if (enItem.content && langItem.content && langItem.content.trim() === enItem.content.trim()) {
        return { yes: true, reason: 'untranslated-content' };
    }

    // Content still contains leftover AI markdown formatting
    const isOverFormatted = langItem.content && (
        langItem.content.includes('**') ||
        /\n[A-Z\s]{5,}\n/.test(langItem.content) ||
        langItem.content.includes('KEY TAKEAWAY') ||
        langItem.content.includes('PULL QUOTE')
    );
    if (isOverFormatted) return { yes: true, reason: 'over-formatted' };

    return { yes: false };
}

// ---------------------------------------------------------------------------
// Main translation logic
// ---------------------------------------------------------------------------

async function translateSection(enItems, langItems, lang, sectionLabel) {
    let updated = false;
    const result = [...(langItems || [])];

    for (let i = 0; i < enItems.length; i++) {
        const enItem = enItems[i];
        const langItem = result[i];
        const { yes, reason } = needsTranslation(enItem, langItem, lang);

        if (!yes) continue;

        // Log the reason
        const reasonLabels = {
            'missing':              `New item`,
            'untranslated-title':   `Title not translated`,
            'corrupted-title':      `Corrupted title`,
            'missing-content':      `Missing content translation`,
            'untranslated-content': `Content not translated`,
            'over-formatted':       `Over-formatted content (AI artefacts)`
        };
        console.log(`  → [${lang}] ${reasonLabels[reason] || reason}: "${enItem.title}"`);

        const translatedTitle = await translateText(enItem.title, lang);
        const translatedDesc  = await translateText(enItem.description, lang);

        let translatedContent = '';
        if (enItem.content) {
            console.log(`    Translating body (${enItem.content.length} chars)...`);
            translatedContent = await translateText(enItem.content, lang, CONTENT_PROMPT(lang));
        }

        // Merge: keep all non-text fields from English, overwrite translatable ones
        if (!result[i]) {
            result[i] = { ...enItem };
        }
        result[i].title       = translatedTitle;
        result[i].description = translatedDesc;
        if (translatedContent) result[i].content = translatedContent;

        updated = true;
    }

    return { items: result, updated };
}

async function translateLocales() {
    if (!OPENAI_API_KEY) {
        console.error('❌ No OpenAI API key found. Set VITE_OPENAI_API_KEY in .env');
        process.exit(1);
    }

    const enPath = path.join(localesDir, 'en.json');
    let enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    // ------------------------------------------------------------------
    // Step 1: Sanity-check English source — fix any obvious non-English
    //         content that crept in (e.g. Spanish leaking into en.json)
    // ------------------------------------------------------------------
    console.log('\n📋 Checking English source (en.json) for non-English content...');
    let enUpdated = false;

    const checkSection = async (items, sectionName) => {
        for (let i = 0; i < (items?.length || 0); i++) {
            const item = items[i];
            // Only flag if title contains accented characters specific to Romance languages
            const hasNonEnglishChars = /[áéíóúñàèìòùâêîôûäëïöü]/i.test(item.title);
            if (hasNonEnglishChars) {
                console.log(`  ⚠ Non-English chars in en.json [${sectionName}]: "${item.title}" — fixing...`);
                const fixedTitle = await translateText(item.title, 'en');
                const fixedDesc  = await translateText(item.description, 'en');
                if (fixedTitle !== item.title) { items[i].title = fixedTitle; enUpdated = true; }
                if (fixedDesc  !== item.description) { items[i].description = fixedDesc; enUpdated = true; }
            }
        }
    };

    await checkSection(enData.ai_news?.items_list, 'ai_news');
    await checkSection(enData.news?.items_list, 'news');

    if (enUpdated) {
        fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
        console.log('  ✓ en.json updated with corrected English content.');
    } else {
        console.log('  ✓ en.json looks clean.');
    }

    // ------------------------------------------------------------------
    // Step 2: Translate each target language from the (now clean) English
    // ------------------------------------------------------------------
    const targetLocales = locales.filter(l => l !== 'en');

    for (const lang of targetLocales) {
        const langPath = path.join(localesDir, `${lang}.json`);
        let langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

        console.log(`\n🌍 Processing [${lang}]...`);
        let anyUpdated = false;

        // AI News
        if (enData.ai_news?.items_list?.length) {
            const { items, updated } = await translateSection(
                enData.ai_news.items_list,
                langData.ai_news?.items_list || [],
                lang,
                'ai_news'
            );
            if (updated) {
                langData.ai_news.items_list = items;
                anyUpdated = true;
            }
        }

        // Project Events & Articles (news section)
        if (enData.news?.items_list?.length) {
            const { items, updated } = await translateSection(
                enData.news.items_list,
                langData.news?.items_list || [],
                lang,
                'news'
            );
            if (updated) {
                langData.news.items_list = items;
                anyUpdated = true;
            }
        }

        if (anyUpdated) {
            fs.writeFileSync(langPath, JSON.stringify(langData, null, 2));
            console.log(`  ✓ Saved ${lang}.json`);
        } else {
            console.log(`  ✓ No updates needed for ${lang}`);
        }
    }

    console.log('\n✅ AI Translation process completed.\n');
}

translateLocales().catch(console.error);
