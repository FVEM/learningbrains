export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
        return response.status(500).json({ error: 'API Key missing on server' });
    }

    try {
        const { messages } = request.body;

        const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages,
                temperature: 0.7,
                max_tokens: 150,
            }),
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            throw new Error(errorData.error?.message || 'API Error');
        }

        const data = await apiResponse.json();
        return response.status(200).json(data);

    } catch (error) {
        console.error('OpenAI API Error:', error);
        return response.status(500).json({ error: 'Failed to fetch from OpenAI' });
    }
}
