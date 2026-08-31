'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Save, Check } from 'lucide-react';

export default function ApplicationSettings() {
  const [defaultModality, setDefaultModality] = useState('OPTICAL');
  const [autoRunOverlays, setAutoRunOverlays] = useState(true);
  const [showTrace, setShowTrace] = useState(true);
  const [coordinateSystem, setCoordinateSystem] = useState('LAT_LONG');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full flex-grow">
      {/* Top Description */}
      <section className="border border-brand-border bg-brand-surface p-6 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col max-w-2xl font-mono text-[10px]">
            <span className="technical-label text-brand-accent/80 font-bold mb-1">
              Configuration Panel
            </span>
            <h1 className="font-mono text-lg font-extrabold uppercase tracking-wider text-brand-text">
              Console Preferences
            </h1>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed font-sans">
              Manage local frontend rendering properties, defaults, sensor alignments, and AI agent execution tracing details.
            </p>
          </div>
          
          <div className="shrink-0">
            <Badge variant="accent" type="tonal">
              Local Storage Active
            </Badge>
          </div>
        </div>
      </section>

      {/* Settings Grid Panel */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[10px]">
        {/* Ingestion & Interface Defaults */}
        <Card title="Interface & Defaults" subtitle="Set standard workspace parameters">
          <div className="flex flex-col gap-4">
            {/* Preferred Modality */}
            <div className="flex flex-col gap-1.5">
              <span className="text-brand-muted uppercase font-bold tracking-wider">Default Ingestion Modality</span>
              <select
                value={defaultModality}
                onChange={(e) => setDefaultModality(e.target.value)}
                className="bg-brand-surface-sec border border-brand-border p-2 rounded-sm text-xs text-brand-text focus:outline-none focus:border-brand-accent"
              >
                <option value="OPTICAL">OPTICAL (High-Reflectance Spectral)</option>
                <option value="SAR">SAR (Synthetic Aperture Radar)</option>
                <option value="TEMPORAL">TEMPORAL (Before / After Observation Pairs)</option>
              </select>
            </div>

            {/* Coordinate Grid display */}
            <div className="flex flex-col gap-1.5">
              <span className="text-brand-muted uppercase font-bold tracking-wider">Geospatial Coordinate Matrix</span>
              <select
                value={coordinateSystem}
                onChange={(e) => setCoordinateSystem(e.target.value)}
                className="bg-brand-surface-sec border border-brand-border p-2 rounded-sm text-xs text-brand-text focus:outline-none focus:border-brand-accent"
              >
                <option value="LAT_LONG">Decimal Latitude / Longitude (e.g. 13.082° N)</option>
                <option value="UTM">Universal Transverse Mercator (UTM Grid Zones)</option>
                <option value="MGRS">Military Grid Reference System (MGRS)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Inference & Visualization properties */}
        <Card title="Analysis & Visualization" subtitle="Control telemetry overlays and traces">
          <div className="flex flex-col gap-4">
            {/* Show traces */}
            <div className="flex items-center justify-between border-b border-brand-border/40 pb-3">
              <div className="flex flex-col gap-0.5 max-w-[200px]">
                <span className="text-brand-text font-bold uppercase tracking-wider">Show Execution Trace</span>
                <span className="text-[9px] text-brand-muted leading-tight">
                  Display real-time orchestration steps (Routing &rarr; Specialist selection).
                </span>
              </div>
              <input
                type="checkbox"
                checked={showTrace}
                onChange={(e) => setShowTrace(e.target.checked)}
                className="h-4.5 w-4.5 rounded-sm accent-brand-accent cursor-pointer bg-brand-surface border-brand-border"
              />
            </div>

            {/* Auto run overlay */}
            <div className="flex items-center justify-between border-b border-brand-border/40 pb-3">
              <div className="flex flex-col gap-0.5 max-w-[200px]">
                <span className="text-brand-text font-bold uppercase tracking-wider">Auto-Render Overlay Masks</span>
                <span className="text-[9px] text-brand-muted leading-tight">
                  Compile bounding box and pixel highlight maps immediately on query completion.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoRunOverlays}
                onChange={(e) => setAutoRunOverlays(e.target.checked)}
                className="h-4.5 w-4.5 rounded-sm accent-brand-accent cursor-pointer bg-brand-surface border-brand-border"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Save Button */}
      <section className="flex items-center justify-end gap-3 font-mono text-[10px]">
        {isSaved && (
          <span className="text-brand-success font-bold flex items-center gap-1 uppercase tracking-wider animate-pulse">
            <Check className="h-4 w-4" />
            Console saved successfully
          </span>
        )}
        <Button variant="primary" onClick={handleSaveSettings} className="px-6 py-2.5 font-bold">
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </section>
    </div>
  );
}
