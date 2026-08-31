import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { LucideIcon } from 'lucide-react';

interface CapabilityCardProps {
  title: string;
  description: string;
  status: string;
  icon: LucideIcon;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({
  title,
  description,
  status,
  icon: Icon,
}) => {
  return (
    <Card className="hover:border-brand-accent/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="rounded-sm bg-brand-surface-sec p-2 border border-brand-border">
          <Icon className="h-5 w-5 text-brand-accent" />
        </div>
        <Badge variant="success" type="tonal">
          {status}
        </Badge>
      </div>
      <div className="mt-4">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-text">
          {title}
        </h3>
        <p className="mt-1.5 text-xs text-brand-muted leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};
