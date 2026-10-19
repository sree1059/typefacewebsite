import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: string;
  companyName: string;
  metricBadge: string;
  quote: string;
  rating: number;
  initials: string;
  avatarColor: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'wellness-hospitals',
    authorName: 'Dr. K. Srinivas Rao',
    authorRole: 'Medical Director',
    companyName: 'Wellness Hospitals Nizamabad',
    metricBadge: '2x Patient Appointments',
    quote:
      'Before Typeface, people in Nizamabad could not find our hospital easily online. They fixed our website and brought us to the top of Google Maps. Our daily patient appointments have more than doubled.',
    rating: 5,
    initials: 'SR',
    avatarColor: 'bg-emerald-600',
  },
  {
    id: 'mr-pottel',
    authorName: 'Rajesh V. Reddy',
    authorRole: 'Founder & Managing Partner',
    companyName: 'Mr. Pottel',
    metricBadge: 'Daily Inbound Catering Calls',
    quote:
      'Our catering and table booking process became so simple for customers. The website opens instantly on mobile phones, and we get direct phone calls every day from Google without spending on ads.',
    rating: 5,
    initials: 'RR',
    avatarColor: 'bg-[#155EEF]',
  },
  {
    id: 'sphoorthi-interiors',
    authorName: 'Sphoorthi Varma',
    authorRole: 'Principal Architect & Founder',
    companyName: 'Sphoorthi Interiors',
    metricBadge: '12 Luxury Home Projects',
    quote:
      'Our interior photos and villa designs load instantly on phones. Clients see our work and immediately call us for consultations. We closed 12 high-value home projects within two months of launch.',
    rating: 5,
    initials: 'SV',
    avatarColor: 'bg-amber-600',
  },
  {
    id: 'thrill-hikers',
    authorName: 'Vikramaditya Sen',
    authorRole: 'Expeditions Lead & Co-Founder',
    companyName: 'Thrill Hikers',
    metricBadge: 'Zero Booking Drop-offs',
    quote:
      'Booking our weekend treks used to be confusing for people. Typeface made the booking process so easy that almost everyone who visits our site completes their booking without getting stuck.',
    rating: 5,
    initials: 'VS',
    avatarColor: 'bg-cyan-600',
  },
  {
    id: 'emitminds',
    authorName: 'Praneeth K.',
    authorRole: 'Head of Technology',
    companyName: 'EmitMinds',
    metricBadge: 'Live in 3 Weeks',
    quote:
      'They do not just talk — they build fast. Our new website went live in just three weeks, looks world-class, and brings us genuine business inquiries every single week.',
    rating: 5,
    initials: 'PK',
    avatarColor: 'bg-indigo-600',
  },
  {
    id: 'aranyam-amogham',
    authorName: 'Ananya Deshmukh',
    authorRole: 'Co-Founder & General Manager',
    companyName: 'Aranyam Amogham',
    metricBadge: 'Weekends Fully Booked',
    quote:
      'Reserving our nature villas and retreat packages is now completely smooth. Guests constantly tell us how clean and easy the website was when booking their weekend stay.',
    rating: 5,
    initials: 'AD',
    avatarColor: 'bg-teal-600',
  },
];

export const TestimonialCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items array to create a seamless infinite ticker track
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      aria-label="Client Feedback & Testimonials"
      className="relative w-full bg-white py-20 sm:py-24 md:py-28 overflow-hidden select-none border-b border-black/10"
    >
      {/* Subtle blueprint grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-12 sm:mb-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center px-4 py-1 rounded-full text-xs font-mono font-medium text-[#155EEF] bg-[#EFF6FF] border border-[#BFDBFE] mb-5 shadow-xs uppercase tracking-wider">
            CLIENT FEEDBACK &amp; RESULTS
          </div>

          <h2
            style={{
              fontFamily:
                "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#0B132B] tracking-tight leading-[1.12] mb-5"
          >
            Proof that our growth<br />
            <span className="bg-gradient-to-r from-[#155EEF] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              systems deliver revenue
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
            Direct feedback from founders and leaders behind our client flagships — from healthcare and hospitality to luxury architecture and eco-resorts.
          </p>
        </div>
      </div>

      {/* Ticker Container with Left & Right Gradient Fade Masks */}
      <div
        className="relative w-full overflow-hidden py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Fade Edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 bg-gradient-to-r from-white via-white/80 to-transparent" />

        {/* Right Fade Edge */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Ultra-slow moving ticker track using framer-motion */}
        <motion.div
          className="flex gap-6 sm:gap-8 w-max will-change-transform"
          animate={
            isPaused
              ? {}
              : {
                  x: ['0%', '-50%'],
                }
          }
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 135, // Ultra-slowest speed: peaceful smooth drift
              ease: 'linear',
            },
          }}
        >
          {duplicatedTestimonials.map((item, index) => (
            /* Card with Thin Radiant Hero Gradient Outline */
            <div
              key={`${item.id}-${index}`}
              className="p-[1px] rounded-[24px] sm:rounded-[28px] bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shrink-0 w-[320px] xs:w-[360px] sm:w-[400px] md:w-[440px] shadow-[0_8px_28px_rgba(105,249,176,0.10)] hover:shadow-[0_16px_40px_rgba(85,220,255,0.20)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col group cursor-grab active:cursor-grabbing"
            >
              <div className="w-full h-full bg-white rounded-[23px] sm:rounded-[27px] p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  {/* Top Bar: Metric Outcome Badge & 5-Star Rating */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      style={{
                        background:
                          'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                        color: '#000000',
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase shadow-xs"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-black" />
                      {item.metricBadge}
                    </span>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text in Simple, Plain, Clear English */}
                  <div className="relative mb-6">
                    <p
                      style={{
                        fontFamily:
                          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 400,
                        lineHeight: 1.65,
                      }}
                      className="text-xs sm:text-[13.5px] md:text-sm text-[#0B132B]/90"
                    >
                      “{item.quote}”
                    </p>
                  </div>
                </div>

                {/* Author Details Footer: Clean, Uncluttered, No extra boxes */}
                <div className="pt-4 border-t border-black/10 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${item.avatarColor} text-white font-mono font-semibold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {item.initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        style={{
                          fontFamily:
                            "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          fontWeight: 700,
                        }}
                        className="text-xs sm:text-sm text-[#0B132B] truncate"
                      >
                        {item.authorName}
                      </span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    </div>
                    <span className="text-[11px] text-black/60 font-light truncate">
                      {item.authorRole} · {item.companyName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
