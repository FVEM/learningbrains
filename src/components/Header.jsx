import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import logo from '../assets/images/logo.jpg';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'sk', name: 'Slovenčina' },
        { code: 'it', name: 'Italiano' },
        { code: 'de', name: 'Deutsch' },
        { code: 'pt', name: 'Português' },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsMenuOpen(false);
    };

    const navItems = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.results'), path: '/results' },
        { name: t('nav.partners'), path: '/partners' },
        { name: t('nav.news'), path: '/news' },
        { name: t('nav.resources'), path: '/resources' },
        { name: t('nav.impact'), path: '/impact' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={logo} alt="Learning Brains" className="h-8 md:h-10 w-auto group-hover:scale-105 transition-transform" />
                        <span className="font-bold text-slate-800 text-lg hidden sm:block tracking-tight">Learning Brains</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex space-x-1 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 text-[14.5px] tracking-tight transition-all duration-200 rounded-xl ${isActive(item.path)
                                    ? 'text-slate-900 bg-slate-100 font-bold'
                                    : 'text-slate-500 font-medium hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Language Selector (Desktop) */}
                    <div className="hidden xl:flex items-center ml-4 border-l border-slate-100 pl-4">
                        <div className="relative group">
                            <button className="flex items-center text-slate-500 hover:text-slate-900 text-[13px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors">
                                <Globe className="w-4 h-4 mr-2" />
                                {i18n.language}
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-2xl shadow-teal-900/10 rounded-2xl overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-2 space-y-1">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-[13px] rounded-xl transition-colors ${i18n.language === lang.code
                                                ? 'text-slate-900 font-bold bg-slate-100'
                                                : 'text-slate-500 font-medium hover:bg-slate-50'
                                                }`}
                                        >
                                            {lang.name}
                                            {i18n.language === lang.code && <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="xl:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="xl:hidden py-4 border-t border-slate-50 animate-in slide-in-from-top duration-300">
                        <nav className="flex flex-col space-y-1 p-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-3 text-[15px] font-bold rounded-xl transition-all ${isActive(item.path)
                                        ? 'text-slate-900 bg-slate-100'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    Select Language
                                </p>
                                <div className="grid grid-cols-2 gap-2 px-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`text-left text-[13px] py-3 px-4 rounded-xl transition-colors font-bold ${i18n.language === lang.code
                                                ? 'text-slate-900 bg-slate-100'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
