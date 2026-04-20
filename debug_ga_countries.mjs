import fs from 'fs';
import path from 'path';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

async function debug() {
    const root = process.cwd();
    const envPath = path.join(root, '.env');
    console.log("Reading .env from:", envPath);
    
    if (!fs.existsSync(envPath)) {
        console.error(".env not found at", envPath);
        return;
    }

    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    const env = {};
    lines.forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let key = match[1];
            let value = match[2] || '';
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            env[key] = value;
        }
    });

    const propertyId = env.GA_PROPERTY_ID;
    const clientEmail = env.GA_CLIENT_EMAIL;
    let privateKey = env.GA_PRIVATE_KEY;

    if (!propertyId || !clientEmail || !privateKey) {
        console.log("Keys found:", Object.keys(env));
        throw new Error("Missing keys in .env");
    }

    privateKey = privateKey.replace(/\\n/g, '\n');
    if (!privateKey.includes('-----BEGIN')) {
        privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
    }

    const client = new BetaAnalyticsDataClient({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey.trim(),
        }
    });

    console.log("Querying GA4...");
    const [response] = await client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
    });

    console.log("Countries found in last 30 days:");
    if (response.rows) {
        response.rows.forEach(row => {
            console.log(`- ${row.dimensionValues[0].value}: ${row.metricValues[0].value}`);
        });
    } else {
        console.log("No data found.");
    }
}

debug().catch(console.error);
