const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const slug = 'kick-off-meeting-in-bilbao-launches';

const partners = [
  { name: "Federacion Vizcaina de Empresas del Metal", url: "https://www.fvem.es" },
  { name: "Federación Vizcaína de Empresas del Metal", url: "https://www.fvem.es" },
  { name: "Confindustria Veneto SIAV S.r.l", url: "https://www.siav.net/wp/" },
  { name: "Wirtschaftskammer Steiermark", url: "https://room466.at/en/home-english/" },
  { name: "Slovak Business Agency", url: "https://www.sbagency.sk/" },
  { name: "Sparkling Intuition", url: "https://sparkling-intuition.eu/" },
  { name: "Media Creativa 2020, S.L.", url: "https://mediacreativa.eu/" }
];

locales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const news = data.ai_news?.items_list || [];
  const article = news.find(item => item.slug === slug);

  if (article && article.content) {
    let content = article.content;

    partners.forEach(partner => {
      // Regex to find the partner name but NOT if it's already part of a markdown link
      // We look for the name and ensure it's not preceded by [ and not followed by ](
      const escapedName = partner.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?<!\\[)${escapedName}(?!\\]\\()`, 'g');
      content = content.replace(regex, `[${partner.name}](${partner.url})`);
    });

    article.content = content;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated links in ${lang}.json`);
  }
});
