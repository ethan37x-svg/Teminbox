import { BlogArticle } from '../../types';

export const post3: BlogArticle = {
  id: 'post-3',
  slug: 'anatomy-of-email-phishing-attack-spotting-spoofed-headers',
  title: 'Anatomy of an Email Phishing Attack: Spotting Spoofed Headers and Malicious Payloads',
  description: 'An in-depth cybersecurity breakdown of email header spoofing, DKIM/SPF failures, malicious attachment inspection, and zero-day link analysis.',
  imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  category: 'Security',
  author: 'Dr. Robert Vance, Senior Network Security Engineer',
  readTime: '14 min read',
  date: 'July 30, 2026',
  tags: ['Phishing', 'Cybersecurity', 'Email Headers', 'SPF', 'DKIM', 'DMARC', 'Malware Protection'],
  tableOfContents: [
    'Introduction: The Evolution of Social Engineering',
    'Deconstructing Raw SMTP Email Headers',
    'Understanding Domain Authentication: SPF, DKIM, and DMARC',
    'Anatomy of a Spoofed Phishing Header (Real-World Breakdown)',
    'Inspecting Malicious Payloads Safely: Links, Homographs, and Attachments',
    'How Disposable Temp Mail Acts as a Circuit Breaker Against Phishing',
    'Actionable Checklist for Spotting Phishing Messages',
    'Conclusion & Summary',
  ],
  content: `### Introduction: The Evolution of Social Engineering

Email remains the single most common entry vector for enterprise cyber attacks. According to the CISA Cybersecurity & Infrastructure Security Agency, over **90% of targeted corporate cyber attacks and ransomware breaches begin with a spear-phishing email**.

Modern cybercriminals no longer rely on obvious, poorly written emails claiming you have won a foreign lottery. Instead, contemporary phishing campaigns deploy sophisticated social engineering techniques:
- **Display Name Spoofing**: Mimicking trusted organizations (e.g., "PayPal Security", "Microsoft 365 Admin", "Your Bank").
- **Lookalike Homograph Domains**: Registering domains with subtle Unicode character substitutions (e.g., paypaI.com using a capital 'i' instead of an 'l').
- **Urgent Call-to-Action Lures**: Threatening account suspension or fake unauthorized charges to induce panic.

In this cybersecurity breakdown, we analyze the raw technical structure of email messages—examining envelope headers, cryptographic signature verification (SPF, DKIM, DMARC), and safe inspection practices.

---

### Deconstructing Raw SMTP Email Headers

To the average user, an email consists of three visible fields: **From**, **Subject**, and **Body**. However, behind the scenes, every email contains an extensive block of metadata known as **Raw SMTP Headers**.

#### Key Header Fields Explained
- **Received**: A sequential trace log recorded by every Mail Transfer Agent (MTA) server that handled the message from origin to destination.
- **Return-Path**: The actual envelope bounce address designated by the sending mail server.
- **From**: The user-facing display header (easily forged by malicious senders).
- **Authentication-Results**: The destination server's audit log evaluating cryptographic authentication protocols.

---

### Understanding Domain Authentication: SPF, DKIM, and DMARC

To combat sender forgery, the email industry developed three core authentication standards:

#### 1. SPF (Sender Policy Framework)
SPF allows domain owners to publish a list of authorized IP addresses in DNS records. When a mail server receives an email claiming to come from example.com, it checks if the sender's IP address matches the domain's SPF record.

#### 2. DKIM (DomainKeys Identified Mail)
DKIM attaches a cryptographic digital signature to outgoing email headers. The receiving server retrieves the domain's public key from DNS and verifies that the body payload was not tampered with in transit.

#### 3. DMARC (Domain-based Message Authentication, Reporting & Conformance)
DMARC links SPF and DKIM together, giving domain owners explicit control over how receiving servers handle unauthenticated mail (e.g., quarantine or reject).

---

### Anatomy of a Spoofed Phishing Header (Real-World Breakdown)

Let us examine a real-world raw email header from a spoofed phishing attempt targeting an online banking user:

\`\`\`http
Received: from mail.attacker-host.net (mail.attacker-host.net [192.0.2.45])
    by mx.tempinbox.org (postfix/MTA) with ESMTPS id 4Sl8x9021
    for <x9k2p7@mailhub.cc>; Wed, 29 Jul 2026 14:22:10 -0400
Received-SPF: softfail (google.com: domain of transition12@attacker-host.net does not designate 192.0.2.45 as permitted sender)
Authentication-Results: mx.tempinbox.org;
    spf=softfail (sender IP 192.0.2.45);
    dkim=fail header.i=@yourbank.com;
    dmarc=fail (p=REJECT) action=quarantine;
From: "Your Bank Security" <support@yourbank.com>
To: x9k2p7@mailhub.cc
Subject: URGENT: Fraudulent Transaction Detected - Verify Now
Date: Wed, 29 Jul 2026 18:22:05 +0000
Message-ID: <8492019482.104820@attacker-host.net>
Reply-To: security-audit-team@phishing-landing-page.com
Content-Type: text/html; charset="UTF-8"
\`\`\`

#### Key Vulnerability Markers Identified in the Header
1. **Header Mismatch**: The From header claims support@yourbank.com, but the connecting IP belongs to mail.attacker-host.net.
2. **Cryptographic Failures**: Both SPF and DKIM report explicit failures (spf=softfail, dkim=fail).
3. **Mismatched Reply-To Address**: Replying to this email sends messages to security-audit-team@phishing-landing-page.com rather than your bank's legitimate domain.

---

### How Disposable Temp Mail Acts as a Circuit Breaker Against Phishing

Using **TempInbox** disposable inboxes acts as an automated security circuit breaker against phishing campaigns:

1. **Zero Credential Exposure**: Phishing attacks succeed by tricking users into revealing primary account credentials. Using a temporary address ensures attackers never obtain your primary email.
2. **Short-Lived Threat Windows**: Because TempInbox addresses expire automatically, phishing messages targeting old burner addresses are dropped automatically by server gateways.
3. **Isolated Sandbox Execution**: Viewing suspicious verification emails inside a throwaway sandbox prevents malicious tracking pixels from linking activity to your personal identity.

---

### Actionable Checklist for Spotting Phishing Messages

1. Always inspect the actual sender email domain address, not just the display name.
2. Hover over links before clicking to verify the destination URL hostname.
3. Be wary of high-pressure urgent threats demanding immediate action.
4. Verify authentication headers or use TempInbox for unverified web registrations.`,
};
