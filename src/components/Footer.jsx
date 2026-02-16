import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail, ExternalLink, Facebook, Instagram } from 'lucide-react';
const euEmblem = `${import.meta.env.BASE_URL}eu-emblem.png`;
const logo = `${import.meta.env.BASE_URL}learning-brains-logo-transparent-cropped.png`;

const Footer = () => {
    const { t, i18n } = useTranslation();

    const sections = [
        {
            title: t('footer.section_project'),
            links: [
                { name: t('nav.about'), path: '/about' },
                { name: t('nav.results'), path: '/results' },
            ]
        },
        {
            title: t('footer.section_community'),
            links: [
                { name: t('nav.partners'), path: '/partners' },
                { name: t('nav.news'), path: '/news' },
                { name: t('nav.resources'), path: '/resources' },
            ]
        },
        {
            title: t('footer.section_legal'),
            links: [
                { name: t('footer.privacy'), path: '#' },
                { name: t('footer.cookies'), path: '#' },
                { name: t('footer.transparency'), path: '#' },
            ]
        }
    ];

    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-12 font-body text-slate-600">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
                    {/* Brand */}
                    <div className="lg:col-span-4">
                        <Link to={`/${i18n.language}`} className="flex items-center mb-6">
                            <img src={logo} alt="Learning Brains" className="h-12 w-auto" />
                        </Link>
                        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-sm font-normal">
                            {t('footer.description')}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-all" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-all" aria-label="Facebook">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-all" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <Link to={`/${i18n.language}/contact`} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all" aria-label="Contact">
                                <Mail className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {sections.map((section, idx) => (
                            <div key={idx}>
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 font-heading">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link
                                                to={link.path.startsWith('/') ? `/${i18n.language}${link.path}` : link.path}
                                                className="text-[14px] text-slate-500 hover:text-primary-green transition-colors flex items-center group font-medium"
                                            >
                                                {link.name}
                                                {link.path === '#' && <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50" />}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Erasmus+ Acknowledgement */}
                <div className="pt-12 border-t border-slate-100">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="flex flex-col sm:flex-row items-center gap-6 max-w-3xl">
                            <img src={euEmblem} alt="Co-funded by the Erasmus+ Programme of the European Union" className="h-14 w-auto flex-shrink-0" />
                            <p className="text-[12px] text-slate-400 leading-relaxed text-center sm:text-left font-medium">
                                {t('footer.disclaimer')}
                            </p>
                        </div>
                        <div className="text-[12px] font-bold text-slate-300 tracking-wider font-heading">
                            VET PARTNERSHIP &copy; {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
