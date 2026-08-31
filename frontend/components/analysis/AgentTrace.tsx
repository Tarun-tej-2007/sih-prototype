'use client';

import React from 'react';
import { AgentStep } from '@/lib/types';
import { Progress } from '../ui/Progress';
import { Loader2, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface AgentTraceProps {
  steps: AgentStep[];
}

export const AgentTrace: React.FC<AgentTraceProps> = ({
  steps,
}) => {
  // Calculate progress percentage
  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="flex flex-col gap-4 font-mono text-[10px] w-full">
      {/* Header Summary */}
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-2">
        <span className="font-bold text-brand-text uppercase tracking-wider">
          AI Agent Orchestration Trace
        </span>
        <span className="text-brand-accent font-bold">{progressPercent}% COMPLETE</span>
      </div>

      {/* Progress Bar */}
      <Progress value={progressPercent} variant="accent" size="xs" />

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-1">
        {steps.map((step) => {
          const isPending = step.status === 'pending';
          const isRunning = step.status === 'running';
          const isCompleted = step.status === 'completed';
          const isFailed = step.status === 'failed';

          return (
            <div
              key={step.id}
              className={`p-2.5 border rounded-sm flex items-start gap-2.5 transition-all duration-200 ${
                isRunning
                  ? 'border-brand-accent/60 bg-brand-accent/5'
                  : isCompleted
                  ? 'border-brand-border bg-brand-surface-sec/20'
                  : 'border-brand-border/40 opacity-50 bg-transparent'
              }`}
            >
              {/* Status Icons */}
              <div className="shrink-0 mt-0.5">
                {isRunning && (
                  <Loader2 className="h-4.5 w-4.5 text-brand-accent animate-spin" />
                )}
                {isCompleted && (
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-success" />
                )}
                {isPending && (
                  <Circle className="h-4.5 w-4.5 text-brand-border" />
                )}
                {isFailed && (
                  <AlertCircle className="h-4.5 w-4.5 text-brand-danger" />
                )}
              </div>

              {/* Step Text Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-bold uppercase tracking-wider truncate ${
                      isRunning ? 'text-brand-accent' : isCompleted ? 'text-brand-text' : 'text-brand-muted'
                    }`}
                  >
                    {step.name}
                  </span>
                  {isCompleted && (
                    <span className="text-[8px] text-brand-muted font-normal">
                      {step.duration}ms
                    </span>
                  )}
                </div>
                <div className="text-[9px] text-brand-muted mt-1 leading-normal leading-tight">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AgentTrace;
