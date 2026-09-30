import React from 'react';

interface AboutPageProps {
  useCaslonFont?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  const fontStyle: React.CSSProperties = {
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 300,
  };

  return (
    <div
      className="w-full text-[#111111] min-h-[70vh] py-16 sm:py-24 md:py-32 px-6 sm:px-12 md:px-20 selection:bg-black selection:text-white flex flex-col justify-start"
      style={{
        background: 'linear-gradient(90deg, #A7EAF5 0%, #9FC8F5 50%, #879BF0 100%)',
        ...fontStyle,
      }}
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Blank About Section ready for upcoming content */}
      </div>
    </div>
  );
};
