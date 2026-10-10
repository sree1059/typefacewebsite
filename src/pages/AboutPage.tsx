import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { HERO_GRADIENT_STYLE } from '../utils/theme';

interface AboutPageProps {
  useCaslonFont?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  const { navigate } = useNavigation();

  const fontStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 300,
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 300,
    letterSpacing: '-0.03em',
  };

  return (
    <div
      className="w-full text-[#111111] min-h-[70vh] py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 selection:bg-black selection:text-white flex flex-col justify-start font-manrope bg-white"
      style={{
        background: '#ffffff',
        ...fontStyle,
      }}
    >
      <div className="max-w-4xl mx-auto w-full space-y-10 sm:space-y-14">
        {/* Page Hero Container with Exact Hero Gradient */}
        <div
          className="w-full rounded-3xl sm:rounded-[40px] p-8 sm:p-12 md:p-16 border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-black relative overflow-hidden select-none no-copy"
          style={HERO_GRADIENT_STYLE}
        >
          <span className="text-[12px] uppercase tracking-widest font-semibold text-black/70 block mb-3 font-mono">
            Typeface · Developer House
          </span>
          <h1
            style={headingStyle}
            className="text-[34px] xs:text-[44px] sm:text-[54px] md:text-[62px] text-black tracking-tight leading-[1.08] mb-5"
          >
            We believe good work starts with understanding<span className="text-[#E0343F]">.</span>
          </h1>
          <p className="text-[17px] sm:text-[21px] text-black/85 leading-relaxed font-light max-w-3xl">
            Typeface is a developer house building high-performance websites, web applications, and digital experiences for ambitious businesses.
          </p>
        </div>

        {/* Narrative Section 1 */}
        <div className="bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <p className="text-[16px] sm:text-[19px] text-[#111111]/90 leading-relaxed font-light">
            We don't start with a template and try to fit your business into it. We start by understanding what you do, who you're trying to reach, and what you're actually trying to achieve.
          </p>
          <p className="text-[16px] sm:text-[19px] text-[#111111]/90 leading-relaxed font-light">
            From there, we shape the strategy, structure, design, and execution around what makes sense for your business.
          </p>
        </div>

        {/* The tools aren't the work */}
        <div className="bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-5">
          <h2
            style={headingStyle}
            className="text-2xl sm:text-3xl text-[#111111]"
          >
            The tools aren't the work<span className="text-[#E0343F]">.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#111111]/80 leading-relaxed font-light">
            AI can generate a website. Templates can make things cheaper. And there will always be someone offering a similar service for less.
          </p>
          <p className="text-[16px] sm:text-[18px] text-[#111111]/80 leading-relaxed font-light">
            We understand that.
          </p>
          <p className="text-[16px] sm:text-[18px] text-[#111111]/90 leading-relaxed font-normal">
            But a website isn't valuable simply because it exists. It needs to be clear, easy to use, fast, and built around what the visitor actually needs.
          </p>
          <p className="text-[15px] sm:text-[17px] text-[#111111]/80 leading-relaxed font-light">
            That's why we care about structure, clarity, usability, performance, and the reasoning behind every decision.
          </p>
          <p className="text-[15px] sm:text-[17px] text-[#111111]/80 leading-relaxed font-light">
            We use AI and modern tools where they genuinely help us work better and more efficiently.
          </p>
        </div>

        {/* Your time matters. So does ours. */}
        <div className="bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-4">
          <h2
            style={headingStyle}
            className="text-2xl sm:text-3xl text-[#111111]"
          >
            Your time matters. So does ours<span className="text-[#E0343F]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/80 leading-relaxed font-light">
            Every project involves time, attention, decisions, and effort from both sides.
          </p>
          <p className="text-sm sm:text-base text-[#111111]/80 leading-relaxed font-light">
            We respect your time and your business. We expect the same respect for the time, effort, and attention we put into your project.
          </p>
          <p className="text-sm sm:text-base text-[#111111]/90 font-normal">
            Clear communication. Timely feedback. Agreed commitments. Professional communication.
          </p>
        </div>

        {/* We're not trying to work with everyone */}
        <div className="bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-4">
          <h2
            style={headingStyle}
            className="text-2xl sm:text-3xl text-[#111111]"
          >
            We're not trying to work with everyone<span className="text-[#E0343F]">.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            We want to work with businesses, founders, and teams who genuinely want to improve their online presence and are willing to be part of the process.
          </p>
        </div>

        {/* CTA: Have something in mind? with Signature Hero Gradient */}
        <div
          className="rounded-3xl sm:rounded-[40px] p-8 sm:p-12 md:p-14 text-center space-y-5 border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-black relative overflow-hidden select-none no-copy"
          style={HERO_GRADIENT_STYLE}
        >
          <h3
            style={headingStyle}
            className="text-2xl sm:text-3xl md:text-4xl text-black"
          >
            Have something in mind?<span className="text-[#E0343F]">.</span>
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-black/85 max-w-md mx-auto font-light leading-relaxed">
            Tell us what you're trying to build and what you want to achieve.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                navigate('contact');
                window.history.pushState({}, '', '/contact');
              }}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] group"
            >
              <span>Tell us what you're trying to build</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
