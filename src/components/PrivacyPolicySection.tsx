import React from 'react';
import { 
  Shield, Lock, Eye, Server, RefreshCw, AlertTriangle, 
  Mail, CheckCircle2, FileText, ExternalLink, HardDrive, 
  Trash2, Cpu, Globe, Check
} from 'lucide-react';

interface PrivacyPolicySectionProps {
  onNavigateTab?: (tab: 'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'privacy' | 'about' | 'disclaimer' | 'cookies' | 'audit') => void;
  onOpenCmp?: () => void;
}

export const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({
  onNavigateTab,
  onOpenCmp,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Header Banner */}
      <header className="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
          <Shield className="w-4 h-4" />
          <span>Factual Data Processing Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          This Privacy Policy provides a factual, code-verified explanation of how TempInbox processes temporary email addresses, incoming email messages, network traffic, and local browser storage.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Effective Date: October 6, 2026</span>
          <span>•</span>
          <span>Service URL: https://tempinbox.solutions</span>
          <span>•</span>
          <span>Architecture: Ephemeral Volatile In-Memory</span>
        </div>
      </header>

      {/* Main Policy Body */}
      <div className="space-y-12 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        
        {/* Section 1: Data Collected & Processed */}
        <section aria-labelledby="section-data-collected" className="space-y-4">
          <h2 id="section-data-collected" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
            <span>Data Collected & Processed</span>
          </h2>
          <p>
            TempInbox operates as an on-demand, inbound-only disposable email utility. We do not require user accounts, passwords, personal names, physical addresses, or payment information. The specific categories of data processed by the application comprise:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Temporary Email Address Strings:</strong> The generated email address identifier (e.g. <code>username@domain</code>), creation timestamp, and chosen expiration time.
            </li>
            <li>
              <strong>Incoming Email Payload & Metadata:</strong> When third parties send emails to your active temporary address, the application receives the sender's email address, sender display name, subject line, date/time received, message size, MIME headers, plain text content, sanitized HTML content, and extracted verification codes (such as OTP numbers).
            </li>
            <li>
              <strong>Email Attachments:</strong> File metadata (filename, byte size, MIME content type) and raw binary payloads for incoming attachments delivered to your mailbox.
            </li>
            <li>
              <strong>Client-Side UI Preferences:</strong> User-selected interface preferences stored in your browser's local storage (such as consent categories).
            </li>
            <li>
              <strong>Transient Network Headers:</strong> Standard network connection metadata (including remote IP address and user-agent string) transmitted across standard TCP/IP sockets during web HTTP requests. The application software does not record these into persistent databases or access log files.
            </li>
          </ul>
        </section>

        {/* Section 2: Purpose of Processing */}
        <section aria-labelledby="section-purpose" className="space-y-4">
          <h2 id="section-purpose" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
            <span>Purpose of Processing</span>
          </h2>
          <p>Data processed by TempInbox is utilized exclusively for the following operational purposes:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">Inbound Message Delivery</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                To route, parse, and stream incoming emails to your active browser session so you can view verification links and notices.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">Security & Abuse Defense</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                To inspect incoming messages for dangerous phishing vectors, executable malware payloads, and automated spam patterns.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">Session Expiration & Eviction</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                To enforce user-selected mailbox lifetimes and automatically scrub expired inboxes from server memory.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">Remembering User Choices</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                To preserve your consent preferences locally on your device across visits without requiring an account.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Storage Medium & Location */}
        <section aria-labelledby="section-storage" className="space-y-4">
          <h2 id="section-storage" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">3</span>
            <span>Storage Medium & Hosting</span>
          </h2>
          <p>
            TempInbox does not utilize persistent relational databases (such as MySQL or PostgreSQL), document databases (such as MongoDB), or cold file system storage for email messages.
          </p>
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-blue-600" />
              <span>Volatile System RAM Only</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Active mailboxes and received email messages reside strictly within in-memory data structures (Node.js volatile RAM). If the hosting container process restarts or terminates, all active mailboxes and message payloads in memory are instantly wiped.
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <strong>Hosting Infrastructure:</strong> The web application runs within a containerized cloud execution environment hosted on Google Cloud infrastructure. No third-party database-as-a-service providers are connected to the email pipeline.
          </p>
        </section>

