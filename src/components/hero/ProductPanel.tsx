import React, { useState } from 'react';
import { ProductType } from './AnimatedProductIcon';
import {
  Calendar,
  Check,
  Clock,
  Sparkles,
  CreditCard,
  FileText,
  ArrowRight,
  ShieldCheck,
  Video,
  ChevronRight,
  User,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ProductPanelProps {
  activeProduct: ProductType;
  id: string;
}

export const ProductPanel: React.FC<ProductPanelProps> = ({ activeProduct, id }) => {
  const { navigate } = useNavigation();
  // Scheduling demo interactive state
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Callie AI chat interactive state
  const [aiSlotBooked, setAiSlotBooked] = useState<string | null>(null);

  // Notetaker interactive state
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    task1: true,
    task2: true,
    task3: false,
  });

  const toggleTask = (key: string) => {
    setCheckedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Payments interactive state
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={`tab-${activeProduct}`}
      className="w-full transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {/* 2-Column Responsive Layout: Left Headline & CTAs, Right Interactive Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ================================================================= */}
        {/* LEFT COLUMN: Narrative, Dynamic Copy, & Action Buttons            */}
        {/* ================================================================= */}
        <div className="lg:col-span-5 text-left space-y-5 sm:space-y-6">
          {/* Active Product Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-black/10 text-xs font-semibold tracking-wider text-[#111111] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B5E61D] shadow-[0_0_6px_#B5E61D]" />
            <span className="uppercase tracking-widest text-[11px]">
              {activeProduct === 'scheduling' && 'Automated Scheduling'}
              {activeProduct === 'callie' && 'Callie · AI Assistant'}
              {activeProduct === 'notetaker' && 'AI Meeting Notetaker'}
              {activeProduct === 'payments' && 'Integrated Payments'}
            </span>
          </div>

          {/* Dynamic Headline */}
          <h2 className="text-[32px] xs:text-[40px] sm:text-[48px] md:text-[54px] font-extrabold text-[#111111] tracking-tight leading-[1.08] font-manrope">
            {activeProduct === 'scheduling' && (
              <>
                Easy scheduling <br />
                <span className="text-[#111111]/80">ahead.</span>
              </>
            )}
            {activeProduct === 'callie' && (
              <>
                Meet Callie: <br />
                <span className="text-[#111111]/80">your AI copilot.</span>
              </>
            )}
            {activeProduct === 'notetaker' && (
              <>
                Never miss a detail <br />
                <span className="text-[#111111]/80">with AI notes.</span>
              </>
            )}
            {activeProduct === 'payments' && (
              <>
                Collect payments <br />
                <span className="text-[#111111]/80">at booking.</span>
              </>
            )}
          </h2>

          {/* Dynamic Descriptive Subtitle */}
          <p className="text-[15px] sm:text-[17px] text-[#2D3748] leading-relaxed font-light max-w-xl">
            {activeProduct === 'scheduling' &&
              'Eliminate back-and-forth emails. Connect your calendar, configure your availability windows, and let clients book instantly in just a few taps.'}
            {activeProduct === 'callie' &&
              'Automate client coordination with natural language. Callie checks multiple calendars, recommends optimal time slots, and schedules meetings for you.'}
            {activeProduct === 'notetaker' &&
              'Stay 100% focused on conversation. AI Notetaker joins your call, captures real-time summaries, highlights key takeaways, and logs tasks to your CRM.'}
            {activeProduct === 'payments' &&
              'Protect your time and reduce no-shows to zero. Collect upfront consultation fees, deposits, or session payments seamlessly via Stripe and Apple Pay.'}
          </p>

          {/* Dynamic CTAs */}
          <div className="pt-2 flex items-center gap-3 sm:gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => {
                navigate('contact');
                window.history.pushState({}, '', '/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 sm:px-7 py-3 rounded-full bg-[#111111] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('contact');
                window.history.pushState({}, '', '/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 sm:px-6 py-3 rounded-full bg-white/80 hover:bg-white text-[#111111] text-sm sm:text-base font-semibold border border-black/10 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              Explore {activeProduct === 'callie' ? 'AI Features' : activeProduct === 'notetaker' ? 'Transcripts' : activeProduct === 'payments' ? 'Stripe Checkout' : 'Workflows'}
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: Interactive High-Fidelity Product Preview Card      */}
        {/* ================================================================= */}
        <div className="lg:col-span-7 w-full flex justify-center">
          <div className="w-full max-w-[560px] bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-black/[0.08] backdrop-blur-md relative overflow-hidden transition-all duration-500">
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B5E61D] via-[#A9C8EE] to-[#C9A9F0]" />

            {/* TAB 1: SCHEDULING CARD */}
            {activeProduct === 'scheduling' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Host Info Header */}
                <div className="flex items-center justify-between pb-5 border-b border-black/5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center font-semibold text-base shadow-sm">
                      TB
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-bold text-[#111111] m-0">
                        Typeface Strategy Session
                      </h4>
                      <p className="text-xs text-[#6B7280] m-0 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-[#B5E61D] stroke-[2.5]" />
                        <span>30 mins</span>
                        <span>·</span>
                        <Video className="w-3.5 h-3.5 text-blue-500" />
                        <span>Google Meet</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#B5E61D]/20 text-[#111111] font-semibold text-[11px]">
                    Available Today
                  </span>
                </div>

                {/* Interactive Time Slot Selector */}
                <div className="space-y-3 text-left">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                    Select an available slot (October 2026)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['9:00 AM', '10:30 AM', '1:30 PM', '3:00 PM'].map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setSelectedSlot(slot);
                            setBookingConfirmed(false);
                          }}
                          className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-center ${
                            isSelected
                              ? 'bg-[#111111] text-white shadow-md ring-2 ring-[#B5E61D]'
                              : 'bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#111111] border border-black/5'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Instant Booking Trigger */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingConfirmed(true);
                      setTimeout(() => {
                        navigate('contact');
                        window.history.pushState({}, '', '/contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 500);
                    }}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#111111] hover:bg-black text-white text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    {bookingConfirmed ? (
                      <>
                        <Check className="w-4 h-4 text-[#B5E61D]" />
                        <span>Slot Reserved for {selectedSlot}!</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Booking for {selectedSlot}</span>
                        <ChevronRight className="w-4 h-4 text-[#B5E61D]" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#6B7280] text-center mt-2.5">
                    Free calendar invites and reminders will be emailed automatically.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: CALLIE AI COPILOT CARD */}
            {activeProduct === 'callie' && (
              <div className="space-y-5 animate-in fade-in duration-300 text-left">
                {/* Callie Header */}
                <div className="flex items-center justify-between pb-4 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#111111] to-[#333333] text-[#B5E61D] flex items-center justify-center shadow-xs">
                      <Sparkles className="w-5 h-5 fill-[#B5E61D]/20" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111111] m-0 flex items-center gap-1.5">
                        <span>Callie</span>
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#B5E61D] text-black font-semibold">
                          AI Live
                        </span>
                      </h4>
                      <p className="text-xs text-[#6B7280] m-0">
                        Intelligent Calendar Coordination
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#6B7280]">Response: &lt;1s</span>
                </div>

                {/* Conversational AI Thread */}
                <div className="space-y-3">
                  {/* Incoming Guest Message */}
                  <div className="p-3.5 rounded-2xl bg-[#F3F4F6] text-xs text-[#111111] space-y-1">
                    <span className="font-semibold text-[10.5px] uppercase tracking-wider text-[#6B7280] block">
                      Client Request
                    </span>
                    <p className="m-0 leading-relaxed font-medium">
                      “Hi, can we lock in 30 minutes with the engineering team this Thursday afternoon?”
                    </p>
                  </div>

                  {/* Callie AI Instant Response */}
                  <div className="p-4 rounded-2xl bg-[#111111] text-white text-xs space-y-2.5 shadow-sm">
                    <div className="flex items-center gap-2 text-[#B5E61D] text-[11px] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Callie analyzed 3 team calendars</span>
                    </div>
                    <p className="m-0 text-white/90 leading-relaxed">
                      I found 2 perfect overlapping slots for everyone on Thursday. Click to confirm:
                    </p>

                    {/* Interactive Slot Chips */}
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      {['Thu, 2:00 PM EDT', 'Thu, 4:30 PM EDT'].map((slot) => {
                        const isBooked = aiSlotBooked === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setAiSlotBooked(slot);
                              setTimeout(() => {
                                navigate('contact');
                                window.history.pushState({}, '', '/contact');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }, 500);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              isBooked
                                ? 'bg-[#B5E61D] text-black shadow-sm'
                                : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                            }`}
                          >
                            {isBooked && <Check className="w-3 h-3 text-black stroke-[3]" />}
                            <span>{isBooked ? `Reserved ${slot}` : slot}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F9FAFB] border border-black/5 flex items-center justify-between text-xs text-[#6B7280]">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Zero scheduling conflicts detected</span>
                  </span>
                  <span className="font-semibold text-[#111111]">100% Automated</span>
                </div>
              </div>
            )}

            {/* TAB 3: NOTETAKER CARD */}
            {activeProduct === 'notetaker' && (
              <div className="space-y-5 animate-in fade-in duration-300 text-left">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#111111] text-[#B5E61D] flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111111] m-0">
                        AI Executive Summary
                      </h4>
                      <p className="text-xs text-[#6B7280] m-0">
                        Sprint Architecture & Launch Plan · 34m
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Synced to CRM
                  </span>
                </div>

                {/* AI Key Insights */}
                <div className="p-3.5 rounded-2xl bg-[#F9FAFB] border border-black/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                    <Sparkles className="w-3.5 h-3.5 text-[#B5E61D]" />
                    <span>Key Decisions & Takeaways</span>
                  </div>
                  <p className="text-xs text-[#4B5563] leading-relaxed m-0">
                    Client approved high-converting interactive redesign. Next milestone delivery date confirmed for October 15.
                  </p>
                </div>

                {/* Interactive Action Items Checklist */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
                    Interactive Action Items Checklist
                  </span>
                  {[
                    { key: 'task1', text: 'Deliver interactive product switcher prototype', assignee: 'Design Lead' },
                    { key: 'task2', text: 'Integrate Calendly modal & scheduling hooks', assignee: 'Frontend Eng' },
                    { key: 'task3', text: 'Connect Stripe payments & deposit trigger', assignee: 'Product' },
                  ].map((task) => (
                    <div
                      key={task.key}
                      onClick={() => toggleTask(task.key)}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-black/5 hover:bg-black/[0.02] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4.5 h-4.5 rounded-md flex items-center justify-center transition-colors ${
                            checkedTasks[task.key]
                              ? 'bg-[#111111] text-[#B5E61D]'
                              : 'border border-black/20 bg-white'
                          }`}
                        >
                          {checkedTasks[task.key] && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            checkedTasks[task.key]
                              ? 'line-through text-[#9CA3AF]'
                              : 'text-[#111111]'
                          }`}
                        >
                          {task.text}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#6B7280] bg-black/5 px-2 py-0.5 rounded-md">
                        {task.assignee}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PAYMENTS CARD */}
            {activeProduct === 'payments' && (
              <div className="space-y-5 animate-in fade-in duration-300 text-left">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#111111] text-[#B5E61D] flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111111] m-0">
                        Consultation Checkout
                      </h4>
                      <p className="text-xs text-[#6B7280] m-0">
                        Instant Deposit & Meeting Lock
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#111111]">$250.00</span>
                </div>

                {/* Service Details */}
                <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-black/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#6B7280]">Service:</span>
                    <span className="font-semibold text-[#111111]">
                      Typeface Brand & Architecture Strategy
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#6B7280]">Session Duration:</span>
                    <span className="font-semibold text-[#111111]">60 Minutes</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-black/5">
                    <span className="text-[#6B7280]">Deposit Required:</span>
                    <span className="font-bold text-[#111111]">$250.00 USD</span>
                  </div>
                </div>

                {/* Instant Pay Actions */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentSuccess(true);
                      setTimeout(() => {
                        navigate('contact');
                        window.history.pushState({}, '', '/contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 500);
                    }}
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                      paymentSuccess
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-[#111111] hover:bg-black text-white shadow-md'
                    }`}
                  >
                    {paymentSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-[#B5E61D]" />
                        <span>Payment Processed · Meeting Booked!</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-[#B5E61D]" />
                        <span>Pay $250.00 with Stripe / Apple Pay</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B7280] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-bit SSL Encrypted</span>
                    </span>
                    <span>·</span>
                    <span>No-show Protection</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
