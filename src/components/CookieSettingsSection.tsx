import React, { useState, useEffect } from 'react';
import { 
  Cookie, Shield, CheckCircle2, ExternalLink, Info, Lock, 
  Settings, Check, Globe, HelpCircle, AlertCircle,
  ShieldCheck, Layers, ChevronRight, Terminal, RefreshCw, Cpu
} from 'lucide-react';
import { isCertifiedCmpActive, reopenCmpSettings, getConsentStatus } from '../utils/cmpIntegration';

interface CookieSettingsSectionProps {
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
}

export const CookieSettingsSection: React.FC<CookieSettingsSectionProps> = ({ 
  onNavigateToTerms, 
  onNavigateToPrivacy 
}) => {
  const [cmpActive, setCmpActive] = useState<boolean>(false);
  const [reopenFeedback, setReopenFeedback] = useState<string | null>(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  useEffect(() => {
    setCmpActive(isCertifiedCmpActive());
  }, []);

  const handleLaunchCmp = () => {
    const res = reopenCmpSettings();
    if (res.success) {
      setReopenFeedback('Launching certified CMP settings dialog...');
      setTimeout(() => setReopenFeedback(null), 4000);
    } else {
      setReopenFeedback('No certified CMP script loaded yet. Site is running in default Zero-Tracking mode.');
      setTimeout(() => setReopenFeedback(null), 6000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/50 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              Privacy & Consent Architecture
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Google Certified CMP Ready
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              Zero-Tracking by Default
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Settings className="w-8 h-8 sm:w-11 sm:h-11 text-blue-400 shrink-0" />
            <span>Privacy & Cookie Preferences</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            TempInbox is built on strict data minimization. We do not use tracking cookies or advertising profiles by default. Review our certified Consent Management Platform (CMP) integration, Google Consent Mode v2 defaults, and external opt-out choices below.
          </p>
        </div>
      </div>

      <div className="space-y-8">

        {/* Certified CMP Status Box */}
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${cmpActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {cmpActive ? 'Google-Certified CMP Active' : 'CMP Integration Bridge: Ready & Standby'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                {cmpActive 
                  ? 'A certified Consent Management Platform is actively governing advertising and analytics consent according to IAB Europe TCF v2.2 specifications.'
                  : 'TempInbox does not simulate legal consent with fake custom banners. In compliance with Google requirements for the EEA, UK, and Switzerland, advertising consent will be managed exclusively by a Google-certified CMP upon AdSense activation.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleLaunchCmp}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Layers className="w-4 h-4" />
                <span>Reopen CMP Settings</span>
              </button>
            </div>
          </div>

          {reopenFeedback && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-blue-500" />
              <span>{reopenFeedback}</span>
            </div>
          )}

          {/* Core Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Zero Tracking by Default
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Google Consent Mode v2 is hardcoded to default <code>denied</code> for all ad storage, personalization, and analytics prior to explicit user consent.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                No Fake Consent Simulation
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We reject simulated "Accept All" banners. Only genuine, IAB Europe TCF v2.2 registered CMPs (like Google AdSense Privacy & Messaging) are authorized to collect consent.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                100% Core Functionality Preserved
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Refusing marketing consent never degrades disposable email generation, live message delivery, attachment extraction, guides, or risk calculation tools.
              </p>
            </div>

          </div>
        </div>

        {/* Cookie Categories Disclosure */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Cookie className="w-5 h-5 text-amber-500" />
              <span>Cookie & Storage Category Transparency</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Detailed breakdown of data storage mechanisms utilized by this website.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Category 1: Strictly Necessary */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Essential Client-Side State</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 uppercase">
                    Active (No Tracking)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Used exclusively to remember your interface preferences (such as dark mode selection) and temporary in-memory session tokens during an active visit. No personal identifiers or behavioral profiles are retained.
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Type:</strong> Browser <code>localStorage</code> • <strong>Domain:</strong> First-party only • <strong>Lifespan:</strong> Ephemeral
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>Strictly Necessary</span>
              </div>
            </div>

            {/* Category 2: Future Advertising */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Google AdSense Contextual & Personalized Cookies</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase">
                    Gated Behind Certified CMP
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  When enabled via an approved Google AdSense publisher deployment, Google and its certified vendor partners may use cookies to serve ads, prevent fraud, and measure ad viewability on educational pages. Tool and inbox pages are strictly excluded from all advertising.
                </p>
                <div className="pt-1">
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 text-xs font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Google's Advertising Privacy & Partner Disclosures</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Subject to CMP</span>
              </div>
            </div>

            {/* Category 3: Analytics */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Analytics & Measurement</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase">
                    Disabled
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  TempInbox does not currently run Google Analytics or third-party web trackers. If aggregate telemetry is introduced in the future, it will be strictly gated behind certified user consent.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Check className="w-4 h-4 text-slate-400" />
                <span>Inactive</span>
              </div>
            </div>

          </div>
        </div>

        {/* Global Opt-Out Resources */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>Independent Industry Opt-Out Portals</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In addition to on-site CMP controls, you can globally opt out of personalized advertising cookies across hundreds of ad tech vendors via official self-regulatory programs:
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs inline-flex items-center gap-1.5 transition"
            >
              <span>Google Ad Settings</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://www.youronlinechoices.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs inline-flex items-center gap-1.5 transition"
            >
              <span>YourOnlineChoices (EEA & UK)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://www.aboutads.info/choices"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs inline-flex items-center gap-1.5 transition"
            >
              <span>Digital Advertising Alliance (USA)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Developer Integration Details Accordion */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900/40">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Technical Architecture: Connecting Google AdSense Privacy & Messaging CMP
              </span>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showTechnicalDetails ? 'rotate-90' : ''}`} />
          </button>

          {showTechnicalDetails && (
            <div className="px-6 pb-6 pt-2 space-y-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <p>
                TempInbox includes complete scaffolding for Google's official Privacy & Messaging CMP (formerly Funding Choices).
              </p>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">1. Google Consent Mode v2 Default State:</h4>
                <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl overflow-x-auto font-mono text-[11px]">
{`gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});`}
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">2. IAB Europe TCF v2.2 & Google FC Revocation Stub:</h4>
                <p>
                  <code>index.html</code> includes the standard TCF v2.2 stub and registers <code>window.googlefc.callbackQueue</code>. The global footer button automatically invokes <code>window.googlefc.showRevocationMessage()</code>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">3. When Approved by Google AdSense:</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Navigate to AdSense &gt; <em>Privacy & messaging</em> &gt; <em>European regulations</em>.</li>
                  <li>Click <em>Create GDPR message</em> and select your domain name.</li>
                  <li>Publish the message. Google will automatically serve the certified CMP modal.</li>
                  <li>No additional cookie banner library or custom buttons needed.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Link */}
        <div className="text-center pt-2">
          {onNavigateToPrivacy && (
            <button
              onClick={onNavigateToPrivacy}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Review Complete Privacy Policy & Data Processing Disclosures</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
