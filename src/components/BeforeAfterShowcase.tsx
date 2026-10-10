import React, { useState, useRef, useCallback } from 'react';

export const BeforeAfterShowcase: React.FC = () => {
  // Slider position as a percentage from 0 to 100 (defaults to 50%)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate and update slider position based on pointer X coordinate
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Pointer capture might already be released
    }
  };

  return (
    <section
      id="before-after"
      aria-label="Website Redesign Comparison"
      className="w-full bg-white text-[#111111] py-24 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 select-none border-b border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading & Supporting Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2
              style={{
                fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: '-0.03em',
              }}
              className="text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight leading-tight uppercase mb-4"
            >
              BEFORE / AFTER
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black/60 font-light leading-relaxed">
              A clearer digital experience, designed for the way students explore.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-black/40">
            <span>DRAG SLIDER TO COMPARE</span>
          </div>
        </div>

        {/* Draggable Comparison Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] cursor-ew-resize select-none touch-none bg-neutral-900"
          style={{
            touchAction: 'none',
          }}
        >
          {/* UNDERNEATH: BEFORE IMAGE */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/images/sru-before.webp"
              alt="SR University Website - Before Redesign"
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              draggable={false}
              loading="lazy"
            />
            {/* BEFORE Label on the old website side */}
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
              <span className="px-3 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-widest uppercase bg-black/75 backdrop-blur-md text-white border border-white/10 shadow-sm">
                BEFORE
              </span>
            </div>
          </div>

          {/* OVERLAY: AFTER IMAGE (clipped dynamically based on slider position) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
            style={{
              clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
            }}
          >
            <img
              src="/images/sru-after.webp"
              alt="SR University Website - After Redesign"
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              draggable={false}
              loading="lazy"
            />
            {/* AFTER Label on the redesigned website side */}
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
              <span className="px-3 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-widest uppercase bg-white/90 backdrop-blur-md text-black border border-black/10 shadow-sm">
                AFTER
              </span>
            </div>
          </div>

          {/* VERTICAL DIVIDER LINE & SUBTLE HANDLE */}
          <div
            className="absolute top-0 bottom-0 z-20 pointer-events-none will-change-[left]"
            style={{
              left: `${sliderPosition}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Slim line */}
            <div className="w-[1.5px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] mx-auto" />

            {/* Subtle center handle with large invisible touch target */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              {/* Large touch area for mobile finger grab */}
              <div className="w-14 h-14 -m-7 pointer-events-none flex items-center justify-center">
                {/* Minimal elegant round handle */}
                <div className="w-8 h-8 rounded-full bg-white text-black shadow-lg flex items-center justify-center border border-black/10 transition-transform duration-150 active:scale-95">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-75"
                  >
                    <polyline points="15 18 9 12 15 6" />
                    <polyline points="9 18 3 12 9 6" />
                  </svg>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-75"
                  >
                    <polyline points="9 18 15 12 9 6" />
                    <polyline points="15 18 21 12 15 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
