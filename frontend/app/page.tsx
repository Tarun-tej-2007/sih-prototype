'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Globe,
  History,
  Cpu,
  Layers,
  Search,
  ArrowRight,
  Database,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CapabilityCard } from '@/components/dashboard/CapabilityCard';
import { RecentAnalyses } from '@/components/dashboard/RecentAnalyses';
import { SystemStatus } from '@/components/dashboard/SystemStatus';
import { ROUTES } from '@/lib/constants';

export default function MissionControl() {
  const router = useRouter();

  const capabilities = [
    {
      title: 'Optical Analysis',
      status: 'READY',
      description: 'Vision-language analysis, classification, and object detection of optical imagery.',
      icon: Eye,
    },
    {
      title: 'Temporal Change',
      status: 'READY',
      description: 'Co-registration differences and semantic drift analysis across multi-year observation scenes.',
      icon: History,
    },
    {
      title: 'SAR Analysis',
      status: 'READY',
      description: 'Radar backscatter profiles and structural detection unaffected by cloud cover.',
      icon: Cpu,
    },
    {
      title: 'Cross-Modal Fusion',
      status: 'READY',
      description: 'Consensus analysis combining complementary optical spectral signatures and SAR signals.',
      icon: Layers,
    },
  ];

  const workflowSteps = [
    { label: 'Ingest Query', icon: Search, desc: 'Accept natural language parameters' },
    { label: 'Understand', icon: Globe, desc: 'Extract temporal/modal intent' },
    { label: 'Select Specialists', icon: Cpu, desc: 'Call U-Net, YOLO, or SAR profilers' },
    { label: 'Analyze', icon: Layers, desc: 'Run localized inference' },
    { label: 'Fuse Evidence', icon: Database, desc: 'Compile backscatter & spectral matches' },
    { label: 'Deliver Answer', icon: CheckCircle2, desc: 'Present pixel overlays & confidence' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Hero Console Area */}
      <section className="relative overflow-hidden rounded-sm border border-brand-border bg-brand-surface p-6 md:p-10 flex flex-col justify-between min-h-[250px]">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#8B98A8_1px,transparent_1px),linear-gradient(to_bottom,#8B98A8_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="technical-label text-brand-accent/80 font-bold mb-2">System Initialized</div>
          <h1 className="font-mono text-xl md:text-3xl font-extrabold uppercase tracking-widest text-brand-text mb-4">
            SATQUERY AI
          </h1>
          <p className="font-mono text-[10px] md:text-xs text-brand-accent/90 font-bold tracking-widest uppercase mb-3">
            Interactive Vision-Language Intelligence for Earth Observation
          </p>
          <p className="text-xs md:text-sm text-brand-muted leading-relaxed mb-6">
            Query optical, SAR, and temporal remote-sensing imagery using natural language.
            Allow our AI orchestration layer to select specialist models, run spatial analysis, and return interactive, evidence-backed reports.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-4 mt-2">
          <Button variant="primary" onClick={() => router.push(ROUTES.ANALYSIS)}>
            Start New Analysis
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" onClick={() => router.push(ROUTES.HISTORY)}>
            View Analysis History
          </Button>
        </div>
      </section>

      {/* Interactive Workflow Diagram */}
      <section className="flex flex-col gap-3">
        <h2 className="technical-label font-bold text-brand-text">Orchestration Protocol</h2>
        <Card subtitle="VLM orchestration and evidence compilation pipeline">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-[10px] py-2">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className="relative flex flex-col items-center text-center p-3 border border-brand-border bg-brand-surface-sec/10 rounded-sm"
                >
                  <div className="rounded-full bg-brand-surface-sec p-2 border border-brand-border text-brand-accent mb-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-brand-text font-bold uppercase tracking-wider">{step.label}</div>
                  <div className="text-brand-muted text-[9px] mt-1 leading-tight">{step.desc}</div>
                  
                  {/* Connection Arrows (visible on larger displays) */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-brand-border">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* Capability Modules Grid */}
      <section className="flex flex-col gap-3">
        <h2 className="technical-label font-bold text-brand-text">Specialist Analytics Modules</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <CapabilityCard
              key={cap.title}
              title={cap.title}
              status={cap.status}
              description={cap.description}
              icon={cap.icon}
            />
          ))}
        </div>
      </section>

      {/* System Telemetry Metrics */}
      <SystemStatus />

      {/* Recent Analyses Log */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="technical-label font-bold text-brand-text">Recent Analytics Log</h2>
          <Link
            href={ROUTES.HISTORY}
            className="font-mono text-[10px] font-bold text-brand-accent hover:underline uppercase tracking-wider"
          >
            All Logs &rarr;
          </Link>
        </div>
        <Card nopadding>
          <RecentAnalyses />
        </Card>
      </section>

      {/* Footer Details */}
      <footer className="mt-8 border-t border-brand-border/40 py-4 text-center font-mono text-[9px] text-brand-muted">
        SIH 2026 Prototype &bull; SatQuery AI &bull; Problem Statement SIH26167
      </footer>
    </div>
  );
}
