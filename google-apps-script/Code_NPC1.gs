/**
 * LEARNING BRAINS (ERASMUS+ PROJECT)
 * GOOGLE APPS SCRIPT - NPC 1 CONSULTATION VALIDATION WEBHOOK
 * 
 * Target Google Drive Shared Folder for Consortium (NPC 1):
 * https://drive.google.com/drive/folders/1UYThk8x6yN2LDLhKPlFjtcAIUjEk_w39
 * 
 * Automatically receives form submission JSON from Vercel web portal (/validation/npc-1)
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
      initNpc1SheetStructure(sheet);
    } else if (sheet.getLastRow() === 0) {
      initNpc1SheetStructure(sheet);
    }

    // Extract form fields
    const evaluator = data.evaluator || {};
    const ratings = data.ratings || {};
    const feedback = data.feedback || {};

    const nextRow = sheet.getLastRow() + 1;

    // Excel / Sheets formulas for current row averages (ignoring N/A)
    // Sec 2: P1-P6 (cols 11-16: K to P)
    const formulaMediaSec2 = '=AVERAGE(K' + nextRow + ':P' + nextRow + ')';
    // Sec 3: Q1-Q7 (cols 17-23: Q to W)
    const formulaMediaSec3 = '=AVERAGE(Q' + nextRow + ':W' + nextRow + ')';
    // Sec 4: T1-T6 (cols 24-29: X to AC)
    const formulaMediaSec4 = '=AVERAGE(X' + nextRow + ':AC' + nextRow + ')';
    // Sec 5: V1-V6 (cols 30-35: AD to AI)
    const formulaMediaSec5 = '=AVERAGE(AD' + nextRow + ':AI' + nextRow + ')';
    // Overall Mean: P1 to V6 (cols 11-35: K to AI)
    const formulaMediaGlobal = '=AVERAGE(K' + nextRow + ':AI' + nextRow + ')';

    // Data row: exactly 45 aligned columns
    const rowData = [
      // Metadata (Cols 1-10)
      data.timestamp || new Date().toISOString(),
      data.campaignId || 'npc-1',
      (data.language || 'en').toUpperCase(),
      evaluator.name || '',
      evaluator.email || '',
      evaluator.organization || '',
      evaluator.position || evaluator.role || '',
      evaluator.country || '',
      evaluator.professionalProfile || evaluator.professionalBackground || '',
      evaluator.otherProfileDetail || evaluator.otherBackground || '',

      // Section 2: R1 Purpose & Relevance (P1-P6, Cols 11-16)
      toNumber(ratings.p1),
      toNumber(ratings.p2),
      toNumber(ratings.p3),
      toNumber(ratings.p4),
      toNumber(ratings.p5),
      toNumber(ratings.p6),

      // Section 3: Quality & Coverage of Mapping (Q1-Q7, Cols 17-23)
      toNumber(ratings.q1),
      toNumber(ratings.q2),
      toNumber(ratings.q3),
      toNumber(ratings.q4),
      toNumber(ratings.q5),
      toNumber(ratings.q6),
      toNumber(ratings.q7),

      // Section 4: AI Tools, Trends & Case Studies (T1-T6, Cols 24-29)
      toNumber(ratings.t1),
      toNumber(ratings.t2),
      toNumber(ratings.t3),
      toNumber(ratings.t4),
      toNumber(ratings.t5),
      toNumber(ratings.t6),

      // Section 5: Practical Value & Transferability (V1-V6, Cols 30-35)
      toNumber(ratings.v1),
      toNumber(ratings.v2),
      toNumber(ratings.v3),
      toNumber(ratings.v4),
      toNumber(ratings.v5),
      toNumber(ratings.v6),

      // Calculated Averages (Cols 36-40)
      formulaMediaSec2,
      formulaMediaSec3,
      formulaMediaSec4,
      formulaMediaSec5,
      formulaMediaGlobal,

      // Section 6: Key Recommendations (Cols 41-45)
      feedback.rec_1 || feedback.rec1_most_relevant || '',
      feedback.rec_2 || feedback.rec2_missing_perspectives || '',
      feedback.rec_3 || feedback.rec3_clarifications || '',
      feedback.rec_4 || feedback.rec4_single_most_important || '',
      feedback.rec_5 || feedback.rec5_optional_other || ''
    ];

    sheet.appendRow(rowData);

    // Format new row
    const range = sheet.getRange(nextRow, 1, 1, 45);
    range.setFontFamily('Calibri');
    range.setFontSize(10);
    range.setVerticalAlignment('middle');

    // Alignments
    sheet.getRange(nextRow, 1, 1, 3).setHorizontalAlignment('center');   // Timestamp, Campaign, Language
    sheet.getRange(nextRow, 8, 1, 1).setHorizontalAlignment('center');   // Country
    sheet.getRange(nextRow, 11, 1, 30).setHorizontalAlignment('center'); // Likert + Averages

    // Number format for calculated averages
    sheet.getRange(nextRow, 36, 1, 5).setNumberFormat('0.00');
    sheet.getRange(nextRow, 36, 1, 5).setFontWeight('bold');
    sheet.getRange(nextRow, 36, 1, 5).setBackground('#FEF3C7'); // Light yellow

    lock.releaseLock();
    return createJsonResponse({ status: 'success', row: nextRow, campaignId: data.campaignId });

  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() }, 500);
  }
}

/**
 * Parses numeric Likert value, handles "N/A"
 */
