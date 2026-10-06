import React from 'react';
import { 
  FileText, Shield, AlertTriangle, CheckCircle2, 
  Ban, Scale, Mail, ArrowRight, ExternalLink
} from 'lucide-react';

interface TermsOfServiceSectionProps {
  onNavigateTab?: (tab: 'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'privacy' | 'about' | 'contact' | 'disclaimer' | 'cookies' | 'audit') => void;
}

export const TermsOfServiceSection: React.FC<TermsOfServiceSectionProps> = ({ onNavigateTab }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Page Header */}
      <header className="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
          <Scale className="w-4 h-4" />
          <span>Terms & Conditions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Terms of Service
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          These Terms of Service govern your access to and use of TempInbox. By accessing or using the service, you agree to be bound by these terms.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Effective Date: October 6, 2026</span>
          <span>•</span>
          <span>Service URL: https://tempinbox.solutions</span>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="space-y-12 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        
        {/* Section 1: Description of Service */}
        <section aria-labelledby="terms-section-description" className="space-y-3">
          <h2 id="terms-section-description" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
            <span>Description of Service</span>
          </h2>
          <p>
            TempInbox provides free, on-demand disposable email inboxes. The service operates exclusively as an inbound mail receiver allowing users to receive temporary email messages without registering an account. The service does not support outbound email sending, message forwarding, or permanent storage.
          </p>
        </section>

        {/* Section 2: Acceptable Use */}
        <section aria-labelledby="terms-section-acceptable" className="space-y-3">
          <h2 id="terms-section-acceptable" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
            <span>Acceptable Use</span>
          </h2>
          <p>
            You agree to use TempInbox solely for lawful, legitimate purposes, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Shielding your primary email address from unsolicited marketing, newsletters, and promotional campaigns.</li>
            <li>Software development, QA testing, email deliverability validation, and automation workflows.</li>
            <li>Accessing one-off gated downloads, public Wi-Fi registration gates, or non-critical online communities where long-term communication is unnecessary.</li>
          </ul>
        </section>

        {/* Section 3: Prohibited Abuse & Conduct */}
        <section aria-labelledby="terms-section-prohibited" className="space-y-4">
          <h2 id="terms-section-prohibited" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold">3</span>
            <span>Prohibited Abuse & Unlawful Conduct</span>
          </h2>
          <p>
            You must not use, attempt to use, or permit others to use TempInbox for any improper, abusive, or unlawful purpose. Prohibited activities strictly include, without limitation:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1">
              <h3 className="font-bold text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Spam or Bulk Mail</span>
              </h3>
              <p className="text-xs text-rose-800 dark:text-rose-300">
                You may not use TempInbox to facilitate, originate, or coordinate unsolicited bulk emails, automated marketing blasts, or spam campaigns.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1">
              <h3 className="font-bold text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Phishing or Social Engineering</span>
              </h3>
              <p className="text-xs text-rose-800 dark:text-rose-300">
                You may not impersonate any person, business, or entity, nor use the service to conduct credential harvesting or deceptive social engineering.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1">
              <h3 className="font-bold text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Fraud or Deception</span>
              </h3>
              <p className="text-xs text-rose-800 dark:text-rose-300">
                You may not engage in fraudulent financial schemes, stolen credential testing, identity deception, or unauthorized transactions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1">
              <h3 className="font-bold text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Malware Distribution</span>
              </h3>
              <p className="text-xs text-rose-800 dark:text-rose-300">
                You may not transmit, host, deliver, or distribute computer viruses, worms, spyware, ransomware, trojans, or malicious attachments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1">
              <h3 className="font-bold text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Illegal Activity</span>
              </h3>
              <p className="text-xs text-rose-800 dark:text-rose-300">
                You may not use the service to commit or facilitate any crime, intellectual property infringement, or violation of applicable laws.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1">
              <h3 className="font-bold text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No Harassment or Abuse</span>
              </h3>
              <p className="text-xs text-rose-800 dark:text-rose-300">
                You may not use temporary mailboxes to stalk, harass, threaten, defame, or intimidate any individual or organization.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 mt-3 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <strong>Bypassing Bans or Platform Restrictions:</strong> You may not use TempInbox to circumvent account suspensions, evade IP bans, bypass rate-limiting controls, fabricate multi-account referral bonuses, or breach the terms of service of third-party platforms.
          </div>
        </section>

