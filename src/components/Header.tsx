'use client';

import React, { useState } from 'react';
import { ShieldCheck, Fish, Search, Download, Terminal, Key, ExternalLink, Cpu } from 'lucide-react';

interface HeaderProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ apiKey, setApiKey }) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const saveKey = () => {
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Track */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 border border-blue-500/40 rounded-xl flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
            <Fish className="w-6 h-6 animate-pulse text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                OmniAudit AI
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                AI/ML Hackathon Track
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Autonomous Live-Web Compliance & Invoice Verification Agent • Powered by <span className="text-cyan-400 font-medium">TinyFish</span>
            </p>
          </div>
        </div>

        {/* TinyFish Capability Pills */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-full px-3 py-1 text-xs text-slate-300">
          <span className="text-slate-500 font-medium mr-1">TinyFish Stack:</span>
          <span className="flex items-center gap-1 text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40">
            <Search className="w-3 h-3" /> Search
          </span>
          <span className="flex items-center gap-1 text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-800/40">
            <Download className="w-3 h-3" /> Fetch
          </span>
          <span className="flex items-center gap-1 text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-800/40">
            <Cpu className="w-3 h-3" /> Web Agent
          </span>
          <span className="flex items-center gap-1 text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded-full border border-violet-800/40">
            <Terminal className="w-3 h-3" /> Browser (CDP)
          </span>
        </div>

        {/* Actions & API Key */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
              apiKey
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/40'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>{apiKey ? 'TinyFish Key Set' : 'Configure API Key'}</span>
          </button>

          <a
            href="https://tinyfish.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400 transition"
          >
            <span>Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">TinyFish API Key Configuration</h3>
                <p className="text-xs text-slate-400">Enter your TinyFish key for direct live web scraping or use built-in simulator mode.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                TINYFISH_API_KEY (Optional)
              </label>
              <input
                type="password"
                placeholder="tf_live_..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                If left blank, OmniAudit AI will execute via TinyFish high-fidelity compliance simulator for instant offline demo parity.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={saveKey}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition shadow-lg shadow-blue-600/20"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
