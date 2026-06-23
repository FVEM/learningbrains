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

async function generateReport() {
  loadEnv();
  const propertyId = process.env.GA_PROPERTY_ID;
  let clientEmail = process.env.GA_CLIENT_EMAIL;
  let privateKey = process.env.GA_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKey) {
      console.error("=========================================================");
      console.error("ERROR: Faltan las credenciales de Google Analytics.");
      console.error("Por favor, asegúrate de que las siguientes variables de");
      console.error("entorno estén definidas en el archivo .env:");
      console.error("  - GA_PROPERTY_ID");
      console.error("  - GA_CLIENT_EMAIL");
      console.error("  - GA_PRIVATE_KEY");
      console.error("=========================================================");
      process.exit(1);
  }

  // Support for copying JSON directly into GA_PRIVATE_KEY
  if (privateKey?.trim().startsWith('{')) {
      try {
          const creds = JSON.parse(privateKey);
          privateKey = creds.private_key;
          if (!clientEmail) clientEmail = creds.client_email;
      } catch (e) {
          console.error("Error: GA_PRIVATE_KEY contains invalid JSON.");
          process.exit(1);
      }
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

  const startDate = '2025-12-01';
  const endDate = '2026-05-31';

  console.log(`Conectando con Google Analytics...`);
  console.log(`Generando informe para el periodo: ${startDate} al ${endDate}...`);

  const [
      [kpisResponse],
      [countriesResponse],
      [pagesResponse],
      [channelsResponse],
      [consortiumResponse]
  ] = await Promise.all([
      client.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate }],
          metrics: [
              { name: 'screenPageViews' },
              { name: 'activeUsers' },
              { name: 'sessions' },
              { name: 'userEngagementDuration' }
          ]
      }),
      client.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: 'country' }],
          metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
          orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
          limit: 20
      }),
      client.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
          metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 250
      }),
      client.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
          metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
          orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }]
      }),
      // Para justificación de proyectos europeos es clave el alcance del consorcio
      client.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: 'country' }],
          metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
          dimensionFilter: {
              filter: {
                  fieldName: 'country',
                  inListFilter: {
                      values: ['Spain', 'Italy', 'Slovakia', 'Slovak Republic', 'Austria', 'Portugal']
                  }
              }
          }
      })
  ]);

  const kpiRow = kpisResponse.rows?.[0];
  const views = kpiRow?.metricValues?.[0]?.value || '0';
  const users = kpiRow?.metricValues?.[1]?.value || '0';
  const sessions = kpiRow?.metricValues?.[2]?.value || '0';
  
  let markdown = `# Web Analytics Report - European Project Justification
**Period:** December 1, 2025 to May 31, 2026

## Website Structure and Content Overview
The project's web platform features a comprehensive multi-language system supporting English, Spanish, Italian, German, Portuguese, and Slovak. This ensures broad accessibility across the European Union. The website is strategically structured into the following main sections:

- **Home:** Serves as the main landing page, providing a high-level executive summary of the project. It outlines the core objectives, introduces the concept of applying Artificial Intelligence within Vocational Education and Training (VET), and highlights the immediate value proposition for industrial stakeholders.
- **The Project (About):** Offers an in-depth exploration of the project's background. It details the specific European context, the underlying needs that justified the creation of the Erasmus+ consortium, the target groups, and the long-term strategic goals the alliance aims to achieve.
- **Results:** Acts as the central repository for all intellectual outputs and project deliverables (PRs). This section is crucial for transparency and dissemination, allowing users to freely access the tangible results, research findings, and methodologies developed throughout the project's lifecycle.
- **Partners:** Introduces the European organizations that constitute the consortium. It provides background information on each partner institution, detailing their specific roles, expertise, and contributions to the project's success.
- **Project Events:** The official noticeboard for the Erasmus+ consortium. It is strictly dedicated to internal activities such as Transnational Meetings, project milestones, official newsletters, and consortium workshops. Content is visually classified with badges like **MEETING**, **PROJECT**, and **NEWSLETTER**.
- **News (AI, Business & Training):** An outward-focused curation hub dedicated to Artificial Intelligence applied to industry and VET. It features announcements for specialized AI training courses, research articles, thought leadership pieces, and industry updates. Content is classified with badges like **NEWS** and **ARTICLE**.
- **Resources:** A dedicated library of open-access materials. Here, vocational trainers, educators, and industry professionals can find practical guides, training materials, and interactive tools designed to facilitate the integration of AI in their daily operations.
- **Analytics:** An internal, restricted-access dashboard embedded within the website. It allows consortium partners to monitor real-time data, track visitor metrics, and evaluate the ongoing impact of web-related dissemination activities.
- **Contact:** Provides clear and direct communication channels, including a contact form, to reach the project coordinators and foster ongoing engagement with stakeholders.

### Transversal Web Features
- **EU Transparency & Legal:** The website strictly complies with European data protection regulations (Privacy and Cookies Policies). Importantly, it prominently features the mandatory Erasmus+ funding disclaimer and the EU emblem across all pages, ensuring proper visibility of the European Commission's support.
- **Responsive Design & Accessibility:** The platform is fully optimized for mobile devices and tablets, maximizing the reach and accessibility of the dissemination materials.
- **Social Media Integration:** The website acts as a central digital hub, seamlessly linking to the project's official social media channels to amplify the impact of results and news.

## 1. Global KPIs
- **Active Users:** ${users}
- **Total Sessions:** ${sessions}
- **Page Views:** ${views}

## 2. Impact in Consortium Countries
| Country | Users | Page Views |
|---------|-------|------------|
`;

  consortiumResponse.rows?.forEach(r => {
      markdown += `| ${r.dimensionValues[0].value} | ${r.metricValues[0].value} | ${r.metricValues[1].value} |\n`;
  });

  markdown += `\n## 3. Traffic by Country (Global Top 20)\n| Country | Users | Page Views |\n|---------|-------|------------|\n`;
  countriesResponse.rows?.forEach(r => {
      markdown += `| ${r.dimensionValues[0].value} | ${r.metricValues[0].value} | ${r.metricValues[1].value} |\n`;
  });

  markdown += `\n## 4. Most Visited Content (Grouped by Path)\n| Path | Page Title(s) | Page Views | Users (approx) |\n|------|---------------|------------|----------------|\n`;
  const aggregatedPages = {};
  pagesResponse.rows?.forEach(r => {
      const path = r.dimensionValues[0].value;
      const title = r.dimensionValues[1].value.replace(/\|/g, '-');
      const views = parseInt(r.metricValues[0].value, 10);
      const users = parseInt(r.metricValues[1].value, 10);
      if (!aggregatedPages[path]) {
          aggregatedPages[path] = { views: 0, users: 0, titles: new Set() };
      }
      aggregatedPages[path].views += views;
      aggregatedPages[path].users += users;
      aggregatedPages[path].titles.add(title);
  });

  const sortedPaths = Object.keys(aggregatedPages)
      .sort((a, b) => aggregatedPages[b].views - aggregatedPages[a].views)
      .slice(0, 30);

  sortedPaths.forEach(path => {
      const data = aggregatedPages[path];
      // Only show the first title if there are multiple to keep it clean, or join them
      const titles = Array.from(data.titles).join('<br>').replace(/\n/g, ' ');
      markdown += `| ${path} | ${titles} | ${data.views} | ${data.users} |\n`;
  });

  markdown += `\n## 5. Articles Performance\n| Path | Page Title(s) | Page Views | Users (approx) |\n|------|---------------|------------|----------------|\n`;
  const articlePaths = Object.keys(aggregatedPages)
      .filter(p => p.includes('/article') || p.includes('/articulo'))
      .sort((a, b) => aggregatedPages[b].views - aggregatedPages[a].views);
  
  articlePaths.forEach(path => {
      const data = aggregatedPages[path];
      const titles = Array.from(data.titles).join('<br>').replace(/\n/g, ' ');
      markdown += `| ${path} | ${titles} | ${data.views} | ${data.users} |\n`;
  });

  markdown += `\n## 6. Acquisition Channels\n| Channel | Users | Sessions |\n|---------|-------|----------|\n`;
  channelsResponse.rows?.forEach(r => {
      markdown += `| ${r.dimensionValues[0].value} | ${r.metricValues[0].value} | ${r.metricValues[1].value} |\n`;
  });

  const outputPath = path.join(process.cwd(), 'informe_visitas_diciembre2025_mayo2026.md');
  fs.writeFileSync(outputPath, markdown);
  console.log(`\n¡Éxito! Informe generado en: ${outputPath}`);
}

generateReport().catch(console.error);
