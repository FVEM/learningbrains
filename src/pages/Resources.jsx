import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

const Resources = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-brand-primary text-center mb-16">Resources</h1>
                <p className="text-slate-500 mb-8">Public repository of project documents.</p>
            </div>
        </div>
    );
};

export default Resources;
