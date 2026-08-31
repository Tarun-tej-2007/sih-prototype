import React from 'react';

interface ProgressProps {
  value: number; // 0 to 100
  variant?: 'accent' | 'success' | 'warning' | 'danger';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  variant = 'accent',
  size = 'sm',
  className = '',
}) => {
  const barColors = {
    accent: 'bg-brand-accent shadow-[0_0_8px_rgba(103,232,249,0.4)]',
    success: 'bg-brand-success shadow-[0_0_8px_rgba(74,222,128,0.4)]',
    warning: 'bg-brand-warning',
    danger: 'bg-brand-danger',
  };

  const heights = {
    xs: 'h-0.5',
    sm: 'h-1',
    md: 'h-2',
  };

  return (
    <div className={`w-full bg-brand-surface-sec/60 border border-brand-border/40 overflow-hidden rounded-sm ${heights[size]} ${className}`}>
      <div
        className={`h-full transition-all duration-300 ease-out ${barColors[variant]}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};
