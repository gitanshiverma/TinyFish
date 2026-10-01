'use client';

import React from 'react';
import { AuditVerificationResult } from '@/types/audit';
import { ShieldCheck, AlertTriangle, XCircle, FileDown, ExternalLink, CheckCircle2, Lock, Fish, Hash, Search, Download, Cpu, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuditReportViewProps {
  result: AuditVerificationResult;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({ result }) => {
  const triggerDownload = () => {
    // Trigger confetti celebratory effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${result.id}_TinyFish_Verified_Audit.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = () => {
    if (result.overallStatus === 'PASS') {
      return (
        <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide">Audit Status</div>
            <div className="text-base font-bold">VERIFIED COMPLIANT (PASS)</div>
          </div>
        </div>
      );
    } else if (result.overallStatus === 'WARN') {
      return (
        <div className="flex items-center space-x-2 px-4 py-2 bg-amber-950/60 border border-amber-500/40 rounded-xl text-amber-300">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide">Audit Status</div>
            <div className="text-base font-bold">WARNING / DISCREPANCY DETECTED</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2 px-4 py-2 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300">
          <XCircle className="w-6 h-6 text-red-400" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide">Audit Status</div>
            <div className="text-base font-bold">CRITICAL RISK (FAILED AUDIT)</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      
      {/* Top Banner & Download */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-mono text-cyan-400">{result.id}</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{new Date(result.createdAt).toLocaleString()}</span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Verified Audit Report:</span>
            <span className="text-cyan-300">{result.vendorName}</span>
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          {getStatusBadge()}
          
          <button
            onClick={triggerDownload}
            className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Audit Certificate</span>
          </button>
        </div>
      </div>

      {/* Metrics Row: Score Dial & TinyFish Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Compliance Score */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#1e293b" strokeWidth="6" fill="transparent" />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke={result.complianceScore >= 80 ? '#10b981' : result.complianceScore >= 60 ? '#f59e0b' : '#ef4444'}
                strokeWidth="6"
                strokeDasharray={163}
                strokeDashoffset={163 - (163 * result.complianceScore) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute font-bold text-sm text-white">{result.complianceScore}</span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">Compliance Index</div>
            <div className="text-sm font-bold text-white">{result.complianceScore} / 100</div>
            <div className="text-[11px] text-slate-500">Live Web Multi-Factor Score</div>
          </div>
        </div>

        {/* TinyFish Search Telemetry */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-950/60 border border-cyan-800/40 rounded-lg text-cyan-400">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">TinyFish Search</div>
            <div className="text-sm font-bold text-white">{result.tinyfishTelemetry.searchQueriesCount} Query Discovered</div>
            <div className="text-[11px] text-slate-500">Structured Web Discovery</div>
          </div>
        </div>

        {/* TinyFish Fetch Telemetry */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
          <div className="p-2.5 bg-blue-950/60 border border-blue-800/40 rounded-lg text-blue-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">TinyFish Fetch</div>
            <div className="text-sm font-bold text-white">{result.tinyfishTelemetry.pagesFetchedCount} Pages Parsed</div>
            <div className="text-[11px] text-slate-500">Markdown Clean Extraction</div>
          </div>
        </div>

        {/* TinyFish Agent Telemetry */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-950/60 border border-indigo-800/40 rounded-lg text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">Web Agent & Browser</div>
            <div className="text-sm font-bold text-white">{result.tinyfishTelemetry.agentActionsCount} Web Actions Executed</div>
            <div className="text-[11px] text-slate-500">{result.tinyfishTelemetry.executionTimeSeconds}s Latency</div>
          </div>
        </div>
      </div>

      {/* Discrepancies Alert Box if any */}
      {result.discrepancies.length > 0 && (
        <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4" />
            <span>Audit Discrepancies & Flagged Exceptions ({result.discrepancies.length})</span>
          </div>
          <ul className="space-y-1">
            {result.discrepancies.map((disc, idx) => (
              <li key={idx} className="text-xs text-amber-200 flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{disc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Findings Breakdown Table */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center justify-between">
          <span>Verified Compliance Evidence Items</span>
          <span className="text-xs font-normal text-slate-400">Cross-referenced against live web registries</span>
        </h3>

        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Audit Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Live Web Evidence Findings</th>
                <th className="py-3 px-4">Source URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {result.findings.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4 font-semibold text-slate-200">{item.category}</td>
                  <td className="py-3 px-4">
                    {item.verifiedOnWeb ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-400 font-semibold">
                        <XCircle className="w-3.5 h-3.5" /> UNVERIFIED
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <p>{item.description}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{item.evidenceText}</p>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px] font-mono truncate max-w-[160px]"
                    >
                      <span>{new URL(item.sourceUrl).hostname}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Screenshot & Cryptographic Signature Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-semibold text-slate-200">TinyFish Cloud Browser Signed Proof & Attestation</h4>
          </div>
          <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-mono">
            <Lock className="w-3 h-3" />
            <span>Cryptographically Signed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.proofScreenshots.map((proof, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="aspect-video bg-slate-950 rounded overflow-hidden relative border border-slate-800 group">
                <img
                  src={proof.url}
                  alt={proof.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-2 right-2 text-[10px] text-slate-200 font-mono flex justify-between">
                  <span>{proof.sourceDomain}</span>
                  <span>{new Date(proof.capturedAt).toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="text-[11px] font-semibold text-slate-300">{proof.title}</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">
                Hash: <code>{proof.hashProof}</code>
              </div>
            </div>
          ))}

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan-400" /> Audit Proof Hash Signature
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[10px] font-mono text-cyan-300 break-all">
                {result.auditSignatureHash}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>Infrastructure:</span>
                <span className="text-slate-200 font-medium">TinyFish Cloud Engine</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Audit Latency:</span>
                <span className="text-slate-200 font-medium">{result.tinyfishTelemetry.executionTimeSeconds}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
