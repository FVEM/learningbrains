import { BetaAnalyticsDataClient } from '@google-analytics/data';

export default async function handler(req, res) {
    // Configuración de CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Caché de Vercel (5 minutos)
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { range = '30days' } = req.query;

        // 1. Validar variables de entorno
        const propertyId = process.env.GA_PROPERTY_ID;
        let clientEmail = process.env.GA_CLIENT_EMAIL;
        let privateKey = process.env.GA_PRIVATE_KEY;

        // Soporte para pegar el JSON entero de la Service Account en GA_PRIVATE_KEY
        if (privateKey?.trim().startsWith('{')) {
            try {
                const creds = JSON.parse(privateKey);
                privateKey = creds.private_key;
                if (!clientEmail) clientEmail = creds.client_email;
            } catch (e) {
                return res.status(500).json({ error: 'GA_PRIVATE_KEY contains invalid JSON.' });
            }
        }

        // Normalizar saltos de línea y cabeceras de la clave privada
        if (privateKey) {
            privateKey = privateKey.replace(/\\n/g, '\n');
            if (!privateKey.includes('-----BEGIN')) {
                privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
            }
        }

        if (!propertyId || !clientEmail || !privateKey) {
            return res.status(500).json({
                error: 'Missing Google Analytics credentials (GA_PROPERTY_ID, GA_CLIENT_EMAIL, GA_PRIVATE_KEY).'
            });
        }

        // 2. Calcular rangos de fechas
        let startDate, endDate = 'today', prevStartDate, prevEndDate;
        if (range === '7days') {
            startDate = '7daysAgo';
            prevStartDate = '14daysAgo';
            prevEndDate = '8daysAgo';
        } else if (range === 'year') {
            startDate = '365daysAgo';
            prevStartDate = '730daysAgo';
            prevEndDate = '366daysAgo';
        } else {
            startDate = '30daysAgo';
            prevStartDate = '60daysAgo';
            prevEndDate = '31daysAgo';
        }

        // 3. Inicializar cliente de GA4
        const analyticsDataClient = new BetaAnalyticsDataClient({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            }
        });

        // 4. Ejecutar consultas en paralelo
        const [
            [kpisResponse],
            [prevKpisResponse],
            [timeSeriesResponse],
            [devicesResponse],
            [countriesResponse],
            [pagesResponse],
            [channelsResponse],
            [eventsResponse]
        ] = await Promise.all([
            // index 0: KPIs Actuales
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
            // index 1: KPIs Previos (Tendencias)
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate: prevStartDate, endDate: prevEndDate }],
                metrics: [
                    { name: 'screenPageViews' },
                    { name: 'activeUsers' },
                    { name: 'newUsers' },
                    { name: 'userEngagementDuration' },
                    { name: 'engagementRate' }
                ]
            }),
            // index 2: Serie Temporal
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'date' }],
                metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
                orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }]
            }),
            // index 3: Dispositivos
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'deviceCategory' }],
                metrics: [{ name: 'activeUsers' }]
            }),
            // index 4: Países
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'country' }],
                metrics: [{ name: 'activeUsers' }],
                orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }]
            }),
            // index 5: Páginas
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
                metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'userEngagementDuration' }],
                orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
                limit: 10
            }),
            // index 6: Canales
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'sessionDefaultChannelGroup' }],
                metrics: [{ name: 'activeUsers' }],
                orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }]
            }),
            // index 7: Eventos (Chat, PDF, etc.)
            analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate, endDate: 'today' }],
                dimensions: [{ name: 'eventName' }],
                metrics: [{ name: 'eventCount' }],
                orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }]
            })
        ]);

        // 5. Procesar Datos para el Frontend

        // KPIs
        const calculateTrend = (curr, prev) => {
            if (!prev || prev === 0) return 0;
            return parseFloat(((curr - prev) / prev * 100).toFixed(1));
        };

        const kRow = kpisResponse.rows?.[0]?.metricValues || [];
        const pRow = prevKpisResponse.rows?.[0]?.metricValues || [];

        const kpis = {
            views: { 
                value: parseInt(kRow[0]?.value || 0), 
                trend: calculateTrend(parseInt(kRow[0]?.value || 0), parseInt(pRow[0]?.value || 0)) 
            },
            users: { 
                value: parseInt(kRow[1]?.value || 0), 
                trend: calculateTrend(parseInt(kRow[1]?.value || 0), parseInt(pRow[1]?.value || 0)) 
            },
            newUsers: { 
                value: parseInt(kRow[2]?.value || 0), 
                trend: calculateTrend(parseInt(kRow[2]?.value || 0), parseInt(pRow[2]?.value || 0)) 
            },
            avgEngagement: { 
                value: parseInt(kRow[1]?.value || 0) > 0 
                    ? Math.round(parseFloat(kRow[3]?.value || 0) / parseInt(kRow[1]?.value || 0)) 
                    : 0 
            },
            engagementRate: { 
                value: (parseFloat(kRow[4]?.value || 0) * 100).toFixed(1),
                trend: calculateTrend(parseFloat(kRow[4]?.value || 0), parseFloat(pRow[4]?.value || 0))
            }
        };

        // Serie Temporal
        const timeSeries = timeSeriesResponse.rows?.map(row => {
            const d = row.dimensionValues[0].value;
            return {
                date: `${d.substring(6, 8)}/${d.substring(4, 6)}`,
                views: parseInt(row.metricValues[0].value),
                users: parseInt(row.metricValues[1].value)
            };
        }) || [];

        // Países del Consorcio (Específicos para el proyecto)
        const projectCountries = ['Spain', 'Italy', 'Austria', 'Slovakia', 'Belgium'];
        const consortiumCountries = countriesResponse.rows
            ?.filter(row => projectCountries.includes(row.dimensionValues[0].value))
            .map(row => ({
                country: row.dimensionValues[0].value,
                users: parseInt(row.metricValues[0].value)
            })) || [];
        
        // Si no hay datos de consorcio, usar los top countries
        if (consortiumCountries.length === 0) {
            countriesResponse.rows?.slice(0, 5).forEach(row => {
                consortiumCountries.push({
                    country: row.dimensionValues[0].value,
                    users: parseInt(row.metricValues[0].value)
                });
            });
        }

        // Dispositivos
        const devices = devicesResponse.rows?.map(row => ({
            name: row.dimensionValues[0].value,
            value: parseInt(row.metricValues[0].value)
        })) || [];

        // Idiomas (Deducidos del path de la página)
        const langMap = { ES: 0, EN: 0, IT: 0, SK: 0, DE: 0, PT: 0 };
        pagesResponse.rows?.forEach(row => {
            const path = row.dimensionValues[0].value;
            const users = parseInt(row.metricValues[1].value);
            const match = path.match(/^\/([a-z]{2})(\/|$)/);
            if (match) {
                const l = match[1].toUpperCase();
                if (langMap[l] !== undefined) langMap[l] += users;
            } else if (path === '/' || path.startsWith('/?')) {
                langMap.EN += users;
            }
        });
        const languages = Object.entries(langMap)
            .filter(([_, v]) => v > 0)
            .map(([name, value]) => ({ name, value }));

        // Páginas Top
        const pages = pagesResponse.rows?.slice(0, 5).map(row => ({
            path: row.dimensionValues[0].value,
            title: row.dimensionValues[1].value,
            views: parseInt(row.metricValues[0].value),
            time: parseInt(row.metricValues[1].value) > 0 
                ? Math.round(parseFloat(row.metricValues[2].value) / parseInt(row.metricValues[1].value)) 
                : 0
        })) || [];

        // Canales
        const channels = channelsResponse.rows?.slice(0, 5).map(row => ({
            channel: row.dimensionValues[0].value,
            users: parseInt(row.metricValues[0].value)
        })) || [];

        // Eventos
        let chatInteractions = 0;
        let pdfDownloads = 0;
        eventsResponse.rows?.forEach(row => {
            const name = row.dimensionValues[0].value;
            const count = parseInt(row.metricValues[0].value);
            if (name.includes('chat') || name === 'chat_interaction') chatInteractions += count;
            if (name === 'file_download' || name.includes('pdf')) pdfDownloads += count;
        });

        // Respuesta Final
        res.status(200).json({
            kpis,
            timeSeries,
            consortiumCountries,
            devices,
            languages,
            pages,
            channels,
            chatInteractions,
            pdfDownloads,
            lastUpdated: new Date().toISOString()
        });

    } catch (error) {
        console.error('GA4 API Error:', error);
        res.status(500).json({ 
            error: error.message || 'Internal Server Error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
