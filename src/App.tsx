import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { HeaderNav } from './components/HeaderNav';
import { BannerHero } from './components/BannerHero';
import { DashboardCards } from './components/DashboardCards';
import { ServicesTicker } from './components/ServicesTicker';
import { FeaturedClientsTicker } from './components/FeaturedClientsTicker';
import { StatsNumbersSection } from './components/StatsNumbersSection';
import { WhyTypefaceSection } from './components/WhyTypefaceSection';
import { HowWeWorkSection } from './components/HowWeWorkSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { ServicesStackedSection } from './components/ServicesStackedSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { useLenis } from './hooks/useLenis';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { CoursesPage } from './pages/CoursesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { WorkingWithUsPage } from './pages/WorkingWithUsPage';
import { ResultsStatement } from './components/ResultsStatement';
import { MinimalFooter } from './components/MinimalFooter';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { HERO_GRADIENT_STYLE } from './utils/theme';
import { PageSeo } from './components/PageSeo';

function MainAppContent() {
  const { currentPage } = useNavigation();

  // Heading font size & Caslon typography
  const [headingFontSize] = useState<number>(96);
  const [useCaslonFont] = useState<boolean>(true);

  // Initialize Lenis smooth scroll
  useLenis({
    lerp: 0.08,
    wheelMultiplier: 1,
  });

  // Content Protection: Prevent copying only when selection is inside .no-copy elements
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.rangeCount) {
        return;
      }

      const isInsideNoCopy = (node: Node | null): boolean => {
        let current: Node | null = node;
        while (current && current !== document.body) {
          if (current instanceof HTMLElement) {
            // Explicitly allow copying for contact details, inputs, textareas, and .allow-copy elements
            if (
              current.classList.contains('allow-copy') ||
              current.tagName === 'INPUT' ||
              current.tagName === 'TEXTAREA' ||
              (current.tagName === 'A' && (
                current.getAttribute('href')?.startsWith('mailto:') ||
                current.getAttribute('href')?.startsWith('tel:') ||
                current.getAttribute('href')?.includes('wa.me')
              ))
            ) {
              return false;
            }
            if (current.classList.contains('no-copy')) {
              return true;
            }
          }
          current = current.parentNode;
        }
        return false;
      };

      if (isInsideNoCopy(selection.anchorNode) || isInsideNoCopy(selection.focusNode)) {
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  // Verify Supabase Auth initialization silently on startup
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().catch((err) => {
        console.warn('Supabase auth session initialization:', err);
      });
    }
  }, []);

  const isGradientPage =
    currentPage === 'home' ||
    currentPage === 'about' ||
    currentPage === 'work' ||
    currentPage === 'projects' ||
    currentPage === 'services' ||
    currentPage === 'contact' ||
    currentPage === 'thank-you' ||
    currentPage === 'working-with-us';
  const isLegalPage = currentPage === 'privacy-policy' || currentPage === 'terms' || currentPage === 'cookie-policy';

  return (
    <main
      className="min-h-screen w-full flex flex-col font-sans relative overflow-x-hidden bg-white text-[#111111] selection:bg-black selection:text-white"
      style={{ background: '#ffffff' }}
    >
      {/* Route-Specific SEO Head Synchronizer */}
      <PageSeo />

      {/* Dynamic Page Rendering */}
      {currentPage === 'home' && (
        <div
          className="w-full text-[#111111] flex flex-col bg-white"
          style={{
            background: '#ffffff',
          }}
        >
          {/* Hero Section Container with Inset White Navigation matching original design */}
          <div className="w-full px-0 sm:px-4 md:px-6 pt-0 sm:pt-4">
            <section
              id="home"
              className="hero relative w-full overflow-hidden text-black flex flex-col justify-between pb-8 sm:rounded-[36px] md:rounded-[44px] border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              style={{
                backgroundColor: '#FFF000',
                backgroundImage: `
                  radial-gradient(circle at 14% 88%, rgba(85, 220, 255, 0.95) 0%, rgba(105, 230, 255, 0.82) 20%, rgba(195, 248, 80, 0.65) 42%, transparent 68%),
                  radial-gradient(circle at 88% 92%, rgba(115, 230, 255, 0.88) 0%, rgba(145, 240, 255, 0.70) 24%, rgba(205, 250, 110, 0.45) 48%, transparent 72%),
                  radial-gradient(circle at 24% 65%, rgba(90, 225, 255, 0.82) 0%, rgba(165, 245, 95, 0.55) 30%, transparent 62%),
                  radial-gradient(circle at 6% 96%, rgba(185, 175, 255, 0.75) 0%, rgba(120, 215, 255, 0.55) 26%, transparent 58%),
                  radial-gradient(circle at 94% 6%, rgba(160, 252, 210, 0.55) 0%, rgba(220, 255, 130, 0.35) 25%, transparent 52%),
                  radial-gradient(circle at 55% 38%, #FFF200 0%, #FFE600 48%, #FFDD00 100%)
                `,
              }}
            >
              {/* Inset White Navigation Bar - Attached to top edge */}
              <div className="hero-content w-full flex flex-col justify-between">
                <HeaderNav
                  headingFontSize={headingFontSize}
                  useCaslonFont={useCaslonFont}
                />

                {/* Hero Title, Subtitle, and CTAs */}
                <BannerHero
                  headingFontSize={42}
                  useCaslonFont={false}
                  parallaxEnabled={false}
                />

                {/* 3D Floating Dashboard Cards */}
                <DashboardCards />

                {/* 4.5 Star Review Badge Under Hero Cards */}
                <div className="w-full flex justify-center items-center mt-2 sm:mt-4 pb-1 relative z-20">
                  <div className="inline-flex items-center gap-2.5 sm:gap-3.5 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.1)] transition-all duration-200 select-none">
                    {/* Avatars Stack */}
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-[#155EEF] text-white text-[9.5px] font-bold flex items-center justify-center ring-2 ring-white">
                        SR
                      </div>
                      <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-emerald-600 text-white text-[9.5px] font-bold flex items-center justify-center ring-2 ring-white">
                        RR
                      </div>
                      <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-amber-600 text-white text-[9.5px] font-bold flex items-center justify-center ring-2 ring-white">
                        SV
                      </div>
                      <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-indigo-600 text-white text-[9.5px] font-bold flex items-center justify-center ring-2 ring-white">
                        VS
                      </div>
                    </div>

                    {/* Star Rating & 4.5 Score */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                          />
                        ))}
                        {/* 0.5 Star */}
                        <div className="relative w-3.5 h-3.5">
                          <Star className="w-3.5 h-3.5 text-[#F59E0B]" />
                          <div className="absolute inset-0 overflow-hidden w-[50%]">
                            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily:
                            "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          fontWeight: 700,
                        }}
                        className="text-xs sm:text-[13px] text-black"
                      >
                        4.5
                      </span>
                    </div>

                    <span className="text-black/25 text-xs">|</span>

                    {/* Review text */}
                    <span
                      style={{
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 500,
                      }}
                      className="text-[11.5px] sm:text-xs text-black/75 whitespace-nowrap"
                    >
                      Over 20+ clients
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 3. Service Overview (Movable infinite scroll track, kept as is) */}
          <ServicesTicker />

          {/* 4. Featured Clients (Movable small compact scroll track directly below service overview) */}
          <FeaturedClientsTicker />

          {/* Key Metrics / Shipped Projects Strip */}
          <StatsNumbersSection />

          {/* Why Typeface Section */}
          <WhyTypefaceSection />

          {/* 5. Work Section: Work Process (5 Boxes Bento Grid Cards) */}
          <HowWeWorkSection />

          {/* Client Testimonials Ticker Carousel */}
          <TestimonialCarousel />

          {/* GSAP ScrollTrigger Stacked Panels Services Section */}
          <ServicesStackedSection />

          {/* 6. FAQ */}
          <FaqSection />

          {/* 8. Final CTA */}
          <FinalCtaSection />
        </div>
      )}

      {/* Other Pages: Render Navbar in standalone top container with matching page background */}
      {currentPage !== 'home' && !isLegalPage && (
        <div
          className={`w-full px-0 sm:px-4 md:px-6 pt-0 sm:pt-4 pb-0 relative z-40 ${
            currentPage === 'contact' ? '' : 'bg-white'
          }`}
          style={currentPage === 'contact' ? HERO_GRADIENT_STYLE : { background: '#ffffff' }}
        >
          <div className="relative w-full h-[94px]">
            <HeaderNav
              headingFontSize={headingFontSize}
              useCaslonFont={useCaslonFont}
            />
          </div>
        </div>
      )}

      {currentPage === 'about' && (
        <AboutPage useCaslonFont={useCaslonFont} />
      )}

      {(currentPage === 'work' || currentPage === 'projects') && (
        <ProjectsPage useCaslonFont={useCaslonFont} />
      )}

      {currentPage === 'services' && (
        <ServicesPage useCaslonFont={useCaslonFont} />
      )}

      {currentPage === 'courses' && (
        <CoursesPage />
      )}

      {currentPage === 'contact' && (
        <ContactPage useCaslonFont={useCaslonFont} />
      )}

      {currentPage === 'thank-you' && (
        <ThankYouPage />
      )}

      {currentPage === 'working-with-us' && (
        <WorkingWithUsPage />
      )}

      {currentPage === 'privacy-policy' && (
        <PrivacyPolicyPage />
      )}

      {currentPage === 'cookie-policy' && (
        <CookiePolicyPage />
      )}

      {currentPage === 'terms' && (
        <TermsPage />
      )}

      {/* "No spam. Just results." banner above footer on about page */}
      {currentPage === 'about' && (
        <ResultsStatement />
      )}

      {/* Minimalist Brand Footer */}
      <MinimalFooter />

      {/* Production-Ready Cookie Consent Banner & Preferences Modal */}
      <CookieConsentBanner />
    </main>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <MainAppContent />
    </NavigationProvider>
  );
}
