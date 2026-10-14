import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  target: number;
  suffix?: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    target: 12,
    label: 'Projects shipped',
  },
  {
    target: 42,
    label: 'Avg conversion lift (%)',
  },
  {
    target: 96,
    label: 'Client retention (%)',
  },
];

export const StatsNumbersSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      STATS.forEach((stat, i) => {
        if (numRefs.current[i]) {
          numRefs.current[i]!.textContent = String(stat.target);
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;

        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.target,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString();
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Key Performance Metrics"
      className="relative w-full bg-[#FCFDFE] py-14 sm:py-16 md:py-20 px-6 sm:px-12 md:px-16 border-y border-black/[0.07] overflow-hidden select-none"
    >
      {/* Subtle Blueprint Grid Pattern matching reference image */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading above numbers */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h3
            style={{
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
              letterSpacing: '-0.02em',
            }}
            className="text-xl sm:text-2xl md:text-[28px] text-[#0A1128] leading-snug"
          >
            Trusted by 12+ local &amp; B2B brands
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-center"
            >
              <div
                style={{
                  fontFamily:
                    "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                }}
                className="text-[44px] xs:text-[50px] sm:text-[56px] md:text-[68px] text-[#0A1128]"
              >
                <span
                  ref={(el) => {
                    numRefs.current[idx] = el;
                  }}
                >
                  {stat.target}
                </span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>

              <div
                style={{
                  fontFamily:
                    "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
                className="text-sm sm:text-base text-[#64748B] font-medium tracking-normal mt-2 sm:mt-2.5"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsNumbersSection;
