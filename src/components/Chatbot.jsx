import { useState, useRef, useEffect } from 'react';
import { X, Send, User, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! I'm the Learning Brains AI assistant. How can I help you today with the project or AI in the workplace?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const SYSTEM_PROMPT = `
You are the AI Assistant for "Learning Brains", an Erasmus+ project focused on Industrial Reskilling and AI in the workplace.
Your goal is to help users understand the project, its partners, and the potential of AI in vocational training.

**Project Context:**
- **Name:** Learning Brains (Erasmus+ KA220-VET).
- **Goal:** Develop innovative on-the-job learning methodologies for industrial reskilling using AI.
- **Duration:** 24 Months.
- **Key Concepts:** Industrial Reskilling, Vocational Education and Training (VET), AI-based learning pathways, On-the-job learning.

**Consortium Partners:**
1. **FVEM (Spain):** Coordinator. Industrial federation of metal companies in Biscay.
2. **Confindustria Veneto SIAV (Italy):** Training and innovation for regional companies.
3. **WKO Steiermark (Austria):** Represents Styrian business community.
4. **Media Creativa (Spain):** Experts in pedagogical methodologies.
5. **Slovak Business Agency (Slovakia):** Support for SMEs.
6. **Sparkling Intuition (Portugal):** HR development and training.

**Guidelines:**
- Be helpful, professional, and concise.
- Answer questions about the project goals, partners, and AI in industry.
- If asked about technical details you don't know, suggest contacting the partners via the Contact page.
- Maintain a tone that is encouraging and forward-looking regarding AI adoption.
- Keep responses under 3-4 sentences unless asked for more detail.
`;

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        // Use functional state update to ensure we have the latest messages
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const isDev = import.meta.env.DEV;
            let response;

            const conversationHistory = [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.map(m => ({ role: m.role, content: m.content })),
                userMessage
            ];

            if (isDev) {
                // Development Mode: Direct Call (Use Local .env)
                const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
                if (!apiKey) throw new Error("API Key missing");

                response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: conversationHistory,
                        temperature: 0.7,
                        max_tokens: 300,
                        stream: true // Enable direct streaming
                    })
                });
            } else {
                // Production Mode: Secure Proxy Call
                // The /api/chat endpoint is configured to return a stream
                response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: conversationHistory
                    })
                });
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || 'API Error');
            }

            // Stop loading spinner and start streaming
            setIsLoading(false);

            // Add initial empty assistant message
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            // Stream processing
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Decode chunk and add to buffer
                buffer += decoder.decode(value, { stream: true });

                // Process complete lines
                const lines = buffer.split('\n');
                // Keep the last line in buffer if it's incomplete
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;

                    if (trimmedLine.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(trimmedLine.slice(6));
                            const content = data.choices[0]?.delta?.content || '';

                            if (content) {
                                setMessages(prev => {
                                    const newMsgs = [...prev];
                                    const lastMsg = newMsgs[newMsgs.length - 1];
                                    // Update the last message content
                                    return [
                                        ...newMsgs.slice(0, -1),
                                        { ...lastMsg, content: lastMsg.content + content }
                                    ];
                                });
                            }
                        } catch (e) {
                            console.error("Error parsing stream chunk", e);
                        }
                    }
                }
            }

        } catch (error) {
            console.error("Error calling AI agent:", error);
            setIsLoading(false);

            let errorMessage = "Sorry, I encountered an error connecting to the AI.";
            if (error.message === "API Key missing") {
                errorMessage = "⚠️ OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.";
            }

            // If we already added an empty assistant message, update it. Otherwise add new one.
            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg.role === 'assistant' && lastMsg.content === '') {
                    return [...prev.slice(0, -1), { role: 'assistant', content: errorMessage }];
                }
                return [...prev, { role: 'assistant', content: errorMessage }];
            });
        }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 bg-white rounded-2xl shadow-2xl w-[calc(100vw-2rem)] sm:w-96 border border-slate-200 pointer-events-auto flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 origin-bottom-right max-h-[80vh]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                            <img src={`${import.meta.env.BASE_URL}learning-brains-favicon-transparent.png`} alt="AI" className="w-8 h-8 bg-white rounded-full p-1 object-contain" />
                            <h3 className="font-semibold text-lg">AI Assistant</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 h-80 overflow-y-auto bg-slate-50 space-y-4 scrollbar-thin scrollbar-thumb-slate-300">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'}`}>
                                    {msg.role === 'user' ? <User size={16} /> : <img src={`${import.meta.env.BASE_URL}learning-brains-favicon-transparent.png`} alt="AI" className="w-full h-full object-cover p-1" />}
                                </div>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                                    <img src={`${import.meta.env.BASE_URL}learning-brains-favicon-transparent.png`} alt="AI" className="w-full h-full object-cover p-1" />
                                </div>
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                                    <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-slate-100">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about Learning Brains..."
                                className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5 pl-0.5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-white text-emerald-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center pointer-events-auto overflow-hidden border-2 border-emerald-500"
            >
                {isOpen ? (
                    <X className="w-8 h-8" />
                ) : (
                    <img
                        src={`${import.meta.env.BASE_URL}learning-brains-favicon-transparent.png`}
                        alt="Chatbot"
                        className="w-full h-full object-cover p-2"
                    />
                )}
            </button>
        </div>
    );
};

export default Chatbot;
