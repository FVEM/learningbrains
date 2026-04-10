import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    ShieldAlert, LogOut, Users, FileText, Clock, MousePointerClick,
    TrendingUp, KeyRound, Loader2, AlertCircle, UserPlus, Zap, Linkedin, BookOpen, ExternalLink
} from 'lucide-react';

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

    const [timeRange, setTimeRange] = useState('30days');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState(null);


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
                    <div className="flex items-center gap-3">
                        <TrendingUp className="text-brand-primary w-6 h-6" />
                        <span className="font-bold text-xl text-neutral-800 tracking-tight">Analytics <span className="text-brand-primary">Dashboard</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-neutral-100 border-none rounded-lg py-1.5 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-brand-primary/50 outline-none cursor-pointer appearance-none hover:bg-neutral-200 transition-colors"
                        >
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="year">This Year</option>
                        </select>

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

                        {/* Article Performance Table */}
                        {(data?.articleStats ?? []).length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 flex flex-col overflow-hidden">
                                <div className="p-6 pb-4 border-b border-neutral-100 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-800">Article Performance</h3>
                                    <span className="ml-auto text-[11px] font-bold bg-teal-50 text-teal-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                        {(data?.articleStats ?? []).length} articles
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-neutral-500 uppercase bg-neutral-50/50">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Article</th>
                                                <th className="px-6 py-4 text-right font-semibold">Page Views</th>
                                                <th className="px-6 py-4 text-right font-semibold">Article Clicks</th>
                                                <th className="px-6 py-4 text-right font-semibold">CTR</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {(data?.articleStats ?? []).map((article, i) => {
                                                const ctr = article.views > 0 ? ((article.clicks / article.views) * 100).toFixed(0) : 0;
                                                const readableTitle = article.slug
                                                    .replace(/-/g, ' ')
                                                    .replace(/\b\w/g, c => c.toUpperCase());
                                                return (
                                                    <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="font-semibold text-neutral-800 max-w-[480px] line-clamp-1" title={readableTitle}>
                                                                {readableTitle}
                                                            </div>
                                                            <div className="text-neutral-400 text-xs mt-0.5 font-mono">{article.slug}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className="font-bold text-neutral-800">{article.views.toLocaleString()}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className={`font-bold ${article.clicks > 0 ? 'text-teal-600' : 'text-neutral-400'}`}>
                                                                {article.clicks.toLocaleString()}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                                                Number(ctr) >= 20 ? 'bg-green-100 text-green-700' :
                                                                Number(ctr) >= 5  ? 'bg-yellow-100 text-yellow-700' :
                                                                                    'bg-neutral-100 text-neutral-500'
                                                            }`}>
                                                                {ctr}%
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