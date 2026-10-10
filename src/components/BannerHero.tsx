import React from 'react';
import { useNavigation } from '../context/NavigationContext';

interface BannerHeroProps {
  headingFontSize?: number;
  useCaslonFont?: boolean;
  parallaxEnabled?: boolean;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  headingFontSize = 44,
  useCaslonFont = false,
}) => {
  const { navigate } = useNavigation();

  // Font family calculation
  const computedFontFamily = useCaslonFont
    ? "'Libre Caslon Condensed', 'Libre Caslon Display', 'Libre Caslon Text', Georgia, serif"
    : "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const computedFontSize =
    headingFontSize === 44 || headingFontSize === 42
      ? 'clamp(26px, 4.4vw, 46px)'
      : `${headingFontSize}px`;

  return (
    <div className="relative w-full text-center px-4 pt-[130px] xs:pt-[140px] sm:pt-36 md:pt-40 lg:pt-44 xl:pt-46 pb-4 sm:pb-6 max-w-5xl mx-auto">
      {/* 1. Hero Eyebrow Badge: Developer House · Built With Conviction. */}
      <div className="inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-full border border-black/15 bg-black/[0.04] text-[10.5px] sm:text-xs font-semibold tracking-wider text-black mb-3 sm:mb-4 select-none no-copy shadow-xs">
        <span className="text-black">Developer House<span className="text-[#E0343F]"> · </span>Built With Conviction<span className="text-[#E0343F]">.</span></span>
      </div>

      {/* 2. Editorial Headline */}
      <h1
        style={{
          fontFamily: computedFontFamily,
          fontSize: computedFontSize,
          fontWeight: 400,
          letterSpacing: '-0.025em',
          lineHeight: 1.22,
          color: '#000000',
        }}
        className="text-black max-w-4xl mx-auto transition-colors duration-200 select-none no-copy"
      >
        {/* Line 1: You don't need just a page online. */}
        <div className="flex items-center justify-center flex-wrap gap-y-1.5 my-1">
          <span className="text-black mr-[0.24em]">You don't need just a page</span>
          <span className="inline-flex items-center px-2.5 sm:px-3.5 py-0.5 rounded-xl sm:rounded-2xl bg-black text-white font-medium shadow-xs transition-transform duration-150 hover:scale-105">
            online
          </span>
          <span className="text-[#E0343F] ml-[0.06em] font-medium">.</span>
        </div>

        {/* Line 2: You need a website that sells for your business. */}
        <div className="flex items-center justify-center flex-wrap gap-y-1.5 my-1 sm:mt-2">
          <span className="text-black mr-[0.24em]">You need a</span>
          <span className="inline-flex items-center px-2.5 sm:px-3.5 py-0.5 rounded-xl sm:rounded-2xl bg-black text-white font-medium shadow-xs transition-transform duration-150 hover:scale-105">
            website
          </span>
          <span className="text-black ml-[0.24em]">that sells for your business</span>
          <span className="text-[#E0343F] ml-[0.06em] font-medium">.</span>
        </div>
      </h1>

      {/* 3. Subheading: Suggested positioning */}
      <p
        style={{
          fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 400,
          color: '#000000',
        }}
        className="mt-4 sm:mt-5 md:mt-6 text-black text-sm sm:text-base md:text-[18px] max-w-2xl mx-auto leading-relaxed tracking-normal px-2 sm:px-4 no-copy flex items-center justify-center flex-wrap gap-y-1"
      >
        <span className="text-black">We build high-performance websites and&nbsp;</span>
        <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 rounded-lg sm:rounded-xl bg-black text-white font-medium text-xs sm:text-sm md:text-base shadow-xs transition-transform duration-150 hover:scale-105">
          digital experiences
        </span>
        <span className="text-black">&nbsp;for ambitious businesses</span>
        <span className="text-[#E0343F] font-medium">.</span>
      </p>

      {/* 4. Action Buttons */}
      <div className="mt-6 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
        {/* See Our Work Button */}
        <button
          onClick={() => navigate('work')}
          style={{
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            lineHeight: 1.25,
          }}
          className="group px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-black hover:bg-neutral-800 text-white tracking-normal transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.15)] active:scale-95 cursor-pointer"
        >
          <span>See Our Work</span>
        </button>

        {/* How We Work Button */}
        <button
          onClick={() => {
            const el = document.getElementById('how-we-work');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('home');
              setTimeout(() => {
                document.getElementById('how-we-work')?.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }
          }}
          style={{
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            lineHeight: 1.25,
          }}
          className="group px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-black/20 bg-white/90 hover:bg-black/5 text-black tracking-normal transition-all duration-200 shadow-xs active:scale-95 cursor-pointer backdrop-blur-xs"
        >
          <span>How We Work</span>
        </button>
      </div>
    </div>
  );
};
