import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Target, Lightbulb, Users, Play, Pause, Volume2, VolumeX, Subtitles, Sparkles, RotateCcw } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const VIDEO_SUBTITLES = {
    en: [
        { start: 0.0, end: 2.25, text: 'How can AI improve learning at work?' },
        { start: 2.25, end: 5.45, text: 'Learning Brains is an Erasmus+ project developing a training program' },
        { start: 5.45, end: 8.25, text: 'and practical toolkit to help industrial companies use AI for workplace learning.' },
        { start: 8.25, end: 10.2, text: 'Follow our journey.' },
    ],
    es: [
        { start: 0.0, end: 2.25, text: '¿Cómo puede la IA mejorar el aprendizaje en el trabajo?' },
        { start: 2.25, end: 5.45, text: 'Learning Brains es un proyecto Erasmus+ que desarrolla un programa formativo' },
        { start: 5.45, end: 8.25, text: 'y un kit de herramientas práctico para ayudar a las empresas industriales a usar la IA en el aprendizaje laboral.' },
        { start: 8.25, end: 10.2, text: 'Sigue nuestro camino.' },
    ],
    it: [
        { start: 0.0, end: 2.25, text: "Come può l'IA migliorare l'apprendimento sul lavoro?" },
        { start: 2.25, end: 5.45, text: 'Learning Brains è un progetto Erasmus+ che sviluppa un programma di formazione' },
        { start: 5.45, end: 8.25, text: "e un toolkit pratico per aiutare le imprese industriali a usare l'IA per la formazione sul lavoro." },
        { start: 8.25, end: 10.2, text: 'Segui il nostro percorso.' },
    ],
    de: [
        { start: 0.0, end: 2.25, text: 'Wie kann KI das Lernen am Arbeitsplatz verbessern?' },
        { start: 2.25, end: 5.45, text: 'Learning Brains ist ein Erasmus+-Projekt, das ein Schulungsprogramm' },
        { start: 5.45, end: 8.25, text: 'und ein praktisches Toolkit entwickelt, damit Industrieunternehmen KI für das Lernen am Arbeitsplatz nutzen können.' },
        { start: 8.25, end: 10.2, text: 'Begleiten Sie uns auf unserem Weg.' },
    ],
    sk: [
        { start: 0.0, end: 2.25, text: 'Ako môže AI zlepšiť vzdelávanie na pracovisku?' },
        { start: 2.25, end: 5.45, text: 'Learning Brains je projekt Erasmus+, ktorý vyvíja vzdelávací program' },
        { start: 5.45, end: 8.25, text: 'a praktický súbor nástrojov, ktorý pomáha priemyselným podnikom využívať AI pri vzdelávaní na pracovisku.' },
        { start: 8.25, end: 10.2, text: 'Sledujte našu cestu.' },
    ],
    pt: [
        { start: 0.0, end: 2.25, text: 'Como pode a IA melhorar a aprendizagem no trabalho?' },
        { start: 2.25, end: 5.45, text: 'O Learning Brains é um projeto Erasmus+ que desenvolve um programa de formação' },
        { start: 5.45, end: 8.25, text: 'e um kit de ferramentas prático para ajudar as empresas industriais a usar a IA na aprendizagem no local de trabalho.' },
        { start: 8.25, end: 10.2, text: 'Acompanhe o nosso percurso.' },
    ],
};

