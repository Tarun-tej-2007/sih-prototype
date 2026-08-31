'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ModalityViewer } from '@/components/cross-modal/ModalityViewer';
import { FusionResult } from '@/components/cross-modal/FusionResult';
import { RefreshCw } from 'lucide-react';

export default function CrossModalIntelligence() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [coherenceIndex, setCoherenceIndex] = useState(0.87);

  const handleRefreshFusion = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setCoherenceIndex(Number((0.85 + Math.random() * 0.05).toFixed(2)));
    }, 800);
  };

  const opticalObservations = [
    'High reflectance spectral profile detected',
    'Normalized Difference Veg Index (NDVI) < 0.15',
    'Semantic segmenter flags concrete layout footprint',
  ];

  const sarObservations = [
    'Substantial backscatter intensity peak (Sentinel-1 VV)',
    'Double-bounce reflection suggests corner building wall structures',
    'Surface roughness index indicates high density concrete block',
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full flex-grow">
      {/* Header telemetry info */}
      <section className="border border-brand-border bg-brand-surface p-6 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col max-w-2xl">
            <span className="technical-label text-brand-accent/80 font-bold mb-1">
              Dual-Sensor Fusion Protocol
            </span>
            <h1 className="font-mono text-lg font-extrabold uppercase tracking-wider text-brand-text">
              Cross-Modal Intelligence
            </h1>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed">
              Overlay multi-spectrum visual datasets with radar backscatter grids. Validate building layouts through weather/cloud coverings and construct consensus intelligence reports.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleRefreshFusion} disabled={isRefreshing}>
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Re-sync Channels
            </Button>
            <Badge variant="accent" type="tonal">
              Coherence: {(coherenceIndex * 100).toFixed(0)}%
            </Badge>
          </div>
        </div>
      </section>

      {/* Side-by-side modality images */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModalityViewer
          title="Optical Sensor Channel"
          imageUrl="/demo/chennai_optical_after.jpg"
          modality="OPTICAL"
          observations={opticalObservations}
        />
        
        <ModalityViewer
          title="Synthetic Aperture Radar (SAR)"
          imageUrl="/demo/chennai_sar.jpg"
          modality="SAR"
          observations={sarObservations}
        />
      </section>

      {/* Fusion diagnostic narrative */}
      <FusionResult />
    </div>
  );
}
