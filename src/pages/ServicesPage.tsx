import React, { useState } from 'react';
import shortFormEditingImg from '../assets/images/short_form_editing_1790434742662.jpg';
import { ArrowRight, Check, X, Send, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { HERO_GRADIENT_STYLE } from '../utils/theme';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  image?: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'We design and build modern, responsive websites for businesses, brands, creators and professionals — from landing pages and portfolios to business, restaurant, healthcare and custom websites.',
    deliverables: [
      'UI/UX design',
      'Responsive development',
      'Mobile optimization',
      'CMS integration',
      'Forms & WhatsApp integration',
      'SEO-ready structure',
      'Performance optimization',
      'Deployment & launch',
    ],
  },
  {
    number: '02',
    title: 'Shopify Development',
    description:
      'We build and customize Shopify stores for brands that want to sell online — from store setup and custom design to products, payments, integrations and launch.',
    deliverables: [
      'Shopify store setup',
      'Custom storefront design',
      'Theme customization',
      'Product & collection setup',
      'Payment & shipping setup',
      'Apps & integrations',
      'Mobile optimization',
      'SEO basics',
      'Analytics setup',
      'Store launch',
    ],
  },
  {
    number: '03',
    title: 'Short-form Video Editing',
    description:
      'We turn raw footage and ideas into engaging short-form videos for Instagram Reels, YouTube Shorts and other social platforms, designed to capture attention and communicate quickly.',
    deliverables: [
      'Reels & Shorts',
      'Strong hooks & pacing',
      'Captions & subtitles',
      'Motion graphics',
      'Transitions & effects',
      'Music & sound design',
      'Color correction',
      'Brand-focused editing',
    ],
  },
  {
    number: '04',
    title: 'LinkedIn Personal Branding',
    description:
      'We help founders, professionals and creators build a strong LinkedIn presence through strategic content, thoughtful writing and consistent visual communication.',
    deliverables: [
      'Profile positioning',
      'Content strategy',
      'LinkedIn post writing',
      'Carousels & visual content',
      'Personal brand voice',
      'Content calendar',
      'Thought-leadership content',
      'Scheduling & publishing support',
    ],
  },
  {
    number: '05',
    title: 'Email Marketing',
    description:
      'We create email campaigns that help businesses communicate with their audience, nurture leads and turn attention into action.',
    deliverables: [
      'Email strategy',
      'Campaign planning',
      'Email copywriting',
      'Newsletter design',
      'Promotional campaigns',
      'Welcome sequences',
      'Lead-nurture sequences',
      'CTA & conversion optimization',
      'Performance tracking',
    ],
  },
];

interface ServicesPageProps {
  useCaslonFont?: boolean;
}

