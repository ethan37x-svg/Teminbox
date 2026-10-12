import { blogArticles } from '../data/blogArticles';
import { faqList } from '../data/faqData';
import { BlogArticle } from '../types';

export interface StaticPageData {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogType: 'website' | 'article';
  ogImage?: string;
  article?: BlogArticle;
  htmlContent: string;
  jsonLd?: Record<string, any>;
}

const BASE_URL = 'https://tempinbox.solutions';
const DEFAULT_IMAGE = 'https://tempinbox.solutions/assets/og-preview.png';

/**
 * Parses article human-readable date string into ISO-8601 UTC timestamp for Schema.org
 */
export function parseArticleDateToIso(dateStr: string): string {
  const timestamp = Date.parse(dateStr);
  if (!isNaN(timestamp)) {
    return new Date(timestamp).toISOString();
  }
  return '2026-10-04T00:00:00.000Z';
}

/**
 * Basic markdown-to-html helper for pre-rendering article content into semantic HTML
 */
function markdownToHtml(content: string): string {
  const paragraphs = content.split('\n\n');
  return paragraphs
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';

      if (trimmed.startsWith('---')) {
        return '<hr class="my-8 border-slate-200 dark:border-slate-800" />';
      }
      if (trimmed.startsWith('### ')) {
        const text = escapeHtml(trimmed.replace(/^###\s+/, ''));
        return `<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3 pt-4 border-t border-slate-100 dark:border-slate-800">${text}</h3>`;
      }
      if (trimmed.startsWith('#### ')) {
        const text = escapeHtml(trimmed.replace(/^####\s+/, ''));
        return `<h4 class="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">${text}</h4>`;
      }
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const code = escapeHtml(lines.slice(1, lines.length - 1).join('\n'));
        return `<pre class="bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto my-4"><code>${code}</code></pre>`;
      }
      if (trimmed.startsWith('> ')) {
        const quote = formatInlineMarkdown(trimmed.replace(/^>\s+/, ''));
        return `<blockquote class="border-l-4 border-blue-600 pl-4 py-2 my-4 bg-blue-50/50 dark:bg-blue-950/40 rounded-r-xl italic text-slate-700 dark:text-slate-300">${quote}</blockquote>`;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
        const items = trimmed.split(/\n(?=[-0-9]+\.\s|- )/);
        const listItems = items
          .map((item) => {
            const clean = formatInlineMarkdown(item.replace(/^[-0-9]+\.\s*|- /, ''));
            return `<li class="leading-relaxed">${clean}</li>`;
          })
          .join('');
        return `<ul class="list-disc list-inside space-y-2 my-4 pl-2 text-slate-700 dark:text-slate-300">${listItems}</ul>`;
      }

      return `<p class="leading-relaxed text-slate-700 dark:text-slate-300">${formatInlineMarkdown(trimmed)}</p>`;
    })
    .filter(Boolean)
    .join('\n');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatInlineMarkdown(str: string): string {
  return escapeHtml(str)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">$1</code>');
}

/**
 * Universal Header shell for pre-rendered pages
 */
function renderHeaderShell(): string {
  return `
  <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-extrabold text-xl tracking-tight">
        <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        <span class="text-slate-900 dark:text-white">Temp<span class="text-blue-600 dark:text-blue-400">Inbox</span></span>
      </a>
      <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
        <a href="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Temporary Email</a>
        <a href="/guides" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Guides & Articles</a>
        <a href="/how-it-works" class="hover:text-blue-600 dark:hover:text-blue-400 transition">How It Works</a>
        <a href="/faq" class="hover:text-blue-600 dark:hover:text-blue-400 transition">FAQ</a>
        <a href="/about" class="hover:text-blue-600 dark:hover:text-blue-400 transition">About</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="/" class="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm hover:bg-blue-700 transition shadow-xs">
          Open Inbox
        </a>
      </div>
    </div>
  </header>`;
}

/**
 * Universal Footer shell for pre-rendered pages
 */
function renderFooterShell(): string {
  return `
  <footer class="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 pt-12 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Product</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/" class="hover:text-white transition">Temporary Email</a></li>
            <li><a href="/how-it-works" class="hover:text-white transition">How It Works</a></li>
            <li><a href="/guides" class="hover:text-white transition">Privacy Guides</a></li>
            <li><a href="/faq" class="hover:text-white transition">FAQ Knowledge Base</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Company & Trust</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/about" class="hover:text-white transition">About TempInbox</a></li>
            <li><a href="/contact" class="hover:text-white transition">Contact & Abuse</a></li>
            <li><a href="/disclaimer" class="hover:text-white transition">Legal Disclaimer</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Privacy & Legal</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/privacy" class="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" class="hover:text-white transition">Terms of Service</a></li>
            <li><a href="/cookies" class="hover:text-white transition">Cookie Settings</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Mission</h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            TempInbox provides free, disposable temporary email inboxes to prevent spam, eliminate trackers, and protect online privacy across the web.
          </p>
        </div>
      </div>
      <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 TempInbox.solutions. All rights reserved. Zero persistent storage.</p>
        <p>Canonical Domain: https://tempinbox.solutions</p>
      </div>
    </div>
  </footer>`;
}

/**
 * Build static page data dictionary
 */
export function getAllStaticPages(): Record<string, StaticPageData> {
  const pages: Record<string, StaticPageData> = {};

  // 1. Homepage (/)
  pages['/'] = {
    path: '/',
    title: 'TempInbox - Temporary Email Service',
    description: 'Fast, privacy-focused disposable temporary email generator with real-time inbox, multi-domain choices, and educational spam prevention guides.',
    canonicalUrl: `${BASE_URL}/`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'TempInbox.solutions',
      'url': `${BASE_URL}/`,
      'description': 'Free, privacy-first disposable temporary email generator with real-time inbox, multi-domain support, developer APIs, and educational privacy estimation.',
      'applicationCategory': 'UtilitiesApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
      },
    },
    htmlContent: `
      ${renderHeaderShell()}
      <main class="min-h-screen">
        <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
            <span>Ephemeral Disposable Mailbox</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Free Temporary Email Service
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Instantly generate short-lived, disposable email addresses to shield your real inbox from spam, tracking pixels, and commercial marketing databases.
          </p>
          <div class="p-6 bg-blue-50/50 dark:bg-slate-800/60 rounded-2xl border border-blue-100 dark:border-slate-700 max-w-md mx-auto mb-8">
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Loading your disposable temporary email address...
            </p>
          </div>
          <div class="flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <a href="/guides" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">Browse Privacy Guides →</a>
            <a href="/how-it-works" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">How It Works →</a>
            <a href="/faq" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200">Frequently Asked Questions →</a>
          </div>
        </section>

        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 dark:border-slate-800">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Latest Technical & Privacy Guides</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${blogArticles.slice(0, 6).map((art) => `
              <article class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
                <div>
                  <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">${art.category}</span>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                    <a href="/guides/${art.slug}" class="hover:text-blue-600 transition">${escapeHtml(art.title)}</a>
                  </h3>
                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">${escapeHtml(art.description)}</p>
                </div>
                <div class="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span>${art.readTime}</span>
                  <a href="/guides/${art.slug}" class="text-blue-600 font-semibold hover:underline">Read Guide →</a>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 2. Guides Index (/guides)
  pages['/guides'] = {
    path: '/guides',
    title: 'Email Privacy & Temporary Email Guides — TempInbox',
    description: 'In-depth educational guides explaining email tracking pixels, disposable aliases, spam reduction, and online privacy architectures.',
    canonicalUrl: `${BASE_URL}/guides`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Educational Research Library</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Email Privacy & Temporary Email Guides
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Comprehensive, fact-checked research guides exploring RFC email standards, tracking pixel prevention, disposable inbox architecture, and digital identity defense.
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${blogArticles.map((art) => `
            <article class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <img src="${art.imageUrl}" alt="Illustration for ${escapeHtml(art.title)}" class="w-full h-48 object-cover" />
                <div class="p-6">
                  <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span class="font-bold text-blue-600 uppercase">${art.category}</span>
                    <span>${art.readTime}</span>
                  </div>
                  <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    <a href="/guides/${art.slug}" class="hover:text-blue-600 transition">${escapeHtml(art.title)}</a>
                  </h2>
                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    ${escapeHtml(art.description)}
                  </p>
                </div>
              </div>
              <div class="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span class="text-slate-500">${art.author.split(',')[0]}</span>
                <a href="/guides/${art.slug}" class="font-bold text-blue-600 hover:underline">Read Full Guide →</a>
              </div>
            </article>
          `).join('')}
        </div>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 3. Individual Guide Pages (/guides/:slug)
  for (const article of blogArticles) {
    const slugPath = `/guides/${article.slug}`;
    const canonical = `${BASE_URL}${slugPath}`;

    // Compute related articles
    const related = blogArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

    pages[slugPath] = {
      path: slugPath,
      title: `${article.title} — TempInbox Guide`,
      description: article.description,
      canonicalUrl: canonical,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      ogType: 'article',
      ogImage: article.imageUrl || DEFAULT_IMAGE,
      article,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${canonical}#article`,
        'isPartOf': {
          '@type': 'WebPage',
          '@id': canonical,
          'url': canonical,
          'name': article.title,
        },
        'headline': article.title,
        'description': article.description,
        'image': article.imageUrl || DEFAULT_IMAGE,
        'mainEntityOfPage': canonical,
        'author': {
          '@type': 'Person',
          'name': article.author,
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'TempInbox',
          'url': `${BASE_URL}/`,
        },
        'datePublished': parseArticleDateToIso(article.date),
        'dateModified': parseArticleDateToIso(article.date),
      },
      htmlContent: `
        ${renderHeaderShell()}
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav aria-label="Breadcrumb" class="mb-6 text-xs text-slate-500">
            <ol class="flex items-center gap-2">
              <li><a href="/" class="hover:text-blue-600">Home</a></li>
              <li>/</li>
              <li><a href="/guides" class="hover:text-blue-600">Guides</a></li>
              <li>/</li>
              <li class="text-slate-800 dark:text-slate-200 font-medium truncate">${escapeHtml(article.title)}</li>
            </ol>
          </nav>

          <header class="mb-8">
            <div class="flex flex-wrap items-center gap-2 mb-3 text-xs">
              <span class="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-700 uppercase">${article.category}</span>
              <span class="text-slate-500">${article.readTime}</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
              ${escapeHtml(article.title)}
            </h1>
            <div class="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mb-6">
              <p><strong>Author:</strong> ${escapeHtml(article.author)} • <strong>Published:</strong> ${article.date}</p>
            </div>
            <div class="p-5 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 mb-6 text-sm text-slate-700 dark:text-slate-300">
              <p class="font-semibold text-slate-900 dark:text-white mb-1">Executive Summary:</p>
              <p>${escapeHtml(article.description)}</p>
            </div>
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${escapeHtml(article.title)}" class="w-full h-64 sm:h-96 object-cover rounded-2xl mb-8 border border-slate-200" />` : ''}
          </header>

          <div class="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8">
            <h2 class="font-bold text-sm text-slate-900 dark:text-white mb-2">Table of Contents</h2>
            <ul class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
              ${article.tableOfContents.map((toc) => `<li>${escapeHtml(toc)}</li>`).join('')}
            </ul>
          </div>

          <article class="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
            ${markdownToHtml(article.content)}
          </article>

          <section class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Related Technical & Privacy Guides</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              ${related.map((rel) => `
                <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <span class="text-[10px] font-bold text-blue-600 uppercase">${rel.category}</span>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-2">
                    <a href="/guides/${rel.slug}" class="hover:text-blue-600 transition">${escapeHtml(rel.title)}</a>
                  </h4>
                  <a href="/guides/${rel.slug}" class="text-xs text-blue-600 font-semibold hover:underline">Read Guide →</a>
                </div>
              `).join('')}
            </div>
          </section>
        </main>
        ${renderFooterShell()}
      `,
    };
  }

  // 4. How It Works (/how-it-works)
  pages['/how-it-works'] = {
    path: '/how-it-works',
    title: 'How It Works — TempInbox Disposable Inboxes in 3 Steps',
    description: 'Learn how TempInbox generates disposable addresses, routes inbound SMTP mail in RAM, and protects your primary mailbox from spam.',
    canonicalUrl: `${BASE_URL}/how-it-works`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Under the Hood</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            How TempInbox Works
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            A clear, step-by-step breakdown of how TempInbox generates disposable inboxes, routes inbound mail in volatile RAM, and automatically evicts data from memory.
          </p>
        </header>

        <section class="space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Step 1: On-Demand Mailbox Allocation</h2>
            <p>When you visit TempInbox, a cryptographically random mailbox identifier is assigned instantly. No registration, user accounts, passwords, phone numbers, or credit cards are ever required.</p>
          </div>
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Step 2: RFC 5321 Edge SMTP Ingestion</h2>
            <p>External senders transmit messages to our edge Mail Transfer Agents (MTAs). We parse MIME headers, SPF, DKIM, and DMARC validations in volatile Linux tmpfs partitions, delivering messages live to your browser in under 400 milliseconds.</p>
          </div>
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Step 3: Zero-Persistence RAM Eviction</h2>
            <p>Every mailbox operates on a countdown timer (from 1 hour to 7 days). When the timer reaches zero, or when you click "Delete Inbox", all messages and attachments are wiped from memory. Zero cold backups, zero disk persistence.</p>
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 5. About (/about)
  pages['/about'] = {
    path: '/about',
    title: 'About TempInbox — Ephemeral Email Architecture & Mission',
    description: 'Learn about TempInbox\'s mission to reduce unwanted email, our volatile in-memory architecture, and our focus on email privacy.',
    canonicalUrl: `${BASE_URL}/about`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>About TempInbox</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            About TempInbox
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            TempInbox is an independent, free web utility engineered to provide disposable temporary email addresses on demand.
          </p>
        </header>

        <section class="space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">1. What Is TempInbox?</h2>
            <p>TempInbox is a disposable email service that allows visitors to generate short-lived, self-destructing email inboxes instantly. The service operates entirely in the browser without requiring user accounts, passwords, phone number verifications, or credit card details.</p>
          </div>
          <div class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">2. Why the Service Exists</h2>
            <p>In the modern web ecosystem, personal email addresses have evolved into universal digital identifiers. Online services, Wi-Fi portals, software trials, and discussion boards routinely demand an email address before permitting access to basic tools or content. TempInbox provides a self-service buffer to give individuals control over when to share permanent contact information.</p>
          </div>
          <div class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">3. Volatile In-Memory Architecture</h2>
            <p>TempInbox processes inbound mail using temporary RAM partitions. No email messages are written to non-volatile disk databases or backed up to persistent storage.</p>
          </div>
          <div class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">4. Public Mailbox Boundaries</h2>
            <p>Temporary inboxes are public utilities designed for non-sensitive confirmations. They must never be used for banking, primary identity recovery, or medical accounts.</p>
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 6. FAQ (/faq)
  pages['/faq'] = {
    path: '/faq',
    title: 'Frequently Asked Questions — TempInbox Disposable Email',
    description: 'Find answers to common questions about TempInbox address lifespans, MIME attachments, security boundaries, and privacy protections.',
    canonicalUrl: `${BASE_URL}/faq`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqList.map((item) => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer,
        },
      })),
    },
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Authoritative Knowledge Base</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Frequently Asked Questions & Protocol Documentation
          </h1>
          <p class="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            In-depth technical answers regarding disposable email lifespans, zero-persistence RAM storage, attachment safety, and RFC standards.
          </p>
        </header>

        <section class="space-y-6">
          ${faqList.map((item) => `
            <article class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs">
              <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">${item.category}</span>
              <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                ${escapeHtml(item.question)}
              </h2>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                ${escapeHtml(item.answer)}
              </p>
            </article>
          `).join('')}
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 7. Terms of Service (/terms)
  pages['/terms'] = {
    path: '/terms',
    title: 'Terms of Service & Acceptable Use Policy — TempInbox',
    description: 'Terms of service, acceptable use guidelines, prohibited activities, and service boundaries for TempInbox temporary email.',
    canonicalUrl: `${BASE_URL}/terms`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Terms & Conditions</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Terms of Service
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            These Terms of Service govern your access to and use of TempInbox. By accessing or using the service, you agree to be bound by these terms.
          </p>
          <p class="text-xs text-slate-500 mt-2">Effective Date: October 6, 2026 • Canonical URL: https://tempinbox.solutions/terms</p>
        </header>

        <section class="space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">1. Description of Service</h2>
            <p>TempInbox provides free, on-demand disposable email inboxes operating exclusively as an inbound mail receiver. The service does not support outbound email sending, message forwarding, or permanent storage.</p>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">2. Acceptable Use Policy</h2>
            <p>You agree to use TempInbox solely for lawful purposes such as shielding your primary address from promotional campaigns and software QA testing. Automated scraping or weaponization for spam or phishing is strictly prohibited.</p>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">3. Prohibited Activities</h2>
            <p>Users must not utilize TempInbox addresses to register illegal services, commit fraud, bypass security mechanisms, or receive sensitive banking or healthcare communications.</p>
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 8. Privacy Policy (/privacy)
  pages['/privacy'] = {
    path: '/privacy',
    title: 'Privacy Policy & Ephemeral Data Processing — TempInbox',
    description: 'Factual privacy disclosures covering TempInbox volatile RAM architecture, infrastructure logging, and third-party advertising processing.',
    canonicalUrl: `${BASE_URL}/privacy`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Factual Data Processing Transparency</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            This Privacy Policy clearly distinguishes between data processing performed directly by TempInbox, necessary infrastructure and security logging, optional analytics, and third-party advertising processing.
          </p>
          <p class="text-xs text-slate-500 mt-2">Effective Date: October 6, 2026 • Architecture: Ephemeral Volatile In-Memory</p>
        </header>

        <section class="space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">1. Data Processing Performed by TempInbox</h2>
            <p>TempInbox operates as an on-demand, inbound-only utility. Temporary addresses and received messages reside exclusively in volatile system RAM and are purged upon session expiration. <strong>TempInbox itself does not sell personal data.</strong></p>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">2. Infrastructure & Security Logging</h2>
            <p>Standard network connection metadata (IP addresses, request URIs, and timestamps) is processed by hosting servers and CDN edge firewalls strictly for DDoS defense, rate limiting, and RFC 5321 SMTP operations.</p>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">3. Analytics Disclosures</h2>
            <p>TempInbox does not deploy proprietary first-party behavioral tracking profiles. Any optional analytics tools operate under Google Consent Mode v2 and require prior user consent.</p>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">4. Third-Party Advertising & Google AdSense</h2>
            <p>Third-party advertising providers, such as Google, may use cookies or similar technologies and process identifiers/device data in connection with ad serving, measurement, fraud prevention, and personalization where applicable and consented. Users can manage ad preferences via Google Ad Settings or CMP controls.</p>
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 9. Cookie Policy (/cookies)
  pages['/cookies'] = {
    path: '/cookies',
    title: 'Privacy & Cookie Policy — TempInbox',
    description: 'Information regarding cookie usage, advertising preferences, Consent Mode v2 default denials, and planned certified CMP integration.',
    canonicalUrl: `${BASE_URL}/cookies`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Privacy & Consent Architecture</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Cookie Policy & Consent Management
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            TempInbox operates under a privacy-first model: advertising storage and identifiers are denied by default under Google Consent Mode v2 until explicit user consent is provided.
          </p>
        </header>

        <section class="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Default-Denied Consent Mode v2</h2>
            <p>Our temporary email utility functions without persistent first-party tracking cookies. Third-party advertising technologies remain blocked by default until explicit consent.</p>
          </div>
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Planned Certified CMP Integration</h2>
            <p>Technical integration hooks for IAB Europe TCF v2.2 and Google Consent Mode v2 are staged in our codebase. The certified CMP will be activated directly through Google AdSense Privacy & Messaging.</p>
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 10. Contact (/contact)
  pages['/contact'] = {
    path: '/contact',
    title: 'Contact Support & Abuse Reporting — TempInbox',
    description: 'Get in touch with the TempInbox team for technical inquiries, vulnerability disclosures, or reporting service abuse.',
    canonicalUrl: `${BASE_URL}/contact`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Help & Communications</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Contact TempInbox
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Get in touch with the TempInbox team for technical questions, abuse reporting, or privacy inquiries.
          </p>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="font-bold text-slate-900 dark:text-white mb-1">General Support</h2>
            <p class="text-xs text-slate-500 mb-4">Technical questions & protocol inquiries.</p>
            <a href="mailto:support@tempinbox.solutions" class="text-xs font-bold text-blue-600 hover:underline">support@tempinbox.solutions</a>
          </div>
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="font-bold text-slate-900 dark:text-white mb-1">Abuse & Security</h2>
            <p class="text-xs text-slate-500 mb-4">Report spam or domain misuse.</p>
            <a href="mailto:abuse@tempinbox.solutions" class="text-xs font-bold text-blue-600 hover:underline">abuse@tempinbox.solutions</a>
          </div>
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="font-bold text-slate-900 dark:text-white mb-1">Privacy Officer</h2>
            <p class="text-xs text-slate-500 mb-4">GDPR & CCPA regulatory inquiries.</p>
            <a href="mailto:privacy@tempinbox.solutions" class="text-xs font-bold text-blue-600 hover:underline">privacy@tempinbox.solutions</a>
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 11. Disclaimer (/disclaimer)
  pages['/disclaimer'] = {
    path: '/disclaimer',
    title: 'Legal Disclaimer & Technical Boundaries — TempInbox',
    description: 'Important disclosures regarding the disposable, non-permanent nature of temporary email inboxes and absence of encryption.',
    canonicalUrl: `${BASE_URL}/disclaimer`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Website Disclaimer</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Legal Disclaimer & Usage Limits
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Please read this legal disclaimer carefully before using TempInbox. This statement details service boundaries, advertising disclosures, and ephemeral email usage warnings.
          </p>
        </header>

        <section class="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div class="p-6 bg-red-50 dark:bg-red-950/40 border-2 border-red-500/80 rounded-2xl">
            <h2 class="text-red-700 dark:text-red-400 font-extrabold text-base mb-2">CRITICAL WARNING: Do Not Use for Primary or Sensitive Accounts</h2>
            <p class="text-xs sm:text-sm">TempInbox provides strictly ephemeral, disposable inbound email addresses. Incoming messages expire and are purged from volatile RAM upon session expiration. Never use TempInbox for banking, cryptocurrency wallets, healthcare portals, or recovery anchors.</p>
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 12. Developer API Documentation (/api)
  pages['/api'] = {
    path: '/api',
    title: 'Developer API Documentation — TempInbox REST Endpoints',
    description: 'Interactive documentation for TempInbox developer APIs, mailbox generation endpoints, and ephemeral email testing.',
    canonicalUrl: `${BASE_URL}/api`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebAPI',
      'name': 'TempInbox Disposable Email REST API',
      'description': 'REST API for programmatic generation of temporary disposable mailboxes, message retrieval, and webhook automation for software QA and spam prevention.',
      'url': `${BASE_URL}/api`,
      'documentation': `${BASE_URL}/api`,
    },
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Developer Reference</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Developer API Documentation
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Integrate disposable email generation and ephemeral inbox verification directly into your CI/CD pipelines, automated testing suites, and registration workflows.
          </p>
        </header>

        <section class="space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">POST /api/v1/generate</h2>
            <p class="mb-3">Generates a fresh temporary email address with custom retention expiration in volatile RAM.</p>
            <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto"><code>curl -X POST "https://tempinbox.solutions/api/v1/generate" \\
  -H "Content-Type: application/json" \\
  -d '{"domain": "mailhub.cc", "duration": "24h"}'</code></pre>
          </div>

          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">GET /api/v1/inbox?address=:email</h2>
            <p class="mb-3">Retrieves incoming messages and verification codes received by the active ephemeral mailbox.</p>
            <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto"><code>curl -X GET "https://tempinbox.solutions/api/v1/inbox?address=test@mailhub.cc"</code></pre>
          </div>

          <div class="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">GET /api/v1/domains</h2>
            <p class="mb-3">Returns currently active inbound MX domains available for mailbox assignment.</p>
            <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto"><code>curl -X GET "https://tempinbox.solutions/api/v1/domains"</code></pre>
          </div>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 13. Audit Exposure Calculator (/audit)
  pages['/audit'] = {
    path: '/audit',
    title: 'Privacy Audit & Exposure Calculator — TempInbox',
    description: 'Interactive educational assessment tool calculating your email exposure risk and tracking footprint across the web.',
    canonicalUrl: `${BASE_URL}/audit`,
    robots: 'noindex, follow',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <span>Security Assessment</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Privacy Audit & Exposure Calculator
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Evaluate your digital privacy posture and calculate how temporary email shielding reduces your online footprint.
          </p>
        </header>
        <section class="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <p class="text-slate-700 dark:text-slate-300 mb-4 font-medium">Interactive audit assessment initializing...</p>
          <a href="/" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700">Return to Mailbox</a>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 14. Admin Telemetry (/admin)
  pages['/admin'] = {
    path: '/admin',
    title: 'System Health & Admin Telemetry — TempInbox',
    description: 'Internal system telemetry and mail node status dashboard.',
    canonicalUrl: `${BASE_URL}/admin`,
    robots: 'noindex, nofollow',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header class="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Admin Console & Telemetry
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm">Protected administrative diagnostic console.</p>
        </header>
        <section class="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <p class="text-slate-700 dark:text-slate-300 mb-4 font-medium">Administrative authentication required.</p>
          <a href="/" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700">Return to Home</a>
        </section>
      </main>
      ${renderFooterShell()}
    `,
  };

  // 15. 404 Page (/404)
  pages['/404'] = {
    path: '/404',
    title: 'Page Not Found (404) — TempInbox',
    description: 'The requested page could not be found on TempInbox. Return to our free temporary email tool or browse email privacy guides.',
    canonicalUrl: `${BASE_URL}/404`,
    robots: 'noindex, follow',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    htmlContent: `
      ${renderHeaderShell()}
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 class="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">404</h1>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Page Not Found</h2>
        <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto mb-8">
          The requested page could not be located. You can return to the free disposable temporary email generator or explore our privacy articles.
        </p>
        <div class="flex justify-center gap-4 text-xs font-semibold">
          <a href="/" class="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Open Temporary Email</a>
          <a href="/guides" class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200">Browse Guides</a>
        </div>
      </main>
      ${renderFooterShell()}
    `,
  };

  return pages;
}

/**
 * Checks if a requested path corresponds to a known route in the application
 */
export function isKnownRoute(reqPath: string): boolean {
  let cleanPath = reqPath.split('?')[0].split('#')[0].replace(/\/+$/, '');
  if (!cleanPath) cleanPath = '/';
  const allPages = getAllStaticPages();
  return Boolean(allPages[cleanPath]);
}

/**
 * Checks if a requested path is a known public, indexable route (excludes 404 and noindex utility routes)
 */
export function isKnownPublicRoute(reqPath: string): boolean {
  let cleanPath = reqPath.split('?')[0].split('#')[0].replace(/\/+$/, '');
  if (!cleanPath) cleanPath = '/';
  if (cleanPath === '/404') return false;
  const allPages = getAllStaticPages();
  const page = allPages[cleanPath];
  return Boolean(page && !page.robots.includes('noindex'));
}

/**
 * Injects SEO metadata, Open Graph tags, canonical links, robots tags, and pre-rendered semantic HTML
 * into a base index.html template string.
 */
export function injectSeoIntoHtml(templateHtml: string, reqPath: string): string {
  // Normalize path
  let cleanPath = reqPath.split('?')[0].split('#')[0].replace(/\/+$/, '');
  if (!cleanPath) cleanPath = '/';

  const allPages = getAllStaticPages();
  const page = allPages[cleanPath] || allPages['/404'] || {
    path: cleanPath,
    title: 'TempInbox - Temporary Email Service',
    description: 'Fast, privacy-focused disposable temporary email generator with real-time inbox.',
    canonicalUrl: `${BASE_URL}/`,
    robots: 'noindex, follow',
    ogType: 'website' as const,
    htmlContent: '<div class="p-8 text-center"><p>Temporary inbox session.</p></div>',
  };

  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${page.title}</title>`);

  // Replace or inject Meta Description
  if (/<meta\s+name=["']description["']/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(page.description)}" />\n</head>`);
  }

  // Replace or inject Canonical Link
  if (/<link\s+rel=["']canonical["']/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${page.canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${page.canonicalUrl}" />\n</head>`);
  }

  // Replace or inject Robots Meta
  if (/<meta\s+name=["']robots["']/i.test(html)) {
    html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${page.robots}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="robots" content="${page.robots}" />\n</head>`);
  }

  // Replace Open Graph Tags
  html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = html.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${page.canonicalUrl}" />`);
  html = html.replace(/<meta\s+property=["']og:type["'][^>]*>/i, `<meta property="og:type" content="${page.ogType}" />`);

  if (page.ogImage) {
    if (/<meta\s+property=["']og:image["']/i.test(html)) {
      html = html.replace(/<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${page.ogImage}" />`);
    } else {
      html = html.replace('</head>', `  <meta property="og:image" content="${page.ogImage}" />\n</head>`);
    }
  }

  // Replace Twitter Cards
  html = html.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);

  // Inject or update Schema.org JSON-LD
  if (page.jsonLd) {
    const jsonLdString = JSON.stringify(page.jsonLd, null, 2);
    const jsonLdTag = `<script type="application/ld+json" id="prerendered-schema-jsonld">\n${jsonLdString}\n</script>`;
    // Remove default WebApplication schema if we're replacing with an Article or FAQPage schema
    if (page.ogType === 'article' || cleanPath === '/faq') {
      html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, jsonLdTag);
    } else {
      html = html.replace('</head>', `  ${jsonLdTag}\n</head>`);
    }
  }

  // Replace <div id="root"></div> with pre-rendered semantic HTML
  if (page.htmlContent) {
    html = html.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${page.htmlContent}</div>`);
  }

  return html;
}
