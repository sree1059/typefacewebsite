import React from 'react';

interface TypefaceLogoProps {
  className?: string;
  color?: string; // e.g. '#111111', '#FFFFFF', or 'currentColor'
  variant?: 'mark' | 'full';
  useImage?: boolean;
  dotShape?: 'circle' | 'square';
}

/**
 * Typeface "T." Logo Component
 * Precision vector geometry matching the official Typeface identity mark.
 * Features a circular dot for the period.
 * Also accessible from /images/logo.png, /images/logo-transparent.png, and /images/logo.svg.
 */
export const TypefaceLogo: React.FC<TypefaceLogoProps> = ({
  className = 'w-6 h-6',
  color = 'currentColor',
  useImage = false,
  dotShape = 'circle',
}) => {
  if (useImage) {
    return (
      <img
        src="/images/logo-transparent.png"
        alt="Typeface Logo"
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Typeface Logo"
    >
      {/* Top horizontal bar of T */}
      <rect x="0" y="0" width="360" height="130" fill={color} />
      {/* Vertical stem of T */}
      <rect x="110" y="130" width="140" height="280" fill={color} />
      {/* Period . - Circle shape */}
      {dotShape === 'circle' ? (
        <circle cx="445" cy="345" r="65" fill={color} />
      ) : (
        <rect x="380" y="280" width="130" height="130" fill={color} />
      )}
    </svg>
  );
};
