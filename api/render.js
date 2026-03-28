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
    // 3. Fetch strategy: always get the latest built index.html from the host
    // This is more reliable on Vercel than local fs for static assets.
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    
    // Fetch specifically the root/index.html (which is static)
    // We add a cache-buster or just use a direct request to avoid recursion
    const response = await fetch(`${baseUrl}/index.html`, {
      headers: { 'x-is-ssr-fetch': 'true' }
    });
    
    if (response.ok) {
        html = await response.text();
    } else {
        throw new Error(`Failed to fetch index.html: ${response.status}`);
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
    // Absolute fallback: if fetch fails, return a 500 but still HTML so it's not a white screen
    res.status(200).send(`<!DOCTYPE html><html><head><title>${meta.title}</title></head><body><div id="root"></div><p>Application loading error. Please refresh.</p></body></html>`);
  }
}
