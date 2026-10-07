import React, { useState } from 'react';
import { 
  Shield, Mail, ArrowRight, CheckCircle2, AlertTriangle, AlertCircle, 
  Lock, BookOpen, Clock, ChevronDown, ChevronUp, FileText, Ban, 
  Zap, HelpCircle, Layers, Server, ShieldAlert, Check, Sparkles, Inbox
} from 'lucide-react';
import { blogArticles } from '../data/blogArticles';

interface HomepageInformationalSectionsProps {
  onNavigateGuide: (slug: string) => void;
  onNavigateTab: (tab: 'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'about' | 'disclaimer' | 'cookies' | 'audit') => void;
}

export const HomepageInformationalSections: React.FC<HomepageInformationalSectionsProps> = React.memo(({
  onNavigateGuide,
  onNavigateTab,
}) => {
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Featured guides (selecting 6 top educational articles)
  const featuredGuideSlugs = [
    'what-is-a-temporary-email-address',
    'how-temporary-email-works',
    'temporary-email-vs-email-alias',
    'how-to-protect-primary-email-from-spam',
    'are-temporary-email-addresses-safe',
    'when-to-use-and-not-use-temporary-email',
  ];

  const featuredGuides = featuredGuideSlugs
    .map((slug) => blogArticles.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'What is a temporary email?',
      answer: 'A temporary email address is a short-lived, disposable inbox generated on demand without requiring personal identification, passwords, or registration. It is designed to receive incoming verification codes, confirmation links, or newsletters for a limited time, keeping your primary email address private and free from marketing spam.',
    },
    {
      question: 'How long does an address last?',
      answer: 'On TempInbox, you can configure an initial lifespan ranging from 1 hour to 7 days (the default is 24 hours). You can also click "Extend Duration (+24h)" at any time while the mailbox is active. When the configured countdown expires, an automated memory cleaner running every 60 seconds permanently purges the mailbox and all stored messages from volatile RAM.',
    },
    {
      question: 'Can I receive attachments?',
      answer: 'Yes. TempInbox accepts standard MIME multipart incoming emails and parses safe attachments such as PDFs, plain text documents, and images. You can preview attachment metadata in the message viewer, download individual files, or export the complete raw message as an RFC 5322 .eml file.',
    },
    {
      question: 'Is temporary email anonymous?',
      answer: 'No. Temporary email is not an anonymity network. While it prevents third-party websites from logging your real email address, your web browser still transmits your IP address and standard HTTP request headers during normal web browsing. Furthermore, shared domain namespaces are publicly accessible to anyone who enters the exact same address. Temporary email should be used for spam defense and privacy separation, not for illicit anonymity.',
    },
    {
      question: 'Should I use it for important accounts?',
      answer: 'No, absolutely not. Because temporary mailboxes are self-destructing and ephemeral, you should never use them for primary banking, healthcare portals, government services, cryptocurrency platforms, or accounts requiring long-term password recovery. Once an address expires, it cannot be restored, and any subsequent password reset emails will bounce permanently.',
    },
    {
      question: 'Does TempInbox require registration?',
      answer: 'No. TempInbox requires zero registration. There are no usernames, passwords, phone verifications, credit card numbers, or user profiles. You generate an address with one click, use it for incoming mail, and all data is wiped automatically when its timer expires.',
    },
  ];

  // FAQ Schema.org JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  return (
    <div className="w-full space-y-16 py-12">
      
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ========================================================= */}
      {/* SECTION 1: WHAT IS TEMPINBOX? */}
      {/* ========================================================= */}
      <section 
        aria-labelledby="what-is-tempinbox-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>Service Overview & Purpose</span>
            </div>
            <h2 
              id="what-is-tempinbox-heading"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
            >
              What Is TempInbox?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
              TempInbox is a free, web-based temporary email service engineered to generate disposable, short-lived inboxes on demand. It provides an immediate, zero-friction buffer between your personal communication channels and the modern web, allowing you to receive incoming mail without revealing your primary email address.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Spam Prevention
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Prevents promotional campaigns, newsletter drips, and cold outreach from invading your personal or workplace mailbox.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                QA & Developer Testing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Empowers software engineers and QA teams to verify user onboarding flows, OTP codes, and transactional templates in real time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Single-Use Downloads
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Access gated whitepapers, trial software, or conference materials where ongoing contact is neither necessary nor requested.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Identity Separation
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Keeps your online footprint compartmentalized, preventing data aggregators from linking your activity across disconnected websites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: HOW IT WORKS (SIMPLE 3 STEPS) */}
      {/* ========================================================= */}
      <section 
        aria-labelledby="how-it-works-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Simple Workflow</span>
          </div>
          <h2 
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
          >
            How TempInbox Works in 3 Simple Steps
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            No registration forms, no passwords to remember, and no client applications to install.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative flex flex-col justify-between shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">01</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Instant Creation
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Generate an Address
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Click <strong>Generate</strong> to create an instant random mailbox, or customize your own username prefix across available active domains. Select an operational duration between 1 hour and 7 days.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero credentials or personal data required</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative flex flex-col justify-between shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">02</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Protect Your Identity
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Use It When You Don’t Want to Expose Your Primary Inbox
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Copy the temporary email address with one click and paste it into public Wi-Fi registration gates, developer sandboxes, forums, or online signup forms.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Keeps your real mailbox off commercial lists</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative flex flex-col justify-between shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">03</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Live Feed
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Receive Temporary Messages
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Incoming emails arrive in real time. Read sanitized HTML/text content, extract verification codes, and download attachments. When the timer finishes, all data is automatically erased.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Volatile in-memory storage with auto-scrub</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: WHY USE A TEMPORARY EMAIL? */}
      {/* ========================================================= */}
      <section 
        aria-labelledby="why-use-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Practical Benefits</span>
            </div>
            <h2 
              id="why-use-heading"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
            >
              Why Use a Temporary Email Address?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Your primary email address functions as your de facto universal digital passport. Using a temporary mailbox brings measurable security and hygiene benefits to your day-to-day digital life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Reducing Commercial Spam</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Many platforms share or monetize email lists with marketing partners. Disposable inboxes stop automated newsletter sequences and promotional blasts from ever entering your regular inbox.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Protecting Your Primary Inbox</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Shields your permanent address against automated scrapers and dark web data broker leaks. If a third-party website suffers a breach, only an expired disposable address is compromised.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Testing Websites & Applications</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Developers and QA engineers can test signup workflows, email deliverability, transactional templates, and multi-tenant authentication without creating multiple real email accounts.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Short-Lived Registrations</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ideal for one-time conference Wi-Fi access, single-event webinars, community forum posts, or non-critical evaluations where the service terms permit disposable addresses.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Privacy Separation & Hygiene</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Compartmentalizes your digital life. Ad-tech networks cannot stitch together behavioral profiles across disparate platforms when each service is registered with an unrelated ephemeral address.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Effortless Maintenance</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero spam filters to maintain and zero unsubscribe buttons to search for. Once your temporary address reaches its expiration countdown, all incoming mail terminates cleanly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: WHEN YOU SHOULD NOT USE TEMPORARY EMAIL */}
      {/* ========================================================= */}
      <section 
        aria-labelledby="when-not-to-use-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-300/80 dark:border-amber-800/60 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Critical Usage Boundaries</span>
            </div>
            <h2 
              id="when-not-to-use-heading"
              className="text-2xl sm:text-3xl font-extrabold text-amber-950 dark:text-amber-100 tracking-tight mb-3"
            >
              When You Should NOT Use Temporary Email
            </h2>
            <p className="text-amber-900/80 dark:text-amber-200/80 text-sm sm:text-base leading-relaxed">
              Temporary email addresses are explicitly designed for disposable, non-sensitive communication. Using disposable inboxes for critical long-term accounts creates severe risks of permanent data loss or account lockouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-400 font-bold text-sm sm:text-base">
                <Ban className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Important Long-Term Accounts</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Never use disposable mail for personal cloud storage, primary social media handles, job boards, or platforms you plan to access for more than a few days.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-400 font-bold text-sm sm:text-base">
                <Ban className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Banking & Financial Institutions</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Banks, credit unions, payment processors, tax authorities, and cryptocurrency exchanges mandate durable, persistent recovery email addresses to issue fraud alerts and account verification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-400 font-bold text-sm sm:text-base">
                <Ban className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Healthcare & Medical Records</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Health insurance providers, telehealth platforms, and pharmacy services require verifiable, HIPAA-compliant communication and permanent access records.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-400 font-bold text-sm sm:text-base">
                <Ban className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Password Recovery Channels</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Once a temporary inbox expires, its address cannot be re-authenticated. If you ever forget your password on a linked service, automated password recovery emails will bounce, locking you out permanently.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-400 font-bold text-sm sm:text-base">
                <Ban className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Unlawful Activity, Fraud & Abuse</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Using temporary email for illegal activity, spam campaigns, credential phishing, botnets, financial scams, or harassment is strictly prohibited. Outbound SMTP relaying is disabled across our systems.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-400 font-bold text-sm sm:text-base">
                <Ban className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Bypassing Website Terms & Restrictions</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Do not use temporary email to evade platform bans, circumvent multi-account restrictions, abuse referral programs, or breach the terms of service of third-party platforms.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: PRIVACY & SECURITY LIMITATIONS */}
      {/* ========================================================= */}
      <section 
        aria-labelledby="privacy-limitations-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>Realistic Cybersecurity Standards</span>
            </div>
            <h2 
              id="privacy-limitations-heading"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
            >
              Privacy & Security Limitations
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We believe in honest, unvarnished cybersecurity transparency. Temporary email provides valuable inbox defense, but it is not a silver bullet and must never be confused with anonymity or end-to-end encrypted messaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <AlertCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Not the Same as Anonymity</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A temporary email shields your personal email address from marketing databases, but it does not hide your network IP address, browser headers, or geographical location from websites you visit. It is not an alternative to privacy routing tools like Tor or a VPN.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <AlertCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Not End-to-End Encrypted</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Messages sent to temporary mailboxes arrive across standard Internet SMTP hops using opportunistic TLS. Unlike dedicated zero-access encrypted services (e.g. Proton Mail or Tuta), temporary mail systems do not use PGP keypairs for client-side message encryption.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <AlertCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Shared Public Namespaces</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Because TempInbox operates without passwords or user credentials, email addresses on our public domains are shared namespaces. If another user inputs an identical custom username on the same domain, they can see messages delivered to it. Always choose random addresses for greater entropy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                <AlertCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Volatile In-Memory Storage</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Messages and mailboxes are held exclusively in volatile RAM and scrubbed upon expiration or deletion. There are no cold backups, database archives, or recovery keys. When data expires, it is permanently erased and cannot be restored.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: LATEST EMAIL PRIVACY GUIDES */}
      {/* ========================================================= */}
      <section 
        aria-labelledby="privacy-guides-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Educational Knowledge Base</span>
            </div>
            <h2 
              id="privacy-guides-heading"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Latest Email Privacy Guides
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Explore in-depth articles on email delivery protocols, tracking mechanics, and digital hygiene.
            </p>
          </div>

          <a
            href="/guides"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                onNavigateTab('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition self-start sm:self-auto shadow-xs"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <a
              key={guide.id}
              href={`/guides/${guide.slug}`}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateGuide(guide.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition cursor-pointer flex flex-col justify-between group no-underline text-inherit"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                    {guide.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-2">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================= */}
      <section 
        aria-labelledby="faq-section-heading"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 
            id="faq-section-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Factual, transparent answers to core questions about disposable inboxes, storage policies, and usage boundaries.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>{item.question}</span>
                  </span>
                  <span className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/faq"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                onNavigateTab('faq');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Have more questions? Browse our complete protocol & technical FAQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

    </div>
  );
});

HomepageInformationalSections.displayName = 'HomepageInformationalSections';
