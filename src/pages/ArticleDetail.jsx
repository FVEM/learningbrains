import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Tag, ExternalLink, BookOpen } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const ArticleDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug, lang } = useParams();
  const navigate = useNavigate();
  const currentLang = lang || i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const rawItems = t('articles.items_list', { returnObjects: true }) || [];
  const items = Array.isArray(rawItems) ? rawItems : [];

  // Find article by slug
  const article = items.find((item) => item.slug === slug);

  // Related articles (up to 3 others)
  const related = items.filter((item) => item.slug !== slug).slice(0, 3);

  // Fire GA4 event when article is viewed (after article is defined)
  useEffect(() => {
    if (article?.title && typeof window.gtag === 'function') {
      window.gtag('event', 'article_view', {
        article_slug: slug,
        article_title: article.title,
      });
    }
  }, [article, slug]);

  if (!article) {
    return (
      <div className="py-32 text-center">
        <FileText className="w-16 h-16 text-slate-200 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-600 mb-4">Article not found</h1>
        <Link
          to={`/${currentLang}/articles`}
          className="inline-flex items-center gap-2 text-brand-secondary font-bold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('articles.back_to_articles', '← Back to Articles')}
        </Link>
      </div>
    );
  }

  const imageUrl = article.image
    ? article.image.startsWith('http')
      ? article.image
      : `${import.meta.env.BASE_URL || '/'}${article.image.replace(/^\//, '')}`
    : null;

  const canonicalSlug = `/articles/${slug}`;

  return (
    <div className="py-20" dir={i18n.dir()}>
      <SEOHead
        title={article.title}
        description={article.description}
        path={canonicalSlug}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.description,
          "image": imageUrl || undefined,
          "datePublished": article.date,
          "publisher": {
            "@type": "Organization",
            "name": "Learning Brains",
            "url": "https://learningbrains.eu"
          },
          "url": `https://learningbrains.eu/${currentLang}/articles/${slug}`
        }}
      />

      <div className="max-w-3xl mx-auto px-6">

        {/* Back link */}
        <Link
          to={`/${currentLang}/articles`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-brand-secondary transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          {t('articles.back_to_articles', 'Back to Articles')}
        </Link>

        {/* Hero Image */}
        {imageUrl ? (
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; }}
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>
        ) : (
          <div className="h-40 rounded-2xl bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center mb-10">
            <BookOpen className="w-14 h-14 text-teal-200" />
          </div>
        )}

        {/* Meta badges */}
        <div className="flex items-center gap-3 flex-wrap mb-5">
          {article.date && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
          )}
          {article.badge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-teal-50 text-brand-secondary border border-teal-100">
              <Tag className="w-2.5 h-2.5" />
              {article.badge}
            </span>
          )}
          {article.partner && (
            <span className="text-[11px] text-slate-400 font-medium">· {article.partner}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-brand-headline leading-tight mb-6 tracking-tight">
          {article.title}
        </h1>

        {/* Separator */}
        <div className="w-16 h-1 bg-brand-secondary rounded-full mb-8" />

        {/* Summary / Abstract */}
        <div className="bg-slate-50 border-l-4 border-brand-secondary p-8 md:p-10 rounded-r-2xl mb-12 shadow-sm border-t border-r border-b border-slate-100">
            <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed italic opacity-90">
                "{article.description}"
            </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-20">
          {article.pdf_url && (
            <a
              href={article.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-secondary text-white font-bold text-sm hover:bg-brand-primary transition-colors shadow-lg shadow-teal-900/15 hover:shadow-teal-900/25"
              onClick={() => {
                if (typeof window.gtag === 'function') {
                  window.gtag('event', 'article_link_click', {
                    article_slug: slug,
                    article_title: article.title,
                  });
                }
              }}
            >
              <FileText className="w-4 h-4" />
              {t('articles.download_pdf', 'Download PDF')}
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          )}
          <Link
            to={`/${currentLang}/articles`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('articles.back_to_articles', 'Back to Articles')}
          </Link>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div>
            <div className="border-t border-slate-100 pt-12">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                {t('articles.related', 'More Articles')}
              </h2>
              <div className="flex flex-col gap-4">
                {related.map((rel, idx) => (
                  <Link
                    key={idx}
                    to={`/${currentLang}/articles/${rel.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-teal-100 hover:bg-teal-50/30 transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold text-slate-700 group-hover:text-brand-primary transition-colors line-clamp-1">
                        {rel.title}
                      </p>
                      {rel.date && (
                        <p className="text-[11px] text-slate-400 mt-0.5">{rel.date}</p>
                      )}
                    </div>
                    <ArrowLeft className="w-4 h-4 text-slate-300 rotate-180 group-hover:text-brand-secondary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
