import React from 'react';
import { ProductType, AnimatedProductIcon } from './AnimatedProductIcon';

interface ProductTabProps {
  id: ProductType;
  label: string;
  isActive: boolean;
  onClick: () => void;
  controlsId: string;
}

/**
 * Circular product tab matching the reference implementation.
 * Features 56px (desktop) / 48px (mobile) dimensions, inner concentric ring,
 * subtle lime accent when active, and an animated white connector extension.
 */
export const ProductTab: React.FC<ProductTabProps> = ({
  id,
  label,
  isActive,
  onClick,
  controlsId,
}) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Interactive Circular Tab Button */}
      <button
        type="button"
        role="tab"
        id={`tab-${id}`}
        aria-selected={isActive}
        aria-controls={controlsId}
        aria-label={`${label} product overview`}
        onClick={onClick}
        className={`group relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full bg-white flex items-center justify-center cursor-pointer select-none transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
          isActive
            ? 'shadow-[0_8px_20px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.04]'
            : 'shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5'
        }`}
      >
        {/* Inactive light gray inner ring vs Active subtle lime accent ring */}
        <span
          aria-hidden="true"
          className={`absolute inset-[3px] sm:inset-[4px] rounded-full pointer-events-none transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isActive
              ? 'border-[1.8px] border-[#B5E61D] bg-[#B5E61D]/15 shadow-[inset_0_0_8px_rgba(181,230,29,0.25)]'
              : 'border border-[#E5E7EB] bg-transparent group-hover:border-black/20'
          }`}
        />

        {/* Centered Dark SVG Product Icon */}
        <div className="relative z-10 text-[#111111] flex items-center justify-center transition-transform duration-300">
          <AnimatedProductIcon
            product={id}
            isActive={isActive}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>

        {/* Animated White Connection / Extension Underneath */}
        <div
          aria-hidden="true"
          className={`absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-8 h-[14px] pointer-events-none z-20 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-top ${
            isActive
              ? 'opacity-100 transform translate-y-0 scale-y-100 scale-x-100'
              : 'opacity-0 transform -translate-y-1.5 scale-y-0 scale-x-75'
          }`}
        >
          <svg
            viewBox="0 0 32 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_3px_5px_rgba(0,0,0,0.05)]"
          >
            {/* Organic flared tongue bridging the circle to the content surface below */}
            <path
              d="M3 0C6.5 0 9.5 14 16 14C22.5 14 25.5 0 29 0H3Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </button>

      {/* Label beneath circular icon */}
      <span
        className={`mt-2 text-[11px] sm:text-xs tracking-tight transition-all duration-300 select-none font-manrope ${
          isActive
            ? 'text-[#111111] font-semibold translate-y-0'
            : 'text-[#4B5563] font-normal hover:text-[#111111]'
        }`}
      >
        {label}
      </span>
    </div>
  );
};
