/**
 * Google-Certified CMP Integration & Consent Mode v2 Bridge
 *
 * This utility acts as the clean, standard integration point between TempInbox
 * and a Google-certified Consent Management Platform (such as Google AdSense's
 * built-in Privacy & Messaging tool or an IAB Europe TCF v2.2 certified CMP).
 *
 * ARCHITECTURAL PRINCIPLES:
 * 1. NO FAKE CMP BANNER: Does not simulate legal consent with a fake modal or custom button.
 * 2. DEFAULT DENIED: Zero tracking, advertising cookies, or telemetry occur before explicit consent.
 * 3. ESSENTIAL INTEGRITY: All temporary mailbox operations (generate, receive, inspect, delete)
 *    run completely client-side/in-memory with 100% functionality even when consent is refused.
 * 4. STANDARD REVOCATION: Exposes `reopenCmpSettings()` that delegates to Google's official
 *    `googlefc.showRevocationMessage()` or IAB TCF v2.2 APIs once the certified CMP is loaded.
 */

export interface ConsentStatus {
  cmpLoaded: boolean;
  cmpProvider: 'google-privacy-messaging' | 'iab-tcf' | 'none';
  adStorage: 'granted' | 'denied';
  analyticsStorage: 'granted' | 'denied';
  hasAdvertisingConsent: boolean;
  hasAnalyticsConsent: boolean;
  essentialOnly: boolean;
}

declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: any, success: boolean) => void,
      parameter?: any
    ) => void;
    googlefc?: {
      callbackQueue?: Array<() => void>;
      showRevocationMessage?: () => void;
      getConsentStatus?: () => number;
      controlledMessagingFunction?: any;
    };
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

type ConsentChangeListener = (status: ConsentStatus) => void;
const listeners: Set<ConsentChangeListener> = new Set();

let currentStatus: ConsentStatus = {
  cmpLoaded: false,
  cmpProvider: 'none',
  adStorage: 'denied',
  analyticsStorage: 'denied',
  hasAdvertisingConsent: false,
  hasAnalyticsConsent: false,
  essentialOnly: true,
};

/**
 * Checks whether a certified CMP is currently loaded and active in the browser window.
 */
export function isCertifiedCmpActive(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for Google Privacy & Messaging (Funding Choices)
  if (window.googlefc && typeof window.googlefc.showRevocationMessage === 'function') {
    return true;
  }

  // Check for active IAB TCF v2.2 CMP (non-stub)
  if (typeof window.__tcfapi === 'function' && !(window.__tcfapi as any).a) {
    return true;
  }

  return false;
}

/**
 * Queries the current consent state according to IAB TCF v2.2 or Google Consent Mode v2.
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return currentStatus;

  const isGoogleFc = Boolean(window.googlefc && typeof window.googlefc.showRevocationMessage === 'function');
  const isTcf = typeof window.__tcfapi === 'function';

  currentStatus = {
    ...currentStatus,
    cmpLoaded: isGoogleFc || isTcf,
    cmpProvider: isGoogleFc ? 'google-privacy-messaging' : isTcf ? 'iab-tcf' : 'none',
  };

  return currentStatus;
}

/**
 * Checks if advertising consent has been explicitly granted.
 * Always returns false in pre-consent state or when consent is denied.
 */
export function hasAdvertisingConsent(): boolean {
  return currentStatus.hasAdvertisingConsent;
}

/**
 * Checks if analytics consent has been explicitly granted.
 * Always returns false in pre-consent state or when consent is denied.
 */
export function hasAnalyticsConsent(): boolean {
  return currentStatus.hasAnalyticsConsent;
}

/**
 * Official entry point to reopen the certified CMP settings / revocation message.
 * Typically invoked when user clicks "Privacy / Cookie Settings" in the footer.
 *
 * Behavior:
 * 1. If Google Privacy & Messaging (`googlefc.showRevocationMessage`) is present, it invokes it.
 * 2. If an IAB TCF CMP is present, it issues the corresponding command.
 * 3. If no CMP is currently loaded (e.g., pre-AdSense approval), returns false with reason.
 */
export function reopenCmpSettings(): { success: boolean; reason?: string } {
  if (typeof window === 'undefined') {
    return { success: false, reason: 'SSR_OR_NO_WINDOW' };
  }

  // 1. Google AdSense Privacy & Messaging official API
  if (window.googlefc && typeof window.googlefc.showRevocationMessage === 'function') {
    try {
      window.googlefc.showRevocationMessage();
      return { success: true };
    } catch (err) {
      console.warn('[CMP Bridge] Failed to invoke googlefc.showRevocationMessage:', err);
      return { success: false, reason: 'INVOCATION_ERROR' };
    }
  }

  // 2. Queue for googlefc if script is loading
  if (window.googlefc && Array.isArray(window.googlefc.callbackQueue)) {
    window.googlefc.callbackQueue.push(() => {
      if (window.googlefc && typeof window.googlefc.showRevocationMessage === 'function') {
        window.googlefc.showRevocationMessage();
      }
    });
    return { success: true, reason: 'QUEUED_IN_CALLBACK_QUEUE' };
  }

  // 3. IAB Europe TCF v2.2 standard event or command
  if (typeof window.__tcfapi === 'function') {
    window.__tcfapi('displayConsentUi', 2, (success) => {
      if (!success) {
        console.info('[CMP Bridge] displayConsentUi not handled by current stub/CMP');
      }
    });
  }

  // CMP script is not installed or active yet
  return {
    success: false,
    reason: 'CMP_SCRIPT_NOT_LOADED',
  };
}

/**
 * Register a listener for consent changes.
 */
export function onConsentChange(listener: ConsentChangeListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Internal dispatch to notify registered listeners.
 */
function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener(currentStatus);
    } catch (e) {
      console.error('[CMP Bridge] Error in listener:', e);
    }
  });
}

/**
 * Initializes listeners for IAB TCF v2.2 and Google Consent Mode updates.
 * Safely runs on mount without setting any cookies or trackers.
 */
export function initCmpListeners(): void {
  if (typeof window === 'undefined') return;

  // Listen to IAB TCF v2.2 events if __tcfapi is present
  if (typeof window.__tcfapi === 'function') {
    try {
      window.__tcfapi('addEventListener', 2, (tcData: any, success: boolean) => {
        if (success && tcData) {
          const hasPurpose1 = Boolean(tcData.purpose && tcData.purpose.consents && tcData.purpose.consents[1]);
          const hasPurpose2 = Boolean(tcData.purpose && tcData.purpose.consents && tcData.purpose.consents[2]);

          currentStatus = {
            cmpLoaded: true,
            cmpProvider: 'iab-tcf',
            adStorage: hasPurpose1 ? 'granted' : 'denied',
            analyticsStorage: hasPurpose1 && hasPurpose2 ? 'granted' : 'denied',
            hasAdvertisingConsent: hasPurpose1,
            hasAnalyticsConsent: hasPurpose1 && hasPurpose2,
            essentialOnly: !hasPurpose1,
          };

          notifyListeners();
        }
      });
    } catch (e) {
      // Ignored if stub does not support addEventListener yet
    }
  }
}
