const fs = require('fs');
const path = require('path');

// The English article paragraph structure (source of truth)
// Each element = one paragraph, separated by \n in the JSON
const englishParagraphs_bilbao = [
  "The city of Bilbao recently hosted the Kick-off Meeting of the Erasmus+ project Learning BRAINS \u2013 Integrated On-the-job Learning Systems for Industrial Reskilling, officially marking the beginning of an exciting two-year European collaboration focused on innovation, AI-based learning and industrial reskilling.",
  "The meeting brought together representatives from all partner organisations involved in the consortium, combining both onsite and online participation in a dynamic and collaborative atmosphere. The consortium is coordinated by Federacion Vizcaina de Empresas del Metal and includes the participation of Confindustria Veneto SIAV S.r.l, Wirtschaftskammer Steiermark, Slovak Business Agency, Sparkling Intuition and Media Creativa 2020, S.L..",
  "Beyond the formal agenda, the meeting provided a valuable opportunity for partners to get to know each other better, exchange experiences and build the foundations for a strong and cooperative working relationship. The diversity of profiles within the consortium \u2014 from business associations and chambers of commerce to training providers and technology specialists \u2014 created a very enriching environment for discussion and idea sharing.\nDuring the sessions, partners aligned on the project's objectives, implementation roadmap, communication procedures and management structure. Special attention was given to the coordination mechanisms that will support the collaboration throughout the project lifetime, including work planning, quality assurance procedures, dissemination strategies and transnational cooperation methods.",
  "The consortium also reviewed the structure of the project work packages and the responsibilities assigned to each partner organisation. The project is organised around four main work packages covering project management, communication and dissemination activities, the development of the Learning BRAINS Training Programme, and the creation of the Learning BRAINS Toolkit for the implementation of AI-based on-the-job training systems.\nOne of the most interesting discussions during the meeting focused on the growing impact of Artificial Intelligence in vocational education and training within industrial SMEs. Partners shared perspectives on the challenges companies currently face regarding workforce upskilling and reskilling, as well as the opportunities that AI can offer to make training more flexible, personalised and accessible in real workplace environments.",
  "The meeting also allowed the consortium to define the first operational steps for the initial research and mapping activities foreseen in the project. These activities will focus on identifying AI tools, innovative practices and successful case studies related to on-the-job learning and industrial training across Europe. Learning BRAINS aims to support HR managers, training managers, company trainers and industrial SMEs by providing practical resources and innovative methodologies to design and implement AI-based on-the-job training systems. The project will deliver two main results: a multilingual Training Programme and an interactive Toolkit offering practical guidance, case studies and AI resources adapted to industrial training contexts.",
  "The Kick-off Meeting confirmed the strong commitment of all consortium members to developing high-quality and impactful project results, while reinforcing the importance of European cooperation to address current industrial and digital transformation challenges.\nWith motivation, shared expertise and a clear common vision, the Learning BRAINS partnership begins its journey towards supporting more resilient, innovative and human-centred approaches to industrial reskilling across Europe."
];

// For pt and sk, the content is a single long block. We need to reinsert the \n breaks
// by matching the approximate paragraph boundaries from the English version.
// Strategy: split on ". " followed by uppercase letter, grouping into ~6 paragraphs

function splitIntoParagraphs(text, numParagraphs) {
  // Split on sentence boundaries
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const totalSentences = sentences.length;
  const sentencesPerParagraph = Math.ceil(totalSentences / numParagraphs);
  
  const paragraphs = [];
  for (let i = 0; i < numParagraphs; i++) {
    const start = i * sentencesPerParagraph;
    const end = Math.min((i + 1) * sentencesPerParagraph, totalSentences);
    const para = sentences.slice(start, end).join('').trim();
    if (para) paragraphs.push(para);
  }
  return paragraphs.join('\n');
}

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const slug = 'kick-off-meeting-in-bilbao-launches';

// Fix pt and sk - split content back into 6 paragraphs
['pt', 'sk'].forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  ['ai_news', 'news'].forEach(section => {
    if (data[section] && Array.isArray(data[section].items_list)) {
      data[section].items_list.forEach(item => {
        if (item.slug === slug && item.content) {
          // Check if there are no paragraph breaks (the problem)
          const hasBreaks = item.content.includes('\n');
          if (!hasBreaks) {
            // Re-split into 6 paragraphs matching English structure
            item.content = splitIntoParagraphs(item.content, 6);
            changed = true;
            console.log(`Fixed paragraphs for ${lang}: ${item.content.split('\n').length} paragraphs`);
          } else {
            console.log(`${lang} already has paragraph breaks, skipping.`);
          }
        }
      });
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Saved ${lang}.json`);
  }
});
