import { useTranslation } from 'react-i18next';
import { BookOpen, Target, Lightbulb, Users } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const About = () => {
    const { t } = useTranslation();

    const objectives = t('about.objectives_list', { returnObjects: true });
    const focusAreas = t('about.focus_list', { returnObjects: true });
    const targetGroups = t('about.target_list', { returnObjects: true });

    return (
        <div className="py-16 md:py-24 bg-white">
            <SEOHead
                title={t('about.seo_title')}
                description={t('about.seo_description')}
                path="/about"
            />
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-primary text-center mb-16 tracking-tight">
                    {t('about.title')}
                </h1>

                <div className="space-y-20">
                    {/* Background & Context */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">{t('about.background_title')}</h2>
                        </div>
                        <p className="text-slate-500 text-base md:text-[17px] leading-relaxed">
                            {t('about.background_text')}
                        </p>
                    </section>

                    {/* Project Objectives */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Target className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">{t('about.objectives_title')}</h2>
                        </div>
                        <div className="space-y-3">
                            {objectives.map((obj, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-lg group transition-colors hover:bg-slate-100">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-secondary text-white flex items-center justify-center text-[10px] font-bold">
                                        {idx + 1}
                                    </div>
                                    <p className="text-slate-600 text-sm md:text-base">{obj}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Focus Areas */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Lightbulb className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">{t('about.focus_title')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {focusAreas.map((area, idx) => (
                                <div key={idx} className="p-5 border border-slate-100 rounded-xl shadow-sm text-slate-600 text-[15px] font-medium bg-white">
                                    {area}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Target Groups */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Users className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">{t('about.target_title')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {targetGroups.map((group, idx) => (
                                <div key={idx} className="p-5 border border-slate-100 rounded-xl shadow-sm text-slate-600 text-[15px] font-medium bg-white">
                                    {group}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
