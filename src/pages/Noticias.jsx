import { useTranslation } from 'react-i18next';
import { ArrowRight, Lightbulb, TrendingUp, Newspaper } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Noticias = () => {
    const { t } = useTranslation();

    const translatedAiNewsItems = t('ai_news.items_list', { returnObjects: true });

    return (
        <div className="py-20">
            <SEOHead
                title={t('ai_news.seo_title')}
                description={t('ai_news.seo_description')}
                path="/noticias"
            />
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-6">
                        <TrendingUp className="w-3 h-3" />
                        {t('ai_news.label')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-6 tracking-tight">{t('ai_news.title')}</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('ai_news.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up delay-100">
                    {Array.isArray(translatedAiNewsItems) && translatedAiNewsItems.map((item, idx) => {
                        return (
                            <article key={`ai-${idx}`} className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col sm:flex-row group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                                <div className="sm:w-48 h-40 sm:h-auto bg-slate-50 relative shrink-0 overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image.startsWith('http') ? item.image : `${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 group-hover:bg-blue-50/50 transition-colors h-full w-full">
                                            <Lightbulb className="w-10 h-10 text-slate-300 group-hover:text-blue-500/50 transition-colors" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="bg-white/95 backdrop-blur-sm text-brand-body font-bold text-[10px] px-3 py-1 rounded-full shadow-sm tracking-widest uppercase">
                                            {item.badge || 'News'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5 flex flex-col flex-grow justify-center">
                                    {item.date && (
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                                            {item.date}
                                        </span>
                                    )}
                                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 sm:mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                                        {item.description}
                                    </p>

                                    {item.link && item.link !== '#' ? (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-600 font-bold text-sm group/link mt-auto w-fit"
                                        >
                                            {t('news.read_more')}
                                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                                        </a>
                                    ) : null}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Noticias;