const About = () => {
    const { t, i18n } = useTranslation();
    const videoRef = useRef(null);

    const langCode = (i18n.language || 'en').split('-')[0].toLowerCase();
    const activeSubtitles = VIDEO_SUBTITLES[langCode] || VIDEO_SUBTITLES.en;

    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showSubtitles, setShowSubtitles] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);

    const activeCue = activeSubtitles.find((cue) => currentTime >= cue.start && currentTime <= cue.end);
    const currentSubtitle = activeCue ? activeCue.text : '';

    const objectives = t('about.objectives_list', { returnObjects: true });
    const focusAreas = t('about.focus_list', { returnObjects: true });
    const targetGroups = t('about.target_list', { returnObjects: true });

    const videoSrc = `${import.meta.env.BASE_URL}videos/clara-welcome.mp4`;
    const posterSrc = `${import.meta.env.BASE_URL}videos/clara-poster.jpg`;
    const vttSrc = `${import.meta.env.BASE_URL}videos/clara-welcome-en.vtt`;

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused || video.ended) {
            if (video.ended || !hasStarted) {
                video.currentTime = 0;
            }
            video.muted = isMuted;
            video.play();
            setHasStarted(true);
            setIsPlaying(true);
            setIsEnded(false);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleToggleMute = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        const nextMuted = !isMuted;
        video.muted = nextMuted;
        setIsMuted(nextMuted);
    };

    const handleToggleSubtitles = (e) => {
        e.stopPropagation();
        setShowSubtitles((prev) => !prev);
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video) return;
        setCurrentTime(video.currentTime);
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
        setIsEnded(true);
        setCurrentTime(0);
    };

    return (
        <div className="py-16 md:py-24">
            <SEOHead
                title={t('about.seo_title')}
                description={t('about.seo_description')}
                path="/about"
            />

            {/* Page Title Header */}
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12 md:mb-14 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-secondary text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Users className="w-3 h-3" />
                        {t('about.label', 'About Us')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-headline mb-4 tracking-tight">
                        {t('about.title')}
                    </h1>
                </div>
            </div>

            {/* Clara Welcome Video Block (2 columns on desktop, stacked on mobile) */}
            <div className="max-w-5xl mx-auto px-6 mb-20 animate-fade-in-up delay-75">
                <div className="bg-white/95 border border-slate-200/80 rounded-2xl shadow-md shadow-slate-900/5 p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10">
                    {/* Left Column: Short Presentation */}
                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50/90 text-brand-secondary text-[11px] font-semibold tracking-wide mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{t('about.clara_badge', 'Welcome to the Project')}</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-brand-primary leading-tight mb-4">
                            {t('about.clara_title', 'Discover Learning Brains')}
                        </h2>

                        <p className="text-slate-600 text-base leading-relaxed">
                            {t(
                                'about.clara_text',
                                'Before diving into the project details, watch this brief introduction to how Learning Brains brings artificial intelligence into real-world workplace learning for industrial companies.'
                            )}
                        </p>
                    </div>

                    {/* Right Column: Video Player (450–500px on desktop to preserve crisp sharpness) */}
                    <div className="w-full md:w-[460px] lg:w-[500px] flex-shrink-0">
                        <div
                            onClick={handlePlayPause}
                            className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 cursor-pointer group aspect-[752/416]"
                        >
                            <video
                                ref={videoRef}
                                src={videoSrc}
                                poster={posterSrc}
                                preload="metadata"
                                playsInline
                                onTimeUpdate={handleTimeUpdate}
                                onEnded={handleVideoEnded}
                                className="w-full h-full object-cover block"
                            >
                                <track
                                    kind="subtitles"
                                    src={vttSrc}
                                    srcLang="en"
                                    label="English"
                                />
                            </video>

                            {/* Cover image overlay before start or when ended */}
                            {(!hasStarted || isEnded) && (
                                <img
                                    src={posterSrc}
                                    alt="Learning Brains project introduction"
                                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                />
                            )}

                            {/* Play / Replay Overlay Button */}
                            {!isPlaying && (
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-colors flex flex-col items-center justify-center">
                                    <button
                                        type="button"
                                        aria-label={isEnded ? 'Replay video' : 'Play welcome video'}
                                        className="w-16 h-16 rounded-full bg-brand-primary/95 group-hover:bg-brand-secondary text-white shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ring-4 ring-white/80"
                                    >
                                        {isEnded ? (
                                            <RotateCcw className="w-6 h-6" />
                                        ) : (
                                            <Play className="w-7 h-7 ml-1 fill-current" />
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* English Subtitles Overlay */}
                            {isPlaying && showSubtitles && currentSubtitle && (
                                <div className="absolute bottom-11 left-3 right-3 flex justify-center pointer-events-none z-10">
                                    <span className="bg-slate-950/85 text-white text-xs sm:text-[13px] font-medium px-3 py-1.5 rounded-md text-center leading-snug shadow-md backdrop-blur-xs max-w-[95%]">
                                        {currentSubtitle}
                                    </span>
                                </div>
                            )}

                            {/* Bottom Control Bar */}
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute bottom-0 inset-x-0 px-3 py-2 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex items-center justify-between text-white text-xs"
                            >
                                <button
                                    type="button"
                                    onClick={handlePlayPause}
                                    className="inline-flex items-center gap-1.5 p-1.5 rounded hover:bg-white/15 transition-colors font-medium"
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? (
                                        <Pause className="w-3.5 h-3.5 fill-current" />
                                    ) : (
                                        <Play className="w-3.5 h-3.5 fill-current" />
                                    )}
                                </button>

                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={handleToggleSubtitles}
                                        title={showSubtitles ? 'Hide subtitles' : 'Show subtitles'}
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold uppercase transition-colors ${
                                            showSubtitles
                                                ? 'bg-brand-secondary text-white'
                                                : 'bg-white/20 text-white/75 hover:bg-white/30'
                                        }`}
                                    >
                                        <Subtitles className="w-3.5 h-3.5" />
                                        <span>{langCode.toUpperCase()}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleToggleMute}
                                        title={isMuted ? 'Unmute sound' : 'Mute sound'}
                                        className="p-1 rounded bg-white/20 hover:bg-white/30 transition-colors"
                                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                                    >
                                        {isMuted ? (
                                            <VolumeX className="w-3.5 h-3.5" />
                                        ) : (
                                            <Volume2 className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6">
                <div className="space-y-20">
                    {/* Background & Context */}
                    <section className="animate-fade-in-up delay-100">
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">{t('about.background_title')}</h2>
                        </div>
                        <p className="text-slate-500 text-base md:text-[17px] leading-relaxed">
                            {t('about.background_text')}
                        </p>
                    </section>

                    {/* Project Objectives */}
                    <section className="animate-fade-in-up delay-200">
                        <div className="flex items-center gap-3 mb-8">
                            <Target className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">{t('about.objectives_title')}</h2>
                        </div>
                        <div className="space-y-3">
                            {objectives.map((obj, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-lg group transition-colors hover:bg-slate-100">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-secondary text-white flex items-center justify-center text-[10px] font-bold">
                                        {idx + 1}
                                    </div>
                                    <p className="text-slate-600 text-sm md:text-base">{obj}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Focus Areas */}
                    <section className="animate-fade-in-up delay-300">
                        <div className="flex items-center gap-3 mb-8">
                            <Lightbulb className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">{t('about.focus_title')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {focusAreas.map((area, idx) => (
                                <div key={idx} className="p-5 border border-slate-100 rounded-xl shadow-sm text-slate-600 text-[15px] font-medium bg-white">
                                    {area}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Target Groups */}
                    <section className="animate-fade-in-up delay-500">
                        <div className="flex items-center gap-3 mb-8">
                            <Users className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">{t('about.target_title')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {targetGroups.map((group, idx) => (
                                <div key={idx} className="p-5 border border-slate-100 rounded-xl shadow-sm text-slate-600 text-[15px] font-medium bg-white">
                                    {group}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
