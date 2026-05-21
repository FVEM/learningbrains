import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { ArrowRight, Lightbulb, TrendingUp, Newspaper, Search, X } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ArticleCard from '../components/ArticleCard';

const Noticias = () => {
    const { t, i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const rawAiNewsItems = t('ai_news.items_list', { returnObjects: true }) || [];
    const translatedAiNewsItems = Array.isArray(rawAiNewsItems) ? [...rawAiNewsItems].reverse() : [];

    // Extract dynamic categories
    const categories = useMemo(() => {
        const cats = translatedAiNewsItems.map(item => (item.category || item.badge || 'News').trim());
        const uniqueCats = Array.from(new Set(cats)).filter(Boolean);
        return ['all', ...uniqueCats];
    }, [translatedAiNewsItems]);

    // Filter items based on search query and selected category
    const filteredItems = useMemo(() => {
        return translatedAiNewsItems.filter(item => {
            const category = (item.category || item.badge || 'News').trim().toLowerCase();
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory.toLowerCase();
            
            const title = (item.title || "").toLowerCase();
            const description = (item.description || "").toLowerCase();
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch = !query || title.includes(query) || description.includes(query);
            
            return matchesCategory && matchesSearch;
        });
    }, [translatedAiNewsItems, selectedCategory, searchQuery]);

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
                "url": item.link && item.link.startsWith('http') ? item.link : `https://learningbrains.eu/${i18n.language || 'en'}/news/${item.slug || 'noticias'}`
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

                {/* Premium Search and Filter Controls */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/50 backdrop-blur-md border border-slate-100 p-6 rounded-3xl animate-fade-in-up delay-75">
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                        {categories.map((cat) => {
                            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat.toLowerCase())}
                                    className={`px-4 py-2 rounded-2xl text-[12px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                            : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100 shadow-sm"
                                    }`}
                                >
                                    {cat === 'all' ? t('news.filter_all', 'All') : cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Box */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('ai_news.search_placeholder', 'Search posts...')}
                            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-150 focus:border-blue-500 focus:outline-none text-[14px] text-slate-700 placeholder-slate-400 shadow-sm transition-all duration-300"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up delay-100">
                    {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
                        filteredItems.map((item, idx) => {
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
                    })
                    ) : (
                        <div className="col-span-full py-20 text-center bg-slate-50/30 rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-400 text-lg font-medium mb-3">
                                {t("news.no_items_found", "No items found matching your search.")}
                            </p>
                            {(searchQuery || selectedCategory !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("all");
                                    }}
                                    className="px-5 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold uppercase tracking-wider transition-colors"
                                >
                                    {t('news.clear_filters', 'Clear Filters')}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Noticias;
