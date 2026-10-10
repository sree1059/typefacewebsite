/**
 * Cookie Consent Management Utility for Typeface
 * 
 * Provides GDPR / ePrivacy / DPDP compliant cookie consent handling:
 * - Essential cookies are strictly necessary and cannot be disabled.
 * - Analytics cookies are opt-in and disabled by default until explicit consent is given.
 * - Persists visitor choice in localStorage so the banner is not displayed again needlessly.
 * - Integrates with Google Consent Mode / gtag if configured.
 * - Dispatches events when consent preferences are modified.
 */

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
  version: number;
}

const STORAGE_KEY = 'typeface_cookie_consent_v1';
const CURRENT_VERSION = 1;

/**
 * Reads stored consent preferences from localStorage
 */
export function getStoredConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    if (typeof parsed !== 'object' || parsed === null) return null;

    if (typeof parsed.analytics === 'boolean' && parsed.version === CURRENT_VERSION) {
      return {
        essential: true,
        analytics: parsed.analytics,
        timestamp: parsed.timestamp || new Date().toISOString(),
        version: CURRENT_VERSION,
      };
    }
  } catch (err) {
    console.warn('Unable to read cookie consent from storage:', err);
  }

  return null;
}

/**
 * Checks whether the visitor has already submitted their cookie choices
 */
export function hasGivenConsent(): boolean {
  return getStoredConsent() !== null;
}

/**
 * Checks whether consent is active for a specific category
 */
export function hasConsentFor(category: 'essential' | 'analytics'): boolean {
  if (category === 'essential') return true;

  const stored = getStoredConsent();
  return stored ? Boolean(stored.analytics) : false;
}

/**
 * Updates Google Consent Mode and analytics runtime state if present
 */
export function applyConsent(preferences: CookiePreferences | null): void {
  if (typeof window === 'undefined') return;

  const analyticsState = preferences && preferences.analytics ? 'granted' : 'denied';

  // Support standard Google Consent Mode (gtag)
  if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
    try {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
        analytics_storage: analyticsState,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    } catch (e) {
      // Graceful fail-safe if gtag throws
      console.warn('Error applying gtag consent update:', e);
    }
  }

  // Support Google Tag Manager dataLayer push
  const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: 'cookie_consent_update',
      consent_essential: 'granted',
      consent_analytics: analyticsState,
    });
  }
}

// Automatically apply stored consent or default denied state upon script load
if (typeof window !== 'undefined') {
  try {
    const initialPrefs = getStoredConsent();
    applyConsent(initialPrefs);
  } catch {
    // Fail-safe
  }
}

/**
 * Saves visitor consent preferences, dispatches update events, and updates runtime state
 */
export function saveConsent(preferences: { analytics: boolean }): CookiePreferences {
  const finalPrefs: CookiePreferences = {
    essential: true,
    analytics: Boolean(preferences.analytics),
    timestamp: new Date().toISOString(),
    version: CURRENT_VERSION,
  };

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPrefs));
    } catch (err) {
      console.warn('Unable to persist cookie consent to localStorage:', err);
    }

    applyConsent(finalPrefs);

    // Notify components & listeners
    window.dispatchEvent(
      new CustomEvent<CookiePreferences>('cookie-consent-updated', {
        detail: finalPrefs,
      })
    );
  }

  return finalPrefs;
}

/**
 * Resets saved consent (useful for testing or full revocation)
 */
export function resetConsent(): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Unable to remove cookie consent from localStorage:', err);
  }

  window.dispatchEvent(new CustomEvent('cookie-consent-reset'));
}

/**
 * Triggers opening the cookie preferences modal anywhere in the app
 */
export function openCookieSettings(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('open-cookie-settings'));
}

/**
 * Subscribes to consent updates
 */
export function subscribeToConsentChanges(
  callback: (preferences: CookiePreferences) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<CookiePreferences>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };

  window.addEventListener('cookie-consent-updated', handler);
  return () => {
    window.removeEventListener('cookie-consent-updated', handler);
  };
}
