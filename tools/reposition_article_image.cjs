const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];
const slug = 'kick-off-meeting-in-bilbao-launches';
const imageMarker = '![Kick-off Meeting in Bilbao – Learning BRAINS](images/news/bilbaokickoff.jpg)';

locales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  ['ai_news', 'news'].forEach(section => {
    if (!data[section] || !Array.isArray(data[section].items_list)) return;
    data[section].items_list.forEach(item => {
      if (item.slug !== slug || !item.content) return;

      // Remove existing image marker from wherever it is
      const markerRegex = /\n?!\[Kick-off Meeting[^\]]*\]\([^)]+\)\n?/g;
      let newContent = item.content.replace(markerRegex, '\n');

      // Split into paragraphs
      const paragraphs = newContent.split('\n').filter(p => p.trim());
      
      if (paragraphs.length >= 2) {
        // Insert image after paragraph 2 (index 1), before paragraph 3
        paragraphs.splice(2, 0, imageMarker);
        item.content = paragraphs.join('\n');
        changed = true;
        console.log(`✓ ${lang}: image moved to after paragraph 2 (${paragraphs.length} paragraphs total)`);
      }
    });
  });

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
});
