import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Ensure HMR is disabled in AI Studio dev server to avoid WebSocket connection errors
process.env.DISABLE_HMR = 'true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === 'production' && process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

app.use(express.json());

// In-memory store for active mailboxes and messages
interface StoredMailbox {
  address: string;
  domain: string;
  username: string;
  createdAt: number;
  expiresAt: number;
  durationLabel: string;
  durationHours: number;
  isCustom: boolean;
}

interface StoredMessage {
  id: string;
  mailboxAddress: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  bodyHtml: string;
  bodyText: string;
  receivedAt: number;
  sizeKb: number;
  unread: boolean;
  attachments: Array<{
    id: string;
    filename: string;
    sizeBytes: number;
    sizeFormatted: string;
    mimeType: string;
    contentUrl?: string;
  }>;
  headers: Record<string, string>;
  spamScore: number;
  spamStatus: 'Clean' | 'Suspicious' | 'Spam';
  spamCategory: string;
  replyTo?: string;
  verificationCode?: string;
  isTestMessage?: boolean;
}

const mailboxes = new Map<string, StoredMailbox>();
const messages = new Map<string, StoredMessage[]>();

// Ephemeral RAM-Only Retention Cleanup Worker (runs every 60 seconds)
setInterval(() => {
  const now = Date.now();
  // Evict expired mailboxes and their stored message payloads from volatile memory
  for (const [address, box] of mailboxes.entries()) {
    if (now > box.expiresAt) {
      mailboxes.delete(address);
      messages.delete(address);
    }
  }
  // Evict any orphaned messages if mailbox no longer exists and message age > 24 hours
  for (const [address, msgList] of messages.entries()) {
    if (!mailboxes.has(address)) {
      const remaining = msgList.filter((m) => (now - m.receivedAt) < 24 * 3600 * 1000);
      if (remaining.length === 0) {
        messages.delete(address);
      } else {
        messages.set(address, remaining);
      }
    }
  }
}, 60 * 1000);

// Honest runtime counters (no fabricated baseline statistics)
const serverStartTime = Date.now();
let sessionInboxesCreated = 0;
let sessionEmailsReceived = 0;
let sessionSpamBlocked = 0;

// Lazy initialize Gemini client
function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Gemini API init failed or key missing:', err);
    return null;
  }
}

// Helper: Extract 6-digit or 4-digit verification code from email body/subject
function extractVerificationCode(text: string): string | undefined {
  const codeRegex = /\b(\d{4,8})\b/;
  const match = text.match(codeRegex);
  return match ? match[1] : undefined;
}

// Helper: Heuristic spam analyzer fallback
function calculateSpamScore(subject: string, bodyText: string): { score: number; status: 'Clean' | 'Suspicious' | 'Spam'; category: string } {
  let score = 5;
  const lower = (subject + ' ' + bodyText).toLowerCase();
  
  if (lower.includes('winner') || lower.includes('claim prize') || lower.includes('wire transfer') || lower.includes('bitcoin')) {
    score += 45;
  }
  if (lower.includes('urgent') || lower.includes('account suspended') || lower.includes('verify password immediately')) {
    score += 30;
  }
  if (lower.includes('free') || lower.includes('casino') || lower.includes('viagra') || lower.includes('click here now')) {
    score += 20;
  }

  score = Math.min(100, Math.max(0, score));
  let status: 'Clean' | 'Suspicious' | 'Spam' = 'Clean';
  let category = 'Transactional / General';

  if (score >= 70) {
    status = 'Spam';
    category = 'High Risk Phishing / Malicious';
  } else if (score >= 30) {
    status = 'Suspicious';
    category = 'Promotional / Marketing';
  }

  return { score, status, category };
}

