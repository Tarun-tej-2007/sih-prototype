'use client';

import React from 'react';
import { Evidence } from '@/lib/types';
import { Badge } from '../ui/Badge';
import { MapPin, Maximize2, ShieldAlert } from 'lucide-react';

interface EvidencePanelProps {
  evidenceList: Evidence[];
  activeEvidenceId: string | null;
  onSelectEvidence: (id: string | null) => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  evidenceList,
  activeEvidenceId,
  onSelectEvidence,
}) => {
  return (
    <div className="flex flex-col gap-4 font-mono text-[10px] w-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-2">
        <span className="font-bold text-brand-text uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="h-4 w-4 text-brand-accent animate-pulse" />
          Evidence Footprints
        </span>
        <Badge variant="accent" type="tonal">
          {evidenceList.length} TARGETS FOUND
        </Badge>
      </div>

      {/* Evidence Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {evidenceList.map((ev) => {
          const isActive = activeEvidenceId === ev.id;

          return (
            <div
              key={ev.id}
              onClick={() => onSelectEvidence(isActive ? null : ev.id)}
              className={`p-3 border rounded-sm cursor-pointer transition-all duration-150 flex flex-col gap-2 ${
                isActive
                  ? 'border-brand-accent bg-brand-surface-sec shadow-[0_0_8px_rgba(103,232,249,0.15)]'
                  : 'border-brand-border hover:border-brand-border/80 bg-brand-surface-sec/15'
              }`}
            >
              {/* Evidence header info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: ev.color }}
                  />
                  <span className="font-bold text-brand-text uppercase tracking-wide truncate max-w-[120px]">
                    {ev.label}
                  </span>
                </div>
                <Badge variant="accent" className="scale-[0.8] origin-right">
                  {ev.confidence}% CONF
                </Badge>
              </div>

              {/* Description text */}
              <p className="text-[9px] text-brand-muted leading-relaxed font-sans line-clamp-2">
                {ev.description}
              </p>

              {/* Geographic Telemetry coordinates */}
              <div className="border-t border-brand-border/40 pt-2 mt-1 flex items-center justify-between text-[8px] text-brand-muted">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-brand-accent" />
                  <span className="truncate max-w-[110px]">{ev.region}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-brand-text font-bold uppercase">AREA:</span>
                  <span>{ev.area}</span>
                </div>
              </div>

              {/* Highlight overlay trigger details */}
              {isActive && (
                <div className="flex items-center gap-1 mt-1 text-[8px] text-brand-accent justify-end font-semibold uppercase animate-pulse">
                  <Maximize2 className="h-3.5 w-3.5" />
                  Viewer Zoomed to bounds
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default EvidencePanel;
