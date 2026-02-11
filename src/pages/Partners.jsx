import { useTranslation } from 'react-i18next';
import { Users, Globe, ExternalLink, ChevronRight } from 'lucide-react';

const Partners = () => {
    const { t } = useTranslation();

    const partners = [
        {
            name: "Federación Vizcaína de Empresas del Metal (FVEM)",
            role: "Coordinator",
            country: "Spain",
            description: "A leading industrial federation representing more than 800 companies in the metal sector.",
            logo: "FVEM",
            website: "https://www.fvem.es"
        },
        {
            name: "Confindustria Veneto SIAV S.r.l",
            role: "Partner",
            country: "Italy",
            description: "Specialized in training and innovation for regional companies.",
            logo: "SIAV",
            website: "https://www.siav.net/wp/"
        }
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-brand-primary text-center mb-16">Our Partners</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {partners.map((partner, idx) => (
                        <div key={idx} className="border border-slate-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-bold mb-4">{partner.name}</h3>
                            <p className="text-slate-500 mb-6">{partner.description}</p>
                            <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-brand-secondary font-bold flex items-center gap-2">
                                Visit Website <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
