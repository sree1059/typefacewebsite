import React from 'react';
import { HeaderNav } from '../HeaderNav';
import { GradientBackground } from './GradientBackground';
import { ProductSwitcher } from './ProductSwitcher';

interface HeroSectionProps {
  headingFontSize?: number;
  useCaslonFont?: boolean;
}

/**
 * Recreated Hero Section matching the reference implementation.
 * Features:
 * - Centered max-width ~1200px container with rounded large corners
 * - Animated 400% SVG gradient track with 90px blur
 * - Inset HeaderNav
 * - Centered circular product switcher (Scheduling, Callie, Notetaker, Payments)
 * - 600ms cubic-bezier active indicator transition with animated white connector
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  headingFontSize,
  useCaslonFont,
}) => {
  return (
    <section
      id="home"
      aria-label="Calendly Solutions Showcase"
      className="relative w-full max-w-[1240px] mx-auto rounded-b-[32px] sm:rounded-[40px] md:rounded-[48px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] border border-black/[0.06] bg-[#FCFAF7]"
    >
      {/* 1. ANIMATED BLURRED GRADIENT BACKGROUND (400% Track with 90px Blur) */}
      <GradientBackground />

      {/* 2. INSET WHITE PRIMARY NAVIGATION BAR */}
      <div className="relative z-40 w-full flex justify-center">
        <HeaderNav
          headingFontSize={headingFontSize}
          useCaslonFont={useCaslonFont}
        />
      </div>

      {/* 3. HERO CONTENT CONTAINER (Responsive Padding, Proportions) */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-14 pt-32 xs:pt-36 sm:pt-40 md:pt-44 pb-12 sm:pb-16 md:pb-20 max-w-6xl mx-auto flex flex-col items-center">
        {/* Product Switcher with Circular Tabs & Dynamic Product Panels */}
        <ProductSwitcher initialProduct="scheduling" />
      </div>
    </section>
  );
};
