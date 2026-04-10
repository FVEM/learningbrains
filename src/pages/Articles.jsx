import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, FileText, Calendar, Tag } from 'lucide-react';
import SEOHead from '../components/SEOHead';

/**
 * ArticleCard: Horizontal magazine-style card for the Articles section.
 * Distinct from NewsCard (vertical) and AI News cards (smaller horizontal).
 */
const ArticleCard = ({ item, lang }) => {
  const { t } = useTranslation();
  const slug = item.slug;

  const imageUrl = item.image
    ? item.image.startsWith('http')
      ? item.image
      : `${import.meta.env.BASE_URL || '/'}${item.image.replace(/^\//, '')}`
    : null;

  return (
    <article className="group bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl hover:shadow-teal-900/8 hover:-translate-y-0.5 transition-all duration-300">
      {/* Left: Image */}
      <div className="sm:w-56 lg:w-64 h-52 sm:h-auto bg-slate-50 relative shrink-0 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.onerror = null; }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-50 to-slate-100">
            <FileText className="w-12 h-12 text-teal-200" />
          </div>
        )}
        {/* PDF badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-teal-700 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-teal-100">
            <FileText className="w-3 h-3" />
            PDF
          </span>
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col flex-grow p-6 sm:p-7">
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {item.date && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Calendar className="w-3 h-3" />
              {item.date}
            </span>
          )}
          {item.badge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-brand-secondary">
              <Tag className="w-2.5 h-2.5" />
              {item.badge}
            </span>
          )}
          {item.partner && (
            <span className="text-[10px] text-slate-400 font-medium">· {item.partner}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {item.description}
        </p>

        {/* CTA */}
        <div className="border-t border-slate-50 pt-4 mt-auto">
          {slug ? (
            <Link
              to={`/${lang}/articles/${slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-secondary hover:text-brand-primary transition-colors group/link"
            >
              {t('articles.read_article', 'Read Article')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          ) : item.pdf_url ? (
            <a
              href={item.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-secondary hover:text-brand-primary transition-colors group/link"
            >
              {t('articles.download_pdf', 'Download PDF')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

const Articles = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rawItems = t('articles.items_list', { returnObjects: true }) || [];
  const items = Array.isArray(rawItems) ? [...rawItems].reverse() : [];

  const pageTitle = t('articles.seo.title', 'Articles – Learning Brains Erasmus+');
  const metaDescription = t('articles.seo.description', 'Published articles and research from the Learning Brains consortium on AI, VET and industrial reskilling.');

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": pageTitle,
    "description": metaDescription,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": item.title,
        "description": item.description,
        "datePublished": item.date,
        "url": `https://learningbrains.eu/${lang}/articles/${item.slug || ''}`
      }
    }))
  };

  return (
    <div className="py-20" dir={i18n.dir()}>
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        keywords={t('articles.seo.keywords', 'Erasmus+, VET, Articles, AI, Industry')}
        path="/articles"
        schema={schema}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
            <BookOpen className="w-3 h-3" />
            {t('articles.section_title.sub', 'PUBLISHED BY PARTNERS')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-6 tracking-tight">
            {t('articles.section_title.main', 'Articles')}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('articles.section_description', 'In-depth articles and publications from the Learning Brains consortium.')}
          </p>
        </div>

        {/* Articles list */}
        <div className="flex flex-col gap-6 animate-fade-in-up delay-100">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <ArticleCard key={idx} item={item} lang={lang} />
            ))
          ) : (
            <div className="py-24 text-center">
              <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 text-lg font-medium">
                {t('articles.no_items', 'No articles published yet. Check back soon.')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
