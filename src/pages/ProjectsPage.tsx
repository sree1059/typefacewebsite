import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
    id: 'mr-pottel',
    name: 'mr pottel',
    url: 'https://mrpottel.com/',
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
      className="w-full text-[#111111] min-h-screen py-16 sm:py-24 md:py-28 px-6 sm:px-12 md:px-20 selection:bg-black selection:text-white"
      style={{
        background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)',
        ...fontStyle,
      }}
    >
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
        {/* Page Heading */}
        <div className="no-copy">
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 300,
              color: '#ffffff',
            }}
            className="text-[34px] xs:text-[44px] sm:text-[56px] md:text-[68px] text-white tracking-tight leading-[1.08] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] mb-3"
          >
            Work<span className="text-[#E0343F]">.</span>
          </h1>
          <p className="text-[17px] sm:text-[20px] text-[#111111]/75 leading-relaxed max-w-2xl font-light">
            Selected client flagships, digital products, and web platforms.
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

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white text-[#111111] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WorkPage = ProjectsPage;
