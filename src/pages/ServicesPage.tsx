import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Send, AlertCircle, MessageSquare } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  isPopular?: boolean;
  timeline?: string;
  description: string;
  deliverables: string[];
}

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Development',
    isPopular: true,
    timeline: '3–8 weeks',
    description:
      'Conversion-focused websites on Next.js for local businesses and B2B SaaS. Fast, accessible, SEO-ready, and easy to edit.',
    deliverables: [
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
    number: '02',
    title: 'Social Media Management',
    description:
      'Reels-first content, UGC campaigns, community management, and paid ads across Instagram, TikTok, Facebook, and LinkedIn.',
    deliverables: [
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
    number: '03',
    title: 'AI Chatbots & Automations',
    isPopular: true,
    description:
      'Custom chatbots trained on your business that answer FAQs, qualify leads, book calls, and take orders — with human handoff.',
    deliverables: [
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
    number: '04',
    title: 'SEO & Local Search',
    description:
      'Rank higher on Google and Google Maps with technical SEO, local citations, review generation, and intent-focused content.',
    deliverables: [
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
    number: '05',
    title: 'Paid Ads',
    description:
      'Meta (Facebook/Instagram), Google Search, and LinkedIn ads managed for measurable lead-gen and revenue, not vanity clicks.',
    deliverables: [
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
    number: '06',
    title: 'Branding & Design',
    description:
      'Identity, logo, typography, and brand guidelines for founders who want to look as good as their product is.',
    deliverables: [
      'Logo + lockups',
      'Color & type system',
      'Brand guidelines PDF',
      'Social templates',
      'Pitch deck / sales materials',
      'Figma source files',
    ],
  },
];

interface ServicesPageProps {
  useCaslonFont?: boolean;
}

export const ServicesPage: React.FC<ServicesPageProps> = () => {
  const { navigate } = useNavigation();
  const [showDiscussForm, setShowDiscussForm] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(['Web Development']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '₹25,000 – ₹50,000',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableServiceOptions = [
    'Web Development',
    'Social Media Management',
    'AI Chatbots & Automations',
    'SEO & Local Search',
    'Paid Ads',
    'Branding & Design',
  ];

  const toggleServiceOption = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleCardQuoteClick = (serviceTitle: string) => {
    setSelectedServices([serviceTitle]);
    setShowDiscussForm(true);
    setTimeout(() => {
      document.getElementById('discuss-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formElement = e.currentTarget;
    const formPayload = new FormData(formElement);

    // Honeypot check
    const honey = formPayload.get('_honey');
    if (honey && typeof honey === 'string' && honey.trim().length > 0) {
      setIsSubmitted(true);
      return;
    }

    // Required fields check
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.budget.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/infotypeface1411@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'New Typeface Service Enquiry',
          _template: 'table',
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          budget: formData.budget,
          services: selectedServices.join(', '),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', budget: '₹25,000 – ₹50,000', message: '' });
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again later.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      className="w-full bg-[#FFFFFF] text-[#0B132B] min-h-screen py-10 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 selection:bg-black selection:text-white"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-28">
        
        {/* =========================================================
            1. HERO SECTION (Exact style matching user reference image)
            - Technical subtle blueprint grid background
            - Services centered pill badge
            - Hero section color palette & gradient on "under one roof."
            - Manrope font typography
            ========================================================= */}
        <div className="relative w-full rounded-3xl sm:rounded-[44px] py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 text-center overflow-hidden border border-black/[0.08] bg-[#FAFCFF] shadow-[0_12px_40px_rgba(0,0,0,0.03)] select-none">
          {/* Subtle blueprint grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '44px 44px',
            }}
          />

          {/* Ambient radial glow subtle highlights inspired by hero palette */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle, #79D0E8 0%, #69F9B0 50%, transparent 80%)',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-mono font-medium text-[#155EEF] bg-[#EFF6FF] border border-[#BFDBFE] mb-6 shadow-xs">
              Services
            </div>

            {/* Title with Hero Palette Gradient */}
            <h1 className="text-[36px] xs:text-[46px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-bold text-[#0B132B] tracking-tight leading-[1.08] mb-6">
              Everything you need to grow,<br />
              <span className="bg-gradient-to-r from-[#155EEF] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
                under one roof
              </span>
              <span className="text-[#E0343F]">.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#475569] font-light leading-relaxed max-w-2xl mx-auto">
              Pick one service or let us build an integrated plan across web, social, ads, and AI. Every engagement has clear deliverables, transparent pricing, and one accountable strategist.
            </p>
          </div>
        </div>

        {/* =========================================================
            2. SERVICES 6-CARD GRID (Manrope font & Hero Palette accents)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_CATALOG.map((service) =>
            service.isPopular ? (
              /* Most Popular Card with Radiant Thin Hero Section Gradient Outline */
              <div
                key={service.id}
                className="p-[1px] rounded-[24px] sm:rounded-[32px] bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_12px_36px_rgba(105,249,176,0.18)] hover:shadow-[0_18px_45px_rgba(85,220,255,0.26)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="w-full h-full bg-white rounded-[23px] sm:rounded-[31px] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Header: Most Popular Badge & Timeline */}
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
                    <h2 className="text-2xl sm:text-[26px] font-semibold text-[#0B132B] tracking-tight leading-snug mb-3">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6 min-h-[44px]">
                      {service.description}
                    </p>

                    {/* Deliverables / Features List */}
                    <div className="pt-4 border-t border-black/10 space-y-2.5">
                      {service.deliverables.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13px] text-black/85 font-normal leading-relaxed"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Most Popular Action Button with Hero Gradient */}
                  <div className="pt-8 mt-auto">
                    <button
                      onClick={() => handleCardQuoteClick(service.title)}
                      style={{
                        background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                        color: '#000000',
                        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
                  <h2 className="text-2xl sm:text-[26px] font-semibold text-[#0B132B] tracking-tight leading-snug mb-3">
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6 min-h-[44px]">
                    {service.description}
                  </p>

                  {/* Deliverables / Features List */}
                  <div className="pt-4 border-t border-black/10 space-y-2.5">
                    {service.deliverables.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-black/85 font-normal leading-relaxed"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standard Action Button */}
                <div className="pt-8 mt-auto">
                  <button
                    onClick={() => handleCardQuoteClick(service.title)}
                    className="w-full py-3 sm:py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-normal transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] bg-white hover:bg-black hover:text-white text-black border border-black/20 shadow-xs"
                  >
                    <span>Get a custom quote</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* =========================================================
            3. DISCUSS WITH OUR TEAM / CUSTOM QUOTE FORM
            ========================================================= */}
        <section id="discuss-section" className="pt-6 sm:pt-10 pb-8">
          {!showDiscussForm ? (
            /* Discuss With Our Team Card with Radiant Hero Section Gradient Outline */
            <div className="w-full max-w-2xl mx-auto p-[2.5px] rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_16px_45px_rgba(105,249,176,0.25)] hover:shadow-[0_20px_60px_rgba(85,220,255,0.35)] transition-all duration-300">
              <div className="w-full h-full rounded-[26px] sm:rounded-[34px] p-8 sm:p-12 text-center bg-white">
                <h3 className="text-[26px] xs:text-[30px] sm:text-[36px] text-[#0B132B] tracking-tight leading-[1.2] mb-3 font-semibold">
                  Discuss with our team<span className="text-[#E0343F]">.</span>
                </h3>

                <p className="text-[15px] sm:text-[17px] text-black/75 leading-relaxed max-w-lg mx-auto font-light mb-8">
                  Ready to take your online presence forward? Tell us about your goals and we'll reply within 24 hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Action button with Hero Section Gradient */}
                  <button
                    type="button"
                    onClick={() => setShowDiscussForm(true)}
                    style={{
                      background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                      color: '#000000',
                      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 600,
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-sm hover:shadow-md hover:brightness-105 transition-all duration-200 cursor-pointer active:scale-[0.98] group"
                  >
                    <span>Start a Conversation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigate('contact');
                      window.history.pushState({}, '', '/contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black border border-black/20 text-sm sm:text-base font-medium shadow-xs hover:bg-black/5 transition-all duration-200 cursor-pointer"
                  >
                    <span>Visit Contact Page</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto p-[2.5px] rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_20px_60px_rgba(85,220,255,0.25)] transition-all duration-300">
              <div className="w-full h-full rounded-[26px] sm:rounded-[34px] p-8 sm:p-12 bg-white">
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#155EEF] block mb-2 font-mono">
                  Get a Custom Quote
                </span>
                <h3 className="text-3xl sm:text-4xl font-semibold text-[#0B132B] tracking-tight">
                  Tell us about your project<span className="text-[#E0343F]">.</span>
                </h3>
                <p className="text-sm sm:text-base text-black/70 font-light mt-2">
                  Select your desired services and share brief details. We'll review and get back within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-semibold text-black">Thank you!</h4>
                  <p className="text-sm sm:text-base text-black/70 max-w-md mx-auto">
                    We've received your request and will reach out with a personalized quote shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  {/* Service selector pills */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-2.5">
                      Select Services:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableServiceOptions.map((opt) => {
                        const isSelected = selectedServices.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => toggleServiceOption(opt)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-black text-white'
                                : 'bg-black/5 hover:bg-black/10 text-black/80'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                        Expected Budget *
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm bg-white"
                      >
                        <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                        <option value="₹1,00,000 – ₹2,50,000">₹1,00,000 – ₹2,50,000</option>
                        <option value="₹2,50,000+">₹2,50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                      Project Details *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you're looking to build or achieve..."
                      className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDiscussForm(false)}
                      className="text-xs text-black/60 hover:text-black underline font-mono"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                        color: '#000000',
                        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 600,
                      }}
                      className="px-8 py-3 rounded-full text-sm font-semibold tracking-normal shadow-sm hover:shadow-md hover:brightness-105 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default ServicesPage;
