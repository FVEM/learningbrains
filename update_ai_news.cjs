const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

const translations = {
    en: {
        title: "Copilot in the enterprise: real productivity in a Microsoft environment",
        description: "Productivity with Copilot in an industrial enterprise, with safe use of the tool",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3232&task=cursos.detalle&",
        category: "Training"
    },
    es: {
        title: "Copilot en la empresa: productividad real en entorno Microsoft",
        description: "Productividad con Copilot en la empresa industrial, con uso seguro de la herramienta.",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3232&task=cursos.detalle&",
        category: "Training"
    },
    de: {
        title: "Copilot im Unternehmen: echte Produktivität in einer Microsoft-Umgebung",
        description: "Produktivität mit Copilot in einem Industrieunternehmen bei sicherem Einsatz des Tools",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3232&task=cursos.detalle&",
        category: "Training"
    },
    it: {
        title: "Copilot in azienda: produttività reale in un ambiente Microsoft",
        description: "Produttività con Copilot in un'azienda industriale, con l'uso sicuro dello strumento",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3232&task=cursos.detalle&",
        category: "Training"
    },
    pt: {
        title: "Copilot na empresa: produtividade real em um ambiente Microsoft",
        description: "Produtividade com Copilot em uma empresa industrial, com o uso seguro da ferramenta",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3232&task=cursos.detalle&",
        category: "Training"
    },
    sk: {
        title: "Copilot v podniku: skutočná produktivita v prostredí Microsoft",
        description: "Produktivita s Copilotom v priemyselnom podniku pri bezpečnom používaní nástroja",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3232&task=cursos.detalle&",
        category: "Training"
    }
};

locales.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.ai_news && Array.isArray(data.ai_news.items_list)) {
            // Check if it's already there to prevent duplication
            const exists = data.ai_news.items_list.some(item => item.title === translations[lang].title);
            if (!exists) {
                // Add to the top
                data.ai_news.items_list.unshift(translations[lang]);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                console.log(`Updated ${lang}.json`);
            } else {
                console.log(`Already exists in ${lang}.json`);
            }
        }
    }
});
