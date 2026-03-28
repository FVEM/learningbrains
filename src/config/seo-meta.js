/**
 * Optimized metadata for server-side injection (Vercel Edge/Serverless).
 * This ensures social previews (OG Tags) work correctly for all languages.
 */
export const seoConfig = {
  defaultLang: 'en',
  languages: ['en', 'es', 'it', 'sk', 'de', 'pt'],
  pages: {
    home: {
      es: { title: "Learning Brains – Formación Industrial con IA | Erasmus+", description: "Learning Brains es un proyecto Erasmus+ KA220-VET que desarrolla herramientas de aprendizaje en el trabajo con IA para recualificar trabajadores industriales en Europa." },
      en: { title: "Learning Brains – Industrial Training with AI | Erasmus+", description: "Learning Brains is an Erasmus+ KA220-VET project developing AI-powered work-based learning tools to reskill industrial workers in Europe." },
      it: { title: "Learning Brains – Formazione Industriale con IA | Erasmus+", description: "Learning Brains è un progetto Erasmus+ KA220-VET che sviluppa strumenti di apprendimento sul lavoro basati sull'IA per riqualificare i lavoratori industriali in Europa." },
      sk: { title: "Learning Brains – Priemyselné vzdelávanie s AI | Erasmus+", description: "Learning Brains je projekt Erasmus+ KA220-VET vyvíjajúci nástroje na vzdelávanie na pracovisku s podporou AI na rekvalifikáciu priemyselných pracovníkov v Európe." },
      de: { title: "Learning Brains – Industrielle Ausbildung mit KI | Erasmus+", description: "Learning Brains ist ein Erasmus+ KA220-VET-Projekt, das KI-gestützte arbeitsbasierte Lerntools entwickelt, um Industriearbeiter in Europa umzuschulen." },
      pt: { title: "Learning Brains – Formação Industrial con IA | Erasmus+", description: "Learning Brains é un projeto Erasmus+ KA220-VET que desenvolve ferramentas de aprendizagem no trabalho con IA para requalificar trabalhadores industriais na Europa." }
    },
    about: {
      es: { title: "Sobre el Proyecto – Learning Brains Erasmus+", description: "Descubra los objetivos, áreas de enfoque y grupos objetivo de Learning Brains: un proyecto Erasmus+ KA220-VET." },
      en: { title: "About the Project – Learning Brains Erasmus+", description: "Discover the goals, focus areas, and target groups of Learning Brains: an Erasmus+ KA220-VET project." },
      it: { title: "Informazioni sul Progetto – Learning Brains Erasmus+", description: "Scopri gli obiettivi, le aree di interesse e i gruppi target di Learning Brains: un progetto Erasmus+ KA220-VET." },
      sk: { title: "O projekte – Learning Brains Erasmus+", description: "Objavte ciele, oblasti zamerania a cieľové skupiny projektu Learning Brains: projekt Erasmus+ KA220-VET." },
      de: { title: "Über das Projekt – Learning Brains Erasmus+", description: "Entdecken Sie die Ziele, Schwerpunkte und Zielgruppen von Learning Brains: ein Erasmus+ KA220-VET-Projekt." },
      pt: { title: "Sobre o Projeto – Learning Brains Erasmus+", description: "Descubra os objetivos, áreas de foco e grupos-alvo do Learning Brains: um projeto Erasmus+ KA220-VET." }
    },
    news: {
      es: { title: "Eventos y Noticias – Learning Brains Erasmus+", description: "Manténgase al día de los últimos eventos, talleres y reuniones transnacionales del proyecto Erasmus+ Learning Brains." },
      en: { title: "Events and News – Learning Brains Erasmus+", description: "Stay updated on the latest events, workshops, and transnational meetings of the Erasmus+ Learning Brains project." },
      it: { title: "Eventi e Notizie – Learning Brains Erasmus+", description: "Rimani aggiornato sugli ultimi eventi, workshop e incontri transnazionali del progetto Erasmus+ Learning Brains." },
      sk: { title: "Udalosti a novinky – Learning Brains Erasmus+", description: "Zostaňte informovaní o najnovších udalostiach, workshopoch a nadnárodných stretnutiach projektu Erasmus+ Learning Brains." },
      de: { title: "Events und Neuigkeiten – Learning Brains Erasmus+", description: "Bleiben Sie auf dem Laufenden über die neuesten Events, Workshops und transnationalen Treffen des Projekts Erasmus+ Learning Brains." },
      pt: { title: "Eventos e Notícias – Learning Brains Erasmus+", description: "Mantenha-se atualizado sobre os últimos eventos, workshops e reuniões transnacionales do projeto Erasmus+ Learning Brains." }
    },
    noticias: {
      es: { title: "Noticias IA – Inteligencia Artificial en Negocios y FP", description: "Últimas tendencias en Inteligencia Artificial para empresas, industria y formación profesional (FP)." },
      en: { title: "AI News – Artificial Intelligence in Business and VET", description: "Latest trends in Artificial Intelligence for business, industry, and vocational training (VET)." },
      it: { title: "News IA – Intelligenza Artificiale nel Business e nell'IFP", description: "Ultime tendenze nell'Intelligenza Artificiale per le imprese, l'industria e la formación professionale (IFP)." },
      sk: { title: "AI Správy – Umelá inteligencia v biznise a VET", description: "Najnovšie trendy v umelej inteligencii pre podnikanie, priemysel a odborné vzdelávanie (VET)." },
      de: { title: "KI-Neuigkeiten – Künstliche Inteligencia in Wirtschaft und Berufsbildung", description: "Neueste Trends der Künstlichen Intelligenz für Wirtschaft, Industrie und Berufsbildung." },
      pt: { title: "Notícias IA – Inteligência Artificial em Negócios e EFP", description: "Últimas tendências em Inteligência Artificial para empresas, indústria e formação profesional (EFP)." }
    },
    analytics: {
      es: { title: "Dashboard Analítica – Learning Brains", description: "Acceso restringido al panel de métricas de impacto del proyecto." },
      en: { title: "Analytics Dashboard – Learning Brains", description: "Restricted access to the project's impact metrics panel." },
      it: { title: "Dashboard Analitica – Learning Brains", description: "Accesso limitato al pannello delle metriche di impatto del proyecto." },
      sk: { title: "Analytický panel – Learning Brains", description: "Obmedzený prístup k panelu metrik dopadu projektu." },
      de: { title: "Analyse-Dashboard – Learning Brains", description: "Eingeschränkter Zugriff auf das Dashboard der Projekt-Impact-Metriken." },
      pt: { title: "Dashboard Analítica – Learning Brains", description: "Acesso restrito ao painel de métricas de impacto do projeto." }
    }
  }
};
