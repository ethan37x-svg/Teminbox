import { BlogArticle } from '../types';

export interface SeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogType: 'website' | 'article';
  ogImage?: string;
  articleData?: BlogArticle;
}

const BASE_URL = 'https://tempinbox.solutions';
const DEFAULT_IMAGE = 'https://tempinbox.solutions/assets/og-preview.png';

/**
 * Updates document head tags for technical SEO, OpenGraph, Twitter cards, and Schema.org JSON-LD.
 */
export function updateDocumentSeo(config: SeoConfig): void {
  if (typeof document === 'undefined') return;

  // 1. Update <title>
  document.title = config.title;

  // Helper to set or create meta tags
  const setMeta = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Meta description
  setMeta('name', 'description', config.description);

  // 3. Robots directive
  setMeta('name', 'robots', config.robots);

  // 4. Canonical URL
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', config.canonicalUrl);

  // 5. Open Graph Metadata
  setMeta('property', 'og:site_name', 'TempInbox');
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:url', config.canonicalUrl);
  setMeta('property', 'og:type', config.ogType);
  setMeta('property', 'og:image', config.ogImage || DEFAULT_IMAGE);

  // 6. Twitter / X Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);
  setMeta('name', 'twitter:image', config.ogImage || DEFAULT_IMAGE);

  // 7. Schema.org JSON-LD Structured Data
  updateStructuredData(config);
}

/**
 * Updates or injects JSON-LD Schema.org structured data into the document head.
 */
function updateStructuredData(config: SeoConfig): void {
  const SCRIPT_ID = 'seo-structured-data-jsonld';
  let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (config.ogType === 'article' && config.articleData) {
    const article = config.articleData;

    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        // Article Schema
        {
          '@type': 'Article',
          '@id': `${config.canonicalUrl}#article`,
          'isPartOf': {
            '@type': 'WebPage',
            '@id': config.canonicalUrl,
            'url': config.canonicalUrl,
            'name': article.title,
          },
          'headline': article.title,
          'description': article.description,
          'image': article.imageUrl || DEFAULT_IMAGE,
          'mainEntityOfPage': config.canonicalUrl,
          'publisher': {
            '@type': 'Organization',
            'name': 'TempInbox',
            'url': `${BASE_URL}/`,
          },
        },
        // BreadcrumbList Schema (mirrors visible breadcrumb navigation on page)
        {
          '@type': 'BreadcrumbList',
          '@id': `${config.canonicalUrl}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': `${BASE_URL}/`,
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Guides',
              'item': `${BASE_URL}/guides`,
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': article.title,
              'item': config.canonicalUrl,
            },
          ],
        },
      ],
    };

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = SCRIPT_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(articleJsonLd, null, 2);
  } else {
    // If not on an article page, remove article-specific JSON-LD script (homepage WebApplication script in index.html persists)
    if (scriptEl) {
      scriptEl.remove();
    }
  }
}
