import React, { useEffect } from 'react';
import { LegalLayout } from '../components/LegalLayout';
import { openCookieSettings } from '../utils/cookieConsent';
import { Sliders, ShieldCheck, BarChart3, HelpCircle, Settings } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Cookie Policy | Typeface';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Cookie Policy for Typeface: learn how we use cookies, manage analytics consent, and customize your preferences.'
      );
    }
  }, []);

  const tableOfContents = [
    { id: 'section-1', number: '01', title: 'What Are Cookies?' },
    { id: 'section-2', number: '02', title: 'How We Use Cookies' },
    { id: 'section-3', number: '03', title: 'Categories of Cookies We Use' },
    { id: 'section-4', number: '04', title: 'Managing & Changing Your Consent' },
    { id: 'section-5', number: '05', title: 'Browser Controls' },
    { id: 'section-6', number: '06', title: 'Updates to This Policy' },
    { id: 'section-7', number: '07', title: 'Contact Us' },
  ];

  return (
    <LegalLayout
      title="Cookie Policy"
      eyebrow="Privacy & Consent Governance"
      lastUpdated="October 2026"
      currentLegalRoute="cookie-policy"
      tableOfContents={tableOfContents}
      intro={
        <div className="space-y-4 text-black/80">
          <p className="leading-relaxed">
            This Cookie Policy explains how Typeface (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            uses cookies and similar local storage technologies when you access our website.
          </p>
          <p className="leading-relaxed">
            We believe in data transparency and minimal tracking. We do not use third-party advertising
            trackers, sale of data, or cross-site profiling cookies. We only use essential technical cookies
            necessary for site operations and, solely with your explicit consent, privacy-conscious analytics
            cookies.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-xs sm:text-sm font-medium hover:bg-black/85 transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Sliders className="w-4 h-4" />
              <span>Change Cookie Preferences</span>
            </button>
          </div>
        </div>
      }
    >
      {/* SECTION 1 */}
      <section id="section-1" className="scroll-mt-24 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">01</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            What Are Cookies?
          </h2>
        </div>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          Cookies are small text files placed on your device (computer, tablet, or smartphone) when you
          visit a website. They allow websites to recognize your device, maintain security, remember user
          preferences, and understand how the site performs.
        </p>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          In addition to cookies, websites may use local browser storage (such as HTML5 localStorage) to
          store information such as whether you have accepted or declined cookie categories.
        </p>
      </section>

      {/* SECTION 2 */}
      <section id="section-2" className="scroll-mt-24 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">02</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            How We Use Cookies
          </h2>
        </div>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          We use cookies strictly for two purposes:
        </p>
        <ul className="space-y-2 text-sm sm:text-base text-black/75 list-disc pl-5 font-light">
          <li>
            <strong className="font-medium text-black">Essential Operations:</strong> Ensuring pages load
            reliably, preserving navigation state, securing forms against automated abuse, and remembering
            your cookie consent choices.
          </li>
          <li>
            <strong className="font-medium text-black">Performance &amp; Analytics (Optional):</strong> Gauging
            anonymous visitor metrics, such as page load speed and device categories, solely to optimize the
            website experience.
          </li>
        </ul>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          We do not sell, rent, or trade your personal data to any advertisers or third-party data brokers.
        </p>
      </section>

      {/* SECTION 3 */}
      <section id="section-3" className="scroll-mt-24 space-y-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">03</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Categories of Cookies We Use
          </h2>
        </div>

        {/* Table / Cards of Cookie categories */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-black/[0.02] border border-black/10 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-black" />
                <h3 className="text-base font-semibold text-[#111111]">1. Essential Cookies</h3>
              </div>
              <span className="text-xs font-mono font-medium text-black/70 bg-black/[0.06] px-2.5 py-1 rounded-md">
                Always active · Cannot be disabled
              </span>
            </div>
            <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-light">
              These cookies and storage keys are necessary for the website to function properly and securely.
              They enable basic features like page routing, spam protection on contact forms, and recording
              your explicit cookie preferences so the banner does not re-appear on every visit.
            </p>
            <div className="pt-2 text-xs text-black/60 font-mono space-y-1">
              <div><strong>Key / Identifier:</strong> typeface_cookie_consent_v1, session tokens</div>
              <div><strong>Duration:</strong> Up to 12 months (or until cleared by browser)</div>
              <div><strong>Provider:</strong> First-party (Typeface)</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-black/15 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-black" />
                <h3 className="text-base font-semibold text-[#111111]">2. Analytics Cookies</h3>
              </div>
              <span className="text-xs font-mono font-medium text-black/60 bg-black/[0.04] px-2.5 py-1 rounded-md">
                Optional · Disabled by default
              </span>
            </div>
            <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-light">
              Analytics cookies help us measure visitor numbers and traffic sources so we can evaluate and
              improve the performance of our site. If you do not allow these cookies, we will not know when
              you visited our site or be able to monitor aggregated performance metrics.
            </p>
            <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-light">
              No analytics scripts or tracking events are executed unless you explicitly click &ldquo;Accept all&rdquo;
              or toggle Analytics to active in your Cookie Preferences.
            </p>
            <div className="pt-2 text-xs text-black/60 font-mono space-y-1">
              <div><strong>Status:</strong> Strict Opt-In only</div>
              <div><strong>Duration:</strong> Up to 12 months</div>
              <div><strong>Provider:</strong> Aggregated measurement (Google Analytics / Consent Mode)</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section id="section-4" className="scroll-mt-24 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">04</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Managing &amp; Changing Your Consent
          </h2>
        </div>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          You have full control over optional cookies. You can change your choice or withdraw consent at any
          time by clicking the &ldquo;Cookie Settings&rdquo; link in the website footer or by clicking the button
          below:
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={openCookieSettings}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium border border-black/15 bg-white text-black hover:bg-black/[0.04] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <Settings className="w-4 h-4" />
            <span>Open Cookie Preferences</span>
          </button>
        </div>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          When you update your preferences, your revised choice is applied immediately without requiring a
          page reload.
        </p>
      </section>

      {/* SECTION 5 */}
      <section id="section-5" className="scroll-mt-24 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">05</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Browser Controls
          </h2>
        </div>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          Most web browsers automatically accept cookies, but you can typically modify your browser settings
          to decline cookies if you prefer.
        </p>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          Please note that if you choose to block all cookies (including essential technical cookies) through
          your browser settings, certain features of the website may not function as intended.
        </p>
      </section>

      {/* SECTION 6 */}
      <section id="section-6" className="scroll-mt-24 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">06</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Updates to This Policy
          </h2>
        </div>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          We may update this Cookie Policy from time to time to reflect changes in technological practices,
          legal obligations, or operational requirements. Any revisions will be published on this page with
          an updated date.
        </p>
      </section>

      {/* SECTION 7 */}
      <section id="section-7" className="scroll-mt-24 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">07</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Contact Us
          </h2>
        </div>
        <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
          If you have any questions or feedback regarding this Cookie Policy or our privacy practices,
          please contact us at:
        </p>
        <div className="p-4 rounded-xl bg-black/[0.02] border border-black/10 text-xs sm:text-sm font-mono space-y-1">
          <div><strong>Email:</strong> infotypeface1411@gmail.com</div>
          <div><strong>Studio:</strong> Typeface Developer House</div>
        </div>
      </section>
    </LegalLayout>
  );
};
