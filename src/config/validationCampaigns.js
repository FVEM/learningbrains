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

export const ITINERARY_PROFESSIONAL_BACKGROUNDS = [
    {
        id: 'vet_trainer',
        label: {
            en: 'VET trainer or educator',
            es: 'Formador/a o docente de Formación Profesional (FP)',
            it: 'Formatore o docente di Istruzione e Formazione Professionale',
            de: 'Berufsbildungstrainer oder Lehrkraft',
            sk: 'Tréner alebo pedagóg odborného vzdelávania (OVP)',
            pt: 'Formador ou educador de EFP'
        }
    },
    {
        id: 'company_trainer',
        label: {
            en: 'Company trainer or learning facilitator',
            es: 'Formador/a interno de empresa o facilitador de aprendizaje',
            it: 'Formatore aziendale o facilitatore dell\'apprendimento',
            de: 'Betrieblicher Ausbilder oder Lernbegleiter',
            sk: 'Podnikový školiteľ alebo facilitátor vzdelávania',
            pt: 'Formador na empresa ou facilitador de aprendizagem'
        }
    },
    {
        id: 'hr_training_manager',
        label: {
            en: 'HR or training manager',
            es: 'Responsable de Recursos Humanos o Formación',
            it: 'Responsabile Risorse Umane o formazione',
            de: 'Personal- oder Weiterbildungsleiter',
            sk: 'Manažér ľudských zdrojov alebo vzdelávania',
            pt: 'Gestor de Recursos Humanos ou de formação'
        }
    },
    {
        id: 'industrial_rep',
        label: {
            en: 'Industrial company representative',
            es: 'Representante de empresa industrial',
            it: 'Rappresentante di impresa industriale',
            de: 'Vertreter eines Industrieunternehmens',
            sk: 'Zástupca priemyselnej spoločnosti',
            pt: 'Representante de empresa industrial'
        }
    },
    {
        id: 'ai_expert',
        label: {
            en: 'AI or digital technologies expert',
            es: 'Experto/a en Inteligencia Artificial o tecnologías digitales',
            it: 'Esperto di IA o tecnologie digitali',
            de: 'Experte für KI oder digitale Technologien',
            sk: 'Expert na umelú inteligenciu alebo digitálne technológie',
            pt: 'Especialista em IA ou tecnologias digitais'
        }
    },
    {
        id: 'curriculum_expert',
        label: {
            en: 'Curriculum or instructional design expert',
            es: 'Experto/a en diseño curricular o instruccional',
            it: 'Esperto di progettazione curricolare o didattica',
            de: 'Experte für Lehrplan- oder Instruktionsdesign',
            sk: 'Expert na tvorbu kurikula alebo vzdelávací dizajn',
            pt: 'Especialista em desenho curricular ou instrucional'
        }
    },
    {
        id: 'researcher',
        label: {
            en: 'Researcher or academic expert',
            es: 'Investigador/a o experto académico',
            it: 'Ricercatore o esperto accademico',
            de: 'Forscher oder akademischer Experte',
            sk: 'Výskumník alebo akademický expert',
            pt: 'Investigador ou especialista académico'
        }
    },
    {
        id: 'policy_rep',
        label: {
            en: 'Policy or VET system representative',
            es: 'Representante institucional o del sistema de FP / políticas públicas',
            it: 'Rappresentante istituzionale o del sistema formativo',
            de: 'Vertreter von Politik oder Berufsbildungssystem',
            sk: 'Zástupca verejnej správy alebo systému OVP',
            pt: 'Representante de políticas públicas ou do sistema de EFP'
        }
    },
    {
        id: 'other',
        label: {
            en: 'Other',
            es: 'Otro perfil profesional',
            it: 'Altro profilo professionale',
            de: 'Sonstiges Profil',
            sk: 'Iný profil',
            pt: 'Outro perfil'
        }
    }
];

export const EXPERIENCE_YEARS = [
    { id: '0-5', label: { en: '0–5 years', es: '0–5 años', it: '0–5 anni', de: '0–5 Jahre', sk: '0–5 rokov', pt: '0–5 anos' } },
    { id: '6-10', label: { en: '6–10 years', es: '6–10 años', it: '6–10 anni', de: '6–10 Jahre', sk: '6–10 rokov', pt: '6–10 anos' } },
    { id: '11-20', label: { en: '11–20 years', es: '11–20 años', it: '11–20 anni', de: '11–20 Jahre', sk: '11–20 rokov', pt: '11–20 anos' } },
    { id: '20+', label: { en: 'More than 20 years', es: 'Más de 20 años', it: 'Più di 20 anni', de: 'Mehr als 20 Jahre', sk: 'Viac ako 20 rokov', pt: 'Mais de 20 anos' } }
];

export const AI_EXPERIENCE_LEVELS = [
    { id: 'none', label: { en: 'None', es: 'Ninguna', it: 'Nessuna', de: 'Keine', sk: 'Žiadne', pt: 'Nenhuma' } },
    { id: 'limited', label: { en: 'Limited', es: 'Básica / Limitada', it: 'Limitata', de: 'Gering', sk: 'Obmedzené', pt: 'Limitada' } },
    { id: 'moderate', label: { en: 'Moderate', es: 'Intermedia / Moderada', it: 'Moderata', de: 'Mittel', sk: 'Mierne', pt: 'Moderada' } },
    { id: 'extensive', label: { en: 'Extensive', es: 'Avanzada / Extensa', it: 'Avanzata', de: 'Umfangreich', sk: 'Rozsiahle', pt: 'Extensa' } }
];

export const NPC_PROFESSIONAL_PROFILES = [
    {
        id: 'industrial_company',
        label: {
            en: 'Industrial company',
            es: 'Empresa industrial',
            it: 'Azienda industriale',
            de: 'Industrieunternehmen',
            sk: 'Priemyselná spoločnosť',
            pt: 'Empresa industrial'
        }
    },
    {
        id: 'hr_training_management',
        label: {
            en: 'HR / training management',
            es: 'Gestión de RRHH / formación',
            it: 'Gestione risorse umane / formazione',
            de: 'Personalmanagement / Ausbildungsleitung',
            sk: 'Riadenie ľudských zdrojov a vzdelávania',
            pt: 'Gestão de RH / formação'
        }
    },
    {
        id: 'company_trainer',
        label: {
            en: 'Company trainer / c-VET',
            es: 'Formador de empresa / FP continua (c-VET)',
            it: 'Formatore aziendale / c-VET',
            de: 'Betrieblicher Ausbilder / Weiterbildung (c-VET)',
            sk: 'Podnikový lektor / c-VET',
            pt: 'Formador de empresa / c-VET'
        }
    },
    {
        id: 'ai_digital_technologies',
        label: {
            en: 'AI / digital technologies',
            es: 'IA / tecnologías digitales',
            it: 'IA / tecnologie digitali',
            de: 'KI / digitale Technologien',
            sk: 'Umelá inteligencia / digitálne technológie',
            pt: 'IA / tecnologias digitais'
        }
    },
    {
        id: 'industry40_innovation',
        label: {
            en: 'Industry 4.0 / innovation',
            es: 'Industria 4.0 / innovación',
            it: 'Industria 4.0 / innovazione',
            de: 'Industrie 4.0 / Innovation',
            sk: 'Priemysel 4.0 / inovácie',
            pt: 'Indústria 4.0 / inovação'
        }
    },
    {
        id: 'research_academia',
        label: {
            en: 'Research / academia',
            es: 'Investigación / universidad',
            it: 'Ricerca / università',
            de: 'Forschung / Wissenschaft',
            sk: 'Výskum / akademická sféra',
            pt: 'Investigação / academia'
        }
    },
    {
        id: 'other',
        label: {
            en: 'Other',
            es: 'Otro perfil profesional',
            it: 'Altro profilo professionale',
            de: 'Sonstiges Profil',
            sk: 'Iný profil',
            pt: 'Outro perfil'
        }
    }
];

