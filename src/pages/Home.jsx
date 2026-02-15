import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Users, Cpu, Rocket } from 'lucide-react';
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
            <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
                <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-brand-secondary text-[10px] font-bold uppercase tracking-wider animate-fade-in-up">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
                                </span>
                                {t('home.hero_badge')}
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] animate-fade-in-up delay-100">
                                {t('home.hero_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{t('home.hero_title_highlight')}</span>
                                <br /> {t('home.hero_title_2')}
                            </h1>

                            <p className="text-xl text-slate-500 leading-relaxed max-w-lg animate-fade-in-up delay-200">
                                {t('home.hero_subtitle')}
                            </p>

                            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                                <Link
                                    to={`/${i18n.language}/about`}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-primary rounded-full hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                                >
                                    {t('home.cta_primary')}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link
                                    to={`/${i18n.language}/partners`}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
                                >
                                    {t('home.cta_secondary')}
                                </Link>
                            </div>

                            <div className="flex items-center gap-8 pt-8 animate-fade-in-up delay-400">
                                <div className="flex -space-x-4">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm text-slate-500">
                                    <strong className="text-slate-900 block">{t('home.partners_count')}</strong>
                                    {t('home.partners_text')}
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:h-[600px] w-full flex items-center justify-center animate-fade-in-left delay-200">
                            {/* Abstract Visualization */}
                            <div className="relative w-full max-w-lg aspect-square">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
                                <div className="relative z-10 bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                            <BrainCircuit className="w-10 h-10 text-brand-primary mb-4" />
                                            <div className="h-2 w-16 bg-slate-100 rounded-full mb-2"></div>
                                            <div className="h-2 w-24 bg-slate-100 rounded-full"></div>
                                        </div>
                                        <div className="bg-brand-primary/5 p-6 rounded-2xl border border-brand-primary/10">
                                            <Cpu className="w-10 h-10 text-brand-secondary mb-4" />
                                            <div className="h-2 w-20 bg-brand-primary/10 rounded-full mb-2"></div>
                                            <div className="h-2 w-12 bg-brand-primary/10 rounded-full"></div>
                                        </div>
                                        <div className="col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl text-white">
                                            <div className="flex items-center justify-between mb-4">
                                                <TrendingUp className="w-8 h-8 text-brand-secondary" />
                                                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-full">+24%</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full w-3/4 bg-brand-secondary rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Elements */}
                                <div className="absolute -top-12 -right-12 bg-white p-4 rounded-2xl shadow-xl animate-float">
                                    <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                                </div>
                                <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl animate-float delay-1000">
                                    <Users className="w-8 h-8 text-brand-primary" />
                                </div>
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
