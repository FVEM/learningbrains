import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen, Users, Cpu, Target, Rocket, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const logo = `${import.meta.env.BASE_URL}learning-brains-logo-transparent-cropped.png`;

const Home = () => {
    const { t } = useTranslation();

    const stats = [
        { label: "Programme", value: "Erasmus+ KA220-VET", icon: BookOpen },
        { label: "Duration", value: "24 Months", icon: Target },
        { label: "Focus", value: "Industrial Reskilling", icon: Cpu }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-1000">
                            <img src={logo} alt="Learning Brains" className="h-32 md:h-40 mx-auto mb-6 object-contain" />
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-xs font-bold uppercase tracking-wider">
                                <Rocket className="w-3 h-3" />
                                Erasmus+ Cooperation Partnership
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-primary leading-[1.1] mb-8 tracking-tight">
                            {t('home.hero_title')}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                            {t('home.hero_subtitle')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/about" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-teal-900/20 hover:bg-brand-secondary transition-all hover:-translate-y-1 flex items-center">
                                {t('home.cta')}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link to="/partners" className="px-8 py-4 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
                                Meet our Partners
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 blur-[120px] rounded-full"></div>
                </div>
            </section>

            {/* Partner Logos Strip */}
            <section className="py-8 border-y border-slate-100 bg-white overflow-hidden">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                        <a href="https://www.fvem.es" target="_blank" rel="noopener noreferrer" aria-label="Visit FVEM website" className="hover:scale-110 transition-transform">
                            <img src={`${import.meta.env.BASE_URL}FVEM-EN.jpg`} alt="FVEM" className="h-8 md:h-12 w-auto object-contain" />
                        </a>
                        <a href="https://mediacreativa.eu/" target="_blank" rel="noopener noreferrer" aria-label="Visit Media Creativa website" className="hover:scale-110 transition-transform">
                            <img src={`${import.meta.env.BASE_URL}Media Creativa 2020.jpg`} alt="Media Creativa" className="h-8 md:h-12 w-auto object-contain" />
                        </a>
                        <a href="https://www.sbagency.sk/" target="_blank" rel="noopener noreferrer" aria-label="Visit Slovak Business Agency website" className="hover:scale-110 transition-transform">
                            <img src={`${import.meta.env.BASE_URL}sba.jpg`} alt="Slovak Business Agency" className="h-8 md:h-12 w-auto object-contain" />
                        </a>
                        <a href="https://sparkling-intuition.eu/" target="_blank" rel="noopener noreferrer" aria-label="Visit Sparkling Intuition website" className="hover:scale-110 transition-transform">
                            <img src={`${import.meta.env.BASE_URL}SPIN logo large.png`} alt="Sparkling Intuition" className="h-8 md:h-12 w-auto object-contain" />
                        </a>
                        <a href="https://www.siav.net/wp/" target="_blank" rel="noopener noreferrer" aria-label="Visit Confindustria Veneto SIAV website" className="hover:scale-110 transition-transform">
                            <img src={`${import.meta.env.BASE_URL}Conf.Veneto SIAV logo.png`} alt="Confindustria Veneto SIAV" className="h-8 md:h-12 w-auto object-contain" />
                        </a>
                        {/* Placeholder for WKO Austria logo - to be added */}
                    </div>
                </div>
            </section>

            {/* Key Facts */}
            <section className="py-24 bg-slate-50/50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-teal-50 text-brand-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
                                <div className="text-xl font-bold text-brand-primary">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Introduction Preview */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6 leading-tight">
                                    Empowering the industrial workforce through AI and on-the-job training.
                                </h2>
                                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                                    Learning Brains is dedicated to bridging the gap between traditional vocational education and the rapidly evolving industrial landscape. By integrating advanced learning systems directly into the workplace, we ensure a sustainable future for European manufacturing.
                                </p>
                                <Link to="/about" className="text-brand-secondary font-bold inline-flex items-center group">
                                    Learn more about our mission
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                            <div className="flex-1 w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent"></div>
                                {/* Placeholder for project image */}
                                <div className="absolute inset-0 flex items-center justify-center p-12">
                                    <img src={logo} alt="Project Logo" className="w-full h-full object-contain opacity-10 scale-150" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Preview */}
            <section className="py-24 bg-brand-primary text-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Updates</h2>
                            <p className="text-teal-100/70">Follow our journey and project milestones.</p>
                        </div>
                        <Link to="/news" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors font-bold">
                            View All News
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <a
                            href="https://www.linkedin.com/feed/update/urn:li:activity:7426532433669361664"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1 block"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-teal-300 text-[10px] font-bold uppercase tracking-widest">Kick-off Meeting</div>
                                <Linkedin className="w-4 h-4 text-teal-300/50 group-hover:text-teal-300 transition-colors" />
                            </div>
                            <h4 className="text-xl font-bold mb-4 group-hover:text-teal-300 transition-colors">Launching Learning Brains in Bilbao</h4>
                            <p className="text-teal-100/60 text-sm mb-6 leading-relaxed">
                                The project officially started with all European partners gathering at the FVEM headquarters.
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="text-xs text-white/40">February 2026</div>
                                <div className="text-xs font-bold text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    View on LinkedIn
                                    <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </a>
                        {/* More news could go here */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
