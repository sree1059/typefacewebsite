import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent layout recalculation jumps on mobile browser address bar collapse/expand
ScrollTrigger.config({ ignoreMobileResize: true });

interface UseLenisOptions {
  lerp?: number;
  wheelMultiplier?: number;
}

export function useLenis({ lerp = 0.08, wheelMultiplier = 1 }: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [currentLerp, setCurrentLerp] = useState<number>(lerp);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Sync state if prop changes
  useEffect(() => {
    setCurrentLerp(lerp);
  }, [lerp]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkMotion = () => {
      setReducedMotion(mediaQuery.matches);
    };
    checkMotion();
    mediaQuery.addEventListener('change', checkMotion);

    if (mediaQuery.matches) {
      // If user prefers reduced motion, do not initialize smooth scroll
      return () => {
        mediaQuery.removeEventListener('change', checkMotion);
      };
    }

    // Initialize Lenis for main page scroll only with user's requested configuration
    const lenis = new Lenis({
      lerp: currentLerp,
      smoothWheel: true,
      wheelMultiplier: wheelMultiplier, // Strictly maintained at 1
      anchors: true,
      autoResize: true,
      // touchMultiplier is default, touch is not hijacked to preserve 100% native mobile scrolling
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize Lenis with GSAP's unified ticker to prevent RAF race conditions on mobile
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
      (window as any).__lenis = null;
      mediaQuery.removeEventListener('change', checkMotion);
    };
  }, [currentLerp, wheelMultiplier]);

  const scrollTo = (target: string | HTMLElement, offset: number = 0) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return {
    lenis: lenisRef.current,
    currentLerp,
    setLerp: setCurrentLerp,
    reducedMotion,
    scrollTo,
  };
}
