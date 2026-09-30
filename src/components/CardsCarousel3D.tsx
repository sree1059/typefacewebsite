import React, { useState } from 'react';
import {
  Star,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Target,
  BarChart3,
  Sliders,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface CardsCarousel3DProps {
  headingFontSize?: number;
  useCaslonFont?: boolean;
}

export const CardsCarousel3D: React.FC<CardsCarousel3DProps> = ({
  headingFontSize = 20,
  useCaslonFont = true,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(4); // Center on card 5 by default
  const [isHovered, setIsHovered] = useState(false);

  const fontStyle = {
    fontFamily: useCaslonFont
      ? "'Libre Caslon Condensed', 'Libre Caslon Display', Arial, sans-serif"
      : 'Arial, sans-serif',
  };

  // The 10 cards reflecting the curved 3D showcase from the reference image
  const cards = [
    {
      id: 'c1',
      type: 'tilted-preview-left',
      content: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-zinc-900/90 border border-white/20 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/70 uppercase tracking-wider">Metrics</span>
            <span className="text-[10px] text-emerald-400 font-mono">+18.4%</span>
          </div>
          <div className="space-y-2 my-auto">
            <div className="h-1.5 w-3/4 bg-white/40 rounded-full" />
            <div className="h-1.5 w-1/2 bg-white/20 rounded-full" />
            <div className="h-1.5 w-2/3 bg-white/30 rounded-full" />
          </div>
          <div className="text-[11px] text-white font-medium">Real-time Stream</div>
        </div>
      ),
    },
    {
      id: 'c2',
      type: 'bar-chart',
      content: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl">
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">
              Intelligence in
            </p>
            <p className="text-xs text-white font-bold leading-tight">Every Decision</p>
          </div>
          {/* Vertical Bar Chart */}
          <div className="flex items-end justify-between gap-1.5 h-20 pt-3 px-1 border-b border-white/10">
            <div className="w-3 bg-white/30 rounded-t h-[35%]" />
            <div className="w-3 bg-white/40 rounded-t h-[50%]" />
            <div className="w-3 bg-white/60 rounded-t h-[70%]" />
            <div className="w-3 bg-white/80 rounded-t h-[85%]" />
            <div className="w-3 bg-white rounded-t h-[100%]" />
          </div>
          <div className="flex justify-between text-[9px] text-white/60 pt-1">
            <span>Q1</span>
            <span>Q2</span>
            <span>Q3</span>
            <span>Q4</span>
          </div>
        </div>
      ),
    },
    {
      id: 'c3',
      type: 'pricing-list',
      content: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl">
          <div className="border-b border-white/10 pb-2">
            <div className="text-sm font-bold text-white tracking-tight flex items-baseline gap-1">
              <span>$4,900</span>
              <span className="text-xs text-white/40 font-normal">/ $6,100</span>
            </div>
          </div>
          <div className="space-y-2 py-2 text-[11px]">
            <div className="flex justify-between items-center text-white/80">
              <span className="truncate pr-2">Automation Suite</span>
              <span className="font-semibold text-white">$100</span>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span className="truncate pr-2">Data Engine</span>
              <span className="font-semibold text-white">$80</span>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span className="truncate pr-2">API Cloud Sync</span>
              <span className="font-semibold text-white">$20</span>
            </div>
          </div>
          <div className="w-full py-1 text-center bg-white/10 rounded-lg text-[10px] text-white font-medium">
            Active Tier
          </div>
        </div>
      ),
    },
    {
      id: 'c4',
      type: 'person-metrics',
      content: (
        <div className="w-full h-full relative overflow-hidden bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col">
          {/* Avatar image representation */}
          <div className="relative w-full h-28 overflow-hidden bg-emerald-950/40">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
              alt="Consultant Leader"
              className="w-full h-full object-cover object-top filter contrast-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          </div>
          {/* Floating Pill Badges */}
          <div className="p-3.5 flex-1 flex flex-col justify-between">
            <div className="text-[10px] text-white/70 uppercase font-medium">Growth Impact</div>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-white text-black text-xs font-bold shadow">
                $2,670
              </span>
              <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-white/30 text-white text-xs font-semibold">
                $1,200
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'c5',
      type: 'line-chart-center',
      content: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-zinc-900/95 border-2 border-white/40 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/30">
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">
              Intelligence in
            </p>
            <p
              style={fontStyle}
              className="text-base text-white font-bold leading-tight"
            >
              Every Decision
            </p>
          </div>
          {/* Smooth upward line chart */}
          <div className="relative h-24 w-full flex items-end">
            <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 5 65 Q 40 60 70 45 T 120 25 T 155 10 L 155 75 L 5 75 Z"
                fill="url(#curveGradient)"
              />
              <path
                d="M 5 65 Q 40 60 70 45 T 120 25 T 155 10"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="155" cy="10" r="4" fill="#ffffff" />
            </svg>
          </div>
          <div className="flex justify-between items-center text-[10px] text-white/60 border-t border-white/10 pt-1.5">
            <span>Accuracy Rate</span>
            <span className="text-white font-bold font-mono">99.4%</span>
          </div>
        </div>
      ),
    },
    {
      id: 'c6',
      type: 'expertise-badge',
      content: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-black border border-white/30 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
            </div>
            <span className="text-[10px] text-white/80 uppercase tracking-wider font-semibold">
              Strategic Focus
            </span>
          </div>
          <p
            style={fontStyle}
            className="text-sm text-white font-bold leading-snug py-2"
          >
            Expertise <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 mx-0.5 align-middle" /> that Combines Strategy, Data, and Artificial Intelligence
          </p>
          <div className="flex items-center gap-1 text-[10px] text-white/60">
            <CheckCircle2 className="w-3 h-3 text-white" />
            <span>End-to-end alignment</span>
          </div>
        </div>
      ),
    },
    {
      id: 'c7',
      type: 'data-training',
      content: (
        <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/20 rounded-2xl shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mb-3">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <h4
            style={fontStyle}
            className="text-sm font-bold text-white mb-1"
          >
            Data training
          </h4>
          <p className="text-[11px] text-white/70 max-w-[120px] leading-relaxed">
            Upload your dataset
          </p>
          <div className="mt-3 px-3 py-1 rounded-full bg-white text-black text-[10px] font-semibold">
            Process Now
          </div>
        </div>
      ),
    },
    {
      id: 'c8',
      type: 'datapoints-tabs',
      content: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl">
          {/* Mini tabs */}
          <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-[9px]">
            <span className="px-1.5 py-0.5 rounded bg-white text-black font-semibold">
              Social
            </span>
            <span className="px-1.5 py-0.5 text-white/60">
              Strategic
            </span>
            <span className="px-1.5 py-0.5 text-white/60">
              Growth
            </span>
          </div>
          <div className="my-auto py-2">
            <div className="text-[10px] text-white/70 uppercase tracking-wider">
              Data Points
            </div>
            <div
              style={fontStyle}
              className="text-2xl font-bold text-white tracking-tight"
            >
              520k+
            </div>
          </div>
          <div className="text-[9px] text-white/60 border-t border-white/10 pt-1">
            Real-time multi-source ingest
          </div>
        </div>
      ),
    },
    {
      id: 'c9',
      type: 'mobile-preview',
      content: (
        <div className="w-full h-full p-3.5 flex flex-col justify-between bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <span className="text-[9px] text-white/70">Efficiency Index</span>
            <span className="text-xs font-bold text-white font-mono">49%</span>
          </div>
          <div className="space-y-1.5 my-2">
            <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 flex justify-between items-center text-[9px]">
              <span className="text-white/80">Workflow A</span>
              <span className="text-emerald-400 font-bold">+34%</span>
            </div>
            <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 flex justify-between items-center text-[9px]">
              <span className="text-white/80">Workflow B</span>
              <span className="text-white font-bold">+15%</span>
            </div>
          </div>
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="w-[49%] h-full bg-white" />
          </div>
        </div>
      ),
    },
    {
      id: 'c10',
      type: 'tilted-preview-right',
      content: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-zinc-900/90 border border-white/20 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/70 uppercase tracking-wider">Pipeline</span>
            <span className="text-[10px] text-white font-mono">v3.2</span>
          </div>
          <div className="space-y-2 my-auto">
            <div className="h-1.5 w-4/5 bg-white/40 rounded-full" />
            <div className="h-1.5 w-3/5 bg-white/30 rounded-full" />
            <div className="h-1.5 w-1/2 bg-white/20 rounded-full" />
          </div>
          <div className="text-[11px] text-white font-medium">Ready for Deploy</div>
        </div>
      ),
    },
  ];

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="relative w-full overflow-hidden py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Arched Carousel Container */}
      <div className="perspective-1000 max-w-7xl mx-auto px-4">
        <div
          data-lenis-prevent
          className="preserve-3d flex items-center justify-center gap-3 md:gap-4 py-8 overflow-x-auto lg:overflow-visible no-scrollbar"
        >
          {cards.map((card, idx) => {
            // Calculate distance from center (approx idx 4 or activeCardIndex)
            const distance = idx - activeCardIndex;
            // Arc rotation angle
            const rotateY = distance * 8; // gentle cylindrical curve
            const translateZ = Math.max(-Math.abs(distance) * 25, -120);
            const translateY = Math.pow(distance, 2) * 2.2; // slight parabolic arch
            const opacity = Math.max(1 - Math.abs(distance) * 0.12, 0.4);
            const scale = Math.max(1 - Math.abs(distance) * 0.04, 0.82);

            return (
              <div
                key={card.id}
                onClick={() => setActiveCardIndex(idx)}
                style={{
                  transform: `perspective(1000px) rotateY(${rotateY}deg) translateZ(${translateZ}px) translateY(${translateY}px) scale(${scale})`,
                  opacity: opacity,
                  transition: 'transform 0.4s ease-out, opacity 0.3s ease-out',
                }}
                className={`flex-shrink-0 w-44 md:w-48 h-56 md:h-64 cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:opacity-100 ${
                  idx === activeCardIndex ? 'z-20 ring-1 ring-white/60' : 'z-10'
                }`}
              >
                {card.content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls for the Carousel */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={handlePrev}
          aria-label="Previous card"
          className="w-8 h-8 rounded-full border border-white/20 bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCardIndex(i)}
              aria-label={`Jump to card ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeCardIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          aria-label="Next card"
          className="w-8 h-8 rounded-full border border-white/20 bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Social Proof Rating under the Arched Showcase */}
      <div className="mt-8 text-center flex flex-col items-center justify-center">
        <p className="text-xs md:text-sm text-white/90 font-medium tracking-wide">
          Rated 4.9/5 by 4,900+ clients
        </p>
        <div className="flex items-center gap-1 mt-2 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
};
