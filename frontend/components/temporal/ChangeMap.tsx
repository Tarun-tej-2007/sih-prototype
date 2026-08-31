'use client';

import React from 'react';
import { Badge } from '../ui/Badge';
import { Compass, Info, ShieldAlert } from 'lucide-react';

export const ChangeMap: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 font-mono text-[10px] w-full">
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-2">
        <span className="font-bold text-brand-text uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="h-4 w-4 text-brand-warning animate-pulse" />
          Detected Change Mask
        </span>
        <Badge variant="warning" type="tonal">
          Raster Overlay active
        </Badge>
      </div>

      {/* Simulated Change Map Canvas */}
      <div className="relative w-full h-[220px] border border-brand-border bg-brand-surface rounded-sm overflow-hidden select-none flex items-center justify-center">
        {/* Technical grids */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FBBF24_1px,transparent_1px),linear-gradient(to_bottom,#FBBF24_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* Procedural LULC Change Shading */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 bg-brand-surface-sec/10">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-brand-text font-bold uppercase text-[9px] tracking-wide">
                Modality: SAR Co-registration
              </span>
              <span className="text-[8px] text-brand-muted">
                Chennai Northeast Sector (Mask 22)
              </span>
            </div>
            
            <div className="text-right">
              <span className="text-brand-warning font-extrabold uppercase text-[9px] block">
                92% Consensus
              </span>
              <span className="text-[8px] text-brand-muted">
                Change Index: 0.88
              </span>
            </div>
          </div>

          {/* Simple Vector drawing representing building footprints and vegetation loss bounds */}
          <div className="flex-grow flex items-center justify-center relative overflow-hidden">
            <svg className="w-48 h-28 opacity-75" viewBox="0 0 120 60">
              {/* Vegetation Loss Polygon */}
              <polygon
                points="10,10 60,10 50,45 20,40"
                fill="none"
                stroke="#F87171"
                strokeWidth="1.2"
                strokeDasharray="2,2"
              />
              <text x="15" y="24" fill="#F87171" fontSize="5" fontWeight="bold" fontFamily="monospace">
                NDVI Loss (2.1 km²)
              </text>

              {/* Built-up Expansion Blocks */}
              <rect x="55" y="15" width="25" height="15" fill="none" stroke="#FBBF24" strokeWidth="1.2" />
              <line x1="55" y1="15" x2="80" y2="30" stroke="#FBBF24" strokeWidth="0.6" strokeDasharray="1,1" />
              <text x="58" y="24" fill="#FBBF24" fontSize="5" fontWeight="bold" fontFamily="monospace">
                New Built-up
              </text>

              {/* Waterbody margins (stable) */}
              <path
                d="M 85,25 Q 95,20 110,40 T 115,55"
                fill="none"
                stroke="#4ADE80"
                strokeWidth="1.2"
              />
              <text x="90" y="45" fill="#4ADE80" fontSize="5" fontWeight="bold" fontFamily="monospace">
                Water Stable
              </text>
            </svg>
          </div>

          {/* Scale info */}
          <div className="flex items-end justify-between text-[8px] text-brand-muted">
            <div className="flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-brand-accent animate-spin [animation-duration:12s]" />
              <span>N 0° 00&apos;</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Info className="h-3 w-3 text-brand-accent" />
              <span>Pixel Resolution: 10m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangeMap;
