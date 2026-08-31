'use client';

import React from 'react';
import { Badge } from '../ui/Badge';
import { Compass, Scan } from 'lucide-react';

interface ModalityViewerProps {
  title: string;
  imageUrl?: string;
  modality: 'OPTICAL' | 'SAR';
  observations: string[];
}

export const ModalityViewer: React.FC<ModalityViewerProps> = ({
  title,
  imageUrl,
  modality,
  observations,
}) => {
  return (
    <div className="flex flex-col gap-3 font-mono text-[10px] w-full border border-brand-border bg-brand-surface p-4 rounded-sm">
      {/* Header telemetry */}
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-2.5">
        <span className="font-bold text-brand-text uppercase tracking-wider">
          {title}
        </span>
        <Badge variant={modality === 'SAR' ? 'warning' : 'accent'} type="filled">
          {modality} Sensor
        </Badge>
      </div>

      {/* Image Panel */}
      <div className="relative w-full h-[220px] border border-brand-border/60 bg-brand-surface-sec/10 rounded-sm overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${modality} Sensor Scene`}
            className="w-full h-full object-cover pointer-events-none"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="text-center p-4">
            <Compass className="h-8 w-8 text-brand-border/60 mx-auto mb-2 animate-spin [animation-duration:15s]" />
            <span className="text-[9px] text-brand-muted uppercase font-bold">
              Raster matrix loading...
            </span>
          </div>
        )}

        {/* Dynamic scanning grid lines */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#67E8F9_1.5px,transparent_1.5px),linear-gradient(to_bottom,#67E8F9_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Small overlay sensor coordinates */}
        <div className="absolute bottom-2.5 left-2.5 bg-brand-bg/90 border border-brand-border px-1.5 py-0.5 rounded-sm font-mono text-[8px] text-brand-muted">
          13.0827° N, 80.2707° E
        </div>
      </div>

      {/* Sensor Observations list */}
      <div className="flex flex-col gap-1.5 mt-1.5">
        <span className="text-[8px] text-brand-muted uppercase font-bold tracking-wider">
          Modality Signal Logs
        </span>
        <div className="flex flex-col gap-1">
          {observations.map((obs, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 border border-brand-border/40 bg-brand-surface-sec/20 p-2 rounded-sm"
            >
              <Scan className="h-3 w-3 text-brand-accent shrink-0" />
              <span className="text-[9px] text-brand-text truncate uppercase font-semibold">
                {obs}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ModalityViewer;
