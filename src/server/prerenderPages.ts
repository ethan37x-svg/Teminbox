import { blogArticles } from '../data/blogArticles';
import { faqList } from '../data/faqData';

export interface RouteSeoInfo {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogType: 'website' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, any>;
}

export const CANONICAL_DOMAIN = 'https://tempinbox.solutions';

// Registry of known public routes and their SEO configurations
export function getRouteSeo(pathname: string): RouteSeoInfo | null {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  // 1. Homepage
  if (cleanPath === '' || cleanPath === '/') {
    return {
      title: 'TempInbox - Temporary Email Service',
      description: 'Fast, privacy-focused disposable temporary email generator with real-time inbox, multi-domain choices, and educational spam prevention guides.',
      canonicalUrl: `${CANONICAL_DOMAIN}/`,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      ogType: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'TempInbox.solutions',
        'url': `${CANONICAL_DOMAIN}/`,
        'description': 'Free, privacy-first disposable temporary email generator with real-time inbox, multi-domain choices, and educational spam prevention guides.',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
      },
    };
  }

  // 2. Guides Index
  if (cleanPath === 'guides' || cleanPath === 'blog') {
    return {
      title: 'Email Privacy & Temporary Email Guides — TempInbox',
      description: 'In-depth educational guides explaining email tracking pixels, disposable aliases, spam reduction, and online privacy architectures.',
      canonicalUrl: `${CANONICAL_DOMAIN}/guides`,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      ogType: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Email Privacy & Temporary Email Guides',
        'url': `${CANONICAL_DOMAIN}/guides`,
        'description': 'In-depth educational guides explaining email tracking pixels, disposable aliases, spam reduction, and online privacy architectures.',
      },
    };
  }

  // 3. Individual Guide Articles
  if (cleanPath.startsWith('guides/') || cleanPath.startsWith('blog/')) {
    const slug = cleanPath.split('/')[1];
    const article = blogArticles.find((a) => a.slug === slug);
    if (article) {
      return {
        title: `${article.title} — TempInbox Guide`,
        description: article.description,
        canonicalUrl: `${CANONICAL_DOMAIN}/guides/${article.slug}`,
        robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        ogType: 'article',
        ogImage: article.imageUrl,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          'headline': article.title,
          'description': article.description,
          'image': article.imageUrl,
          'datePublished': article.date,
          'author': {
            '@type': 'Person',
            'name': article.author,
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'TempInbox',
            'url': `${CANONICAL_DOMAIN}/`,
          },
          'mainEntityOfPage': `${CANONICAL_DOMAIN}/guides/${article.slug}`,
        },
      };
    }
  }

  // 4. Static Informational & Trust Pages
  const staticRoutes: Record<string, { title: string; description: string; canonical: string }> = {
    'how-it-works': {
      title: 'How It Works — TempInbox Disposable Inboxes in 3 Steps',
      description: 'Learn how TempInbox generates disposable addresses, routes inbound SMTP mail in RAM, and protects your primary mailbox from spam.',
      canonical: `${CANONICAL_DOMAIN}/how-it-works`,
    },
    'about': {
      title: 'About TempInbox — Ephemeral Email Architecture & Mission',
      description: "Learn about TempInbox's mission to reduce unwanted email, our volatile in-memory architecture, and our focus on email privacy.",
      canonical: `${CANONICAL_DOMAIN}/about`,
    },
    'faq': {
      title: 'Frequently Asked Questions — TempInbox Disposable Email',
      description: 'Find answers to common questions about TempInbox address lifespans, MIME attachments, security boundaries, and privacy protections.',
      canonical: `${CANONICAL_DOMAIN}/faq`,
    },
    'terms': {
      title: 'Terms of Service & Acceptable Use Policy — TempInbox',
      description: 'Terms of service, acceptable use guidelines, prohibited activities, and service boundaries for TempInbox temporary email.',
      canonical: `${CANONICAL_DOMAIN}/terms`,
    },
    'privacy': {
      title: 'Privacy Policy & Ephemeral Data Processing — TempInbox',
      description: 'Factual, verified privacy disclosures covering TempInbox volatile in-memory storage, 24-hour expiration cycles, and zero tracking cookies.',
      canonical: `${CANONICAL_DOMAIN}/privacy`,
    },
    'cookies': {
      title: 'Privacy & Cookie Policy — TempInbox',
      description: 'Information regarding cookie usage, advertising preferences, Consent Mode v2 default denials, and certified CMP integration.',
      canonical: `${CANONICAL_DOMAIN}/cookies`,
    },
    'contact': {
      title: 'Contact Support & Abuse Reporting — TempInbox',
      description: 'Get in touch with the TempInbox team for technical inquiries, vulnerability disclosures, or reporting service abuse.',
      canonical: `${CANONICAL_DOMAIN}/contact`,
    },
    'api': {
      title: 'Developer API Documentation — TempInbox REST Endpoints',
      description: 'Interactive documentation for TempInbox developer APIs, mailbox generation endpoints, and ephemeral email testing.',
      canonical: `${CANONICAL_DOMAIN}/api`,
    },
    'disclaimer': {
      title: 'Legal Disclaimer & Technical Boundaries — TempInbox',
      description: 'Important disclosures regarding the disposable, non-permanent nature of temporary email inboxes and absence of encryption.',
      canonical: `${CANONICAL_DOMAIN}/disclaimer`,
    },
  };

  const match = staticRoutes[cleanPath];
  if (match) {
    let jsonLd: Record<string, any> | undefined;
    if (cleanPath === 'faq') {
      jsonLd = {
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
      };
    }

    return {
      title: match.title,
      description: match.description,
      canonicalUrl: match.canonical,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      ogType: 'website',
      jsonLd,
    };
  }

  // Not a known public editorial route
  return null;
}

