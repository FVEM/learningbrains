const fs = require('fs');
const path = require('path');

// __dirname is scratch/, so we go up one level
const localesDir = path.join(__dirname, '..', 'src', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const textsToRemove = [
  // Full exact prefix 1
  `Learning Brains – Integrated On the-job\nLearning Systems for Industrial Reskilling\n\n\nErasmus+ Program 2025-1-ES01-KA220-VET-000351934\n\n\n\n\nThis project has been funded with support from the European Commission. This publication [communication] reflects the views only of the author, and the Commission cannot be held responsible for any use which may be made of the information contained therein.  \n\n\n`,
  
  `Learning Brains – Integrated On the-job\nLearning Systems for Industrial Reskilling\n\n\nErasmus+ Program 2025-1-ES01-KA220-VET-000351934\n\n\n\n\nThis project has been funded with support from the European Commission. This publication [communication] reflects the views only of the author, and the Commission cannot be held responsible for any use which may be made of the information contained therein.\n\n\n`,
  
  `Learning Brains – Integrated On the-job\nLearning Systems for Industrial Reskilling\n\nErasmus+ Program 2025-1-ES01-KA220-VET-000351934\n\nThis project has been funded with support from the European Commission. This publication [communication] reflects the views only of the author, and the Commission cannot be held responsible for any use which may be made of the information contained therein.`
];

for (const file of files) {
  const filePath = path.join(localesDir, file);
  let contentStr = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const t of textsToRemove) {
    if (contentStr.includes(t)) {
      contentStr = contentStr.replaceAll(t, '');
      changed = true;
    }
  }

  // Handle the specific one the user asked to remove for the third article
  const specificText1 = `Kick-off Meeting in Bilbao launches the Learning BRAINS European collaboration\n\n\n[Link]\n\n\n`;
  if (contentStr.includes(specificText1)) {
    contentStr = contentStr.replaceAll(specificText1, '');
    changed = true;
  }
  
  // also handle standard variations of "[Link]\n\n\n"
  const title1 = `AI-Powered Learning: How Artificial Intelligence Is Transforming Industrial Training\n\n\n[Link]\n\n\n`;
  if (contentStr.includes(title1)) {
    contentStr = contentStr.replaceAll(title1, '');
    changed = true;
  }
  
  const title2 = `AI and jobs: the real challenge is not technology, but people \n\n\n[Link]\n\n\n\n`;
  if (contentStr.includes(title2)) {
    contentStr = contentStr.replaceAll(title2, '');
    changed = true;
  }
  
  // A catch all for [Link] lines that could be left over
  const linkReg = /\[Link\]\n\n\n/g;
  if (linkReg.test(contentStr)) {
    contentStr = contentStr.replaceAll(linkReg, '');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, contentStr, 'utf8');
    console.log(`Cleaned ${file}`);
  }
}
