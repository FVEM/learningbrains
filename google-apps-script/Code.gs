/**
 * LEARNING BRAINS (ERASMUS+ PROJECT)
 * GOOGLE APPS SCRIPT - TRAINING ITINERARY VALIDATION WEBHOOK
 * 
 * Target Google Drive Shared Folder for Consortium:
 * https://drive.google.com/drive/folders/1Lpbav93Mpq0HG0F1JEAv1AfZhZjf2dp2
 * 
 * Automatically receives form submission JSON from Vercel web portal
 * and appends a structured, formatted row in the "Validation_Responses" sheet.
 */

const SHEET_NAME = 'Validation_Responses';

/**
 * POST endpoint: receives submission payload
 */
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    // Wait up to 10 seconds to handle concurrent requests safely
    lock.waitLock(10000);

    const contents = e.postData ? e.postData.contents : null;
    if (!contents) {
      return createJsonResponse({ status: 'error', message: 'No postData contents received' }, 400);
    }

    const data = JSON.parse(contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // If sheet does not exist or is empty, initialize structure
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      initSheetStructure(sheet);
    } else if (sheet.getLastRow() === 0) {
      initSheetStructure(sheet);
    }

    // Extract form fields
    const evaluator = data.evaluator || {};
    const ratings = data.ratings || {};
    const feedback = data.feedback || {};

    const nextRow = sheet.getLastRow() + 1;

    // Excel / Sheets formulas for current row averages
    // Sec 2: P1-P5 (cols 12-16: L to P)
    const formulaMediaP = '=AVERAGE(L' + nextRow + ':P' + nextRow + ')';
    // Sec 3: S1-S4 (cols 17-20: Q to T)
    const formulaMediaS = '=AVERAGE(Q' + nextRow + ':T' + nextRow + ')';
    // Sec 4: U1-U4 (cols 21-24: U to X)
    const formulaMediaU = '=AVERAGE(U' + nextRow + ':X' + nextRow + ')';
    // Sec 5: C1-C4 (cols 25-28: Y to AB)
    const formulaMediaC = '=AVERAGE(Y' + nextRow + ':AB' + nextRow + ')';
    // Sec 6: T1-T5 (cols 29-33: AC to AG)
    const formulaMediaT = '=AVERAGE(AC' + nextRow + ':AG' + nextRow + ')';
    // Sec 7: E1-E4 (cols 34-37: AH to AK)
    const formulaMediaE = '=AVERAGE(AH' + nextRow + ':AK' + nextRow + ')';
    // Overall Mean: P1 to E4 (cols 12-37: L to AK)
    const formulaMediaGlobal = '=AVERAGE(L' + nextRow + ':AK' + nextRow + ')';

    // Data row: exactly 47 aligned columns
    const rowData = [
      // Metadata (Cols 1-11)
      data.timestamp || new Date().toISOString(),
      data.campaignId || 'itinerario-formativo',
      (data.language || 'en').toUpperCase(),
      evaluator.name || '',
      evaluator.email || '',
      evaluator.organization || '',
      evaluator.country || '',
      evaluator.professionalBackground || evaluator.role || '',
      evaluator.otherBackground || '',
      evaluator.yearsExperience || '',
      evaluator.aiExperience || '',

      // Section 2: Purpose & Relevance (Cols 12-16: P1-P5)
      toNumber(ratings.p1),
      toNumber(ratings.p2),
      toNumber(ratings.p3),
      toNumber(ratings.p4),
      toNumber(ratings.p5),

      // Section 3: Structure & Coherence (Cols 17-20: S1-S4)
      toNumber(ratings.s1),
      toNumber(ratings.s2),
      toNumber(ratings.s3),
      toNumber(ratings.s4),

      // Section 4: Learning Units (Cols 21-24: U1-U4)
      toNumber(ratings.u1),
      toNumber(ratings.u2),
      toNumber(ratings.u3),
      toNumber(ratings.u4),

      // Section 5: Competence Framework (Cols 25-28: C1-C4)
      toNumber(ratings.c1),
      toNumber(ratings.c2),
      toNumber(ratings.c3),
      toNumber(ratings.c4),

      // Section 6: Practical Use & Transferability (Cols 29-33: T1-T5)
      toNumber(ratings.t1),
      toNumber(ratings.t2),
      toNumber(ratings.t3),
      toNumber(ratings.t4),
      toNumber(ratings.t5),

      // Section 7: Ethical & Legal Principles (Cols 34-37: E1-E4)
      toNumber(ratings.e1),
      toNumber(ratings.e2),
      toNumber(ratings.e3),
      toNumber(ratings.e4),

      // Calculated Averages (Cols 38-44)
      formulaMediaP,
      formulaMediaS,
      formulaMediaU,
      formulaMediaC,
      formulaMediaT,
      formulaMediaE,
      formulaMediaGlobal,

      // Qualitative Feedback (Cols 45-47)
      feedback.q1_strengths || feedback.strengths || '',
      feedback.q2_improvements || feedback.improvements || '',
      feedback.q3_missing_topics || feedback.missing_topics || ''
    ];

    sheet.appendRow(rowData);

    // Formatting for new row
    const range = sheet.getRange(nextRow, 1, 1, 47);
    range.setFontFamily('Calibri').setFontSize(10).setVerticalAlignment('middle');

    // Alignments
    sheet.getRange(nextRow, 1, 1, 3).setHorizontalAlignment('center');   // Timestamp, Campaign, Language
    sheet.getRange(nextRow, 7, 1, 1).setHorizontalAlignment('center');   // Country
    sheet.getRange(nextRow, 10, 1, 2).setHorizontalAlignment('center');  // Experience, AI Experience
    sheet.getRange(nextRow, 12, 1, 33).setHorizontalAlignment('center'); // Likert P1 to Global Mean

    // Number format for calculated averages
    sheet.getRange(nextRow, 38, 1, 7).setNumberFormat('0.00').setBackground('#FEF3C7').setFontWeight('bold');

    // Text wrapping for open comments
    sheet.getRange(nextRow, 45, 1, 3).setWrap(true).setVerticalAlignment('top');

    lock.releaseLock();

    return createJsonResponse({
      status: 'success',
      row: nextRow,
      timestamp: data.timestamp
    }, 200);

  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString()
    }, 500);
  }
}

