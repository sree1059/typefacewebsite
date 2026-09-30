import React, { useRef } from 'react';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ==================================================
   CARD 2 — CENTER: <DigitalExperienceCard />
   Represents: DIGITAL EXPERIENCE
   Main card (in front, z-index: 3, translateZ: 50px)
   ================================================== */
export const DigitalExperienceCard: React.FC<{
  mouseOffset?: { x: number; y: number };
  isLoaded?: boolean;
}> = ({ mouseOffset = { x: 0, y: 0 }, isLoaded = true }) => {
  // Semicircular progress gauge with 19 thick rounded segments
  // Active segments: bright electric blue #155EEF
  // Inactive segments: very pale blue #DCE9FF
  const totalSegments = 19;
  const activeCount = Math.round(totalSegments * 0.8); // 15 active (80%)

  const cx = 170;
  const cy = 150;
  const r = 100;
  const segmentLength = 26;
  const strokeWidth = 8.5;

  const segments = Array.from({ length: totalSegments }).map((_, i) => {
    const angleDeg = 180 + (i / (totalSegments - 1)) * 180;
    const angleRad = (angleDeg * Math.PI) / 180;

    const rInner = r - segmentLength / 2;
    const rOuter = r + segmentLength / 2;

    const x1 = cx + rInner * Math.cos(angleRad);
    const y1 = cy + rInner * Math.sin(angleRad);
    const x2 = cx + rOuter * Math.cos(angleRad);
    const y2 = cy + rOuter * Math.sin(angleRad);

    const isActive = i < activeCount;
    return {
      id: i,
      x1,
      y1,
      x2,
      y2,
      color: isActive ? '#155EEF' : '#DCE9FF',
    };
  });

  return (
    <div
      className="center-card-element max-w-[92vw] flex flex-col justify-between select-none"
      style={{
        width: '450px',
        height: '400px',
        backgroundColor: '#F7F9FC',
        borderRadius: '28px',
        boxShadow: '0 25px 70px rgba(30, 70, 120, 0.12)',
        padding: '28px 30px 22px',
        position: 'relative',
        boxSizing: 'border-box',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Header: "DIGITAL EXPERIENCE" & "Monthly ▾" pill */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[#111111] text-[19px] sm:text-[24px] md:text-[31px] font-semibold tracking-tight m-0 leading-none truncate">
          DIGITAL EXPERIENCE
        </h2>

        {/* Rounded white dropdown pill */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-white text-[#4A5568] px-2.5 sm:px-3.5 py-1.5 sm:h-[42px] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/5 text-[12px] sm:text-[14px] font-medium cursor-pointer hover:bg-slate-50 transition-colors flex-shrink-0">
          <span>Monthly</span>
          <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9AA1AD] stroke-[2.2]" />
        </div>
      </div>

      {/* Main Semicircular Radial Gauge Visual */}
      <div className="relative flex flex-col items-center justify-center my-auto -mt-1 sm:-mt-2">
        <svg
          viewBox="0 0 340 180"
          className="w-[240px] sm:w-[280px] md:w-[310px] h-auto max-h-[140px] sm:max-h-[165px] overflow-visible"
          style={{ filter: 'drop-shadow(0 4px 14px rgba(21, 94, 239, 0.14))' }}
        >
          {segments.map((seg) => (
            <line
              key={seg.id}
              x1={seg.x1}
              y1={seg.y1}
              x2={seg.x2}
              y2={seg.y2}
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
          ))}
        </svg>

        {/* Center Percentage & Label */}
        <div className="absolute top-[64px] sm:top-[74px] md:top-[82px] left-1/2 -translate-x-1/2 text-center pointer-events-none w-full">
          <div className="text-[40px] sm:text-[48px] md:text-[58px] font-bold text-[#111111] tracking-tight leading-none">
            80%
          </div>
          <div className="text-[13px] sm:text-[15px] md:text-[17px] text-[#9AA1AD] font-normal mt-0.5 sm:mt-1 tracking-tight">
            Website Performance
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Divider & 3 Columns */}
      <div className="pt-2 sm:pt-3 border-t border-[#E5E9F0]">
        <div className="grid grid-cols-3 divide-x divide-[#E5E9F0] text-center">
          {/* Column 1: Visitors */}
          <div className="px-1 sm:px-2">
            <div className="text-[18px] sm:text-[22px] md:text-[25px] font-bold text-[#111111] leading-none tracking-tight">
              2.4K
            </div>
            <div className="text-[11px] sm:text-[12px] md:text-[13px] text-[#9AA1AD] font-medium mt-0.5 sm:mt-1">
              Visitors
            </div>
          </div>

          {/* Column 2: Engagement */}
          <div className="px-1 sm:px-2">
            <div className="text-[18px] sm:text-[22px] md:text-[25px] font-bold text-[#111111] leading-none tracking-tight">
              1.8K
            </div>
            <div className="text-[11px] sm:text-[12px] md:text-[13px] text-[#9AA1AD] font-medium mt-0.5 sm:mt-1">
              Engagement
            </div>
          </div>

          {/* Column 3: Leads */}
          <div className="px-1 sm:px-2">
            <div className="text-[18px] sm:text-[22px] md:text-[25px] font-bold text-[#111111] leading-none tracking-tight">
              320
            </div>
            <div className="text-[11px] sm:text-[12px] md:text-[13px] text-[#9AA1AD] font-medium mt-0.5 sm:mt-1">
              Leads
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==================================================
   CARD 1 — LEFT: <SocialPresenceCard />
   Represents: SOCIAL PRESENCE
   Positioned behind center card: rotateZ(-8deg), translateX(-250px), translateY(20px), translateZ(-80px)
   ================================================== */
export const SocialPresenceCard: React.FC<{
  mouseOffset?: { x: number; y: number };
  isLoaded?: boolean;
}> = ({ mouseOffset = { x: 0, y: 0 }, isLoaded = true }) => {
  // Monthly social-media/content growth chart: JAN, FEB, MAR, APR, MAY
  const monthsData = [
    { month: 'JAN', height: 105 },
    { month: 'FEB', height: 150 },
    { month: 'MAR', height: 95 },
    { month: 'APR', height: 170 },
    { month: 'MAY', height: 135 },
  ];

  return (
    <div
      className="transactions-card-element max-w-[90vw] flex flex-col justify-between select-none"
      style={{
        width: '430px',
        height: '350px',
        backgroundColor: '#F7F9FC',
        borderRadius: '28px',
        boxShadow: '0 25px 70px rgba(30, 70, 120, 0.12)',
        padding: '26px 28px 20px',
        position: 'relative',
        boxSizing: 'border-box',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-[#111111] text-[30px] font-semibold tracking-tight m-0 leading-none">
            SOCIAL PRESENCE
          </h2>
          {/* Secondary tiny label */}
          <div className="text-[13px] text-[#9AA1AD] font-medium bg-white/70 px-3 py-1 rounded-full border border-black/5">
            Content
          </div>
        </div>

        {/* 85% + Green pill (↑ 12%) */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-[48px] font-bold text-[#111111] leading-none tracking-tight">
            85%
          </span>
          <div className="inline-flex items-center gap-1 bg-[#E8F8F0] text-[#22B573] px-2.5 py-1 rounded-full text-[13px] font-semibold">
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.8]" />
            <span>12%</span>
          </div>
        </div>
      </div>

      {/* Social-media growth chart: 5 rounded bars with diagonal stripes */}
      <div className="w-full mt-2">
        <svg viewBox="0 0 410 170" className="w-full h-[155px] overflow-visible">
          <defs>
            {/* Diagonal blue stripe pattern matching the reference image */}
            <pattern
              id="social-stripes"
              width="10"
              height="10"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="#4D8DFF"
                strokeWidth="4"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="#DCE9FF"
                strokeWidth="6"
              />
            </pattern>
          </defs>

          {/* 5 rounded vertical bars */}
          {monthsData.map((item, idx) => {
            const barWidth = 44;
            const barSpacing = 72;
            const x = 20 + idx * barSpacing;
            const y = 145 - item.height;

            return (
              <g key={item.month}>
                {/* Very pale blue background track */}
                <rect
                  x={x}
                  y={15}
                  width={barWidth}
                  height={130}
                  rx={22}
                  fill="#EBF3FD"
                  opacity={0.65}
                />
                {/* Active bar with diagonal stripe pattern */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={item.height}
                  rx={22}
                  fill="url(#social-stripes)"
                />
                {/* Month label */}
                <text
                  x={x + barWidth / 2}
                  y={163}
                  textAnchor="middle"
                  fill="#9AA1AD"
                  fontSize="12.5"
                  fontWeight="600"
                  fontFamily="'Inter', system-ui, sans-serif"
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

/* ==================================================
   CARD 3 — RIGHT: <ContentPerformanceCard />
   Represents: CONTENT PERFORMANCE
   Positioned behind center card: rotateZ(8deg), translateX(250px), translateY(30px), translateZ(-80px)
   ================================================== */
export const ContentPerformanceCard: React.FC<{
  mouseOffset?: { x: number; y: number };
  isLoaded?: boolean;
}> = ({ mouseOffset = { x: 0, y: 0 }, isLoaded = true }) => {
  // Months: JUL, AUG, SEP, OCT, NOV with increasing progression
  const monthsData = [
    { month: 'JUL', height: 80, bgHeight: 130 },
    { month: 'AUG', height: 105, bgHeight: 130 },
    { month: 'SEP', height: 120, bgHeight: 130 },
    { month: 'OCT', height: 132, bgHeight: 130 },
    { month: 'NOV', height: 145, bgHeight: 130 },
  ];

  return (
    <div
      className="performance-card-element max-w-[90vw] flex flex-col justify-between select-none"
      style={{
        width: '430px',
        height: '350px',
        backgroundColor: '#F7F9FC',
        borderRadius: '28px',
        boxShadow: '0 25px 70px rgba(30, 70, 120, 0.12)',
        padding: '26px 28px 20px',
        position: 'relative',
        boxSizing: 'border-box',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Header: "CONTENT PERFORMANCE" + "Monthly ▾" */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[#111111] text-[18px] sm:text-[22px] md:text-[28px] font-semibold tracking-tight m-0 leading-none truncate">
          CONTENT PERFORMANCE
        </h2>

        {/* Rounded dropdown pill */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-white text-[#4A5568] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/5 text-[12px] sm:text-[13.5px] font-medium cursor-pointer hover:bg-slate-50 transition-colors flex-shrink-0">
          <span>Monthly</span>
          <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9AA1AD] stroke-[2.2]" />
        </div>
      </div>

      {/* Metric highlight */}
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-[34px] font-bold text-[#111111] leading-none tracking-tight">
          $48.2k
        </span>
        <span className="text-[13px] text-[#9AA1AD] font-medium">
          +24% vs last cycle
        </span>
      </div>

      {/* Clean monthly performance bar chart: pale blue background bars with stronger blue foreground bars */}
      <div className="w-full mt-2">
        <svg viewBox="0 0 410 170" className="w-full h-[155px] overflow-visible">
          <defs>
            <linearGradient id="performance-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#155EEF" />
              <stop offset="100%" stopColor="#4D8DFF" />
            </linearGradient>
          </defs>

          {monthsData.map((item, idx) => {
            const barWidth = 44;
            const barSpacing = 72;
            const x = 20 + idx * barSpacing;
            const yForeground = 145 - item.height;

            return (
              <g key={item.month}>
                {/* Pale blue background bar */}
                <rect
                  x={x}
                  y={15}
                  width={barWidth}
                  height={item.bgHeight}
                  rx={22}
                  fill="#DCE9FF"
                />
                {/* Stronger blue foreground bar */}
                <rect
                  x={x}
                  y={yForeground}
                  width={barWidth}
                  height={item.height}
                  rx={22}
                  fill="url(#performance-blue)"
                />
                {/* Month label */}
                <text
                  x={x + barWidth / 2}
                  y={163}
                  textAnchor="middle"
                  fill="#9AA1AD"
                  fontSize="12.5"
                  fontWeight="600"
                  fontFamily="'Inter', system-ui, sans-serif"
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom label */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E9F0]">
        <span className="text-[13px] text-[#9AA1AD] font-medium">
          Reach &amp; Engagement
        </span>
        <span className="text-[13px] font-semibold text-[#155EEF]">
          High Performing
        </span>
      </div>
    </div>
  );
};

/* ==================================================
   MAIN COMPOSITION: <DashboardCards />
   3D Stage + Mouse Parallax + Responsive Handling
   ================================================== */
export const DashboardCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const centerCardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const leftCard = leftCardRef.current;
      const rightCard = rightCardRef.current;
      const centerCard = centerCardRef.current;

      if (!container || !leftCard || !rightCard || !centerCard) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) {
        gsap.set([centerCard, leftCard, rightCard], { opacity: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      // DESKTOP & TABLET (>= 768px):
      // Balanced 1200px perspective
      // Animate inner card elements so outer 3D wrapper positioning is 100% preserved
      mm.add('(min-width: 768px)', () => {
        gsap.set(container, { perspective: 1200 });

        gsap.set(centerCard, {
          opacity: 0,
          y: 35,
          scale: 0.94,
        });

        gsap.set([leftCard, rightCard], {
          opacity: 0,
          y: 30,
          scale: 0.94,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        });

        tl.to(centerCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: 'power3.out',
        })
          .to(
            leftCard,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.05,
              ease: 'power3.out',
            },
            '-=0.75'
          )
          .to(
            rightCard,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.05,
              ease: 'power3.out',
            },
            '-=0.85'
          );
      });

      // MOBILE (< 768px):
      // Resolves mobile hanging with lightweight 2D entrance
      mm.add('(max-width: 767.98px)', () => {
        gsap.set(container, { perspective: 600 });

        gsap.set([centerCard, leftCard, rightCard], {
          opacity: 0,
          y: 18,
          scale: 0.96,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 95%',
            once: true,
          },
          onComplete: () => {
            gsap.set([centerCard, leftCard, rightCard], { willChange: 'auto' });
          },
        });

        tl.to(centerCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power2.out',
        }).to(
          [leftCard, rightCard],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.45'
        );
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="cards-stage relative w-full select-none h-[350px] sm:h-[400px] md:h-[440px] lg:h-[480px] overflow-hidden"
      style={{
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div
        className="cards-inner relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ==================================================
            1. LEFT CARD: SOCIAL PRESENCE
            Sitting behind the center card
            ================================================== */}
        <div className="dashboard-card-wrapper left-card-wrapper">
          <div ref={leftCardRef} className="floating-bob-subtle-left">
            <SocialPresenceCard />
          </div>
        </div>

        {/* ==================================================
            2. RIGHT CARD: CONTENT PERFORMANCE
            Sitting behind the center card
            ================================================== */}
        <div className="dashboard-card-wrapper right-card-wrapper">
          <div ref={rightCardRef} className="floating-bob-subtle-right">
            <ContentPerformanceCard />
          </div>
        </div>

        {/* ==================================================
            3. CENTER CARD: DIGITAL EXPERIENCE
            Sitting directly in front
            ================================================== */}
        <div className="dashboard-card-wrapper center-card-wrapper">
          <div ref={centerCardRef} className="floating-bob-subtle-center">
            <DigitalExperienceCard />
          </div>
        </div>
      </div>
    </div>
  );
};
