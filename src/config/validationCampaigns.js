/**
 * Configuration for Validation & External Inputs Campaigns
 * Learning Brains (Erasmus+ Project)
 * 
 * Supports multilingual content across consortium languages:
 * EN (English - default lingua franca), ES (Spanish), IT (Italian), 
 * DE (German/Austrian), SK (Slovak), PT (Portuguese).
 */

export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
    { code: 'de', name: 'Deutsch', flag: '🇦🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export const CONSORTIUM_COUNTRIES = [
    { code: 'ES', label: { en: 'Spain', es: 'España', it: 'Spagna', de: 'Spanien', sk: 'Španielsko', pt: 'Espanha' } },
    { code: 'IT', label: { en: 'Italy', es: 'Italia', it: 'Italia', de: 'Italien', sk: 'Taliansko', pt: 'Itália' } },
    { code: 'AT', label: { en: 'Austria', es: 'Austria', it: 'Austria', de: 'Österreich', sk: 'Rakúsko', pt: 'Áustria' } },
    { code: 'SK', label: { en: 'Slovakia', es: 'Eslovaquia', it: 'Slovacchia', de: 'Slowakei', sk: 'Slovensko', pt: 'Eslováquia' } },
    { code: 'PT', label: { en: 'Portugal', es: 'Portugal', it: 'Portogallo', de: 'Portugal', sk: 'Portugalsko', pt: 'Portugal' } },
    { code: 'OTHER', label: { en: 'Other European / International', es: 'Otro país europeo / internacional', it: 'Altro paese europeo / internazionale', de: 'Anderes europäisches / internationales Land', sk: 'Iná európska / medzinárodná krajina', pt: 'Outro país europeu / internacional' } },
];

export const STAKEHOLDER_TYPES = [
    { 
        id: 'sme', 
        label: {
            en: 'SME / Industrial Company', 
            es: 'PYME / Empresa Industrial', 
            it: 'PMI / Azienda Industriale', 
            de: 'KMU / Industrieunternehmen', 
            sk: 'MSP / Priemyselná spoločnosť', 
            pt: 'PME / Empresa Industrial'
        }
    },
    { 
        id: 'vet', 
        label: {
            en: 'VET Provider / Technical Training Center', 
            es: 'Centro de Formación Profesional (FP)', 
            it: 'Ente di Formazione Professionale (VET)', 
            de: 'Berufsbildungsanbieter (BBi)', 
            sk: 'Poskytovateľ odborného vzdelávania (OVP)', 
            pt: 'Entidade de Formação Profissional (VET)'
        }
    },
    { 
        id: 'association', 
        label: {
            en: 'Business Association / Chamber of Commerce', 
            es: 'Asociación Empresarial / Cámara de Comercio', 
            it: 'Associazione di Categoria / Camera di Commercio', 
            de: 'Wirtschaftsverband / Wirtschaftskammer', 
            sk: 'Združenie zamestnávateľov / Obchodná komora', 
            pt: 'Associação Empresarial / Câmara de Comércio'
        }
    },
    { 
        id: 'university', 
        label: {
            en: 'University / Research & Technology Center', 
            es: 'Universidad / Centro Tecnológico o de Investigación', 
            it: 'Università / Centro di Ricerca o Tecnologico', 
            de: 'Universität / Forschungs- und Technologiezentrum', 
            sk: 'Univerzita / Výskumné a technologické centrum', 
            pt: 'Universidade / Centro de Investigação e Tecnologia'
        }
    },
    { 
        id: 'policy', 
        label: {
            en: 'Public Authority / Policy Maker', 
            es: 'Administración Pública / Decisor Político', 
            it: 'Ente Pubblico / Decisore Politico', 
            de: 'Öffentliche Verwaltung / Politische Entscheidungsträger', 
            sk: 'Verejná správa / Tvorca politík', 
            pt: 'Administração Pública / Decisor Político'
        }
    },
    { 
        id: 'social_partner', 
        label: {
            en: 'Trade Union / Social Partner', 
            es: 'Organización Sindical / Agente Social', 
            it: 'Sindacato / Partner Sociale', 
            de: 'Gewerkschaft / Sozialpartner', 
            sk: 'Odborový zväz / Sociálny partner', 
            pt: 'Sindicato / Parceiro Social'
        }
    },
    { 
        id: 'expert', 
        label: {
            en: 'Independent Expert / Consultant', 
            es: 'Consultor / Experto Independiente', 
            it: 'Consulente / Esperto Indipendente', 
            de: 'Unabhängiger Berater / Fachexperte', 
            sk: 'Nezávislý odborník / Konzultant', 
            pt: 'Consultor / Especialista Independente'
        }
    },
];

