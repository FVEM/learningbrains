import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'sk', name: 'Slovenčina' },
        { code: 'it', name: 'Italiano' },
        { code: 'de', name: 'Deutsch' },
        { code: 'pt', name: 'Português' }
    ];

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.results'), path: '/results' },
        { name: t('nav.partners'), path: '/partners' },
        { name: t('nav.news'), path: '/news' },
        { name: t('nav.resources'), path: '/resources' },
        { name: t('nav.impact'), path: '/impact' },
        { name: t('nav.contact'), path: '/contact' }
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-6'}`}>
            <div className="container-custom flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:scale-105 transition-transform">
                        LB
                    </div>
                    <div>
                        <span className="block text-lg md:text-xl font-black text-brand-primary tracking-tighter leading-none group-hover:text-brand-secondary transition-colors uppercase">Learning Brains</span>
                        <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">Erasmus+ Project</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${location.pathname === link.path ? 'text-brand-secondary bg-teal-50' : 'text-slate-500 hover:text-brand-primary hover:bg-slate-50'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="ml-4 pl-4 border-l border-slate-100 flex items-center gap-3">
                        <div className="relative group/lang">
                            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors uppercase">
                                <Globe className="w-3.5 h-3.5" />
                                {i18n.language}
                                <ChevronDown className="w-3 h-3 opacity-50" />
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full px-4 py-2.5 text-left text-xs font-bold hover:bg-slate-50 transition-colors ${i18n.language === lang.code ? 'text-brand-secondary bg-teal-50/50' : 'text-slate-600'}`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>

                <button className="xl:hidden p-2 text-brand-primary hover:bg-slate-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`xl:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <nav className="p-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            onClick={() => setIsMenuOpen(false)}
                            className={`block p-4 rounded-xl text-base font-bold ${location.pathname === link.path ? 'bg-teal-50 text-brand-secondary' : 'text-slate-600 active:bg-slate-50'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Select Language</p>
                        <div className="grid grid-cols-2 gap-2 p-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`p-3 rounded-lg text-sm font-bold text-center border transition-all ${i18n.language === lang.code ? 'border-brand-secondary bg-teal-50 text-brand-secondary' : 'border-slate-100 text-slate-500 active:bg-slate-50'}`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