/**
 * GET endpoint: connectivity check
 */
function doGet(e) {
  return createJsonResponse({
    status: 'active',
    name: 'Learning Brains - Validation Webhook Service',
    sheetName: SHEET_NAME,
    time: new Date().toISOString()
  }, 200);
}

/**
 * Initialize English sheet headers and structure
 */
function initSheetStructure(sheet) {
  sheet.clear();

  // Row 1: Section Groups (English)
  const groups = [
    { start: 1, end: 11, title: '1. METADATA & EVALUATOR PROFILE', color: '#1E3A8A' },
    { start: 12, end: 16, title: '2. PURPOSE & RELEVANCE (P1-P5)', color: '#2563EB' },
    { start: 17, end: 20, title: '3. STRUCTURE & COHERENCE (S1-S4)', color: '#4F46E5' },
    { start: 21, end: 24, title: '4. LEARNING UNITS (U1-U4)', color: '#0284C7' },
    { start: 25, end: 28, title: '5. COMPETENCE FRAMEWORK (C1-C4)', color: '#0D9488' },
    { start: 29, end: 33, title: '6. PRACTICAL USE & TRANSFERABILITY (T1-T5)', color: '#059669' },
    { start: 34, end: 37, title: '7. ETHICAL & LEGAL PRINCIPLES (E1-E4)', color: '#7C3AED' },
    { start: 38, end: 44, title: 'CALCULATED SECTION AVERAGES (1-5)', color: '#D97706' },
    { start: 45, end: 47, title: '8. QUALITATIVE FEEDBACK (OPEN COMMENTS)', color: '#475569' }
  ];

  groups.forEach(g => {
    sheet.getRange(1, g.start, 1, g.end - g.start + 1)
      .merge()
      .setValue(g.title)
      .setBackground(g.color)
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setFontFamily('Calibri')
      .setFontSize(11)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');
  });

  // Row 2: Detailed Column Headers (English)
  const headers = [
    'Timestamp (UTC)', 'Campaign', 'Language', 'Full Name', 'Email', 'Organization',
    'Country', 'Professional Background', 'Other Background Details', 'Years Experience', 'AI Experience Level',
    'P1 (Clear aims)', 'P2 (Realistic outcomes)', 'P3 (On-the-job needs)', 'P4 (Target groups)', 'P5 (Relevance HR/trainers)',
    'S1 (Clear structure)', 'S2 (4 parts logical)', 'S3 (Coherent progression)', 'S4 (EU frameworks)',
    'U1 (AI core competences)', 'U2 (Core focus clarity)', 'U3 (Concept/practice balance)', 'U4 (Adaptability)',
    'C1 (KSA structure)', 'C2 (Units alignment)', 'C3 (Responsible AI attitudes)', 'C4 (Content development base)',
    'T1 (Training Programme guidance)', 'T2 (Trainer guidance)', 'T3 (Adaptation roadmap)', 'T4 (External clarity)', 'T5 (European transferability)',
    'E1 (Ethics/legal integration)', 'E2 (Target groups suitability)', 'E3 (Tool & training connection)', 'E4 (Fairness & inclusion)',
    'Mean Sec 2', 'Mean Sec 3', 'Mean Sec 4', 'Mean Sec 5', 'Mean Sec 6', 'Mean Sec 7', 'Overall Mean',
    'Q1 - Main Strengths', 'Q2 - Revisions / Improvements', 'Q3 - Missing Topics'
  ];

  const headerRange = sheet.getRange(2, 1, 1, headers.length);
  headerRange.setValues([headers])
    .setFontWeight('bold')
    .setFontFamily('Calibri')
    .setFontSize(10)
    .setFontColor('#FFFFFF')
    .setBackground('#1E293B')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.setRowHeight(1, 28);
  sheet.setRowHeight(2, 36);
  sheet.setFrozenRows(2);
}

function toNumber(val) {
  if (val === undefined || val === null || val === '') return '';
  const num = Number(val);
  return isNaN(num) ? val : num;
}

function createJsonResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