        {/* Section 4: Data Retention & Automated Deletion */}
        <section aria-labelledby="section-retention" className="space-y-4">
          <h2 id="section-retention" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">4</span>
            <span>Data Retention & Automatic Eviction</span>
          </h2>
          <p>
            Retention is governed by precise, programmatic rules verified in the server runtime:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Configured Mailbox Lifetime:</strong> When generating a temporary address, users choose an active lifespan ranging from 1 hour to 7 days (the default duration is 24 hours).
            </li>
            <li>
              <strong>Automated 60-Second Cleanup Worker:</strong> A background retention sweeper executes on the server every 60 seconds. When the current timestamp surpasses a mailbox's expiration time (<code>expiresAt</code>), the mailbox record and all associated received messages are immediately removed from server memory.
            </li>
            <li>
              <strong>Immediate Request-Time Eviction:</strong> If an inbox query is received for an expired address, the server evicts the records on-the-fly and returns an HTTP 410 Gone response.
            </li>
            <li>
              <strong>Manual User-Initiated Deletion:</strong> Users may click the <strong>Delete Mailbox</strong> button at any time. This sends a <code>DELETE /api/v1/mailbox</code> request that instantly purges the address and all received messages from server memory.
            </li>
          </ul>
        </section>

        {/* Section 5: Third-Party Processors & External Services */}
        <section aria-labelledby="section-third-parties" className="space-y-4">
          <h2 id="section-third-parties" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">5</span>
            <span>Third-Party Processors & External APIs</span>
          </h2>
          <p>
            TempInbox maintains strict boundaries regarding external data sharing:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Optional AI Phishing & Spam Scanner:</strong> If security scanning is invoked on incoming messages, the message subject, text body, and sender email may be processed via the Google Gemini API (model <code>gemini-2.5-flash</code>) to calculate phishing probability scores. If no API key is configured on the host server, analysis falls back to an internal heuristic rule engine without external transmission.
            </li>
            <li>
              <strong>No Web Analytics Services:</strong> TempInbox does not install or run third-party behavioral analytics scripts (such as Google Analytics, PostHog, or tracking pixels).
            </li>
            <li>
              <strong>No Third-Party Telemetry Loggers:</strong> The application does not transmit error telemetry or user events to third-party monitoring platforms (such as Sentry or Datadog).
            </li>
          </ul>
        </section>

