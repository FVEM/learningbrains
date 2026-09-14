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
        const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

        if (webhookUrl) {
            try {
                const sheetResponse = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    redirect: 'follow'
                });
                sheetResult = await sheetResponse.json();
            } catch (sheetError) {
                console.error('[validation-submit] Error posting to Google Sheet webhook:', sheetError);
            }
        } else {
            console.log('[validation-submit] Note: GOOGLE_SHEET_WEBHOOK_URL is not set. Payload logged:', JSON.stringify(payload, null, 2));
        }

        // Send email alert via Resend if configured
        if (resend) {
            try {
                const ratingsSummary = Object.entries(ratings)
                    .map(([k, v]) => `<li><strong>${k}:</strong> ${v} / 5</li>`)
                    .join('');

                const feedbackSummary = Object.entries(feedback)
                    .filter(([, v]) => v && v.trim())
                    .map(([k, v]) => `<p><strong>${k}:</strong><br/>${v.replace(/\n/g, '<br/>')}</p>`)
                    .join('');

                await resend.emails.send({
                    from: 'Learning Brains Validation <noreply@learningbrains.eu>',
                    to: ['joseba@fvem.es'],
                    subject: `[Learning Brains] Nueva Validación Externa: ${campaignTitle || campaignId} (${evaluator.country || 'EU'})`,
                    html: `
                        <h2>Nueva Aportación de Validación Externa</h2>
                        <p><strong>Campaña:</strong> ${campaignTitle || campaignId} (${campaignId})</p>
                        <p><strong>Fecha/Hora:</strong> ${timestamp}</p>
                        <hr/>
                        <h3>Perfil del Evaluador</h3>
                        <ul>
                            <li><strong>Nombre:</strong> ${evaluator.name || 'No especificado'}</li>
                            <li><strong>Email:</strong> ${evaluator.email || 'No especificado'}</li>
                            <li><strong>Entidad:</strong> ${evaluator.organization || 'No especificada'}</li>
                            <li><strong>País:</strong> ${evaluator.country || 'No especificado'}</li>
                            <li><strong>Rol / Tipología:</strong> ${evaluator.role || 'No especificado'}</li>
                            <li><strong>Idioma empleado:</strong> ${language.toUpperCase()}</li>
                        </ul>
                        <hr/>
                        <h3>Puntuaciones Cuantitativas</h3>
                        <ul>
                            ${ratingsSummary || '<li>No se registraron puntuaciones</li>'}
                        </ul>
                        <hr/>
                        <h3>Comentarios Cualitativos</h3>
                        ${feedbackSummary || '<p>Sin observaciones abiertas</p>'}
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
