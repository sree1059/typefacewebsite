import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

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
      className="w-full text-[#111111] min-h-[70vh] py-16 sm:py-24 md:py-28 px-6 sm:px-12 md:px-20 selection:bg-black selection:text-white flex flex-col justify-start font-manrope"
      style={{
        background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)',
        ...fontStyle,
      }}
    >
      <div className="max-w-4xl mx-auto w-full space-y-12 sm:space-y-16">
        {/* Page Hero */}
        <div>
          <span className="text-[12px] uppercase tracking-widest font-medium text-[#111111]/70 block mb-3">
            About Typeface
          </span>
          <h1
            style={headingStyle}
            className="text-[34px] xs:text-[44px] sm:text-[56px] md:text-[64px] text-[#111111] tracking-tight leading-[1.08] mb-6"
          >
            We believe good work starts with understanding<span className="text-[#E0343F]">.</span>
          </h1>
          <p className="text-[18px] sm:text-[22px] text-[#111111]/85 leading-relaxed font-light">
            Typeface is a creative studio helping businesses build a stronger online presence through websites, content, and social media.
          </p>
        </div>

        {/* Narrative Section 1 */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <p className="text-[16px] sm:text-[19px] text-[#111111]/90 leading-relaxed font-light">
            We don't start with a template and try to fit your business into it. We start by understanding what you do, who you're trying to reach, and what you're actually trying to achieve.
          </p>
          <p className="text-[16px] sm:text-[19px] text-[#111111]/90 leading-relaxed font-light">
            From there, we shape the strategy, structure, design, and execution around what makes sense for your business.
          </p>
        </div>

        {/* The tools aren't the work */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-7 sm:p-10 shadow-xs space-y-5">
          <h2
            style={headingStyle}
            className="text-2xl sm:text-3xl text-[#111111]"
          >
            The tools aren't the work<span className="text-[#4E89FF]">.</span>
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
          <div className="pt-2 border-t border-black/10">
            <p className="text-[16px] sm:text-[18px] font-medium text-[#111111]">
              The tools can change. Our responsibility for the work doesn't.
            </p>
          </div>
        </div>

        {/* We don't sell what you don't need & Your time matters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-7 sm:p-9 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3
                style={headingStyle}
                className="text-xl sm:text-2xl text-[#111111]"
              >
                We don't sell what you don't need
              </h3>
              <p className="text-sm sm:text-base text-[#111111]/80 leading-relaxed font-light">
                Not every business needs every service.
              </p>
              <p className="text-sm sm:text-base text-[#111111]/80 leading-relaxed font-light">
                Before we take on a project, we look at what you're trying to achieve and whether our services are actually the right fit.
              </p>
              <p className="text-sm sm:text-base text-[#111111]/80 leading-relaxed font-light">
                If we don't believe we can add meaningful value, we'll tell you honestly rather than sell you something you don't need.
              </p>
            </div>
            <p className="pt-4 border-t border-black/10 text-xs sm:text-sm font-medium text-[#111111]">
              We'd rather have an honest conversation than take your money for work that doesn't make sense.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-7 sm:p-9 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3
                style={headingStyle}
                className="text-xl sm:text-2xl text-[#111111]"
              >
                Your time matters. So does ours.
              </h3>
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
            <p className="pt-4 border-t border-black/10 text-xs sm:text-sm font-medium text-[#111111]">
              When both sides respect the process, better work happens.
            </p>
          </div>
        </div>

        {/* We're not trying to work with everyone */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-7 sm:p-10 shadow-xs space-y-4">
          <h2
            style={headingStyle}
            className="text-2xl sm:text-3xl text-[#111111]"
          >
            We're not trying to work with everyone<span className="text-[#E0343F]">.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            We want to work with businesses, founders, and teams who genuinely want to improve their online presence and are willing to be part of the process.
          </p>
          <p className="text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            If we're the right fit, we'll give the project our full attention. If we're not, we'll tell you.
          </p>
          <p className="text-[16px] sm:text-[18px] text-[#111111] font-medium pt-2">
            No unnecessary work. No empty promises. Just thoughtful work, clear communication, and respect for each other's time.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/10 text-center space-y-5">
          <h3
            style={headingStyle}
            className="text-2xl sm:text-3xl text-[#111111]"
          >
            Have something in mind?
          </h3>
          <p className="text-sm sm:text-base text-[#111111]/75 max-w-md mx-auto font-light">
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
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] group"
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
