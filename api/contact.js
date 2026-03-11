import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
// This variable needs to be added to the Vercel project settings
const resend = new Resend(process.env.RESEND_API_KEY);

// Dictionary mapping the frontend selection to the specific partner's hidden email address.
// The user will replace these with the actual emails.
const emailDictionary = {
    general: ['joseba@fvem.es'],
    es: ['joseba@fvem.es', 'proyectos@mediacreativa.eu', 'europa@mediacreativa.eu'],
    it: ['area.progetti@siav.net', 'mariateresa.chinellato@siav.net'],
    at: ['jasmina.salkic@wkstmk.at', 'Verena.Maier@wkstmk.at'],
    sk: ['gavalcova@sbagency.sk', 'Paluskova@sbagency.sk', 'balko@sbagency.sk'],
    pt: ['projects@sparkling-intuition.eu']
};

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { user_name, user_email, destination, message } = req.body;

        // Validate inputs
        if (!user_name || !user_email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Determine the target email based on the dropdown selection
        // Fallback to 'general' if the destination is missing or invalid
        const targetEmail = emailDictionary[destination] || emailDictionary.general;

        // Send the email using Resend
        // Important: 'from' must be a verified domain in Resend (e.g., noreply@learningbrains.eu)
        const data = await resend.emails.send({
            from: 'Learning Brains Contact <noreply@learningbrains.eu>',
            to: targetEmail,
            replyTo: user_email,
            subject: `New Contact Request for: ${destination.toUpperCase()}`,
            html: `
        <h2>New Message from Learning Brains Website</h2>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Selected Organization:</strong> ${destination}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
        });

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
