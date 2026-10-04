import React from 'react';
import { Info } from 'lucide-react';

interface AdSenseBannerProps {
  placement: 'hero-bottom' | 'sidebar' | 'in-article' | 'footer-banner';
  slotId?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ placement, slotId = '1234567890' }) => {
  // In production with an active AdSense account, the script will populate <ins className="adsbygoogle">
  // In development and pre-approval stage, this renders an honest, clearly demarcated AdSense placeholder.
  
  if (placement === 'hero-bottom') {
    return (
      <aside 
        aria-label="Advertisement"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6"
      >
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 text-center relative overflow-hidden transition-colors">
          
          {/* Mandatory Google Publisher Policy Compliant Label */}
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
              ADVERTISEMENT
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Info className="w-3 h-3" />
              <span>Google AdSense Slot</span>
            </span>
          </div>

          {/* Ad Container & Live AdSense Slot */}
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
                Google AdSense Responsive Ad Space
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 max-w-lg mx-auto">
                Clearly demarcated placement reserved for contextual display advertising. Ads will appear upon completion of domain review.
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
        aria-label="Advertisement"
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs text-left"
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
            300×250 Sidebar Banner
          </p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
            Reserved for standard IAB contextual ads.
          </p>
        </div>
      </aside>
    );
  }

  return null;
};
