import React from 'react';
import { 
  Shield, Server, Globe, Lock, Mail, CheckCircle2, 
  FileText, AlertTriangle, ArrowRight, Ban, Zap, Info
} from 'lucide-react';

interface AboutSectionProps {
  onNavigateToTerms?: () => void;
  onNavigateToContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onNavigateToTerms,
  onNavigateToContact,
}) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Page Header */}
      <header className="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
          <Info className="w-4 h-4" />
          <span>About TempInbox</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          About TempInbox
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          TempInbox is an independent, free web utility engineered to provide disposable temporary email addresses on demand.
        </p>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-12 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        
        {/* Section 1: What TempInbox Is */}
        <section aria-labelledby="about-what-is" className="space-y-3">
          <h2 id="about-what-is" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
            <span>What Is TempInbox?</span>
          </h2>
          <p>
            TempInbox is a disposable email service that allows visitors to generate short-lived, self-destructing email inboxes instantly. The service operates entirely in the browser without requiring user accounts, passwords, phone number verifications, or credit card details.
          </p>
          <p>
            When an email is sent to an active TempInbox address, the incoming message is parsed in temporary server memory and delivered live to the visitor's screen. Once the configured lifetime expires, or when the user manually deletes the inbox, the address and its associated messages are permanently purged from memory.
          </p>
        </section>

        {/* Section 2: Why the Service Exists */}
        <section aria-labelledby="about-why-exists" className="space-y-3">
          <h2 id="about-why-exists" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
            <span>Why the Service Exists</span>
          </h2>
          <p>
            In the modern web ecosystem, personal email addresses have evolved into universal digital identifiers. Online services, Wi-Fi portals, software trials, and discussion boards routinely demand an email address before permitting access to basic tools or content.
          </p>
          <p>
            In many instances, these email addresses are subsequently shared with marketing aggregators, enrolled into persistent promotional campaigns, or exposed in third-party database breaches. TempInbox exists to provide a simple, self-service buffer that gives individuals control over when to share their permanent contact information and when to use a short-lived address instead.
          </p>
        </section>

        {/* Section 3: Focus on Email Privacy & Reducing Unwanted Email */}
        <section aria-labelledby="about-focus-privacy" className="space-y-4">
          <h2 id="about-focus-privacy" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">3</span>
            <span>Focus on Email Privacy & Reducing Inbox Clutter</span>
          </h2>
          <p>
            Our core technical objective is simple: reduce unsolicited email volume and help users compartmentalize their digital identities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Primary Inbox Cleanliness</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Keeps cold marketing outreach, automatic subscription drips, and sales follow-ups out of your personal and work mailboxes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Cross-Site Tracking Defense</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Data brokers use hashed email addresses to stitch user actions across different websites. Ephemeral addresses prevent unified behavioral profiling.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Technical Limitations */}
        <section aria-labelledby="about-limitations" className="space-y-4">
          <h2 id="about-limitations" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">4</span>
            <span>Limitations of Temporary Email</span>
          </h2>
          <p>
            We believe in honest, practical communication about what temporary email can and cannot do:
          </p>
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-3 text-xs sm:text-sm">
            <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>What Temporary Email Does Not Provide</span>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-amber-800 dark:text-amber-300">
              <li>
                <strong>Not Complete Anonymity:</strong> A temporary email shields your personal email address from marketing databases, but it does not hide your network IP address or internet traffic from websites you visit.
              </li>
              <li>
                <strong>No Permanent Message Storage:</strong> Inboxes expire automatically within 1 hour to 7 days. Once expired or deleted, messages cannot be recovered.
              </li>
              <li>
                <strong>Not for Financial or Medical Accounts:</strong> Because mailboxes expire and belong to shared unauthenticated domains, they must never be used for banking, medical portals, government accounts, or password-recovery anchors.
              </li>
              <li>
                <strong>Not End-to-End Encrypted:</strong> Incoming emails travel across standard SMTP hops and are not encrypted using client-side PGP cryptography.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Commitment to Responsible Use */}
        <section aria-labelledby="about-responsible-use" className="space-y-4">
          <h2 id="about-responsible-use" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">5</span>
            <span>Commitment to Responsible Use & Abuse Prevention</span>
          </h2>
          <p>
            TempInbox is strictly dedicated to legitimate privacy defense and developer testing. We actively enforce architectural controls to prevent abuse:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Inbound-Only Architecture:</strong> Outbound email transmission (SMTP relaying) is completely disabled across our infrastructure. Users cannot send emails or replies from TempInbox addresses, eliminating spam distribution and outgoing phishing risks.
            </li>
            <li>
              <strong>Zero Tolerance for Abuse:</strong> Using temporary inboxes for fraudulent signups, harassment, malware distribution, or circumventing platform bans is strictly prohibited under our Terms of Service.
            </li>
            <li>
              <strong>Abuse Reporting:</strong> We respond promptly to abuse inquiries and cooperate with domain owners and administrators experiencing unwanted activity.
            </li>
          </ul>
        </section>

      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {onNavigateToContact && (
          <a
            href="/contact"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                onNavigateToContact();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Support</span>
          </a>
        )}
        {onNavigateToTerms && (
          <a
            href="/terms"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                onNavigateToTerms();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <span>Read Terms of Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

    </article>
  );
};
