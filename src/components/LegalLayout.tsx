import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUp, FileText, Shield } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface TableOfContentItem {
  id: string;
  number: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  eyebrow: string;
  intro: React.ReactNode;
  lastUpdated?: string;
  tableOfContents: TableOfContentItem[];
  children: React.ReactNode;
  currentLegalRoute: 'privacy-policy' | 'terms';
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  eyebrow,
  intro,
  lastUpdated = '[DATE]',
  tableOfContents,
  children,
  currentLegalRoute,
}) => {
  const { navigate } = useNavigation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Determine active section for table of contents
      const sections = tableOfContents.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const manropeFont: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 300,
  };

  return (
    <div
      className="w-full text-[#111111] min-h-screen selection:bg-black selection:text-white"
      style={{
        background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)',
        ...manropeFont,
      }}
    >
      {/* Top Breadcrumb & Switcher Navigation Bar */}
      <div className="border-b border-black/10 bg-white/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <button
            onClick={() => navigate('home')}
            style={manropeFont}
            className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to website</span>
          </button>

          {/* Quick tab switcher between legal pages */}
          <div className="flex items-center gap-1 sm:gap-2 bg-white/50 border border-white/60 p-1 rounded-xl">
            <button
              onClick={() => navigate('privacy-policy')}
              style={manropeFont}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                currentLegalRoute === 'privacy-policy'
                  ? 'bg-white text-black font-normal shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => navigate('terms')}
              style={manropeFont}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                currentLegalRoute === 'terms'
                  ? 'bg-white text-black font-normal shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms &amp; Conditions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 pt-12 sm:pt-20 pb-24 sm:pb-32">
        {/* Header Block */}
        <header className="max-w-3xl mb-12 sm:mb-16 pb-8 sm:pb-12 border-b border-black/15">
          <div
            style={manropeFont}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E0343F] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#E0343F]" />
            <span>{eyebrow}</span>
          </div>

          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 300,
              color: '#ffffff',
            }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.05] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] mb-6"
          >
            {title}<span className="text-[#E0343F]">.</span>
          </h1>

          <div style={manropeFont} className="text-xs text-black/60 mb-6">
            Last Updated: <span className="text-black font-medium">{lastUpdated}</span>
          </div>

          <div
            style={manropeFont}
            className="text-base sm:text-lg text-[#111111]/85 leading-relaxed"
          >
            {intro}
          </div>
        </header>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-4 pr-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white/70 p-5 shadow-xs">
              <div
                style={manropeFont}
                className="text-xs uppercase tracking-widest text-black/60"
              >
                Contents
              </div>
              <nav aria-label="Table of Contents" className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
                {tableOfContents.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={manropeFont}
                      className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors text-xs flex items-baseline gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-white text-black font-normal shadow-xs'
                          : 'text-black/65 hover:text-black hover:bg-white/40'
                      }`}
                    >
                      <span className="text-[11px] text-black/45 shrink-0">{item.number}</span>
                      <span className="truncate">{item.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: Legal Clauses Content wrapped in Frosted Glass Card */}
          <main className="lg:col-span-8 max-w-3xl">
            <div className="bg-white/70 backdrop-blur-md rounded-[28px] border border-white/80 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-12 sm:space-y-16">
              {children}
            </div>

            {/* Bottom Cross Link & Agency Details */}
            <div className="mt-12 pt-8 border-t border-black/15 space-y-6">
              <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 space-y-4 shadow-xs">
                <div style={manropeFont} className="text-xs uppercase tracking-wider text-black/60">
                  Related Legal Document
                </div>
                {currentLegalRoute === 'privacy-policy' ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 style={manropeFont} className="text-lg text-[#111111]">Terms &amp; Conditions</h4>
                      <p style={manropeFont} className="text-xs text-black/65 mt-1">
                        Read the terms governing use of the Typeface website and service agreements.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('terms')}
                      style={manropeFont}
                      className="px-4 py-2 bg-[#111111] text-white text-xs rounded-xl hover:bg-black transition-colors self-start sm:self-center cursor-pointer shrink-0"
                    >
                      View Terms &amp; Conditions →
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 style={manropeFont} className="text-lg text-[#111111]">Privacy Policy</h4>
                      <p style={manropeFont} className="text-xs text-black/65 mt-1">
                        Learn how Typeface collects, uses, and safeguards personal data.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('privacy-policy')}
                      style={manropeFont}
                      className="px-4 py-2 bg-[#111111] text-white text-xs rounded-xl hover:bg-black transition-colors self-start sm:self-center cursor-pointer shrink-0"
                    >
                      View Privacy Policy →
                    </button>
                  </div>
                )}
              </div>

              <div style={manropeFont} className="flex items-center justify-between pt-4 text-xs text-black/70">
                <span>Typeface · Digital Creative Studio</span>
                <button
                  onClick={scrollToTop}
                  style={manropeFont}
                  className="hover:text-black transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Back to top</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-lg hover:bg-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
