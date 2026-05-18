const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');

const updates = {
  pt: {
    'ai-and-jobs-the-real': `Notícias recentes mais uma vez trouxeram um problema crítico à tona: o impacto real da inteligência artificial no emprego. Desde demissões em grandes empresas de tecnologia até crescentes preocupações entre economistas sobre a polarização de empregos, uma coisa é clara, o mercado de trabalho está evoluindo mais rápido do que nunca.
Alguns analistas alertam que a IA poderia afetar desproporcionalmente funções de nível intermediário, potencialmente remodelando a estrutura da força de trabalho e aumentando a desigualdade. Ao mesmo tempo, as empresas estão reorganizando suas operações, aproveitando ferramentas de IA para melhorar a eficiência e reduzir a dependência de funções tradicionais.
Esta transformação não se limita ao setor de tecnologia. Em toda a Europa, as indústrias estão passando por uma mudança profunda impulsionada pela automação, dados e adoção de IA. À medida que essas tecnologias se tornam mais integradas às operações diárias, a demanda por novas habilidades está acelerando.
Neste contexto, o verdadeiro desafio não é se a IA substituirá certas tarefas, mas como preparamos as pessoas para trabalhar ao lado dela. As organizações estão reconhecendo cada vez mais a necessidade de modelos de aprendizagem mais ágeis e responsivos, que estejam intimamente ligados ao local de trabalho e capazes de abordar lacunas de habilidades em tempo real.
Ao mesmo tempo, iniciativas colaborativas em toda a Europa estão explorando como alinhar melhor as necessidades de educação, treinamento e indústria. Ao reunir empresas, provedores de treinamento e especialistas em tecnologia, esses ecossistemas visam criar abordagens mais eficazes e sustentáveis para o desenvolvimento da força de trabalho.
No final das contas, a IA não está apenas transformando como trabalhamos, mas também como aprendemos. A aprendizagem contínua, baseada no trabalho e personalizada está se tornando rapidamente uma prioridade estratégica para organizações que desejam permanecer competitivas em um ambiente em rápida mudança.`
  },
  sk: {
    'ai-and-jobs-the-real': `Nedávne správy opäť upriamili pozornosť na kritický problém: skutočný vplyv umelej inteligencie na zamestnanosť. Od prepúšťania v hlavných technologických spoločnostiach po narastajúce obavy ekonómov o polarizáciu pracovných miest, jedno je jasné, trh práce sa vyvíja rýchlejšie ako kedykoľvek predtým.
Niektorí analytici varujú, že AI by mohla nerovnomerne ovplyvniť stredné pozície, potenciálne preformovať štruktúru pracovnej sily a zvýšiť nerovnosť. Zároveň sa spoločnosti reorganizujú, využívajú nástroje AI na zlepšenie efektívnosti a zníženie závislosti od tradičných rolí.
Táto transformácia nie je obmedzená len na technologický sektor. Po celej Európe prechádzajú odvetvia hlbokou zmenou podporovanou automatizáciou, dátami a prijatím AI. Keď sa tieto technológie stávajú viac zakotvené v denných operáciách, dopyt po nových zručnostiach sa zrýchľuje.
V tomto kontexte skutočnou výzvou nie je, či AI nahradí určité úlohy, ale ako pripravíme ľudí na prácu vedľa neho. Organizácie čoraz viac uznávajú potrebu agilnejších a reaktívnejších modelov vzdelávania, ktoré sú úzko prepojené s pracoviskom a schopné riešiť medzery v zručnostiach v reálnom čase.
Zároveň spolupracujúce iniciatívy po celej Európe skúmajú, ako lepšie zosúladiť potreby vzdelávania, školenia a priemyslu. Tieto ekosystémy si kladú za cieľ vytvoriť efektívnejšie a udržateľnejšie prístupy k rozvoju pracovnej sily, spájaním spoločností, poskytovateľov školení a technologických expertov.
Nakoniec, AI mení nielen spôsob, akým pracujeme, ale aj spôsob, akým sa učíme. Nepretržité, pracoviskom založené a personalizované vzdelávanie sa rýchlo stáva strategickou prioritou pre organizácie, ktoré chcú zostať konkurencieschopné v rýchlo sa meniacom prostredí.`,
    'from-training-to-real-skills': `V dnešnom priemyselnom prostredí sa zmeny dejú rýchlejšie ako kedykoľvek predtým. Automatizácia, digitalizácia, umelej inteligencie a sa meniace výrobné systémy transformujú spôsob, akým spoločnosti fungujú. Ako sa odvetvia prispôsobujú, jedným z naliehavejších problémov sa stáva otázka: ako môžu pracovníci neustále rozvíjať zručnosti potrebné na udržanie kroku s zmenami?
Tradičné metódy pracovného vzdelávania už nestačia.
Po desaťročia sa vzdelávanie zamestnancov často spoliehalo na jednorazové semináre, statické prezentácie alebo triedne vyučovacie hodiny odtrhnuté od reálnych pracovných situácií. Hoci tieto prístupy stále majú hodnotu, často majú problém s poskytnutím trvalého vplyvu v rýchlo sa meniacich priemyselných prostrediach. Zamestnanci môžu získať teoretické znalosti, ale ich efektívne uplatnenie v reálnych situáciách zostáva výzvou.
Moderne odvetvia vyžadujú iný prístup - ten, ktorý dáva prednosť neustálemu učeniu, praktickému uplatneniu a prispôsobiteľnosti.
Tu sa stáva nevyhnutným učenie pri práci. Namiesto oddelenia vzdelávania od každodennej práce sa zamestnanci učia pri vykonávaní skutočných úloh, riešení praktických výziev a rozvíjaní zručností priamo relevantných pre ich úlohy. Učenie sa zakotvuje do každodenných pracovných postupov, čím sa stáva zaujímavejším, efektívnejším a účinnejším.
Zároveň umelej inteligencii otvára nové možnosti pre pracovné vzdelávanie. Nástroje na učenie poháňané umelej inteligenciou môžu podporiť personalizované vzdelávacie skúsenosti, prispôsobovať obsah zručnostiam zamestnancov, ich tempu učenia a profesionálnym potrebám. To pomáha spoločnostiam odísť od "univerzálnych" modelov vzdelávania smerom k inteligentnejším a cieleným vzdelávacím riešeniam.
Pre priemyselné malé a stredné podniky je tento posun čoraz dôležitejší. Menšie spoločnosti často čelia obmedzeným zdrojom na vzdelávanie a zároveň silnému tlaku zostať konkurencieschopné v rýchlo sa meniacich trhoch. Flexibilné prístupy k učeniu pri práci podporované digitálnymi a nástrojmi poháňanými umelej inteligenciou môžu pomôcť preklenúť túto medzeru.
Projekt Learning Brains priamo reaguje na tieto výzvy tým, že skúma inovatívne spôsoby integrácie umelej inteligencie do pracovného učenia a rekvalifikácie v priemysle. Podporou spolupráce medzi poskytovateľmi odborného vzdelávania, priemyselnými partnermi a odborníkmi na vzdelávanie v celej Európe si projekt kladie za cieľ posilniť pripravenosť pracovnej sily na budúcnosť priemyslu.
Pretože v modernom priemyselnom svete učenie už nie je niečo, čo sa deje občas - musí sa stať súčasťou každodennej práce.`
  }
};

['pt', 'sk'].forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    ['ai_news', 'news'].forEach(section => {
      if (data[section] && Array.isArray(data[section].items_list)) {
        data[section].items_list.forEach(item => {
          if (item.slug && updates[lang] && updates[lang][item.slug]) {
            item.content = updates[lang][item.slug];
            changed = true;
          }
        });
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✓ Fixed paragraphs in ${lang}.json`);
    }
  }
});