export const VALIDATION_CAMPAIGNS = {
    'npc-1': {
        id: 'npc-1',
        slug: 'npc-1',
        status: 'upcoming',
        profileType: 'npc',
        documentUrl: '/documents/validation/learning-brains-npc1-good-practices-en.pdf',
        documentUrls: {
            en: '/documents/validation/learning-brains-npc1-good-practices-en.pdf',
            es: '/documents/validation/learning-brains-npc1-good-practices-es.pdf',
            de: '/documents/validation/learning-brains-npc1-good-practices-de.pdf',
            it: '/documents/validation/learning-brains-npc1-good-practices-it.pdf',
            pt: '/documents/validation/learning-brains-npc1-good-practices-pt.pdf',
            sk: '/documents/validation/learning-brains-npc1-good-practices-sk.pdf'
        },
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
                en: 'National Pilot Committee 1: R1 Mapping Report Consultation',
                es: 'National Pilot Committee 1: Consulta del Informe de Mapeo R1',
                it: 'National Pilot Committee 1: Consultazione Rapporto di Mappatura R1',
                de: 'National Pilot Committee 1: Konsultation zum R1-Mapping-Bericht',
                sk: 'National Pilot Committee 1: Konzultácia k mapovacej správe R1',
                pt: 'National Pilot Committee 1: Consulta do Relatório de Mapeamento R1'
            },
            subtitle: {
                en: 'R1 – Mapping Report of AI-tools for On-the-job Training Practice: Trends and Case Studies',
                es: 'R1 – Informe de Mapeo de Herramientas de IA para la Formación en el Puesto de Trabajo: Tendencias y Casos de Estudio',
                it: 'R1 – Rapporto di Mappatura degli Strumenti di IA per la Formazione sul Lavoro: Tendenze e Casi Studio',
                de: 'R1 – Mapping-Bericht über KI-Tools für die betriebliche Ausbildung: Trends und Fallstudien',
                sk: 'R1 – Mapovacia správa o nástrojoch umelej inteligencie pre prax vzdelávania na pracovisku: Trendy a prípadové štúdie',
                pt: 'R1 – Relatório de Mapeamento de Ferramentas de IA para a Formação no Posto de Trabalho: Tendências e Casos de Estudo'
            },
            instructions: {
                en: 'This questionnaire is designed for the first National Pilot Committee (NPC) consultation on R1 – Mapping Report of AI-tools for On-the-job Training Practice: Trends and Case Studies. Your independent expert feedback will support the quality, relevance and practical usefulness of the report before its finalization. Estimated completion time: 10-15 minutes.',
                es: 'Este cuestionario está diseñado para la primera consulta del Comité Piloto Nacional (NPC) sobre el R1 – Informe de Mapeo de Herramientas de IA para la Formación en el Puesto de Trabajo: Tendencias y Casos de Estudio. Tus aportaciones expertas e independientes ayudarán a garantizar la calidad, relevancia y utilidad práctica del informe antes de su cierre. Tiempo estimado: 10-15 minutos.',
                it: 'Questo questionario è progettato per la prima consultazione del Comitato Pilota Nazionale (NPC) su R1 – Rapporto di Mappatura degli Strumenti di IA per la Formazione sul Lavoro: Tendenze e Casi Studio. Il vostro feedback esperto indipendente sosterrà la qualità, la rilevanza e l\'utilità pratica del rapporto prima della sua finalizzazione. Tempo stimato: 10-15 minuti.',
                de: 'Dieser Fragebogen dient der ersten Konsultation des Nationalen Pilot-Ausschusses (NPC) zu R1 – Mapping-Bericht über KI-Tools für die betriebliche Ausbildung: Trends und Fallstudien. Ihr Expertenfeedback fließt direkt in die Finalisierung des Berichts ein. Geschätzte Dauer: 10-15 Minuten.',
                sk: 'Tento dotazník je určený pre prvú konzultáciu Národného pilotného výboru (NPC) k R1 – Mapovacia správa o nástrojoch umelej inteligencie pre prax vzdelávania na pracovisku: Trendy a prípadové štúdie. Vaša spätná väzba podporí kvalitu a praktickú využiteľnosť správy pred jej dokončením. Odhadovaný čas: 10-15 minút.',
                pt: 'Este questionário destina-se à primeira consulta do Comité Piloto Nacional (NPC) sobre o R1 – Relatório de Mapeamento de Ferramentas de IA para a Formação no Posto de Trabalho: Tendências e Casos de Estudo. O seu feedback apoiará a qualidade, relevância e utilidade prática do relatório antes da sua conclusão. Tempo estimado: 10-15 minutos.'
            },
            workingDocumentNote: {
                en: 'Please note that this is a working document. The final report to be published on the website will be generated incorporating the consultation contributions and the considerations of the working group.',
                es: 'Ten en cuenta que el presente es un documento de trabajo. Con las aportaciones de la consulta y las consideraciones del grupo de trabajo se generará el informe definitivo visible en la web.',
                it: 'Si prega di notare che questo è un documento di lavoro. Con i contributi della consultazione e le considerazioni del gruppo di lavoro verrà generato il rapporto definitivo visibile sul sito web.',
                de: 'Bitte beachten Sie, dass es sich hierbei um ein Arbeitsdokument handelt. Auf Grundlage der Konsultationsbeiträge und der Beratungen der Arbeitsgruppe wird der endgültige Bericht auf der Website veröffentlicht.',
                sk: 'Upozorňujeme, že toto je pracovný dokument. Na základe príspevkov z konzultácie a odporúčaní pracovnej skupiny bude vypracovaná konečná správa zverejnená na webe.',
                pt: 'Tenha em atenção que este é um documento de trabalho. Com os contributos da consulta e as considerações do grupo de trabalho será gerado o relatório definitivo visível no website.'
            }
        },
        likertQuestions: [
            // Section 2: R1 purpose and relevance (P1 - P6)
            {
                id: 'p1',
                section: {
                    en: '2. R1 Purpose and Relevance',
                    es: '2. Propósito y Relevancia del R1',
                    it: '2. Scopo e Rilevanza di R1',
                    de: '2. Zweck und Relevanz von R1',
                    sk: '2. Účel a význam R1',
                    pt: '2. Propósito e Relevância do R1'
                },
                title: {
                    en: 'The purpose and intended use of the Mapping Report are clear.',
                    es: 'El propósito y el uso previsto del Informe de Mapeo son claros.',
                    it: 'Lo scopo e l\'uso previsto del Rapporto di Mappatura sono chiari.',
                    de: 'Zweck und beabsichtigte Verwendung des Mapping-Berichts sind klar.',
                    sk: 'Účel a zamýšľané použitie mapovacej správy sú jasné.',
                    pt: 'O propósito e a utilização prevista do Relatório de Mapeamento são claros.'
                }
            },
            {
                id: 'p2',
                section: {
                    en: '2. R1 Purpose and Relevance',
                    es: '2. Propósito y Relevancia del R1',
                    it: '2. Scopo e Rilevanza di R1',
                    de: '2. Zweck und Relevanz von R1',
                    sk: '2. Účel a význam R1',
                    pt: '2. Propósito e Relevância do R1'
                },
                title: {
                    en: 'The report addresses relevant needs related to AI-supported on-the-job training in industrial companies.',
                    es: 'El informe responde a necesidades relevantes sobre formación en el puesto de trabajo con apoyo de IA en empresas industriales.',
                    it: 'Il rapporto risponde a esigenze rilevanti relative alla formazione sul lavoro supportata dall\'IA nelle aziende industriali.',
                    de: 'Der Bericht adressiert relevante Bedarfe zur KI-gestützten Arbeitsplatzschulung in Industrieunternehmen.',
                    sk: 'Správa reaguje na relevantné potreby týkajúce sa školenia na pracovisku s podporou umelej inteligencie v priemyselných podnikoch.',
                    pt: 'O relatório aborda necessidades relevantes relacionadas com a formação no posto de trabalho apoiada por IA em empresas industriais.'
                }
            },
            {
                id: 'p3',
                section: {
                    en: '2. R1 Purpose and Relevance',
                    es: '2. Propósito y Relevancia del R1',
                    it: '2. Scopo e Rilevanza di R1',
                    de: '2. Zweck und Relevanz von R1',
                    sk: '2. Účel a význam R1',
                    pt: '2. Propósito e Relevância do R1'
                },
                title: {
                    en: 'The report is relevant to HR managers, training managers, company trainers and other intended target groups.',
                    es: 'El informe es relevante para responsables de RRHH, directores de formación, formadores de empresa y otros grupos destinatarios.',
                    it: 'Il rapporto è rilevante per responsabili HR, responsabili della formazione, formatori aziendali e altri gruppi destinatari.',
                    de: 'Der Bericht ist relevant für HR-Manager, Ausbildungsleiter, betriebliche Trainer und andere Zielgruppen.',
                    sk: 'Správa je relevantná pre personálnych manažérov, manažérov vzdelávania, podnikových lektorov a ďalšie cieľové skupiny.',
                    pt: 'O relatório é relevante para gestores de RH, responsáveis de formação, formadores de empresa e outros grupos-alvo.'
                }
            },
            {
                id: 'p4',
                section: {
                    en: '2. R1 Purpose and Relevance',
                    es: '2. Propósito y Relevancia del R1',
                    it: '2. Scopo e Rilevanza di R1',
                    de: '2. Zweck und Relevanz von R1',
                    sk: '2. Účel a význam R1',
                    pt: '2. Propósito e Relevância do R1'
                },
                title: {
                    en: 'The report provides a useful overview of current developments in AI applied to workplace learning and training.',
                    es: 'El informe proporciona una visión general útil de los avances actuales de la IA aplicada al aprendizaje y la formación en el trabajo.',
                    it: 'Il rapporto fornisce una panoramica utile degli sviluppi attuali dell\'IA applicata all\'apprendimento e alla formazione sul lavoro.',
                    de: 'Der Bericht bietet einen nützlichen Überblick über aktuelle Entwicklungen im Bereich KI für betriebliches Lernen.',
                    sk: 'Správa poskytuje užitočný prehľad o aktuálnom vývoji v oblasti umelej inteligencie aplikovanej na učenie sa a školenie na pracovisku.',
                    pt: 'O relatório fornece uma visão geral útil dos desenvolvimentos atuais da IA aplicada à aprendizagem e formação no local de trabalho.'
                }
            },
            {
                id: 'p5',
                section: {
                    en: '2. R1 Purpose and Relevance',
                    es: '2. Propósito y Relevancia del R1',
                    it: '2. Scopo e Rilevanza di R1',
                    de: '2. Zweck und Relevanz von R1',
                    sk: '2. Účel a význam R1',
                    pt: '2. Propósito e Relevância do R1'
                },
                title: {
                    en: 'The report maintains an appropriate focus on industrial companies and SMEs.',
                    es: 'El informe mantiene un enfoque adecuado en las empresas industriales y las PYMEs.',
                    it: 'Il rapporto mantiene un focus adeguato sulle aziende industriali e sulle PMI.',
                    de: 'Der Bericht behält einen angemessenen Fokus auf Industrieunternehmen und KMU bei.',
                    sk: 'Správa si udržiava primerané zameranie na priemyselné podniky a MSP.',
                    pt: 'O relatório mantém um foco adequado nas empresas industriais e PME.'
                }
            },
            {
                id: 'p6',
                section: {
                    en: '2. R1 Purpose and Relevance',
                    es: '2. Propósito y Relevancia del R1',
                    it: '2. Scopo e Rilevanza di R1',
                    de: '2. Zweck und Relevanz von R1',
                    sk: '2. Účel a význam R1',
                    pt: '2. Propósito e Relevância do R1'
                },
                title: {
                    en: 'The findings are sufficiently relevant to support the development of the Learning Brains Training Programme.',
                    es: 'Las conclusiones son suficientemente relevantes para sustentar el desarrollo del Itinerario Formativo de Learning Brains.',
                    it: 'I risultati sono sufficientemente rilevanti per supportare lo sviluppo del Programma Formativo di Learning Brains.',
                    de: 'Die Ergebnisse sind hinreichend relevant, um die Entwicklung des Learning Brains-Schulungsprogramms zu unterstützen.',
                    sk: 'Zistenia sú dostatočne relevantné na podporu vývoja tréningového programu Learning Brains.',
                    pt: 'As conclusões são suficientemente relevantes para apoiar o desenvolvimento do Programa de Formação Learning Brains.'
                }
            },

            // Section 3: Quality and coverage of the mapping (Q1 - Q7)
            {
                id: 'q1',
                section: {
                    en: '3. Quality and Coverage of the Mapping',
                    es: '3. Calidad y Cobertura del Mapeo',
                    it: '3. Qualità e Copertura della Mappatura',
                    de: '3. Qualität und Umfang der Erhebung',
                    sk: '3. Kvalita a rozsah mapovania',
                    pt: '3. Qualidade e Cobertura do Mapeamento'
                },
                title: {
                    en: 'The report is clearly structured and easy to navigate.',
                    es: 'El informe está claramente estructurado y es fácil de navegar y consultar.',
                    it: 'Il rapporto è chiaramente strutturato e facile da consultare.',
                    de: 'Der Bericht ist klar gegliedert und leicht zu handhaben.',
                    sk: 'Správa je jasne štruktúrovaná a ľahko sa v nej orientuje.',
                    pt: 'O relatório está claramente estruturado e é fácil de consultar.'
                }
            },
            {
                id: 'q2',
                section: {
                    en: '3. Quality and Coverage of the Mapping',
                    es: '3. Calidad y Cobertura del Mapeo',
                    it: '3. Qualità e Copertura della Mappatura',
                    de: '3. Qualität und Umfang der Erhebung',
                    sk: '3. Kvalita a rozsah mapovania',
                    pt: '3. Qualidade e Cobertura do Mapeamento'
                },
                title: {
                    en: 'The main findings and trends are explained in a clear and understandable way.',
                    es: 'Los principales hallazgos y tendencias se explican de forma clara y comprensible.',
                    it: 'I principali risultati e le tendenze sono spiegati in modo chiaro e comprensibile.',
                    de: 'Die wichtigsten Ergebnisse und Trends werden verständlich erklärt.',
                    sk: 'Hlavné zistenia a trendy sú vysvetlené jasným a zrozumiteľným spôsobom.',
                    pt: 'As principais conclusões e tendências são explicadas de forma clara e compreensível.'
                }
            },
            {
                id: 'q3',
                section: {
                    en: '3. Quality and Coverage of the Mapping',
                    es: '3. Calidad y Cobertura del Mapeo',
                    it: '3. Qualità e Copertura della Mappatura',
                    de: '3. Qualität und Umfang der Erhebung',
                    sk: '3. Kvalita a rozsah mapovania',
                    pt: '3. Qualidade e Cobertura do Mapeamento'
                },
                title: {
                    en: 'The range of AI tools and applications covered is appropriate for the purpose of the report.',
                    es: 'La gama de herramientas y aplicaciones de IA abordadas es adecuada para el propósito del informe.',
                    it: 'La gamma di strumenti e applicazioni di IA trattati è adeguata allo scopo del rapporto.',
                    de: 'Die Bandbreite der erfassten KI-Tools und -Anwendungen ist für den Zweck des Berichts angemessen.',
                    sk: 'Rozsah pokrytých nástrojov a aplikácií umelej inteligencie je primeraný účelu správy.',
                    pt: 'A gama de ferramentas e aplicações de IA abordadas é adequada ao objetivo do relatório.'
                }
            },
            {
                id: 'q4',
                section: {
                    en: '3. Quality and Coverage of the Mapping',
                    es: '3. Calidad y Cobertura del Mapeo',
                    it: '3. Qualità e Copertura della Mappatura',
                    de: '3. Qualität und Umfang der Erhebung',
                    sk: '3. Kvalita a rozsah mapovania',
                    pt: '3. Qualidade e Cobertura do Mapeamento'
                },
                title: {
                    en: 'The report provides a balanced view of opportunities, limitations and implementation challenges.',
                    es: 'El informe proporciona una visión equilibrada de las oportunidades, limitaciones y desafíos de implantación.',
                    it: 'Il rapporto fornisce una visione equilibrata di opportunità, limiti e sfide di implementazione.',
                    de: 'Der Bericht bietet eine ausgewogene Sicht auf Chancen, Grenzen und Umsetzungsherausforderungen.',
                    sk: 'Správa poskytuje vyvážený pohľad na príležitosti, obmedzenia a výzvy pri implementácii.',
                    pt: 'O relatório fornece uma visão equilibrada das oportunidades, limitações e desafios de implementação.'
                }
            },
            {
                id: 'q5',
                section: {
                    en: '3. Quality and Coverage of the Mapping',
                    es: '3. Calidad y Cobertura del Mapeo',
                    it: '3. Qualità e Copertura della Mappatura',
                    de: '3. Qualität und Umfang der Erhebung',
                    sk: '3. Kvalita a rozsah mapovania',
                    pt: '3. Qualidade e Cobertura do Mapeamento'
                },
                title: {
                    en: 'The information presented appears sufficiently current and relevant to today’s training context.',
                    es: 'La información presentada parece suficientemente actualizada y relevante para el contexto formativo actual.',
                    it: 'Le informazioni presentate appaiono sufficientemente attuali e rilevanti per il contesto formativo odierno.',
                    de: 'Die dargelegten Informationen wirken aktuell und für den heutigen Weiterbildungskontext relevant.',
                    sk: 'Prezentované informácie pôsobia dostatočne aktuálne a relevantne pre dnešný kontext vzdelávania.',
                    pt: 'A informação apresentada parece suficientemente atual e relevante para o contexto de formação atual.'
                }
            },
            {
                id: 'q6',
                section: {
                    en: '3. Quality and Coverage of the Mapping',
                    es: '3. Calidad y Cobertura del Mapeo',
                    it: '3. Qualità e Copertura della Mappatura',
                    de: '3. Qualität und Umfang der Erhebung',
                    sk: '3. Kvalita a rozsah mapovania',
                    pt: '3. Qualidade e Cobertura do Mapeamento'
                },
                title: {
                    en: 'The report reflects a useful range of company, sectoral and/or national contexts.',
                    es: 'El informe refleja una variedad útil de contextos empresariales, sectoriales y/o nacionales.',
                    it: 'Il rapporto riflette una gamma utile di contesti aziendali, settoriali e/o nazionali.',
                    de: 'Der Bericht spiegelt eine nützliche Bandbreite an Unternehmens-, Branchen- und/oder Länderkontexten wider.',
                    sk: 'Správa odráža užitočnú škálu firemných, sektorových a/alebo národných kontextov.',
                    pt: 'O relatório reflete uma variedade útil de contextos empresariais, setoriais e/ou nacionais.'
                }
            },
            {
                id: 'q7',
                section: {
                    en: '3. Quality and Coverage of the Mapping',
                    es: '3. Calidad y Cobertura del Mapeo',
                    it: '3. Qualità e Copertura della Mappatura',
                    de: '3. Quality und Umfang der Erhebung',
                    sk: '3. Kvalita a rozsah mapovania',
                    pt: '3. Qualidade e Cobertura do Mapeamento'
                },
                title: {
                    en: 'The conclusions are consistent with the evidence and examples presented in the report.',
                    es: 'Las conclusiones son coherentes con las evidencias y ejemplos presentados en el informe.',
                    it: 'Le conclusioni sono coerenti con le evidenze e gli esempi presentati nel rapporto.',
                    de: 'Die Schlussfolgerungen stimmen mit den dargelegten Belegen und Beispielen überein.',
                    sk: 'Závery sú v súlade s dôkazmi a príkladmi uvedenými v správe.',
                    pt: 'As conclusões são consistentes com as evidências e exemplos apresentados no relatório.'
                }
            },

            // Section 4: AI tools, trends and case studies (T1 - T6)
            {
                id: 't1',
                section: {
                    en: '4. AI Tools, Trends and Case Studies',
                    es: '4. Herramientas de IA, Tendencias y Casos de Estudio',
                    it: '4. Strumenti di IA, Tendenze e Casi Studio',
                    de: '4. KI-Tools, Trends und Fallstudien',
                    sk: '4. Nástroje umelej inteligencie, trendy a prípadové štúdie',
                    pt: '4. Ferramentas de IA, Tendências e Casos de Estudo'
                },
                title: {
                    en: 'The report helps readers understand the potential strengths and limitations of different AI applications.',
                    es: 'El informe ayuda a comprender las fortalezas y limitaciones potenciales de diferentes aplicaciones de IA.',
                    it: 'Il rapporto aiuta a comprendere i potenziali punti di forza e i limiti delle diverse applicazioni di IA.',
                    de: 'Der Bericht hilft, Stärken und Grenzen verschiedener KI-Anwendungen zu verstehen.',
                    sk: 'Správa pomáha čitateľom pochopiť silné stránky a obmedzenia rôznych aplikácií umelej inteligencie.',
                    pt: 'O relatório ajuda os leitores a compreender os pontos fortes e limitações de diferentes aplicações de IA.'
                }
            },
            {
                id: 't2',
                section: {
                    en: '4. AI Tools, Trends and Case Studies',
                    es: '4. Herramientas de IA, Tendencias y Casos de Estudio',
                    it: '4. Strumenti di IA, Tendenze e Casi Studio',
                    de: '4. KI-Tools, Trends und Fallstudien',
                    sk: '4. Nástroje umelej inteligencie, trendy a prípadové štúdie',
                    pt: '4. Ferramentas de IA, Tendências e Casos de Estudo'
                },
                title: {
                    en: 'The case studies or practical examples are clear and useful.',
                    es: 'Los casos de estudio o ejemplos prácticos son claros y útiles.',
                    it: 'I casi studio o gli esempi pratici sono chiari e utili.',
                    de: 'Die Fallstudien bzw. Praxisbeispiele sind anschaulich und nützlich.',
                    sk: 'Prípadové štúdie alebo praktické príklady sú jasné a užitočné.',
                    pt: 'Os casos de estudo ou exemplos práticos são claros e úteis.'
                }
            },
            {
                id: 't3',
                section: {
                    en: '4. AI Tools, Trends and Case Studies',
                    es: '4. Herramientas de IA, Tendencias y Casos de Estudio',
                    it: '4. Strumenti di IA, Tendenze e Casi Studio',
                    de: '4. KI-Tools, Trends und Fallstudien',
                    sk: '4. Nástroje umelej inteligencie, trendy a prípadové štúdie',
                    pt: '4. Ferramentas de IA, Tendências e Casos de Estudo'
                },
                title: {
                    en: 'The selected examples illustrate realistic applications of AI in workplace learning.',
                    es: 'Los ejemplos seleccionados ilustran aplicaciones realistas de la IA en la formación en el trabajo.',
                    it: 'Gli esempi selezionati illustrano applicazioni realistiche dell\'IA nell\'apprendimento sul lavoro.',
                    de: 'Die Beispiele verdeutlichen realistische Anwendungen von KI am Arbeitsplatz.',
                    sk: 'Vybrané príklady ilustrujú realistické aplikácie umelej inteligencie pri učení sa na pracovisku.',
                    pt: 'Os exemplos selecionados ilustram aplicações realistas da IA na aprendizagem no local de trabalho.'
                }
            },
            {
                id: 't4',
                section: {
                    en: '4. AI Tools, Trends and Case Studies',
                    es: '4. Herramientas de IA, Tendencias y Casos de Estudio',
                    it: '4. Strumenti di IA, Tendenze e Casi Studio',
                    de: '4. KI-Tools, Trends und Fallstudien',
                    sk: '4. Nástroje umelej inteligencie, trendy a prípadové štúdie',
                    pt: '4. Ferramentas de IA, Tendências e Casos de Estudo'
                },
                title: {
                    en: 'The report provides enough information to understand the suitability of different approaches for different organisational contexts.',
                    es: 'El informe aporta información suficiente para comprender la idoneidad de los enfoques según el contexto organizativo.',
                    it: 'Il rapporto fornisce informazioni sufficienti per comprendere l\'idoneità dei vari approcci per diversi contesti organizzativi.',
                    de: 'Der Bericht bietet genügend Informationen über die Eignung verschiedener Ansätze für unterschiedliche Kontexte.',
                    sk: 'Správa poskytuje dostatok informácií na pochopenie vhodnosti rôznych prístupov pre rôzne organizačné kontexty.',
                    pt: 'O relatório fornece informação suficiente para compreender a adequação das abordagens a diferentes contextos organizacionais.'
                }
            },
            {
                id: 't5',
                section: {
                    en: '4. AI Tools, Trends and Case Studies',
                    es: '4. Herramientas de IA, Tendencias y Casos de Estudio',
                    it: '4. Strumenti di IA, Tendenze e Casi Studio',
                    de: '4. KI-Tools, Trends und Fallstudien',
                    sk: '4. Nástroje umelej inteligencie, trendy a prípadové štúdie',
                    pt: '4. Ferramentas de IA, Tendências e Casos de Estudo'
                },
                title: {
                    en: 'The trends and practices highlighted are relevant enough to inform future training content.',
                    es: 'Las tendencias y prácticas destacadas son lo bastante relevantes para orientar los futuros contenidos formativos.',
                    it: 'Le tendenze e le pratiche evidenziate sono rilevanti per orientare i futuri contenuti formativi.',
                    de: 'Die hervorgehobenen Trends sind relevant genug, um künftige Schulungsinhalte zu gestalten.',
                    sk: 'Zvýraznené trendy a postupy sú dostatočne relevantné na to, aby boli podkladom pre budúci obsah vzdelávania.',
                    pt: 'As tendências e práticas destacadas são suficientemente relevantes para fundamentar futuros conteúdos formativos.'
                }
            },
            {
                id: 't6',
                section: {
                    en: '4. AI Tools, Trends and Case Studies',
                    es: '4. Herramientas de IA, Tendencias y Casos de Estudio',
                    it: '4. Strumenti di IA, Tendenze e Casi Studio',
                    de: '4. KI-Tools, Trends und Fallstudien',
                    sk: '4. Nástroje umelej inteligencie, trendy a prípadové štúdie',
                    pt: '4. Ferramentas de IA, Tendências e Casos de Estudo'
                },
                title: {
                    en: 'The report helps distinguish promising practical uses of AI from applications with limited relevance to workplace training.',
                    es: 'El informe ayuda a distinguir usos prácticos prometedores de la IA de aplicaciones de escasa relevancia para la formación laboral.',
                    it: 'Il rapporto aiuta a distinguere gli usi pratici promettenti dell\'IA da applicazioni poco rilevanti per la formazione.',
                    de: 'Der Bericht hilft, vielversprechende KI-Nutzungen von weniger praxisrelevanten Anwendungen zu unterscheiden.',
                    sk: 'Správa pomáha odlíšiť sľubné praktické využitia umelej inteligencie od aplikácií s obmedzeným významom pre školenia.',
                    pt: 'O relatório ajuda a distinguir utilizações práticas promissoras da IA de aplicações com relevância limitada para a formação.'
                }
            },

            // Section 5: Practical value and transferability (V1 - V6)
            {
                id: 'v1',
                section: {
                    en: '5. Practical Value and Transferability',
                    es: '5. Valor Práctico y Transferibilidad',
                    it: '5. Valore Pratico e Trasferibilità',
                    de: '5. Praktischer Nutzen und Übertragbarkeit',
                    sk: '5. Praktická hodnota a prenositeľnosť',
                    pt: '5. Valor Prático e Transferibilidade'
                },
                title: {
                    en: 'The report can help HR and training professionals identify possible uses of AI in their own organisations.',
                    es: 'El informe puede ayudar a los profesionales de RRHH y formación a identificar posibles usos de la IA en sus organizaciones.',
                    it: 'Il rapporto può aiutare i professionisti di HR e formazione a individuare possibili usi dell\'IA nelle proprie organizzazioni.',
                    de: 'Der Bericht kann Personal- und Weiterbildungsexperten helfen, Einsatzmöglichkeiten von KI im eigenen Betrieb zu erkennen.',
                    sk: 'Správa môže pomôcť odborníkom na ľudské zdroje a vzdelávanie identifikovať možné využitie AI vo vlastných organizáciách.',
                    pt: 'O relatório pode ajudar os profissionais de RH e formação a identificar possíveis usos da IA nas suas organizações.'
                }
            },
            {
                id: 'v2',
                section: {
                    en: '5. Practical Value and Transferability',
                    es: '5. Valor Práctico y Transferibilidad',
                    it: '5. Valore Pratico e Trasferibilità',
                    de: '5. Praktischer Nutzen und Übertragbarkeit',
                    sk: '5. Praktická hodnota a prenositeľnosť',
                    pt: '5. Valor Prático e Transferibilidade'
                },
                title: {
                    en: 'The findings are transferable to different industrial company contexts.',
                    es: 'Las conclusiones son transferibles a diversos contextos de empresas industriales.',
                    it: 'I risultati sono trasferibili a diversi contesti di aziende industriali.',
                    de: 'Die Erkenntnisse sind auf verschiedene Industrieunternehmenskontexte übertragbar.',
                    sk: 'Zistenia sú prenosné do rôznych kontextov priemyselných podnikov.',
                    pt: 'As conclusões são transferíveis para diferentes contextos de empresas industriais.'
                }
            },
            {
                id: 'v3',
                section: {
                    en: '5. Practical Value and Transferability',
                    es: '5. Valor Práctico y Transferibilidad',
                    it: '5. Valore Pratico e Trasferibilità',
                    de: '5. Praktischer Nutzen und Übertragbarkeit',
                    sk: '5. Praktická hodnota a prenositeľnosť',
                    pt: '5. Valor Prático e Transferibilidade'
                },
                title: {
                    en: 'The report provides useful reference points for organisations with different levels of digital maturity.',
                    es: 'El informe ofrece puntos de referencia útiles para organizaciones con distintos niveles de madurez digital.',
                    it: 'Il rapporto fornisce utili punti di riferimento per organizzazioni con diversi livelli di maturità digitale.',
                    de: 'Der Bericht bietet wertvolle Orientierungspunkte für Betriebe mit unterschiedlicher digitaler Reife.',
                    sk: 'Správa poskytuje užitočné referenčné body pre organizácie s rôznou úrovňou digitálnej zrelosti.',
                    pt: 'O relatório fornece pontos de referência úteis para organizações com diferentes níveis de maturidade digital.'
                }
            },
            {
                id: 'v4',
                section: {
                    en: '5. Practical Value and Transferability',
                    es: '5. Valor Práctico y Transferibilidad',
                    it: '5. Valore Pratico e Trasferibilità',
                    de: '5. Praktischer Nutzen und Übertragbarkeit',
                    sk: '5. Praktická hodnota a prenositeľnosť',
                    pt: '5. Valor Prático e Transferibilidade'
                },
                title: {
                    en: 'The report supports informed decision-making rather than presenting AI tools as solutions in themselves.',
                    es: 'El informe respalda la toma de decisiones informada en lugar de presentar las herramientas de IA como soluciones aisladas.',
                    it: 'Il rapporto favorisce un processo decisionale consapevole anziché presentare gli strumenti di IA come soluzioni fini a se stesse.',
                    de: 'Der Bericht fördert fundierte Entscheidungen, statt KI-Tools als reine Selbstzweck-Lösungen darzustellen.',
                    sk: 'Správa podporuje informované rozhodovanie namiesto prezentovania nástrojov AI ako riešení samých osebe.',
                    pt: 'O relatório apoia a tomada de decisões informada em vez de apresentar as ferramentas de IA como soluções em si mesmas.'
                }
            },
            {
                id: 'v5',
                section: {
                    en: '5. Practical Value and Transferability',
                    es: '5. Valor Práctico y Transferibilidad',
                    it: '5. Valore Pratico e Trasferibilità',
                    de: '5. Praktischer Nutzen und Übertragbarkeit',
                    sk: '5. Praktická hodnota a prenositeľnosť',
                    pt: '5. Valor Prático e Transferibilidade'
                },
                title: {
                    en: 'Ethical, legal, data protection and/or inclusion considerations are given appropriate attention where relevant.',
                    es: 'Se presta la debida atención a aspectos éticos, legales, protección de datos e inclusión cuando corresponde.',
                    it: 'Gli aspetti etici, legali, di protezione dati e inclusione ricevono la dovuta attenzione dove rilevante.',
                    de: 'Ethische, rechtliche, datenschutzrelevante und inklusive Aspekte werden angemessen berücksichtigt.',
                    sk: 'Etickým, právnym otázkam, ochrane údajov a inklúzii sa venuje primeraná pozornosť tam, kde je to relevantné.',
                    pt: 'As considerações éticas, legais, de proteção de dados e/ou inclusão recebem a devida atenção onde relevante.'
                }
            },
            {
                id: 'v6',
                section: {
                    en: '5. Practical Value and Transferability',
                    es: '5. Valor Práctico y Transferibilidad',
                    it: '5. Valore Pratico e Trasferibilità',
                    de: '5. Praktischer Nutzen und Übertragbarkeit',
                    sk: '5. Praktická hodnota a prenositeľnosť',
                    pt: '5. Valor Prático e Transferibilidade'
                },
                title: {
                    en: 'Overall, the report provides a solid knowledge base for the Learning Brains Training Programme and Toolkit.',
                    es: 'En conjunto, el informe aporta una base sólida de conocimiento para el Itinerario Formativo y el Toolkit de Learning Brains.',
                    it: 'Complessivamente, il rapporto fornisce una solida base di conoscenza per il Programma Formativo e il Toolkit di Learning Brains.',
                    de: 'Insgesamt bietet der Bericht eine solide Wissensbasis für das Schulungsprogramm und das Toolkit von Learning Brains.',
                    sk: 'Celkovo správa poskytuje solídnu znalostnú základňu pre tréningový program a balík nástrojov (Toolkit) Learning Brains.',
                    pt: 'Globalmente, o relatório fornece uma base sólida de conhecimento para o Programa de Formação e Toolkit de Learning Brains.'
                }
            }
        ],
        qualitativeQuestions: [
            {
                id: 'rec_1',
                title: {
                    en: '6.1 Which findings, trends, tools or case studies do you consider most relevant and worth emphasising in the final Mapping Report?',
                    es: '6.1 ¿Qué hallazgos, tendencias, herramientas o casos de estudio consideras más relevantes y destacables en el informe final?',
                    it: '6.1 Quali risultati, tendenze, strumenti o casi studio ritiene più rilevanti ed evidenziabili nel rapporto finale?',
                    de: '6.1 Welche Ergebnisse, Trends, Tools oder Fallstudien halten Sie für besonders relevant und hervorhebenswert?',
                    sk: '6.1 Ktoré zistenia, trendy, nástroje alebo prípadové štúdie považujete za najrelevantnejšie pre záverečnú správu?',
                    pt: '6.1 Que conclusões, tendências, ferramentas ou casos de estudo considera mais relevantes destacar no relatório final?'
                },
                placeholder: {
                    en: 'Share key insights, trends or practical examples that stood out to you...',
                    es: 'Indica los hallazgos, tendencias o ejemplos prácticos que más valor aportan...',
                    it: 'Indica i risultati, le tendenze o gli esempi pratici che ritiene di maggior valore...',
                    de: 'Geben Sie die wertvollsten Ergebnisse, Trends oder Praxisbeispiele an...',
                    sk: 'Uveďte zistenia, trendy alebo praktické príklady, ktoré prinášajú najväčšiu hodnotu...',
                    pt: 'Indique as conclusões, tendências ou exemplos práticos que mais valor acrescentam...'
                }
            },
            {
                id: 'rec_2',
                title: {
                    en: '6.2 Is there any important trend, type of AI application, implementation challenge or perspective that is missing or underrepresented?',
                    es: '6.2 ¿Falta o está poco representada alguna tendencia, tipo de aplicación de IA, reto de implantación o perspectiva relevante?',
                    it: '6.2 Manca o è poco rappresentata qualche tendenza, tipo di applicazione IA, sfida di implementazione o prospettiva?',
                    de: '6.2 Fehlt ein wichtiger Trend, eine KI-Anwendung, eine Hürde oder eine Perspektive bzw. kommt zu kurz?',
                    sk: '6.2 Chýba alebo je nedostatočne zastúpený nejaký dôležitý trend, typ aplikácie AI, výzva alebo perspektíva?',
                    pt: '6.2 Falta ou está sub-representada alguma tendência, tipo de aplicação de IA, desafio de implementação ou perspetiva?'
                },
                placeholder: {
                    en: 'Mention any missing technological trends, SME barriers or perspectives...',
                    es: 'Menciona tendencias, dificultades en PYMEs o perspectivas que convendría incorporar...',
                    it: 'Menziona tendenze, barriere nelle PMI o prospettive che sarebbe utile integrare...',
                    de: 'Nennen Sie Trends, Hürden für KMU oder Perspektiven, die ergänzt werden sollten...',
                    sk: 'Uveďte trendy, prekážky pre MSP alebo perspektívy, ktoré by bolo vhodné doplniť...',
                    pt: 'Mencione tendências, barreiras nas PME ou perspetivas que seria útil integrar...'
                }
            },
            {
                id: 'rec_3',
                title: {
                    en: '6.3 Are there any sections or statements that should be clarified, corrected, updated or simplified?',
                    es: '6.3 ¿Hay secciones o afirmaciones que deban aclararse, corregirse, actualizarse o simplificarse?',
                    it: '6.3 Ci sono sezioni o affermazioni che dovrebbero essere chiarite, corrette, aggiornate o semplificate?',
                    de: '6.3 Gibt es Abschnitte oder Aussagen, die präzisiert, korrigiert, aktualisiert oder vereinfacht werden sollten?',
                    sk: '6.3 Sú v správe časti alebo tvrdenia, ktoré by bolo potrebné objasniť, opraviť, aktualizovať alebo zjednodušiť?',
                    pt: '6.3 Existem secções ou afirmações que devam ser clarificadas, corrigidas, atualizadas ou simplificadas?'
                },
                placeholder: {
                    en: 'Note any specific sections, terms or statements requiring improvement...',
                    es: 'Señala secciones, conceptos o afirmaciones concretas que requieran revisión...',
                    it: 'Segnala sezioni, concetti o affermazioni specifiche che necessitano di revisione...',
                    de: 'Weisen Sie auf konkrete Abschnitte, Begriffe oder Aussagen hin, die überarbeitet werden sollten...',
                    sk: 'Poukážte na konkrétne časti, pojmy alebo tvrdenia, ktoré si vyžadujú revíziu...',
                    pt: 'Aponte secções, conceitos ou afirmações específicas que necessitem de revisão...'
                }
            },
            {
                id: 'rec_4',
                title: {
                    en: '6.4 What is the single most important improvement you would recommend before finalising the Mapping Report?',
                    es: '6.4 ¿Cuál es la mejora principal y más importante que recomendarías antes de cerrar el Informe de Mapeo?',
                    it: '6.4 Qual è il miglioramento più importante che raccomanderebbe prima di finalizzare il rapporto?',
                    de: '6.4 Was ist die wichtigste Einzelverbesserung, die Sie vor Fertigstellung des Berichts empfehlen würden?',
                    sk: '6.4 Aké je jedno najdôležitejšie zlepšenie, ktoré by ste odporučili pred finalizáciou mapovacej správy?',
                    pt: '6.4 Qual é a melhoria individual mais importante que recomendaria antes de finalizar o relatório?'
                },
                placeholder: {
                    en: 'Describe your highest-priority recommendation...',
                    es: 'Describe tu recomendación prioritaria...',
                    it: 'Descrivi la tua raccomandazione prioritaria...',
                    de: 'Beschreiben Sie Ihre wichtigste Priorität...',
                    sk: 'Opíšte svoje prioritné odporúčanie...',
                    pt: 'Descreva a sua recomendação prioritária...'
                }
            },
            {
                id: 'rec_5',
                title: {
                    en: '6.5 Optional: Is there anything else you would like to add that has not been covered by the previous questions?',
                    es: '6.5 Opcional: ¿Deseas añadir algún otro comentario u observación que no se haya tratado en las preguntas anteriores?',
                    it: '6.5 Facoltativo: Desidera aggiungere altro che non sia stato trattato nelle domande precedenti?',
                    de: '6.5 Optional: Möchten Sie noch etwas hinzufügen, das bisher nicht angesprochen wurde?',
                    sk: '6.5 Voliteľné: Chceli by ste dodať čokoľvek ďalšie, čo nebolo pokryté predchádzajúcimi otázkami?',
                    pt: '6.5 Opcional: Gostaria de acrescentar algo mais que não tenha sido abrangido nas questões anteriores?'
                },
                placeholder: {
                    en: 'Any further comments or feedback...',
                    es: 'Cualquier otro comentario u observación adicional...',
                    it: 'Eventuali ulteriori commenti o osservazioni...',
                    de: 'Weitere Anmerkungen oder Feedback...',
                    sk: 'Akékoľvek ďalšie pripomienky alebo postrehy...',
                    pt: 'Quaisquer outros comentários ou observações adicionais...'
                }
            }
        ]
    },

    'itinerario-formativo': {
        id: 'itinerario-formativo',
        slug: 'itinerario-formativo',
        status: 'active',
        profileType: 'itinerary',
        documentUrl: '/documents/validation/learning-brains-training-itinerary-en.pdf',
        documentUrls: {
            en: '/documents/validation/learning-brains-training-itinerary-en.pdf',
            es: '/documents/validation/learning-brains-training-itinerary-es.pdf',
            de: '/documents/validation/learning-brains-training-itinerary-de.pdf',
            it: '/documents/validation/learning-brains-training-itinerary-it.pdf',
            pt: '/documents/validation/learning-brains-training-itinerary-pt.pdf',
            sk: '/documents/validation/learning-brains-training-itinerary-sk.pdf'
        },
        aiTranslatedLanguages: ['es'],
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
                en: 'AI Training Itinerary for Industrial SMEs: Curriculum Validation',
                es: 'Itinerario Formativo en IA para PYMEs Industriales: Validación Curricular',
                it: 'Itinerario Formativo in IA per PMI Industriali: Validazione del Curriculum',
                de: 'KI-Ausbildungspfad für industrielle KMU: Lehrplanvalidierung',
                sk: 'Vzdelávacia cesta v oblasti AI pre priemyselné MSP: Validácia kurikula',
                pt: 'Itinerário Formativo em IA para PME Industriais: Validação Curricular'
            },
            subtitle: {
                en: 'Curricular framework for AI in on-the-job training in industrial companies: learning structure, competences, and trainer guidance.',
                es: 'Marco curricular sobre IA en el aprendizaje en el puesto de trabajo en empresas industriales: estructura de aprendizaje, competencias y guía para formadores.',
                it: 'Quadro curricolare per l\'IA nella formazione sul lavoro nelle imprese industriali: struttura formativa, competenze e linee guida.',
                de: 'Curricularer Rahmen für KI am Arbeitsplatz in Industrieunternehmen: Lernstruktur, Kompetenzen und Leitlinien für Lehrende.',
                sk: 'Kurikulárny rámec pre AI pri vzdelávaní na pracovisku v priemyselných podnikoch: vzdelávacia štruktúra, kompetencie a usmernenia.',
                pt: 'Quadro curricular para a IA na formação em contexto de trabalho em empresas industriais: estrutura de aprendizagem, competências e orientações.'
            },
            instructions: {
                en: 'This document establishes the curricular framework and core competences for AI in on-the-job training. Once reviewed, please complete the validation questionnaire (~10–15 min) based on your professional experience.',
                es: 'Este documento define el marco curricular y las competencias clave para aplicar la IA en la formación en el puesto de trabajo. Tras revisarlo, completa el cuestionario (~10–15 min) desde tu experiencia profesional.',
                it: 'Questo documento definisce il quadro curricolare e le competenze chiave per l\'uso dell\'IA nella formazione sul lavoro. Dopo averlo esaminato, compila il questionario (~10–15 min) in base alla tua esperienza professionale.',
                de: 'Dieses Dokument definiert den curricularen Rahmen und die Kernkompetenzen für KI am Arbeitsplatz. Bitte bewerten Sie den Entwurf im Anschluss im Fragebogen (~10–15 Min.) auf Basis Ihrer Berufserfahrung.',
                sk: 'Tento dokument definuje kurikulárny rámec a kľúčové kompetencie pre využitie AI pri vzdelávaní na pracovisku. Po jeho preštudovaní vyplňte dotazník (~10–15 min) na základe vašich odborných skúseností.',
                pt: 'Este documento define o quadro curricular e as competências-chave para o uso da IA na formação no posto de trabalho. Após a sua leitura, responda ao questionário (~10–15 min) com base na sua experiência profissional.'
            },
            workingDocumentNote: {
                en: 'Please note that this is a working document. The final version to be published on the website will be generated incorporating the validation contributions and the considerations of the working group.',
                es: 'Ten en cuenta que el presente es un documento de trabajo. Con las aportaciones de las validaciones y las consideraciones del grupo de trabajo se generará el documento definitivo visible en la web.',
                it: 'Si prega di notare che questo è un documento di lavoro. Con i contributi delle validazioni e le considerazioni del gruppo di lavoro verrà generato il documento definitivo visibile sul sito web.',
                de: 'Bitte beachten Sie, dass es sich hierbei um ein Arbeitsdokument handelt. Auf Grundlage der Validierungsbeiträge und der Empfehlungen der Arbeitsgruppe wird das endgültige, auf der Website sichtbare Dokument erstellt.',
                sk: 'Upozorňujeme, že toto je pracovný dokument. Na základe podnetov z validácie a pripomienok pracovnej skupiny bude vypracovaný konečný dokument zverejnený na webe.',
                pt: 'Tenha em atenção que este é um documento de trabalho. Com os contributos das validações e as considerações do grupo de trabalho será gerado o documento definitivo visível no website.'
            }
        },
        likertQuestions: [
            // Section 2. Purpose and relevance (5 questions)
            {
                id: "p1",
                section: {
                    en: "Section 2. Purpose and relevance",
                    es: "Sección 2. Objeto y pertinencia",
                    it: "Sezione 2. Scopo e rilevanza",
                    de: "Abschnitt 2. Zweck und Relevanz",
                    sk: "Časť 2. Účel a relevantnosť",
                    pt: "Secção 2. Propósito e relevância"
                },
                title: {
                    en: "The overall aims of the itinerary are clear.",
                    es: "Los objetivos generales del itinerario son claros.",
                    it: "Gli obiettivi generali dell'itinerario sono chiari.",
                    de: "Die übergeordneten Ziele des Ausbildungspfads sind klar formuliert.",
                    sk: "Celkové ciele vzdelávacej cesty sú jasné.",
                    pt: "Os objetivos gerais do itinerário são claros."
                }
            },
            {
                id: "p2",
                section: {
                    en: "Section 2. Purpose and relevance",
                    es: "Sección 2. Objeto y pertinencia",
                    it: "Sezione 2. Scopo e rilevanza",
                    de: "Abschnitt 2. Zweck und Relevanz",
                    sk: "Časť 2. Účel a relevantnosť",
                    pt: "Secção 2. Propósito e relevância"
                },
                title: {
                    en: "The main learning outcomes are realistic and appropriate.",
                    es: "Los principales resultados de aprendizaje previstos son realistas y adecuados.",
                    it: "I principali risultati di apprendimento sono realistici e appropriati.",
                    de: "Die wesentlichen Lernergebnisse sind realistisch und angemessen.",
                    sk: "Hlavné výstupy vzdelávania sú realistické a primerané.",
                    pt: "Os principais resultados de aprendizagem são realistas e adequados."
                }
            },
            {
                id: "p3",
                section: {
                    en: "Section 2. Purpose and relevance",
                    es: "Sección 2. Objeto y pertinencia",
                    it: "Sezione 2. Scopo e rilevanza",
                    de: "Abschnitt 2. Zweck und Relevanz",
                    sk: "Časť 2. Účel a relevantnosť",
                    pt: "Secção 2. Propósito e relevância"
                },
                title: {
                    en: "The itinerary addresses relevant needs related to on-the-job training in industrial companies.",
                    es: "El itinerario responde a necesidades relevantes relacionadas con el aprendizaje en el puesto de trabajo en empresas industriales.",
                    it: "L'itinerario risponde a esigenze rilevanti legate alla formazione sul posto di lavoro nelle imprese industriali.",
                    de: "Der Ausbildungspfad adressiert relevante Bedarfe bezüglich des Lernens am Arbeitsplatz in Industrieunternehmen.",
                    sk: "Vzdelávacia cesta reaguje na relevantné potreby súvisiace so vzdelávaním na pracovisku v priemyselných podnikoch.",
                    pt: "O itinerário responde a necessidades relevantes relacionadas com a formação no posto de trabalho em empresas industriais."
                }
            },
            {
                id: "p4",
                section: {
                    en: "Section 2. Purpose and relevance",
                    es: "Sección 2. Objeto y pertinencia",
                    it: "Sezione 2. Scopo e rilevanza",
                    de: "Abschnitt 2. Zweck und Relevanz",
                    sk: "Časť 2. Účel a relevantnosť",
                    pt: "Secção 2. Propósito e relevância"
                },
                title: {
                    en: "The intended target groups are clearly identified.",
                    es: "Los grupos destinatarios previstos están claramente identificados.",
                    it: "I gruppi destinatari previsti sono chiaramente identificati.",
                    de: "Die vorgesehenen Zielgruppen sind klar benannt.",
                    sk: "Plánované cieľové skupiny sú jasne identifikované.",
                    pt: "Os grupos-alvo pretendidos estão claramente identificados."
                }
            },
            {
                id: "p5",
                section: {
                    en: "Section 2. Purpose and relevance",
                    es: "Sección 2. Objeto y pertinencia",
                    it: "Sezione 2. Scopo e rilevanza",
                    de: "Abschnitt 2. Zweck und Relevanz",
                    sk: "Časť 2. Účel a relevantnosť",
                    pt: "Secção 2. Propósito e relevância"
                },
                title: {
                    en: "The itinerary is relevant to HR and training managers and identified target groups.",
                    es: "El itinerario es relevante para los responsables de RRHH, formadores y los grupos destinatarios identificados.",
                    it: "L'itinerario è rilevante per i responsabili HR, della formazione e per i gruppi destinatari individuati.",
                    de: "Der Ausbildungspfad ist für HR- und Ausbildungsleiter sowie die identifizierten Zielgruppen relevant.",
                    sk: "Vzdelávacia cesta je relevantná pre manažérov ľudských zdrojov, školiteľov a identifikované cieľové skupiny.",
                    pt: "O itinerário é relevante para gestores de RH, formação e para os grupos-alvo identificados."
                }
            },

            // Section 3. Structure and coherence (4 questions)
            {
                id: "s1",
                section: {
                    en: "Section 3. Structure and coherence",
                    es: "Sección 3. Estructura y coherencia",
                    it: "Sezione 3. Struttura e coerenza",
                    de: "Abschnitt 3. Struktur und Kohärenz",
                    sk: "Časť 3. Štruktúra a koherentnosť",
                    pt: "Secção 3. Estrutura e coerência"
                },
                title: {
                    en: "The document is clearly structured and easy to navigate.",
                    es: "El documento está claramente estructurado y es fácil de navegar y consultar.",
                    it: "Il documento è strutturato chiaramente e facile da consultare.",
                    de: "Das Dokument ist klar strukturiert und einfach zu navigieren.",
                    sk: "Dokument je prehľadne štruktúrovaný a ľahko sa v ňom orientuje.",
                    pt: "O documento está claramente estruturado e é fácil de consultar."
                }
            },
            {
                id: "s2",
                section: {
                    en: "Section 3. Structure and coherence",
                    es: "Sección 3. Estructura y coherencia",
                    it: "Sezione 3. Struttura e coerenza",
                    de: "Abschnitt 3. Struktur und Kohärenz",
                    sk: "Časť 3. Štruktúra a koherentnosť",
                    pt: "Secção 3. Estrutura e coerência"
                },
                title: {
                    en: "The division of the document into four parts is useful and logical.",
                    es: "La división del documento en cuatro partes es útil y lógica.",
                    it: "La suddivisione del documento in quattro parti è utile e logica.",
                    de: "Die Aufteilung des Dokuments in vier Teile ist sinnvoll und logisch.",
                    sk: "Rozdelenie dokumentu na štyri časti je užitočné a logické.",
                    pt: "A divisão do documento em quatro partes é útil e lógica."
                }
            },
            {
                id: "s3",
                section: {
                    en: "Section 3. Structure and coherence",
                    es: "Sección 3. Estructura y coherencia",
                    it: "Sezione 3. Struttura e coerenza",
                    de: "Abschnitt 3. Struktur und Kohärenz",
                    sk: "Časť 3. Štruktúra a koherentnosť",
                    pt: "Secção 3. Estrutura e coerência"
                },
                title: {
                    en: "The progression between the learning units is coherent.",
                    es: "La progresión entre las unidades de aprendizaje es coherente.",
                    it: "La progressione tra le unità di apprendimento è coerente.",
                    de: "Die Abfolge zwischen den Lerneinheiten ist kohärent.",
                    sk: "Postupnosť medzi jednotlivými vzdelávacími jednotkami je koherentná.",
                    pt: "A progressão entre as unidades de aprendizagem é coerente."
                }
            },
            {
                id: "s4",
                section: {
                    en: "Section 3. Structure and coherence",
                    es: "Sección 3. Estructura y coherencia",
                    it: "Sezione 3. Struttura e coerenza",
                    de: "Abschnitt 3. Struktur und Kohärenz",
                    sk: "Časť 3. Štruktúra a koherentnosť",
                    pt: "Secção 3. Estrutura e coerência"
                },
                title: {
                    en: "The relationship between the framework, the learning units, the guidance for trainers and the European reference frameworks is clear.",
                    es: "La relación entre el marco, las unidades de aprendizaje, la guía para formadores y los marcos de referencia europeos es clara.",
                    it: "La relazione tra il quadro, le unità di apprendimento, le linee guida per i formatori e i quadri di riferimento europei è chiara.",
                    de: "Die Verknüpfung zwischen Rahmenwerk, Lerneinheiten, Trainerleitfaden und europäischen Referenzrahmen ist klar.",
                    sk: "Vzťah medzi rámcom, vzdelávacími jednotkami, usmerneniami pre trénerov a európskymi referenčnými rámcami je jasný.",
                    pt: "A relação entre o quadro, as unidades de aprendizagem, as orientações para formadores e os quadros de referência europeus é clara."
                }
            },

            // Section 4. Learning units (4 questions)
            {
                id: "u1",
                section: {
                    en: "Section 4. Learning units",
                    es: "Sección 4. Unidades de aprendizaje",
                    it: "Sezione 4. Unità di apprendimento",
                    de: "Abschnitt 4. Lerneinheiten",
                    sk: "Časť 4. Vzdelávacie jednotky",
                    pt: "Secção 4. Unidades de aprendizagem"
                },
                title: {
                    en: "The six learning units collectively cover the main competences needed to use AI in on-the-job training.",
                    es: "Las seis unidades de aprendizaje cubren en conjunto las principales competencias necesarias para utilizar la IA en la formación en el puesto de trabajo.",
                    it: "Le sei unità di apprendimento coprono collettivamente le principali competenze necessarie per utilizzare l'IA nella formazione sul lavoro.",
                    de: "Die sechs Lerneinheiten decken gemeinsam die wichtigsten Kompetenzen für den Einsatz von KI am Arbeitsplatz ab.",
                    sk: "Šesť vzdelávacích jednotiek spoločne pokrýva hlavné kompetencie potrebné na využívanie umelej inteligencie pri vzdelávaní na pracovisku.",
                    pt: "As seis unidades de aprendizagem cobrem em conjunto as principais competências necessárias para utilizar a IA na formação no posto de trabalho."
                }
            },
            {
                id: "u2",
                section: {
                    en: "Section 4. Learning units",
                    es: "Sección 4. Unidades de aprendizaje",
                    it: "Sezione 4. Unità di apprendimento",
                    de: "Abschnitt 4. Lerneinheiten",
                    sk: "Časť 4. Vzdelávacie jednotky",
                    pt: "Secção 4. Unidades de aprendizagem"
                },
                title: {
                    en: "The descriptions of the core focus of each unit are clear.",
                    es: "Las descripciones del enfoque central de cada unidad formativa son claras.",
                    it: "Le descrizioni del focus principale di ciascuna unità sono chiare.",
                    de: "Die Beschreibungen des Kernfokus der jeweiligen Einheiten sind klar und verständlich.",
                    sk: "Popisy hlavného zamerania každej jednotky sú jasné.",
                    pt: "As descrições do foco central de cada unidade são claras."
                }
            },
            {
                id: "u3",
                section: {
                    en: "Section 4. Learning units",
                    es: "Sección 4. Unidades de aprendizaje",
                    it: "Sezione 4. Unità di apprendimento",
                    de: "Abschnitt 4. Lerneinheiten",
                    sk: "Časť 4. Vzdelávacie jednotky",
                    pt: "Secção 4. Unidades de aprendizagem"
                },
                title: {
                    en: "The balance between conceptual understanding and practical application is appropriate.",
                    es: "El equilibrio entre la comprensión conceptual y la aplicación práctica es el adecuado.",
                    it: "L'equilibrio tra comprensione concettuale e applicazione pratica è appropriato.",
                    de: "Das Verhältnis zwischen konzeptionellem Verständnis und praktischer Anwendung ist ausgewogen.",
                    sk: "Rovnováha medzi koncepčným porozumením a praktickou aplikáciou je primeraná.",
                    pt: "O equilíbrio entre compreensão conceptual e aplicação prática é adequado."
                }
            },
            {
                id: "u4",
                section: {
                    en: "Section 4. Learning units",
                    es: "Sección 4. Unidades de aprendizaje",
                    it: "Sezione 4. Unità di apprendimento",
                    de: "Abschnitt 4. Lerneinheiten",
                    sk: "Časť 4. Vzdelávacie jednotky",
                    pt: "Secção 4. Unidades de aprendizagem"
                },
                title: {
                    en: "The learning units are sufficiently adaptable to different learner profiles and company contexts.",
                    es: "Las unidades de aprendizaje son suficientemente adaptables a distintos perfiles de alumnado y contextos de empresa.",
                    it: "Le unità di apprendimento sono sufficientemente adattabili a diversi profili di discenti e contesti aziendali.",
                    de: "Die Lerneinheiten lassen sich flexibel an verschiedene Zielgruppen und Unternehmensstrukturen anpassen.",
                    sk: "Vzdelávacie jednotky sú dostatočne adaptabilné na rôzne profily účastníkov a firemné kontexty.",
                    pt: "As unidades de aprendizagem são suficientemente adaptáveis a diferentes perfis de formandos e contextos empresariais."
                }
            },

            // Section 5. Competence framework (4 questions)
            {
                id: "c1",
                section: {
                    en: "Section 5. Competence framework",
                    es: "Sección 5. Marco de competencias",
                    it: "Sezione 5. Quadro delle competenze",
                    de: "Abschnitt 5. Kompetenzrahmen",
                    sk: "Časť 5. Kompetenčný rámec",
                    pt: "Secção 5. Quadro de competências"
                },
                title: {
                    en: "The Knowledge, Skills and Attitudes structure is appropriate for the itinerary.",
                    es: "La estructura de Conocimientos, Habilidades y Actitudes (KSA) es adecuada para el itinerario.",
                    it: "La struttura basata su Conoscenze, Abilità e Attitudini è idonea per l'itinerario.",
                    de: "Die Strukturierung nach Wissen, Fertigkeiten und Haltungen (KSA) ist für das Programm passend.",
                    sk: "Štruktúra vedomostí, zručností a postojov je pre vzdelávaciu cestu vhodná.",
                    pt: "A estrutura de Conhecimentos, Competências e Atitudes é adequada para o itinerário."
                }
            },
            {
                id: "c2",
                section: {
                    en: "Section 5. Competence framework",
                    es: "Sección 5. Marco de competencias",
                    it: "Sezione 5. Quadro delle competencias",
                    de: "Abschnitt 5. Kompetenzrahmen",
                    sk: "Časť 5. Kompetenčný rámec",
                    pt: "Secção 5. Quadro de competências"
                },
                title: {
                    en: "The competence framework is aligned with the learning units.",
                    es: "El marco de competencias está debidamente alineado con las unidades de aprendizaje.",
                    it: "Il quadro delle competenze è allineato con le unità di apprendimento.",
                    de: "Der Kompetenzrahmen ist präzise auf die Lerneinheiten abgestimmt.",
                    sk: "Kompetenčný rámec je v súlade so vzdelávacími jednotkami.",
                    pt: "O quadro de competências está alinhado com as unidades de aprendizagem."
                }
            },
            {
                id: "c3",
                section: {
                    en: "Section 5. Competence framework",
                    es: "Sección 5. Marco de competencias",
                    it: "Sezione 5. Quadro delle competencias",
                    de: "Abschnitt 5. Kompetenzrahmen",
                    sk: "Časť 5. Kompetenčný rámec",
                    pt: "Secção 5. Quadro de competências"
                },
                title: {
                    en: "The attitudes identified are appropriate for responsible and practical use of AI.",
                    es: "Las actitudes identificadas son adecuadas para un uso responsable y práctico de la IA.",
                    it: "Le attitudini identificate sono adatte per un utilizzo responsabile e pratico dell'IA.",
                    de: "Die formulierten Haltungen fördern einen verantwortungsvollen und praxisnahen Einsatz von KI.",
                    sk: "Identifikované postoje sú vhodné pre zodpovedné a praktické využívanie umelej inteligencie.",
                    pt: "As atitudes identificadas são adequadas para um uso responsável e prático da IA."
                }
            },
            {
                id: "c4",
                section: {
                    en: "Section 5. Competence framework",
                    es: "Sección 5. Marco de competencias",
                    it: "Sezione 5. Quadro delle competencias",
                    de: "Abschnitt 5. Kompetenzrahmen",
                    sk: "Časť 5. Kompetenčný rámec",
                    pt: "Secção 5. Quadro de competências"
                },
                title: {
                    en: "The competence framework can support the subsequent development of learning content and activities.",
                    es: "El marco de competencias puede sustentar con éxito el posterior desarrollo de contenidos y actividades formativas.",
                    it: "Il quadro delle competenze può supportare il successivo sviluppo di contenuti formativi e attività.",
                    de: "Der Kompetenzrahmen eignet sich hervorragend als Grundlage für die spätere Ausarbeitung konkreter Lerninhalte.",
                    sk: "Kompetenčný rámec dokáže podporiť následnú tvorbu vzdelávacieho obsahu a aktivít.",
                    pt: "O quadro de competências pode apoiar o posterior desenvolvimento de conteúdos e atividades de aprendizagem."
                }
            },

            // Section 6. Practical use and transferability (5 questions)
            {
                id: "t1",
                section: {
                    en: "Section 6. Practical use and transferability",
                    es: "Sección 6. Uso práctico y transferibilidad",
                    it: "Sezione 6. Uso pratico e trasferibilità",
                    de: "Abschnitt 6. Praktischer Nutzen und Transferierbarkeit",
                    sk: "Časť 6. Praktické využitie a prenositeľnosť",
                    pt: "Secção 6. Utilização prática e transferibilidade"
                },
                title: {
                    en: "The itinerary provides useful guidance for developing a complete Training Programme.",
                    es: "El itinerario proporciona directrices útiles para el desarrollo de un Programa Formativo integral.",
                    it: "L'itinerario fornisce una guida utile per lo sviluppo di un Programma di Formazione completo.",
                    de: "Der Ausbildungspfad bietet wertvolle Leitlinien zur Ausarbeitung eines vollständigen Lehrgangs.",
                    sk: "Vzdelávacia cesta poskytuje užitočné usmernenia na vytvorenie uceleného vzdelávacieho programu.",
                    pt: "O itinerário fornece orientações úteis para o desenvolvimento de um Programa de Formação completo."
                }
            },
            {
                id: "t2",
                section: {
                    en: "Section 6. Practical use and transferability",
                    es: "Sección 6. Uso práctico y transferibilidad",
                    it: "Sezione 6. Uso pratico e trasferibilità",
                    de: "Abschnitt 6. Praktischer Nutzen und Transferierbarkeit",
                    sk: "Časť 6. Praktické využitie a prenositeľnosť",
                    pt: "Secção 6. Utilização prática e transferibilidade"
                },
                title: {
                    en: "The practical guidance for trainers is useful.",
                    es: "Las orientaciones prácticas para formadores son de gran utilidad.",
                    it: "Le indicazioni pratiche per i formatori sono utili.",
                    de: "Die praxisbezogenen Handlungsempfehlungen für Trainer sind hilfreich.",
                    sk: "Praktické pokyny pre školiteľov sú užitočné.",
                    pt: "As orientações práticas para formadores são úteis."
                }
            },
            {
                id: "t3",
                section: {
                    en: "Section 6. Practical use and transferability",
                    es: "Sección 6. Uso práctico y transferibilidad",
                    it: "Sezione 6. Uso pratico e trasferibilità",
                    de: "Abschnitt 6. Praktischer Nutzen und Transferierbarkeit",
                    sk: "Časť 6. Praktické využitie a prenositeľnosť",
                    pt: "Secção 6. Utilização prática e transferibilidade"
                },
                title: {
                    en: "The adaptation roadmap can help external trainers adapt the itinerary to different learner groups.",
                    es: "La hoja de ruta de adaptación puede ayudar a formadores externos a adaptar el itinerario a diversos grupos de participantes.",
                    it: "La tabella di marcia di adattamento può aiutare i formatori esterni ad adattare il percorso a diversi profili di discenti.",
                    de: "Der Adaptionsleitfaden hilft externen Dozenten, den Pfad an unterschiedliche Lerngruppen anzupassen.",
                    sk: "Plán adaptácie pomôže externým školiteľom prispôsobiť vzdelávaciu cestu rôznym skupinám účastníkov.",
                    pt: "O roteiro de adaptação pode ajudar formadores externos a adaptar o itinerário a diferentes perfis de formandos."
                }
            },
            {
                id: "t4",
                section: {
                    en: "Section 6. Practical use and transferability",
                    es: "Sección 6. Uso práctico y transferibilidad",
                    it: "Sezione 6. Uso pratico e trasferibilità",
                    de: "Abschnitt 6. Praktischer Nutzen und Transferierbarkeit",
                    sk: "Časť 6. Praktické využitie a prenositeľnosť",
                    pt: "Secção 6. Utilização prática e transferibilidade"
                },
                title: {
                    en: "The itinerary is sufficiently clear to be used by trainers or organisations outside the consortium or beyond the project activities.",
                    es: "El itinerario es suficientemente claro como para ser utilizado por formadores u organizaciones ajenas al consorcio o más allá de las actividades del proyecto.",
                    it: "L'itinerario è sufficientemente chiaro per essere impiegato da formatori o organizzazioni esterne al consorzio o al di là delle attività del progetto.",
                    de: "Der Ausbildungspfad ist so verständlich aufbereitet, dass er von Trainern oder Organisationen außerhalb des Konsortiums oder über die Projektaktivitäten hinaus genutzt werden kann.",
                    sk: "Vzdelávacia cesta je dostatočne zrozumiteľná, aby ju mohli využívať školitelia alebo organizácie mimo konzorcia alebo nad rámec projektových aktivít.",
                    pt: "O itinerário é suficientemente claro para ser utilizado por formadores ou organizações fora do consórcio ou além das atividades do projeto."
                }
            },
            {
                id: "t5",
                section: {
                    en: "Section 6. Practical use and transferability",
                    es: "Sección 6. Uso práctico y transferibilidad",
                    it: "Sezione 6. Uso pratico e trasferibilità",
                    de: "Abschnitt 6. Praktischer Nutzen und Transferierbarkeit",
                    sk: "Časť 6. Praktické využitie a prenositeľnosť",
                    pt: "Secção 6. Utilização prática e transferibilidade"
                },
                title: {
                    en: "The document has potential to support the development of training actions in different European contexts.",
                    es: "El documento tiene un alto potencial para respaldar el desarrollo de acciones formativas en diversos contextos europeos.",
                    it: "Il documento possiede il potenziale per supportare lo sviluppo di azioni formative in differenti contesti europei.",
                    de: "Das Dokument birgt großes Potenzial, die Umsetzung von Qualifizierungsmaßnahmen in verschiedenen europäischen Kontexten zu unterstützen.",
                    sk: "Dokument má potenciál podporiť rozvoj vzdelávacích aktivít v rôznych európskych kontextoch.",
                    pt: "O documento tem potencial para apoiar o desenvolvimento de ações formativas em diferentes contextos europeus."
                }
            },

            // Section 7. Ethical, legal and inclusive principles (4 questions)
            {
                id: "e1",
                section: {
                    en: "Section 7. Ethical, legal and inclusive principles",
                    es: "Sección 7. Principios éticos, legales e inclusivos",
                    it: "Sezione 7. Principi etici, legali e inclusivi",
                    de: "Abschnitt 7. Ethische, rechtliche und inklusive Prinzipien",
                    sk: "Časť 7. Etické, právne a inkluzívne princípy",
                    pt: "Secção 7. Princípios éticos, legais e inclusivos"
                },
                title: {
                    en: "Ethical and legal aspects are sufficiently integrated into the itinerary.",
                    es: "Los aspectos éticos y legales están suficientemente integrados en el itinerario.",
                    it: "Gli aspetti etici e legali sono sufficientemente integrati nell'itinerario.",
                    de: "Ethische und rechtliche Gesichtspunkte sind fundiert in den Ausbildungspfad integriert.",
                    sk: "Etické a právne aspekty sú do vzdelávacej cesty dostatočne začlenené.",
                    pt: "Os aspetos éticos e legais estão suficientemente integrados no itinerário."
                }
            },
            {
                id: "e2",
                section: {
                    en: "Section 7. Ethical, legal and inclusive principles",
                    es: "Sección 7. Principios éticos, legales e inclusivos",
                    it: "Sezione 7. Principi etici, legali e inclusivi",
                    de: "Abschnitt 7. Ethische, rechtliche und inklusive Prinzipien",
                    sk: "Časť 7. Etické, právne a inkluzívne princípy",
                    pt: "Secção 7. Princípios éticos, legais e inclusivos"
                },
                title: {
                    en: "The treatment of ethical and legal issues is appropriate for the target groups.",
                    es: "El tratamiento de las cuestiones éticas y legales es adecuado para los grupos destinatarios.",
                    it: "Il trattamento delle questioni etiche e legali è appropriato per i gruppi destinatari.",
                    de: "Die Behandlung ethischer und rechtlicher Fragen ist zielgruppengerecht gestaltet.",
                    sk: "Spracovanie etických a právnych otázok je primerané pre cieľové skupiny.",
                    pt: "O tratamento das questões éticas e legais é adequado para os grupos-alvo."
                }
            },
            {
                id: "e3",
                section: {
                    en: "Section 7. Ethical, legal and inclusive principles",
                    es: "Sección 7. Principios éticos, legales e inclusivos",
                    it: "Sezione 7. Principi etici, legali e inclusivi",
                    de: "Abschnitt 7. Ethische, rechtliche und inklusive Prinzipien",
                    sk: "Časť 7. Etické, právne a inkluzívne princípy",
                    pt: "Secção 7. Princípios éticos, legais e inclusivos"
                },
                title: {
                    en: "The ethical dimension is connected meaningfully with tool selection, training design and implementation.",
                    es: "La dimensión ética se conecta de forma significativa con la selección de herramientas, el diseño formativo y su ejecución.",
                    it: "La dimensione etica è collegata in modo significativo alla selezione degli strumenti, alla progettazione didattica e all'implementazione.",
                    de: "Die ethische Dimension ist praxisnah mit Werkzeugauswahl, Schulungsdesign und Durchführung verzahnt.",
                    sk: "Etický rozmer je zmysluplne prepojený s výberom nástrojov, návrhom školenia a jeho realizáciou.",
                    pt: "A dimensão ética está ligada de forma significativa à seleção de ferramentas, conceção da formação e implementação."
                }
            },
            {
                id: "e4",
                section: {
                    en: "Section 7. Ethical, legal and inclusive principles",
                    es: "Sección 7. Principios éticos, legales e inclusivos",
                    it: "Sezione 7. Principi etici, legali e inclusivos",
                    de: "Abschnitt 7. Ethische, rechtliche und inklusive Prinzipien",
                    sk: "Časť 7. Etické, právne a inkluzívne princípy",
                    pt: "Secção 7. Princípios éticos, legais e inclusivos"
                },
                title: {
                    en: "The itinerary gives appropriate attention to fairness, accessibility and inclusion.",
                    es: "El itinerario presta la debida atención a la equidad, la accesibilidad y la inclusión.",
                    it: "L'itinerario presta un'adeguata attenzione a equità, accessibilità e inclusione.",
                    de: "Der Ausbildungspfad schenkt Fairness, Barrierefreiheit und Inklusion gebührende Aufmerksamkeit.",
                    sk: "Vzdelávacia cesta venuje náležitú pozornosť spravodlivosti, prístupnosti a inklúzii.",
                    pt: "O itinerário dá a devida atenção à equidade, acessibilidade e inclusão."
                }
            }
        ],
        qualitativeQuestions: [
            {
                id: 'q1_strengths',
                title: {
                    en: 'What do you consider to be the main strengths of the Learning Brains Training Itinerary?',
                    es: '¿Cuáles consideras que son los principales puntos fuertes del Itinerario Formativo de Learning Brains?',
                    it: 'Quali considera siano i principali punti di forza dell\'Itinerario Formativo di Learning Brains?',
                    de: 'Was sind Ihrer Ansicht nach die Hauptstärken des Learning Brains-Ausbildungspfads?',
                    sk: 'Čo považujete za hlavné silné stránky vzdelávacej cesty Learning Brains?',
                    pt: 'O que considera serem os principais pontos fortes do Itinerário Formativo do Learning Brains?'
                },
                placeholder: {
                    en: 'Highlight key strengths, innovative pedagogical aspects, or particularly valuable elements...',
                    es: 'Señala los aspectos más destacados, innovaciones metodológicas o elementos de mayor valor...',
                    it: 'Evidenzia i punti di forza, gli aspetti pedagogici innovativi o gli elementi di maggior valore...',
                    de: 'Heben Sie Stärken, innovative didaktische Ansätze oder besonders wertvolle Aspekte hervor...',
                    sk: 'Uveďte silné stránky, inovatívne pedagogické aspekty alebo osobitne prínosné prvky...',
                    pt: 'Destaque os principais pontos fortes, abordagens pedagógicas inovadoras ou elementos de maior valor...'
                }
            },
            {
                id: 'q2_improvements',
                title: {
                    en: 'What aspects, if any, would you suggest revising or developing further?',
                    es: '¿Qué aspectos, en su caso, sugerirías revisar o desarrollar más a fondo?',
                    it: 'Quali aspetti, se del caso, suggerirebbe di rivedere o sviluppare ulteriormente?',
                    de: 'Welche Aspekte sollten Ihrer Ansicht nach überarbeitet oder noch weiter vertieft werden?',
                    sk: 'Ktoré aspekty by ste odporučili revidovať alebo ešte podrobnejšie rozpracovať?',
                    pt: 'Que aspetos, se aplicável, sugeriria rever ou desenvolver com maior profundidade?'
                },
                placeholder: {
                    en: 'Mention any gaps, parts needing clarification, or suggestions for future development...',
                    es: 'Indica posibles carencias, elementos a clarificar o recomendaciones de mejora...',
                    it: 'Indica eventuali lacune, parti da chiarire o raccomandazioni di miglioramento...',
                    de: 'Nennen Sie etwaige Lücken, klärungsbedürftige Teile oder Verbesserungsvorschläge...',
                    sk: 'Uveďte prípadné nedostatky, časti vyžadujúce spresnenie alebo odporúčania na zlepšenie...',
                    pt: 'Indique eventuais lacunas, partes que necessitem de clarificação ou sugestões de melhoria...'
                }
            },
            {
                id: 'q3_missing_topics',
                title: {
                    en: 'Do you think any relevant topic is missing from the Learning Brains Training Itinerary? If yes, please specify.',
                    es: '¿Consideras que falta algún tema relevante en el Itinerario Formativo de Learning Brains? En caso afirmativo, indícalo por favor.',
                    it: 'Ritiene che manchi qualche argomento rilevante nell\'Itinerario Formativo di Learning Brains? In caso affermativo, si prega di specificare.',
                    de: 'Fehlt Ihrer Ansicht nach ein relevantes Thema im Learning Brains-Ausbildungspfad? Wenn ja, bitte erläutern Sie dies kurz.',
                    sk: 'Myslíte si, že vo vzdelávacej ceste Learning Brains chýba nejaká dôležitá téma? Ak áno, uveďte ju prosím.',
                    pt: 'Considera que falta algum tópico relevante no Itinerário Formativo do Learning Brains? Se sim, especifique, por favor.'
                },
                placeholder: {
                    en: 'Specify any missing topic, theme or competence area that should be addressed...',
                    es: 'Indica cualquier tema, contenido o competencia que consideres necesario añadir...',
                    it: 'Indica eventuali argomenti, contenuti o competenze che ritiene opportuno aggiungere...',
                    de: 'Nennen Sie fehlende Themen, Inhalte oder Kompetenzbereiche, die ergänzt werden sollten...',
                    sk: 'Uveďte chýbajúce témy, obsah alebo oblasti kompetencií, ktoré by mali byť doplnené...',
                    pt: 'Indique tópicos, conteúdos ou áreas de competência em falta que deveriam ser incluídos...'
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
                en: 'National Pilot Committee 2: Toolkit Draft Review & Recommendations',
                es: 'National Pilot Committee 2: Borrador del Toolkit y Recomendaciones Previas',
                it: 'National Pilot Committee 2: Bozza del Toolkit e Raccomandazioni Preliminari',
                de: 'National Pilot Committee 2: Toolkit-Entwurf & Vorläufige Empfehlungen',
                sk: 'National Pilot Committee 2: Návrh sady nástrojov (Toolkit) a predbežné odporúčania',
                pt: 'National Pilot Committee 2: Rascunho do Toolkit e Recomendações Prévias'
            },
            subtitle: {
                en: 'Convened once the Toolkit draft is available to provide expert recommendations and guidance prior to its full development.',
                es: 'Convocado cuando exista un borrador del Toolkit para aportar recomendaciones y orientaciones expertas antes de su desarrollo.',
                it: 'Convocato in presenza di una bozza del Toolkit per fornire raccomandazioni e orientamenti esperti prima del suo sviluppo.',
                de: 'Einberufen bei Vorliegen eines Toolkit-Entwurfs, um vor dessen vollständiger Ausarbeitung Empfehlungen einzubringen.',
                sk: 'Zvoláva sa pri dostupnosti návrhu sady nástrojov (Toolkit) s cieľom poskytnúť odporúčania pred jej konečným vývojom.',
                pt: 'Convocado quando existir um rascunho do Toolkit para fornecer recomendações e orientações especializadas antes do seu desenvolvimento.'
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
                en: 'National Pilot Committee 3: Testing & Validation of Deliverables R1 and R2',
                es: 'National Pilot Committee 3: Prueba y Validación de los Resultados R1 y R2',
                it: 'National Pilot Committee 3: Sperimentazione e Validazione dei Risultati R1 e R2',
                de: 'National Pilot Committee 3: Erprobung und Validierung der Ergebnisse R1 und R2',
                sk: 'National Pilot Committee 3: Testovanie a validácia výsledkov R1 a R2',
                pt: 'National Pilot Committee 3: Testagem e Validação dos Resultados R1 e R2'
            },
            subtitle: {
                en: 'Convened when Deliverables R1 and R2 are prepared and ready for comprehensive workplace testing and validation.',
                es: 'Convocado cuando los resultados R1 y R2 estén preparados para su prueba y validación práctica en empresas.',
                it: 'Convocato quando i risultati R1 e R2 sono pronti per la sperimentazione e la validazione pratica nelle imprese.',
                de: 'Einberufen, sobald die Ergebnisse R1 und R2 für die praktische Erprobung und Validierung in Unternehmen bereitstehen.',
                sk: 'Zvoláva sa v momente, keď sú výsledky R1 a R2 pripravené na praktické testovanie a validáciu v podnikoch.',
                pt: 'Convocado quando os resultados R1 e R2 estiverem preparados para teste prático e validação nas empresas.'
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
 * Resolves the original English reference document URL for a campaign
 */
export function getCampaignOriginalDocumentUrl(campaign) {
    if (!campaign) return '';
    if (campaign.documentUrls && typeof campaign.documentUrls === 'object') {
        return campaign.documentUrls.en || campaign.documentUrl || Object.values(campaign.documentUrls)[0];
    }
    return campaign.documentUrl || '';
}

/**
 * Common UI interface strings translated for the validation portal
 */
export const VALIDATION_UI = {
    hub_title: {
        en: 'External Validation Portal',
        es: 'Portal de Validación Externa',
        it: 'Portale di Validazione Esterna',
        de: 'Portal für Externe Validierung',
        sk: 'Portál pre externú validáciu',
        pt: 'Portal de Validação Externa'
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
        en: 'Scheduled / Upcoming',
        es: 'Programado / Próximamente',
        it: 'Previsto / Prossimamente',
        de: 'Geplant / Demnächst',
        sk: 'Naplánované / Pripravuje sa',
        pt: 'Programado / Brevemente'
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
        en: 'Upcoming Validation Phases',
        es: 'Próximas Fases de Validación',
        it: 'Prossime Fasi di Validazione',
        de: 'Kommende Validierungsphasen',
        sk: 'Pripravované fázy validácie',
        pt: 'Próximas Fases de Validação'
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
        en: 'Complete the structured form (approx. 10-15 min).',
        es: 'Completa el cuestionario estructurado (aprox. 10-15 min).',
        it: 'Completa il questionario strutturato (circa 10-15 min).',
        de: 'Füllen Sie das strukturierte Formular aus (ca. 10-15 Min.).',
        sk: 'Vyplňte štruktúrovaný formulár (cca 10-15 min).',
        pt: 'Preencha o formulário estruturado (aprox. 10-15 min).'
    },
    hub_card_pdf_preview: {
        en: 'PDF Preview Ready',
        es: 'Vista previa PDF disponible',
        it: 'Anteprima PDF disponibile',
        de: 'PDF-Vorschau verfügbar',
        sk: 'Náhľad PDF pripravený',
        pt: 'Pré-visualização PDF disponível'
    },
    hub_card_review_time: {
        en: '~10-15 min review',
        es: '~10-15 min de revisión',
        it: '~10-15 min di revisione',
        de: '~10-15 Min. Begutachtung',
        sk: '~10-15 min. hodnotenie',
        pt: '~10-15 min de revisão'
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
        en: 'Scale: 1 = Strongly Disagree, 5 = Strongly Agree | N/A = Not applicable / cannot assess',
        es: 'Escala: 1 = Totalmente en desacuerdo, 5 = Totalmente de acuerdo | N/A = No aplicable / no puedo valorar',
        it: 'Scala: 1 = Fortemente in disaccordo, 5 = Pienamente d\'accordo | N/A = Non applicabile / non posso valutare',
        de: 'Skala: 1 = Stimme überhaupt nicht zu, 5 = Stimme vollkommen zu | N/A = Nicht zutreffend / kann nicht beurteilen',
        sk: 'Škála: 1 = Úplne nesúhlasím, 5 = Úplne súhlasím | N/A = Neuplatňuje sa / neviem posúdiť',
        pt: 'Escala: 1 = Discordo totalmente, 5 = Concordo totalmente | N/A = Não aplicável / não posso avaliar'
    },
    scale_na_short: {
        en: 'N/A',
        es: 'N/A',
        it: 'N/A',
        de: 'N/A',
        sk: 'N/A',
        pt: 'N/A'
    },
    scale_na_desc: {
        en: 'Not applicable / I cannot assess',
        es: 'No aplicable / No puedo valorar',
        it: 'Non applicabile / Non posso valutare',
        de: 'Nicht zutreffend / Kann ich nicht beurteilen',
        sk: 'Neuplatňuje sa / Neviem posúdiť',
        pt: 'Não aplicável / Não posso avaliar'
    },
    professional_background: {
        en: 'Professional Background',
        es: 'Perfil o Trayectoria Profesional',
        it: 'Esperienza Professionale',
        de: 'Beruflicher Hintergrund',
        sk: 'Odborný profil / Pôsobenie',
        pt: 'Perfil Profissional'
    },
    position_role: {
        en: 'Position / Role',
        es: 'Puesto / Cargo',
        it: 'Posizione / Ruolo',
        de: 'Position / Rolle',
        sk: 'Pozícia / Rola',
        pt: 'Posição / Cargo'
    },
    professional_profile: {
        en: 'Professional Profile',
        es: 'Perfil Profesional',
        it: 'Profilo Professionale',
        de: 'Berufliches Profil',
        sk: 'Profesijný profil',
        pt: 'Perfil Profissional'
    },
    years_experience: {
        en: 'Years of professional experience in education, training, HR, industry or tech',
        es: 'Años de experiencia profesional en educación, formación, RRHH, industria o tecnología',
        it: 'Anni di esperienza professionale in istruzione, formazione, HR, industria o tecnologia',
        de: 'Jahre Berufserfahrung in Bildung, Weiterbildung, HR, Industrie oder Technologie',
        sk: 'Roky odbornej praxe vo vzdelávaní, HR, priemysle alebo digitálnych technológiách',
        pt: 'Anos de experiência profissional em educação, formação, RH, indústria ou tecnologia'
    },
    ai_experience: {
        en: 'Previous experience with AI-supported learning or training',
        es: 'Experiencia previa con aprendizaje o formación apoyada en IA',
        it: 'Esperienza precedente con formazione o apprendimento basato su IA',
        de: 'Vorerfahrung mit KI-unterstütztem Lernen oder Weiterbildung',
        sk: 'Predchádzajúce skúsenosti so vzdelávaním podporovaným umelou inteligenciou',
        pt: 'Experiência prévia com formação apoiada em inteligência artificial'
    },
    other_specify: {
        en: 'Please specify other background',
        es: 'Por favor, especifica tu perfil profesional',
        it: 'Si prega di specificare altro profilo',
        de: 'Bitte näher präzisieren',
        sk: 'Spresnite, prosím, iný profil',
        pt: 'Por favor, especifique outro perfil'
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
    },
    step_profile_desc: {
        en: 'Please indicate your contact details and organizational profile.',
        es: 'Por favor, indica tus datos de contacto y perfil profesional u organizativo.',
        it: 'Si prega di indicare i propri dati di contatto e il profilo professionale o organizzativo.',
        de: 'Bitte geben Sie Ihre Kontaktdaten und Ihr Organisationsprofil an.',
        sk: 'Uveďte svoje kontaktné údaje a organizačný profil.',
        pt: 'Por favor, indique os seus dados de contacto e perfil profissional ou da organização.'
    },
    step_feedback_desc: {
        en: 'Share specific qualitative remarks, suggestions and regional considerations.',
        es: 'Comparte comentarios cualitativos específicos, sugerencias y consideraciones regionales.',
        it: 'Condividi osservazioni qualitative specifiche, suggerimenti e considerazioni regionali.',
        de: 'Teilen Sie spezifische qualitative Anmerkungen, Vorschläge und regionale Überlegungen.',
        sk: 'Zdieľajte konkrétne kvalitatívne postrehy, návrhy a regionálne špecifiká.',
        pt: 'Partilhe observações qualitativas específicas, sugestões e considerações regionais.'
    },
    step_submit_desc: {
        en: 'Review summary before registering your validation into the project records.',
        es: 'Revisa el resumen antes de registrar tu validación en el expediente del proyecto.',
        it: 'Rivedi il riepilogo prima di registrare la validazione nei registri del progetto.',
        de: 'Überprüfen Sie die Zusammenfassung vor der endgültigen Übermittlung an das Projekt.',
        sk: 'Pred zaznamenaním validácie do záznamov projektu skontrolujte zhrnutie.',
        pt: 'Reveja o resumo antes de registar a sua validação nos registos do projeto.'
    },
    summary_evaluator: {
        en: 'Evaluator',
        es: 'Evaluador/a',
        it: 'Valutatore',
        de: 'Gutachter/in',
        sk: 'Hodnotiteľ',
        pt: 'Avaliador/a'
    },
    summary_organization: {
        en: 'Organization',
        es: 'Organización',
        it: 'Organizzazione',
        de: 'Organisation',
        sk: 'Organizácia',
        pt: 'Organização'
    },
    summary_background: {
        en: 'Background',
        es: 'Perfil Profesional',
        it: 'Profilo Professionale',
        de: 'Beruflicher Hintergrund',
        sk: 'Odborný profil',
        pt: 'Perfil Profissional'
    },
    summary_experience_ai: {
        en: 'Experience / AI',
        es: 'Experiencia / IA',
        it: 'Esperienza / IA',
        de: 'Erfahrung / KI',
        sk: 'Prax / AI',
        pt: 'Experiência / IA'
    },
    summary_years: {
        en: 'yrs',
        es: 'años',
        it: 'anni',
        de: 'Jahre',
        sk: 'rokov',
        pt: 'anos'
    },
    summary_role: {
        en: 'Role / Profile',
        es: 'Cargo / Perfil',
        it: 'Ruolo / Profilo',
        de: 'Rolle / Profil',
        sk: 'Rola / Profil',
        pt: 'Função / Perfil'
    },
    summary_position: {
        en: 'Position / Role',
        es: 'Puesto / Cargo',
        it: 'Posizione / Ruolo',
        de: 'Position / Rolle',
        sk: 'Pozícia / Rola',
        pt: 'Posição / Cargo'
    },
    summary_profile: {
        en: 'Professional Profile',
        es: 'Perfil Profesional',
        it: 'Profilo Professionale',
        de: 'Berufliches Profil',
        sk: 'Profesijný profil',
        pt: 'Perfil Profissional'
    },
    summary_quantitative: {
        en: 'Quantitative Questions',
        es: 'Preguntas Cuantitativas',
        it: 'Domande Quantitative',
        de: 'Quantitative Fragen',
        sk: 'Kvantitatívne otázky',
        pt: 'Questões Quantitativas'
    },
    summary_answered: {
        en: 'answered',
        es: 'respondidas',
        it: 'risposte',
        de: 'beantwortet',
        sk: 'zodpovedaných',
        pt: 'respondidas'
    },
    summary_qualitative: {
        en: 'Qualitative Inputs',
        es: 'Aportaciones Cualitativas',
        it: 'Contributi Qualitativi',
        de: 'Qualitative Beiträge',
        sk: 'Kvalitatívne príspevky',
        pt: 'Contributos Qualitativos'
    },
    summary_sections_provided: {
        en: 'sections provided',
        es: 'secciones completadas',
        it: 'sezioni compilate',
        de: 'Bereiche ausgefüllt',
        sk: 'sekcií vyplnených',
        pt: 'secções preenchidas'
    },
    gdpr_controller_title: {
        en: 'Data Controller',
        es: 'Responsable del Tratamiento',
        it: 'Titolare del Trattamento',
        de: 'Verantwortlicher',
        sk: 'Prevádzkovateľ',
        pt: 'Responsável pelo Tratamento'
    },
    gdpr_controller_desc: {
        en: 'Learning Brains Erasmus+ Consortium (coordinated by FVEM, Spain). In accordance with GDPR (EU 2016/679), responses are processed solely for project justification and evaluation. Stored securely within restricted consortium-only resources.',
        es: 'Consorcio Erasmus+ Learning Brains (coordinado por FVEM, España). Conforme al RGPD (UE 2016/679), las respuestas se tratan exclusivamente para la evaluación y justificación del proyecto. Almacenado de forma segura en recursos restringidos al consorcio.',
        it: 'Consorzio Erasmus+ Learning Brains (coordinato da FVEM, Spagna). In conformità con il GDPR (UE 2016/679), le risposte sono trattate esclusivamente a fini di valutazione e rendicontazione del progetto. Archiviate in modo sicuro all\'interno di risorse riservate al consorzio.',
        de: 'Erasmus+-Konsortium Learning Brains (koordiniert von FVEM, Spanien). Gemäß DSGVO (EU 2016/679) werden die Antworten ausschließlich zur Evaluierung und Nachweisführung des Projekts verarbeitet. Sichere Speicherung in geschützten Konsortialressourcen.',
        sk: 'Konzorcium Erasmus+ Learning Brains (koordinované FVEM, Španielsko). V súlade s GDPR (EÚ 2016/679) sa odpovede spracúvajú výhradne na účely hodnotenia a vykazovania projektu. Bezpečne uložené v prostriedkoch prístupných len konzorciu.',
        pt: 'Consórcio Erasmus+ Learning Brains (coordenado pela FVEM, Espanha). De acordo com o RGPD (UE 2016/679), as respostas são tratadas exclusivamente para efeitos de avaliação e justificação do projeto. Armazenadas de forma segura em recursos restritos ao consórcio.'
    },
    submit_error: {
        en: 'Could not submit your feedback at this time. Please try again.',
        es: 'No se pudo enviar la respuesta en este momento. Por favor, inténtalo de nuevo.',
        it: 'Impossibile inviare la valutazione in questo momento. Riprova più tardi.',
        de: 'Ihre Rückmeldung konnte derzeit nicht übermittelt werden. Bitte versuchen Sie es erneut.',
        sk: 'Spätnú väzbu sa momentálne nepodarilo odoslať. Skúste to znova.',
        pt: 'Não foi possível submeter o seu feedback neste momento. Por favor, tente novamente.'
    },
    pdf_preview: {
        en: 'PDF Document Preview',
        es: 'Vista Previa del Documento PDF',
        it: 'Anteprima Documento PDF',
        de: 'PDF-Dokumentenvorschau',
        sk: 'Náhľad PDF dokumentu',
        pt: 'Pré-visualização do Documento PDF'
    },
    submit_another: {
        en: 'Submit another response',
        es: 'Enviar otra respuesta',
        it: 'Invia un\'altra risposta',
        de: 'Weitere Rückmeldung senden',
        sk: 'Odoslať ďalšiu odpoveď',
        pt: 'Submeter outra resposta'
    },
    summary_ai_experience: {
        en: 'AI Experience',
        es: 'Experiencia en IA',
        it: 'Esperienza in IA',
        de: 'KI-Erfahrung',
        sk: 'Skúsenosti s AI',
        pt: 'Experiência em IA'
    },
    contact_assistance: {
        en: 'For any question or clarification, please contact joseba@fvem.es',
        es: 'Para cualquier duda o aclaración, contacta con joseba@fvem.es',
        it: 'Per qualsiasi chiarimento o informazione, contattare joseba@fvem.es',
        de: 'Für Fragen oder Klarstellungen wenden Sie sich bitte an joseba@fvem.es',
        sk: 'V prípade akýchkoľvek otázok alebo nejasností nás kontaktujte na joseba@fvem.es',
        pt: 'Para quaisquer esclarecimentos ou dúvidas, por favor contacte joseba@fvem.es'
    },
    ai_translated_badge: {
        en: 'AI Translation',
        es: 'Traducción por IA',
        it: 'Traduzione con IA',
        de: 'KI-Übersetzung',
        sk: 'Preklad pomocou AI',
        pt: 'Tradução por IA'
    },
    download_options: {
        en: 'Select Version to Download',
        es: 'Selecciona versión para descargar',
        it: 'Seleziona versione da scaricare',
        de: 'Download-Version auswählen',
        sk: 'Vyberte verziu na stiahnutie',
        pt: 'Selecionar versão para descarregar'
    },
    official_original: {
        en: 'Official Reference',
        es: 'Referencia Oficial',
        it: 'Riferimento Ufficiale',
        de: 'Offizielle Referenz',
        sk: 'Oficiálna referencia',
        pt: 'Referência Oficial'
    },
    download_translated_desc: {
        en: 'AI-assisted translation (previewed in viewer)',
        es: 'Traducción asistida por IA (mostrada en el visor)',
        it: 'Traduzione con IA (mostrata nel visualizzatore)',
        de: 'KI-Übersetzung (im Viewer angezeigt)',
        sk: 'Preklad pomocou AI (zobrazený v prehliadači)',
        pt: 'Tradução por IA (apresentada no visualizador)'
    },
    reviewed_version: {
        en: 'Reviewed Translation',
        es: 'Traducción Revisada',
        it: 'Traduzione Revisionata',
        de: 'Geprüfte Übersetzung',
        sk: 'Revidovaný preklad',
        pt: 'Tradução Revista'
    },
    download_reviewed_desc: {
        en: 'Official translation reviewed and verified by native experts',
        es: 'Traducción oficial revisada y verificada por expertos nativos',
        it: 'Traduzione ufficiale revisionata e verificata da esperti madrelingua',
        de: 'Offizielle Übersetzung, von muttersprachlichen Experten geprüft',
        sk: 'Oficiálny preklad overený odborníkmi z radov rodených hovoriacich',
        pt: 'Tradução oficial revista e verificada por especialistas nativos'
    },
    download_original_pdf: {
        en: 'Download Original PDF (EN)',
        es: 'Descargar Original (EN)',
        it: 'Scarica Originale (EN)',
        de: 'Original-PDF (EN)',
        sk: 'Stiahnuť originál (EN)',
        pt: 'Descarregar Original (EN)'
    },
    download_original_desc: {
        en: 'Official reference document in English',
        es: 'Documento original oficial de referencia en inglés',
        it: 'Documento originale ufficiale di riferimento in inglese',
        de: 'Offizielles Referenzdokument auf Englisch',
        sk: 'Oficiálny referenčný dokument v angličtine',
        pt: 'Documento original oficial de referência em inglês'
    },
    download_original_link: {
        en: 'download the official English original (EN) →',
        es: 'descargar el original oficial en inglés (EN) →',
        it: 'scaricare l\'originale ufficiale in inglese (EN) →',
        de: 'das offizielle englische Original (EN) herunterladen →',
        sk: 'stiahnuť oficiálny anglický originál (EN) →',
        pt: 'descarregar o original oficial em inglês (EN) →'
    },
    ai_translation_notice_title: {
        en: 'AI Translation Notice',
        es: 'Aviso sobre Traducción por IA',
        it: 'Avviso Traduzione con IA',
        de: 'Hinweis zur KI-Übersetzung',
        sk: 'Upozornenie na preklad pomocou AI',
        pt: 'Aviso de Tradução por IA'
    },
    ai_translation_notice_desc: {
        en: 'This preview shows an AI-assisted translation of the official English original. For the authoritative reference, you can download the original English version.',
        es: 'Este visor muestra una traducción asistida por IA del documento original en inglés. Para consultar la versión oficial de referencia, puedes descargar el original en inglés.',
        it: 'Questo visualizzatore mostra una traduzione assistita da IA del documento originale in inglese. Per consultare la versione oficiale di riferimento, puoi scaricare l\'originale in inglese.',
        de: 'Diese Vorschau zeigt eine KI-unterstützte Übersetzung des englischen Originaldokuments. Die maßgebliche Referenzfassung auf Englisch können Sie herunterladen.',
        sk: 'Tento náhľad zobrazuje preklad pôvodného anglického dokumentu vytvorený pomocou AI. Záväzné pôvodné znenie v angličtine si môžete stiahnuť.',
        pt: 'Este visualizador apresenta uma tradução assistida por IA a partir do documento original em inglês. Para consultar a versão oficial de referência, pode descarregar o original em inglês.'
    },
    ai_translation_notice_inline: {
        en: 'This preview shows an AI-assisted translation of the official English document. For the authoritative reference, you can ',
        es: 'Este visor muestra una traducción asistida por IA del documento original en inglés. Para consultar la versión oficial de referencia, puedes ',
        it: 'Questo visualizzatore mostra una traduzione con IA del documento originale in inglese. Per consultare la versione ufficiale di riferimento, puoi ',
        de: 'Diese Vorschau zeigt eine KI-unterstützte Übersetzung des englischen Originaldokuments. Die maßgebliche Referenzfassung können Sie ',
        sk: 'Tento náhľad zobrazuje preklad pôvodného anglického dokumentu vytvorený pomocou AI. Záväzné znenie môžete ',
        pt: 'Este visualizador apresenta uma tradução assistida por IA a partir do original em inglês. Para consultar a versão oficial de referência, pode '
    },
    download_translated_btn: {
        en: 'Download Document (EN)',
        es: 'Descarga en Español',
        it: 'Scarica in Italiano',
        de: 'Auf Deutsch herunterladen',
        sk: 'Stiahnuť v slovenčine',
        pt: 'Descarregar em Português'
    },
    download_original_btn: {
        en: 'Download Original (EN)',
        es: 'Descarga Original (EN)',
        it: 'Scarica Originale (EN)',
        de: 'Original herunterladen (EN)',
        sk: 'Stiahnuť originál (EN)',
        pt: 'Descarregar Original (EN)'
    },
    campaign_upcoming_notice: {
        en: 'This validation phase is not yet open for evaluation. It will be available in the upcoming project phase.',
        es: 'Esta fase de validación aún no está abierta a evaluación. Estará disponible en la próxima fase del proyecto.',
        it: 'Questa fase di validazione non è ancora aperta. Sarà disponibile nella prossima fase del progetto.',
        de: 'Diese Validierungsphase ist noch nicht zur Bewertung freigegeben. Sie wird in der nächsten Projektphase verfügbar sein.',
        sk: 'Táto fáza validácie ešte nie je otvorená. Bude k dispozícii v nasledujúcej fáze projektu.',
        pt: 'Esta fase de validação ainda não está aberta para avaliação. Estará disponível na próxima fase do projeto.'
    },
    go_to_active_validation: {
        en: 'Go to Training Itinerary Validation',
        es: 'Ir a Validación del Itinerario Formativo',
        it: 'Vai alla Validazione dell\'Itinerario Formativo',
        de: 'Zur Lehrplanvalidierung gehen',
        sk: 'Prejsť na validáciu vzdelávacej cesty',
        pt: 'Ir para a Validação do Itinerário Formativo'
    }
};
