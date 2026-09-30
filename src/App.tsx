import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { BannerHero } from './components/BannerHero';
import { DashboardCards } from './components/DashboardCards';
import { ServicesTicker } from './components/ServicesTicker';
import { StatementSection } from './components/StatementSection';
import { WhatWeCreateSection } from './components/WhatWeCreateSection';
import { HowWeWorkSection } from './components/HowWeWorkSection';
import { IdeaToInterfaceShowcase } from './components/IdeaToInterfaceShowcase';
import { FaqSection } from './components/FaqSection';
import { useLenis } from './hooks/useLenis';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';
import { MinimalFooter } from './components/MinimalFooter';

function MainAppContent() {
  const { currentPage } = useNavigation();

  // Heading font size & Caslon typography
  const [headingFontSize] = useState<number>(96);
  const [useCaslonFont] = useState<boolean>(true);
  const [showFullPage] = useState<boolean>(true);

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

  const isGradientPage =
    currentPage === 'home' ||
    currentPage === 'about' ||
    currentPage === 'work' ||
    currentPage === 'projects' ||
    currentPage === 'services' ||
    currentPage === 'contact';
  const isLegalPage = currentPage === 'privacy-policy' || currentPage === 'terms';

  // Protected /admin route handled by Supabase Auth
  if (currentPage === 'admin') {
    return <AdminPage />;
  }

  return (
    <main
      className={`min-h-screen w-full flex flex-col font-sans relative overflow-x-hidden ${
        isGradientPage || isLegalPage
          ? 'text-[#111111] selection:bg-black selection:text-white'
          : 'bg-black text-white selection:bg-white selection:text-black'
      }`}
      style={
        isGradientPage || isLegalPage
          ? { background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)' }
          : undefined
      }
    >
      {/* Dynamic Page Rendering */}
      {currentPage === 'home' && (
        <div
          className="w-full text-[#111111] flex flex-col"
          style={{
            background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)',
          }}
        >
          {/* Hero Section Container with Inset White Navigation matching original design */}
          <div className="w-full px-0 sm:px-4 md:px-6 pt-0 sm:pt-4">
            <section
              id="home"
              className="hero relative w-full overflow-hidden text-[#111111] flex flex-col justify-between pb-8"
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
              </div>
            </section>
          </div>

          {/* Services Ticker Marquee Animated with GSAP */}
          <ServicesTicker />

          {/* Statement Section with GSAP Word-Split Reveal */}
          <StatementSection useCaslonFont={useCaslonFont} />

          {/* Full Layout Matching Reference Image */}
          {showFullPage && (
            <>
              {/* From Idea to Interface Showcase (sphoorthi interiors, thrill hikers, mr pottel) */}
              <IdeaToInterfaceShowcase useCaslonFont={useCaslonFont} />

              {/* What We Create / Our Services Section (KERNING STROKE) */}
              <WhatWeCreateSection useCaslonFont={useCaslonFont} />

              {/* How We Work Section (Clean White Container, 4-Step Process with GSAP Muted Green Line) */}
              <HowWeWorkSection />

              {/* FAQ Accordion Section */}
              <FaqSection />
            </>
          )}
        </div>
      )}

      {/* Other Pages: Render Navbar in standalone top container with matching page background */}
      {currentPage !== 'home' && (
        <div
          className={`w-full px-0 sm:px-4 md:px-6 pt-0 sm:pt-4 pb-0 relative z-40 ${
            currentPage === 'about' || currentPage === 'services' || currentPage === 'work' || currentPage === 'projects' || currentPage === 'contact' || isLegalPage
              ? ''
              : 'bg-[#050505]'
          }`}
          style={
            currentPage === 'about' || currentPage === 'services' || currentPage === 'work' || currentPage === 'projects' || currentPage === 'contact' || isLegalPage
              ? { background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)' }
              : undefined
          }
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

      {currentPage === 'contact' && (
        <ContactPage useCaslonFont={useCaslonFont} />
      )}

      {currentPage === 'privacy-policy' && (
        <PrivacyPolicyPage />
      )}

      {currentPage === 'terms' && (
        <TermsPage />
      )}

      {/* Minimalist Brand Footer */}
      <MinimalFooter />
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
