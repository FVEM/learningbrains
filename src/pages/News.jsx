import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import { Layout, Search, X } from 'lucide-react';
import EventCard from "../components/EventCard";
import SEOHead from "../components/SEOHead";

const News = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use optional chaining and fallback to empty array to prevent mapping error
  const newsItemsRaw = t("news.items_list", { returnObjects: true }) || [];
  const newsItems = useMemo(() => {
    return Array.isArray(newsItemsRaw) ? [...newsItemsRaw].reverse() : [];
  }, [newsItemsRaw]);

  // Extract dynamic categories from items to build dynamic filter pills
  const categories = useMemo(() => {
    const cats = newsItems.map(item => (item.category || item.badge || 'Event').trim());
    const uniqueCats = Array.from(new Set(cats)).filter(Boolean);
    return ['all', ...uniqueCats];
  }, [newsItems]);

  // Filter items based on search query and selected category
  const filteredItems = useMemo(() => {
    return newsItems.filter(item => {
      const category = (item.category || item.badge || 'Event').trim().toLowerCase();
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory.toLowerCase();
      
      const title = (item.title || "").toLowerCase();
      const description = (item.description || "").toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || title.includes(query) || description.includes(query);
      
      return matchesCategory && matchesSearch;
    });
  }, [newsItems, selectedCategory, searchQuery]);

  // Metadata for SEO
  const pageTitle = t("news.seo.title");
  const metaDescription = t("news.seo.description");

  // Generate Structured Data (Schema.org)
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": pageTitle,
    "description": metaDescription,
    "itemListElement": newsItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": item.title,
        "description": item.description,
        "image": item.image ? (item.image.startsWith('http') ? item.image : `https://learningbrains.eu${item.image.startsWith('/') ? '' : '/'}${item.image}`) : undefined,
        "datePublished": item.date, // Note: Ideally should be ISO format
        "url": item.link && item.link.startsWith('http') ? item.link : `https://learningbrains.eu/${i18n.language || 'en'}/news/${item.slug || ''}`
      }
    }))
  };

  return (
    <div className="py-20" dir={i18n.dir()}>
      {/* Dynamic SEO Tags */}
      <SEOHead 
        title={pageTitle}
        description={metaDescription}
        keywords={t("news.seo.keywords", "Erasmus+, VET, News, Industry, AI")}
        path="/news"
        schema={schema}
      />

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section - Matches Partners Style */}
        <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                <Layout className="w-3 h-3" />
                {t('news.section_title.sub', 'LATEST NEWS')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-6 tracking-tight">
                {t("news.section_title.main")}
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                {t("news.section_description")}
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
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
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
              placeholder={t('news.search_placeholder', 'Search events...')}
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-150 focus:border-teal-500 focus:outline-none text-[14px] text-slate-700 placeholder-slate-400 shadow-sm transition-all duration-300"
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

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-150">
          {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              return (
                <div key={index} className="flex col-span-1 h-full">
                  <EventCard item={item} lang={i18n.language || 'en'} />
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
                  className="px-5 py-2.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  {t('news.clear_filters', 'Clear Filters')}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Stay Updated Section */}
        <div
          className="mt-24 p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            {t("news.stay_updated.title", "Stay Tuned")}
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            {t(
              "news.stay_updated.description",
              "Follow our journey as we develop innovative learning platforms powered by AI and neuro-education."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
