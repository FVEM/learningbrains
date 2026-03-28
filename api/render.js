import fs from 'fs';
import path from 'path';
import { seoConfig } from '../src/config/seo-meta.js';

export default async function handler(req, res) {
  const { url } = req;
  const urlPath = new URL(url, `http://${req.headers.host}`).pathname;

  // 1. Detect language and page slug
  // Path format: /:lang/:page or /:lang/
  const parts = urlPath.split('/').filter(Boolean);
  const lang = parts[0] || seoConfig.defaultLang;
  const slug = parts[1] || 'home';

  // 2. Resolve metadata
  const pageMeta = seoConfig.pages[slug] || seoConfig.pages.home;
  const meta = pageMeta[lang] || pageMeta[seoConfig.defaultLang];

  try {
    // 3. Read index.html (the built version)
    // In Vercel, when running as a function, we need to point to the correct static asset.
    // Assuming Vite build output is available.
    const indexPath = path.join(process.cwd(), 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    // 4. Inject metadata
    const fullUrl = `https://learningbrains.eu${urlPath}`;
    
    // Replace title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
    
    // Replace Meta Description - more robust regex for multiline/attributes
    html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, 
      `<meta name="description" content="${meta.description}" />`);
    
    // OG Tags - Replacing based on property attribute
    html = html.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i, 
      `<meta property="og:title" content="${meta.title}" />`);
    
    html = html.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i, 
      `<meta property="og:description" content="${meta.description}" />`);
    
    html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i, 
      `<meta property="og:url" content="${fullUrl}" />`);
    
    // Twitter - Replacing based on name attribute
    html = html.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i, 
      `<meta name="twitter:title" content="${meta.title}" />`);
    
    html = html.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i, 
      `<meta name="twitter:description" content="${meta.description}" />`);

    // 5. Send response
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('SSR Render Error:', error);
    // Fallback to serving the original index.html if something fails
    res.status(500).send('Internal Server Error while rendering meta-tags.');
  }
}
