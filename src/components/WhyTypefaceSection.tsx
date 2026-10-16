import React from 'react';
import { Target, LayoutDashboard, Cpu, Rocket } from 'lucide-react';

interface ValuePillar {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const PILLARS: ValuePillar[] = [
  {
    number: '01',
    title: 'Built to convert',
    description:
      'Every page has one job: move the visitor closer to becoming a customer. No vanity design.',
    icon: Target,
  },
  {
    number: '02',
    title: 'Transparent dashboards',
    description:
      'Clients get a dedicated portal to track projects, tasks, invoices, and results in real time.',
    icon: LayoutDashboard,
  },
  {
    number: '03',
    title: 'Stack that scales',
    description:
      'Next.js, PostgreSQL, Stripe, HubSpot, Meta Ads — we plug into the tools you already use.',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Launch in weeks, not months',
    description:
      'Our sprint process ships landing pages in 2–4 weeks and full stacks in 6–10 weeks.',
    icon: Rocket,
  },
];

export const WhyTypefaceSection: React.FC = () => {
  return (
    <section
      id="why-typeface"
      aria-label="Why Typeface"
      className="w-full bg-white text-[#111111] py-20 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 select-none border-b border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 md:mb-20">
          <span
            style={{
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
            className="text-xs uppercase tracking-widest font-semibold text-black/60 block mb-3 font-mono"
          >
            WHY TYPEFACE
          </span>

          <h2
            style={{
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 400,
              letterSpacing: '-0.03em',
            }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#111111] tracking-tight leading-[1.12] mb-5"
          >
            Not just another agency, a growth partner<span className="text-[#E0343F]">.</span>
          </h2>

          <p
            style={{
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
            }}
            className="text-base sm:text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl"
          >
            We combine product grade engineering, performance creative, and hands on strategy into one focused engagement.
          </p>
        </div>

        {/* 4 Pillars Grid with Thin Top-Half Hero Gradient Outlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                style={{
                  background:
                    'linear-gradient(180deg, #55DCFF 0%, #69F9B0 35%, #FFE600 55%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0.05) 100%)',
                }}
                className="p-[1px] rounded-[24px] sm:rounded-[32px] shadow-[0_8px_24px_rgba(105,249,176,0.12)] hover:shadow-[0_14px_36px_rgba(85,220,255,0.22)] transition-all duration-300 hover:-translate-y-1 group flex flex-col"
              >
                <div
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(85,220,255,0.06) 0%, rgba(105,249,176,0.04) 25%, rgba(255,230,0,0.02) 45%, #FFFFFF 60%)',
                  }}
                  className="w-full h-full rounded-[23px] sm:rounded-[31px] p-7 sm:p-8 md:p-10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <span className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#111111] group-hover:bg-gradient-to-r group-hover:from-[#55DCFF] group-hover:to-[#69F9B0] group-hover:text-black transition-all duration-300 shadow-xs">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="font-mono text-xs font-medium text-black/40">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Heading in larger size */}
                    <h3
                      style={{
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                      }}
                      className="text-xl sm:text-2xl md:text-[26px] text-[#0B132B] tracking-tight leading-snug mb-3"
                    >
                      {pillar.title}
                    </h3>

                    {/* Answer in small size */}
                    <p
                      style={{
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                      className="text-xs sm:text-sm md:text-[15px] text-black/70 font-light leading-relaxed max-w-md"
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTypefaceSection;
