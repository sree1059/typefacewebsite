import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const words = container.querySelectorAll('.reveal-word-inner');
      if (!words.length) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(words, { y: '0%', opacity: 1 });
        return;
      }

      gsap.fromTo(
        words,
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: containerRef, dependencies: [text] }
  );

  return (
    <span ref={containerRef} className={`inline ${className}`}>
      {text.split(' ').map((word, index) => (
        <span
          className="reveal-word inline-block overflow-hidden align-bottom pb-[0.08em]"
          key={index}
        >
          <span
            className="reveal-word-inner inline-block will-change-[transform,opacity]"
            aria-hidden="true"
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}
