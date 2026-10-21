import React, { useRef } from 'react';
import { Target, LayoutDashboard, Cpu, Rocket, Check, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ValuePillar {
  number: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
}

const PILLARS: ValuePillar[] = [
  {
    number: '01',
    title: 'Built to convert',
    badge: 'CONVERSION ARCHITECTURE',
    description:
      'Every single pixel and user journey is engineered with one objective: guide your visitor seamlessly into becoming a paying client. Zero vanity bloat, zero fluff.',
    icon: Target,
    highlights: [
      'Frictionless mobile booking & enquiry flows',
      'High-contrast visual hierarchy & speed',
      'Sub-second load times on all devices',
    ],
  },
  {
    number: '02',
    title: 'Transparent dashboards',
    badge: 'CLIENT CONTROL CENTER',
    description:
      'Clients receive a dedicated portal to monitor real-time sprint progress, task completions, milestone invoicing, and verified search visibility metrics live.',
    icon: LayoutDashboard,
    highlights: [
      'Live sprint roadmap & deliverables',
      'Transparent milestone-based billing',
      'Google & AI search citation tracking',
    ],
  },
  {
    number: '03',
    title: 'Stack that scales',
    badge: 'PRODUCTION ENGINEERING',
    description:
      'Engineered with modern production-grade technology: Next.js, TypeScript, PostgreSQL, Tailwind CSS, and secure payment integrations built for high volume.',
    icon: Cpu,
    highlights: [
      'Enterprise TypeScript & Clean Architecture',
      'Razorpay & Stripe secure checkout flows',
      'Structured entity schemas for search engines',
    ],
  },
  {
    number: '04',
    title: 'Launch in weeks, not months',
    badge: 'RAPID SPRINT VELOCITY',
    description:
      'Our disciplined engineering sprint delivers high-converting landing pages in 2–4 weeks and full-scale web platforms in 6–10 weeks with direct developer communication.',
    icon: Rocket,
    highlights: [
      '2–4 week landing page deployment',
      'Direct senior engineer access without middlemen',
      'Dedicated post-launch warranty & tuning',
    ],
  },
];

export const WhyTypefaceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Card Stacking ScrollTrigger Animation
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) return;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Animate underlying cards as next cards scroll up to stack over them
        if (i < PILLARS.length - 1) {
          const nextCard = cardsRef.current[i + 1];
          if (!nextCard) return;

          gsap.to(card, {
            scale: 0.93 + i * 0.015,
            opacity: 0.88,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom-=80',
              end: 'top top+=140',
              scrub: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="why-typeface"
      aria-label="Why Typeface"
      className="relative w-full bg-white text-[#111111] py-20 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 select-none border-b border-black/10 overflow-hidden"
      style={{
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Subtle blueprint grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 md:mb-20">
          <div
            style={{
              background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-black mb-4 sm:mb-5 shadow-xs border border-black/10 uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>WHY TYPEFACE</span>
          </div>

          <h2
            style={{
              letterSpacing: '-0.03em',
            }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#111111] font-normal tracking-tight leading-[1.12] mb-5"
          >
            Not just another agency,<br />
            <span
              style={{
                background:
                  'linear-gradient(110deg, #155EEF 0%, #06B6D4 35%, #10B981 70%, #EAB308 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="font-semibold inline-block"
            >
              a growth partner
            </span>
            <span className="text-[#10B981]">.</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl">
            We combine product grade engineering, performance creative, and hands-on strategy into one focused engagement.
          </p>
        </div>

        {/* ========================================================
            GSAP CARD STACK CONTAINER
            Cards stack with smooth sticky positioning & GSAP scrub scale
            ======================================================== */}
        <div className="relative flex flex-col space-y-8 sm:space-y-12 pb-16">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                style={{
                  top: `calc(5.5rem + ${index * 1.5}rem)`,
                }}
                className="sticky w-full will-change-transform"
              >
                {/* Radiant Thin Hero Gradient Outline Card */}
                <div className="p-[1px] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_14px_45px_rgba(105,249,176,0.14)] hover:shadow-[0_20px_60px_rgba(85,220,255,0.22)] transition-all duration-300">
                  <div className="w-full bg-white rounded-[23px] sm:rounded-[31px] md:rounded-[35px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                    {/* Ambient internal mint-lime glow */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#69F9B0]/15 via-[#55DCFF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                    <div>
                      {/* Top Row: Icon + Badge + Monospace Number */}
                      <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                        <div className="flex items-center gap-3">
                          {/* Hero Gradient Icon Badge */}
                          <div
                            style={{
                              background:
                                'linear-gradient(135deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                            }}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-black border border-black/10 flex items-center justify-center shrink-0 shadow-xs"
                          >
                            <Icon className="w-5 h-5 text-black" />
                          </div>

                          {/* Pill Category Tag */}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase text-black bg-black/[0.04] border border-black/10">
                            {pillar.badge}
                          </span>
                        </div>

                        {/* Monospace Index */}
                        <span className="font-mono text-sm sm:text-base font-bold text-black/40">
                          {pillar.number}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3
                        style={{
                          letterSpacing: '-0.025em',
                        }}
                        className="text-2xl xs:text-3xl sm:text-4xl text-[#0B132B] font-semibold tracking-tight leading-snug mb-3 relative z-10"
                      >
                        {pillar.title}
                        <span className="text-[#10B981]">.</span>
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base md:text-lg text-black/70 font-light leading-relaxed max-w-2xl mb-6 relative z-10">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bottom Feature Tags / Highlights */}
                    <div className="flex flex-wrap gap-2 pt-5 border-t border-black/10 relative z-10">
                      {pillar.highlights.map((highlight, hIdx) => (
                        <span
                          key={hIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-black/80 bg-black/[0.03] border border-black/10"
                        >
                          <Check className="w-3.5 h-3.5 text-[#059669]" />
                          <span>{highlight}</span>
                        </span>
                      ))}
                    </div>
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
