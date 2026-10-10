import React, { useState } from 'react';
import { Mail, Phone, Send, ArrowUpRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { HERO_GRADIENT_STYLE } from '../utils/theme';

interface ContactPageProps {
  useCaslonFont?: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formElement = e.currentTarget;
    const formPayload = new FormData(formElement);

    // Honeypot spam check: if filled, drop submission silently
    const honey = formPayload.get('_honey');
    if (honey && typeof honey === 'string' && honey.trim().length > 0) {
      setIsSubmitted(true);
      return;
    }

    // Client-side required field validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.service.trim() ||
      !formData.budget.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage('Please fill in all mandatory fields (Name, Email, Mobile Number, Service Needed, Pricing/Budget, and Project Details).');
      return;
    }

    // Spam phrase blacklist filter (common obvious spam phrases)
    const spamTerms = [
      'casino',
      'crypto',
      'bitcoin',
      'forex',
      'viagra',
      'sex dating',
      'adult dating',
      'buy followers',
      'loan offer',
      'telegram @',
      'whatsapp +',
    ];
    const combinedContent = `${formData.name} ${formData.message}`.toLowerCase();
    const hasSpam = spamTerms.some((term) => combinedContent.includes(term));
    if (hasSpam) {
      setErrorMessage('Your enquiry could not be submitted because it was flagged as promotional spam.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/infotypeface1411@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formPayload,
      });

      const result = await response.json().catch(() => ({}));

      // FormSubmit activation or successful submission detection
      const isActivationMessage =
        typeof result?.message === 'string' &&
        result.message.toLowerCase().includes('activation');

      if (
        response.ok &&
        (result.success === 'true' || result.success === true || isActivationMessage)
      ) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Web Development',
          budget: '',
          message: '',
        });
      } else {
        const errorText =
          result?.message ||
          'Something went wrong while submitting your enquiry. Please try again.';
        setErrorMessage(errorText);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Network connection error. Please try again later.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Web Development',
      budget: '',
      message: '',
    });
  };

  const fontStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  return (
    <div
      className="w-full text-[#111111] min-h-screen py-16 sm:py-24 md:py-28 px-6 sm:px-12 md:px-20 selection:bg-black selection:text-white font-manrope relative"
      style={{
        ...fontStyle,
        ...HERO_GRADIENT_STYLE,
      }}
    >
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
        {/* Page Heading */}
        <div className="no-copy">
          <span className="text-xs uppercase tracking-widest font-semibold text-black/70 block mb-2 font-mono">
            Typeface · Developer House
          </span>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              color: '#000000',
            }}
            className="text-[34px] xs:text-[44px] sm:text-[56px] md:text-[68px] text-black tracking-tight leading-[1.08] mb-3"
          >
            Contact<span className="text-[#E0343F]">.</span>
          </h1>
          <p className="text-[17px] sm:text-[20px] text-black/85 leading-relaxed max-w-2xl font-light">
            Have a project in mind or want to discuss a new build? Reach out directly to our engineering and design team.
          </p>
        </div>

        {/* Two Column Grid: Contact Info & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Details Box (Solid White) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-black/10 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight">
                Contact
              </h2>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+919347452611"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#111111] shadow-xs group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-[#4E89FF]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#666666] font-medium block">
                      Call / WhatsApp
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#111111]">
                      +91 93474 52611
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#999999] ml-auto group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Email Primary: infotypeface1411@gmail.com */}
                <a
                  href="mailto:infotypeface1411@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#111111] shadow-xs group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4 text-[#4E89FF]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#666666] font-medium block">
                      Email
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#111111] break-all">
                      infotypeface1411@gmail.com
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#999999] ml-auto group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Response SLA Note */}
              <div className="pt-2 border-t border-black/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B5E61D] animate-pulse" />
                  <p className="text-xs text-[#555555] font-medium">
                    Typical response time: within 24–48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Standard HTML POST Form Box (Solid White) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-black/10">
              {isSubmitted ? (
                /* Success Message */
                <div className="py-8 sm:py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                    <Check className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                    Enquiry Received<span className="text-[#E0343F]">.</span>
                  </h3>
                  <div className="text-sm sm:text-base text-[#555555] max-w-md mx-auto leading-relaxed space-y-1">
                    <p>Thank you for reaching out to Typeface.</p>
                    <p>We have received your project details and will get back to you shortly.</p>
                  </div>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs uppercase tracking-wider text-[#666666] hover:text-black font-semibold transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/infotypeface1411@gmail.com"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* FormSubmit Configuration Options */}
                  <input type="hidden" name="_subject" value="New Typeface Website Enquiry" />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="hidden"
                    name="_blacklist"
                    value="casino, crypto, bitcoin, forex, viagra, sex dating, adult dating, loan offers, buy followers, telegram @"
                  />

                  {/* Spam Protection Honeypot Field */}
                  <input
                    type="text"
                    name="_honey"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                    Tell us about your project
                  </h2>

                  {/* Submission Error Alert */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900 text-xs sm:text-sm flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span className="flex-1">{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/10 focus:border-black focus:outline-none text-[#111111] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/10 focus:border-black focus:outline-none text-[#111111] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/10 focus:border-black focus:outline-none text-[#111111] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/10 focus:border-black focus:outline-none text-[#111111] text-sm transition-colors cursor-pointer"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Custom Shopify Development">Custom Shopify Development</option>
                      <option value="Landing Page Design">Landing Page Design</option>
                      <option value="Social Media Services">Social Media Services</option>
                    </select>
                  </div>

                  {/* Pricing / Budget Field (Text Input - Mandatory) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-2">
                      Estimated Budget / Pricing *
                    </label>
                    <input
                      type="text"
                      name="budget"
                      required
                      placeholder="e.g. ₹75,000 or $1,500 / your budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/10 focus:border-black focus:outline-none text-[#111111] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your timeline, goals, and technical requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/10 focus:border-black focus:outline-none text-[#111111] text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#111111] hover:bg-black text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Sending...</span>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white/80" />
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
