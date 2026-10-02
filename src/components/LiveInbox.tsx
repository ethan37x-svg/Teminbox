import React, { useState } from 'react';
import { Mail, Search, Paperclip, ShieldAlert, ShieldCheck, Copy, Check, Clock, Eye, Send, Sparkles, Inbox } from 'lucide-react';
import { EmailMessage, SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface LiveInboxProps {
  currentLang: SupportedLanguage;
  messages: EmailMessage[];
  onSelectMessage: (msg: EmailMessage) => void;
  onOpenTestEmailModal: () => void;
  isLoading: boolean;
}

export const LiveInbox: React.FC<LiveInboxProps> = ({
  currentLang,
  messages,
  onSelectMessage,
  onOpenTestEmailModal,
  isLoading,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedOtpId, setCopiedOtpId] = useState<string | null>(null);

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
    const hours = Math.floor(minutes / 60);
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
            <h2 className="font-bold text-base text-slate-800 dark:text-white">Inbox</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 text-xs font-bold rounded-full">
                {unreadCount} NEW
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 italic">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Waiting for incoming emails...</span>
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
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-1">
                {searchQuery ? 'No matching emails found' : t.noEmailsYet}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                {t.waitingForMail}
              </p>
              <button
                onClick={onOpenTestEmailModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Email</span>
              </button>
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
                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {msg.senderName}
                    </span>
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
                        className="p-0.5 hover:bg-indigo-100 rounded"
                      >
                        {copiedOtpId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-indigo-600" />}
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
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Mailbox Active Status
          </h3>
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100">00</span>
              <span className="text-[10px] text-slate-400 uppercase">Days</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100">23</span>
              <span className="text-[10px] text-slate-400 uppercase">Hrs</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100">59</span>
              <span className="text-[10px] text-slate-400 uppercase">Min</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">59</span>
              <span className="text-[10px] text-slate-400 uppercase">Sec</span>
            </div>
          </div>
          <button
            onClick={onOpenTestEmailModal}
            className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Send Test Email</span>
          </button>
        </div>

        {/* Settings / Preferences Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Security & Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Spam Shield</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">TLS Encryption</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-bold">Enforced</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Ephemeral Storage</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">RAM Only</span>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Auto-refresh stream</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </aside>

    </div>
  );
};
