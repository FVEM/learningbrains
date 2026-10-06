import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            campaignId,
            campaignTitle,
            language = 'en',
            evaluator = {},
            ratings = {},
            feedback = {},
            timestamp = new Date().toISOString()
        } = req.body;

        if (!campaignId) {
            return res.status(400).json({ error: 'Missing required campaignId' });
        }

        const payload = {
            campaignId,
            campaignTitle: campaignTitle || campaignId,
            language,
            evaluator,
            ratings,
            feedback,
            timestamp
        };

        let sheetResult = null;
        let webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbyqfyXKBvv_g6Eso97FibinK2W_BcailgefPpKoB4EwAt86xp0QfP53gbJmlaZEJfLP/exec';
        if (campaignId === 'npc-1') {
            webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL_NPC1 || 'https://script.google.com/macros/s/AKfycbxcFb4k1yLxyCf97jjI9JxncjFRlnP9_GuKeJd350lHWsKT7YD4cA5vBLsT4Zwm5jtaDw/exec';
        }

        if (webhookUrl) {
            try {
                const sheetResponse = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload),
                    redirect: 'follow'
                });
                const responseText = await sheetResponse.text();
                try {
                    sheetResult = JSON.parse(responseText);
                } catch {
                    sheetResult = { raw: responseText };
                }
            } catch (sheetError) {
                console.error('[validation-submit] Error posting to Google Sheet webhook:', sheetError);
            }
        } else {
            console.log('[validation-submit] Note: GOOGLE_SHEET_WEBHOOK_URL is not set. Payload logged:', JSON.stringify(payload, null, 2));
        }

        // Send email alert via Resend if configured
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'Learning Brains Validation <noreply@learningbrains.eu>',
                    to: ['joseba@fvem.es'],
                    subject: `[Learning Brains] Nueva Validación: ${campaignTitle || campaignId} - ${evaluator.name || 'Evaluador'} (${evaluator.country || 'EU'})`,
                    html: `
                        <h2>Nueva Aportación de Validación</h2>
                        <p><strong>Campaña:</strong> ${campaignTitle || campaignId}</p>
                        <p><strong>Fecha/Hora:</strong> ${timestamp}</p>
                        <hr/>
                        <h3>Perfil del Evaluador</h3>
                        <ul>
                            <li><strong>Nombre:</strong> ${evaluator.name || 'No especificado'}</li>
                            <li><strong>Email:</strong> ${evaluator.email || 'No especificado'}</li>
                            <li><strong>Entidad:</strong> ${evaluator.organization || 'No especificada'}</li>
                            <li><strong>País:</strong> ${evaluator.country || 'No especificado'}</li>
                            <li><strong>Rol / Tipología:</strong> ${evaluator.role || evaluator.professionalBackground || 'No especificado'} ${evaluator.otherBackground ? `(${evaluator.otherBackground})` : ''}</li>
                            ${evaluator.yearsExperience ? `<li><strong>Años de experiencia:</strong> ${evaluator.yearsExperience}</li>` : ''}
                            ${evaluator.aiExperience ? `<li><strong>Experiencia con IA:</strong> ${evaluator.aiExperience}</li>` : ''}
                            <li><strong>Idioma empleado:</strong> ${language.toUpperCase()}</li>
                        </ul>
                        <p style="color: #64748b; font-size: 13px; margin-top: 16px;">
                            <em>Las respuestas detalladas, puntuaciones y comentarios se registran automáticamente en la hoja compartida de Google Sheets.</em>
                        </p>
                    `
                });
            } catch (emailError) {
                console.error('[validation-submit] Resend notification failed:', emailError);
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Feedback received successfully',
            sheetRecorded: Boolean(sheetResult),
            timestamp
        });

    } catch (error) {
        console.error('[validation-submit] Server error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
