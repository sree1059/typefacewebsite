import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const SERVICES = [
  'High-Performance Websites',
  'Custom Web Applications',
  'Shopify & E-Commerce Engineering',
  'Digital Experiences',
  'Full-Stack Architecture',
  'UI/UX & Design Systems',
  'API & Cloud Integrations',
  'Performance Optimization',
];

export const ServicesTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const totalWidth = track.scrollWidth;
      const singleSetWidth = totalWidth / 2;

      gsap.set(track, { x: 0 });

      const speed = 32; // pixels per second
      const duration = singleSetWidth / speed;

      const tween = gsap.to(track, {
        x: -singleSetWidth,
        duration: Math.max(duration, 25),
        ease: 'none',
        repeat: -1,
      });

      tweenRef.current = tween;

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef }
  );

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      tweenRef.current.play();
    }
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 300,
  };

  return (
    <section
      ref={containerRef}
      aria-label="Services Ticker"
      className="w-full relative overflow-hidden bg-white border-y border-black/10 text-[#111111] py-5 sm:py-6 md:py-7 select-none shadow-xs z-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Edge fade overlays blending seamlessly into white */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track animated via GSAP */}
      <div
        ref={trackRef}
        className="flex w-max items-center whitespace-nowrap will-change-transform cursor-grab active:cursor-grabbing"
      >
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {SERVICES.map((service, index) => (
            <React.Fragment key={`set-1-${index}`}>
              <span
                className="text-[15px] sm:text-[17px] md:text-[19px] tracking-[0.02em] text-[#111111]/90 hover:text-black transition-colors duration-200 px-5 sm:px-6 md:px-8 font-light"
                style={textStyle}
              >
                {service}
              </span>
              <span
                aria-hidden="true"
                className="text-[#E0343F] text-[10px] md:text-[11px] leading-none select-none inline-flex items-center justify-center opacity-85"
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Set 2 (Identical duplicate for seamless zero-jump loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {SERVICES.map((service, index) => (
            <React.Fragment key={`set-2-${index}`}>
              <span
                className="text-[15px] sm:text-[17px] md:text-[19px] tracking-[0.02em] text-[#111111]/90 hover:text-black transition-colors duration-200 px-5 sm:px-6 md:px-8 font-light"
                style={textStyle}
              >
                {service}
              </span>
              <span
                aria-hidden="true"
                className="text-[#E0343F] text-[10px] md:text-[11px] leading-none select-none inline-flex items-center justify-center opacity-85"
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
