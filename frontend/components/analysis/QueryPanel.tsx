'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Sparkles, Terminal } from 'lucide-react';
import { SUGGESTED_QUERIES } from '@/lib/mockData';

interface QueryPanelProps {
  query: string;
  setQuery: (q: string) => void;
  onAnalyze: () => void;
  isRunning: boolean;
}

export const QueryPanel: React.FC<QueryPanelProps> = ({
  query,
  setQuery,
  onAnalyze,
  isRunning,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isRunning) {
      onAnalyze();
    }
  };

  const handleChipClick = (chip: string) => {
    if (!isRunning) {
      setQuery(chip);
    }
  };

  return (
    <div className="flex flex-col gap-4 font-mono">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-brand-border/60 pb-2">
          <Terminal className="h-4 w-4 text-brand-accent" />
          <span className="text-[10px] font-bold text-brand-text uppercase tracking-wider">
            Ask SatQuery AI
          </span>
        </div>

        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you want to extract or analyze from the imagery..."
            disabled={isRunning}
            className="w-full h-24 bg-brand-surface-sec/40 border border-brand-border hover:border-brand-border/80 focus:border-brand-accent p-3 rounded-sm text-xs text-brand-text placeholder-brand-muted/70 focus:outline-none focus:ring-1 focus:ring-brand-accent/50 transition-all resize-none custom-scrollbar disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!query.trim() || isRunning}
          className="text-xs py-2.5 font-bold"
        >
          <Sparkles className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
          {isRunning ? 'Analyzing Query...' : 'Analyze Query'}
        </Button>
      </form>

      {/* Suggested Queries Chip Containers */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] uppercase tracking-wider text-brand-muted font-bold">
          Suggested Templates
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => handleChipClick(q)}
              disabled={isRunning}
              className="text-[9px] px-2.5 py-1 text-left bg-brand-surface border border-brand-border hover:border-brand-accent/40 text-brand-muted hover:text-brand-text rounded-sm transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default QueryPanel;
