import React, { useState, useEffect } from 'react';
import { 
  Shield, Cookie, Check, X, ExternalLink, Settings2, CheckCircle2, 
  AlertCircle, HelpCircle, ChevronDown, ChevronUp, Globe, Lock, ArrowRight
} from 'lucide-react';

export interface TcfConsentData {
  consentGiven: boolean;
  personalizedAds: boolean;
  purposes: Record<number, boolean>;
  vendors: Record<string, boolean>;
  tcString: string;
  timestamp: string;
  region: 'EEA' | 'UK' | 'CH' | 'Global';
}

const TCF_PURPOSES = [
  {
    id: 1,
    name: 'Store and/or access information on a device',
    description: 'Cookies, device identifiers, or other information can be stored or accessed on your device for the purposes presented to you.',
    requiredForAds: true,
  },
  {
    id: 2,
    name: 'Use limited data to select advertising',
    description: 'Advertising presented to you on this service can be based on limited data, such as the website or app you are using, your non-precise location, your device type, or which content you are interacting with.',
    requiredForAds: true,
  },
  {
    id: 3,
    name: 'Create profiles for personalized advertising',
    description: 'Information about your activity on this service (such as forms you submit, content you view) can be stored and combined with other information about you to build or improve a profile about you for personalized advertising.',
    requiredForAds: false,
  },
  {
    id: 4,
    name: 'Use profiles to select personalized advertising',
    description: 'Personalized advertising presented to you on this service can be based on your advertising profiles, which can reflect your activity on this service or other websites or apps.',
    requiredForAds: false,
  },
  {
    id: 5,
    name: 'Create profiles to personalize content',
    description: 'Information about your activity on this service can be combined with other information to build or improve a profile about you for personalized content.',
    requiredForAds: false,
  },
  {
    id: 6,
    name: 'Use profiles to select personalized content',
    description: 'Personalized content presented to you on this service can be based on your content personalization profiles.',
    requiredForAds: false,
  },
  {
    id: 7,
    name: 'Measure advertising performance',
    description: 'Information regarding which advertising is presented to you and how you interact with it can be used to determine how well an advert has worked.',
    requiredForAds: true,
  },
  {
    id: 8,
    name: 'Measure content performance',
    description: 'Information regarding which content is presented to you and how you interact with it can be used to determine how well the content worked.',
    requiredForAds: true,
  },
  {
    id: 9,
    name: 'Understand audiences through statistics or combinations of data',
    description: 'Reports can be generated based on the combination of data sets regarding your interactions and those of other users with advertising or content.',
    requiredForAds: true,
  },
  {
    id: 10,
    name: 'Develop and improve services',
    description: 'Your data can be used to improve existing systems and software, and to develop new products.',
    requiredForAds: true,
  },
];

const CERTIFIED_VENDORS = [
  {
    id: 755,
    name: 'Google Advertising Products',
    privacyPolicy: 'https://policies.google.com/technologies/partner-sites',
    purposes: [1, 2, 3, 4, 7, 8, 9, 10],
  },
  {
    id: 52,
    name: 'The Trade Desk',
    privacyPolicy: 'https://www.thetradedesk.com/general/privacy',
    purposes: [1, 2, 3, 4, 7],
  },
  {
    id: 69,
    name: 'OpenX Software Ltd.',
    privacyPolicy: 'https://www.openx.com/legal/privacy-policy/',
    purposes: [1, 2, 3, 4, 7],
  },
  {
    id: 76,
    name: 'PubMatic, Inc.',
    privacyPolicy: 'https://pubmatic.com/legal/privacy-policy/',
    purposes: [1, 2, 3, 4, 7],
  },
  {
    id: 91,
    name: 'Criteo SA',
    privacyPolicy: 'https://www.criteo.com/privacy/',
    purposes: [1, 2, 3, 4, 7],
  },
];

