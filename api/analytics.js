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
        const clientEmail = process.env.GA_CLIENT_EMAIL;
        const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

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

        // === CONSULTA 1: KPIs y Gráfico de Líneas (Tiempo) ===
        const [timeSeriesResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate: 'today' }],
            dimensions: [{ name: 'date' }],
            metrics: [
                { name: 'screenPageViews' },
                { name: 'activeUsers' },
                { name: 'bounceRate' },
                { name: 'userEngagementDuration' }
            ],
            orderBys: [{
                dimension: { dimensionName: 'date' },
                desc: false,
            }],
        });

        // Procesamos serie temporal y KPIs globales
        let totalViews = 0;
        let totalUsers = 0;
        let totalBounceRate = 0;
        let totalEngagementDuration = 0;
        let daysCount = 0;

        const timeSeries = timeSeriesResponse.rows?.map(row => {
            const dateStr = row.dimensionValues[0].value;
            const formattedDate = `${dateStr.substring(6, 8)}/${dateStr.substring(4, 6)}`; // DD/MM
            const views = parseInt(row.metricValues[0].value, 10);
            const users = parseInt(row.metricValues[1].value, 10);
            const bounceRate = parseFloat(row.metricValues[2].value);
            const engagement = parseFloat(row.metricValues[3].value);

            totalViews += views;
            totalUsers += users;
            totalBounceRate += bounceRate;
            totalEngagementDuration += engagement;
            daysCount++;

            return {
                date: formattedDate,
                views,
                users
            };
        }) || [];

        const kpis = {
            views: totalViews,
            users: totalUsers,
            bounceRate: daysCount > 0 ? (totalBounceRate / daysCount * 100).toFixed(1) : 0,
            avgEngagement: totalUsers > 0 ? (totalEngagementDuration / totalUsers).toFixed(0) : 0
        };

        // === CONSULTA 2: Dispositivos ===
        const [devicesResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate: 'today' }],
            dimensions: [{ name: 'deviceCategory' }],
            metrics: [{ name: 'activeUsers' }]
        });

        const devices = devicesResponse.rows?.map(row => ({
            name: row.dimensionValues[0].value,
            value: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // === CONSULTA 3: Países (Top 5) ===
        const [countriesResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate: 'today' }],
            dimensions: [{ name: 'country' }],
            metrics: [{ name: 'activeUsers' }],
            orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
            limit: 5
        });

        const countries = countriesResponse.rows?.map(row => ({
            country: row.dimensionValues[0].value,
            users: parseInt(row.metricValues[0].value, 10)
        })) || [];

        // === CONSULTA 4: Páginas Más Vistas (Top 5) ===
        const [pagesResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate: 'today' }],
            dimensions: [{ name: 'pagePath' }],
            metrics: [
                { name: 'screenPageViews' },
                { name: 'userEngagementDuration' },
                { name: 'activeUsers' }
            ],
            orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
            limit: 5
        });

        const pages = pagesResponse.rows?.map(row => {
            const path = row.dimensionValues[0].value;
            const views = parseInt(row.metricValues[0].value, 10);
            const engDur = parseFloat(row.metricValues[1].value);
            const users = parseInt(row.metricValues[2].value, 10);
            const time = users > 0 ? (engDur / users).toFixed(0) : 0;

            return { path, views, time };
        }) || [];

        // === DEVOLVER TODO ===
        res.status(200).json({
            kpis,
            timeSeries,
            devices,
            countries,
            pages
        });

    } catch (error) {
        console.error('GA4 API Error:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch GA data' });
    }
}
