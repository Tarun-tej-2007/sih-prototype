'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TemporalViewer } from '@/components/temporal/TemporalViewer';
import { ChangeSummary } from '@/components/temporal/ChangeSummary';
import { ChangeMap } from '@/components/temporal/ChangeMap';
import { Calendar, MapPin, RefreshCw } from 'lucide-react';

export default function TemporalChange() {
  const [beforeDate, setBeforeDate] = useState('2024-02-14');
  const [afterDate, setAfterDate] = useState('2026-02-20');
  const [selectedRegion, setSelectedRegion] = useState('Chennai Northwest Sector');
  const [isAligning, setIsAligning] = useState(false);

  const handleRunAlignment = () => {
    setIsAligning(true);
    setTimeout(() => {
      setIsAligning(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full flex-grow">
      {/* Upper header */}
      <section className="border border-brand-border bg-brand-surface p-6 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col max-w-2xl">
            <span className="technical-label text-brand-accent/80 font-bold mb-1">
              Multi-Temporal Diagnostics
            </span>
            <h1 className="font-mono text-lg font-extrabold uppercase tracking-wider text-brand-text">
              Temporal Change Analysis
            </h1>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed">
              Register observations across multiple years. Execute pixel-level semantic drift to detect, quantify, and explain urban sprawl, forestry depletion, and waterway fluctuations.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <Badge variant="warning" type="tonal">
              Confidence Index: 89%
            </Badge>
          </div>
        </div>
      </section>

      {/* Date and Location selectors */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-[10px]">
        {/* Before observations date */}
        <div className="flex flex-col gap-1.5 border border-brand-border bg-brand-surface-sec/10 p-3 rounded-sm">
          <span className="text-brand-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-brand-accent" />
            Before Date (T0)
          </span>
          <input
            type="date"
            value={beforeDate}
            onChange={(e) => setBeforeDate(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border p-2 rounded-sm text-xs text-brand-text focus:outline-none focus:border-brand-accent uppercase"
          />
        </div>

        {/* After observations date */}
        <div className="flex flex-col gap-1.5 border border-brand-border bg-brand-surface-sec/10 p-3 rounded-sm">
          <span className="text-brand-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-brand-accent" />
            After Date (T1)
          </span>
          <input
            type="date"
            value={afterDate}
            onChange={(e) => setAfterDate(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border p-2 rounded-sm text-xs text-brand-text focus:outline-none focus:border-brand-accent uppercase"
          />
        </div>

        {/* Selected Area/Region */}
        <div className="flex flex-col gap-1.5 border border-brand-border bg-brand-surface-sec/10 p-3 rounded-sm">
          <span className="text-brand-muted font-bold uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-accent" />
            Observation Region
          </span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border p-2 rounded-sm text-xs text-brand-text focus:outline-none focus:border-brand-accent"
          >
            <option value="Chennai Northwest Sector">Chennai Northwest Sector</option>
            <option value="Region 04 Reservoir basin">Region 04 Reservoir basin</option>
            <option value="Delta Section agricultural zone">Delta Section agricultural zone</option>
          </select>
        </div>

        {/* Force re-alignment trigger */}
        <div className="flex items-end">
          <Button
            variant="outline"
            fullWidth
            onClick={handleRunAlignment}
            disabled={isAligning}
            className="py-2.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isAligning ? 'animate-spin' : ''}`} />
            {isAligning ? 'Co-registering...' : 'Co-Register Scenes'}
          </Button>
        </div>
      </section>

      {/* Main split viewer & metadata panels */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left slide comparison panel (65%) */}
        <div className="lg:col-span-8 flex flex-col min-h-[400px]">
          <TemporalViewer
            beforeUrl="/demo/chennai_optical_before.jpg"
            afterUrl="/demo/chennai_optical_after.jpg"
            beforeDate={beforeDate}
            afterDate={afterDate}
          />
        </div>

        {/* Right Details Panel (35%) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <ChangeMap />

          <Card title="Change Narrative" subtitle="AI summary of semantic drift metrics">
            <div className="flex flex-col gap-3 font-mono text-[10px]">
              <div className="text-xs text-brand-muted leading-relaxed font-sans bg-brand-surface-sec/10 p-3 border border-brand-border/40 rounded-sm">
                Significant expansion of built-up structural complexes is detected in the northeastern quadrant. Vegetation cover indexes (NDVI) indicate a corresponding decrease around the same structural sector due to clearing operations. Waterbody margins show stable profiles.
              </div>

              <div className="border-t border-brand-border/60 pt-3 mt-1 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-brand-muted font-bold uppercase tracking-wider">Classification Confidence</span>
                  <span className="text-brand-success font-bold">89.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-muted font-bold uppercase tracking-wider">Algorithmic Match Rate</span>
                  <span className="text-brand-text">100% (Success)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-muted font-bold uppercase tracking-wider">Estimated Run Time</span>
                  <span className="text-brand-text">2,480 ms</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Numerical delta summary metrics */}
      <ChangeSummary />
    </div>
  );
}
