export interface FAQItem {
  question: string;
  answer: string;
  category: 'Privacy & Identity' | 'Protocols & Architecture' | 'Testing & APIs' | 'Usage Boundaries' | 'Legal & AdSense';
}

export const faqList: FAQItem[] = [
  {
    category: 'Privacy & Identity',
    question: 'What is a temporary disposable email address and how does it protect my identity?',
    answer: 'A temporary disposable email address is an ephemeral, short-lived inbox created on demand without requiring personal identification, telephone verification, or passwords. In modern web telemetry, your primary email address serves as a universal identifier across ad tech networks, social platforms, and data brokers. Using an ephemeral address isolates non-critical accounts and free trials, preventing corporate trackers from linking your browsing history and ensuring your primary email remains absent from dark web data breach databases.',
  },
  {
    category: 'Privacy & Identity',
    question: 'How long does a TempInbox address remain active, and can I extend it?',
    answer: 'You can configure an initial mailbox duration of 1 hour, 3 hours, 6 hours, 12 hours, 24 hours, 2 days, 3 days, 5 days, or 7 days. At any point prior to the timer reaching zero, you can click "Extend Duration (+24h)" to add operational time. When the timer expires, an automated memory scrubber overwrites volatile storage pages, permanently deleting all messages and attachments.',
  },
  {
    category: 'Protocols & Architecture',
    question: 'How does TempInbox process incoming emails under IETF standards?',
    answer: 'TempInbox operates custom edge Mail Transfer Agents (MTAs) conforming strictly to RFC 5321 (Simple Mail Transfer Protocol). When an external sender transmits a message, our edge nodes verify DNS MX records, negotiate opportunistic TLS 1.3 encryption, and validate cryptographic authentication headers including SPF (RFC 7208), DKIM (RFC 6376), and DMARC (RFC 7489) before delivering the message payload to your browser via WebSockets in under 400 milliseconds.',
  },
  {
    category: 'Protocols & Architecture',
    question: 'Where are incoming emails stored, and what is your zero-persistence guarantee?',
    answer: 'All incoming emails, MIME headers, and attachments are held exclusively in volatile system RAM (Linux tmpfs partitions). TempInbox enforces a strict Zero-Persistence Architecture: messages are never written to non-volatile hard disk drives, databases are never backed up to cold storage, and no long-term server logs containing message bodies are maintained. Once an address expires or is deleted, its memory pages are zero-filled.',
  },
  {
    category: 'Testing & APIs',
    question: 'Can software engineers and QA automation teams use TempInbox for E2E testing?',
    answer: 'Yes. TempInbox provides a high-performance RESTful API engineered specifically for end-to-end integration testing frameworks including Playwright, Cypress, Selenium, and Puppeteer. Automated suites can programmatically generate isolated mailboxes (/api/v1/generate), query incoming messages (/api/v1/inbox), and retrieve pre-parsed 4-to-8 digit OTP verification codes directly from the JSON payload.',
  },
  {
    category: 'Testing & APIs',
    question: 'Can I choose a custom username or specific domain prefix?',
    answer: 'Yes. In addition to 1-click cryptographically random addresses, TempInbox allows you to select custom prefixes (e.g., qa_test_checkout@mailhub.cc) across multiple active domain options (mailhub.cc, quickmail.live, flashmail.email, tempinbox.org, swiftbox.me). This allows developers to assign human-readable labels to specific automated test pipelines.',
  },
  {
    category: 'Usage Boundaries',
    question: 'Can I send or reply to emails from my temporary inbox?',
    answer: 'No. TempInbox operates strictly as an INBOUND receiver. Outbound message transmission (SMTP relaying) is completely disabled across our entire network. This architectural decision prevents bad actors from weaponizing temporary domains for spam campaigns, credential phishing, or botnet abuse, preserving high deliverability and reputable domain standing with major providers.',
  },
  {
    category: 'Usage Boundaries',
    question: 'Why is it strictly prohibited to use TempInbox for banking, healthcare, or 2FA accounts?',
    answer: 'Because temporary mailboxes are self-destructing and ephemeral, they must never be used for critical accounts requiring persistent recovery channels (e.g., primary banking, cryptocurrency exchanges, health portals, government services, or password-reset anchors). Once a temporary mailbox reaches its expiration deadline, its cryptographic address cannot be recovered, and any subsequent password reset tokens sent to that address will bounce.',
  },
  {
    category: 'Usage Boundaries',
    question: 'How does TempInbox detect and score incoming spam and phishing payloads?',
    answer: 'Every incoming MIME payload is inspected by our dual-engine security pipeline: an edge heuristic analyzer evaluating suspicious lexical keywords, urgency vectors, and suspicious links, paired with a Gemini-powered deep security scanner that evaluates phishing risk, spoofing vectors, and attachment mime-type safety, scoring each message from 0 (Clean) to 100 (Critical Risk).',
  },
  {
    category: 'Legal & AdSense',
    question: 'How is TempInbox funded, and how do you ensure compliance with Google AdSense policies?',
    answer: 'TempInbox is 100% free to all global users. We fund our high-availability edge server infrastructure and domain renewals through contextual display advertising managed via Google AdSense. We adhere rigorously to Google Publisher Policies: all ad units are distinctly labeled as "ADVERTISEMENT", placed outside interactive workflow zones to prevent accidental clicks, and we strictly prohibit deceptive content, thin value, or intrusive ad placements.',
  },
  {
    category: 'Legal & AdSense',
    question: 'Does TempInbox scan, sell, or monetize user email content for advertising?',
    answer: 'Absolutely not. TempInbox maintains zero commercial telemetry. We never sell, rent, or distribute received email contents, metadata, or IP logs to advertisers, data aggregators, or third-party marketing brokers. Display advertisements served by Google AdSense operate independently of ephemeral email contents.',
  },
  {
    category: 'Legal & AdSense',
    question: 'How does TempInbox comply with GDPR (EU 2016/679) and CCPA / CPRA data privacy rights?',
    answer: 'TempInbox embodies "Privacy by Design" (GDPR Article 25) and complies with the Right to Erasure (GDPR Article 17) through automated memory purge lifecycles. Because we do not mandate user account creation, collect names, or store persistent profiles, no personally identifiable data (PII) is retained beyond the chosen temporary mailbox duration. European and Californian users can also customize cookie consent choices at any time via our Cookie Settings dashboard.',
  },
  {
    category: 'Privacy & Identity',
    question: 'Can someone else access or guess my temporary mailbox address?',
    answer: 'Randomly generated addresses utilize 7+ character cryptographically random alphanumeric strings across multiple domain pools (over 78 billion mathematical permutations per domain), making blind brute-force guessing practically impossible. For custom usernames, users are advised to choose distinctive prefixes for non-sensitive testing.',
  },
  {
    category: 'Protocols & Architecture',
    question: 'What happens if a sender MTA experiences an SMTP delivery retry delay?',
    answer: 'Our inbound edge gateways respond with immediate 250 OK status codes upon complete DATA transmission, preventing remote MTAs from invoking greylisting delays. However, third-party sending services (such as bulk marketing software) may introduce internal dispatch queue delays before initiating the first SMTP connection.',
  },
  {
    category: 'Testing & APIs',
    question: 'Are attachments supported, and can I download complete raw RFC 5322 MIME messages (.eml)?',
    answer: 'Yes. TempInbox accepts MIME multipart payloads, parses common safe attachments (PDF, plain text, images), and provides a one-click "Download .EML" feature. This allows security analysts and software testers to examine raw cryptographic headers, MIME boundaries, and message signatures in offline forensics utilities.',
  },
  {
    category: 'Usage Boundaries',
    question: 'How can copyright holders or domain administrators report abuse or malicious activity?',
    answer: 'We maintain zero tolerance for unlawful exploitation. If you observe abuse, automated abuse scripts, or trademark infringement, you can contact our dedicated security team directly at abuse@tempinbox.org or support@tempinbox.org. We implement rapid domain blocking, IP rate-limiting, and cooperate with law enforcement in accordance with applicable legal frameworks.',
  },
];
