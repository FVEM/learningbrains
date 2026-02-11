import { useTranslation } from 'react-i18next';
import { Clock, CheckCircle2, FileText } from 'lucide-react';

const Results = () => {
    const { t } = useTranslation();

    const plannedResults = [
        "European Industrial Reskilling Framework",
        "Handbook for On-the-job Mentoring",
        "AI-Powered Learning Path Generator",
        "Transnational Policy Recommendations"
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-primary text-center mb-16 tracking-tight">Project Results</h1>
                
                <div className="space-y-16">
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <CheckCircle2 className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-2xl font-bold text-brand-primary">Available Results</h2>
                        </div>
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-16 text-center text-slate-400 italic font-medium">
                            No results have been published yet.
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Clock className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-2xl font-bold text-brand-primary">Planned Results</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {plannedResults.map((item, idx) => (
                                <div key={idx} className="p-5 bg-white border border-slate-100 rounded-xl flex items-center gap-3">
                                    <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Results;
