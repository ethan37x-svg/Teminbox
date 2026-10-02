import React, { useState, useEffect } from 'react';
import { Mailbox, MailboxDuration, EmailMessage, SupportedLanguage } from './types';
import { Navbar } from './components/Navbar';
import { HeroGenerator } from './components/HeroGenerator';
import { LiveInbox } from './components/LiveInbox';
import { EmailDetailModal } from './components/EmailDetailModal';
import { SendTestEmailModal } from './components/SendTestEmailModal';
import { QRCodeModal } from './components/QRCodeModal';
import { AdSenseBanner } from './components/AdSenseBanners';
import { BlogSection } from './components/BlogSection';
import { ApiDocsSection } from './components/ApiDocsSection';
import { FaqSection } from './components/FaqSection';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { TermsOfServiceSection } from './components/TermsOfServiceSection';
import { AboutSection } from './components/AboutSection';
import { DisclaimerSection } from './components/DisclaimerSection';
import { CookieSettingsSection } from './components/CookieSettingsSection';
import { EmailExposureRiskCalculator } from './components/EmailExposureRiskCalculator';
import { EmailArchitectureExplainer } from './components/EmailArchitectureExplainer';
import { TcfConsentManagementModal } from './components/TcfConsentManagementModal';
import { Footer } from './components/Footer';
import { Cookie } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'about' | 'disclaimer' | 'cookies' | 'audit'>('inbox');

  const [mailbox, setMailbox] = useState<Mailbox | null>(null);
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);

  const [showQrCode, setShowQrCode] = useState(false);
  const [showTestEmailModal, setShowTestEmailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCmpModal, setShowCmpModal] = useState(false);

  // Toggle Dark Mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initial Mailbox Generation on Load
  useEffect(() => {
    generateRandomMailbox('mailhub.cc', '24h');
  }, []);

  // Check if TCF v2.2 CMP consent was previously collected; show CMP banner if new visitor
  useEffect(() => {
    try {
      const consent = localStorage.getItem('tcf_consent_data_v2');
      if (!consent) {
        const timer = setTimeout(() => {
          setShowCmpModal(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  // Poll Inbox Messages every 3 seconds for real-time delivery
  useEffect(() => {
    if (!mailbox) return;

    const fetchInboxMessages = async () => {
      try {
        const res = await fetch(`/api/v1/inbox?address=${encodeURIComponent(mailbox.address)}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
        }
      } catch (err) {
        console.warn('Real-time inbox sync error:', err);
      }
    };

    fetchInboxMessages();
    const timer = setInterval(fetchInboxMessages, 3000);
    return () => clearInterval(timer);
  }, [mailbox]);

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

  // Refresh Inbox Action
  const handleRefreshInbox = async () => {
    if (!mailbox) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/v1/inbox?address=${encodeURIComponent(mailbox.address)}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
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
        onSelectTab={setActiveTab}
        activeAddress={mailbox?.address}
        unreadCount={unreadCount}
      />

      <main className="flex-1 flex flex-col">
        {/* Main Inbox & Generator View */}
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

            {/* Non-intrusive AdSense Banner below Hero */}
            <AdSenseBanner placement="hero-bottom" />

            {/* Live Real-time Inbox */}
            <LiveInbox
              currentLang={currentLang}
              messages={messages}
              onSelectMessage={setSelectedMessage}
              onOpenTestEmailModal={() => setShowTestEmailModal(true)}
              isLoading={isLoading}
            />

            {/* Deep Value Section: Interactive Privacy Diagnostic Calculator & Architecture Explainer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 space-y-10 w-full">
              <EmailExposureRiskCalculator />
              <EmailArchitectureExplainer />
            </div>

            {/* FAQ Section underneath Inbox */}
            <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto py-12">
              <FaqSection />
            </div>
          </>
        )}

        {/* Dedicated Privacy Audit & Exposure Risk Calculator Tab */}
        {activeTab === 'audit' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full animate-fadeIn">
            <EmailExposureRiskCalculator />
            <EmailArchitectureExplainer />
          </div>
        )}

        {/* SEO Blog & Guides Tab */}
        {activeTab === 'blog' && <BlogSection />}

        {/* Developer API Tab */}
        {activeTab === 'api' && <ApiDocsSection />}

        {/* FAQ Tab */}
        {activeTab === 'faq' && <FaqSection />}

        {/* Admin Dashboard Tab */}
        {activeTab === 'admin' && <AdminDashboardModal />}

        {/* Terms of Service & Privacy Page Tab */}
        {activeTab === 'terms' && <TermsOfServiceSection />}

        {/* About Us Page Tab */}
        {activeTab === 'about' && <AboutSection onNavigateToTerms={() => setActiveTab('terms')} />}

        {/* Disclaimer Page Tab */}
        {activeTab === 'disclaimer' && <DisclaimerSection onNavigateToTerms={() => setActiveTab('terms')} />}

        {/* Cookie Settings Page Tab */}
        {activeTab === 'cookies' && (
          <CookieSettingsSection 
            onNavigateToTerms={() => setActiveTab('terms')} 
            onOpenCmp={() => setShowCmpModal(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} onOpenCmp={() => setShowCmpModal(true)} />

      {/* Floating Persistent TCF v2.2 CMP Quick Access Button */}
      <button
        type="button"
        onClick={() => setShowCmpModal(true)}
        className="fixed bottom-4 left-4 z-40 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-800/95 hover:bg-blue-600 text-white text-[11px] font-bold shadow-lg border border-slate-700/80 backdrop-blur-xs flex items-center gap-1.5 transition-all group"
        title="Open IAB Europe TCF v2.2 Certified Consent Management Platform (CMP)"
      >
        <Cookie className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Cookie Choices</span>
        <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-500/30 text-blue-300 font-mono">TCF v2.2</span>
      </button>

      {/* TCF v2.2 Certified Consent Management Platform Modal */}
      <TcfConsentManagementModal
        isOpen={showCmpModal}
        onClose={() => setShowCmpModal(false)}
      />

      {/* Modals */}
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

    </div>
  );
}
