import React from 'react';
import TextReveal from './TextReveal';
import { useNavigation } from '../context/NavigationContext';
import './Hero.css';

export default function Hero() {
  const { navigate } = useNavigation();

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('contact');
    window.history.pushState({}, '', '/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="hero growth-hero">
      <p className="eyebrow growth-hero-eyebrow">TYPEFACE® — GROWTH SYSTEMS</p>

      <h1 className="hero-heading growth-hero-heading">
        <TextReveal text="Your customers are searching." />
        <br />
        <span className="accent growth-hero-accent">
          <TextReveal text="Make sure they find you." />
        </span>
      </h1>

      <p className="hero-description growth-hero-description">
        Get discovered across Google, Maps and AI search.
        Turn that visibility into enquiries with better
        websites and intelligent automation.
      </p>

      <a
        href="/contact"
        onClick={handleCtaClick}
        className="hero-cta growth-hero-cta"
      >
        Build your growth system ↗
      </a>
    </section>
  );
}
