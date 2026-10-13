import React from 'react';
import { Calendar } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { openCalendlyPopup } from '../utils/calendly';

export const FinalCtaSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section
      id="cta"
      aria-label="Final Call to Action"
      className="w-full bg-[#FAFAF9] text-[#111111] py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 select-none border-t border-black/10 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8 sm:space-y-10">
        {/* Main Headline */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          <h2
            style={{
              fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.04em',
            }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-[#111111] tracking-tight leading-[1.08]"
          >
            No spam<span className="text-[#E0343F]">.</span> Just results<span className="text-[#4E89FF]">.</span>
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
            }}
            className="text-base sm:text-lg md:text-xl text-black/75 max-w-2xl mx-auto leading-relaxed"
          >
            We build high-performance websites and digital experiences for ambitious businesses.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap pt-2">
          {/* Primary Action: Book Call */}
          <button
            onClick={() => openCalendlyPopup()}
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 400,
            }}
            className="group px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black hover:bg-neutral-800 text-white text-sm sm:text-base font-medium transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.18)] active:scale-95 cursor-pointer inline-flex items-center gap-2.5 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-white/90" />
            <span>Book a Consultation</span>
          </button>

          {/* Secondary Action: Contact Form */}
          <button
            onClick={() => navigate('contact')}
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 400,
            }}
            className="group px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-neutral-100 text-black border border-black/15 text-sm sm:text-base font-medium transition-all duration-200 shadow-xs active:scale-95 cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Send an Inquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
};
