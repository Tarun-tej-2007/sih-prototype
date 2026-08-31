'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe,
  Compass,
  History,
  Cpu,
  Database,
  Clock,
  Settings,
  X
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Mission Control', href: ROUTES.HOME, icon: Globe },
    { name: 'Analysis Workspace', href: ROUTES.ANALYSIS, icon: Compass },
    { name: 'Temporal Change', href: ROUTES.TEMPORAL, icon: History },
    { name: 'Cross-Modal Fusion', href: ROUTES.CROSS_MODAL, icon: Cpu },
    { name: 'Model Registry', href: ROUTES.MODELS, icon: Database },
    { name: 'Analysis History', href: ROUTES.HISTORY, icon: Clock },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-bg/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-brand-border bg-brand-surface transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-brand-border px-6">
          <div className="flex flex-col">
            <span className="font-mono text-sm font-extrabold uppercase tracking-widest text-brand-text">
              SATQUERY AI
            </span>
            <span className="text-[9px] font-semibold tracking-wider text-brand-accent uppercase">
              Earth Observation Intel
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-brand-muted hover:text-brand-text focus:outline-none"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto custom-scrollbar">
          <div className="px-2 py-1 text-[9px] font-mono tracking-widest text-brand-muted uppercase font-bold">
            Navigation
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center px-3 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider border-l-2 transition-all duration-150 ${
                  isActive
                    ? 'border-brand-accent bg-brand-surface-sec text-brand-accent'
                    : 'border-transparent text-brand-muted hover:bg-brand-surface-sec/50 hover:text-brand-text'
                }`}
              >
                <Icon className={`mr-3 h-4 w-4 shrink-0 transition-colors ${
                  isActive ? 'text-brand-accent' : 'text-brand-muted group-hover:text-brand-text'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-brand-border bg-brand-surface-sec/30 p-4 font-mono">
          {/* Settings link */}
          <Link
            href={ROUTES.SETTINGS}
            onClick={() => setIsOpen(false)}
            className={`flex items-center px-3 py-2 mb-3 text-xs font-semibold uppercase tracking-wider border-l-2 transition-all duration-150 ${
              pathname === ROUTES.SETTINGS
                ? 'border-brand-accent bg-brand-surface text-brand-accent'
                : 'border-transparent text-brand-muted hover:text-brand-text'
            }`}
          >
            <Settings className="mr-3 h-4 w-4 shrink-0" />
            Settings
          </Link>

          {/* System status display */}
          <div className="rounded-sm border border-brand-border/60 bg-brand-bg/50 p-3 text-[10px]">
            <div className="flex items-center justify-between text-brand-muted mb-1.5">
              <span>SYSTEM</span>
              <span className="flex items-center gap-1 text-brand-success font-bold">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-success" />
                ONLINE
              </span>
            </div>
            <div className="flex items-center justify-between text-brand-muted">
              <span>LATENCY</span>
              <span className="text-brand-text font-bold">14ms</span>
            </div>
            <div className="mt-2 text-[9px] text-brand-muted text-center border-t border-brand-border/40 pt-1.5">
              SIH 2026 PROTOTYPE v0.1
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
