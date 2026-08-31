'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const pathname = usePathname();
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    switch (pathname) {
      case ROUTES.HOME:
        return 'Mission Control';
      case ROUTES.ANALYSIS:
        return 'Analysis Workspace';
      case ROUTES.TEMPORAL:
        return 'Temporal Change Analysis';
      case ROUTES.CROSS_MODAL:
        return 'Optical & SAR Cross-Modal Fusion';
      case ROUTES.MODELS:
        return 'Model Registry';
      case ROUTES.HISTORY:
        return 'Analysis History';
      case ROUTES.SETTINGS:
        return 'Application Settings';
      default:
        return 'SatQuery Console';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-brand-border bg-brand-bg/85 backdrop-blur-md px-6">
      {/* Page Title & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-brand-muted hover:text-brand-text focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h1 className="font-mono text-xs uppercase tracking-widest text-brand-muted">
            {getPageTitle()}
          </h1>
          <div className="hidden sm:block text-[10px] text-brand-accent/80 font-mono font-semibold uppercase tracking-wider mt-0.5">
            Mission ID: SQ-2026-ALPHA
          </div>
        </div>
      </div>

      {/* Telemetry Details */}
      <div className="flex items-center gap-6 font-mono text-[10px] font-semibold text-brand-muted">
        {/* UTC Clock */}
        <div className="hidden md:flex items-center gap-2 border-r border-brand-border/80 pr-4">
          <span className="text-[9px] uppercase text-brand-muted/70">UTC TIME:</span>
          <span className="text-brand-text tabular-nums">{utcTime}</span>
        </div>

        {/* Operational status alert */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
          </span>
          <span className="text-brand-text uppercase tracking-widest text-[9px] font-bold">
            System Operational
          </span>
        </div>
      </div>
    </header>
  );
};
