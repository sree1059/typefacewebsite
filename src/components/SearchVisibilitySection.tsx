import React, { useRef, useId } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Search,
  Bot,
  TrendingUp,
  Globe,
  Sparkles,
  Target,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// 1. EDITABLE CHART DATA & CONFIGURATION
// You can adjust values (0-150 scale), month labels, or add more data points
// =========================================================================
export interface VisibilityDataPoint {
  month: string;
  value: number; // 0 to 150 scale
}

export const VISIBILITY_CHART_DATA: VisibilityDataPoint[] = [
  { month: 'M1', value: 4 },
  { month: 'M2', value: 9 },
  { month: 'M3', value: 20 },
  { month: 'M4', value: 38 },
  { month: 'M5', value: 59 },
  { month: 'M6', value: 87 },
  { month: 'M7', value: 111 },
  { month: 'M8', value: 145 },
];

// =========================================================================
// 2. EDITABLE 4 VISIBILITY STEPS (Clean typography, minimal icons)
// =========================================================================
export const VISIBILITY_STEPS = [
  {
    number: '01',
    title: 'Find your visibility gaps',
    description:
      'We audit where competitors appear in top Google rankings and AI answer platforms while your brand remains unmentioned.',
    icon: Target,
  },
  {
    number: '02',
    title: 'Strengthen your Google presence',
    description:
      'High-authority technical architecture, fast Core Web Vitals, and structured schemas to dominate high-intent search queries.',
    icon: Globe,
  },
  {
    number: '03',
    title: 'Get discovered across AI search',
    description:
      'We seed structured entity knowledge so ChatGPT, Perplexity, and Gemini cite your business as the verified authority.',
    icon: Bot,
  },
  {
    number: '04',
    title: 'Turn visibility into revenue',
    description:
      'High-converting developer-grade UX and frictionless booking flows that transform search visibility into qualified client enquiries.',
    icon: TrendingUp,
  },
];

// =========================================================================
// 3. EDITABLE SAMPLE METRICS (Illustrative data)
// =========================================================================
export const SAMPLE_METRICS = {
  googleSearch: {
    target: 131,
    denominator: '/214',
    title: 'Google Search',
    tagline: 'Get discovered',
    detail: 'AI prompts & search queries citing your brand (illustrative sample)',
  },
  aiCitations: {
    target: 19,
    suffix: '%',
    title: 'AI Citations',
    tagline: 'Become a trusted answer',
    detail: 'Share of qualified enquiries arriving directly from AI citations',
  },
  qualifiedLeads: {
    target: 4.4,
    suffix: '×',
    title: 'Qualified Leads',
    tagline: 'Turn attention into enquiries',
    detail: 'Higher conversion rate from visitors arriving via verified AI answers',
  },
};

