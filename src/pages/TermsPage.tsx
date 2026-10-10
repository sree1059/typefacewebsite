import React, { useEffect } from 'react';
import { LegalLayout } from '../components/LegalLayout';
import { useNavigation } from '../context/NavigationContext';

export const TermsPage: React.FC = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    document.title = 'Terms & Conditions | Typeface';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Terms and Conditions governing use of the Typeface website and services.'
      );
    }
  }, []);

  const tableOfContents = [
    { id: 'terms-1', number: '01', title: 'About These Terms' },
    { id: 'terms-2', number: '02', title: 'Our Services' },
    { id: 'terms-3', number: '03', title: 'Website Content & Portfolio' },
    { id: 'terms-4', number: '04', title: 'Intellectual Property' },
    { id: 'terms-5', number: '05', title: 'Client Projects & Engagements' },
    { id: 'terms-6', number: '06', title: 'Third-Party Services & Integrations' },
    { id: 'terms-7', number: '07', title: 'Acceptable Website Use' },
    { id: 'terms-8', number: '08', title: 'No Guarantee of Commercial Outcomes' },
    { id: 'terms-9', number: '09', title: 'Privacy & Data Protection' },
    { id: 'terms-10', number: '10', title: 'Future Offerings & Capabilities' },
    { id: 'terms-11', number: '11', title: 'Limitation of Liability' },
    { id: 'terms-12', number: '12', title: 'Changes to These Terms' },
    { id: 'terms-13', number: '13', title: 'Governing Law' },
    { id: 'terms-14', number: '14', title: 'Contact Information' },
  ];

  return (
    <LegalLayout
      title="Terms & Conditions"
      eyebrow="Legal Agreement & Use"
      lastUpdated="[DATE]"
      currentLegalRoute="terms"
      tableOfContents={tableOfContents}
      intro={
        <p className="leading-relaxed">
          These Terms &amp; Conditions govern your use of the Typeface website and your interactions
          with Typeface in relation to our services.
        </p>
      }
    >
      {/* SECTION 1 */}
      <section id="terms-1" className="scroll-mt-24 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">01</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            About These Terms
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            By accessing, browsing, or interacting with this website, you acknowledge that you have read,
            understood, and agree to be bound by these Terms &amp; Conditions to the extent applicable.
            If you do not agree with any portion of these terms, your sole recourse is to discontinue
            visiting and using this website.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section id="terms-2" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">02</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Our Services
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            Typeface is a premium developer house offering specialized professional engineering,
            web development, custom digital solutions, and high-performance digital experiences, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li><strong>Web Development:</strong> Custom responsive web platforms, single-page architectures, and headless frontend experiences.</li>
            <li><strong>Shopify Development:</strong> Bespoke custom themes, storefront optimization, and ecommerce integrations.</li>
            <li><strong>Short-form Video Editing:</strong> High-retention vertical reels, narrative pacing, audio mastering, and motion typography.</li>
            <li><strong>LinkedIn Personal Branding:</strong> Executive positioning, content architecture, and strategic audience engagement.</li>
            <li><strong>Email Marketing:</strong> Audience segmentation, lifecycle sequences, copy formulation, and deliverability optimization.</li>
          </ul>
          <p>
            The display of services on this website constitutes an invitation to treat rather than a binding
            commercial offer. Specific project scope, pricing, milestones, deliverables, service levels,
            and mutual responsibilities are negotiated and confirmed separately through dedicated client
            agreements or statements of work.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section id="terms-3" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">03</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Website Content &amp; Portfolio
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            All content published on this website—including project showcases, concept designs, editorial
            commentary, and service descriptions—is made available exclusively for general informational
            and showcase portfolio purposes.
          </p>
          <p>
            Typeface reserves the right to modify, update, replace, or take down any portfolio work,
            editorial copy, or site functionality at any time without prior notice.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section id="terms-4" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">04</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Intellectual Property
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            All original components of this website—including visual identity, logo marks, layout designs,
            typography systems, original graphics, user interface animations, software code, and written
            copy—are the exclusive intellectual property of Typeface and are protected by applicable
            copyright and intellectual property laws.
          </p>
          <p>
            Client-specific deliverables, marks, and commercial assets showcased on this site remain the
            property or licensed work of their respective trademark holders and clients. Third-party fonts,
            icons, and frameworks remain subject to their respective open-source or commercial licenses.
          </p>
          <p>
            Visitors may not reproduce, duplicate, scrape, republish, redistribute, decompile, or
            commercially exploit any material or visual asset from this website without prior express
            written authorization from Typeface.
          </p>
        </div>
      </section>

      {/* SECTION 5 */}
      <section id="terms-5" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">05</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Client Projects &amp; Engagements
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            When a prospective client decides to engage Typeface for design, development, or consulting
            work, the engagement is formalized through a written proposal, quotation, statement of work
            (SOW), or master service agreement. Such agreements specifically define:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li>Deliverables and functional specifications</li>
            <li>Revision cycles and approval workflows</li>
            <li>Project milestones and delivery timelines</li>
            <li>Professional fee structures and payment schedules</li>
            <li>Intellectual property transfer or licensing terms</li>
            <li>Client responsibilities and asset provision deadlines</li>
            <li>Deployment, testing, and post-launch maintenance terms</li>
          </ul>
          <p>
            In the event of any direct conflict between these general website Terms &amp; Conditions and
            a formally executed client agreement, the provisions of the executed client agreement shall
            prevail regarding that specific engagement.
          </p>
        </div>
      </section>

      {/* SECTION 6 */}
      <section id="terms-6" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">06</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Third-Party Services &amp; Integrations
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            When delivering client projects or maintaining our website, Typeface frequently interfaces
            with third-party software, cloud infrastructure, domain registrars, ecommerce platforms
            (e.g., Shopify), email delivery providers, and external APIs.
          </p>
          <p>
            Third-party providers operate independently and maintain their own terms of service, subscription
            pricing, and system uptime levels. Typeface cannot guarantee the ongoing availability, pricing
            stability, or performance of external third-party services outside our reasonable control.
          </p>
        </div>
      </section>

      {/* SECTION 7 */}
      <section id="terms-7" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">07</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Acceptable Website Use
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>When interacting with this website, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li>Attempt to gain unauthorized access to our servers, infrastructure, or administrative systems</li>
            <li>Disrupt, impair, or degrade website availability through denial-of-service or automated floods</li>
            <li>Introduce malicious software, trojans, viruses, worms, or destructive code</li>
            <li>Use automated scrapers, spiders, or robots to extract data or images without permission</li>
            <li>Falsify identities or misrepresent affiliations when submitting project enquiries</li>
            <li>Use this website or its contact forms for unsolicited marketing, spam, or unlawful purposes</li>
          </ul>
        </div>
      </section>

      {/* SECTION 8 */}
      <section id="terms-8" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">08</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            No Guarantee of Commercial Outcomes
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            Typeface prides itself on delivering high-caliber design, meticulous code, and engaging creative
            media. However, digital products and content operate in dynamic market environments influenced by
            numerous external variables.
          </p>
          <p>
            Unless explicitly guaranteed in a signed client contract, Typeface makes no warranty or
            representation regarding specific commercial outcomes, including but not limited to revenue,
            search engine rankings, website traffic volumes, follower counts, viral reach, conversion
            rates, or sales figures.
          </p>
        </div>
      </section>

      {/* SECTION 9 */}
      <section id="terms-9" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">09</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Privacy &amp; Data Protection
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            Any personal information collected during your interaction with this website or through enquiry
            submissions is processed in accordance with our{' '}
            <button
              onClick={() => navigate('privacy-policy')}
              className="text-[#E0343F] underline underline-offset-4 hover:text-[#B52530] font-medium cursor-pointer"
            >
              Privacy Policy
            </button>
            . By submitting information, you acknowledge that handling of your data occurs as outlined
            in that policy.
          </p>
        </div>
      </section>

      {/* SECTION 10 */}
      <section id="terms-10" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">10</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Future Offerings &amp; Capabilities
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            This website currently serves as a curated showcase and portfolio presentation for Typeface.
            Typeface may introduce additional products, resources, consultations, digital products or other
            services in the future. Any such offerings may be subject to additional terms, pricing, payment
            and refund policies that will be presented at the time of purchase or engagement.
          </p>
          <p>
            No such future products or transactional systems are presently active or available for purchase
            on this website.
          </p>
        </div>
      </section>

      {/* SECTION 11 */}
      <section id="terms-11" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">11</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Limitation of Liability
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            To the maximum extent permitted by applicable law, Typeface, its partners, employees, and
            contractors shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages—including loss of profits, loss of data, loss of business goodwill, or service
            interruption—arising out of or in connection with your access to, use of, or inability to access
            this website or its contents.
          </p>
          <p>
            Nothing in these terms seeks to exclude or limit liability where applicable statutory law does
            not permit such limitation.
          </p>
        </div>
      </section>

      {/* SECTION 12 */}
      <section id="terms-12" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">12</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Changes to These Terms
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            Typeface reserves the right to modify these Terms &amp; Conditions at its discretion. Any updates
            will take effect upon being posted on this website, and the &ldquo;Last Updated&rdquo; date will be
            revised accordingly. Your continued use of the website following published modifications
            constitutes acceptance of the revised terms.
          </p>
        </div>
      </section>

      {/* SECTION 13 */}
      <section id="terms-13" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">13</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Governing Law
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            These Terms shall be governed by and interpreted in accordance with the laws applicable in India,
            subject to applicable jurisdictional requirements.
          </p>
        </div>
      </section>

      {/* SECTION 14 */}
      <section id="terms-14" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">14</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Contact Information
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>For questions or clarifications regarding these Terms &amp; Conditions, please reach out to:</p>
          <div className="p-6 rounded-xl bg-[#F2EFE9] border border-[#E5E2DA] space-y-2 font-mono text-xs sm:text-sm text-[#222222]">
            <div className="font-bold font-sans text-base text-[#111111]">Typeface</div>
            <div>Email: <span className="text-[#111111] font-semibold">[YOUR BUSINESS EMAIL]</span></div>
            <div>Website: <span className="text-[#111111] font-semibold">[YOUR DOMAIN]</span></div>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
};
