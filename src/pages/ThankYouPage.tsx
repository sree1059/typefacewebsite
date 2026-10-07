import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const ThankYouPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div
      className="w-full bg-white text-[#111111] min-h-[calc(100vh-94px)] flex items-center justify-center py-20 px-6 sm:px-12 md:px-20 selection:bg-black selection:text-white"
      style={{
        background: '#ffffff',
      }}
    >
      <div className="max-w-2xl w-full mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        {/* Subtle Checkmark Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F9FAFB] border border-black/10 shadow-xs text-[#111111] mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#111111]" strokeWidth={1.75} />
        </div>

        {/* Heading: Space Grotesk */}
        <div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.04em',
            }}
            className="text-[40px] xs:text-[52px] sm:text-[68px] md:text-[76px] font-bold text-[#111111] leading-[1.05] tracking-tight uppercase"
          >
            THANK YOU<span className="text-[#E0343F]">.</span>
          </h1>
        </div>

        {/* Body Text: Manrope */}
        <div
          style={{
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
          className="space-y-2 text-[#111111]/80 text-[18px] sm:text-[22px] font-light leading-relaxed max-w-lg mx-auto"
        >
          <p>Your project enquiry has been received.</p>
          <p className="text-[#111111]/70 text-[16px] sm:text-[19px]">
            We'll get back to you shortly.
          </p>
        </div>

        {/* Action Button: Back to Typeface */}
        <div className="pt-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
              window.history.pushState({}, '', '/');
            }}
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#111111] hover:bg-black text-white text-[15px] sm:text-[16px] font-semibold tracking-tight shadow-md hover:shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Typeface</span>
          </a>
        </div>
      </div>
    </div>
  );
};
