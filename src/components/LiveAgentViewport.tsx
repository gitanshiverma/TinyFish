'use client';

import React from 'react';
import { AgentStep } from '@/types/audit';
import { Globe, Lock, CheckCircle2, Clock, Terminal, Camera, ShieldCheck, ArrowRight, Eye } from 'lucide-react';

interface LiveAgentViewportProps {
  steps: AgentStep[];
  currentStepIndex: number;
  isRunning: boolean;
  activeUrl: string;
}

export const LiveAgentViewport: React.FC<LiveAgentViewportProps> = ({
  steps,
  currentStepIndex,
  isRunning,
  activeUrl
}) => {
  const currentStep = steps[currentStepIndex] || steps[steps.length - 1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
      
      {/* Mock Cloud Browser Header Bar */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-slate-500 font-mono text-[11px] ml-2">TinyFish Cloud Browser (CDP / Playwright Session)</span>
        </div>

        {/* Live URL bar */}
        <div className="flex-1 max-w-lg mx-4 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 flex items-center space-x-2 text-slate-300 font-mono text-[11px]">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span className="truncate">{activeUrl || 'https://api.tinyfish.io/v1/agent/browser'}</span>
        </div>

        <div className="flex items-center space-x-2">
          {isRunning ? (
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-semibold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>LIVE AGENT ACTIVE</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold">
              SESSION READY
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        
        {/* Left 2 Cols: Visual Web Viewport & Action Simulation */}
        <div className="lg:col-span-2 bg-slate-950 p-4 border-r border-slate-800 flex flex-col justify-between relative overflow-hidden">
          
          {/* Active Web Page Representation */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative">
            <div className="border-b border-slate-800 pb-2 mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {currentStep ? currentStep.targetUrl : 'Official Government Tax & Business Registry'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                DOM Render Engine
              </span>
            </div>

            {/* Simulated Live Web Content & TinyFish Cursor Action */}
            <div className="flex-1 bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800/80 pb-2">
                <span>ENTITY REGISTRATION AUDIT FORM</span>
                <span className="text-emerald-400 font-semibold">SEC-IRS-COMPLIANT</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">TAX IDENTIFICATION NO.</span>
                  <div className="text-cyan-300 font-bold text-xs mt-0.5 flex items-center justify-between">
                    <span>{currentStep?.inputValue || 'TAX-948271049'}</span>
                    {currentStep?.action === 'INPUT' && (
                      <span className="text-[10px] text-emerald-400 font-normal animate-ping">Typing...</span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">LEGAL REGISTRATION STATUS</span>
                  <div className="text-emerald-400 font-bold text-xs mt-0.5">
                    ACTIVE / GOOD STANDING
                  </div>
                </div>
              </div>

              {/* TinyFish Agent Overlay Visual Box */}
              {currentStep && (
                <div className="mt-4 border border-cyan-500/40 bg-cyan-950/20 rounded-lg p-3 text-cyan-200 space-y-1 relative">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-cyan-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> TinyFish Web Agent Target: {currentStep.selector || 'DOM Root'}
                    </span>
                    <span>Step {currentStep.stepNumber} of 4</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">{currentStep.detail}</p>
                </div>
              )}

              {/* Simulated TinyFish Mouse/Agent Cursor */}
              {isRunning && (
                <div className="absolute right-8 bottom-8 flex items-center space-x-1.5 bg-cyan-500 text-slate-950 px-2 py-1 rounded-full shadow-lg text-[10px] font-bold animate-bounce z-20">
                  <div className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                  <span>TINYFISH AGENT</span>
                </div>
              )}
            </div>

            {/* Bottom Status bar */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-indigo-400" /> Screenshot Hash: <code>sha256:e3b0c44...</code>
              </span>
              <span className="text-emerald-400 font-medium">SSL 256-Bit Encrypted</span>
            </div>
          </div>
        </div>

        {/* Right Col: Step Timeline */}
        <div className="bg-slate-900 p-4 border-t lg:border-t-0 border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-cyan-400" /> Agent Step Timeline
            </h3>

            <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
              {steps.map((step, idx) => {
                const isActive = idx === currentStepIndex && isRunning;
                const isDone = step.status === 'completed';

                return (
                  <div
                    key={step.id}
                    className={`p-3 rounded-xl border text-xs transition ${
                      isActive
                        ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-500/10'
                        : isDone
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                        : 'bg-slate-950/30 border-slate-900 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                          {step.stepNumber}
                        </span>
                        {step.title}
                      </span>
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : isActive ? (
                        <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      ) : (
                        <span className="text-[10px] text-slate-600">Queued</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{step.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> TinyFish Infrastructure
            </span>
            <span className="text-slate-500">v1.4.0</span>
          </div>
        </div>

      </div>
    </div>
  );
};
