const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

const targetStarts = {
  'ai-powered-learning-how-artificial-intelligence': {
    'en': 'AI-driven learning tools boost knowledge',
    'es': 'Las herramientas de aprendizaje impulsadas por IA aumentan',
    'de': 'Da Branchen einer immer schnelleren',
    'it': "Strumenti di apprendimento guidati dall'IA potenziano",
    'pt': 'Ferramentas de aprendizagem impulsionadas por IA aumentam',
    'sk': 'Nástroje na učenie poháňané umelej inteligenciou zvyšujú'
  },
  'ai-and-jobs-the-real': {
    'en': 'Recent news has once again',
    'es': 'Las noticias recientes han vuelto',
    'de': 'Aktuelle Nachrichten haben erneut',
    'it': 'Le recenti notizie hanno nuovamente',
    'pt': 'Notícias recentes mais uma vez trouxeram',
    'sk': 'Nedávne správy opäť upriamili'
  },
  'kick-off-meeting-in-bilbao-launches': {
    'en': 'The city of Bilbao recently',
    'es': 'Recientemente, la ciudad de Bilbao',
    'de': 'Die Stadt Bilbao war kürzlich',
    'it': 'La città di Bilbao ha recentemente',
    'pt': 'A cidade de Bilbao recentemente',
    'sk': 'Mesto Bilbao nedávno hostilo'
  }
};

locales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    let changed = false;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    ['ai_news', 'news'].forEach(section => {
      if (data[section] && Array.isArray(data[section].items_list)) {
        data[section].items_list.forEach(item => {
          if (item.type === 'ARTICLE' && item.slug && item.content) {
            const startMap = targetStarts[item.slug];
            if (startMap && startMap[lang]) {
              const startText = startMap[lang];
              const idx = item.content.indexOf(startText);
              if (idx > 0) { // Boilerplate or title/link precedes the startText
                item.content = item.content.substring(idx).trim();
                changed = true;
                console.log(`Cleaned boilerplate for "${item.slug}" in ${lang}.json`);
              }
            }
          }
        });
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  }
});
