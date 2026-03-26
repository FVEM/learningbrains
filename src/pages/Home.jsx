import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  ExternalLink, 
  Globe, 
  Database, 
  Network, 
  Activity,
  Cpu,
  Brain,
  ShieldCheck,
  Zap,
  BarChart3,
  Calendar,
  MessageSquare,
  Newspaper,
  Terminal,
  PlayCircle
} from 'lucide-react';

const Home = () => {
  const { t, i18n } = useTranslation();
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Memoize news items to ensure stability
  const newsItems = useMemo(() => {
    const rawItems = t('i18n.news.items_list', { returnObjects: true });
    return Array.isArray(rawItems) ? rawItems : [];
  }, [t, i18n.language]);

  const stats = [
    { label: t('home.stats.partners'), value: '12', icon: Globe, color: 'text-blue-400' },
    { label: t('home.stats.countries'), value: '6', icon: Network, color: 'text-purple-400' },
    { label: t('home.stats.budget'), value: '€2.5M+', icon: Database, color: 'text-emerald-400' },
    { label: t('home.stats.duration'), value: '36', icon: Activity, color: 'text-rose-400' },
  ];

  const features = [
    {
      title: t('home.features.ai.title'),
      desc: t('home.features.ai.desc'),
      icon: Brain,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30'
    },
    {
      title: t('home.features.security.title'),
      desc: t('home.features.security.desc'),
      icon: ShieldCheck,
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30'
    },
    {
      title: t('home.features.performance.title'),
      desc: t('home.features.performance.desc'),
      icon: Zap,
      gradient: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30'
    },
    {
      title: t('home.features.analytics.title'),
      desc: t('home.features.analytics.desc'),
      icon: BarChart3,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    let frameId;

    const resize = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const render = () => {
      if (videoRef.current && isVideoReady) {
        ctx.filter = 'contrast(1.1) brightness(0.8) saturate(1.2)';
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        // Add futuristic overlay
        ctx.fillStyle = 'rgba(10, 11, 30, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Scanline effect
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.height; i += 4) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }

        // Mouse glow
        if (isHovering) {
          const gradient = ctx.createRadialGradient(
            mousePos.x, mousePos.y, 0,
            mousePos.x, mousePos.y, 250
          );
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      frameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [isVideoReady, mousePos, isHovering]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className=\"min-h-screen bg-[#05050a] text-white selection:bg-blue-500/30\">
      {/* Hero Section */}
      <section className=\"relative h-screen flex items-center overflow-hidden\">
        <div className=\"absolute inset-0 z-0\">
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}hero-bg.mp4`}
            muted
            loop
            playsInline
            autoPlay
            onCanPlay={() => setIsVideoReady(true)}
            className=\"hidden\"
          />
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className=\"w-full h-full object-cover transition-opacity duration-1000 opacity-60\"
          />
          <div className=\"absolute inset-0 bg-gradient-to-b from-transparent via-[#05050a]/50 to-[#05050a]\" />
        </div>

        <div className=\"container mx-auto px-6 relative z-10\">
          <div className=\"max-w-4xl\">
            <div className=\"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 animate-fade-in\">
              <Zap size={14} className=\"animate-pulse\" />
              {t('home.hero.badge')}
            </div>
            
            <h1 className=\"text-6xl md:text-8xl font-bold font-heading leading-tight mb-8 tracking-tight\">
              {t('home.hero.title_start')}{' '}
              <span className=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400\">
                {t('home.hero.title_accent')}
              </span>
              <br />
              {t('home.hero.title_end')}
            </h1>
            
            <p className=\"text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed\">
              {t('home.hero.description')}
            </p>

            <div className=\"flex flex-wrap gap-4\">
              <Link 
                to=\"/project\"
                className=\"group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 overflow-hidden\"
              >
                <div className=\"absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700\" />
                {t('home.hero.cta_primary')}
                <ArrowRight size={20} className=\"group-hover:translate-x-1 transition-transform\" />
              </Link>
              <button className=\"px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all duration-300 border border-white/10 flex items-center gap-2\">
                {t('home.hero.cta_secondary')}
                <PlayCircle size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className=\"absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30\">
          <ChevronRight size={32} className=\"rotate-90\" />
        </div>
      </section>

      {/* Stats Section */}
      <section className=\"py-20 border-y border-white/5 bg-[#080812]\">
        <div className=\"container mx-auto px-6\">
          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-8\">
            {stats.map((stat, idx) => (
              <div key={idx} className=\"text-center group\">
                <div className={`inline-flex p-3 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <div className=\"text-3xl font-bold mb-1\">{stat.value}</div>
                <div className=\"text-sm text-gray-500 uppercase tracking-wider\">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className=\"py-32 relative overflow-hidden\">
        <div className=\"absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full\" />
        <div className=\"absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full\" />
        
        <div className=\"container mx-auto px-6\">
          <div className=\"text-center max-w-3xl mx-auto mb-20\">
            <h2 className=\"text-4xl md:text-5xl font-bold mb-6\">{t('home.features.section_title')}</h2>
            <p className=\"text-gray-400 text-lg\">{t('home.features.section_desc')}</p>
          </div>

          <div className=\"grid md:grid-cols-2 lg:grid-cols-4 gap-6\">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={`p-8 rounded-3xl bg-white/5 border ${feature.border} hover:bg-white/10 transition-all duration-500 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className=\"relative z-10\">
                  <div className=\"w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/20 transition-colors\">
                    <feature.icon size={24} className=\"text-blue-400 group-hover:scale-110 transition-transform\" />
                  </div>
                  <h3 className=\"text-xl font-bold mb-3\">{feature.title}</h3>
                  <p className=\"text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors\">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className=\"py-32 bg-[#080812]\">
        <div className=\"container mx-auto px-6\">
          <div className=\"flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16\">
            <div className=\"max-w-2xl\">
              <div className=\"inline-flex items-center gap-2 text-blue-400 font-medium mb-4\">
                <Newspaper size={20} />
                {t('i18n.news.section_badge')}
              </div>
              <h2 className=\"text-4xl md:text-5xl font-bold\">{t('i18n.news.section_title')}</h2>
            </div>
            <Link 
              to=\"/news\" 
              className=\"inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group\"
            >
              {t('i18n.news.view_all')}
              <ArrowRight size={20} className=\"group-hover:translate-x-1 transition-transform\" />
            </Link>
          </div>

          <div className=\"grid md:grid-cols-3 gap-8\">
            {newsItems && newsItems.length > 0 ? (
              newsItems.slice(0, 3).map((item, idx) => (
                <div 
                  key={idx}
                  className=\"group bg-[#05050a] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500\"
                >
                  <div className=\"relative aspect-[16/9] overflow-hidden\">
                    <img 
                      src={`${import.meta.env.BASE_URL}news/${item.image || 'default-news.jpg'}`} 
                      alt={item.title}
                      className=\"w-full h-full object-cover transition-transform duration-700 group-hover:scale-110\"
                    />
                    <div className=\"absolute top-4 left-4\">
                      <span className=\"px-3 py-1 bg-[#05050a]/80 backdrop-blur-md rounded-full text-xs font-medium border border-white/10\">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className=\"p-8\">
                    <div className=\"flex items-center gap-3 text-sm text-gray-500 mb-4 font-mono\">
                      <Calendar size={14} />
                      {item.date}
                    </div>
                    <h3 className=\"text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors line-clamp-2\">
                      {item.title}
                    </h3>
                    <p className=\"text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3\">
                      {item.description}
                    </p>
                    <a 
                      href={item.link}
                      target=\"_blank\"
                      rel=\"noopener noreferrer\"
                      className=\"inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:gap-3 transition-all\"
                    >
                      READ FULL ARTICLE
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className=\"col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl\">
                <div className=\"inline-flex p-4 rounded-2xl bg-white/5 mb-4\">
                  <Terminal size={32} className=\"text-gray-600\" />
                </div>
                <p className=\"text-gray-500\">No news articles available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=\"py-32 relative overflow-hidden\">
        <div className=\"container mx-auto px-6 relative z-10\">
          <div className=\"bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden relative group\">
            <div className=\"absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700\" />
            <div className=\"absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-1000\" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <div className=\"relative z-10 max-w-3xl mx-auto\">
              <h2 className=\"text-4xl md:text-6xl font-bold mb-8 leading-tight\">
                Ready to explore the future of brain research?
              </h2>
              <p className=\"text-blue-100 text-xl mb-12 opacity-90\">
                Join our network of researchers and institutions dedicated to advancing clinical research through technology.
              </p>
              <div className=\"flex flex-wrap justify-center gap-6\">
                <button className=\"px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all hover:scale-105\">
                  Schedule Demo
                </button>
                <button className=\"px-10 py-5 bg-blue-700/30 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-blue-700/40 transition-all\">
                  Contact Project Manager
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Banner */}
      <section className=\"py-12 border-t border-white/5\">
        <div className=\"container mx-auto px-6\">
          <div className=\"flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500\">
            <div className=\"flex items-center gap-2 font-heading font-black italic\">PARTNER 01</div>
            <div className=\"flex items-center gap-2 font-heading font-black italic\">PARTNER 02</div>
            <div className=\"flex items-center gap-2 font-heading font-black italic\">PARTNER 03</div>
            <div className=\"flex items-center gap-2 font-heading font-black italic\">PARTNER 04</div>
            <div className=\"flex items-center gap-2 font-heading font-black italic\">PARTNER 05</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
