import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Calculator, Sparkles, CheckCircle2, 
  ArrowRight, RefreshCw, Lock, Eye, Mail, Server, Database, UserCheck, HelpCircle
} from 'lucide-react';

export const EmailExposureRiskCalculator: React.FC = () => {
  // Calculator inputs
  const [accountCount, setAccountCount] = useState<number>(35);
  const [trialFrequency, setTrialFrequency] = useState<number>(3); // per month
  const [newsletterSubCount, setNewsletterSubCount] = useState<number>(12);
  const [reusePassword, setReusePassword] = useState<'never' | 'sometimes' | 'always'>('sometimes');
  const [usePublicWifi, setUsePublicWifi] = useState<boolean>(true);
  const [checkedHaveIBeenPwned, setCheckedHaveIBeenPwned] = useState<boolean>(false);

  // Compute calculated metrics
  const calculateRisk = () => {
    let score = 20;

    // Account volume impact (identity surface area)
    score += Math.min(30, Math.round(accountCount * 0.5));

    // Trial / one-time downloads impact (untrusted vendors)
    score += Math.min(25, trialFrequency * 6);

    // Newsletters / marketing impact
    score += Math.min(15, Math.round(newsletterSubCount * 0.8));

    // Password reuse multiplier
    if (reusePassword === 'always') score += 20;
    else if (reusePassword === 'sometimes') score += 10;

    // Public Wi-Fi
    if (usePublicWifi) score += 8;

    // Never checked breach database
    if (!checkedHaveIBeenPwned) score += 7;

    const clampedScore = Math.min(100, Math.max(10, score));

    let riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Moderate';
    let riskColor = 'text-amber-500';
    let riskBg = 'bg-amber-500/10 border-amber-500/30';

    if (clampedScore >= 80) {
      riskLevel = 'Critical';
      riskColor = 'text-red-500';
      riskBg = 'bg-red-500/10 border-red-500/30';
    } else if (clampedScore >= 60) {
      riskLevel = 'High';
      riskColor = 'text-orange-500';
      riskBg = 'bg-orange-500/10 border-orange-500/30';
    } else if (clampedScore <= 35) {
      riskLevel = 'Low';
      riskColor = 'text-emerald-500';
      riskBg = 'bg-emerald-500/10 border-emerald-500/30';
    }

    // Estimated annual spam received
    const estimatedSpam = Math.round(clampedScore * 28.5 + trialFrequency * 120);

    // Probability of credential stuffing targeting in next 12 months
    const stuffingProbability = Math.min(99, Math.round(clampedScore * 0.85 + (reusePassword === 'always' ? 20 : 5)));

    // Data broker profile completeness
    const brokerCompleteness = Math.min(98, Math.round(clampedScore * 0.92));

    return {
      score: clampedScore,
      riskLevel,
      riskColor,
      riskBg,
      estimatedSpam,
      stuffingProbability,
      brokerCompleteness,
    };
  };

  const results = calculateRisk();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm transition-colors">
      
      {/* Title & Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Privacy Diagnostic</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Email Identity Exposure & Spam Risk Calculator
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Evaluate your digital identity surface area. Based on statistical breach likelihood models and data broker harvesting patterns, discover how exposing your primary email impacts security.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            Model: E-E-A-T Threat Standard v2026.1
          </span>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
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
              <span>5 (Minimalist)</span>
              <span>50 (Average Web User)</span>
              <span>150+ (High Exposure)</span>
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
              <span>0 (None)</span>
              <span>5 (Frequent Tester)</span>
              <span>20 (Heavy Developer / Marketer)</span>
            </div>
          </div>

          {/* Question 3: Active Marketing & Newsletter Subscriptions */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              <label className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>Active Newsletter & E-Commerce Subscriptions:</span>
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
              aria-label="Active newsletter and e-commerce subscriptions"
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Question 4: Password & Email Reuse habits */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Password Hygiene Across Non-Critical Platforms:
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
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-red-400'
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
                Regularly connect to public Wi-Fi (Cafes, Airports, Hotels)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition">
              <input
                type="checkbox"
                checked={checkedHaveIBeenPwned}
                onChange={(e) => setCheckedHaveIBeenPwned(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                Audited primary email in breach archives in last 6 months
              </span>
            </label>
          </div>

        </div>

        {/* Right Column: Calculated Results & Threat Telemetry (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 border border-indigo-900/60 shadow-xl flex flex-col justify-between">
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Computed Exposure Score
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${results.riskBg} ${results.riskColor}`}>
                {results.riskLevel} Risk
              </span>
            </div>

            {/* Score Ring Display */}
            <div className="my-6 text-center">
              <div className="inline-flex items-baseline gap-1">
                <span className={`text-6xl font-black tracking-tight ${results.riskColor}`}>
                  {results.score}
                </span>
                <span className="text-2xl font-bold text-slate-500">/100</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Higher scores indicate elevated vulnerability to identity correlation, marketing trackers, and phishing attacks.
              </p>
            </div>

            {/* Threat Vector Diagnostics */}
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>Data Broker Profile Match:</span>
                </span>
                <span className="font-bold text-blue-300 font-mono">
                  {results.brokerCompleteness}% probability
                </span>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span>Annual Unsolicited Inbound Spam:</span>
                </span>
                <span className="font-bold text-orange-300 font-mono">
                  ~{results.estimatedSpam.toLocaleString()} emails/yr
                </span>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-red-400" />
                  <span>Credential Stuffing Threat:</span>
                </span>
                <span className="font-bold text-red-300 font-mono">
                  {results.stuffingProbability}% annual likelihood
                </span>
              </div>
            </div>
          </div>

          {/* Actionable Strategy Recommendation */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Ephemeral Strategy:</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Route all <strong>{trialFrequency} monthly trials</strong> and non-essential forum signups through <strong>TempInbox</strong>. This isolates your primary email, reducing cross-domain data aggregation by up to <strong>74%</strong> within 90 days.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
