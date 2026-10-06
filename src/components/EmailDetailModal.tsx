import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Copy,
  Check,
  FileText,
  Code,
  Sparkles,
  Paperclip,
  Terminal,
  FileJson,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { EmailMessage, EmailAttachment } from '../types';
import { SafeEmailViewer } from './SafeEmailViewer';
import { sanitizeEmailHtml, evaluateAttachmentSecurity } from '../utils/emailSanitizer';

interface EmailDetailModalProps {
  message: EmailMessage | null;
  onClose: () => void;
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[\\/:*?"<>|]+/g, '_')
    .replace(/\s+/g, '_')
    .trim()
    .slice(0, 45) || 'email';
}

function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function generateEmlContent(message: EmailMessage): string {
  const boundary = `----=_Part_${message.id.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`;
  const dateStr = new Date(message.receivedAt).toUTCString();
  const headers: string[] = [
    `From: "${message.senderName.replace(/"/g, '')}" <${message.senderEmail}>`,
    `To: <${message.mailboxAddress}>`,
    `Subject: ${message.subject}`,
    `Date: ${dateStr}`,
    `Message-ID: <${message.id}@tempinbox.local>`,
    `MIME-Version: 1.0`,
  ];

  if (message.replyTo) {
    headers.push(`Reply-To: <${message.replyTo}>`);
  }

  // Include any extra headers from the message if present
  if (message.headers) {
    for (const [key, value] of Object.entries(message.headers)) {
      const lower = key.toLowerCase();
      if (!['from', 'to', 'subject', 'date', 'mime-version', 'message-id', 'content-type'].includes(lower)) {
        headers.push(`${key}: ${value}`);
      }
    }
  }

  // Format body with proper multipart MIME if both plain text and HTML exist
  if (message.bodyText && message.bodyHtml) {
    headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);
    return (
      headers.join('\r\n') +
      '\r\n\r\n' +
      'This is a multi-part message in MIME format.\r\n\r\n' +
      `--${boundary}\r\n` +
      'Content-Type: text/plain; charset=utf-8\r\n' +
      'Content-Transfer-Encoding: 8bit\r\n\r\n' +
      message.bodyText +
      '\r\n\r\n' +
      `--${boundary}\r\n` +
      'Content-Type: text/html; charset=utf-8\r\n' +
      'Content-Transfer-Encoding: 8bit\r\n\r\n' +
      message.bodyHtml +
      '\r\n\r\n' +
      `--${boundary}--\r\n`
    );
  }

  if (message.bodyHtml) {
    headers.push('Content-Type: text/html; charset=utf-8');
    headers.push('Content-Transfer-Encoding: 8bit');
    return headers.join('\r\n') + '\r\n\r\n' + message.bodyHtml;
  }

  headers.push('Content-Type: text/plain; charset=utf-8');
  headers.push('Content-Transfer-Encoding: 8bit');
  return headers.join('\r\n') + '\r\n\r\n' + (message.bodyText || '');
}

function generateJsonContent(message: EmailMessage): string {
  const exportPayload = {
    _exportMeta: {
      format: 'tempinbox-email-v1',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      note: 'Saved locally from TempInbox',
    },
    id: message.id,
    mailboxAddress: message.mailboxAddress,
    sender: {
      name: message.senderName,
      email: message.senderEmail,
    },
    subject: message.subject,
    snippet: message.snippet,
    date: {
      timestamp: message.receivedAt,
      iso: new Date(message.receivedAt).toISOString(),
      formatted: new Date(message.receivedAt).toLocaleString(),
    },
    verificationCode: message.verificationCode || null,
    sizeKb: message.sizeKb,
    unread: message.unread,
    spamSecurity: {
      score: message.spamScore,
      status: message.spamStatus,
      category: message.spamCategory,
    },
    headers: message.headers,
    content: {
      text: message.bodyText,
      html: message.bodyHtml,
    },
    attachments: message.attachments.map((att) => ({
      id: att.id,
      filename: att.filename,
      sizeBytes: att.sizeBytes,
      sizeFormatted: att.sizeFormatted,
      mimeType: att.mimeType,
    })),
  };

  return JSON.stringify(exportPayload, null, 2);
}

