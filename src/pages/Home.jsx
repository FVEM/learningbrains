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
            <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-white">
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
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
                />

                {/* Light Overlay to ensure text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent z-10" />

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
                            ERASMUS+ COOPERATION PARTNERSHIP
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-brand-primary leading-[1.1] animate-fade-in-up delay-100">
                            Learning Brains <br />
                            <span className="text-brand-secondary">Real Skills for Real Industry</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-slate-500 leading-relaxed max-w-xl animate-fade-in-up delay-200">
                            Integrated On-the-job Learning Systems for Industrial Reskilling
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                            <Link
                                to={`/${i18n.language}/about`}
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-secondary rounded-lg hover:bg-brand-secondary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary"
                            >
                                {t('home.cta_primary')}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                to={`/${i18n.language}/partners`}
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
                            >
                                <Users className="w-5 h-5 mr-2" />
                                {t('home.cta_secondary')}
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Stats (Integrated into Hero) */}
                    <div className="absolute bottom-12 left-0 w-full px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-slate-200 pt-8 animate-fade-in-up delay-500">
                            <div>
                                <div className="text-lg font-bold text-brand-secondary">Erasmus+ KA220-VET</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest">PROGRAMME</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-brand-secondary">24 Months</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest">DURATION</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-brand-secondary">Industrial Reskilling</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest">FOCUS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-12 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wide font-medium">{stat.label}</div>
                            </div>
                        ))}
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
