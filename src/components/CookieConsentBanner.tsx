import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cookie, X, Check, Lock, ChevronRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import {
  getStoredConsent,
  hasGivenConsent,
  saveConsent,
  CookiePreferences,
} from '../utils/cookieConsent';

export const CookieConsentBanner: React.FC = () => {
  const { navigate } = useNavigation();

  // State management
  const [hasConsented, setHasConsented] = useState<boolean>(true); // Start true to prevent flicker, check in useEffect
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false); // For entrance animation

  // Modal accessibility ref
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerFocusRef = useRef<HTMLElement | null>(null);

  // Initialize consent check on mount
  useEffect(() => {
    const consent = getStoredConsent();
    if (consent) {
      setHasConsented(true);
      setAnalyticsEnabled(consent.analytics);
    } else {
      setHasConsented(false);
      setAnalyticsEnabled(false);
      // Small timeout for smooth slide/fade in entrance animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for global "open-cookie-settings" requests (e.g. from footer links)
  useEffect(() => {
    const handleOpenSettings = () => {
      const current = getStoredConsent();
      setAnalyticsEnabled(current ? current.analytics : false);
      triggerFocusRef.current = document.activeElement as HTMLElement;
      setShowSettingsModal(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenSettings);
    };
  }, []);

  // Handle escape key to close settings modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSettingsModal) {
        setShowSettingsModal(false);
        triggerFocusRef.current?.focus();
      }
    };

    if (showSettingsModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSettingsModal]);

  // Trap focus or focus modal container when settings modal opens
  useEffect(() => {
    if (showSettingsModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showSettingsModal]);

  // Actions
  const handleAcceptAll = () => {
    saveConsent({ analytics: true });
    setAnalyticsEnabled(true);
    setHasConsented(true);
    setShowSettingsModal(false);
  };

  const handleRejectOptional = () => {
    saveConsent({ analytics: false });
    setAnalyticsEnabled(false);
    setHasConsented(true);
    setShowSettingsModal(false);
  };

  const handleSavePreferences = () => {
    saveConsent({ analytics: analyticsEnabled });
    setHasConsented(true);
    setShowSettingsModal(false);
  };

  const handleOpenPreferences = () => {
    const current = getStoredConsent();
    setAnalyticsEnabled(current ? current.analytics : false);
    setShowSettingsModal(true);
  };

  const navigateToPolicy = (route: 'privacy-policy' | 'cookie-policy') => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Main Cookie Consent Floating Banner */}
      {!hasConsented && (
        <div
          role="region"
          aria-label="Cookie consent banner"
          className={`fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto md:left-8 z-50 max-w-xl w-auto transition-all duration-500 ease-out pointer-events-auto ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#55DCFF] via-[#69F9B0] to-[#FFE600] shadow-[0_20px_50px_rgba(105,249,176,0.18)]">
            <div className="bg-white/95 backdrop-blur-md rounded-[15px] p-5 sm:p-6 text-[#111111] space-y-4">
              {/* Header & Title */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-black/[0.05] border border-black/10 flex items-center justify-center shrink-0 mt-0.5 text-black">
                  <Shield className="w-4 h-4" />
                </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold tracking-tight text-[#111111]">
                  Your privacy matters
                </h2>
                <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-normal">
                  We use essential cookies to keep this website working and, with your permission,
                  analytics cookies to understand how visitors interact with our website.
                </p>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-3 text-xs text-black/60 pt-1">
              <button
                type="button"
                onClick={() => navigateToPolicy('privacy-policy')}
                className="underline hover:text-black underline-offset-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
              >
                Privacy Policy
              </button>
              <span className="text-black/30" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigateToPolicy('cookie-policy')}
                className="underline hover:text-black underline-offset-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
              >
                Cookie Policy
              </button>
            </div>

            {/* Actions: Accept all, Reject optional, Cookie settings */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center justify-start">
                <button
                  type="button"
                  onClick={handleOpenPreferences}
                  className="text-xs sm:text-sm font-medium text-black/75 hover:text-black underline underline-offset-4 py-2 sm:py-1 px-1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md"
                >
                  Cookie settings
                </button>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRejectOptional}
                  className="flex-1 sm:flex-initial px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-black bg-white hover:bg-black/[0.04] active:bg-black/[0.08] border border-black/15 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  Reject optional
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-[#111111] hover:bg-black/85 active:bg-black rounded-xl transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* 2. Cookie Preferences Settings Modal */}
      {showSettingsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
          onClick={(e) => {
            // Close preferences on backdrop click
            if (e.target === e.currentTarget) {
              setShowSettingsModal(false);
            }
          }}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white rounded-2xl sm:rounded-3xl border border-black/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] max-w-lg w-full max-h-[90vh] flex flex-col text-[#111111] overflow-hidden focus:outline-none"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-black/10 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-black" />
                  <h3
                    id="cookie-settings-title"
                    className="text-lg font-semibold tracking-tight text-[#111111]"
                  >
                    Cookie Preferences
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-black/65 leading-relaxed">
                  Customize which cookies you wish to allow on this device. You can update or
                  withdraw your consent at any time.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                aria-label="Close cookie preferences"
                className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/10 text-black flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Preferences List */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Category 1: Essential Cookies */}
              <div className="p-4 rounded-xl bg-black/[0.02] border border-black/10 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-black/70" />
                    <span className="text-sm font-semibold text-[#111111]">
                      Essential Cookies
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-black/70 bg-black/[0.06] border border-black/10 px-2 py-0.5 rounded-md">
                    Always active
                  </span>
                </div>
                <p className="text-xs text-black/65 leading-relaxed">
                  These cookies and local storage tokens are strictly necessary for core functionality,
                  such as navigation routing, secure form submissions, session integrity, and remembering
                  your consent choices. They cannot be turned off.
                </p>
              </div>

              {/* Category 2: Analytics Cookies */}
              <div className="p-4 rounded-xl bg-white border border-black/15 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-sm font-semibold text-[#111111]">
                      Analytics Cookies
                    </span>
                    <span className="block text-[11px] text-black/50">Optional</span>
                  </div>
                  {/* Interactive Accessible Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analyticsEnabled}
                    aria-label="Toggle analytics cookies"
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                      analyticsEnabled ? 'bg-black' : 'bg-black/20'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        analyticsEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-black/65 leading-relaxed">
                  These cookies help us understand how visitors navigate our pages, aggregate visitor
                  counts, and measure site performance. All insights are aggregated anonymously. No
                  personal profile is created and no advertising trackers are set.
                </p>
              </div>

              {/* Policy cross links */}
              <div className="text-xs text-black/60 pt-1 flex items-center justify-between">
                <span>Need more information?</span>
                <div className="flex items-center gap-2 font-medium">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSettingsModal(false);
                      navigateToPolicy('cookie-policy');
                    }}
                    className="text-black hover:underline cursor-pointer"
                  >
                    Read Cookie Policy
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-6 border-t border-black/10 bg-black/[0.01] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="order-2 sm:order-1 px-4 py-2.5 text-xs sm:text-sm font-medium text-black hover:text-black/80 hover:bg-black/[0.04] border border-black/15 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                Reject optional
              </button>

              <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-black/[0.04] border border-black/15 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#111111] hover:bg-black/85 rounded-xl transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
