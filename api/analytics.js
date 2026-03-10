import { BetaAnalyticsDataClient } from '@google-analytics/data';

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
            },
            projectId: clientEmail.split('@')[1].split('.')[0] // fallback project id extract
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
            [eventsResponse]
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
                limit: 5
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
            // 6: Canales de Adquisición
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
                limit: 7
            })
        ]);

        // Procesar KPIs Generales
        const kpiRow = kpisResponse.rows?.[0];
        const kpis = kpiRow ? {
            views: parseInt(kpiRow.metricValues[0].value, 10),
            users: parseInt(kpiRow.metricValues[1].value, 10),
            newUsers: parseInt(kpiRow.metricValues[2].value, 10),
            avgEngagement: parseInt(kpiRow.metricValues[1].value, 10) > 0
                ? (parseFloat(kpiRow.metricValues[3].value) / parseInt(kpiRow.metricValues[1].value, 10)).toFixed(0)
                : 0,
            engagementRate: (parseFloat(kpiRow.metricValues[4].value) * 100).toFixed(1)
        } : { views: 0, users: 0, newUsers: 0, avgEngagement: 0, engagementRate: 0 };

        // Procesar Serie Temporal
        const timeSeries = timeSeriesResponse.rows?.map(row => {
            const dateStr = row.dimensionValues[0].value;
            const formattedDate = `${dateStr.substring(6, 8)}/${dateStr.substring(4, 6)}`; // DD/MM
            return {
                date: formattedDate,
                views: parseInt(row.metricValues[0].value, 10),
                users: parseInt(row.metricValues[1].value, 10)
            };
        }) || [];

        // Procesar Dispositivos
        const devices = devicesResponse.rows?.map(row => ({
            name: row.dimensionValues[0].value,
            value: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // Procesar Sistemas Operativos
        const os = osResponse.rows?.map(row => ({
            name: row.dimensionValues[0].value,
            value: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // Procesar Países
        const countries = countriesResponse.rows?.map(row => ({
            country: row.dimensionValues[0].value,
            users: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // Procesar Páginas
        const pages = pagesResponse.rows?.map(row => {
            const path = row.dimensionValues[0].value;
            const title = row.dimensionValues[1].value;
            const views = parseInt(row.metricValues[0].value, 10);
            const users = parseInt(row.metricValues[1].value, 10);
            const engDur = parseFloat(row.metricValues[2].value);
            const time = users > 0 ? (engDur / users).toFixed(0) : 0;
            return { path, title, views, time };
        }) || [];

        // Procesar Canales
        const channels = channelsResponse.rows?.map(row => ({
            channel: row.dimensionValues[0].value,
            users: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // Procesar Eventos
        const events = eventsResponse.rows?.map(row => ({
            name: row.dimensionValues[0].value,
            count: parseInt(row.metricValues[0].value, 10),
            users: parseInt(row.metricValues[1].value, 10)
        })) || [];

        // DEVOLVER TODO
        res.status(200).json({
            kpis,
            timeSeries,
            devices,
            os,
            countries,
            pages,
            channels,
            events
        });

    } catch (error) {
        console.error('GA4 API Error:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch GA data' });
    }
}
