/**
 * GOOGLE APPS SCRIPT WEBHOOK FOR LEARNING BRAINS VALIDATION
 * 
 * TARGET GOOGLE DRIVE FOLDER:
 * https://drive.google.com/drive/folders/1Lpbav93Mpq0HG0F1JEAv1AfZhZjf2dp2 (Folder: "Validation")
 * 
 * Instructions for setup in Google Sheets:
 * 1. Open the target Google Drive folder above.
 * 2. Create a new Google Sheet inside that folder named "Learning Brains - Training Itinerary & External Validation".
 * 3. In the new Google Sheet, click on "Extensions" (Extensiones) > "Apps Script".
 * 4. Delete any code in the editor and paste this entire file.
 * 5. Click "Deploy" (Implementar) > "New deployment" (Nueva implementación).
 * 6. Choose "Web app" (Aplicación web) as the type:
 *    - Description: "Learning Brains Validation Webhook"
 *    - Execute as: "Me" (tu cuenta)
 *    - Who has access: "Anyone" (Cualquiera) -> Crucial so Vercel can post without OAuth prompt.
 * 7. Click "Deploy" and authorize permissions.
 * 8. Copy the "Web app URL" (e.g. https://script.google.com/macros/s/.../exec).
 * 9. Add this URL to your Vercel Environment Variables as GOOGLE_SHEET_WEBHOOK_URL.
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
      sheetName = "National Pilot Committee 1";
    } else if (data.campaignId === 'npc-2') {
      sheetName = "National Pilot Committee 2";
    } else if (data.campaignId === 'npc-3') {
      sheetName = "National Pilot Committee 3";
    } else if (data.campaignId === 'itinerario-formativo' || data.campaignId === 'training-pathway') {
      sheetName = "Itinerario Formativo";
    } else if (data.campaignId) {
      sheetName = data.campaignId.toUpperCase();
    }

    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    var evaluator = data.evaluator || {};
    var feedback = data.feedback || {};
    var ratings = data.ratings || {};

    // Dedicated sheet structure for Itinerario Formativo with individual columns for all 26 statements
    if (sheetName === "Itinerario Formativo") {
      if (sheet.getLastRow() === 0) {
        var itHeaders = [
          "Timestamp",
          "Country",
          "Language",
          "Evaluator Name",
          "Email",
          "Organization",
          "Professional Background",
          "Years Experience",
          "AI Experience",
          "Main Strengths (Q1)",
          "Suggested Revisions (Q2)",
          "Missing Topics (Q3)",
          "P1: Needs in companies",
          "P2: Overall aims clear",
          "P3: Target groups clear",
          "P4: Relevance to HR/targets",
          "S1: Structured & easy navigate",
          "S2: Four parts logical",
          "S3: Reference frameworks clear",
          "S4: Unit progression coherent",
          "U1: Six units cover competences",
          "U2: Core focus descriptions",
          "U3: Learning outcomes realistic",
          "U4: Concept vs practical balance",
          "U5: Adaptability to profiles",
          "E1: Ethical & legal integrated",
          "E2: Ethical issues appropriate",
          "E3: Ethical dimension connected",
          "E4: Fairness & inclusion",
          "C1: KSA structure appropriate",
          "C2: Aligned with units",
          "C3: Attitudes appropriate",
          "C4: Supports learning content",
          "T1: Guidance for programme",
          "T2: Guidance for trainers",
          "T3: Adaptation roadmap",
          "T4: Usable outside consortium",
          "T5: Potential in EU contexts",
          "Raw Ratings (JSON)",
          "Full Submission Payload"
        ];
        sheet.appendRow(itHeaders);
        var itHeaderRange = sheet.getRange(1, 1, 1, itHeaders.length);
        itHeaderRange.setBackground("#104239");
        itHeaderRange.setFontColor("#FFFFFF");
        itHeaderRange.setFontWeight("bold");
        sheet.setFrozenRows(1);
      }

      var itRow = [
        data.timestamp || new Date().toISOString(),
        evaluator.country || 'N/A',
        data.language || 'en',
        evaluator.name || 'Anonymous',
        evaluator.email || 'N/A',
        evaluator.organization || 'N/A',
        evaluator.professionalBackground === 'other' ? ('Other: ' + (evaluator.otherBackground || '')) : (evaluator.professionalBackground || evaluator.role || 'N/A'),
        evaluator.yearsExperience || 'N/A',
        evaluator.aiExperience || 'N/A',
        feedback.q1_strengths || feedback.strengths || '',
        feedback.q2_improvements || feedback.improvements || '',
        feedback.q3_missing_topics || feedback.missing_topics || '',
        ratings.p1 || '',
        ratings.p2 || '',
        ratings.p3 || '',
        ratings.p4 || '',
        ratings.s1 || '',
        ratings.s2 || '',
        ratings.s3 || '',
        ratings.s4 || '',
        ratings.u1 || '',
        ratings.u2 || '',
        ratings.u3 || '',
        ratings.u4 || '',
        ratings.u5 || '',
        ratings.e1 || '',
        ratings.e2 || '',
        ratings.e3 || '',
        ratings.e4 || '',
        ratings.c1 || '',
        ratings.c2 || '',
        ratings.c3 || '',
        ratings.c4 || '',
        ratings.t1 || '',
        ratings.t2 || '',
        ratings.t3 || '',
        ratings.t4 || '',
        ratings.t5 || '',
        JSON.stringify(ratings),
        JSON.stringify(data)
      ];
      sheet.appendRow(itRow);

    } else {
      // General campaigns (e.g. NPC-1)
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

      var row = [
        data.timestamp || new Date().toISOString(),
        data.campaignId || 'Unknown',
        evaluator.country || 'N/A',
        data.language || 'en',
        evaluator.name || 'Anonymous',
        evaluator.email || 'N/A',
        evaluator.organization || 'N/A',
        evaluator.role || evaluator.professionalBackground || 'N/A',
        JSON.stringify(ratings),
        feedback.strengths || feedback.q1_strengths || '',
        feedback.improvements || feedback.q2_improvements || '',
        feedback.regional_challenges || feedback.company_engagement || feedback.comments || '',
        JSON.stringify(data)
      ];
      sheet.appendRow(row);
    }

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
