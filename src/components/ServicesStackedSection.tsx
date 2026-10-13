import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { 
  Check, 
  ArrowRight, 
  Code2, 
  Sparkles, 
  ShoppingBag, 
  Cpu, 
  Laptop, 
  Smartphone, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const MANROPE_FONT =
  "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface ServicePanelData {
  id: string; // 'one' | 'two' | 'three' | 'four'
  number: string;
  colorClass: string;
  gradientBackground: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
  ctaText: string;
  accentColor: string;
}

const SERVICE_PANELS: ServicePanelData[] = [
  {
    id: 'one',
    number: '01',
    colorClass: 'panel-gradient-1 red',
    gradientBackground: 'linear-gradient(110deg, #79D0E8 0%, #69F9B0 100%)',
    title: 'Web Development',
    badge: 'Custom Architecture',
    description:
      'From concept to launch, we design and build websites that reflect the true quality of your brand. Premium aesthetics, seamless experience, and a final product that works as hard as it looks good.',
    features: [
      'Custom website experiences',
      'Responsive development',
      'Performance and SEO foundations',
    ],
    ctaText: 'Explore Web Development →',
    accentColor: '#0A7080',
  },
  {
    id: 'two',
    number: '02',
    colorClass: 'panel-gradient-2 orange',
    gradientBackground: 'linear-gradient(135deg, #9AF5B2, #B8F7E5)',
    title: 'Landing Page Design',
    badge: 'Fresh Mint · Conversion',
    description:
      'First impressions convert. We design landing pages that are sharp, focused, and built around one goal — turning your traffic into leads, sales, and walk-ins.',
    features: [
      'Conversion-focused layouts',
      'Clear messaging and CTAs',
      'Responsive, fast-loading pages',
    ],
    ctaText: 'Design My Landing Page →',
    accentColor: '#0E7A55',
  },
  {
    id: 'three',
    number: '03',
    colorClass: 'panel-gradient-3 purple',
    gradientBackground: 'linear-gradient(135deg, #E7FF36, #B7F56B)',
    title: 'Shopify Development',
    badge: 'High Contrast · E-Commerce',
    description:
      'We build online stores that are as beautiful as they are profitable. Fast, reliable, and designed to turn browsers into buyers — backed by a platform built to scale.',
    features: [
      'Custom Shopify stores',
      'High-converting product & checkout pages',
      'App integrations & speed optimization',
    ],
    ctaText: 'Launch on Shopify →',
    accentColor: '#456100',
  },
  {
    id: 'four',
    number: '04',
    colorClass: 'panel-gradient-4 green',
    gradientBackground: 'linear-gradient(135deg, #D7F78B, #FFF4B8)',
    title: 'AI & Workflow Automation',
    badge: 'Citrus Cream · Systems',
    description:
      'We build intelligent automations and custom AI integrations that remove friction, cut repetitive work, and give your team hours back every week.',
    features: [
      'Custom AI workflow integration',
      'Lead capture and customer routing',
      'Internal tooling and automated pipelines',
    ],
    ctaText: 'Automate My Business →',
    accentColor: '#4C6010',
  },
];