export const ServicesPage: React.FC<ServicesPageProps> = () => {
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

  const fontStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 300,
  };

  const availableServiceOptions = [
    'Web Development',
    'Shopify Development',
    'Short-form Video Editing',
    'LinkedIn Branding',
    'Email Marketing',
    'Custom Project',
  ];

  const budgetOptions = [
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000 – ₹5,00,000',
    '₹5,00,000+',
  ];

  const toggleServiceOption = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

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
          _subject: 'New Typeface Project Enquiry',
          _template: 'table',
          _captcha: 'false',
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          budget: formData.budget,
          services: selectedServices.join(', '),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true || (result.message && result.message.toLowerCase().includes('activation')))) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', budget: '₹25,000 – ₹50,000', message: '' });
      } else {
        setErrorMessage(result.message || 'Something went wrong while submitting your enquiry. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again later.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFormData({ name: '', email: '', phone: '', budget: '₹25,000 – ₹50,000', message: '' });
  };

  return (
    <div
      className="w-full bg-white text-[#111111] min-h-screen py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 selection:bg-black selection:text-white"
      style={{
        background: '#ffffff',
        ...fontStyle,
      }}
    >
      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24 md:space-y-28">
        {/* Services Page Hero Header with Exact Hero Gradient */}
        <div
          className="w-full rounded-3xl sm:rounded-[40px] p-8 sm:p-12 md:p-16 border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-black relative overflow-hidden select-none no-copy"
          style={HERO_GRADIENT_STYLE}
        >
          <span className="text-[12px] uppercase tracking-widest font-semibold text-black/70 block mb-3 font-mono">
            Our Services & Capabilities
          </span>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              color: '#000000',
            }}
            className="text-[34px] xs:text-[44px] sm:text-[54px] md:text-[62px] text-black tracking-tight leading-[1.08] mb-4"
          >
            Websites, social media, and reel editing<span className="text-[#E0343F]">.</span>
          </h1>
          <p className="text-[17px] sm:text-[21px] text-black/85 leading-relaxed max-w-3xl font-light">
            Everything your brand needs to build authority, capture attention, and drive measurable revenue — engineered under one roof.
          </p>
        </div>

        {SERVICES_DATA.map((service) => (
          <article key={service.number} className="space-y-6 sm:space-y-8 no-copy">
            {/* Heading: 44px, Manrope, font weight 300, dark color */}
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 300,
                color: '#111111',
              }}
              className="text-[28px] xs:text-[34px] sm:text-[40px] md:text-[44px] text-[#111111] tracking-tight leading-[1.2]"
            >
              {service.number} — {service.title}
            </h2>

            {/* Visual preview image for Short-form Video Editing */}
            {service.number === '03' && (
              <div className="w-full my-4 sm:my-6 rounded-2xl overflow-hidden border border-black/10 shadow-[0_14px_36px_-6px_rgba(0,0,0,0.12)] bg-[#111111]">
                <img
                  src={shortFormEditingImg || "/short-form-editing.jpg"}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== `${window.location.origin}/short-form-editing.jpg`) {
                      target.src = '/short-form-editing.jpg';
                    }
                  }}
                  alt="Short-form video editing timeline with audio waveforms, cuts, transitions and sound effect annotations"
                  className="w-full h-auto object-cover max-h-[520px] rounded-2xl transition-transform duration-300 hover:scale-[1.01]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Description: 20px, Manrope, font weight 300 */}
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 300,
              }}
              className="text-[17px] sm:text-[20px] text-[#111111] leading-[1.6] max-w-4xl"
            >
              {service.description}
            </p>

            {/* Deliverables Subhead & List: 20px, Manrope, font weight 300 */}
            <div className="pt-2 sm:pt-4 space-y-3 sm:space-y-4">
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 300,
                  color: '#111111',
                }}
                className="text-[17px] sm:text-[20px] text-[#111111] leading-[1.6]"
              >
                We deliver:
              </h3>

              <ul className="space-y-1.5 sm:space-y-2">
                {service.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 300,
                    }}
                    className="text-[17px] sm:text-[20px] text-[#111111] leading-[1.6] flex items-start gap-2.5 sm:gap-3"
                  >
                    <span className="select-none text-[#111111] leading-[1.6] shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        {/* Small Box to Discuss with our Team & Customized Glass Morph Form */}
        <section className="pt-10 sm:pt-14 pb-8">
          {!showDiscussForm ? (
            /* Small Callout Box */
            <div
              className="w-full max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 text-center bg-[#F9FAFB] border border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              style={fontStyle}
            >
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 300,
                  color: '#111111',
                }}
                className="text-[26px] xs:text-[30px] sm:text-[36px] text-[#111111] tracking-tight leading-[1.2] mb-3"
              >
                Discuss with our team
              </h3>

              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 300,
                }}
                className="text-[16px] sm:text-[19px] text-[#4B5563] leading-[1.6] max-w-lg mx-auto mb-8"
              >
                Ready to bring your project to life? Let's talk through your ideas, goals, and timeline directly with our team.
              </p>

              <button
                type="button"
                onClick={() => setShowDiscussForm(true)}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 300,
                }}
                className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-[#111111] hover:bg-black text-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-[16px] sm:text-[18px]"
              >
                <span>Discuss with our team</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          ) : (
            /* Customized Form */
            <div
              className="w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-10 sm:px-12 bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.08)] transition-all duration-300 relative"
              style={fontStyle}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowDiscussForm(false)}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <form
                  action="https://formsubmit.co/infotypeface1411@gmail.com"
                  method="POST"
                  onSubmit={handleFormSubmit}
                  className="space-y-6 sm:space-y-7"
                >
                  {/* FormSubmit Configuration Options */}
                  <input type="hidden" name="_subject" value="New Typeface Project Enquiry" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="text-left pr-8">
                    <h3
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                        color: '#111111',
                      }}
                      className="text-[26px] xs:text-[30px] sm:text-[36px] text-[#111111] tracking-tight leading-[1.2] mb-2"
                    >
                      Discuss with our team
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="text-[15px] sm:text-[18px] text-[#6B7280] leading-[1.5]"
                    >
                      Share your details and project goals. We will reply within 24 hours.
                    </p>
                  </div>

                  {/* Submission Error Alert */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900 text-xs sm:text-sm flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="discuss-name"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="block text-[14px] sm:text-[16px] text-[#111111]"
                    >
                      Your Name *
                    </label>
                    <input
                      id="discuss-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#F9FAFB] hover:bg-white focus:bg-white border border-black/15 focus:border-black text-[#111111] placeholder:text-black/35 outline-none transition-all duration-200 text-[15px] sm:text-[17px]"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="discuss-email"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 300,
                        }}
                        className="block text-[14px] sm:text-[16px] text-[#111111]"
                      >
                        Email Address *
                      </label>
                      <input
                        id="discuss-email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 300,
                        }}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#F9FAFB] hover:bg-white focus:bg-white border border-black/15 focus:border-black text-[#111111] placeholder:text-black/35 outline-none transition-all duration-200 text-[15px] sm:text-[17px]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="discuss-phone"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 300,
                        }}
                        className="block text-[14px] sm:text-[16px] text-[#111111]"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="discuss-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 300,
                        }}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#F9FAFB] hover:bg-white focus:bg-white border border-black/15 focus:border-black text-[#111111] placeholder:text-black/35 outline-none transition-all duration-200 text-[15px] sm:text-[17px]"
                      />
                    </div>
                  </div>

                  {/* Estimated Budget (INR) Starting from 25,000 */}
                  <div className="space-y-2 text-left">
                    <div className="flex items-baseline justify-between">
                      <label
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 300,
                        }}
                        className="block text-[14px] sm:text-[16px] text-[#111111]"
                      >
                        Estimated Budget (INR) *
                      </label>
                      <span
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 300,
                        }}
                        className="text-[12px] sm:text-[13px] text-zinc-500"
                      >
                        Starting from ₹25,000
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {budgetOptions.map((tier) => {
                        const isSelected = formData.budget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: tier })}
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontWeight: 300,
                            }}
                            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[13px] sm:text-[15px] transition-all duration-200 cursor-pointer border ${
                              isSelected
                                ? 'bg-[#111111] text-white border-[#111111] shadow-xs font-normal'
                                : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] border-black/5'
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Services Selection Pills */}
                  <div className="space-y-2 text-left">
                    <label
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="block text-[14px] sm:text-[16px] text-[#111111]"
                    >
                      Services of Interest
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {availableServiceOptions.map((option) => {
                        const isSelected = selectedServices.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleServiceOption(option)}
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontWeight: 300,
                            }}
                            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[13px] sm:text-[15px] transition-all duration-200 cursor-pointer border ${
                              isSelected
                                ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                                : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] border-black/5'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="discuss-message"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="block text-[14px] sm:text-[16px] text-[#111111]"
                    >
                      Project Details / Message *
                    </label>
                    <textarea
                      id="discuss-message"
                      rows={4}
                      required
                      placeholder="Tell us about your brand, what you need built, and your expected timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#F9FAFB] hover:bg-white focus:bg-white border border-black/15 focus:border-black text-[#111111] placeholder:text-black/35 outline-none transition-all duration-200 resize-none text-[15px] sm:text-[17px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer text-[16px] sm:text-[18px] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowDiscussForm(false)}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="text-[14px] sm:text-[15px] text-[#111111]/70 hover:text-black transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Message */
                <div className="py-8 sm:py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 300,
                      color: '#111111',
                    }}
                    className="text-[24px] sm:text-[30px] text-[#111111] tracking-tight"
                  >
                    Inquiry Received
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 300,
                    }}
                    className="text-[16px] sm:text-[18px] text-[#4B5563] leading-relaxed max-w-md mx-auto"
                  >
                    Thank you, {formData.name || 'there'}! Our team has received your inquiry and will reach out to you within 24 hours.
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white transition-all cursor-pointer text-[14px] sm:text-[16px]"
                    >
                      Send another message
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDiscussForm(false)}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 300,
                      }}
                      className="px-6 py-2.5 rounded-full bg-black/10 hover:bg-black/15 text-[#111111] transition-all cursor-pointer text-[14px] sm:text-[16px]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
