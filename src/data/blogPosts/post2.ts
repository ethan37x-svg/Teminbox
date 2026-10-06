import { BlogArticle } from '../../types';

export const post2: BlogArticle = {
  id: 'guide-2',
  slug: 'how-temporary-email-works',
  title: 'How Temporary Email Works: Under-the-Hood Architecture',
  description: 'A deep-dive technical explanation of SMTP protocol routing, DNS MX records, ephemeral in-memory storage, and real-time message delivery in modern disposable email systems.',
  imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  category: 'Security',
  author: 'Marcus Vance, Systems Architect',
  readTime: '7 min read',
  date: 'October 4, 2026',
  tags: ['SMTP Protocol', 'Mail Routing', 'In-Memory Storage', 'Email Architecture', 'DNS MX Records'],
  tableOfContents: [
    'Introduction: The Lifecycle of an Ephemeral Message',
    'Step 1: Domain Setup and DNS Mail Exchange (MX) Records',
    'Step 2: The Inbound SMTP Handshake (RFC 5321)',
    'Step 3: Ephemeral RAM Buffering vs. Persistent Database Writes',
    'Step 4: Automated Parsing and OTP Verification Extraction',
    'Step 5: Streaming Messages to Your Browser (SSE & Polling)',
    'Step 6: Time-To-Live Expiration and Memory Deallocation',
    'Architectural Safeguards: Why Outbound Relaying Is Blocked',
    'Frequently Asked Questions (FAQ)',
    'Conclusion & Related Reading',
  ],
  content: `### Introduction: The Lifecycle of an Ephemeral Message

When you load TempInbox, click "Copy Address," and submit that address to a web application, an email containing an account confirmation link appears on your screen within three seconds.

To the user, this process feels instantaneous and simple. Behind the scenes, however, a sophisticated sequence of internet networking protocols, cryptographic checks, domain name routing, and memory management daemons coordinates in real time.

This technical guide unpacks the entire architectural lifecycle of a disposable email message, explaining how SMTP mail transfer agents, DNS MX records, and ephemeral volatile buffers work together to deliver messages without permanent storage.

---

### Step 1: Domain Setup and DNS Mail Exchange (MX) Records

Before any email can reach a disposable mailbox, internet mail routing requires proper DNS configuration:

\`\`\`
example.com (Sending Mail Server)
      │
      ▼ Queries DNS for MX Records of "tempinbox.org"
DNS Root Servers / Nameservers
      │
      ▼ Returns MX Record
tempinbox.org IN MX 10 edge.tempinbox.org (IP: 198.51.100.42)
\`\`\`

1. **MX Record Delegation:** The temporary email operator configures Mail Exchange (MX) records on routing domains such as \`tempinbox.org\` and \`mailhub.cc\`.
2. **Priority Ordering:** External email servers (such as those operated by SendGrid, Postmark, or Mailgun) query these MX records to locate the IP address of the listening SMTP edge gateway.

---

### Step 2: The Inbound SMTP Handshake (RFC 5321)

When an external sending server connects to our edge daemon on standard mail ports (Port 25 or Port 587), a standardized SMTP conversational handshake begins:

\`\`\`text
Sender:  EHLO mail.sender.com
Gateway: 250-edge.tempinbox.org Hello
Sender:  MAIL FROM:<newsletter@brand.com>
Gateway: 250 2.1.0 Ok
Sender:  RCPT TO:<x9k2p7@mailhub.cc>
Gateway: 250 2.1.5 Recipient Ok
Sender:  DATA
Gateway: 354 End data with <CR><LF>.<CR><LF>
Sender:  [Transmits MIME payload, headers, body, attachments]
Gateway: 250 2.0.0 Ok: queued in volatile memory
Sender:  QUIT
Gateway: 221 2.0.0 Bye
\`\`\`

During the \`RCPT TO\` phase, our daemon verifies that the recipient domain matches an active routing pool. If verified, the server accepts the payload.

---

### Step 3: Ephemeral RAM Buffering vs. Persistent Database Writes

The critical technical difference between a conventional email service (like Google Workspace or Microsoft Exchange) and an ephemeral temporary email architecture lies in **where the payload is stored**:

- **Conventional Mail Architecture:** The message body is written to persistent hard disk arrays, replicated across distributed relational database clusters (e.g., PostgreSQL or Cassandra), indexed in search caches, and backed up to offline tape storage.
- **TempInbox Ephemeral Architecture:** The parsed MIME message is stored strictly inside **volatile process memory (RAM)** in an in-memory key-value map. The payload is never serialized to a hard drive or written to disk-backed databases.

\`\`\`
Incoming SMTP Stream ──► Memory Parse Daemon ──► RAM Buffer (Map<string, StoredMessage[]>)
                                                          │
                                         ┌────────────────┴────────────────┐
                                         ▼                                 ▼
                               User Browser Sync                 60s TTL Eviction Loop
\`\`\`

If the temporary mail server process restarts or encounters a power cycle, the in-memory map is wiped instantly, guaranteeing zero disk footprint.

---

### Step 4: Automated Parsing and OTP Verification Extraction

Once the raw RFC 5322 MIME stream is accepted in memory, an internal parser processes the components:

1. **Header Verification:** Inspects SPF, DKIM, and DMARC headers to evaluate whether the sending domain signature matches the envelope sender.
2. **Body Sanitization:** Strips potentially dangerous JavaScript snippets, malicious tracking redirects, and remote iframes to ensure secure browser rendering.
3. **Regex OTP Detection:** A dedicated pattern parser scans the message subject and plain text for 4-to-8 digit verification codes (e.g., \`\\b\\d{4,8}\\b\`), extracting confirmation tokens so users can copy codes instantly without scrolling through long marketing footers.

---

### Step 5: Streaming Messages to Your Browser (SSE & Polling)

To display incoming mail in real time without requiring manual page refreshes, the client web application communicates with the edge API via automated synchronization loops:

- The frontend dashboard issues background requests to \`/api/v1/inbox?address=user@domain.com\`.
- If a new in-memory message pointer is detected for that mailbox address, the JSON payload is dispatched to the browser's local state and rendered in the inbox table.

---

### Step 6: Time-To-Live Expiration and Memory Deallocation

Every mailbox is created with an explicit expiration timestamp (\`expiresAt = createdAt + durationHours\`).

A scheduled background garbage collection task runs every 60 seconds on the server:
\`\`\`typescript
setInterval(() => {
  const now = Date.now();
  for (const [address, box] of mailboxes.entries()) {
    if (now > box.expiresAt) {
      mailboxes.delete(address);
      messages.delete(address); // Releases memory allocations
    }
  }
}, 60 * 1000);
\`\`\`

When the expiration threshold is crossed, the reference pointers are purged from the memory map, allowing the runtime garbage collector to reclaim the memory heap.

---

### Architectural Safeguards: Why Outbound Relaying Is Blocked

A common question from users is why temporary email platforms do not provide a "Compose" button to send emails to external recipients.

The reason is network integrity:
- If disposable services permitted outbound SMTP sending, automated botnets would immediately exploit the servers to distribute phishing lures, spam blasts, and malware attachments.
- Major internet service providers and spam monitoring bodies (such as Spamhaus and Barracuda) would rapidly blacklist the service's IP addresses.
- By strictly enforcing an **inbound-only mail relay policy**, temporary mail systems maintain clean server reputations, ensuring that incoming transactional emails and verification tokens are reliably accepted by sending platforms.

---

### Frequently Asked Questions (FAQ)

#### Does TempInbox keep log files of message contents?
No. Diagnostic system logs only monitor high-level traffic counters (e.g., total connections, memory utilization, and uptime). Message bodies, attachments, and recipient addresses are held strictly in volatile RAM and are excluded from permanent server logging.

#### What happens if the server loses power?
Because message contents are held in volatile system RAM rather than persistent hard drives, any power cycle or system restart immediately resets the memory heap, permanently clearing all stored payloads.

#### Can someone read my incoming email?
Because temporary inboxes operate without personal passwords, anyone who generates the exact same address during an active session could view delivered messages. For this reason, never receive personal, financial, or confidential information in a disposable inbox.

---

### Conclusion & Related Reading

Understanding how temporary email operates reveals why it is both remarkably efficient and bounded by specific operational limits.

To learn more about how disposable email differs from permanent forwarding aliases, read our comparison: [Temporary Email vs Email Alias: What's the Difference?](/guides/temporary-email-vs-email-alias). To test the system in action, generate a real-time address on the [TempInbox Generator](/).`,
};
