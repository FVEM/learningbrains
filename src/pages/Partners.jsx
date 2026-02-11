import { useTranslation } from 'react-i18next';
import { Users, ExternalLink, Globe } from 'lucide-react';

const Partners = () => {
    const { t } = useTranslation();

    const partners = [
        {
            name: "Federación Vizcaína de Empresas del Metal (FVEM)",
            role: "Coordinator",
            country: "Spain",
            description: "A leading industrial federation representing more than 800 companies in the metal sector.",
            logoSrc: "/FVEM-EN.jpg",
            website: "https://www.fvem.es"
        },
        {
            name: "Confindustria Veneto SIAV S.r.l",
            role: "Partner",
            country: "Italy",
            description: "Specialized in training and innovation for regional companies.",
            logoSrc: "/Conf.Veneto SIAV logo.png",
            website: "https://www.siav.net/wp/"
        },
        {
            name: "Wirtschaftskammer Steiermark (WKO)",
            role: "Partner",
            country: "Austria",
            description: "Representing the interests of the Styrian business community.",
            website: "https://www.wko.at/"
        },
        {
            name: "Media Creativa 2020, S.L.",
            role: "Partner",
            country: "Spain",
            description: "Experts in pedagogical methodologies and digital learning.",
            logoSrc: "/Media Creativa 2020.jpg",
            website: "https://mediacreativa.eu/"
        },
        {
            name: "Slovak Business Agency (SBA)",
            role: "Partner",
            country: "Slovakia",
            description: "Primary agency for SME support in Slovakia.",
            logoSrc: "/sba.jpg",
            website: "https://www.sbagency.sk/"
        },
        {
            name: "Sparkling Intuition",
            role: "Partner",
            country: "Portugal",
            description: "Human resources development and training solutions.",
            logoSrc: "/SPIN logo large.png",
            website: "https://sparkling-intuition.eu/"
        }
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-primary text-center mb-20 tracking-tight">Our Partners</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map((partner, idx) => (
                        <div key={idx} className="group border border-slate-100 rounded-2xl p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300">
                            <div className="h-24 flex items-center mb-8 grayscale group-hover:grayscale-0 transition-all">
                                {partner.logoSrc ? <img src={partner.logoSrc} alt={partner.name} className="h-full w-auto object-contain max-w-[180px]" /> : <div className="text-2xl font-black text-slate-200 uppercase tracking-tighter">{partner.name.split(' (')[0]}</div>}
                            </div>
                            <div className="flex-grow">
                                <div className="flex gap-2 mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-slate-100 text-slate-500">{partner.role}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-teal-50 text-brand-secondary flex items-center gap-1"><Globe className="w-3 h-3" />{partner.country}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4">{partner.name}</h3>
                                <p className="text-slate-500 text-sm mb-6">{partner.description}</p>
                            </div>
                            <a href={partner.website} target="_blank" rel="noreferrer" className="mt-auto pt-6 border-t border-slate-50 text-[13px] font-bold text-brand-secondary flex items-center gap-2">Visit Organization <ExternalLink className="w-3 h-3" /></a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