export const VALIDATION_CAMPAIGNS = {
    'npc-1': {
        id: 'npc-1',
        slug: 'npc-1',
        status: 'active',
        documentUrl: '/documents/validation/npc-1-sample.pdf',
        meta: {
            tag: {
                en: 'National Pilot Committee',
                es: 'Comité Piloto Nacional',
                it: 'Comitato Pilota Nazionale',
                de: 'Nationaler Pilot-Ausschuss',
                sk: 'Národný pilotný výbor',
                pt: 'Comité Piloto Nacional'
            },
            title: {
                en: 'National Pilot Committee 1: Strategic Validation & Industrial Needs',
                es: 'National Pilot Committee 1: Validación Estratégica y Necesidades Industriales',
                it: 'National Pilot Committee 1: Validazione Strategica e Fabbisogni Industriali',
                de: 'National Pilot Committee 1: Strategische Validierung & Industrielle Bedarfe',
                sk: 'National Pilot Committee 1: Strategická validácia a priemyselné potreby',
                pt: 'National Pilot Committee 1: Validação Estratégica e Necessidades Industriais'
            },
            subtitle: {
                en: 'Evaluation of the project framework, targeted skills in AI for industrial SMEs, and regional implementation pilot guidelines.',
                es: 'Evaluación del marco del proyecto, competencias de IA prioritarias para las PYMEs industriales y directrices para los pilotos regionales.',
                it: 'Valutazione del quadro del progetto, delle competenze prioritari in IA per le PMI industriali e delle linee guida per i progetti pilota regionali.',
                de: 'Bewertung des Projektrahmens, der priorisierten KI-Kompetenzen für industrielle KMU und der regionalen Pilotrichtlinien.',
                sk: 'Hodnotenie projektového rámca, prioritných zručností v oblasti umelej inteligencie pre priemyselné MSP a usmernení pre pilotné overovanie.',
                pt: 'Avaliação do quadro do projeto, competências prioritárias em IA para as PME industriais e diretrizes para os pilotos regionais.'
            },
            instructions: {
                en: 'Please review the document in the viewer on the left (or download it for offline reading) and provide your expert feedback through the form on the right. Your inputs directly shape the project deliverables submitted to the European Commission.',
                es: 'Por favor, revisa el documento en el visor de la izquierda (o descárgalo para leerlo en local) y aporta tu valoración experta en el formulario de la derecha. Tus aportaciones influirán directamente en los entregables oficiales del proyecto Erasmus+.',
                it: 'Si prega di esaminare il documento nel visualizzatore a sinistra (o scaricarlo) e fornire il proprio feedback esperto nel modulo a destra. I vostri contributi modelleranno direttamente i risultati ufficiali del progetto Erasmus+.',
                de: 'Bitte prüfen Sie das Dokument im Betrachter auf der linken Seite und geben Sie Ihr Expertenfeedback im Formular ab. Ihre Beiträge fließen direkt in die offiziellen Projektergebnisse für die Europäische Kommission ein.',
                sk: 'Preskúmajte dokument v prehliadači vľavo a poskytnite odbornú spätnú väzbu prostrednívom formulára vpravo. Vaše vstupy priamo ovplyvnia výstupy projektu Erasmus+.',
                pt: 'Por favor, analise o documento no visualizador à esquerda e forneça o seu feedback de perito no formulário à direita. Os seus contributos moldarão diretamente os resultados oficiais do projeto Erasmus+.'
            }
        },
        likertQuestions: [
            {
                id: 'relevance',
                title: {
                    en: 'Relevance to Industrial Needs',
                    es: 'Pertinencia con las Necesidades Industriales',
                    it: 'Rilevanza per i Fabbisogni Industriali',
                    de: 'Relevanz für industrielle Bedarfe',
                    sk: 'Význam pre potreby priemyslu',
                    pt: 'Relevância para as Necessidades Industriais'
                },
                description: {
                    en: 'Are the proposed objectives and competencies aligned with the real challenges of SMEs in your region?',
                    es: '¿Los objetivos y competencias planteados responden a los desafíos reales de las PYMEs industriales en tu entorno?',
                    it: 'Gli obiettivi e le competenze proposte rispondono alle reali sfide delle PMI industriali del vostro territorio?',
                    de: 'Entsprechen die vorgeschlagenen Ziele und Kompetenzen den tatsächlichen Herausforderungen von KMU in Ihrer Region?',
                    sk: 'Zodpovedajú navrhované ciele a kompetencie skutočným výzvam MSP vo vašom regióne?',
                    pt: 'Os objetivos e competências propostos respondem aos desafios reais das PME industriais na sua região?'
                }
            },
            {
                id: 'clarity',
                title: {
                    en: 'Clarity & Coherence',
                    es: 'Claridad y Coherencia',
                    it: 'Chiarezza e Coerenza',
                    de: 'Klarheit und Kohärenz',
                    sk: 'Jasnosť a zrozumiteľnosť',
                    pt: 'Clareza e Coerência'
                },
                description: {
                    en: 'Is the document structure, methodology and scope clearly articulated and easy to understand?',
                    es: '¿La estructura, metodología y alcance del documento están bien definidos y son fáciles de comprender?',
                    it: 'La struttura, la metodologia e la portata del documento sono ben definite e di facile comprensione?',
                    de: 'Sind Struktur, Methodik und Umfang des Dokuments klar gegliedert und verständlich?',
                    sk: 'Je štruktúra, metodológia a rozsah dokumentu jasne formulovaný a zrozumiteľný?',
                    pt: 'A estrutura, metodologia e âmbito do documento estão bem articulados e são fáceis de compreender?'
                }
            },
            {
                id: 'transferability',
                title: {
                    en: 'Transferability & Scalability',
                    es: 'Transferibilidad y Escalabilidad',
                    it: 'Trasferibilità e Scalabilità',
                    de: 'Übertragbarkeit und Skalierbarkeit',
                    sk: 'Prenositeľnosť a škálovateľnosť',
                    pt: 'Transferibilidade e Escalabilidade'
                },
                description: {
                    en: 'Can this model be effectively transferred and adapted to other sectors and European regions?',
                    es: '¿Consideras viable la transferencia y adaptación de este modelo a otros sectores y regiones europeas?',
                    it: 'Ritenete fattibile il trasferimento e l\'adattamento di questo modello ad altri settori e regioni europee?',
                    de: 'Halten Sie die Übertragung und Anpassung dieses Modells auf andere Sektoren und europäische Regionen für machbar?',
                    sk: 'Považujete prenos a adaptáciu tohto modelu na iné sektory a európske regióny za realizovateľnú?',
                    pt: 'Considera viável a transferência e adaptação deste modelo para outros setores e regiões europeias?'
                }
            },
            {
                id: 'impact',
                title: {
                    en: 'Expected Impact on Workforce Reskilling',
                    es: 'Impacto Esperado en el Reciclaje Laboral',
                    it: 'Impatto Atteso sulla Riqualificazione dei Lavoratori',
                    de: 'Erwartete Wirkung auf die Weiterqualifizierung',
                    sk: 'Očakávaný vplyv na rekvalifikáciu pracovnej sily',
                    pt: 'Impacto Esperado na Requalificação dos Trabalhadores'
                },
                description: {
                    en: 'Will this initiative contribute to bridging the AI skills gap for shop-floor and management staff?',
                    es: '¿Contribuirá esta iniciativa a reducir la brecha de competencias en IA tanto en planta como en perfiles de gestión?',
                    it: 'Questa iniziativa contribuirà a colmare il divario di competenze sull\'IA sia a livello operativo che dirigenziale?',
                    de: 'Wird diese Initiative dazu beitragen, die KI-Kompetenzlücke sowohl in der Produktion als auch im Management zu schließen?',
                    sk: 'Prispeje táto iniciatíva k prekonaniu medzery v zručnostiach v oblasti umelej inteligencie?',
                    pt: 'Esta iniciativa contribuirá para colmatar a lacuna de competências em IA tanto no chão de fábrica como na gestão?'
                }
            }
        ],
        qualitativeQuestions: [
            {
                id: 'strengths',
                title: {
                    en: 'Key Strengths',
                    es: 'Puntos Fuertes Destacados',
                    it: 'Punti di Forza Principali',
                    de: 'Wesentliche Stärken',
                    sk: 'Hlavné silné stránky',
                    pt: 'Principais Pontos Fortes'
                },
                placeholder: {
                    en: 'Highlight what you consider the most innovative or valuable elements...',
                    es: 'Señala los aspectos más innovadores, útiles o acertados de la propuesta...',
                    it: 'Evidenzia gli elementi più innovativi, utili o validi della proposta...',
                    de: 'Heben Sie die innovativsten oder wertvollsten Aspekte hervor...',
                    sk: 'Uveďte najinovatívnejšie alebo najhodnotnejšie prvky návrhu...',
                    pt: 'Destaque os elementos mais inovadores, úteis ou acertados da proposta...'
                }
            },
            {
                id: 'improvements',
                title: {
                    en: 'Recommendations & Improvement Areas',
                    es: 'Recomendaciones y Aspectos a Mejorar',
                    it: 'Raccomandazioni e Aspetti da Migliorare',
                    de: 'Empfehlungen & Verbesserungsbereiche',
                    sk: 'Odporúčania a oblasti na zlepšenie',
                    pt: 'Recomendações e Áreas de Melhoria'
                },
                placeholder: {
                    en: 'What could be refined, clarified or added to increase practical effectiveness?',
                    es: '¿Qué aspectos deberían matizarse, simplificarse o reforzarse para aumentar su eficacia real?',
                    it: 'Cosa si potrebbe perfezionare, chiarire o aggiungere per aumentarne l\'efficacia pratica?',
                    de: 'Was könnte verfeinert, präzisiert oder ergänzt werden, um die praktische Wirksamkeit zu erhöhen?',
                    sk: 'Čo by bolo potrebné spresniť alebo doplniť na zvýšenie praktickej účinnosti?',
                    pt: 'O que poderia ser ajustado, clarificado ou acrescentado para aumentar a eficácia prática?'
                }
            },
            {
                id: 'regional_challenges',
                title: {
                    en: 'National / Regional Context & Specificities',
                    es: 'Contexto y Retos Específicos en tu País / Región',
                    it: 'Contesto e Sfide Specifiche nel Vostro Paese / Regione',
                    de: 'Nationaler / Regionaler Kontext & Spezifische Herausforderungen',
                    sk: 'Národný / Regionálny kontext a špecifické výzvy',
                    pt: 'Contexto e Desafios Específicos no seu País / Região'
                },
                placeholder: {
                    en: 'Any particularities or obstacles for adoption in your industrial ecosystem?',
                    es: '¿Qué particularidades o barreras detectas para su implantación en las empresas de tu entorno?',
                    it: 'Quali particolarità o barriere individuate per l\'adozione nelle aziende del vostro territorio?',
                    de: 'Welche Besonderheiten oder Hindernisse sehen Sie für die Einführung in Unternehmen Ihrer Region?',
                    sk: 'Aké osobitosti alebo prekážky vnímate pri zavádzaní v podnikoch vášho regiónu?',
                    pt: 'Que particularidades ou barreiras identifica para a sua implementação nas empresas do seu meio?'
                }
            }
        ]
    },

    'itinerario-formativo': {
        id: 'itinerario-formativo',
        slug: 'itinerario-formativo',
        status: 'active',
        documentUrl: '/documents/validation/itinerario-formativo-sample.pdf',
        meta: {
            tag: {
                en: 'Training Pathway Curriculum',
                es: 'Itinerario Formativo y Currículo',
                it: 'Itinerario Formativo e Curriculum',
                de: 'Ausbildungspfad & Curriculum',
                sk: 'Vzdelávacia cesta a kurikulum',
                pt: 'Itinerário Formativo e Currículo'
            },
            title: {
                en: 'AI Training Pathway for Industrial SMEs: Curriculum Validation',
                es: 'Itinerario Formativo en IA para PYMEs Industriales: Validación Curricular',
                it: 'Itinerario Formativo in IA per PMI Industriali: Validazione del Curriculum',
                de: 'KI-Ausbildungspfad für industrielle KMU: Lehrplanvalidierung',
                sk: 'Vzdelávacia cesta v oblasti AI pre priemyselné MSP: Validácia kurikula',
                pt: 'Itinerário Formativo em IA para PME Industriais: Validação Curricular'
            },
            subtitle: {
                en: 'Review of modular learning units, workload estimation, learning outcomes, and on-the-job training methodologies.',
                es: 'Revisión de los módulos formativos, estimación de horas lectivas, resultados de aprendizaje y metodología de aprendizaje en el puesto de trabajo.',
                it: 'Revisione dei moduli di apprendimento, stima del carico orario, risultati di apprendimento e metodologia di formazione sul lavoro.',
                de: 'Überprüfung der Lernmodule, Schätzung des Arbeitsaufwands, Lernergebnisse und Methoden des Lernens am Arbeitsplatz.',
                sk: 'Preskúmanie vzdelávacích modulov, odhadu časovej záťaže, výstupov vzdelávania a metodológie vzdelávania na pracovisku.',
                pt: 'Revisão dos módulos formativos, estimativa da carga horária, resultados de aprendizagem e metodologia de aprendizagem no posto de trabalho.'
            },
            instructions: {
                en: 'Examine the proposed syllabus and learning structure in the viewer, then rate each pedagogical dimension and provide your constructive feedback.',
                es: 'Examina el programa y la estructura pedagógica en el visor de la izquierda y valora cada dimensión formativa en el cuestionario de la derecha.',
                it: 'Esamina il programma e la struttura pedagogica nel visualizzatore di sinistra e valuta ogni dimensione formativa nel questionario di destra.',
                de: 'Prüfen Sie den Lehrplan im Dokumentenbetrachter und bewerten Sie die einzelnen didaktischen Dimensionen im Fragebogen.',
                sk: 'Preskúmajte učebné osnovy v prehliadači vľavo a ohodnoťte jednotlivé pedagogické rozmery v dotazníku vpravo.',
                pt: 'Examine o programa e a estrutura pedagógica no visualizador à esquerda e avalie cada dimensão formativa no questionário à direita.'
            }
        },
        likertQuestions: [
            {
                id: 'structure_coherence',
                title: {
                    en: 'Modular Progression & Structure',
                    es: 'Progresión Modular y Estructura',
                    it: 'Progressione Modulare e Struttura',
                    de: 'Modulare Progression & Struktur',
                    sk: 'Modulárna postupnosť a štruktúra',
                    pt: 'Progressão Modular e Estrutura'
                },
                description: {
                    en: 'Are the modules sequenced logically from foundational AI literacy to practical industrial use cases?',
                    es: '¿Los módulos siguen una secuencia lógica desde los fundamentos de IA hasta casos de uso prácticos en la industria?',
                    it: 'I moduli seguono una sequenza logica dalle basi dell\'IA fino ai casi d\'uso pratici industriali?',
                    de: 'Folgen die Module einer logischen Abfolge von den KI-Grundlagen bis hin zu praktischen industriellen Anwendungsfällen?',
                    sk: 'Majú moduly logickú postupnosť od základov AI až po praktické priemyselné príklady?',
                    pt: 'Os módulos seguem uma sequência lógica desde os fundamentos de IA até aos casos práticos industriais?'
                }
            },
            {
                id: 'workload_adequacy',
                title: {
                    en: 'Workload & Duration Suitability',
                    es: 'Carga Horaria y Duración',
                    it: 'Adeguatezza del Carico Orario e della Durata',
                    de: 'Angemessenheit von Dauer & Arbeitsaufwand',
                    sk: 'Primeranosť časovej záťaže a trvania',
                    pt: 'Adequação da Carga Horária e Duração'
                },
                description: {
                    en: 'Is the estimated duration realistic and feasible for workers and managers with limited time?',
                    es: '¿La duración estimada es realista y compatible con la jornada de personas trabajadoras en empresas industriales?',
                    it: 'La durata stimata è realistica e compatibile con i ritmi di lavoro del personale aziendale?',
                    de: 'Ist die geschätzte Dauer realistisch und mit der Arbeitszeit von Beschäftigten in Unternehmen vereinbar?',
                    sk: 'Je odhadované trvanie realistické a zlučiteľné s pracovným časom zamestnancov v podnikoch?',
                    pt: 'A duração estimada é realista e compatível com o horário de trabalho de colaboradores em empresas industriais?'
                }
            },
            {
                id: 'industrial_applicability',
                title: {
                    en: 'Practical Utility for SMEs',
                    es: 'Utilidad Práctica para las PYMEs',
                    it: 'Utilità Pratica per le PMI',
                    de: 'Praktischer Nutzen für KMU',
                    sk: 'Praktická využiteľnosť pre MSP',
                    pt: 'Utilidade Prática para as PME'
                },
                description: {
                    en: 'Will learners acquire actionable skills that can be directly applied to workplace productivity and innovation?',
                    es: '¿Los contenidos proporcionan habilidades aplicables de inmediato a la operativa diaria y mejora productiva?',
                    it: 'I contenuti forniscono competenze spendibili subito nelle attività quotidiane e nell\'innovazione aziendale?',
                    de: 'Vermitteln die Inhalte Kompetenzen, die unmittelbar im Betriebsalltag und zur Produktivitätssteigerung angewendet werden können?',
                    sk: 'Poskytuje obsah zručnosti okamžite uplatniteľné v praxi a pri zvyšovaní produktivity?',
                    pt: 'Os conteúdos proporcionam competências diretamente aplicáveis ao dia a dia e à melhoria produtiva?'
                }
            },
            {
                id: 'pedagogical_approach',
                title: {
                    en: 'On-the-Job Learning Methodology',
                    es: 'Metodología de Aprendizaje en el Puesto de Trabajo',
                    it: 'Metodologia di Apprendimento sul Lavoro',
                    de: 'Methodik des arbeitsplatznahen Lernens',
                    sk: 'Metodológia vzdelávania na pracovisku',
                    pt: 'Metodologia de Aprendizagem no Posto de Trabalho'
                },
                description: {
                    en: 'Does the methodology effectively balance digital self-learning, micro-credentials, and workplace mentoring?',
                    es: '¿Se combina de forma adecuada el autoaprendizaje digital, micro-retos prácticos y el acompañamiento en la empresa?',
                    it: 'La metodologia bilancia efficacemente autoapprendimento digitale, micro-esercizi pratici e tutoraggio aziendale?',
                    de: 'Verbindet die Methodik digitales Selbstlernen, praxisnahe Mikro-Herausforderungen und betriebliches Mentoring sinnvoll?',
                    sk: 'Kombinuje metodika vyváženým spôsobom digitálne samoštúdium, praktické mikro-úlohy a mentorstvo v podniku?',
                    pt: 'A metodologia equilibra de forma adequada a autoaprendizagem digital, micro-desafios práticos e a mentoria na empresa?'
                }
            }
        ],
        qualitativeQuestions: [
            {
                id: 'valuable_modules',
                title: {
                    en: 'Most Valuable Modules or Topics',
                    es: 'Módulos o Contenidos de Mayor Valor',
                    it: 'Moduli o Contenuti di Maggiore Valore',
                    de: 'Wertvollste Module oder Themenbereiche',
                    sk: 'Najhodnotnejšie moduly alebo témy',
                    pt: 'Módulos ou Conteúdos de Maior Valor'
                },
                placeholder: {
                    en: 'Which specific topics or units are especially well addressed or necessary?',
                    es: '¿Qué módulos o temáticas concretas consideras más acertados o urgentes para el sector?',
                    it: 'Quali moduli o argomenti specifici ritenete particolarmente ben trattati o necessari?',
                    de: 'Welche konkreten Module oder Themen halten Sie für besonders gelungen oder dringend nötig?',
                    sk: 'Ktoré konkrétne moduly alebo témy považujete za najvhodnejšie alebo najnaliehavejšie?',
                    pt: 'Que módulos ou temas específicos considera mais acertados ou prioritários para o setor?'
                }
            },
            {
                id: 'missing_elements',
                title: {
                    en: 'Missing Competencies or Suggested Adjustments',
                    es: 'Competencias Faltantes o Ajustes Sugeridos',
                    it: 'Competenze Mancanti o Modifiche Consigliate',
                    de: 'Fehlende Kompetenzen oder vorgeschlagene Anpassungen',
                    sk: 'Chýbajúce kompetencie alebo navrhované úpravy',
                    pt: 'Competências em Falta ou Ajustes Sugeridos'
                },
                placeholder: {
                    en: 'Is there any critical AI skill, tool, or industrial application that should be added or simplified?',
                    es: '¿Hay alguna herramienta, caso de uso o concepto clave de IA que eches en falta o deba simplificarse?',
                    it: 'C\'è qualche strumento, caso d\'uso o concetto chiave di IA che manca o che andrebbe semplificato?',
                    de: 'Fehlt ein wichtiges KI-Werkzeug, ein industrieller Anwendungsfall oder sollte ein Konzept vereinfacht werden?',
                    sk: 'Chýba podľa vás nejaký dôležitý nástroj, príklad z praxe alebo kľúčový koncept umelej inteligencie?',
                    pt: 'Existe alguma ferramenta, caso de uso ou conceito-chave de IA que considere em falta ou que deva ser simplificado?'
                }
            },
            {
                id: 'company_engagement',
                title: {
                    en: 'Enablers for Company Participation',
                    es: 'Facilitadores para la Adopción por parte de Empresas',
                    it: 'Fattori Facilitatori per il Coinvolgimento delle Imprese',
                    de: 'Erfolgsfaktoren für die Beteiligung von Unternehmen',
                    sk: 'Faktory uľahčujúce zapojenie firiem',
                    pt: 'Fatores Facilitadores para a Adesão das Empresas'
                },
                placeholder: {
                    en: 'What incentives or support formats would encourage SMEs in your country to adopt this training pathway?',
                    es: '¿Qué incentivos, apoyos o formatos facilitarían que las empresas de tu región decidan implantarlo?',
                    it: 'Quali incentivi o modalità di supporto incoraggerebbero le PMI del vostro territorio ad adottare questo percorso?',
                    de: 'Welche Anreize oder Unterstützungsformate würden KMU in Ihrer Region motivieren, diesen Ausbildungspfad einzusetzen?',
                    sk: 'Aké stimuly alebo formy podpory by motivovali MSP vo vašom regióne k zavedeniu tohto programu?',
                    pt: 'Que incentivos, apoios ou formatos facilitariam a adesão das empresas da sua região a este itinerário?'
                }
            }
        ]
    },

    'npc-2': {
        id: 'npc-2',
        slug: 'npc-2',
        status: 'upcoming',
        documentUrl: '/documents/validation/npc-2-sample.pdf',
        meta: {
            tag: {
                en: 'National Pilot Committee',
                es: 'Comité Piloto Nacional',
                it: 'Comitato Pilota Nazionale',
                de: 'Nationaler Pilot-Ausschuss',
                sk: 'Národný pilotný výbor',
                pt: 'Comité Piloto Nacional'
            },
            title: {
                en: 'National Pilot Committee 2: Mid-term Pilot Evaluation & Workplace Testing',
                es: 'National Pilot Committee 2: Evaluación Intermedia de Pilotos en Empresas',
                it: 'National Pilot Committee 2: Valutazione Intermedia dei Progetti Pilota',
                de: 'National Pilot Committee 2: Zwischenbewertung der Unternehmens-Piloten',
                sk: 'National Pilot Committee 2: Priebežné hodnotenie pilotného testovania',
                pt: 'National Pilot Committee 2: Avaliação Intermédia dos Pilotos nas Empresas'
            },
            subtitle: {
                en: 'Validation of the practical on-the-job pilot testing, trainer observations, and initial SME performance metrics.',
                es: 'Validación del pilotaje práctico en los puestos de trabajo, observaciones de los formadores y primeras métricas de impacto en PYMEs.',
                it: 'Validazione della sperimentazione pilota sul lavoro, osservazioni dei formatori e prime metriche di impatto sulle PMI.',
                de: 'Validierung der betrieblichen Pilottests, Beobachtungen der Ausbilder und erste KMU-Wirkungsmetriken.',
                sk: 'Validácia praktického testovania na pracovisku, postrehy školiteľov a počiatočné ukazovatele vplyvu na MSP.',
                pt: 'Validação da testagem prática no posto de trabalho, observações dos formadores e métricas iniciais de impacto nas PME.'
            }
        },
        likertQuestions: [],
        qualitativeQuestions: []
    },

    'npc-3': {
        id: 'npc-3',
        slug: 'npc-3',
        status: 'upcoming',
        documentUrl: '/documents/validation/npc-3-sample.pdf',
        meta: {
            tag: {
                en: 'National Pilot Committee',
                es: 'Comité Piloto Nacional',
                it: 'Comitato Pilota Nazionale',
                de: 'Nationaler Pilot-Ausschuss',
                sk: 'Národný pilotný výbor',
                pt: 'Comité Piloto Nacional'
            },
            title: {
                en: 'National Pilot Committee 3: Final Impact, Exploitation & Regional Policy Recommendations',
                es: 'National Pilot Committee 3: Impacto Final, Sostenibilidad y Recomendaciones Políticas',
                it: 'National Pilot Committee 3: Impatto Finale, Sostenibilità e Raccomandazioni Politiche',
                de: 'National Pilot Committee 3: Endgültige Wirkung, Verstetigung & Politische Empfehlungen',
                sk: 'National Pilot Committee 3: Záverečný vplyv, udržateľnosť a odporúčania pre politiky',
                pt: 'National Pilot Committee 3: Impacto Final, Sustentabilidade e Recomendações Políticas'
            },
            subtitle: {
                en: 'Consortium wrap-up, institutional sustainability plans, and policy recommendations for regional industrial reskilling.',
                es: 'Cierre del consorcio, planes de sostenibilidad institucional y recomendaciones para las políticas regionales de reciclaje industrial.',
                it: 'Chiusura del consorzio, piani di sostenibilità istituzionale e raccomandazioni per le politiche regionali.',
                de: 'Projektabschluss, institutionelle Verstetigungspläne und Politikempfehlungen für die regionale Weiterbildung.',
                sk: 'Záverečné zhodnotenie konzorcia, plány inštitucionálnej udržateľnosti a odporúčania pre regionálne politiky.',
                pt: 'Encerramento do consórcio, planos de sustentabilidade institucional e recomendações para as políticas regionais.'
            }
        },
        likertQuestions: [],
        qualitativeQuestions: []
    }
};