// Google AdSense ads.txt verification
app.get('/ads.txt', (req, res) => {
  const publicPath = path.join(process.cwd(), 'public', 'ads.txt');
  if (fs.existsSync(publicPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    return res.sendFile(publicPath);
  }
  const distPath = path.join(process.cwd(), 'dist', 'ads.txt');
  if (fs.existsSync(distPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    return res.sendFile(distPath);
  }
  res.type('text/plain').send('google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\n');
});

// Search Engine Optimization: robots.txt
app.get('/robots.txt', (req, res) => {
  const publicPath = path.join(process.cwd(), 'public', 'robots.txt');
  if (fs.existsSync(publicPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    return res.sendFile(publicPath);
  }
  res.type('text/plain').send('User-agent: *\nAllow: /\n\nSitemap: https://tempinbox.solutions/sitemap.xml\n');
});

// Search Engine Optimization: sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(publicPath)) {
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    return res.sendFile(publicPath);
  }
  const distPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
  if (fs.existsSync(distPath)) {
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    return res.sendFile(distPath);
  }
  res.status(404).send('Sitemap not found');
});

// API Routes
app.get('/api/v1/domains', (req, res) => {
  res.json({
    domains: [
      { domain: 'mailhub.cc', isPopular: true, status: 'active' },
      { domain: 'quickmail.live', isPopular: true, status: 'active' },
      { domain: 'flashmail.email', isPopular: false, status: 'active' },
      { domain: 'tempinbox.org', isPopular: true, status: 'active' },
      { domain: 'swiftbox.me', isPopular: false, status: 'active' },
    ],
  });
});

app.post('/api/v1/generate', (req, res) => {
  const { domain = 'mailhub.cc', customUsername, duration = '24h' } = req.body || {};

  const durationHoursMap: Record<string, number> = {
    '1h': 1,
    '3h': 3,
    '6h': 6,
    '12h': 12,
    '24h': 24,
    '2d': 48,
    '3d': 72,
    '5d': 120,
    '7d': 168,
  };

  const hours = durationHoursMap[duration] || 24;
  let username = customUsername ? customUsername.toLowerCase().trim().replace(/[^a-z0-9._-]/g, '') : '';
  let isCustom = true;

  if (!username) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let rand = '';
    for (let i = 0; i < 7; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    username = rand;
    isCustom = false;
  }

  const address = `${username}@${domain}`;
  const now = Date.now();
  const expiresAt = now + hours * 60 * 60 * 1000;

  const mailbox: StoredMailbox = {
    address,
    domain,
    username,
    createdAt: now,
    expiresAt,
    durationLabel: duration,
    durationHours: hours,
    isCustom,
  };

  mailboxes.set(address, mailbox);
  sessionInboxesCreated++;

  res.json({
    mailbox,
    message: 'Mailbox generated successfully',
  });
});

app.get('/api/v1/inbox', (req, res) => {
  const address = (req.query.address as string) || '';
  if (!address) {
    return res.status(400).json({ error: 'Address query parameter is required' });
  }

  // Verify volatile expiration status
  if (mailboxes.has(address)) {
    const box = mailboxes.get(address)!;
    if (Date.now() > box.expiresAt) {
      mailboxes.delete(address);
      messages.delete(address);
      return res.status(410).json({
        address,
        expired: true,
        count: 0,
        messages: [],
        message: 'Mailbox has expired according to its volatile retention policy.',
      });
    }
  }

  const list = messages.get(address) || [];

  res.json({
    address,
    count: list.length,
    messages: list,
  });
});

app.get('/api/v1/message/:id', (req, res) => {
  const { id } = req.params;
  let foundMsg: StoredMessage | null = null;

  for (const list of messages.values()) {
    const match = list.find((m) => m.id === id);
    if (match) {
      foundMsg = match;
      match.unread = false; // mark as read
      break;
    }
  }

  if (!foundMsg) {
    return res.status(404).json({ error: 'Message not found' });
  }

  res.json({ message: foundMsg });
});

