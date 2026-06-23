import fs from 'fs';
import path from 'path';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
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

async function run() {
  loadEnv();
  const propertyId = process.env.GA_PROPERTY_ID;
  let clientEmail = process.env.GA_CLIENT_EMAIL;
  let privateKey = process.env.GA_PRIVATE_KEY;

  if (privateKey?.trim().startsWith('{')) {
      try {
          const creds = JSON.parse(privateKey);
          clientEmail = creds.client_email;
          privateKey = creds.private_key;
      } catch (e) {
          console.error("Error al parsear GA_PRIVATE_KEY como JSON", e);
      }
  } else {
      privateKey = privateKey?.replace(/\\n/g, '\n');
  }

  const client = new BetaAnalyticsDataClient({
      credentials: {
          client_email: clientEmail,
          private_key: privateKey,
      }
  });

  const startDate = '2026-02-01';
  const endDate = '2026-03-31';

  const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      dimensionFilter: {
          filter: {
              fieldName: 'pagePath',
              stringFilter: {
                  matchType: 'CONTAINS',
                  value: 'kick-off'
              }
          }
      }
  });

  let totalViews = 0;
  let totalUsers = 0;

  console.log("Paths found:");
  response.rows?.forEach(r => {
      const path = r.dimensionValues[0].value;
      const title = r.dimensionValues[1].value;
      const views = parseInt(r.metricValues[0].value, 10);
      const users = parseInt(r.metricValues[1].value, 10);
      totalViews += views;
      totalUsers += users;
      console.log(`- ${path}: ${views} views, ${users} users (${title})`);
  });

  console.log(`\nTotal: ${totalViews} views, approx ${totalUsers} users`);
}

run().catch(console.error);
