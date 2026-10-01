'use client';

import React from 'react';
import { TinyFishCapabilityLog } from '@/types/audit';
import { Terminal, Code, Cpu, ShieldCheck } from 'lucide-react';

interface TerminalLogsProps {
  logs: TinyFishCapabilityLog[];
}

export const TerminalLogs: React.FC<TerminalLogsProps> = ({ logs }) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs shadow-xl flex flex-col h-[280px]">
      
      {/* Terminal Title Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">TinyFish API Telemetry & Telecommunication Stream</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live SSE Telemetry
          </span>
        </div>
      </div>

      {/* Log Output Console */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[11px]">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-600 text-xs italic">
            Awaiting TinyFish API calls... Run an audit to inspect live HTTP payloads.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-1.5 py-0.5 rounded bg-blue-950 text-cyan-300 font-bold text-[10px]">
                    {log.capability}
                  </span>
                  <span className="text-slate-400 font-semibold">{log.method} {log.endpoint}</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                  <span className="text-emerald-400 font-medium">HTTP {log.status}</span>
                  <span>•</span>
                  <span>{log.latencyMs}ms</span>
                </div>
              </div>

              <div className="text-slate-300 text-[10px] overflow-x-auto font-mono bg-slate-950/80 p-1.5 rounded border border-slate-900">
                <span className="text-cyan-400">Request:</span> {JSON.stringify(log.payload)}
              </div>
              <div className="text-slate-400 text-[10px] truncate font-mono">
                <span className="text-emerald-400">Response:</span> {log.responseSnippet}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
