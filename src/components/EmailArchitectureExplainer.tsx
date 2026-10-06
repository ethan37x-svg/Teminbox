import React, { useState } from 'react';
import { 
  Server, Shield, Lock, Cpu, ArrowRight, CheckCircle2, AlertTriangle, 
  HelpCircle, ExternalLink, Code, Layers, Sparkles, RefreshCw, Zap, Eye
} from 'lucide-react';

export const EmailArchitectureExplainer: React.FC = React.memo(() => {
  const [activeProtocol, setActiveProtocol] = useState<'spf' | 'dkim' | 'dmarc' | 'tls' | 'tmpfs'>('spf');

  const protocols = {
    spf: {
      name: 'SPF (Sender Policy Framework)',
      rfc: 'RFC 7208',
      purpose: 'Authorizes which IP addresses are permitted to transmit mail for a sender domain.',
      mechanism: 'The receiving MTA extracts the MAIL FROM domain, issues a DNS TXT query for "v=spf1 ...", and tests the remote client IP against the authorized CIDR blocks.',
      verdict: 'TempInbox verifies incoming envelopes against publishing DNS records to instantly flag spoofed sender domains.',
      codeSample: `v=spf1 ip4:192.0.2.1 include:_spf.google.com ~all`,
    },
    dkim: {
      name: 'DKIM (DomainKeys Identified Mail)',
      rfc: 'RFC 6376',
      purpose: 'Provides cryptographic digital signature verification ensuring email content has not been tampered with in transit.',
      mechanism: 'The sender signs message headers and body with an RSA/Ed25519 private key. Receiving MTA queries public key via DNS ("s._domainkey.domain.com") and validates the cryptographic hash.',
      verdict: 'Prevents man-in-the-middle header tampering and guarantees sender authenticity for incoming verification OTP messages.',
      codeSample: `DKIM-Signature: v=1; a=rsa-sha256; d=service.com; s=202601; bh=47DEQpj8HBS...; b=kJ38...`,
    },
    dmarc: {
      name: 'DMARC (Domain-based Message Authentication)',
      rfc: 'RFC 7489',
      purpose: 'Specifies policy alignment and enforcement when SPF and/or DKIM checks fail.',
      mechanism: 'Verifies identifier alignment between "From:" header and SPF/DKIM domains. Enforces "p=none", "p=quarantine", or "p=reject" directives.',
      verdict: 'Guarantees strict enforcement against domain impersonation from fraudulent phishing actors.',
      codeSample: `v=DMARC1; p=reject; rua=mailto:dmarc-reports@service.com; pct=100; aspf=r`,
    },
    tls: {
      name: 'MTA-STS & Opportunistic TLS 1.3',
      rfc: 'RFC 8461 & RFC 8446',
      purpose: 'Enforces end-to-end transport layer encryption between transmitting mail servers and TempInbox edge gateways.',
      mechanism: 'Strict Cipher Suites (ECDHE-ECDSA-AES256-GCM-SHA384) protect mail envelopes from passive wiretapping on the public internet.',
      verdict: 'Ensures verification codes and sensitive emails cannot be intercepted across intermediary router hops.',
      codeSample: `STARTTLS: 220 2.0.0 Ready to start TLS (TLSv1.3 / Cipher: TLS_AES_256_GCM_SHA384)`,
    },
    tmpfs: {
      name: 'Volatile In-Memory Storage (RAM Only)',
      rfc: 'Zero-Persistence Security Constitution',
      purpose: 'Eliminates persistent storage risks by storing received message payloads exclusively in volatile system RAM.',
      mechanism: 'All messages, headers, and attachments reside in Linux tmpfs / RAM caches. When mailbox TTL expires, memory pages are zero-overwritten.',
      verdict: 'Zero disk persistence means no forensics traces remain once an inbox timer reaches zero.',
      codeSample: `mount -t tmpfs -o size=2G,noexec,nosuid,nodev tmpfs /var/tempinbox/cache`,
    },
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm transition-colors my-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Engineering Architecture & RFC Compliance</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          How TempInbox Operates: The Inbound SMTP Lifecycle
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
          Explore the exact protocol sequence that delivers disposable emails with sub-second latency while guaranteeing complete ephemeral isolation and zero non-volatile disk persistence.
        </p>
      </div>

      {/* 5-Step Visual Lifecycle Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        
        {/* Step 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">DNS MX Resolution</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              External sender MTA queries public DNS for <code className="text-blue-600 font-mono text-[10px]">mailhub.cc</code> MX records pointing to TempInbox edge gateway IP.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3">RFC 5321 (SMTP)</span>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">TLS 1.3 Transport</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Inbound edge proxy negotiates modern TLS 1.3 encryption, verifying sender certificate and preventing cleartext transmission.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3">RFC 8461 (MTA-STS)</span>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Security Verification</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Inbound engine executes SPF IP lookup, DKIM cryptographic signature verification, and DMARC alignment checks.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3">RFC 7208 / RFC 6376</span>
        </div>

        {/* Step 4 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">4</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">RAM-Only Ingestion</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Payload is buffered exclusively in volatile RAM cache. Extracted OTP verification codes are highlighted in &lt;400ms.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3">Zero-Disk Write</span>
        </div>

        {/* Step 5 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center">5</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Cryptographic Scrub</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Upon TTL expiry (1h-7d), memory pages are zero-overwritten. No disk journals, backups, or forensic artifacts remain.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3">GDPR Art. 17 Compliant</span>
        </div>

      </div>

      {/* Interactive Protocol Deep Dive Tabs */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/70 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Interactive Protocol Inspector: Cryptographic Verification</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click a standard to inspect how TempInbox validates email authenticity and blocks phishing.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-slate-200 dark:bg-slate-700 p-1 rounded-xl">
            {(['spf', 'dkim', 'dmarc', 'tls', 'tmpfs'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveProtocol(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                  activeProtocol === key
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Protocol Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                {protocols[activeProtocol].name}
              </h4>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                {protocols[activeProtocol].rfc}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <strong>Core Objective:</strong> {protocols[activeProtocol].purpose}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <strong>Evaluation Engine:</strong> {protocols[activeProtocol].mechanism}
            </p>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              ✓ {protocols[activeProtocol].verdict}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-x-auto flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase pb-2 mb-2 border-b border-slate-800">
                <span>Protocol Syntax Example</span>
                <span>Active Spec</span>
              </div>
              <pre className="text-blue-400 whitespace-pre-wrap break-all leading-relaxed text-[11px]">
                {protocols[activeProtocol].codeSample}
              </pre>
            </div>
            <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800 mt-3">
              Standardized under IETF Network Working Group.
            </div>
          </div>
        </div>

      </div>

      {/* Authoritative Comparison Table */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Architectural Comparison: Disposable Email vs Alternative Privacy Methods
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Objectively evaluating technical tradeoffs between disposable temp mail, plus-tagging, catch-all domains, and permanent webmail.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-3">Privacy Vector</th>
                <th className="p-3 text-blue-600 dark:text-blue-400 font-extrabold">TempInbox Disposable</th>
                <th className="p-3">Plus-Tagging (user+tag@)</th>
                <th className="p-3">Custom Catch-All Domain</th>
                <th className="p-3">Apple Hide My Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">Cross-Site Identity Correlation</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">100% Severed (Random Alias)</td>
                <td className="p-3 text-red-500">Trivially Stripped by regex</td>
                <td className="p-3 text-amber-500">Correlated via root domain</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">High (Random Relay)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">Registration Requirement</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">None (Instant 1-Click)</td>
                <td className="p-3">Requires Google/Outlook Account</td>
                <td className="p-3">Requires DNS & Domain Purchase</td>
                <td className="p-3">Requires Apple ID & iCloud+</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">Long-Term Data Leakage Risk</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Zero (Volatile RAM Purge)</td>
                <td className="p-3 text-red-500">Permanent disk retention</td>
                <td className="p-3 text-amber-500">Dependent on mail server host</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">Low (Relay forwarded)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">Recovery & Account Resets</td>
                <td className="p-3 text-red-500 font-bold">Prohibited (Self-Destructing)</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">Fully Supported</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">Fully Supported</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">Fully Supported</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">Ideal Use Cases</td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Trials, QA Testing, Gated Downloads</td>
                <td className="p-3">Basic inbox folder sorting</td>
                <td className="p-3">Tech-savvy corporate power users</td>
                <td className="p-3">Mobile iOS e-commerce checkouts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
});

EmailArchitectureExplainer.displayName = 'EmailArchitectureExplainer';
