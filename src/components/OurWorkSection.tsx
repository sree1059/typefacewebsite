import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

import sphoorthiThumb from '../assets/images/sphoorthi_ui_1790244118497.jpg';
import thrillHikersThumb from '../assets/images/thrill_hikers_ui_1790244141871.jpg';
import wellnessThumb from '../assets/images/wellness_hospitals_ui_1792587314665.jpg';
import mrPottelThumb from '../assets/images/mr_pottel_ui_1790244187642.jpg';
import emitmindsThumb from '../assets/images/emitminds_ui_1792587327883.jpg';
import aranyamThumb from '../assets/images/aranyam_amogham_ui_1792587342198.jpg';

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  url: string;
  thumbnail: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sphoorthi-interiors',
    name: 'sphoorthi interiors',
    category: 'Luxury Architecture & Interiors',
    url: 'https://www.sphoorthiinteriors.com/',
    thumbnail: sphoorthiThumb,
  },
  {
    id: 'thrill-hikers',
    name: 'thrill hikers',
    category: 'Shopify Adventure Gear & Expeditions',
    url: 'https://www.thrillhikers.com/',
    thumbnail: thrillHikersThumb,
  },
  {
    id: 'wellness-hospitals',
    name: 'wellness hospitals nizamabad',
    category: 'Healthcare Platform & Appointments',
    url: 'https://wellnesshospitals.in/hospitals/nizamabad/',
    thumbnail: wellnessThumb,
  },
  {
    id: 'mr-pottel',
    name: 'mr pottel',
    category: 'Artisanal Hospitality & Catering',
    url: 'https://mrpottel.com/',
    thumbnail: mrPottelThumb,
  },
  {
    id: 'emitminds',
    name: 'emitminds',
    category: 'Enterprise Digital Solutions',
    url: 'https://www.emitminds.com/',
    thumbnail: emitmindsThumb,
  },
  {
    id: 'aranyam-amogham',
    name: 'aranyam amogham',
    category: 'Eco Living & Sustainable Retreats',
    url: 'https://www.aranyam-amogham.com/',
    thumbnail: aranyamThumb,
  },
];

export const OurWorkSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section
      id="work"
      aria-label="Our Work and Client Flagships"
      className="relative w-full bg-white text-[#111111] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 select-none border-b border-black/10 overflow-hidden"
      style={{
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Subtle ambient gradient aura matching hero aesthetic */}
      <div
        className="absolute top-1/3 -left-20 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(85, 220, 255, 0.4) 0%, rgba(105, 249, 176, 0.25) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(195, 248, 80, 0.35) 0%, rgba(105, 249, 176, 0.2) 50%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10 sm:space-y-14">
        {/* ========================================================
            SECTION HEADER
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10">
          <div className="max-w-2xl">
            {/* Pill Eyebrow */}
            <div
              style={{
                background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold text-black mb-4 sm:mb-5 shadow-xs border border-black/10 uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>OUR WORK</span>
            </div>

            {/* Headline */}
            <h2
              style={{
                letterSpacing: '-0.035em',
              }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-[54px] text-black font-normal tracking-tight leading-[1.08] mb-3"
            >
              Proof of execution,<br />
              <span
                style={{
                  background:
                    'linear-gradient(110deg, #155EEF 0%, #06B6D4 35%, #10B981 70%, #EAB308 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                className="font-semibold inline-block"
              >
                shipped live
              </span>
              <span className="text-[#10B981]">.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-black/70 font-light leading-relaxed max-w-xl">
              Selected client flagships, custom web applications, and high-performance digital platforms.
            </p>
          </div>

          {/* Action Link: Contact / Start a Project */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigate('contact');
                window.history.pushState({}, '', '/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-[1px] rounded-full bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="px-5 py-2.5 rounded-full bg-white group-hover:bg-black transition-colors flex items-center gap-2">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-wide uppercase text-black group-hover:text-white transition-colors">
                  START A PROJECT
                </span>
                <ArrowUpRight className="w-4 h-4 text-black group-hover:text-[#69F9B0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================
            PROJECTS LIST: Thumbnail + Name + Hero Gradient Button
            ======================================================== */}
        <div className="flex flex-col divide-y divide-black/10">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 py-6 sm:py-8 transition-all duration-200"
            >
              {/* Left: Thumbnail & Project Name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-7 flex-1 min-w-0">
                {/* Project Thumbnail Image with Subtle Border and Scale on Hover */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} live preview`}
                  className="relative w-full sm:w-44 md:w-52 aspect-[16/10] sm:aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 shadow-2xs shrink-0 bg-black/5 group-hover:border-black/30 group-hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={project.thumbnail}
                    alt={`${project.name} website thumbnail`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </a>

                {/* Project Category & Name */}
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-black/50 font-semibold mb-1">
                    {project.category}
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 'clamp(24px, 4vw, 42px)',
                      fontWeight: 300,
                      letterSpacing: '-0.03em',
                    }}
                    className="text-black group-hover:text-black tracking-tight leading-tight transition-transform duration-200 group-hover:translate-x-1.5 cursor-pointer"
                  >
                    {project.name}
                  </a>
                </div>
              </div>

              {/* Right: View Live Website Button with Exact Hero Section Gradient */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name} live website`}
                style={{
                  background:
                    'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                  color: '#000000',
                }}
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-black font-mono font-bold text-xs sm:text-[13px] tracking-wider uppercase border border-black/10 shadow-xs hover:shadow-[0_8px_25px_rgba(105,249,176,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 self-start md:self-center cursor-pointer"
              >
                <span>View Live Site</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorkSection;
