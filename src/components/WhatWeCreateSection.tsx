import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  ShoppingBag, 
  Instagram, 
  Mail,
  Linkedin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WhatWeCreateSectionProps {
  headingFontSize?: number;
  useCaslonFont?: boolean;
}

const NARRATIVE_PARAGRAPHS = [
  'Typeface helps businesses build a stronger presence through thoughtful design, clear strategy, and work that adds real value. We work closely with our clients to understand their goals, find the right direction, and make sure every detail serves a purpose.',
  'From websites and branding to social content and product visuals, we bring ideas to life with a focus on quality, clarity, and results creating work that not only looks good, but genuinely helps your business move forward.',
];

interface ServiceCardItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  mockupType: 'website' | 'shopify' | 'social' | 'email' | 'linkedin';
  bgClass: string;
  borderClass: string;
  textMode: 'dark' | 'light';
  tagClass: string;
  previewContainerClass: string;
}

const SERVICES_CONFIG: ServiceCardItem[] = [
  {
    number: '01',
    title: 'Website Design',
    subtitle: 'Websites that turn attention into action.',
    description: 'High-conversion digital flagships and interactive brand homes engineered with editorial distinction.',
    tags: ['Business Websites', 'Landing Pages', 'Portfolio Websites', 'UI/UX Design'],
    mockupType: 'website',
    bgClass: 'bg-[#D6E4F8]', // 1. Soft pale powder blue
    borderClass: 'border-[#B8D3F5]',
    textMode: 'dark',
    tagClass: 'bg-black/6 text-[#111111]/85 border border-black/10',
    previewContainerClass: 'border-black/10 bg-black/5',
  },
  {
    number: '02',
    title: 'Shopify',
    subtitle: 'E-commerce experiences built to sell.',
    description: 'Bespoke storefronts, frictionless checkout funnels, and editorial merchandising built to scale.',
    tags: ['Shopify Store Design', 'Store Setup', 'Product Pages', 'E-commerce UI'],
    mockupType: 'shopify',
    bgClass: 'bg-[#FAF6F0]', // 2. Warm off-white / cream
    borderClass: 'border-[#E5DDD0]',
    textMode: 'dark',
    tagClass: 'bg-black/6 text-[#111111]/85 border border-black/10',
    previewContainerClass: 'border-black/10 bg-black/5',
  },
  {
    number: '03',
    title: 'Social Media',
    subtitle: 'Content that makes brands impossible to ignore.',
    description: 'High-impact visual narratives, carousels, and design systems that command attention across feeds.',
    tags: ['Social Media Design', 'Carousel Design', 'Post & Creative Design', 'Content Planning'],
    mockupType: 'social',
    bgClass: 'bg-[#EE3938]', // 3. Bright coral red
    borderClass: 'border-[#D92625]',
    textMode: 'light',
    tagClass: 'bg-white/20 text-white border border-white/25 backdrop-blur-xs',
    previewContainerClass: 'border-white/25 bg-black/15',
  },
  {
    number: '04',
    title: 'Email Marketing',
    subtitle: 'Campaigns designed to keep your audience engaged.',
    description: 'Editorial newsletters, retention automations, and promotional stories with industry-leading open rates.',
    tags: ['Email Design', 'Newsletter Design', 'Promotional Campaigns', 'Email Templates'],
    mockupType: 'email',
    bgClass: 'bg-[#FEF3C7]', // 4. Soft warm yellow / cream
    borderClass: 'border-[#F2DF92]',
    textMode: 'dark',
    tagClass: 'bg-black/6 text-[#111111]/85 border border-black/10',
    previewContainerClass: 'border-black/10 bg-black/5',
  },
  {
    number: '05',
    title: 'LinkedIn Writing',
    subtitle: 'Write with clarity. Build authority.',
    description: 'Professional LinkedIn content that helps founders, professionals and brands communicate their ideas and build a stronger presence.',
    tags: ['LinkedIn Posts', 'Thought Leadership', 'Founder Content', 'Personal Branding Content'],
    mockupType: 'linkedin',
    bgClass: 'bg-[#1C51E5]', // 5. Confident deep / medium blue
    borderClass: 'border-[#1542C4]',
    textMode: 'light',
    tagClass: 'bg-white/20 text-white border border-white/25 backdrop-blur-xs',
    previewContainerClass: 'border-white/25 bg-black/15',
  },
];

