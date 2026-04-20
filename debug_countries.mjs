import fs from 'fs';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
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

async function test() {
  loadEnv();
  const propertyId = process.env.GA_PROPERTY_ID;
  let clientEmail = process.env.GA_CLIENT_EMAIL;
  let privateKey = process.env.GA_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKey) {
    console.error("Missing credentials");
    process.exit(1);
  }

  privateKey = privateKey.replace(/\\n/g, '\n');
  if (!privateKey.includes('-----BEGIN')) {
      privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
  }

  const client = new BetaAnalyticsDataClient({
      credentials: {
          client_email: clientEmail,
          private_key: privateKey,
      }
  });

  const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
  });

  console.log("GA4 Countries Data:");
  if (response.rows) {
      response.rows.forEach(r => {
        console.log(`- "${r.dimensionValues[0].value}": ${r.metricValues[0].value} users`);
      });
  } else {
      console.log("No rows found.");
  }
}

test().catch(console.error);
