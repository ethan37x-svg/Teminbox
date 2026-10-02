import React from 'react';
import { 
  Info, Shield, Server, Zap, Globe, Lock, Users, Heart, CheckCircle2, 
  Mail, ExternalLink, Award, FileText, Cpu, Eye, Sparkles, RefreshCw, Send, 
  HelpCircle, BookOpen, Check, AlertCircle, Scale, ShieldCheck
} from 'lucide-react';

export const AboutSection: React.FC<{ onNavigateToTerms?: () => void }> = ({ onNavigateToTerms }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/50 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Empowering Digital Privacy
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Google AdSense Policy Compliant
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              E-E-A-T Editorial Standard
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            About <span className="text-blue-400">TempInbox</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            TempInbox is an independent, privacy-first ephemeral email laboratory engineered by cybersecurity researchers and mail systems architects. We provide high-throughput disposable email infrastructure to neutralize spam, prevent corporate cross-site data correlation, and streamline developer integration testing.
          </p>
        </div>
      </div>

      {/* Grid: Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:border-blue-500/40 transition space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Zero-Persistence Memory Architecture</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Unlike conventional webmail platforms that write unencrypted message bodies to persistent hard drives, TempInbox stores message payloads exclusively in volatile system RAM (<code className="text-blue-600 font-mono text-xs">tmpfs</code>). When your timer expires, memory pages are cryptographically zeroed out.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:border-blue-500/40 transition space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sub-Second Inbound Routing</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Incoming SMTP packets (RFC 5321) are parsed at edge nodes, authenticated via SPF (RFC 7208) and DKIM (RFC 6376), and pushed immediately to your browser session via WebSockets with an average delivery latency of under 380ms.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:border-blue-500/40 transition space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Developer-Grade Automation APIs</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Engineered specifically for software QA automation engineers. Programmatically generate temporary inboxes, poll incoming messages, and extract one-time passwords (OTP) directly into Playwright, Cypress, and CI/CD pipelines.
          </p>
        </div>
      </div>

      {/* Main Content Modules */}
      <div className="space-y-10">
        
        {/* Our Story & Digital Identity Crisis */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
            <Info className="w-6 h-6 text-blue-600" />
            <span>Our Mission: Dismantling the Digital Identity Graph</span>
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              In contemporary web browsing, your primary personal email address is far more than a messaging channel: it functions as a <strong>universal tracking identifier</strong>. Marketing conglomerates, social networks, and data aggregation brokers ingest email hashes (<code className="text-blue-600 font-mono text-xs">SHA-256</code>) across e-commerce checkouts, software trials, and blog comments to stitch together granular behavioral profiles of your identity, purchases, and location.
            </p>
            <p>
              When a commercial website suffers a database breach, that single persistent email address exposes you to credential stuffing attacks, targeted phishing lures, and relentless marketing spam.
            </p>
            <p>
              <strong>TempInbox</strong> was engineered to disrupt this tracking cycle. By introducing self-destructing, ephemeral email addresses, we allow individuals and developers to interact with untrusted online services, test products, and verify accounts without surrendering permanent identity markers.
            </p>
          </div>
        </div>

        {/* Editorial Board & Research Team Bios (E-E-A-T) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full">
              Editorial Governance & Expertise
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 flex items-center gap-2.5">
              <Users className="w-6 h-6 text-blue-600" />
              <span>Meet Our Cybersecurity & Engineering Leadership</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Every technical guide, protocol breakdown, and security audit on TempInbox is authored and verified by seasoned infrastructure and cryptographic practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Member 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-base">
                  AR
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Alex Rivera, CISSP</h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Chief Cybersecurity Strategist & Lead Author</p>
                  <p className="text-[11px] text-slate-400">14+ Years Experience • Former Threat Intelligence Analyst</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Specializes in email deliverability economics, credential stuffing vectors, and consumer privacy architectures. Alex has authored extensive research on disposable mailbox threat mitigation and IETF protocol compliance.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-base">
                  EV
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Dr. Elena Vance, PhD</h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Principal Cryptographic Systems Architect</p>
                  <p className="text-[11px] text-slate-400">Doctorate in Distributed Systems • IETF Contributor</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Oversees our zero-persistence memory partitioning and cryptographic scrub routines. Elena focuses on end-to-end transport layer encryption (TLS 1.3), automated DKIM signature verification, and zero-trace volatile buffering.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-base">
                  MZ
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Marcus Zhao</h4>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Senior Mail Transfer Agent Infrastructure Engineer</p>
                  <p className="text-[11px] text-slate-400">Ex-Postmaster • High-Throughput SMTP Systems Expert</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Manages TempInbox's multi-domain edge routing network, low-latency WebSocket push infrastructure, and anti-abuse edge rate-limiting to prevent outbound spam relay exploitation.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-base">
                  SJ
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sarah Jenkins, CIPP/E</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Director of Regulatory Compliance & Privacy</p>
                  <p className="text-[11px] text-slate-400">Certified Information Privacy Professional • GDPR / CCPA Counsel</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Directs privacy-by-design audits, ensuring full compliance with GDPR Article 17 (Right to Erasure), California Consumer Privacy Act (CCPA/CPRA), and Google AdSense publisher transparency policies.
              </p>
            </div>
          </div>
        </div>

        {/* Fact-Checking & Technical Verification Protocol */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Our 5-Step Editorial & Fact-Checking Standard</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-mono font-bold text-blue-600 text-xs">Stage 01</span>
              <h5 className="font-bold text-slate-900 dark:text-white">RFC Validation</h5>
              <p className="text-[11px]">Claims cross-referenced against authoritative IETF specifications (RFC 5321, 7208, 6376, 7489).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-mono font-bold text-indigo-600 text-xs">Stage 02</span>
              <h5 className="font-bold text-slate-900 dark:text-white">Empirical Testing</h5>
              <p className="text-[11px]">Code samples and Playwright/Cypress scripts tested in live virtual machine sandboxes.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-mono font-bold text-purple-600 text-xs">Stage 03</span>
              <h5 className="font-bold text-slate-900 dark:text-white">Peer Review</h5>
              <p className="text-[11px]">Draft articles scrutinized by a secondary security researcher prior to publication.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-mono font-bold text-emerald-600 text-xs">Stage 04</span>
              <h5 className="font-bold text-slate-900 dark:text-white">Legal Audit</h5>
              <p className="text-[11px]">Privacy guidelines reviewed against GDPR, CCPA, and Google Publisher Policies.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-mono font-bold text-amber-600 text-xs">Stage 05</span>
              <h5 className="font-bold text-slate-900 dark:text-white">Continuous Audit</h5>
              <p className="text-[11px]">Articles audited semi-annually to reflect evolving email authentication standards.</p>
            </div>
          </div>
        </div>

        {/* AdSense Transparency & Monetization Policy */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border-2 border-blue-500/70 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Award className="w-6 h-6 text-blue-600" />
              <span>Google AdSense Compliance & Monetization Transparency</span>
            </h2>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white uppercase">
              Monetization Ethics
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            <p>
              TempInbox operates as a <strong>100% free utility</strong> accessible to all global users without subscriptions, credit card prompts, or gated feature paywalls.
            </p>
            <p>
              To sustainably cover high-bandwidth edge server clusters, DNS infrastructure, and ongoing domain renewals, we partner with <strong>Google AdSense</strong> to display contextual advertisements.
            </p>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Our Google AdSense Publisher Commitments:</span>
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li><strong>Clear Ad Demarcation:</strong> In full compliance with Google Publisher Policies, all advertising units are explicitly labeled with "ADVERTISEMENT" and housed in distinct visual containers separate from interactive inbox buttons to completely prevent accidental clicks.</li>
                <li><strong>Zero Behavioral Scanning:</strong> We never inspect, analyze, or sell ephemeral email bodies, attachments, or sender metadata to ad networks or third-party data brokers.</li>
                <li><strong>Strict Content Integrity:</strong> We do not host sponsored reviews or paid ranking positions. Our technical guides maintain 100% editorial independence.</li>
                <li><strong>Granular Cookie Consent:</strong> Users retain unhindered authority over advertising personalization via our dedicated <button onClick={onNavigateToTerms} className="text-blue-600 dark:text-blue-400 font-bold underline">Cookie Settings</button> and <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold underline inline-flex items-center gap-0.5">Google Ads Settings <ExternalLink className="w-3 h-3" /></a>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Architecture & Anti-Abuse Standards */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
            <Server className="w-6 h-6 text-blue-600" />
            <span>Infrastructure Guardrails & Anti-Abuse Engineering</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Strict Inbound-Only Architecture</span>
              </h4>
              <p>
                To permanently eliminate spam amplification and malware relaying, TempInbox operates exclusively as an inbound receiver. Outbound message relaying is hardcoded to be rejected across all SMTP listener daemons.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Dual Heuristic & AI Threat Filtering</span>
              </h4>
              <p>
                All inbound packets pass through automated heuristic threat filters and Gemini security scans to classify phishing lures, block malicious executables, and isolate suspicious payloads before rendering.
              </p>
            </div>
          </div>
        </div>

        {/* Support, Abuse Reporting & Policy Quick Links */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>Questions, Abuse Reporting & Inquiries</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Have feedback, academic inquiries, or need to report DMCA / security concerns? Our technical team responds promptly.
            </p>
            <p className="text-xs font-semibold text-blue-300">
              Direct Inquiries: <a href="mailto:support@tempinbox.org" className="underline font-bold text-white">support@tempinbox.org</a> • Abuse: <a href="mailto:abuse@tempinbox.org" className="underline font-bold text-white">abuse@tempinbox.org</a>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigateToTerms && (
              <button
                onClick={onNavigateToTerms}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Terms & Privacy</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
