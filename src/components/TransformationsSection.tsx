import React, { useState } from 'react';
import { Sparkles, Trophy, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TransformationsData, TransformationItem } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';

interface TransformationsSectionProps {
  data: TransformationsData;
  onJoinClick: () => void;
}

export const TransformationsSection: React.FC<TransformationsSectionProps> = ({
  data,
  onJoinClick,
}) => {
  const { t, isRTL } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  const rawItems: TransformationItem[] = Array.isArray(data?.items) ? data.items : [];

  // Repeat items for infinite continuous marquee if we have items
  const marqueeItems =
    rawItems.length > 0
      ? rawItems.length < 4
        ? [...rawItems, ...rawItems, ...rawItems, ...rawItems]
        : [...rawItems, ...rawItems]
      : [];

  const sectionTitle = data?.sectionTitle || t.transformations?.sectionTitle || 'قصص ونتائج التحول الحقيقية';
  const subtitle = data?.subtitle || t.transformations?.subtitle || 'شاهد التغييرات المذهلة للأبطال الذين التزموا بخطط وبرامج كوتش مدبولي المخصصة';
  const badgeText = data?.badge || t.transformations?.badge || 'TRANSFORMATION STORIES • قبل وبعد';

  return (
    <section
      id="transformations"
      className="relative py-20 sm:py-24 md:py-28 bg-[#090909] overflow-hidden border-t border-neutral-900"
    >
      {/* Background Ambience / Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-72 bg-[#FFE600]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFE600]/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Decorative Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#FFE600 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#FFE600]/10 border border-[#FFE600]/30 px-3.5 py-1.5 rounded-full mb-4">
            <Trophy className="w-4 h-4 text-[#FFE600]" />
            <span className="font-heading font-black text-xs text-[#FFE600] tracking-widest uppercase">
              {badgeText}
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight">
            {sectionTitle}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-semibold tracking-wider uppercase mt-3 max-w-3xl mx-auto">
            {subtitle}
          </p>

          <div className="w-20 h-1 bg-[#FFE600] mx-auto mt-4" />

          {rawItems.length > 0 && (
            <p className="text-[11px] text-neutral-500 mt-2.5 font-medium">
              {t.transformations?.hoverHint || 'مرر الماوس أو المس البطاقة لإيقاف الحركة التلقائية ومعاينة التفاصيل'}
            </p>
          )}
        </div>

        {/* If no items exist */}
        {rawItems.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 px-4 bg-neutral-900/30 border border-dashed border-neutral-800 rounded-xl">
            <Trophy className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm text-neutral-400 font-bold">لا توجد قصص تحول مسجلة حالياً</p>
            <p className="text-xs text-neutral-500 mt-1">يمكن إضافة وتعديل قصص التحول في أي وقت من لوحة التحكم</p>
          </div>
        ) : (
          /* Full-Width Continuous Animated Scrolling Banner (Infinite Loop Marquee) */
          <div 
            className="relative w-full overflow-hidden py-4 select-none group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Side Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-28 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-28 bg-gradient-to-l from-[#090909] via-[#090909]/80 to-transparent z-20 pointer-events-none" />

            {/* Marquee Track */}
            <div
              className="flex items-stretch gap-6 sm:gap-8 will-change-transform"
              style={{
                animation: `${isRTL ? 'marqueeRTL' : 'marqueeLTR'} ${Math.max(35, marqueeItems.length * 6)}s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
                width: 'max-content',
              }}
            >
              {marqueeItems.map((item, idx) => {
                const key = `${item.id || 'trans'}-${idx}`;
                
                // Determine Before & After URLs
                const beforeImg = item.beforeImageUrl || item.imageUrl || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop';
                const afterImg = item.afterImageUrl || item.imageUrl || 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop';
                const isSeparateSplit = Boolean(item.beforeImageUrl && item.afterImageUrl);

                return (
                  <div
                    key={key}
                    className="w-[340px] sm:w-[400px] md:w-[450px] bg-[#111111] border border-neutral-800 hover:border-[#FFE600]/70 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col shrink-0 group/card transform-gpu hover:-translate-y-1.5"
                  >
                    {/* 1200 x 675 px (16:9) Before & After Comparison Frame */}
                    <div className="relative w-full aspect-[16/9] bg-black overflow-hidden select-none">
                      {isSeparateSplit ? (
                        /* Side-by-Side Split: Left BEFORE, Right AFTER */
                        <div className="w-full h-full flex items-stretch relative">
                          {/* Left Half: BEFORE */}
                          <div className="w-1/2 h-full relative overflow-hidden bg-neutral-950 border-r border-neutral-800">
                            <img
                              src={beforeImg}
                              alt={`${item.name} - قبل (BEFORE)`}
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop';
                              }}
                            />
                            {/* Dark gradient for legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                            {/* Small Clear BEFORE Label (Left) */}
                            <span className="absolute top-2.5 start-2.5 bg-black/85 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                              BEFORE • قبل
                            </span>
                          </div>

                          {/* Right Half: AFTER */}
                          <div className="w-1/2 h-full relative overflow-hidden bg-neutral-950">
                            <img
                              src={afterImg}
                              alt={`${item.name} - بعد (AFTER)`}
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop';
                              }}
                            />
                            {/* Dark gradient for legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                            {/* Small Clear AFTER Label (Right) */}
                            <span className="absolute top-2.5 end-2.5 bg-[#FFE600] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow font-heading">
                              AFTER • بعد
                            </span>
                          </div>

                          {/* Clean Vertical Center Divider */}
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-neutral-700 via-[#FFE600] to-neutral-700 z-10 pointer-events-none shadow-[0_0_8px_rgba(255,230,0,0.5)]" />

                          {/* Center VS Badge */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-black/90 border border-[#FFE600]/80 text-[#FFE600] text-[9px] font-black flex items-center justify-center shadow-lg font-heading pointer-events-none">
                            VS
                          </div>
                        </div>
                      ) : (
                        /* Single Composite / Direct 16:9 Image with Split Labels */
                        <div className="w-full h-full relative">
                          <img
                            src={item.imageUrl || beforeImg}
                            alt={item.name}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30 pointer-events-none" />
                          
                          {/* Top Labels */}
                          <span className="absolute top-2.5 start-2.5 bg-black/85 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                            BEFORE • قبل
                          </span>
                          <span className="absolute top-2.5 end-2.5 bg-[#FFE600] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow font-heading">
                            AFTER • بعد
                          </span>

                          {/* Clean vertical divider */}
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-[#FFE600]/60 z-10 pointer-events-none" />
                        </div>
                      )}

                      {/* Result / Weight Change Overlay Badge at Bottom of Image */}
                      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                        {item.tag ? (
                          <span className="bg-black/85 backdrop-blur-md border border-[#FFE600]/50 text-[#FFE600] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-sm shadow-md">
                            {item.tag}
                          </span>
                        ) : <span />}

                        {item.weightChange && (
                          <span className="bg-[#FFE600] text-black font-heading font-black text-[11px] px-2.5 py-0.5 rounded-sm shadow-md">
                            {item.weightChange}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Transformation Body / Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#111111]">
                      <div>
                        {/* Name & Duration */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="font-heading font-black text-base sm:text-lg text-white tracking-wide uppercase group-hover/card:text-[#FFE600] transition-colors truncate">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.duration && (
                              <span className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-700 text-[#FFE600] text-[10px] font-bold px-2 py-0.5 rounded">
                                <Clock className="w-3 h-3 text-[#FFE600]" />
                                <span>{item.duration}</span>
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>{t.transformations?.verified || 'موثق'}</span>
                            </span>
                          </div>
                        </div>

                        {/* Description Text */}
                        <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed line-clamp-3 mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Card Footer / Transformation Guarantee Stamp */}
                      <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                        <span className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                          COACH MATBOLY PROTOCOL
                        </span>
                        <button
                          onClick={onJoinClick}
                          className="text-[#FFE600] hover:text-white font-bold inline-flex items-center gap-1 text-xs transition-colors cursor-pointer"
                        >
                          <span>{t.hero?.buttonText || 'اشترك الآن'}</span>
                          {isRTL ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-10 sm:mt-14 text-center max-w-2xl mx-auto px-4">
          <button
            onClick={onJoinClick}
            className="inline-flex items-center justify-center gap-3 bg-[#FFE600] hover:bg-[#ffe100] active:scale-95 text-black font-heading font-black text-sm sm:text-base tracking-wider uppercase px-8 py-4 rounded-sm transition-all shadow-[0_0_25px_rgba(255,230,0,0.3)] hover:shadow-[0_0_35px_rgba(255,230,0,0.5)] cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>{t.transformations?.ctaBtn || 'ابدأ قصة تحولك الآن مع كوتش مدبولي'}</span>
          </button>
        </div>
      </div>

      {/* Global Embedded Styles for Keyframe Animations */}
      <style>{`
        @keyframes marqueeLTR {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRTL {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(50%);
          }
        }
      `}</style>
    </section>
  );
};

