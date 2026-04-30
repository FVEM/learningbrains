/**
 * verify-translations.cjs
 * Checks all locale JSON files and reports any items that appear
 * to still be in English when they should be translated.
 */

const fs   = require('fs');
const path = require('path');

const locales    = ['es', 'de', 'it', 'pt', 'sk'];
const localesDir = path.join(__dirname, '..', 'src', 'locales');

// Common English function words — a high ratio indicates untranslated English text
const EN_WORDS = /\b(the|and|with|that|this|from|have|they|their|which|about|more|also|when|been|into|than|will|can|are|for|its|not|but|all|one|has|who|was|his|her|our|you|your|what|how|may|new|use|via|out|now|yet|well|both|each|often|very|much|many|such|even|just|over|then|here|some|only|most|work|used|help|need|make|take|give|show|know|high|long|full|real|true|good|best|part|same|like|way|set|per|we|by|at|in|on|to|it|is|be|do|an|of|as|so|if|or|he|no|up)\b/gi;

// Common Spanish words — detect Spanish content leaking into non-Spanish locales
const ES_WORDS = /\b(para|con|una|como|que|del|los|las|por|sus|más|han|hay|son|está|pero|desde|sobre|entre|también|puede|cada|nuevo|través|según|cuando|donde|hasta|siendo|haciendo|siendo|cómo|así|esto|esta|estos|estas|nuestro|nuestra)\b/gi;

function wordRatio(text, pattern) {
    if (!text || text.trim().length === 0) return 0;
    const words   = text.split(/\s+/).length;
    const matches = (text.match(pattern) || []).length;
    return matches / words;
}

function checkItems(items, lang) {
    const issues = [];
    (items || []).forEach((item, idx) => {
        const titleEnRatio = wordRatio(item.title, EN_WORDS);
        const contentEnRatio = wordRatio(item.content, EN_WORDS);

        // For non-Spanish locales: also check for Spanish content leaking in
        const titleEsRatio   = lang !== 'es' ? wordRatio(item.title, ES_WORDS) : 0;
        const contentEsRatio = lang !== 'es' ? wordRatio(item.content, ES_WORDS) : 0;

        if (titleEnRatio > 0.5) {
            issues.push({ idx, field: 'title',   title: (item.title||'').substring(0,70), detail: `${Math.round(titleEnRatio*100)}% English words` });
        } else if (titleEsRatio > 0.3) {
            issues.push({ idx, field: 'title',   title: (item.title||'').substring(0,70), detail: `${Math.round(titleEsRatio*100)}% Spanish words` });
        }

        if (item.content && contentEnRatio > 0.45) {
            issues.push({ idx, field: 'content', title: (item.title||'').substring(0,70), detail: `${Math.round(contentEnRatio*100)}% English words` });
        } else if (item.content && contentEsRatio > 0.3) {
            issues.push({ idx, field: 'content', title: (item.title||'').substring(0,70), detail: `${Math.round(contentEsRatio*100)}% Spanish words` });
        }
    });
    return issues;
}


// Load English as reference for exact-match check
const enData = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const enAiTitles   = (enData.ai_news?.items_list || []).map(i => i.title);
const enNewsTitles = (enData.news?.items_list    || []).map(i => i.title);

let totalIssues = 0;

console.log('\n=== Translation Verification Report ===\n');

for (const lang of locales) {
    const filePath = path.join(localesDir, `${lang}.json`);
    const data     = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const langIssues = [];

    // 1. Heuristic: English word ratio
    const aiIssues   = checkItems(data.ai_news?.items_list, lang);
    const newsIssues = checkItems(data.news?.items_list,    lang);

    // 2. Exact match: title identical to English source
    (data.ai_news?.items_list || []).forEach((item, idx) => {
        if (enAiTitles[idx] && item.title && item.title.trim() === enAiTitles[idx].trim()) {
            if (!aiIssues.find(i => i.idx === idx && i.field === 'title')) {
                aiIssues.push({ idx, field: 'title', title: item.title.substring(0, 70), detail: 'identical to English' });
            }
        }
        if (enData.ai_news?.items_list[idx]?.content && item.content &&
            item.content.trim() === enData.ai_news.items_list[idx].content.trim()) {
            aiIssues.push({ idx, field: 'content', title: (item.title || '').substring(0, 70), detail: 'identical to English' });
        }
    });

    (data.news?.items_list || []).forEach((item, idx) => {
        if (enNewsTitles[idx] && item.title && item.title.trim() === enNewsTitles[idx].trim()) {
            if (!newsIssues.find(i => i.idx === idx && i.field === 'title')) {
                newsIssues.push({ idx, field: 'title', title: item.title.substring(0, 70), detail: 'identical to English' });
            }
        }
        if (enData.news?.items_list[idx]?.content && item.content &&
            item.content.trim() === enData.news.items_list[idx].content.trim()) {
            newsIssues.push({ idx, field: 'content', title: (item.title || '').substring(0, 70), detail: 'identical to English' });
        }
    });

    const allIssues = [
        ...aiIssues.map(i   => ({ ...i, section: 'ai_news' })),
        ...newsIssues.map(i => ({ ...i, section: 'news' }))
    ];

    if (allIssues.length === 0) {
        console.log(`✅  [${lang}]  All OK`);
    } else {
        console.log(`❌  [${lang}]  ${allIssues.length} issue(s):`);
        allIssues.forEach(iss => {
            console.log(`      [${iss.section}] #${iss.idx} [${iss.field}] "${iss.title}" → ${iss.detail}`);
        });
        totalIssues += allIssues.length;
    }
}

console.log('\n' + '─'.repeat(42));
if (totalIssues === 0) {
    console.log('🎉  All languages look correctly translated!\n');
} else {
    console.log(`⚠   ${totalIssues} total issue(s) found. Run: node scripts/sync-news-excel.cjs\n`);
    process.exit(1);
}
