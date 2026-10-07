import React from 'react';

interface ResultsStatementProps {
  className?: string;
}

export const ResultsStatement: React.FC<ResultsStatementProps> = ({ className = '' }) => {
  return (
    <section
      aria-label="No spam. Just results."
      className={`w-full bg-white py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-20 text-center flex items-center justify-center select-none ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          style={{
            fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: '-0.04em',
          }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tight leading-[1.1]"
        >
          No spam<span className="text-[#E0343F]">.</span> Just results<span className="text-[#4E89FF]">.</span>
        </h2>
      </div>
    </section>
  );
};
