import React from 'react';
import { Calendar, MapPin, ExternalLink, Tag, Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * EventCard: Vertical card for the Project Events section.
 * Replaces the horizontal layout to match the requested design.
 */
const EventCard = ({ item }) => {
  const { t } = useTranslation();

  const imageUrl = item.image
    ? item.image.startsWith('http')
      ? item.image
      : `${import.meta.env.BASE_URL || '/'}${item.image.replace(/^\//, '')}`
    : null;

  // Icons for badges: default to Bookmark if unknown
  const getBadgeIcon = (category) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('meeting')) return <Tag className="w-3 h-3" />;
    if (cat.includes('project')) return <Bookmark className="w-3 h-3" />;
    return <Tag className="w-3 h-3" />;
  };

  return (
    <article className="group bg-white rounded-3xl overflow-hidden flex flex-col h-full border border-slate-50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
      {/* 1. Image Header */}
      <div className="relative h-64 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.target.onerror = null; }}
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
             <Bookmark className="w-12 h-12 text-slate-200" />
          </div>
        )}
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm border border-slate-100 text-[10px] font-bold uppercase tracking-wider text-teal-700">
            {getBadgeIcon(item.badge || item.category)}
            {item.badge || item.category || 'Event'}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-col flex-grow p-6 pt-5">
        
        {/* Date/Location Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50/50 text-brand-secondary text-[11px] font-bold uppercase tracking-wide">
            <Calendar className="w-3.5 h-3.5" />
            {item.date || 'Coming Soon'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-brand-secondary transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-[14px] leading-relaxed mb-8 line-clamp-3">
          {item.description}
        </p>

        {/* Footer Link */}
        <div className="mt-auto pt-4 border-t border-slate-50">
          <a
            href={item.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-blue-600 hover:text-brand-primary transition-colors group/link"
          >
            {item.link?.includes('linkedin') ? t('news.view_on_linkedin') : t('news.read_article')}
            <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
