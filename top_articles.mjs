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

  const startDate = '2025-12-01';
  const endDate = '2026-05-31';

  const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      limit: 10000
  });

  const aggregatedArticles = {};

  response.rows?.forEach(r => {
      const pagePath = r.dimensionValues[0].value;
      const title = r.dimensionValues[1].value;
      const views = parseInt(r.metricValues[0].value, 10);
      const users = parseInt(r.metricValues[1].value, 10);
      
      // Match paths that have an article/news slug at the end
      // E.g. /en/news/ai-powered-learning... or /articles/ai-powered-learning...
      const match = pagePath.match(/(?:\/news\/|\/articles\/|\/noticias\/)(.+)$/);
      if (match) {
          const slug = match[1];
          if (!aggregatedArticles[slug]) {
              aggregatedArticles[slug] = {
                  slug: slug,
                  views: 0,
                  users: 0,
                  titles: new Set()
              };
          }
          aggregatedArticles[slug].views += views;
          aggregatedArticles[slug].users += users;
          aggregatedArticles[slug].titles.add(title);
      }
  });

  const sortedArticles = Object.values(aggregatedArticles).sort((a, b) => b.views - a.views);

  console.log("Top Articles/News (Aggregated across all languages):");
  sortedArticles.forEach((a, idx) => {
      console.log(`${idx + 1}. ${a.slug}`);
      console.log(`   Views: ${a.views}, Users: ${a.users}`);
      console.log(`   Titles: ${Array.from(a.titles).join(' | ')}`);
      console.log('---');
  });
}

run().catch(console.error);
