import React, { useState, useEffect } from 'react';
import { Mail, Search, Copy, Check, Sparkles, Inbox, RefreshCw, Send, ShieldCheck, Lock, Clock } from 'lucide-react';
import { EmailMessage, Mailbox, SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface LiveInboxProps {
  currentLang: SupportedLanguage;
  messages: EmailMessage[];
  onSelectMessage: (msg: EmailMessage) => void;
  onOpenTestEmailModal: () => void;
  isLoading: boolean;
  mailbox?: Mailbox | null;
}

export const LiveInbox: React.FC<LiveInboxProps> = ({
  currentLang,
  messages,
  onSelectMessage,
  onOpenTestEmailModal,
  isLoading,
  mailbox,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedOtpId, setCopiedOtpId] = useState<string | null>(null);

  // Time remaining state for countdown timer if mailbox is provided
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    if (!mailbox) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, mailbox.expiresAt - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [mailbox]);

  const filteredMessages = messages.filter((msg) => {
    const q = searchQuery.toLowerCase();
    return (
      msg.senderName.toLowerCase().includes(q) ||
      msg.senderEmail.toLowerCase().includes(q) ||
      msg.subject.toLowerCase().includes(q) ||
      msg.snippet.toLowerCase().includes(q)
    );
  });

  const handleCopyOtp = (e: React.MouseEvent, code: string, msgId: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedOtpId(msgId);
    setTimeout(() => setCopiedOtpId(null), 2000);
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 10) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(seconds / 60);
    return `${hours}h ago`;
  };

  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8">
      
      {/* Inbox Feed Section */}
      <section className="flex-[3] flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        
        {/* Inbox Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base text-slate-800 dark:text-white">Live Inbox</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 text-xs font-bold rounded-full">
                {unreadCount} NEW
              </span>
            )}
            {mailbox && (
              <span className="hidden sm:inline text-xs font-mono text-slate-400 truncate max-w-[200px]">
                ({mailbox.address})
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 italic">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Auto-refreshing stream</span>
            </div>

            {/* Search Input */}
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inbox..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Message Feed Rows */}
        <div className="flex-1 divide-y divide-slate-100 dark:divide-slate-800/80 min-h-[300px]">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-900/40">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                {searchQuery ? 'No matching emails found' : 'Your inbox is ready!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
                {searchQuery 
                  ? 'No messages matched your query. Clear the search field to view all incoming messages.'
                  : 'Waiting for incoming emails. Messages will appear here automatically when received.'
                }
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOpenTestEmailModal}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Simulate a Test Email (Demo)</span>
                </button>
              </div>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => onSelectMessage(msg)}
                className={`flex items-center px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition ${
                  msg.unread ? 'bg-blue-50/20 dark:bg-slate-800/40 font-semibold' : ''
                }`}
              >
                {/* Dot */}
                <div className={`w-2 h-2 rounded-full mr-4 shrink-0 ${msg.unread ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`} />

                {/* Body Content */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {msg.senderName}
                      </span>
                      {msg.isTestMessage && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                          Demo Simulation
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 shrink-0 ml-2">
                      {formatTimeAgo(msg.receivedAt)}
                    </span>
                  </div>

                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate mb-0.5">
                    {msg.subject}
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {msg.snippet}
                  </div>

                  {/* Verification OTP chip */}
                  {msg.verificationCode && (
                    <div className="mt-2 inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 px-2.5 py-0.5 rounded-lg text-xs">
                      <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-indigo-900 dark:text-indigo-200">OTP:</span>
                      <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{msg.verificationCode}</code>
                      <button
                        onClick={(e) => handleCopyOtp(e, msg.verificationCode!, msg.id)}
                        className="p-0.5 hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded"
                        title="Copy OTP"
                      >
                        {copiedOtpId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Size */}
                <div className="text-xs font-mono text-slate-400 shrink-0">
                  {msg.sizeKb} KB
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Sidebar Controls */}
      <aside className="flex-1 flex flex-col gap-6 min-w-[280px]">
        
        {/* Countdown Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Mailbox Lifespan</span>
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              Active
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4 text-center">
            <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase">Days</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase">Hrs</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase">Min</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase">Sec</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
            Mailbox payload is held in volatile memory and purged when the timer elapses or upon clicking Delete.
          </p>

          <button
            onClick={onOpenTestEmailModal}
            className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Send Test Email (Simulator)</span>
          </button>
        </div>

        {/* Security & Implementation Parameters Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Security & Implementation
          </h3>
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300">Inbound Architecture</span>
              <span className="font-semibold text-slate-900 dark:text-white">Inbound Only (No Relay)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300">TLS Encryption</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Enforced (TLS 1.2/1.3)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300">Storage Lifetime</span>
              <span className="font-semibold text-slate-900 dark:text-white">Volatile RAM (Auto-Purged)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300">User Tracking</span>
              <span className="font-semibold text-slate-900 dark:text-white">Zero Personal Registration</span>
            </div>
          </div>
        </div>

      </aside>

    </div>
  );
};

