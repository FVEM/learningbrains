import { useTranslation } from 'react-i18next';
import { Users, Globe, ExternalLink, ChevronRight, Linkedin, Facebook, Youtube } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Partners = () => {
    const { t } = useTranslation();

    const partners = [
        {
            name: "Federación Vizcaína de Empresas del Metal (FVEM)",
            role: "Coordinator",
            country: "Spain",
            logo: "FVEM",
            logoSrc: "/FVEM-EN.jpg",
            website: "https://www.fvem.es",
            linkedin: "https://www.linkedin.com/company/fvem/"
        },
        {
            name: "Confindustria Veneto SIAV S.r.l",
            role: "Partner",
            country: "Italy",
            logo: "SIAV",
            logoSrc: "/Conf.Veneto SIAV logo.png",
            website: "https://www.siav.net/wp/",
            linkedin: "https://www.linkedin.com/company/confindustriavenetosiav/"
        },
        {
            name: "Wirtschaftskammer Steiermark (WKO)",
            role: "Partner",
            country: "Austria",
            logo: "WKO",
            logoSrc: "/room-466-logo-blau-transparent-300dpi.png",
            website: "https://www.wko.at/",
            linkedin: "https://www.linkedin.com/company/room466/"
        },
        {
            name: "Media Creativa 2020, S.L.",
            role: "Partner",
            country: "Spain",
            logo: "Media Creativa",
            logoSrc: "/Media Creativa 2020.jpg",
            website: "https://mediacreativa.eu/",
            linkedin: "https://www.linkedin.com/company/mediacreativa/"
        },
        {
            name: "Slovak Business Agency (SBA)",
            role: "Partner",
            country: "Slovakia",
            logo: "SBA",
            logoSrc: "/sba.jpg",
            website: "https://www.sbagency.sk/",
            linkedin: "https://www.linkedin.com/company/slovakbusinessagency/",
            facebook: "https://www.facebook.com/SlovakBusinessAgency",
            youtube: "https://www.youtube.com/user/NarodnaAgentura"
        },
        {
            name: "Sparkling Intuition",
            role: "Partner",
            country: "Portugal",
            logo: "Sparkling Intuition",
            logoSrc: "/SPIN logo large.png",
            website: "https://sparkling-intuition.eu/",
            linkedin: "https://www.linkedin.com/company/sparkling-intuition/"
        }
    ];

    const partnerDescriptions = t('partners.descriptions', { returnObjects: true });

    return (
        <div className="py-20">
            <SEOHead
                title={t('partners.seo_title')}
                description={t('partners.seo_description')}
                path="/partners"
            />
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Users className="w-3 h-3" />
                        {t('partners.label')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-6 tracking-tight">{t('partners.title')}</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('partners.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
                    {partners.map((partner, idx) => (
                        <div key={idx} className="group bg-white border border-slate-100 rounded-2xl p-8 flex flex-col h-full hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300">
                            <div className="h-24 flex items-center mb-8 grayscale group-hover:grayscale-0 transition-all">
                                {partner.logoSrc ? (
                                    <img
                                        src={partner.logoSrc.startsWith('http') ? partner.logoSrc : `${import.meta.env.BASE_URL}${partner.logoSrc.replace(/^\//, '')}`}
                                        alt={partner.name}
                                        className="h-full w-auto object-contain max-w-[180px]"
                                    />
                                ) : (
                                    <div className="text-2xl font-black text-slate-200 uppercase tracking-tighter group-hover:text-brand-secondary/20 transition-colors">
                                        {partner.logo}
                                    </div>
                                )}
                            </div>

                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${partner.role === 'Coordinator' ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        {t(`partners.roles.${partner.role}`, partner.role)}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-teal-50 text-brand-secondary flex items-center gap-1">
                                        <Globe className="w-3 h-3" />
                                        {t(`partners.countries.${partner.country}`, partner.country)}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 leading-snug group-hover:text-brand-primary transition-colors">
                                    {partner.name}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    {partnerDescriptions[idx]}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit official website of ${partner.name}`}
                                    className="text-[13px] font-bold text-slate-400 hover:text-brand-secondary flex items-center gap-2 group/link transition-all"
                                >
                                    {t('partners.view_org')}
                                    <ExternalLink className="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                </a>

                                {partner.linkedin && (
                                    <div className="flex gap-2">
                                        <a
                                            href={partner.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit LinkedIn profile of ${partner.name}`}
                                            className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                        {partner.facebook && (
                                            <a
                                                href={partner.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit Facebook profile of ${partner.name}`}
                                                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                                            >
                                                <Facebook className="w-4 h-4" />
                                            </a>
                                        )}
                                        {partner.youtube && (
                                            <a
                                                href={partner.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit Youtube channel of ${partner.name}`}
                                                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF0000] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                                            >
                                                <Youtube className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
