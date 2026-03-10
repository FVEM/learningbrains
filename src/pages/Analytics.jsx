import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { ShieldAlert, LogOut, Users, FileText, Clock, MousePointerClick, TrendingUp, KeyRound, Loader2, AlertCircle } from 'lucide-react';

// Colores basados en la paleta de Learning Brains
const BRAND_RED = "#d62828";
const BRAND_BLUE = "#003049";
const BRAND_ORANGE = "#f77f00";
const BRAND_YELLOW = "#fcbf49";

const COLORS = [BRAND_RED, BRAND_BLUE, BRAND_ORANGE, BRAND_YELLOW, '#8e44ad', '#27ae60'];

export default function Analytics() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [errorPin, setErrorPin] = useState(false);

    const [timeRange, setTimeRange] = useState('30days');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState(null);

    useEffect(() => {
        const isAuth = sessionStorage.getItem('lb_analytics_auth');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchAnalyticsData(timeRange);
        }
    }, [isAuthenticated, timeRange]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pinInput === '2024') {
            setIsAuthenticated(true);
            sessionStorage.setItem('lb_analytics_auth', 'true');
            setErrorPin(false);
        } else {
            setErrorPin(true);
            setPinInput('');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('lb_analytics_auth');
        setData(null);
    };

    const fetchAnalyticsData = async (range) => {
        setIsLoading(true);
        setErrorData(null);
        try {
            // Llamada la api serverless real
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

                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-10 h-10 text-primary" />
                    </div>
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
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${errorPin ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:border-primary focus:ring-primary/20'
                                    }`}
                                autoFocus
                            />
                        </div>
                        {errorPin && <p className="text-red-500 text-sm mt-2 text-left">Incorrect PIN code.</p>}

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg mt-6 transition-colors shadow-md shadow-primary/20"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 font-sans pb-12">
            <Helmet>
                <title>Analytics Dashboard | Learning Brains</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Header */}
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="text-primary w-6 h-6" />
                        <span className="font-bold text-xl text-neutral-800 tracking-tight">Analytics <span className="text-primary">Dashboard</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-neutral-100 border-none rounded-md py-1.5 pl-3 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                        >
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="year">This Year</option>
                        </select>

                        <button
                            onClick={handleLogout}
                            className="text-neutral-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                {isLoading && !data && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                        <p className="text-neutral-500">Fetching live data from Google Analytics...</p>
                    </div>
                )}

                {errorData && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex gap-4 items-start mb-8 text-red-800">
                        <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold mb-1">Configuration Needed</h3>
                            <p className="text-sm">{errorData}</p>
                            <p className="text-sm mt-3 font-medium">Please ensure Vercel environment variables are set: <br /><code className="bg-red-100 px-1 py-0.5 rounded">GA_PROPERTY_ID</code>, <code className="bg-red-100 px-1 py-0.5 rounded">GA_CLIENT_EMAIL</code>, <code className="bg-red-100 px-1 py-0.5 rounded">GA_PRIVATE_KEY</code></p>
                        </div>
                    </div>
                )}

                {!isLoading && data && !errorData && (
                    <div className="space-y-6">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Views" value={data.kpis.views} icon={<MousePointerClick />} trend="+12%" />
                            <StatCard title="Active Users" value={data.kpis.users} icon={<Users />} trend="+8%" />
                            <StatCard title="Bounce Rate" value={`${data.kpis.bounceRate}%`} icon={<LogOut />} trend="-2%" inverse />
                            <StatCard title="Avg. Engagement" value={`${data.kpis.avgEngagement}s`} icon={<Clock />} trend="+5%" inline />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Line Chart - Traffic over time */}
                            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                                <h3 className="text-lg font-bold text-neutral-800 mb-6">Traffic Overview</h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data.timeSeries}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                            <Line type="monotone" dataKey="views" name="Page Views" stroke={BRAND_RED} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="users" name="Active Users" stroke={BRAND_BLUE} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Pie Chart - Devices */}
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                                <h3 className="text-lg font-bold text-neutral-800 mb-6">Device Category</h3>
                                <div className="h-[300px] flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.devices}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {data.devices.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Legend iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Bar Chart - Countries */}
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                                <h3 className="text-lg font-bold text-neutral-800 mb-6">Top Countries</h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data.countries} layout="vertical" margin={{ left: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                            <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 13, fontWeight: 500 }} width={100} />
                                            <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="users" name="Users" fill={BRAND_ORANGE} radius={[0, 4, 4, 0]} barSize={24} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Top Pages Table */}
                            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col">
                                <h3 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-neutral-400" />
                                    Top Pages
                                </h3>
                                <div className="overflow-auto flex-1">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-neutral-500 uppercase bg-neutral-50">
                                            <tr>
                                                <th className="px-4 py-3 rounded-tl-lg">Page Path</th>
                                                <th className="px-4 py-3 text-right">Views</th>
                                                <th className="px-4 py-3 text-right rounded-tr-lg">Avg. Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.pages.map((page, i) => (
                                                <tr key={i} className="border-b last:border-0 border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-neutral-700 truncate max-w-[200px]" title={page.path}>
                                                        {page.path}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-semibold">{page.views.toLocaleString()}</td>
                                                    <td className="px-4 py-3 text-right text-neutral-500">{page.time}s</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}

function StatCard({ title, value, icon, trend, inverse, inline }) {
    const isPositive = trend.startsWith('+');
    const showGreen = inverse ? !isPositive : isPositive;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-50 text-primary flex items-center justify-center">
                    {icon}
                </div>
                {trend && !inline && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${showGreen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <h4 className="text-neutral-500 text-sm font-medium mb-1">{title}</h4>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-neutral-800 tracking-tight">{value}</span>
            </div>
        </div>
    );
}
