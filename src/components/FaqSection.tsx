import React, { useState } from 'react';
import { ChevronDown, Sparkles, ArrowUpRight, HelpCircle } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface FaqItem {
  id: string;
  category: 'Strategy' | 'Engineering' | 'Security' | 'Engagement';
  question: string;
  answer: string;
  keyHighlight?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Strategy',
    question: 'What distinguishes Typeface from traditional management consulting or standard dev shops?',
    answer: 'Traditional consultancies deliver high-level slide decks without production execution, while engineering agencies build features without commercial rigor. Typeface merges senior board-level corporate strategy with elite creative engineering. Every solution is designed to generate measurable revenue expansion or defensible operational cost reduction.',
    keyHighlight: 'Direct partner-led execution with zero junior-associate handoff.',
  },
  {
    id: 'faq-2',
    category: 'Security',
    question: 'How do you guarantee client data privacy, proprietary IP ownership, and enterprise compliance?',
    answer: 'All intellectual property, proprietary training weights, and customer data remain 100% owned by your organization. We engineer strictly zero-data-retention pipelines, air-gapped on-premise deployments, or dedicated virtual private clouds (VPC). We adhere to SOC 2 Type II, ISO/IEC 42001, and GDPR governance frameworks.',
    keyHighlight: 'Zero public model training on your proprietary corporate intelligence.',
  },
  {
    id: 'faq-3',
    category: 'Engineering',
    question: 'Can you integrate modern generative AI and autonomous agents into legacy enterprise architecture?',
    answer: 'Yes. Over 70% of our enterprise engagements involve modernizing or interfacing with legacy ERPs, relational databases (SQL/Oracle), CRM systems (Salesforce/SAP), and proprietary internal tools through secure REST/gRPC API meshes, vector caches, and micro-orchestration layers.',
    keyHighlight: 'Seamless integration without requiring risky, multi-year legacy rewrites.',
  },
  {
    id: 'faq-4',
    category: 'Engagement',
    question: 'What does a typical timeline and engagement structure look like?',
    answer: 'We operate in high-velocity agile sprints. Typically, an initial 2-week Strategic Discovery & Architecture Sprint maps high-leverage opportunities and risk vectors. This is followed by a 6-to-12 week Production Build & Deployment Sprint delivering live, validated AI systems into production.',
    keyHighlight: 'Tangible functional milestone delivery within the first 14 business days.',
  },
  {
    id: 'faq-5',
    category: 'Strategy',
    question: 'How do you measure and validate business ROI from an AI implementation?',
    answer: 'Before writing a single line of code, we define concrete financial KPIs: hours saved per operational workflow, pipeline conversion acceleration, automated support resolution rates, or direct gross profit impact. We instrument real-time telemetry dashboards so leadership can track compounding ROI post-launch.',
    keyHighlight: 'Clear, transparent quantitative metrics tied directly to EBIT impact.',
  },
  {
    id: 'faq-6',
    category: 'Engagement',
    question: 'Do we need an internal machine learning or data science team before working with you?',
    answer: 'Not at all. We frequently partner with non-technical executive teams to serve as their strategic AI division. For organizations with existing data teams, we work side-by-side with your technical leads, mentoring and upskilling your engineers so your team seamlessly owns the codebase post-handover.',
    keyHighlight: 'Comprehensive handover documentation and engineering enablement included.',
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
    <section className="w-full text-[#111111] py-20 sm:py-28 px-4 sm:px-8 md:px-12 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-50/20 via-white/30 to-orange-50/20 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14 no-copy">
          <h2
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 320,
              letterSpacing: '-0.02em',
            }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight"
          >
            Clarity for Forward-Thinking Leaders
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 300,
            }}
            className="mt-3.5 text-[#111111]/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Answers to common questions regarding enterprise AI deployment, proprietary governance, timeline expectations, and capital returns.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 no-copy">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIds.has(faq.id);
            const indexNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white/90 border-black/20 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md'
                    : 'bg-white/55 hover:bg-white/75 border-black/10 backdrop-blur-xs'
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-5">
                    <span
                      style={{
                        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 400,
                      }}
                      className="text-xs sm:text-sm font-mono text-[#c48906] pt-0.5 sm:pt-0 shrink-0 font-medium"
                    >
                      {indexNumber}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: isOpen ? 500 : 350,
                      }}
                      className="text-base sm:text-lg md:text-[19px] text-[#111111] leading-snug tracking-tight"
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-black/10 text-[#111111]' : 'text-[#111111]/60 bg-black/[0.03]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-black/5">
                    <div className="sm:pl-10">
                      <p
                        style={{
                          fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          fontWeight: 300,
                        }}
                        className="text-[#111111]/80 text-sm sm:text-base leading-relaxed"
                      >
                        {faq.answer}
                      </p>

                      {faq.keyHighlight && (
                        <div className="mt-4 flex items-center gap-2.5 text-xs sm:text-sm text-[#996500] bg-[#fff9e6] border border-[#f2d072]/60 rounded-xl px-3.5 py-2.5 max-w-fit">
                          <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#c48906]" />
                          <span
                            style={{
                              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                              fontWeight: 400,
                            }}
                          >
                            Key Standard: {faq.keyHighlight}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Assistance Callout */}
        <div className="mt-14 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-[#f8f8f8] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#c48906] shrink-0 shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 500,
                }}
                className="text-base text-[#111111]"
              >
                Have a proprietary or unique inquiry?
              </h4>
              <p
                style={{
                  fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 300,
                }}
                className="text-xs sm:text-sm text-[#111111]/70 mt-0.5"
              >
                Speak directly with our senior technology partners under NDA.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('services')}
            style={{
              fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 400,
            }}
            className="group px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#222222] text-white text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer shadow-sm"
          >
            <span>Consult With Us</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
