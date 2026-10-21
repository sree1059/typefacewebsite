import React from 'react';
import {
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Dribbble,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useNavigation, PageRoute } from '../context/NavigationContext';
import { openCookieSettings } from '../utils/cookieConsent';

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

interface QuickLinkItem {
  label: string;
  route: PageRoute;
  hash?: string;
}

const QUICK_LINKS_CORE: QuickLinkItem[] = [
  { label: 'Home', route: 'home' },
  { label: 'Services & Architecture', route: 'services' },
  { label: 'About Typeface', route: 'about' },
  { label: 'Selected Client Work', route: 'work' },
  { label: 'Courses & Academy', route: 'courses' },
  { label: 'Working With Us', route: 'working-with-us' },
];

const QUICK_LINKS_DISCOVERY: QuickLinkItem[] = [
  { label: 'Google + AI Search Visibility', route: 'home', hash: '#search-visibility' },
  { label: 'Our Work & Flagships', route: 'home', hash: '#work' },
  { label: 'Why Typeface', route: 'home', hash: '#why-typeface' },
  { label: 'Client Reviews & Proof', route: 'home', hash: '#testimonials' },
  { label: 'Frequently Asked Questions', route: 'home', hash: '#faq' },
];

const QUICK_LINKS_CONNECT: QuickLinkItem[] = [
  { label: 'Start a Project / Inquiry', route: 'contact' },
  { label: 'Book Consultation', route: 'contact' },
  { label: 'Privacy Policy', route: 'privacy-policy' },
  { label: 'Cookie Policy', route: 'cookie-policy' },
  { label: 'Terms & Conditions', route: 'terms' },
];

