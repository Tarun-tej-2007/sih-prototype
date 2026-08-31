import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  variant?: 'default' | 'accent' | 'secondary';
  nopadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerRight,
  variant = 'default',
  nopadding = false,
  className = '',
  ...props
}) => {
  const borderColors = {
    default: 'border-brand-border',
    accent: 'border-brand-accent/40',
    secondary: 'border-brand-border/60',
  };

  return (
    <div
      className={`bg-brand-surface border rounded-sm flex flex-col overflow-hidden ${borderColors[variant]} ${className}`}
      {...props}
    >
      {(title || subtitle || headerRight) && (
        <div className="flex items-center justify-between border-b border-brand-border bg-brand-surface-sec/30 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            {title && (
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-text">
                {title}
              </span>
            )}
            {subtitle && (
              <span className="text-[10px] tracking-normal text-brand-muted">
                {subtitle}
              </span>
            )}
          </div>
          {headerRight && <div className="flex items-center">{headerRight}</div>}
        </div>
      )}
      <div className={`${nopadding ? '' : 'p-4'} flex-1 flex flex-col`}>
        {children}
      </div>
    </div>
  );
};
