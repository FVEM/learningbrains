import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

const Results = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-brand-primary text-center mb-16">Project Results</h1>
                <p className="text-slate-500 mb-8">Tangible outputs and contributions.</p>
            </div>
        </div>
    );
};

export default Results;
