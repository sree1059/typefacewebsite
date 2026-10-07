import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { CALENDLY_URL } from '../utils/calendly';

export const CalendlyModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState(CALENDLY_URL);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ url?: string }>;
      if (customEvent.detail?.url) {
        setCalendlyUrl(customEvent.detail.url);
      }
      setIsOpen(true);
    };

    window.addEventListener('open-inapp-calendly', handleOpen);
    return () => window.removeEventListener('open-inapp-calendly', handleOpen);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a Consultation"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] max-h-[750px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#111111] m-0">
                Book a Consultation
              </h3>
              <p className="text-xs text-[#666666] m-0">
                Schedule a 1-on-1 strategy session with Typeface
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close scheduler"
            className="w-9 h-9 rounded-full flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Iframe */}
        <div className="flex-1 w-full h-full bg-[#FAFAFA] relative">
          <iframe
            src={`${calendlyUrl}?embed_domain=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : ''
            )}&embed_type=Inline`}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Select a Date & Time - Calendly"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
