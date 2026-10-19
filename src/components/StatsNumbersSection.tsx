import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  target: number;
  suffix?: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    target: 20,
    suffix: '+',
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
  const { navigate } = useNavigation();
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
      className="relative w-full bg-white py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 border-y border-black/10 overflow-hidden select-none"
    >
      {/* Subtle Blueprint Grid Pattern matching website aesthetics */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading above numbers with Hero Section Gradient */}
        <div className="mb-6 sm:mb-10 md:mb-12">
          <h3
            style={{
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              letterSpacing: '-0.02em',
            }}
            className="text-lg xs:text-xl sm:text-2xl md:text-[28px] leading-snug"
          >
            <span
              style={{
                background:
                  'linear-gradient(110deg, #155EEF 0%, #06B6D4 40%, #10B981 75%, #D97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="font-medium inline-block"
            >
              Trusted by 20+ clients
            </span>
          </h3>
        </div>

        {/* 3 Metrics in a Single Line on Mobile and Desktop */}
        <div className="grid grid-cols-3 gap-2 xs:gap-4 sm:gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-start"
            >
              <div
                style={{
                  fontFamily:
                    "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                }}
                className="text-[30px] xs:text-[38px] sm:text-[52px] md:text-[64px] text-black"
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
                className="text-[11px] xs:text-xs sm:text-sm md:text-base text-black/65 font-medium tracking-normal mt-1.5 sm:mt-2.5 leading-snug"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* View Work Button with Hero Gradient */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-start">
          <button
            type="button"
            onClick={() => {
              navigate('work');
              window.history.pushState({}, '', '/work');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
              color: '#000000',
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 600,
            }}
            className="group px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm tracking-normal shadow-[0_4px_16px_rgba(85,220,255,0.22)] hover:shadow-[0_6px_22px_rgba(105,249,176,0.32)] hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>View Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsNumbersSection;
