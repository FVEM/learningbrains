const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://learningbrains.eu';
const LAST_MOD = new Date().toISOString().split('T')[0];

const languages = ['en', 'es', 'it', 'sk', 'de', 'pt'];
const staticRoutes = [
    '', // Home
    '/about',
    '/results',
    '/partners',
    '/news',
    '/noticias',
    '/articles',
    '/resources',
    '/impact',
    '/contact',
    '/legal'
];

const generateSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // Load articles to generate dynamic routes
    const enDataPath = path.join(__dirname, '../src/locales/en.json');
    const enData = JSON.parse(fs.readFileSync(enDataPath, 'utf8'));
    
    const articleSlugsList = (enData.articles && enData.articles.items_list) 
        ? enData.articles.items_list
            .map(item => `/articles/${item.slug}`)
            .filter(s => s && !s.includes('undefined'))
        : [];
    
    const allRoutes = [...staticRoutes, ...articleSlugsList];

    languages.forEach(lang => {
        allRoutes.forEach(route => {
            const url = `${SITE_URL}/${lang}${route}`;

            xml += '  <url>\n';
            xml += `    <loc>${url}</loc>\n`;
            xml += `    <lastmod>${LAST_MOD}</lastmod>\n`;
            xml += '    <changefreq>weekly</changefreq>\n';
            
            const priority = (route === '' || route === '/') ? "1.0" : (route.includes("/articles/") ? "0.7" : "0.8");
            xml += `    <priority>${priority}</priority>\n`;

            // Add hreflang links
            languages.forEach(l => {
                const href = `${SITE_URL}/${l}${route}`;
                xml += `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}" />\n`;
            });

            // x-default
            xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${route}" />\n`;

            xml += '  </url>\n';
        });
    });

    xml += '</urlset>';

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log(`Sitemap generated successfully in public/sitemap.xml with ${allRoutes.length * languages.length} total URLs.`);
};

generateSitemap();
