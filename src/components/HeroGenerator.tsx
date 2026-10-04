import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Plus, Clock, QrCode, Trash2, Send, Check, ShieldCheck, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';
import { Mailbox, MailboxDuration, SupportedLanguage } from '../types';
import { availableDomains } from '../data/domains';
import { translations } from '../data/translations';

interface HeroGeneratorProps {
  currentLang: SupportedLanguage;
  mailbox: Mailbox | null;
  onGenerateRandom: (domain: string, duration: MailboxDuration) => void;
  onGenerateCustom: (customUsername: string, domain: string, duration: MailboxDuration) => void;
  onRefreshInbox: () => void;
  onExtendDuration: () => void;
  onDeleteMailbox: () => void;
  onOpenQrCode: () => void;
  onOpenTestEmailModal: () => void;
  isLoading: boolean;
}

const durationOptions: { key: MailboxDuration; label: string; hours: number }[] = [
  { key: '1h', label: '1 Hour', hours: 1 },
  { key: '3h', label: '3 Hours', hours: 3 },
  { key: '6h', label: '6 Hours', hours: 6 },
  { key: '12h', label: '12 Hours', hours: 12 },
  { key: '24h', label: '24 Hours', hours: 24 },
  { key: '2d', label: '2 Days', hours: 48 },
  { key: '3d', label: '3 Days', hours: 72 },
  { key: '5d', label: '5 Days', hours: 120 },
  { key: '7d', label: '7 Days', hours: 168 },
];

export const HeroGenerator: React.FC<HeroGeneratorProps> = ({
  currentLang,
  mailbox,
  onGenerateRandom,
  onGenerateCustom,
  onRefreshInbox,
  onExtendDuration,
  onDeleteMailbox,
  onOpenQrCode,
  onOpenTestEmailModal,
  isLoading,
}) => {
  const t = translations[currentLang];
  const [selectedDomain, setSelectedDomain] = useState('mailhub.cc');
  const [selectedDuration, setSelectedDuration] = useState<MailboxDuration>('24h');
  const [activeTab, setActiveTab] = useState<'random' | 'custom'>('random');
  const [customInput, setCustomInput] = useState('');
  const [copied, setCopied] = useState(false);

  // Time remaining state for countdown timer
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    if (!mailbox) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, mailbox.expiresAt - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [mailbox]);

  const handleCopy = () => {
    if (!mailbox) return;
    navigator.clipboard.writeText(mailbox.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onGenerateCustom(customInput, selectedDomain, selectedDuration);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-8 shrink-0 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Title & Subtitle */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Your Instant Private Inbox
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          Protect your identity and keep your real inbox clean. No registration required.
        </p>
        
        {/* Main Generator Input Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all gap-2 mb-6 overflow-hidden">
          <input
            type="text"
            readOnly
            value={mailbox ? mailbox.address : 'Generating...'}
            className="bg-transparent border-none flex-grow min-w-0 truncate px-4 py-2 font-mono text-base sm:text-lg text-slate-800 dark:text-slate-100 focus:outline-none select-all font-semibold text-center sm:text-left"
          />

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 shrink-0">
            {/* Copy Primary Button */}
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {/* Refresh / New Address Icon Button */}
            <button
              onClick={onRefreshInbox}
              disabled={isLoading}
              title={t.refresh}
              className="p-2.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
            </button>

            {/* QR Code Icon Button */}
            <button
              onClick={onOpenQrCode}
              title={t.qrCode}
              className="p-2.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition"
            >
              <QrCode className="w-5 h-5" />
            </button>

            {/* Send Test Email Icon Button */}
            <button
              onClick={onOpenTestEmailModal}
              title={t.sendTestMail}
              className="p-2.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl transition"
            >
              <Send className="w-5 h-5" />
            </button>

            {/* Delete Icon Button */}
            <button
              onClick={onDeleteMailbox}
              title={t.deleteMailbox}
              className="p-2.5 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary controls: Custom tab & domain picker */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Tab selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('random')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'random'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              Random Address
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'custom'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              Custom Username
            </button>
          </div>

          {/* Domain Picker */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-400">Domain:</span>
            <select
              value={selectedDomain}
              onChange={(e) => {
                setSelectedDomain(e.target.value);
                if (mailbox) {
                  onGenerateRandom(e.target.value, selectedDuration);
                }
              }}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {availableDomains.map((d) => (
                <option key={d.domain} value={d.domain}>
                  @{d.domain}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Custom username form input (when Custom tab active) */}
        {activeTab === 'custom' && (
          <form onSubmit={handleCustomSubmit} className="w-full max-w-2xl mt-3 flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. johnshop"
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Set Custom</span>
            </button>
          </form>
        )}

      </div>
    </header>
  );
};
