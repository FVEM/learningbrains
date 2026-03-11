const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const locales = ['en', 'es', 'de', 'it', 'pt', 'sk'];

const itemsToAdd = [
    {
        title: "IA avanzada y nuevas herramientas: del copiloto a los agentes",
        description: "Explora el ecosistema actual de IA, desde copilotos hasta agentes inteligentes, y descubre cómo automatizar y optimizar procesos empresariales",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3235&task=cursos.detalle&",
        category: "Training"
    },
    {
        title: "IA para Ingeniería: más eficiencia, menos tareas repetitivas",
        description: "Automatiza tareas técnicas y mejora la productividad del equipo de ingeniería",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3234&task=cursos.detalle&",
        category: "Training"
    },
    {
        title: "IA para equipos de Ventas: de la oportunidad a la oferta",
        description: "Más oportunidades, mejores ofertas y mejor coordinación comercial con IA",
        link: "https://fvem.es/es/cursos-de-formacion/cursos-formacion-bonificada.html?id=3233&task=cursos.detalle&",
        category: "Training"
    }
];

locales.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.ai_news && Array.isArray(data.ai_news.items_list)) {
            itemsToAdd.forEach(newItem => {
                const exists = data.ai_news.items_list.some(item => item.title === newItem.title);
                if (!exists) {
                    data.ai_news.items_list.unshift(newItem); // Add to the top
                }
            });
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Updated ${lang}.json`);
        }
    }
});
