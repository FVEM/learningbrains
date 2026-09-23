import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
    FileText, CheckCircle2, Clock, Globe, ShieldCheck,
    ChevronRight, AlertCircle, ArrowRight, Lock, Sparkles, Building2, ChevronDown
} from 'lucide-react';
import Footer from '../components/Footer';
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

    const { i18n } = useTranslation();

    useEffect(() => {
        if (i18n && i18n.language !== currentLang) {
            i18n.changeLanguage(currentLang);
        }
    }, [currentLang, i18n]);

    const changeLanguage = (newLang) => {
        setCurrentLang(newLang);
        setSearchParams({ lang: newLang });
        setLangDropdownOpen(false);
        if (i18n) i18n.changeLanguage(newLang);
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
        <div className="flex flex-col min-h-screen font-body">
            {/* Private No-Index SEO */}
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
                <title>{ui('hub_title')} | Learning Brains</title>
            </Helmet>

            {/* Top Navigation Bar - Matches Main Website Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40 py-4 px-4 sm:px-6 lg:px-8">
                <div className="container-custom flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to={`/${currentLang || 'en'}`}
                            className="flex items-center transition-transform hover:scale-[1.02] group"
                            title={currentLang === 'es' ? 'Ir a la web general del proyecto Learning Brains' : 'Go to Learning Brains main website'}
                        >
                            <img src={logo} alt="Learning Brains" className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform" />
                        </Link>
                        <div className="hidden md:block h-6 w-px bg-slate-200" />
                        <div className="hidden md:flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                Erasmus+ Quality Assurance & Peer-Review
                            </span>
                        </div>
                    </div>

                    {/* Language Selector Dropdown (Exact match to website Header) */}
                    <div className="relative">
                        <button
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-brand-secondary transition-all border border-slate-100 shadow-2xs"
                        >
                            <Globe className="w-4 h-4 text-brand-secondary" />
                            <span className="text-xs font-bold uppercase text-brand-secondary">{currentLang}</span>
                            <ChevronDown className={`w-3 h-3 text-brand-secondary transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {langDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                {SUPPORTED_LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full text-left px-4 py-2 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors ${
                                            currentLang === lang.code ? 'text-brand-primary bg-teal-50 font-bold' : 'text-slate-600'
                                        }`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Page Header / Hero - Matches About.jsx / Partners.jsx style */}
            <div className="pt-14 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="w-3 h-3" />
                        Learning Brains Peer-Review Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-6 tracking-tight">
                        {ui('hub_title')}
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        {ui('hub_subtitle')}
                    </p>

                    {/* Process Steps Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-10 text-left">
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="w-6 h-6 rounded-full bg-brand-secondary text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                <h3 className="font-bold text-brand-primary text-sm">{ui('hub_step1_title')}</h3>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed">{ui('hub_step1_desc')}</p>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="w-6 h-6 rounded-full bg-brand-secondary text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                <h3 className="font-bold text-brand-primary text-sm">{ui('hub_step2_title')}</h3>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed">{ui('hub_step2_desc')}</p>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="w-6 h-6 rounded-full bg-brand-secondary text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                <h3 className="font-bold text-brand-primary text-sm">{ui('hub_step3_title')}</h3>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed">{ui('hub_step3_desc')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campaign Selection Grid */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">

                {/* ──── CAMPAÑAS ACTIVAS ──── */}
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-8">
                        <CheckCircle2 className="w-6 h-6 text-brand-secondary" />
                        <h2 className="text-2xl font-bold text-brand-primary">
                            {ui('hub_active_section_title')}
                        </h2>
                        <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            {activeCampaigns.length} {ui('hub_available_count')}
                        </span>
                    </div>

                    <div className={activeCampaigns.length === 1 ? "max-w-2xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 gap-8"}>
                        {activeCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 shadow-sm"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-brand-secondary">
                                            {tr(campaign.meta.tag)}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            {ui('hub_active_badge')}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors">
                                        {tr(campaign.meta.title)}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        {tr(campaign.meta.subtitle)}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 text-xs text-slate-600 mb-6">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-brand-secondary" />
                                            <span className="font-medium">PDF Preview Ready</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-brand-secondary" />
                                            <span className="font-medium">~5-10 min review</span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/validation/${campaign.slug}?lang=${currentLang}`}
                                    className="btn-primary w-full text-center flex items-center justify-center gap-2 text-sm font-bold"
                                >
                                    <span>{ui('hub_start_btn')}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ──── PRÓXIMAS CAMPAÑAS (ROADMAP) ──── */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Clock className="w-6 h-6 text-brand-secondary" />
                        <h2 className="text-2xl font-bold text-brand-primary">
                            {ui('hub_upcoming_section_title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="bg-white/70 border border-dashed border-slate-300/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xs"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            {tr(campaign.meta.tag)}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                                            <Lock className="w-3 h-3 text-slate-400" />
                                            {ui('hub_upcoming_badge')}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-slate-700 mb-2">
                                        {tr(campaign.meta.title)}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-5">
                                        {tr(campaign.meta.subtitle)}
                                    </p>
                                </div>

                                <button
                                    disabled
                                    className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-not-allowed border border-slate-200"
                                >
                                    <Lock className="w-3.5 h-3.5" />
                                    {ui('hub_disabled_btn')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Official Website Footer */}
            <Footer />
        </div>
    );
}
