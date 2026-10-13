import React from 'react';
import './OversizedMarqueeSection.css';

const STATEMENT_TEXT = 'LET’S MAKE SOMETHING WORTH WATCHING.';

// 3 repetitions in each half ensure unbroken coverage on screens of any width
const REPETITION_ARRAY = [0, 1, 2];

export const OversizedMarqueeSection: React.FC = () => {
  return (
    <section
      id="statement-marquee"
      aria-label="Editorial Brand Statement"
      className="oversized-marquee-section py-16 sm:py-20 md:py-24 lg:py-28 border-y border-black/[0.08]"
      style={{
        backgroundColor: '#FFF000',
        backgroundImage: `
          radial-gradient(circle at 14% 88%, rgba(85, 220, 255, 0.95) 0%, rgba(105, 230, 255, 0.82) 20%, rgba(195, 248, 80, 0.65) 42%, transparent 68%),
          radial-gradient(circle at 88% 92%, rgba(115, 230, 255, 0.88) 0%, rgba(145, 240, 255, 0.70) 24%, rgba(205, 250, 110, 0.45) 48%, transparent 72%),
          radial-gradient(circle at 24% 65%, rgba(90, 225, 255, 0.82) 0%, rgba(165, 245, 95, 0.55) 30%, transparent 62%),
          radial-gradient(circle at 6% 96%, rgba(185, 175, 255, 0.75) 0%, rgba(120, 215, 255, 0.55) 26%, transparent 58%),
          radial-gradient(circle at 94% 6%, rgba(160, 252, 210, 0.55) 0%, rgba(220, 255, 130, 0.35) 25%, transparent 52%),
          radial-gradient(circle at 55% 38%, #FFF200 0%, #FFE600 48%, #FFDD00 100%)
        `,
      }}
    >
      {/* Accessible semantic heading for screen readers */}
      <h2 className="sr-only">Let’s make something worth watching.</h2>

      {/* Kinetic Typography Container */}
      <div
        aria-hidden="true"
        className="w-full flex flex-col gap-1 sm:gap-2 md:gap-3 pointer-events-none select-none"
      >
        {/* ========================================================================= */}
        {/* ROW 1: GLIDING CONTINUOUSLY TO THE LEFT                                   */}
        {/* ========================================================================= */}
        <div className="oversized-marquee-row">
          <div className="marquee-track-left">
            {/* Primary Track Half */}
            <div className="flex shrink-0 items-center">
              {REPETITION_ARRAY.map((idx) => (
                <span
                  key={`r1-primary-${idx}`}
                  className="oversized-marquee-text"
                >
                  <span className="text-black">{STATEMENT_TEXT}</span>
                  <span className="mx-6 sm:mx-10 md:mx-14 lg:mx-20 text-black/35 font-light">
                    —
                  </span>
                </span>
              ))}
            </div>

            {/* Duplicated Track Half (for seamless 100% gap-free loop) */}
            <div className="flex shrink-0 items-center">
              {REPETITION_ARRAY.map((idx) => (
                <span
                  key={`r1-clone-${idx}`}
                  className="oversized-marquee-text"
                >
                  <span className="text-black">{STATEMENT_TEXT}</span>
                  <span className="mx-6 sm:mx-10 md:mx-14 lg:mx-20 text-black/35 font-light">
                    —
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: GLIDING CONTINUOUSLY TO THE RIGHT (OPPOSING MOVEMENT)              */}
        {/* ========================================================================= */}
        <div className="oversized-marquee-row">
          <div className="marquee-track-right">
            {/* Primary Track Half */}
            <div className="flex shrink-0 items-center">
              {REPETITION_ARRAY.map((idx) => (
                <span
                  key={`r2-primary-${idx}`}
                  className="oversized-marquee-text"
                >
                  <span className="text-black">{STATEMENT_TEXT}</span>
                  <span className="mx-6 sm:mx-10 md:mx-14 lg:mx-20 text-black/35 font-light">
                    —
                  </span>
                </span>
              ))}
            </div>

            {/* Duplicated Track Half (for seamless 100% gap-free loop) */}
            <div className="flex shrink-0 items-center">
              {REPETITION_ARRAY.map((idx) => (
                <span
                  key={`r2-clone-${idx}`}
                  className="oversized-marquee-text"
                >
                  <span className="text-black">{STATEMENT_TEXT}</span>
                  <span className="mx-6 sm:mx-10 md:mx-14 lg:mx-20 text-black/35 font-light">
                    —
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
