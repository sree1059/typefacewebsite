import React from 'react';
import { Code2, Users, Zap, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const HowWeWorkSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section
      id="how-we-work"
      aria-label="How We Work"
      className="w-full bg-white text-[#111111] py-20 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 select-none border-b border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-black/60 block mb-2 font-mono">
              HOW WE WORK
            </span>
            <h2
              style={{
                fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 400,
                letterSpacing: '-0.025em',
              }}
              className="text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight leading-tight"
            >
              Direct collaboration, zero agency fluff<span className="text-[#E0343F]">.</span>
            </h2>
            <p className="text-base sm:text-lg text-black/60 font-light leading-relaxed mt-3">
              We eliminate bloated layers so you work directly with engineers building high-performance websites.
            </p>
          </div>
          <button
            onClick={() => {
              navigate('contact');
              window.history.pushState({}, '', '/contact');
            }}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-black hover:text-[#E0343F] transition-colors py-2 group cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 5-Boxes Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Box 1: Custom Architecture (7 Cols) */}
          <div className="md:col-span-7 rounded-2xl sm:rounded-3xl bg-[#111111] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-white/10 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-mono tracking-wider uppercase text-white/80">
                <Code2 className="w-3.5 h-3.5 text-[#75DFFF]" />
                CUSTOM ARCHITECTURE
              </span>
              <span className="text-xs font-mono text-white/40">01</span>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight leading-snug mb-3">
                Built from scratch for your business goals<span className="text-[#E0343F]">.</span>
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-lg">
                We don't fit your brand into restrictive templates. Every digital experience is custom-coded with modern React, tailored component systems, and clean semantics.
              </p>
            </div>
          </div>

          {/* Box 2: Direct to Engineer (5 Cols) */}
          <div className="md:col-span-5 rounded-2xl sm:rounded-3xl bg-[#F9FAFB] text-[#111111] p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-black/10 shadow-xs hover:border-black/20 transition-colors">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-mono tracking-wider uppercase text-black/70">
                <Users className="w-3.5 h-3.5 text-[#0A7080]" />
                DIRECT ACCESS
              </span>
              <span className="text-xs font-mono text-black/40">02</span>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight leading-snug mb-3">
                Direct to the engineer<span className="text-[#E0343F]">.</span>
              </h3>
              <p className="text-sm sm:text-base text-black/70 font-light leading-relaxed">
                Direct collaboration with the engineer. No account managers, middle layers, or communication breakdown.
              </p>
            </div>
          </div>

          {/* Box 3: Sub-Second Speed (4 Cols) */}
          <div className="md:col-span-4 rounded-2xl sm:rounded-3xl bg-[#F9FAFB] text-[#111111] p-6 sm:p-8 flex flex-col justify-between border border-black/10 shadow-xs hover:border-black/20 transition-colors">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-mono tracking-wider uppercase text-black/70">
                <Zap className="w-3.5 h-3.5 text-[#0A7080]" />
                PERFORMANCE
              </span>
              <span className="text-xs font-mono text-black/40">03</span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] mb-2 font-mono">
                99<span className="text-[#0A7080] text-2xl font-normal">/100</span>
              </div>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight leading-snug mb-2">
                Sub-second page loads
              </h3>
              <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
                Engineered for maximum Core Web Vitals, rapid asset compression, and instant visitor responsiveness.
              </p>
            </div>
          </div>

          {/* Box 4: Commercial Conversion (4 Cols) */}
          <div className="md:col-span-4 rounded-2xl sm:rounded-3xl bg-[#F9FAFB] text-[#111111] p-6 sm:p-8 flex flex-col justify-between border border-black/10 shadow-xs hover:border-black/20 transition-colors">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-mono tracking-wider uppercase text-black/70">
                <TrendingUp className="w-3.5 h-3.5 text-[#0A7080]" />
                CONVERSION
              </span>
              <span className="text-xs font-mono text-black/40">04</span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] mb-2 font-mono">
                +34<span className="text-[#0A7080] text-2xl font-normal">%</span>
              </div>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight leading-snug mb-2">
                Engineered to sell
              </h3>
              <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
                Clear visual hierarchies, compelling narrative arcs, and friction-free call-to-action paths that turn traffic into revenue.
              </p>
            </div>
          </div>

          {/* Box 5: Clean Ownership (4 Cols) */}
          <div className="md:col-span-4 rounded-2xl sm:rounded-3xl bg-[#F9FAFB] text-[#111111] p-6 sm:p-8 flex flex-col justify-between border border-black/10 shadow-xs hover:border-black/20 transition-colors">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-mono tracking-wider uppercase text-black/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0A7080]" />
                OWNERSHIP
              </span>
              <span className="text-xs font-mono text-black/40">05</span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] mb-2 font-mono">
                100<span className="text-[#0A7080] text-2xl font-normal">%</span>
              </div>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight leading-snug mb-2">
                Complete code ownership
              </h3>
              <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
                Zero proprietary lock-in. Clean Git repositories, full documentation, and assets transferred entirely to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
