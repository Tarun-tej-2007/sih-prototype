'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Activity, ShieldCheck, Database, HardDrive } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const stats = [
    { name: 'Core Router VQA', status: 'ACTIVE', load: '12%', icon: ShieldCheck },
    { name: 'Change Indexer', status: 'ACTIVE', load: '4%', icon: Activity },
    { name: 'Registry Modules', status: 'STANDBY', load: '0%', icon: Database },
    { name: 'Workspace Cache', status: 'HEALTHY', load: '44.8 GB', icon: HardDrive },
  ];

  return (
    <Card title="System Telemetry" subtitle="Real-time server orchestration status">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 font-mono text-[10px]">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="flex items-center gap-3 border border-brand-border/60 bg-brand-surface-sec/20 p-3 rounded-sm"
            >
              <div className="text-brand-accent/80">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-brand-muted truncate uppercase tracking-wider">{stat.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-brand-text font-bold uppercase">{stat.load}</span>
                  <Badge variant="success" className="scale-[0.8] origin-right">
                    {stat.status}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
