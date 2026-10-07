import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import high-resolution editorial portrait assets matching the reference
import dogWalkerImg from '../assets/images/dog_walker_testimonial_1791036913291.jpg';
import manGlassesImg from '../assets/images/man_glasses_portrait_1791036930295.jpg';
import kittensImg from '../assets/images/kittens_fluffy_cozy_1791036946467.jpg';
import womanPortraitImg from '../assets/images/brunette_woman_portrait_1791036961013.jpg';
import womanSunhatImg from '../assets/images/woman_sunhat_dog_1791037080705.jpg';

gsap.registerPlugin(ScrollTrigger);

export interface TestimonialData {
  headline?: string;
  quote?: string;
  authorName?: string;
  authorRole?: string;
  brandName?: string;
  brandTagline?: string;
  mainImage?: string;
  surroundingImages?: {
    leftOuter: string;
    leftInner: string;
    rightInner: string;
    rightOuter: string;
  };
}

interface TestimonialSectionProps {
  data?: TestimonialData;
  className?: string;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  data,
  className = '',
}) => {
  // Content values defaulting to the reference image specification
  const headline = data?.headline || '80% reduction in\nbooking-related\nemails';
  const quote =
    data?.quote ||
    '“We care deeply about the experience they have with us — and Calendly helps us start it off right.”';
  const authorName = data?.authorName || 'Akira Bradley';
  const authorRole =
    data?.authorRole || 'Co-Founder at Barking with the Bradley’s';
  const brandName = data?.brandName || 'Barking with the Bradley’s';
  const brandTagline =
    data?.brandTagline || 'Where every pup is treated like King';

  const images = {
    main: data?.mainImage || dogWalkerImg,
    leftOuter: data?.surroundingImages?.leftOuter || womanPortraitImg,
    leftInner: data?.surroundingImages?.leftInner || manGlassesImg,
    rightInner: data?.surroundingImages?.rightInner || kittensImg,
    rightOuter: data?.surroundingImages?.rightOuter || womanSunhatImg,
  };

  // Animation DOM refs
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const cardLeftOuterRef = useRef<HTMLDivElement>(null);
  const cardLeftInnerRef = useRef<HTMLDivElement>(null);
  const cardRightInnerRef = useRef<HTMLDivElement>(null);
  const cardRightOuterRef = useRef<HTMLDivElement>(null);

  // Connector lines refs
  const connector1Ref = useRef<HTMLDivElement>(null);
  const connector2Ref = useRef<HTMLDivElement>(null);
  const connector3Ref = useRef<HTMLDivElement>(null);
  const connector4Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const mainCard = mainCardRef.current;
    const cardLO = cardLeftOuterRef.current;
    const cardLI = cardLeftInnerRef.current;
    const cardRI = cardRightInnerRef.current;
    const cardRO = cardRightOuterRef.current;

    if (!section || !stage || !mainCard) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(mainCard, {
        opacity: 0,
        y: 50,
        scale: 0.96,
      });

      const surroundingCards = [cardLO, cardLI, cardRI, cardRO].filter(Boolean);
      const connectors = [
        connector1Ref.current,
        connector2Ref.current,
        connector3Ref.current,
        connector4Ref.current,
      ].filter(Boolean);

      if (surroundingCards.length > 0) {
        gsap.set(surroundingCards, {
          opacity: 0,
          scale: 0.85,
        });
      }

      if (connectors.length > 0) {
        gsap.set(connectors, {
          opacity: 0,
          scaleX: 0,
          transformOrigin: 'center center',
        });
      }

      // 2. Entrance Reveal Timeline triggered on scroll
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      entranceTl
        .to(mainCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
        })
        .to(
          surroundingCards,
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'back.out(1.15)',
          },
          '-=0.8'
        )
        .to(
          connectors,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.7'
        );

      // If user requested reduced motion, stop here
      if (prefersReducedMotion) return;

      // 3. Subtle Ambient Floating Motions (independent sinusoidal drifts)
      if (cardLO) {
        gsap.to(cardLO, {
          y: '+=12',
          duration: 5.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.2,
        });
      }

      if (cardLI) {
        gsap.to(cardLI, {
          y: '-=10',
          duration: 4.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }

      if (cardRI) {
        gsap.to(cardRI, {
          y: '+=10',
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.3,
        });
      }

      if (cardRO) {
        gsap.to(cardRO, {
          y: '-=12',
          duration: 5.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.7,
        });
      }

      // 4. Scroll Parallax (Scrubbed Depth)
      gsap.to([cardLO, cardRO].filter(Boolean), {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to([cardLI, cardRI].filter(Boolean), {
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.0,
        },
      });

      gsap.to(mainCard, {
        y: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // 5. Desktop-only Interactive Mouse Parallax using gsap.quickTo
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (isDesktop && cardLO && cardLI && cardRI && cardRO) {
        const quickX_LO = gsap.quickTo(cardLO, 'x', { duration: 0.8, ease: 'power2.out' });
        const quickY_LO = gsap.quickTo(cardLO, 'y', { duration: 0.8, ease: 'power2.out' });

        const quickX_LI = gsap.quickTo(cardLI, 'x', { duration: 0.7, ease: 'power2.out' });
        const quickY_LI = gsap.quickTo(cardLI, 'y', { duration: 0.7, ease: 'power2.out' });

        const quickX_RI = gsap.quickTo(cardRI, 'x', { duration: 0.7, ease: 'power2.out' });
        const quickY_RI = gsap.quickTo(cardRI, 'y', { duration: 0.7, ease: 'power2.out' });

        const quickX_RO = gsap.quickTo(cardRO, 'x', { duration: 0.8, ease: 'power2.out' });
        const quickY_RO = gsap.quickTo(cardRO, 'y', { duration: 0.8, ease: 'power2.out' });

        const quickX_Main = gsap.quickTo(mainCard, 'x', { duration: 0.9, ease: 'power2.out' });
        const quickY_Main = gsap.quickTo(mainCard, 'y', { duration: 0.9, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const normX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
          const normY = (e.clientY - rect.top) / rect.height - 0.5;

          quickX_LO(normX * -24);
          quickY_LO(normY * -16);

          quickX_LI(normX * -14);
          quickY_LI(normY * -10);

          quickX_RI(normX * 14);
          quickY_RI(normY * 10);

          quickX_RO(normX * 24);
          quickY_RO(normY * 16);

          quickX_Main(normX * 4);
          quickY_Main(normY * 4);
        };

        const handleMouseLeave = () => {
          quickX_LO(0);
          quickY_LO(0);
          quickX_LI(0);
          quickY_LI(0);
          quickX_RI(0);
          quickY_RI(0);
          quickX_RO(0);
          quickY_RO(0);
          quickX_Main(0);
          quickY_Main(0);
        };

        section.addEventListener('mousemove', handleMouseMove);
        section.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          section.removeEventListener('mousemove', handleMouseMove);
          section.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Client Testimonial Showcase"
      className={`w-full relative overflow-hidden select-none py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 font-sans ${className}`}
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <div
        ref={stageRef}
        className="max-w-[1440px] mx-auto relative flex items-center justify-center min-h-[580px] sm:min-h-[620px] lg:min-h-[660px]"
      >
        {/* =========================================================
            SURROUNDING CARDS & HORIZONTAL CONNECTORS (DESKTOP/TABLET)
            ========================================================= */}

        {/* 1. LEFT OUTER PORTRAIT CARD (Narrow & Shorter) */}
        <div
          ref={cardLeftOuterRef}
          aria-hidden="true"
          className="hidden xl:flex absolute left-4 2xl:left-10 z-[2] flex-col items-center justify-center will-change-transform pointer-events-none"
        >
          <div
            className="w-[86px] h-[230px] rounded-[30px] bg-white p-[14px] shadow-[0_16px_36px_-10px_rgba(20,20,50,0.12),0_4px_12px_-2px_rgba(0,0,0,0.04)] border border-black/[0.03] overflow-hidden"
          >
            <img
              src={images.leftOuter}
              alt=""
              className="w-full h-full object-cover rounded-[18px]"
              loading="lazy"
            />
          </div>
        </div>

        {/* CONNECTOR 1: Left Outer to Left Inner */}
        <div
          ref={connector1Ref}
          aria-hidden="true"
          className="hidden xl:block absolute left-[96px] 2xl:left-[132px] w-[50px] 2xl:w-[70px] h-[4px] bg-white/90 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.06)] z-[1] pointer-events-none"
        >
          <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white shadow-xs" />
          <span className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white shadow-xs" />
        </div>

        {/* 2. LEFT INNER PORTRAIT CARD (Taller, sits slightly behind main card edge) */}
        <div
          ref={cardLeftInnerRef}
          aria-hidden="true"
          className="hidden lg:flex absolute left-[56px] xl:left-[148px] 2xl:left-[204px] z-[3] flex-col items-center justify-center will-change-transform pointer-events-none"
        >
          <div
            className="w-[118px] xl:w-[126px] h-[340px] xl:h-[370px] rounded-[34px] bg-white p-[16px] shadow-[0_20px_42px_-12px_rgba(20,20,50,0.14),0_6px_14px_-2px_rgba(0,0,0,0.05)] border border-black/[0.03] overflow-hidden"
          >
            <img
              src={images.leftInner}
              alt=""
              className="w-full h-full object-cover rounded-[20px]"
              loading="lazy"
            />
          </div>
        </div>

        {/* CONNECTOR 2: Left Inner to Main Card */}
        <div
          ref={connector2Ref}
          aria-hidden="true"
          className="hidden lg:block absolute left-[170px] xl:left-[268px] 2xl:left-[324px] w-[36px] xl:w-[48px] h-[4px] bg-white/90 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.06)] z-[1] pointer-events-none"
        >
          <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white shadow-xs" />
          <span className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white shadow-xs" />
        </div>

        {/* =========================================================
            CENTRAL TESTIMONIAL CARD (HERO / DOMINANT COMPONENT)
            ========================================================= */}
        <div
          ref={mainCardRef}
          className="w-[calc(100%-24px)] sm:w-[calc(100%-32px)] lg:w-full max-w-[940px] bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[42px] shadow-[0_25px_70px_-15px_rgba(20,15,45,0.09),0_10px_25px_-5px_rgba(0,0,0,0.03)] border border-black/[0.04] relative z-[5] p-5 xs:p-7 sm:p-9 md:p-11 lg:p-12 transition-shadow will-change-transform"
        >
          {/* Mobile-only Subtle Floating Decorative Portraits (Inside Viewport, No Overflow) */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute -top-5 right-4 z-[7] w-[62px] h-[84px] rounded-[20px] bg-white p-[8px] shadow-[0_12px_24px_-6px_rgba(20,20,50,0.15)] border border-black/[0.04] overflow-hidden pointer-events-none rotate-3"
          >
            <img
              src={images.rightInner}
              alt=""
              className="w-full h-full object-cover rounded-[12px]"
              loading="lazy"
            />
          </div>

          <div
            aria-hidden="true"
            className="lg:hidden absolute -bottom-5 left-4 z-[7] w-[58px] h-[80px] rounded-[18px] bg-white p-[8px] shadow-[0_12px_24px_-6px_rgba(20,20,50,0.15)] border border-black/[0.04] overflow-hidden pointer-events-none -rotate-3"
          >
            <img
              src={images.leftOuter}
              alt=""
              className="w-full h-full object-cover rounded-[10px]"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-9 lg:gap-8 items-stretch">
            {/* -----------------------------------------------------
                LEFT COLUMN (~48% width): Headline, Quote, Metadata Pills
                ----------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between pr-0 lg:pr-3 xl:pr-6">
              {/* TOP: Result Headline */}
              <div>
                <h3
                  className="font-manrope text-[27px] xs:text-[33px] sm:text-[40px] md:text-[46px] lg:text-[48px] font-semibold text-[#0F172A] tracking-[-0.03em] leading-[1.02] m-0"
                  style={{
                    fontFamily:
                      "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                >
                  {headline.split('\n').map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
              </div>

              {/* MIDDLE: Quotation with substantial breathing space */}
              <div className="my-6 xs:my-7 sm:my-9 lg:my-8">
                <blockquote
                  className="text-[19px] xs:text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] text-[#1E293B] leading-[1.14] font-normal tracking-[-0.015em] m-0"
                  style={{
                    fontFamily:
                      "'Libre Caslon Text', Georgia, 'Times New Roman', serif",
                  }}
                >
                  {quote}
                </blockquote>
              </div>

              {/* BOTTOM: Rounded Metadata Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-manrope">
                <span className="inline-flex items-center px-3 sm:px-3.5 py-1.5 rounded-[8px] bg-[#F1F3F5] text-[#344054] text-[12px] sm:text-[13px] font-medium tracking-tight whitespace-nowrap">
                  {authorName}
                </span>
                <span className="inline-flex items-center px-3 sm:px-3.5 py-1.5 rounded-[8px] bg-[#F1F3F5] text-[#475467] text-[11.5px] sm:text-[12.5px] font-normal tracking-tight whitespace-nowrap">
                  {authorRole}
                </span>
              </div>
            </div>

            {/* -----------------------------------------------------
                RIGHT COLUMN (~52% width): Large Photographic Portrait
                ----------------------------------------------------- */}
            <div className="lg:col-span-6 relative flex flex-col justify-end mt-4 lg:mt-0">
              <div className="relative w-full h-[280px] xs:h-[340px] sm:h-[420px] md:h-[460px] lg:h-[500px] xl:h-[520px] rounded-[22px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden shadow-sm group">
                <img
                  src={images.main}
                  alt={brandName}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle dark gradient overlay at bottom for maximum legibility */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.42) 24%, rgba(0, 0, 0, 0.08) 45%, transparent 70%)',
                  }}
                />

                {/* Integrated bottom brand typography */}
                <div className="absolute bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-7 left-4 xs:left-5 sm:left-6 md:left-7 right-4 xs:right-5 sm:right-6 md:right-7 text-white select-none">
                  {/* Brand Name Title */}
                  <div className="flex items-center gap-2">
                    <h4
                      className="text-[19px] xs:text-[22px] sm:text-[25px] md:text-[28px] font-bold tracking-tight text-white m-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                      style={{
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      {brandName}
                    </h4>
                    {/* Subtle crown icon motif matching logo badge */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-white/95 drop-shadow-sm shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                    </svg>
                  </div>

                  {/* Brand Tagline */}
                  <p
                    className="mt-0.5 sm:mt-1 text-[11.5px] xs:text-[12.5px] sm:text-[14px] text-white/90 font-medium tracking-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] m-0"
                    style={{
                      fontFamily:
                        "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    {brandTagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTOR 3: Main Card to Right Inner */}
        <div
          ref={connector3Ref}
          aria-hidden="true"
          className="hidden lg:block absolute right-[170px] xl:right-[268px] 2xl:right-[324px] w-[36px] xl:w-[48px] h-[4px] bg-white/90 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.06)] z-[1] pointer-events-none"
        >
          <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white shadow-xs" />
          <span className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white shadow-xs" />
        </div>

        {/* 3. RIGHT INNER PORTRAIT CARD (Taller, sits slightly behind main card edge) */}
        <div
          ref={cardRightInnerRef}
          aria-hidden="true"
          className="hidden lg:flex absolute right-[56px] xl:right-[148px] 2xl:right-[204px] z-[3] flex-col items-center justify-center will-change-transform pointer-events-none"
        >
          <div
            className="w-[118px] xl:w-[126px] h-[340px] xl:h-[370px] rounded-[34px] bg-white p-[16px] shadow-[0_20px_42px_-12px_rgba(20,20,50,0.14),0_6px_14px_-2px_rgba(0,0,0,0.05)] border border-black/[0.03] overflow-hidden"
          >
            <img
              src={images.rightInner}
              alt=""
              className="w-full h-full object-cover rounded-[20px]"
              loading="lazy"
            />
          </div>
        </div>

        {/* CONNECTOR 4: Right Inner to Right Outer */}
        <div
          ref={connector4Ref}
          aria-hidden="true"
          className="hidden xl:block absolute right-[96px] 2xl:right-[132px] w-[50px] 2xl:w-[70px] h-[4px] bg-white/90 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.06)] z-[1] pointer-events-none"
        >
          <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white shadow-xs" />
          <span className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-white shadow-xs" />
        </div>

        {/* 4. RIGHT OUTER PORTRAIT CARD (Narrow & Shorter) */}
        <div
          ref={cardRightOuterRef}
          aria-hidden="true"
          className="hidden xl:flex absolute right-4 2xl:right-10 z-[2] flex-col items-center justify-center will-change-transform pointer-events-none"
        >
          <div
            className="w-[86px] h-[230px] rounded-[30px] bg-white p-[14px] shadow-[0_16px_36px_-10px_rgba(20,20,50,0.12),0_4px_12px_-2px_rgba(0,0,0,0.04)] border border-black/[0.03] overflow-hidden"
          >
            <img
              src={images.rightOuter}
              alt=""
              className="w-full h-full object-cover rounded-[18px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
