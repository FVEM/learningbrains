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
          console.error("Error al parsear GA_PRIVATE_KEY", e);
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

  const startDate = '2024-01-01'; // Beginning of time
  const endDate = '2026-05-31';

  // QUERY 1: Traffic to News/Events sections by Country
  const [res1] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'country' }, { name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      limit: 10000
  });

  const countryStats = {};
  let totalSectionViews = 0;
  let totalSectionUsers = 0; // rough aggregate

  res1.rows?.forEach(r => {
      const country = r.dimensionValues[0].value;
      const pagePath = r.dimensionValues[1].value.toLowerCase();
      const views = parseInt(r.metricValues[0].value, 10);
      const users = parseInt(r.metricValues[1].value, 10);

      if (pagePath.includes('/news') || pagePath.includes('/noticias') || pagePath.includes('/article')) {
          if (!countryStats[country]) {
              countryStats[country] = { views: 0, users: 0 };
          }
          countryStats[country].views += views;
          countryStats[country].users += users;
          totalSectionViews += views;
          totalSectionUsers += users;
      }
  });

  console.log("=== TRAFFIC BY COUNTRY (NEWS & EVENTS) ===");
  const sortedCountries = Object.entries(countryStats).sort((a, b) => b[1].views - a[1].views);
  sortedCountries.forEach(([c, stats]) => {
      console.log(`${c}: ${stats.views} views, ${stats.users} users`);
  });
  console.log(`TOTAL: ${totalSectionViews} views, ${totalSectionUsers} aggregated users\n`);


  // QUERY 2: Specific slugs
  const slugs = [
      'first-learning-brains-newsletter',
      'kick-off-meeting-in-bilbao-launches',
      'ai-powered-learning-how-artificial-intelligence',
      'from-training-to-real-skills',
      'ai-and-jobs-the-real'
  ];

  const [res2] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      limit: 10000
  });

  const slugStats = {};
  slugs.forEach(s => slugStats[s] = { views: 0, users: 0 });

  res2.rows?.forEach(r => {
      const pagePath = r.dimensionValues[0].value;
      const views = parseInt(r.metricValues[0].value, 10);
      const users = parseInt(r.metricValues[1].value, 10);

      slugs.forEach(slug => {
          if (pagePath.includes(slug)) {
              slugStats[slug].views += views;
              slugStats[slug].users += users;
          }
      });
  });

  console.log("=== SPECIFIC ARTICLES/NEWSLETTERS ===");
  slugs.forEach(slug => {
      console.log(`${slug}: ${slugStats[slug].views} views, ${slugStats[slug].users} users`);
  });

}

run().catch(console.error);
