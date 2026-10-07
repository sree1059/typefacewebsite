import React from 'react';
import { Calendar, ArrowUpRight, Clock, Video } from 'lucide-react';
import { openCalendlyPopup } from '../utils/calendly';

interface CalendlyBannerProps {
  variant?: 'hero-bottom' | 'card' | 'inline';
  className?: string;
}

export const CalendlyBanner: React.FC<CalendlyBannerProps> = ({
  variant = 'card',
  className = '',
}) => {
  if (variant === 'hero-bottom') {
    return (
      <div className={`w-full flex items-center justify-center pt-4 pb-6 px-4 ${className}`}>
        <button
          type="button"
          onClick={() => openCalendlyPopup()}
          className="group inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/85 hover:bg-white text-[#111111] border border-black/10 shadow-[0_4px_20px_rgba(0,105,255,0.12)] backdrop-blur-md transition-all duration-200 hover:shadow-[0_6px_24px_rgba(0,105,255,0.2)] active:scale-95 cursor-pointer text-xs sm:text-sm font-medium"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0069ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0069ff]"></span>
          </span>
          <span className="text-[#333333]">Have a project in mind?</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#0069ff] group-hover:text-[#0052cc] transition-colors">
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule a quick call</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`w-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/70 border border-white/80 backdrop-blur-md shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 ${className}`}
    >
      <div className="flex items-start sm:items-center gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0069ff] text-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(0,105,255,0.3)]">
          <Calendar className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg sm:text-xl font-bold text-[#111111] tracking-tight">
              Book a Consultation
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0069ff]/10 text-[#0069ff] text-[11px] font-semibold">
              <Clock className="w-3 h-3" />
              15–30 mins
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-semibold">
              <Video className="w-3 h-3" />
              Google Meet
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-xl">
            Pick a convenient time directly on our calendar. No back-and-forth emails, just a quick 1-on-1 discovery consultation about your brand and project goals.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => openCalendlyPopup()}
        className="w-full md:w-auto px-7 py-3.5 rounded-full bg-[#0069ff] hover:bg-[#0055d4] text-white text-sm sm:text-[15px] font-semibold transition-all duration-200 shadow-[0_4px_16px_rgba(0,105,255,0.28)] hover:shadow-[0_6px_20px_rgba(0,105,255,0.36)] active:scale-95 cursor-pointer flex items-center justify-center gap-2 flex-shrink-0"
      >
        <Calendar className="w-4 h-4" />
        <span>Book a Consultation</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
};
