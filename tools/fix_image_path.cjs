const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const slug = 'kick-off-meeting-in-bilbao-launches';

locales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  ['ai_news', 'news'].forEach(section => {
    if (!data[section] || !Array.isArray(data[section].items_list)) return;
    data[section].items_list.forEach(item => {
      if (item.slug !== slug || !item.content) return;
      // Fix wrong path: bilbaokickoff.jpg -> images/news/bilbaokickoff.jpg
      if (item.content.includes('(bilbaokickoff.jpg)')) {
        item.content = item.content.replace(
          '(bilbaokickoff.jpg)',
          '(images/news/bilbaokickoff.jpg)'
        );
        changed = true;
        console.log(`✓ ${lang}: path corrected`);
      } else if (item.content.includes('images/news/bilbaokickoff.jpg')) {
        console.log(`${lang}: already correct, skipping.`);
      }
    });
  });

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
});
