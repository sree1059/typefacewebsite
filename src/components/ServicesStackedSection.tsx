import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export interface ServiceCardData {
  id: string;
  title: string;
  isPopular?: boolean;
  timeline?: string;
  description: string;
  features: string[];
}

export const SERVICES_CATALOG: ServiceCardData[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    isPopular: true,
    timeline: '3–8 weeks',
    description:
      'Conversion-focused websites on Next.js for local businesses and B2B SaaS. Fast, accessible, SEO-ready, and easy to edit.',
    features: [
      'Custom design (no templates)',
      'Next.js + headless CMS',
      'Core Web Vitals 95+',
      'Conversion tracking & GA4',
      'Blog / resources module',
      'Stripe / CRM integrations',
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    description:
      'Reels-first content, UGC campaigns, community management, and paid ads across Instagram, TikTok, Facebook, and LinkedIn.',
    features: [
      'Weekly content calendar',
      'Short-form video production',
      'Paid creative + ad management',
      'UGC partnerships',
      'Community & DM management',
      'Monthly performance reports',
    ],
  },
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots & Automations',
    isPopular: true,
    description:
      'Custom chatbots trained on your business that answer FAQs, qualify leads, book calls, and take orders — with human handoff.',
    features: [
      'FAQ + knowledge base training',
      'Lead qualification flows',
      'Calendar + CRM integration',
      'Live agent handoff',
      'Deploy on site, IG DMs, WhatsApp',
      'Weekly intent tuning',
    ],
  },
  {
    id: 'seo-local-search',
    title: 'SEO & Local Search',
    description:
      'Rank higher on Google and Google Maps with technical SEO, local citations, review generation, and intent-focused content.',
    features: [
      'Technical SEO audit',
      'Google Business optimization',
      'Review generation flow',
      'Neighborhood / city landing pages',
      'Content calendar',
      'Link building outreach',
    ],
  },
  {
    id: 'paid-ads',
    title: 'Paid Ads',
    description:
      'Meta (Facebook/Instagram), Google Search, and LinkedIn ads managed for measurable lead-gen and revenue, not vanity clicks.',
    features: [
      'Creative strategy + testing',
      'Pixel + conversion API setup',
      'Audience building & lookalikes',
      'Weekly optimization',
      'Transparent ROAS dashboards',
      'Landing page recommendations',
    ],
  },
  {
    id: 'branding-design',
    title: 'Branding & Design',
    description:
      'Identity, logo, typography, and brand guidelines for founders who want to look as good as their product is.',
    features: [
      'Logo + lockups',
      'Color & type system',
      'Brand guidelines PDF',
      'Social templates',
      'Pitch deck / sales materials',
      'Figma source files',
    ],
  },
];

export const ServicesStackedSection: React.FC = () => {
  const { navigate } = useNavigation();

  const handleQuoteClick = () => {
    navigate('contact');
    window.history.pushState({}, '', '/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      aria-label="Services Catalog"
      className="w-full bg-white text-[#111111] py-20 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 select-none border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-16 md:mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-mono font-medium text-[#155EEF] bg-[#EFF6FF] border border-[#BFDBFE] mb-5 shadow-xs">
            Services
          </div>

          <h2
            style={{
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0B132B] tracking-tight leading-[1.12] mb-5"
          >
            Everything you need to grow,<br />
            <span className="bg-gradient-to-r from-[#155EEF] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              under one roof
            </span>
            <span className="text-[#E0343F]">.</span>
          </h2>

          <p
            style={{
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
            }}
            className="text-base sm:text-lg md:text-xl text-[#475569] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Pick one service or let us build an integrated plan across web, social, ads, and AI. Every engagement has clear deliverables, transparent pricing, and one accountable strategist.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_CATALOG.map((service) =>
            service.isPopular ? (
              /* Most Popular Card with Radiant Hero Section Gradient Outline */
              <div
                key={service.id}
                className="p-[2.5px] rounded-[24px] sm:rounded-[32px] bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_14px_40px_rgba(105,249,176,0.22)] hover:shadow-[0_20px_50px_rgba(85,220,255,0.32)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="w-full h-full bg-white rounded-[22px] sm:rounded-[30px] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Header: Badge & Timeline */}
                    <div className="flex items-center justify-between gap-2 mb-4 min-h-[26px]">
                      <span
                        style={{
                          background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                          color: '#000000',
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono tracking-wider uppercase font-bold shadow-xs"
                      >
                        <Sparkles className="w-3 h-3 text-black fill-black" />
                        Most popular
                      </span>

                      {service.timeline && (
                        <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-black/75 text-[11px] font-mono font-medium">
                          {service.timeline}
                        </span>
                      )}
                    </div>

                    {/* Service Title */}
                    <h3
                      style={{
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                      }}
                      className="text-2xl sm:text-[26px] text-[#0B132B] tracking-tight leading-snug mb-3"
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 300,
                      }}
                      className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6"
                    >
                      {service.description}
                    </p>

                    {/* Deliverables / Features List */}
                    <div className="pt-4 border-t border-black/10 space-y-2.5">
                      {service.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13px] text-black/80 font-normal leading-relaxed"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button: Get a custom quote (Redirects to contact page) */}
                  <div className="pt-8 mt-auto">
                    <button
                      onClick={handleQuoteClick}
                      style={{
                        background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                        color: '#000000',
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 600,
                      }}
                      className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm tracking-normal transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.98]"
                    >
                      <span>Get a custom quote</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Service Card */
              <div
                key={service.id}
                className="bg-[#F9FAFB] border border-black/10 hover:border-black/25 hover:shadow-md hover:-translate-y-1 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group"
              >
                <div>
                  {/* Header: Spacer & Timeline */}
                  <div className="flex items-center justify-between gap-2 mb-4 min-h-[26px]">
                    <span />
                    {service.timeline && (
                      <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-black/75 text-[11px] font-mono font-medium">
                        {service.timeline}
                      </span>
                    )}
                  </div>

                  {/* Service Title */}
                  <h3
                    style={{
                      fontFamily:
                        "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 600,
                      letterSpacing: '-0.025em',
                    }}
                    className="text-2xl sm:text-[26px] text-[#0B132B] tracking-tight leading-snug mb-3"
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily:
                        "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 300,
                    }}
                    className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6"
                  >
                    {service.description}
                  </p>

                  {/* Deliverables / Features List */}
                  <div className="pt-4 border-t border-black/10 space-y-2.5">
                    {service.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-black/80 font-normal leading-relaxed"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button: Get a custom quote (Redirects to contact page) */}
                <div className="pt-8 mt-auto">
                  <button
                    onClick={handleQuoteClick}
                    style={{
                      fontFamily:
                        "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 500,
                    }}
                    className="w-full py-3 sm:py-3.5 px-6 rounded-full text-xs sm:text-sm tracking-normal transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] bg-white hover:bg-black hover:text-white text-black border border-black/20 shadow-xs"
                  >
                    <span>Get a custom quote</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesStackedSection;
