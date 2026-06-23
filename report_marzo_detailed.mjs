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

  const startDate = '2024-01-01';
  const endDate = '2026-05-31';

  const [res] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'country' }, { name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      limit: 100000
  });

  const stats = {
      Home: {},
      TheProject: {},
      Results: {},
      Partners: {},
      ProjectEvents: {},
      News: {},
      Resources: {},
      Contact: {}
  };

  const slugs = [
      'first-learning-brains-newsletter',
      'kick-off-meeting-in-bilbao-launches',
      'ai-powered-learning-how-artificial-intelligence',
      'from-training-to-real-skills',
      'ai-and-jobs-the-real'
  ];
  const slugStats = {};
  slugs.forEach(s => slugStats[s] = {});

  res.rows?.forEach(r => {
      const country = r.dimensionValues[0].value;
      let pagePath = r.dimensionValues[1].value.toLowerCase();
      // Remove query params if any
      pagePath = pagePath.split('?')[0];

      const views = parseInt(r.metricValues[0].value, 10);
      const users = parseInt(r.metricValues[1].value, 10);

      const addStat = (section) => {
          if(!stats[section][country]) stats[section][country] = {views: 0, users: 0};
          stats[section][country].views += views;
          stats[section][country].users += users;
      };

      if (pagePath.match(/^\/([a-z]{2}\/?)?$/)) addStat('Home');
      if (pagePath.match(/^\/([a-z]{2}\/)?about\/?$/)) addStat('TheProject');
      if (pagePath.match(/^\/([a-z]{2}\/)?results\/?$/)) addStat('Results');
      if (pagePath.match(/^\/([a-z]{2}\/)?partners\/?$/)) addStat('Partners');
      if (pagePath.match(/^\/([a-z]{2}\/)?news\/?$/)) addStat('ProjectEvents');
      if (pagePath.match(/^\/([a-z]{2}\/)?(noticias|articles|articulos|notizie|nachrichten|artigos|clanky|novinky)\/?$/)) addStat('News');
      if (pagePath.match(/^\/([a-z]{2}\/)?resources\/?$/)) addStat('Resources');
      if (pagePath.match(/^\/([a-z]{2}\/)?contact\/?$/)) addStat('Contact');

      slugs.forEach(slug => {
          if (pagePath.includes(slug)) {
              if(!slugStats[slug][country]) slugStats[slug][country] = {views: 0, users: 0};
              slugStats[slug][country].views += views;
              slugStats[slug][country].users += users;
          }
      });
  });

  ['Home', 'TheProject', 'Results', 'Partners', 'ProjectEvents', 'News', 'Resources', 'Contact'].forEach(sec => {
      console.log(`=== ${sec} ===`);
      let tV = 0, tU = 0;
      Object.entries(stats[sec]).sort((a,b)=>b[1].views-a[1].views).forEach(([c, s]) => {
          console.log(`${c}: ${s.views} views, ${s.users} users`);
          tV += s.views;
          tU += s.users;
      });
      console.log(`TOTAL: ${tV} views, ${tU} users\n`);
  });

  console.log("=== SPECIFIC ARTICLES ===");
  slugs.forEach(slug => {
      console.log(`-- ${slug} --`);
      let sTotalV = 0, sTotalU = 0;
      Object.entries(slugStats[slug]).sort((a,b)=>b[1].views-a[1].views).forEach(([c, s]) => {
          console.log(`  ${c}: ${s.views} views, ${s.users} users`);
          sTotalV += s.views;
          sTotalU += s.users;
      });
      console.log(`  TOTAL: ${sTotalV} views, ${sTotalU} users\n`);
  });

}

run().catch(console.error);
