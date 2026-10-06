import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Calculator, Sparkles, 
  Lock, Eye, Mail, Database, Info, Layers, CheckCircle2, HelpCircle,
  FileQuestion, Shield
} from 'lucide-react';

type ExposureIndicatorLevel = 'low' | 'moderate' | 'high';

interface FactorAnalysis {
  name: string;
  level: ExposureIndicatorLevel;
  levelLabel: string;
  summary: string;
  explanation: string;
}

export const EmailExposureRiskCalculator: React.FC = React.memo(() => {
  // Educational scenario inputs
  const [accountCount, setAccountCount] = useState<number>(35);
  const [trialFrequency, setTrialFrequency] = useState<number>(3); // per month
  const [newsletterSubCount, setNewsletterSubCount] = useState<number>(12);
  const [reusePassword, setReusePassword] = useState<'never' | 'sometimes' | 'always'>('sometimes');
  const [usePublicWifi, setUsePublicWifi] = useState<boolean>(true);
  const [checkedBreachArchives, setCheckedBreachArchives] = useState<boolean>(false);

  // Evaluate factors into educational exposure indicator categories
  const evaluateFactors = (): {
    factors: FactorAnalysis[];
    overallLevel: ExposureIndicatorLevel;
    overallLabel: string;
    lowCount: number;
    moderateCount: number;
    highCount: number;
  } => {
    const factors: FactorAnalysis[] = [];

    // Factor 1: Account Surface Area
    if (accountCount <= 15) {
      factors.push({
        name: 'Account Surface Area',
        level: 'low',
        levelLabel: 'Low exposure indicators',
        summary: `${accountCount} registered accounts`,
        explanation: 'Fewer registered accounts create a compact digital footprint. Having a smaller number of services linked to your primary address limits exposure if any single platform suffers an unauthorized incident.',
      });
    } else if (accountCount <= 50) {
      factors.push({
        name: 'Account Surface Area',
        level: 'moderate',
        levelLabel: 'Moderate exposure indicators',
        summary: `${accountCount} registered accounts`,
        explanation: 'Reflects typical consumer usage. As your email is stored across dozens of service providers with diverse security standards, your identity surface area expands proportionally.',
      });
    } else {
      factors.push({
        name: 'Account Surface Area',
        level: 'high',
        levelLabel: 'High exposure indicators',
        summary: `${accountCount} registered accounts`,
        explanation: 'A large account portfolio links your primary address to many independent commercial entities, making your address an active universal identifier across diverse databases.',
      });
    }

    // Factor 2: One-time trials & ephemeral signups
    if (trialFrequency <= 1) {
      factors.push({
        name: 'Untrusted & Trial Signups',
        level: 'low',
        levelLabel: 'Low exposure indicators',
        summary: `${trialFrequency} trial signups / mo`,
        explanation: 'Limiting primary email submissions to established, trusted services prevents your contact information from circulating into third-party affiliate lead exchanges.',
      });
    } else if (trialFrequency <= 5) {
      factors.push({
        name: 'Untrusted & Trial Signups',
        level: 'moderate',
        levelLabel: 'Moderate exposure indicators',
        summary: `${trialFrequency} trial signups / mo`,
        explanation: 'Regularly providing an address for downloadable assets or trial tools exposes contact details to secondary marketing automation platforms with varied privacy policies.',
      });
    } else {
      factors.push({
        name: 'Untrusted & Trial Signups',
        level: 'high',
        levelLabel: 'High exposure indicators',
        summary: `${trialFrequency} trial signups / mo`,
        explanation: 'Frequent signups with short-lived or unvetted providers represent a common route for an email address to be indexed, sold, or shared with commercial lead lists.',
      });
    }

    // Factor 3: Active Subscriptions & Newsletters
    if (newsletterSubCount <= 5) {
      factors.push({
        name: 'Marketing Influx & Trackers',
        level: 'low',
        levelLabel: 'Low exposure indicators',
        summary: `${newsletterSubCount} active subscriptions`,
        explanation: 'Minimal commercial newsletter volume reduces exposure to open-tracking pixels, third-party analytics trackers, and unwanted marketing broadcasts.',
      });
    } else if (newsletterSubCount <= 20) {
      factors.push({
        name: 'Marketing Influx & Trackers',
        level: 'moderate',
        levelLabel: 'Moderate exposure indicators',
        summary: `${newsletterSubCount} active subscriptions`,
        explanation: 'Moderate promotional mail flow is common. Marketing emails frequently embed invisible 1x1 tracking pixels that log your IP address, user agent, and open times.',
      });
    } else {
      factors.push({
        name: 'Marketing Influx & Trackers',
        level: 'high',
        levelLabel: 'High exposure indicators',
        summary: `${newsletterSubCount} active subscriptions`,
        explanation: 'High volume of promotional senders increases mailbox noise, making deceptive phishing or impersonation messages harder to distinguish from legitimate notices.',
      });
    }

    // Factor 4: Credential Hygiene & Password Reuse
    if (reusePassword === 'never') {
      factors.push({
        name: 'Credential Isolation',
        level: 'low',
        levelLabel: 'Low exposure indicators',
        summary: 'Unique passwords across all platforms',
        explanation: 'Strict credential isolation prevents cascading unauthorized access. If an auxiliary service is breached, the compromised password cannot unlock your other accounts.',
      });
    } else if (reusePassword === 'sometimes') {
      factors.push({
        name: 'Credential Isolation',
        level: 'moderate',
        levelLabel: 'Moderate exposure indicators',
        summary: 'Occasional password reuse on non-critical sites',
        explanation: 'Reusing credentials on minor platforms presents an exposure vector. Automated credential stuffing tools frequently attempt breached combinations across major services.',
      });
    } else {
      factors.push({
        name: 'Credential Isolation',
        level: 'high',
        levelLabel: 'High exposure indicators',
        summary: 'Frequent password reuse across services',
        explanation: 'Broad password repetition constitutes a significant hygiene vulnerability. A credential leak from any single vendor directly jeopardizes every account sharing that combination.',
      });
    }

    // Factor 5: Verification & Review Habits
    if (checkedBreachArchives && !usePublicWifi) {
      factors.push({
        name: 'Monitoring & Network Hygiene',
        level: 'low',
        levelLabel: 'Low exposure indicators',
        summary: 'Audited archives & secured networks',
        explanation: 'Active verification checks and avoiding unencrypted public networks enhance situational awareness and limit passive packet eavesdropping.',
      });
    } else if (checkedBreachArchives || !usePublicWifi) {
      factors.push({
        name: 'Monitoring & Network Hygiene',
        level: 'moderate',
        levelLabel: 'Moderate exposure indicators',
        summary: 'Partial monitoring or public Wi-Fi usage',
        explanation: 'Regularly auditing your email address helps detect known leaks early, whereas connecting on shared networks requires reliance on HTTPS transport security.',
      });
    } else {
      factors.push({
        name: 'Monitoring & Network Hygiene',
        level: 'high',
        levelLabel: 'High exposure indicators',
        summary: 'Unchecked archives & frequent public Wi-Fi',
        explanation: 'Infrequent security review leaves exposed credentials undiscovered. Periodic auditing allows proactive password updates when a service reports an incident.',
      });
    }

    // Count totals
    const lowCount = factors.filter((f) => f.level === 'low').length;
    const moderateCount = factors.filter((f) => f.level === 'moderate').length;
    const highCount = factors.filter((f) => f.level === 'high').length;

    let overallLevel: ExposureIndicatorLevel = 'moderate';
    let overallLabel = 'Moderate exposure indicators';

    if (highCount >= 3) {
      overallLevel = 'high';
      overallLabel = 'High exposure indicators';
    } else if (lowCount >= 3) {
      overallLevel = 'low';
      overallLabel = 'Low exposure indicators';
    } else {
      overallLevel = 'moderate';
      overallLabel = 'Moderate exposure indicators';
    }

    return {
      factors,
      overallLevel,
      overallLabel,
      lowCount,
      moderateCount,
      highCount,
    };
  };

  const evaluation = evaluateFactors();

  const getBadgeStyle = (level: ExposureIndicatorLevel) => {
    switch (level) {
      case 'low':
        return {
          badge: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          border: 'border-emerald-200 dark:border-emerald-800/80',
          card: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          icon: ShieldCheck,
        };
      case 'moderate':
        return {
          badge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
          dot: 'bg-amber-500',
          border: 'border-amber-200 dark:border-amber-800/80',
          card: 'bg-amber-50/50 dark:bg-amber-950/20',
          icon: AlertTriangle,
        };
      case 'high':
        return {
          badge: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800',
          dot: 'bg-rose-500',
          border: 'border-rose-200 dark:border-rose-800/80',
          card: 'bg-rose-50/50 dark:bg-rose-950/20',
          icon: ShieldAlert,
        };
    }
  };

  const overallStyle = getBadgeStyle(evaluation.overallLevel);
  const OverallIcon = overallStyle.icon;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm transition-colors">
      
      {/* Title & Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Educational Estimation Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Email Privacy & Exposure Estimation Tool
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Explore how common online habits influence digital identity exposure. Adjust the scenario parameters below to evaluate exposure factors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive Privacy Scenario</span>
          </span>
        </div>
      </div>

      {/* Mandatory Visible Disclaimer (Verbatim Requirement) */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block text-amber-950 dark:text-amber-100 text-xs uppercase tracking-wide mb-1">
            Important Educational Disclaimer
          </strong>
          <p className="text-amber-800 dark:text-amber-300">
            This calculator provides illustrative estimates based on user-selected inputs and general privacy practices. It does not access breach databases, data broker records, or real-world identity profiles. Results are educational and should not be interpreted as measured probabilities or security guarantees.
          </p>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Scenario Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Scenario Configuration
            </span>
            <span className="text-[11px] text-slate-400">
              Adjust variables to simulate exposure patterns
            </span>
          </div>
          
          {/* Question 1: Number of online accounts */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              <label className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                <span>Estimated Online Accounts Registered with Primary Email:</span>
              </label>
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs">
                {accountCount} accounts
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={accountCount}
              onChange={(e) => setAccountCount(Number(e.target.value))}
              aria-label="Estimated online accounts registered with primary email"
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>5 (Compact footprint)</span>
              <span>50 (Typical user)</span>
              <span>150+ (High dispersion)</span>
            </div>
          </div>

          {/* Question 2: Free trial / gated download signups per month */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              <label className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>One-Time Trial / Whitepaper Signups (Per Month):</span>
              </label>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs">
                {trialFrequency} / month
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={trialFrequency}
              onChange={(e) => setTrialFrequency(Number(e.target.value))}
              aria-label="One-time trial or whitepaper signups per month"
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0 (Selective)</span>
              <span>5 (Frequent tester)</span>
              <span>20 (Heavy testing)</span>
            </div>
          </div>

          {/* Question 3: Active Marketing & Newsletter Subscriptions */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              <label className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>Active Newsletter & Commercial Subscriptions:</span>
              </label>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
                {newsletterSubCount} subscriptions
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="2"
              value={newsletterSubCount}
              onChange={(e) => setNewsletterSubCount(Number(e.target.value))}
              aria-label="Active newsletter and commercial subscriptions"
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0 (Zero marketing)</span>
              <span>12 (Average)</span>
              <span>50 (High marketing influx)</span>
            </div>
          </div>

          {/* Question 4: Password & Email Reuse habits */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Password Hygiene Across Secondary Platforms:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setReusePassword('never')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition text-center ${
                  reusePassword === 'never'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                Unique Passwords
              </button>
              <button
                type="button"
                onClick={() => setReusePassword('sometimes')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition text-center ${
                  reusePassword === 'sometimes'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                Occasional Reuse
              </button>
              <button
                type="button"
                onClick={() => setReusePassword('always')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition text-center ${
                  reusePassword === 'always'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                }`}
              >
                Frequent Reuse
              </button>
            </div>
          </div>

          {/* Toggle Checkboxes: Wi-Fi & Breach check */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition">
              <input
                type="checkbox"
                checked={usePublicWifi}
                onChange={(e) => setUsePublicWifi(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                Frequently access email on shared or public Wi-Fi networks
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition">
              <input
                type="checkbox"
                checked={checkedBreachArchives}
                onChange={(e) => setCheckedBreachArchives(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                Regularly verify primary email in public breach databases
              </span>
            </label>
          </div>

        </div>

        {/* Right Column: Educational Indicators & Analysis (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-lg flex flex-col justify-between">
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Illustrative Profile Summary
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${overallStyle.badge}`}>
                <span className={`w-2 h-2 rounded-full ${overallStyle.dot}`} />
                {evaluation.overallLabel}
              </span>
            </div>

            {/* Indicator Distribution Summary */}
            <div className="my-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <OverallIcon className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {evaluation.overallLabel}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Derived from 5 general privacy practice factors
                  </p>
                </div>
              </div>

              {/* Indicator Tier Counts */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-xs font-semibold text-emerald-400">Low</div>
                  <div className="text-lg font-bold text-white">{evaluation.lowCount}</div>
                  <div className="text-[10px] text-slate-400">indicators</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-xs font-semibold text-amber-400">Moderate</div>
                  <div className="text-lg font-bold text-white">{evaluation.moderateCount}</div>
                  <div className="text-[10px] text-slate-400">indicators</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-xs font-semibold text-rose-400">High</div>
                  <div className="text-lg font-bold text-white">{evaluation.highCount}</div>
                  <div className="text-[10px] text-slate-400">indicators</div>
                </div>
              </div>
            </div>

            {/* Educational Breakdown by Tier */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Indicator Threshold Standards:
              </span>

              <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-start gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-300 block">Low exposure indicators:</span>
                  <span className="text-slate-300 text-[11px] leading-relaxed">
                    Characterized by compartmentalized credentials, minimal one-off signups, and disciplined email sharing practices.
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-start gap-2.5 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300 block">Moderate exposure indicators:</span>
                  <span className="text-slate-300 text-[11px] leading-relaxed">
                    Reflects typical web behavior where primary addresses are shared across common services and commercial newsletter distributions.
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-start gap-2.5 text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-rose-300 block">High exposure indicators:</span>
                  <span className="text-slate-300 text-[11px] leading-relaxed">
                    Arises when an address is widely distributed to untrusted vendors, accompanied by shared passwords or large account clusters.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Recommendation */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Practice:</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Using a disposable email service like <strong>TempInbox</strong> for trial registrations, code downloads, and secondary sites isolates your primary inbox and shifts exposure indicators toward <strong>Low</strong>.
            </p>
          </div>

        </div>

      </div>

      {/* Explanatory Section: Factors That Influence the Result */}
      <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>Educational Framework</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Factors That Influence the Result
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Digital exposure is not a single measured probability, but rather a reflection of architectural exposure mechanisms. Here is how each factor evaluated above influences your digital footprint:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evaluation.factors.map((factor, idx) => {
            const factorStyle = getBadgeStyle(factor.level);
            const FactorIcon = factorStyle.icon;

            return (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${factorStyle.card} ${factorStyle.border}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FactorIcon className={`w-4 h-4 ${
                      factor.level === 'low' ? 'text-emerald-500' :
                      factor.level === 'moderate' ? 'text-amber-500' : 'text-rose-500'
                    }`} />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {factor.name}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${factorStyle.badge}`}>
                    {factor.levelLabel}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Current input: <span className="font-mono text-blue-600 dark:text-blue-400">{factor.summary}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {factor.explanation}
                </p>
              </div>
            );
          })}
        </div>

        {/* Methodology & Limitations Section (Direct Requirement 4) */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 dark:text-white">
            <FileQuestion className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-sm sm:text-base">Methodology & Tool Limitations</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h5 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Scoring & Categorization Methodology</span>
              </h5>
              <p>
                This tool evaluates five qualitative exposure dimensions (account dispersion, trial frequency, newsletter volume, credential reuse, and network monitoring). Each dimension is assigned to an indicator category (Low, Moderate, or High) based on established cybersecurity hygiene principles rather than arbitrary scoring formulas.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Scope & Technical Limitations</span>
              </h5>
              <p>
                This calculator operates completely client-side in your browser. It does not connect to external breach databases (such as Have I Been Pwned), does not query data broker archives, and does not scan real identity profiles. Results represent conceptual scenarios to illustrate privacy best practices and should not be considered measured probabilities or certified security audits.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
});

EmailExposureRiskCalculator.displayName = 'EmailExposureRiskCalculator';
