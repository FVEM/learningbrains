import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function handler(req, res) {
    // Configuración de CORS por si acaso (aunque esté en el mismo dominio)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { range = '30days' } = req.query;

        // Validar entorno
        const propertyId = process.env.GA_PROPERTY_ID;
        let clientEmail = process.env.GA_CLIENT_EMAIL;
        let privateKey = process.env.GA_PRIVATE_KEY;

        // Soporte para pegar el JSON entero como GA_PRIVATE_KEY
        if (privateKey?.trim().startsWith('{')) {
            try {
                const creds = JSON.parse(privateKey);
                privateKey = creds.private_key;
                if (!clientEmail) clientEmail = creds.client_email;
            } catch (e) {
                return res.status(500).json({ error: 'GA_PRIVATE_KEY contains invalid JSON.' });
            }
        }

        // Normalizar saltos de línea en la clave privada
        if (privateKey) {
            privateKey = privateKey.replace(/\\n/g, '\n');
            // Añadir cabeceras si faltan
            if (!privateKey.includes('-----BEGIN')) {
                privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
            }
        }

        if (!propertyId || !clientEmail || !privateKey) {
            return res.status(500).json({
                error: 'Missing Google Analytics credentials in environment variables.'
            });
        }

        // Calcular fechas
        let startDate = '30daysAgo';
        if (range === '7days') startDate = '7daysAgo';
        if (range === 'year') startDate = '365daysAgo';

        // Inicializar cliente
        const analyticsDataClient = new BetaAnalyticsDataClient({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            }
        });

        // Ejecutar todas las consultas en paralelo para mayor velocidad
        const [
            [kpisResponse],
            [timeSeriesResponse],
            [devicesResponse],
            [osResponse],
            [countriesResponse],
            [pagesResponse],
            [channelsResponse],
            [eventsResponse],
            [languagesResponse],
            [sourcesResponse],
            [articleViewsResponse],
            [articleClicksResponse]
        ] = await Promise.all([
            // 0: KPIs Globales
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                metrics: [
                    { name: 'screenPageViews' },
                    { name: 'activeUsers' },
                    { name: 'newUsers' },
                    { name: 'userEngagementDuration' },
                    { name: 'engagementRate' }
                ]
            }),
            // 1: Serie Temporal
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'date' }],
                metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
                orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }]
            }),
            // 2: Dispositivos
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'deviceCategory' }],
                metrics: [{ name: 'activeUsers' }]
            }),
            // 3: Sistemas Operativos
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'operatingSystem' }],
                metrics: [{ name: 'activeUsers' }],
                orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }]
            }),
            // 4: Países Top 5
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'country' }],
                metrics: [{ name: 'activeUsers' }],
                orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
                limit: 50
            }),
            // 5: Páginas Top 6
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
                metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'userEngagementDuration' }],
                orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
                limit: 6
            }),
            // 6: Canales
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'sessionDefaultChannelGroup' }],
                metrics: [{ name: 'activeUsers' }],
                orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }]
            }),
            // 7: Eventos Principales
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'eventName' }],
                metrics: [{ name: 'eventCount' }, { name: 'activeUsers' }],
                orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
                limit: 10
            }),
            // 8: Idiomas (Análisis de rutas)
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'pagePath' }],
                metrics: [{ name: 'activeUsers' }]
            }),
            // 9: Fuentes de sesión para LinkedIn
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'sessionSource' }],
                metrics: [{ name: 'activeUsers' }]
            }),
            // 10: Visitas a páginas de artículos y noticias
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'pagePath' }],
                metrics: [{ name: 'screenPageViews' }],
                dimensionFilter: {
                    orGroup: {
                        expressions: [
                            { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'CONTAINS', value: '/articles/' } } },
                            { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'CONTAINS', value: '/news/' } } }
                        ]
                    }
                },
                orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
                limit: 50
            }),
            // 11: Clics en el botón "Article" por página
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'pagePath' }],
                metrics: [{ name: 'eventCount' }],
                dimensionFilter: {
                    filter: {
                        fieldName: 'eventName',
                        stringFilter: { matchType: 'EXACT', value: 'article_link_click' }
                    }
                },
                limit: 20
            })
        ]);

        // Procesar KPIs
        const kpiRow = kpisResponse.rows?.[0];
        const kpis = {
            views: parseInt(kpiRow?.metricValues?.[0]?.value || '0', 10),
            users: parseInt(kpiRow?.metricValues?.[1]?.value || '0', 10),
            newUsers: parseInt(kpiRow?.metricValues?.[2]?.value || '0', 10),
            avgEngagement: parseInt(kpiRow?.metricValues?.[1]?.value || '1', 10) > 0
                ? (parseFloat(kpiRow?.metricValues?.[3]?.value || '0') / parseInt(kpiRow?.metricValues?.[1]?.value || '1', 10)).toFixed(0)
                : 0,
            engagementRate: (parseFloat(kpiRow?.metricValues?.[4]?.value || '0') * 100).toFixed(1)
        };

        // Procesar Serie Temporal
        const timeSeries = timeSeriesResponse.rows?.map(row => {
            const dateStr = row.dimensionValues[0].value;
            const formattedDate = `${dateStr.substring(6, 8)}/${dateStr.substring(4, 6)}`;
            return {
                date: formattedDate,
                views: parseInt(row.metricValues[0].value, 10),
                users: parseInt(row.metricValues[1].value, 10)
            };
        }) || [];

        // Dispositivos
        const devices = devicesResponse.rows?.map(row => ({
            name: row.dimensionValues[0].value,
            value: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // Sistemas Operativos
        const os = osResponse.rows?.map(row => ({
            name: row.dimensionValues[0].value,
            value: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // Países (Top 5 para global, pero pedimos más para asegurar que el consorcio esté cubierto)
        const countries = countriesResponse.rows?.slice(0, 5).map(row => ({
            country: row.dimensionValues[0].value,
            users: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // Páginas
        const pages = pagesResponse.rows?.map(row => {
            const users = parseInt(row.metricValues[1].value, 10);
            return {
                path: row.dimensionValues[0].value,
                title: row.dimensionValues[1].value,
                views: parseInt(row.metricValues[0].value, 10),
                time: users > 0 ? (parseFloat(row.metricValues[2].value) / users).toFixed(0) : 0
            };
        }) || [];

        // Canales
        const channels = channelsResponse.rows?.map(row => ({
            channel: row.dimensionValues[0].value,
            users: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // Eventos y Chatbot
        let chatInteractions = 0;
        const events = eventsResponse.rows?.map(row => {
            const name = row.dimensionValues[0].value;
            const count = parseInt(row.metricValues[0].value, 10);
            if (name.includes('chat') || name.includes('message')) chatInteractions += count;
            return { name, count, users: parseInt(row.metricValues[1].value, 10) };
        }) || [];

        // Idiomas
        const langCounts = { en: 0, es: 0, it: 0, de: 0, sk: 0, pt: 0, other: 0 };
        const supportedLangs = ['en', 'es', 'it', 'de', 'sk', 'pt'];
        
        languagesResponse.rows?.forEach(row => {
            const path = row.dimensionValues[0].value;
            const users = parseInt(row.metricValues[0].value, 10);
            const match = path.match(/^\/([a-z]{2})(\/|$)/);
            const lang = match ? match[1] : 'en';
            if (supportedLangs.includes(lang)) langCounts[lang] += users;
            else langCounts.other += users;
        });

        const languagesData = Object.entries(langCounts)
            .filter(([_, v]) => v > 0)
            .map(([name, value]) => ({ name: name.toUpperCase(), value }));

        // Países del Consorcio
        const consortiumList = ['Spain', 'Italy', 'Slovakia', 'Austria', 'Portugal'];
        const consortiumCountries = consortiumList.map(c => {
            const match = countriesResponse.rows?.find(r => {
                const gaCountry = r.dimensionValues[0].value;
                if (gaCountry === c) return true;
                if (c === 'Slovakia' && gaCountry === 'Slovak Republic') return true;
                return false;
            });
            return { country: c, users: match ? parseInt(match.metricValues[0].value, 10) : 0 };
        }).sort((a,b) => b.users - a.users);

        // Tráfico de LinkedIn
        let linkedinUsers = 0;
        sourcesResponse.rows?.forEach(row => {
            const source = row.dimensionValues[0].value.toLowerCase();
            if (source.includes('linkedin')) {
                linkedinUsers += parseInt(row.metricValues[0].value, 10);
            }
        });

        // Article Stats: combinar visitas de página + clics al botón Article
        const articleViewsMap = {};
        articleViewsResponse.rows?.forEach(row => {
            const path = row.dimensionValues[0].value;
            // Extraer slug: la última parte de /xx/articles/SLUG o /xx/news/SLUG
            const slugMatch = path.match(/\/(?:articles|news)\/([^/?#]+)/);
            if (slugMatch) {
                const articleSlug = slugMatch[1];
                articleViewsMap[articleSlug] = (articleViewsMap[articleSlug] || 0) + parseInt(row.metricValues[0].value, 10);
            }
        });

        const articleClicksMap = {};
        articleClicksResponse.rows?.forEach(row => {
            const path = row.dimensionValues[0].value;
            // Extraer slug de /xx/articles/SLUG o /xx/news/SLUG igual que en las visitas
            const slugMatch = path.match(/\/(?:articles|news)\/([^/?#]+)/);
            if (slugMatch) {
                const articleSlug = slugMatch[1];
                articleClicksMap[articleSlug] = (articleClicksMap[articleSlug] || 0) + parseInt(row.metricValues[0].value, 10);
            }
        });

        // Cargar metadata de artículos desde en.json para enriquecer con título y socio
        let articleMeta = {};
        try {
            const enLocale = require(path.join(__dirname, '../src/locales/en.json'));
            const itemsList = [
                ...(enLocale?.news?.items_list || []),
                ...(enLocale?.ai_news?.items_list || [])
            ];
            itemsList.forEach(item => {
                if (item.slug) articleMeta[item.slug] = { title: item.title, partner: item.partner };
            });
        } catch (e) { /* Si falla, continuamos sin metadata */ }

        // Merge ambos mapas
        const allSlugs = new Set([...Object.keys(articleViewsMap), ...Object.keys(articleClicksMap)]);
        const articleStats = Array.from(allSlugs)
            .filter(slug => articleMeta[slug]) // Only keep articles currently in JSON
            .map(slug => ({
            slug,
            title: articleMeta[slug]?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            partner: articleMeta[slug]?.partner || null,
            views: articleViewsMap[slug] || 0,
            clicks: articleClicksMap[slug] || 0
        })).sort((a, b) => b.views - a.views);

        res.status(200).json({
            kpis,
            timeSeries,
            devices,
            os,
            countries,
            consortiumCountries,
            languages: languagesData,
            pages,
            channels,
            events,
            chatInteractions,
            linkedinUsers,
            articleStats
        });

    } catch (error) {
        console.error('GA4 API Error:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch GA data' });
    }
}