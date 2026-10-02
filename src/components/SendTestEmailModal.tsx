import React, { useState } from 'react';
import { X, Send, Sparkles, Check, FileText, ShoppingCart, ShieldCheck } from 'lucide-react';

interface SendTestEmailModalProps {
  activeAddress: string;
  onClose: () => void;
  onSendTest: (data: {
    mailboxAddress: string;
    senderName: string;
    senderEmail: string;
    subject: string;
    bodyText: string;
    templateType: 'otp' | 'receipt' | 'custom';
  }) => Promise<void>;
}

export const SendTestEmailModal: React.FC<SendTestEmailModalProps> = ({
  activeAddress,
  onClose,
  onSendTest,
}) => {
  const [templateType, setTemplateType] = useState<'otp' | 'receipt' | 'custom'>('otp');
  const [senderName, setSenderName] = useState('Discord Security');
  const [senderEmail, setSenderEmail] = useState('no-reply@discord.com');
  const [subject, setSubject] = useState('Your Discord 6-Digit Verification Code');
  const [bodyText, setBodyText] = useState('Your single-use login code is 849201. Do not share it with anyone.');
  const [isSending, setIsSending] = useState(false);

  const handleTemplateChange = (type: 'otp' | 'receipt' | 'custom') => {
    setTemplateType(type);
    if (type === 'otp') {
      setSenderName('Discord Security');
      setSenderEmail('no-reply@discord.com');
      setSubject('Your Discord 6-Digit Verification Code');
      setBodyText('Your single-use login code is 849201. Do not share it with anyone.');
    } else if (type === 'receipt') {
      setSenderName('Amazon Orders');
      setSenderEmail('auto-confirm@amazon.com');
      setSubject('Your Amazon Order #402-981249-1192 Received');
      setBodyText('Thank you for your purchase of Pro Developer Tools ($19.99). Your order confirmation is attached.');
    } else {
      setSenderName('Alex Rivera');
      setSenderEmail('alex@techcompany.io');
      setSubject('Quick question regarding your trial account');
      setBodyText('Hey there! Welcome to our platform. Let us know if you need help setting up your integration.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    await onSendTest({
      mailboxAddress: activeAddress,
      senderName,
      senderEmail,
      subject,
      bodyText,
      templateType,
    });
    setIsSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Send Test Email Simulator</h3>
              <p className="text-xs text-slate-500">Test your temporary mailbox in real time</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Target Address Info */}
          <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Mailbox</span>
            <span className="font-mono font-bold text-slate-900 dark:text-emerald-400 text-sm">{activeAddress}</span>
          </div>

          {/* Preset Template Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Preset Template</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleTemplateChange('otp')}
                className={`p-3 rounded-xl border text-left transition ${
                  templateType === 'otp'
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-indigo-500 mb-1" />
                <span className="text-xs block font-bold">6-Digit OTP Code</span>
              </button>

              <button
                type="button"
                onClick={() => handleTemplateChange('receipt')}
                className={`p-3 rounded-xl border text-left transition ${
                  templateType === 'receipt'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-emerald-500 mb-1" />
                <span className="text-xs block font-bold">Order Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => handleTemplateChange('custom')}
                className={`p-3 rounded-xl border text-left transition ${
                  templateType === 'custom'
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4 text-blue-500 mb-1" />
                <span className="text-xs block font-bold">Custom Mail</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Sender Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Sender Email</label>
              <input
                type="text"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Message Body</label>
            <textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'Delivering...' : 'Deliver Email Now'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
