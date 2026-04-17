import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, BookOpen, FileText, Clock, Share2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';


// ─── Content Renderer ────────────────────────────────────────────────────────
// Converts plain-text from Google Docs export into structured JSX.
function renderContent(text) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  let paragraphCount = 0;

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

    // Pull Quote Detection: Paragraph wrapped in quotes or short italic-only line
    if (line.startsWith('"') && line.endsWith('"') && line.length > 20 && line.length < 200) {
      elements.push(
        <blockquote key={i} className="editorial-pull-quote">
          <p>{line.slice(1, -1)}</p>
        </blockquote>
      );
      i++;
      continue;
    }

    // H1-style: ALL CAPS short line (≤ 80 chars) → section heading
    if (line === line.toUpperCase() && line.length > 3 && line.length <= 80 && /[A-Z]/.test(line)) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-brand-primary mt-14 mb-6 tracking-tight flex items-center gap-3">
          <span className="w-8 h-[2px] bg-brand-secondary/30" />
          {line}
        </h2>
      );
      i++;
      continue;
    }

    // Markdown heading ##
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-slate-800 mt-12 mb-6 tracking-tight">
          {parseBold(line.slice(3))}
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
        <ul key={`ul-${i}`} className="my-8 space-y-3 pl-2">
          {listItems.map((li, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 text-lg leading-relaxed">
              <span className="mt-2.5 flex-shrink-0 w-2 h-2 rounded-full bg-brand-secondary/40" />
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
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-8 space-y-4 pl-2">
          {listItems.map((li, idx) => (
            <li key={idx} className="flex items-start gap-4 text-slate-600 text-lg leading-relaxed">
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-teal-50 text-brand-secondary text-sm font-bold flex items-center justify-center mt-0.5 border border-teal-100/50">
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
    paragraphCount++;
    const isFirstParagraph = paragraphCount === 1;

    elements.push(
      <p 
        key={i} 
        className={`text-slate-600 text-lg leading-[1.8] mb-6 ${isFirstParagraph ? 'editorial-drop-cap' : ''}`}
      >
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  const newsItems   = t('news.items_list',    { returnObjects: true }) || [];
  const aiNewsItems = t('ai_news.items_list', { returnObjects: true }) || [];
  const items = [
    ...(Array.isArray(newsItems)   ? newsItems   : []),
    ...(Array.isArray(aiNewsItems) ? aiNewsItems : []),
  ];

  const isAiNews = aiNewsItems.some((item) => item.slug === slug);
  const article = items.find((item) => item.slug === slug);

  // Calculate reading time
  const wordCount = article?.content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

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
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 px-8 md:px-12 py-10 -mt-20 relative z-10 mb-12">
          {/* Progress Bar */}
          <div className="scroll-progress-container rounded-t-3xl overflow-hidden opacity-0 lg:opacity-100 transition-opacity">
            <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 flex-wrap mb-6">
            {article.date && (
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
            )}
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
            {(article.badge || article.category) && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-teal-50 text-brand-secondary border border-teal-100">
                <Tag className="w-3 h-3" />
                {article.badge || article.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-headline leading-tight tracking-tight mb-8">
            {article.title}
          </h1>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
            <div className="w-16 h-1 bg-brand-secondary rounded-full" />
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                }
              }}
              className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-brand-secondary/10 hover:text-brand-secondary transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Lead / Abstract ── */}
        <div className="relative mb-16 px-4">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-secondary rounded-full" />
          <p className="text-slate-700 text-xl md:text-2xl font-medium leading-relaxed italic pl-8">
            "{article.description}"
          </p>
        </div>

        {/* ── Full Content ── */}
        {article.content ? (
          <div className="prose-editorial">
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
