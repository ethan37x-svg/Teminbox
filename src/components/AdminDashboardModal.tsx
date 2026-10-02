import React, { useState, useEffect } from 'react';
import { BarChart3, Activity, ShieldAlert, Server, HardDrive, RefreshCw, CheckCircle, Zap, Trash2 } from 'lucide-react';
import { SystemStats } from '../types';

export const AdminDashboardModal: React.FC = () => {
  const [stats, setStats] = useState<SystemStats>({
    activeInboxes: 1840,
    totalEmailsReceived: 184200,
    spamBlockedPercent: 17.4,
    avgDeliveryTimeMs: 380,
    storageUsedMb: 142.8,
    serverUptimeHours: 1420,
  });

  const [logs, setLogs] = useState<Array<{ id: string; text: string; time: string; type: 'info' | 'success' | 'warn' }>>([
    { id: '1', text: 'Inbound mail received for user72@mailhub.cc [SPF: PASS]', time: 'Just now', type: 'success' },
    { id: '2', text: 'Blocked suspicious phishing payload from 198.51.100.12 [Score: 82%]', time: '2s ago', type: 'warn' },
    { id: '3', text: 'Cleaned 142 expired temporary mailboxes from memory', time: '1m ago', type: 'info' },
  ]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/v1/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.warn('Stats fetch failed, using state');
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">System Admin & Health Dashboard</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              ● Healthy
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time telemetry, inbound mail traffic, and edge memory monitor.
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-2 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Active Inboxes</span>
          <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{stats.activeInboxes}</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Total Mail Processed</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats.totalEmailsReceived.toLocaleString()}</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Spam Blocked</span>
          <span className="text-2xl font-extrabold text-rose-500">{stats.spamBlockedPercent}%</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Avg Delivery</span>
          <span className="text-2xl font-extrabold text-emerald-500">{stats.avgDeliveryTimeMs} ms</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Storage Usage</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats.storageUsedMb} MB</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Server Uptime</span>
          <span className="text-2xl font-extrabold text-indigo-500">{stats.serverUptimeHours} h</span>
        </div>

      </div>

      {/* Domain Distribution & Live Log Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Domain Popularity Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-500" />
            <span>Domain Inbound Traffic Distribution</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>mailhub.cc</span>
                <span>48%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[48%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>quickmail.live</span>
                <span>28%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[28%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>tempinbox.org</span>
                <span>14%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[14%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>flashmail.email</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[10%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Live System Inbound Logs */}
        <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-6 shadow-md">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Live Inbound Logs</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Tail Log Stream</span>
          </div>

          <div className="space-y-2 font-mono text-xs max-h-52 overflow-y-auto pr-1">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start justify-between gap-2 p-2 rounded bg-slate-900 border border-slate-800/80">
                <span className={log.type === 'warn' ? 'text-amber-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-300'}>
                  {log.text}
                </span>
                <span className="text-[10px] text-slate-500 shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
