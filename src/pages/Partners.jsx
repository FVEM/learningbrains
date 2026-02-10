import { useTranslation } from 'react-i18next';
import { Users, Globe, ExternalLink, ChevronRight } from 'lucide-react';

const Partners = () => {
    const { t } = useTranslation();

    const partners = [
        {
            name: "Federación Vizcaína de Empresas del Metal (FVEM)",
            role: "Coordinator",
            country: "Spain",
            description: "A leading industrial federation representing more than 800 companies in the metal sector, committed to innovation and training.",
            logo: "FVEM",
            logoSrc: "/FVEM-EN.jpg",
            website: "https://www.fvem.es"
        },
        {
            name: "Confindustria Veneto SIAV S.r.l",
            role: "Partner",
            country: "Italy",
            description: "The service company of Confindustria Veneto, specialized in training, innovation, and organizational development for regional companies.",
            logo: "SIAV",
            website: "https://www.siav.net/wp/"
        },
        {
            name: "Wirtschaftskammer Steiermark (WKO)",
            role: "Partner",
            country: "Austria",
            description: "Representing the interests of the Styrian business community and providing extensive educational and training support services.",
            logo: "WKO",
            website: "https://www.wko.at/"
        },
        {
            name: "Media Creativa 2020, S.L.",
            role: "Partner",
            country: "Spain",
            description: "Experts in the design and implementation of innovative pedagogical methodologies and digital learning environments.",
            logo: "Media Creativa",
            logoSrc: "/Media Creativa 2020.jpg",
            website: "https://mediacreativa.eu/"
        },
        {
            name: "Slovak Business Agency (SBA)",
            role: "Partner",
            country: "Slovakia",
            description: "The primary agency for the support of small and medium-sized enterprises in Slovakia, fostering entrepreneurship and skills development.",
            logo: "SBA",
            logoSrc: "/sba.jpg",
            website: "https://www.sbagency.sk/"
        },
        {
            name: "Sparkling Intuition",
            role: "Partner",
            country: "Portugal",
            description: "Dedicated to human resources development and innovative training solutions for the modern labor market.",
            logo: "Sparkling Intuition",
            logoSrc: "/SPIN logo large.png",
            website: "https://sparkling-intuition.eu/"
        }
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Users className="w-3 h-3" />
                        Transnational Collaboration
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">Our Partners</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Learning Brains is a transnational partnership bringing together industrial associations, business support agencies, and training experts from across Europe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map((partner, idx) => (
                        <div key={idx} className="group bg-white border border-slate-100 rounded-2xl p-8 flex flex-col h-full hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300">
                            <div className="h-24 flex items-center mb-8 grayscale group-hover:grayscale-0 transition-all">
                                {partner.logoSrc ? (
                                    <img src={partner.logoSrc} alt={partner.name} className="h-full w-auto object-contain max-w-[180px]" />
                                ) : (
                                    <div className="text-2xl font-black text-slate-200 uppercase tracking-tighter group-hover:text-brand-secondary/20 transition-colors">
                                        {partner.logo}
                                    </div>
                                )}
                            </div>

                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${partner.role === 'Coordinator' ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        {partner.role}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-teal-50 text-brand-secondary flex items-center gap-1">
                                        <Globe className="w-3 h-3" />
                                        {partner.country}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 leading-snug group-hover:text-brand-primary transition-colors">
                                    {partner.name}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    {partner.description}
                                </p>
                            </div>

                            <a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit official website of ${partner.name}`}
                                className="mt-auto pt-6 border-t border-slate-50 text-[13px] font-bold text-slate-400 hover:text-brand-secondary flex items-center justify-between group/link transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    View Organization
                                    <ExternalLink className="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                </span>
                                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
