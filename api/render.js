import fs from 'fs';
import path from 'path';
import { seoConfig } from '../src/config/seo-meta.js';

export default async function handler(req, res) {
  const { url } = req;
  const urlPath = new URL(url, `http://${req.headers.host}`).pathname;

  // 1. Detect language and page slug
  // Path formats: /:lang/:slug, /:lang/, or /:slug (root pages like /analytics)
  const parts = urlPath.split('/').filter(Boolean);
  
  const isFirstPartLang = seoConfig.languages.includes(parts[0]);
  const lang = isFirstPartLang ? parts[0] : seoConfig.defaultLang;
  const slug = isFirstPartLang ? (parts[1] || 'home') : (parts[0] || 'home');

  // 2. Resolve metadata
  const pageMeta = seoConfig.pages[slug] || seoConfig.pages.home;
  const meta = pageMeta[lang] || pageMeta[seoConfig.defaultLang];

  let html = '';
  try {
    // 3. Robust read strategy: check /dist (prod) or root
    // Vercel function /api/render.js is inside /api
    const pathsToTry = [
      path.join(process.cwd(), 'dist', 'index.html'),
      path.join(process.cwd(), 'index.html'),
      path.join(__dirname, '..', 'dist', 'index.html'),
      path.join(__dirname, '..', 'index.html')
    ];

    let success = false;
    for (const p of pathsToTry) {
      if (fs.existsSync(p)) {
        html = fs.readFileSync(p, 'utf8');
        success = true;
        break;
      }
    }

    // 4. Fallback if index.html can't be read from disk
    if (!success) {
      console.warn('Could not find index.html on disk, using minimal fallback shell.');
      html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" /><title>${meta.title}</title><meta name="description" content="${meta.description}" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><link rel="icon" type="image/svg+xml" href="/favicon.ico" /></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`;
      // Note: /src/main.jsx only works in local dev Vite, but Vercel serves the built /assets/ automatically.
      // We should ideally use the actual bundle path, but a generic SPA mount point is safer than a white screen.
    }

    // 5. Inject metadata
    const fullUrl = `https://learningbrains.eu${urlPath}`;
    
    // Replace title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title} | Learning Brains</title>`);
    
    // Replace/Inject Meta Description
    if (html.includes('name="description"')) {
      html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, 
        `<meta name="description" content="${meta.description}" />`);
    } else {
      html = html.replace(/<\/head>/i, `<meta name="description" content="${meta.description}" />\n</head>`);
    }
    
    // Inject OG Tags
    const ogTags = `
      <meta property="og:title" content="${meta.title}" />
      <meta property="og:description" content="${meta.description}" />
      <meta property="og:url" content="${fullUrl}" />
    `;
    html = html.replace(/<\/head>/i, `${ogTags}\n</head>`);

    // 6. Send response
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('SSR Render Error:', error);
    // Absolute fallback: send a 200 with at least a title so it's not a white screen 500
    res.status(200).send(`<!DOCTYPE html><html><head><title>${meta.title}</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`);
  }
}
