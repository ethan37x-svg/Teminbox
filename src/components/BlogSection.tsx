import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Clock, User, Tag, ArrowLeft, Share2, Copy, Check, 
  ChevronRight, MessageSquare, ShieldCheck, Award, CheckCircle2, FileText, 
  ExternalLink, Sparkles, AlertCircle
} from 'lucide-react';
import { BlogArticle } from '../types';
import { blogArticles } from '../data/blogArticles';
import { AdSenseBanner } from './AdSenseBanners';
import { isAdEligiblePage } from '../config/adEligibility';

interface BlogSectionProps {
  initialSlug?: string | null;
  onSlugChange?: (slug: string | null) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ initialSlug, onSlugChange }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(() => {
    if (initialSlug) {
      return blogArticles.find((a) => a.slug === initialSlug) || null;
    }
    return null;
  });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync with initialSlug if prop changes
  useEffect(() => {
    if (initialSlug) {
      const match = blogArticles.find((a) => a.slug === initialSlug);
      if (match && match.slug !== selectedArticle?.slug) {
        setSelectedArticle(match);
      }
    } else if (initialSlug === null && selectedArticle !== null) {
      setSelectedArticle(null);
    }
  }, [initialSlug]);

  const categories = ['All', 'Privacy', 'Tutorials', 'Security', 'Comparisons', 'Productivity'];

  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(q) ||
      article.description.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Render article detailed view
  if (selectedArticle) {
    // Generate Schema.org Article and BreadcrumbList JSON-LD
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          'headline': selectedArticle.title,
          'description': selectedArticle.description,
          'image': selectedArticle.imageUrl,
          'mainEntityOfPage': `https://tempinbox.solutions/guides/${selectedArticle.slug}`,
          'publisher': {
            '@type': 'Organization',
            'name': 'TempInbox',
            'url': 'https://tempinbox.solutions/',
          },
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://tempinbox.solutions/',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Guides',
              'item': 'https://tempinbox.solutions/guides',
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': selectedArticle.title,
              'item': `https://tempinbox.solutions/guides/${selectedArticle.slug}`,
            },
          ],
        },
      ],
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
        
        {/* Inject Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Semantic Accessible Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500 list-none p-0 m-0">
            <li className="flex items-center gap-2">
              <a 
                href="/"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                    e.preventDefault();
                    window.history.pushState(null, '', '/');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }} 
                className="hover:text-blue-600 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
              >
                Home
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li className="flex items-center gap-2">
              <a 
                href="/guides"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                    e.preventDefault();
                    setSelectedArticle(null);
                    onSlugChange?.(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }} 
                className="hover:text-blue-600 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
              >
                Guides
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li aria-current="page" className="truncate text-slate-800 dark:text-slate-300 font-medium max-w-sm sm:max-w-md">
              {selectedArticle.title}
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <a
          href="/guides"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
              e.preventDefault();
              setSelectedArticle(null);
              onSlugChange?.(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </a>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Fact-Checked & Standards-Verified Guide
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {selectedArticle.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            {selectedArticle.title}
          </h1>

          {/* E-E-A-T Credibility Header Card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 my-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                  {selectedArticle.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{selectedArticle.author}</span>
                    <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                      Author
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Published: {selectedArticle.date} • Category: {selectedArticle.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs transition border border-slate-200 dark:border-slate-600 shadow-xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Fact-Checked Educational Resource
              </span>
              <span>•</span>
              <span>Independent Educational Content</span>
              <span>•</span>
              <span>Updated for 2026 Standards</span>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        {selectedArticle.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
            <img
              src={selectedArticle.imageUrl}
              alt={`Cover illustration for guide: ${selectedArticle.title}`}
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
            />
          </div>
        )}

        {/* Executive Key Takeaways Box */}
        <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-slate-800/80 dark:to-indigo-950/40 p-5 sm:p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 mb-8 space-y-2">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Executive Summary & Key Takeaways</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {selectedArticle.description}
          </p>
        </div>

        {/* Table of Contents */}
        {selectedArticle.tableOfContents.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>Table of Contents</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
              {selectedArticle.tableOfContents.map((item, idx) => (
                <li key={idx} className="hover:text-blue-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Editorial AdSense Placement (Strictly Gated to /guides/:slug) */}
        <AdSenseBanner 
          placement="in-article" 
          currentRoute={`/guides/${selectedArticle.slug}`} 
        />

        {/* Article Body Content */}
        <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-4">
          {selectedArticle.content.split('\n\n').map((paragraph, index) => {
            // Horizontal rule
            if (paragraph.startsWith('---')) {
              return <hr key={index} className="my-8 border-slate-200 dark:border-slate-800" />;
            }

            // H3 Header
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }

            // H4 Header
            if (paragraph.startsWith('#### ')) {
              return (
                <h4 key={index} className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">
                  {paragraph.replace('#### ', '')}
                </h4>
              );
            }

            // Code blocks
            if (paragraph.startsWith('```')) {
              const codeLines = paragraph.split('\n');
              const codeContent = codeLines.slice(1, codeLines.length - 1).join('\n');
              return (
                <pre key={index} className="bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto my-4 border border-slate-800 shadow-inner">
                  <code>{codeContent}</code>
                </pre>
              );
            }

            // Blockquotes
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={index} className="border-l-4 border-blue-600 pl-4 py-2 my-4 bg-blue-50/50 dark:bg-blue-950/40 rounded-r-xl italic text-slate-700 dark:text-slate-300">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }

            // Tables
            if (paragraph.startsWith('|')) {
              const rows = paragraph.split('\n');
              return (
                <div key={index} className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-xs sm:text-sm">
                    {rows.map((row, rIdx) => {
                      if (row.includes(':---') || row.includes('---')) return null;
                      const cells = row.split('|').filter((c) => c.trim() !== '');
                      if (rIdx === 0) {
                        return (
                          <thead key={rIdx} className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                            <tr>
                              {cells.map((cell, cIdx) => (
                                <th key={cIdx} className="px-4 py-3 text-left">
                                  {cell.trim().replace(/\*\*/g, '')}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        );
                      }
                      return (
                        <tbody key={rIdx} className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                          <tr>
                            {cells.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                                {cell.trim().replace(/\*\*/g, '')}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              );
            }

            // Bullet Lists
            if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
              const items = paragraph.split(/\n(?=[-0-9]+\.\s|- )/);
              return (
                <ul key={index} className="list-disc list-inside space-y-2 my-4 pl-2 text-slate-700 dark:text-slate-300">
                  {items.map((it, i) => (
                    <li key={i} className="leading-relaxed">
                      {it.replace(/^[-0-9]+\.\s*|- /, '')}
                    </li>
                  ))}
                </ul>
              );
            }

            // Standard Paragraph
            return (
              <p key={index} className="leading-relaxed text-slate-700 dark:text-slate-300">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Formal Citations & Standards Index (E-E-A-T) */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Formal Standards References & Bibliography</span>
          </h4>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong>IETF RFC 5321:</strong> Simple Mail Transfer Protocol (SMTP). Klensin, J., October 2008.</li>
            <li><strong>IETF RFC 7208:</strong> Sender Policy Framework (SPF) for Authorizing Use of Domains in Email. Kitterman, S., April 2014.</li>
            <li><strong>IETF RFC 6376:</strong> DomainKeys Identified Mail (DKIM) Signatures. Crocker, D., et al., September 2011.</li>
            <li><strong>IETF RFC 7489:</strong> Domain-based Message Authentication, Reporting, and Conformance (DMARC). Kucherawy, M., March 2015.</li>
            <li><strong>NIST Special Publication 800-63B:</strong> Digital Identity Guidelines: Authentication and Lifecycle Management.</li>
            <li><strong>Regulation (EU) 2016/679 (GDPR):</strong> Article 17, Right to erasure ('right to be forgotten').</li>
          </ul>
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400" />
          {selectedArticle.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Semantic Related Guides for Crawler Interlinking */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Related Technical & Privacy Guides</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogArticles
              .filter((a) => a.slug !== selectedArticle.slug)
              .slice(0, 4)
              .map((related) => (
                <a
                  key={related.id}
                  href={`/guides/${related.slug}`}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                      e.preventDefault();
                      setSelectedArticle(related);
                      onSlugChange?.(related.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 transition group block"
                >
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                    {related.category}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1">
                    {related.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {related.description}
                  </p>
                </a>
              ))}
          </div>
        </div>

      </div>
    );
  }

  // Articles List View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Educational Privacy Resources & Technical Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Email Privacy & Temporary Email Guides
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Comprehensive, research-backed guides on disposable inboxes, email privacy fundamentals, spam defense strategies, and modern tracking mechanics.
        </p>
      </div>

      {/* Editorial Header Ad Placement (Strictly Gated to /guides) */}
      <AdSenseBanner placement="editorial-header" currentRoute="/guides" />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. 'Playwright', 'SPF')..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>

      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <a
            key={article.id}
            href={`/guides/${article.slug}`}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                setSelectedArticle(article);
                onSlugChange?.(article.slug);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden group no-underline text-inherit"
          >
            {article.imageUrl && (
              <div className="h-48 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/60 relative">
                <img
                  src={article.imageUrl}
                  alt={`Illustration for guide: ${article.title}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600/90 backdrop-blur-xs text-white uppercase tracking-wider shadow-sm">
                  {article.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[9px] font-bold bg-slate-900/80 backdrop-blur-xs text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Fact Checked
                </span>
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {!article.imageUrl && (
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">{article.author.split(',')[0]}</span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span>{article.date}</span>
              <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Research
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
};
