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
 */
function cleanContent(text) {
    if (!text) return '';
    
    // 1. Remove trailing boilerplate first (the "Discover how..." footer)
    const footerPattern = /discover how ai-powered learning can transform workforce development in your company.*/i;
    let cleanedBody = text.replace(footerPattern, '').trim();

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
        /commission cannot be held/i,
        /^learning brains – integrated on the-job/i,
        /^learning systems for industrial reskilling/i,
        /^ai-powered learning: how artificial intelligence is transforming industrial training/i,
        /^ai-driven learning tools boost knowledge transfer/i,
        /^discover how ai-powered learning/i
    ];

    let startIdx = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const isMeta = metadataPatterns.some(p => p.test(line));
        if (isMeta) continue;

        // First line that is NOT empty and NOT meta is our start
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
    const lines = text.split(/\r?\n/);
    const result = [];
    let headers = [];
    
    lines.forEach((line, index) => {
        if (!line.trim() && index !== 0) return;
        
        const row = [];
        let inQuotes = false;
        let currentValue = "";
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    currentValue += '"'; // Handle escaped quotes
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(currentValue.trim());
                currentValue = "";
            } else {
                currentValue += char;
            }
        }
        row.push(currentValue.trim());
        
        const cleanCols = row.map(col => col.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
        
        if (index === 0) {
            headers = cleanCols.map(h => h.toLowerCase());
        } else if (cleanCols.length > 1 || cleanCols[0] !== "") {
            const obj = {};
            headers.forEach((header, i) => {
                obj[header] = cleanCols[i] || "";
            });
            result.push(obj);
        }
    });
    return result;
}

async function fetchSheetData(gid) {
    const url = `${sheetBaseUrl}&gid=${gid}`;
    const response = await fetch(url);
    const text = await response.text();
    return parseCSV(text);
}

