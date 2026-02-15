import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Users, Cpu, Rocket, BrainCircuit, TrendingUp, Zap, Lightbulb, Target, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const Home = () => {
    const { t, i18n } = useTranslation();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency
        let frames = [];
        let animationFrameId;
        let isCollecting = true;
        let frameIndex = 0;
        let direction = 1; // 1 = forward, -1 = backward

        const processFrame = async () => {
            if (isCollecting) {
                // Collection Phase: Store frames while video plays normally
                if (!video.paused && !video.ended) {
                    try {
                        const bitmap = await createImageBitmap(video);
                        // Optional: Resize bitmap here if memory is an issue, e.g. { resizeWidth: 1280 }
                        frames.push(bitmap);
                    } catch (e) {
                        console.error("Frame capture error:", e);
                    }
                }

                // Draw current video frame to canvas during collection
                if (frames.length > 0) {
                    ctx.drawImage(frames[frames.length - 1], 0, 0, canvas.width, canvas.height);
                }

                if (video.ended) {
                    isCollecting = false;
                    frameIndex = frames.length - 1;
                    direction = -1; // Start reversing immediately
                }
            } else {
                // Playback Phase: Use cached frames
                if (frames.length > 0) {
                    ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);

                    frameIndex += direction;

                    // Ping-Pong Logic
                    if (frameIndex >= frames.length) {
                        frameIndex = frames.length - 2;
                        direction = -1;
                    } else if (frameIndex < 0) {
                        frameIndex = 1;
                        direction = 1;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(processFrame);
        };

        const handleLoadedMetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            setIsVideoLoaded(true);
            video.play().catch(e => console.error("Autoplay failed:", e));
            animationFrameId = requestAnimationFrame(processFrame);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            cancelAnimationFrame(animationFrameId);
            // Cleanup bitmaps to free memory
            frames.forEach(frame => frame.close());
        };
    }, []);

    const stats = t('home.stats', { returnObjects: true });
    const features = t('home.features', { returnObjects: true });

    return (
        <div className="bg-white font-body text-slate-600">
            <SEOHead
                title={t('home.seo_title')}
                description={t('home.seo_description')}
                path="/"
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
                {/* Background Video (Hidden) */}
                <video
                    ref={videoRef}
                    className="hidden"
                    src="/grok-video-62201ec6-f2cd-4ba2-8091-1878cb5ffc72.mp4"
                    muted
                    playsInline
                    loop={false}
                    onEnded={() => {
                        // handled in useEffect
                    }}
                />

                {/* Canvas for Ping-Pong Loop */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent z-10" />

                {/* Main Content Container - Positioned higher on page */}
                <div className="relative z-20 flex-grow flex flex-col justify-start pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <div className="max-w-3xl">
                        {/* Validation Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-brand-navy text-[10px] font-bold uppercase tracking-wider animate-fade-in-up">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                            ERASMUS+ COOPERATION PARTNERSHIP
                        </div>

                        {/* Typography Block */}
                        <div className="mt-8 animate-fade-in-up delay-100">
                            {/* Top Title - Navy Blue */}
                            <h2 className="text-3xl md:text-4xl font-bold font-sans text-brand-title-blue mb-4">
                                Learning Brains
                            </h2>
                            {/* Main Headline - Green */}
                            <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight text-brand-primary leading-[1.1]">
                                Real Skills for Real <br className="hidden md:block" />
                                Industry
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <p className="mt-10 text-xl text-slate-500 font-medium leading-relaxed max-w-xl animate-fade-in-up delay-200">
                            Integrated On-the-job Learning Systems for Industrial Reskilling
                        </p>

                        {/* CTAs */}
                        <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up delay-300">
                            <Link
                                to={`/${i18n.language}/about`}
                                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-200 bg-brand-primary rounded-lg hover:bg-brand-secondary hover:shadow-lg hover:shadow-teal-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                            >
                                {t('home.cta_primary')}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                            <Link
                                to={`/${i18n.language}/partners`}
                                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-brand-navy transition-all duration-200 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 shadow-sm"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                {t('home.cta_secondary')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats - Natural Flow (Not Absolute) */}
                <div className="relative z-20 w-full bg-white/50 backdrop-blur-sm border-t border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up delay-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="pl-4 border-l-4 border-brand-primary/20">
                                <div className="text-xl font-bold text-brand-navy">Erasmus+ KA220-VET</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PROGRAMME</div>
                            </div>
                            <div className="pl-4 border-l-4 border-brand-primary/20">
                                <div className="text-xl font-bold text-brand-navy">24 Months</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">DURATION</div>
                            </div>
                            <div className="pl-4 border-l-4 border-brand-primary/20">
                                <div className="text-xl font-bold text-brand-navy">Industrial Reskilling</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">FOCUS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Consortium Logos */}
            <section className="bg-white py-12 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Project Consortium
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                        {/* FVEM */}
                        <a
                            href="https://www.fvem.es"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
                        >
                            <img
                                src="/FVEM-EN.jpg"
                                alt="FVEM"
                                className="max-h-12 w-auto object-contain"
                            />
                        </a>
                        {/* Media Creativa (Sociocreativo) */}
                        <a
                            href="https://mediacreativa.eu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
                        >
                            <img
                                src="/Media Creativa 2020.jpg"
                                alt="Media Creativa"
                                className="max-h-12 w-auto object-contain"
                            />
                        </a>
                        {/* SBA */}
                        <a
                            href="https://www.sbagency.sk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
                        >
                            <img
                                src="/sba.jpg"
                                alt="SBA"
                                className="max-h-12 w-auto object-contain"
                            />
                        </a>
                        {/* SPIN */}
                        <a
                            href="https://sparkling-intuition.eu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
                        >
                            <img
                                src="/SPIN logo large.png"
                                alt="SPIN"
                                className="max-h-12 w-auto object-contain"
                            />
                        </a>
                        {/* Confindustria Veneto SIAV */}
                        <a
                            href="https://www.siav.net/wp/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
                        >
                            <img
                                src="/Conf.Veneto SIAV logo.png"
                                alt="Confindustria Veneto SIAV"
                                className="max-h-12 w-auto object-contain"
                            />
                        </a>
                        {/* Room 466 */}
                        <a
                            href="https://www.wko.at/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
                        >
                            <img
                                src="/room-466-logo-blau-transparent-300dpi.png"
                                alt="Room 466"
                                className="max-h-12 w-auto object-contain"
                            />
                        </a>
                    </div>
                </div>
            </section>

            {/* Features / Pillars */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                            <Lightbulb className="w-3 h-3" />
                            {t('home.pillars_badge')}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t('home.pillars_title')}</h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            {t('home.pillars_subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => {
                            const icons = [BrainCircuit, Target, Users];
                            const Icon = icons[idx] || Lightbulb;
                            return (
                                <div key={idx} className="group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-7 h-7 text-brand-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Impact Preview */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                                <TrendingUp className="w-3 h-3" />
                                {t('home.impact_badge')}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.impact_title')}</h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                {t('home.impact_text')}
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[1, 2, 3].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                                        <span className="text-slate-300">{t(`home.impact_point_${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to={`/${i18n.language}/impact`}
                                className="inline-flex items-center text-white font-bold hover:text-brand-secondary transition-colors"
                            >
                                {t('home.impact_cta')}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/20 to-brand-primary/20 blur-3xl rounded-full"></div>
                            <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
                                {/* Simplified Graph/Chart Visualization */}
                                <div className="space-y-6">
                                    {[1, 2, 3].map((val, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm font-medium text-slate-400">
                                                <span>{t(`home.chart_label_${val}`)}</span>
                                                <span className="text-white">{85 + (i * 5)}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                                                    style={{ width: `${85 + (i * 5)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
