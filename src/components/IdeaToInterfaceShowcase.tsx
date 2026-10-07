import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectItem {
  id: string;
  name: string;
  url: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'thrill-hikers',
    name: 'thrill hikers',
    url: 'https://www.thrillhikers.com/',
  },
  {
    id: 'sphoorthi-interiors',
    name: 'sphoorthi interiors',
    url: 'https://www.sphoorthiinteriors.com/',
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

interface IdeaToInterfaceShowcaseProps {
  useCaslonFont?: boolean;
}

export const IdeaToInterfaceShowcase: React.FC<IdeaToInterfaceShowcaseProps> = () => {
  const headingStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 'clamp(38px, 6.5vw, 76px)',
    fontWeight: 300,
    color: '#111111',
  };

  const projectTitleStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '32px',
    fontWeight: 300,
  };

  return (
    <section
      id="idea-to-interface"
      aria-label="From Idea to Interface"
      className="w-full bg-white text-zinc-950 py-16 sm:py-24 relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-14 no-copy">
          <h2
            style={headingStyle}
            className="leading-[1.05] tracking-tight text-[#111111] font-light"
          >
            From Idea to Interface<span className="text-[#E0343F]">.</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-zinc-600 font-sans font-light leading-relaxed mt-2.5 sm:mt-4">
            We translate raw vision into living, breathing digital products.
          </p>
        </div>

        {/* Minimalist Project Names with Small Arrow (No divider lines) */}
        <div className="flex flex-col space-y-2 sm:space-y-3 no-copy">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} live site`}
              className="group py-3 xs:py-3.5 sm:py-4 flex items-center justify-between transition-colors hover:text-[#E0343F] cursor-pointer"
            >
              <span
                style={projectTitleStyle}
                className="font-light lowercase tracking-tight text-zinc-950 group-hover:text-[#E0343F] transition-colors pr-4 leading-tight"
              >
                {project.name}
              </span>

              <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 text-zinc-600">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
