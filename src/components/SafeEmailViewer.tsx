import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Eye, EyeOff, AlertTriangle, ExternalLink, 
  Info, Check, ShieldAlert, Sparkles 
} from 'lucide-react';
import { sanitizeEmailHtml, SanitizationResult } from '../utils/emailSanitizer';

interface SafeEmailViewerProps {
  bodyHtml?: string;
  bodyText?: string;
  isDarkMode?: boolean;
}

export const SafeEmailViewer: React.FC<SafeEmailViewerProps> = ({
  bodyHtml,
  bodyText,
  isDarkMode = false,
}) => {
  const [allowRemoteImages, setAllowRemoteImages] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(300);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Perform multi-layered sanitization
  const sanitizationResult: SanitizationResult = sanitizeEmailHtml(
    bodyHtml || (bodyText ? `<p style="white-space: pre-wrap;">${bodyText.replace(/</g, '&lt;')}</p>` : ''),
    { allowRemoteImages }
  );

  // Construct complete HTML document for sandboxed iframe
  const frameDocument = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base target="_blank">
  <style>
    :root {
      color-scheme: ${isDarkMode ? 'dark' : 'light'};
    }
    body {
      margin: 0;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
      background-color: transparent;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    a {
      color: #2563eb;
      text-decoration: underline;
    }
    table {
      max-width: 100% !important;
    }
    pre, code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
    }
  </style>
</head>
<body>
  ${sanitizationResult.sanitizedHtml}
</body>
</html>
`;

  // Auto-resize iframe based on content height
  const handleIframeLoad = () => {
    if (iframeRef.current) {
      try {
        const doc = iframeRef.current.contentDocument;
        if (doc && doc.body) {
          const scrollHeight = doc.body.scrollHeight;
          const calculatedHeight = Math.max(200, Math.min(scrollHeight + 32, 2400));
          setIframeHeight(calculatedHeight);
        }
      } catch (err) {
        // Cross-origin boundary fallback if sandbox restricts access
        setIframeHeight(450);
      }
    }
  };

  useEffect(() => {
    // When sanitization or image preference changes, recalculate
    const timer = setTimeout(() => {
      handleIframeLoad();
    }, 150);
    return () => clearTimeout(timer);
  }, [allowRemoteImages, bodyHtml]);

  return (
    <div className="flex flex-col space-y-3">
      {/* Remote Image Privacy & Tracking Pixel Alert Banner */}
      {(sanitizationResult.hasBlockedRemoteImages || sanitizationResult.detectedTrackingPixelsCount > 0) && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              {sanitizationResult.hasBlockedRemoteImages && !allowRemoteImages ? (
                <>
                  <strong>Privacy Guard:</strong> {sanitizationResult.blockedImagesCount} remote{' '}
                  {sanitizationResult.blockedImagesCount === 1 ? 'image' : 'images'} blocked to prevent IP logging.
                </>
              ) : (
                <>
                  <strong>Protected:</strong> Remote resources allowed by user.
                </>
              )}
              {sanitizationResult.detectedTrackingPixelsCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/80 font-semibold text-[10px]">
                  {sanitizationResult.detectedTrackingPixelsCount} Tracking{' '}
                  {sanitizationResult.detectedTrackingPixelsCount === 1 ? 'pixel' : 'pixels'} neutralized
                </span>
              )}
            </span>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {sanitizationResult.hasBlockedRemoteImages && (
              <button
                type="button"
                onClick={() => setAllowRemoteImages(!allowRemoteImages)}
                className="px-3 py-1 rounded-lg bg-amber-200/80 dark:bg-amber-900 hover:bg-amber-300 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-100 font-bold text-xs transition flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {allowRemoteImages ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide Remote Images</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Load Remote Images</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Security Sanitization Status Pill */}
      {sanitizationResult.detectedRisks.length > 0 && (
        <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span className="truncate">
            Security Sanitizer: Neutralized {sanitizationResult.detectedRisks.length}{' '}
            untrusted {sanitizationResult.detectedRisks.length === 1 ? 'element' : 'elements'} (scripts, handlers, or fixed overlays).
          </span>
        </div>
      )}

      {/* Sandboxed Isolation Iframe */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <iframe
          ref={iframeRef}
          title="Safe Email Viewer"
          srcDoc={frameDocument}
          onLoad={handleIframeLoad}
          sandbox="allow-popups allow-popups-to-escape-sandbox"
          className="w-full border-0 block"
          style={{ height: `${iframeHeight}px`, minHeight: '220px' }}
        />
      </div>
    </div>
  );
};
