const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const sheetBaseUrl = 'https://docs.google.com/spreadsheets/d/1RN00ODnuj6F7hlGtvgIIN0d9_1u2UsoTwHQ2KkkKxa0/export?format=csv';
const gids = {
    ai_news: '0',
    news: '148983926'
};

/**
 * Generates a URL-friendly slug from a title.
 */
function generateSlug(title) {
    if (!title) return '';
    return title
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .split(/\s+/)
        .slice(0, 5)
        .join('-');
}

/**
 * Strips technical/template boilerplate from Google Doc text.
 * @param {string} text The raw document text
 * @param {string} articleTitle The title of the article to strip if it appears at the top
 */
function cleanContent(text, articleTitle = '') {
    if (!text) return '';
    
    // 1. Remove trailing boilerplate first
    const footers = [
        /discover how ai-powered learning can transform workforce development in your company.*/i,
        /how is your organization addressing the impact of ai on jobs and skills.*/i,
        /find out more about learning brains.*/i
    ];
    
    let cleanedBody = text;
    footers.forEach(p => {
        cleanedBody = cleanedBody.replace(p, '');
    });
    cleanedBody = cleanedBody.trim();

    const lines = cleanedBody.split(/\r?\n/);

    const metadataPatterns = [
        /^website article$/i,
        /^date:/i,
        /^topic:/i,
        /^link\s*$/i,
        /^n\.\s*views/i,
        /^erasmus\+\s+program/i,
        /^this project has been funded/i,
        /^\[link\]$/i,
        /^european commission/i,
        /reflects the views only of/i,
        /commission cannot be held/i
    ];

    let startIdx = 0;
    const normalizedTitle = articleTitle.toLowerCase().trim();

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const isMeta = metadataPatterns.some(p => p.test(line));
        const isTitle = normalizedTitle && line.toLowerCase() === normalizedTitle;
        
        if (isMeta || isTitle) continue;

        // First line that is NOT empty, NOT meta, and NOT the title is our start
        startIdx = i;
        break;
    }

    return lines.slice(startIdx).join('\n').trim();
}


/**
 * Transforms a Google Drive view link into a direct thumbnail URL
 * Supports /d/FILE_ID and id=FILE_ID formats
 */
function transformGDriveUrl(url) {
    if (!url || typeof url !== 'string') return url;
    
    // If it's already a direct lh3 or thumbnail URL, return it
    if (url.includes('googleusercontent.com') || url.includes('drive.google.com/thumbnail')) {
        return url;
    }

    // Try to extract ID from /d/ID or id=ID
    const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || 
                  url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    
    if (idMatch && idMatch[1]) {
        // Return public thumbnail endpoint with decent width
        return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
    }
    
    return url;
}

function parseCSV(text) {
    const result = [];
    const rows = [];
    let currentRow = [];
    let currentValue = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentValue += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentValue.trim());
            currentValue = "";
        } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
            currentRow.push(currentValue.trim());
            rows.push(currentRow);
            currentRow = [];
            currentValue = "";
            if (char === '\r' && nextChar === '\n') i++; 
        } else {
            currentValue += char;
        }
    }
    
    if (currentRow.length > 0 || currentValue.trim() !== "") {
        currentRow.push(currentValue.trim());
        rows.push(currentRow);
    }

    if (rows.length === 0) return [];

    const rawHeaders = rows[0];
    const headers = rawHeaders.map(h => h.toLowerCase().trim());

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length <= 1 && !row[0]) continue;
        const obj = {};
        headers.forEach((header, j) => {
            obj[header] = (row[j] || "").trim();
        });
        result.push(obj);
    }
    return result;
}


async function fetchSheetData(gid) {
    const url = `${sheetBaseUrl}&gid=${gid}`;
    const response = await fetch(url);
    const text = await response.text();
    return parseCSV(text);
}

/**
 * Returns a stable key to identify an item across runs.
 * Prefers link URL, falls back to normalized English title.
 */
function itemKey(link, title) {
    if (link && link.trim()) return link.trim();
    return (title || '').toLowerCase().trim();
}

/**
 * Checks whether the core source fields of a Sheet item have changed
 * compared to what is already stored in the locale file.
 * Only these fields trigger re-processing; metadata like image/badge
 * can change without invalidating existing translations.
 */
