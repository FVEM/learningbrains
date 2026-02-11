import { useTranslation } from 'react-i18next';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold text-brand-primary mb-8">Contact Us</h1>
                <p className="text-slate-500 mb-12">Get in touch with the Learning Brains consortium.</p>
                <div className="max-w-md mx-auto p-8 bg-slate-50 rounded-3xl">
                   <p className="text-slate-600 font-bold mb-4">Email: contact@learningbrains.eu</p>
                   <p className="text-slate-500 text-sm">Form coming soon.</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
