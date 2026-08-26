import React from 'react';
import { Dumbbell, Apple, Shield, Flame, Activity, Target, Heart, Zap } from 'lucide-react';
import { HealthierChoicesData } from '../types/fitness';
import { useLanguage } from '../context/LanguageContext';

interface MakeHealthierChoicesSectionProps {
  data: HealthierChoicesData;
  onJoinClick: () => void;
}

const renderFeatureIcon = (iconName: string) => {
  const props = { className: 'w-7 h-7 text-black stroke-[2.5]' };
  switch (iconName) {
    case 'dumbbell':
      return <Dumbbell {...props} />;
    case 'apple':
      return <Apple {...props} />;
    case 'shield':
      return <Shield {...props} />;
    case 'flame':
      return <Flame {...props} />;
    case 'activity':
      return <Activity {...props} />;
    case 'target':
      return <Target {...props} />;
    case 'heart':
      return <Heart {...props} />;
    case 'zap':
    default:
      return <Zap {...props} />;
  }
};

export const MakeHealthierChoicesSection: React.FC<MakeHealthierChoicesSectionProps> = ({ data, onJoinClick }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="healthier-choices" className="relative py-20 sm:py-28 bg-[#090909] overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFE600]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 text-[#FFE600] text-xs font-bold tracking-widest uppercase mb-3 rounded-full">
            <Activity className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>{t.choices.badge}</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            {t.choices.sectionTitle}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-semibold tracking-wider uppercase mt-3 max-w-2xl mx-auto">
            {t.choices.subtitle}
          </p>

          <div className="w-20 h-1 bg-[#FFE600] mx-auto mt-4" />
        </div>

        {/* Three Feature Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.features.slice(0, 3).map((feature, idx) => {
            const translated = t.choices.features[idx] || {
              title: feature.title,
              description: feature.description,
            };

            return (
              <div
                key={feature.id || idx}
                className="relative group bg-[#111111] border border-neutral-800 rounded-lg p-7 sm:p-8 flex flex-col justify-between hover:border-[#FFE600] transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Optional Background image overlay if specified */}
                {feature.imageBg && (
                  <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <img
                      src={feature.imageBg}
                      alt={translated.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
                  </div>
                )}

                <div className="relative z-10">
                  {/* Top Row: Icon + Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-md bg-[#FFE600] flex items-center justify-center shadow-[0_0_20px_rgba(255,230,0,0.35)] group-hover:scale-110 transition-transform duration-300">
                      {renderFeatureIcon(feature.iconName)}
                    </div>
                    <span className="font-heading font-black text-4xl text-neutral-800 group-hover:text-[#FFE600]/30 transition-colors">
                      {feature.highlightNumber || `0${idx + 1}`}
                    </span>
                  </div>

                  {/* Feature Title */}
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wide uppercase mb-3 group-hover:text-[#FFE600] transition-colors">
                    {translated.title}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                    {translated.description}
                  </p>
                </div>

                {/* Bottom Accent Bar */}
                <div className="relative z-10 mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#FFE600] uppercase tracking-widest">
                    {t.choices.pillar} 0{idx + 1}
                  </span>
                  <span className="text-neutral-600 group-hover:text-[#FFE600] transition-colors">
                    {isRTL ? '←' : '→'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onJoinClick}
            className="bg-[#FFE600] hover:bg-[#fff033] active:scale-95 text-black font-heading font-black text-xl py-3.5 px-10 rounded-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,230,0,0.3)] hover:shadow-[0_0_30px_rgba(255,230,0,0.5)] cursor-pointer"
          >
            {t.choices.ctaBtn}
          </button>
        </div>
      </div>
    </section>
  );
};

