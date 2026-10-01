'use client';

import React, { useState } from 'react';
import { InvoiceItem } from '@/types/audit';
import { Search, Filter, Columns, List, Grid, CheckCircle2, AlertCircle, ArrowLeft, Check, X, Info, Fish, ShieldCheck, Eye, ExternalLink, FileText } from 'lucide-react';

interface InvoicesViewProps {
  invoices: InvoiceItem[];
  selectedInvoice: InvoiceItem | null;
  setSelectedInvoice: (inv: InvoiceItem | null) => void;
  onTriggerTinyFishAudit: (inv: InvoiceItem) => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  invoices,
  selectedInvoice,
  setSelectedInvoice,
  onTriggerTinyFishAudit
}) => {
  const [activeTab, setActiveTab] = useState<'extracted' | 'line_items' | 'activity'>('extracted');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header stats cards (Replicating Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-3xl font-bold text-slate-900">87</div>
          <div className="flex items-center space-x-1.5 text-xs text-amber-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Needs review</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-3xl font-bold text-slate-900">28</div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Approved</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-3xl font-bold text-slate-900">96%</div>
          <div className="text-xs text-slate-500 font-medium">Avg. confidence</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-3xl font-bold text-slate-900">$312,670</div>
          <div className="text-xs text-slate-500 font-medium">Total this month</div>
        </div>
      </div>

      {/* Full Document Inspector View (Replicating Image 3 when an invoice is selected) */}
      {selectedInvoice ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Top Bar Navigation */}
          <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to invoices</span>
              </button>

              <h2 className="text-lg font-bold text-slate-900 font-mono">
                {selectedInvoice.invoiceNumber}.pdf
              </h2>

              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                selectedInvoice.status === 'Approved'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-100 text-amber-700 border border-amber-200'
              }`}>
                {selectedInvoice.status}
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {selectedInvoice.confidence}% confidence
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> Trusted
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onTriggerTinyFishAudit(selectedInvoice)}
                className="flex items-center space-x-2 px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-cyan-600/20 transition"
              >
                <Fish className="w-3.5 h-3.5" />
                <span>Audit Vendor via TinyFish</span>
              </button>

              <button className="px-3.5 py-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl transition">
                Mark as Paid
              </button>

              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-emerald-600/20">
                Approve
              </button>
            </div>
          </div>

          {/* Split Screen Inspector: Left PDF Bounding Boxes vs Right Extracted Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
            
            {/* Left Col (7/12): PDF Document Canvas View with Bounding Boxes (Replicating Image 3) */}
            <div className="lg:col-span-7 bg-slate-900 p-6 border-r border-slate-200 flex flex-col justify-between relative overflow-hidden">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xl mx-auto w-full text-slate-800 text-xs space-y-6 relative border border-slate-200">
                
                {/* PDF Header Bounding Box */}
                <div className="flex justify-between items-start border-2 border-blue-500 rounded-lg p-3 relative bg-blue-50/20">
                  <span className="absolute -top-2.5 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 rounded">
                    VENDOR DETAILS
                  </span>
                  <div>
                    <div className="flex items-center space-x-2 font-bold text-base text-slate-900">
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">▲</div>
                      <span>{selectedInvoice.extractedFields.vendorName}</span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-1">{selectedInvoice.extractedFields.vendorAddress}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900 uppercase tracking-widest block">INVOICE</span>
                  </div>
                </div>

                {/* Invoice Metadata Box */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-blue-500 rounded-lg p-3 relative bg-blue-50/20">
                    <span className="absolute -top-2.5 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 rounded">
                      BILL TO
                    </span>
                    <div className="font-bold text-slate-900">{selectedInvoice.extractedFields.customerName}</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">{selectedInvoice.extractedFields.billingAddress}</p>
                  </div>

                  <div className="border-2 border-blue-500 rounded-lg p-3 space-y-2 relative bg-blue-50/20">
                    <span className="absolute -top-2.5 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 rounded">
                      INVOICE META
                    </span>
                    <div className="flex justify-between border-b border-blue-100 pb-1">
                      <span className="text-slate-500 text-[11px]">Invoice #</span>
                      <span className="font-bold font-mono text-slate-900">{selectedInvoice.extractedFields.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-100 pb-1">
                      <span className="text-slate-500 text-[11px]">Invoice Date</span>
                      <span className="font-medium text-slate-900">{selectedInvoice.extractedFields.invoiceDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-[11px]">Due Date</span>
                      <span className="font-medium text-slate-900">{selectedInvoice.extractedFields.dueDate}</span>
                    </div>
                  </div>
                </div>

                {/* Line Items Table in PDF */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-2">DESCRIPTION</th>
                        <th className="p-2 text-center">QTY</th>
                        <th className="p-2 text-right">UNIT PRICE</th>
                        <th className="p-2 text-right">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedInvoice.lineItems.map((item, i) => (
                        <tr key={i} className="border-l-4 border-l-blue-500 bg-blue-50/10">
                          <td className="p-2 font-medium text-slate-800">{item.description}</td>
                          <td className="p-2 text-center text-slate-600">{item.qty}</td>
                          <td className="p-2 text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                          <td className="p-2 text-right font-mono font-bold">${item.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <div className="text-[10px] text-slate-400">OCR Traceable ID: {selectedInvoice.taxId}</div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">TOTAL AMOUNT</span>
                    <span className="text-xl font-extrabold text-slate-900 font-mono">
                      {selectedInvoice.extractedFields.totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Page 1 of 1 • 100% Zoom</span>
                <span className="text-cyan-400 font-mono text-[11px]">Verified via TinyFish Web Infrastructure</span>
              </div>
            </div>

            {/* Right Col (5/12): Extracted Fields Panel (Replicating Image 1 & 3 Right Drawer) */}
            <div className="lg:col-span-5 bg-white p-6 flex flex-col justify-between">
              <div>
                
                {/* Tabs Bar */}
                <div className="flex space-x-6 border-b border-slate-200 pb-3 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('extracted')}
                    className={`pb-3 -mb-3 transition ${
                      activeTab === 'extracted'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Extracted fields
                  </button>

                  <button
                    onClick={() => setActiveTab('line_items')}
                    className={`pb-3 -mb-3 transition flex items-center gap-1 ${
                      activeTab === 'line_items'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span>Line items</span>
                    <span className="px-1.5 py-0.2 bg-slate-100 rounded text-[10px] text-slate-600 font-bold">
                      {selectedInvoice.lineItems.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`pb-3 -mb-3 transition ${
                      activeTab === 'activity'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Activity
                  </button>
                </div>

                {/* Green Traceability Callout (Replicating Image 1 & 3) */}
                <div className="my-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start space-x-3 text-xs text-emerald-800">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    All values are traceable to the source document. Click any field to highlight where it was found.
                  </p>
                </div>

                {/* Extracted Fields List */}
                {activeTab === 'extracted' && (
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Invoice number</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 font-mono">
                          {selectedInvoice.extractedFields.invoiceNumber}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600">95% ●</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Invoice date</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-900">
                          {selectedInvoice.extractedFields.invoiceDate}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600">98% ●</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Due date</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-900">
                          {selectedInvoice.extractedFields.dueDate}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600">96% ●</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Total amount</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 font-mono">
                          {selectedInvoice.extractedFields.totalAmount}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600">95% ●</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Currency</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-900">{selectedInvoice.extractedFields.currency}</span>
                        <span className="text-[11px] font-bold text-emerald-600">100% ●</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        VENDOR DETAILS
                      </span>

                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Vendor name</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900">
                            {selectedInvoice.extractedFields.vendorName}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-600">95% ●</span>
                        </div>
                      </div>

                      <div className="py-2 border-b border-slate-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-slate-500 font-medium">Vendor address</span>
                          <span className="text-[11px] font-bold text-emerald-600">94% ●</span>
                        </div>
                        <p className="text-slate-700 text-xs">{selectedInvoice.extractedFields.vendorAddress}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* TinyFish Web Verification Alert Box */}
              <div className="pt-4 border-t border-slate-200">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Fish className="w-4 h-4 text-cyan-600" /> Live Web Verification
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      SEC / IRS Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Entity verified on official live web registries via TinyFish Web Agent.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (

        /* Main Invoices Table View (Replicating Image 1) */
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
          
          {/* Search and Filters Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <button className="flex items-center space-x-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                <Columns className="w-3.5 h-3.5" />
                <span>Columns</span>
              </button>

              <div className="flex border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50">
                <button className="p-1.5 bg-white shadow-sm rounded-lg text-blue-600">
                  <List className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-slate-600">
                  <Grid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-4 w-8"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="p-4">INVOICE</th>
                  <th className="p-4">VENDOR</th>
                  <th className="p-4">DUE DATE</th>
                  <th className="p-4">TOTAL</th>
                  <th className="p-4">CONFIDENCE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    className="hover:bg-slate-50/80 cursor-pointer transition"
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded border-slate-300" />
                    </td>
                    <td className="p-4 font-bold text-slate-900 font-mono flex items-center space-x-2">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <span>{inv.invoiceNumber}</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">{inv.vendorName}</td>
                    <td className="p-4 text-slate-500">{inv.dueDate}</td>
                    <td className="p-4 font-bold text-slate-900 font-mono">
                      ${inv.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-700 text-[11px] w-8">{inv.confidence}%</span>
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${inv.confidence}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        inv.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onTriggerTinyFishAudit(inv)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold rounded-lg transition flex items-center space-x-1.5 ml-auto shadow-sm"
                      >
                        <Fish className="w-3 h-3 text-cyan-400" />
                        <span>TinyFish Audit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};
