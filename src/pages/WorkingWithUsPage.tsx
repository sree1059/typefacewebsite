import React, { useRef, useCallback } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigation } from '../context/NavigationContext';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// Static Module Constants (Zero-Allocation on Re-renders)
// ==========================================
const PAGE_FONT_STYLE: React.CSSProperties = Object.freeze({
  fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontWeight: 300,
});

const HEADING_STYLE: React.CSSProperties = Object.freeze({
  fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontWeight: 300,
  letterSpacing: '-0.03em',
});

const SUBHEADING_STYLE: React.CSSProperties = Object.freeze({
  fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontWeight: 500,
});

const TYPEFACE_DUTIES = Object.freeze([
  'Strategy',
  'Design',
  'Development',
  'Testing',
  'Communication',
  'Delivery',
]);

const CLIENT_DUTIES = Object.freeze([
  'Information',
  'Content',
  'Feedback',
  'Approvals',
  'Access',
  'Timely payments',
]);

const PROCESS_STEPS = Object.freeze([
  { num: '01', title: 'Proposal' },
  { num: '02', title: 'Project Agreement' },
  { num: '03', title: 'Acceptance / Signature' },
  { num: '04', title: 'Initial Payment' },
  { num: '05', title: 'Project Begins' },
]);

export const WorkingWithUsPage: React.FC = () => {
  const { navigate } = useNavigation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized navigation handler (prevents inline function churn)
  const handleStartProject = useCallback(() => {
    navigate('contact');
    window.history.pushState({}, '', '/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  // ==========================================
  // Optimized GSAP Animation (respects prefers-reduced-motion)
  // ==========================================
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const cards = gsap.utils.toArray<HTMLElement>('.reveal-card', container);

      // If user prefers reduced motion, set final state instantly without attaching listeners
      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
        return;
      }

      // Smooth, hardware-accelerated entrance with immediate cleanup
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true, // Auto-kill ScrollTrigger once played to save resources
            },
            clearProps: 'transform,will-change', // Prevent subpixel blurriness & free GPU memory
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full text-[#111111] min-h-screen py-16 sm:py-24 md:py-28 px-6 sm:px-12 md:px-20 selection:bg-black selection:text-white flex flex-col justify-start font-manrope bg-white"
      style={{
        background: '#ffffff',
        ...PAGE_FONT_STYLE,
      }}
    >
      <div className="max-w-4xl mx-auto w-full space-y-12 sm:space-y-16">
        {/* ==================================================
            HERO
            ================================================== */}
        <section className="reveal-card space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F4F6] border border-black/10 text-[#111111] text-[11px] uppercase tracking-widest font-medium">
            <span>WORKING WITH TYPEFACE</span>
          </div>

          <h1
            style={HEADING_STYLE}
            className="text-[34px] xs:text-[44px] sm:text-[56px] md:text-[66px] text-[#111111] tracking-tight leading-[1.08]"
          >
            Clear expectations make better projects<span className="text-[#E0343F]">.</span>
          </h1>

          <div className="space-y-4 text-[17px] sm:text-[20px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              We want every project to begin with a clear understanding of what we're doing, what it costs, what each side is responsible for, and how we'll work together.
            </p>
            <p>
              Good projects aren't just about the final result. They're also about respecting each other's time, communicating clearly, and following through on what we've agreed.
            </p>
          </div>

          {/* Small Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F9FAFB] border border-black/10 text-xs sm:text-sm text-[#111111]/75 leading-relaxed">
            These guidelines explain how Typeface generally works with clients. The specific terms applicable to each project are set out in the Project Agreement provided before work begins.
          </div>
        </section>

        {/* ==================================================
            01 — WHO WE WORK WITH
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">01</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              Who we work with
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              We work with businesses, founders, and teams who genuinely want to improve their online presence and are willing to be part of the process.
            </p>
            <p>
              We don't try to work with everyone.
            </p>
            <p>
              If we believe our services aren't the right fit for what you're trying to achieve, we'll tell you honestly rather than sell you something you don't need.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-black/5 border border-black/5">
            <p
              style={SUBHEADING_STYLE}
              className="text-xs sm:text-sm md:text-[15px] uppercase tracking-wider text-[#111111]"
            >
              WE'D RATHER BE HONEST THAN SELL YOU SOMETHING YOU DON'T NEED.
            </p>
          </div>
        </section>

        {/* ==================================================
            02 — SCOPE
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">02</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              What's included
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              Every project starts with an agreed scope.
            </p>
            <p>
              The proposal will clearly outline the services, deliverables, agreed features, pricing, and expected timeline.
            </p>
            <p>
              Work outside the agreed scope may require an additional quote, fee, or timeline adjustment.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-black/5 border border-black/5">
            <p className="text-sm sm:text-base font-normal text-[#111111] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#4E89FF] shrink-0" />
              <span>If it's not included in the agreed scope, we'll discuss it before doing the work.</span>
            </p>
          </div>
        </section>

        {/* ==================================================
            03 — PRICING
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">03</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              Clear pricing
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              Our pricing is based on the actual scope and requirements of the project.
            </p>
            <p>
              Before work begins, you'll know what we're delivering, what it costs, what is included, and what isn't.
            </p>
            <p className="font-normal text-[#111111]">
              We don't believe in adding unnecessary services simply to increase the project value.
            </p>
          </div>
        </section>

        {/* ==================================================
            04 — PAYMENTS
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">04</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              Payments keep projects moving
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              The payment schedule is agreed before the project begins.
            </p>
            <p>
              The exact payment schedule will be stated in the proposal and Project Agreement.
            </p>
            <p>
              Agreed payments should be made on time.
            </p>
            <p className="text-sm sm:text-base text-[#111111]/80 pt-2 border-t border-black/10">
              If a payment is delayed, we may pause work until the outstanding amount is resolved. Any resulting timeline changes will be communicated clearly.
            </p>
          </div>
        </section>

        {/* ==================================================
            05 — CLIENT RESPONSIBILITIES
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">05</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              We need your side too
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              A project works best when both sides stay involved.
            </p>
            <p>
              Clients are responsible for providing the information, content, images, brand assets, approvals, feedback, access, and other materials reasonably required for the agreed work.
            </p>
            <p className="text-sm sm:text-base text-[#111111]/75">
              Delays caused by missing information, delayed feedback, late approvals, or other client-side dependencies may affect the project timeline.
            </p>
          </div>

          {/* Visual Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {/* Typeface Side */}
            <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-xs space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#4E89FF] block">
                TYPEFACE
              </span>
              <ul className="space-y-2 text-sm text-[#111111] font-normal">
                {TYPEFACE_DUTIES.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#4E89FF] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Client Side */}
            <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-xs space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#111111] block">
                CLIENT
              </span>
              <ul className="space-y-2 text-sm text-[#111111] font-normal">
                {CLIENT_DUTIES.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center pt-2">
            <p
              style={SUBHEADING_STYLE}
              className="text-xs sm:text-sm uppercase tracking-wider text-[#111111]"
            >
              A GOOD PROJECT IS A TWO-WAY COMMITMENT.
            </p>
          </div>
        </section>

        {/* ==================================================
            06 — REVISIONS
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">06</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              Revisions, not endless changes
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              Projects include the number of revision rounds stated in the proposal or Project Agreement.
            </p>
            <p>
              Revisions are intended to refine the agreed direction. They are not intended to restart the project or introduce an entirely different direction after approval.
            </p>
            <p className="text-sm sm:text-base text-[#111111]/80">
              Additional revisions or major changes outside the agreed scope may require additional time or cost.
            </p>
          </div>
        </section>

        {/* ==================================================
            07 — TIMELINES
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">07</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              Timelines matter
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              We take agreed deadlines seriously.
            </p>
            <p>
              At the same time, project timelines depend on both sides meeting their responsibilities.
            </p>
            <p className="text-sm sm:text-base text-[#111111]/80">
              If Typeface causes a delay while the client has fulfilled their agreed responsibilities, any applicable compensation, adjustment, or remedy will be handled according to the specific Project Agreement.
            </p>
          </div>
        </section>

        {/* ==================================================
            08 — CANCELLATION
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">08</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              If you choose to stop
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              If a project is cancelled after work has started, charges may apply for work already completed and any other applicable cancellation terms agreed in the Project Agreement.
            </p>
            <p className="text-sm sm:text-base text-[#111111]/80">
              Any applicable refund will be calculated according to the project-specific agreement and the work already completed.
            </p>
          </div>
        </section>

        {/* ==================================================
            09 — MAINTENANCE
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">09</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              After launch
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              A completed website project does not automatically include unlimited ongoing maintenance.
            </p>
            <p className="text-sm sm:text-base text-[#111111]/80">
              If you need future updates, content changes, technical support, monitoring, or ongoing management, we can discuss a separate maintenance or support arrangement based on your requirements.
            </p>
          </div>
        </section>

        {/* ==================================================
            10 — OWNERSHIP & HANDOVER
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">10</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              When the project is complete
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              Ownership, licensing, source files, third-party assets, fonts, software, hosting, domains, and other project materials will be handled according to the terms agreed for the specific project.
            </p>
            <p className="text-sm sm:text-base text-[#111111]/80">
              Final deliverables and handover conditions will be clearly stated in the Project Agreement.
            </p>
          </div>
        </section>

        {/* ==================================================
            11 — COMMUNICATION & CONDUCT
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">11</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              Respect goes both ways
            </h2>
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              We believe professional communication is a basic part of doing good work.
            </p>
            <p>
              We will communicate clearly, honestly, and professionally. We expect the same from our clients.
            </p>
            <p>
              Abusive, threatening, discriminatory, or inappropriate communication is not acceptable.
            </p>
            <p className="text-sm sm:text-base text-[#111111]/80">
              If communication becomes consistently inappropriate or prevents the project from moving forward, we may pause or terminate the engagement according to the Project Agreement.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-black/5 border border-black/5">
            <p
              style={SUBHEADING_STYLE}
              className="text-xs sm:text-sm uppercase tracking-wider text-[#111111]"
            >
              YOUR TIME MATTERS. SO DOES OURS.
            </p>
          </div>
        </section>

        {/* ==================================================
            12 — BEFORE WE BEGIN
            ================================================== */}
        <section className="reveal-card bg-[#F9FAFB] border border-black/10 rounded-3xl p-7 sm:p-10 shadow-xs space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#4E89FF]">12</span>
            <h2 style={HEADING_STYLE} className="text-2xl sm:text-3xl text-[#111111]">
              Before we begin
            </h2>
          </div>

          {/* Visual Sequence */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs flex flex-col justify-between min-h-[90px]"
              >
                <span className="text-[11px] font-mono font-semibold text-[#4E89FF]">
                  {step.num}
                </span>
                <span className="text-xs sm:text-sm font-normal text-[#111111] leading-tight">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-[16px] sm:text-[18px] text-[#111111]/85 leading-relaxed font-light">
            <p>
              You'll first receive a proposal outlining the project scope, deliverables, pricing, and expected timeline.
            </p>
            <p>
              If you decide to proceed, we'll provide the applicable Project Agreement.
            </p>
            <p className="font-normal text-[#111111]">
              Work begins once the required agreement has been accepted and the agreed initial payment has been received.
            </p>
          </div>
        </section>

        {/* ==================================================
            13 — IMPORTANT NOTICE
            ================================================== */}
        <section className="reveal-card bg-white rounded-3xl p-7 sm:p-10 border border-black/15 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#E0343F]" />
            <h2 style={HEADING_STYLE} className="text-xl sm:text-2xl text-[#111111]">
              One important thing
            </h2>
          </div>

          <div className="space-y-3 text-sm sm:text-base text-[#111111]/80 leading-relaxed font-light">
            <p>
              These guidelines explain how Typeface generally works with clients. They are not intended to replace the Project Agreement.
            </p>
            <p>
              The Project Agreement provided for your specific project will contain the terms that apply to that engagement.
            </p>
            <p className="text-xs sm:text-sm text-[#111111]/70 pt-2 border-t border-black/10">
              For significant projects, clients should review the agreement carefully and seek independent professional advice where appropriate.
            </p>
          </div>
        </section>

        {/* ==================================================
            FINAL CTA
            ================================================== */}
        <section className="reveal-card bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/10 text-center space-y-6">
          <h2
            style={HEADING_STYLE}
            className="text-2xl sm:text-3xl md:text-4xl text-[#111111]"
          >
            Think we're a good fit?
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#111111]/80 max-w-xl mx-auto font-light leading-relaxed">
            Tell us what you're trying to build. We'll look at what you need, be honest about what makes sense, and take it from there.
          </p>
          <div className="pt-2">
            <button
              onClick={handleStartProject}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#111111] hover:bg-black text-white text-[15px] sm:text-[16px] tracking-tight shadow-md hover:shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