function sourceChanged(sheetItem, existingItem) {
    if (!existingItem) return true;

    const sheetTitle   = sheetItem.title_en || sheetItem.title || '';
    const sheetDesc    = sheetItem.description_en || sheetItem.description || '';
    const sheetDocLink = sheetItem.doc_link || '';

    const existTitle   = existingItem._source_title   || existingItem.title || '';
    const existDesc    = existingItem._source_desc    || existingItem.description || '';
    const existDocLink = existingItem._source_doc_link || existingItem.doc_link || '';

    return (
        sheetTitle.trim()   !== existTitle.trim()   ||
        sheetDesc.trim()    !== existDesc.trim()    ||
        sheetDocLink.trim() !== existDocLink.trim()
    );
}

async function processSection(sheetItems, existingItems, lang, docContentCache) {
    // Build a lookup map from existing items by key
    const existingMap = {};
    for (const item of existingItems) {
        const key = itemKey(item.link, item._source_title || item.title);
        existingMap[key] = item;
    }

    const result = [];
    let addedCount   = 0;
    let updatedCount = 0;
    let unchangedCount = 0;

    for (const sheetRow of sheetItems) {
        const rawLink      = sheetRow.link_url || sheetRow.link || '';
        const fallbackTitle = sheetRow.title_en || sheetRow.title || '';
        const fallbackDesc  = sheetRow.description_en || sheetRow.description || '';

        if (!fallbackTitle.trim()) continue;

        const key      = itemKey(rawLink, fallbackTitle);
        const existing = existingMap[key];
        const changed  = sourceChanged(sheetRow, existing);

        // ── Metadata that always syncs from Sheet (safe to update) ──
        const rawImage  = sheetRow.image_url || sheetRow.image || '';
        const isImageUrl = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test((url||'').split('?')[0]);
        let finalImage  = transformGDriveUrl(rawImage);
        if (!finalImage && isImageUrl(rawLink)) finalImage = transformGDriveUrl(rawLink);
        if (finalImage && !finalImage.startsWith('http') && !finalImage.startsWith('/')) {
            finalImage = '/' + finalImage;
        }

        const itemType  = sheetRow.type || 'News';
        const isArticle = itemType.toLowerCase().trim() === 'article';

        if (!changed && existing) {
            // ── Item unchanged: preserve all existing data, just refresh metadata ──
            unchangedCount++;
            const preserved = { ...existing };
            preserved.image  = finalImage  || existing.image  || '';
            preserved.badge  = sheetRow.badge_text || sheetRow.badge || existing.badge || '';
            preserved.date   = sheetRow.date  || existing.date  || '';
            preserved.category = sheetRow.category || existing.category || '';
            preserved.partner  = sheetRow.partner  || existing.partner  || '';
            result.push(preserved);
            continue;
        }

        // ── Item is new or its source changed: rebuild it ──
        if (existing) {
            updatedCount++;
            console.log(`  📝 Updated: "${fallbackTitle.substring(0,60)}"`);
        } else {
            addedCount++;
            console.log(`  ✨ New item: "${fallbackTitle.substring(0,60)}"`);
        }

        // For non-EN locales, use Sheet's translated columns if available,
        // otherwise fall back to existing translation, then to English.
        let title       = lang !== 'en' ? (sheetRow[`title_${lang}`] || '') : fallbackTitle;
        let description = lang !== 'en' ? (sheetRow[`description_${lang}`] || '') : fallbackDesc;

        if (lang !== 'en') {
            if (!title)       title       = (existing && existing.title !== fallbackTitle)       ? existing.title       : fallbackTitle;
            if (!description) description = (existing && existing.description !== fallbackDesc)  ? existing.description : fallbackDesc;
        }

        title       = title       || fallbackTitle;
        description = description || fallbackDesc;

        let slug        = '';
        let contentText = '';

        if (isArticle) {
            slug = generateSlug(fallbackTitle);

            const docLink = sheetRow.doc_link || (rawLink.includes('docs.google.com/document') ? rawLink : '');
            if (docLink) {
                const docMatch = docLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (docMatch && docMatch[1]) {
                    const docId = docMatch[1];
                    // Only re-fetch Google Doc if source actually changed or we have no content yet
                    const alreadyHasContent = existing && existing.content && existing.content.length > 50;
                    const docLinkChanged    = (existing?._source_doc_link || existing?.doc_link || '') !== docLink;

                    if (docContentCache[docId]) {
                        contentText = docContentCache[docId];
                    } else if (!alreadyHasContent || docLinkChanged) {
                        try {
                            const res = await fetch(`https://docs.google.com/document/d/${docId}/export?format=txt`);
                            if (res.ok) {
                                const rawText = await res.text();
                                contentText = cleanContent(rawText, fallbackTitle);
                                docContentCache[docId] = contentText;
                                console.log(`    ✓ Fetched Google Doc (${contentText.length} chars)`);
                            }
                        } catch (e) {
                            console.error('    ✗ Error fetching doc', docId, e.message);
                            // Preserve existing content rather than losing it
                            contentText = existing?.content || '';
                        }
                    } else {
                        contentText = existing?.content || '';
                    }
                }
            }
        }

        const newItem = {
            title,
            type: itemType,
            description,
            link: rawLink,
            category: sheetRow.category || '',
            date:     sheetRow.date     || '',
            image:    finalImage,
            badge:    sheetRow.badge_text || sheetRow.badge || '',
            partner:  sheetRow.partner  || existing?.partner || '',
            // Internal source snapshot — used to detect real changes on next run
            _source_title:    fallbackTitle,
            _source_desc:     fallbackDesc,
            _source_doc_link: sheetRow.doc_link || ''
        };

        if (isArticle) {
            if (slug)        newItem.slug     = slug;
            if (contentText) newItem.content  = contentText;
            if (sheetRow.doc_link) newItem.doc_link = sheetRow.doc_link;
        }

        result.push(newItem);
    }

    console.log(`    → ${addedCount} new, ${updatedCount} updated, ${unchangedCount} unchanged`);
    return result;
}

