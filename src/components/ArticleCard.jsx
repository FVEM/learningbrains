import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Calendar, Tag } from 'lucide-react';

/**
 * ArticleCard: Horizontal magazine-style card for the Articles section.
 * Used for in-depth articles with slug links.
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
    <article className="w-full h-full group bg-gradient-to-br from-white to-teal-50/20 border border-slate-100 rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-2xl hover:shadow-teal-900/10 hover:-translate-y-0.5 transition-all duration-300">
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600/95 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider shadow-md border border-teal-500/20">
            <FileText className="w-3.5 h-3.5" />
            ARTICLE
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

        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2 flex items-start gap-2">
          <span className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
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
              to={`/${lang}/news/${slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-secondary hover:text-brand-primary transition-colors group/link"
            >
              {t('articles.read_article', 'Read Article')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