function toNumber(val) {
  if (val === undefined || val === null || val === '') return '';
  if (val === 'N/A' || val === 'na') return 'N/A';
  const num = Number(val);
  return isNaN(num) ? val : num;
}

/**
 * Creates JSON HTTP response
 */
function createJsonResponse(obj, statusCode) {
  statusCode = statusCode || 200;
  const output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Initializes sheet headers if empty
 */
function initNpc1SheetStructure(sheet) {
  // Clear any existing contents
  sheet.clear();

  // Row 1: Merged Group Headers
  const groupDefs = [
    { start: 1, end: 10, title: '1. METADATA & EVALUATOR PROFILE', color: '#1E3A8A' },
    { start: 11, end: 16, title: '2. R1 PURPOSE & RELEVANCE (P1-P6)', color: '#2563EB' },
    { start: 17, end: 23, title: '3. QUALITY & COVERAGE OF MAPPING (Q1-Q7)', color: '#4F46E5' },
    { start: 24, end: 29, title: '4. AI TOOLS, TRENDS & CASE STUDIES (T1-T6)', color: '#0D9488' },
    { start: 30, end: 35, title: '5. PRACTICAL VALUE & TRANSFERABILITY (V1-V6)', color: '#059669' },
    { start: 36, end: 40, title: 'CALCULATED SECTION AVERAGES (1-5)', color: '#D97706' },
    { start: 41, end: 45, title: '6. KEY RECOMMENDATIONS (QUALITATIVE)', color: '#475569' }
  ];

  for (let i = 0; i < groupDefs.length; i++) {
    const g = groupDefs[i];
    const numCols = g.end - g.start + 1;
    sheet.getRange(1, g.start, 1, numCols).merge();
    const cell = sheet.getRange(1, g.start);
    cell.setValue(g.title);
    cell.setBackground(g.color);
    cell.setFontColor('#FFFFFF');
    cell.setFontWeight('bold');
    cell.setFontFamily('Calibri');
    cell.setFontSize(11);
    cell.setHorizontalAlignment('center');
    cell.setVerticalAlignment('middle');
  }
  sheet.setRowHeight(1, 32);

  // Row 2: Column Headers
  const colHeaders = [
    'Timestamp', 'Campaign', 'Language', 'Full_Name', 'Email', 'Organization', 'Position', 'Country', 'Professional_Profile', 'Other_Profile_Detail',
    'P1', 'P2', 'P3', 'P4', 'P5', 'P6',
    'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7',
    'T1', 'T2', 'T3', 'T4', 'T5', 'T6',
    'V1', 'V2', 'V3', 'V4', 'V5', 'V6',
    'Mean_Sec2', 'Mean_Sec3', 'Mean_Sec4', 'Mean_Sec5', 'Overall_Mean',
    'REC_1', 'REC_2', 'REC_3', 'REC_4', 'REC_5'
  ];

  sheet.appendRow(colHeaders);
  const hRange = sheet.getRange(2, 1, 1, colHeaders.length);
  hRange.setFontFamily('Calibri');
  hRange.setFontSize(10);
  hRange.setFontWeight('bold');
  hRange.setHorizontalAlignment('center');
  hRange.setVerticalAlignment('middle');
  sheet.setRowHeight(2, 28);
  sheet.setFrozenRows(2);
}