export const SearchVisibilitySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const stepsListRef = useRef<(HTMLDivElement | null)[]>([]);

  // Chart refs
  const dashboardCardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const areaPathRef = useRef<SVGPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const pointsRef = useRef<(SVGGElement | null)[]>([]);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);

  // Metric counter refs
  const counter1Ref = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);
  const counter3Ref = useRef<HTMLSpanElement>(null);
  const metricCardsRef = useRef<HTMLDivElement>(null);

  const clipId = useId();

  // SVG Chart Geometry
  const svgWidth = 560;
  const svgHeight = 240;
  const padLeft = 42;
  const padRight = 24;
  const padTop = 26;
  const padBottom = 36;

  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;
  const yMax = 150;
  const baselineY = padTop + chartH;

  // Final calculated coordinates
  const points = VISIBILITY_CHART_DATA.map((d, i) => {
    const x = padLeft + (i / (VISIBILITY_CHART_DATA.length - 1)) * chartW;
    const y = padTop + chartH - (d.value / yMax) * chartH;
    return { x, y, ...d };
  });

  // Smooth cubic Bézier generator for an arbitrary array of {x, y}
  const buildSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    return d;
  };

  const finalLinePathD = buildSmoothPath(points);
  const finalAreaPathD = `${finalLinePathD} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`;

  // =========================================================================
  // 4. GSAP SCROLLTRIGGER ANIMATION
  // =========================================================================
  useGSAP(
    () => {
      const section = sectionRef.current;
      const path = pathRef.current;
      const areaPath = areaPathRef.current;
      const clipRect = clipRectRef.current;
      if (!section || !path || !areaPath || !clipRect) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // Handle prefers-reduced-motion gracefully
      if (prefersReducedMotion) {
        gsap.set(clipRect, { attr: { width: svgWidth } });
        gsap.set(path, { attr: { d: finalLinePathD }, strokeDashoffset: 0, opacity: 1 });
        gsap.set(areaPath, { attr: { d: finalAreaPathD }, opacity: 1 });
        points.forEach((pt, i) => {
          if (circlesRef.current[i]) {
            circlesRef.current[i]!.setAttribute('cy', pt.y.toString());
          }
          if (pointsRef.current[i]) {
            gsap.set(pointsRef.current[i], { scale: 1, opacity: 1 });
          }
        });
        stepsListRef.current.forEach((st) => st && gsap.set(st, { opacity: 1, y: 0, x: 0 }));
        if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1, y: 0 });
        if (subtextRef.current) gsap.set(subtextRef.current, { opacity: 1, y: 0 });
        if (counter1Ref.current) counter1Ref.current.textContent = String(SAMPLE_METRICS.googleSearch.target);
        if (counter2Ref.current) counter2Ref.current.textContent = `${SAMPLE_METRICS.aiCitations.target}%`;
        if (counter3Ref.current) counter3Ref.current.textContent = `${SAMPLE_METRICS.qualifiedLeads.target}×`;
        return;
      }

      // -------------------------------------------------------------
      // Text Appearance on Scroll: Headline and 4 Steps
      // -------------------------------------------------------------
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: subtextRef.current,
              start: 'top 88%',
              once: true,
            },
            delay: 0.1,
          }
        );
      }

      // Steps reveal sequentially as user scrolls down
      stepsListRef.current.forEach((stepEl, idx) => {
        if (!stepEl) return;
        gsap.fromTo(
          stepEl,
          { opacity: 0, x: -20, y: 14 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepEl,
              start: 'top 88%',
              once: true,
            },
            delay: idx * 0.1,
          }
        );
      });

      // -------------------------------------------------------------
      // Chart Upward Growth + Synchronized Left-to-Right Draw
      // -------------------------------------------------------------
      // We start all points at baselineY (y = 0 in chart scale)
      const animatedPoints = points.map((p) => ({
        x: p.x,
        y: baselineY, // Start at bottom!
      }));

      // Initial state of SVG paths
      const startPathD = buildSmoothPath(animatedPoints);
      path.setAttribute('d', startPathD);
      areaPath.setAttribute('d', `${startPathD} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`);
      gsap.set(clipRect, { attr: { width: 0 } });

      // Circles initially collapsed at baseline
      points.forEach((pt, i) => {
        if (circlesRef.current[i]) {
          circlesRef.current[i]!.setAttribute('cy', baselineY.toString());
        }
        if (pointsRef.current[i]) {
          gsap.set(pointsRef.current[i], { scale: 0, opacity: 0, transformOrigin: 'center' });
        }
      });

      // Main Timeline triggered once when section reaches viewport
      const chartTl = gsap.timeline({
        scrollTrigger: {
          trigger: dashboardCardRef.current || section,
          start: 'top 78%',
          once: true,
        },
      });

      // Function to render path on each GSAP frame
      const updateChartPaths = () => {
        const curPathD = buildSmoothPath(animatedPoints);
        path.setAttribute('d', curPathD);
        areaPath.setAttribute(
          'd',
          `${curPathD} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
        );
      };

      // 1. Expand clipRect smoothly from left to right (2.2 seconds)
      chartTl.to(
        clipRect,
        {
          attr: { width: svgWidth },
          duration: 2.2,
          ease: 'power2.out',
        },
        0
      );

      // 2. Animate each point UPWARD from baselineY to its targetY
      // Staggered to sync with the left-to-right progression
      points.forEach((pt, i) => {
        const pointStartTime = (i / (points.length - 1)) * 1.5;
        const pointDuration = 0.9;

        chartTl.to(
          animatedPoints[i],
          {
            y: pt.y,
            duration: pointDuration,
            ease: 'power2.out',
            onUpdate: updateChartPaths,
          },
          pointStartTime
        );

        // Also physically move the circle up and scale it in
        if (circlesRef.current[i] && pointsRef.current[i]) {
          const circleEl = circlesRef.current[i]!;
          const pointGroup = pointsRef.current[i]!;

          chartTl.to(
            circleEl,
            {
              attr: { cy: pt.y },
              duration: pointDuration,
              ease: 'power2.out',
            },
            pointStartTime
          );

          chartTl.to(
            pointGroup,
            {
              scale: 1,
              opacity: 1,
              duration: 0.35,
              ease: 'back.out(1.7)',
            },
            pointStartTime + 0.15
          );
        }
      });

      // 3. Fade and slide metric cards upward into view
      if (metricCardsRef.current) {
        chartTl.fromTo(
          metricCardsRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
          },
          1.1
        );
      }

      // 4. Subtle number-counting animations for sample metrics
      const c1 = { val: 0 };
      chartTl.to(
        c1,
        {
          val: SAMPLE_METRICS.googleSearch.target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (counter1Ref.current) {
              counter1Ref.current.textContent = Math.round(c1.val).toString();
            }
          },
        },
        1.1
      );

      const c2 = { val: 0 };
      chartTl.to(
        c2,
        {
          val: SAMPLE_METRICS.aiCitations.target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            if (counter2Ref.current) {
              counter2Ref.current.textContent = `${Math.round(c2.val)}%`;
            }
          },
        },
        1.2
      );

      const c3 = { val: 1.0 };
      chartTl.to(
        c3,
        {
          val: SAMPLE_METRICS.qualifiedLeads.target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            if (counter3Ref.current) {
              counter3Ref.current.textContent = `${c3.val.toFixed(1)}×`;
            }
          },
        },
        1.3
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="search-visibility"
      aria-label="Google and AI Search Visibility"
      className="relative w-full bg-white text-[#111111] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-12 select-none border-b border-black/10 overflow-hidden"
      style={{
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Subtle ambient lime-green & mint wash matching homepage palette */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(105, 249, 176, 0.45) 0%, rgba(195, 248, 80, 0.25) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(85, 220, 255, 0.35) 0%, rgba(105, 249, 176, 0.2) 50%, transparent 70%)',
        }}
      />

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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Responsive Two-Column Layout (Desktop: 2 columns, Mobile/Tablet: stacked cleanly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* ========================================================
              LEFT COLUMN: Editorial Headline & 4 Actionable Steps
              ======================================================== */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-start">
            {/* Pill Eyebrow: Hero section gradient pill */}
            <div
              style={{
                background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold text-black mb-5 sm:mb-6 shadow-xs border border-black/10 self-start uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>GOOGLE &amp; AI VISIBILITY</span>
            </div>

            {/* Main Headline */}
            <h2
              ref={headlineRef}
              style={{
                letterSpacing: '-0.035em',
              }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[52px] xl:text-[56px] text-black font-normal tracking-tight leading-[1.08] mb-4 sm:mb-5"
            >
              From being invisible<br />
              <span
                style={{
                  background:
                    'linear-gradient(110deg, #155EEF 0%, #06B6D4 35%, #10B981 70%, #EAB308 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                className="font-semibold inline-block"
              >
                to becoming the answer
              </span>
              <span className="text-[#10B981]">.</span>
            </h2>

            {/* Supporting Text */}
            <p
              ref={subtextRef}
              className="text-base sm:text-lg text-black/70 font-light leading-relaxed mb-8 sm:mb-10 max-w-xl"
            >
              We help businesses get discovered on Google, get cited by AI search platforms, and turn visibility into real enquiries.
            </p>

            {/* 4 Connected Steps */}
            <div className="relative flex flex-col space-y-6 sm:space-y-7 pl-1">
              {/* Subtle connecting vertical line with hero section gradient */}
              <div className="absolute left-[20px] sm:left-[22px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#55DCFF] via-[#69F9B0] to-[#FFE600] pointer-events-none opacity-80" />

              {VISIBILITY_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      stepsListRef.current[idx] = el;
                    }}
                    className="relative flex items-start gap-3.5 sm:gap-4.5 group"
                  >
                    {/* Hero Gradient Icon Badge */}
                    <div
                      style={{
                        background:
                          'linear-gradient(135deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                      }}
                      className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-black border border-black/10 flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105"
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black" />
                    </div>

                    {/* Step Content */}
                    <div className="flex flex-col pt-0.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-black/45">
                          {step.number} —
                        </span>
                        <h3
                          style={{
                            letterSpacing: '-0.02em',
                          }}
                          className="text-base sm:text-lg font-bold text-black tracking-tight group-hover:text-[#065F46] transition-colors"
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-black/65 font-light leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Analytics Dashboard with Rising SVG Chart
              ======================================================== */}
          <div ref={dashboardCardRef} className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 w-full">
            {/* Dashboard Card with Thin Hero Gradient Outline */}
            <div className="p-[1px] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_12px_40px_rgba(105,249,176,0.16)] hover:shadow-[0_18px_50px_rgba(85,220,255,0.22)] transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[23px] sm:rounded-[31px] md:rounded-[35px] p-5 sm:p-7 md:p-9 flex flex-col justify-between relative overflow-hidden">
                {/* Internal ambient mint-green glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#69F9B0]/20 via-[#FFE600]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                {/* Dashboard Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 relative z-10">
                  <div>
                    <h3
                      style={{
                        letterSpacing: '-0.025em',
                      }}
                      className="text-lg xs:text-xl sm:text-2xl md:text-[25px] font-bold text-black tracking-tight"
                    >
                      Brand visibility across Google + AI search
                    </h3>
                    <p className="text-xs sm:text-[13px] text-black/55 font-light mt-0.5">
                      Measured brand mentions across Google Rank, ChatGPT, Perplexity &amp; Gemini
                    </p>
                  </div>

                  {/* Badge above chart: Hero section gradient pill */}
                  <div
                    style={{
                      background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-black text-xs font-mono font-bold shrink-0 self-start sm:self-center shadow-xs border border-black/10 transition-transform hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    <span>Visibility growth</span>
                  </div>
                </div>

                {/* ========================================================
                    ANIMATED RISING SVG LINE & GRADIENT FILL CHART
                    ======================================================== */}
                <div className="relative w-full aspect-[560/240] max-h-[300px] my-1 sm:my-2 select-none">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-full overflow-visible"
                    aria-label="Rising Brand Visibility Chart"
                  >
                    <defs>
                      {/* Translucent hero section gradient fill underneath */}
                      <linearGradient id={`areaGrad-${clipId}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#69F9B0" stopOpacity="0.45" />
                        <stop offset="45%" stopColor="#55DCFF" stopOpacity="0.25" />
                        <stop offset="80%" stopColor="#FFE600" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                      </linearGradient>

                      {/* Stroke line gradient: Hero section gradient */}
                      <linearGradient id={`strokeGrad-${clipId}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#155EEF" />
                        <stop offset="35%" stopColor="#06B6D4" />
                        <stop offset="70%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#EAB308" />
                      </linearGradient>

                      {/* Clip path for synchronized horizontal reveal */}
                      <clipPath id={`chartClip-${clipId}`}>
                        <rect
                          ref={clipRectRef}
                          x="0"
                          y="0"
                          width="0"
                          height={svgHeight}
                        />
                      </clipPath>
                    </defs>

                    {/* Horizontal Grid Lines & Y-Axis Labels (0, 30, 60, 90, 120, 150) */}
                    {[0, 30, 60, 90, 120, 150].map((val) => {
                      const y = padTop + chartH - (val / yMax) * chartH;
                      return (
                        <g key={val} className="text-black/35 font-mono text-[10px]">
                          <text
                            x={padLeft - 10}
                            y={y + 3.5}
                            textAnchor="end"
                            fill="currentColor"
                            className="select-none"
                          >
                            {val}
                          </text>
                          <line
                            x1={padLeft}
                            y1={y}
                            x2={svgWidth - padRight}
                            y2={y}
                            stroke="rgba(0,0,0,0.06)"
                            strokeDasharray={val === 0 ? undefined : '3 3'}
                            strokeWidth={val === 0 ? '1.5' : '1'}
                          />
                        </g>
                      );
                    })}

                    {/* X-Axis Month Labels: M1 to M8 */}
                    {points.map((pt, i) => (
                      <text
                        key={i}
                        x={pt.x}
                        y={padTop + chartH + 20}
                        textAnchor="middle"
                        fill="currentColor"
                        className="text-black/50 font-mono text-[11px] select-none"
                      >
                        {pt.month}
                      </text>
                    ))}

                    {/* Masked group for synchronized line + area reveal */}
                    <g clipPath={`url(#chartClip-${clipId})`}>
                      {/* Animated translucent lime-green gradient area fill */}
                      <path
                        ref={areaPathRef}
                        d={finalAreaPathD}
                        fill={`url(#areaGrad-${clipId})`}
                      />

                      {/* Deep-green / black rising line chart */}
                      <path
                        ref={pathRef}
                        d={finalLinePathD}
                        fill="none"
                        stroke={`url(#strokeGrad-${clipId})`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>

                    {/* Plotted Data Points with upward rising coordinates */}
                    {points.map((pt, i) => {
                      const isLast = i === points.length - 1;
                      return (
                        <g
                          key={i}
                          ref={(el) => {
                            pointsRef.current[i] = el;
                          }}
                          className="cursor-pointer group"
                        >
                          {/* Glow pulse on final summit point */}
                          {isLast && (
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="10"
                              fill="#10B981"
                              opacity="0.35"
                              className="animate-ping"
                            />
                          )}

                          {/* Outer circle point */}
                          <circle
                            ref={(el) => {
                              circlesRef.current[i] = el;
                            }}
                            cx={pt.x}
                            cy={pt.y}
                            r={isLast ? '6.5' : '5'}
                            fill={isLast ? '#10B981' : '#FFFFFF'}
                            stroke={isLast ? '#064E3B' : '#06B6D4'}
                            strokeWidth="2.5"
                            className="transition-transform duration-200 group-hover:scale-125"
                          />

                          {/* SVG Tooltip */}
                          <title>{`${pt.month}: ${pt.value} citations & queries`}</title>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Subtle footnote */}
                <div className="pt-2 text-right">
                  <span className="text-[11px] font-mono text-black/40">
                    Illustrative growth dashboard · Sample brand visibility timeline
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================
                3 METRIC CARDS (With thin radiant hero gradient outline)
                - Google Search — Get discovered
                - AI Citations — Become a trusted answer
                - Qualified Leads — Turn attention into enquiries
                ======================================================== */}
            <div
              ref={metricCardsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full"
            >
              {/* Card 1: Google Search — Get discovered */}
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-xs hover:shadow-md transition-all duration-300">
                <div className="w-full h-full bg-white rounded-[15px] p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span
                        ref={counter1Ref}
                        className="text-3xl sm:text-4xl font-extrabold text-black font-manrope tracking-tight"
                      >
                        0
                      </span>
                      <span className="text-xl sm:text-2xl font-light text-black/50">
                        {SAMPLE_METRICS.googleSearch.denominator}
                      </span>
                    </div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black mt-2 mb-0.5">
                      {SAMPLE_METRICS.googleSearch.title}
                    </h4>
                    <p
                      style={{
                        background:
                          'linear-gradient(110deg, #155EEF 0%, #06B6D4 40%, #10B981 75%, #D97706 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      className="text-xs font-bold mb-1"
                    >
                      — {SAMPLE_METRICS.googleSearch.tagline}
                    </p>
                    <p className="text-xs text-black/60 font-light leading-relaxed">
                      {SAMPLE_METRICS.googleSearch.detail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: AI Citations — Become a trusted answer */}
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-xs hover:shadow-md transition-all duration-300">
                <div className="w-full h-full bg-white rounded-[15px] p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span
                        ref={counter2Ref}
                        className="text-3xl sm:text-4xl font-extrabold text-black font-manrope tracking-tight"
                      >
                        0%
                      </span>
                    </div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black mt-2 mb-0.5">
                      {SAMPLE_METRICS.aiCitations.title}
                    </h4>
                    <p
                      style={{
                        background:
                          'linear-gradient(110deg, #155EEF 0%, #06B6D4 40%, #10B981 75%, #D97706 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      className="text-xs font-bold mb-1"
                    >
                      — {SAMPLE_METRICS.aiCitations.tagline}
                    </p>
                    <p className="text-xs text-black/60 font-light leading-relaxed">
                      {SAMPLE_METRICS.aiCitations.detail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Qualified Leads — Turn attention into enquiries */}
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-xs hover:shadow-md transition-all duration-300">
                <div className="w-full h-full bg-white rounded-[15px] p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span
                        ref={counter3Ref}
                        className="text-3xl sm:text-4xl font-extrabold text-black font-manrope tracking-tight"
                      >
                        1.0×
                      </span>
                    </div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black mt-2 mb-0.5">
                      {SAMPLE_METRICS.qualifiedLeads.title}
                    </h4>
                    <p
                      style={{
                        background:
                          'linear-gradient(110deg, #155EEF 0%, #06B6D4 40%, #10B981 75%, #D97706 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      className="text-xs font-bold mb-1"
                    >
                      — {SAMPLE_METRICS.qualifiedLeads.tagline}
                    </p>
                    <p className="text-xs text-black/60 font-light leading-relaxed">
                      {SAMPLE_METRICS.qualifiedLeads.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchVisibilitySection;
