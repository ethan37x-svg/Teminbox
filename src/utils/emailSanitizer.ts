/**
 * Security Email Sanitizer & Privacy Guard
 *
 * Provides defense-in-depth sanitization and policy enforcement for untrusted HTML email content.
 *
 * SPECIFIC ATTACK VECTOR MITIGATIONS:
 * 1. Stored / DOM-based XSS:
 *    - Strips all `<script>`, `<object>`, `<embed>`, `<iframe>`, `<applet>`, `<meta>`, `<link>`, `<form>`, `<base>`.
 * 2. Event-Handler Injection:
 *    - Strips all inline `on*` attributes (e.g. `onload`, `onerror`, `onclick`, `onmouseover`, `ontoggle`).
 * 3. Malicious SVG:
 *    - Disallows SVG scripting, `<animate>`, `<set>`, `<handler>`, `<script>`, `<discard>` within vector graphics.
 * 4. Dangerous URL Schemes:
 *    - Validates `href` and `src` schemes; blocks `javascript:`, `vbscript:`, `data:text/html`.
 *    - Forces `target="_blank"`, `rel="noopener noreferrer nofollow"`, and `referrerpolicy="no-referrer"` on all links.
 * 5. CSS-Based UI Spoofing:
 *    - Strips `position: fixed`, `position: sticky`, `expression()`, `@import`, `-moz-binding`, and overlay hijacking.
 * 6. Email Tracking Pixels & IP Leakage:
 *    - Identifies and neutralizes 1x1, 0x0, and hidden tracking pixels.
 *    - Provides user-controlled remote image gating to prevent silent read receipts and IP address leaks.
 * 7. Dangerous Attachments:
 *    - Audits file extensions to warn against executables, scripts, or double-extension spoofing.
 */

export interface SanitizationResult {
  sanitizedHtml: string;
  hasBlockedRemoteImages: boolean;
  blockedImagesCount: number;
  detectedTrackingPixelsCount: number;
  detectedRisks: string[];
}

export interface AttachmentSecurityEvaluation {
  isDangerous: boolean;
  riskCategory: 'High' | 'Medium' | 'Low' | 'Safe';
  warningMessage?: string;
  sanitizedFilename: string;
}

// Dangerous elements that must never exist in an email viewer
const FORBIDDEN_TAGS = new Set([
  'script',
  'iframe',
  'frame',
  'frameset',
  'object',
  'embed',
  'applet',
  'meta',
  'base',
  'link',
  'form',
  'input',
  'button',
  'textarea',
  'select',
  'option',
  'optgroup',
  'portal',
  'dialog',
]);

// SVG-specific active elements that can execute code
const FORBIDDEN_SVG_TAGS = new Set([
  'script',
  'animate',
  'animatemotion',
  'animatetransform',
  'set',
  'handler',
  'discard',
  'listener',
]);

// Dangerous executable file extensions
const DANGEROUS_EXTENSIONS = new Set([
  'exe', 'bat', 'cmd', 'sh', 'vbs', 'vbe', 'js', 'jse', 'wsf', 'wsh',
  'scr', 'pif', 'hta', 'cpl', 'jar', 'ps1', 'psm1', 'apk', 'iso', 'img',
  'msi', 'msp', 'reg', 'com', 'gadget', 'inf'
]);

