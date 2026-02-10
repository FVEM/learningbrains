import { useTranslation } from 'react-i18next';
import { FileText, Download, Lock } from 'lucide-react';

const Resources = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                    <FileText className="w-3 h-3" />
                    Public Repository
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">Resources</h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed mb-16">
                    Access the project's public documents, guides, and technical templates as they are released throughout the project lifecycle.
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 md:p-20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                        <Lock className="w-6 h-6 text-slate-200" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                            <FileText className="w-10 h-10 text-slate-200" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-primary mb-4">Document Repository</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
                            The public repository will contain PDF downloads of project brochures, reports, and methodology handbooks. Currently, no files are available for public download.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button disabled className="flex items-center px-6 py-3 bg-white border border-slate-200 text-slate-400 font-bold rounded-xl text-sm cursor-not-allowed opacity-60">
                                <Download className="w-4 h-4 mr-2" />
                                Project Brochure
                            </button>
                            <button disabled className="flex items-center px-6 py-3 bg-white border border-slate-200 text-slate-400 font-bold rounded-xl text-sm cursor-not-allowed opacity-60">
                                <Download className="w-4 h-4 mr-2" />
                                Implementation Guide
                            </button>
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-200/20 blur-3xl rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default Resources;
