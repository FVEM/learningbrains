import { useTranslation } from 'react-i18next';
import { Share2, TrendingUp, Target, Info } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Impact = () => {
    useTranslation();

    const targetAudiences = [
        "Industrial Workers",
        "VET Training Centers",
        "Manufacturing SMEs",
        "Policymakers",
        "Social Partners",
        "Research Community"
    ];

    return (
        <div className="py-20 bg-white">
            <SEOHead
                title="Project Influence & Impact"
                description="Understanding how Learning Brains contributes to vocational education and industrial reskilling."
                path="/impact"
            />
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                        <TrendingUp className="w-3 h-3" />
                        Dissemination & Impact
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">Project Influence</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Understanding how Learning Brains contributes to the modernization of European vocational education and industrial reskilling.
                    </p>
                </div>

                <div className="space-y-20">
                    <section>
                        <div className="flex items-center gap-3 mb-8 text-brand-primary">
                            <Share2 className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Dissemination Strategy</h2>
                        </div>
                        <p className="text-slate-500 text-[17px] leading-relaxed mb-6">
                            Our strategy is focused on reaching key stakeholders across Europe to ensure the project results are widely known and utilized. We use a multi-channel approach including this digital hub, sectoral social media, regional industrial events, and transnational workshops.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-8 text-brand-primary">
                            <Target className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Target Audiences</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {targetAudiences.map((audience, idx) => (
                                <div key={idx} className="p-5 border border-slate-100 rounded-2xl shadow-sm text-slate-600 font-bold text-sm bg-white group hover:border-brand-primary/20 hover:text-brand-primary transition-all">
                                    {audience}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-8 text-brand-primary">
                            <TrendingUp className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Expected Impact</h2>
                        </div>
                        <p className="text-slate-500 text-[17px] leading-relaxed mb-8">
                            The Learning Brains project expects to contribute to the modernization of VET systems by providing validated tools for industrial reskilling. The impact will be observed in the improved adaptability of industrial workers to technological changes and the increased efficiency of on-the-job training methodologies.
                        </p>

                        <div className="flex items-start gap-4 p-5 bg-teal-50/50 rounded-2xl border border-teal-100 italic">
                            <Info className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Note: Project impacts are currently described non-quantitatively as the implementation is in its early stages.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Impact;
