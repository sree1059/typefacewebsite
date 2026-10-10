import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './PosterHorizontalScroll.css';

import poster1 from '../assets/images/coding_challenge_poster_1791480248957.jpg';
import poster2 from '../assets/images/znergy_snack_poster_1791480357236.jpg';
import poster3 from '../assets/images/aditya_education_poster_1791480402321.jpg';
import poster4 from '../assets/images/typeface_design_poster_1791480429742.jpg';

gsap.registerPlugin(ScrollTrigger);

export const DEFAULT_POSTERS = [
  poster1,
  poster2,
  poster3,
  poster4,
];

export function PosterHorizontalScroll({ posters = DEFAULT_POSTERS }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getDistance = () => {
        return Math.max(0, track.scrollWidth - section.clientWidth);
      };

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      const images = track.querySelectorAll('img');
      const refresh = () => {
        ScrollTrigger.refresh();
      };

      images.forEach((image) => {
        if (!image.complete) {
          image.addEventListener('load', refresh);
        }
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);

      return () => {
        images.forEach((image) => {
          image.removeEventListener('load', refresh);
        });
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill();
        }
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [posters] }
  );

  return (
    <section ref={sectionRef} className="poster-scroll-section" aria-label="Horizontal Poster Gallery">
      <div ref={trackRef} className="poster-scroll-track">
        {posters.map((poster, index) => (
          <div className="poster-slide" key={index}>
            <img
              src={poster}
              alt={`A4 Poster ${index + 1}`}
              draggable="false"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PosterHorizontalScroll;
