import React, { useState } from 'react';
import { 
  Mail, BookOpen, Zap, Info, Globe, Moon, Sun, 
  Menu, X, Check, ChevronDown, ArrowRight
} from 'lucide-react';
import { SupportedLanguage, NavigationTab } from '../types';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  activeAddress?: string;
  unreadCount: number;
}

const languagesList: { code: SupportedLanguage; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
  activeTab,
  onSelectTab,
  unreadCount,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: Parameters<typeof onSelectTab>[0]) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      onSelectTab(tab);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shrink-0 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Home Link */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, 'inbox')}
          aria-label="TempInbox Home"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1 -ml-1 transition"
        >
          <div className="w-9 h-9 bg-blue-600 group-hover:bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-sm transition">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Temp<span className="text-blue-600 dark:text-blue-400">Inbox</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <a
            href="/guides"
            onClick={(e) => handleLinkClick(e, 'blog')}
            className={`py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 ${
              activeTab === 'blog'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Guides
          </a>

          <a
            href="/how-it-works"
            onClick={(e) => handleLinkClick(e, 'how-it-works')}
            className={`py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 ${
              activeTab === 'how-it-works'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            How It Works
          </a>

          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, 'about')}
            className={`py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 ${
              activeTab === 'about'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            About
          </a>
        </nav>

        {/* Desktop Right Controls: Primary CTA + Utility Buttons */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Primary CTA: Temporary Email Tool */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'inbox')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Mail className="w-4 h-4" />
            <span>Temporary Email</span>
            {unreadCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-extrabold bg-white text-blue-600">
                {unreadCount}
              </span>
            )}
          </a>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-200 dark:border-slate-800"></div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
              aria-expanded={langDropdownOpen}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="uppercase">{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div 
                role="menu"
                className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50 animate-fadeIn"
              >
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition text-slate-700 dark:text-slate-200 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Primary CTA */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'inbox')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
            {unreadCount > 0 && (
              <span className="px-1 rounded-full text-[10px] bg-white text-blue-600 font-bold">
                {unreadCount}
              </span>
            )}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer / Slide Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3 animate-fadeIn shadow-lg">
          
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'inbox')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm flex items-center justify-between ${
                activeTab === 'inbox'
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Temporary Email Tool</span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="/guides"
              onClick={(e) => handleLinkClick(e, 'blog')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === 'blog'
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Guides</span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="/how-it-works"
              onClick={(e) => handleLinkClick(e, 'how-it-works')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === 'how-it-works'
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-slate-400" />
                <span>How It Works</span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, 'about')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === 'about'
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" />
                <span>About</span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </nav>

          {/* Mobile Utilities (Language & Theme) */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Language:</span>
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                {languagesList.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{darkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