app.post('/api/v1/send-test', async (req, res) => {
  const {
    mailboxAddress,
    senderName = 'Discord Security',
    senderEmail = 'no-reply@discord.com',
    subject = 'Your Discord Security Verification Code',
    bodyHtml,
    bodyText,
    templateType = 'otp',
  } = req.body || {};

  if (!mailboxAddress) {
    return res.status(400).json({ error: 'mailboxAddress is required' });
  }

  const msgId = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const now = Date.now();

  let finalHtml = bodyHtml;
  let finalText = bodyText;
  let extractedCode: string | undefined;

  if (templateType === 'otp') {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    extractedCode = otpCode;
    finalHtml = finalHtml || `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
        <h2 style="color: #5865F2; margin-top: 0;">Verification Code</h2>
        <p style="font-size: 15px; color: #2d3748;">Here is your single-use security login code:</p>
        <div style="background-color: #f7fafc; border: 2px dashed #5865F2; padding: 16px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #5865F2; margin: 20px 0; border-radius: 6px;">
          ${otpCode}
        </div>
        <p style="font-size: 13px; color: #718096;">This code expires in 10 minutes. Do not share it with anyone.</p>
      </div>
    `;
    finalText = finalText || `Your verification code is: ${otpCode}. It expires in 10 minutes.`;
  } else if (templateType === 'receipt') {
    finalHtml = finalHtml || `
      <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #10b981;">Order Receipt & Confirmation</h2>
        <p style="font-size: 14px; color: #334155;">Thank you for your purchase! Your invoice summary:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr style="background-color: #f8fafc; text-align: left;">
            <th style="padding: 8px; border: 1px solid #e2e8f0;">Item</th>
            <th style="padding: 8px; border: 1px solid #e2e8f0;">Amount</th>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">Pro Developer Subscription (1 Month)</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">$19.99</td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #64748b;">Order ID: #ORD-2026-${Math.floor(1000 + Math.random() * 9000)}</p>
      </div>
    `;
    finalText = finalText || `Order Receipt #ORD-2026: Pro Developer Subscription ($19.99). Thank you for your order.`;
  } else {
    finalHtml = finalHtml || `<div style="font-family: sans-serif; padding: 15px;"><p>${bodyText || 'Test incoming email message.'}</p></div>`;
    finalText = finalText || bodyText || 'Test incoming email message.';
  }

  if (!extractedCode) {
    extractedCode = extractVerificationCode(subject + ' ' + finalText);
  }

  const { score, status, category } = calculateSpamScore(subject, finalText);

  const newMsg: StoredMessage = {
    id: msgId,
    mailboxAddress,
    senderName,
    senderEmail,
    subject,
    snippet: finalText.substring(0, 100) + '...',
    bodyHtml: finalHtml,
    bodyText: finalText,
    receivedAt: now,
    sizeKb: Number((Math.random() * 8 + 2).toFixed(1)),
    unread: true,
    attachments: [
      {
        id: `att-${Date.now()}`,
        filename: templateType === 'receipt' ? 'invoice_receipt.pdf' : 'verification_notice.pdf',
        sizeBytes: 142000,
        sizeFormatted: '142 KB',
        mimeType: 'application/pdf',
      },
    ],
    headers: {
      'Received': `from smtp.${senderEmail.split('@')[1] || 'mail.com'} ([198.51.100.42]) by edge.tempinbox.org with ESMTP`,
      'From': `${senderName} <${senderEmail}>`,
      'To': mailboxAddress,
      'Subject': subject,
      'Date': new Date().toUTCString(),
      'Message-ID': `<${msgId}@${senderEmail.split('@')[1] || 'mail.com'}>`,
      'SPF-Status': 'pass',
      'DKIM-Signature': 'v=1; a=rsa-sha256; d=verified; s=202601',
      'DMARC-Status': 'pass',
    },
    spamScore: score,
    spamStatus: status,
    spamCategory: category,
    verificationCode: extractedCode,
    replyTo: senderEmail,
    isTestMessage: true,
  };

  const list = messages.get(mailboxAddress) || [];
  list.unshift(newMsg);
  messages.set(mailboxAddress, list);

  sessionEmailsReceived++;
  if (status === 'Spam') sessionSpamBlocked++;

  res.json({
    success: true,
    message: newMsg,
  });
});

