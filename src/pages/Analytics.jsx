import { useState, useEffect } from 'react';
import { 
  Users, 
  BarChart3, 
  Globe, 
  MessageSquare, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  Sparkles,
  Zap,
  GraduationCap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1a17]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#00897b]/30 border-t-[#00897b] rounded-full animate-spin"></div>
        <p className="text-emerald-400 font-medium animate-pulse">Analyzing Impact Data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1a17] text-white p-6">
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md text-center">
        <h2 className="text-xl font-bold mb-2">Analysis Unavailable</h2>
        <p className="text-red-300/80">{error}</p>
      </div>
    </div>
  );

  const COLORS = ['#00897b', '#26a69a', '#4db6ac', '#80cbc4', '#b2dfdb'];

  return (
    <div className="min-h-screen bg-[#0a1a17] text-slate-200 selection:bg-emerald-500/30">
      {/* Premium Header */}
      <div className="relative overflow-hidden pt-12 pb-12 px-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-3 px-3 py-1 bg-emerald-400/10 rounded-full w-fit border border-emerald-400/20">
                <Sparkles size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Live Impact Demonstrator</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Erasmus+ Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Insights</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl font-light">
                Monitoring real-time engagement and dissemination efficacy across the Learning Brains consortium.
              </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-xs text-slate-400 whitespace-nowrap">
              <Clock size={14} />
              Last sync: {new Date(data?.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Active Learners" 
            value={data?.overview.users.value} 
            trend={data?.overview.users.trend}
            icon={<Users className="text-emerald-400" />}
            subtitle="vs. previous 30 days"
          />
          <StatCard 
            title="Engagement Sessions" 
            value={data?.overview.sessions.value} 
            trend={data?.overview.sessions.trend}
            icon={<Zap className="text-yellow-400" />}
            subtitle="Total platform interactions"
          />
          <StatCard 
            title="Knowledge Views" 
            value={data?.overview.pageViews.value} 
            trend={data?.overview.pageViews.trend}
            icon={<BarChart3 className="text-blue-400" />}
            subtitle="Educational content reach"
          />
          <StatCard 
            title="Avg. Stay Duration" 
            value={`${data?.overview.avgDuration.value}s`} 
            trend={data?.overview.avgDuration.trend}
            icon={<Clock className="text-purple-400" />}
            subtitle="Deep learning index"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart - Reach */}
          <GlassBox className="lg:col-span-2" title="International Reach" icon={<Globe />}>
            <div className="h-[350px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.countries}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00897b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00897b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="country" 
                    stroke="#475569" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#f1f5f9'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#00897b" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassBox>

          {/* Side Module - Impact */}
          <GlassBox title="Consortium Impact" icon={<GraduationCap />}>
             <div className="space-y-6 mt-6">
                <ImpactItem 
                  label="Resources Downloaded" 
                  value={data?.impact.pdfDownloads.value} 
                  sub="Dissemination KPI"
                  icon={<Download className="text-emerald-400" size={18} />}
                />
                <ImpactItem 
                  label="AI Assistant Queries" 
                  value={data?.impact.chatbotEngagement.value} 
                  sub="User guidance sessions"
                  icon={<MessageSquare className="text-blue-400" size={18} />}
                />
                
                <div className="pt-6 border-t border-white/5">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-400">Core Network Reach</span>
                    <span className="text-2xl font-bold text-white">{data?.impact.consortiumReach.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-300 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${data?.impact.consortiumReach.percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-bold">Consortium country ratio</p>
                </div>
             </div>
          </GlassBox>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassBox title="Linguistic Diversity" icon={<Globe />}>
            <div className="h-[300px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.languages} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="lang" 
                    type="category" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    width={80}
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  />
                  <Bar 
                    dataKey="users" 
                    fill="#00897b" 
                    radius={[0, 4, 4, 0]} 
                    barSize={20}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassBox>

          <GlassBox title="Project Reach Distribution" icon={<PieChart icon={<BarChart3 />} />}>
            <div className="h-[300px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.countries.slice(0, 5)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="users"
                    nameKey="country"
                    animationBegin={500}
                  >
                    {data?.countries.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 flex-wrap mt-4">
                {data?.countries.slice(0, 5).map((entry, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">{entry.country}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassBox>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, subtitle }) => {
  const isPositive = trend >= 0;
  
  return (
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-1 hover:border-emerald-500/30">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 border border-white/5">
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
          isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white tracking-tight">{value?.toLocaleString()}</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-2 font-medium uppercase tracking-wider">{subtitle}</p>
        
        {/* Micro Sparkline Simulation */}
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 delay-300 ${isPositive ? 'bg-emerald-500' : 'bg-red-500'}`} 
               style={{ width: `${60 + (trend / 2)}%` }}></div>
        </div>
      </div>
    </div>
  );
};

const GlassBox = ({ title, icon, children, className = "" }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] overflow-hidden relative ${className}`}>
    <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
       {icon && <div className="scale-[3] transform opacity-20">{icon}</div>}
    </div>
    <div className="relative">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  </div>
);

const ImpactItem = ({ label, value, sub, icon }) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-colors">
    <div className="p-3 rounded-xl bg-white/5">
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-xl font-bold text-white tracking-tight">{value?.toLocaleString()}</p>
      <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
    </div>
  </div>
);

export default Analytics;
