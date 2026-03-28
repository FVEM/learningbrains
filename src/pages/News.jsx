import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Layout } from 'lucide-react';
import NewsCard from "../components/NewsCard";
import SEOHead from "../components/SEOHead";

const News = () => {
  const { t, i18n } = useTranslation();

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use optional chaining and fallback to empty array to prevent mapping error
  const newsItems = t("news.items_list", { returnObjects: true }) || [];

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
        "url": item.link && item.link.startsWith('http') ? item.link : `https://learningbrains.eu/news`
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
        <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                <Layout className="w-3 h-3" />
                {t('partners.label')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-6 tracking-tight">
                {t("news.section_title.main")}
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                {t("news.section_description")}
            </p>
        </div>

        {/* Improved Mosaic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
          {Array.isArray(newsItems) && newsItems.length > 0 ? (
            newsItems.map((item, index) => (
              <div
                key={index}
                className="flex"
              >
                <NewsCard
                  image={item.image}
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  url={item.link}
                  category={item.badge || t("news.section_title.sub")}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 text-xl font-medium">
                {t("news.no_items_found", "No news items found.")}
              </p>
            </div>
          )}
        </div>

        {/* Stay Updated Section */}
        <div
          className="mt-20 p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center"
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
