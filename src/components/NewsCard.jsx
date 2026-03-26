import React from 'react';
import { Calendar, ExternalLink, Tag } from 'lucide-react';

/**
 * NewsCard component for the mosaic grid
 * Matches the styling of the Partners section for visual coherence.
 */
const NewsCard = ({ image, date, title, description, url, category = "Event" }) => {
  return (
    <article className="group bg-white border border-slate-100 rounded-2xl p-8 flex flex-col h-full hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-56 -mx-8 -mt-8 mb-8 overflow-hidden rounded-t-2xl">
        <img 
          src={image && image.startsWith('http') ? image : `${import.meta.env.BASE_URL || '/'}${image?.replace(/^\//, '')}`} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            // Handle error silently or set a more neutral fallback
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-brand-secondary text-[10px] font-bold uppercase tracking-wider shadow-sm border border-slate-100">
            <Tag className="w-3 h-3" />
            {category}
          </span>
        </div>
      </div>

      <div className="flex-grow">
        {/* Date and Metadata */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-teal-50 text-brand-secondary flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 mb-4 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Action Link */}
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[13px] font-bold text-slate-400 hover:text-brand-secondary flex items-center gap-2 group/link transition-all"
        >
          {url?.includes('linkedin') ? 'View on LinkedIn' : 'Read Article'}
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
