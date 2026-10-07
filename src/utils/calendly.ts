// Calendly Integration Utilities

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding?: boolean;
      }) => void;
      initPopupWidget: (options: {
        url: string;
        prefill?: Record<string, any>;
        utm?: Record<string, any>;
      }) => void;
      closePopupWidget?: () => void;
      showPopupWidget?: (url: string) => void;
    };
    openCalendly?: (url?: string) => void;
  }
}

export const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/renikindiamulya';

export const openCalendlyPopup = (url: string = CALENDLY_URL) => {
  if (typeof window === 'undefined') return;

  if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
    try {
      window.Calendly.initPopupWidget({ url });
      return;
    } catch (e) {
      console.warn('Calendly initPopupWidget error:', e);
    }
  }

  // Fallback: Dispatch custom event for built-in in-app modal overlay
  window.dispatchEvent(
    new CustomEvent('open-inapp-calendly', {
      detail: { url },
    })
  );
};

// Global hook
if (typeof window !== 'undefined') {
  window.openCalendly = openCalendlyPopup;
}

export const initCalendlyBadge = () => {
  if (typeof window === 'undefined') return;

  const runInit = () => {
    if (!window.Calendly) return false;

    // Check if badge already injected
    const existingBadge = document.querySelector('.calendly-badge-widget');
    if (!existingBadge && typeof window.Calendly.initBadgeWidget === 'function') {
      window.Calendly.initBadgeWidget({
        url: CALENDLY_URL,
        text: 'Book a Consultation',
        color: '#0069ff',
        textColor: '#ffffff',
        branding: true,
      });
    }
    return true;
  };

  if (!runInit()) {
    // Retry periodically until script loads (up to 10 seconds)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (runInit() || attempts > 50) {
        clearInterval(interval);
      }
    }, 200);
  }
};

export const setCalendlyBadgeVisibility = (visible: boolean) => {
  if (typeof window === 'undefined') return;
  const badge = document.querySelector('.calendly-badge-widget') as HTMLElement | null;
  if (badge) {
    badge.style.display = visible ? 'block' : 'none';
  }
};
