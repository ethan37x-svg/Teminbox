# TempInbox — Certified CMP Integration Guide

This guide documents how TempInbox is architected for integration with a **Google-certified Consent Management Platform (CMP)**, specifically **Google AdSense Privacy & Messaging** (IAB Europe TCF v2.2 compliant).

---

## 1. Core Architectural Principles

1. **No Fake / Homegrown Consent Banners**:
   Google AdSense requires publishers serving ads to EEA/UK/Swiss visitors to use a *Google-certified CMP* that integrates with IAB Europe TCF v2.2. Custom "Accept All" banners or fake modals built without certified TCF accreditation are rejected by Google during AdSense site reviews. TempInbox avoids custom consent modals and delegates legal consent directly to the certified CMP.

2. **Zero-Tracking Prior to Consent (Consent Mode v2 Default Denied)**:
   All marketing, profiling, and analytics storage identifiers are hardcoded to `denied` by default via Google Consent Mode v2. No advertising cookies, tracking pixels, or device fingerprints run before the user explicitly grants consent via the certified CMP.

3. **100% Core Functionality Preserved Without Consent**:
   All primary disposable temporary inbox features operate client-side and in volatile server memory without requiring cookies or marketing consent:
   - Generating random or custom temporary email addresses
   - Receiving live inbound emails via SMTP
   - Inspecting MIME headers, text, and HTML payloads
   - Downloading file attachments
   - Calculating email exposure risks
   - Reading all 10 long-form educational privacy guides
   - Deleting inboxes and extending lifetimes

---

## 2. Integration Architecture

### A. Google Consent Mode v2 (in `index.html`)
Before any Google or partner tags load, default denial is registered in `<head>`:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'personalization_storage': 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': 500
  });
</script>
```

### B. Standard IAB Europe TCF v2.2 & Google FC Stub (in `index.html`)
The official IAB Europe TCF stub provides `window.__tcfapi` and queues commands before the CMP script is downloaded. It also registers `window.googlefc.callbackQueue`:

```html
<script>
  (function() {
    var host = window;
    if (!host.__tcfapi) {
      var a = [];
      host.__tcfapi = function() {
        var args = arguments;
        if (!args.length) return a;
        if (args[0] === 'ping') {
          var callback = args[2];
          if (typeof callback === 'function') {
            callback({
              gdprApplies: true,
              cmpLoaded: false,
              cmpStatus: 'stub',
              displayStatus: 'hidden',
              apiVersion: '2.2',
              tcfPolicyVersion: 2
            }, true);
          }
        } else {
          a.push(args);
        }
      };
      host.__tcfapi.a = a;
    }
    host.googlefc = host.googlefc || {};
    host.googlefc.callbackQueue = host.googlefc.callbackQueue || [];
  })();
</script>
```

### C. Footer "Privacy / Cookie Settings" Link & Revocation Trigger
Google requires publishers to give users an easy way to reopen their consent preferences at any time.

In `src/components/Footer.tsx`, the footer includes:
```tsx
<button onClick={handleCookieClick}>
  Privacy / Cookie Settings
</button>
```

When clicked, it invokes `reopenCmpSettings()` from `src/utils/cmpIntegration.ts`:
1. If Google Privacy & Messaging is active, it calls:
   `window.googlefc.showRevocationMessage()`
   This immediately opens the official Google-certified GDPR consent preferences dialog.
2. If pre-activation (no CMP script loaded yet), it gracefully navigates to `/cookies` where users and Google reviewers can inspect the zero-tracking policy and certified CMP status.

---

## 3. How to Connect Google AdSense Privacy & Messaging Later

Once your domain is submitted to Google AdSense:

### Step 1: Configure GDPR Message in AdSense Dashboard
1. Log in to [Google AdSense](https://adsense.google.com/).
2. In the left navigation, click **Privacy & messaging**.
3. Under **European regulations**, click **Create GDPR message** (or **Manage**).
4. Configure your site settings:
   - Select your site (e.g. `tempinbox.solutions`).
   - Add your Privacy Policy URL: `https://your-domain.com/privacy`.
   - Select the languages you want to support.
   - Choose your user choices (e.g., "Do not consent" button enabled, "Manage options" enabled).
5. Click **Publish**.

### Step 2: Enable the AdSense Tag in `index.html`
In `index.html`, locate the documented placeholder:

```html
<meta name="google-adsense-account" content="ca-pub-3405323116813893" />
<!-- When display ads are approved, add client parameter: -->
<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3405323116813893" crossorigin="anonymous"></script> -->
```

Google AdSense will automatically serve the certified CMP modal to users from the EEA, UK, and Switzerland upon page load.

### Step 3: Verify the Revocation Link
When the AdSense CMP is live, click **Privacy / Cookie Settings** in the footer. Google's consent dialog will immediately reopen via `window.googlefc.showRevocationMessage()`.

---

## 4. Strict Ad Separation Safeguards
- **Tool Pages Exempt**: The inbox, email generator, received message viewer, and risk calculator are strictly barred from displaying advertising tags or loading ad code (`isAdEligiblePage === false`).
- **Editorial Only**: Only long-form guides (`/guides`, `/guides/:slug`, `/about`, `/faq`) are eligible for contextual advertising.
- **Privacy Policy Excluded**: The `/privacy` policy page is strictly excluded from advertising units during consent flows.
