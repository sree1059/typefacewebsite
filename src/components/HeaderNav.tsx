import React, { useState, useEffect } from 'react';
import { useNavigation, PageRoute } from '../context/NavigationContext';
import { X, Calendar } from 'lucide-react';
import { openCalendlyPopup, CALENDLY_URL } from '../utils/calendly';
import { CalendlyModal } from './CalendlyModal';

interface HeaderNavProps {
  headingFontSize?: number;
  useCaslonFont?: boolean;
  onBookConsultation?: () => void;
  calendlyUrl?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onBookConsultation,
  calendlyUrl = CALENDLY_URL,
}) => {
  const { currentPage, navigate } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when fullscreen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Updated navigation items matching user's exact order:
  // Home, About, Services, Work, Contact
  const navItems: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Work', page: 'work' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  /**
   * Invokes the Calendly scheduling popup without interfering with existing navigation logic.
   */
  const handleBookConsultation = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Close mobile menu if open
    setMobileMenuOpen(false);

    // Call custom callback if provided
    if (onBookConsultation) {
      onBookConsultation();
      return;
    }

    // Trigger Calendly popup widget or fallback modal
    openCalendlyPopup(calendlyUrl);
  };

  return (
    <>
      <header aria-label="Primary Navigation" className="navbar relative z-40">
        {/* LOGO */}
        <div className="navbar-logo">
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center justify-center focus:outline-none w-full h-full cursor-pointer"
            aria-label="Typeface Home"
          >
            <div className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full bg-[#111111] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 active:scale-95 shadow-sm">
              <svg
                viewBox="0 0 520 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white transition-transform duration-300 group-hover:scale-110"
              >
                {/* Top horizontal bar of T */}
                <rect x="0" y="0" width="360" height="130" fill="currentColor" />
                {/* Vertical stem of T */}
                <rect x="110" y="130" width="140" height="280" fill="currentColor" />
                {/* Circle period . */}
                <circle cx="445" cy="345" r="65" fill="currentColor" />
              </svg>
            </div>
          </button>
        </div>

        {/* NAVIGATION LINKS: Visible on Tablet (768px+) and Desktop */}
        <nav className="navbar-links">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.page ||
              (item.page === 'work' && currentPage === 'projects');
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`transition-colors duration-150 py-1 cursor-pointer relative text-[15px] lg:text-[16px] ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-[#666] hover:text-black font-normal'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA "Book a Consultation" (Tablet & Desktop) */}
        <button
          type="button"
          onClick={handleBookConsultation}
          className="navbar-cta cursor-pointer"
          aria-label="Book a Consultation"
        >
          Book a Consultation
        </button>

        {/* MOBILE ONLY Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden w-[44px] h-[44px] flex flex-col items-center justify-center gap-[5px] focus:outline-none flex-shrink-0 cursor-pointer"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="w-[22px] h-[2px] bg-[#111111] rounded-full transition-all" />
          <span className="w-[22px] h-[2px] bg-[#111111] rounded-full transition-all" />
          <span className="w-[22px] h-[2px] bg-[#111111] rounded-full transition-all" />
        </button>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE FULLSCREEN MENUPAGE TAKEOVER (Inspired by uploaded reference)     */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          data-lenis-prevent
          className="md:hidden fixed inset-0 z-[999] w-screen h-screen bg-white text-[#111111] flex flex-col justify-between p-8 xs:p-10 sm:p-12 select-none overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Top Bar: Brand Logo & Close 'X' Button */}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 focus:outline-none cursor-pointer"
              aria-label="Typeface Home"
            >
              <div className="w-9 h-9 rounded-full bg-[#111111] flex items-center justify-center text-white shrink-0">
                <svg viewBox="0 0 520 420" fill="none" className="w-4.5 h-4.5 text-white">
                  <rect x="0" y="0" width="360" height="130" fill="currentColor" />
                  <rect x="110" y="130" width="140" height="280" fill="currentColor" />
                  <circle cx="445" cy="345" r="65" fill="currentColor" />
                </svg>
              </div>
              <span
                className="font-peace-sans text-2xl font-normal text-[#111111] tracking-tight"
                style={{ fontFamily: "'Peace Sans', sans-serif", letterSpacing: '-0.06em' }}
              >
                Typeface
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-12 h-12 rounded-full flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
            >
              <X className="w-8 h-8 stroke-[1.5]" />
            </button>
          </div>

          {/* Center Navigation Links: Large Centered Bold Sans-Serif Typography */}
          <nav className="my-auto py-8 flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.page ||
                (item.page === 'work' && currentPage === 'projects');
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`block text-[44px] xs:text-[52px] sm:text-[64px] font-extrabold tracking-tight transition-all duration-200 cursor-pointer font-manrope leading-[1.12] ${
                    isActive
                      ? 'text-[#111111] underline decoration-[#B5E61D] underline-offset-8'
                      : 'text-[#111111] hover:text-[#4E89FF] active:scale-95'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile "Book a Consultation" CTA Button */}
            <div className="pt-4 w-full max-w-xs px-2">
              <button
                type="button"
                onClick={handleBookConsultation}
                className="w-full py-3.5 px-6 rounded-full bg-[#111111] hover:bg-black text-white text-[15px] sm:text-base font-semibold tracking-tight shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                aria-label="Book a Consultation"
              >
                <Calendar className="w-4 h-4 text-white/90" />
                <span>Book a Consultation</span>
              </button>
            </div>
          </nav>

          {/* Bottom Bar: Contact Info (Bottom Left), Legal Links & Copyright */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 pt-8 border-t border-black/10 text-xs text-[#111111] font-manrope">
            {/* Bottom Left: Phone number & Email */}
            <div className="flex flex-col gap-1.5 text-left">
              <a
                href="tel:+919347452611"
                className="text-sm sm:text-base text-[#111111] font-semibold hover:underline font-manrope tracking-tight"
              >
                +91 93474 52611
              </a>
              <a
                href="mailto:infotypeface1411@gmail.com"
                className="flex items-center gap-2 text-sm sm:text-base text-[#111111] hover:underline font-manrope font-medium"
              >
                <span className="w-4.5 h-4.5 rounded-full border border-black/40 flex items-center justify-center text-[11px] leading-none select-none">
                  +
                </span>
                <span>infotypeface1411@gmail.com</span>
              </a>
            </div>

            {/* Bottom Center: Privacy Policy & Terms */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#6B7280] font-manrope">
              <button
                onClick={() => handleNavClick('privacy-policy')}
                className="hover:text-[#111111] hover:underline transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-black/20">·</span>
              <button
                onClick={() => handleNavClick('terms')}
                className="hover:text-[#111111] hover:underline transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>

            {/* Bottom Right: Copyright */}
            <div className="text-xs text-[#9CA3AF] font-manrope">
              © {new Date().getFullYear()} Typeface
            </div>
          </div>
        </div>
      )}

      {/* In-app fallback scheduler modal if external widget script is blocked */}
      <CalendlyModal />
    </>
  );
};