// Stacking specifications for Desktop (>= 768px)
const DESKTOP_STACK_STYLES = [
  { scale: 1, y: 0, x: 0, rotation: 0, opacity: 1, zIndex: 10 },
  { scale: 0.96, y: 16, x: 10, rotation: 1.2, opacity: 0.96, zIndex: 9 },
  { scale: 0.92, y: 32, x: 20, rotation: -1.2, opacity: 0.92, zIndex: 8 },
  { scale: 0.88, y: 48, x: 30, rotation: 1.5, opacity: 0.88, zIndex: 7 },
  { scale: 0.84, y: 64, x: 40, rotation: -1.8, opacity: 0.84, zIndex: 6 },
];

// Stacking specifications for Mobile (< 768px)
// Subtle X offsets avoid viewport horizontal overflow; compact Y offsets
const MOBILE_STACK_STYLES = [
  { scale: 1, y: 0, x: 0, rotation: 0, opacity: 1, zIndex: 10 },
  { scale: 0.96, y: 10, x: 3, rotation: 0.7, opacity: 0.95, zIndex: 9 },
  { scale: 0.92, y: 20, x: -3, rotation: -0.7, opacity: 0.90, zIndex: 8 },
  { scale: 0.88, y: 30, x: 4, rotation: 0.9, opacity: 0.85, zIndex: 7 },
  { scale: 0.84, y: 40, x: -4, rotation: -0.9, opacity: 0.80, zIndex: 6 },
];

/**
 * Reusable Card Content responsive for both Desktop and Mobile
 */
