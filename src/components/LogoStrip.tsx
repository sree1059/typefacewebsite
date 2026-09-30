import React from 'react';

export const LogoStrip: React.FC = () => {
  const logos = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <circle cx="12" cy="20" r="2" fill="currentColor" />
          <circle cx="4" cy="12" r="2" fill="currentColor" />
          <circle cx="20" cy="12" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 4,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12c3-4 6-4 9 0s6 4 9 0" />
          <path d="M2 7c3-4 6-4 9 0s6 4 9 0" />
          <path d="M2 17c3-4 6-4 9 0s6 4 9 0" />
        </svg>
      ),
    },
    {
      id: 5,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
    },
    {
      id: 6,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full py-6 bg-black">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap opacity-75 hover:opacity-100 transition-opacity">
          {logos.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {item.icon}
              <span className="text-sm font-semibold tracking-tight text-white">Logoipsum</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
