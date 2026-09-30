import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Statement: “We build digital experiences that help brands and growing businesses stand out, connect, and grow.”
const STATEMENT_TEXT =
  'We build digital experiences that help brands and growing businesses stand out, connect, and grow.';

interface StatementSectionProps {
  useCaslonFont?: boolean;
}

export const StatementSection: React.FC<StatementSectionProps> = ({
  useCaslonFont = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const textElement = textContainerRef.current;
      if (!container || !textElement) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // Function to dynamically split text into lines and words:
      // Line wrappers have overflow: hidden (line-level clipping container)
      // Words are display: inline-block with normal line wrapping and zero mid-letter slicing
      const splitIntoLinesAndWords = () => {
        // Clear and rebuild raw words first to measure natural wrapping
        textElement.innerHTML = '';

        const rawWords = STATEMENT_TEXT.split(' ');
        const wordSpans: HTMLSpanElement[] = rawWords.map((word) => {
          const span = document.createElement('span');
          span.className = 'gsap_split_word inline-block relative';
          span.textContent = word;
          return span;
        });

        // Temporarily append all words with spaces to measure their natural line offsets (offsetTop)
        const fragment = document.createDocumentFragment();
        wordSpans.forEach((span, i) => {
          fragment.appendChild(span);
          if (i < wordSpans.length - 1) {
            fragment.appendChild(document.createTextNode(' '));
          }
        });
        textElement.appendChild(fragment);

        // Group words by their line position (offsetTop)
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

        // Reconstruct into clean line containers with overflow: hidden on the line
        textElement.innerHTML = '';
        const finalLines: HTMLDivElement[] = [];
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

          textElement.appendChild(lineDiv);
          finalLines.push(lineDiv);
        });

        return allWords;
      };

      const words = splitIntoLinesAndWords();

      if (prefersReducedMotion) {
        gsap.set(words, { opacity: 1, yPercent: 0 });
        return;
      }

      // Initial state:
      // { yPercent: -100, opacity: 0 }
      gsap.set(words, {
        yPercent: -100,
        opacity: 0,
      });

      // Animate each word to { yPercent: 0, opacity: 1 }
      // duration: 0.8, stagger: 0.05, ease: 'power4.out'
      const tween = gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          once: true,
        },
      });

      // Handle window resize cleanly so lines wrap accurately
      let resizeTimeout: ReturnType<typeof setTimeout>;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // If already triggered or during trigger, refresh split if needed
          ScrollTrigger.refresh();
        }, 200);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        tween.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Brand Statement"
      className="w-full text-[#111111] py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 relative select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Statement text container */}
        <h2
          ref={textContainerRef}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.28] sm:leading-[1.24] tracking-tight text-[#111111] no-copy"
          style={{
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 300,
          }}
        >
          {STATEMENT_TEXT}
        </h2>
      </div>
    </section>
  );
};
