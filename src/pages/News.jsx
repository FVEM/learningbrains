import NewsCard from \"../components/NewsCard\";
import { useTranslation } from \"react-i18next\";
import { useEffect } from \"react-i18next\";
import SectionTitle from \"../components/SectionTitle\";

const News = () => {
  const { t, i18n } = useTranslation();

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use optional chaining and fallback to empty array to prevent mapping error
  const newsItems = t(\"news.items_list\", { returnObjects: true }) || [];

  // Metadata for SEO
  const pageTitle = t(\"news.seo.title\");
  const metaDescription = t(\"news.seo.description\");

  return (
    <div
      className=\"bg-black text-white min-h-screen pt-24 pb-12 overflow-x-hidden\"
      dir={i18n.dir()}
    >
      {/* Dynamic SEO Tags */}
      <title>{pageTitle}</title>
      <meta name=\"description\" content={metaDescription} />

      {/* Main Content Container */}
      <div className=\"max-w-7xl mx-auto px-4 md:px-8\">
        {/* Header Section */}
        <div className=\"mb-12\" data-aos=\"fade-down\">
          <SectionTitle
            main={t(\"news.section_title.main\")}
            sub={t(\"news.section_title.sub\")}
          />
          <p className=\"text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed\">
            {t(\"news.section_description\")}
          </p>
        </div>

        {/* Improved Mosaic Grid Layout */}
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">
          {Array.isArray(newsItems) && newsItems.length > 0 ? (
            newsItems.map((item, index) => (
              <div
                key={index}
                data-aos=\"fade-up\"
                data-aos-delay={index * 100}
                className=\"flex transition-transform duration-300 hover:scale-[1.02]\"
              >
                <NewsCard
                  image={item.image}
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                />
              </div>
            ))
          ) : (
            <div className=\"col-span-full py-20 text-center\">
              <p className=\"text-gray-500 text-xl font-medium\">
                {t(\"news.no_items_found\", \"No news items found.\")}
              </p>
            </div>
          )}
        </div>

        {/* Footer info or Call to action can go here */}
        <div
          className=\"mt-20 p-8 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 text-center\"
          data-aos=\"zoom-in\"
        >
          <h3 className=\"text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4\">
            {t(\"news.stay_updated.title\", \"Stay Tuned\")}
          </h3>
          <p className=\"text-gray-300 max-w-xl mx-auto\">
            {t(
              \"news.stay_updated.description\",
              \"Follow our journey as we develop innovative learning platforms powered by AI and neuro-education.\"
            )}
          </p>
        </div>
      </div>

      {/* Structured Data (JSON-LD) for better SEO */}
      <script type=\"application/ld+json\">
        {JSON.stringify({
          \"@context\": \"https://schema.org\",
          \"@type\": \"NewsArticle\",
          \"headline\": pageTitle,
          \"description\": metaDescription,
          \"author\": {
            \"@type\": \"Organization\",
            \"name\": \"Learning Brains\",
          },
          \"publisher\": {
            \"@type\": \"Organization\",
            \"name\": \"Learning Brains\",
            \"logo\": {
              \"@type\": \"ImageObject\",
              \"url\": \"https://learningbrains.eu/logo.png\",
            },
          },
        })}
      </script>
    </div>
  );
};

export default News;
