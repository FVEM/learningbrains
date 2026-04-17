import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, BookOpen, FileText } from 'lucide-react';
import SEOHead from '../components/SEOHead';


// ─── Content Renderer ────────────────────────────────────────────────────────
// Converts plain-text from Google Docs export into structured JSX.
function renderContent(text) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  const parseBold = (str) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-slate-800">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // H1-style: ALL CAPS short line (≤ 80 chars) → section heading
    if (line === line.toUpperCase() && line.length > 3 && line.length <= 80 && /[A-Z]/.test(line)) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-slate-800 mt-12 mb-4 pb-2 border-b border-slate-100 tracking-tight">
          {line}
        </h2>
      );
      i++;
      continue;
    }

    // Markdown heading ##
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-slate-800 mt-10 mb-4 tracking-tight">
          {parseBold(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Markdown heading #
    if (line.startsWith('# ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-slate-800 mt-12 mb-5 tracking-tight">
          {parseBold(line.slice(2))}
        </h2>
      );
      i++;
      continue;
    }

    // Bullet list item
    if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
      const listItems = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('• ') || lines[i].trim().startsWith('* '))) {
        listItems.push(lines[i].trim().replace(/^[-•*]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2 pl-0">
          {listItems.map((li, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 text-base leading-relaxed">
              <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-secondary" />
              <span>{parseBold(li)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const listItems = [];
      let num = 1;
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-5 space-y-2 pl-0">
          {listItems.map((li, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 text-base leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-50 text-brand-secondary text-xs font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span>{parseBold(li)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-slate-600 text-base md:text-lg leading-relaxed mb-5">
        {parseBold(line)}
      </p>
    );
    i++;
  }

  return elements;
}

// ─── Component ───────────────────────────────────────────────────────────────
const ArticleDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug, lang } = useParams();
  const currentLang = lang || i18n.language;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const newsItems   = t('news.items_list',    { returnObjects: true }) || [];
  const aiNewsItems = t('ai_news.items_list', { returnObjects: true }) || [];
  const items = [
    ...(Array.isArray(newsItems)   ? newsItems   : []),
    ...(Array.isArray(aiNewsItems) ? aiNewsItems : []),
  ];

  const isAiNews = aiNewsItems.some((item) => item.slug === slug);
  const article = items.find((item) => item.slug === slug);

  // Only other Articles for "More Articles"
  const related = items
    .filter((item) => item.slug && item.slug !== slug && (item.type === 'Article' || item.type === 'ARTICLE'))
    .slice(0, 3);

  // GA4 tracking
  useEffect(() => {
    if (article?.title && typeof window.gtag === 'function') {
      window.gtag('event', 'article_view', { article_slug: slug, article_title: article.title });
    }
  }, [article, slug]);

  if (!article) {
    return (
      <div className="py-32 text-center">
        <FileText className="w-16 h-16 text-slate-200 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-600 mb-4">Article not found</h1>
        <Link to={`/${currentLang}/news`} className="inline-flex items-center gap-2 text-brand-secondary font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t('articles.back_to_articles', 'Back to News')}
        </Link>
      </div>
    );
  }

  const imageUrl = article.image
    ? article.image.startsWith('http')
      ? article.image
      : `${import.meta.env.BASE_URL || '/'}${article.image.replace(/^\//, '')}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50" dir={i18n.dir()}>
      <SEOHead
        title={article.title}
        description={article.description}
        path={`/news/${slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.description,
          "image": imageUrl || undefined,
          "datePublished": article.date,
          "publisher": { "@type": "Organization", "name": "Learning Brains", "url": "https://learningbrains.eu" },
          "url": `https://learningbrains.eu/${currentLang}/news/${slug}`
        }}
      />

      {/* ── Hero ── */}
      {imageUrl && (
        <div className="w-full h-64 md:h-96 lg:h-[480px] relative overflow-hidden">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
          {/* Back link on hero */}
          <div className="absolute top-6 left-6">
            <Link
              to={`/${currentLang}/news`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/25 transition-colors border border-white/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t('articles.back_to_articles', 'Back to News')}
            </Link>
          </div>
        </div>
      )}

      {/* ── Article Body ── */}
      <div className="max-w-3xl mx-auto px-6 pb-24">

        {/* Back link (when no hero) */}
        {!imageUrl && (
          <Link
            to={`/${currentLang}/news`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-brand-secondary transition-colors mt-10 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            {t('articles.back_to_articles', 'Back to News')}
          </Link>
        )}

        {/* ── Meta + Title card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-8 py-8 -mt-16 relative z-10 mb-10">
          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            {article.date && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
            )}
            {(article.badge || article.category) && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-teal-50 text-brand-secondary border border-teal-100">
                <Tag className="w-2.5 h-2.5" />
                {article.badge || article.category}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <BookOpen className="w-2.5 h-2.5" />
              Article
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-headline leading-tight tracking-tight mb-4">
            {article.title}
          </h1>

          {/* Divider */}
          <div className="w-12 h-1 bg-brand-secondary rounded-full" />
        </div>

        {/* ── Lead / Abstract ── */}
        <div className="bg-gradient-to-r from-teal-50 to-slate-50 border-l-4 border-brand-secondary rounded-r-xl px-7 py-6 mb-10">
          <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed italic">
            "{article.description}"
          </p>
        </div>

        {/* ── Full Content ── */}
        {article.content ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-10 prose-article">
            {renderContent(article.content)}
          </div>
        ) : (
          /* Placeholder when content hasn't been fetched yet */
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 px-8 py-16 text-center">
            <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 text-sm font-medium mb-2">Article content not yet available</p>
            <p className="text-slate-300 text-xs">Add a Google Docs link in the <code className="bg-slate-50 px-1 rounded">doc_link</code> column of the Google Sheet and re-run the sync script.</p>
          </div>
        )}

        {/* ── Bottom Nav ── */}
        <div className="mt-10 flex items-center justify-between">
          <Link
            to={isAiNews ? `/${currentLang}/noticias` : `/${currentLang}/news`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isAiNews ? t('nav.noticias', 'Back to News') : t('nav.news', 'Back to Project Events')}
          </Link>
        </div>

        {/* ── More Articles ── */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              {t('articles.related', 'More Articles')}
            </h2>
            <div className="flex flex-col gap-4">
              {related.map((rel, idx) => (
                <Link
                  key={idx}
                  to={`/${currentLang}/news/${rel.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-teal-100 hover:bg-teal-50/30 transition-all"
                >
                  {rel.image ? (
                    <img
                      src={rel.image.startsWith('http') ? rel.image : `${import.meta.env.BASE_URL || '/'}${rel.image.replace(/^\//, '')}`}
                      alt={rel.title}
                      className="flex-shrink-0 w-14 h-14 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-teal-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-brand-secondary" />
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {rel.title}
                    </p>
                    {rel.date && <p className="text-[11px] text-slate-400 mt-0.5">{rel.date}</p>}
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-300 rotate-180 group-hover:text-brand-secondary transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
