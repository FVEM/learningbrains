const fs = require('fs');
const path = require('path');

const locales = ['es', 'de', 'it', 'pt', 'sk'];
const translations = {
    'es': {
        'AI for Sales Teams: from opportunity to offer': 'IA para Equipos de Ventas: de la oportunidad a la oferta',
        'More opportunities, better offers and better commercial coordination with AI': 'Más oportunidades, mejores ofertas y mejor coordinación comercial con IA',
        'AI for Engineering: more efficiency, less repetitive tasks': 'IA para Ingeniería: más eficiencia, menos tareas repetitivas',
        'Automate technical tasks and improve the productivity of the engineering team': 'Automatiza tareas técnicas y mejora la productividad del equipo de ingeniería',
        'Advanced AI and new tools: from copilot to agents': 'IA Avanzada y nuevas herramientas: del copiloto a los agentes',
        'Explore the current AI ecosystem, from copilots to intelligent agents, and discover how to automate and optimize business processes': 'Explora el ecosistema actual de la IA, desde copilotos hasta agentes inteligentes, y descubre cómo automatizar y optimizar los procesos de negocio',
        'Copilot in the enterprise: real productivity in a Microsoft environment': 'Copilot en la empresa: productividad real en entorno Microsoft',
        'Productivity with Copilot in an industrial enterprise, with safe use of the tool': 'Productividad con Copilot en la empresa industrial, con uso seguro de la herramienta',
        'How to design the AI roadmap in your organization': 'Cómo diseñar la hoja de ruta de la IA en tu organización',
        'From intention to action: key decisions to implement AI with real impact': 'De la intención a la acción: decisiones clave para implantar IA con impacto real'
    },
    'de': {
        'AI for Sales Teams: from opportunity to offer': 'KI für Vertriebsteams: von der Opportunity zum Angebot',
        'More opportunities, better offers and better commercial coordination with AI': 'Mehr Chancen, bessere Angebote und bessere Koordination des Vertriebs mit KI',
        'AI for Engineering: more efficiency, less repetitive tasks': 'KI für das Ingenieurwesen: mehr Effizienz, weniger Routineaufgaben',
        'Automate technical tasks and improve the productivity of the engineering team': 'Automatisieren Sie technische Aufgaben und steigern Sie die Produktivität des Ingenieurteams',
        'Advanced AI and new tools: from copilot to agents': 'Fortgeschrittene KI und neue Tools: vom Copiloten zu Agenten',
        'Explore the current AI ecosystem, from copilots to intelligent agents, and discover how to automate and optimize business processes': 'Entdecken Sie das aktuelle KI-Ökosystem, von Copiloten bis hin zu intelligenten Agenten, und erfahren Sie, wie Sie Geschäftsprozesse automatisieren und optimieren können',
        'Copilot in the enterprise: real productivity in a Microsoft environment': 'Copilot im Unternehmen: echte Produktivität in einer Microsoft-Umgebung',
        'Productivity with Copilot in an industrial enterprise, with safe use of the tool': 'Produktivität mit Copilot in einem Industrieunternehmen, bei sicherer Nutzung des Tools',
        'How to design the AI roadmap in your organization': 'So entwerfen Sie die KI-Roadmap in Ihrem Unternehmen',
        'From intention to action: key decisions to implement AI with real impact': 'Von der Absicht zur Tat: Schlüsselentscheidungen zur Einführung von KI mit echter Wirkung'
    },
    'it': {
        'AI for Sales Teams: from opportunity to offer': 'IA per i team di vendita: dall\'opportunità all\'offerta',
        'More opportunities, better offers and better commercial coordination with AI': 'Più opportunità, offerte migliori e un migliore coordinamento commerciale con l\'IA',
        'AI for Engineering: more efficiency, less repetitive tasks': 'IA per l\'ingegneria: più efficienza, meno compiti ripetitivi',
        'Automate technical tasks and improve the productivity of the engineering team': 'Automatizzate le attività tecniche e migliorate la produttività del team di ingegneria',
        'Advanced AI and new tools: from copilot to agents': 'IA avanzata e nuovi strumenti: dal copilota agli agenti',
        'Explore the current AI ecosystem, from copilots to intelligent agents, and discover how to automate and optimize business processes': 'Esplorate l\'attuale ecosistema dell\'IA, dai copiloti agli agenti intelligenti, e scoprite come automatizzare e ottimizzare i processi aziendali',
        'Copilot in the enterprise: real productivity in a Microsoft environment': 'Copilot in azienda: produttività reale in un ambiente Microsoft',
        'Productivity with Copilot in an industrial enterprise, with safe use of the tool': 'Produttività con Copilot in un\'impresa industriale, con un uso sicuro dello strumento',
        'How to design the AI roadmap in your organization': 'Come progettare la roadmap dell\'IA nella vostra organizzazione',
        'From intention to action: key decisions to implement AI with real impact': 'Dall\'intenzione all\'azione: decisioni chiave per implementare l\'IA con un impatto reale'
    },
    'pt': {
        'AI for Sales Teams: from opportunity to offer': 'IA para Equipas de Vendas: da oportunidade à oferta',
        'More opportunities, better offers and better commercial coordination with AI': 'Mais oportunidades, melhores ofertas e melhor coordenação comercial com IA',
        'AI for Engineering: more efficiency, less repetitive tasks': 'IA para Engenharia: mais eficiência, menos tarefas repetitivas',
        'Automate technical tasks and improve the productivity of the engineering team': 'Automatize tarefas técnicas e melhore a produtividade da equipa de engenharia',
        'Advanced AI and new tools: from copilot to agents': 'IA Avançada e novas ferramentas: do copiloto para agentes',
        'Explore the current AI ecosystem, from copilots to intelligent agents, and discover how to automate and optimize business processes': 'Explore o ecossistema atual de IA, desde copilotos a agentes inteligentes, e descubra como automatizar e otimizar os processos de negócio',
        'Copilot in the enterprise: real productivity in a Microsoft environment': 'Copilot na empresa: produtividade real em ambiente Microsoft',
        'Productivity with Copilot in an industrial enterprise, with safe use of the tool': 'Produtividade com Copilot numa empresa industrial, com uso seguro da ferramenta',
        'How to design the AI roadmap in your organization': 'Como desenhar o roteiro de IA na sua organização',
        'From intention to action: key decisions to implement AI with real impact': 'Da intenção à ação: decisões fundamentais para implementar a IA com impacto real'
    },
    'sk': {
        'AI for Sales Teams: from opportunity to offer': 'AI pre predajné tímy: od príležitosti k ponuke',
        'More opportunities, better offers and better commercial coordination with AI': 'Viac príležitostí, lepšie ponuky a lepšia obchodná koordinácia s AI',
        'AI for Engineering: more efficiency, less repetitive tasks': 'AI pre inžinierstvo: vyššia efektivita, menej opakujúcich sa úloh',
        'Automate technical tasks and improve the productivity of the engineering team': 'Automatizujte technické úlohy a zvýšte produktivitu inžinierskeho tímu',
        'Advanced AI and new tools: from copilot to agents': 'Pokročilá AI a nové nástroje: od kopilota k agentom',
        'Explore the current AI ecosystem, from copilots to intelligent agents, and discover how to automate and optimize business processes': 'Preskúmajte súčasný ekosystém AI, od kopilotov po inteligentných agentov, a zistite, ako automatizovať a optimalizovať obchodné procesy',
        'Copilot in the enterprise: real productivity in a Microsoft environment': 'Copilot v podniku: skutočná produktivita v prostredí Microsoft',
        'Productivity with Copilot in an industrial enterprise, with safe use of the tool': 'Produktivita s Copilotom v priemyselnom podniku pri bezpečnom používaní nástroja',
        'How to design the AI roadmap in your organization': 'Ako navrhnúť plán implementácie AI vo vašej organizácii',
        'From intention to action: key decisions to implement AI with real impact': 'Od zámeru k činom: kľúčové rozhodnutia pre implementáciu AI so skutočným dopadom'
    }
};

locales.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    json.ai_news.items_list = json.ai_news.items_list.map(item => {
        return {
            ...item,
            title: translations[lang][item.title] || item.title,
            description: translations[lang][item.description] || item.description
        };
    });

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log(`Translated ${lang}.json`);
});
