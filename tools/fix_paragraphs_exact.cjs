const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const slug = 'kick-off-meeting-in-bilbao-launches';

// Corrected content for each language - exact paragraph breaks matching English structure
const fixedContent = {
  pt: `A cidade de Bilbao recentemente sediou a Reunião de Lançamento do projeto Erasmus+ Learning BRAINS - Sistemas Integrados de Aprendizagem no Local de Trabalho para a Reciclagem Industrial, marcando oficialmente o início de uma emocionante colaboração europeia de dois anos focada em inovação, aprendizagem baseada em IA e reciclagem industrial.
A reunião reuniu representantes de todas as organizações parceiras envolvidas no consórcio, combinando participação presencial e online em uma atmosfera dinâmica e colaborativa. O consórcio é coordenado pela Federación Vizcaína de Empresas del Metal e inclui a participação da Confindustria Veneto SIAV S.r.l, Wirtschaftskammer Steiermark, Slovak Business Agency, Sparkling Intuition e Media Creativa 2020, S.L..
Além da agenda formal, a reunião proporcionou uma valiosa oportunidade para os parceiros se conhecerem melhor, trocarem experiências e construírem as bases para um relacionamento de trabalho forte e cooperativo. A diversidade de perfis dentro do consórcio - desde associações empresariais e câmaras de comércio até fornecedores de treinamento e especialistas em tecnologia - criou um ambiente muito enriquecedor para discussão e compartilhamento de ideias. Durante as sessões, os parceiros alinharam-se com os objetivos do projeto, roadmap de implementação, procedimentos de comunicação e estrutura de gestão. Foi dada atenção especial aos mecanismos de coordenação que apoiarão a colaboração ao longo da vida do projeto, incluindo planejamento de trabalho, procedimentos de garantia de qualidade, estratégias de disseminação e métodos de cooperação transnacional.
O consórcio também revisou a estrutura dos pacotes de trabalho do projeto e as responsabilidades atribuídas a cada organização parceira. O projeto é organizado em torno de quatro pacotes de trabalho principais que abrangem gestão de projeto, atividades de comunicação e disseminação, desenvolvimento do Programa de Treinamento Learning BRAINS e criação do Toolkit Learning BRAINS para a implementação de sistemas de treinamento no local de trabalho baseados em IA. Uma das discussões mais interessantes durante a reunião focou no crescente impacto da Inteligência Artificial na educação e treinamento vocacional dentro das PMEs industriais. Os parceiros compartilharam perspectivas sobre os desafios enfrentados pelas empresas atualmente em relação ao aprimoramento e reciclagem da força de trabalho, bem como as oportunidades que a IA pode oferecer para tornar o treinamento mais flexível, personalizado e acessível em ambientes de trabalho reais.
A reunião também permitiu ao consórcio definir os primeiros passos operacionais para as atividades iniciais de pesquisa e mapeamento previstas no projeto. Essas atividades se concentrarão em identificar ferramentas de IA, práticas inovadoras e estudos de caso bem-sucedidos relacionados à aprendizagem no local de trabalho e treinamento industrial em toda a Europa. O Learning BRAINS visa apoiar gerentes de RH, gerentes de treinamento, treinadores de empresas e PMEs industriais, fornecendo recursos práticos e metodologias inovadoras para projetar e implementar sistemas de treinamento no local de trabalho baseados em IA. O projeto entregará dois resultados principais: um Programa de Treinamento multilíngue e um Toolkit interativo oferecendo orientações práticas, estudos de caso e recursos de IA adaptados aos contextos de treinamento industrial.
A Reunião de Lançamento confirmou o forte compromisso de todos os membros do consórcio em desenvolver resultados de projeto de alta qualidade e impactantes, reforçando a importância da cooperação europeia para enfrentar os desafios atuais de transformação industrial e digital. Com motivação, expertise compartilhada e uma visão comum clara, a parceria Learning BRAINS inicia sua jornada em direção ao apoio a abordagens mais resilientes, inovadoras e centradas no ser humano para a reciclagem industrial em toda a Europa.`,

  sk: `Mesto Bilbao nedávno hostilo zahajovacie stretnutie projektu Erasmus+ Learning BRAINS – Integrované systémy učenia na pracovisku pre rekvalifikáciu v priemysle, čím oficiálne začalo vzrušujúce dvojročné európske partnerstvo zamerané na inovácie, učenie založené na AI a rekvalifikáciu v priemysle.
Stretnutie spojilo zástupcov všetkých partnerov zapojených do konsorcia, kombinujúc osobnú a online účasť v dynamickom a spolupracujúcom prostredí. Konsorcium koordinuje Federacion Vizcaina de Empresas del Metal a zahŕňa účasť Confindustria Veneto SIAV S.r.l, Wirtschaftskammer Steiermark, Slovak Business Agency, Sparkling Intuition a Media Creativa 2020, S.L..
Okrem formálneho programu poskytlo stretnutie cennú príležitosť partnerom lepšie sa spoznať, vymeniť si skúsenosti a položiť základy pre silný a kooperatívny pracovný vzťah. Rôznorodosť profilov v konsorciu — od obchodných združení a obchodných komôr až po poskytovateľov školení a technologických špecialistov — vytvorila veľmi obohacujúce prostredie pre diskusiu a zdieľanie nápadov. Počas stretnutí sa partneri zhodli na cieľoch projektu, implementačnom pláne, komunikačných postupoch a štruktúre riadenia. Špeciálna pozornosť bola venovaná koordinačným mechanizmom, ktoré podporia spoluprácu počas celého trvania projektu, vrátane plánovania práce, postupov zabezpečenia kvality, stratégií šírenia a metód transnacionálnej spolupráce.
Konsorcium tiež preskúmalo štruktúru pracovných balíkov projektu a zodpovednosti pridelené jednotlivým partnerom. Projekt je organizovaný okolo štyroch hlavných pracovných balíkov zahŕňajúcich riadenie projektu, komunikačné a šírenie aktivít, vývoj Tréningového programu Learning BRAINS a vytvorenie Toolkitu Learning BRAINS pre implementáciu systémov učenia na pracovisku založených na AI. Jedna z najzaujímavejších diskusií počas stretnutia sa zameriavala na rastúci vplyv umelej inteligencie vo vzdelávaní a školení v priemyselných MSP. Partneri zdieľali pohľady na výzvy, ktorým sa spoločnosti v súčasnosti stretávajú v súvislosti s rozvojom zručností pracovnej sily a rekvalifikáciou, ako aj na príležitosti, ktoré môže AI ponúknuť pre zefektívnenie školenia, jeho personalizáciu a prístupnosť v reálnych pracovných prostrediach.
Stretnutie tiež umožnilo konsorciu definovať prvé operačné kroky pre počiatočné výskumné a mapovacie aktivity predpokladané v projekte. Tieto aktivity sa budú zamerať na identifikáciu nástrojov AI, inovatívnych postupov a úspešných prípadov štúdií týkajúcich sa učenia na pracovisku a priemyselného školenia v celej Európe. Learning BRAINS si kladie za cieľ podporiť HR manažérov, manažérov školení, firemných trénerov a priemyselné MSP poskytnutím praktických zdrojov a inovatívnych metodík na navrhovanie a implementáciu systémov učenia na pracovisku založených na AI. Projekt poskytne dva hlavné výsledky: viacjazyčný Tréningový program a interaktívny Toolkit ponúkajúci praktické usmernenia, príklady a zdroje AI prispôsobené priemyselným školiacim kontextom.
Zahajovacie stretnutie potvrdilo silný záväzok všetkých členov konsorcia k vytváraniu vysokokvalitných a účinných výsledkov projektu a zároveň zdôraznilo dôležitosť európskej spolupráce pri riešení súčasných výziev priemyselnej a digitálnej transformácie. S motiváciou, zdieľanými skúsenosťami a jasným spoločným víziou začína partnerstvo Learning BRAINS svoju cestu smerom k podpore odolnejších, inovatívnych a ľudskocentrovaných prístupov k rekvalifikácii v priemysle v celej Európe.`
};

['pt', 'sk'].forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  ['ai_news', 'news'].forEach(section => {
    if (data[section] && Array.isArray(data[section].items_list)) {
      data[section].items_list.forEach(item => {
        if (item.slug === slug && fixedContent[lang]) {
          item.content = fixedContent[lang];
          changed = true;
        }
      });
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    const paraCount = fixedContent[lang].split('\n').length;
    console.log(`✓ Fixed ${lang}.json — ${paraCount} paragraphs`);
  }
});
