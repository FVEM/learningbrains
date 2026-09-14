import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    ShieldAlert, LogOut, Users, FileText, Clock, MousePointerClick,
    TrendingUp, KeyRound, Loader2, AlertCircle, UserPlus, Zap, Linkedin, BookOpen, ExternalLink,
    Copy, Check, FileCheck, Table, Send, CheckCircle2, Sparkles, Lock
} from 'lucide-react';
import { VALIDATION_CAMPAIGNS, SUPPORTED_LANGUAGES } from '../config/validationCampaigns';

// Colores basados en la paleta de Learning Brains
const BRAND_RED = "#d62828";
const BRAND_BLUE = "#003049";
const BRAND_ORANGE = "#f77f00";
const BRAND_YELLOW = "#fcbf49";
const BRAND_GRAY = "#6B7280";

const COLORS = [BRAND_RED, BRAND_BLUE, BRAND_ORANGE, BRAND_YELLOW, '#8e44ad', '#27ae60', '#e74c3c', '#3498db'];

export default function Analytics() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [errorPin, setErrorPin] = useState(false);

    const [adminTab, setAdminTab] = useState('validation'); // 'validation' | 'web'
    const [copiedKey, setCopiedKey] = useState(null);

    const [timeRange, setTimeRange] = useState('seg1');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState(null);

    const handleCopyLink = (campaignId, langCode) => {
        const origin = window.location.origin;
        const url = `${origin}/validation/${campaignId}?lang=${langCode}`;
        navigator.clipboard.writeText(url);
        const key = `${campaignId}-${langCode}`;
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2500);
    };


    useEffect(() => {
        if (isAuthenticated) {
            fetchAnalyticsData(timeRange);
        }
    }, [isAuthenticated, timeRange]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pinInput === 'brains2026') {
            setIsAuthenticated(true);
            setErrorPin(false);
        } else {
            setErrorPin(true);
            setPinInput('');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setData(null);
    };

    const fetchAnalyticsData = async (range) => {
        setIsLoading(true);
        setErrorData(null);
        try {
            const response = await fetch(`/api/analytics?range=${range}`);
            const result = await response.json();

            if (!response.ok || result.error) {
                throw new Error(result.error || `HTTP ${response.status}: Failed to fetch analytics data`);
            }

            setData(result);
        } catch (err) {
            console.error(err);
            setErrorData(err.message || 'Error loading analytics. Make sure Google Cloud credentials are set.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 font-sans">
                <Helmet>
                    <title>Analytics Login | Learning Brains</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>

                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-neutral-100">
                    <img src="/learning-brains-logo-transparent-cropped.png" alt="Learning Brains Analytics" className="h-24 w-auto mx-auto mb-6 object-contain" />
                    <h1 className="text-2xl font-bold text-neutral-800 mb-2">Restricted Access</h1>
                    <p className="text-neutral-500 mb-8">Please enter the PIN code to view the analytics dashboard.</p>

                    <form onSubmit={handleLogin}>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <input
                                type="password"
                                value={pinInput}
                                onChange={(e) => setPinInput(e.target.value)}
                                placeholder="Enter PIN"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${errorPin ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:border-brand-primary focus:ring-brand-primary/20'
                                    }`}
                                autoFocus
                            />
                        </div>
                        {errorPin && <p className="text-red-500 text-sm mt-2 text-left">Incorrect PIN code.</p>}

                        <button
                            type="submit"
                            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 rounded-xl mt-6 transition-colors shadow-lg shadow-brand-primary/20"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-neutral-50 font-sans pb-12">
            <Helmet>
                <title>Analytics Dashboard | Learning Brains</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Header */}
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-sm shadow-black/5">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-brand-primary w-6 h-6" />
                            <span className="font-bold text-xl text-neutral-800 tracking-tight">Internal <span className="text-brand-primary">Hub</span></span>
                        </div>

                        {/* Top Tab Switcher */}
                        <div className="flex items-center bg-neutral-100 p-1 rounded-xl">
                            <button
                                onClick={() => setAdminTab('validation')}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                    adminTab === 'validation'
                                        ? 'bg-white text-brand-primary shadow-xs'
                                        : 'text-neutral-500 hover:text-neutral-800'
                                }`}
                            >
                                <FileCheck className="w-3.5 h-3.5" />
                                Inputs Externos & National Pilot Committees
                            </button>
                            <button
                                onClick={() => setAdminTab('web')}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                    adminTab === 'web'
                                        ? 'bg-white text-brand-primary shadow-xs'
                                        : 'text-neutral-500 hover:text-neutral-800'
                                }`}
                            >
                                <TrendingUp className="w-3.5 h-3.5" />
                                Web Analytics
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {adminTab === 'web' && (
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="bg-neutral-100 border-none rounded-lg py-1.5 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-brand-primary/50 outline-none cursor-pointer appearance-none hover:bg-neutral-200 transition-colors"
                            >
                                <option value="total">Accumulated Total</option>
                                <option value="seg1">Dic 2025 – May 2026</option>
                                <option value="seg2">Jun 2026 – Nov 2026</option>
                                <option value="seg3">Dic 2026 – May 2027</option>
                                <option value="seg4">Jun 2027 – Nov 2027</option>
                            </select>
                        )}

                        <button
                            onClick={handleLogout}
                            className="text-neutral-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                            title="Logout"
                            >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                {/* ──── TAB 1: VALIDATION CAMPAIGNS & EXTERNAL INPUTS ──── */}
                {adminTab === 'validation' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Intro banner */}
                        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 uppercase tracking-wider">
                                        Erasmus+ Quality Assurance
                                    </span>
                                    <span className="text-xs text-neutral-400 font-medium">Inputs Externos y Validación</span>
                                </div>
                                <h2 className="text-xl font-bold text-neutral-800">
                                    National Pilot Committees e Itinerarios Formativos
                                </h2>
                                <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
                                    Genera y copia enlaces directos para los evaluadores y miembros de comités en España, Italia, Austria, Eslovaquia y Portugal. Las respuestas se registran de forma centralizada en Google Sheets.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href="https://docs.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all shadow-2xs"
                                >
                                    <Table className="w-4 h-4" />
                                    Google Sheet de Respuestas
                                </a>
                            </div>
                        </div>

                        {/* Hub Central Link Card (Enlace Conjunto para todo el consorcio) */}
                        <div className="bg-gradient-to-r from-teal-900 to-brand-primary text-white rounded-2xl p-6 shadow-md border border-teal-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-200 text-[11px] font-bold uppercase tracking-wider mb-2">
                                    <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                                    Enlace Único Conjunto para Evaluadores Externos
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                    Portal Hub Central de Validación (/validation)
                                </h3>
                                <p className="text-xs text-teal-100 max-w-2xl leading-relaxed">
                                    Comparte este único enlace con los miembros de comités y expertos. Accederán a un menú donde eligen su idioma y seleccionan la acción a validar (los entregables futuros aparecen como "Próximamente").
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 bg-black/20 p-1.5 rounded-xl">
                                    {SUPPORTED_LANGUAGES.map((lang) => {
                                        const key = `hub-${lang.code}`;
                                        const isCopied = copiedKey === key;
                                        return (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    const url = `${window.location.origin}/validation?lang=${lang.code}`;
                                                    navigator.clipboard.writeText(url);
                                                    setCopiedKey(key);
                                                    setTimeout(() => setCopiedKey(null), 2500);
                                                }}
                                                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                                                    isCopied
                                                        ? 'bg-emerald-500 text-white shadow-xs'
                                                        : 'bg-white/10 hover:bg-white/20 text-white'
                                                }`}
                                                title={`Copiar enlace conjunto en ${lang.name}`}
                                            >
                                                <span>{lang.flag}</span>
                                                <span className="uppercase text-[10px]">{lang.code}</span>
                                                {isCopied && <Check className="w-3 h-3 text-white" />}
                                            </button>
                                        );
                                    })}
                                </div>
                                <a
                                    href="/validation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-white hover:bg-teal-50 text-brand-primary rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center justify-center gap-1.5"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Ver Hub
                                </a>
                            </div>
                        </div>

                        {/* Campaign Cards Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {Object.values(VALIDATION_CAMPAIGNS).map((campaign) => {
                                const isActive = campaign.status === 'active';
                                return (
                                    <div
                                        key={campaign.id}
                                        className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col justify-between ${
                                            isActive ? 'border-neutral-200' : 'border-neutral-200/60 bg-neutral-50/50'
                                        }`}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-primary/10 text-brand-primary uppercase tracking-wide">
                                                    {campaign.meta.tag.es || campaign.meta.tag.en}
                                                </span>
                                                {isActive ? (
                                                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        Activo
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-0.5 rounded-full">
                                                        <Lock className="w-3 h-3 text-slate-400" />
                                                        Próximamente (Fase 2)
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-lg font-bold text-neutral-800 mb-2">
                                                {campaign.meta.title.es || campaign.meta.title.en}
                                            </h3>
                                            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                                                {campaign.meta.subtitle.es || campaign.meta.subtitle.en}
                                            </p>

                                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 mb-4 text-xs space-y-1 text-neutral-600">
                                                <div className="flex justify-between">
                                                    <span className="text-neutral-400">Documento PDF:</span>
                                                    <span className="font-medium text-neutral-700 font-mono">{campaign.documentUrl}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-neutral-400">Preguntas Cuantitativas:</span>
                                                    <span className="font-semibold text-neutral-800">
                                                        {campaign.likertQuestions?.length || 0} dimensiones
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-neutral-400">Cuestiones Cualitativas:</span>
                                                    <span className="font-semibold text-neutral-800">
                                                        {campaign.qualitativeQuestions?.length || 0} campos abiertos
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Localized Links for Partners (only if active) */}
                                            {isActive ? (
                                                <div>
                                                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                                        Enlaces directos por país / idioma (Copiar y enviar al socio):
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                        {SUPPORTED_LANGUAGES.map((lang) => {
                                                            const key = `${campaign.id}-${lang.code}`;
                                                            const isCopied = copiedKey === key;
                                                            return (
                                                                <button
                                                                    key={lang.code}
                                                                    onClick={() => handleCopyLink(campaign.id, lang.code)}
                                                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center justify-between transition-all ${
                                                                        isCopied
                                                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                                                            : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700'
                                                                    }`}
                                                                    title={`Copiar enlace en ${lang.name}`}
                                                                >
                                                                    <span className="flex items-center gap-1.5">
                                                                        <span>{lang.flag}</span>
                                                                        <span>{lang.name}</span>
                                                                    </span>
                                                                    {isCopied ? (
                                                                        <Check className="w-3 h-3 text-emerald-600" />
                                                                    ) : (
                                                                        <Copy className="w-3 h-3 text-neutral-400" />
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-3 px-4 bg-slate-100/60 rounded-xl text-xs text-slate-500 flex items-center gap-2">
                                                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                                    <span>Esta campaña se activará en la siguiente fase del proyecto.</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Footer Actions */}
                                        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                                            <span className="text-[11px] text-neutral-400 font-mono">
                                                /validation/{campaign.id}
                                            </span>
                                            {isActive ? (
                                                <a
                                                    href={`/validation/${campaign.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold transition-all shadow-2xs"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                    Abrir Portal de Validación
                                                </a>
                                            ) : (
                                                <span className="text-xs font-semibold text-neutral-400">
                                                    Desactivado temporalmente
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Integration Instructions Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-teal-500/20 text-teal-300 rounded-xl">
                                    <Table className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-white mb-1">
                                        Instrucciones para Vincular tu Google Sheet (3 minutos)
                                    </h3>
                                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                        El sistema ya está listo para escribir automáticamente en tu Google Sheet cada vez que un evaluador envía un cuestionario.
                                    </p>
                                    <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4 mb-4">
                                        <li>Abre tu Google Sheet de Learning Brains y ve a <strong>Extensiones &gt; Apps Script</strong>.</li>
                                        <li>Pega el código que hemos preparado en <code className="bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded">scripts/google-sheets-validation-webhook.gs</code>.</li>
                                        <li>Haz clic en <strong>Implementar &gt; Nueva implementación &gt; Tipo: Aplicación web</strong> (Acceso: Cualquiera).</li>
                                        <li>Copia la URL proporcionada y añádela como variable <code className="bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded">GOOGLE_SHEET_WEBHOOK_URL</code> en Vercel (o en tu <code className="bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded">.env</code> local).</li>
                                    </ol>
                                    <div className="inline-flex items-center gap-2 text-[11px] text-teal-300 bg-teal-950/60 px-3 py-1.5 rounded-lg border border-teal-800">
                                        <CheckCircle2 className="w-4 h-4" />
                                        En local el sistema funciona sin configuración externa y registra las validaciones en modo seguro.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ──── TAB 2: WEB ANALYTICS ──── */}
                {adminTab === 'web' && (
                    <div>

                {isLoading && !data && (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-6" />
                        <p className="text-neutral-600 font-medium text-lg">Fetching live data from Google Analytics...</p>
                        <p className="text-neutral-400 text-sm mt-2">This may take a few seconds.</p>
                    </div>
                )}

                {errorData && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4 items-start mb-8 text-red-800 shadow-sm">
                        <AlertCircle className="w-7 h-7 shrink-0 mt-0.5 text-red-500" />
                        <div>
                            <h3 className="font-bold text-lg mb-1">Configuration Needed</h3>
                            <p className="text-neutral-700">{errorData}</p>
                            <p className="text-sm mt-4 font-medium text-neutral-600 bg-red-100/50 p-3 rounded-lg border border-red-100">
                                Please ensure Vercel environment variables are set: <br />
                                <code className="bg-white/80 px-1.5 py-0.5 rounded text-red-700 mx-1 border border-red-200 select-all">GA_PROPERTY_ID</code>,
                                <code className="bg-white/80 px-1.5 py-0.5 rounded text-red-700 mx-1 border border-red-200 select-all">GA_CLIENT_EMAIL</code>,
                                <code className="bg-white/80 px-1.5 py-0.5 rounded text-red-700 mx-1 border border-red-200 select-all">GA_PRIVATE_KEY</code>
                            </p>
                        </div>
                    </div>
                )}

                {!isLoading && data && !errorData && (
                    <div className="space-y-6">
                        {/* KPI Cards Row */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 lg:gap-6">
                            <StatCard title="Total Page Views" value={(data?.kpis?.views ?? 0).toLocaleString()} icon={<MousePointerClick className="w-6 h-6" />} color="text-brand-blue" bgColor="bg-brand-blue/10" />
                            <StatCard title="Active Users" value={(data?.kpis?.users ?? 0).toLocaleString()} icon={<Users className="w-6 h-6" />} color="text-brand-red" bgColor="bg-brand-red/10" />
                            <StatCard title="New Users" value={(data?.kpis?.newUsers ?? 0).toLocaleString()} icon={<UserPlus className="w-6 h-6" />} color="text-brand-orange" bgColor="bg-brand-orange/10" />
                            <StatCard title="LinkedIn Clicks" value={(data?.linkedinUsers ?? 0).toLocaleString()} icon={<Linkedin className="w-6 h-6" />} color="text-[#0a66c2]" bgColor="bg-[#0a66c2]/10" />
                            <StatCard title="Chatbot Uses" value={(data?.chatInteractions ?? 0).toLocaleString()} icon={<Zap className="w-6 h-6" />} color="text-emerald-600" bgColor="bg-emerald-100" />
                            <StatCard title="Engagement Rate" value={`${data?.kpis?.engagementRate ?? 0}%`} icon={<TrendingUp className="w-6 h-6" />} color="text-green-600" bgColor="bg-green-100" />
                            <StatCard title="Avg. Engagement Time" value={`${data?.kpis?.avgEngagement ?? 0}s`} icon={<Clock className="w-6 h-6" />} color="text-purple-600" bgColor="bg-purple-100" />
                        </div>

                        {/* Top Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Traffic Overview */}
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 flex flex-col">
                                <h3 className="text-lg font-bold text-neutral-800 mb-6">Traffic Overview</h3>
                                <div className="flex-1 min-h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data?.timeSeries ?? []} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} minTickGap={20} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                            <Line type="monotone" dataKey="views" name="Page Views" stroke={BRAND_RED} strokeWidth={3} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="users" name="Active Users" stroke={BRAND_BLUE} strokeWidth={3} dot={{ r: 3, strokeWidth: 1 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Acquisition Channels */}
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 flex flex-col">
                                <h3 className="text-lg font-bold text-neutral-800 mb-6">Acquisition Channels</h3>
                                <div className="flex-1 min-h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data?.channels ?? []} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="channel" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 13, fontWeight: 500 }} />
                                            <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="users" name="Users" fill={BRAND_ORANGE} radius={[0, 4, 4, 0]} barSize={20} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Mid Charts Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Devices */}
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                                <h3 className="text-lg font-bold text-neutral-800 mb-2">Device Category</h3>
                                <div className="h-[250px] flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={data?.devices ?? []} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                                                {(data?.devices ?? []).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Legend iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                                <h3 className="text-lg font-bold text-neutral-800 mb-2">Usage by Language</h3>
                                <div className="h-[250px] flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={data?.languages ?? []} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                                                {(data?.languages ?? []).map((entry, index) => (
                                                    <Cell key={`cell-lang-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Legend iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Consoritum Countries */}
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-neutral-800">Consortium Impact</h3>
                                    <span className="text-[10px] font-bold bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full uppercase tracking-wider">Project Partners</span>
                                </div>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data?.consortiumCountries ?? []} layout="vertical" margin={{ left: 25, right: 30 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 13, fontWeight: 500 }} width={80} />
                                            <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="users" name="Active Users" fill={BRAND_RED} radius={[0, 4, 4, 0]} barSize={20}>
                                                {(data?.consortiumCountries ?? []).map((entry, index) => (
                                                    <Cell key={`cell-cons-${index}`} fill={entry.users > 0 ? BRAND_RED : BRAND_GRAY + '40'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* OS & Global Countries Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* OS */}
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                                <h3 className="text-lg font-bold text-neutral-800 mb-2">Operating Systems</h3>
                                <div className="h-[250px] flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={data?.os ?? []} cx="50%" cy="50%" innerRadius={0} outerRadius={85} paddingAngle={2} dataKey="value">
                                                {(data?.os ?? []).map((entry, index) => (
                                                    <Cell key={`cell-os-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Legend iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Countries */}
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                                <h3 className="text-lg font-bold text-neutral-800 mb-4">Global Reach (Top 5)</h3>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data?.countries ?? []} layout="vertical" margin={{ left: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 13, fontWeight: 500 }} width={80} />
                                            <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="users" name="Users" fill={BRAND_BLUE} radius={[0, 4, 4, 0]} barSize={20} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Tables Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Top Pages Table */}
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-neutral-100 flex flex-col overflow-hidden">
                                <div className="p-6 pb-4 border-b border-neutral-100 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-800">Top Pages</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="text-xs text-neutral-500 uppercase bg-neutral-50/50">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Page Config</th>
                                                <th className="px-6 py-4 text-right font-semibold">Views</th>
                                                <th className="px-6 py-4 text-right font-semibold">Avg. Engagement</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {(data?.pages ?? []).map((page, i) => (
                                                <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-neutral-800 truncate max-w-[300px]" title={page.title}>{page.title || '(not set)'}</div>
                                                        <div className="text-neutral-400 text-xs mt-0.5 truncate max-w-[300px]" title={page.path}>{page.path}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-semibold text-neutral-700">{(page.views ?? 0).toLocaleString()}</td>
                                                    <td className="px-6 py-4 text-right text-neutral-500">{page.time}s</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Top Events Table */}
                            <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-neutral-100 flex flex-col overflow-hidden">
                                <div className="p-6 pb-4 border-b border-neutral-100 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-800">Top Events</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="text-xs text-neutral-500 uppercase bg-neutral-50/50">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Event Name</th>
                                                <th className="px-6 py-4 text-right font-semibold">Count</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {(data?.events ?? []).map((event, i) => (
                                                <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-neutral-700 capitalize">
                                                        {event.name?.replace(/_/g, ' ') ?? 'Unknown'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-semibold text-neutral-700">{(event.count ?? 0).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Articles & Newsletters Performance Table */}
                        {(data?.articleStats ?? []).length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 flex flex-col overflow-hidden">
                                <div className="p-6 pb-4 border-b border-neutral-100 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-800">Articles & Newsletters Performance</h3>
                                    <span className="ml-auto text-[11px] font-bold bg-teal-50 text-teal-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                        {(data?.articleStats ?? []).length} items
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-neutral-500 uppercase bg-neutral-50/50">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Title</th>
                                                <th className="px-6 py-4 font-semibold">Partner</th>
                                                <th className="px-6 py-4 text-right font-semibold">Page Views</th>
                                                <th className="px-6 py-4 text-right font-semibold">Active Users</th>
                                                <th className="px-6 py-4 text-right font-semibold">Avg. Read Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {(data?.articleStats ?? []).map((article, i) => {
                                                return (
                                                    <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2.5">
                                                                <span className="font-semibold text-neutral-800 max-w-[380px] line-clamp-1" title={article.title}>
                                                                    {article.title}
                                                                </span>
                                                                {article.type && (
                                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                                                                        article.type.toUpperCase() === 'NEWS'
                                                                            ? 'bg-purple-50 border border-purple-100 text-purple-700'
                                                                            : 'bg-teal-50 border border-teal-100 text-teal-700'
                                                                    }`}>
                                                                        {article.type.toUpperCase() === 'NEWS' ? 'Newsletter' : 'Article'}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 mt-1">
                                                                <span className="text-neutral-400 text-[11px] font-mono">{article.slug}</span>
                                                                <a 
                                                                    href={`/en/news/${article.slug}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="text-brand-primary hover:text-brand-primary/80 transition-colors inline-flex items-center"
                                                                    title="View Post"
                                                                >
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {article.partner ? (
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-brand-blue/10 text-brand-blue uppercase tracking-wide">
                                                                    {article.partner}
                                                                </span>
                                                            ) : (
                                                                <span className="text-neutral-300 text-xs">—</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className="font-bold text-neutral-800">{article.views.toLocaleString()}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className="font-bold text-neutral-600">{(article.users || 0).toLocaleString()}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className={`font-bold ${article.avgTime > 0 ? 'text-teal-600' : 'text-neutral-400'}`}>
                                                                {article.avgTime > 0 ? `${Math.floor(article.avgTime / 60)}m ${article.avgTime % 60}s` : '0s'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                    </div>
                )}
                    </div>
                )}
            </main>
        </div>
    );
}

function StatCard({ title, value, icon, color, bgColor }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} ${color} transition-transform group-hover:scale-110`}>
                    {icon}
                </div>
            </div>
            <h4 className="text-neutral-500 text-sm font-medium mb-1 relative z-10">{title}</h4>
            <div className="flex items-end gap-2 relative z-10">
                <span className="text-3xl font-bold text-neutral-800 tracking-tight">{value}</span>
            </div>
            {/* Soft background gradient hint */}
            <div className={`absolute -bottom-8 -right-8 w-24 h-24 ${bgColor} rounded-full blur-2xl opacity-50 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500`}></div>
        </div>
    );
}