// Generate meaningful semantic HTML for initial crawl
export function getRouteInitialContent(pathname: string): string {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  // 1. Homepage Initial Content
  if (cleanPath === '' || cleanPath === '/') {
    return `
<div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
  <header class="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 py-4 px-6">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Temp<span class="text-blue-600">Inbox</span></a>
      <nav class="flex items-center gap-6 text-sm font-semibold">
        <a href="/guides" class="text-slate-600 hover:text-blue-600">Guides</a>
        <a href="/how-it-works" class="text-slate-600 hover:text-blue-600">How It Works</a>
        <a href="/about" class="text-slate-600 hover:text-blue-600">About</a>
        <a href="/faq" class="text-slate-600 hover:text-blue-600">FAQ</a>
      </nav>
    </div>
  </header>
  <main class="max-w-7xl mx-auto px-4 py-12 space-y-12">
    <section class="text-center max-w-3xl mx-auto space-y-4">
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">Free Disposable Temporary Email</h1>
      <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
        Generate anonymous disposable temporary email addresses on demand. Protect your personal inbox from marketing spam, newsletters, and data brokers. Fast, volatile in-memory storage, and zero registration required.
      </p>
      <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-3 shadow-xs">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white">Instant Mailbox Generator</h2>
        <p class="text-sm text-slate-600 dark:text-slate-400">Loading temporary inbox session... JavaScript required for live incoming message stream.</p>
      </div>
    </section>

    <section class="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Latest Email Privacy Guides</h2>
          <p class="text-sm text-slate-500">Explore technical tutorials on disposable inboxes, email tracking, and spam reduction.</p>
        </div>
        <a href="/guides" class="text-sm font-semibold text-blue-600 hover:underline">View All Guides &rarr;</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${blogArticles.slice(0, 6).map((art) => `
        <article class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">${art.category}</span>
          <h3 class="font-bold text-base text-slate-900 dark:text-white"><a href="/guides/${art.slug}" class="hover:text-blue-600">${art.title}</a></h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">${art.description}</p>
          <a href="/guides/${art.slug}" class="text-xs font-semibold text-blue-600 inline-block">Read Research &rarr;</a>
        </article>
        `).join('')}
      </div>
    </section>
  </main>
</div>`;
  }

  // 2. Guides Index Initial Content
  if (cleanPath === 'guides' || cleanPath === 'blog') {
    return `
<div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
  <main class="max-w-7xl mx-auto px-4 py-12 space-y-8">
    <header class="text-center max-w-3xl mx-auto space-y-3">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Email Privacy & Temporary Email Guides</h1>
      <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Comprehensive, research-backed guides on disposable inboxes, email privacy fundamentals, spam defense strategies, and modern tracking mechanics.</p>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${blogArticles.map((art) => `
      <article class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
        <div>
          <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">${art.category}</span>
          <h2 class="font-bold text-base sm:text-lg text-slate-900 dark:text-white mt-1"><a href="/guides/${art.slug}" class="hover:text-blue-600">${art.title}</a></h2>
          <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">${art.description}</p>
        </div>
        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>${art.readTime}</span>
          <a href="/guides/${art.slug}" class="font-semibold text-blue-600 hover:underline">Read Research &rarr;</a>
        </div>
      </article>
      `).join('')}
    </div>
  </main>
</div>`;
  }

  // 3. Individual Guide Article Content
  if (cleanPath.startsWith('guides/') || cleanPath.startsWith('blog/')) {
    const slug = cleanPath.split('/')[1];
    const article = blogArticles.find((a) => a.slug === slug);
    if (article) {
      const cleanContentHtml = article.content
        .split('\n\n')
        .map((p) => {
          if (p.startsWith('### ')) return `<h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2">${p.replace('### ', '')}</h3>`;
          if (p.startsWith('#### ')) return `<h4 class="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">${p.replace('#### ', '')}</h4>`;
          if (p.startsWith('> ')) return `<blockquote class="border-l-4 border-blue-600 pl-4 py-2 italic text-slate-700 dark:text-slate-300 my-4">${p.replace('> ', '')}</blockquote>`;
          if (p.startsWith('- ') || p.startsWith('1. ')) return `<p class="leading-relaxed text-slate-700 dark:text-slate-300 my-2">${p}</p>`;
          return `<p class="leading-relaxed text-slate-700 dark:text-slate-300 my-3">${p}</p>`;
        })
        .join('');

      return `
<article class="max-w-4xl mx-auto px-4 py-10 space-y-6">
  <nav aria-label="Breadcrumb" class="text-xs text-slate-500 flex items-center gap-2">
    <a href="/" class="hover:underline">Home</a> &rsaquo;
    <a href="/guides" class="hover:underline">Guides</a> &rsaquo;
    <span class="text-slate-800 dark:text-slate-200 font-medium">${article.title}</span>
  </nav>
  <header class="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
    <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">${article.category}</span>
    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">${article.title}</h1>
    <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed">${article.description}</p>
    <div class="flex items-center gap-4 text-xs text-slate-500 pt-2">
      <span>By ${article.author}</span> &bull;
      <span>Published ${article.date}</span> &bull;
      <span>${article.readTime}</span>
    </div>
  </header>
  <div class="prose max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
    ${cleanContentHtml}
  </div>
  <footer class="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
    <h3 class="text-lg font-bold text-slate-900 dark:text-white">Related Technical & Privacy Guides</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${blogArticles
        .filter((a) => a.slug !== article.slug)
        .slice(0, 4)
        .map((rel) => `
        <a href="/guides/${rel.slug}" class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 block hover:border-blue-500">
          <div class="text-xs font-bold text-blue-600 uppercase mb-1">${rel.category}</div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">${rel.title}</h4>
          <p class="text-xs text-slate-500 line-clamp-2 mt-1">${rel.description}</p>
        </a>
        `).join('')}
    </div>
  </footer>
</article>`;
    }
  }

  // 4. How It Works
  if (cleanPath === 'how-it-works') {
    return `
<article class="max-w-4xl mx-auto px-4 py-10 space-y-8">
  <header class="border-b border-slate-200 pb-6 space-y-2">
    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">How TempInbox Works</h1>
    <p class="text-base text-slate-600">A clear, step-by-step breakdown of how TempInbox generates disposable inboxes, routes inbound mail, and automatically evicts data from memory.</p>
  </header>
  <div class="space-y-6 text-sm text-slate-700 leading-relaxed">
    <section class="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
      <h2 class="text-lg font-bold text-slate-900">Step 1: Generate an Address on Demand</h2>
      <p>When you visit TempInbox, a cryptographically random address is created instantly in volatile memory. Alternatively, select custom prefixes and routing domains with lifespans from 1 hour to 7 days.</p>
    </section>
    <section class="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
      <h2 class="text-lg font-bold text-slate-900">Step 2: Use It Where You Don't Want to Expose Your Real Email</h2>
      <p>Paste the temporary address into online signups, Wi-Fi gates, or developer pipelines to isolate marketing campaigns from your permanent personal mailbox.</p>
    </section>
    <section class="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
      <h2 class="text-lg font-bold text-slate-900">Step 3: Receive Messages in Real Time & Auto-Purge</h2>
      <p>Inbound emails are processed in volatile system RAM. When the configured countdown expires, an automated memory cleaner running every 60 seconds permanently evicts the mailbox and stored messages.</p>
    </section>
  </div>
</article>`;
  }

  // 5. About
  if (cleanPath === 'about') {
    return `
<article class="max-w-4xl mx-auto px-4 py-10 space-y-8">
  <header class="border-b border-slate-200 pb-6 space-y-2">
    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">About TempInbox</h1>
    <p class="text-base text-slate-600">TempInbox is an independent, free web utility engineered to provide disposable temporary email addresses on demand.</p>
  </header>
  <div class="space-y-6 text-sm text-slate-700 leading-relaxed">
    <section class="space-y-2">
      <h2 class="text-xl font-bold text-slate-900">What Is TempInbox?</h2>
      <p>TempInbox allows visitors to create short-lived, self-destructing email inboxes instantly without registration, passwords, or personal identity checks.</p>
    </section>
    <section class="space-y-2">
      <h2 class="text-xl font-bold text-slate-900">Why the Service Exists</h2>
      <p>To reduce unwanted spam, minimize cross-site email tracking, and give users control over when to disclose their permanent contact information.</p>
    </section>
    <section class="space-y-2">
      <h2 class="text-xl font-bold text-slate-900">Volatile In-Memory Architecture</h2>
      <p>All message data is held exclusively in volatile RAM and is never written to cold database archives. Outbound SMTP relaying is disabled to eliminate spam misuse.</p>
    </section>
  </div>
</article>`;
  }

  // 6. FAQ
  if (cleanPath === 'faq') {
    return `
<article class="max-w-4xl mx-auto px-4 py-10 space-y-8">
  <header class="border-b border-slate-200 pb-6 space-y-2 text-center">
    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
    <p class="text-base text-slate-600">Factual answers regarding disposable inboxes, MIME attachments, RFC protocol standards, and data retention.</p>
  </header>
  <div class="space-y-4">
    ${faqList.map((item) => `
    <div class="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
      <h2 class="text-base font-bold text-slate-900">${item.question}</h2>
      <p class="text-sm text-slate-600 leading-relaxed">${item.answer}</p>
    </div>
    `).join('')}
  </div>
</article>`;
  }

  // 7. Terms
  if (cleanPath === 'terms') {
    return `
<article class="max-w-4xl mx-auto px-4 py-10 space-y-8">
  <header class="border-b border-slate-200 pb-6 space-y-2">
    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Terms of Service & Acceptable Use Policy</h1>
    <p class="text-sm text-slate-600">Governing service terms and acceptable use guidelines for TempInbox.</p>
  </header>
  <div class="space-y-6 text-sm text-slate-700 leading-relaxed">
    <section class="space-y-2">
      <h2 class="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
      <p>By accessing TempInbox (https://tempinbox.solutions), you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
    </section>
    <section class="space-y-2">
      <h2 class="text-lg font-bold text-slate-900">2. Prohibited Activities</h2>
      <p>You may not use TempInbox for unlawful spam transmission, abusive automation, phishing, malware hosting, or illegal transactions. Outbound SMTP is disabled by design.</p>
    </section>
    <section class="space-y-2">
      <h2 class="text-lg font-bold text-slate-900">3. Ephemeral Nature & Disclaimer of Storage</h2>
      <p>Mailboxes are self-destructing. We provide no guarantee of message preservation or recovery. Never link temporary addresses to permanent financial, medical, or legal accounts.</p>
    </section>
  </div>
</article>`;
  }

  // 8. Privacy
  if (cleanPath === 'privacy') {
    return `
<article class="max-w-4xl mx-auto px-4 py-10 space-y-8">
  <header class="border-b border-slate-200 pb-6 space-y-2">
    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy & Data Processing</h1>
    <p class="text-sm text-slate-600">Factual, verified privacy disclosures covering volatile in-memory storage and zero tracking cookies.</p>
  </header>
  <div class="space-y-6 text-sm text-slate-700 leading-relaxed">
    <section class="space-y-2">
      <h2 class="text-lg font-bold text-slate-900">1. Zero Registration & Ephemeral Data Processing</h2>
      <p>TempInbox requires no user registration, email, phone number, or credentials. Incoming emails are processed in volatile system RAM and evicted when the mailbox TTL expires.</p>
    </section>
    <section class="space-y-2">
      <h2 class="text-lg font-bold text-slate-900">2. Retention Schedule</h2>
      <p>Mailboxes expire within 1 hour to 7 days (default: 24 hours). An automated server-side cleanup task running every 60 seconds purges expired mailboxes permanently from RAM.</p>
    </section>
    <section class="space-y-2">
      <h2 class="text-lg font-bold text-slate-900">3. Cookies & Tracking Controls</h2>
      <p>Default Google Consent Mode v2 enforces denied state for advertising cookies. Non-essential tracking cookies are blocked until explicit consent via a certified CMP.</p>
    </section>
  </div>
</article>`;
  }

  // 9. Contact
  if (cleanPath === 'contact') {
    return `
<article class="max-w-4xl mx-auto px-4 py-10 space-y-8">
  <header class="border-b border-slate-200 pb-6 space-y-2">
    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Contact TempInbox</h1>
    <p class="text-sm text-slate-600">Get in touch with the TempInbox team for technical inquiries, abuse reporting, or privacy questions.</p>
  </header>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
    <div class="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
      <h2 class="font-bold text-slate-900">General Support</h2>
      <p class="text-xs text-slate-600">For questions regarding disposable inboxes, APIs, or RFC standards.</p>
      <a href="mailto:support@tempinbox.solutions" class="text-blue-600 font-bold block text-xs">support@tempinbox.solutions</a>
    </div>
    <div class="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
      <h2 class="font-bold text-slate-900">Abuse Desk</h2>
      <p class="text-xs text-slate-600">To report service abuse, automated scraping, or unlawful activity.</p>
      <a href="mailto:abuse@tempinbox.solutions" class="text-rose-600 font-bold block text-xs">abuse@tempinbox.solutions</a>
    </div>
    <div class="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
      <h2 class="font-bold text-slate-900">Privacy Desk</h2>
      <p class="text-xs text-slate-600">For data processing, ephemeral retention, or cookie settings inquiries.</p>
      <a href="mailto:privacy@tempinbox.solutions" class="text-indigo-600 font-bold block text-xs">privacy@tempinbox.solutions</a>
    </div>
  </div>
</article>`;
  }

  // Default empty content if not matched
  return '';
}

