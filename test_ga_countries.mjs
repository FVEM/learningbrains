import fs from 'fs';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

function loadEnv() {
  const content = fs.readFileSync('.env', 'utf8');
  content.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const idx = line.indexOf('=');
      if (idx !== -1) {
        const key = line.substring(0, idx).trim();
        let val = line.substring(idx + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.substring(1, val.length - 1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.substring(1, val.length - 1);
        process.env[key] = val;
      }
    }
  });
}

async function test() {
  loadEnv();
  const propertyId = process.env.GA_PROPERTY_ID;
  let clientEmail = process.env.GA_CLIENT_EMAIL;
  let privateKey = process.env.GA_PRIVATE_KEY;

  if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n');
      if (!privateKey.includes('-----BEGIN')) {
          privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
      }
  }

  const client = new BetaAnalyticsDataClient({
      credentials: {
          client_email: clientEmail,
          private_key: privateKey,
      }
  });

  const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '180daysAgo', endDate: 'today' }], // Wait, 'today' and startDate...
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }]
  });

  console.log("Countries:");
  response.rows.forEach(r => {
    console.log(r.dimensionValues[0].value, r.metricValues[0].value);
  });
}

test().catch(console.error);
