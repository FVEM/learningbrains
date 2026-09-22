import os
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def create_validation_workbook():
    wb = Workbook()
    
    # -------------------------------------------------------------
    # 1. SHEET 1: VALIDATION RESPONSES (Validation_Responses)
    # -------------------------------------------------------------
    ws_responses = wb.active
    ws_responses.title = "Validation_Responses"
    ws_responses.views.sheetView[0].showGridLines = True
    
    # Professional Palette
    c_navy = "1E3A8A"      # Group 1: Metadata
    c_blue = "2563EB"      # Section 2
    c_indigo = "4F46E5"    # Section 3
    c_sky = "0284C7"       # Section 4
    c_purple = "7C3AED"    # Section 5
    c_teal = "0D9488"      # Section 6
    c_emerald = "059669"   # Section 7
    c_amber = "D97706"     # Calculated Averages
    c_slate = "475569"     # Qualitative

    font_group = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    font_header = Font(name="Calibri", size=10, bold=True, color="FFFFFF")
    font_data = Font(name="Calibri", size=10)
    font_formula = Font(name="Calibri", size=10, bold=True)

    thin_border = Border(
        left=Side(style='thin', color='CBD5E1'),
        right=Side(style='thin', color='CBD5E1'),
        top=Side(style='thin', color='CBD5E1'),
        bottom=Side(style='thin', color='CBD5E1')
    )

    # Group Header Definitions (Row 1) - ALL IN ENGLISH
    group_defs = [
        (1, 11, "1. METADATA & EVALUATOR PROFILE", c_navy),
        (12, 15, "2. PURPOSE & RELEVANCE (P1-P4)", c_blue),
        (16, 19, "3. STRUCTURE & COHERENCE (S1-S4)", c_indigo),
        (20, 24, "4. LEARNING UNITS (U1-U5)", c_sky),
        (25, 28, "5. ETHICAL & LEGAL PRINCIPLES (E1-E4)", c_purple),
        (29, 32, "6. COMPETENCE FRAMEWORK (C1-C4)", c_teal),
        (33, 37, "7. PRACTICAL USE & TRANSFERABILITY (T1-T5)", c_emerald),
        (38, 44, "CALCULATED SECTION AVERAGES (1-5)", c_amber),
        (45, 47, "8. QUALITATIVE FEEDBACK (OPEN COMMENTS)", c_slate),
    ]

    for start_c, end_c, title, color in group_defs:
        fill = PatternFill(start_color=color, end_color=color, fill_type="solid")
        ws_responses.merge_cells(start_row=1, start_column=start_c, end_row=1, end_column=end_c)
        cell = ws_responses.cell(row=1, column=start_c, value=title)
        cell.font = font_group
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        for c in range(start_c, end_c + 1):
            ws_responses.cell(row=1, column=c).fill = fill
            ws_responses.cell(row=1, column=c).border = thin_border
    
    ws_responses.row_dimensions[1].height = 28

    # Detailed Column Headers (Row 2) - ALL IN ENGLISH
    # (col_idx, code, description, group_color, width, align)
    col_defs = [
        # Metadata
        (1, "Timestamp", "Submission Date (UTC)", c_navy, 20, "center"),
        (2, "Campaign", "Campaign ID", c_navy, 18, "center"),
        (3, "Language", "Form Language", c_navy, 12, "center"),
        (4, "Full_Name", "Evaluator Name", c_navy, 24, "left"),
        (5, "Email", "Evaluator Email", c_navy, 26, "left"),
        (6, "Organization", "Organization / Company", c_navy, 28, "left"),
        (7, "Country", "Country Code", c_navy, 12, "center"),
        (8, "Professional_Background", "Professional Profile", c_navy, 24, "left"),
        (9, "Other_Background_Detail", "Other Profile Details", c_navy, 22, "left"),
        (10, "Experience_Years", "Years of Experience", c_navy, 18, "center"),
        (11, "AI_Experience_Level", "AI Experience Level", c_navy, 18, "center"),

        # Section 2: Purpose & Relevance (1-5)
        (12, "P1", "P1: On-the-job training needs", c_blue, 13, "center"),
        (13, "P2", "P2: Clear overall aims", c_blue, 13, "center"),
        (14, "P3", "P3: Clear target groups", c_blue, 13, "center"),
        (15, "P4", "P4: Relevance to HR & trainers", c_blue, 13, "center"),

        # Section 3: Structure & Coherence (1-5)
        (16, "S1", "S1: Clear structure & navigation", c_indigo, 13, "center"),
        (17, "S2", "S2: 4-part division is logical", c_indigo, 13, "center"),
        (18, "S3", "S3: EU frameworks alignment", c_indigo, 13, "center"),
        (19, "S4", "S4: Coherent unit progression", c_indigo, 13, "center"),

        # Section 4: Learning Units (1-5)
        (20, "U1", "U1: AI core competences", c_sky, 13, "center"),
        (21, "U2", "U2: Clear unit core focus", c_sky, 13, "center"),
        (22, "U3", "U3: Realistic learning outcomes", c_sky, 13, "center"),
        (23, "U4", "U4: Concept/practice balance", c_sky, 13, "center"),
        (24, "U5", "U5: Target & company adaptability", c_sky, 13, "center"),

        # Section 5: Ethical & Legal Principles (1-5)
        (25, "E1", "E1: Ethical & legal integration", c_purple, 13, "center"),
        (26, "E2", "E2: Suitable for target groups", c_purple, 13, "center"),
        (27, "E3", "E3: Tool & training connection", c_purple, 13, "center"),
        (28, "E4", "E4: Fairness & inclusion", c_purple, 13, "center"),

        # Section 6: Competence Framework (1-5)
        (29, "C1", "C1: KSA structure appropriate", c_teal, 13, "center"),
        (30, "C2", "C2: Alignment with learning units", c_teal, 13, "center"),
        (31, "C3", "C3: Responsible AI attitudes", c_teal, 13, "center"),
        (32, "C4", "C4: Foundation for content creation", c_teal, 13, "center"),

        # Section 7: Practical Use & Transferability (1-5)
        (33, "T1", "T1: Training Programme guidance", c_emerald, 13, "center"),
        (34, "T2", "T2: Useful trainer guidance", c_emerald, 13, "center"),
        (35, "T3", "T3: Adaptation roadmap helpful", c_emerald, 13, "center"),
        (36, "T4", "T4: Clear for external trainers", c_emerald, 13, "center"),
        (37, "T5", "T5: Potential in European contexts", c_emerald, 13, "center"),

        # Calculated Averages (Formulas)
        (38, "Mean_Sec2", "Mean Sec 2: Purpose", c_amber, 15, "center"),
        (39, "Mean_Sec3", "Mean Sec 3: Structure", c_amber, 15, "center"),
        (40, "Mean_Sec4", "Mean Sec 4: Units", c_amber, 15, "center"),
        (41, "Mean_Sec5", "Mean Sec 5: Ethics", c_amber, 15, "center"),
        (42, "Mean_Sec6", "Mean Sec 6: Competences", c_amber, 15, "center"),
        (43, "Mean_Sec7", "Mean Sec 7: Transfer", c_amber, 15, "center"),
        (44, "Overall_Mean", "Overall Mean Score (1-5)", c_amber, 16, "center"),

        # Qualitative Feedback
        (45, "Q1_Strengths", "Q1: Main Strengths of Itinerary", c_slate, 42, "left"),
        (46, "Q2_Improvements", "Q2: Aspects to Revise / Improve", c_slate, 42, "left"),
        (47, "Q3_Missing_Topics", "Q3: Missing Topics / Competences", c_slate, 42, "left"),
    ]

    ws_responses.row_dimensions[2].height = 36

    for col_idx, code, label, color, width, align in col_defs:
        fill = PatternFill(start_color=color, end_color=color, fill_type="solid")
        cell = ws_responses.cell(row=2, column=col_idx, value=f"{code}\n({label})" if code != label else code)
        cell.font = font_header
        cell.fill = fill
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = thin_border
        col_letter = get_column_letter(col_idx)
        ws_responses.column_dimensions[col_letter].width = width

    # Freeze top 2 rows
    ws_responses.freeze_panes = "A3"

    # Insert a sample illustrative row to test formula syntax and styling
    sample_row = 3
    ws_responses.cell(row=sample_row, column=1, value="2026-09-22 14:30:00").alignment = Alignment(horizontal="center")
    ws_responses.cell(row=sample_row, column=2, value="itinerario-formativo").alignment = Alignment(horizontal="center")
    ws_responses.cell(row=sample_row, column=3, value="EN").alignment = Alignment(horizontal="center")
    ws_responses.cell(row=sample_row, column=4, value="Sample Evaluator")
    ws_responses.cell(row=sample_row, column=5, value="evaluator@example.eu")
    ws_responses.cell(row=sample_row, column=6, value="Industrial Training Center / SME")
    ws_responses.cell(row=sample_row, column=7, value="ES").alignment = Alignment(horizontal="center")
    ws_responses.cell(row=sample_row, column=8, value="vet_trainer")
    ws_responses.cell(row=sample_row, column=9, value="")
    ws_responses.cell(row=sample_row, column=10, value="11-20").alignment = Alignment(horizontal="center")
    ws_responses.cell(row=sample_row, column=11, value="moderate").alignment = Alignment(horizontal="center")

    # Sample Likert scores (Cols 12 to 37: 26 questions)
    sample_scores = [5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 4, 5, 5, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 5, 5]
    for i, score in enumerate(sample_scores):
        c = ws_responses.cell(row=sample_row, column=12 + i, value=score)
        c.alignment = Alignment(horizontal="center")

    # Formulas for row 3 (using standard English Excel formulas)
    ws_responses.cell(row=sample_row, column=38, value=f"=AVERAGE(L{sample_row}:O{sample_row})").number_format = '0.00'
    ws_responses.cell(row=sample_row, column=39, value=f"=AVERAGE(P{sample_row}:S{sample_row})").number_format = '0.00'
    ws_responses.cell(row=sample_row, column=40, value=f"=AVERAGE(T{sample_row}:X{sample_row})").number_format = '0.00'
    ws_responses.cell(row=sample_row, column=41, value=f"=AVERAGE(Y{sample_row}:AB{sample_row})").number_format = '0.00'
    ws_responses.cell(row=sample_row, column=42, value=f"=AVERAGE(AC{sample_row}:AF{sample_row})").number_format = '0.00'
    ws_responses.cell(row=sample_row, column=43, value=f"=AVERAGE(AG{sample_row}:AK{sample_row})").number_format = '0.00'
    ws_responses.cell(row=sample_row, column=44, value=f"=AVERAGE(L{sample_row}:AK{sample_row})").number_format = '0.00'

    for col_f in range(38, 45):
        cell_f = ws_responses.cell(row=sample_row, column=col_f)
        cell_f.alignment = Alignment(horizontal="center")
        cell_f.font = font_formula
        cell_f.fill = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid")

    # Sample Qualitative in English
    ws_responses.cell(row=sample_row, column=45, value="Excellent structure of the 6 learning units with immediate applicability to industrial SMEs.").alignment = Alignment(vertical="top", wrap_text=True)
    ws_responses.cell(row=sample_row, column=46, value="Include more real-world prompting templates for industrial inspection in Unit 3.").alignment = Alignment(vertical="top", wrap_text=True)
    ws_responses.cell(row=sample_row, column=47, value="None, the itinerary provides a very comprehensive foundation.").alignment = Alignment(vertical="top", wrap_text=True)

    for c in range(1, 48):
        cell = ws_responses.cell(row=sample_row, column=c)
        cell.border = thin_border
        if cell.font != font_formula:
            cell.font = font_data

    # Auto-filter over all columns
    ws_responses.auto_filter.ref = f"A2:AU{sample_row}"

    # -------------------------------------------------------------
    # 2. SHEET 2: QUESTION CODEBOOK (Codebook_Questions)
    # -------------------------------------------------------------
    ws_codebook = wb.create_sheet(title="Codebook_Questions")
    ws_codebook.views.sheetView[0].showGridLines = True

    # Title Banner
    ws_codebook.merge_cells("A1:E1")
    title_cell = ws_codebook["A1"]
    title_cell.value = "LEARNING BRAINS (ERASMUS+) - VALIDATION CODEBOOK & VARIABLE DICTIONARY"
    title_cell.font = Font(name="Calibri", size=13, bold=True, color="FFFFFF")
    title_cell.fill = PatternFill(start_color="1E3A8A", end_color="1E3A8A", fill_type="solid")
    title_cell.alignment = Alignment(horizontal="center", vertical="center")
    ws_codebook.row_dimensions[1].height = 32

    # Headers for Questions Table
    headers_cb = ["Item Code", "Section Name", "Official Question Text (English)", "Question Text (Spanish Reference)", "Scale / Response Type"]
    for c_idx, h_text in enumerate(headers_cb, 1):
        cell = ws_codebook.cell(row=3, column=c_idx, value=h_text)
        cell.font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
        cell.fill = PatternFill(start_color="2563EB", end_color="2563EB", fill_type="solid")
        cell.alignment = Alignment(horizontal="center" if c_idx in [1, 5] else "left", vertical="center")
        cell.border = thin_border
    ws_codebook.row_dimensions[3].height = 26

    questions_data = [
        # Section 2
        ("P1", "Section 2. Purpose and relevance", "The itinerary addresses relevant needs related to on-the-job training in industrial companies.", "El itinerario responde a necesidades relevantes relacionadas con el aprendizaje en el puesto de trabajo en empresas industriales.", "Likert Scale (1 - 5)"),
        ("P2", "Section 2. Purpose and relevance", "The overall aims of the itinerary are clear.", "Los objetivos generales del itinerario son claros.", "Likert Scale (1 - 5)"),
        ("P3", "Section 2. Purpose and relevance", "The intended target groups are clearly identified.", "Los grupos destinatarios previstos están claramente identificados.", "Likert Scale (1 - 5)"),
        ("P4", "Section 2. Purpose and relevance", "The itinerary is relevant to HR and training managers and identified target groups.", "El itinerario es relevante para los responsables de RRHH, formadores y los grupos destinatarios identificados.", "Likert Scale (1 - 5)"),

        # Section 3
        ("S1", "Section 3. Structure and coherence", "The document is clearly structured and easy to navigate.", "El documento está claramente estructurado y es fácil de navegar y consultar.", "Likert Scale (1 - 5)"),
        ("S2", "Section 3. Structure and coherence", "The division of the document into four parts is useful and logical.", "La división del documento en cuatro partes es útil y lógica.", "Likert Scale (1 - 5)"),
        ("S3", "Section 3. Structure and coherence", "The relationship between the framework, the learning units, the guidance for trainers and the European reference frameworks is clear.", "La relación entre el marco, las unidades de aprendizaje, la guía para formadores y los marcos de referencia europeos es clara.", "Likert Scale (1 - 5)"),
        ("S4", "Section 3. Structure and coherence", "The progression between the learning units is coherent.", "La progresión entre las unidades de aprendizaje es coherente.", "Likert Scale (1 - 5)"),

        # Section 4
        ("U1", "Section 4. Learning units", "The six learning units collectively cover the main competences needed to use AI in on-the-job training.", "Las seis unidades de aprendizaje cubren en conjunto las principales competencias necesarias para utilizar la IA en la formación en el puesto de trabajo.", "Likert Scale (1 - 5)"),
        ("U2", "Section 4. Learning units", "The descriptions of the core focus of each unit are clear.", "Las descripciones del enfoque central de cada unidad formativa son claras.", "Likert Scale (1 - 5)"),
        ("U3", "Section 4. Learning units", "The main learning outcomes are realistic and appropriate.", "Los principales resultados de aprendizaje previstos son realistas y adecuados.", "Likert Scale (1 - 5)"),
        ("U4", "Section 4. Learning units", "The balance between conceptual understanding and practical application is appropriate.", "El equilibrio entre la comprensión conceptual y la aplicación práctica es el adecuado.", "Likert Scale (1 - 5)"),
        ("U5", "Section 4. Learning units", "The learning units are sufficiently adaptable to different learner profiles and company contexts.", "Las unidades de aprendizaje son suficientemente adaptables a distintos perfiles de alumnado y contextos de empresa.", "Likert Scale (1 - 5)"),

        # Section 5
        ("E1", "Section 5. Ethical, legal and inclusive principles", "Ethical and legal aspects are sufficiently integrated into the itinerary.", "Los aspectos éticos y legales están suficientemente integrados en el itinerario.", "Likert Scale (1 - 5)"),
        ("E2", "Section 5. Ethical, legal and inclusive principles", "The treatment of ethical and legal issues is appropriate for the target groups.", "El tratamiento de las cuestiones éticas y legales es adecuado para los grupos destinatarios.", "Likert Scale (1 - 5)"),
        ("E3", "Section 5. Ethical, legal and inclusive principles", "The ethical dimension is connected meaningfully with tool selection, training design and implementation.", "La dimensión ética se conecta de forma significativa con la selección de herramientas, el diseño formativo y su ejecución.", "Likert Scale (1 - 5)"),
        ("E4", "Section 5. Ethical, legal and inclusive principles", "The itinerary gives appropriate attention to fairness, accessibility and inclusion.", "El itinerario presta la debida atención a la equidad, la accesibilidad y la inclusión.", "Likert Scale (1 - 5)"),

        # Section 6
        ("C1", "Section 6. Competence framework", "The Knowledge, Skills and Attitudes structure is appropriate for the itinerary.", "La estructura de Conocimientos, Habilidades y Actitudes (KSA) es adecuada para el itinerario.", "Likert Scale (1 - 5)"),
        ("C2", "Section 6. Competence framework", "The competence framework is aligned with the learning units.", "El marco de competencias está debidamente alineado con las unidades de aprendizaje.", "Likert Scale (1 - 5)"),
        ("C3", "Section 6. Competence framework", "The attitudes identified are appropriate for responsible and practical use of AI.", "Las actitudes identificadas son adecuadas para un uso responsable y práctico de la IA.", "Likert Scale (1 - 5)"),
        ("C4", "Section 6. Competence framework", "The competence framework can support the subsequent development of learning content and activities.", "El marco de competencias puede sustentar con éxito el posterior desarrollo de contenidos y actividades formativas.", "Likert Scale (1 - 5)"),

        # Section 7
        ("T1", "Section 7. Practical use and transferability", "The itinerary provides useful guidance for developing a complete Training Programme.", "El itinerario proporciona directrices útiles para el desarrollo de un Programa Formativo integral.", "Likert Scale (1 - 5)"),
        ("T2", "Section 7. Practical use and transferability", "The practical guidance for trainers is useful.", "Las orientaciones prácticas para formadores son de gran utilidad.", "Likert Scale (1 - 5)"),
        ("T3", "Section 7. Practical use and transferability", "The adaptation roadmap can help external trainers adapt the itinerary to different learner groups.", "La hoja de ruta de adaptación puede ayudar a formadores externos a adaptar el itinerario a diversos grupos de participantes.", "Likert Scale (1 - 5)"),
        ("T4", "Section 7. Practical use and transferability", "The itinerary is sufficiently clear to be used by trainers or organisations outside the consortium or beyond the project activities.", "El itinerario es suficientemente claro como para ser utilizado por formadores u organizaciones ajenas al consorcio o más allá de las actividades del proyecto.", "Likert Scale (1 - 5)"),
        ("T5", "Section 7. Practical use and transferability", "The document has potential to support the development of training actions in different European contexts.", "El documento tiene un alto potencial para respaldar el desarrollo de acciones formativas en diversos contextos europeos.", "Likert Scale (1 - 5)"),

        # Qualitative
        ("Q1_Strengths", "Section 8. Qualitative Feedback", "What do you consider to be the main strengths of the Learning Brains Training Itinerary?", "¿Cuáles consideras que son los principales puntos fuertes del Itinerario Formativo de Learning Brains?", "Open Text"),
        ("Q2_Improvements", "Section 8. Qualitative Feedback", "What aspects, if any, would you suggest revising or developing further?", "¿Qué aspectos, en su caso, sugerirías revisar o desarrollar más a fondo?", "Open Text"),
        ("Q3_Missing_Topics", "Section 8. Qualitative Feedback", "Do you think any relevant topic is missing from the Learning Brains Training Itinerary? If yes, please specify.", "¿Consideras que falta algún tema relevante en el Itinerario Formativo de Learning Brains? En caso afirmativo, indícalo por favor.", "Open Text"),
    ]

    for idx, (code, sec, en_t, es_t, scale) in enumerate(questions_data, 4):
        ws_codebook.cell(row=idx, column=1, value=code).alignment = Alignment(horizontal="center")
        ws_codebook.cell(row=idx, column=2, value=sec)
        ws_codebook.cell(row=idx, column=3, value=en_t)
        ws_codebook.cell(row=idx, column=4, value=es_t)
        ws_codebook.cell(row=idx, column=5, value=scale).alignment = Alignment(horizontal="center")
        for c in range(1, 6):
            cell = ws_codebook.cell(row=idx, column=c)
            cell.border = thin_border
            cell.font = font_data

    ws_codebook.column_dimensions["A"].width = 16
    ws_codebook.column_dimensions["B"].width = 34
    ws_codebook.column_dimensions["C"].width = 50
    ws_codebook.column_dimensions["D"].width = 50
    ws_codebook.column_dimensions["E"].width = 22

    # Scale definition table in Codebook
    row_scale_start = len(questions_data) + 6
    ws_codebook.cell(row=row_scale_start, column=1, value="Likert Scale Definition (1 - 5):").font = Font(name="Calibri", size=11, bold=True)
    scale_rows = [
        ("1", "Strongly Disagree / Totalmente en desacuerdo"),
        ("2", "Disagree / En desacuerdo"),
        ("3", "Neutral (Neither agree nor disagree) / Neutral"),
        ("4", "Agree / De acuerdo"),
        ("5", "Strongly Agree / Totalmente de acuerdo"),
    ]
    for i, (val, desc) in enumerate(scale_rows, row_scale_start + 1):
        c1 = ws_codebook.cell(row=i, column=1, value=val)
        c1.alignment = Alignment(horizontal="center")
        c1.font = font_data
        c1.border = thin_border
        c2 = ws_codebook.cell(row=i, column=2, value=desc)
        c2.font = font_data
        c2.border = thin_border

    # -------------------------------------------------------------
    # 3. SHEET 3: EXECUTIVE KPI DASHBOARD (KPI_Dashboard)
    # -------------------------------------------------------------
    ws_kpi = wb.create_sheet(title="KPI_Dashboard")
    ws_kpi.views.sheetView[0].showGridLines = True

    ws_kpi.merge_cells("A1:D1")
    kpi_title = ws_kpi["A1"]
    kpi_title.value = "LEARNING BRAINS (ERASMUS+) - EXECUTIVE VALIDATION DASHBOARD"
    kpi_title.font = Font(name="Calibri", size=13, bold=True, color="FFFFFF")
    kpi_title.fill = PatternFill(start_color="1E3A8A", end_color="1E3A8A", fill_type="solid")
    kpi_title.alignment = Alignment(horizontal="center", vertical="center")
    ws_kpi.row_dimensions[1].height = 30

    sec_headers = ["Evaluation Dimension / Area", "Key Metric", "Score Range", "Calculation Basis"]
    for c_idx, h in enumerate(sec_headers, 1):
        c = ws_kpi.cell(row=3, column=c_idx, value=h)
        c.font = font_header
        c.fill = PatternFill(start_color="2563EB", end_color="2563EB", fill_type="solid")
        c.alignment = Alignment(horizontal="center" if c_idx > 1 else "left")
        c.border = thin_border

    dim_rows = [
        ("Total Completed Validations Received", "=COUNTA(Validation_Responses!A3:A500)", "Total Count", "Respondent entries count"),
        ("Section 2: Purpose & Relevance Mean", "=AVERAGE(Validation_Responses!AL3:AL500)", "1.00 - 5.00", "Average of items P1 to P4"),
        ("Section 3: Structure & Coherence Mean", "=AVERAGE(Validation_Responses!AM3:AM500)", "1.00 - 5.00", "Average of items S1 to S4"),
        ("Section 4: Learning Units Mean", "=AVERAGE(Validation_Responses!AN3:AN500)", "1.00 - 5.00", "Average of items U1 to U5"),
        ("Section 5: Ethical & Legal Principles Mean", "=AVERAGE(Validation_Responses!AO3:AO500)", "1.00 - 5.00", "Average of items E1 to E4"),
        ("Section 6: Competence Framework Mean", "=AVERAGE(Validation_Responses!AP3:AP500)", "1.00 - 5.00", "Average of items C1 to C4"),
        ("Section 7: Practical Use & Transferability Mean", "=AVERAGE(Validation_Responses!AQ3:AQ500)", "1.00 - 5.00", "Average of items T1 to T5"),
        ("OVERALL ITINERARY MEAN SCORE", "=AVERAGE(Validation_Responses!AR3:AR500)", "1.00 - 5.00", "Overall Mean across all 26 Likert items"),
    ]

    for idx, (dim, formula, rng, desc) in enumerate(dim_rows, 4):
        ws_kpi.cell(row=idx, column=1, value=dim).font = font_data
        val_cell = ws_kpi.cell(row=idx, column=2, value=formula)
        val_cell.font = font_formula
        val_cell.alignment = Alignment(horizontal="center")
        val_cell.number_format = '0.00' if idx > 4 else '0'
        ws_kpi.cell(row=idx, column=3, value=rng).alignment = Alignment(horizontal="center")
        ws_kpi.cell(row=idx, column=4, value=desc).alignment = Alignment(horizontal="left")

        if idx == 11:  # Highlight overall mean
            for c in range(1, 5):
                ws_kpi.cell(row=idx, column=c).fill = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid")
                ws_kpi.cell(row=idx, column=c).font = Font(name="Calibri", size=10, bold=True, color="92400E")

        for c in range(1, 5):
            ws_kpi.cell(row=idx, column=c).border = thin_border

    ws_kpi.column_dimensions["A"].width = 46
    ws_kpi.column_dimensions["B"].width = 18
    ws_kpi.column_dimensions["C"].width = 18
    ws_kpi.column_dimensions["D"].width = 38

    # Save to file
    out_dir = os.path.join("public", "documents", "validation")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "Learning_Brains_Training_Itinerary_Validation_Responses.xlsx")
    wb.save(out_file)
    print(f"Generated English Workbook: {out_file}")

if __name__ == "__main__":
    create_validation_workbook()
