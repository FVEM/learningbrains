import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { Mail, MessageSquare, Send, Globe, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS environment variables are missing.');
            setStatus('error');
            return;
        }

        emailjs.send(serviceId, templateId, formData, publicKey)
            .then((response) => {

                setStatus('success');
                setFormData({ user_name: '', user_email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            }, (err) => {
                console.error('FAILED...', err);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            });
    };

    return (
        <div className="py-20">
            <SEOHead
                title={t('contact.title')}
                description={t('contact.description')}
                path="/contact"
            />
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                            <Mail className="w-3 h-3" />
                            {t('contact.connect_us')}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-8 tracking-tight">{t('contact.title')}</h1>
                        <p className="text-slate-500 text-lg mb-12 leading-relaxed max-w-lg">
                            {t('contact.description')}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5">
                                <div className="p-3.5 bg-teal-50 text-brand-secondary rounded-2xl border border-teal-100">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-base mb-1">{t('contact.email_inquiry')}</h4>
                                    <p className="text-slate-500 text-sm">contact@learningbrains.eu</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-base mb-1">{t('contact.official_channels')}</h4>
                                    <p className="text-slate-500 text-sm">{t('contact.social_pending')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-100 border-l-4 border-l-brand-secondary italic">
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {t('contact.disclaimer')}
                            </p>
                        </div>
                    </div>

                    {/* Right Column (Form) */}
                    <div className="bg-white p-1 md:p-10 rounded-3xl border border-slate-100 shadow-2xl shadow-teal-900/5 relative overflow-hidden">
                        {status === 'success' && (
                            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('contact.form.status_success_title')}</h3>
                                <p className="text-slate-500">{t('contact.form.status_success_desc')}</p>
                            </div>
                        )}

                        <form className="space-y-8 p-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('contact.form.full_name')}</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary outline-none transition-all text-sm font-medium"
                                        placeholder={t('contact.form.placeholder_name')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('contact.form.email')}</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        value={formData.user_email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary outline-none transition-all text-sm font-medium"
                                        placeholder={t('contact.form.placeholder_email')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('contact.form.message')}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary outline-none transition-all text-sm font-medium resize-none"
                                    placeholder={t('contact.form.placeholder_message')}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-full py-5 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all group
                                    ${status === 'sending'
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-brand-primary text-white hover:bg-brand-secondary hover:shadow-xl hover:shadow-teal-900/10 hover:-translate-y-0.5'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t('contact.form.status_sending')}
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        {t('contact.form.send')}
                                    </>
                                )}
                            </button>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl text-sm justify-center">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{t('contact.form.status_error')}</span>
                                </div>
                            )}

                            <p className="text-[10px] text-center text-slate-400 font-medium pt-2 uppercase tracking-widest">
                                {t('contact.form.security')}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
