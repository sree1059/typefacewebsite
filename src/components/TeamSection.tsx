import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

import founderImg from '../assets/images/man_glasses_portrait_1791036930295.jpg';
import designLeadImg from '../assets/images/brunette_woman_portrait_1791036961013.jpg';
import videoLeadImg from '../assets/images/video_editor_portrait_1791307799562.jpg';

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  bio: string;
  experience: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Karthik Rao',
    role: 'Founder & Full-Stack Lead',
    focus: 'Websites & Shopify Architecture',
    bio: 'Specializes in custom React & Shopify builds engineered for speed, clean semantics, and commercial conversions.',
    experience: '8+ yrs in digital engineering',
    image: founderImg,
  },
  {
    name: 'Maya Sen',
    role: 'Creative & UI/UX Director',
    focus: 'Brand Systems & Interface Design',
    bio: 'Designs high-converting digital interfaces, editorial design systems, and identity frameworks that make brands unforgettable.',
    experience: '6+ yrs in brand & product design',
    image: designLeadImg,
  },
  {
    name: 'Arjun Verma',
    role: 'Lead Video & Motion Editor',
    focus: 'Reels, Shorts & Social Pacing',
    bio: 'Edits retention-focused short-form video content, viral reels, and motion typography built to scale brand attention.',
    experience: '5+ yrs in short-form storytelling',
    image: videoLeadImg,
  },
];

export const TeamSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section
      id="team"
      aria-label="Team Introduction"
      className="w-full bg-white text-[#111111] py-20 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 select-none border-b border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-black/60 block mb-2 font-mono">
              Team Introduction
            </span>
            <h2
              style={{
                fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 400,
                letterSpacing: '-0.025em',
              }}
              className="text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight leading-tight"
            >
              The craftspeople behind your build<span className="text-[#E0343F]">.</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
            }}
            className="text-sm sm:text-base text-black/70 max-w-md leading-relaxed"
          >
            No junior handoffs or opaque account managers. You collaborate directly with senior specialists who design, code, and cut your content.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="group rounded-3xl bg-[#FBFBFA] border border-black/10 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-black/25 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
            >
              {/* Member Portrait */}
              <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <span>{member.focus}</span>
                </div>
              </div>

              {/* Member Details */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-semibold text-[#111111] tracking-tight font-manrope">
                      {member.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-black/75 mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-[13px] text-black/65 leading-relaxed mt-3 font-light">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-black/10 flex items-center justify-between text-[11px] text-black/50 font-mono">
                  <span>{member.experience}</span>
                  <span className="text-black/30">Direct Partner</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Working Together Note */}
        <div className="mt-12 sm:mt-14 p-5 sm:p-6 rounded-2xl bg-[#FAFAF9] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs sm:text-sm text-black/75">
            <span className="font-semibold text-black">Want to meet before starting?</span> Schedule a 15-minute scoping call to talk through your brand and timeline.
          </div>
          <button
            onClick={() => navigate('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer shadow-xs active:scale-95"
          >
            <span>Talk to the Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
