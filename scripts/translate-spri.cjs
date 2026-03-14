const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

// Dictionary for the new SPRI item
const newTranslations = {
    'en': {
        title: "SPRI Grants: Artificial Intelligence 2026",
        description: "Apply Artificial Intelligence to transform industrial processes and gain competitiveness"
    },
    'es': {
        title: "Ayudas SPRI: Inteligencia Artificial 2026",
        description: "Aplica Inteligencia Artificial para transformar procesos industriales y ganar competitividad"
    },
    'de': {
        title: "SPRI-Förderungen: Künstliche Intelligenz 2026",
        description: "KI zur Transformation industrieller Prozesse und Steigerung der Wettbewerbsfähigkeit einsetzen"
    },
    'it': {
        title: "Contributi SPRI: Intelligenza Artificiale 2026",
        description: "Applicare l'Intelligenza Artificiale per trasformare i processi industriali e guadagnare competitività"
    },
    'pt': {
        title: "Apoios SPRI: Inteligência Artificial 2026",
        description: "Aplicar a Inteligência Artificial para transformar processos industriais e ganhar competitividade"
    },
    'sk': {
        title: "Granty SPRI: Umelá inteligencia 2026",
        description: "Využite umelú inteligenciu na transformáciu priemyselných procesov a zvýšenie konkurencieschopnosti"
    }
};

locales.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    json.ai_news.items_list = json.ai_news.items_list.map(item => {
        // Find the SPRI item (using the Spanish title as key if translated, or English if detected)
        if (item.title.includes("SPRI") || item.title.includes("Ayudas")) {
            return {
                ...item,
                title: newTranslations[lang].title,
                description: newTranslations[lang].description,
                image: "/images/news/spri_ai_2026.png", // Keep the generated image
                badge: item.badge || item.category || "GENERAL/EU"
            };
        }
        return item;
    });

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log(`Updated translations for ${lang}`);
});
