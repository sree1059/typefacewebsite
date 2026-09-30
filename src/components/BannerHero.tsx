import React from 'react';
import { useNavigation } from '../context/NavigationContext';

interface BannerHeroProps {
  headingFontSize?: number;
  useCaslonFont?: boolean;
  parallaxEnabled?: boolean;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  headingFontSize = 42,
  useCaslonFont = false,
}) => {
  const { navigate } = useNavigation();

  // Font family and responsive font size calculation centered on 42px
  const computedFontFamily = useCaslonFont
    ? "'Libre Caslon Condensed', 'Libre Caslon Display', 'Libre Caslon Text', Georgia, serif"
    : "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const computedFontSize =
    headingFontSize === 42
      ? 'clamp(26px, 5.2vw, 42px)'
      : `${headingFontSize}px`;

  return (
    <div
      className="relative w-full text-center px-4 pt-[135px] xs:pt-[145px] sm:pt-36 md:pt-40 lg:pt-44 xl:pt-48 pb-4 sm:pb-6 max-w-5xl mx-auto"
    >
      {/* 1. Hero Eyebrow Badge: Built With Conviction. */}
      <div className="inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-full border border-white bg-transparent text-[10.5px] sm:text-xs font-semibold tracking-wider text-[#111111] mb-2.5 sm:mb-4 no-copy">
        <span>Built With Conviction.</span>
      </div>

      {/* 2. Editorial Headline: Manrope at 42px with 320 font weight */}
      <h1
        style={{
          fontFamily: computedFontFamily,
          fontSize: computedFontSize,
          fontWeight: 320,
          letterSpacing: '-0.02em',
          lineHeight: 1.18,
          color: '#111111',
        }}
        className="text-[#111111] max-w-4xl mx-auto transition-colors duration-200 select-none no-copy"
      >
        {/* Line 1: Websites that convert. */}
        <div className="flex items-center justify-center flex-wrap">
          <span className="text-[#111111] mr-[0.26em]">Websites</span>
          <span className="text-[#111111] mr-[0.26em]">that</span>
          <span
            style={{
              color: '#ffffff',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.28)',
              fontStyle: 'normal',
            }}
            className="text-white transition-all duration-150"
          >
            convert.
          </span>
        </div>

        {/* Line 2: Brands that stand out. */}
        <div className="flex items-center justify-center flex-wrap mt-[0.06em]">
          <span className="text-[#111111] mr-[0.26em]">Brands</span>
          <span className="text-[#111111] mr-[0.26em]">that</span>
          <span
            style={{
              color: '#ffffff',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.28)',
              fontStyle: 'normal',
            }}
            className="text-white transition-all duration-150"
          >
            stand out.
          </span>
        </div>

        {/* Line 3: Digital experiences that matter. */}
        <div className="flex items-center justify-center flex-wrap mt-[0.06em]">
          <span
            style={{
              color: '#ffffff',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.28)',
              fontStyle: 'normal',
            }}
            className="text-white mr-[0.26em] transition-all duration-150"
          >
            Digital experiences
          </span>
          <span className="text-[#111111] mr-[0.26em]">that</span>
          <span className="text-[#111111]">matter.</span>
        </div>
      </h1>

      {/* 3. Subheading */}
      <p
        style={{
          fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 300,
          color: '#ffffff',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
        }}
        className="mt-3.5 sm:mt-5 text-white text-sm sm:text-base md:text-[17px] max-w-xl sm:max-w-2xl mx-auto font-light leading-relaxed tracking-normal px-2 sm:px-4 no-copy"
      >
        We build distinctive brands, high-converting websites, and social experiences that get noticed.
      </p>

      {/* 4. Action Buttons */}
      <div
        className="mt-6 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
      >
        {/* See Our Work Button */}
        <button
          onClick={() => navigate('work')}
          style={{
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 330,
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            lineHeight: 1.25,
          }}
          className="group px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#111111] hover:bg-[#222222] text-white tracking-normal transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.15)] active:scale-95 cursor-pointer"
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
            fontWeight: 330,
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            lineHeight: 1.25,
          }}
          className="group px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-black/15 bg-white/70 hover:bg-white/95 text-[#111111] tracking-normal transition-all duration-200 shadow-sm active:scale-95 backdrop-blur-sm cursor-pointer"
        >
          <span>How We Work</span>
        </button>
      </div>
    </div>
  );
};
