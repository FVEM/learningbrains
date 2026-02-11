import { useTranslation } from 'react-i18next';
import { FileText, Download, Lock } from 'lucide-react';

const Resources = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">Resources</h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-16">
                    Access the project's public documents as they are released.
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8"><Lock className="w-6 h-6 text-slate-200" /></div>
                    <div className="relative z-10">
                        <FileText className="w-16 h-16 text-slate-200 mx-auto mb-8" />
                        <h3 className="text-2xl font-bold text-brand-primary mb-4">Document Repository</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-10">
                            The public repository will contain PDF downloads. Currently, no files are available.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;