app.post('/api/v1/extend', (req, res) => {
  const { address, addHours = 24 } = req.body || {};
  if (!address || !mailboxes.has(address)) {
    return res.status(404).json({ error: 'Mailbox not found' });
  }

  const box = mailboxes.get(address)!;
  box.expiresAt += addHours * 60 * 60 * 1000;
  box.durationHours += addHours;
  box.durationLabel = `${box.durationHours}h`;

  res.json({
    success: true,
    mailbox: box,
  });
});

app.delete('/api/v1/mailbox', (req, res) => {
  const address = (req.query.address as string) || (req.body && req.body.address);
  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  mailboxes.delete(address);
  messages.delete(address);

  res.json({
    success: true,
    message: `Mailbox ${address} deleted permanently.`,
  });
});

app.get('/api/v1/stats', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
  const uptimeHours = Number((uptimeSeconds / 3600).toFixed(1));
  let totalStoredMsgs = 0;
  for (const list of messages.values()) {
    totalStoredMsgs += list.length;
  }

  res.json({
    activeInboxes: mailboxes.size,
    sessionInboxesCreated,
    totalEmailsReceived: sessionEmailsReceived,
    currentStoredMessages: totalStoredMsgs,
    spamBlockedPercent: sessionEmailsReceived > 0 
      ? Number(((sessionSpamBlocked / sessionEmailsReceived) * 100).toFixed(1)) 
      : 0,
    serverUptimeHours: uptimeHours,
  });
});

// Gemini AI Spam & Security Deep Scanner Endpoint
app.post('/api/v1/ai-spam-check', async (req, res) => {
  const { subject, bodyText, senderEmail } = req.body || {};
  const ai = getGenAIClient();

  if (!ai) {
    // Fallback if no Gemini key configured
    const { score, status, category } = calculateSpamScore(subject || '', bodyText || '');
    return res.json({
      score,
      status,
      category,
      aiAnalysis: `Heuristic Rule Scan: Message analyzed from ${senderEmail || 'unknown'}. Phishing indicator score: ${score}/100.`,
      recommendations: score > 50 ? ['Do not click external links', 'Verify sender domain signature'] : ['Message appears clean and safe.'],
    });
  }

  try {
    const prompt = `Analyze this incoming email for spam, phishing risk, and malicious intent.
Sender: ${senderEmail || 'unknown'}
Subject: ${subject || 'No subject'}
Body: ${bodyText || 'No text content'}

Respond with JSON format only:
{
  "score": number (0 to 100),
  "status": "Clean" | "Suspicious" | "Spam",
  "category": string (e.g., "Phishing", "Transactional", "Marketing", "Malware"),
  "aiAnalysis": string (brief 2-sentence summary),
  "recommendations": string[] (up to 3 advice points)
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const responseText = response.text || '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return res.json(parsed);
    }

    const { score, status, category } = calculateSpamScore(subject || '', bodyText || '');
    return res.json({
      score,
      status,
      category,
      aiAnalysis: responseText.slice(0, 250),
      recommendations: ['Verified by Gemini Security AI Engine'],
    });
  } catch (err: any) {
    console.error('Gemini AI spam scan error:', err);
    const { score, status, category } = calculateSpamScore(subject || '', bodyText || '');
    return res.json({
      score,
      status,
      category,
      aiAnalysis: 'Security scan completed using edge rule heuristic parser.',
      recommendations: ['Always verify sender headers before clicking links.'],
    });
  }
});

// Vite Middleware & Production Static Server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(__dirname, 'dist'))
      ? path.join(__dirname, 'dist')
      : (fs.existsSync(path.join(process.cwd(), 'dist')) ? path.join(process.cwd(), 'dist') : __dirname);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TempInbox server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
