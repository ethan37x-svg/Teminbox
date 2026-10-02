import React, { useState } from 'react';
import { X, Download, Printer, ShieldAlert, ShieldCheck, Copy, Check, FileText, Code, Sparkles, AlertTriangle, Paperclip, Terminal } from 'lucide-react';
import { EmailMessage } from '../types';

interface EmailDetailModalProps {
  message: EmailMessage | null;
  onClose: () => void;
}

export const EmailDetailModal: React.FC<EmailDetailModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  const [activeTab, setActiveTab] = useState<'html' | 'text' | 'headers' | 'spam'>('html');
  const [copiedOtp, setCopiedOtp] = useState(false);

  const handleCopyOtp = () => {
    if (!message.verificationCode) return;
    navigator.clipboard.writeText(message.verificationCode);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const handleDownloadEml = () => {
    const emlContent = `From: ${message.senderName} <${message.senderEmail}>\nTo: ${message.mailboxAddress}\nSubject: ${message.subject}\nDate: ${new Date(message.receivedAt).toUTCString()}\nContent-Type: text/html; charset=utf-8\n\n${message.bodyHtml}`;
    const blob = new Blob([emlContent], { type: 'message/rfc822' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email_${message.id}.eml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${message.subject}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; color: #1e293b; }
              .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>${message.subject}</h2>
              <p><strong>From:</strong> ${message.senderName} &lt;${message.senderEmail}&gt;</p>
              <p><strong>To:</strong> ${message.mailboxAddress}</p>
              <p><strong>Date:</strong> ${new Date(message.receivedAt).toLocaleString()}</p>
            </div>
            <div>${message.bodyHtml}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-800/80">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                Received Message
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  message.spamStatus === 'Clean'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                }`}
              >
                {message.spamStatus} ({message.spamScore}%)
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
              {message.subject}
            </h2>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              <span><strong>From:</strong> {message.senderName} &lt;{message.senderEmail}&gt;</span>
              <span><strong>To:</strong> {message.mailboxAddress}</span>
              <span><strong>Date:</strong> {new Date(message.receivedAt).toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* OTP Code Callout if available */}
        {message.verificationCode && (
          <div className="bg-indigo-600 text-white px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
              <span className="text-xs sm:text-sm font-semibold">Verification Code Detected:</span>
              <code className="font-mono font-black text-lg bg-indigo-700 px-3 py-1 rounded tracking-widest">
                {message.verificationCode}
              </code>
            </div>
            <button
              onClick={handleCopyOtp}
              className="px-3.5 py-1.5 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs flex items-center gap-1.5 transition shadow"
            >
              {copiedOtp ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedOtp ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        )}

        {/* View Tabs & Action Bar */}
        <div className="px-5 py-2.5 border-b border-slate-200 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'html'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>HTML</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'text'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Plain Text</span>
            </button>

            <button
              onClick={() => setActiveTab('headers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'headers'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Headers</span>
            </button>

            <button
              onClick={() => setActiveTab('spam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'spam'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Spam Analysis</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadEml}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.EML</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200">
          
          {activeTab === 'html' && (
            <div
              className="prose dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 min-h-[250px]"
              dangerouslySetInnerHTML={{ __html: message.bodyHtml }}
            />
          )}

          {activeTab === 'text' && (
            <pre className="whitespace-pre-wrap font-mono text-xs bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto min-h-[250px]">
              {message.bodyText}
            </pre>
          )}

          {activeTab === 'headers' && (
            <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs space-y-1 overflow-x-auto min-h-[250px]">
              {Object.entries(message.headers).map(([key, value]) => (
                <div key={key}>
                  <span className="text-slate-400">{key}:</span> {value}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'spam' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Security Inspection Score</h4>
                  <p className="text-xs text-slate-500">Evaluated against SPF, DKIM, DMARC, and malware heuristics</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{message.spamScore} / 100</span>
                  <span className="block text-xs font-semibold text-slate-400">{message.spamStatus}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">SPF Verification</span>
                  <span className="text-emerald-600 dark:text-emerald-400">PASS (Verified Domain)</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">DKIM Digital Signature</span>
                  <span className="text-emerald-600 dark:text-emerald-400">PASS (Valid RSA Signature)</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">DMARC Policy</span>
                  <span className="text-emerald-600 dark:text-emerald-400">PASS (Strict Alignment)</span>
                </div>
              </div>
            </div>
          )}

          {/* Attachments Section */}
          {message.attachments.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-xs uppercase text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5" />
                <span>Attachments ({message.attachments.length})</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {message.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-xs font-medium"
                  >
                    <FileText className="w-4 h-4 text-blue-500" />
                    <div>
                      <span className="block font-semibold text-slate-800 dark:text-slate-200">{att.filename}</span>
                      <span className="text-[10px] text-slate-400">{att.sizeFormatted}</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading attachment ${att.filename} (simulated sample file)...`)}
                      className="ml-2 p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                      title="Download Attachment"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
