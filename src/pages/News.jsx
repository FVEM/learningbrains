import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Newspaper, ArrowRight, Linkedin } from 'lucide-react';

const News = () => {
    const { t } = useTranslation();

    const newsItems = [
        {
            title: "Project Kick-off Meeting in Bilbao",
            date: "February 2026",
            location: "Bilbao, Spain",
            category: "Meeting",
            description: "The partners met for the first time at the FVEM headquarters to discuss the project timeline, management protocols, and initial research activities for WP2.",
            link: "https://www.linkedin.com/feed/update/urn:li:activity:7426532433669361664"
        },
        {
            title: "Consortium Finalizes WP2 Methodology",
            date: "March 2026",
            location: "Online",
            category: "Innovation",
            description: "The technical committee has approved the framework for the industrial skills gap analysis, marking the completion of the first major technical milestone."
        }
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Newspaper className="w-3 h-3" />
                        Project Updates
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 tracking-tight">News & Events</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Follow the progress of the Learning Brains project through our latest news, meetings, and dissemination activities.
                    </p>
                </div>

                <div className="space-y-8">
                    {newsItems.map((item, idx) => (
                        <div key={idx} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-64 bg-slate-50 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
                                    <span className="inline-block px-2.5 py-1 bg-white text-brand-secondary text-[11px] font-bold rounded-lg border border-slate-100 mb-4 self-start">
                                        {item.category}
                                    </span>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-slate-400">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span className="text-xs font-medium">{item.date}</span>
                                        </div>
                                        <div className="flex items-center text-slate-400">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span className="text-xs font-medium">{item.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow">
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 group-hover:text-brand-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
                                        {item.description}
                                    </p>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-secondary font-bold text-sm inline-flex items-center group/btn hover:text-brand-primary transition-colors"
                                        >
                                            {item.link.includes('linkedin.com') ? (
                                                <>
                                                    <Linkedin className="w-4 h-4 mr-2" />
                                                    View on LinkedIn
                                                </>
                                            ) : (
                                                'Read Selection'
                                            )}
                                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </a>
                                    ) : (
                                        <span className="text-slate-400 font-bold text-sm inline-flex items-center opacity-50 cursor-not-allowed">
                                            Read Selection
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