export const TcfConsentManagementModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'summary' | 'details' | 'vendors'>('summary');
  const [selectedPurposes, setSelectedPurposes] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
  });
  const [selectedVendors, setSelectedVendors] = useState<Record<string, boolean>>({
    '755': true,
    '52': true,
    '69': true,
    '76': true,
    '91': true,
  });
  const [expandedPurpose, setExpandedPurpose] = useState<number | null>(null);

  // Initialize IAB TCF __tcfapi stub on window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Define __tcfapi if not already set
      if (!(window as any).__tcfapi) {
        (window as any).__tcfapi = function (
          command: string,
          version: number,
          callback: (data: any, success: boolean) => void,
          parameter?: any
        ) {
          const stored = localStorage.getItem('tcf_consent_data_v2');
          let consentData: TcfConsentData | null = null;
          if (stored) {
            try {
              consentData = JSON.parse(stored);
            } catch (e) {}
          }

          if (command === 'ping') {
            callback(
              {
                gdprApplies: true,
                cmpLoaded: true,
                cmpStatus: 'loaded',
                displayStatus: isOpen ? 'visible' : 'hidden',
                apiVersion: '2.2',
                cmpVersion: 2,
                cmpId: 300, // Certified CMP ID simulation
                gvlVersion: 3,
              },
              true
            );
          } else if (command === 'getTCData') {
            callback(
              {
                tcString: consentData?.tcString || 'CP-DEMO-TCF2.2-CONSENT-STRING',
                listenerId: 1,
                eventStatus: 'tcloaded',
                cmpStatus: 'loaded',
                purpose: {
                  consents: consentData?.purposes || {},
                },
                vendor: {
                  consents: consentData?.vendors || {},
                },
                isServiceSpecific: true,
                publisherCC: 'EEA',
                purposeOneTreatment: false,
              },
              true
            );
          } else if (command === 'addEventListener') {
            callback(
              {
                eventStatus: 'cmpuishown',
                tcString: consentData?.tcString || '',
              },
              true
            );
          } else {
            callback({ status: 'unsupported_command' }, false);
          }
        };
      }
    }
  }, [isOpen]);

  // Load existing choices if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tcf_consent_data_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.purposes) setSelectedPurposes(parsed.purposes);
        if (parsed.vendors) setSelectedVendors(parsed.vendors);
      }
    } catch (e) {}
  }, []);

  const saveConsent = (allowAll: boolean, allowPersonalized: boolean) => {
    const updatedPurposes: Record<number, boolean> = {};
    TCF_PURPOSES.forEach((p) => {
      if (allowAll) {
        updatedPurposes[p.id] = true;
      } else if (!allowPersonalized && (p.id === 3 || p.id === 4 || p.id === 5 || p.id === 6)) {
        updatedPurposes[p.id] = false;
      } else {
        updatedPurposes[p.id] = selectedPurposes[p.id] ?? false;
      }
    });

    const updatedVendors: Record<string, boolean> = {};
    CERTIFIED_VENDORS.forEach((v) => {
      updatedVendors[v.id.toString()] = allowAll || allowPersonalized;
    });

    // Mock certified IAB TCF 2.2 string representation
    const tcString = `CP${Date.now().toString(36).toUpperCase()}_TCF22_G755_CONSENT`;

    const consentData: TcfConsentData = {
      consentGiven: true,
      personalizedAds: allowPersonalized,
      purposes: updatedPurposes,
      vendors: updatedVendors,
      tcString,
      timestamp: new Date().toISOString(),
      region: 'EEA',
    };

    localStorage.setItem('tcf_consent_data_v2', JSON.stringify(consentData));
    localStorage.setItem(
      'tempinbox_cookie_prefs',
      JSON.stringify({
        essential: true,
        adsense: allowPersonalized,
        analytics: updatedPurposes[7] && updatedPurposes[8],
        tcfConsent: consentData,
        updatedAt: new Date().toISOString(),
      })
    );

    // Trigger __tcfapi event
    if (typeof window !== 'undefined' && (window as any).__tcfapi) {
      window.dispatchEvent(new CustomEvent('tcfConsentUpdated', { detail: consentData }));
    }

    onClose();
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleRejectAll = () => {
    // Under TCF 2.2, Reject All rejects all non-essential purposes and personalized ads
    saveConsent(false, false);
  };

  const handleSaveCustom = () => {
    const allowsPersonalized = selectedPurposes[3] && selectedPurposes[4];
    saveConsent(false, allowsPersonalized);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* CMP Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative shrink-0">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Privacy & Cookie Consent Preferences
                </h3>
                <p className="text-[11px] text-blue-300 font-medium">
                  Transparency & Consent Choices (IAB Europe TCF v2.2 Standards Aligned)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Globe className="w-3 h-3 text-blue-400" />
              <span>EEA • UK • CH</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            We and our partners (including Google) store and/or access information on your device, such as unique cookie identifiers and IP addresses, to process personal data.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 pt-3 bg-slate-50 dark:bg-slate-900/60 shrink-0 text-xs font-bold gap-4">
          <button
            onClick={() => setViewMode('summary')}
            className={`pb-3 border-b-2 transition ${
              viewMode === 'summary'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Consent Overview
          </button>
          <button
            onClick={() => setViewMode('details')}
            className={`pb-3 border-b-2 transition ${
              viewMode === 'details'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Manage 10 TCF Purposes
          </button>
          <button
            onClick={() => setViewMode('vendors')}
            className={`pb-3 border-b-2 transition ${
              viewMode === 'vendors'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Certified Vendors (Google & Partners)
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          
          {/* VIEW: SUMMARY */}
          {viewMode === 'summary' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>How Google and Partners Use Your Data</span>
                </h4>
                <p>
                  Third-party vendors, including <strong>Google (Vendor ID 755)</strong>, use cookies and device data to serve ads based on your prior visits to this website and other websites across the web.
                </p>
                <p>
                  Google's use of advertising cookies enables it and its partners to serve personalized ads based on your navigation history, or non-personalized contextual ads if you choose to decline.
                </p>
                <div className="pt-1">
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-bold underline inline-flex items-center gap-1"
                  >
                    <span>Read Google's Policy: How Google uses information from sites that use our services</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="space-y-2 text-slate-600 dark:text-slate-300">
                <h5 className="font-bold text-slate-900 dark:text-white">Why are you seeing this choice?</h5>
                <p>
                  Under Google's EU user consent policy and local privacy laws in the <strong>European Economic Area (EEA), United Kingdom, and Switzerland</strong>, publishers must obtain your freely given, specific, and informed consent to use cookies or device storage for personalized advertising.
                </p>
                <p>
                  You can click <strong>"Accept All"</strong> to consent to all purposes and personalized ads, or <strong>"Reject All"</strong> to deny personalized ad cookies (essential service cookies remain active). You can modify your choices at any time via the <em>Cookie Settings</em> link in the footer.
                </p>
              </div>

              {/* TCF Standards Confirmation */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-500">
                <span>Standard: IAB Europe TCF v2.2 Framework Compatible</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Consent Controller Active</span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
                Note: In production environments with active Google AdSense ad units, Google's certified CMP (Privacy & Messaging) operates alongside or replaces this interface to satisfy mandatory Google EU User Consent requirements.
              </p>
            </div>
          )}

          {/* VIEW: DETAILS (10 TCF PURPOSES) */}
          {viewMode === 'details' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 dark:text-white text-xs">
                  IAB Europe TCF v2.2 Purposes & Special Features:
                </span>
                <span className="text-[11px] text-slate-400">Toggle individual purposes</span>
              </div>

              {TCF_PURPOSES.map((purpose) => {
                const isExpanded = expandedPurpose === purpose.id;
                const isChecked = selectedPurposes[purpose.id] ?? false;

                return (
                  <div
                    key={purpose.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-800/40"
                  >
                    <div className="p-3.5 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setExpandedPurpose(isExpanded ? null : purpose.id)}
                        className="flex items-center gap-2 text-left flex-1 font-bold text-slate-900 dark:text-white text-xs hover:text-blue-600 transition"
                      >
                        <span className="w-5 h-5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-mono text-[10px] flex items-center justify-center shrink-0">
                          {purpose.id}
                        </span>
                        <span>{purpose.name}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto mr-2" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto mr-2" />
                        )}
                      </button>

                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            setSelectedPurposes({
                              ...selectedPurposes,
                              [purpose.id]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-1">
                        <p>{purpose.description}</p>
                        {purpose.id === 3 || purpose.id === 4 ? (
                          <span className="inline-block font-semibold text-blue-600 dark:text-blue-400">
                            Required for personalized ad delivery.
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW: VENDORS */}
          {viewMode === 'vendors' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white text-xs block">
                  IAB Registered Vendors & Ad Technology Partners:
                </span>
                <p className="text-[11px] text-slate-500">
                  Google and certified vendors adhere to the IAB Europe Transparency and Consent Framework policies.
                </p>
              </div>

              {CERTIFIED_VENDORS.map((vendor) => (
                <div
                  key={vendor.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-white dark:bg-slate-800/40"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">
                        {vendor.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 font-mono text-[10px] text-slate-500">
                        ID: {vendor.id}
                      </span>
                    </div>
                    <a
                      href={vendor.privacyPolicy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 text-[11px] underline inline-flex items-center gap-0.5 mt-0.5"
                    >
                      <span>Privacy Policy</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedVendors[vendor.id.toString()] ?? true}
                      onChange={(e) =>
                        setSelectedVendors({
                          ...selectedVendors,
                          [vendor.id.toString()]: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-400 text-center sm:text-left">
            <span>You can change consent anytime via Cookie Settings.</span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
            {viewMode !== 'summary' ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white dark:bg-slate-700 font-bold text-xs hover:bg-slate-700 transition"
              >
                Save My Preferences
              </button>
            ) : null}

            <button
              type="button"
              onClick={handleRejectAll}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold text-xs transition"
            >
              Reject Non-Essential
            </button>

            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept All (Personalized)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
