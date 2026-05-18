const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const slug = 'kick-off-meeting-in-bilbao-launches';

const alts = {
  en: "Kick-off Meeting in Bilbao - Consortium Partners",
  es: "Reunión de lanzamiento en Bilbao - Socios del Consorcio",
  de: "Kick-off-Meeting in Bilbao - Konsortiumspartner",
  it: "Riunione di avvio a Bilbao - Partner del Consorzio",
  pt: "Reunião de arranque em Bilbau - Parceiros do Consórcio",
  sk: "Zahajovacie stretnutie v Bilbau - Partneri konzorcia"
};

const photoPath = "images/news/bilbaokickoff.jpg";

locales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const news = data.ai_news?.items_list || [];
  const article = news.find(item => item.slug === slug);

  if (article && article.content) {
    if (!article.content.includes(photoPath)) {
      const markdownImg = `\n\n![${alts[lang]}](${photoPath})\n\n`;
      const target = "https://mediacreativa.eu/)";
      const index = article.content.indexOf(target);
      if (index !== -1) {
        let insertPos = index + target.length;
        if (article.content[insertPos] === '.') {
          insertPos++;
        }
        const before = article.content.substring(0, insertPos).trim();
        const after = article.content.substring(insertPos).trim();
        article.content = before + markdownImg + after;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Inserted Bilbao photo in ${lang}.json`);
      } else {
        console.log(`Target Media Creativa not found in ${lang}.json`);
      }
    } else {
      console.log(`Bilbao photo already exists in ${lang}.json`);
    }
  }
});
