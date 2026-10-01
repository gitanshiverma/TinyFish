'use client';

import React from 'react';
import { InvoiceItem } from '@/types/audit';
import { CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, Fish, ShieldCheck, ChevronDown, Check, FileCheck, Layers } from 'lucide-react';

interface MatchingViewProps {
  invoices: InvoiceItem[];
  onTriggerTinyFishAudit: (inv: InvoiceItem) => void;
}

export const MatchingView: React.FC<MatchingViewProps> = ({ invoices, onTriggerTinyFishAudit }) => {
  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Stat Cards (Replicating Image 2 top row) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Invoices Processed</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">1,250</div>
          </div>
          <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            ↑ <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Matched Automatically</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">86%</div>
          </div>
          <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            ↑ <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Discrepancies Detected</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">24</div>
          </div>
          <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
            ↓ <ArrowDownRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Pending Review</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">12</div>
          </div>
          <span className="flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
            ↗ <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Main AI Invoice Matching Visual Box (Replicating Image 2 middle section) */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="text-lg font-bold tracking-tight text-slate-100">AI Invoice & Purchase Order Matching Engine</h2>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1 rounded-full text-xs text-cyan-300 border border-cyan-500/30">
            <Fish className="w-3.5 h-3.5" />
            <span>TinyFish Live Web Price Check Active</span>
          </div>
        </div>

        {/* 3-Column Split: Left Invoice Card vs Center Glowing Dial vs Right PO Card */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
          
          {/* Left Card: Invoice #5678 (Replicating Image 2 left box) */}
          <div className="md:col-span-4 bg-white text-slate-900 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <span className="text-sm font-bold block font-mono">Invoice #5678</span>
                <span className="text-xs text-slate-500">Vendor: ABC Supplies</span>
              </div>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">PDF OCR</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Item A Unit Price</span>
                <span className="font-bold font-mono">$150.00</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Qty</span>
                <span className="font-bold bg-slate-100 px-2 py-0.5 rounded">10</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-200">
              <span className="text-xs font-bold text-slate-500">Total:</span>
              <span className="text-base font-extrabold text-slate-900 font-mono">$1,550.00</span>
            </div>
          </div>

          {/* Center Glowing Purple Dial: 92% Match Confidence (Replicating Image 2 middle ring) */}
          <div className="md:col-span-3 flex flex-col items-center justify-center space-y-2 py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
              <svg className="w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r="58" stroke="#334155" strokeWidth="8" fill="transparent" />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#818cf8"
                  strokeWidth="8"
                  strokeDasharray={364}
                  strokeDashoffset={364 - (364 * 92) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-white tracking-tight">92%</span>
                <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Match Confidence</span>
              </div>
            </div>
          </div>

          {/* Right Card: Purchase Order #5678 with Red/Orange Mismatch Highlights (Replicating Image 2 right box) */}
          <div className="md:col-span-4 bg-white text-slate-900 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <span className="text-sm font-bold block font-mono">Purchase Order #5678</span>
                <span className="text-xs text-slate-500">ERP System Record</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">SYNCED</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Item A Price</span>
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 bg-red-500 text-white rounded font-bold font-mono text-[11px]">
                    $140.00
                  </span>
                  <ChevronDown className="w-3 h-3 text-red-500" />
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Qty</span>
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 bg-amber-500 text-white rounded font-bold font-mono text-[11px]">
                    Qty: 12
                  </span>
                  <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-200">
              <span className="text-xs font-bold text-slate-500">Total:</span>
              <span className="text-base font-extrabold text-slate-900 font-mono">$1,680.00</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Grid: Discrepancy Alerts Table vs Audit Log Timeline (Replicating Image 2 bottom section) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Discrepancy Alerts Table (Left 8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Discrepancy Alerts</h3>
            <span className="text-xs text-slate-400">Automated AI & Web Audit Detection</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3">INVOICE ID</th>
                  <th className="p-3">VENDOR</th>
                  <th className="p-3">ISSUE</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold font-mono text-slate-900">INV-1043</td>
                  <td className="p-3 font-semibold text-slate-800">Global Tech</td>
                  <td className="p-3 font-medium text-slate-700">Price Mismatch</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500 text-white">
                      AI Detected
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onTriggerTinyFishAudit(invoices[0])}
                      className="px-2.5 py-1 bg-cyan-900 text-cyan-200 hover:bg-cyan-800 text-[10px] font-bold rounded-lg transition"
                    >
                      TinyFish Audit
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-bold font-mono text-slate-900">INV-1028</td>
                  <td className="p-3 font-semibold text-slate-800">Metro Goods</td>
                  <td className="p-3 font-medium text-slate-700">Qty Discrepancy</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      Review Needed
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onTriggerTinyFishAudit(invoices[1])}
                      className="px-2.5 py-1 bg-cyan-900 text-cyan-200 hover:bg-cyan-800 text-[10px] font-bold rounded-lg transition"
                    >
                      TinyFish Audit
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-bold font-mono text-slate-900">INV-0995</td>
                  <td className="p-3 font-semibold text-slate-800">Delta Supply</td>
                  <td className="p-3 font-medium text-slate-700">Missing Info</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                      Resolved
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-[10px] text-slate-400 font-medium">Completed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log Timeline (Right 4 cols - Replicating Image 2 right log) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Audit Log</h3>

          <div className="space-y-4 text-xs relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100 pl-8">
            <div className="relative">
              <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                <FileCheck className="w-3 h-3" />
              </div>
              <p className="font-semibold text-slate-800">Invoice #5678 uploaded by ABC Supplies</p>
              <span className="text-[10px] text-slate-400">10 mins ago</span>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] border border-indigo-300">
                <AlertTriangle className="w-3 h-3" />
              </div>
              <p className="font-semibold text-slate-800">AI flagged price discrepancy</p>
              <span className="text-[10px] text-slate-400">8 mins ago</span>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px]">
                <Fish className="w-3 h-3" />
              </div>
              <p className="font-semibold text-slate-800">TinyFish Web Agent verified market rate</p>
              <span className="text-[10px] text-slate-400">5 mins ago</span>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <p className="font-semibold text-slate-800">Synced to ERP System</p>
              <span className="text-[10px] text-slate-400">Just now</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
