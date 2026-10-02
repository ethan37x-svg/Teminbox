import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, Key, Code, Server, Zap, ChevronRight } from 'lucide-react';

export const ApiDocsSection: React.FC = () => {
  const [apiKey, setApiKey] = useState('tmp_sec_981249120481230491');
  const [copiedKey, setCopiedKey] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'curl' | 'js' | 'python'>('curl');
  const [activeEndpoint, setActiveEndpoint] = useState<string>('generate');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleExecuteEndpoint = async (endpoint: string) => {
    setIsLoading(true);
    setApiResponse(null);
    try {
      let res: Response;
      if (endpoint === 'generate') {
        res = await fetch('/api/v1/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: 'mailhub.cc', duration: '24h' }),
        });
      } else if (endpoint === 'domains') {
        res = await fetch('/api/v1/domains');
      } else if (endpoint === 'stats') {
        res = await fetch('/api/v1/stats');
      } else {
        res = await fetch(`/api/v1/inbox?address=test@mailhub.cc`);
      }

      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const getCodeSnippet = (endpoint: string, lang: 'curl' | 'js' | 'python') => {
    const baseUrl = window.location.origin;

    if (lang === 'curl') {
      if (endpoint === 'generate') {
        return `curl -X POST "${baseUrl}/api/v1/generate" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"domain": "mailhub.cc", "duration": "24h"}'`;
      }
      return `curl -X GET "${baseUrl}/api/v1/inbox?address=user@mailhub.cc" \\
  -H "Authorization: Bearer ${apiKey}"`;
    }

    if (lang === 'js') {
      if (endpoint === 'generate') {
        return `const response = await fetch('${baseUrl}/api/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ domain: 'mailhub.cc', duration: '24h' })
});
const data = await response.json();
console.log(data);`;
      }
      return `const response = await fetch('${baseUrl}/api/v1/inbox?address=user@mailhub.cc', {
  headers: { 'Authorization': 'Bearer ${apiKey}' }
});
const data = await response.json();`;
    }

    return `import requests

url = "${baseUrl}/api/v1/generate"
headers = {"Authorization": "Bearer ${apiKey}"}
data = {"domain": "mailhub.cc", "duration": "24h"}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3">
          <Terminal className="w-4 h-4" />
          <span>Developer REST API v1</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Programmatic Temporary Email API
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Automate disposable email creation, message polling, and webhooks with our high-speed REST API.
        </p>
      </div>

      {/* API Key Box */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Sandbox API Key</span>
            <code className="font-mono font-bold text-sm text-emerald-400 select-all">{apiKey}</code>
          </div>
        </div>

        <button
          onClick={handleCopyKey}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition"
        >
          {copiedKey ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copiedKey ? 'Key Copied' : 'Copy API Key'}</span>
        </button>
      </div>

      {/* Grid: Left Endpoints list & Code, Right Live Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Endpoint selector & Code snippet */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-md">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">API Endpoints</h3>
            
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveEndpoint('generate');
                  setApiResponse(null);
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${
                  activeEndpoint === 'generate'
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/50 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500 text-slate-950 uppercase">POST</span>
                  <span className="font-mono text-xs text-slate-800 dark:text-slate-200">/api/v1/generate</span>
                </div>
                <span className="text-xs text-slate-400">Generate Mailbox</span>
              </button>

              <button
                onClick={() => {
                  setActiveEndpoint('inbox');
                  setApiResponse(null);
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${
                  activeEndpoint === 'inbox'
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/50 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500 text-white uppercase">GET</span>
                  <span className="font-mono text-xs text-slate-800 dark:text-slate-200">/api/v1/inbox</span>
                </div>
                <span className="text-xs text-slate-400">Fetch Messages</span>
              </button>

              <button
                onClick={() => {
                  setActiveEndpoint('domains');
                  setApiResponse(null);
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${
                  activeEndpoint === 'domains'
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/50 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500 text-white uppercase">GET</span>
                  <span className="font-mono text-xs text-slate-800 dark:text-slate-200">/api/v1/domains</span>
                </div>
                <span className="text-xs text-slate-400">List Domains</span>
              </button>
            </div>
          </div>

          {/* Language Code Snippet Box */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Code Snippet</span>
              <div className="flex items-center gap-1">
                {(['curl', 'js', 'python'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold uppercase ${
                      selectedLang === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <pre className="font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre p-3 bg-slate-950 rounded-xl border border-slate-800">
              {getCodeSnippet(activeEndpoint, selectedLang)}
            </pre>
          </div>
        </div>

        {/* Right: Live Interactive Sandbox Console */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Live API Console</h3>
              </div>
              <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                200 OK Edge Router
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Click below to execute a real live HTTP request to <code className="font-bold text-slate-700 dark:text-slate-300">/api/v1/{activeEndpoint}</code>.
            </p>

            <button
              onClick={() => handleExecuteEndpoint(activeEndpoint)}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition mb-6"
            >
              <Play className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Sending Request...' : 'Try Endpoint Now'}</span>
            </button>

            {/* Response Window */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Live Response Output</span>
              <pre className="font-mono text-xs bg-slate-950 text-emerald-400 p-4 rounded-xl border border-slate-800 min-h-[220px] max-h-[300px] overflow-y-auto">
                {apiResponse || '// Response output will appear here after clicking "Try Endpoint Now"'}
              </pre>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