const ServiceCardContent: React.FC<{
  service: ServiceCardItem;
  fontStyle: React.CSSProperties;
  visualRef?: (el: HTMLDivElement | null) => void;
}> = ({ service, fontStyle, visualRef }) => {
  const isLightText = service.textMode === 'light';

  return (
    <div className="flex flex-col justify-between sm:grid sm:grid-cols-12 sm:gap-6 sm:items-center w-full h-full font-manrope">
      {/* LEFT COLUMN: Number, Large Title, Subtitle, Description, Tags */}
      <div className="sm:col-span-7 flex flex-col justify-center space-y-1 xs:space-y-1.5 sm:space-y-2.5 no-copy">
        {/* Number */}
        <div>
          <span
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 400,
            }}
            className={`text-lg xs:text-xl sm:text-2xl md:text-3xl font-normal tracking-tight leading-none ${
              isLightText ? 'text-white' : 'text-[#111111]'
            }`}
          >
            {service.number}
          </span>
        </div>

        {/* Large Service Title */}
        <h3
          style={{
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 400,
          }}
          className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-normal leading-[1.08] tracking-tight ${
            isLightText ? 'text-white' : 'text-[#111111]'
          }`}
        >
          {service.title}
        </h3>

        {/* Subtitle / Punchline */}
        <p
          style={{
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 300,
          }}
          className={`text-[24px] xs:text-[28px] sm:text-[34px] md:text-[44px] font-light leading-[1.14] tracking-tight ${
            isLightText ? 'text-white/95' : 'text-[#111111]'
          }`}
        >
          {service.subtitle}
        </p>

        {/* Short Description */}
        <p
          style={{
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 300,
          }}
          className={`text-[11px] xs:text-xs md:text-[13.5px] font-light leading-relaxed line-clamp-2 sm:line-clamp-none ${
            isLightText ? 'text-white/80' : 'text-[#111111]/75'
          }`}
        >
          {service.description}
        </p>

        {/* Service Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
          {service.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              style={{
                fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 300,
              }}
              className={`text-[9px] xs:text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-0.5 rounded-full font-light ${service.tagClass}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Visual Preview */}
      <div className="sm:col-span-5 flex items-center justify-center sm:justify-end w-full pt-1 sm:pt-0">
        <div
          ref={visualRef}
          className={`w-full max-w-[190px] xs:max-w-[210px] sm:max-w-[200px] md:max-w-[225px] lg:max-w-[245px] mx-auto sm:mx-0 sm:ml-auto rounded-xl sm:rounded-2xl overflow-hidden p-1.5 sm:p-2 shadow-md transition-transform duration-300 ${service.previewContainerClass}`}
        >
          {/* Visual 01: Website Preview */}
          {service.mockupType === 'website' && (
            <div className="bg-[#1D1D1F] rounded-xl p-1.5 border border-white/20">
              <div className="flex items-center gap-1 pb-1 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                <span className="ml-auto text-[7px] font-mono text-white/50">kerningstroke.studio</span>
              </div>
              <div className="aspect-[16/9] rounded-lg overflow-hidden relative mt-1 bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=400&auto=format&fit=crop"
                  alt="Website Mockup"
                  loading="eager"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-1.5 flex flex-col justify-end">
                  <span className="text-[7px] font-mono text-[#E0343F] uppercase font-bold">Atelier N° 09</span>
                  <span className="text-[8.5px] sm:text-[9px] font-semibold text-white truncate">Architecture Flagship</span>
                </div>
              </div>
            </div>
          )}

          {/* Visual 02: Shopify Preview */}
          {service.mockupType === 'shopify' && (
            <div className="bg-white rounded-xl p-1.5 sm:p-2 border border-black/10 text-black shadow-sm">
              <div className="flex items-center justify-between text-[7px] font-mono text-black/60 pb-1 border-b border-black/5">
                <span className="font-bold flex items-center gap-1 text-black">
                  <ShoppingBag className="w-2.5 h-2.5 text-[#E0343F]" />
                  THRILLHIKERS
                </span>
                <span className="flex items-center gap-1 text-[7px] font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE STORE
                </span>
              </div>
              <div className="aspect-[16/9] rounded-lg overflow-hidden relative mt-1 bg-[#0A192F] border border-black/5">
                <img
                  src="/images/services/shopify.jpg"
                  alt="ThrillHikers Shopify Storefront"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-1.5 sm:p-2 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-[6px] sm:text-[6.5px] font-mono uppercase bg-white/20 backdrop-blur-xs text-white px-1 sm:px-1.5 py-0.5 rounded">
                      Shopify
                    </span>
                  </div>
                  <div>
                    <span className="text-[6px] sm:text-[6.5px] font-mono text-amber-300 uppercase tracking-wider block font-bold">
                      Adventure Commerce
                    </span>
                    <span className="text-[8px] sm:text-[8.5px] font-semibold text-white leading-tight block truncate">
                      Uncover Natural Wonders
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-1 sm:mt-1.5 flex justify-between items-center text-[7px] sm:text-[7.5px] font-medium text-black/80">
                <span className="font-semibold text-black truncate">ThrillHikers Storefront</span>
                <span className="text-[6.5px] sm:text-[7px] text-black/50 font-mono shrink-0">Bespoke UI</span>
              </div>
            </div>
          )}

          {/* Visual 03: Social Media Preview */}
          {service.mockupType === 'social' && (
            <div className="bg-white rounded-xl p-1.5 sm:p-2 border border-black/10 text-black shadow-sm">
              <div className="flex items-center justify-between text-[7px] font-mono text-black/60 pb-1 border-b border-black/5">
                <span className="font-bold flex items-center gap-1 text-black">
                  <Instagram className="w-2.5 h-2.5 text-[#EE3938]" />
                  anikasingh
                </span>
                <span className="text-black/50 text-[6.5px]">Post</span>
              </div>
              <div className="aspect-[4/3] sm:aspect-square rounded-lg overflow-hidden relative mt-1 bg-[#F4EFEA] border border-black/5">
                <img
                  src="/images/services/social-media.jpg"
                  alt="anikasingh Social Media Post"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[7px] text-black/75 font-mono">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5 text-[#C94A29] font-bold">
                    <span>❤️</span> 1.5K
                  </span>
                  <span className="flex items-center gap-0.5">
                    <span>💬</span> 2.3K
                  </span>
                </div>
                <span className="text-black/40 text-[6.5px]">🔖</span>
              </div>
            </div>
          )}

          {/* Visual 04: Email Marketing Preview */}
          {service.mockupType === 'email' && (
            <div className="bg-white text-black rounded-xl p-1.5 sm:p-2 border border-black/10 shadow-sm">
              <div className="flex items-center justify-between text-[7px] font-mono text-black/60 pb-1 border-b border-black/5">
                <span className="flex items-center gap-1 font-bold text-black">
                  <Mail className="w-2.5 h-2.5 text-[#E0343F]" />
                  ULTIMATE TOURS
                </span>
                <span className="text-amber-800 font-bold">98.4% Open</span>
              </div>
              <div className="mt-1">
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative bg-[#FDFBF7] border border-black/5">
                  <img
                    src="/images/services/email-marketing.jpg"
                    alt="Ultimate Tours Email Newsletter Preview"
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="mt-1 sm:mt-1.5 flex items-center justify-between text-[7px] sm:text-[7.5px] font-medium text-black">
                  <span className="font-semibold truncate">The 3 Restaurants You Must Visit</span>
                  <span className="text-[6.5px] sm:text-[7px] text-black/50 font-mono shrink-0">Editorial Guide</span>
                </div>
              </div>
            </div>
          )}

          {/* Visual 05: LinkedIn Writing Preview */}
          {service.mockupType === 'linkedin' && (
            <div className="bg-white rounded-xl p-1.5 sm:p-2.5 border border-black/10 text-black shadow-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 pb-1 sm:pb-1.5 border-b border-black/5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1C51E5] text-white flex items-center justify-center text-[7px] sm:text-[8px] font-bold shrink-0">
                  <Linkedin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[7.5px] sm:text-[8px] font-bold text-black leading-none truncate">KERNING STROKE</span>
                  <span className="text-[6px] sm:text-[6.5px] text-black/55 leading-tight truncate">Executive Ghostwriting · 1d · 🌐</span>
                </div>
              </div>
              <p className="text-[7px] sm:text-[8px] text-black/85 leading-snug font-sans mt-1 sm:mt-1.5 line-clamp-2 sm:line-clamp-3">
                "The brands winning this decade aren’t shouting louder. They’re articulating what nobody else has the courage to say."
              </p>
              <div className="flex items-center justify-between text-[6px] sm:text-[6.5px] font-mono text-black/60 pt-1 sm:pt-1.5 mt-1 sm:mt-1.5 border-t border-black/5">
                <span className="flex items-center gap-1 font-semibold text-[#1C51E5]">
                  <span>👍 💡</span>
                  <span>1,842</span>
                </span>
                <span>146 comments</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const WhatWeCreateSection: React.FC<WhatWeCreateSectionProps> = ({
  useCaslonFont = true,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Narrative text animation refs
  const narrativeContainerRef = useRef<HTMLDivElement>(null);
  const narrativeP1Ref = useRef<HTMLParagraphElement>(null);
  const narrativeP2Ref = useRef<HTMLParagraphElement>(null);

  // GSAP Text Reveal for Narrative Text (matching StatementSection)
  useGSAP(
    () => {
      const container = narrativeContainerRef.current;
      const p1 = narrativeP1Ref.current;
      const p2 = narrativeP2Ref.current;
      if (!container || !p1 || !p2) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // Function to dynamically split paragraph into lines with overflow:hidden and animated words
      const splitParagraphIntoLinesAndWords = (
        paragraphEl: HTMLParagraphElement,
        text: string
      ) => {
        paragraphEl.innerHTML = '';
        const rawWords = text.split(' ');
        const wordSpans: HTMLSpanElement[] = rawWords.map((word) => {
          const span = document.createElement('span');
          span.className = 'gsap_split_word inline-block relative';
          span.textContent = word;
          return span;
        });

        const fragment = document.createDocumentFragment();
        wordSpans.forEach((span, i) => {
          fragment.appendChild(span);
          if (i < wordSpans.length - 1) {
            fragment.appendChild(document.createTextNode(' '));
          }
        });
        paragraphEl.appendChild(fragment);

        const linesMap: { offsetTop: number; words: HTMLSpanElement[] }[] = [];
        wordSpans.forEach((span) => {
          const top = span.offsetTop;
          let line = linesMap.find((l) => Math.abs(l.offsetTop - top) < 6);
          if (!line) {
            line = { offsetTop: top, words: [] };
            linesMap.push(line);
          }
          line.words.push(span);
        });

        paragraphEl.innerHTML = '';
        const allWords: HTMLSpanElement[] = [];

        linesMap.forEach((line) => {
          const lineDiv = document.createElement('div');
          lineDiv.className =
            'gsap_line_wrapper block overflow-hidden py-[0.1em] -my-[0.1em]';

          line.words.forEach((wordSpan, wIdx) => {
            const cleanWord = document.createElement('span');
            cleanWord.className =
              'gsap_split_word inline-block relative will-change-transform';
            cleanWord.textContent = wordSpan.textContent;
            lineDiv.appendChild(cleanWord);
            allWords.push(cleanWord);

            if (wIdx < line.words.length - 1) {
              lineDiv.appendChild(document.createTextNode(' '));
            }
          });

          paragraphEl.appendChild(lineDiv);
        });

        return allWords;
      };

      const words1 = splitParagraphIntoLinesAndWords(p1, NARRATIVE_PARAGRAPHS[0]);
      const words2 = splitParagraphIntoLinesAndWords(p2, NARRATIVE_PARAGRAPHS[1]);
      const allWords = [...words1, ...words2];

      if (prefersReducedMotion) {
        gsap.set(allWords, { opacity: 1, yPercent: 0 });
        return;
      }

      // Initial state: hidden clipped above/below
      gsap.set(allWords, {
        yPercent: -100,
        opacity: 0,
      });

      // Animate words smoothly in with line-level clipping
      const tween = gsap.to(allWords, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.018,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });

      let resizeTimeout: ReturnType<typeof setTimeout>;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
      };
    },
    { scope: narrativeContainerRef }
  );

  // Mobile interactive state (fixes mobile cards hanging)
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      // Swiped left -> Next card
      setMobileIndex((prev) => (prev < SERVICES_CONFIG.length - 1 ? prev + 1 : 0));
    } else if (diff < -40) {
      // Swiped right -> Prev card
      setMobileIndex((prev) => (prev > 0 ? prev - 1 : SERVICES_CONFIG.length - 1));
    }
    setTouchStartX(null);
  };

  const fontStyle = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 400,
  };

  // GSAP ScrollTrigger timeline: Strictly for Desktop (min-width: 768px) to prevent mobile hanging
  useGSAP(
    () => {
      const cardStage = cardStageRef.current;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const visuals = visualRefs.current.filter(Boolean) as HTMLDivElement[];
      const progressBar = progressBarRef.current;

      if (!cardStage || cards.length < 5) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        cards.forEach((card, i) => {
          const style = DESKTOP_STACK_STYLES[i] || DESKTOP_STACK_STYLES[4];
          gsap.set(card, {
            scale: style.scale,
            y: style.y,
            x: style.x,
            rotation: style.rotation,
            opacity: style.opacity,
            zIndex: style.zIndex,
            transformOrigin: 'center bottom',
          });
        });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop Timeline (>= 768px): Smooth pinned deck
      mm.add('(min-width: 768px)', () => {
        const styles = DESKTOP_STACK_STYLES;
        const scrollDistance = 2400;
        const exitY = -140;
        const exitX = -40;

        if (visuals[0]) gsap.set(visuals[0], { scale: 1.02 });

        // Initialize deck positions according to desktop styles
        cards.forEach((card, i) => {
          const style = styles[i] || styles[4];
          gsap.set(card, {
            scale: style.scale,
            y: style.y,
            x: style.x,
            rotation: style.rotation,
            opacity: style.opacity,
            zIndex: style.zIndex,
            pointerEvents: i === 0 ? 'auto' : 'none',
            transformOrigin: 'center bottom',
          });
        });

        // Main scrubbed deck timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardStage,
            start: 'top 14%',
            end: `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        if (progressBar) {
          tl.to(progressBar, { scaleX: 1, ease: 'none', duration: 4.8 }, 0);
        }

        // DESKTOP HOLD 0: Card 01 rest period (t: 0 to 0.4)
        tl.to({}, { duration: 0.4 }, 0);

        // TRANSITION 1: Card 01 -> Card 02 (t: 0.4 to 1.4)
        tl.to(
          cards[0],
          {
            y: exitY,
            x: exitX,
            rotation: -4,
            scale: 0.92,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(cards[0], { zIndex: 1, pointerEvents: 'none' });
            },
            onReverseComplete: () => {
              gsap.set(cards[0], { zIndex: 10, pointerEvents: 'auto' });
            },
          },
          0.4
        )
          .to(
            cards[1],
            {
              scale: styles[0].scale,
              y: styles[0].y,
              x: styles[0].x,
              rotation: styles[0].rotation,
              opacity: 1,
              zIndex: 10,
              pointerEvents: 'auto',
              duration: 1,
              ease: 'power2.out',
            },
            0.4
          )
          .to(
            cards[2],
            {
              scale: styles[1].scale,
              y: styles[1].y,
              x: styles[1].x,
              rotation: styles[1].rotation,
              opacity: styles[1].opacity,
              zIndex: 9,
              duration: 1,
              ease: 'power2.out',
            },
            0.4
          )
          .to(
            cards[3],
            {
              scale: styles[2].scale,
              y: styles[2].y,
              x: styles[2].x,
              rotation: styles[2].rotation,
              opacity: styles[2].opacity,
              zIndex: 8,
              duration: 1,
              ease: 'power2.out',
            },
            0.4
          )
          .to(
            cards[4],
            {
              scale: styles[3].scale,
              y: styles[3].y,
              x: styles[3].x,
              rotation: styles[3].rotation,
              opacity: styles[3].opacity,
              zIndex: 7,
              duration: 1,
              ease: 'power2.out',
            },
            0.4
          );

        if (visuals[0]) tl.to(visuals[0], { scale: 0.96, duration: 0.6 }, 0.4);
        if (visuals[1]) tl.to(visuals[1], { scale: 1.02, duration: 0.8 }, 0.6);

        // TRANSITION 2: Card 02 -> Card 03 (t: 1.4 to 2.4)
        tl.to(
          cards[1],
          {
            y: exitY,
            x: exitX,
            rotation: -4,
            scale: 0.92,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(cards[1], { zIndex: 2, pointerEvents: 'none' });
            },
            onReverseComplete: () => {
              gsap.set(cards[1], { zIndex: 10, pointerEvents: 'auto' });
            },
          },
          1.4
        )
          .to(
            cards[2],
            {
              scale: styles[0].scale,
              y: styles[0].y,
              x: styles[0].x,
              rotation: styles[0].rotation,
              opacity: 1,
              zIndex: 10,
              pointerEvents: 'auto',
              duration: 1,
              ease: 'power2.out',
            },
            1.4
          )
          .to(
            cards[3],
            {
              scale: styles[1].scale,
              y: styles[1].y,
              x: styles[1].x,
              rotation: styles[1].rotation,
              opacity: styles[1].opacity,
              zIndex: 9,
              duration: 1,
              ease: 'power2.out',
            },
            1.4
          )
          .to(
            cards[4],
            {
              scale: styles[2].scale,
              y: styles[2].y,
              x: styles[2].x,
              rotation: styles[2].rotation,
              opacity: styles[2].opacity,
              zIndex: 8,
              duration: 1,
              ease: 'power2.out',
            },
            1.4
          );

        if (visuals[1]) tl.to(visuals[1], { scale: 0.96, duration: 0.6 }, 1.4);
        if (visuals[2]) tl.to(visuals[2], { scale: 1.02, duration: 0.8 }, 1.6);

        // TRANSITION 3: Card 03 -> Card 04 (t: 2.4 to 3.4)
        tl.to(
          cards[2],
          {
            y: exitY,
            x: exitX,
            rotation: -4,
            scale: 0.92,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(cards[2], { zIndex: 3, pointerEvents: 'none' });
            },
            onReverseComplete: () => {
              gsap.set(cards[2], { zIndex: 10, pointerEvents: 'auto' });
            },
          },
          2.4
        )
          .to(
            cards[3],
            {
              scale: styles[0].scale,
              y: styles[0].y,
              x: styles[0].x,
              rotation: styles[0].rotation,
              opacity: 1,
              zIndex: 10,
              pointerEvents: 'auto',
              duration: 1,
              ease: 'power2.out',
            },
            2.4
          )
          .to(
            cards[4],
            {
              scale: styles[1].scale,
              y: styles[1].y,
              x: styles[1].x,
              rotation: styles[1].rotation,
              opacity: styles[1].opacity,
              zIndex: 9,
              duration: 1,
              ease: 'power2.out',
            },
            2.4
          );

        if (visuals[2]) tl.to(visuals[2], { scale: 0.96, duration: 0.6 }, 2.4);
        if (visuals[3]) tl.to(visuals[3], { scale: 1.02, duration: 0.8 }, 2.6);

        // TRANSITION 4: Card 04 -> Card 05 (t: 3.4 to 4.4)
        tl.to(
          cards[3],
          {
            y: exitY,
            x: exitX,
            rotation: -4,
            scale: 0.92,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(cards[3], { zIndex: 4, pointerEvents: 'none' });
            },
            onReverseComplete: () => {
              gsap.set(cards[3], { zIndex: 10, pointerEvents: 'auto' });
            },
          },
          3.4
        ).to(
          cards[4],
          {
            scale: styles[0].scale,
            y: styles[0].y,
            x: styles[0].x,
            rotation: styles[0].rotation,
            opacity: 1,
            zIndex: 10,
            pointerEvents: 'auto',
            duration: 1,
            ease: 'power2.out',
          },
          3.4
        );

        if (visuals[3]) tl.to(visuals[3], { scale: 0.96, duration: 0.6 }, 3.4);
        if (visuals[4]) tl.to(visuals[4], { scale: 1.02, duration: 0.8 }, 3.6);

        // DESKTOP HOLD 5: Card 05 rest period before unpin (t: 4.4 to 4.8)
        tl.to({}, { duration: 0.4 }, 4.4);
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="What We Create Services"
      className="w-full text-[#111111] relative select-none py-12 sm:py-16 md:py-24 overflow-visible"
    >
      {/* Subtle Editorial Studio Canvas Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply rounded-[30px] overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-14">
          {/* Large Heading */}
          <h2
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
              color: '#ffffff',
            }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.96] tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] mb-4 sm:mb-6"
          >
            What we create<span className="text-[#E0343F]">.</span>
          </h2>

          {/* Supporting Narrative */}
          <div
            ref={narrativeContainerRef}
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
            }}
            className="space-y-3.5 sm:space-y-4 text-sm sm:text-base md:text-[17px] text-[#111111]/85 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto"
          >
            <p ref={narrativeP1Ref}>
              Typeface helps businesses build a stronger presence through thoughtful design, clear strategy, and work that adds real value. We work closely with our clients to understand their goals, find the right direction, and make sure every detail serves a purpose.
            </p>
            <p ref={narrativeP2Ref}>
              From websites and branding to social content and product visuals, we bring ideas to life with a focus on quality, clarity, and results creating work that not only looks good, but genuinely helps your business move forward.
            </p>
          </div>
        </div>

        {/* MOBILE INTERACTIVE CAROUSEL (Mobile only: No pin, zero freeze/hang, touch-swipeable) */}
        <div className="block md:hidden w-full">
          <div
            className="relative w-full max-w-[370px] mx-auto h-[380px] xs:h-[400px] rounded-[22px] overflow-hidden shadow-[0_16px_36px_-10px_rgba(0,0,0,0.16)] touch-pan-x"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {SERVICES_CONFIG.map((service, index) => {
              const isActive = index === mobileIndex;
              return (
                <div
                  key={service.number}
                  className={`absolute inset-0 p-4 xs:p-5 flex flex-col justify-between ${service.bgClass} border ${service.borderClass} rounded-[22px] transition-all duration-300 ${
                    isActive
                      ? 'opacity-100 scale-100 pointer-events-auto z-10'
                      : 'opacity-0 scale-95 pointer-events-none z-0'
                  }`}
                  style={{
                    boxSizing: 'border-box',
                  }}
                >
                  <ServiceCardContent
                    service={service}
                    fontStyle={fontStyle}
                    visualRef={undefined}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile Navigation Controls: Prev / Next & Pill Indicators */}
          <div className="mt-4 flex items-center justify-between max-w-[370px] mx-auto px-2">
            <button
              onClick={() => setMobileIndex((prev) => (prev > 0 ? prev - 1 : SERVICES_CONFIG.length - 1))}
              aria-label="Previous service card"
              className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-[#111111] flex items-center justify-center shadow-xs border border-black/10 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots / Pills */}
            <div className="flex items-center gap-1.5">
              {SERVICES_CONFIG.map((s, idx) => (
                <button
                  key={s.number}
                  onClick={() => setMobileIndex(idx)}
                  aria-label={`Go to ${s.title}`}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    idx === mobileIndex
                      ? 'w-6 bg-[#111111]'
                      : 'w-1.5 bg-black/20 hover:bg-black/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setMobileIndex((prev) => (prev < SERVICES_CONFIG.length - 1 ? prev + 1 : 0))}
              aria-label="Next service card"
              className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-[#111111] flex items-center justify-center shadow-xs border border-black/10 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center mt-2 text-[10.5px] font-manrope text-black/50">
            Swipe or use arrows to view services ({mobileIndex + 1}/5)
          </div>
        </div>

        {/* DESKTOP PINNED DECK (Desktop only: 768px+) */}
        <div className="hidden md:block">
          <div
            ref={cardStageRef}
            className="relative max-w-xl md:max-w-3xl lg:max-w-4xl w-full mx-auto h-[380px] lg:h-[400px] touch-pan-y"
          >
            {SERVICES_CONFIG.map((service, index) => (
              <div
                key={service.number}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`absolute inset-0 rounded-[26px] md:rounded-[30px] p-5 sm:p-6 md:p-7 flex flex-col justify-between ${service.bgClass} border ${service.borderClass} shadow-[0_16px_36px_-10px_rgba(0,0,0,0.16)] will-change-transform select-none`}
                style={{
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  zIndex: 10 - index, // Guarantees Card 01 renders on top immediately upon initial HTML paint
                }}
              >
                <ServiceCardContent
                  service={service}
                  fontStyle={fontStyle}
                  visualRef={(el) => {
                    visualRefs.current[index] = el;
                  }}
                />
              </div>
            ))}
          </div>

          {/* Minimalist Progress Pill Indicator (GPU-driven scaleX) */}
          <div className="w-24 xs:w-28 sm:w-32 h-1 bg-black/10 rounded-full mx-auto mt-6 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#111111] w-full origin-left scale-x-[0.2]"
              style={{ willChange: 'transform' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
