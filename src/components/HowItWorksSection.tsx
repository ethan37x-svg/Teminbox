import React from 'react';
import { 
  Zap, Mail, ArrowRight, CheckCircle2, Shield, 
  Server, Lock, Clock, Trash2, Cpu, Check, AlertTriangle
} from 'lucide-react';

interface HowItWorksSectionProps {
  onNavigateTab: (tab: 'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'privacy' | 'about' | 'contact' | 'how-it-works' | 'disclaimer' | 'cookies' | 'audit') => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onNavigateTab }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Header Banner */}
      <header className="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
          <Zap className="w-4 h-4" />
          <span>Under the Hood</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          How TempInbox Works
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          A clear, step-by-step breakdown of how TempInbox generates disposable inboxes, routes inbound mail, and automatically evicts data from memory.
        </p>

        {/* Primary CTA */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateTab('inbox')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Mail className="w-4 h-4" />
            <span>Generate Temporary Email</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('blog')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <span>Read Technical Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-12 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        
        {/* Step-by-Step Breakdown */}
        <section aria-labelledby="steps-heading" className="space-y-6">
          <h2 id="steps-heading" className="text-2xl font-bold text-slate-900 dark:text-white">
            The 3-Step Lifecycle
          </h2>

          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-extrabold text-lg shrink-0">
                01
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 1: Generate an Address on Demand
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  When you visit TempInbox, a cryptographically random address (e.g. <code>k7m2x9@mailhub.cc</code>) is created instantly in volatile memory. Alternatively, you can specify a custom username prefix and select from active routing domains. You choose an operational lifespan ranging from 1 hour to 7 days (24 hours is the default).
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>No passwords, names, or phone verification required.</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-extrabold text-lg shrink-0">
                02
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 2: Use It Where You Don’t Want to Expose Your Real Email
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Copy the temporary address with one click and paste it into online forms, Wi-Fi access gates, software trials, or developer test scripts. Because this address is disconnected from your identity, marketing automation funnels cannot reach your personal inbox.
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Shields your permanent email from scrapers and third-party list sharing.</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-lg shrink-0">
                03
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 3: Receive Messages in Real Time & Auto-Purge
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Incoming messages are parsed in temporary memory and streamed live to your browser. You can inspect message headers, copy OTP verification codes, and download attachments. When the timer finishes, a server-side cleanup worker running every 60 seconds completely erases the mailbox and messages from RAM.
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Volatile RAM-only storage with permanent automatic eviction.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Technical Architecture Details */}
        <section aria-labelledby="architecture-heading" className="space-y-4">
          <h2 id="architecture-heading" className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Server className="w-6 h-6 text-blue-600" />
            <span>Inbound SMTP Routing & Storage Architecture</span>
          </h2>
          <p>
            TempInbox operates custom edge Mail Transfer Agents conforming to RFC 5321 (Simple Mail Transfer Protocol):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-500" />
                <span>Volatile System RAM</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Messages and mailbox records exist exclusively in volatile memory (Node.js RAM data structures). They are never written to disk, cold databases, or backups.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Strict Inbound Only</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Outbound SMTP relaying is disabled across all servers. Users cannot compose or send outgoing mail, preventing bad actors from weaponizing our domain names for spam.
              </p>
            </div>
          </div>
        </section>

        {/* Limitations Notice */}
        <section aria-labelledby="limitations-heading" className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
          <h2 id="limitations-heading" className="text-base font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Important Service Boundaries</span>
          </h2>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            TempInbox addresses are ephemeral and public. Never use a temporary email address for critical accounts, primary banking, medical portals, or services where you might need future password recovery. Once an address expires or is deleted, incoming emails cannot be retrieved.
          </p>
        </section>

      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold mb-1">Ready to Generate a Temporary Email?</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Create an instant address in seconds. Free, private, and zero registration.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('inbox')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Open Temporary Inbox
        </button>
      </div>

    </article>
  );
};
