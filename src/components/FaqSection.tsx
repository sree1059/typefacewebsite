import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, HelpCircle, Calendar } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    number: '01/',
    question: 'What services do you offer?',
    answer:
      'We build high-performance websites, custom web applications, e-commerce stores, and digital experiences, along with technical design systems and ongoing engineering support.',
  },
  {
    id: 'faq-2',
    number: '02/',
    question: 'What makes your websites different?',
    answer:
      "We don't rely on templates. As a developer house, every digital product is custom-engineered around your brand, architecture, and business goals — combining thoughtful design, performance, and functionality.",
  },
  {
    id: 'faq-3',
    number: '03/',
    question: 'Do you offer post-launch support?',
    answer:
      'Yes. Every website includes 30 days of free post-launch updates for minor changes and fixes. After that, ongoing maintenance is optional and available at ₹3K/month for clients who want continued updates and support.',
  },
  {
    id: 'faq-4',
    number: '04/',
    question: 'How does pricing work?',
    answer:
      'We price by scope, not by the hour. Landing pages range from ₹6K–25K, full websites from ₹40K–80K, and custom Shopify stores start from ₹50K. Payment is split 50/50, 50% upfront and 50% before launch.',
  },
  {
    id: 'faq-5',
    number: '05/',
    question: 'Do we own what you build?',
    answer:
      "Entirely. At handover, you receive everything you need website files, credentials, domain, hosting, database, and admin access. We don't lock your business into our systems. Third-party services are billed directly to you; we never add a markup.",
  },
];

export const FaqSection: React.FC = () => {
  const { navigate } = useNavigation();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1']));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="w-full bg-white text-[#111111] py-20 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 relative overflow-hidden border-b border-black/10 select-none"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14 no-copy">
          <span className="text-xs uppercase tracking-widest font-semibold text-black/60 block mb-2 font-mono">
            Frequently Asked Questions
          </span>
          <h2
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight"
          >
            Clear answers. No hidden clauses<span className="text-[#E0343F]">.</span>
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
            }}
            className="mt-3 text-black/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Everything you need to know about our services, pricing structure, deliverables, and ownership.
          </p>
        </div>

        {/* Accordion List with Hero Section Gradient Outlines */}
        <div className="space-y-4 no-copy">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openIds.has(faq.id);

            return isOpen ? (
              /* Active/Open FAQ Card with Thin Hero Section Gradient Outline */
              <div
                key={faq.id}
                className="p-[1px] rounded-2xl bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_8px_30px_rgba(85,220,255,0.18)] transition-all duration-300"
              >
                <div className="w-full bg-white rounded-[15px] overflow-hidden">
                  {/* Accordion Header Button */}
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                      <span className="text-xs sm:text-sm font-mono text-[#0A7080] font-semibold pt-0.5 sm:pt-0 shrink-0">
                        {faq.number}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          fontWeight: 600,
                        }}
                        className="text-base sm:text-lg md:text-[19px] text-[#0B132B] leading-snug tracking-tight"
                      >
                        {faq.question}
                      </span>
                    </div>

                    <div
                      style={{
                        background:
                          'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                        color: '#000000',
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 rotate-180 shadow-xs"
                    >
                      <ChevronDown className="w-4 h-4 text-black" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-black/5">
                    <div className="sm:pl-9">
                      <p
                        style={{
                          fontFamily:
                            "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          fontWeight: 300,
                        }}
                        className="text-black/85 text-sm sm:text-base leading-relaxed"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Closed FAQ Card with Subtle Gradient Hover Border */
              <div
                key={faq.id}
                className="p-[1.5px] rounded-2xl bg-transparent hover:bg-gradient-to-r hover:from-[#55DCFF]/50 hover:via-[#69F9B0]/50 hover:to-[#FFE600]/50 transition-all duration-300"
              >
                <div className="w-full bg-[#FAFAF9] hover:bg-white rounded-[14.5px] border border-black/10 overflow-hidden transition-colors">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                      <span className="text-xs sm:text-sm font-mono text-black/60 pt-0.5 sm:pt-0 shrink-0 font-medium">
                        {faq.number}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          fontWeight: 400,
                        }}
                        className="text-base sm:text-lg md:text-[19px] text-[#111111] leading-snug tracking-tight"
                      >
                        {faq.question}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 transition-transform duration-300 text-black/60 bg-black/[0.04]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            "Have a project or unique requirement?" Box
            With Hero Section Gradient Outline & Book Consultation button
            ========================================================= */}
        <div className="mt-14 sm:mt-16 p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_12px_40px_rgba(105,249,176,0.18)] transition-all duration-300 hover:shadow-[0_18px_50px_rgba(85,220,255,0.28)]">
          <div className="w-full h-full rounded-[15px] sm:rounded-[23px] p-7 sm:p-9 bg-white flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div
                style={{
                  background:
                    'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                  color: '#000000',
                }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
              >
                <HelpCircle className="w-6 h-6 text-black" />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-semibold text-[#0B132B] font-manrope tracking-tight">
                  Have a project or unique requirement<span className="text-[#E0343F]">.</span>
                </h4>
                <p className="text-sm sm:text-[15px] text-black/70 mt-1 font-light max-w-md">
                  We're always happy to talk through architecture, sprint timelines, custom features, and budgets.
                </p>
              </div>
            </div>

            {/* Actions: Book Consultation & Ask a Question */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              {/* Book Consultation Button with Hero Gradient */}
              <button
                type="button"
                onClick={() => {
                  navigate('contact');
                  window.history.pushState({}, '', '/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background:
                    'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                  color: '#000000',
                  fontFamily:
                    "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 600,
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm tracking-normal shadow-sm hover:shadow-md hover:brightness-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Consultation</span>
              </button>

              {/* Ask a Question Button */}
              <button
                type="button"
                onClick={() => {
                  navigate('contact');
                  window.history.pushState({}, '', '/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-black hover:text-white text-black border border-black/20 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-xs whitespace-nowrap group"
              >
                <span>Ask a Question</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
