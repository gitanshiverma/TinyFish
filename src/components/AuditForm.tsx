'use client';

import React, { useState } from 'react';
import { AuditPreset, AuditRequest } from '@/types/audit';
import { Building2, FileCheck, ShieldAlert, Sparkles, Play, Globe, Receipt, DollarSign, Search } from 'lucide-react';

interface AuditFormProps {
  onRunAudit: (req: AuditRequest) => void;
  isLoading: boolean;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onRunAudit, isLoading }) => {
  const [preset, setPreset] = useState<AuditPreset>('vendor_verification');
  const [vendorName, setVendorName] = useState('Acme Tech Solutions Inc');
  const [taxId, setTaxId] = useState('US-948271049');
  const [country, setCountry] = useState('United States');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-8819');
  const [amount, setAmount] = useState<number>(4500);
  const [currency, setCurrency] = useState('USD');
  const [productDescription, setProductDescription] = useState('Enterprise Cloud Server License & Security Audit');
  const [customTargetUrl, setCustomTargetUrl] = useState('');

  const loadPreset = (selected: AuditPreset) => {
    setPreset(selected);
    if (selected === 'vendor_verification') {
      setVendorName('Acme Tech Solutions Inc');
      setTaxId('US-948271049');
      setCountry('United States');
      setInvoiceNumber('INV-2026-8819');
      setAmount(4500);
      setCurrency('USD');
      setProductDescription('Enterprise Cloud Server License & Security Audit');
      setCustomTargetUrl('https://sec.gov/edgar/searchedgar/companysearch');
    } else if (selected === 'invoice_crossmatch') {
      setVendorName('Global Freight Logistics GMBH');
      setTaxId('DE-312984019');
      setCountry('Germany');
      setInvoiceNumber('EU-LOG-9921');
      setAmount(18400); // Inflated price check test
      setCurrency('EUR');
      setProductDescription('Air Cargo Container Transit Frankfurt to New York');
      setCustomTargetUrl('https://ec.europa.eu/taxation_customs/vies/');
    } else if (selected === 'sanctions_watchlist') {
      setVendorName('Shadow Risk Capital LLC');
      setTaxId('XX-000000000');
      setCountry('Unknown');
      setInvoiceNumber('SCAM-9912');
      setAmount(95000);
      setCurrency('USD');
      setProductDescription('Offshore Advisory Services');
      setCustomTargetUrl('https://sanctions.ofac.treas.gov/');
    } else if (selected === 'esg_compliance') {
      setVendorName('EcoEnergy Renewables Corp');
      setTaxId('US-882194012');
      setCountry('United States');
      setInvoiceNumber('INV-ESG-4410');
      setAmount(12000);
      setCurrency('USD');
      setProductDescription('Carbon Offset Certificate Audit & Solar Grid Inspection');
      setCustomTargetUrl('https://epa.gov/compliance/environmental-data');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunAudit({
      id: `req-${Date.now()}`,
      preset,
      vendorName,
      taxId,
      country,
      invoiceNumber,
      amount,
      currency,
      productDescription,
      customTargetUrl: customTargetUrl || undefined
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      
      {/* Header & Presets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">1. Select Audit Workflow</h2>
          </div>
          <span className="text-xs text-slate-400">Click a preset to auto-populate test data</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => loadPreset('vendor_verification')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
              preset === 'vendor_verification'
                ? 'bg-blue-600/20 border-blue-500 text-blue-300 ring-1 ring-blue-500/50'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
            }`}
          >
            <Building2 className="w-4 h-4 mb-2 text-cyan-400" />
            <div>
              <div className="text-xs font-semibold">Vendor & Tax Audit</div>
              <div className="text-[10px] text-slate-500">IRS & SEC EDGAR match</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => loadPreset('invoice_crossmatch')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
              preset === 'invoice_crossmatch'
                ? 'bg-blue-600/20 border-blue-500 text-blue-300 ring-1 ring-blue-500/50'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
            }`}
          >
            <Receipt className="w-4 h-4 mb-2 text-blue-400" />
            <div>
              <div className="text-xs font-semibold">Price Inflation Audit</div>
              <div className="text-[10px] text-slate-500">Live web market benchmark</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => loadPreset('sanctions_watchlist')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
              preset === 'sanctions_watchlist'
                ? 'bg-red-600/20 border-red-500 text-red-300 ring-1 ring-red-500/50'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mb-2 text-red-400" />
            <div>
              <div className="text-xs font-semibold">Sanctions Screen</div>
              <div className="text-[10px] text-slate-500">High-risk entity test</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => loadPreset('esg_compliance')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
              preset === 'esg_compliance'
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
            }`}
          >
            <FileCheck className="w-4 h-4 mb-2 text-emerald-400" />
            <div>
              <div className="text-xs font-semibold">ESG & Regulatory</div>
              <div className="text-[10px] text-slate-500">Environmental filings</div>
            </div>
          </button>
        </div>
      </div>

      {/* Form Input Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-800/80">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Entity & Invoice Audit Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Vendor / Entity Name</label>
            <input
              type="text"
              required
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Tax ID / Registration Number</label>
            <input
              type="text"
              required
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Country Jurisdiction</label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Invoice Number</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Invoice Amount</label>
            <div className="relative">
              <DollarSign className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Target Portal URL (Optional)</label>
            <div className="relative">
              <Globe className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="url"
                placeholder="Auto-discovered via TinyFish Search"
                value={customTargetUrl}
                onChange={(e) => setCustomTargetUrl(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-600/20 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>TinyFish Live Agent Dispatching...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Execute TinyFish Autonomous Audit</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
