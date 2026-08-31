'use client';

import React from 'react';
import { AnalysisResult as ResultType } from '@/lib/types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowRightLeft, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

interface AnalysisResultProps {
  result: ResultType;
  onCompareClick?: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  result,
  onCompareClick,
}) => {
  const router = useRouter();

  const getConfidenceVariant = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'accent';
    return 'warning';
  };

  const handleExport = () => {
    // Simulated report export
    alert(`Exporting Geospatial Intel Report: "${result.title}" to local desktop. (Format: GeoJSON + PDF summary)`);
  };

  const handleNavigateTemporal = () => {
    if (onCompareClick) {
      onCompareClick();
    } else {
      router.push(ROUTES.TEMPORAL);
    }
  };

  return (
    <div className="flex flex-col gap-4 font-mono text-[10px] bg-brand-surface border border-brand-border p-4 rounded-sm">
      {/* Header Result */}
      <div className="flex items-start justify-between border-b border-brand-border/60 pb-3">
        <div className="flex flex-col gap-1">
          <div className="text-brand-muted text-[8px] uppercase tracking-widest font-bold">
            Analysis Report
          </div>
          <h3 className="text-xs font-extrabold text-brand-text uppercase tracking-wider">
            {result.title}
          </h3>
        </div>
        
        {/* Confidence Indicator */}
        <div className="flex items-center gap-2 bg-brand-surface-sec border border-brand-border px-2.5 py-1 rounded-sm">
          <span className="text-brand-muted text-[8px]">CONFIDENCE:</span>
          <Badge variant={getConfidenceVariant(result.confidence)} type="filled">
            {result.confidence}%
          </Badge>
        </div>
      </div>

      {/* Summary Description */}
      <div className="text-xs text-brand-muted leading-relaxed font-sans bg-brand-surface-sec/15 p-3 border border-brand-border/40 rounded-sm">
        {result.summary}
      </div>

      {/* Report Telemetry details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-brand-border/50 py-3 my-1">
        <div className="flex flex-col gap-1.5">
          <span className="text-brand-muted text-[8px] uppercase font-bold tracking-wider">
            Analysis Modality
          </span>
          <span className="text-brand-text font-bold uppercase tracking-wide">
            {result.analysisType.replace('_', ' ')}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-brand-muted text-[8px] uppercase font-bold tracking-wider">
            Orchestrated Specialists
          </span>
          <div className="flex flex-wrap gap-1.5">
            {result.specialists.map((spec) => (
              <Badge key={spec} variant="info" type="tonal">
                {spec}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Action actions */}
      <div className="flex flex-wrap gap-3 mt-1">
        <Button variant="outline" size="sm" onClick={handleNavigateTemporal}>
          <ArrowRightLeft className="h-3.5 w-3.5" />
          Compare Temporal
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-3.5 w-3.5" />
          Export Report
        </Button>
      </div>
    </div>
  );
};
export default AnalysisResult;
