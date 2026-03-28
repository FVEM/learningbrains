import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Initialize the GA4 client
// In Vercel, these should be set as environment variables
const propertyId = process.env.GA_PROPERTY_ID;
const credentials = {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

export default async function handler(req, res) {
    if (!propertyId || !credentials.client_email || !credentials.private_key) {
        return res.status(500).json({ error: 'GA4 credentials not configured' });
    }

    try {
        // --- Date Range Calculation for Trends ---
        // Current Period: Last 30 days
        // Previous Period: 30 days before that
        const now = new Date();
        const endDate = now.toISOString().split('T')[0];
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        const startDate = thirtyDaysAgo.toISOString().split('T')[0];
        
        const sixtyDaysAgo = new Date(thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30));
        const prevStartDate = sixtyDaysAgo.toISOString().split('T')[0];
        const prevEndDate = startDate; // The day before current period starts

        // Shared Date Ranges
        const dateRanges = [
            { startDate, endDate, name: 'current_period' },
            { startDate: prevStartDate, endDate: prevEndDate, name: 'previous_period' }
        ];

        // 1. Fetch Main KPIs with Trend Comparison
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges,
            dimensions: [{ name: 'date' }], // Needed to separate ranges in response
            metrics: [
                { name: 'activeUsers' },
                { name: 'sessions' },
                { name: 'averageSessionDuration' },
                { name: 'screenPageViews' }
            ],
        });

        // 2. Fetch Events (Chatbot + Resource Downloads)
        const [eventResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges,
            dimensions: [{ name: 'eventName' }],
            metrics: [{ name: 'eventCount' }],
        });

        // 3. Fetch Geographic/Consortium Data
        const [geoResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate: '2024-01-01', endDate: 'today' }], // Cumulative for reach
            dimensions: [{ name: 'country' }],
            metrics: [{ name: 'activeUsers' }],
        });

        // 4. Fetch Language Engagement
        const [langResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
            dimensions: [{ name: 'language' }],
            metrics: [{ name: 'activeUsers' }],
        });

        // --- Data Processing & Trend Calculation ---
        const processMetrics = (rows) => {
            const current = { users: 0, sessions: 0, duration: 0, views: 0, count: 0 };
            const previous = { users: 0, sessions: 0, duration: 0, views: 0, count: 0 };

            rows?.forEach(row => {
                const isCurrent = row.dimensionValues[0].value === 'current_period' || !row.dimensionValues[0].value;
                const target = isCurrent ? current : previous;
                
                // Note: Index depends on metric order in runReport
                target.users += parseInt(row.metricValues[0].value);
                target.sessions += parseInt(row.metricValues[1].value);
                target.duration += parseFloat(row.metricValues[2].value);
                target.views += parseInt(row.metricValues[3].value);
                target.count++;
            });

            // Average the duration
            if (current.count > 0) current.duration = current.duration / current.count;
            if (previous.count > 0) previous.duration = previous.duration / previous.count;

            return { current, previous };
        };

        const metricsData = processMetrics(response.rows);
        
        // Calculate Trend Helpers
        const calcTrend = (curr, prev) => {
            if (!prev || prev === 0) return 100;
            return Math.round(((curr - prev) / prev) * 100);
        };

        // Extract Event Stats
        const getEventCount = (rows, name, period = 'current_period') => {
            const row = rows?.find(r => r.dimensionValues[0].value === name);
            return row ? parseInt(row.metricValues[0].value) : 0;
        };

        // Custom "Erasmus Impact" Events
        const pdfDownloads = getEventCount(eventResponse.rows, 'file_download') + getEventCount(eventResponse.rows, 'pdf_download');
        const chatInteractions = getEventCount(eventResponse.rows, 'chat_interaction');

        // Consortium Reach (Cumulative)
        const consortiumCountries = ['Spain', 'Italy', 'Austria', 'Slovenia', 'Belgium'];
        const totalReach = geoResponse.rows?.reduce((acc, row) => acc + parseInt(row.metricValues[0].value), 0) || 0;
        const consortiumUsers = geoResponse.rows
            ?.filter(row => consortiumCountries.includes(row.dimensionValues[0].value))
            .reduce((acc, row) => acc + parseInt(row.metricValues[0].value), 0) || 0;

        // Timeline Data for Sparklines (Last 30 days)
        const timeline = response.rows
            ?.filter(r => r.dimensionValues[0].value === 'current_period')
            .map(row => ({
                date: row.dimensionValues[1]?.value, // You might need to add date back to dimensions
                value: parseInt(row.metricValues[0].value)
            })) || [];

        const dashboardData = {
            overview: {
                users: {
                    value: metricsData.current.users,
                    trend: calcTrend(metricsData.current.users, metricsData.previous.users),
                    prevValue: metricsData.previous.users
                },
                sessions: {
                    value: metricsData.current.sessions,
                    trend: calcTrend(metricsData.current.sessions, metricsData.previous.sessions),
                },
                pageViews: {
                    value: metricsData.current.views,
                    trend: calcTrend(metricsData.current.views, metricsData.previous.views),
                },
                avgDuration: {
                    value: Math.round(metricsData.current.duration),
                    trend: calcTrend(metricsData.current.duration, metricsData.previous.duration),
                }
            },
            impact: {
                pdfDownloads: {
                    value: pdfDownloads,
                    label: "Resource Dissemination"
                },
                chatbotEngagement: {
                    value: chatInteractions,
                    label: "AI Guidance Provided"
                },
                consortiumReach: {
                    percentage: totalReach > 0 ? Math.round((consortiumUsers / totalReach) * 100) : 0,
                    value: consortiumUsers
                }
            },
            languages: langResponse.rows?.map(row => ({
                lang: row.dimensionValues[0].value,
                users: parseInt(row.metricValues[0].value)
            })).slice(0, 5) || [],
            countries: geoResponse.rows?.map(row => ({
                country: row.dimensionValues[0].value,
                users: parseInt(row.metricValues[0].value)
            })).slice(0, 8) || [],
            lastUpdated: new Date().toISOString()
        };

        // Success Response with Vercel Edge Caching (300s = 5 mins)
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
        return res.status(200).json(dashboardData);

    } catch (error) {
        console.error('GA4 Error:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch analytics',
            details: error.message 
        });
    }
}
