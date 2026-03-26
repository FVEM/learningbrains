import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, 
  Brain, 
  Target, 
  Zap, 
  TrendingUp, 
  Clock, 
  Layout, 
  Users,
  MessageSquare,
  Globe,
  ChevronRight,
  ExternalLink,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip
} from 'recharts';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chartData = [
    { name: t('home.chart_label_1', 'Adaptability'), value: 40 },
    { name: t('home.chart_label_1', 'Adaptability'), value: 65 },
    { name: t('home.chart_label_2', 'Training Efficiency'), value: 45 },
    { name: t('home.chart_label_2', 'Training Efficiency'), value: 85 },
    { name: t('home.chart_label_3', 'Learning Speed'), value: 35 },
    { name: t('home.chart_label_3', 'Learning Speed'), value: 92 },
  ];

  const features = t('home.features', { returnObjects: true }) || [];
  const stats = t('home.stats', { returnObjects: true }) || [];
  const impactPoints = [
    t('home.impact_point_1', 'Enhanced Workforce Adaptability'),
    t('home.impact_point_2', 'Modernized VET Curricula'),
    t('home.impact_point_3', 'Stronger Industry-Education Links')
  ];

  const newsItems = t('home.latest_updates.news_items', { returnObjects: true }) || [
    {
      badge: t('home.latest_updates.news_1.badge', 'Meeting'),
      date: t('home.latest_updates.news_1.date', 'Feb 2026 \u00b7 Bilbao, Spain'),
      title: t('home.latest_updates.news_1.title', 'Project Kick-off Meeting'),
      description: t('home.latest_updates.news_1.description', 'Partners met for the first time at FVEM headquarters to discuss the project timeline.'),
      link: t('home.latest_updates.news_1.link', 'Read on LinkedIn')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className=\"min-h-screen bg-white\">
      {/* Hero Section */}
      <section className=\"relative pt-32 pb-20 overflow-hidden\">
        <div className=\"absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 -z-10\" />
        <div className=\"absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)] -z-10\" />
        
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"grid lg:grid-cols-2 gap-12 items-center\">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className=\"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6\">
                <Zap size={14} />
                {t('home.hero_badge', 'ERASMUS+ COOPERATION PARTNERSHIP')}
              </div>
              <h1 className=\"text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight\">
                {t('home.hero_name', 'Learning Brains')}
                <span className=\"block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600\">
                  {t('home.hero_title', 'Real Skills for Real Industry')}
                </span>
              </h1>
              <p className=\"text-xl text-slate-600 mb-10 leading-relaxed max-w-xl\">
                {t('home.hero_subtitle', 'Integrated Work-Based Learning Systems for Industrial Reskilling')}
              </p>
              
              <div className=\"flex flex-wrap gap-4\">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className=\"px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200\"
                >
                  {t('home.cta_primary', 'Learn More')}
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className=\"px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors\"
                >
                  {t('home.cta_secondary', 'Our Partners')}
                </motion.button>
              </div>

              <div className=\"mt-12 flex items-center gap-6\">
                <div className=\"flex -space-x-3\">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className=\"w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center\">
                      <Users size={16} className=\"text-slate-400\" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className=\"text-sm font-bold text-slate-900\">{t('home.partners_count', '6 Strategic Partners')}</div>
                  <div className=\"text-xs text-slate-500\">{t('home.partners_text', 'Across 5 European Countries')}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className=\"relative\"
            >
              <div className=\"relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100\">
                <div className=\"p-8 bg-slate-900\">
                  <div className=\"flex justify-between items-center mb-8\">
                    <div className=\"text-white font-bold\">{t('home.impact_title', 'Project Impact')}</div>
                    <div className=\"flex gap-2\">
                      <div className=\"w-3 h-3 rounded-full bg-red-400\" />
                      <div className=\"w-3 h-3 rounded-full bg-amber-400\" />
                      <div className=\"w-3 h-3 rounded-full bg-green-400\" />
                    </div>
                  </div>
                  <div className=\"h-[300px] w-full\">
                    <ResponsiveContainer width=\"100%\" height=\"100%\">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id=\"colorValue\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">
                            <stop offset=\"5%\" stopColor=\"#3b82f6\" stopOpacity={0.3}/>
                            <stop offset=\"95%\" stopColor=\"#3b82f6\" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray=\"3 3\" stroke=\"#1e293b\" vertical={false} />
                        <XAxis dataKey=\"name\" stroke=\"#64748b\" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke=\"#64748b\" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                        />
                        <Area 
                          type=\"monotone\" 
                          dataKey=\"value\" 
                          stroke=\"#3b82f6\" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill=\"url(#colorValue)\" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className=\"grid grid-cols-2 gap-4 p-6 bg-slate-50\">
                  {stats.map((stat, idx) => (
                    <div key={idx} className=\"bg-white p-4 rounded-xl border border-slate-100 shadow-sm\">
                      <div className=\"text-2xl font-bold text-blue-600\">{stat.value}</div>
                      <div className=\"text-xs font-medium text-slate-500 uppercase tracking-wider\">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className=\"py-24 bg-slate-50\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center max-w-3xl mx-auto mb-16\">
            <div className=\"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4\">
              {t('home.pillars_badge', 'Core Pillars')}
            </div>
            <h2 className=\"text-4xl font-bold text-slate-900 mb-6\">
              {t('home.pillars_title', 'Innovating VET Systems')}
            </h2>
            <p className=\"text-lg text-slate-600\">
              {t('home.pillars_subtitle', 'Learning Brains introduces a new paradigm for industrial training by combining three key elements into a unified framework.')}
            </p>
          </div>

          <div className=\"grid md:grid-cols-3 gap-8\">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className=\"bg-white p-8 rounded-2xl shadow-sm border border-slate-100\"
              >
                <div className=\"w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6\">
                  {idx === 0 ? <Layout size={24} /> : idx === 1 ? <Target size={24} /> : <Brain size={24} />}
                </div>
                <h3 className=\"text-xl font-bold text-slate-900 mb-4\">{feature.title}</h3>
                <p className=\"text-slate-600 leading-relaxed\">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Details Section */}
      <section className=\"py-24 overflow-hidden\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden\">
            <div className=\"absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent -z-0\" />
            
            <div className=\"grid lg:grid-cols-2 gap-12 items-center relative z-10\">
              <div>
                <div className=\"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 uppercase tracking-widest\">
                  {t('home.impact_badge', 'Project Impact')}
                </div>
                <h2 className=\"text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight\">
                  {t('home.impact_title', 'Driving Real Change')}
                </h2>
                <p className=\"text-blue-100/80 text-lg mb-10 leading-relaxed\">
                  {t('home.impact_text', 'We aim to bridge the gap between vocational education and real-world industrial needs through practical, measurable interventions.')}
                </p>
                
                <div className=\"space-y-4\">
                  {impactPoints.map((point, idx) => (
                    <div key={idx} className=\"flex items-center gap-3 text-white\">
                      <div className=\"w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0\">
                        <CheckCircle2 size={14} className=\"text-blue-400\" />
                      </div>
                      <span className=\"font-medium\">{point}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className=\"mt-12 flex items-center gap-2 text-blue-400 font-bold group\"
                >
                  {t('home.impact_cta', 'View Full Impact')}
                  <ChevronRight size={18} className=\"group-hover:translate-x-1 transition-transform\" />
                </motion.button>
              </div>

              <div className=\"grid grid-cols-2 gap-6\">
                <div className=\"space-y-6\">
                  <div className=\"bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10\">
                    <div className=\"text-4xl font-bold text-white mb-2\">85%</div>
                    <div className=\"text-sm text-blue-200 uppercase tracking-widest\">{t('home.metric_label_1', 'Industry Engagement')}</div>
                  </div>
                  <div className=\"bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-900/20\">
                    <div className=\"text-4xl font-bold text-white mb-2\">92%</div>
                    <div className=\"text-sm text-blue-100 uppercase tracking-widest\">{t('home.metric_label_2', 'Training Efficiency')}</div>
                  </div>
                </div>
                <div className=\"pt-12 space-y-6\">
                  <div className=\"bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10\">
                    <div className=\"text-4xl font-bold text-white mb-2\">78%</div>
                    <div className=\"text-sm text-blue-200 uppercase tracking-widest\">{t('home.metric_label_3', 'Job Readiness')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className=\"py-24 bg-white\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6\">
            <div className=\"max-w-xl\">
              <h2 className=\"text-4xl font-bold text-slate-900 mb-4\">
                {t('home.latest_updates.title', 'Latest Updates')}
              </h2>
              <p className=\"text-slate-600 text-lg italic\">
                {t('home.latest_updates.description', 'Milestones, events, and project outcomes of the Learning Brains project.')}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=\"px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors\"
            >
              {t('home.latest_updates.view_all', 'View all news')}
              <ExternalLink size={16} />
            </motion.button>
          </div>

          <div className=\"grid lg:grid-cols-2 gap-8\">
            {newsItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial=\"hidden\"
                whileInView=\"visible\"
                viewport={{ once: true }}
                variants={itemVariants}
                className=\"group\"
              >
                <div className=\"bg-slate-50 rounded-[2rem] p-8 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300\">
                  <div className=\"flex flex-wrap items-center gap-4 mb-6\">
                    <span className=\"px-3 py-1 rounded-full bg-white text-blue-600 text-xs font-bold uppercase tracking-wider border border-slate-100\">
                      {item.badge}
                    </span>
                    <span className=\"flex items-center gap-2 text-slate-500 text-sm italic\">
                      <Calendar size={14} />
                      {item.date}
                    </span>
                  </div>
                  <h3 className=\"text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors\">
                    {item.title}
                  </h3>
                  <p className=\"text-slate-600 leading-relaxed mb-8\">
                    {item.description}
                  </p>
                  <a 
                    href={item.link}
                    target=\"_blank\"
                    rel=\"noopener noreferrer\"
                    className=\"inline-flex items-center gap-2 font-bold text-slate-900 group-hover:gap-3 transition-all\"
                  >
                    {t('home.latest_updates.news_1.link', 'Read on LinkedIn')}
                    <ArrowRight size={18} className=\"text-blue-600\" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