/**
 * Resolves the document URL for a campaign and chosen language
 */
export function getCampaignDocumentUrl(campaign, lang = 'en') {
    if (!campaign) return '';
    if (campaign.documentUrls && typeof campaign.documentUrls === 'object') {
        return campaign.documentUrls[lang] || campaign.documentUrls.en || Object.values(campaign.documentUrls)[0] || campaign.documentUrl;
    }
    return campaign.documentUrl || '';
}

/**
 * Common UI interface strings translated for the validation portal
 */
export const VALIDATION_UI = {
    hub_title: {
        en: 'External Validation & Peer-Review Portal',
        es: 'Portal de Validación Externa y Comités de Pilotaje',
        it: 'Portale di Validazione Esterna e Comitati Pilota',
        de: 'Portal für Externe Validierung & Pilot-Ausschüsse',
        sk: 'Portál pre externú validáciu a pilotné výbory',
        pt: 'Portal de Validação Externa e Comités Piloto'
    },
    hub_subtitle: {
        en: 'Welcome to the central evaluation space for the Erasmus+ Learning Brains project. Select your language above and click on an active deliverable to review the document and provide your structured feedback.',
        es: 'Bienvenido al espacio central de evaluación del proyecto Erasmus+ Learning Brains. Selecciona tu idioma preferido y accede a los entregables activos para revisar la documentación y aportar tu valoración.',
        it: 'Benvenuti nello spazio centrale di valutazione del progetto Erasmus+ Learning Brains. Selezionate la lingua preferita e accedete ai deliverable attivi per esaminare la documentazione e inviare il vostro feedback.',
        de: 'Willkommen im zentralen Evaluierungsbereich des Erasmus+-Projekts Learning Brains. Wählen Sie Ihre Sprache und klicken Sie auf ein aktives Projektergebnis, um das Dokument zu prüfen und Ihr Feedback abzugeben.',
        sk: 'Vitajte v centrálnom hodnotiacom priestore projektu Erasmus+ Learning Brains. Zvoľte si jazyk a kliknite na aktívny výstup, aby ste preskúmali dokumentáciu a poskytli spätnú väzbu.',
        pt: 'Bem-vindo ao espaço central de avaliação do projeto Erasmus+ Learning Brains. Selecione o seu idioma e aceda aos resultados ativos para analisar a documentação e fornecer a sua avaliação.'
    },
    hub_active_badge: {
        en: 'Open for Review',
        es: 'Abierto para Evaluación',
        it: 'Aperto per la Valutazione',
        de: 'Offen zur Begutachtung',
        sk: 'Otvorené na hodnotenie',
        pt: 'Aberto para Avaliação'
    },
    hub_upcoming_badge: {
        en: 'Scheduled / Phase 2',
        es: 'Próximamente / Fase 2',
        it: 'In arrivo / Fase 2',
        de: 'Demnächst / Phase 2',
        sk: 'Pripravuje sa / 2. fáza',
        pt: 'Brevemente / Fase 2'
    },
    hub_start_btn: {
        en: 'Review Document & Submit Feedback →',
        es: 'Revisar Documento y Evaluar →',
        it: 'Esamina Documento e Valuta →',
        de: 'Dokument prüfen & Feedback geben →',
        sk: 'Preskúmať dokument a hodnotiť →',
        pt: 'Analisar Documento e Avaliar →'
    },
    hub_disabled_btn: {
        en: 'Scheduled for Later Phase',
        es: 'Programado para Siguiente Fase',
        it: 'Previsto per la Fase Successiva',
        de: 'Für spätere Phase geplant',
        sk: 'Naplánované na neskoršiu fázu',
        pt: 'Previsto para Fase Posterior'
    },
    hub_active_section_title: {
        en: 'Active Deliverables Open for Validation',
        es: 'Acciones y Entregables Activos para Validación',
        it: 'Azioni e Deliverable Attivi per la Validazione',
        de: 'Aktive Projektergebnisse zur Validierung',
        sk: 'Aktívne výstupy otvorené na validáciu',
        pt: 'Ações e Entregáveis Ativos para Validação'
    },
    hub_upcoming_section_title: {
        en: 'Upcoming Validation Phases (Project Roadmap)',
        es: 'Próximas Fases de Validación (Roadmap del Proyecto)',
        it: 'Prossime Fasi di Validazione (Roadmap del Progetto)',
        de: 'Kommende Validierungsphasen (Projekt-Roadmap)',
        sk: 'Pripravované fázy validácie (Harmonogram projektu)',
        pt: 'Próximas Fases de Validação (Roteiro do Projeto)'
    },
    hub_available_count: {
        en: 'available',
        es: 'disponibles',
        it: 'disponibili',
        de: 'verfügbar',
        sk: 'k dispozícii',
        pt: 'disponíveis'
    },
    back_to_hub: {
        en: 'Back to Validation Hub',
        es: 'Volver al Portal de Validación',
        it: 'Torna al Portale di Validazione',
        de: 'Zurück zum Validierungsportal',
        sk: 'Späť na portál validácie',
        pt: 'Voltar ao Portal de Validação'
    },
    hub_step1_title: {
        en: 'Select Deliverable',
        es: 'Selecciona Entregable',
        it: 'Seleziona Deliverable',
        de: 'Ergebnis auswählen',
        sk: 'Výber výstupu',
        pt: 'Selecionar Entregável'
    },
    hub_step1_desc: {
        en: 'Choose the active action you want to evaluate.',
        es: 'Elige la acción activa en la que deseas participar.',
        it: 'Scegli l\'azione attiva a cui desideri partecipare.',
        de: 'Wählen Sie die aktive Maßnahme zur Begutachtung aus.',
        sk: 'Vyberte aktívnu akciu, ktorú chcete hodnotiť.',
        pt: 'Escolha a ação ativa em que pretende participar.'
    },
    hub_step2_title: {
        en: 'Review Document',
        es: 'Revisa el Documento',
        it: 'Esamina il Documento',
        de: 'Dokument prüfen',
        sk: 'Preskúmanie dokumentu',
        pt: 'Rever o Documento'
    },
    hub_step2_desc: {
        en: 'Examine the PDF inside the integrated viewer.',
        es: 'Examina el documento en el visor o descárgalo.',
        it: 'Esamina il PDF nel visualizzatore integrato o scaricalo.',
        de: 'Prüfen Sie das PDF im integrierten Viewer.',
        sk: 'Prezrite si PDF v integrovanom prehliadači.',
        pt: 'Examine o PDF no visualizador integrado.'
    },
    hub_step3_title: {
        en: 'Submit Feedback',
        es: 'Envía tu Valoración',
        it: 'Invia Valutazione',
        de: 'Feedback absenden',
        sk: 'Odoslanie spätnej väzby',
        pt: 'Submeter Avaliação'
    },
    hub_step3_desc: {
        en: 'Complete the short structured form (5-10 min).',
        es: 'Completa el cuestionario rápido (aprox. 5-10 min).',
        it: 'Completa il breve questionario (circa 5-10 min).',
        de: 'Füllen Sie das kurze Formular aus (ca. 5-10 Min.).',
        sk: 'Vyplňte krátky štruktúrovaný formulár (5-10 min).',
        pt: 'Preencha o formulário estruturado (5-10 min).'
    },
    step_profile: {
        en: '1. Evaluator Profile',
        es: '1. Perfil del Evaluador',
        it: '1. Profilo del Valutatore',
        de: '1. Profil des Evaluators',
        sk: '1. Profil hodnotiteľa',
        pt: '1. Perfil do Avaliador'
    },
    step_ratings: {
        en: '2. Quantitative Assessment',
        es: '2. Valoración Cuantitativa',
        it: '2. Valutazione Quantitativa',
        de: '2. Quantitative Bewertung',
        sk: '2. Kvantitatívne hodnotenie',
        pt: '2. Avaliação Quantitativa'
    },
    step_feedback: {
        en: '3. Qualitative Feedback',
        es: '3. Observaciones Cualitativas',
        it: '3. Osservazioni Qualitative',
        de: '3. Qualitatives Feedback',
        sk: '3. Kvalitatívna spätná väzba',
        pt: '3. Observações Qualitativas'
    },
    step_submit: {
        en: '4. Consent & Submission',
        es: '4. Consentimiento y Envío',
        it: '4. Consenso e Invio',
        de: '4. Einverständnis & Absenden',
        sk: '4. Súhlas a odoslanie',
        pt: '4. Consentimento e Envio'
    },
    name: {
        en: 'Full Name',
        es: 'Nombre y Apellidos',
        it: 'Nome e Cognome',
        de: 'Vor- und Nachname',
        sk: 'Meno a priezvisko',
        pt: 'Nome e Apelido'
    },
    email: {
        en: 'Email Address',
        es: 'Correo Electrónico',
        it: 'Indirizzo E-mail',
        de: 'E-Mail-Adresse',
        sk: 'E-mailová adresa',
        pt: 'Endereço de E-mail'
    },
    organization: {
        en: 'Organization / Company Name',
        es: 'Organización / Empresa',
        it: 'Organizzazione / Azienda',
        de: 'Organisation / Unternehmen',
        sk: 'Názov organizácie / firmy',
        pt: 'Organização / Empresa'
    },
    country: {
        en: 'Country',
        es: 'País',
        it: 'Paese',
        de: 'Land',
        sk: 'Krajina',
        pt: 'País'
    },
    role: {
        en: 'Type of Stakeholder / Role',
        es: 'Tipo de Entidad / Perfil',
        it: 'Tipo di Organizzazione / Ruolo',
        de: 'Art der Organisation / Rolle',
        sk: 'Typ organizácie / Úloha',
        pt: 'Tipo de Entidade / Perfil'
    },
    select_option: {
        en: '-- Select an option --',
        es: '-- Selecciona una opción --',
        it: '-- Seleziona un\'opzione --',
        de: '-- Bitte wählen --',
        sk: '-- Vyberte možnosť --',
        pt: '-- Selecione uma opção --'
    },
    scale_legend: {
        en: 'Scale: 1 = Strongly Disagree, 5 = Strongly Agree',
        es: 'Escala: 1 = Muy en desacuerdo, 5 = Totalmente de acuerdo',
        it: 'Scala: 1 = Fortemente in disaccordo, 5 = Pienamente d\'accordo',
        de: 'Skala: 1 = Stimme überhaupt nicht zu, 5 = Stimme vollkommen zu',
        sk: 'Škála: 1 = Úplne nesúhlasím, 5 = Úplne súhlasím',
        pt: 'Escala: 1 = Discordo totalmente, 5 = Concordo totalmente'
    },
    download_pdf: {
        en: 'Download PDF Document',
        es: 'Descargar Documento PDF',
        it: 'Scarica Documento PDF',
        de: 'PDF-Dokument herunterladen',
        sk: 'Stiahnuť PDF dokument',
        pt: 'Descarregar Documento PDF'
    },
    open_new_tab: {
        en: 'Open in new tab',
        es: 'Abrir en pestaña nueva',
        it: 'Apri in nuova scheda',
        de: 'In neuem Tab öffnen',
        sk: 'Otvoriť v novom okne',
        pt: 'Abrir em novo separador'
    },
    draft_saved: {
        en: 'Draft automatically saved',
        es: 'Borrador guardado automáticamente',
        it: 'Bozza salvata automaticamente',
        de: 'Entwurf automatisch gespeichert',
        sk: 'Návrh automaticky uložený',
        pt: 'Rascunho guardado automaticamente'
    },
    back: {
        en: 'Back',
        es: 'Anterior',
        it: 'Indietro',
        de: 'Zurück',
        sk: 'Späť',
        pt: 'Anterior'
    },
    next: {
        en: 'Next Step',
        es: 'Siguiente Paso',
        it: 'Passaggio Successivo',
        de: 'Nächster Schritt',
        sk: 'Ďalší krok',
        pt: 'Passo Seguinte'
    },
    submit: {
        en: 'Submit Validation Feedback',
        es: 'Enviar Validación',
        it: 'Invia Valutazione',
        de: 'Feedback absenden',
        sk: 'Odoslať spätnú väzbu',
        pt: 'Submeter Validação'
    },
    submitting: {
        en: 'Submitting feedback...',
        es: 'Enviando valoración...',
        it: 'Invio in corso...',
        de: 'Wird gesendet...',
        sk: 'Odosiela sa...',
        pt: 'A enviar...'
    },
    consent_label: {
        en: 'I agree that my feedback and organizational profile will be processed by the Learning Brains consortium exclusively for Erasmus+ quality assurance, research, and project justification purposes.',
        es: 'Acepto que mis valoraciones y datos de perfil sean tratados por el consorcio de Learning Brains exclusivamente con fines de evaluación, garantía de calidad y justificación del proyecto Erasmus+.',
        it: 'Accetto che le mie valutazioni e i dati del profilo siano trattati dal consorzio Learning Brains esclusivamente ai fini di controllo qualità e rendicontazione del progetto Erasmus+.',
        de: 'Ich erkläre mich damit einverstanden, dass meine Rückmeldungen und Profildaten vom Learning Brains-Konsortium ausschließlich für Qualitätssicherung und Nachweisführung im Erasmus+-Projekt verarbeitet werden.',
        sk: 'Súhlasím s tým, aby konzorcium Learning Brains spracovalo moju spätnú väzbu a údaje o profile výhradne na účely zabezpečenia kvality a vykazovania projektu Erasmus+.',
        pt: 'Concordo que o meu feedback e dados de perfil sejam tratados pelo consórcio Learning Brains exclusivamente para fins de garantia de qualidade e justificação do projeto Erasmus+.'
    },
    success_title: {
        en: 'Thank You for Your Validation Feedback!',
        es: '¡Muchas Gracias por tu Validación!',
        it: 'Grazie Mille per la Vostra Valutazione!',
        de: 'Vielen Dank für Ihr Feedback!',
        sk: 'Ďakujeme za vašu spätnú väzbu!',
        pt: 'Muito Obrigado pelo seu Feedback!'
    },
    success_desc: {
        en: 'Your contribution has been successfully registered. The insights provided by your organization will be directly incorporated to refine the Learning Brains deliverables.',
        es: 'Tus respuestas se han registrado con éxito. Las aportaciones de tu entidad serán incorporadas directamente en la mejora y consolidación de los resultados de Learning Brains.',
        it: 'Il vostro contributo è stato registrato con successo. I contributi della vostra organizzazione saranno utilizzati per perfezionare i risultati di Learning Brains.',
        de: 'Ihr Beitrag wurde erfolgreich erfasst. Ihre Rückmeldungen fließen direkt in die Weiterentwicklung der Projektergebnisse von Learning Brains ein.',
        sk: 'Váš príspevok bol úspešne zaznamenaný. Poznatky vašej organizácie budú priamo využité pri finalizácii výstupov projektu Learning Brains.',
        pt: 'A sua contribuição foi registada com sucesso. As observações fornecidas pela sua organização serão incorporadas para aperfeiçoar os resultados de Learning Brains.'
    },
    campaign_not_found: {
        en: 'Validation campaign not found or currently inactive.',
        es: 'Campaña de validación no encontrada o actualmente inactiva.',
        it: 'Campagna di validazione non trovata o attualmente non attiva.',
        de: 'Validierungskampagne nicht gefunden oder derzeit nicht aktiv.',
        sk: 'Kampaň na overenie sa nenašla alebo je momentálne neaktívna.',
        pt: 'Campanha de validação não encontrada ou atualmente inativa.'
    },
    tab_document: {
        en: 'Document (PDF)',
        es: 'Documento (PDF)',
        it: 'Documento (PDF)',
        de: 'Dokument (PDF)',
        sk: 'Dokument (PDF)',
        pt: 'Documento (PDF)'
    },
    tab_form: {
        en: 'Feedback Form',
        es: 'Cuestionario',
        it: 'Questionario',
        de: 'Fragebogen',
        sk: 'Dotazník',
        pt: 'Formulário'
    }
};
