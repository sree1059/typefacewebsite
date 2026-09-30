import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Zap, Check, Mail, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MANROPE_FONT =
  "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface ProcessStep {
  number: string;
  title: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Scope & design',
  },
  {
    number: '02',
    title: 'Build & test',
  },
  {
    number: '03',
    title: 'Launch & care',
  },
];

const MENU_SERVICES = [
  { number: '01', title: 'Design' },
  { number: '02', title: 'Build' },
  { number: '03', title: 'Deploy' },
  { number: '04', title: 'Care' },
];

export const HowWeWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Card Refs for GSAP staggered scroll entrance
  const darkCardRef = useRef<HTMLDivElement>(null);
  const processCardRef = useRef<HTMLDivElement>(null);
  const pricingCardRef = useRef<HTMLDivElement>(null);
  const supportCardRef = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);

  // Process Card timeline refs
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const checkIconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const processTitlesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const processNumbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const cards = [
        darkCardRef.current,
        processCardRef.current,
        pricingCardRef.current,
        supportCardRef.current,
        ctaCardRef.current,
      ].filter(Boolean) as HTMLDivElement[];

      if (prefersReducedMotion) {
        cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0 }));
        if (lineProgressRef.current) gsap.set(lineProgressRef.current, { scaleY: 1 });
        return;
      }

      // Initial state
      gsap.set(cards, { opacity: 0, y: 20 });
      if (lineProgressRef.current) {
        gsap.set(lineProgressRef.current, { scaleY: 0, transformOrigin: 'top center' });
      }
      checkIconsRef.current.forEach((icon) => {
        if (icon) gsap.set(icon, { scale: 0.2, opacity: 0 });
      });

      // Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      });

      // Staggered reveal of all 5 bento cards
      tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      });

      // Process card line & step animation
      if (lineProgressRef.current) {
        tl.to(
          lineProgressRef.current,
          {
            scaleY: 1,
            duration: 0.75,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      PROCESS_STEPS.forEach((_, idx) => {
        const check = checkIconsRef.current[idx];
        const titleEl = processTitlesRef.current[idx];
        const numEl = processNumbersRef.current[idx];
        const stepTime = `<+${0.06 + idx * 0.15}`;

        if (check) {
          tl.to(
            check,
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'back.out(2)',
            },
            stepTime
          );
        }

        if (titleEl) {
          tl.fromTo(
            titleEl,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
            `${stepTime}+=0.03`
          );
        }

        if (numEl) {
          tl.fromTo(
            numEl,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' },
            `${stepTime}+=0.05`
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-label="How We Work & Studio Bento Grid"
      style={{
        fontFamily: MANROPE_FONT,
      }}
      className="w-full py-8 sm:py-10 lg:py-6 px-4 sm:px-6 md:px-8 lg:px-10 relative flex justify-center items-center lg:min-h-screen lg:max-h-[88vh] font-manrope"
    >
      <div
        ref={containerRef}
        style={{ fontFamily: MANROPE_FONT }}
        className="w-full max-w-6xl xl:max-w-7xl mx-auto flex flex-col gap-3 lg:gap-3 xl:gap-3.5 font-manrope"
      >
        {/* ========================================================================= */}
        {/* ROW 1: 2-COLUMN BENTO GRID (Dark Services Card + Process 3-Step Card)     */}
        {/* Height reduced 20-30% (~235px) for compact, single-screen desktop fit     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3 xl:gap-3.5 items-stretch lg:h-[235px] xl:h-[245px]">
          {/* 1. DARK SERVICES CARD */}
          <div
            ref={darkCardRef}
            style={{
              borderRadius: '30px',
              fontFamily: MANROPE_FONT,
            }}
            className="lg:col-span-6 bg-[#18181B] text-white p-4 sm:p-5 lg:p-4.5 xl:p-5 border border-white/10 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.25)] flex flex-col justify-between relative overflow-hidden select-none transition-transform duration-300 hover:translate-y-[-2px] font-manrope no-copy"
          >
            {/* Top Brand Logo & Vertical Services List */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.7A1 1 0 105.7 7.12L10.59 12 5.7 16.88a1 1 0 101.42 1.42L12 13.41l4.88 4.89a1 1 0 001.42-1.42L13.41 12l4.89-4.88a1 1 0 000-1.41z" />
                  </svg>
                </div>
              </div>

              {/* Four Services List stacked vertically one after another */}
              <div className="space-y-1 mb-2">
                {MENU_SERVICES.map((item) => (
                  <div
                    key={item.number}
                    style={{ fontFamily: MANROPE_FONT }}
                    className="flex items-center gap-2 pb-0.5 border-b border-white/10 text-[#9CA3AF] text-xs font-normal tracking-wide hover:text-white transition-colors font-manrope"
                  >
                    <span
                      style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                      className="text-[#71717A] text-[10.5px] select-none font-manrope"
                    >
                      // {item.number}
                    </span>
                    <span
                      style={{ fontFamily: MANROPE_FONT, fontWeight: 300 }}
                      className="text-white text-xs font-manrope"
                    >
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Statement Heading & Subtitle */}
            <div className="mt-auto">
              <h3
                style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                className="text-base sm:text-lg lg:text-[19px] text-white tracking-tight leading-snug mb-0.5 font-manrope"
              >
                Everything you need in one place
              </h3>
              <p
                style={{ fontFamily: MANROPE_FONT, fontWeight: 300 }}
                className="text-[11.5px] sm:text-xs text-[#A1A1AA] leading-relaxed max-w-md font-manrope"
              >
                Design, build, deploy, and maintain — all from{' '}
                <strong className="text-white font-normal">one senior team</strong>.
              </p>
            </div>
          </div>

          {/* 2. PROCESS CARD: "3 steps to launch" (Corner radius 30, Manrope font, Corner rivets) */}
          <div
            ref={processCardRef}
            style={{
              borderRadius: '30px',
              fontFamily: MANROPE_FONT,
            }}
            className="lg:col-span-6 bg-white border border-black/10 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] p-4 sm:p-5 lg:p-4.5 xl:p-5 relative flex flex-col justify-between overflow-hidden select-none transition-transform duration-300 hover:translate-y-[-2px] font-manrope no-copy"
          >
            {/* 4 Corner Hardware Rivets */}
            <span
              aria-hidden="true"
              className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#D1D5DB] border border-black/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#D1D5DB] border border-black/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#D1D5DB] border border-black/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#D1D5DB] border border-black/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)] pointer-events-none"
            />

            <div>
              {/* Top Header: // Process and 3 lime dots */}
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <span
                  style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                  className="text-[11px] sm:text-xs text-[#9CA3AF] tracking-wide font-manrope"
                >
                  // Process
                </span>

                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-[#B5E61D]" />
                  <span className="w-2 h-2 rounded-full bg-[#B5E61D]" />
                  <span className="w-2 h-2 rounded-full bg-[#B5E61D]" />
                </div>
              </div>

              {/* Headline: 3 steps to launch */}
              <div className="mb-2 sm:mb-2.5">
                <h3
                  style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                  className="text-lg sm:text-xl lg:text-[23px] text-[#111111] tracking-tight leading-tight m-0 font-manrope"
                >
                  3 steps to launch
                </h3>
              </div>
            </div>

            {/* Vertical Connecting Process Steps */}
            <div className="relative mt-auto pt-0.5">
              {/* Vertical connector line */}
              <div
                aria-hidden="true"
                className="absolute left-[9px] top-[10px] bottom-[10px] w-[1.5px] bg-[#E5E7EB] pointer-events-none"
              >
                <div
                  ref={lineProgressRef}
                  className="absolute inset-0 bg-[#B5E61D] origin-top will-change-transform"
                />
              </div>

              <div className="space-y-2 sm:space-y-2.5 relative">
                {PROCESS_STEPS.map((step, idx) => (
                  <div
                    key={step.number}
                    className="flex items-center justify-between group cursor-pointer py-0.5 -my-0.5"
                  >
                    {/* Check icon + Title */}
                    <div className="flex items-center gap-3 relative z-10">
                      <div
                        ref={(el) => {
                          checkIconsRef.current[idx] = el;
                        }}
                        className="w-5 h-5 rounded-full bg-[#B5E61D] flex items-center justify-center flex-shrink-0 shadow-[0_1px_3px_rgba(181,230,29,0.3)] transition-transform group-hover:scale-105"
                      >
                        <Check className="w-2.5 h-2.5 text-[#111111] stroke-[2.8]" />
                      </div>
                      <span
                        ref={(el) => {
                          processTitlesRef.current[idx] = el;
                        }}
                        style={{ fontFamily: MANROPE_FONT, fontWeight: 300 }}
                        className="text-xs sm:text-sm text-[#111111] tracking-tight transition-transform group-hover:translate-x-0.5 font-manrope"
                      >
                        {step.title}
                      </span>
                    </div>

                    {/* Step number on the right */}
                    <span
                      ref={(el) => {
                        processNumbersRef.current[idx] = el;
                      }}
                      style={{ fontFamily: MANROPE_FONT, fontWeight: 300 }}
                      className="text-[10.5px] sm:text-xs text-[#9CA3AF] tabular-nums tracking-wide group-hover:text-[#111111] transition-colors font-manrope"
                    >
                      {step.number}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: 3-COLUMN BENTO GRID (Pricing + 48h Support + Blue CTA Card)        */}
        {/* Height reduced 20-30% (~205px) for compact, single-screen desktop fit     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-3 xl:gap-3.5 items-stretch lg:h-[205px] xl:h-[215px]">
          {/* 3. PRICING & COST SAVINGS CARD (Span 5 on Desktop) */}
          <div
            ref={pricingCardRef}
            style={{
              borderRadius: '30px',
              fontFamily: MANROPE_FONT,
            }}
            className="md:col-span-2 lg:col-span-5 bg-white border border-black/10 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] p-4 sm:p-5 lg:p-4.5 xl:p-5 flex flex-col justify-between select-none transition-transform duration-300 hover:translate-y-[-2px] font-manrope no-copy"
          >
            <div>
              {/* Header row: // Pricing & Pill badge */}
              <div className="flex items-center justify-between mb-1">
                <span
                  style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                  className="text-[11px] sm:text-xs text-[#9CA3AF] tracking-wide font-manrope"
                >
                  // Pricing
                </span>
                <span
                  style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                  className="bg-[#B5E61D] text-[#111111] text-[10px] sm:text-[10.5px] px-2 py-0.5 rounded-full shadow-[0_1px_6px_rgba(181,230,29,0.3)] font-manrope"
                >
                  Save up to 80%
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3
                style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                className="text-sm sm:text-base lg:text-[17px] text-[#111111] tracking-tight leading-snug mb-0.5 font-manrope"
              >
                Save money without sacrificing quality
              </h3>
              <p
                style={{ fontFamily: MANROPE_FONT, fontWeight: 300 }}
                className="text-[11px] sm:text-[11.5px] text-[#6B7280] leading-snug mb-2 font-manrope"
              >
                Cut overhead, not quality. Pay for the work, not the org chart between you and the engineer.
              </p>
            </div>

            {/* Price Comparison Bars */}
            <div className="space-y-1.5 mt-auto pt-0.5">
              {/* Others bar */}
              <div className="flex items-center gap-2">
                <span
                  style={{ fontFamily: MANROPE_FONT, fontWeight: 300 }}
                  className="w-12 sm:w-14 text-[10.5px] sm:text-[11px] text-[#6B7280] flex-shrink-0 font-manrope"
                >
                  Others
                </span>
                <div
                  style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                  className="flex-1 bg-[#F3F4F6] text-[#111111] text-[11px] py-1.5 px-3 rounded-lg flex items-center justify-center border border-black/[0.03] font-manrope"
                >
                  Up to ₹2,00,000
                </div>
              </div>

              {/* Typeface bar */}
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: MANROPE_FONT,
                    fontWeight: 400,
                  }}
                  className="w-12 sm:w-14 text-[10.5px] sm:text-[11px] text-[#111111] flex-shrink-0 tracking-tight font-manrope"
                >
                  Typeface
                </span>
                <div
                  style={{
                    fontFamily: MANROPE_FONT,
                    fontWeight: 400,
                  }}
                  className="bg-[#4E89FF] text-white text-[11px] py-1.5 px-4 rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(78,137,255,0.3)] font-manrope"
                >
                  From ₹40,000
                </div>
              </div>
            </div>
          </div>

          {/* 4. 48h SUPPORT CARD (Span 3 on Desktop) */}
          <div
            ref={supportCardRef}
            style={{
              borderRadius: '30px',
              fontFamily: MANROPE_FONT,
            }}
            className="md:col-span-1 lg:col-span-3 bg-white border border-black/10 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] p-4 sm:p-5 lg:p-4.5 xl:p-5 flex flex-col justify-between select-none transition-transform duration-300 hover:translate-y-[-2px] font-manrope no-copy"
          >
            {/* Header: // Support */}
            <div>
              <span
                style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                className="text-[11px] sm:text-xs text-[#9CA3AF] tracking-wide font-manrope"
              >
                // Support
              </span>
            </div>

            {/* Middle Section: 48h metric display & Mail Us Box */}
            <div className="my-auto py-1">
              <div className="flex items-baseline mb-1.5">
                <span
                  style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                  className="text-4xl sm:text-5xl lg:text-[50px] text-[#111111] tracking-tighter leading-none font-manrope"
                >
                  48
                </span>
                <span
                  style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                  className="text-4xl sm:text-5xl lg:text-[50px] text-[#4E89FF] tracking-tighter leading-none ml-0.5 font-manrope"
                >
                  h
                </span>
              </div>

              {/* Interactive Mail Us Box */}
              <a
                href="mailto:xyz@gmail.com"
                style={{ fontFamily: MANROPE_FONT }}
                className="flex items-center justify-between w-full bg-[#F4F5F7] hover:bg-[#ECEEF2] text-[#111111] px-2.5 py-1.5 rounded-lg border border-black/5 transition-colors cursor-pointer group/mail shadow-[0_1px_2px_rgba(0,0,0,0.02)] font-manrope allow-copy"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-4.5 h-4.5 rounded bg-white flex items-center justify-center shadow-xs">
                    <Mail className="w-2.5 h-2.5 text-[#4E89FF]" />
                  </div>
                  <span
                    style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                    className="text-[11px] text-[#111111] font-manrope"
                  >
                    Mail us
                  </span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-[#9CA3AF] group-hover/mail:text-[#111111] group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Bottom note with green indicator dot */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B5E61D] flex-shrink-0" />
              <p
                style={{ fontFamily: MANROPE_FONT, fontWeight: 300 }}
                className="text-[10px] sm:text-[10.5px] text-[#4B5563] leading-tight m-0 font-manrope"
              >
                Email us anytime — a real reply within 2 working days.
              </p>
            </div>
          </div>

          {/* 5. BLUE CTA CARD: "Focus on your business." (Span 4 on Desktop) */}
          <div
            ref={ctaCardRef}
            style={{
              borderRadius: '30px',
              fontFamily: MANROPE_FONT,
            }}
            className="md:col-span-1 lg:col-span-4 bg-[#548DFF] text-white p-4 sm:p-5 lg:p-4.5 xl:p-5 flex flex-col justify-between relative overflow-hidden select-none shadow-[0_16px_40px_-15px_rgba(78,137,255,0.4)] transition-transform duration-300 hover:translate-y-[-2px] font-manrope no-copy"
          >
            {/* Decorative Subtle Background X Watermark */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -right-6 w-32 h-32 opacity-12 pointer-events-none select-none text-white"
            >
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Headline */}
              <h3
                style={{ fontFamily: MANROPE_FONT, fontWeight: 400 }}
                className="text-sm sm:text-base lg:text-[17px] text-[#0B1728] tracking-tight leading-snug mb-1.5 font-manrope"
              >
                Focus on your business.<br />We’ll handle the web.
              </h3>

              {/* Three Checkpoints with round icon badges */}
              <div className="space-y-1 mb-2.5">
                {[
                  'Senior engineers',
                  'Distinctive design',
                  'Post-launch care',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#B5E61D] flex items-center justify-center flex-shrink-0 shadow-[0_1px_3px_rgba(181,230,29,0.3)]">
                      <Check className="w-2 h-2 text-[#111111] stroke-[2.8]" />
                    </div>
                    <span
                      style={{ fontFamily: MANROPE_FONT, fontWeight: 300 }}
                      className="text-[11px] sm:text-xs text-[#0B1728] font-manrope"
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom White CTA Action Pill */}
            <button
              onClick={() => {
                const el = document.getElementById('faq');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                fontFamily: MANROPE_FONT,
                fontWeight: 400,
              }}
              className="relative z-10 w-full bg-white hover:bg-slate-50 text-[#111111] text-[11px] sm:text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-300 hover:shadow-md active:scale-[0.99] font-manrope"
            >
              <Zap className="w-3 h-3 text-[#111111] fill-current" />
              <span style={{ fontFamily: MANROPE_FONT }} className="font-manrope">
                Get a project estimate
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
