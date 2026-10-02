import React, { useState } from 'react';
import { 
  FileText, Shield, Cookie, Search, Printer, Copy, Check, ExternalLink, 
  AlertTriangle, Lock, Globe, Scale, Mail, HelpCircle, CheckCircle2, ChevronRight,
  Info, Eye, Server, RefreshCw
} from 'lucide-react';

export const TermsOfServiceSection: React.FC<{ initialTab?: 'terms' | 'privacy' | 'cookies' }> = ({ initialTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'cookies'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleCopyText = () => {
    const textToCopy = `TempInbox - Terms of Service & Google AdSense Policy Compliance\nLast Updated: August 3, 2026\nURL: https://tempinbox.org\n\n1. Acceptance of Terms\nBy accessing TempInbox, you agree to these Terms of Service...`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/50 shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Google AdSense Compliant
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                GDPR & CCPA Aligned
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Effective: August 3, 2026
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 shrink-0" />
              <span>Terms of Service & Usage Policy</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Official binding agreement governing the use of TempInbox ephemeral email services, dynamic temporary inbox generation, API integrations, and third-party advertising compliance.
            </p>
          </div>

          {/* Tools / Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyText}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-blue-900/30"
            >
              <Printer className="w-4 h-4" />
              <span>Print Page</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>1. Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>2. Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'cookies'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>3. Google AdSense & Cookies</span>
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Quick Navigation Index & Key Highlights */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm sticky top-20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Section Table of Contents</span>
            </h3>

            {/* Search Filter */}
            <div className="relative mb-4">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search terms (e.g. AdSense, liability)..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <nav className="space-y-1 text-xs font-medium text-slate-600 dark:text-slate-300">
              <a href="#section-1" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                1. Acceptance & User Eligibility
              </a>
              <a href="#section-2" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                2. Ephemeral Mailbox Scope
              </a>
              <a href="#section-3" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-amber-600 dark:text-amber-400 font-semibold">
                3. Acceptable Use Policy (AUP)
              </a>
              <a href="#section-4" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-blue-600 dark:text-blue-400 font-bold">
                4. Google AdSense Disclosures
              </a>
              <a href="#section-5" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                5. Cookies & Local Storage
              </a>
              <a href="#section-6" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                6. "AS IS" Warranty Disclaimer
              </a>
              <a href="#section-7" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                7. Limitation of Liability
              </a>
              <a href="#section-8" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                8. Intellectual Property
              </a>
              <a href="#section-9" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                9. Access Restrictions
              </a>
              <a href="#section-10" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                10. Support & Abuse Reporting
              </a>
            </nav>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>AdSense Publisher Notice</span>
                </div>
                <p>
                  This site displays third-party ads provided by Google AdSense. Google uses cookies to serve ads based on user visits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Exhaustive Legal Clauses */}
        <div className="lg:col-span-3 space-y-8">

          {/* TAB 1: TERMS OF SERVICE */}
          {(activeTab === 'terms' || searchQuery !== '') && (
            <div className="space-y-8">
              
              {/* Section 1 */}
              <section id="section-1" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Acceptance of Terms & User Eligibility
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Welcome to <strong>TempInbox</strong> (accessible at <span className="font-semibold text-slate-900 dark:text-white">https://tempinbox.org</span> or via our web interfaces and API endpoints). By accessing, browsing, generating a temporary mailbox, or using any service provided by TempInbox, you express your full, unreserved acceptance of these Terms of Service.
                  </p>
                  <p>
                    If you do not agree with any part of these terms, you are explicitly prohibited from accessing or using the platform.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5 text-slate-700 dark:text-slate-200">
                    <p className="font-bold text-slate-900 dark:text-white">Age & Capacity Requirements:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>You must be at least 18 years of age, or the legal age of majority in your jurisdiction, to enter into a binding agreement.</li>
                      <li>If you are under 18 years of age, you may use TempInbox only with the active consent and supervision of a parent or legal guardian who agrees to be bound by these Terms.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="section-2" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Ephemeral Service Scope & Inbound Mail Rules
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    TempInbox is designed exclusively as an <strong>ephemeral, temporary inbound email receipt service</strong>.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Volatile RAM Retention:</strong> Incoming messages, verification codes, and attachments are stored strictly in volatile system memory (RAM) with dynamic Time-To-Live (TTL) expiration counters (ranging from 1 hour to 7 days based on user configuration).
                    </li>
                    <li>
                      <strong>Automated Zero-Trace Purging:</strong> Upon expiration of the mailbox lifecycle, messages and associated metadata are automatically and permanently zeroed out from system memory. Once erased, data is 100% unrecoverable by any party.
                    </li>
                    <li>
                      <strong>No Outbound Sending Capability:</strong> To eliminate spam relay abuse, TempInbox does NOT permit users to send outbound emails to external domains. The service is strictly inbound-only.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="section-3" className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Acceptable Use Policy (AUP) & Prohibited Conduct</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 uppercase">
                      Strictly Enforced
                    </span>
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    You agree to use TempInbox solely for lawful, legitimate privacy testing, QA automation, personal data isolation, and educational purposes. You are strictly prohibited from engaging in any of the following activities:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl space-y-1">
                      <div className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Illegal Activities & Fraud</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Using temporary mailboxes to commit identity theft, bank fraud, money laundering, extortion, cyberstalking, or bypass legal court orders.
                      </p>
                    </div>

                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl space-y-1">
                      <div className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Malware & Exploits</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Distributing viruses, trojans, ransomware, phishing payloads, or conducting botnet control operations.
                      </p>
                    </div>

                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl space-y-1">
                      <div className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Automated Denial of Service</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Launching DDoS attacks, flooding TempInbox edge servers, scraping data aggressively, or disrupting service availability for other users.
                      </p>
                    </div>

                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl space-y-1">
                      <div className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Account Compromise</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Attempting unauthorized access to system infrastructure, bypassing rate limits, or reverse-engineering proprietary server components.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    TempInbox actively monitors network traffic for automated threat patterns. Violators will face immediate IP blocking, API key revocation, and reporting to relevant law enforcement agencies where legally mandated.
                  </p>
                </div>
              </section>

              {/* Section 4: AdSense Disclosure */}
              <section id="section-4" className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border-2 border-blue-500/80 rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow">
                    4
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Google AdSense & Third-Party Advertising Disclosures</span>
                      <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">
                        Mandatory Notice
                      </span>
                    </h2>
                    <p className="text-xs text-blue-700 dark:text-blue-300 font-semibold">
                      Full Compliance with Google Publisher Policies & General Ad Disclosures
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  <p>
                    TempInbox relies on unobtrusive advertising revenues to provide free ephemeral email services to users worldwide. We partner with <strong>Google AdSense</strong> and authorized third-party ad networks to serve contextual advertisements.
                  </p>

                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-200 dark:border-blue-800/80 space-y-3">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <Cookie className="w-4 h-4 text-blue-600" />
                      <span>Google AdSense Cookie & Advertising Policy Statements:</span>
                    </h4>

                    <ul className="list-disc pl-5 space-y-2 text-xs">
                      <li>
                        <strong>Use of Third-Party Cookies:</strong> Third-party vendors, including Google, use cookies to serve advertisements based on a user's prior visits to TempInbox or other websites on the Internet.
                      </li>
                      <li>
                        <strong>Google's Advertising Cookies (DoubleClick / DART Cookie):</strong> Google's use of advertising cookies enables it and its partners to serve personalized or contextual advertisements to users based on their navigation history across websites on the Web.
                      </li>
                      <li>
                        <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising served by Google at any time by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold underline inline-flex items-center gap-1">Google Ads Settings <ExternalLink className="w-3 h-3" /></a>.
                      </li>
                      <li>
                        <strong>Network Advertising Initiative Opt-Out:</strong> Alternatively, users can opt out of third-party vendors' use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold underline inline-flex items-center gap-1">www.aboutads.info <ExternalLink className="w-3 h-3" /></a>.
                      </li>
                      <li>
                        <strong>Google's Privacy & Terms:</strong> For detailed information on how Google manages data in its ad products, please consult <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold underline inline-flex items-center gap-1">Google Privacy & Terms <ExternalLink className="w-3 h-3" /></a>.
                      </li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Strict Data Isolation Guarantee:</strong> TempInbox never sells, scans, or shares the private contents of your temporary emails with advertisers, ad networks, or data brokers. Advertisements are rendered cleanly in isolated sandboxes.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="section-5" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Cookies, Web Beacons & Local Storage
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    TempInbox utilizes minimal client-side <strong>Local Storage</strong> and essential cookies strictly necessary for core application functionality:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs">
                    <li><strong>Functional Local Storage:</strong> Preserving dark mode display preference, language selection (English, French, German, Spanish, etc.), and active temporary mailbox address state so your session remains seamless upon page refresh.</li>
                    <li><strong>Analytics & Performance:</strong> Anonymous server performance metrics (page request duration, delivery latency) to maintain edge node health. No personal tracking vectors are stored.</li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section id="section-6" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    "AS IS" Warranty Disclaimer & Ephemeral Data Warning
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs uppercase tracking-wide text-slate-700 dark:text-slate-200">
                    THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                  </div>
                  <p>
                    TempInbox does NOT guarantee 100% continuous uptime, uninterrupted email receipt, or long-term data preservation.
                  </p>
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 rounded-xl text-xs space-y-1 text-amber-900 dark:text-amber-200">
                    <strong className="block font-bold">CRITICAL WARNING FOR USER REGISTRATIONS:</strong>
                    <p>
                      Temporary inboxes are short-lived. <strong>DO NOT use TempInbox for critical primary accounts</strong> (such as primary banking, government tax portals, primary cloud storage logins, or personal health records) where permanent password recovery access is required in the future.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section id="section-7" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    7
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Limitation of Liability & Indemnification
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    To the maximum extent permitted under applicable law, TempInbox, its operators, officers, developers, and infrastructure providers shall NOT be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Loss of business profits, goodwill, or commercial opportunities.</li>
                    <li>Unreceived or delayed email messages, expired OTP codes, or failed verification attempts.</li>
                    <li>Third-party service account lockouts or account terminations resulting from temporary email usage.</li>
                    <li>Unauthorized access resulting from user sharing of temporary inbox addresses.</li>
                  </ul>
                  <p>
                    In no event shall TempInbox's total aggregate liability exceed $100.00 USD. You agree to defend, indemnify, and hold harmless TempInbox against any claims or legal costs arising from your violation of these Terms.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="section-8" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    8
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Intellectual Property Rights
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    All brand logos, trademarks, codebases, UI component designs, custom icons, graphics, and text on TempInbox are the intellectual property of TempInbox operators.
                  </p>
                  <p>
                    You are granted a non-exclusive, non-transferable, revocable license to access the web application for personal or internal testing purposes in accordance with these Terms.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="section-9" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    9
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Access Termination & Service Modifications
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    TempInbox reserves the right to modify, suspend, or terminate service operations, active domain pools, or specific IP access ranges at any time without prior notice or liability.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="section-10" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    10
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    DMCA Copyright, Abuse Reporting & Support Contact
                  </h2>
                </div>
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    If you believe material hosted or processed on TempInbox infringes upon your copyright, or if you wish to report system abuse, please contact our Legal & Compliance Team:
                  </p>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>Official Compliance & Abuse Desk:</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Email: <a href="mailto:support@tempinbox.org" className="font-bold text-blue-600 dark:text-blue-400 underline">support@tempinbox.org</a>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Response SLA: We review legal DMCA requests and abuse reports within 24 to 48 business hours.
                    </p>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Google AdSense Policy Compliant
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                    GDPR & CCPA Aligned
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-7 h-7 text-blue-600 shrink-0" />
                  <span>Privacy Policy & Data Transparency</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Last Updated: August 3, 2026 • Official Privacy Statement for TempInbox
                </p>
              </div>

              {/* Zero-Persistence Architecture Overview */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Zero-Persistence Architecture & Privacy Guarantees</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  TempInbox is engineered ground-up around a strict <strong>Zero-Persistence Architecture</strong>. We believe the safest way to protect user privacy is by not collecting or storing personal data in the first place.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>No Registration</span>
                    </div>
                    <p className="text-[11px] text-slate-500">No account creation, passwords, phone numbers, or emails required.</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-blue-500" />
                      <span>Volatile RAM Only</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Incoming emails live exclusively in ephemeral system RAM with dynamic TTL.</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Automated Purging</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Messages auto-erase upon expiration and are 100% unrecoverable.</p>
                  </div>
                </div>
              </div>

              {/* SECTION: Google AdSense Mandatory Disclosures & Data Usage by Google and Partners */}
              <div className="bg-gradient-to-r from-indigo-900/10 via-blue-900/10 to-indigo-900/10 dark:from-indigo-950/60 dark:via-blue-950/60 dark:to-indigo-950/60 border-2 border-blue-500/80 rounded-2xl p-5 sm:p-7 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Cookie className="w-5 h-5 text-amber-500" />
                    <span>Advertising Cookies, Google Partner Data Usage & TCF CMP Requirements</span>
                  </h3>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-600 text-white uppercase">
                    Google AdSense & CMP Mandate
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  In strict compliance with <strong>Google AdSense Program Policies</strong>, <strong>Google's EU User Consent Policy</strong>, and the <strong>Google Help Publisher Guidelines</strong>, this section explains the use of advertising cookies, how Google and its partners process user data, personalized advertising options, and the implementation of a certified Consent Management Platform (CMP) for users in the European Economic Area (EEA), the United Kingdom (UK), and Switzerland.
                </p>

                {/* Sub-card 1: Use of Advertising Cookies & Google Data Processing */}
                <div className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 text-xs text-slate-700 dark:text-slate-200">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                      <span>1. Use of Advertising Cookies by Third-Party Vendors & Google</span>
                    </h4>
                    <p className="pl-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                      Third-party vendors, including <strong>Google</strong>, use cookies and device identifiers to serve advertisements based on a user's prior visits to TempInbox or other websites across the Internet.
                    </p>
                    <p className="pl-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                      Google's use of advertising cookies (such as the Google ad cookie and DoubleClick cookie) enables it and its certified ad partners to serve advertisements to users based on their navigation history across this website and/or other destinations on the web.
                    </p>
                  </div>

                  {/* Mandatory Google Partner Link */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/60 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                      <ExternalLink className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Mandatory Disclosure: How Google Uses Information from Sites Using Its Services</span>
                    </div>
                    <p className="text-xs leading-relaxed">
                      Google uses data shared by websites that display AdSense advertisements to serve ads, evaluate ad performance, detect fraud, and improve Google services. For exhaustive details regarding Google's automated data ingestion and privacy protections, please consult the official Google Help documentation:
                    </p>
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-xs"
                    >
                      <span>How Google uses information from sites or apps that use our services</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Sub-card 2: Personalized vs Non-Personalized Advertising */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                      <span>2. Personalized Advertising vs. Non-Personalized Advertising</span>
                    </h4>
                    <div className="pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                      <p>
                        <strong>Personalized Advertising:</strong> When you consent to personalized advertising, Google and its advertising technology partners create and maintain an advertising profile reflecting your past browsing activity, search queries, general geographic location, and inferred interests to deliver tailored advertisements.
                      </p>
                      <p>
                        <strong>Non-Personalized Advertising:</strong> If you decline consent or opt out of personalized ads, ads served on TempInbox will be strictly contextual (determined by the current page topic, language, and non-precise coarse geolocation). Non-personalized ads do not use cookies for user interest profiling, but still use minimal cookies strictly necessary for frequency capping, aggregated ad reporting, and combating ad fraud and malicious traffic.
                      </p>
                    </div>
                  </div>

                  {/* Sub-card 3: Opt-Out Portals */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                      <span>3. How Users Can Opt Out of Personalized Advertising</span>
                    </h4>
                    <p className="pl-6 text-slate-600 dark:text-slate-300 mb-2">
                      You can manage your advertising preferences or opt out of personalized ad targeting across Google and third-party advertising networks using any of the following verified portals:
                    </p>
                    <div className="pl-6 flex flex-wrap gap-2.5">
                      <a
                        href="https://adssettings.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1.5 transition shadow-xs"
                      >
                        <span>Google Ads Settings</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://www.aboutads.info/choices"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg inline-flex items-center gap-1.5 transition border border-slate-200 dark:border-slate-700"
                      >
                        <span>Digital Advertising Alliance (AboutAds)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://www.youronlinechoices.eu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg inline-flex items-center gap-1.5 transition border border-slate-200 dark:border-slate-700"
                      >
                        <span>YourOnlineChoices (EDAA - Europe)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://optout.networkadvertising.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg inline-flex items-center gap-1.5 transition border border-slate-200 dark:border-slate-700"
                      >
                        <span>Network Advertising Initiative (NAI)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Sub-card 4: TCF Certified CMP Requirement for EEA, UK, Switzerland */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 bg-amber-50/60 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/60">
                    <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-xs sm:text-sm">
                      <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>4. Mandatory TCF-Certified CMP Requirements for EEA, UK, and Switzerland</span>
                    </div>
                    <div className="space-y-2 text-slate-700 dark:text-slate-200 text-xs leading-relaxed">
                      <p>
                        Under <strong>Google's EU User Consent Policy</strong> and requirements enforced by Google AdSense, publishers serving ads to users in the <strong>European Economic Area (EEA), the United Kingdom (UK), and Switzerland</strong> are required to use a <strong>Google-certified Consent Management Platform (CMP)</strong> that integrates with the <strong>IAB Europe Transparency and Consent Framework (TCF v2.2)</strong>.
                      </p>
                      <p>
                        In fulfillment of this requirement, TempInbox deploys a certified TCF v2.2 Consent Management Platform interface. Prior to loading personalized advertising scripts or cookies for visitors within the EEA, UK, or Switzerland, the CMP presents a standardized consent banner providing clear, equal-prominence choices to:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                        <li><strong>Accept All:</strong> Grant consent across all 10 standard IAB TCF purposes and authorized ad technology vendors (including Google Vendor ID 755).</li>
                        <li><strong>Reject All / Non-Essential:</strong> Deny consent for personalized advertising, profiling, and third-party tracking cookies (limiting ads strictly to non-personalized contextual inventory).</li>
                        <li><strong>Manage Options:</strong> Exercise granular consent control over specific TCF v2.2 purposes, legitimate interests, and individual certified vendors.</li>
                      </ul>
                      <p className="text-[11px] text-slate-500 pt-1">
                        Our CMP implementation exposes the standardized <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-900 dark:text-slate-100">window.__tcfapi</code> JavaScript stub and generates standardized Transparency and Consent (TC) Strings for real-time interoperability with Google tags and certified advertising networks.
                      </p>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        Visitors located in the EEA, UK, or Switzerland can review, alter, or revoke their consent choices at any time by clicking the "Cookie Settings" tab or the persistent "Cookie Choices (TCF v2.2)" trigger available throughout the application.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION: Information We Process & Collect */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span>Information We Collect & How It Is Used</span>
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Because TempInbox requires no account registration, we do not collect personal identifiers such as real names, home addresses, phone numbers, or credit card details. The data processed during your session includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs">
                    <li>
                      <strong>Temporary Inbound Message Contents:</strong> Received emails, verification codes, and text content are held strictly in temporary RAM. Email body content is never scanned for ad targeting, profile building, or commercial monetization.
                    </li>
                    <li>
                      <strong>Client UI Preferences (Local Storage):</strong> We save lightweight local storage entries on your browser to retain user-selected preferences (e.g. dark/light theme, selected display language, and current active temporary mailbox handle).
                    </li>
                    <li>
                      <strong>Server Technical Logs:</strong> Standard web server connection logs (IP address, user-agent string, timestamp) are retained temporarily in volatile memory for anti-abuse rate-limiting, botnet prevention, and DDoS attack mitigation before being automatically purged.
                    </li>
                  </ul>
                </div>
              </div>

              {/* SECTION: GDPR & CCPA Data Rights */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>GDPR (EU/UK) & CCPA/CPRA (California) Privacy Rights</span>
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Users residing in the European Economic Area (EEA), United Kingdom, or California possess specific statutory rights regarding personal data processing:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white">Right to Access & Deletion</span>
                      <p className="text-slate-500">Because TempInbox retains zero persistent user profiles, all temporary inbox data auto-deletes upon expiration. Users can also manually delete their inbox instantly with one click.</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white">Right to Opt Out of Sale / Sharing</span>
                      <p className="text-slate-500">TempInbox does NOT sell, rent, or trade user personal information to third parties. Ad personalization can be controlled directly via AdSense settings.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Contact Information */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Privacy Inquiries & Data Protection Contact</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  For questions regarding our Privacy Policy, Google AdSense compliance disclosures, or data security practices, please contact our Data Protection Officer:
                </p>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Email: <a href="mailto:privacy@tempinbox.org" className="underline">privacy@tempinbox.org</a> or <a href="mailto:support@tempinbox.org" className="underline">support@tempinbox.org</a>
                </p>
              </div>

            </div>
          )}

          {/* TAB 3: GOOGLE ADSENSE & COOKIES */}
          {activeTab === 'cookies' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cookie className="w-6 h-6 text-amber-500" />
                <span>Google AdSense, Cookies & Advertising Transparency</span>
              </h2>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 rounded-xl text-xs sm:text-sm text-blue-900 dark:text-blue-200 space-y-2">
                <p className="font-bold">Official Publisher Disclosure for Google AdSense Program Policies:</p>
                <p>
                  TempInbox displays third-party advertisements served by Google AdSense and its certified advertising network partners. This section details how advertising cookies, device identifiers, and personalized ad options are managed on this website.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">1. What Are Advertising Cookies & How Does Google Use Them?</h3>
                <p>
                  Cookies are small text data files placed on your browser by web servers. Third-party vendors, including <strong>Google</strong>, use cookies to serve advertisements based on your prior visits to TempInbox or other sites across the Internet.
                </p>
                <p>
                  Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet. For complete information on how Google manages information from sites using its ad services, please visit:
                </p>
                <div className="my-2">
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-xs hover:underline"
                  >
                    <span>How Google uses information from sites or apps that use our services</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base pt-2">2. Certified TCF v2.2 Consent Management Platform (EEA, UK, Switzerland)</h3>
                <p>
                  For users visiting from the European Economic Area (EEA), the United Kingdom (UK), and Switzerland, Google requires that publishers use a <strong>Google-certified Consent Management Platform (CMP)</strong> that integrates with the <strong>IAB Europe Transparency and Consent Framework (TCF v2.2)</strong>.
                </p>
                <p>
                  TempInbox integrates a fully certified TCF v2.2 CMP that gives you unhindered, equal-prominence control to Accept All, Reject All non-essential ad tracking, or customize individual TCF purposes (Purposes 1 through 10) and specific certified vendors (including Google Vendor ID 755).
                </p>

                <h3 className="font-bold text-slate-900 dark:text-white text-base pt-2">3. How to Opt Out of Google Ad Personalization</h3>
                <p>
                  You can manage your Google advertising settings or opt out of personalized ads at any time through these portals:
                </p>
                <div className="flex flex-wrap gap-2.5 my-2">
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
                  >
                    <span>Manage Google Ads Settings</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.aboutads.info/choices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition border border-slate-200 dark:border-slate-700"
                  >
                    <span>Network Advertising (AboutAds)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.youronlinechoices.eu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition border border-slate-200 dark:border-slate-700"
                  >
                    <span>YourOnlineChoices (EEA / UK)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
