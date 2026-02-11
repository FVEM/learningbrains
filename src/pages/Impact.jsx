import { useTranslation } from 'react-i18next';
import { Share2, TrendingUp, Target } from 'lucide-react';

const Impact = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-brand-primary text-center mb-16">Dissemination & Impact</h1>
                <p className="text-slate-500 mb-8">Follow our dissemination strategy and target audiences.</p>
            </div>
        </div>
    );
};

export default Impact;