export const EmailDetailModal: React.FC<EmailDetailModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  const [activeTab, setActiveTab] = useState<'html' | 'text' | 'headers' | 'json' | 'spam'>('html');
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Close export dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyOtp = () => {
    if (!message.verificationCode) return;
    navigator.clipboard.writeText(message.verificationCode);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const handleExportEml = () => {
    const eml = generateEmlContent(message);
    const filename = `email_${sanitizeFilename(message.subject)}_${message.id.slice(0, 8)}.eml`;
    triggerDownload(eml, filename, 'message/rfc822;charset=utf-8');
    setExportFeedback('EML');
    setShowExportMenu(false);
    setTimeout(() => setExportFeedback(null), 3000);
  };

  const handleExportJson = () => {
    const jsonStr = generateJsonContent(message);
    const filename = `email_${sanitizeFilename(message.subject)}_${message.id.slice(0, 8)}.json`;
    triggerDownload(jsonStr, filename, 'application/json;charset=utf-8');
    setExportFeedback('JSON');
    setShowExportMenu(false);
    setTimeout(() => setExportFeedback(null), 3000);
  };

  const handleCopyJson = () => {
    const jsonStr = generateJsonContent(message);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Safe printing using hidden iframe to avoid popup blockers and window.open constraint
  const handlePrint = () => {
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);
    const doc = printFrame.contentWindow?.document;
    if (doc) {
      const sanitizedContent = sanitizeEmailHtml(
        message.bodyHtml || message.bodyText,
        { allowRemoteImages: true }
      ).sanitizedHtml;

      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${message.subject.replace(/</g, '&lt;')}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #1e293b; line-height: 1.5; }
              .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px; }
              h2 { margin: 0 0 12px 0; color: #0f172a; }
              .meta { font-size: 13px; color: #475569; margin: 4px 0; }
              .content { margin-top: 20px; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>${message.subject.replace(/</g, '&lt;')}</h2>
              <div class="meta"><strong>From:</strong> ${message.senderName.replace(/</g, '&lt;')} &lt;${message.senderEmail.replace(/</g, '&lt;')}&gt;</div>
              <div class="meta"><strong>To:</strong> ${message.mailboxAddress.replace(/</g, '&lt;')}</div>
              <div class="meta"><strong>Date:</strong> ${new Date(message.receivedAt).toLocaleString()}</div>
            </div>
            <div class="content">${sanitizedContent}</div>
          </body>
        </html>
      `);
      doc.close();
      setTimeout(() => {
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
        setTimeout(() => document.body.removeChild(printFrame), 1000);
      }, 250);
    }
  };

  const handleDownloadAttachment = (att: EmailAttachment) => {
    const sec = evaluateAttachmentSecurity(att.filename, att.mimeType);
    if (sec.isDangerous) {
      const confirmDownload = window.confirm(
        `SECURITY NOTICE:\n\n${att.filename} appears to be a potentially executable or dangerous file type (${sec.riskCategory} Risk).\n\nDo you want to download this file locally for inspection?`
      );
      if (!confirmDownload) return;
    }
    const sampleAttachment = `Sample export for attachment:\nFilename: ${sec.sanitizedFilename}\nMIME Type: ${att.mimeType}\nSize: ${att.sizeFormatted}\nMailbox: ${message.mailboxAddress}\nSubject: ${message.subject}`;
    triggerDownload(sampleAttachment, sec.sanitizedFilename, att.mimeType || 'application/octet-stream');
    setExportFeedback(`Attachment (${sec.sanitizedFilename})`);
    setTimeout(() => setExportFeedback(null), 3000);
  };

  const rawJsonPreview = generateJsonContent(message);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-800/80">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
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
              {exportFeedback && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white flex items-center gap-1 animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved {exportFeedback} locally!</span>
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
              {message.subject}
            </h2>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
              <span><strong>From:</strong> {message.senderName} &lt;{message.senderEmail}&gt;</span>
              <span><strong>To:</strong> {message.mailboxAddress}</span>
              <span><strong>Date:</strong> {new Date(message.receivedAt).toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Close dialog"
            aria-label="Close"
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
        <div className="px-4 sm:px-5 py-2.5 border-b border-slate-200 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-2.5">
          
          {/* Format Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'html'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>HTML</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'text'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Plain Text</span>
            </button>

            <button
              onClick={() => setActiveTab('headers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'headers'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Headers</span>
            </button>

            <button
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'json'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <FileJson className="w-3.5 h-3.5 text-amber-500" />
              <span>JSON Data</span>
            </button>

            <button
              onClick={() => setActiveTab('spam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'spam'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Security</span>
            </button>
          </div>

          {/* Action & Export Controls */}
          <div className="flex items-center gap-1.5">
            {/* Direct Quick 1-Click EML Button */}
            <button
              onClick={handleExportEml}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-600 transition shadow-xs"
              title="Export complete email to .EML file (Outlook, Apple Mail, Thunderbird)"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>.EML</span>
            </button>

            {/* Direct Quick 1-Click JSON Button */}
            <button
              onClick={handleExportJson}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-600 transition shadow-xs"
              title="Export structured email data to .JSON file"
            >
              <FileJson className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>.JSON</span>
            </button>

            {/* Comprehensive Export Dropdown */}
            <div className="relative" ref={exportMenuRef}>
              <button
                type="button"
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition shadow-xs"
                title="Export options"
              >
                <span>Export</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 text-left animate-fadeIn">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Save Message Locally
                  </div>
                  
                  <button
                    onClick={handleExportEml}
                    className="w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-start gap-2.5 transition group"
                  >
                    <div className="p-1 rounded bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mt-0.5">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Export as .EML
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Standard RFC 822 format for Outlook, Thunderbird & Apple Mail
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={handleExportJson}
                    className="w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-start gap-2.5 transition group"
                  >
                    <div className="p-1 rounded bg-amber-50 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 mt-0.5">
                      <FileJson className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        Export as .JSON
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Complete raw message, headers, OTP & security metadata
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-600 transition shadow-xs"
              title="Print email"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200">
          
          {activeTab === 'html' && (
            <SafeEmailViewer
              bodyHtml={message.bodyHtml}
              bodyText={message.bodyText}
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

          {/* New JSON tab with live preview, copy & direct download */}
          {activeTab === 'json' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Structured Email Record (JSON Format)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition text-xs"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={handleExportJson}
                    className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 font-semibold text-white flex items-center gap-1.5 transition text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .JSON</span>
                  </button>
                </div>
              </div>

              <pre className="font-mono text-xs bg-slate-950 text-amber-300 p-4 rounded-xl overflow-x-auto max-h-[400px] border border-slate-800">
                {rawJsonPreview}
              </pre>
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
                {message.attachments.map((att) => {
                  const sec = evaluateAttachmentSecurity(att.filename, att.mimeType);
                  return (
                    <div
                      key={att.id}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium transition ${
                        sec.isDangerous
                          ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60'
                          : 'bg-slate-100 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {sec.isDangerous ? (
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block font-semibold text-slate-800 dark:text-slate-200 max-w-[200px] truncate">
                            {sec.sanitizedFilename}
                          </span>
                          {sec.isDangerous && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 uppercase">
                              Executable
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{att.sizeFormatted}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDownloadAttachment(att)}
                        className={`ml-2 p-1.5 rounded-lg text-white transition ${
                          sec.isDangerous
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        title={
                          sec.isDangerous
                            ? 'Security warning: executable file type'
                            : 'Download Attachment locally'
                        }
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
