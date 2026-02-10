import { useTranslation } from 'react-i18next';
import { Mail, MessageSquare, Send, Globe, Phone } from 'lucide-react';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Column */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                            <Mail className="w-3 h-3" />
                            Connect with us
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-8 tracking-tight">Get in Touch</h1>
                        <p className="text-slate-500 text-lg mb-12 leading-relaxed max-w-lg">
                            Do you have any questions about the Learning Brains project? Get in touch with the consortium through this form or follow us on our social channels.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5">
                                <div className="p-3.5 bg-teal-50 text-brand-secondary rounded-2xl border border-teal-100">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-base mb-1">Email Inquiry</h4>
                                    <p className="text-slate-500 text-sm">contact@learningbrains.eu</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-base mb-1">Official Channels</h4>
                                    <p className="text-slate-500 text-sm">Linked & Twitter activated mid-project</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-100 border-l-4 border-l-brand-secondary italic">
                            <p className="text-xs text-slate-500 leading-relaxed">
                                This project follow strict Erasmus+ visibility mandates. All information received is treated confidentially and used solely for dissemination purposes.
                            </p>
                        </div>
                    </div>

                    {/* Right Column (Form) */}
                    <div className="bg-white p-1 md:p-10 rounded-3xl border border-slate-100 shadow-2xl shadow-teal-900/5">
                        <form className="space-y-8 p-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary outline-none transition-all text-sm font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary outline-none transition-all text-sm font-medium"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                                <textarea
                                    rows="5"
                                    className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary outline-none transition-all text-sm font-medium resize-none"
                                    placeholder="Tell us about your interest in the project..."
                                ></textarea>
                            </div>

                            <button className="w-full py-5 bg-brand-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-secondary transition-all hover:shadow-xl hover:shadow-teal-900/10 hover:-translate-y-0.5 group">
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Send Message
                            </button>

                            <p className="text-[10px] text-center text-slate-400 font-medium pt-2 uppercase tracking-widest">
                                Integration ready • Secure communication
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
