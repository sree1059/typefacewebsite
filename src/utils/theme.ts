import React from 'react';

/**
 * Exact radiant sunshine yellow + cyan/lime mesh gradient
 * matching the user's uploaded gradient asset.
 */
export const HERO_GRADIENT_STYLE: React.CSSProperties = {
  backgroundColor: '#FFF000',
  backgroundImage: `
    radial-gradient(circle at 14% 88%, rgba(85, 220, 255, 0.95) 0%, rgba(105, 230, 255, 0.82) 20%, rgba(195, 248, 80, 0.65) 42%, transparent 68%),
    radial-gradient(circle at 88% 92%, rgba(115, 230, 255, 0.88) 0%, rgba(145, 240, 255, 0.70) 24%, rgba(205, 250, 110, 0.45) 48%, transparent 72%),
    radial-gradient(circle at 24% 65%, rgba(90, 225, 255, 0.82) 0%, rgba(165, 245, 95, 0.55) 30%, transparent 62%),
    radial-gradient(circle at 6% 96%, rgba(185, 175, 255, 0.75) 0%, rgba(120, 215, 255, 0.55) 26%, transparent 58%),
    radial-gradient(circle at 94% 6%, rgba(160, 252, 210, 0.55) 0%, rgba(220, 255, 130, 0.35) 25%, transparent 52%),
    radial-gradient(circle at 55% 38%, #FFF200 0%, #FFE600 48%, #FFDD00 100%)
  `,
};
