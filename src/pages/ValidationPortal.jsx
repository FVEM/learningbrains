import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FileText, Download, ExternalLink, CheckCircle, ChevronRight,
    ChevronLeft, Globe, Building2, User, Mail, Send,
    Loader2, ShieldCheck, Check, AlertCircle, RefreshCw, ArrowLeft, ChevronDown
} from 'lucide-react';
import {
    VALIDATION_CAMPAIGNS,
    SUPPORTED_LANGUAGES,
    CONSORTIUM_COUNTRIES,
    STAKEHOLDER_TYPES,
    ITINERARY_PROFESSIONAL_BACKGROUNDS,
    EXPERIENCE_YEARS,
    AI_EXPERIENCE_LEVELS,
    VALIDATION_UI,
    getCampaignDocumentUrl
} from '../config/validationCampaigns';

const logo = `${import.meta.env.BASE_URL}learning-brains-logo-transparent-cropped.png`;

export default function ValidationPortal() {
    const { campaignId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Determine active language (from URL query, browser, or default to 'en')
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
    const [mobileTab, setMobileTab] = useState('document'); // 'document' | 'form'
    const [currentStep, setCurrentStep] = useState(1);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    // Campaign definition
    const campaign = VALIDATION_CAMPAIGNS[campaignId];
    const documentUrl = getCampaignDocumentUrl(campaign, currentLang);

    // Form state
    const [evaluator, setEvaluator] = useState({
        name: '',
        email: '',
        organization: '',
        country: '',
        role: '',
        professionalBackground: '',
        otherBackground: '',
        yearsExperience: '',
        aiExperience: ''
    });

    const [ratings, setRatings] = useState({});
    const [feedback, setFeedback] = useState({});
    const [consent, setConsent] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [draftSaved, setDraftSaved] = useState(false);

    // Update URL query param when language changes
    const changeLanguage = (newLang) => {
        setCurrentLang(newLang);
        setSearchParams({ lang: newLang });
        setLangDropdownOpen(false);
    };

    // Auto-load draft from localStorage
    const storageKey = `lb_eval_draft_${campaignId}`;
    useEffect(() => {
        if (!campaign) return;
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.evaluator) setEvaluator(parsed.evaluator);
                if (parsed.ratings) setRatings(parsed.ratings);
                if (parsed.feedback) setFeedback(parsed.feedback);
                if (parsed.consent) setConsent(parsed.consent);
            }
        } catch (e) {
            console.error('Failed to load validation draft from storage', e);
        }
    }, [campaignId, storageKey, campaign]);

    // Auto-save draft on state change
    useEffect(() => {
        if (!campaign || isSubmitted) return;
        try {
            const draft = { evaluator, ratings, feedback, consent, lastUpdated: new Date().toISOString() };
            localStorage.setItem(storageKey, JSON.stringify(draft));
            setDraftSaved(true);
            const timer = setTimeout(() => setDraftSaved(false), 2000);
            return () => clearTimeout(timer);
        } catch (e) {
            console.error('Failed to save validation draft', e);
        }
    }, [evaluator, ratings, feedback, consent, campaign, isSubmitted, storageKey]);

    // Helper for localized strings
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

    const isItineraryCampaign = campaign?.profileType === 'itinerary' || campaignId === 'itinerario-formativo';

    // Validation step check
    const isStep1Valid = Boolean(
        evaluator.name.trim() &&
        evaluator.email.trim() &&
        evaluator.organization.trim() &&
        evaluator.country &&
        (isItineraryCampaign
            ? (evaluator.professionalBackground &&
               (evaluator.professionalBackground !== 'other' || evaluator.otherBackground?.trim()) &&
               evaluator.yearsExperience &&
               evaluator.aiExperience)
            : evaluator.role)
    );
    const isStep2Valid = campaign?.likertQuestions?.every(q => ratings[q.id] !== undefined && ratings[q.id] !== '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!consent) return;

        setIsSubmitting(true);
        setSubmitError(null);

        const payload = {
            campaignId,
            campaignTitle: tr(campaign.meta.title),
            language: currentLang,
            evaluator,
            ratings,
            feedback,
            timestamp: new Date().toISOString()
        };

        try {
            const res = await fetch('/api/validation-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error(`Submission failed with status: ${res.status}`);
            }

            // Clear draft
            localStorage.removeItem(storageKey);
            setIsSubmitted(true);
        } catch (err) {
            console.error('Submission error:', err);
            setSubmitError(
                currentLang === 'es'
                    ? 'No se pudo enviar la respuesta en este momento. Por favor, inténtalo de nuevo.'
                    : 'Could not submit your feedback at this time. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!campaign) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                    <title>Campaign Not Found | Learning Brains</title>
                </Helmet>
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
                    <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Campaign Not Found</h1>
                    <p className="text-slate-600 mb-6">{ui('campaign_not_found')}</p>
                    <div className="space-y-2">
                        <Link
                            to="/validation/npc-1"
                            className="block w-full py-2.5 px-4 bg-brand-primary text-white rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm"
                        >
                            Go to National Pilot Committee 1 Validation
                        </Link>
                        <Link
                            to="/validation/itinerario-formativo"
                            className="block w-full py-2.5 px-4 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all text-sm"
                        >
                            Go to Training Pathway Validation
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col font-body">
            {/* Private No-Index SEO Helmet */}
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
                <title>{tr(campaign.meta.title)} | Learning Brains Validation</title>
            </Helmet>

            {/* Top Navigation Bar - Matches Main Website Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40 px-4 lg:px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to={`/validation?lang=${currentLang}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-all border border-slate-200 shadow-2xs"
                            title={ui('back_to_hub')}
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{ui('back_to_hub')}</span>
                        </Link>
                        <div className="hidden sm:block h-6 w-px bg-slate-200" />
                        <Link
                            to={`/${currentLang || 'en'}`}
                            className="flex items-center transition-transform hover:scale-[1.02] group"
                            title={currentLang === 'es' ? 'Ir a la web general del proyecto Learning Brains' : 'Go to Learning Brains main website'}
                        >
                            <img src={logo} alt="Learning Brains" className="h-10 md:h-11 w-auto group-hover:scale-105 transition-transform" />
                        </Link>
                        <div className="hidden sm:block h-6 w-px bg-slate-200" />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
                                    {tr(campaign.meta.tag)}
                                </span>
                                <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    Erasmus+ Peer Validation
                                </span>
                            </div>
                            <h1 className="text-sm md:text-base font-bold text-slate-800 line-clamp-1">
                                {tr(campaign.meta.title)}
                            </h1>
                        </div>
                    </div>

                    {/* Language Selector & Draft status */}
                    <div className="flex items-center gap-3">
                        {draftSaved && (
                            <span className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 animate-fade-in">
                                <Check className="w-3 h-3" />
                                {ui('draft_saved')}
                            </span>
                        )}

                        {/* Language Selector Dropdown (matches main website Header, without analytics icon) */}
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
                </div>

                {/* Mobile View Switcher Tabs */}
                <div className="flex lg:hidden mt-3 pt-2 border-t border-slate-100 max-w-md mx-auto">
                    <button
                        onClick={() => setMobileTab('document')}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                            mobileTab === 'document' ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        <FileText className="w-3.5 h-3.5" />
                        {ui('tab_document')}
                    </button>
                    <button
                        onClick={() => setMobileTab('form')}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                            mobileTab === 'form' ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        <Send className="w-3.5 h-3.5" />
                        {ui('tab_form')}
                        {isStep1Valid && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6">
                {isSubmitted ? (
                    /* Submission Success Screen */
                    <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-slate-200 animate-fade-in">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-3">
                            {ui('success_title')}
                        </h2>
                        <p className="text-slate-600 text-base leading-relaxed mb-8">
                            {ui('success_desc')}
                        </p>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left mb-8 space-y-2 text-xs text-slate-600">
                            <div className="flex justify-between py-1 border-b border-slate-200">
                                <span className="font-semibold text-slate-500">Deliverable / Campaign:</span>
                                <span className="font-medium text-slate-800">{tr(campaign.meta.title)}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-200">
                                <span className="font-semibold text-slate-500">Evaluator:</span>
                                <span className="font-medium text-slate-800">{evaluator.name} ({evaluator.organization})</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="font-semibold text-slate-500">Country / Region:</span>
                                <span className="font-medium text-slate-800">{evaluator.country}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setCurrentStep(1);
                                }}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Submit another response
                            </button>
                            <a
                                href={documentUrl}
                                download
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-opacity-90 text-white text-sm font-semibold transition-all"
                            >
                                <Download className="w-4 h-4" />
                                {ui('download_pdf')}
                            </a>
                        </div>
                    </div>
                ) : (
                    /* Split Layout: Document Viewer (Left) & Feedback Form (Right) */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* ──────── PANEL IZQUIERDO: VISOR PDF (7 columnas) ──────── */}
                        <div className={`lg:col-span-7 flex-col h-[calc(100vh-140px)] min-h-[600px] ${mobileTab === 'document' ? 'flex' : 'hidden lg:flex'}`}>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
                                
                                {/* Document Header */}
                                <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-brand-primary text-white rounded-lg shadow-xs">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-bold text-slate-800 line-clamp-1">
                                                {tr(campaign.meta.title)}
                                            </h2>
                                            <p className="text-[11px] text-slate-500">
                                                PDF Document Preview
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={documentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-slate-500 hover:text-brand-primary hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                                            title={ui('open_new_tab')}
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={documentUrl}
                                            download
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-primary bg-white hover:bg-teal-50 border border-slate-200 rounded-lg shadow-xs transition-all"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">{ui('download_pdf')}</span>
                                        </a>
                                    </div>
                                </div>

                                {/* PDF Embed / Iframe */}
                                <div className="flex-1 bg-slate-200 relative">
                                    <iframe
                                        src={`${documentUrl}#toolbar=1&navpanes=0`}
                                        className="w-full h-full border-0"
                                        title={tr(campaign.meta.title)}
                                    />
                                </div>

                                {/* Guidance Box under Viewer */}
                                <div className="p-4 bg-teal-50/70 border-t border-teal-100 text-xs text-slate-600 leading-relaxed">
                                    <p className="font-medium text-brand-primary mb-1">
                                        📌 {tr(campaign.meta.subtitle)}
                                    </p>
                                    <p className="text-slate-500">
                                        {tr(campaign.meta.instructions)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ──────── PANEL DERECHO: FORMULARIO INTERACTIVO (5 columnas) ──────── */}
                        <div className={`lg:col-span-5 flex-col ${mobileTab === 'form' ? 'flex' : 'hidden lg:flex'}`}>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                                
                                {/* Stepper Navigation */}
                                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500">
                                        <span className={currentStep === 1 ? 'text-brand-primary font-bold' : ''}>
                                            {ui('step_profile')}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                                        <span className={currentStep === 2 ? 'text-brand-primary font-bold' : ''}>
                                            {ui('step_ratings')}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                                        <span className={currentStep === 3 ? 'text-brand-primary font-bold' : ''}>
                                            {ui('step_feedback')}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                                        <span className={currentStep === 4 ? 'text-brand-primary font-bold' : ''}>
                                            {ui('step_submit')}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                                        <div
                                            className="bg-brand-primary h-full transition-all duration-300"
                                            style={{ width: `${(currentStep / 4) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 flex-1 flex flex-col justify-between space-y-6">

                                    {/* ──── PASO 1: DATOS DEL EVALUADOR ──── */}
                                    {currentStep === 1 && (
                                        <div className="space-y-4 animate-fade-in">
                                            <div className="mb-2">
                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {ui('step_profile')}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-slate-500">
                                                    Please indicate your contact details and organizational profile.
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                    {ui('name')} *
                                                </label>
                                                <div className="relative">
                                                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={evaluator.name}
                                                        onChange={(e) => setEvaluator({ ...evaluator, name: e.target.value })}
                                                        placeholder="e.g. Maria Rossi / John Smith"
                                                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                    {ui('email')} *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                                                    <input
                                                        type="email"
                                                        required
                                                        value={evaluator.email}
                                                        onChange={(e) => setEvaluator({ ...evaluator, email: e.target.value })}
                                                        placeholder="name@organization.eu"
                                                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                    {ui('organization')} *
                                                </label>
                                                <div className="relative">
                                                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={evaluator.organization}
                                                        onChange={(e) => setEvaluator({ ...evaluator, organization: e.target.value })}
                                                        placeholder="Company / Training Center name"
                                                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {isItineraryCampaign ? (
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                            {ui('country')} *
                                                        </label>
                                                        <select
                                                            required
                                                            value={evaluator.country}
                                                            onChange={(e) => setEvaluator({ ...evaluator, country: e.target.value })}
                                                            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-700"
                                                        >
                                                            <option value="">{ui('select_option')}</option>
                                                            {CONSORTIUM_COUNTRIES.map((c) => (
                                                                <option key={c.code} value={c.code}>
                                                                    {tr(c.label)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                            {ui('professional_background')} *
                                                        </label>
                                                        <select
                                                            required
                                                            value={evaluator.professionalBackground}
                                                            onChange={(e) => setEvaluator({ ...evaluator, professionalBackground: e.target.value })}
                                                            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-700"
                                                        >
                                                            <option value="">{ui('select_option')}</option>
                                                            {ITINERARY_PROFESSIONAL_BACKGROUNDS.map((b) => (
                                                                <option key={b.id} value={b.id}>
                                                                    {tr(b.label)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {evaluator.professionalBackground === 'other' && (
                                                        <div className="animate-fade-in">
                                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                                {ui('other_specify')} *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                required
                                                                value={evaluator.otherBackground || ''}
                                                                onChange={(e) => setEvaluator({ ...evaluator, otherBackground: e.target.value })}
                                                                placeholder="e.g. Innovation Consultant / Technology Transfer"
                                                                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 leading-tight">
                                                                {ui('years_experience')} *
                                                            </label>
                                                            <select
                                                                required
                                                                value={evaluator.yearsExperience}
                                                                onChange={(e) => setEvaluator({ ...evaluator, yearsExperience: e.target.value })}
                                                                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-700 mt-1"
                                                            >
                                                                <option value="">{ui('select_option')}</option>
                                                                {EXPERIENCE_YEARS.map((y) => (
                                                                    <option key={y.id} value={y.id}>
                                                                        {tr(y.label)}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 leading-tight">
                                                                {ui('ai_experience')} *
                                                            </label>
                                                            <select
                                                                required
                                                                value={evaluator.aiExperience}
                                                                onChange={(e) => setEvaluator({ ...evaluator, aiExperience: e.target.value })}
                                                                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-700 mt-1"
                                                            >
                                                                <option value="">{ui('select_option')}</option>
                                                                {AI_EXPERIENCE_LEVELS.map((lvl) => (
                                                                    <option key={lvl.id} value={lvl.id}>
                                                                        {tr(lvl.label)}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                            {ui('country')} *
                                                        </label>
                                                        <select
                                                            required
                                                            value={evaluator.country}
                                                            onChange={(e) => setEvaluator({ ...evaluator, country: e.target.value })}
                                                            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-700"
                                                        >
                                                            <option value="">{ui('select_option')}</option>
                                                            {CONSORTIUM_COUNTRIES.map((c) => (
                                                                <option key={c.code} value={c.code}>
                                                                    {tr(c.label)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                            {ui('role')} *
                                                        </label>
                                                        <select
                                                            required
                                                            value={evaluator.role}
                                                            onChange={(e) => setEvaluator({ ...evaluator, role: e.target.value })}
                                                            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-700"
                                                        >
                                                            <option value="">{ui('select_option')}</option>
                                                            {STAKEHOLDER_TYPES.map((t) => (
                                                                <option key={t.id} value={t.id}>
                                                                    {tr(t.label)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* ──── PASO 2: VALORACIÓN CUANTITATIVA (LIKERT 1-5 + N/A) ──── */}
                                    {currentStep === 2 && (
                                        <div className="space-y-6 animate-fade-in">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {ui('step_ratings')}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-slate-500 mb-1">
                                                    {ui('scale_legend')}
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                {campaign.likertQuestions.map((q, idx) => {
                                                    const selectedVal = ratings[q.id];
                                                    const prevSection = idx > 0 && campaign.likertQuestions[idx - 1].section
                                                        ? tr(campaign.likertQuestions[idx - 1].section)
                                                        : null;
                                                    const currentSection = q.section ? tr(q.section) : null;
                                                    const isNewSection = currentSection && currentSection !== prevSection;

                                                    return (
                                                        <div key={q.id} className="space-y-2">
                                                            {isNewSection && (
                                                                <div className={`pt-4 pb-2 border-b border-teal-100 flex items-center justify-between ${idx > 0 ? 'mt-6' : 'mt-1'}`}>
                                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-brand-primary border border-teal-200">
                                                                        {currentSection}
                                                                    </span>
                                                                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                                                                        Learning Brains Framework
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <div>
                                                                        <div className="text-sm sm:text-[15px] font-bold text-slate-800 leading-snug">
                                                                            {idx + 1}. {tr(q.title)}
                                                                        </div>
                                                                        {q.description && (
                                                                            <p className="text-xs sm:text-sm text-slate-500 leading-normal mt-1">
                                                                                {tr(q.description)}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Rating Buttons: 1 to 5 + N/A */}
                                                                <div className="grid grid-cols-6 gap-1.5 pt-1">
                                                                    {[1, 2, 3, 4, 5, 'N/A'].map((num) => {
                                                                        const isSelected = selectedVal === num;
                                                                        const isNA = num === 'N/A';
                                                                        return (
                                                                            <button
                                                                                type="button"
                                                                                key={num}
                                                                                onClick={() => setRatings({ ...ratings, [q.id]: num })}
                                                                                title={isNA ? ui('scale_na_desc') : `${num} / 5`}
                                                                                className={`py-2.5 rounded-xl text-sm font-bold transition-all flex flex-col items-center justify-center ${
                                                                                    isSelected
                                                                                        ? (isNA ? 'bg-slate-700 text-white shadow-sm ring-2 ring-slate-700/30' : 'bg-brand-primary text-white shadow-sm ring-2 ring-brand-primary/30')
                                                                                        : (isNA ? 'bg-slate-200/80 text-slate-700 border border-slate-300 hover:bg-slate-300/80' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100')
                                                                                }`}
                                                                            >
                                                                                <span className={isNA ? 'text-xs sm:text-sm' : 'text-sm'}>{num}</span>
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* ──── PASO 3: FEEDBACK CUALITATIVO ──── */}
                                    {currentStep === 3 && (
                                        <div className="space-y-5 animate-fade-in">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {ui('step_feedback')}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-slate-500">
                                                    Share specific qualitative remarks, suggestions and regional considerations.
                                                </p>
                                            </div>

                                            {campaign.qualitativeQuestions.map((q) => (
                                                <div key={q.id} className="space-y-2">
                                                    <label className="block text-sm sm:text-[15px] font-bold text-slate-800 leading-snug">
                                                        {tr(q.title)}
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={feedback[q.id] || ''}
                                                        onChange={(e) => setFeedback({ ...feedback, [q.id]: e.target.value })}
                                                        placeholder={tr(q.placeholder)}
                                                        className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-none text-slate-700 leading-relaxed"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* ──── PASO 4: CONSENTIMIENTO Y ENVÍO ──── */}
                                    {currentStep === 4 && (
                                        <div className="space-y-5 animate-fade-in">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {ui('step_submit')}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-slate-500">
                                                    Review summary before registering your validation into the project records.
                                                </p>
                                            </div>

                                            {/* Summary Recap Box */}
                                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-slate-500">Evaluator:</span>
                                                    <span className="font-semibold text-slate-800">{evaluator.name || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-slate-500">Organization:</span>
                                                    <span className="font-semibold text-slate-800">{evaluator.organization || 'N/A'} ({evaluator.country || 'N/A'})</span>
                                                </div>
                                                {isItineraryCampaign ? (
                                                    <>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-500">Background:</span>
                                                            <span className="font-semibold text-slate-800 text-right">
                                                                {evaluator.professionalBackground === 'other'
                                                                    ? (evaluator.otherBackground || 'Other')
                                                                    : (ITINERARY_PROFESSIONAL_BACKGROUNDS.find(b => b.id === evaluator.professionalBackground)?.label[currentLang] || evaluator.professionalBackground || 'N/A')}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-500">Experience / AI:</span>
                                                            <span className="font-semibold text-slate-800">
                                                                {evaluator.yearsExperience || 'N/A'} yrs · AI: {evaluator.aiExperience || 'N/A'}
                                                            </span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-500">Role / Profile:</span>
                                                        <span className="font-semibold text-slate-800">{evaluator.role || 'N/A'}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="text-slate-500">Quantitative Questions:</span>
                                                    <span className="font-semibold text-emerald-700">
                                                        {Object.keys(ratings).length} / {campaign.likertQuestions.length} answered
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-slate-500">Qualitative Inputs:</span>
                                                    <span className="font-semibold text-slate-800">
                                                        {Object.values(feedback).filter(Boolean).length} sections provided
                                                    </span>
                                                </div>
                                            </div>

                                            {/* GDPR / Erasmus+ Consent Checkbox & Reassurance Notice */}
                                            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-2.5">
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        id="gdpr_consent"
                                                        required
                                                        checked={consent}
                                                        onChange={(e) => setConsent(e.target.checked)}
                                                        className="mt-0.5 h-4 w-4 rounded text-brand-primary focus:ring-brand-primary border-slate-300 cursor-pointer shrink-0"
                                                    />
                                                    <label htmlFor="gdpr_consent" className="text-xs sm:text-sm text-slate-700 cursor-pointer leading-relaxed font-medium">
                                                        {ui('consent_label')}
                                                    </label>
                                                </div>
                                                <div className="pt-2 text-[11px] text-slate-500 leading-normal border-t border-emerald-100/60">
                                                    🛡️ <strong>Data Controller:</strong> Learning Brains Erasmus+ Consortium (coordinated by FVEM, Spain). In accordance with GDPR (EU 2016/679), responses are processed solely for project justification and evaluation. Stored securely within restricted consortium-only resources.
                                                </div>
                                            </div>

                                            {submitError && (
                                                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-red-200">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    <span>{submitError}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Action Buttons: Prev / Next / Submit */}
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                                        {currentStep > 1 ? (
                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(currentStep - 1)}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                                {ui('back')}
                                            </button>
                                        ) : (
                                            <div />
                                        )}

                                        {currentStep < 4 ? (
                                            <button
                                                type="button"
                                                disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
                                                onClick={() => setCurrentStep(currentStep + 1)}
                                                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all ${
                                                    ((currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid))
                                                        ? 'bg-slate-300 cursor-not-allowed'
                                                        : 'bg-brand-primary hover:bg-opacity-90 shadow-sm'
                                                }`}
                                            >
                                                {ui('next')}
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={!consent || isSubmitting}
                                                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all ${
                                                    !consent || isSubmitting
                                                        ? 'bg-slate-300 cursor-not-allowed'
                                                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-md'
                                                }`}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        {ui('submitting')}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-3.5 h-3.5" />
                                                        {ui('submit')}
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}
