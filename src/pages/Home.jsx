import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Users, Calendar, MapPin, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { AnimatedCount } from '../hooks/AnimatedCount';

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

        // IMMEDIATELY fill canvas with white before video loads
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let frames = [];
        let animationFrameId;
        let isCollecting = true;
        let frameIndex = 0;
        let direction = 1; // 1 = forward, -1 = backward
        let lastTime = 0;
        const fpsInterval = 1000 / 30; // Limit playback to 30fps for smoothness

        const captureFrame = async (now, metadata) => {
            if (!video.paused && !video.ended && isCollecting) {
                try {
                    const bitmap = await createImageBitmap(video, { resizeWidth: 1280 });
                    frames.push(bitmap);

                    // Draw capture feedback
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

                    // Continue capturing
                    video.requestVideoFrameCallback(captureFrame);
                } catch (e) {
                    console.error("Frame capture error:", e);
                    // Fallback or retry
                    if (isCollecting) video.requestVideoFrameCallback(captureFrame);
                }
            }
            // The 'ended' check is now handled by the event listener to be robust
        };

        let loopStartTime = null;

        const renderLoop = (timestamp) => {
            if (frames.length > 0) {
                if (!loopStartTime) loopStartTime = timestamp;
                const runtime = timestamp - loopStartTime;

                // Harmonic Oscillation (Cosine Wave)
                // We use Cosine because cos(0) = 1, which maps to the END of the video.
                // Since we start the loop right after the video ends, this ensures no jump.
                // Cycle: End -> Start -> End

                // Adjust speed: 80ms per frame equivalent for the full wave period
                const cycleDuration = frames.length * 80;

                // Calculate phase (0 to 1, to 2...)
                const phase = (runtime / cycleDuration) * 2 * Math.PI;

                // (Cos + 1) / 2 goes from: 1 -> 0 -> 1
                const normalizedPos = (Math.cos(phase) + 1) / 2;

                // Map to frame index
                frameIndex = Math.floor(normalizedPos * (frames.length - 1));

                // Clamp for safety
                if (frameIndex >= frames.length) frameIndex = frames.length - 1;
                if (frameIndex < 0) frameIndex = 0;

                const frame = frames[frameIndex];
                if (frame) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
                }
            }

            animationFrameId = requestAnimationFrame(renderLoop);
        };

        const handleLoadedMetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            setIsVideoLoaded(true);

            video.onended = () => {
                isCollecting = false;
                frameIndex = frames.length - 1;
                direction = -1;
                // Start playback loop
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(renderLoop);
                }
            };

            video.play().then(() => {
                if ('requestVideoFrameCallback' in video) {
                    video.requestVideoFrameCallback(captureFrame);
                } else {
                    // Fallback for older browsers (unlikely given modern context, but safe)
                    console.warn("requestVideoFrameCallback not supported, falling back to basic loop");
                    const basicLoop = () => {
                        if (isCollecting && !video.ended) {
                            createImageBitmap(video, { resizeWidth: 1280 }).then(bm => {
                                frames.push(bm);
                                ctx.drawImage(bm, 0, 0, canvas.width, canvas.height);
                            });
                            requestAnimationFrame(basicLoop);
                        } else {
                            isCollecting = false;
                            requestAnimationFrame(renderLoop);
                        }
                    };
                    basicLoop();
                }
            }).catch(e => console.error("Autoplay failed:", e));
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            cancelAnimationFrame(animationFrameId);
            frames.forEach(frame => frame.close());
        };
    }, []);

    return (
        <div className="font-body text-slate-600">
            <SEOHead
                title={t('home.seo_title')}
                description={t('home.seo_description')}
                path="/"
            />

            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex flex-col overflow-hidden">
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
                    className="absolute inset-0 w-full h-full object-cover z-0 bg-white"
                />

                {/* Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent z-10" />

                {/* Main Content Container - Positioned higher on page with fluid padding */}
                <div className="relative z-20 flex-grow flex flex-col justify-start py-fluid-hero w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
                        <div className="max-w-3xl">
                            {/* Validation Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-brand-navy text-[10px] font-bold uppercase tracking-wider animate-fade-in-up">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                                {t('home.hero_badge')}
                            </div>

                            {/* Typography Block */}
                            <div className="mt-8 animate-fade-in-up delay-100">
                                {/* Top Title - Navy Blue Fluid */}
                                <h2 className="text-fluid-h2 font-bold font-sans text-brand-title-blue mb-4">
                                    {t('home.hero_name')}
                                </h2>
                                {/* Main Headline - Green Fluid */}
                                <h1 className="text-fluid-h1 font-extrabold font-sans tracking-tight text-brand-primary whitespace-pre-line">
                                    {t('home.hero_title')}
                                </h1>
                            </div>

                            {/* Subtitle Fluid */}
                            <p className="mt-10 text-fluid-p text-slate-500 font-medium max-w-xl animate-fade-in-up delay-200">
                                {t('home.hero_subtitle')}
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

                            {/* Stats - Tighter spacing below CTAs */}
                            <div className="mt-12 animate-fade-in-up delay-400">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="pl-4 border-l-2 border-brand-primary/20">
                                        <div className="text-lg font-bold text-brand-navy">{t('home.hero_stats.programme_name')}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t('home.hero_stats.programme')}</div>
                                    </div>
                                    <div className="pl-4 border-l-2 border-brand-primary/20">
                                        <div className="text-lg font-bold text-brand-navy">
                                            <AnimatedCount end={24} duration={2000} /> {t('home.hero_stats.duration_label_text')}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t('home.hero_stats.duration_label')}</div>
                                    </div>
                                    <div className="pl-4 border-l-2 border-brand-primary/20">
                                        <div className="text-lg font-bold text-brand-navy">
                                            <AnimatedCount end={6} duration={1500} /> {t('home.hero_stats.partners_label_text')}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t('home.hero_stats.partners_label')}</div>
                                    </div>
                                    <div className="pl-4 border-l-2 border-brand-primary/20">
                                        <div className="text-lg font-bold text-brand-navy">
                                            <AnimatedCount end={5} duration={1000} /> {t('home.hero_stats.countries_label_text')}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t('home.hero_stats.countries_label')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Consortium Band - Glued to the bottom */}
                <div className="relative z-30 w-full bg-white/95 backdrop-blur-md border-y border-slate-100 py-8 md:py-12 animate-fade-in-up delay-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-between items-center gap-x-8 gap-y-6 md:gap-x-12">
                            {/* FVEM */}
                            <a href="https://www.fvem.es" target="_blank" rel="noopener noreferrer" title="FVEM" className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                <img src={`${import.meta.env.BASE_URL}FVEM-EN.jpg`} alt="FVEM" className="h-full w-auto object-contain" />
                            </a>
                            {/* Media Creativa */}
                            <a href="https://mediacreativa.eu/" target="_blank" rel="noopener noreferrer" title="Media Creativa" className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                <img src={`${import.meta.env.BASE_URL}Media Creativa 2020.jpg`} alt="Media Creativa" className="h-full w-auto object-contain" />
                            </a>
                            {/* SBA */}
                            <a href="https://www.sbagency.sk/" target="_blank" rel="noopener noreferrer" title="SBA" className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                <img src={`${import.meta.env.BASE_URL}sba.jpg`} alt="SBA" className="h-full w-auto object-contain" />
                            </a>
                            {/* SPIN */}
                            <a href="https://sparkling-intuition.eu/" target="_blank" rel="noopener noreferrer" title="Sparkling Intuition" className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                <img src={`${import.meta.env.BASE_URL}SPIN logo large.png`} alt="SPIN" className="h-full w-auto object-contain" />
                            </a>
                            {/* SIAV */}
                            <a href="https://www.siav.net/wp/" target="_blank" rel="noopener noreferrer" title="SIAV" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                <img src={`${import.meta.env.BASE_URL}Conf.Veneto SIAV logo.png`} alt="SIAV" className="h-full w-auto object-contain" />
                            </a>
                            {/* Room 466 */}
                            <a href="https://www.wko.at/" target="_blank" rel="noopener noreferrer" title="Room 466 (WKO)" className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                <img src={`${import.meta.env.BASE_URL}room-466-logo-blau-transparent-300dpi.png`} alt="Room 466" className="h-full w-auto object-contain" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Updates */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{t('home.latest_updates.title')}</h2>
                            <p className="text-slate-500">{t('home.latest_updates.description')}</p>
                        </div>
                        <Link
                            to={`/${i18n.language}/news`}
                            className="hidden md:inline-flex items-center text-slate-900 font-semibold hover:text-brand-primary transition-colors"
                        >
                            {t('home.latest_updates.view_all')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {t('news.items_list', { returnObjects: true }).slice(0, 3).map((item, idx) => {
                            const newsData = [
                                {
                                    date: "Feb 2026",
                                    location: "Bilbao, Spain",
                                    image: "News/kickoff-meeting-ai.png"
                                },
                                {
                                    date: "Apr 2026",
                                    location: "Online",
                                    image: "",
                                    icon: Calendar
                                },
                                {
                                    date: "Jun 2026",
                                    location: "Venice, Italy",
                                    image: "",
                                    icon: Users
                                }
                            ];

                            const staticData = newsData[idx] || {};
                            const NewsIcon = staticData.icon || Newspaper;

                            return (
                                <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 flex flex-col">
                                    <div className="aspect-[16/10] bg-slate-50 relative overflow-hidden">
                                        {staticData.image ? (
                                            <img
                                                src={`${import.meta.env.BASE_URL}${staticData.image}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 group-hover:bg-teal-50/50 transition-colors">
                                                <NewsIcon className="w-12 h-12 text-slate-200 group-hover:text-brand-secondary/30 transition-colors" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-primary border border-slate-100">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {staticData.date}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {staticData.location}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-brand-primary transition-colors">
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
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                                            </a>
                                        ) : (
                                            <Link
                                                to={`/${i18n.language}/news`}
                                                className="inline-flex items-center text-brand-secondary font-bold text-sm group/link"
                                            >
                                                {t('news.read_more')}
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Home;
