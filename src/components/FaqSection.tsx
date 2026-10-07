import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, HelpCircle } from 'lucide-react';
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
      'We design and build websites, e-commerce stores, landing pages, and digital experiences, along with social media design and management.',
  },
  {
    id: 'faq-2',
    number: '02/',
    question: 'What makes your websites different?',
    answer:
      "We don't rely on templates. Every website is designed around your brand, audience, and goals combining thoughtful design, performance, and functionality.",
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

        {/* Accordion List */}
        <div className="space-y-3.5 no-copy">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openIds.has(faq.id);

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-black/20 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
                    : 'bg-[#FAFAF9] hover:bg-white border-black/10'
                }`}
              >
                {/* Accordion Header Button */}
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
                        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: isOpen ? 500 : 400,
                      }}
                      className="text-base sm:text-lg md:text-[19px] text-[#111111] leading-snug tracking-tight"
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-black text-white' : 'text-black/60 bg-black/[0.04]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-black/5">
                    <div className="sm:pl-9">
                      <p
                        style={{
                          fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          fontWeight: 300,
                        }}
                        className="text-black/85 text-sm sm:text-base leading-relaxed"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Assistance Callout */}
        <div className="mt-12 sm:mt-14 p-6 sm:p-7 rounded-2xl bg-[#FAFAF9] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#111111] font-manrope">
                Have a project or unique requirement?
              </h4>
              <p className="text-xs sm:text-sm text-black/70 mt-0.5 font-light">
                We're always happy to talk through ideas, timelines, and budgets.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('contact')}
            className="group px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer shadow-xs whitespace-nowrap"
          >
            <span>Ask a Question</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
