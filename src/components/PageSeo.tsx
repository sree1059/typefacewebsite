import React, { useEffect } from 'react';
import { useNavigation, PageRoute } from '../context/NavigationContext';

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

const PAGE_META: Record<PageRoute, PageMeta> = {
  home: {
    title: 'Typeface — Developer House',
    description:
      'Typeface is a developer house building high-performance websites, web applications, and digital experiences for ambitious businesses.',
    path: '/',
  },
  services: {
    title: 'Services — Typeface Developer House',
    description:
      'High-performance web development, custom web applications, e-commerce engineering, and technical design systems built for ambitious businesses.',
    path: '/services',
  },
  courses: {
    title: 'Paid Courses & Growth Engineering — Typeface Academy',
    description:
      'Production-ready engineering masterclasses and growth cohorts with secure Razorpay checkout.',
    path: '/courses',
  },
  work: {
    title: 'Work — Typeface Developer House',
    description:
      'Selected client flagships, custom web applications, and high-performance digital platforms built by Typeface Developer House.',
    path: '/work',
  },
  projects: {
    title: 'Work — Typeface Developer House',
    description:
      'Selected client flagships, custom web applications, and high-performance digital platforms built by Typeface Developer House.',
    path: '/work',
  },
  about: {
    title: 'About — Typeface Developer House',
    description:
      'We believe good work starts with understanding. Typeface is a developer house engineering digital experiences with conviction.',
    path: '/about',
  },
  contact: {
    title: 'Contact — Typeface Developer House',
    description:
      'Discuss your next project with our engineering and design team. Fast discovery, clear scope, and high-performance builds.',
    path: '/contact',
  },
  'working-with-us': {
    title: 'Working With Us — Typeface Developer House',
    description:
      'How we partner with founders and ambitious brands: our technical process, communication standards, and mutual commitments.',
    path: '/working-with-us',
  },
  'privacy-policy': {
    title: 'Privacy Policy — Typeface Developer House',
    description: 'Privacy Policy and data protection terms for Typeface Developer House.',
    path: '/privacy-policy',
  },
  'cookie-policy': {
    title: 'Cookie Policy — Typeface Developer House',
    description: 'Cookie Policy and consent preferences for Typeface Developer House.',
    path: '/cookie-policy',
  },
  terms: {
    title: 'Terms of Service — Typeface Developer House',
    description: 'Terms of Service and legal agreements for Typeface Developer House.',
    path: '/terms',
  },
  'thank-you': {
    title: 'Thank You — Typeface Developer House',
    description: 'Thank you for reaching out to Typeface Developer House. We will be in touch shortly.',
    path: '/thank-you',
  },
};

export const PageSeo: React.FC = () => {
  const { currentPage } = useNavigation();

  useEffect(() => {
    const meta = PAGE_META[currentPage] || PAGE_META.home;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://typefacecreativestudio.com';
    const canonicalUrl = `${origin}${meta.path}`;

    // 1. Update Title
    document.title = meta.title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta Description
    setMetaTag('name', 'description', meta.description);

    // 4. Update OpenGraph Tags
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Typeface — Developer House');
    setMetaTag('property', 'og:image', `${origin}/images/logo.png`);

    // 5. Update Twitter / X Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:url', canonicalUrl);
    setMetaTag('name', 'twitter:image', `${origin}/images/logo.png`);

    // 6. Ensure Robots & HTML Lang
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    if (document.documentElement) {
      document.documentElement.lang = 'en';
    }

    // 7. Update Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 8. Track SPA page navigation with Google Tag
    if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      try {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'page_view', {
          page_title: meta.title,
          page_location: canonicalUrl,
          page_path: meta.path,
        });
      } catch {
        // fail-safe
      }
    }
  }, [currentPage]);

  return null;
};