export const ServicesStackedSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePanelIndex, setActivePanelIndex] = useState<number>(0);
  const [isSectionInView, setIsSectionInView] = useState<boolean>(false);
  const { navigate } = useNavigation();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // Track whether whole section is active for dock visibility
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => setIsSectionInView(true),
        onLeave: () => setIsSectionInView(false),
        onEnterBack: () => setIsSectionInView(true),
        onLeaveBack: () => setIsSectionInView(false),
      });

      if (prefersReducedMotion) {
        // Reduced motion: do not pin, allow natural flowing document
        return;
      }

      // Query all panel elements and navigation links
      const panels = gsap.utils.toArray<HTMLElement>('.panel', container);
      const navLinks = gsap.utils.toArray<HTMLAnchorElement>('nav a', container);

      // Array to hold references to individual triggers
      const triggers: ScrollTrigger[] = [];

      panels.forEach((panel, i) => {
        const isLast = i === panels.length - 1;

        // Create the ScrollTrigger pinned instance matching the GSAP reference
        // Panels 1..3 pin with pinSpacing: false so subsequent panels slide directly over them.
        // Panel 4 (last panel) pins with pinSpacing: true and end: "+=100%" to provide
        // a full 100vh reading distance so content is never hidden prematurely.
        const trigger = ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: isLast ? '+=100%' : undefined,
          pin: true,
          pinSpacing: isLast,
          onEnter: () => setActivePanelIndex(i),
          onEnterBack: () => setActivePanelIndex(i),
        });

        triggers.push(trigger);

        // Bind navigation click event matching reference behavior
        const nav = navLinks[i];
        if (nav) {
          const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            const targetY = trigger.start;

            // Coordinate with Lenis smooth scroll if active, otherwise use GSAP ScrollToPlugin
            const lenisInstance = (window as any).__lenis;
            if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
              lenisInstance.scrollTo(targetY, { duration: 1 });
            } else {
              gsap.to(window, {
                duration: 1,
                scrollTo: targetY,
                ease: 'power2.inOut',
              });
            }
          };

          nav.addEventListener('click', handleClick);

          // Store cleanup on element
          (nav as any).__clickHandler = handleClick;
        }
      });

      return () => {
        triggers.forEach((t) => t.kill());
        navLinks.forEach((nav) => {
          const handler = (nav as any).__clickHandler;
          if (handler) {
            nav.removeEventListener('click', handler);
          }
        });
      };
    },
    { scope: containerRef }
  );

  const handleCtaClick = () => {
    navigate('contact');
    window.history.pushState({}, '', '/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="services-stacked-container relative w-full bg-white select-none"
      style={{ fontFamily: MANROPE_FONT }}
    >
      {/* SECTION INTRO / HEADER */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-black/70">
              Core Capabilities
            </span>
          </div>
          <h2
            style={{ fontWeight: 500, letterSpacing: '-0.04em' }}
            className="text-4xl sm:text-5xl md:text-6xl text-[#111111] uppercase tracking-tight leading-[1.05]"
          >
            SERVICES WE ENGINEER
          </h2>
        </div>
        <p
          style={{ fontWeight: 300 }}
          className="max-w-md text-base sm:text-lg text-black/60 leading-relaxed"
        >
          Explore our four dedicated service specializations designed to turn digital presence into an unfair competitive advantage.
        </p>
      </div>

      {/* FLOATING IN-SECTION PANEL NAV DOCK
          Preserves existing Typeface design system & colors.
          Provides required navigation links (a[href="#one"], a[href="#two"], etc.)
          without cluttering the main top navigation. */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 pointer-events-none ${
          isSectionInView ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4'
        }`}
      >
        <nav
          aria-label="Services Panel Navigation"
          className="flex items-center gap-1.5 p-1.5 bg-black/85 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl"
        >
          {SERVICE_PANELS.map((item, index) => {
            const isActive = activePanelIndex === index;
            return (
              <div key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 block text-center whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="font-mono text-[10px] mr-1 opacity-60">0{index + 1}</span>
                  <span className="hidden sm:inline">{item.title.split(' ')[0]}</span>
                </a>
              </div>
            );
          })}
        </nav>
      </div>

      {/* FOUR STACKED PANELS */}
      {SERVICE_PANELS.map((panel, index) => (
        <section
          key={panel.id}
          id={panel.id}
          className={`panel ${panel.colorClass} w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 rounded-t-[36px] sm:rounded-t-[44px] md:rounded-t-[52px] border-t border-x border-black/10 shadow-[0_-25px_60px_rgba(0,0,0,0.18)]`}
          style={{
            zIndex: (index + 1) * 10,
            background: panel.gradientBackground,
          }}
        >
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-25"
            style={{ backgroundColor: '#ffffff' }}
          />

          <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col justify-between h-full">
            {/* Top Bar: Card Number & Reference .line */}
            <div className="w-full mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-mono text-sm sm:text-base font-semibold px-2.5 py-1 rounded-md bg-black/10 text-black/90 border border-black/15 shadow-sm"
                >
                  {panel.number} / 04
                </span>
              </div>

              {/* Exact reference .line element with matching styling */}
              <div
                className="line"
                style={{
                  background: `linear-gradient(90deg, #111111 0%, rgba(17, 17, 17, 0.75) 45%, rgba(17, 17, 17, 0.15) 100%)`,
                }}
              />
            </div>

            {/* Main Content Layout: 2-Column Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              {/* Left Column: Title, Description, Bullet Points & CTA */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h3
                  style={{ fontWeight: 500, letterSpacing: '-0.04em' }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[1.08] mb-5 uppercase"
                >
                  {panel.title}
                </h3>

                <p
                  style={{ fontWeight: 300 }}
                  className="text-base sm:text-lg md:text-xl text-black/80 font-light leading-relaxed mb-8 max-w-xl"
                >
                  {panel.description}
                </p>

                {/* Feature Points */}
                <div className="space-y-3 mb-8 sm:mb-10">
                  {panel.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border border-black/25 bg-black/10"
                      >
                        <Check
                          className="w-3 h-3 stroke-[2.5] text-black"
                        />
                      </div>
                      <span className="text-sm sm:text-base text-black/90 font-normal">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div>
                  <button
                    onClick={handleCtaClick}
                    style={{
                      fontFamily: MANROPE_FONT,
                      fontWeight: 600,
                    }}
                    className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#111111] text-white hover:bg-black/85 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <span>{panel.ctaText}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Custom Interactive / Visual Card Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md bg-black/[0.07] backdrop-blur-md rounded-3xl border border-black/15 p-6 sm:p-7 shadow-xl relative overflow-hidden">
                  {/* Subtle top indicator bar */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/15 text-black/60 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span>SPECIFICATION // {panel.number}</span>
                  </div>

                  {/* Panel-Specific Graphic Mockup */}
                  {panel.id === 'one' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-black/[0.08] border border-black/15">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-black/70 font-mono font-medium">Lighthouse Performance</span>
                          <span className="text-xs font-bold text-black bg-black/15 px-2 py-0.5 rounded-md">99 / 100</span>
                        </div>
                        <div className="w-full bg-black/15 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#111111] h-full w-[99%]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-black/[0.06] border border-black/10 flex items-center gap-2 text-black/90 font-medium">
                          <Code2 className="w-4 h-4 text-black" />
                          <span>React & Vite</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/[0.06] border border-black/10 flex items-center gap-2 text-black/90 font-medium">
                          <Zap className="w-4 h-4 text-black" />
                          <span>Sub-second LCP</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0D0F12] border border-black/20 text-[11px] font-mono text-white/80 shadow-inner">
                        <span className="text-blue-400">export default</span> <span className="text-yellow-400">function</span> <span className="text-emerald-400">ModernExperience</span>() &#123;
                        <br />
                        &nbsp;&nbsp;<span className="text-white/40">// Zero compromises. Production ready.</span>
                        <br />
                        &#125;
                      </div>
                    </div>
                  )}

                  {panel.id === 'two' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-black/[0.08] border border-black/15">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-black/70 font-mono font-medium">Conversion Lift</span>
                          <span className="text-xs font-bold text-black bg-black/15 px-2 py-0.5 rounded-md">+340% Target</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-black">4.82%</span>
                          <span className="text-xs text-black/75 flex items-center gap-0.5 font-medium">
                            <TrendingUp className="w-3 h-3 text-black" /> Average Baseline: 1.1%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-black/[0.06] border border-black/10 flex items-center justify-between text-black/90">
                          <span>Above-the-Fold Hook</span>
                          <span className="text-black font-mono font-bold">Optimized</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-black/[0.06] border border-black/10 flex items-center justify-between text-black/90">
                          <span>Single-Focus CTA</span>
                          <span className="text-black font-mono font-bold">Frictionless</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-black/[0.06] border border-black/10 flex items-center justify-between text-black/90">
                          <span>Mobile Viewport First</span>
                          <span className="text-black font-mono font-bold">100% Native</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {panel.id === 'three' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-black/[0.08] border border-black/15">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-black/70 font-mono font-medium">Shopify Store Metrics</span>
                          <span className="text-xs font-bold text-black bg-black/15 px-2 py-0.5 rounded-md">Scale-Ready</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-black/10 border border-black/15 flex items-center justify-center text-black">
                            <ShoppingBag className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-black">Custom Cart & Checkout</div>
                            <div className="text-xs text-black/65">Apple Pay · Shop Pay · Klarna</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-black/[0.06] border border-black/10 text-center">
                          <div className="text-black/60 text-[10px] uppercase font-mono">Checkout Speed</div>
                          <div className="text-sm font-bold text-black mt-1">0.48s</div>
                        </div>
                        <div className="p-3 rounded-xl bg-black/[0.06] border border-black/10 text-center">
                          <div className="text-black/60 text-[10px] uppercase font-mono">Drop-off Rate</div>
                          <div className="text-sm font-bold text-black mt-1">-42%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {panel.id === 'four' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-black/[0.08] border border-black/15">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-black/70 font-mono font-medium">Autonomous Pipeline</span>
                          <span className="text-xs font-bold text-black bg-black/15 px-2 py-0.5 rounded-md">Realtime</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-black/85">
                            <span className="w-2 h-2 rounded-full bg-black" />
                            <span>1. Inbound Lead Captured</span>
                          </div>
                          <div className="flex items-center gap-2 text-black/85">
                            <span className="w-2 h-2 rounded-full bg-black" />
                            <span>2. AI Qualification & Routing</span>
                          </div>
                          <div className="flex items-center gap-2 text-black/85">
                            <span className="w-2 h-2 rounded-full bg-black" />
                            <span>3. Automated CRM Sync & Alert</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-black/[0.06] border border-black/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-black/85">
                          <Cpu className="w-4 h-4 text-black" />
                          <span>Weekly Time Reclaimed</span>
                        </div>
                        <span className="font-bold text-black font-mono">18+ Hours</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>
      ))}
    </div>
  );
};
