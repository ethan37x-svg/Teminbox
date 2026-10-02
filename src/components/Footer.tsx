import React, { useState } from 'react';
import { Mail, Shield, Lock, FileText, Globe, Rss, Heart, X, Send, Maximize2, Calculator, Cpu, Cookie, ShieldCheck } from 'lucide-react';
import { TermsOfServiceSection } from './TermsOfServiceSection';

interface FooterProps {
  onSelectTab?: (tab: 'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'about' | 'disclaimer' | 'cookies' | 'audit') => void;
  onOpenCmp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenCmp }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'contact' | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  return (
    <footer className="px-6 sm:px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0 gap-4">
      <div className="space-y-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <span>© {new Date().getFullYear()} TempInbox Research Laboratory.</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            IAB TCF v2.2 Certified
          </span>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Stateless Ephemeral Mail Service • Inbound SMTP (RFC 5321) • In-Memory Zero-Persistence Guarantee.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {onSelectTab && (
          <button 
            onClick={() => onSelectTab('audit')} 
            className="hover:text-blue-600 dark:hover:text-blue-400 transition font-semibold flex items-center gap-1"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-500" />
            <span>Privacy Audit</span>
          </button>
        )}
        {onOpenCmp && (
          <button 
            onClick={onOpenCmp} 
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition flex items-center gap-1"
            title="Open IAB Europe TCF v2.2 Consent Management Platform"
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie Choices (TCF CMP)</span>
          </button>
        )}
        {onSelectTab && (
          <button 
            onClick={() => onSelectTab('about')} 
            className="hover:text-slate-900 dark:hover:text-slate-200 transition"
          >
            About Us
          </button>
        )}
        {onSelectTab && (
          <button 
            onClick={() => onSelectTab('disclaimer')} 
            className="hover:text-slate-900 dark:hover:text-slate-200 transition"
          >
            Disclaimer
          </button>
        )}
        {onSelectTab && (
          <button 
            onClick={() => onSelectTab('cookies')} 
            className="hover:text-slate-900 dark:hover:text-slate-200 transition"
          >
            Cookie Settings
          </button>
        )}
        <button 
          onClick={() => {
            if (onSelectTab) {
              onSelectTab('terms');
            } else {
              setModalType('privacy');
            }
          }} 
          className="hover:text-slate-900 dark:hover:text-slate-200 transition"
        >
          Privacy Policy
        </button>
        <button 
          onClick={() => {
            if (onSelectTab) {
              onSelectTab('terms');
            } else {
              setModalType('terms');
            }
          }} 
          className="hover:text-slate-900 dark:hover:text-slate-200 transition"
        >
          Terms of Service
        </button>
        <button 
          onClick={() => setModalType('contact')} 
          className="hover:text-slate-900 dark:hover:text-slate-200 transition"
        >
          Contact Support
        </button>
      </div>

      {/* Modal Dialog for Privacy, Terms, and Contact */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl shadow-2xl w-full p-6 relative my-8 ${modalType === 'terms' || modalType === 'privacy' ? 'max-w-5xl max-h-[90vh] overflow-y-auto' : 'max-w-lg'}`}>
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              {(modalType === 'terms' || modalType === 'privacy') && onSelectTab && (
                <button
                  onClick={() => {
                    setModalType(null);
                    onSelectTab('terms');
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center gap-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 px-2.5 py-1"
                  title="Expand to Full Screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Full View</span>
                </button>
              )}
              <button
                onClick={() => {
                  setModalType(null);
                  setContactSubmitted(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(modalType === 'privacy' || modalType === 'terms') && (
              <TermsOfServiceSection initialTab={modalType === 'privacy' ? 'privacy' : 'terms'} />
            )}

            {modalType === 'contact' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>Contact TempInbox Support & Security</span>
                </h3>
                
                {contactSubmitted ? (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl text-center font-medium">
                    Thank you! Your inquiry has been sent to our security team. We reply within 24 hours.
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Your Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@domain.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Inquiry Topic</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none">
                        <option>General Question</option>
                        <option>Technical RFC Inquiry</option>
                        <option>Abuse / DMCA Report</option>
                        <option>AdSense Compliance / Privacy / CMP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Message</label>
                      <textarea 
                        required 
                        rows={3}
                        placeholder="How can our engineering or legal team assist you?"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
