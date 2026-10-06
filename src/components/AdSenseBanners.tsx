import React from 'react';
import { Info } from 'lucide-react';
import { isAdEligiblePage } from '../config/adEligibility';

interface AdSenseBannerProps {
  placement: 'in-article' | 'sidebar' | 'editorial-header' | 'footer-banner' | 'hero-bottom';
  currentRoute?: string;
  slotId?: string;
}

/**
 * Reusable Google AdSense Ad Placement Component.
 *
 * STRICT SEPARATION ENFORCEMENT:
 * - Checks `isAdEligiblePage(effectiveRoute)` before rendering.
 * - If the current page/route is a TOOL page (generator, inbox, message reader, email list, calculator),
 *   it IMMEDIATELY returns `null` and prevents any ad DOM injection or script execution.
 * - Only mounts on verified EDITORIAL content pages (/guides, /guides/:slug, /about, /faq, etc.).
 */
export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  placement,
  currentRoute,
  slotId = '1234567890',
}) => {
  // Determine effective route (from prop or browser location)
  const effectiveRoute = currentRoute || (typeof window !== 'undefined' ? window.location.pathname : 'inbox');

  // Hard gate: If the route is not an eligible editorial page, DO NOT RENDER ANYTHING.
  if (!isAdEligiblePage(effectiveRoute)) {
    return null;
  }

  // Pre-approval stage: renders policy-compliant AdSense reserved containers only on editorial pages.
  // When an AdSense account is approved, the standard <ins className="adsbygoogle"> executes.
  if (placement === 'in-article') {
    return (
      <aside
        aria-label="Editorial Advertisement"
        data-ad-eligible="true"
        data-ad-route={effectiveRoute}
        className="my-8 max-w-4xl mx-auto w-full clear-both"
      >
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 text-center overflow-hidden transition-colors">
          {/* Google Publisher Policy Compliant Header Label */}
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
              ADVERTISEMENT
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Info className="w-3 h-3" />
              <span>Contextual Ad Placement (Editorial Only)</span>
            </span>
          </div>

          {/* Ad Container & Responsive Slot */}
          <div className="min-h-[100px] flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-layout="in-article"
              data-ad-format="fluid"
              data-ad-client="ca-pub-0000000000000000"
              data-ad-slot={slotId}
            />
            <div className="text-center py-2">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Google AdSense Editorial In-Article Space
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 max-w-lg mx-auto">
                Reserved for contextual advertising within educational guides. Segregated from all temporary mailbox and private message tools.
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  if (placement === 'sidebar') {
    return (
      <aside
        aria-label="Editorial Sidebar Advertisement"
        data-ad-eligible="true"
        data-ad-route={effectiveRoute}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs text-left my-4"
      >
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            ADVERTISEMENT
          </span>
          <span className="text-[9px] text-slate-400 flex items-center gap-0.5">
            <Info className="w-2.5 h-2.5" />
            <span>Ad Space</span>
          </span>
        </div>

        <div className="min-h-[250px] flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-0000000000000000"
            data-ad-slot={slotId}
            data-ad-format="rectangle"
          />
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-2">
            300×250 Editorial Sidebar Slot
          </p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
            Reserved for certified contextual ad partners on educational content pages.
          </p>
        </div>
      </aside>
    );
  }

  if (placement === 'editorial-header') {
    return (
      <aside
        aria-label="Editorial Header Advertisement"
        data-ad-eligible="true"
        data-ad-route={effectiveRoute}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6"
      >
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 text-center overflow-hidden">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
              ADVERTISEMENT
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Info className="w-3 h-3" />
              <span>Editorial Content Banner</span>
            </span>
          </div>

          <div className="min-h-[90px] flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-layout="in-article"
              data-ad-format="fluid"
              data-ad-client="ca-pub-0000000000000000"
              data-ad-slot={slotId}
            />
            <div className="text-center py-2">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Guides & Research Contextual Space
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 max-w-lg mx-auto">
                Clearly demarcated placement reserved for educational content views.
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return null;
};
