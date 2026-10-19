import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Lock, Code2, Cpu, Search, HelpCircle } from 'lucide-react';
import { CourseEnrollModal, CourseData } from '../components/CourseEnrollModal';
import { useNavigation } from '../context/NavigationContext';

export const COURSES_CATALOG: CourseData[] = [
  {
    id: 'nextjs-growth-eng',
    title: 'Next.js & Full-Stack Growth Engineering',
    priceInr: 4999,
    duration: '4-Week Live Cohort',
    badge: '★ Most Popular',
    description:
      'Ship production-ready Next.js web applications, headless CMS architectures, conversion flows, and automated deployments on Vercel.',
    deliverables: [
      'Next.js App Router, Turbopack & React 19 architecture',
      'Real-time database schemas & Supabase/PostgreSQL',
      'Payment gateway integration (Razorpay & Stripe)',
      'Core Web Vitals 98+ & conversion-tuned UI/UX',
      'Production deployment to Vercel & custom domains',
      'Private community & live cohort code reviews',
    ],
  },
  {
    id: 'ai-agent-automation',
    title: 'AI Automations & Chatbot Architecture',
    priceInr: 5999,
    duration: '3-Week Intensive',
    badge: 'Advanced Systems',
    description:
      'Build autonomous AI agents and customer-facing chatbots trained on proprietary business data that book calls, answer queries, and qualify leads.',
    deliverables: [
      'Context-aware RAG pipelines using Google GenAI SDK',
      'Deploy on website, WhatsApp, & Instagram DMs',
      'Lead qualification flows with CRM & calendar sync',
      'Human-in-the-loop agent handoff routing',
      'Token tracking, rate limiting & error recovery',
      'Full source code templates with commercial license',
    ],
  },
  {
    id: 'llm-discovery-seo',
    title: 'SEO, AEO & LLM Discovery Engine Playbook',
    priceInr: 3499,
    duration: 'Self-Paced + Bi-Weekly Q&A',
    badge: 'Growth Engine',
    description:
      'The modern playbook to get cited and recommended by ChatGPT, Google SGE, Perplexity, and Reddit, turning algorithmic attention into customers.',
    deliverables: [
      'Technical SEO audits & semantic structuring',
      'Reverse-engineering LLM retrieval & citation logic',
      'Google Business optimization & local map rankings',
      'Programmatic landing page generation frameworks',
      'Schema.org JSON-LD structured data implementation',
      'Monthly search algorithm teardowns & action guides',
    ],
  },
];

export const CoursesPage: React.FC = () => {
  const { navigate } = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnrollClick = (course: CourseData) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div
      style={{
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      className="w-full bg-[#FFFFFF] text-[#0B132B] min-h-screen py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 selection:bg-black selection:text-white select-none"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 md:space-y-24">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-mono font-medium text-[#155EEF] bg-[#EFF6FF] border border-[#BFDBFE] mb-5 shadow-xs uppercase tracking-wider">
            TYPEFACE ACADEMY · PAID COURSES
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0B132B] tracking-tight leading-[1.1] mb-5">
            Engineering &amp; Growth Systems.<br />
            <span className="bg-gradient-to-r from-[#155EEF] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              Built for Founders &amp; Builders
            </span>
            <span className="text-[#E0343F]">.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#475569] font-light leading-relaxed max-w-2xl mx-auto">
            Practical, code-first cohorts and technical masterclasses. Secure payments via Razorpay Standard Checkout (UPI, Cards, NetBanking).
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-black/60">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> Razorpay Test &amp; Live Checkout
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Server Verified Payments
            </span>
          </div>
        </div>

        {/* 3 Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COURSES_CATALOG.map((course) => {
            const isPopular = course.id === 'nextjs-growth-eng';

            return isPopular ? (
              /* Popular Course with Radiant Thin Hero Gradient Outline */
              <div
                key={course.id}
                className="p-[1px] rounded-[24px] sm:rounded-[32px] bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_12px_36px_rgba(105,249,176,0.18)] hover:shadow-[0_18px_45px_rgba(85,220,255,0.26)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="w-full h-full bg-white rounded-[23px] sm:rounded-[31px] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Header: Badge & Duration */}
                    <div className="flex items-center justify-between gap-2 mb-4 min-h-[26px]">
                      <span
                        style={{
                          background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                          color: '#000000',
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono tracking-wider uppercase font-bold shadow-xs"
                      >
                        <Sparkles className="w-3 h-3 text-black fill-black" />
                        {course.badge}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-black/75 text-[11px] font-mono font-medium">
                        {course.duration}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-2xl sm:text-[26px] font-bold text-[#0B132B] tracking-tight leading-snug mb-2 font-manrope">
                      {course.title}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] font-manrope tracking-tight">
                        ₹{course.priceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-black/50 font-mono">one-time enrollment</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6">
                      {course.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="pt-4 border-t border-black/10 space-y-2.5">
                      {course.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13px] text-black/85 font-normal leading-relaxed"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enroll Action Button with Hero Gradient */}
                  <div className="pt-8 mt-auto">
                    <button
                      onClick={() => handleEnrollClick(course)}
                      style={{
                        background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                        color: '#000000',
                        fontWeight: 600,
                      }}
                      className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm tracking-normal transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:brightness-105 active:scale-95"
                    >
                      <span>Enroll with Razorpay (₹{course.priceInr.toLocaleString('en-IN')})</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Course Card */
              <div
                key={course.id}
                className="bg-[#F9FAFB] border border-black/10 hover:border-black/25 hover:shadow-md hover:-translate-y-1 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group"
              >
                <div>
                  {/* Header: Badge & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4 min-h-[26px]">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-black/80 text-[10.5px] font-mono font-medium">
                      {course.badge}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-black/75 text-[11px] font-mono font-medium">
                      {course.duration}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-2xl sm:text-[26px] font-bold text-[#0B132B] tracking-tight leading-snug mb-2 font-manrope">
                    {course.title}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] font-manrope tracking-tight">
                      ₹{course.priceInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-black/50 font-mono">one-time enrollment</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="pt-4 border-t border-black/10 space-y-2.5">
                    {course.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-black/85 font-normal leading-relaxed"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standard Enroll Button */}
                <div className="pt-8 mt-auto">
                  <button
                    onClick={() => handleEnrollClick(course)}
                    className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-normal transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 bg-white hover:bg-black hover:text-white text-black border border-black/20 shadow-xs"
                  >
                    <span>Enroll with Razorpay (₹{course.priceInr.toLocaleString('en-IN')})</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Architecture & Questions Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FAFAFA] border border-black/10 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-[#0B132B] font-manrope">
                How Typeface Razorpay Payments Work
              </h4>
              <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
                When you click <strong>Enroll with Razorpay</strong>, our secure backend API generates a cryptographic order through Razorpay. You can complete checkout using UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, or NetBanking. Once the gateway responds, our server cryptographically verifies the SHA-256 HMAC signature before unlocking course access.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-black/60">
                <span>• Test Mode Enabled</span>
                <span>• Strict Server-Side Signature Verification</span>
                <span>• No Secrets Exposed to Client</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Razorpay Checkout Modal */}
      <CourseEnrollModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CoursesPage;
