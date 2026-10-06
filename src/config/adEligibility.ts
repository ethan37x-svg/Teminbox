/**
 * Google AdSense Route Eligibility & Page Separation Configuration
 *
 * STRICT GOOGLE ADSENSE COMPLIANCE RULES:
 * 1. TOOL PAGES (temporary email generator, live inbox, received messages, message viewer modal/routes):
 *    - MUST NEVER display Google AdSense ads.
 *    - No ad code, scripts, or placeholders may ever be loaded or injected on these pages.
 * 2. EDITORIAL PAGES (/guides, /guides/:slug, /about, /faq, /terms, /privacy, /disclaimer):
 *    - Substantial original informational/educational text content.
 *    - Eligible for future AdSense contextual ad units.
 */

export type PageCategory = 'tool' | 'editorial' | 'utility';

export interface RouteMeta {
  routeId: string;
  path: string;
  category: PageCategory;
  name: string;
  description: string;
  isAdEligible: boolean;
}

/**
 * Registry of all application routes and their AdSense eligibility status.
 */
export const ROUTE_REGISTRY: Record<string, RouteMeta> = {
  // ==========================================
  // TOOL PAGES — STRICTLY NON-AD ELIGIBLE
  // ==========================================
  inbox: {
    routeId: 'inbox',
    path: '/',
    category: 'tool',
    name: 'Temporary Email Generator & Live Inbox',
    description: 'Dynamic utility containing address generator, active mailbox controls, and incoming email feed.',
    isAdEligible: false,
  },
  'tool-generator': {
    routeId: 'tool-generator',
    path: '/generator',
    category: 'tool',
    name: 'Address Generator Tool',
    description: 'Address generation, custom prefix, domain selection, and lifetime controls.',
    isAdEligible: false,
  },
  'tool-messages': {
    routeId: 'tool-messages',
    path: '/messages',
    category: 'tool',
    name: 'Received Email List',
    description: 'Incoming email message feed and unread notifications.',
    isAdEligible: false,
  },
  'tool-message-detail': {
    routeId: 'tool-message-detail',
    path: '/messages/:id',
    category: 'tool',
    name: 'Received Message Viewer',
    description: 'Individual email message body, headers, raw payload, and attachments.',
    isAdEligible: false,
  },
  audit: {
    routeId: 'audit',
    path: '/audit',
    category: 'tool',
    name: 'Privacy Audit & Exposure Calculator',
    description: 'Interactive educational calculation tool for email exposure estimation.',
    isAdEligible: false,
  },
  admin: {
    routeId: 'admin',
    path: '/admin',
    category: 'utility',
    name: 'System Metrics & Health',
    description: 'Internal server operational telemetry and status dashboard.',
    isAdEligible: false,
  },

  // ==========================================
  // EDITORIAL PAGES — ELIGIBLE FOR ADSENSE
  // ==========================================
  guides: {
    routeId: 'guides',
    path: '/guides',
    category: 'editorial',
    name: 'Privacy & Cybersecurity Guides Directory',
    description: 'Comprehensive directory of long-form guides, tutorials, and protocol analyses.',
    isAdEligible: true,
  },
  'guides-detail': {
    routeId: 'guides-detail',
    path: '/guides/:slug',
    category: 'editorial',
    name: 'Technical Guide Article',
    description: 'Individual deep-dive technical articles explaining email protocols and online privacy.',
    isAdEligible: true,
  },
  blog: {
    routeId: 'blog',
    path: '/blog',
    category: 'editorial',
    name: 'Knowledge Base & Research (Guides Alias)',
    description: 'Alias route for /guides research directory.',
    isAdEligible: true,
  },
  about: {
    routeId: 'about',
    path: '/about',
    category: 'editorial',
    name: 'About TempInbox & Infrastructure',
    description: 'Original overview of service mission, inbound SMTP architecture, and publishing standards.',
    isAdEligible: true,
  },
  faq: {
    routeId: 'faq',
    path: '/faq',
    category: 'editorial',
    name: 'Frequently Asked Questions (FAQ)',
    description: 'Educational answers to common questions about disposable email and privacy.',
    isAdEligible: true,
  },
  terms: {
    routeId: 'terms',
    path: '/terms',
    category: 'editorial',
    name: 'Terms of Service',
    description: 'Terms of service, acceptable usage policies, and service scope documentation.',
    isAdEligible: true,
  },
  privacy: {
    routeId: 'privacy',
    path: '/privacy',
    category: 'editorial',
    name: 'Privacy Policy',
    description: 'Detailed privacy policy, ephemeral data retention, and Google partner disclosures.',
    isAdEligible: false,
  },
  disclaimer: {
    routeId: 'disclaimer',
    path: '/disclaimer',
    category: 'editorial',
    name: 'Service Disclaimer',
    description: 'Legal boundaries and limitations of temporary disposable mailboxes.',
    isAdEligible: true,
  },
  cookies: {
    routeId: 'cookies',
    path: '/cookies',
    category: 'editorial',
    name: 'Cookie Policy & Consent Settings',
    description: 'Information regarding cookie usage, advertising preferences, and TCF v2.2 controls.',
    isAdEligible: false,
  },
  api: {
    routeId: 'api',
    path: '/api',
    category: 'editorial',
    name: 'Developer API Documentation',
    description: 'Technical developer guides and REST API endpoint documentation.',
    isAdEligible: true,
  },
  contact: {
    routeId: 'contact',
    path: '/contact',
    category: 'editorial',
    name: 'Contact & Support',
    description: 'Technical support desk and abuse reporting guidelines.',
    isAdEligible: false,
  },
  'how-it-works': {
    routeId: 'how-it-works',
    path: '/how-it-works',
    category: 'editorial',
    name: 'How TempInbox Works',
    description: 'Step-by-step technical guide explaining disposable email architecture, inbound SMTP, and ephemeral retention.',
    isAdEligible: true,
  },
};