// Inject SEO metadata, canonical, Open Graph, and pre-rendered HTML into an index.html template
export function injectSeoAndContent(templateHtml: string, pathname: string): string {
  const seo = getRouteSeo(pathname);
  if (!seo) {
    return templateHtml;
  }

  let html = templateHtml;

  // 1. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

  // 2. Replace meta description
  html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${seo.description}" />`);

  // 3. Replace canonical URL
  html = html.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, `<link rel="canonical" href="${seo.canonicalUrl}" />`);

  // 4. Replace or inject robots meta tag
  if (html.includes('<meta name="robots"')) {
    html = html.replace(/<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="robots" content="${seo.robots}" />`);
  } else {
    html = html.replace('</head>', `    <meta name="robots" content="${seo.robots}" />\n  </head>`);
  }

  // 5. Replace Open Graph tags
  html = html.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:title" content="${seo.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:description" content="${seo.description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:url" content="${seo.canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:type" content="${seo.ogType}" />`);

  // 6. Replace Twitter Card tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:title" content="${seo.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:description" content="${seo.description}" />`);

  // 7. Inject JSON-LD Schema if present
  if (seo.jsonLd) {
    const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(seo.jsonLd, null, 2)}\n</script>`;
    html = html.replace('</head>', `    ${jsonLdTag}\n  </head>`);
  }

  // 8. Inject meaningful pre-rendered HTML content into <div id="root">
  const content = getRouteInitialContent(pathname);
  if (content) {
    html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  }

  return html;
}
