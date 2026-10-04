import React, { useState } from 'react';
import { 
  Shield, Mail, Copy, Inbox, AlertTriangle, CheckCircle2, 
  HelpCircle, Sparkles, ChevronDown, ChevronUp, Lock, RefreshCw 
} from 'lucide-react';

export const ServiceIntroEducational: React.FC = () => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  return (
    <section 
      aria-label="About TempInbox Service"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs transition-colors">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>How It Works & Service Scope</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Understanding Disposable Email & TempInbox
            </h2>
          </div>
          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="self-start sm:self-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 transition"
          >
            <span>{showFullDetails ? 'Show Summary' : 'View Full Service Guide'}</span>
            {showFullDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* 4 Core Quick-Start Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">What is TempInbox?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              TempInbox is a free, privacy-first disposable email service that generates temporary inboxes to shield your primary address from unsolicited spam and identity correlation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">How It Works</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Inbound emails routed to our mail domains are parsed in volatile RAM and streamed live to your browser. No passwords, registration, or software installation required.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Generate & Copy</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose an available domain and custom username (or random), then click <strong>Copy</strong>. Paste the temporary address into any signup form requesting confirmation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">View Real-Time Mail</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Incoming messages display instantly in your live feed below. Click any email to view clean HTML/text, sender headers, and one-click copyable verification codes.
            </p>
          </div>

        </div>

        {/* Extended Details (Why Use & What We Do Not Guarantee) */}
        {showFullDetails && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            
            {/* Why users need a disposable address */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Why Use a Disposable Email Address?</span>
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed pl-5 list-disc">
                <li><strong>Combat Inbox Clutter:</strong> Prevent commercial newsletters, cold outreach, and marketing sequences from flooding your primary inbox.</li>
                <li><strong>Neutralize Cross-Site Trackers:</strong> Data brokers frequently use your personal email hash to stitch browsing habits across different websites.</li>
                <li><strong>Software & QA Testing:</strong> Developers and automation testers can verify user onboarding, email templates, and OTP flows quickly.</li>
                <li><strong>One-Time Downloads:</strong> Access e-books, software trials, or forum registrations without giving away permanent credentials.</li>
              </ul>
            </div>

            {/* Service Scope & Limitations (What We Do Not Guarantee) */}
            <div className="space-y-3 bg-amber-50/60 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200/60 dark:border-amber-900/40">
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Important Limitations & What We Do Not Guarantee</span>
              </h4>
              <ul className="text-xs text-amber-800 dark:text-amber-300 space-y-2 leading-relaxed pl-5 list-disc">
                <li><strong>No Permanent Storage:</strong> TempInbox is purely ephemeral. Messages are held in temporary memory and are permanently purged upon expiration.</li>
                <li><strong>Shared Namespace:</strong> Mailbox addresses on shared domains are public namespaces. Do not use disposable addresses for sensitive personal, medical, or confidential data.</li>
                <li><strong>Not for Financial or Recovery Accounts:</strong> Never link bank accounts, crypto wallets, or critical password reset mechanisms to temporary addresses.</li>
                <li><strong>Inbound-Only Architecture:</strong> Outbound email sending and message relaying are disabled by design to eliminate spam amplification and abuse.</li>
              </ul>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