        {/* Section 6: Cookies & Local Storage */}
        <section aria-labelledby="section-cookies" className="space-y-4">
          <h2 id="section-cookies" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">6</span>
            <span>Cookies & Local Browser Storage</span>
          </h2>
          <p>
            Understanding how your web browser stores data while using TempInbox:
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">First-Party HTTP Cookies</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The TempInbox application server sets <strong>no first-party session cookies</strong> (<code>res.cookie</code> is not utilized). You can use the temporary email generator without creating or receiving HTTP cookies from our domain.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">Client-Side Local Storage (localStorage)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Your browser stores small configuration keys in <code>localStorage</code> strictly to remember your preferences:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <li><code>tempinbox_cookie_prefs</code>: Saves your consent toggles (essential, analytics, advertising, personalization).</li>
                <li><code>tcf_consent_data_v2</code> & <code>tcf_consent_string_v2</code>: Stores your Transparency & Consent Framework choices.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Future Advertising & Google AdSense Disclosure */}
        <section aria-labelledby="section-advertising" className="space-y-4 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Globe className="w-4 h-4" />
            <span>Advertising Disclosure & Google AdSense</span>
          </div>
          <h2 id="section-advertising" className="text-xl font-bold text-slate-900 dark:text-white">
            Future Advertising & Third-Party Vendor Technologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            TempInbox is supported by advertising to maintain high-availability edge infrastructure, domain renewals, and inbound mail gateways. On eligible informational and educational pages (such as our Guides section), third-party vendors, including Google, may serve contextual advertisements.
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <p>
              <strong>Use of Cookies & Web Beacons:</strong> Third-party advertising vendors, including Google, use cookies or similar tracking identifiers to serve ads based on a user's prior visits to this website or other websites on the Internet. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to TempInbox and/or other sites.
            </p>
            <p>
              <strong>Managing Advertising Preferences:</strong> Users may opt out of personalized advertising by visiting Google's Ad Settings at{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-0.5 font-semibold"
              >
                <span>Google Ad Settings</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              . Alternatively, users in eligible jurisdictions can opt out of third-party vendor cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-0.5 font-semibold"
              >
                <span>aboutads.info</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              {' '}or by adjusting their choices in our{' '}
              <button
                type="button"
                onClick={onOpenCmp}
                className="text-blue-600 dark:text-blue-400 underline font-semibold cursor-pointer"
              >
                Cookie Choices dashboard
              </button>.
            </p>
            <p>
              <strong>Strict Separation Policy:</strong> Ad tags are never loaded on tool pages (the email generator, live inbox, or message viewer) or on this Privacy Policy during consent interactions.
            </p>
          </div>
        </section>

        {/* Section 8: Technical Security Boundaries & Limitations */}
        <section aria-labelledby="section-limitations" className="space-y-4">
          <h2 id="section-limitations" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">7</span>
            <span>Security & Privacy Limitations</span>
          </h2>
          <p>
            In accordance with our commitment to factual transparency, users should understand what temporary email does not provide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm mb-1">Not Network Anonymity</h3>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                A temporary email shields your real email address from marketing databases. It does not conceal your network IP address or internet traffic. It is not an alternative to Tor or a VPN.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm mb-1">Not End-to-End Encrypted</h3>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Inbound emails arrive over standard SMTP network connections with opportunistic TLS. Messages are not client-side encrypted using PGP or zero-knowledge keypairs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm mb-1">Public Shared Namespaces</h3>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Because TempInbox does not require passwords, anyone who generates or enters an identical custom address on a public domain could access messages delivered while active.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm mb-1">Irreversible Expiration</h3>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                When a mailbox expires or is deleted, its memory pages are discarded. Messages cannot be retrieved or recovered by administrators or users.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: User Rights & Contact Mechanism */}
        <section aria-labelledby="section-contact" className="space-y-4">
          <h2 id="section-contact" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">8</span>
            <span>User Controls & Contact Information</span>
          </h2>
          <p>
            Users have immediate, self-service control over their data:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Instant Data Erasure:</strong> Click <strong>Delete Mailbox</strong> on the home interface to immediately delete your temporary address and all stored messages from volatile memory.
            </li>
            <li>
              <strong>Browser Storage Clearing:</strong> You can clear your consent preferences at any time by clearing your browser's local storage or adjusting preferences in our Cookie Choices modal.
            </li>
            <li>
              <strong>Privacy Inquiries & Security Contact:</strong> If you have questions regarding this Privacy Policy or wish to report technical abuse, contact our security desk at{' '}
              <a href="mailto:privacy@tempinbox.solutions" className="text-blue-600 dark:text-blue-400 font-bold underline">
                privacy@tempinbox.solutions
              </a>
              {' '}or{' '}
              <a href="mailto:support@tempinbox.solutions" className="text-blue-600 dark:text-blue-400 font-bold underline">
                support@tempinbox.solutions
              </a>.
            </li>
          </ul>
        </section>

      </div>

      {/* Footer Navigation Back to Generator */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {onNavigateTab && (
          <button
            type="button"
            onClick={() => onNavigateTab('inbox')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>Return to Temporary Inbox Tool</span>
          </button>
        )}
        {onNavigateTab && (
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => onNavigateTab('terms')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigateTab('cookies')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Cookie Settings
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
