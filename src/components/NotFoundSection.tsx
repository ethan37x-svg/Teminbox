import React from 'react';
import { FileQuestion, Home, BookOpen, ArrowLeft, Mail } from 'lucide-react';

interface NotFoundSectionProps {
  onNavigateHome: () => void;
  onNavigateGuides: () => void;
  attemptedPath?: string;
}

export const NotFoundSection: React.FC<NotFoundSectionProps> = ({
  onNavigateHome,
  onNavigateGuides,
  attemptedPath,
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center animate-fadeIn">
      {/* 404 Badge & Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
        <FileQuestion className="w-10 h-10" />
      </div>

      <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-4 border border-slate-200 dark:border-slate-700">
        HTTP 404 Error
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-8">
        The page or guide you are looking for does not exist, has been removed, or the address was entered incorrectly.
        {attemptedPath && (
          <span className="block mt-2 font-mono text-xs text-slate-400 dark:text-slate-500 break-all bg-slate-100 dark:bg-slate-800/80 p-2 rounded-lg">
            Requested URL: {attemptedPath}
          </span>
        )}
      </p>

      {/* Helpful Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage & Inbox</span>
        </button>

        <button
          type="button"
          onClick={onNavigateGuides}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse Privacy Guides</span>
        </button>
      </div>

      {/* Additional Help Context */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        <p>
          Need to generate an instant disposable inbox? Our free temporary email generator is ready without registration on the home page.
        </p>
      </div>
    </div>
  );
};
