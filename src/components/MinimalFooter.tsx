import React from 'react';
import { Twitter, Linkedin, Instagram, Github, Dribbble } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/typefacecreates?stkn=c3RrMXV0ZWVxN3dv',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'X (Twitter)',
    href: 'https://twitter.com',
    icon: Twitter,
  },
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    name: 'Dribbble',
    href: 'https://dribbble.com',
    icon: Dribbble,
  },
];

export const MinimalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { navigate } = useNavigation();

  return (
    <div
      className="w-full mt-auto"
      style={{
        background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)',
      }}
    >
      <footer
        className="w-full py-8 sm:py-10 px-6 sm:px-10 lg:px-16 text-[#111111] selection:bg-black selection:text-white rounded-t-[32px] border-t border-black/10 shadow-sm"
        style={{
          background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Brand Name & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full aspect-square bg-black flex items-center justify-center text-white shrink-0 shadow-sm transition-transform duration-200 hover:scale-105">
              <svg viewBox="0 0 520 420" fill="none" className="w-4 h-4 text-white">
                <rect x="0" y="0" width="360" height="130" fill="currentColor" />
                <rect x="110" y="130" width="140" height="280" fill="currentColor" />
                <circle cx="445" cy="345" r="65" fill="currentColor" />
              </svg>
            </div>
            <span
              className="font-peace-sans text-xl sm:text-2xl font-normal text-[#111111]"
              style={{ fontFamily: "'Peace Sans', sans-serif", letterSpacing: '-0.085em' }}
            >
              Typeface
            </span>
            <span className="hidden sm:inline-block text-black/30 text-sm">
              |
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest font-semibold text-black/75">
              Digital Creative Studio
            </span>
          </div>

          {/* Copyright Notice & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-center order-3 md:order-2 text-black/75 font-medium">
            <p>© {currentYear} Typeface. All rights reserved.</p>
            <span className="hidden sm:inline-block text-black/30">·</span>
            <div className="flex items-center gap-3 font-normal">
              <button
                onClick={() => navigate('privacy-policy')}
                className="hover:text-black underline-offset-2 hover:underline transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-black/30">·</span>
              <button
                onClick={() => navigate('terms')}
                className="hover:text-black underline-offset-2 hover:underline transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-3 sm:gap-4 order-2 md:order-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-black/10 hover:bg-black text-black hover:text-[#C8E81E] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};
