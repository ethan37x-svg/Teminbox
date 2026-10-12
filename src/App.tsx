import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Mailbox, MailboxDuration, EmailMessage, SupportedLanguage, NavigationTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroGenerator } from './components/HeroGenerator';
import { LiveInbox } from './components/LiveInbox';
import { HomepageInformationalSections } from './components/HomepageInformationalSections';
import { EmailExposureRiskCalculator } from './components/EmailExposureRiskCalculator';
import { EmailArchitectureExplainer } from './components/EmailArchitectureExplainer';
import { Footer } from './components/Footer';
import { isAdEligiblePage } from './config/adEligibility';
import { blogArticles } from './data/blogArticles';
import { initCmpListeners, reopenCmpSettings } from './utils/cmpIntegration';
import { updateDocumentSeo } from './utils/seoManager';
import { getAllStaticPages } from './seo/staticRoutes';

// Lazy-loaded routes and modals to split non-critical JavaScript chunks
const BlogSection = lazy(() => import('./components/BlogSection').then((m) => ({ default: m.BlogSection })));
const ApiDocsSection = lazy(() => import('./components/ApiDocsSection').then((m) => ({ default: m.ApiDocsSection })));
const FaqSection = lazy(() => import('./components/FaqSection').then((m) => ({ default: m.FaqSection })));
const AdminDashboardModal = lazy(() => import('./components/AdminDashboardModal').then((m) => ({ default: m.AdminDashboardModal })));
const TermsOfServiceSection = lazy(() => import('./components/TermsOfServiceSection').then((m) => ({ default: m.TermsOfServiceSection })));
const PrivacyPolicySection = lazy(() => import('./components/PrivacyPolicySection').then((m) => ({ default: m.PrivacyPolicySection })));
const AboutSection = lazy(() => import('./components/AboutSection').then((m) => ({ default: m.AboutSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then((m) => ({ default: m.ContactSection })));
const HowItWorksSection = lazy(() => import('./components/HowItWorksSection').then((m) => ({ default: m.HowItWorksSection })));
const DisclaimerSection = lazy(() => import('./components/DisclaimerSection').then((m) => ({ default: m.DisclaimerSection })));
const CookieSettingsSection = lazy(() => import('./components/CookieSettingsSection').then((m) => ({ default: m.CookieSettingsSection })));
const NotFoundSection = lazy(() => import('./components/NotFoundSection').then((m) => ({ default: m.NotFoundSection })));
const EmailDetailModal = lazy(() => import('./components/EmailDetailModal').then((m) => ({ default: m.EmailDetailModal })));
const SendTestEmailModal = lazy(() => import('./components/SendTestEmailModal').then((m) => ({ default: m.SendTestEmailModal })));
const QRCodeModal = lazy(() => import('./components/QRCodeModal').then((m) => ({ default: m.QRCodeModal })));

// Accessible minimal fallback for lazy-loaded route transitions
const RouteLoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center py-20 min-h-[400px]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
      <span className="text-xs font-medium text-slate-400">Loading section...</span>
    </div>
  </div>
);

/**
 * Pure route parser from window.location.pathname.
 * Ensures the very first React render matches the requested URL without a flash of the inbox.
 */
function parseRouteFromLocation(): {
  tab: NavigationTab;
  guideSlug: string | null;
  notFoundPath: string;
} {
  if (typeof window === 'undefined') {
    return { tab: 'inbox', guideSlug: null, notFoundPath: '' };
  }
  const cleanPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!cleanPath) {
    return { tab: 'inbox', guideSlug: null, notFoundPath: '' };
  }
  if (cleanPath.startsWith('guides/') || cleanPath.startsWith('blog/')) {
    const slug = cleanPath.split('/')[1] || null;
    if (slug) {
      const articleExists = blogArticles.some((a) => a.slug === slug);
      if (articleExists) {
        return { tab: 'blog', guideSlug: slug, notFoundPath: '' };
      }
      return { tab: '404', guideSlug: null, notFoundPath: window.location.pathname };
    }
    return { tab: 'blog', guideSlug: null, notFoundPath: '' };
  }
  if (cleanPath === 'guides' || cleanPath === 'blog') {
    return { tab: 'blog', guideSlug: null, notFoundPath: '' };
  }
  const directTabs: Record<string, NavigationTab> = {
    'how-it-works': 'how-it-works',
    about: 'about',
    contact: 'contact',
    faq: 'faq',
    terms: 'terms',
    privacy: 'privacy',
    cookies: 'cookies',
    api: 'api',
    disclaimer: 'disclaimer',
    audit: 'audit',
    admin: 'admin',
    '404': '404',
  };
  if (directTabs[cleanPath]) {
    return { tab: directTabs[cleanPath], guideSlug: null, notFoundPath: cleanPath === '404' ? window.location.pathname : '' };
  }
  return { tab: '404', guideSlug: null, notFoundPath: window.location.pathname };
}

const tabToCanonicalPathMap: Record<NavigationTab, string> = {
  inbox: '/',
  blog: '/guides',
  'how-it-works': '/how-it-works',
  about: '/about',
  contact: '/contact',
  faq: '/faq',
  terms: '/terms',
  privacy: '/privacy',
  cookies: '/cookies',
  api: '/api',
  disclaimer: '/disclaimer',
  audit: '/audit',
  admin: '/admin',
  '404': '/404',
};

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>(() => parseRouteFromLocation().tab);
  const [activeGuideSlug, setActiveGuideSlug] = useState<string | null>(() => parseRouteFromLocation().guideSlug);
  const [attemptedNotFoundPath, setAttemptedNotFoundPath] = useState<string>(() => parseRouteFromLocation().notFoundPath);

  const [mailbox, setMailbox] = useState<Mailbox | null>(null);
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);

  const [showQrCode, setShowQrCode] = useState(false);
  const [showTestEmailModal, setShowTestEmailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Certified CMP listeners on mount
  useEffect(() => {
    initCmpListeners();
  }, []);

  // Toggle Dark Mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Synchronize browser history and route on popstate
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromLocation();
      setActiveTab(route.tab);
      setActiveGuideSlug(route.guideSlug);
      setAttemptedNotFoundPath(route.notFoundPath);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Tab Navigation with URL sync (memoized to prevent child re-renders)
  const handleSelectTab = useCallback((tab: NavigationTab) => {
    setActiveTab(tab);
    setActiveGuideSlug(null);
    const targetPath = tabToCanonicalPathMap[tab] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  }, []);

  const handleGuideSlugChange = useCallback((slug: string | null) => {
    setActiveGuideSlug(slug);
    setActiveTab('blog');
    const targetPath = slug ? `/guides/${slug}` : '/guides';
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  }, []);

  // Comprehensive SEO, OpenGraph, Canonical & Structured Data Synchronizer
  useEffect(() => {
    // 1. If an individual email message detail modal is open:
    // Strictest privacy protection: enforce noindex, nofollow, noarchive!
    if (selectedMessage) {
      updateDocumentSeo({
        title: 'Temporary Message Viewer — TempInbox',
        description: 'Viewing temporary email message. Ephemeral in-memory volatile session.',
        canonicalUrl: 'https://tempinbox.solutions/',
        robots: 'noindex, nofollow, noarchive',
        ogType: 'website',
      });
      return;
    }

    const staticPages = getAllStaticPages();

    // 2. Individual guide article
    if (activeTab === 'blog' && activeGuideSlug) {
      const articlePage = staticPages[`/guides/${activeGuideSlug}`];
      if (articlePage && articlePage.article) {
        updateDocumentSeo({
          title: articlePage.title,
          description: articlePage.description,
          canonicalUrl: articlePage.canonicalUrl,
          robots: articlePage.robots,
          ogType: 'article',
          ogImage: articlePage.ogImage,
          articleData: articlePage.article,
        });
        return;
      }
    }

    // 3. Centralized static page SEO mapping directly from staticRoutes.ts
    const currentPath = tabToCanonicalPathMap[activeTab] || '/404';
    const page = staticPages[currentPath] || staticPages['/404'];
    if (page) {
      updateDocumentSeo({
        title: page.title,
        description: page.description,
        canonicalUrl: page.canonicalUrl,
        robots: page.robots,
        ogType: page.ogType,
        ogImage: page.ogImage,
      });
    }
  }, [activeTab, activeGuideSlug, selectedMessage]);

  // Initial Mailbox Generation on Load
  useEffect(() => {
    generateRandomMailbox('mailhub.cc', '24h');
  }, []);

  const handleOpenPrivacyCookieSettings = useCallback(() => {
    const res = reopenCmpSettings();
    if (!res.success) {
      handleSelectTab('cookies');
    }
  }, [handleSelectTab]);

  // Structural message equality check to eliminate 100% of idle re-renders
  const areMessagesIdentical = (prev: EmailMessage[], next: EmailMessage[]): boolean => {
    if (prev === next) return true;
    if (prev.length !== next.length) return false;
    for (let i = 0; i < prev.length; i++) {
      if (
        prev[i].id !== next[i].id ||
        prev[i].unread !== next[i].unread ||
        prev[i].receivedAt !== next[i].receivedAt
      ) {
        return false;
      }
    }
    return true;
  };

  // High-reliability real-time inbox polling:
  // - 3s interval when visible (100% instant delivery)
  // - 10s relaxed interval when hidden in background
  // - Instant immediate sync upon switching back to tab
  // - In-flight lock prevents overlapping requests
  // - AbortController cleans up stale requests on address change
  // - State equality check prevents React re-render churn
  useEffect(() => {
    if (!mailbox?.address) return;

    let isSubscribed = true;
    let isFetching = false;
    const abortController = new AbortController();

    const fetchInboxMessages = async () => {
      if (isFetching || !isSubscribed) return;
      isFetching = true;

      try {
        const res = await fetch(
          `/api/v1/inbox?address=${encodeURIComponent(mailbox.address)}`,
          { signal: abortController.signal }
        );
        if (res.ok && isSubscribed) {
          const data = await res.json();
          const incoming: EmailMessage[] = data.messages || [];
          setMessages((prev) => (areMessagesIdentical(prev, incoming) ? prev : incoming));
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.warn('Real-time inbox sync error:', err);
        }
      } finally {
        isFetching = false;
      }
    };

    fetchInboxMessages();

    let intervalId: any;
    const startPolling = () => {
      clearInterval(intervalId);
      const delay = document.visibilityState === 'visible' ? 3000 : 10000;
      intervalId = setInterval(fetchInboxMessages, delay);
    };

    startPolling();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchInboxMessages();
      }
      startPolling();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isSubscribed = false;
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      abortController.abort();
    };
  }, [mailbox?.address]);

  // Generate Random Address
  const generateRandomMailbox = async (domain: string, duration: MailboxDuration) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, duration }),
      });
      const data = await res.json();
      if (data.mailbox) {
        setMailbox(data.mailbox);
      }
    } catch (err) {
      console.error('Generate mailbox error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Custom Address
  const generateCustomMailbox = async (
    customUsername: string,
    domain: string,
    duration: MailboxDuration
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customUsername, domain, duration }),
      });
      const data = await res.json();
      if (data.mailbox) {
        setMailbox(data.mailbox);
      }
    } catch (err) {
      console.error('Custom mailbox error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh Inbox Action (manual forced trigger)
  const handleRefreshInbox = async () => {
    if (!mailbox) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/v1/inbox?address=${encodeURIComponent(mailbox.address)}`);
      if (res.ok) {
        const data = await res.json();
        const incoming: EmailMessage[] = data.messages || [];
        setMessages((prev) => (areMessagesIdentical(prev, incoming) ? prev : incoming));
      }
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setTimeout(() => setIsLoading(false), 400);
    }
  };

  // Extend Expiration Time Action (+24 hours)
  const handleExtendDuration = async () => {
    if (!mailbox) return;
    try {
      const res = await fetch('/api/v1/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: mailbox.address, addHours: 24 }),
      });
      const data = await res.json();
      if (data.mailbox) {
        setMailbox(data.mailbox);
      }
    } catch (err) {
      console.error('Extend error:', err);
    }
  };

  // Delete Mailbox Permanently Action
  const handleDeleteMailbox = async () => {
    if (!mailbox) return;
    try {
      await fetch(`/api/v1/mailbox?address=${encodeURIComponent(mailbox.address)}`, {
        method: 'DELETE',
      });
      setMessages([]);
      generateRandomMailbox(mailbox.domain, '24h');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Simulate Sending Test Incoming Message Action
  const handleSendTestEmail = async (msgData: {
    mailboxAddress: string;
    senderName: string;
    senderEmail: string;
    subject: string;
    templateType: 'otp' | 'receipt' | 'newsletter' | 'custom';
    bodyText?: string;
  }) => {
    try {
      const res = await fetch('/api/v1/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData),
      });
      if (res.ok) {
        await handleRefreshInbox();
      }
    } catch (err) {
      console.error('Send test email error:', err);
    }
  };

  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors overflow-x-hidden">
      
      {/* Top Header Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        activeAddress={mailbox?.address}
        unreadCount={unreadCount}
      />

      <main className="flex-1 flex flex-col">
        {/* Main Inbox & Generator View — TOOL PAGE (ZERO ADS PERMITTED) */}
        {activeTab === 'inbox' && (
          <>
            <HeroGenerator
              currentLang={currentLang}
              mailbox={mailbox}
              onGenerateRandom={generateRandomMailbox}
              onGenerateCustom={generateCustomMailbox}
              onRefreshInbox={handleRefreshInbox}
              onExtendDuration={handleExtendDuration}
              onDeleteMailbox={handleDeleteMailbox}
              onOpenQrCode={() => setShowQrCode(true)}
              onOpenTestEmailModal={() => setShowTestEmailModal(true)}
              isLoading={isLoading}
            />

            {/* Live Real-time Inbox Feed (Tool component - Zero ads) */}
            <LiveInbox
              currentLang={currentLang}
              messages={messages}
              onSelectMessage={setSelectedMessage}
              onOpenTestEmailModal={() => setShowTestEmailModal(true)}
              isLoading={isLoading}
              mailbox={mailbox}
            />

            {/* Substantial Original Informational Sections Below The Tool */}
            <HomepageInformationalSections
              onNavigateGuide={handleGuideSlugChange}
              onNavigateTab={handleSelectTab}
            />

            {/* Supplementary Privacy Diagnostic Calculator & Architecture Explainer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-10 w-full">
              <EmailExposureRiskCalculator />
              <EmailArchitectureExplainer />
            </div>
          </>
        )}

        {/* Dedicated Privacy Audit & Exposure Risk Calculator Tab (Tool Page - Zero ads) */}
        {activeTab === 'audit' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full animate-fadeIn">
            <EmailExposureRiskCalculator />
            <EmailArchitectureExplainer />
          </div>
        )}

        {/* Suspense boundary for lazy-loaded secondary editorial routes */}
        <Suspense fallback={<RouteLoadingFallback />}>
          {/* SEO Blog & Guides Tab (Editorial Content — Ad Eligible on /guides and /guides/:slug) */}
          {activeTab === 'blog' && (
            <BlogSection 
              initialSlug={activeGuideSlug} 
              onSlugChange={handleGuideSlugChange} 
            />
          )}

          {/* Developer API Tab */}
          {activeTab === 'api' && <ApiDocsSection />}

          {/* FAQ Tab (Editorial Content) */}
          {activeTab === 'faq' && <FaqSection />}

          {/* Admin Dashboard Tab */}
          {activeTab === 'admin' && <AdminDashboardModal />}

          {/* Terms of Service Page Tab */}
          {activeTab === 'terms' && <TermsOfServiceSection onNavigateTab={handleSelectTab} />}

          {/* Privacy Policy Page Tab (Verified Ephemeral Architecture — Zero Ads During Consent Flow) */}
          {activeTab === 'privacy' && (
            <PrivacyPolicySection 
              onNavigateTab={handleSelectTab} 
              onOpenCmp={handleOpenPrivacyCookieSettings} 
            />
          )}

          {/* About Us Page Tab */}
          {activeTab === 'about' && (
            <AboutSection 
              onNavigateToTerms={() => handleSelectTab('terms')} 
              onNavigateToContact={() => handleSelectTab('contact')}
            />
          )}

          {/* Contact Page Tab (Direct Communication Channels — Zero Ads) */}
          {activeTab === 'contact' && (
            <ContactSection onNavigateTab={handleSelectTab} />
          )}

          {/* Disclaimer Page Tab (Editorial Content) */}
          {activeTab === 'disclaimer' && <DisclaimerSection onNavigateToTerms={() => handleSelectTab('terms')} />}

          {/* Cookie Settings Page Tab (Editorial Content) */}
          {activeTab === 'cookies' && (
            <CookieSettingsSection 
              onNavigateToTerms={() => handleSelectTab('terms')} 
              onNavigateToPrivacy={() => handleSelectTab('privacy')}
            />
          )}

          {/* How It Works Tab (Educational 3-Step Lifecycle) */}
          {activeTab === 'how-it-works' && (
            <HowItWorksSection onNavigateTab={handleSelectTab} />
          )}

          {/* 404 Page Not Found Tab */}
          {activeTab === '404' && (
            <NotFoundSection 
              onNavigateHome={() => handleSelectTab('inbox')}
              onNavigateGuides={() => handleSelectTab('blog')}
              attemptedPath={attemptedNotFoundPath}
            />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer 
        onSelectTab={handleSelectTab} 
        onOpenCmp={handleOpenPrivacyCookieSettings} 
      />

      {/* Lazy Modals wrapped in Suspense boundary */}
      <Suspense fallback={null}>
        {selectedMessage && (
          <EmailDetailModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
        )}

        {showTestEmailModal && mailbox && (
          <SendTestEmailModal
            activeAddress={mailbox.address}
            onClose={() => setShowTestEmailModal(false)}
            onSendTest={handleSendTestEmail}
          />
        )}

        {showQrCode && mailbox && (
          <QRCodeModal address={mailbox.address} onClose={() => setShowQrCode(false)} />
        )}
      </Suspense>

    </div>
  );
}
