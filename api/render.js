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
    // 3. Bundled template read: path.join(process.cwd(), 'index.html')
    // This is now guaranteed by vercel.json "functions" includeFiles config.
    const indexPath = path.join(process.cwd(), 'index.html');
    
    if (fs.existsSync(indexPath)) {
        html = fs.readFileSync(indexPath, 'utf8');
    } else {
        // Fallback to searching in case of absolute path issues
        const altPaths = [
          path.join(__dirname, '..', 'index.html'),
          path.join(__dirname, 'index.html'), // Special case for some Vercel build modes
        ];
        for (const p of altPaths) {
          if (fs.existsSync(p)) {
            html = fs.readFileSync(p, 'utf8');
            break;
          }
        }
    }

    if (!html) {
      throw new Error('Static index.html template not found in bundle.');
    }

    // 4. Inject metadata
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

    // 5. Send response
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('SSR Render Error:', error);
    // Ultimate fallback: if we can't get the template, we must still load the site.
    // We send a minimal wrapper that at least sets the meta and tries to load the manifest or a static asset.
    res.status(200).send(`<!DOCTYPE html><html><head><title>${meta.title}</title><meta name="description" content="${meta.description}" /></head><body><div id="root"></div><script>window.location.reload();</script></body></html>`);
  }
}
