import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, X, Key, Globe, Info } from 'lucide-react';

interface AdSenseBannerProps {
  placement: 'hero-bottom' | 'sidebar' | 'in-article' | 'footer-banner';
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ placement }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (placement === 'hero-bottom') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 border-2 border-indigo-700/60 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* AdSense Policy Compliant Label */}
          <span className="absolute top-2 right-2 text-[9px] font-extrabold tracking-widest text-slate-300 bg-slate-800/90 border border-slate-600 px-2 py-0.5 rounded uppercase">
            ADVERTISEMENT
          </span>

          <div className="flex items-center gap-3.5 pr-20 md:pr-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-white">NordVPN Privacy Shield • Independent Audit Verified</h4>
                <span className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full uppercase">
                  Sponsored
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Encrypt your internet connection, protect against DNS leaks, and maintain complete digital anonymity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://nordvpn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs flex items-center gap-1.5 transition shadow"
            >
              <span>Learn More</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Close Advertisement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  if (placement === 'sidebar') {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 shadow-sm sticky top-20 text-left">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
          <span className="text-[10px] uppercase font-bold text-slate-500">Security Solutions</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-widest border border-slate-300 dark:border-slate-600 px-1.5 py-0.5 rounded font-bold">
            ADVERTISEMENT
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-900 dark:text-white">1Password Vault</h5>
              <p className="text-[11px] text-slate-500">Zero-knowledge password manager</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-900 dark:text-white">Proton Mail</h5>
              <p className="text-[11px] text-slate-500">End-to-end encrypted Swiss email</p>
            </div>
          </div>
        </div>

        <a
          href="https://proton.me"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
        >
          <span>View Partner Tools</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return null;
};
