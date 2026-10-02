import React, { useState, useEffect } from 'react';
import { 
  Cookie, Shield, CheckCircle2, ExternalLink, Info, Lock, 
  Settings, RefreshCw, Save, Check, Globe, HelpCircle, AlertCircle,
  ShieldCheck, Layers, ChevronRight
} from 'lucide-react';

export const CookieSettingsSection: React.FC<{ 
  onNavigateToTerms?: () => void;
  onOpenCmp?: () => void;
}> = ({ onNavigateToTerms, onOpenCmp }) => {
  // Cookie Preferences State
  const [essentialCookies] = useState<boolean>(true); // Always true & disabled
  const [adsenseCookies, setAdsenseCookies] = useState<boolean>(true);
  const [analyticsCookies, setAnalyticsCookies] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedPrefs = localStorage.getItem('tempinbox_cookie_prefs');
      if (savedPrefs) {
        const parsed = JSON.parse(savedPrefs);
        if (typeof parsed.adsense === 'boolean') setAdsenseCookies(parsed.adsense);
        if (typeof parsed.analytics === 'boolean') setAnalyticsCookies(parsed.analytics);
      }
    } catch (e) {
      console.error('Failed to parse cookie preferences', e);
    }
  }, []);

  const handleSavePreferences = () => {
    try {
      const prefs = {
        essential: true,
        adsense: adsenseCookies,
        analytics: analyticsCookies,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('tempinbox_cookie_prefs', JSON.stringify(prefs));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('Failed to save cookie preferences', e);
    }
  };

  const handleAcceptAll = () => {
    setAdsenseCookies(true);
    setAnalyticsCookies(true);
    try {
      const prefs = {
        essential: true,
        adsense: true,
        analytics: true,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('tempinbox_cookie_prefs', JSON.stringify(prefs));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('Failed to save cookie preferences', e);
    }
  };

  const handleRejectNonEssential = () => {
    setAdsenseCookies(false);
    setAnalyticsCookies(false);
    try {
      const prefs = {
        essential: true,
        adsense: false,
        analytics: false,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('tempinbox_cookie_prefs', JSON.stringify(prefs));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('Failed to save cookie preferences', e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/50 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Cookie className="w-3.5 h-3.5 text-amber-400" />
              Consent Preference Center
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              IAB Europe TCF v2.2 Certified
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              EEA, UK & Swiss Compliant
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Settings className="w-8 h-8 sm:w-11 sm:h-11 text-amber-400 shrink-0" />
            <span>Cookie Settings & CMP Manager</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Manage your cookie settings, advertising cookies, and Google AdSense personalization preferences. You can adjust your consent choices or re-open our certified Consent Management Platform (CMP) at any time.
          </p>
        </div>
      </div>

      {/* Main Content Modules */}
      <div className="space-y-8">

        {/* TCF Certified CMP Action Box */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/60 rounded-2xl border-2 border-blue-500/70 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                IAB Europe TCF v2.2 Certified Consent Management Platform
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              For visitors in the European Economic Area (EEA), United Kingdom (UK), and Switzerland, Google requires a certified CMP. Launch our interactive dialog to inspect all 10 TCF purposes and vendor disclosures.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {onOpenCmp && (
              <button
                type="button"
                onClick={onOpenCmp}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Launch TCF v2.2 CMP Banner</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Preference Controls Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <Cookie className="w-6 h-6 text-amber-500" />
                <span>Quick Category Preferences</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Toggle categories below to customize your browsing privacy experience.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition"
              >
                Accept All
              </button>
            </div>
          </div>

          {/* Cookie Item 1: Essential Cookies */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Strictly Essential Cookies</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Required for core website operations, such as storing dark/light theme choice, active temporary inbox session state, and language selection in local storage. Cannot be turned off.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <input
                type="checkbox"
                checked={essentialCookies}
                disabled
                className="w-5 h-5 rounded text-blue-600 bg-slate-200 border-slate-300 cursor-not-allowed opacity-70"
              />
            </div>
          </div>

          {/* Cookie Item 2: Advertising & AdSense Cookies */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Google AdSense & Advertising Cookies</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 uppercase">
                  TCF Purposes 3, 4
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Used by Google AdSense and third-party ad networks to serve contextual or personalized advertisements, measure ad performance, and prevent ad fraud.
              </p>
              <div className="pt-1">
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-xs font-semibold underline inline-flex items-center gap-1"
                >
                  <span>Learn how Google uses data from sites using our services</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={adsenseCookies}
                  onChange={(e) => setAdsenseCookies(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Cookie Item 3: Analytics & Performance Cookies */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Analytics & Performance Cookies</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 uppercase">
                  TCF Purposes 7, 8, 9
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Aggregated, anonymized telemetry tracking server response latency and error rates to optimize edge server nodes. No personal identification tracking.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsCookies(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Save Button & Confirmation Toast */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Preferences are stored locally on your device for 365 days.
            </div>

            <div className="flex items-center gap-3">
              {saved && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                  <Check className="w-4 h-4" />
                  Preferences Saved!
                </span>
              )}
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Current Preferences</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Google Help Information Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Info className="w-6 h-6 text-blue-600" />
            <span>Google AdSense Cookies & Industry Opt-Out Resources</span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Google uses cookies to help serve the ads that it displays on the websites of its partners, such as websites displaying AdSense ads or participating in Google certified ad networks. When users visit a partner's website, a cookie may be dropped on that end user's browser.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Personalized vs Contextual Ads</h4>
                <p className="text-xs">
                  If personalized advertising is disabled, Google will not use cookies to create an interest profile for you. You will still receive advertisements, but they will be selected using contextual factors such as the topic of the web page or coarse non-personal location.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Global & Regional Opt-Out Hubs</h4>
                <p className="text-xs">
                  You can opt out of personalized advertising from dozens of ad networks at once via self-regulatory industry programs:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-semibold underline text-xs inline-flex items-center gap-0.5"
                  >
                    <span>Google Ads Settings</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.aboutads.info/choices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-semibold underline text-xs inline-flex items-center gap-0.5"
                  >
                    <span>AboutAds (USA)</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.youronlinechoices.eu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-semibold underline text-xs inline-flex items-center gap-0.5"
                  >
                    <span>YourOnlineChoices (EU/UK)</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Link */}
        {onNavigateToTerms && (
          <div className="text-center">
            <button
              onClick={onNavigateToTerms}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Privacy Policy and Terms of Service</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
