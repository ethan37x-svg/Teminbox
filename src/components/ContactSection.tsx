import React, { useState } from 'react';
import { 
  Mail, ShieldAlert, HelpCircle, Check, Copy, 
  ExternalLink, Clock, AlertTriangle, MessageSquare, Terminal
} from 'lucide-react';

interface ContactSectionProps {
  onNavigateTab?: (tab: 'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'privacy' | 'about' | 'contact' | 'disclaimer' | 'cookies' | 'audit') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigateTab }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Canonical support and security contact addresses
  const supportEmail = 'support@tempinbox.solutions';
  const abuseEmail = 'abuse@tempinbox.solutions';
  const privacyEmail = 'privacy@tempinbox.solutions';

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Page Header */}
      <header className="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
          <Mail className="w-4 h-4" />
          <span>Help & Communications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Contact TempInbox
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Get in touch with the TempInbox team for technical questions, abuse reporting, or privacy inquiries.
        </p>
      </header>

      {/* Main Contact Channels */}
      <div className="space-y-8">
        
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* General Support */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                General & Technical Support
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                For questions regarding temporary inboxes, API integration, or RFC protocol standards.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`mailto:${supportEmail}`}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline block truncate mb-2"
              >
                {supportEmail}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(supportEmail)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition"
              >
                {copiedEmail === supportEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail === supportEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Abuse & Security */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Abuse & Security Desk
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                To report terms of service violations, automated scraping, or unlawful activity.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`mailto:${abuseEmail}`}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline block truncate mb-2"
              >
                {abuseEmail}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(abuseEmail)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition"
              >
                {copiedEmail === abuseEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail === abuseEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Privacy & Legal */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Privacy & Data Inquiries
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                For questions regarding data processing, ephemeral retention, or cookie settings.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`mailto:${privacyEmail}`}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline block truncate mb-2"
              >
                {privacyEmail}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(privacyEmail)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition"
              >
                {copiedEmail === privacyEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail === privacyEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Expected Response Times & Guidelines */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>Response Times & Communication Guidelines</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
            <p>
              We review incoming messages regularly. Inquiries sent to our support desk typically receive a response within <strong>24 to 48 business hours</strong>.
            </p>
            <p>
              <strong>When reporting technical issues or abuse, please include:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <li>The relevant recipient domain (e.g. <code>mailhub.cc</code> or <code>tempinbox.org</code>)</li>
              <li>Approximate date and time of the incident (UTC)</li>
              <li>Relevant message headers or diagnostic logs (without sensitive credentials)</li>
              <li>A clear description of the observed behavior</li>
            </ul>
          </div>
        </div>

        {/* Developer / Site Owner Configuration Placeholder */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
          <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-blue-500" />
            <span>Developer Configuration Note</span>
          </div>
          <p className="leading-relaxed">
            The contact email addresses above represent the project's canonical configuration endpoints (<code>support@tempinbox.solutions</code>, <code>abuse@tempinbox.solutions</code>). If deploying to an alternate custom domain, configure your custom contact mailbox in your server environment variables or DNS MX configuration.
          </p>
        </div>

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
              onClick={() => onNavigateTab('about')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              About TempInbox
            </button>
            <span>•</span>
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
