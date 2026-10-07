import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface ClientItem {
  name: string;
  category: string;
  symbol: string;
}

const CLIENTS: ClientItem[] = [
  { name: 'Sphoorthi Interiors', category: 'Luxury Architecture', symbol: '✦' },
  { name: 'Thrill Hikers', category: 'Shopify Outdoor Gear', symbol: '▲' },
  { name: 'Mr. Pottel', category: 'Artisanal Hospitality', symbol: '◆' },
  { name: 'Mantequilla', category: 'Specialty Retail', symbol: '●' },
  { name: 'Kumo Studios', category: 'Motion & Visual Arts', symbol: '✦' },
  { name: 'Veloce Dynamics', category: 'Mobility & Tech', symbol: '▲' },
  { name: 'Prism Digital', category: 'B2B Analytics', symbol: '◆' },
  { name: 'Aether Living', category: 'Modern Furniture', symbol: '●' },
];

export const FeaturedClientsTicker: React.FC = () => {
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

      // Start offset so track can move left-to-right (opposite direction of ServicesTicker)
      gsap.set(track, { x: -singleSetWidth });

      // Smooth horizontal crawl in opposite direction: ~28px/s
      const speed = 28;
      const duration = singleSetWidth / speed;

      const tween = gsap.to(track, {
        x: 0,
        duration: Math.max(duration, 20),
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

  return (
    <section
      ref={containerRef}
      aria-label="Featured Clients"
      className="w-full relative overflow-hidden bg-[#FAFAF9] border-b border-black/10 text-[#111111] py-3 sm:py-3.5 select-none z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Edge fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[#FAFAF9] via-[#FAFAF9]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[#FAFAF9] via-[#FAFAF9]/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div
        ref={trackRef}
        className="flex w-max items-center whitespace-nowrap will-change-transform cursor-grab active:cursor-grabbing"
      >
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {CLIENTS.map((client, index) => (
            <div
              key={`client-1-${index}`}
              className="flex items-center gap-2.5 px-4 sm:px-6 md:px-7 group"
            >
              <span className="text-[10px] text-black/40 group-hover:text-black transition-colors">
                {client.symbol}
              </span>
              <span className="text-xs sm:text-[13px] md:text-sm font-medium tracking-tight text-[#111111]/85 group-hover:text-black transition-colors font-manrope">
                {client.name}
              </span>
              <span className="text-[10px] text-black/40 font-mono tracking-wider hidden xs:inline">
                ({client.category})
              </span>
              <span aria-hidden="true" className="text-black/20 ml-2 text-xs">
                ·
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (Identical duplicate for seamless zero-jump loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {CLIENTS.map((client, index) => (
            <div
              key={`client-2-${index}`}
              className="flex items-center gap-2.5 px-4 sm:px-6 md:px-7 group"
            >
              <span className="text-[10px] text-black/40 group-hover:text-black transition-colors">
                {client.symbol}
              </span>
              <span className="text-xs sm:text-[13px] md:text-sm font-medium tracking-tight text-[#111111]/85 group-hover:text-black transition-colors font-manrope">
                {client.name}
              </span>
              <span className="text-[10px] text-black/40 font-mono tracking-wider hidden xs:inline">
                ({client.category})
              </span>
              <span aria-hidden="true" className="text-black/20 ml-2 text-xs">
                ·
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
