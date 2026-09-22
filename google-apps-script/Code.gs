/**
 * LEARNING BRAINS (ERASMUS+ PROJECT)
 * GOOGLE APPS SCRIPT - WEBHOOK DE VALIDACIÓN DEL ITINERARIO FORMATIVO
 * 
 * Este script se aloja en la hoja de cálculo de Google Drive del consorcio:
 * Carpeta Drive: https://drive.google.com/drive/folders/1Lpbav93Mpq0HG0F1JEAv1AfZhZjf2dp2
 * 
 * Recibe automáticamente los datos enviados desde la plataforma web (api/validation-submit)
 * y los inserta en tiempo real en la pestaña "Respuestas_Itinerario".
 */

const SHEET_NAME = 'Respuestas_Itinerario';

/**
 * Endpoint POST: Recibe el payload JSON desde Vercel / Web
 */
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    // Espera hasta 10 segundos por el turno para evitar condiciones de carrera si entran varios a la vez
    lock.waitLock(10000);

    const contents = e.postData ? e.postData.contents : null;
    if (!contents) {
      return createJsonResponse({ status: 'error', message: 'No postData contents received' }, 400);
    }

    const data = JSON.parse(contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Si la hoja no existe o está vacía, inicializar la estructura y cabeceras
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      initSheetStructure(sheet);
    } else if (sheet.getLastRow() === 0) {
      initSheetStructure(sheet);
    }

    // Extraer campos del formulario
    const evaluator = data.evaluator || {};
    const ratings = data.ratings || {};
    const feedback = data.feedback || {};

    const nextRow = sheet.getLastRow() + 1;

    // Fórmulas para la fila actual
    const formulaMediaP = '=AVERAGE(L' + nextRow + ':O' + nextRow + ')';
    const formulaMediaS = '=AVERAGE(P' + nextRow + ':S' + nextRow + ')';
    const formulaMediaU = '=AVERAGE(T' + nextRow + ':X' + nextRow + ')';
    const formulaMediaE = '=AVERAGE(Y' + nextRow + ':AB' + nextRow + ')';
    const formulaMediaC = '=AVERAGE(AC' + nextRow + ':AF' + nextRow + ')';
    const formulaMediaT = '=AVERAGE(AG' + nextRow + ':AK' + nextRow + ')';
    const formulaMediaGlobal = '=AVERAGE(L' + nextRow + ':AK' + nextRow + ')';

    // Fila de datos (47 columnas exactamente alineadas)
    const rowData = [
      // Metadatos (Cols 1-11)
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

      // Sección 2: Objeto y pertinencia (Cols 12-15)
      toNumber(ratings.p1),
      toNumber(ratings.p2),
      toNumber(ratings.p3),
      toNumber(ratings.p4),

      // Sección 3: Estructura y coherencia (Cols 16-19)
      toNumber(ratings.s1),
      toNumber(ratings.s2),
      toNumber(ratings.s3),
      toNumber(ratings.s4),

      // Sección 4: Unidades de aprendizaje (Cols 20-24)
      toNumber(ratings.u1),
      toNumber(ratings.u2),
      toNumber(ratings.u3),
      toNumber(ratings.u4),
      toNumber(ratings.u5),

      // Sección 5: Principios éticos y legales (Cols 25-28)
      toNumber(ratings.e1),
      toNumber(ratings.e2),
      toNumber(ratings.e3),
      toNumber(ratings.e4),

      // Sección 6: Marco de competencias (Cols 29-32)
      toNumber(ratings.c1),
      toNumber(ratings.c2),
      toNumber(ratings.c3),
      toNumber(ratings.c4),

      // Sección 7: Uso práctico y transferencia (Cols 33-37)
      toNumber(ratings.t1),
      toNumber(ratings.t2),
      toNumber(ratings.t3),
      toNumber(ratings.t4),
      toNumber(ratings.t5),

      // Promedios calculados (Cols 38-44)
      formulaMediaP,
      formulaMediaS,
      formulaMediaU,
      formulaMediaE,
      formulaMediaC,
      formulaMediaT,
      formulaMediaGlobal,

      // Comentarios cualitativos abiertos (Cols 45-47)
      feedback.q1_strengths || '',
      feedback.q2_improvements || '',
      feedback.q3_missing_topics || ''
    ];

    sheet.appendRow(rowData);

    // Formato de la nueva fila
    const range = sheet.getRange(nextRow, 1, 1, 47);
    range.setFontFamily('Calibri').setFontSize(10).setVerticalAlignment('middle');

    // Alinear centros
    sheet.getRange(nextRow, 1, 1, 3).setHorizontalAlignment('center');   // Timestamp, Campaña, Idioma
    sheet.getRange(nextRow, 7, 1, 1).setHorizontalAlignment('center');   // País
    sheet.getRange(nextRow, 10, 1, 2).setHorizontalAlignment('center');  // Exp, AI Exp
    sheet.getRange(nextRow, 12, 1, 33).setHorizontalAlignment('center'); // P1 hasta Media Global

    // Formato numérico para los promedios
    sheet.getRange(nextRow, 38, 1, 7).setNumberFormat('0.00').setBackground('#FEF3C7').setFontWeight('bold');

    // Ajuste de texto para comentarios cualitativos
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
 * Endpoint GET: Para verificar conectividad desde el navegador
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
 * Inicializa las cabeceras y diseño si la hoja es nueva
 */
