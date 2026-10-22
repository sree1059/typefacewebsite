import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HERO_GRADIENT_STYLE } from '../utils/theme';

interface ProjectItem {
  id: string;
  name: string;
  url: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'sphoorthi-interiors',
    name: 'sphoorthi interiors',
    url: 'https://www.sphoorthiinteriors.com/',
  },
  {
    id: 'thrill-hikers',
    name: 'thrill hikers',
    url: 'https://www.thrillhikers.com/',
  },
  {
    id: 'wellness-hospitals',
    name: 'wellness hospitals nizamabad',
    url: 'https://wellnesshospitals.in/hospitals/nizamabad/',
  },
  {
    id: 'mr-pottel',
    name: 'mr pottel',
    url: 'https://mrpottel.com/',
  },
  {
    id: 'emitminds',
    name: 'emitminds',
    url: 'https://www.emitminds.com/',
  },
  {
    id: 'aranyam-amogham',
    name: 'aranyam amogham',
    url: 'https://www.aranyam-amogham.com/',
  },
];

interface ProjectsPageProps {
  useCaslonFont?: boolean;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const fontStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 300,
  };

  const projectTitleStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 300,
  };

  return (
    <div
      className="w-full bg-white text-[#111111] min-h-screen py-10 sm:py-16 md:py-20 selection:bg-black selection:text-white"
      style={{
        background: '#ffffff',
        ...fontStyle,
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 space-y-10 sm:space-y-14">
        {/* Work Page Hero Header with Exact Hero Gradient */}
        <div
          className="w-full rounded-3xl sm:rounded-[40px] p-8 sm:p-12 md:p-16 border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-black relative overflow-hidden select-none no-copy"
          style={HERO_GRADIENT_STYLE}
        >
          <span className="text-[12px] uppercase tracking-widest font-semibold text-black/70 block mb-3 font-mono">
            Typeface · Developer House
          </span>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              color: '#000000',
            }}
            className="text-[34px] xs:text-[44px] sm:text-[56px] md:text-[68px] text-black tracking-tight leading-[1.08] mb-3"
          >
            Work<span className="text-[#E0343F]">.</span>
          </h1>
          <p className="text-[17px] sm:text-[21px] text-black/85 leading-relaxed max-w-2xl font-light">
            Selected client flagships, custom web applications, and high-performance digital platforms.
          </p>
        </div>

        {/* Project Names & Links List - Clean, no lines, no URL text */}
        <div className="flex flex-col space-y-4 sm:space-y-6">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} website`}
              className="group flex items-center justify-between py-4 sm:py-5 transition-transform duration-200"
            >
              <div className="flex items-center gap-3 sm:gap-4 no-copy">
                <span
                  style={projectTitleStyle}
                  className="text-[#111111] group-hover:text-black tracking-tight transition-transform duration-200 group-hover:translate-x-1.5"
                >
                  {project.name}
                </span>
              </div>

              <div
                style={{
                  background:
                    'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                  color: '#000000',
                }}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-black font-mono font-bold text-xs sm:text-[13px] tracking-wider uppercase border border-black/10 shadow-xs hover:shadow-[0_8px_25px_rgba(105,249,176,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
              >
                <span>View Live Site</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WorkPage = ProjectsPage;
