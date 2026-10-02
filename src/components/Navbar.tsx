import React from 'react';
import { 
  Mail, Shield, Globe, Moon, Sun, Sparkles, Terminal, BookOpen, 
  HelpCircle, BarChart3, ChevronDown, Check, Zap, Info, AlertTriangle, 
  Cookie, Calculator
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: 'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'about' | 'disclaimer' | 'cookies' | 'audit';
  onSelectTab: (tab: 'inbox' | 'blog' | 'api' | 'faq' | 'admin' | 'terms' | 'about' | 'disclaimer' | 'cookies' | 'audit') => void;
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
  activeAddress,
  unreadCount,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('inbox')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              Temp<span className="text-blue-600 dark:text-blue-400">Inbox</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-500 dark:text-slate-400">
          <button
            onClick={() => onSelectTab('inbox')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'inbox'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inbox</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-blue-600 text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('audit')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'audit'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4 text-blue-500" />
            <span>Privacy Audit</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400">
              Tool
            </span>
          </button>

          <button
            onClick={() => onSelectTab('blog')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'blog'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Research</span>
          </button>

          <button
            onClick={() => onSelectTab('api')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'api'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>API</span>
          </button>

          <button
            onClick={() => onSelectTab('faq')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'faq'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </button>

          <button
            onClick={() => onSelectTab('about')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'about'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>

          <button
            onClick={() => onSelectTab('terms')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'terms'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Terms</span>
          </button>

          <button
            onClick={() => onSelectTab('disclaimer')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'disclaimer'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Disclaimer</span>
          </button>

          <button
            onClick={() => onSelectTab('cookies')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'cookies'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Cookies</span>
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              activeTab === 'admin'
                ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-blue-600 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Stats</span>
          </button>
        </nav>

        {/* Right Controls: Divider + Language + Dark Mode */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>{languagesList.find((l) => l.code === currentLang)?.flag}</span>
                <span className="hidden sm:inline uppercase">{currentLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50 animate-fadeIn">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition text-slate-700 dark:text-slate-200"
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
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Horizontal Navigation Scrolling Bar */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <button
          onClick={() => onSelectTab('inbox')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'inbox' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          Inbox
        </button>
        <button
          onClick={() => onSelectTab('audit')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'audit' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-blue-500" />
          Audit
        </button>
        <button
          onClick={() => onSelectTab('blog')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'blog' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Research
        </button>
        <button
          onClick={() => onSelectTab('api')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'api' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          API
        </button>
        <button
          onClick={() => onSelectTab('faq')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'faq' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          FAQ
        </button>
        <button
          onClick={() => onSelectTab('about')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          About
        </button>
        <button
          onClick={() => onSelectTab('terms')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'terms' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Terms
        </button>
        <button
          onClick={() => onSelectTab('disclaimer')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'disclaimer' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Disclaimer
        </button>
        <button
          onClick={() => onSelectTab('cookies')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'cookies' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Cookie className="w-3.5 h-3.5" />
          Cookies
        </button>
        <button
          onClick={() => onSelectTab('admin')}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${
            activeTab === 'admin' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Stats
        </button>
      </div>
    </header>
  );
};
