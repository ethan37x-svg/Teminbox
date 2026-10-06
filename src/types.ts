export type MailboxDuration = '1h' | '3h' | '6h' | '12h' | '24h' | '2d' | '3d' | '5d' | '7d';

export type NavigationTab = 
  | 'inbox' 
  | 'blog' 
  | 'how-it-works' 
  | 'api' 
  | 'faq' 
  | 'admin' 
  | 'terms' 
  | 'privacy' 
  | 'about' 
  | 'contact' 
  | 'disclaimer' 
  | 'cookies' 
  | 'audit' 
  | '404';

export interface Mailbox {
  address: string;
  domain: string;
  username: string;
  createdAt: number; // timestamp
  expiresAt: number; // timestamp
  durationLabel: string;
  isCustom: boolean;
}

export interface EmailAttachment {
  id: string;
  filename: string;
  sizeBytes: number;
  sizeFormatted: string;
  mimeType: string;
  contentUrl?: string;
}

export interface EmailMessage {
  id: string;
  mailboxAddress: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  bodyHtml: string;
  bodyText: string;
  receivedAt: number; // timestamp
  sizeKb: number;
  unread: boolean;
  attachments: EmailAttachment[];
  headers: Record<string, string>;
  spamScore: number; // 0 - 100
  spamStatus: 'Clean' | 'Suspicious' | 'Spam';
  spamCategory: string;
  replyTo?: string;
  verificationCode?: string; // Extracted OTP code if detected
  isTestMessage?: boolean; // Flag distinguishing demo/test simulation from real incoming emails
}

export interface DomainOption {
  domain: string;
  isPopular?: boolean;
  status: 'active' | 'maintenance';
  description: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  category: 'Privacy' | 'Tutorials' | 'Security' | 'Comparisons' | 'Productivity';
  author: string;
  readTime: string;
  date: string;
  tags: string[];
  tableOfContents: string[];
}

export type SupportedLanguage = 'en' | 'fr' | 'de' | 'es' | 'it' | 'pt' | 'nl';

export interface TranslationDictionary {
  title: string;
  subtitle: string;
  generateRandom: string;
  createCustom: string;
  mailboxExpiresIn: string;
  copyAddress: string;
  addressCopied: string;
  refresh: string;
  deleteMailbox: string;
  extendTime: string;
  qrCode: string;
  sendTestMail: string;
  searchPlaceholder: string;
  noEmailsYet: string;
  waitingForMail: string;
  sender: string;
  subject: string;
  received: string;
  size: string;
  attachments: string;
  viewHtml: string;
  viewText: string;
  viewHeaders: string;
  spamAnalysis: string;
  downloadEml: string;
  printMail: string;
  faqTitle: string;
  blogTitle: string;
  apiDocsTitle: string;
}

export interface SystemStats {
  activeInboxes: number;
  totalEmailsReceived: number;
  spamBlockedPercent: number;
  avgDeliveryTimeMs: number;
  storageUsedMb: number;
  serverUptimeHours: number;
}
