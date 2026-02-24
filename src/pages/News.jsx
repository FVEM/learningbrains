import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Newspaper, ArrowRight, Users } from 'lucide-react';
import SEOHead from '../components/SEOHead'; // Assuming SEOHead is in this path

const News = () => {
    const { t } = useTranslation();

    const newsItems = [
        {
            date: "February 2026",
            location: "Bilbao, Spain",
            image: "News/BilbaoKickoff.jpg"
        },
        {
            date: "April 2026",
            location: "Online",
            image: "",
            icon: Calendar
        },
        {
            date: "June 2026",
            location: "Venice, Italy",
            image: "",
            icon: Users
        }
    ];

    const translatedNewsItems = t('news.items_list', { returnObjects: true });

    return (
        <div className="py-20">
            <SEOHead
                title={t('news.seo_title')}
                description={t('news.seo_description')}
                path="/news"
            />
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Newspaper className="w-3 h-3" />
                        {t('news.label')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-6 tracking-tight">{t('news.title')}</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('news.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
                    {translatedNewsItems.map((item, idx) => {
                        const staticData = newsItems[idx] || {};
                        const NewsIcon = staticData.icon || Newspaper;

                        return (
                            <article key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300">
                                {/* Image or Placeholder */}
                                <div className="h-56 bg-slate-50 relative overflow-hidden">
                                    {staticData.image ? (
                                        <img
                                            src={staticData.image.startsWith('http') ? staticData.image : `${import.meta.env.BASE_URL}${staticData.image.replace(/^\//, '')}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 group-hover:bg-teal-50/50 transition-colors">
                                            <NewsIcon className="w-12 h-12 text-slate-300 group-hover:text-brand-secondary/50 transition-colors" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-primary border border-slate-100 shadow-sm">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium uppercase tracking-wider mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {staticData.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {staticData.location}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-brand-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {item.description}
                                    </p>

                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-brand-secondary font-bold text-sm group/link"
                                        >
                                            {t('news.read_more')}
                                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                                        </a>
                                    ) : (
                                        <div className="mt-auto pt-4 border-t border-slate-50">
                                            <span className="text-xs text-slate-400 italic">
                                                {t('news.details_soon')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default News;
