import React, { useState } from 'react';
import { Mail, Phone, Send, ArrowUpRight } from 'lucide-react';

interface ContactPageProps {
  useCaslonFont?: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Designing',
    message: '',
  });

  const fontStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  return (
    <div
      className="w-full bg-white text-[#111111] min-h-screen py-16 sm:py-24 md:py-28 px-6 sm:px-12 md:px-20 selection:bg-black selection:text-white font-manrope"
      style={{
        background: '#ffffff',
        ...fontStyle,
      }}
    >
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
        {/* Page Heading */}
        <div>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 300,
              color: '#111111',
            }}
            className="text-[34px] xs:text-[44px] sm:text-[56px] md:text-[68px] text-[#111111] tracking-tight leading-[1.08] mb-3"
          >
            Contact<span className="text-[#E0343F]">.</span>
          </h1>
          <p className="text-[17px] sm:text-[20px] text-[#111111]/80 leading-relaxed max-w-2xl font-light">
            Have a project in mind or want to discuss a new build? Reach out directly to our engineering and design team.
          </p>
        </div>

        {/* Two Column Grid: Contact Info & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F9FAFB] border border-black/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight">
                Direct Channels
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

          {/* Right Column: Standard HTML POST Form to FormSubmit */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-black/10">
              <form
                action="https://formsubmit.co/infotypeface1411@gmail.com"
                method="POST"
                className="space-y-5"
              >
                {/* FormSubmit Configuration Options */}
                <input type="hidden" name="_subject" value="New Typeface Project Enquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://typefacecreativestudio.com/thank-you"
                />

                <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  Tell us about your project
                </h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-2">
                    Your Name
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
                    Email Address
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
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/10 focus:border-black focus:outline-none text-[#111111] text-sm transition-colors cursor-pointer"
                  >
                    <option value="Web Designing">Web Designing</option>
                    <option value="Shopify Development">Shopify Development</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="LinkedIn Ghostwriting">LinkedIn Ghostwriting</option>
                    <option value="Viral Short-Form Reel Editing">Viral Short-Form Reel Editing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#555555] mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your timeline, goals, and vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/10 focus:border-black focus:outline-none text-[#111111] text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#111111] hover:bg-black text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
