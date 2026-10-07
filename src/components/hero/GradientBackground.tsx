import React from 'react';

/**
 * Animated blurred gradient background recreating the reference implementation.
 * Uses a large ~400% width track with heavy blur (90px) and smooth GPU horizontal translation.
 */
export const GradientBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none rounded-[inherit]"
    >
      {/* 400% Width Animated Gradient Track */}
      <div
        className="hero-gradient-track absolute top-0 left-0 w-[400%] h-full will-change-transform"
        style={{
          filter: 'blur(90px)',
          WebkitFilter: 'blur(90px)',
        }}
      >
        <svg
          viewBox="0 0 4000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full opacity-90"
        >
          <defs>
            {/* Radial Gradients matching the reference color palette */}
            <radialGradient
              id="grad-lavender"
              cx="50%"
              cy="90%"
              r="45%"
              fx="50%"
              fy="90%"
            >
              <stop offset="0%" stopColor="#C9A9F0" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#D8B4FE" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C9A9F0" stopOpacity="0" />
            </radialGradient>

            <radialGradient
              id="grad-mint"
              cx="80%"
              cy="40%"
              r="40%"
              fx="80%"
              fy="40%"
            >
              <stop offset="0%" stopColor="#B9E8E7" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#A7F3D0" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#B9E8E7" stopOpacity="0" />
            </radialGradient>

            <radialGradient
              id="grad-blue"
              cx="15%"
              cy="50%"
              r="40%"
              fx="15%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#557BC0" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#7B9BC9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#557BC0" stopOpacity="0" />
            </radialGradient>

            <radialGradient
              id="grad-lime"
              cx="45%"
              cy="25%"
              r="30%"
              fx="45%"
              fy="25%"
            >
              <stop offset="0%" stopColor="#D9F99D" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#BEF264" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D9F99D" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="base-sky-linear" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#82A6D0" />
              <stop offset="25%" stopColor="#7B9BC9" />
              <stop offset="50%" stopColor="#A9C8EE" />
              <stop offset="75%" stopColor="#B9E8E7" />
              <stop offset="100%" stopColor="#A9DCE9" />
            </linearGradient>
          </defs>

          {/* Base Sky Multi-stop Linear Background */}
          <rect width="4000" height="1000" fill="url(#base-sky-linear)" opacity="0.85" />

          {/* Repeating Organic Fluid Gradient Orbs across the 400% track */}
          {/* Segment 1 */}
          <ellipse cx="600" cy="500" rx="650" ry="450" fill="url(#grad-blue)" />
          <ellipse cx="1100" cy="850" rx="700" ry="400" fill="url(#grad-lavender)" />
          <ellipse cx="1400" cy="350" rx="650" ry="420" fill="url(#grad-mint)" />
          <circle cx="950" cy="300" r="380" fill="url(#grad-lime)" />

          {/* Segment 2 */}
          <ellipse cx="2000" cy="550" rx="700" ry="480" fill="url(#grad-blue)" />
          <ellipse cx="2400" cy="900" rx="750" ry="420" fill="url(#grad-lavender)" />
          <ellipse cx="2700" cy="300" rx="680" ry="430" fill="url(#grad-mint)" />
          <circle cx="2300" cy="250" r="390" fill="url(#grad-lime)" />

          {/* Segment 3 */}
          <ellipse cx="3200" cy="500" rx="650" ry="450" fill="url(#grad-blue)" />
          <ellipse cx="3600" cy="850" rx="700" ry="400" fill="url(#grad-lavender)" />
          <ellipse cx="3850" cy="400" rx="650" ry="420" fill="url(#grad-mint)" />
          <circle cx="3450" cy="280" r="380" fill="url(#grad-lime)" />
        </svg>
      </div>

      {/* Subtle overlay for consistent text contrast */}
      <div className="absolute inset-0 bg-white/[0.08] backdrop-brightness-[1.02]" />
    </div>
  );
};
