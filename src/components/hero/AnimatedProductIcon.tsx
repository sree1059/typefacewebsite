import React from 'react';

export type ProductType = 'scheduling' | 'callie' | 'notetaker' | 'payments';

interface AnimatedProductIconProps {
  product: ProductType;
  isActive: boolean;
  className?: string;
}

/**
 * High-fidelity inline SVG icons recreating the visual character of the reference.
 * Crisp at all sizes with subtle state-driven stroke & fill highlights.
 */
export const AnimatedProductIcon: React.FC<AnimatedProductIconProps> = ({
  product,
  isActive,
  className = 'w-6 h-6',
}) => {
  switch (product) {
    case 'scheduling':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-transform duration-300 ${
            isActive ? 'scale-105' : 'scale-100'
          }`}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Calendar Body */}
          <rect x="3" y="4" width="18" height="18" rx="3.5" ry="3.5" />
          {/* Top Binder Pins */}
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
          {/* Header Divider */}
          <line x1="3" y1="9.5" x2="21" y2="9.5" strokeWidth="1.5" />
          {/* Scheduled Meeting Indicator Clock */}
          <circle
            cx="12"
            cy="15"
            r="3.2"
            strokeWidth="1.5"
            fill={isActive ? 'rgba(181, 230, 29, 0.2)' : 'none'}
          />
          <polyline points="12 13.5 12 15 13.8 15" strokeWidth="1.5" />
        </svg>
      );

    case 'callie':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-transform duration-300 ${
            isActive ? 'scale-105' : 'scale-100'
          }`}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main 4-pointed radiant sparkle star */}
          <path
            d="M12 2.5C12 7.8 7.8 12 2.5 12C7.8 12 12 16.2 12 21.5C12 16.2 16.2 12 21.5 12C16.2 12 12 7.8 12 2.5Z"
            fill={isActive ? 'rgba(181, 230, 29, 0.25)' : 'rgba(0, 0, 0, 0.04)'}
          />
          {/* Secondary AI Assistant Accent Sparkle */}
          <path
            d="M19 3C19 4.6 17.6 6 16 6C17.6 6 19 7.4 19 9C19 7.4 20.4 6 22 6C20.4 6 19 4.6 19 3Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );

    case 'notetaker':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-transform duration-300 ${
            isActive ? 'scale-105' : 'scale-100'
          }`}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Note Page with Folded Corner */}
          <path d="M14 2.5H6C4.89543 2.5 4 3.39543 4 4.5V19.5C4 20.6046 4.89543 21.5 6 21.5H18C19.1046 21.5 20 20.6046 20 19.5V8.5L14 2.5Z" />
          <polyline points="14 2.5 14 8.5 20 8.5" />
          {/* Summary Lines */}
          <line x1="8" y1="13" x2="16" y2="13" strokeWidth="1.7" />
          <line x1="8" y1="16.5" x2="13.5" y2="16.5" strokeWidth="1.7" />
          {/* Recording / AI mic accent dot */}
          <circle
            cx="8"
            cy="7.5"
            r="1.2"
            fill={isActive ? '#B5E61D' : 'currentColor'}
            stroke="none"
          />
        </svg>
      );

    case 'payments':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} transition-transform duration-300 ${
            isActive ? 'scale-105' : 'scale-100'
          }`}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Card outline */}
          <rect x="2.5" y="5" width="19" height="14" rx="3" />
          {/* Magnetic Stripe */}
          <line x1="2.5" y1="9.5" x2="21.5" y2="9.5" strokeWidth="1.5" />
          {/* EMV Chip or Security Stamp */}
          <circle
            cx="6.5"
            cy="14.5"
            r="1.7"
            fill={isActive ? '#B5E61D' : 'currentColor'}
            stroke="none"
          />
          {/* Balance/Card Bars */}
          <rect
            x="14"
            y="13.5"
            width="4.5"
            height="2"
            rx="0.75"
            strokeWidth="1.2"
            fill={isActive ? 'rgba(181, 230, 29, 0.2)' : 'none'}
          />
        </svg>
      );

    default:
      return null;
  }
};
