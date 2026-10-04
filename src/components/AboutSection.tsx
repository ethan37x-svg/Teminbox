import React from 'react';
import { 
  Info, Shield, Server, Zap, Globe, Lock, Users, Heart, CheckCircle2, 
  Mail, ExternalLink, Award, FileText, Cpu, Eye, Sparkles, RefreshCw, Send, 
  HelpCircle, BookOpen, Check, AlertCircle, Scale, ShieldCheck, Database, Layers
} from 'lucide-react';

export const AboutSection: React.FC<{ onNavigateToTerms?: () => void }> = ({ onNavigateToTerms }) => {
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/50 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              Privacy & Hygiene Utility
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Transparent Implementation
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              TempInbox.solutions
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            About <span className="text-blue-400">TempInbox.solutions</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            TempInbox.solutions is an independent web utility engineered to provide on-demand, disposable temporary email addresses. Our service empowers users and developers to bypass marketing lists, protect their personal identity from cross-site trackers, and test email integration workflows without registering personal data.
          </p>
        </div>
      </header>

      {/* Domain Architecture & Relationship Clarification */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
          <Globe className="w-6 h-6 text-blue-600" />
          <span>Service Architecture & Domain Infrastructure</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          To maintain transparency regarding how the service is structured across domains:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>TempInbox.solutions (Primary Web Portal)</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              This domain (<code className="font-mono text-blue-600">tempinbox.solutions</code>) serves as the primary website, user dashboard, educational documentation hub, and frontend application interface where users generate inboxes and read messages.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-600" />
              <span>Mail Routing Domains (tempinbox.org, mailhub.cc, etc.)</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Domain names such as <code className="font-mono text-indigo-600">tempinbox.org</code>, <code className="font-mono text-indigo-600">mailhub.cc</code>, <code className="font-mono text-indigo-600">quickmail.live</code>, and <code className="font-mono text-indigo-600">flashmail.email</code> function as mail exchange (MX) endpoints configured to receive and parse incoming SMTP packets for active disposable mailboxes.
            </p>
          </div>
        </div>
      </section>

      {/* Grid: Core Architectural Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ephemeral In-Memory Buffering</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Message payloads are held in volatile system memory during their configured lifetime. When your mailbox expires or when you click "Delete Mailbox", the memory pointers are permanently released.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-Time Inbound Delivery</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Inbound emails are processed by our edge mail routing daemons and streamed to your active browser feed with automatic verification code extraction for rapid confirmation.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Strict Inbound-Only Protection</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To prevent abuse, phishing campaigns, and malware distribution, our mail servers strictly reject outbound mail relaying. The system acts solely as an inbound receiver.
          </p>
        </div>
      </section>

      {/* Main Content Modules */}
      <div className="space-y-10">
        
        {/* Genuine Operational Principles */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
            <Info className="w-6 h-6 text-blue-600" />
            <span>Operational Principles & Honest Privacy Practices</span>
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              We believe online utilities should be clear about what they do and do not do. Disposable email is a practical tool for shielding a personal inbox from unwanted marketing, newsletters, and low-trust signups, but it comes with distinct technical boundaries:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zero Personal Identity Collection:</strong> We do not ask for your name, phone number, physical address, or payment details. No user account registration is required to generate or use an email address.</li>
              <li><strong>Volatile Retention:</strong> Mailbox addresses have a selectable lifespan ranging from 1 hour to 7 days (default: 24 hours). Once expired, mailbox records and message contents are cleared.</li>
              <li><strong>Immediate Purge Control:</strong> Users can manually click "Delete Mailbox" at any time to immediately discard the current address and any messages associated with it.</li>
              <li><strong>Public Namespace Notice:</strong> Because temporary mailboxes do not require passwords, anyone who generates or knows the exact address could potentially view messages delivered to it. Therefore, temporary inboxes should never be used for sensitive personal correspondence, banking, or recovery keys.</li>
            </ul>
          </div>
        </section>

        {/* AdSense Transparency & Monetization Policy */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Award className="w-6 h-6 text-blue-600" />
              <span>Advertising & Monetization Disclosure</span>
            </h2>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white uppercase">
              Publisher Ethics
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            <p>
              TempInbox.solutions is provided free of charge. To sustainably fund domain registrations, DNS hosting, and server infrastructure, we plan to display contextual advertisements through <strong>Google AdSense</strong>.
            </p>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Our Advertising Commitments:</span>
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li><strong>Clear Labeling:</strong> All advertising placements are explicitly designated with an "ADVERTISEMENT" header in clear containers separated from functional controls.</li>
                <li><strong>No Deceptive Placement:</strong> Advertisements will never be positioned where they could be confused with Copy, Refresh, Delete, or Inbox buttons.</li>
                <li><strong>No Private Content Interruption:</strong> Ads are never inserted inside private email reading dialogs or message bodies.</li>
                <li><strong>Respect for Consent:</strong> We support transparent consent choices regarding advertising cookies through our Cookie Settings and the IAB TCF framework.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact & Support Section */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>Contact & Abuse Reporting</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              For general inquiries, technical questions, or to report terms of service violations, contact our support team.
            </p>
            <p className="text-xs font-semibold text-blue-300">
              Inquiries: <a href="mailto:support@tempinbox.solutions" className="underline font-bold text-white">support@tempinbox.solutions</a> • Inbound MX domain: <span className="font-mono text-slate-300">tempinbox.org</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigateToTerms && (
              <button
                onClick={onNavigateToTerms}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Terms & Policies</span>
              </button>
            )}
          </div>
        </section>

      </div>

    </article>
  );
};