function initSheetStructure(sheet) {
  sheet.clear();

  // Fila 1: Grupos
  const groups = [
    { start: 1, end: 11, title: '1. METADATOS Y PERFIL DEL EVALUADOR', color: '#1E3A8A' },
    { start: 12, end: 15, title: '2. OBJETO Y PERTINENCIA (P1-P4)', color: '#2563EB' },
    { start: 16, end: 19, title: '3. ESTRUCTURA Y COHERENCIA (S1-S4)', color: '#4F46E5' },
    { start: 20, end: 24, title: '4. UNIDADES DE APRENDIZAJE (U1-U5)', color: '#0284C7' },
    { start: 25, end: 28, title: '5. PRINCIPIOS ÉTICOS Y LEGALES (E1-E4)', color: '#7C3AED' },
    { start: 29, end: 32, title: '6. MARCO DE COMPETENCIAS (C1-C4)', color: '#0D9488' },
    { start: 33, end: 37, title: '7. USO PRÁCTICO Y TRANSFERIBILIDAD (T1-T5)', color: '#059669' },
    { start: 38, end: 44, title: 'PROMEDIOS CALCULADOS (1-5)', color: '#D97706' },
    { start: 45, end: 47, title: '8. COMENTARIOS CUALITATIVOS', color: '#475569' }
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

  // Fila 2: Columnas detalladas
  const headers = [
    'Timestamp (UTC)', 'Campaña', 'Idioma', 'Nombre Evaluador', 'Email', 'Organización',
    'País', 'Perfil Profesional', 'Detalle Otro Perfil', 'Años Experiencia', 'Nivel IA',
    'P1 (Puesto)', 'P2 (Objetivos)', 'P3 (Destinatarios)', 'P4 (Relevancia)',
    'S1 (Navegación)', 'S2 (4 Partes)', 'S3 (Marcos UE)', 'S4 (Progresión)',
    'U1 (Competencias)', 'U2 (Enfoque)', 'U3 (Resultados)', 'U4 (Equilibrio)', 'U5 (Adaptable)',
    'E1 (Ética/Legal)', 'E2 (Destinatarios)', 'E3 (Herramientas)', 'E4 (Inclusión)',
    'C1 (KSA)', 'C2 (Alineación)', 'C3 (Actitudes)', 'C4 (Contenidos)',
    'T1 (Programa)', 'T2 (Guía)', 'T3 (Adaptación)', 'T4 (Claridad)', 'T5 (Potencial UE)',
    'Media Sec 2', 'Media Sec 3', 'Media Sec 4', 'Media Sec 5', 'Media Sec 6', 'Media Sec 7', 'Media Global',
    'Q1 - Puntos Fuertes', 'Q2 - Aspectos a Revisar', 'Q3 - Temas Ausentes'
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