export const MinimalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { navigate } = useNavigation();

  const handleLinkClick = (route: PageRoute, hash?: string) => {
    navigate(route);
    if (hash) {
      window.history.pushState({}, '', `/${hash}`);
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.history.pushState({}, '', route === 'home' ? '/' : `/${route}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="w-full mt-auto bg-white"
      style={{
        background: '#ffffff',
      }}
    >
      <footer
        className="w-full py-12 sm:py-16 px-6 sm:px-10 lg:px-16 text-[#111111] selection:bg-black selection:text-white border-t border-black/10 bg-white"
        style={{
          background: '#ffffff',
        }}
      >
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
          {/* Top Row: Brand Identity & Social Icons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/10">
            {/* Brand Logo & Tagline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full aspect-square bg-black flex items-center justify-center text-white shrink-0 shadow-sm transition-transform duration-200 hover:scale-105">
                  <svg viewBox="0 0 520 420" fill="none" className="w-4.5 h-4.5 text-white">
                    <rect x="0" y="0" width="360" height="130" fill="currentColor" />
                    <rect x="110" y="130" width="140" height="280" fill="currentColor" />
                    <circle cx="445" cy="345" r="65" fill="currentColor" />
                  </svg>
                </div>
                <span
                  className="font-peace-sans text-2xl font-normal text-[#111111]"
                  style={{ fontFamily: "'Peace Sans', sans-serif", letterSpacing: '-0.085em' }}
                >
                  Typeface
                </span>
                <span className="hidden sm:inline-block text-black/25 text-sm">|</span>
                <span className="hidden sm:inline-block text-xs uppercase tracking-widest font-semibold text-black/70 font-mono">
                  Developer House
                </span>
              </div>
              <span className="text-xs text-black/55 font-manrope font-light max-w-sm sm:pl-2">
                Engineering high-performance web systems and discovery platforms.
              </span>
            </div>

            {/* Social Media Links with Lime Gradient Hover */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full bg-black/[0.05] border border-black/10 hover:border-black/25 flex items-center justify-center text-black/80 transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs group relative overflow-hidden hover:bg-gradient-to-r hover:from-[#55DCFF] hover:via-[#69F9B0] hover:to-[#FFE600] hover:text-black"
                  >
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* =========================================================
              PERSISTENT QUICK LINKS SECTION
              Features responsive columns with lime-green gradient hover states
              ========================================================= */}
          <div className="space-y-6">
            {/* Quick Links Section Eyebrow */}
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-black border border-black/10 shadow-2xs"
                style={{
                  background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span>QUICK LINKS</span>
              </div>
              <span className="text-xs font-mono text-black/45 hidden sm:inline-block">
                Navigate all core flagships &amp; capabilities
              </span>
            </div>

            {/* 3-Column Navigation Grid with Lime-Green Gradient Hover Effects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Column 1: Core Pages */}
              <div className="flex flex-col space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-black/45 font-semibold pb-2 border-b border-black/10 mb-2">
                  01 — Core Pages
                </span>
                {QUICK_LINKS_CORE.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.route, link.hash)}
                    className="group relative w-full text-left py-2 px-3 -mx-3 rounded-xl transition-all duration-200 flex items-center justify-between text-xs sm:text-[13.5px] font-manrope font-medium text-black/75 hover:text-black hover:bg-gradient-to-r hover:from-[#55DCFF]/15 hover:via-[#69F9B0]/20 hover:to-[#FFE600]/15 hover:border hover:border-black/10 hover:shadow-[0_4px_16px_rgba(105,249,176,0.22)] cursor-pointer"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#059669] opacity-0 -translate-x-1.5 translate-y-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </button>
                ))}
              </div>

              {/* Column 2: Discovery & Platform Highlights */}
              <div className="flex flex-col space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-black/45 font-semibold pb-2 border-b border-black/10 mb-2">
                  02 — Search &amp; Work
                </span>
                {QUICK_LINKS_DISCOVERY.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.route, link.hash)}
                    className="group relative w-full text-left py-2 px-3 -mx-3 rounded-xl transition-all duration-200 flex items-center justify-between text-xs sm:text-[13.5px] font-manrope font-medium text-black/75 hover:text-black hover:bg-gradient-to-r hover:from-[#55DCFF]/15 hover:via-[#69F9B0]/20 hover:to-[#FFE600]/15 hover:border hover:border-black/10 hover:shadow-[0_4px_16px_rgba(105,249,176,0.22)] cursor-pointer"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#059669] opacity-0 -translate-x-1.5 translate-y-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </button>
                ))}
              </div>

              {/* Column 3: Inquiries & Legal Documents */}
              <div className="flex flex-col space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-black/45 font-semibold pb-2 border-b border-black/10 mb-2">
                  03 — Connect &amp; Legal
                </span>
                {QUICK_LINKS_CONNECT.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.route, link.hash)}
                    className="group relative w-full text-left py-2 px-3 -mx-3 rounded-xl transition-all duration-200 flex items-center justify-between text-xs sm:text-[13.5px] font-manrope font-medium text-black/75 hover:text-black hover:bg-gradient-to-r hover:from-[#55DCFF]/15 hover:via-[#69F9B0]/20 hover:to-[#FFE600]/15 hover:border hover:border-black/10 hover:shadow-[0_4px_16px_rgba(105,249,176,0.22)] cursor-pointer"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#059669] opacity-0 -translate-x-1.5 translate-y-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </button>
                ))}
                {/* Cookie Preferences Trigger */}
                <button
                  type="button"
                  onClick={() => openCookieSettings()}
                  className="group relative w-full text-left py-2 px-3 -mx-3 rounded-xl transition-all duration-200 flex items-center justify-between text-xs sm:text-[13.5px] font-manrope font-medium text-black/75 hover:text-black hover:bg-gradient-to-r hover:from-[#55DCFF]/15 hover:via-[#69F9B0]/20 hover:to-[#FFE600]/15 hover:border hover:border-black/10 hover:shadow-[0_4px_16px_rgba(105,249,176,0.22)] cursor-pointer"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    Cookie Preferences
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#059669] opacity-0 -translate-x-1.5 translate-y-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Notice & Legal Summary */}
          <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-center sm:text-left text-black/65 font-medium font-manrope">
            <p>© {currentYear} Typeface Developer House. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 font-normal">
              <button
                onClick={() => handleLinkClick('privacy-policy')}
                className="hover:text-black underline-offset-2 hover:underline transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-black/30">·</span>
              <button
                onClick={() => handleLinkClick('cookie-policy')}
                className="hover:text-black underline-offset-2 hover:underline transition-colors cursor-pointer"
              >
                Cookie Policy
              </button>
              <span className="text-black/30">·</span>
              <button
                onClick={() => handleLinkClick('terms')}
                className="hover:text-black underline-offset-2 hover:underline transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalFooter;
