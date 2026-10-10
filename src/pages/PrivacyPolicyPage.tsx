import React, { useEffect } from 'react';
import { LegalLayout } from '../components/LegalLayout';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Typeface';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Privacy Policy for Typeface and information about how we handle personal data.'
      );
    }
  }, []);

  const tableOfContents = [
    { id: 'section-1', number: '01', title: 'Information We Collect' },
    { id: 'section-2', number: '02', title: 'How We Use Your Information' },
    { id: 'section-3', number: '03', title: 'Legal Basis, Consent & Your Choices' },
    { id: 'section-4', number: '04', title: 'Contact & Enquiry Forms' },
    { id: 'section-5', number: '05', title: 'Cookies & Similar Technologies' },
    { id: 'section-6', number: '06', title: 'Third-Party Services' },
    { id: 'section-7', number: '07', title: 'Data Sharing & Disclosure' },
    { id: 'section-8', number: '08', title: 'Data Retention' },
    { id: 'section-9', number: '09', title: 'Data Security' },
    { id: 'section-10', number: '10', title: 'Your Rights' },
    { id: 'section-11', number: '11', title: "Children's Privacy" },
    { id: 'section-12', number: '12', title: 'External Links' },
    { id: 'section-13', number: '13', title: 'Changes to This Privacy Policy' },
    { id: 'section-14', number: '14', title: 'Contact Us' },
  ];

  return (
    <LegalLayout
      title="Privacy Policy"
      eyebrow="Data Protection & Privacy"
      lastUpdated="[DATE]"
      currentLegalRoute="privacy-policy"
      tableOfContents={tableOfContents}
      intro={
        <p className="leading-relaxed">
          Typeface (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a developer house
          building high-performance websites, web applications, and digital experiences for
          ambitious businesses.
          <br /><br />
          This Privacy Policy explains how we collect, use, disclose and protect personal information
          when you visit our website, contact us, submit an enquiry, or otherwise interact with our
          services.
          <br /><br />
          We handle digital personal data in accordance with applicable laws and regulations, including
          the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;) and applicable rules
          made under it, to the extent applicable to our processing activities.
        </p>
      }
    >
      {/* SECTION 1 */}
      <section id="section-1" className="scroll-mt-24 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">01</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Information We Collect
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-4">
          <p>
            We collect personal information directly when you voluntarily provide it to us through our
            enquiry, consultation, or contact forms, as well as limited technical information that may
            be generated automatically when you browse our website.
          </p>

          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111111] pt-2">
            Information Voluntarily Provided Through Enquiry and Contact Forms
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number or WhatsApp contact number</li>
            <li>Business or company name</li>
            <li>Website URL or relevant social media profile links</li>
            <li>Service of interest (e.g., Web Development, Shopify Development, Short-form Video Editing, LinkedIn Personal Branding, Email Marketing)</li>
            <li>Project brief, goals, deliverables, and specific requirements</li>
            <li>Estimated budget range or timeline expectations, if voluntarily specified</li>
            <li>Any additional context or details you choose to include in your message or enquiry</li>
          </ul>

          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111111] pt-2">
            Automatically Collected Technical Information (Where Applicable)
          </h3>
          <p>
            Depending on your browser settings and server configuration, standard technical log data
            may be recorded when accessing the website, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li>Internet Protocol (IP) address</li>
            <li>Browser type and version</li>
            <li>Device type (desktop, tablet, mobile) and operating system</li>
            <li>Pages visited and navigation sequence</li>
            <li>Date and time of visit</li>
            <li>Referring website address</li>
            <li>Basic interaction telemetry (such as scroll state or link clicks)</li>
            <li>Approximate country or city location derived from IP address</li>
            <li>Campaign identifier or UTM parameters, where applicable</li>
          </ul>
        </div>
      </section>

      {/* SECTION 2 */}
      <section id="section-2" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">02</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            How We Use Your Information
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>We process collected information solely for legitimate business purposes, including:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li>Responding promptly to your enquiries, project briefs, and messages</li>
            <li>Evaluating project feasibility, technical scope, and creative requirements</li>
            <li>Preparing detailed proposals, estimates, quotations, and statements of work</li>
            <li>Communicating with prospective, current, and former clients regarding active or potential engagements</li>
            <li>Delivering agreed creative, engineering, editing, and strategic consulting services</li>
            <li>Operating, optimizing, and improving website layout, navigation, and user experience</li>
            <li>Maintaining internal administrative, operational, and client communication records</li>
            <li>Preventing automated spam, unauthorized submissions, and cybersecurity incidents</li>
            <li>Complying with applicable statutory, tax, accounting, or legal obligations</li>
            <li>Protecting our legitimate business interests, intellectual property, and legal rights</li>
          </ul>
        </div>
      </section>

      {/* SECTION 3 */}
      <section id="section-3" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">03</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Legal Basis, Consent and Your Choices
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            When you send us an enquiry through our contact forms or email, we process your information
            primarily on the basis of your voluntary consent and to take preparatory steps at your
            request prior to entering into a formal client contract, or based on other lawful grounds
            recognized under applicable data protection laws.
          </p>
          <p>
            Where processing is founded on consent, you maintain the right to withdraw your consent at
            any time by contacting us at <span className="font-mono text-xs text-[#111111]">[YOUR BUSINESS EMAIL]</span>.
            Withdrawal of consent does not affect the lawfulness of processing carried out prior to
            withdrawal, nor does it prevent retention where required by statutory or legitimate legal
            record-keeping obligations.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section id="section-4" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">04</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Contact and Enquiry Forms
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            When you complete an enquiry form on our website, your submitted data is routed to our team
            so that we can evaluate your project brief and reply to your request.
          </p>
          <p>
            Depending on website configuration, we may utilize third-party form processing gateways,
            such as FormSubmit, to securely forward form submissions to our email inbox. FormSubmit
            operates as an independent technical service provider; its data practices are governed by its
            own terms and privacy documentation.
          </p>
          <div className="p-4 rounded-lg bg-[#FAF0E6] border border-[#E8D5C4] text-xs sm:text-sm text-[#663C1E]">
            <strong>Important Security Notice:</strong> Our enquiry forms are designed solely for general
            project discussions. Please do NOT transmit passwords, payment card details, banking credentials,
            government identification numbers, or confidential proprietary secrets through general website forms.
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section id="section-5" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">05</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Cookies and Similar Technologies
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            Our website utilizes only strictly necessary functional storage mechanisms (such as basic
            browser session storage) required to maintain core site navigation, client-side routing, and
            accessibility states.
          </p>
          <p>
            We do not currently deploy third-party advertising tracking pixels or retargeting cookies.
            If analytics or measurement instrumentation is introduced in future iterations of the website,
            this Privacy Policy and our cookie notifications will be updated accordingly.
          </p>
        </div>
      </section>

      {/* SECTION 6 */}
      <section id="section-6" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">06</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Third-Party Services
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            To deliver a secure, high-performance web experience, Typeface relies on reputable third-party
            infrastructure providers. These may include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li>Cloud hosting, content delivery networks (CDNs), and edge computing platforms</li>
            <li>Form dispatch and email relay processing services (such as FormSubmit)</li>
            <li>Web typography font repositories (such as Google Fonts)</li>
            <li>Direct business communication channels (such as WhatsApp or email infrastructure)</li>
          </ul>
          <p>
            Each third-party provider processes technical data in accordance with their respective privacy
            policies, security standards, and contractual terms.
          </p>
        </div>
      </section>

      {/* SECTION 7 */}
      <section id="section-7" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">07</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Data Sharing and Disclosure
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            <strong>Typeface does not sell, rent, monetize, or trade your personal information.</strong>
          </p>
          <p>We disclose personal data strictly in the following limited circumstances:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li><strong>Technical Service Providers:</strong> Trusted hosting and infrastructure partners who assist in operating our website under confidentiality obligations.</li>
            <li><strong>Professional Advisors:</strong> Legal, accounting, and compliance counsel where required for legitimate corporate governance.</li>
            <li><strong>Legal Compulsion:</strong> Law enforcement, regulatory bodies, or judicial authorities when required by applicable law, court order, or formal subpoena.</li>
            <li><strong>Rights Protection:</strong> When disclosure is necessary to investigate fraud, enforce terms, or defend Typeface, our clients, or the public from harm.</li>
            <li><strong>With Your Consent:</strong> To any other third party with your explicit authorization.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 8 */}
      <section id="section-8" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">08</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Data Retention
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            We retain personal information only for as long as is reasonably necessary to fulfill the
            purposes outlined in this policy, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li>Addressing and resolving your enquiries, quotes, or project negotiations</li>
            <li>Executing ongoing design, development, and advisory engagements</li>
            <li>Preserving historical corporate, tax, and accounting records</li>
            <li>Defending or prosecuting legal claims, and meeting statutory retention mandates</li>
          </ul>
          <p>
            When data is no longer necessary for these defined operational or legal purposes, it is
            securely deleted or anonymized.
          </p>
        </div>
      </section>

      {/* SECTION 9 */}
      <section id="section-9" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">09</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Data Security
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            We implement reasonable organizational, technical, and administrative safeguards designed to
            protect personal data against unauthorized access, alteration, disclosure, or destruction.
            Measures include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li>Encrypted data transmission across the web using Transport Layer Security (HTTPS)</li>
            <li>Restricted, role-based access controls for internal project files and communications</li>
            <li>Hosting with industry-recognized cloud infrastructure providers</li>
            <li>Routine security reviews of connected plugins and digital tools</li>
          </ul>
          <p>
            Please note that no method of transmission over the internet or method of electronic storage
            is entirely invulnerable; while we strive to maintain robust protections, absolute security
            cannot be guaranteed.
          </p>
        </div>
      </section>

      {/* SECTION 10 */}
      <section id="section-10" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">10</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Your Rights
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            Subject to applicable data protection legislation (including the DPDP Act to the extent
            applicable to our processing), you may hold specific rights regarding your personal data,
            including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#444444]">
            <li><strong>Access:</strong> The right to request confirmation of whether we process your data and obtain a summary of personal information held.</li>
            <li><strong>Correction & Update:</strong> The right to request correction of inaccurate or incomplete personal data.</li>
            <li><strong>Erasure:</strong> The right to request deletion of your personal data where retention is no longer necessary for legal or contractual purposes.</li>
            <li><strong>Withdrawal of Consent:</strong> The right to revoke consent given for data processing.</li>
            <li><strong>Grievance Redressal:</strong> The right to submit questions or complaints regarding our data handling practices.</li>
          </ul>
          <p>
            To exercise any applicable rights, please write to us at{' '}
            <span className="font-mono text-xs text-[#111111]">[YOUR BUSINESS EMAIL]</span>. We will review
            and respond to your request in accordance with applicable statutory guidelines.
          </p>
        </div>
      </section>

      {/* SECTION 11 */}
      <section id="section-11" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">11</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Children&apos;s Privacy
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            Our website is tailored exclusively for businesses, entrepreneurs, and professional clients.
            It is not intentionally designed for or directed at children. We do not knowingly solicit or
            collect personal data from minors. If you believe a minor has submitted personal details through
            our website, please contact us immediately for prompt deletion.
          </p>
        </div>
      </section>

      {/* SECTION 12 */}
      <section id="section-12" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">12</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            External Links
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            Our showcase projects, social media profiles, and case studies may feature external links to
            third-party platforms, client websites, and partner applications. Typeface is not responsible
            for the privacy standards, terms, or content of those external domains. We encourage visitors
            to review the privacy declarations of any third-party website they visit.
          </p>
        </div>
      </section>

      {/* SECTION 13 */}
      <section id="section-13" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">13</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Changes to This Privacy Policy
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            We may revise this Privacy Policy periodically to reflect service evolutions, technical
            updates, or changes in legal regulations. When amendments are posted, the &ldquo;Last Updated&rdquo;
            date at the top of this page will be updated accordingly. Continued use of our website following
            such notices constitutes acknowledgment of the revised policy.
          </p>
        </div>
      </section>

      {/* SECTION 14 */}
      <section id="section-14" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#EAE7E0]">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E0343F] font-semibold">14</span>
          <h2 className="text-xl sm:text-2xl font-light text-[#111111] tracking-tight">
            Contact Us
          </h2>
        </div>
        <div className="text-sm sm:text-base text-[#333333] leading-relaxed space-y-3">
          <p>
            If you have questions, feedback, or requests regarding this Privacy Policy or our personal
            data handling, please contact:
          </p>
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
