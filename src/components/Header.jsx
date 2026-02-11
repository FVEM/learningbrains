import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import logo from '../assets/images/logo-transparent.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'it', name: 'Italiano' },
        { code: 'sk', name: 'Slovenčina' },
        { code: 'de', name: 'Deutsch' },
        { code: 'pt', name: 'Português' },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLangOpen(false);
    };

    const navItems = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.results'), path: '/results' },
        { name: t('nav.partners'), path: '/partners' },
        { name: t('nav.news'), path: '/news' },
        { name: t('nav.resources'), path: '/resources' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <nav className="container-custom flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] group">
                    <img src={logo} alt="Learning Brains" className="h-8 md:h-10 w-auto group-hover:scale-105 transition-transform" />
                    <span className="font-bold text-slate-800 text-lg hidden sm:block tracking-tight">Learning Brains</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-sm font-semibold tracking-wide hover:text-brand-secondary transition-colors ${location.pathname === item.path ? 'text-brand-primary' : 'text-slate-600'}`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <div className="relative ml-4">
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-brand-secondary transition-all border border-slate-100"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">{i18n.language}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {langOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full text-left px-4 py-2 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors ${i18n.language === lang.code ? 'text-brand-primary bg-teal-50' : 'text-slate-600'}`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={() => setLangOpen(!langOpen)}
                        className="px-2 py-1 bg-slate-50 rounded-lg text-slate-600"
                    >
                        <Globe className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-brand-primary">
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-4 duration-300">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-lg font-bold ${location.pathname === item.path ? 'text-brand-primary' : 'text-slate-600'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}

            {/* Mobile Language Selection */}
            {langOpen && !isOpen && (
                <div className="lg:hidden absolute top-full right-4 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left px-5 py-3 text-sm font-semibold rounded-xl ${i18n.language === lang.code ? 'text-brand-primary bg-teal-50' : 'text-slate-600'}`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
