# Integración de Google Sheets - Validación Learning Brains

Esta carpeta contiene el código y las instrucciones para vincular el formulario web del portal de validación de **Learning Brains** (`/validation/itinerario-formativo`) con una hoja de cálculo compartida en Google Drive.

- **Carpeta de Google Drive del Consorcio:**  
  [https://drive.google.com/drive/folders/1Lpbav93Mpq0HG0F1JEAv1AfZhZjf2dp2](https://drive.google.com/drive/folders/1Lpbav93Mpq0HG0F1JEAv1AfZhZjf2dp2)

---

## Opción 1: Subir directamente la plantilla Excel (.xlsx) ya generada (Recomendado)

En la carpeta del proyecto ya se ha creado el archivo:
`public/documents/validation/Learning_Brains_Training_Itinerary_Validation_Responses.xlsx`

1. Entra en el Google Drive del proyecto:  
   `https://drive.google.com/drive/folders/1Lpbav93Mpq0HG0F1JEAv1AfZhZjf2dp2`
2. Arrastra y suelta dicho archivo `.xlsx`.
3. Haz doble clic sobre él y ábrelo con **Google Sheets**.
4. ¡Listo! Ya tienes la estructura con:
   - **Pestaña 1 (`Validation_Responses`):** 47 columnas preparadas, coloreadas por sección, cabeceras congeladas y fórmulas de promedio automáticas.
   - **Pestaña 2 (`Codebook_Questions`):** Diccionario con el texto de las 26 preguntas Likert y 3 cualitativas en inglés y español.
   - **Pestaña 3 (`KPI_Dashboard`):** Cuadro de mando resumen con fórmulas de promedios para informes Erasmus+.

---

## Opción 2: Conectar la recepción automática en tiempo real (Webhook)

Para que cada vez que un evaluador envíe el formulario en la web se añada una nueva fila automáticamente:

### Paso 1: Abrir el editor de Apps Script en tu Google Sheet
1. En la hoja de Google Sheets creada en Drive, ve al menú superior: **Extensiones** > **Apps Script**.
2. Borra el código que aparezca y pega todo el contenido de [`Code.gs`](Code.gs).
3. Haz clic en el icono de **Guardar** (disquete).

### Paso 2: Implementar como Aplicación Web
1. En la esquina superior derecha, haz clic en **Implementar** (Deploy) > **Nueva implementación**.
2. En el engranaje "Seleccionar tipo", elige **Aplicación web**.
3. Configura:
   - **Descripción:** `Learning Brains Validation Webhook`
   - **Ejecutar como:** `Yo (tu cuenta de Google)`
   - **Quién tiene acceso:** `Cualquier usuario` (Anyone) *(Importante para que el servidor web de Vercel pueda enviar los datos sin pedir login de Google)*.
4. Haz clic en **Implementar**.
5. Concede los permisos que solicite Google (Revisar permisos > Seleccionar tu cuenta > Avanzado > Ir a Learning Brains Script).
6. Copia la **URL de la aplicación web** generada (acabada en `/exec`).

### Paso 3: Configurar la variable en Vercel
1. Ve al panel de control de tu proyecto en [Vercel](https://vercel.com) > **Settings** > **Environment Variables**.
2. Añade o actualiza la variable:
   - **Name:** `GOOGLE_SHEET_WEBHOOK_URL`
   - **Value:** *(La URL copiada en el paso anterior)*
3. Guarda y redespliega (o haz un nuevo commit/push).

A partir de ese momento, cada respuesta recibida en la web se insertará automáticamente en la hoja con todas sus puntuaciones, promedios y comentarios calculados al segundo.
