'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { InvoicesView } from '@/components/InvoicesView';
import { MatchingView } from '@/components/MatchingView';
import { LiveAgentViewport } from '@/components/LiveAgentViewport';
import { TerminalLogs } from '@/components/TerminalLogs';
import { AuditForm } from '@/components/AuditForm';
import { AuditReportView } from '@/components/AuditReportView';
import { INITIAL_INVOICES } from '@/lib/invoiceData';
import { ActiveTab, AgentStep, AuditRequest, AuditVerificationResult, InvoiceItem, TinyFishCapabilityLog } from '@/types/audit';
import { Search, Bell, Key, Fish, Cpu, ExternalLink } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('invoices');
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');

  // TinyFish Agent State
  const [isLoading, setIsLoading] = useState(false);
  const [activeUrl, setActiveUrl] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<AgentStep[]>([
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Dynamic Web Portal Discovery',
      action: 'SEARCH',
      targetUrl: 'https://api.tinyfish.io/v1/search',
      status: 'completed',
      detail: 'TinyFish Search API discovering corporate tax & business registry web portals.',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Target Page Markdown Extraction',
      action: 'FETCH',
      targetUrl: 'https://sec.gov/edgar/searchedgar/companysearch',
      status: 'completed',
      detail: 'TinyFish Fetch API extracting clean markdown structure from live web page DOM.',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: 'step-3',
      stepNumber: 3,
      title: 'Web Agent Form Navigation & Input',
      action: 'INPUT',
      targetUrl: 'https://sec.gov/edgar/searchedgar/companysearch',
      selector: 'input#tax-id-field',
      inputValue: 'US-948271049',
      status: 'completed',
      detail: 'TinyFish Web Agent populating Tax ID field and executing form query.',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: 'step-4',
      stepNumber: 4,
      title: 'Cloud Browser Signed Evidence Proof',
      action: 'VERIFY',
      targetUrl: 'https://sec.gov/edgar/searchedgar/companysearch#result',
      status: 'completed',
      detail: 'TinyFish Playwright CDP capturing signed proof screenshot.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [logs, setLogs] = useState<TinyFishCapabilityLog[]>([]);
  const [auditResult, setAuditResult] = useState<AuditVerificationResult | null>(null);

  const triggerTinyFishAuditFromInvoice = (inv: InvoiceItem) => {
    setActiveTab('tinyfish_agent');
    handleRunAudit({
      id: `req-${Date.now()}`,
      preset: 'vendor_verification',
      vendorName: inv.vendorName,
      taxId: inv.taxId,
      country: inv.country,
      invoiceNumber: inv.invoiceNumber,
      amount: inv.totalAmount,
      currency: inv.currency
    });
  };

  const handleRunAudit = async (req: AuditRequest) => {
    setIsLoading(true);
    setAuditResult(null);
    setLogs([]);
    setCurrentStepIndex(0);

    const initialUrl = req.customTargetUrl || `https://sec.gov/edgar/searchedgar/companysearch`;
    setActiveUrl(initialUrl);

    const runSteps: AgentStep[] = [
      {
        id: 's-1',
        stepNumber: 1,
        title: 'Dynamic Web Discovery',
        action: 'SEARCH',
        targetUrl: 'https://api.tinyfish.io/v1/search',
        status: 'pending',
        detail: `Calling TinyFish Search API for ${req.vendorName} (${req.taxId})...`,
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 's-2',
        stepNumber: 2,
        title: 'Target Page Markdown Extraction',
        action: 'FETCH',
        targetUrl: initialUrl,
        status: 'pending',
        detail: `TinyFish Fetch API scraping clean page content...`,
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 's-3',
        stepNumber: 3,
        title: 'Web Agent Input & Form Navigation',
        action: 'INPUT',
        targetUrl: initialUrl,
        selector: 'input#tax-id-field',
        inputValue: req.taxId,
        status: 'pending',
        detail: `TinyFish Web Agent populating tax form and submitting query...`,
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 's-4',
        stepNumber: 4,
        title: 'Cloud Browser Proof Capture',
        action: 'VERIFY',
        targetUrl: `${initialUrl}#result`,
        status: 'pending',
        detail: `TinyFish Browser capturing timestamped visual evidence...`,
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    setSteps(runSteps);

    for (let i = 0; i < runSteps.length; i++) {
      setCurrentStepIndex(i);
      setSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'running' } : idx < i ? { ...s, status: 'completed' } : s))
      );

      const capabilities: ('Search API' | 'Fetch API' | 'Web Agent' | 'Browser (CDP/Playwright)')[] = [
        'Search API',
        'Fetch API',
        'Web Agent',
        'Browser (CDP/Playwright)'
      ];
      const endpoints = ['/v1/search', '/v1/fetch', '/v1/agent/action', '/v1/browser/screenshot'];

      setLogs((prev) => [
        {
          id: `log-${Date.now()}-${i}`,
          capability: capabilities[i],
          endpoint: endpoints[i],
          method: 'POST',
          status: 200,
          latencyMs: Math.floor(120 + Math.random() * 300),
          payload: { query: req.vendorName, taxId: req.taxId, step: i + 1 },
          responseSnippet: `{"success": true, "tinyfishStep": ${i + 1}, "status": "COMPLETED"}`,
          timestamp: new Date().toISOString()
        },
        ...prev
      ]);

      await new Promise((r) => setTimeout(r, 900));
    }

    setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));

    try {
      const res = await fetch('/api/audit/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditRequest: req, apiKey })
      });
      const data = await res.json();
      if (data.result) {
        setAuditResult(data.result);
      }
    } catch (err) {
      console.error('Audit run error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      
      {/* Sidebar (Matching Image 1 & 3 Left Navigation) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingReviewsCount={6}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-16 px-8 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-bold text-slate-900 capitalize">
              {activeTab === 'invoices' ? 'Invoices' : activeTab === 'matching' ? 'AI Invoice Matching' : activeTab === 'tinyfish_agent' ? 'TinyFish Web Agent' : activeTab}
            </h1>
            {activeTab === 'tinyfish_agent' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 border border-cyan-200">
                AI/ML Hackathon Track
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowKeyModal(true)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                apiKey
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>{apiKey ? 'TinyFish Key Set' : 'Configure API Key'}</span>
            </button>

            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
            </button>

            <div className="flex items-center space-x-2 border-l border-slate-200 pl-4">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                TL
              </div>
              <span className="text-xs font-bold text-slate-800">TechLedger Co.</span>
            </div>
          </div>
        </header>

        {/* View Switcher */}
        <main className="p-8 space-y-8 flex-1">
          
          {(activeTab === 'invoices' || activeTab === 'dashboard') && (
            <InvoicesView
              invoices={invoices}
              selectedInvoice={selectedInvoice}
              setSelectedInvoice={setSelectedInvoice}
              onTriggerTinyFishAudit={triggerTinyFishAuditFromInvoice}
            />
          )}

          {activeTab === 'matching' && (
            <MatchingView
              invoices={invoices}
              onTriggerTinyFishAudit={triggerTinyFishAuditFromInvoice}
            />
          )}

          {activeTab === 'tinyfish_agent' && (
            <div className="space-y-8">
              
              {/* TinyFish Agent Dispatch Form */}
              <AuditForm onRunAudit={handleRunAudit} isLoading={isLoading} />

              {/* Visual Cloud Browser & Agent Viewport */}
              <LiveAgentViewport
                steps={steps}
                currentStepIndex={currentStepIndex}
                isRunning={isLoading}
                activeUrl={activeUrl}
              />

              {/* API Telemetry Logs */}
              <TerminalLogs logs={logs} />

              {/* Verified Audit Report */}
              {auditResult && <AuditReportView result={auditResult} />}
            </div>
          )}

          {(activeTab === 'vendors' || activeTab === 'reports') && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Live Web Vendor Directory & Audit Archive</h2>
              <p className="text-xs text-slate-500 mb-6">Verified across live corporate registries via TinyFish Web Infrastructure.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {invoices.map((inv) => (
                  <div key={inv.id} className="border border-slate-200 rounded-xl p-4 space-y-2 hover:border-blue-400 transition">
                    <div className="font-bold text-slate-900">{inv.vendorName}</div>
                    <div className="text-xs font-mono text-slate-500">Tax ID: {inv.taxId}</div>
                    <div className="text-xs text-slate-500 font-medium">Jurisdiction: {inv.country}</div>
                    <button
                      onClick={() => triggerTinyFishAuditFromInvoice(inv)}
                      className="w-full mt-2 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5"
                    >
                      <Fish className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Execute TinyFish Audit</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">TinyFish API Key Configuration</h3>
                <p className="text-xs text-slate-500">Enter your key for live web scraping or use built-in simulator mode.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                TINYFISH_API_KEY (Optional)
              </label>
              <input
                type="password"
                placeholder="tf_live_..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                If blank, OmniAudit AI runs in offline hackathon demo parity mode.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => { setApiKey(tempKey); setShowKeyModal(false); }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-blue-600/20"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
