import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  type?: 'outline' | 'filled' | 'tonal';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  type = 'tonal',
  className = '',
}) => {
  const styles = {
    default: {
      filled: 'bg-brand-border text-brand-text border-brand-border',
      outline: 'bg-transparent text-brand-muted border-brand-border',
      tonal: 'bg-brand-border/30 text-brand-text border-brand-border/40',
    },
    accent: {
      filled: 'bg-brand-accent text-brand-bg border-brand-accent',
      outline: 'bg-transparent text-brand-accent border-brand-accent/50',
      tonal: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
    },
    success: {
      filled: 'bg-brand-success text-brand-bg border-brand-success',
      outline: 'bg-transparent text-brand-success border-brand-success/50',
      tonal: 'bg-brand-success/10 text-brand-success border-brand-success/20',
    },
    warning: {
      filled: 'bg-brand-warning text-brand-bg border-brand-warning',
      outline: 'bg-transparent text-brand-warning border-brand-warning/50',
      tonal: 'bg-brand-warning/10 text-brand-warning border-brand-warning/20',
    },
    danger: {
      filled: 'bg-brand-danger text-brand-bg border-brand-danger',
      outline: 'bg-transparent text-brand-danger border-brand-danger/50',
      tonal: 'bg-brand-danger/10 text-brand-danger border-brand-danger/20',
    },
    info: {
      filled: 'bg-blue-600 text-brand-text border-blue-600',
      outline: 'bg-transparent text-blue-400 border-blue-600/50',
      tonal: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    },
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm font-mono text-[10px] font-semibold tracking-wider uppercase border ${styles[variant][type]} ${className}`}
    >
      {children}
    </span>
  );
};
