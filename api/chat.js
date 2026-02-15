
export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const apiKey = process.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'API Key missing on server' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { messages } = await req.json();

        // Forward request to OpenAI with streaming enabled
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
                stream: true, // Enable streaming
            }),
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            return new Response(JSON.stringify({ error: `OpenAI API Error: ${errorText}` }), {
                status: apiResponse.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Return the stream directly
        return new Response(apiResponse.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
