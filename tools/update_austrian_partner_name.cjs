const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const slug = 'kick-off-meeting-in-bilbao-launches';

const oldName = "Wirtschaftskammer Steiermark";
const newName = "Room466";
const url = "https://room466.at/en/home-english/";

locales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const news = data.ai_news?.items_list || [];
  const article = news.find(item => item.slug === slug);

  if (article && article.content) {
    // Replace the specific link pattern
    const oldLink = `[${oldName}](${url})`;
    const newLink = `[${newName}](${url})`;
    
    if (article.content.includes(oldLink)) {
        article.content = article.content.replace(oldLink, newLink);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Updated partner name in ${lang}.json`);
    } else {
        // Fallback in case it wasn't linked yet for some reason
        article.content = article.content.replace(oldName, newLink);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Replaced plain name in ${lang}.json`);
    }
  }
});
