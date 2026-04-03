const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 3000;

// Reutilizamos la l\u00f3gica del sitemap
const languages = ['en', 'es', 'it', 'sk', 'de', 'pt'];
const staticRoutes = [
    '', // Home
    '/about',
    '/results',
    '/partners',
    '/news',
    '/noticias', // Added Noticias specifically for AI News
    '/resources',
    '/impact',
    '/contact',
    '/legal'
];

async function prerender() {
    if (process.env.VERCEL) {
        console.log('Vercel environment detected. Skipping Puppeteer prerendering to prevent build failures. (SSG only runs on GitHub Actions / Local)');
        process.exit(0);
    }
    
    console.log('Starting Prerendering Process...');
    
    // 1. Iniciar servidor express local en la carpeta 'dist'
    const app = express();
    // Enable SPA fallback for the crawler so it always returns index.html if file not found
    app.use(express.static(DIST_DIR));
    app.use((req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
    
    const server = app.listen(PORT, () => {
        console.log(`Local server up on http://localhost:${PORT}`);
    });

    try {
        // 2. Lanzar Puppeteer
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Safe for CI
        });
        const page = await browser.newPage();

        for (const lang of languages) {
            for (const route of staticRoutes) {
                const subPath = route === '' ? '' : route;
                const urlPath = `/${lang}${subPath}`;
                const url = `http://localhost:${PORT}${urlPath}`;
                
                console.log(`Prerendering ${urlPath}...`);
                
                // 3. Navegar a la p\u00e1gina y esperar a que React renderice la red
                await page.goto(url, { waitUntil: 'networkidle0' });

                // 4. Obtener HTML final
                const html = await page.content();

                // 5. Guardar en el disco (crear carpetas si no existen)
                const dirPath = path.join(DIST_DIR, lang, route.replace('/', ''));
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }

                fs.writeFileSync(path.join(dirPath, 'index.html'), html);
            }
        }

        await browser.close();
        console.log('Prerendering completed successfully!');

    } catch (error) {
        console.error('Error during prerendering:', error);
        process.exit(1);
    } finally {
        server.close();
    }
}

prerender();
