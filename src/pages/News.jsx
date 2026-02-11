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
            description: "The partners met for the first time at the FVEM headquarters to discuss the project timeline, management protocols, and initial research activities.",
            link: "https://www.linkedin.com/feed/update/urn:li:activity:7426532433669361664"
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
                </div>

                <div className="space-y-8">
                    {newsItems.map((item, idx) => (
                        <div key={idx} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
                            <div className="md:w-64 bg-slate-50 p-8 border-b md:border-b-0 md:border-r border-slate-100">
                                <div className="text-xs font-bold text-slate-400 mb-2 uppercase">{item.category}</div>
                                <div className="text-sm text-slate-500">{item.date}</div>
                            </div>
                            <div className="p-8 flex-grow">
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
                                <p className="text-slate-500 mb-6">{item.description}</p>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noreferrer" className="text-brand-secondary font-bold flex items-center gap-2">
                                        Read More <ArrowRight className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
