import { useTranslation } from 'react-i18next';
import { Info, Clock, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

const Results = () => {
    useTranslation();

    const plannedResults = [
        "European Industrial Reskilling Framework",
        "Handbook for On-the-job Mentoring",
        "AI-Powered Learning Path Generator",
        "Transnational Policy Recommendations"
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">Project Results</h1>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        Access the tangible outputs and intellectual contributions of the Learning Brains project.
                    </p>
                </div>

                <div className="flex items-start gap-4 p-5 bg-teal-50/50 rounded-2xl border border-teal-100 flex-col sm:flex-row mb-16">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Info className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        The Learning Brains project is currently in its implementation phase. Results and deliverables will be published progressively as they become available and are approved by the European Commission.
                    </p>
                </div>

                <div className="space-y-16">
                    {/* Available Results */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <CheckCircle2 className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight">Available Results</h2>
                        </div>
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-16 text-center">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-6 h-6 text-slate-300" />
                            </div>
                            <p className="text-slate-400 font-medium italic">No results have been published yet. Please check back later.</p>
                        </div>
                    </section>

                    {/* Planned Results */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Clock className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight">Planned Results</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {plannedResults.map((item, idx) => (
                                <div key={idx} className="p-5 bg-white border border-slate-100 rounded-xl flex items-center justify-between group hover:border-brand-primary/20 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
                                        <span className="text-slate-700 font-medium text-[15px]">{item}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-secondary transition-colors" />
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
