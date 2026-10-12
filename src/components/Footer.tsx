import React from 'react';
import { Mail, Shield, Cookie } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onSelectTab?: (tab: NavigationTab) => void;
  onOpenCmp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenCmp }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: Parameters<NonNullable<typeof onSelectTab>>[0]) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      if (onSelectTab) {
        onSelectTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleCookieClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      if (onOpenCmp) {
        onOpenCmp();
      } else if (onSelectTab) {
        onSelectTab('cookies');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer 
      aria-label="Site Footer" 
      className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info Column (spans 2 on lg) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-xs">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Temp<span className="text-blue-600 dark:text-blue-400">Inbox</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Independent disposable temporary email utility. Generate short-lived inboxes on demand to shield your personal email address from marketing clutter, scrapers, and spam.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>In-Memory Volatile Architecture</span>
            </div>
          </div>

          {/* Group 1: Product */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, 'inbox')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  Temporary Email
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  onClick={(e) => handleLinkClick(e, 'how-it-works')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Group 2: Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/guides"
                  onClick={(e) => handleLinkClick(e, 'blog')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Group 3: Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Group 4: Legal & Privacy */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleLinkClick(e, 'privacy')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLinkClick(e, 'terms')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => handleLinkClick(e, 'disclaimer')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left inline-block"
                >
                  Legal Disclaimer
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  onClick={handleCookieClick}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm text-left text-slate-600 dark:text-slate-400 font-medium hover:underline"
                  title="Manage Privacy Choices and Certified CMP Consent Settings"
                >
                  <Cookie className="w-3.5 h-3.5 text-blue-500" />
                  <span>Privacy / Cookie Settings</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Operational Description */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} TempInbox.solutions. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Disposable Temporary Email • Inbound SMTP • Ephemeral In-Memory Storage
          </p>
        </div>

      </div>
    </footer>
  );
};