async function sync() {
    console.log("Checking for updates in Google Sheet...");
    
    const aiNewsItems = await fetchSheetData(gids.ai_news);
    const projectEventsItems = await fetchSheetData(gids.news);
    const docContentCache = {};

    // Read current English data for comparison
    const enPath = path.join(__dirname, '..', 'src', 'locales', 'en.json');
    let hasChanges = false;
    
    if (fs.existsSync(enPath)) {
        const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
        
        // Helper to generate a simplified list for comparison
        const getAiCompareList = (items) => items.map(item => ({
            title: item.title_en || item.title || "",
            description: item.description_en || item.description || "",
            link: item.link_url || item.link || "",
            date: item.date || "",
            badge: item.badge_text || item.badge || ""
        })).filter(i => i.title.trim() !== "");

        const getProjectCompareList = (items) => items.map(item => ({
            title: item.title_en || item.title || "",
            description: item.description_en || item.description || "",
            link: item.link_url || item.link || "",
            date: item.date || "",
            image: item.image_url || item.image || "",
            badge: item.badge_text || item.badge || "",
            type: item.type || "News",
            doc_link: item.doc_link || ""
        })).filter(i => i.title.trim() !== "");

        const newAiList = getAiCompareList(aiNewsItems);
        const oldAiList = enJson.ai_news.items_list.map(i => ({
            title: i.title,
            description: i.description,
            link: i.link,
            date: i.date || "",
            image: i.image || "",
            badge: i.badge || ""
        }));

        const newProjectList = getProjectCompareList(projectEventsItems);
        const oldProjectList = (enJson.news?.items_list || []).map(i => ({
            title: i.title,
            description: i.description,
            link: i.link,
            date: i.date || "",
            image: i.image || "",
            badge: i.badge || "",
            type: i.type || "News",
            doc_link: i.doc_link || ""
        }));

        if (JSON.stringify(newAiList) === JSON.stringify(oldAiList) && 
            JSON.stringify(newProjectList) === JSON.stringify(oldProjectList)) {
            console.log("✅ Content is already synchronized. No changes detected between Google Sheet and Web.");
            return; 
        } else {
            console.log("🔄 Changes detected in Sheet content! Updating local files...");
            hasChanges = true;
        }
    } else {
        console.log("First time sync, generating locale files...");
        hasChanges = true;
    }

    if (!hasChanges) return;

    for (const lang of locales) {
        const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
        // ... (rest of the logic remains same but I'll provide full function for clarity)
        if (!fs.existsSync(filePath)) continue;
        
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Sync AI News
        const oldAiNews = json.ai_news?.items_list || [];
        json.ai_news.items_list = [];

        for (const item of aiNewsItems) {
            const rawLink = item.link_url || item.link || "";
            let title = item[`title_${lang}`];
            let description = item[`description_${lang}`];
            const fallbackTitle = item.title_en || item.title || "";
            const fallbackDesc = item.description_en || item.description || "";

            // Always try to find existing to preserve fields like partner if missing in sheet
            const existing = oldAiNews.find(i => (i.link && i.link === rawLink) || (i.title && i.title === fallbackTitle && fallbackTitle !== ""));

            // Check if there is an existing local translation that we shouldn't overwrite
            if (lang !== 'en' && (!title || !description)) {
                if (existing) {
                    if (!title && existing.title && existing.title !== fallbackTitle) title = existing.title;
                    if (!description && existing.description && existing.description !== fallbackDesc) description = existing.description;
                }
            }

            title = title || fallbackTitle;
            description = description || fallbackDesc;

            if (!title.trim()) continue;

            const rawImage = item.image_url || item.image || "";
            const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url.split('?')[0]);
            
            let finalImage = transformGDriveUrl(rawImage);
            if (!finalImage && isImage(rawLink)) finalImage = transformGDriveUrl(rawLink);

            if (finalImage && !finalImage.startsWith('http') && !finalImage.startsWith('/')) {
                finalImage = '/' + finalImage;
            }

            const itemType = item.type || "News";
            const isArticle = itemType.toLowerCase().trim() === 'article';
            
            let slug = "";
            let contentText = "";
            let pdfUrl = "";

            if (isArticle) {
                slug = generateSlug(fallbackTitle);

                // Use doc_link column first, then fall back to link_url if it's a Google Docs URL
                const docLink = item.doc_link || (rawLink.includes('docs.google.com/document') ? rawLink : '');
                if (docLink) {
                    const docMatch = docLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
                    if (docMatch && docMatch[1]) {
                        const docId = docMatch[1];
                        if (docContentCache[docId]) {
                            contentText = docContentCache[docId];
                        } else {
                            try {
                                const res = await fetch(`https://docs.google.com/document/d/${docId}/export?format=txt`);
                                if (res.ok) {
                                    const rawText = await res.text();
                                    contentText = cleanContent(rawText);
                                    docContentCache[docId] = contentText;
                                    console.log(`  ✓ Fetched and cleaned Google Doc content (${contentText.length} chars)`);
                                }
                            } catch (e) {
                                console.error("Error fetching doc text for ID", docId, e);
                            }
                        }
                    }
                }
            }

            const newItem = {
                title,
                type: itemType,
                description,
                link: rawLink,
                category: item.category || "",
                date: item.date || "",
                image: finalImage,
                badge: item.badge_text || item.badge || "",
                partner: item.partner || (existing ? existing.partner : "") || ""
            };

            if (isArticle) {
                if (slug) newItem.slug = slug;
                if (contentText) newItem.content = contentText;
                if (item.doc_link) newItem.doc_link = item.doc_link;
                if (pdfUrl && !item.doc_link) newItem.pdf_url = pdfUrl; 
            }

            json.ai_news.items_list.push(newItem);
        }

        // Sync Project News and Articles
        const oldNews = json.news?.items_list || [];
        json.news.items_list = [];

        for (const item of projectEventsItems) {
            const rawLink = item.link_url || item.link || "";
            let title = item[`title_${lang}`];
            let description = item[`description_${lang}`];
            const fallbackTitle = item.title_en || item.title || "";
            const fallbackDesc = item.description_en || item.description || "";

            // Always try to find existing to preserve fields like partner if missing in sheet
            const existing = oldNews.find(i => (i.link && i.link === rawLink) || (i.title && i.title === fallbackTitle && fallbackTitle !== ""));

            // Check if there is an existing local translation that we shouldn't overwrite
            if (lang !== 'en' && (!title || !description)) {
                if (existing) {
                    if (!title && existing.title && existing.title !== fallbackTitle) title = existing.title;
                    if (!description && existing.description && existing.description !== fallbackDesc) description = existing.description;
                }
            }

            title = title || fallbackTitle;
            description = description || fallbackDesc;

            if (!title.trim()) continue;

            const rawImage = item.image_url || item.image || "";
            const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url.split('?')[0]);
            
            let finalImage = transformGDriveUrl(rawImage);
            if (!finalImage && isImage(rawLink)) finalImage = transformGDriveUrl(rawLink);

            if (finalImage && !finalImage.startsWith('http') && !finalImage.startsWith('/')) {
                finalImage = '/' + finalImage;
            }

            const itemType = item.type || "News";
            const isArticle = itemType.toLowerCase().trim() === 'article';
            
            let slug = "";
            let contentText = "";
            let pdfUrl = "";

            if (isArticle) {
                slug = generateSlug(fallbackTitle);
                pdfUrl = item.pdf_url || item.link_url || item.link || "";

                const docLink = item.doc_link || "";
                if (docLink) {
                    const docMatch = docLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
                    if (docMatch && docMatch[1]) {
                        const docId = docMatch[1];
                        if (docContentCache[docId]) {
                            contentText = docContentCache[docId];
                        } else {
                            try {
                                const res = await fetch(`https://docs.google.com/document/d/${docId}/export?format=txt`);
                                if (res.ok) {
                                    const rawText = await res.text();
                                    contentText = cleanContent(rawText);
                                    docContentCache[docId] = contentText;
                                }
                            } catch (e) {
                                console.error("Error fetching doc text for ID", docId, e);
                            }
                        }
                    }
                }
            }

            const newItem = {
                title,
                type: itemType,
                category: item.category || "",
                description,
                link: rawLink,
                date: item.date || "",
                image: finalImage,
                badge: item.badge_text || item.badge || "",
                partner: item.partner || (existing ? existing.partner : "") || ""
            };

            if (isArticle) {
                if (slug) newItem.slug = slug;
                if (contentText) newItem.content = contentText;
                // Include doc_link for comparison functionality later
                if (item.doc_link) newItem.doc_link = item.doc_link;
                if (pdfUrl && !item.doc_link) newItem.pdf_url = pdfUrl; 
            }

            json.news.items_list.push(newItem);
        }

        // Clean up legacy articles section
        if (json.articles) {
            delete json.articles;
        }

        fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
        console.log(`Successfully updated ${lang}.json`);
    }

    console.log("\n🚀 Triggering AI Translations for all languages...");
    try {
        execSync('node scripts/ai-translate-news.cjs', { stdio: 'inherit' });
        console.log("✅ AI Translation process completed.");
    } catch (error) {
        console.error("❌ Error running AI translation script:", error);
    }
}

sync().catch(console.error);
