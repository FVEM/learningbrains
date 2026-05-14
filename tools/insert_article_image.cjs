const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const slug = 'kick-off-meeting-in-bilbao-launches';
const imageMarker = '![Kick-off Meeting in Bilbao – Learning BRAINS](bilbaokickoff.jpg)';

locales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  ['ai_news', 'news'].forEach(section => {
    if (!data[section] || !Array.isArray(data[section].items_list)) return;
    data[section].items_list.forEach(item => {
      if (item.slug !== slug || !item.content) return;
      // Only insert if not already present
      if (item.content.includes('bilbaokickoff.jpg')) {
        console.log(`${lang}: image already present, skipping.`);
        return;
      }
      // Insert image marker after the first paragraph (first \n)
      const firstBreak = item.content.indexOf('\n');
      if (firstBreak === -1) {
        // No paragraphs yet — prepend
        item.content = `${imageMarker}\n${item.content}`;
      } else {
        item.content =
          item.content.slice(0, firstBreak) +
          '\n' + imageMarker +
          item.content.slice(firstBreak);
      }
      changed = true;
      console.log(`✓ ${lang}: image marker inserted after paragraph 1`);
    });
  });

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
});
