import React from 'react';
import { 
  AlertTriangle, Shield, Cookie, ExternalLink, Info, CheckCircle2, 
  Mail, FileText, Lock, Globe, RefreshCw, Server, HelpCircle, Scale
} from 'lucide-react';

export const DisclaimerSection: React.FC<{ onNavigateToTerms?: () => void }> = ({ onNavigateToTerms }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/50 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Official Website Disclaimer
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Google AdSense Policy Compliant
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              Effective: August 3, 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Scale className="w-8 h-8 sm:w-11 sm:h-11 text-amber-400 shrink-0" />
            <span>Legal Disclaimer & Usage Limits</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Please read this legal disclaimer carefully before using TempInbox. This statement details service boundaries, third-party advertising disclosures under Google AdSense policies, and ephemeral email usage warnings.
          </p>
        </div>
      </div>

      {/* Main Content Modules */}
      <div className="space-y-8">

        {/* Critical Red Warning Banner */}
        <div className="p-6 bg-red-50 dark:bg-red-950/40 border-2 border-red-500/80 rounded-2xl space-y-3">
          <div className="flex items-center gap-2.5 text-red-700 dark:text-red-400 font-extrabold text-base sm:text-lg">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <span>CRITICAL WARNING: Do Not Use TempInbox for Primary or Sensitive Accounts</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            TempInbox provides strictly <strong>ephemeral, disposable inbound email addresses</strong>. Incoming messages automatically expire and are permanently purged from volatile RAM upon session expiration.
          </p>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-red-200 dark:border-red-900/60 text-xs space-y-1.5 text-slate-800 dark:text-slate-200">
            <p className="font-bold text-red-600 dark:text-red-400">Strictly Prohibited Use Cases:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
              <li>Do NOT use TempInbox for primary banking, cryptocurrency wallets, or financial institutions.</li>
              <li>Do NOT use TempInbox for permanent personal accounts, healthcare portals, or government tax filings.</li>
              <li>Do NOT use TempInbox for services where future password reset or two-factor recovery (2FA) access may be required.</li>
            </ul>
          </div>
        </div>

        {/* 1. General "AS IS" Disclaimer */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Info className="w-5 h-5 text-blue-600" />
            <span>1. General Website & Service Disclaimer</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              The information and services provided on <strong>TempInbox.solutions</strong> (accessible at <span className="font-semibold text-slate-900 dark:text-white">https://tempinbox.solutions</span>) are for general information, testing, privacy protection, and developer automation purposes only.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-xs uppercase tracking-wide text-slate-700 dark:text-slate-200">
              ALL SERVICES, TEMPORARY MAILBOXES, API ENDPOINTS, AND GENERATED ADDRESSES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
            </div>
            <p>
              TempInbox makes no representations or warranties regarding the completeness, accuracy, reliability, suitability, or availability of email delivery, MX routing nodes, or uptime. Any reliance you place on such information or services is strictly at your own risk.
            </p>
          </div>
        </div>

        {/* 2. Google AdSense & Third-Party Advertising Policy Disclaimer */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border-2 border-blue-500/70 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Cookie className="w-5 h-5 text-amber-500" />
              <span>2. Google AdSense & Advertising Transparency Disclosure</span>
            </h2>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-600 text-white uppercase">
              AdSense Compliant
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            <p>
              To keep TempInbox free for users worldwide, we participate in the <strong>Google AdSense</strong> program and serve contextual third-party advertisements.
            </p>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                Important AdSense & Advertising Disclosures:
              </h4>

              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Third-Party Vendor Cookies:</strong> Google and other third-party vendors use cookies to serve advertisements based on your prior visits to TempInbox or other websites on the Internet.
                </li>
                <li>
                  <strong>No Product Endorsement:</strong> Advertisements appearing on TempInbox do not constitute an endorsement, recommendation, or warranty by TempInbox regarding the advertised products, services, or companies.
                </li>
                <li>
                  <strong>Ad Placement Standards:</strong> We follow Google Publisher Policies strictly. Advertisements are clearly separated from functional email inbox controls to prevent accidental ad clicks or deceptive user flows.
                </li>
                <li>
                  <strong>User Opt-Out Controls:</strong> You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold underline inline-flex items-center gap-1">Google Ads Settings <ExternalLink className="w-3 h-3" /></a> or <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold underline inline-flex items-center gap-1">www.aboutads.info <ExternalLink className="w-3 h-3" /></a>.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. External Links Disclaimer */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span>3. External Hyperlinks Disclaimer</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              TempInbox may contain links to external third-party websites or content contained within incoming temporary emails. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, or completeness by TempInbox.
            </p>
            <p>
              We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through our platform or within incoming emails.
            </p>
          </div>
        </div>

        {/* 4. Limitation of Liability */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>4. Limitation of Liability</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Under no circumstances shall TempInbox, its developers, operators, or hosting partners be liable to you for any loss or damage of any kind (including direct, indirect, incidental, consequential, or special damages) incurred as a result of:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li>Failure to receive, parse, or display an incoming email message or OTP verification code.</li>
              <li>Expiration or automated deletion of temporary mailboxes and message contents.</li>
              <li>Loss of access to third-party accounts created using temporary email addresses.</li>
              <li>Unauthorized access resulting from user disclosure of temporary mailbox addresses.</li>
            </ul>
          </div>
        </div>

        {/* Footer Contact & Policy Quick Links */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>Legal & Policy Support Inquiries</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              For questions regarding this disclaimer, DMCA copyright notices, or abuse reporting, please contact us.
            </p>
            <p className="text-xs font-semibold text-blue-300">
              Compliance Email: <a href="mailto:support@tempinbox.solutions" className="underline font-bold text-white">support@tempinbox.solutions</a>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigateToTerms && (
              <button
                onClick={onNavigateToTerms}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Terms & Privacy</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
