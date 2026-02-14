import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Users, Cpu, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useTranslation();
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

    const stats = [
        { label: "Programme", value: "Erasmus+ KA220-VET" },
        { label: "Duration", value: "24 Months" },
        { label: "Focus", value: "Industrial Reskilling" }
    ];

    const partners = [
        { name: "FVEM", img: "FVEM-EN.jpg", url: "https://www.fvem.es" },
        { name: "Media Creativa", img: "Media Creativa 2020.jpg", url: "https://mediacreativa.eu/" },
        { name: "Slovak Business Agency", img: "sba.jpg", url: "https://www.sbagency.sk/" },
        { name: "Sparkling Intuition", img: "SPIN logo large.png", url: "https://sparkling-intuition.eu/" },
        { name: "Confindustria Veneto SIAV", img: "Conf.Veneto SIAV logo.png", url: "https://www.siav.net/wp/" },
        { name: "WKO Austria", img: "room-466-logo-blau-transparent-300dpi.png", url: "https://www.wko.at/" }
    ];

    return (
        <div className="bg-white font-body text-slate-600">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden isolating">
                <div className="absolute inset-0 z-0">
                    {/* Background Canvas Layer */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-white">
                        <canvas
                            ref={canvasRef}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}
                        />
                        {/* Hidden Source Video */}
                        <video
                            ref={videoRef}
                            muted
                            playsInline
                            className="hidden"
                            crossOrigin="anonymous"
                        >
                            <source src={`${import.meta.env.BASE_URL}grok-video-62201ec6-f2cd-4ba2-8091-1878cb5ffc72.mp4`} type="video/mp4" />
                        </video>
                    </div>

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10"></div>
                </div>

                <div className="max-w-7xl mx-auto px-8 w-full relative z-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
                            <span className="flex h-2 w-2 rounded-full bg-primary-green"></span>
                            Erasmus+ Cooperation Partnership
                        </div>

                        <div className="text-3xl md:text-4xl font-bold font-heading text-[#224075] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-75">
                            Learning Brains
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1] font-heading text-primary-green animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                            {t('home.hero_title')}
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-normal max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
                            {t('home.hero_subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-5 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                            <Link
                                to="/about"
                                className="w-full sm:w-auto px-10 py-4 bg-primary-green text-white font-bold rounded-xl hover:shadow-xl hover:shadow-green-900/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                {t('home.cta')}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/partners"
                                className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                            >
                                <Users className="w-5 h-5 text-primary-green" />
                                Meet our Partners
                            </Link>
                        </div>

                        {/* Stats Row */}
                        <div className="mt-20 flex flex-wrap items-center gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="flex flex-col">
                                        <span className="text-xl md:text-2xl font-bold text-primary-green font-heading">{stat.value}</span>
                                        <span className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                                    </div>
                                    {i < stats.length - 1 && (
                                        <div className="w-px h-10 bg-slate-200 ml-8 md:ml-12 hidden sm:block"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-24 bg-white border-y border-slate-50">
                <div className="max-w-7xl mx-auto px-8">
                    <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-16 font-heading">
                        Project Consortium
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
                        {partners.map((partner, index) => (
                            <a
                                key={index}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}${partner.img}`}
                                    alt={partner.name}
                                    className="h-12 md:h-16 object-contain"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Updates / Insights Section */}
            <section className="py-32 bg-slate-100">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-bold mb-4 tracking-tight font-heading text-slate-900">Latest Updates</h2>
                            <p className="text-slate-500">Milestones, events, and results from the Learning Brains project.</p>
                        </div>
                        <Link
                            to="/news"
                            className="flex items-center gap-2 text-primary-green font-bold group border-b-2 border-primary-green/10 pb-1 hover:border-primary-green transition-all font-heading"
                        >
                            View All News
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* News Card 1 */}
                        <a
                            href="https://www.linkedin.com/feed/update/urn:li:activity:7426532433669361664"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-card rounded-2xl overflow-hidden group block"
                        >
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <img
                                    src={`${import.meta.env.BASE_URL}News/kickoff-meeting-ai.png`}
                                    alt="Kick-off"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/95 backdrop-blur shadow-sm text-primary-green text-[10px] font-extrabold uppercase rounded-full font-heading">
                                        Meeting
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5">Feb 2026</span>
                                    <span className="flex items-center gap-1.5">Bilbao, Spain</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 leading-snug group-hover:opacity-80 transition-opacity font-heading text-slate-800">
                                    Project Kick-off Meeting
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                    The partners met for the first time at the FVEM headquarters to discuss the project timeline.
                                </p>
                                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary-green group/link font-heading">
                                    Read on LinkedIn
                                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </a>
                        {/* Placeholder Card 2 */}
                        <div className="news-card rounded-2xl overflow-hidden group opacity-60 pointer-events-none grayscale">
                            <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                <Rocket className="w-12 h-12 text-slate-300" />
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-[11px] font-bold text-slate-300 mb-4 uppercase tracking-wider">
                                    <span>Coming Soon</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 leading-snug font-heading text-slate-400">
                                    Consortium Methodology
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Developing the core framework for industrial reskilling and on-the-job learning.
                                </p>
                            </div>
                        </div>

                        {/* Placeholder Card 3 */}
                        <div className="news-card rounded-2xl overflow-hidden group opacity-60 pointer-events-none grayscale">
                            <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                <Cpu className="w-12 h-12 text-slate-300" />
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-[11px] font-bold text-slate-300 mb-4 uppercase tracking-wider">
                                    <span>Coming Soon</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 leading-snug font-heading text-slate-400">
                                    AI Tools Research
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Analyzing state-of-the-art AI applications for vocational training environments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