// Supported, safe URL protocols
const SAFE_URL_PROTOCOLS = /^(\s*https?:\/\/|\s*mailto:|\s*tel:|\s*#)/i;
const SAFE_IMAGE_PROTOCOLS = /^(\s*https?:\/\/|\s*data:image\/(png|jpe?g|gif|webp|bmp);base64,)/i;

/**
 * Sanitizes untrusted HTML email content using the browser's native DOMParser.
 */
export function sanitizeEmailHtml(
  rawHtml: string,
  options: { allowRemoteImages?: boolean } = {}
): SanitizationResult {
  const allowRemoteImages = Boolean(options.allowRemoteImages);
  const detectedRisks: string[] = [];
  let blockedImagesCount = 0;
  let detectedTrackingPixelsCount = 0;

  if (!rawHtml || typeof rawHtml !== 'string') {
    return {
      sanitizedHtml: '',
      hasBlockedRemoteImages: false,
      blockedImagesCount: 0,
      detectedTrackingPixelsCount: 0,
      detectedRisks: [],
    };
  }

  // Parse HTML inside a detached Document context (does NOT execute scripts)
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');

  // 1. Remove all forbidden and dangerous tags
  const allElements = Array.from(doc.querySelectorAll('*'));
  for (const el of allElements) {
    const tagName = el.tagName.toLowerCase();

    if (FORBIDDEN_TAGS.has(tagName) || FORBIDDEN_SVG_TAGS.has(tagName)) {
      detectedRisks.push(`Removed dangerous tag <${tagName}>`);
      el.remove();
      continue;
    }

    // 2. Remove all inline event handlers (attributes starting with "on")
    const attrsToRemove: string[] = [];
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i];
      const attrName = attr.name.toLowerCase();

      if (attrName.startsWith('on')) {
        attrsToRemove.push(attr.name);
        detectedRisks.push(`Stripped inline event handler ${attr.name} from <${tagName}>`);
      }
    }
    for (const attrName of attrsToRemove) {
      el.removeAttribute(attrName);
    }

    // 3. Inspect and sanitize hyperlinks (<a> tags)
    if (tagName === 'a') {
      const href = el.getAttribute('href');
      if (href) {
        const trimmedHref = href.trim();
        // Check for dangerous schemes: javascript:, vbscript:, data:text/html
        if (
          trimmedHref.toLowerCase().startsWith('javascript:') ||
          trimmedHref.toLowerCase().startsWith('vbscript:') ||
          trimmedHref.toLowerCase().startsWith('data:')
        ) {
          detectedRisks.push(`Blocked dangerous link scheme: ${trimmedHref.slice(0, 30)}...`);
          el.setAttribute('href', '#');
          el.setAttribute('title', 'Blocked dangerous link');
        } else if (!SAFE_URL_PROTOCOLS.test(trimmedHref)) {
          detectedRisks.push(`Neutralized non-standard protocol in link`);
          el.setAttribute('href', '#');
        }
      }

      // Enforce reverse-tabnabbing protection & privacy headers
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer nofollow');
      el.setAttribute('referrerpolicy', 'no-referrer');
    }

    // 4. Inspect images (<img> tags) & Tracking Pixels
    if (tagName === 'img') {
      const src = el.getAttribute('src');
      const width = el.getAttribute('width');
      const height = el.getAttribute('height');
      const style = (el.getAttribute('style') || '').toLowerCase();

      // Detect common 0x0 or 1x1 tracking pixel patterns
      const isPixelSize = 
        (width === '1' && height === '1') ||
        (width === '0' || height === '0') ||
        style.includes('width: 1px') ||
        style.includes('width:1px') ||
        style.includes('display: none') ||
        style.includes('display:none');

      if (isPixelSize) {
        detectedTrackingPixelsCount++;
        detectedRisks.push('Neutralized hidden email tracking pixel');
        // Neutralize tracking pixel completely
        el.setAttribute('style', 'display: none !important; visibility: hidden !important;');
        el.removeAttribute('src');
        continue;
      }

      if (src) {
        const trimmedSrc = src.trim();

        // Check for dangerous data URLs or script schemes
        if (
          trimmedSrc.toLowerCase().startsWith('javascript:') ||
          trimmedSrc.toLowerCase().startsWith('vbscript:') ||
          (trimmedSrc.toLowerCase().startsWith('data:') && !SAFE_IMAGE_PROTOCOLS.test(trimmedSrc))
        ) {
          detectedRisks.push('Blocked unsafe image source scheme');
          el.removeAttribute('src');
          continue;
        }

        // If remote images are blocked by default, replace with a safe placeholder
        if (!allowRemoteImages && (trimmedSrc.startsWith('http://') || trimmedSrc.startsWith('https://'))) {
          blockedImagesCount++;
          // Preserve the original URL in a data attribute so the user can load it on demand
          el.setAttribute('data-original-src', trimmedSrc);
          // Safe lightweight inline SVG placeholder
          el.setAttribute('src', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="24" viewBox="0 0 100 24"><rect width="100" height="24" fill="%23f1f5f9" rx="4"/><text x="50" y="15" fill="%2394a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">[Image Hidden]</text></svg>');
          el.setAttribute('alt', el.getAttribute('alt') || 'Remote image blocked for privacy');
          el.setAttribute('loading', 'lazy');
        } else {
          el.setAttribute('referrerpolicy', 'no-referrer');
          el.setAttribute('loading', 'lazy');
        }
      }
    }

    // 5. Sanitize inline CSS style attributes (prevent UI spoofing & fixed overlays)
    if (el.hasAttribute('style')) {
      let styleContent = el.getAttribute('style') || '';
      const originalStyle = styleContent;

      // Disallow CSS expressions, behaviors, bindings, and external imports
      styleContent = styleContent
        .replace(/expression\s*\([^)]*\)/gi, '')
        .replace(/behavior\s*:[^;]+;?/gi, '')
        .replace(/-moz-binding\s*:[^;]+;?/gi, '')
        .replace(/@import\s+[^;]+;?/gi, '')
        .replace(/url\s*\(\s*['"]?javascript:[^)]*\)/gi, '');

      // Prevent style-based UI spoofing: disallow position: fixed, sticky, and giant z-index
      if (/position\s*:\s*(fixed|sticky)/i.test(styleContent)) {
        detectedRisks.push('Neutralized position:fixed/sticky CSS spoofing overlay');
        styleContent = styleContent.replace(/position\s*:\s*(fixed|sticky)[^;]*;?/gi, 'position: static;');
      }

      if (/z-index\s*:\s*\d{3,}/i.test(styleContent)) {
        styleContent = styleContent.replace(/z-index\s*:\s*\d+/gi, 'z-index: 1');
      }

      if (styleContent !== originalStyle) {
        el.setAttribute('style', styleContent);
      }
    }
  }

  // 6. Sanitize <style> blocks if present: prevent @import and fixed UI overlays
  const styleTags = Array.from(doc.querySelectorAll('style'));
  for (const styleTag of styleTags) {
    let cssText = styleTag.textContent || '';
    // Disallow external imports or javascript URLs inside style tags
    cssText = cssText
      .replace(/@import\s+[^;]+;/gi, '')
      .replace(/url\s*\(\s*['"]?javascript:[^)]*\)/gi, '')
      .replace(/expression\s*\([^)]*\)/gi, '')
      .replace(/position\s*:\s*(fixed|sticky)/gi, 'position: static')
      .replace(/z-index\s*:\s*\d{3,}/gi, 'z-index: 1');

    styleTag.textContent = cssText;
  }

  return {
    sanitizedHtml: doc.body.innerHTML,
    hasBlockedRemoteImages: blockedImagesCount > 0,
    blockedImagesCount,
    detectedTrackingPixelsCount,
    detectedRisks,
  };
}

/**
 * Evaluates an attachment filename and mime type for security risks.
 */
export function evaluateAttachmentSecurity(
  filename: string,
  _mimeType?: string
): AttachmentSecurityEvaluation {
  // Sanitize filename to prevent directory traversal or control characters
  const cleanFilename = filename
    .replace(/[\\/:*?"<>|\r\n\t\0]+/g, '_')
    .replace(/^\.+/, '')
    .slice(0, 80) || 'attachment';

  const parts = cleanFilename.toLowerCase().split('.');
  const ext = parts.length > 1 ? parts.pop()! : '';

  // Check for double extension spoofing (e.g. invoice.pdf.exe)
  const isDoubleExtension = parts.length > 1 && ['pdf', 'doc', 'docx', 'jpg', 'png', 'txt'].includes(parts[parts.length - 1]);

  if (DANGEROUS_EXTENSIONS.has(ext)) {
    return {
      isDangerous: true,
      riskCategory: 'High',
      warningMessage: `Potentially malicious executable file type (.${ext}). Do NOT open this file unless you fully trust the sender.`,
      sanitizedFilename: cleanFilename,
    };
  }

  if (isDoubleExtension) {
    return {
      isDangerous: true,
      riskCategory: 'High',
      warningMessage: `Suspicious double extension detected (.${parts[parts.length - 1]}.${ext}). Attackers use this to disguise executables.`,
      sanitizedFilename: cleanFilename,
    };
  }

  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
    return {
      isDangerous: false,
      riskCategory: 'Medium',
      warningMessage: `Compressed archive (.${ext}). Inspect archive contents with antivirus software before running any files.`,
      sanitizedFilename: cleanFilename,
    };
  }

  return {
    isDangerous: false,
    riskCategory: 'Safe',
    sanitizedFilename: cleanFilename,
  };
}
