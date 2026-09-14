import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FileText, CheckCircle2, Clock, Globe, ShieldCheck,
    ChevronRight, AlertCircle, ArrowRight, Lock, Sparkles, Building2
} from 'lucide-react';
import {
    VALIDATION_CAMPAIGNS,
    SUPPORTED_LANGUAGES,
    VALIDATION_UI
} from '../config/validationCampaigns';

const logo = `${import.meta.env.BASE_URL}learning-brains-logo-transparent-cropped.png`;

export default function ValidationHub() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Determine initial language from query param or browser
    const initialLang = useMemo(() => {
        const queryLang = searchParams.get('lang')?.toLowerCase();
        if (queryLang && SUPPORTED_LANGUAGES.some(l => l.code === queryLang)) {
            return queryLang;
        }
        const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
        if (browserLang && SUPPORTED_LANGUAGES.some(l => l.code === browserLang)) {
            return browserLang;
        }
        return 'en';
    }, [searchParams]);

    const [currentLang, setCurrentLang] = useState(initialLang);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    const changeLanguage = (newLang) => {
        setCurrentLang(newLang);
        setSearchParams({ lang: newLang });
        setLangDropdownOpen(false);
    };

    // Helper for localized campaign strings
    const tr = (obj, fallback = '') => {
        if (!obj) return fallback;
        if (typeof obj === 'string') return obj;
        return obj[currentLang] || obj.en || obj.es || fallback;
    };

    // Helper for UI strings
    const ui = (key, fallback = '') => {
        const item = VALIDATION_UI[key];
        if (!item) return fallback;
        return item[currentLang] || item.en || item.es || fallback;
    };

    const campaignsList = Object.values(VALIDATION_CAMPAIGNS);
    const activeCampaigns = campaignsList.filter(c => c.status === 'active');
    const upcomingCampaigns = campaignsList.filter(c => c.status !== 'active');

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-body">
            {/* Private No-Index SEO */}
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
                <title>{ui('hub_title')} | Learning Brains</title>
            </Helmet>

            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 lg:px-8 py-3.5">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="Learning Brains" className="h-9 w-auto" />
                        <div className="hidden sm:block h-6 w-px bg-slate-200" />
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                Erasmus+ Quality Assurance & External Validation
                            </span>
                        </div>
                    </div>

                    {/* Language Selector Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-all shadow-2xs"
                        >
                            <Globe className="w-3.5 h-3.5 text-slate-500" />
                            <span>{SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.flag}</span>
                            <span className="uppercase">{currentLang}</span>
                        </button>

                        {langDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in">
                                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    Working Language
                                </div>
                                {SUPPORTED_LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                                            currentLang === lang.code ? 'font-bold text-brand-primary bg-slate-50' : 'text-slate-700'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{lang.flag}</span>
                                            <span>{lang.name}</span>
                                        </span>
                                        {currentLang === lang.code && <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero / Header Section */}
            <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        European Peer-Review Portal
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        {ui('hub_title')}
                    </h1>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        {ui('hub_subtitle')}
                    </p>

                    {/* Process Overview Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-8 text-left text-xs">
                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                            <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px]">1</span>
                                {currentLang === 'es' ? 'Selecciona Entregable' : 'Select Deliverable'}
                            </div>
                            <p className="text-slate-500">
                                {currentLang === 'es' ? 'Elige la acción activa en la que deseas participar.' : 'Choose the active action you want to evaluate.'}
                            </p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                            <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px]">2</span>
                                {currentLang === 'es' ? 'Revisa el PDF' : 'Review Document'}
                            </div>
                            <p className="text-slate-500">
                                {currentLang === 'es' ? 'Examina el documento en el visor o descárgalo.' : 'Examine the PDF inside the integrated viewer.'}
                            </p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                            <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px]">3</span>
                                {currentLang === 'es' ? 'Envía tu Feedback' : 'Submit Feedback'}
                            </div>
                            <p className="text-slate-500">
                                {currentLang === 'es' ? 'Completa el cuestionario rápido (aprox. 5-10 min).' : 'Complete the short structured form (5-10 min).'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Campaign Selection Grid */}
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* ──── CAMPAÑAS ACTIVAS ──── */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <h2 className="text-lg font-bold text-slate-800">
                                {currentLang === 'es' ? 'Acciones y Entregables Activos para Validación' : 'Active Actions Open for Evaluation'}
                            </h2>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {activeCampaigns.length} {currentLang === 'es' ? 'disponibles' : 'available'}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="bg-white rounded-2xl border-2 border-slate-200/90 hover:border-brand-primary/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                                            {tr(campaign.meta.tag)}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            {ui('hub_active_badge')}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors">
                                        {tr(campaign.meta.title)}
                                    </h3>

                                    <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3">
                                        {tr(campaign.meta.subtitle)}
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                                        <div className="flex items-center gap-1.5">
                                            <FileText className="w-3.5 h-3.5 text-brand-primary" />
                                            <span>PDF Preview Ready</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-teal-600" />
                                            <span>~5-10 min review</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50/80 border-t border-slate-100">
                                    <Link
                                        to={`/validation/${campaign.slug}?lang=${currentLang}`}
                                        className="w-full py-2.5 px-4 bg-brand-primary hover:bg-opacity-90 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs group-hover:scale-[1.01]"
                                    >
                                        <span>{ui('hub_start_btn')}</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ──── PRÓXIMAS ACCIONES / ROADMAP (DESACTIVADAS) ──── */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                {currentLang === 'es' ? 'Próximas Campañas Programadas (Roadmap del Proyecto)' : 'Upcoming Evaluation Campaigns (Project Roadmap)'}
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {upcomingCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="bg-slate-50/70 rounded-2xl border border-dashed border-slate-300 p-5 flex flex-col justify-between opacity-80"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                            {tr(campaign.meta.tag)}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                                            <Lock className="w-3 h-3 text-slate-400" />
                                            {ui('hub_upcoming_badge')}
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-bold text-slate-700 mb-1">
                                        {tr(campaign.meta.title)}
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                        {tr(campaign.meta.subtitle)}
                                    </p>
                                </div>

                                <button
                                    disabled
                                    className="w-full py-2 px-3 bg-slate-200/60 text-slate-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-not-allowed"
                                >
                                    <Lock className="w-3 h-3" />
                                    {ui('hub_disabled_btn')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Footer Notice */}
            <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-400">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p>Learning Brains (Erasmus+ Project) • Peer-Review & Quality Assurance</p>
                    <p className="text-[11px]">Confidential materials for designated evaluation committees.</p>
                </div>
            </footer>
        </div>
    );
}
