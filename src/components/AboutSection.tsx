import React from 'react';

interface AboutSectionProps {
  headingFontSize?: number;
  useCaslonFont?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  useCaslonFont = true,
}) => {
  const fontStyle = {
    fontFamily: useCaslonFont
      ? "'Libre Caslon Condensed', 'Libre Caslon Display', Arial, sans-serif"
      : 'Arial, sans-serif',
  };

  return (
    <section id="about" className="w-full bg-white text-[#111111] py-16 sm:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto no-copy">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Card: 100% Commitment + Testimonial */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#18181B] text-white border border-black/10 p-5 sm:p-7 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] shadow-lg transition-colors">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                Commitment to measurable
              </p>
              <h3
                style={fontStyle}
                className="text-3xl sm:text-4xl font-bold text-white mt-2 tracking-tight"
              >
                100%
              </h3>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
              {/* Avatar Pile */}
              <div className="flex items-center -space-x-2 mb-3.5 sm:mb-4">
                <img
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                  alt="Avatar 1"
                />
                <img
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
                  alt="Avatar 2"
                />
                <img
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
                  alt="Avatar 3"
                />
                <img
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                  alt="Avatar 4"
                />
              </div>

              <blockquote className="text-xs text-white/90 italic leading-relaxed">
                “Their automation strategy completely reshaped how we work. It's efficient, intelligent, and seamless.”
              </blockquote>
            </div>
          </div>

          {/* Card: Data Points 520k+ */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#B5E61D] text-black p-5 sm:p-7 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] shadow-lg border border-black/10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-black/75">
                Data Points
              </p>
              <div
                style={fontStyle}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mt-2 tracking-tight"
              >
                520k+
              </div>
            </div>
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-black/15">
              <p className="text-xs sm:text-sm text-black/90 font-medium leading-relaxed">
                Analyzed monthly to power smarter business strategies and automated decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
