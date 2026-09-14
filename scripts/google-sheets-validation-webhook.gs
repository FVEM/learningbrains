/**
 * GOOGLE APPS SCRIPT WEBHOOK FOR LEARNING BRAINS VALIDATION
 * 
 * Instructions for setup in Google Sheets:
 * 1. Open your target Google Sheet (or create a new one named "Learning Brains - External Validation & NPCs").
 * 2. Click on "Extensions" (Extensiones) > "Apps Script".
 * 3. Delete any code in the editor and paste this entire file.
 * 4. Click "Deploy" (Implementar) > "New deployment" (Nueva implementación).
 * 5. Choose "Web app" (Aplicación web) as the type.
 *    - Description: "Learning Brains Validation Webhook"
 *    - Execute as: "Me" (tu cuenta)
 *    - Who has access: "Anyone" (Cualquiera) -> Crucial so Vercel can post without OAuth prompt.
 * 6. Click "Deploy" and authorize permissions.
 * 7. Copy the "Web app URL" (e.g. https://script.google.com/macros/s/.../exec).
 * 8. Add this URL to your Vercel Environment Variables as GOOGLE_SHEET_WEBHOOK_URL.
 */

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'No payload provided' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Map campaign to sheet tab
    var sheetName = "Validations General";
    if (data.campaignId === 'npc-1') {
      sheetName = "NPC 1";
    } else if (data.campaignId === 'itinerario-formativo' || data.campaignId === 'training-pathway') {
      sheetName = "Itinerario Formativo";
    } else if (data.campaignId) {
      sheetName = data.campaignId.toUpperCase();
    }

    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Check if headers exist
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Campaign ID",
        "Country",
        "Language Used",
        "Evaluator Name",
        "Email",
        "Organization",
        "Stakeholder Role",
        "Quantitative Ratings (JSON)",
        "Key Strengths",
        "Improvement Areas",
        "Regional Context / Comments",
        "Full Submission Payload"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#104239");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var evaluator = data.evaluator || {};
    var feedback = data.feedback || {};
    var ratings = data.ratings || {};

    var row = [
      data.timestamp || new Date().toISOString(),
      data.campaignId || 'Unknown',
      evaluator.country || 'N/A',
      data.language || 'en',
      evaluator.name || 'Anonymous',
      evaluator.email || 'N/A',
      evaluator.organization || 'N/A',
      evaluator.role || 'N/A',
      JSON.stringify(ratings),
      feedback.strengths || '',
      feedback.improvements || '',
      feedback.regional_challenges || feedback.company_engagement || feedback.comments || '',
      JSON.stringify(data)
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Row appended successfully to ' + sheetName,
      sheet: sheetName
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    service: 'Learning Brains External Validation Webhook',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