async function sync() {
    console.log('Checking for updates in Google Sheet...');

    const aiNewsItems       = await fetchSheetData(gids.ai_news);
    const projectEventsItems = await fetchSheetData(gids.news);
    const docContentCache   = {};

    const enPath = path.join(__dirname, '..', 'src', 'locales', 'en.json');

    // Quick change detection: compare Sheet source titles+links against en.json
    if (fs.existsSync(enPath)) {
        const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));

        const sheetAiKeys = aiNewsItems
            .map(i => itemKey(i.link_url || i.link, i.title_en || i.title))
            .filter(Boolean);
        const localAiKeys = (enJson.ai_news?.items_list || [])
            .map(i => itemKey(i.link, i._source_title || i.title))
            .filter(Boolean);

        const sheetNewsKeys = projectEventsItems
            .map(i => itemKey(i.link_url || i.link, i.title_en || i.title))
            .filter(Boolean);
        const localNewsKeys = (enJson.news?.items_list || [])
            .map(i => itemKey(i.link, i._source_title || i.title))
            .filter(Boolean);

        const aiChanged   = JSON.stringify(sheetAiKeys)   !== JSON.stringify(localAiKeys);
        const newsChanged = JSON.stringify(sheetNewsKeys) !== JSON.stringify(localNewsKeys);

        if (!aiChanged && !newsChanged) {
            // Also check if any source content changed for existing items
            const anySourceChanged =
                aiNewsItems.some(sheetRow => {
                    const key = itemKey(sheetRow.link_url || sheetRow.link, sheetRow.title_en || sheetRow.title);
                    const existing = (enJson.ai_news?.items_list || []).find(i =>
                        itemKey(i.link, i._source_title || i.title) === key
                    );
                    return sourceChanged(sheetRow, existing);
                }) ||
                projectEventsItems.some(sheetRow => {
                    const key = itemKey(sheetRow.link_url || sheetRow.link, sheetRow.title_en || sheetRow.title);
                    const existing = (enJson.news?.items_list || []).find(i =>
                        itemKey(i.link, i._source_title || i.title) === key
                    );
                    return sourceChanged(sheetRow, existing);
                });

            if (!anySourceChanged) {
                console.log('✅ Content is already synchronized. No changes detected.');
                return;
            }
        }

        console.log('🔄 Changes detected. Processing item by item...');
    } else {
        console.log('First time sync, generating locale files...');
    }

    for (const lang of locales) {
        const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
        if (!fs.existsSync(filePath)) continue;

        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(`\n[${lang}] Syncing ai_news...`);
        json.ai_news.items_list = await processSection(
            aiNewsItems,
            json.ai_news?.items_list || [],
            lang,
            docContentCache
        );

        console.log(`[${lang}] Syncing news...`);
        json.news.items_list = await processSection(
            projectEventsItems,
            json.news?.items_list || [],
            lang,
            docContentCache
        );

        // Clean up legacy section
        if (json.articles) delete json.articles;

        fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
        console.log(`  ✓ Saved ${lang}.json`);
    }

    console.log('\n🚀 Triggering AI Translations for all languages...');
    try {
        execSync('node scripts/ai-translate-news.cjs', { stdio: 'inherit' });
        console.log('✅ AI Translation process completed.');
    } catch (error) {
        console.error('❌ Error running AI translation script:', error);
    }
}

sync().catch(console.error);



sync().catch(console.error);
