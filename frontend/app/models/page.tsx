'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_MODELS } from '@/lib/mockData';
import { ShieldCheck } from 'lucide-react';

export default function ModelRegistry() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full flex-grow">
      {/* Top Description */}
      <section className="border border-brand-border bg-brand-surface p-6 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col max-w-2xl font-mono text-[10px]">
            <span className="technical-label text-brand-accent/80 font-bold mb-1">
              Model Hub Registry
            </span>
            <h1 className="font-mono text-lg font-extrabold uppercase tracking-wider text-brand-text">
              Orchestrated Model Registry
            </h1>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed font-sans">
              Registry of all vision-language routers and specialist models active in the SatQuery AI workspace. The orchestration router automatically allocates tasks to specialists depending on spatial boundaries and modal inputs.
            </p>
          </div>
          
          <div className="shrink-0">
            <Badge variant="success" type="tonal">
              All Engines Operational
            </Badge>
          </div>
        </div>
      </section>

      {/* Model Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-[10px]">
        {MOCK_MODELS.map((model) => (
          <Card
            key={model.name}
            title={model.name}
            subtitle={`Type: ${model.type}`}
            headerRight={
              <Badge variant="success" className="scale-[0.85] origin-right">
                {model.status}
              </Badge>
            }
          >
            <div className="flex flex-col gap-3.5 h-full justify-between">
              {/* Technical Specifications */}
              <div className="flex flex-col gap-2.5">
                {/* Modalities */}
                <div className="flex flex-col gap-1">
                  <span className="text-brand-muted text-[8px] uppercase tracking-wider font-bold">
                    Supported Modality
                  </span>
                  <span className="text-brand-text font-bold uppercase truncate">
                    {model.modality}
                  </span>
                </div>

                {/* Primary Task */}
                <div className="flex flex-col gap-1">
                  <span className="text-brand-muted text-[8px] uppercase tracking-wider font-bold">
                    Primary Specialist Task
                  </span>
                  <p className="text-brand-text/90 leading-relaxed font-sans text-[11px]">
                    {model.task}
                  </p>
                </div>
              </div>

              {/* Data Ingest Matrices */}
              <div className="border-t border-brand-border/60 pt-3 flex flex-col gap-2 bg-brand-surface-sec/15 -mx-4 -mb-4 p-4 mt-2">
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-brand-muted text-[8px] uppercase tracking-wider">Inputs:</span>
                  <span className="text-brand-text text-[9px] truncate max-w-[160px]" title={model.input}>
                    {model.input}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-brand-muted text-[8px] uppercase tracking-wider">Outputs:</span>
                  <span className="text-brand-text text-[9px] truncate max-w-[160px]" title={model.output}>
                    {model.output}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-brand-border/40 pt-2 mt-1 text-[8px] text-brand-muted">
                  <span>VERSION: {model.version}</span>
                  <span className="flex items-center gap-1 text-brand-accent font-semibold uppercase">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified stable
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