        {/* Section 4: Temporary Nature of Inboxes & Data Lifespan */}
        <section aria-labelledby="terms-section-temporary-nature" className="space-y-3">
          <h2 id="terms-section-temporary-nature" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">4</span>
            <span>Temporary Nature of Inboxes & No Guarantee of Message Availability</span>
          </h2>
          <p>
            TempInbox is strictly an ephemeral utility. Inboxes and messages are held temporarily in volatile memory:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>
              <strong>Automatic Expiration:</strong> All temporary mailboxes expire automatically following their configured duration (between 1 hour and 7 days).
            </li>
            <li>
              <strong>No Permanent Availability:</strong> We make no guarantee that any message will remain accessible, stored, or retrievable. When a mailbox expires or is deleted, all stored message contents are permanently purged from volatile RAM.
            </li>
            <li>
              <strong>No Account Recovery:</strong> Once an inbox expires, its address cannot be recovered or restored. You should never use a temporary email address for critical accounts, banking, healthcare, or services requiring password recovery.
            </li>
          </ul>
        </section>

        {/* Section 5: Service Availability Limitations */}
        <section aria-labelledby="terms-section-availability" className="space-y-3">
          <h2 id="terms-section-availability" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">5</span>
            <span>Service Availability & Disclaimers</span>
          </h2>
          <p>
            TempInbox is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis, without warranties of any kind, whether express, implied, or statutory.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            We do not warrant that the service will be uninterrupted, timely, secure, error-free, or that emails sent by third parties will be delivered. Email transmission across the internet is subject to third-party mail server configurations, network latency, spam filters, and greylisting outside of our control.
          </p>
        </section>

        {/* Section 6: Limitation of Liability */}
        <section aria-labelledby="terms-section-liability" className="space-y-3">
          <h2 id="terms-section-liability" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">6</span>
            <span>Limitation of Liability</span>
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed">
            To the maximum extent permitted by applicable law, in no event shall TempInbox, its operators, hosting providers, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li>Your access to, use of, or inability to access or use the service;</li>
            <li>Any failure, delay, corruption, or non-delivery of any incoming email message;</li>
            <li>The deletion, expiration, or loss of any temporary mailbox or message content;</li>
            <li>Any unauthorized access, use, or alteration of your transmissions or content;</li>
            <li>Any conduct or content of any third party on the service.</li>
          </ul>
        </section>

        {/* Section 7: Modifications to Terms */}
        <section aria-labelledby="terms-section-modifications" className="space-y-3">
          <h2 id="terms-section-modifications" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">7</span>
            <span>Modifications to Terms</span>
          </h2>
          <p>
            We reserve the right to revise or update these Terms of Service at any time. When updates occur, the effective date at the top of this page will be revised. Your continued use of TempInbox following the posting of revised terms indicates your acceptance of the changes.
          </p>
        </section>

        {/* Section 8: Contact Information */}
        <section aria-labelledby="terms-section-contact" className="space-y-3">
          <h2 id="terms-section-contact" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">8</span>
            <span>Contact for Abuse & Terms Inquiries</span>
          </h2>
          <p>
            If you have questions regarding these Terms of Service or need to report abusive activity or violations, please contact:
          </p>
          <p className="font-semibold text-xs text-slate-800 dark:text-slate-200">
            Abuse Desk:{' '}
            <a href="mailto:abuse@tempinbox.solutions" className="text-blue-600 dark:text-blue-400 underline">
              abuse@tempinbox.solutions
            </a>
            {' '}| General Inquiries:{' '}
            <a href="mailto:support@tempinbox.solutions" className="text-blue-600 dark:text-blue-400 underline">
              support@tempinbox.solutions
            </a>
          </p>
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
            <FileText className="w-4 h-4" />
            <span>Return to Temporary Inbox Tool</span>
          </button>
        )}
        {onNavigateTab && (
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => onNavigateTab('about')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              About TempInbox
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigateTab('contact')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Contact Support
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigateTab('privacy')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Privacy Policy
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
