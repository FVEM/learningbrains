import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-brand-primary text-white py-16">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white text-brand-primary rounded-xl flex items-center justify-center font-black text-xl">LB</div>
                            <span className="text-2xl font-black uppercase tracking-tighter">Learning Brains</span>
                        </div>
                        <p className="text-slate-400 max-w-sm text-sm leading-relaxed mb-8">
                            Empowering the industrial workforce through integrated on-the-job learning systems and innovative VET methodologies.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest opacity-50">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Project</Link></li>
                            <li><Link to="/results" className="text-slate-400 hover:text-white transition-colors">Project Results</Link></li>
                            <li><Link to="/impact" className="text-slate-400 hover:text-white transition-colors">Dissemination</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest opacity-50">Connect</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a></li>
                            <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10">
                    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start text-center lg:text-left">
                        <img 
                            src="/eu-emblem.png" 
                            alt="Co-funded by the European Union" 
                            className="h-10 md:h-12 w-auto object-contain brightness-0 invert opacity-80" 
                        />
                        <p className="text-[10px] md:text-xs leading-relaxed text-slate-500 max-w-4xl italic">
                            {t('footer.disclaimer')}
                        </p>
                    </div>
                    <div className="mt-12 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
                        © {new Date().getFullYear()} Learning Brains Consortium • Erasmus+ 2024-1-ES01-KA220-VET-000254067
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
