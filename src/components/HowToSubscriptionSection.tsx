import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, VolumeX } from 'lucide-react';
import { HowToSubscriptionData, ReelVideoItem } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';

interface HowToSubscriptionSectionProps {
  data: HowToSubscriptionData;
  onJoinClick: () => void;
}

const ReelCard: React.FC<{ reel: ReelVideoItem; index: number }> = ({ reel, index }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const fallbackTranslation = t.howTo.reels[index] || {
    stepNumber: `0${index + 1}`,
    title: `Phase 0${index + 1}`,
    description: '',
    badge: `STEP 0${index + 1}`,
  };

  const reelTitle = reel.title || fallbackTranslation.title;
  const reelDesc = reel.description || fallbackTranslation.description;
  const reelBadge = reel.badge || fallbackTranslation.badge;
  const reelStep = reel.stepNumber || fallbackTranslation.stepNumber;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict requirements: Always muted, autoplay, loop, playsinline
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log('Autoplay deferred, will trigger on visibility:', err);
      });
    }
  }, [reel.videoUrl]);

  // Ensure continuous playing when section is in view and when tab becomes active
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && video) {
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video) {
            video.muted = true;
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.15 }
    );

    document.addEventListener('visibilitychange', handleVisibility);
    observer.observe(video);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative flex flex-col group w-full">
      {/* Reel Card Outer Container with Instagram-style Aspect Ratio 9:16 */}
      <div className="relative w-full aspect-[9/16] bg-[#141414] rounded-lg sm:rounded-xl overflow-hidden border-2 border-neutral-800/90 group-hover:border-[#FFE600] transition-all duration-300 shadow-xl shadow-black/80 flex flex-col justify-between">
        {/* Seamless Vertical Looping Video */}
        {!hasError ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.posterUrl}
            muted
            autoPlay
            loop
            playsInline
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-neutral-900 flex items-center justify-center text-center p-2">
            <img
              src={reel.posterUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop'}
              alt={reelTitle}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <span className="relative z-10 text-[10px] text-neutral-300 font-medium">Reel Loading...</span>
          </div>
        )}

        {/* Subtle Dark Gradients for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/65 pointer-events-none" />

        {/* Top Header Bar: Reel Badge + Continuous Loop Indicator */}
        <div className="relative z-10 p-2 sm:p-3 md:p-4 flex items-center justify-between gap-1">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded bg-black/80 backdrop-blur-md border border-[#FFE600]/40 text-[#FFE600] font-heading font-black text-[9px] sm:text-xs tracking-wider uppercase shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse" />
            <span className="truncate max-w-[65px] sm:max-w-none">{reelBadge}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black/70 backdrop-blur-md text-neutral-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">
            <VolumeX className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFE600]" />
            <span className="hidden xs:inline">{t.howTo.muted}</span>
          </div>
        </div>

        {/* Central Step Number Watermark Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-20 group-hover:opacity-35 transition-opacity">
          <span className="font-heading font-black text-5xl xs:text-6xl sm:text-8xl md:text-9xl text-stroke-yellow">
            {reelStep}
          </span>
        </div>

        {/* Bottom Content Area: Instagram Reels Style Title & Explanation */}
        <div className="relative z-10 p-2 sm:p-3.5 md:p-4 lg:p-5 flex flex-col justify-end space-y-1 sm:space-y-1.5 md:space-y-2">
          {/* Step Progress Line */}
          <div className="w-full h-0.5 sm:h-1 bg-white/20 rounded-full overflow-hidden mb-0.5">
            <div className="h-full bg-[#FFE600] animate-[shimmer_2s_infinite] w-full" />
          </div>

          {/* Phase Pill */}
          <div className="flex items-center gap-1">
            <span className="font-heading font-black text-[10px] sm:text-xs md:text-sm text-[#FFE600] tracking-wider uppercase">
              {t.howTo.phase} {reelStep}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-black text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl text-white tracking-wide uppercase leading-tight group-hover:text-[#FFE600] transition-colors line-clamp-2">
            {reelTitle}
          </h3>

          {/* Description */}
          <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-neutral-300 line-clamp-2 sm:line-clamp-3 leading-tight sm:leading-relaxed font-medium">
            {reelDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export const HowToSubscriptionSection: React.FC<HowToSubscriptionSectionProps> = ({ data, onJoinClick }) => {
  const { t } = useLanguage();
  // Ensure we always display exactly the 3 reels
  const activeReels = data.reels && data.reels.length > 0 ? data.reels.slice(0, 3) : [];

  return (
    <section id="how-to-subscription" className="relative py-16 sm:py-24 md:py-28 bg-[#090909] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-neutral-900/40 via-[#090909] to-[#090909] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-900 border border-neutral-800 text-[#FFE600] text-xs font-bold tracking-widest uppercase mb-3 rounded-full">
            <RefreshCw className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>{t.howTo.badge}</span>
          </div>
          
          <h2 className="font-heading font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            {data.sectionTitle || t.howTo.sectionTitle}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-semibold tracking-wider uppercase mt-2 sm:mt-3 max-w-2xl mx-auto">
            {data.subtitle || t.howTo.subtitle}
          </p>

          <div className="w-20 h-1 bg-[#FFE600] mx-auto mt-4" />
        </div>

        {/* EXACTLY 3 REEL VIDEOS IN A SINGLE HORIZONTAL ROW (SIDE BY SIDE ON ALL SCREENS) */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full items-stretch">
            {activeReels.map((reel, idx) => (
              <ReelCard key={reel.id || idx} reel={reel} index={idx} />
            ))}
          </div>
        </div>

        {/* Bottom Helper Note & CTA */}
        <div className="mt-10 sm:mt-14 text-center flex flex-col items-center justify-center space-y-4 px-3">
          <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-md">
            {t.howTo.note}
          </p>
          <button
            onClick={onJoinClick}
            className="bg-[#FFE600] hover:bg-[#fff033] active:scale-95 text-black font-heading font-black text-base sm:text-xl py-3 sm:py-3.5 px-6 sm:px-10 rounded-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,230,0,0.3)] hover:shadow-[0_0_30px_rgba(255,230,0,0.5)] cursor-pointer"
          >
            {t.howTo.ctaBtn}
          </button>
        </div>
      </div>
    </section>
  );
};


