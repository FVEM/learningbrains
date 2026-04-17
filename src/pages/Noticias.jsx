import { useTranslation } from 'react-i18next';
import { ArrowRight, Lightbulb, TrendingUp, Newspaper } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ArticleCard from '../components/ArticleCard';

const Noticias = () => {
    const { t, i18n } = useTranslation();

    const rawAiNewsItems = t('ai_news.items_list', { returnObjects: true }) || [];
    const translatedAiNewsItems = Array.isArray(rawAiNewsItems) ? [...rawAiNewsItems].reverse() : [];

    // Generate Structured Data (Schema.org)
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": t('ai_news.seo_title'),
        "description": t('ai_news.seo_description'),
        "itemListElement": translatedAiNewsItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "NewsArticle",
                "headline": item.title,
                "description": item.description,
                "image": item.image ? (item.image.startsWith('http') ? item.image : `https://learningbrains.eu${item.image.startsWith('/') ? '' : '/'}${item.image}`) : undefined,
                "datePublished": item.date,
                "url": item.link && item.link.startsWith('http') ? item.link : `https://learningbrains.eu/noticias`
            }
        }))
    };

    return (
        <div className="py-20">
            <SEOHead
                title={t('ai_news.seo_title')}
                description={t('ai_news.seo_description')}
                path="/noticias"
                schema={schema}
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
                        const isArticle = item.type === 'Article' || item.slug;

                        if (isArticle) {
                            return (
                                <div key={`ai-${idx}`} className="flex md:col-span-2 lg:col-span-2">
                                    <ArticleCard item={item} lang={i18n.language || 'en'} />
                                </div>
                            );
                        }

                        return (
                            <div key={`ai-${idx}`} className="flex col-span-1">
                                <article className="w-full bg-white border border-slate-50/80 rounded-2xl overflow-hidden flex flex-col sm:flex-row group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                                    <div className="sm:w-48 h-40 sm:h-auto bg-slate-50 relative shrink-0 overflow-hidden">
                                        {item.image ? (
                                            <img
                                                src={item.image.startsWith('http') ? item.image : `${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 group-hover:bg-blue-50/50 transition-colors h-full w-full">
                                                <Lightbulb className="w-10 h-10 text-slate-200 group-hover:text-blue-500/50 transition-colors" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="bg-white/95 backdrop-blur-sm text-slate-400 font-bold text-[9px] px-2.5 py-1 rounded-lg border border-slate-100 shadow-sm tracking-wider uppercase">
                                                {(() => {
                                                    const cat = item.badge || item.category || 'News';
                                                    return `News/${cat.toUpperCase()}`;
                                                })()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow justify-center">
                                        {item.date && (
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded-md bg-slate-50 w-fit">
                                                {item.date}
                                            </span>
                                        )}
                                        <h3 className="text-base font-bold text-slate-700 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-[13px] leading-relaxed mb-4 line-clamp-2">
                                            {item.description}
                                        </p>

                                        {item.link && item.link !== '#' ? (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-blue-600 font-bold text-[13px] group/link mt-auto w-fit"
                                            >
                                                {t('news.read_more')}
                                                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
                                            </a>
                                        ) : null}
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Noticias;