/**
 * Normalizes any route string, path, or tab identifier to a standard path.
 */
function normalizeRoute(route: string): string {
  if (!route) return '/';
  let clean = route.trim().toLowerCase();

  // Strip query params and hashes if present
  if (clean.includes('?')) clean = clean.split('?')[0];
  if (clean.includes('#')) clean = clean.split('#')[0];

  // Strip leading/trailing slashes for uniform comparison
  clean = clean.replace(/^\/+/, '').replace(/\/+$/, '');

  return clean;
}

/**
 * Checks whether a given route or path is an interactive tool or private communication page.
 * Tool pages must NEVER display AdSense ads.
 *
 * @param route Route identifier (e.g. 'inbox', 'audit') or URL path (e.g. '/', '/messages/123')
 * @returns true if the route is a tool page, false otherwise
 */
export function isToolPage(route: string): boolean {
  const norm = normalizeRoute(route);

  // Exact matches for root or tool tabs
  if (norm === '' || norm === 'inbox' || norm === 'generator' || norm === 'audit' || norm === 'admin') {
    return true;
  }

  // Path matches for message / email viewing routes
  if (
    norm.startsWith('message') ||
    norm.startsWith('messages') ||
    norm.startsWith('email') ||
    norm.startsWith('emails') ||
    norm.startsWith('inbox') ||
    norm.startsWith('mailbox') ||
    norm.startsWith('test-email')
  ) {
    return true;
  }

  return false;
}

/**
 * Core validation function for Google AdSense compliance:
 * Determines if a given route or page is strictly ELIGIBLE for advertising.
 *
 * GUARANTEES:
 * - Returns FALSE for all inbox, generator, received message lists, and email detail views.
 * - Returns FALSE for any route where an email message or tool is the primary content.
 * - Returns TRUE only for editorial and informational content pages (/guides, /guides/:slug, /about, /faq, /terms, etc.).
 *
 * @param route Route identifier, tab name, or URL path
 * @returns boolean indicating whether AdSense ads may be served on this page
 */
export function isAdEligiblePage(route: string): boolean {
  // If it is a tool page, received message view, or generator, NEVER allow ads
  if (isToolPage(route)) {
    return false;
  }

  const norm = normalizeRoute(route);

  // Check editorial routes eligible for future contextual ads (Privacy Policy excluded during consent flow)
  if (
    norm === 'guides' ||
    norm.startsWith('guides/') ||
    norm === 'blog' ||
    norm.startsWith('blog/') ||
    norm === 'how-it-works' ||
    norm === 'about' ||
    norm === 'faq' ||
    norm === 'terms' ||
    norm === 'disclaimer' ||
    norm === 'cookies' ||
    norm === 'api'
  ) {
    return true;
  }

  // Any unrecognized or dynamic route defaults to safe FALSE (never display ads)
  return false;
}

/**
 * Helper to inspect the category of a route.
 */
export function getPageCategory(route: string): PageCategory {
  if (isToolPage(route)) return 'tool';
  if (isAdEligiblePage(route)) return 'editorial';
  return 'utility';
}

/**
 * Diagnostic helper listing all excluded routes and eligible routes.
 */
export function getRouteClassificationSummary() {
  const excludedRoutes = [
    '/',
    '/inbox',
    '/generator',
    '/messages',
    '/messages/:id',
    '/email/:id',
    '/audit',
    '/admin',
    '/privacy', // Excluded from ads while utilized as part of consent & privacy disclosure flow
    '/contact', // Clean communication channel (excluded from advertising units)
    'Any route where an email message or temporary inbox is the primary content',
  ];

  const eligibleRoutes = [
    '/how-it-works',
    '/guides',
    '/guides/:slug',
    '/blog',
    '/blog/:slug',
    '/about',
    '/faq',
    '/terms',
    '/disclaimer',
    '/cookies',
    '/api',
  ];

  return { excludedRoutes, eligibleRoutes };
}
