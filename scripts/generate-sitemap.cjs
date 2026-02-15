
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://learningbrains.vercel.app';
const LAST_MOD = new Date().toISOString().split('T')[0];

const languages = ['en', 'es', 'it', 'sk', 'de', 'pt'];
const staticRoutes = [
    '', // Home
    '/about',
    '/results',
    '/partners',
    '/news',
    '/resources',
    '/impact',
    '/contact'
];

const generateSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    languages.forEach(lang => {
        staticRoutes.forEach(route => {
            const path = route === '' ? '' : route;
            const url = `${SITE_URL}/${lang}${path}`;

            xml += '  <url>\n';
            xml += `    <loc>${url}</loc>\n`;
            xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
            xml += '    <changefreq>weekly</changefreq>\n';
            xml += '    <priority>0.8</priority>\n';

            // Add hreflang links
            languages.forEach(l => {
                const href = `${SITE_URL}/${l}${path}`;
                xml += `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}" />\n`;
            });

            // x-default
            xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${path}" />\n`;

            xml += '  </url>\n';
        });
    });

    xml += '</urlset>';

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log('Sitemap generated successfully in public/sitemap.xml');
};

generateSitemap();
