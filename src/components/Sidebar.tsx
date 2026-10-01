'use client';

import React from 'react';
import { ActiveTab } from '@/types/audit';
import { LayoutDashboard, FileText, CheckSquare, Users, BarChart3, RefreshCw, Settings, Fish, Cpu } from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  pendingReviewsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, pendingReviewsCount }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 font-sans">
      <div>
        {/* Logo Bar */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 tracking-tight">InvoiceOps</span>
              <span className="block text-[10px] text-cyan-600 font-semibold uppercase tracking-wider">
                TinyFish AI Powered
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'dashboard'
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'invoices'
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4" />
              <span>Invoices</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('matching')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'matching'
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <CheckSquare className="w-4 h-4" />
              <span>AI Matching</span>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">
              {pendingReviewsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tinyfish_agent')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'tinyfish_agent'
                ? 'bg-cyan-50 text-cyan-700 font-bold ring-1 ring-cyan-200'
                : 'text-slate-600 hover:bg-cyan-50/50 hover:text-cyan-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Fish className="w-4 h-4 text-cyan-600 animate-pulse" />
              <span className="text-cyan-900 font-bold">TinyFish Web Agent</span>
            </div>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-cyan-600 text-white rounded">
              LIVE
            </span>
          </button>

          <div className="pt-4 pb-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Management</span>
          </div>

          <button
            onClick={() => setActiveTab('vendors')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'vendors'
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Vendors</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'reports'
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Audit Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Sync</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Footer Profile & TinyFish Status */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
            <span className="flex items-center gap-1 text-cyan-700">
              <Cpu className="w-3 h-3 text-cyan-600" /> TinyFish Engine
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="text-[10px] text-slate-500">Live Web Browsing & Proof Verification</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            TL
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-slate-900 truncate">TechLedger Co.</div>
            <div className="text-[10px] text-slate-500 truncate">Enterprise Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
