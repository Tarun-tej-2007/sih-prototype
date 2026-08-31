import React from 'react';
import { Badge } from '../ui/Badge';
import { ArrowUpRight, ArrowDownRight, Layers, Construction, Trees, Droplet } from 'lucide-react';

export const ChangeSummary: React.FC = () => {
  const metrics = [
    {
      name: 'Total Changed Area',
      value: '12.4 km²',
      change: '14.2% shift',
      type: 'neutral',
      color: 'accent',
      icon: Layers,
    },
    {
      name: 'New Built-up Area',
      value: '4.8 km²',
      change: '+18.4% expansion',
      type: 'up',
      color: 'warning',
      icon: Construction,
    },
    {
      name: 'Vegetation Loss',
      value: '2.1 km²',
      change: '-8.2% reduction',
      type: 'down',
      color: 'danger',
      icon: Trees,
    },
    {
      name: 'Waterbody Change',
      value: '0.8 km²',
      change: '-1.4% seasonal',
      type: 'down',
      color: 'success',
      icon: Droplet,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px]">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.name}
            className="flex flex-col justify-between border border-brand-border bg-brand-surface p-3.5 rounded-sm"
          >
            <div className="flex items-start justify-between">
              <span className="text-brand-muted uppercase font-bold tracking-wider max-w-[100px] leading-tight">
                {m.name}
              </span>
              <div className="rounded-sm bg-brand-surface-sec p-1.5 border border-brand-border text-brand-muted">
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm md:text-base font-extrabold text-brand-text tabular-nums">
                {m.value}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                {m.type === 'up' && <ArrowUpRight className="h-3 w-3 text-brand-warning" />}
                {m.type === 'down' && <ArrowDownRight className="h-3 w-3 text-brand-danger" />}
                <Badge
                  variant={m.color as 'default' | 'accent' | 'success' | 'warning' | 'danger'}
                  className="scale-[0.85] origin-left"
                >
                  {m.change}
                </Badge>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ChangeSummary;
