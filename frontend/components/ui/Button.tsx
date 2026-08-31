import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-mono font-semibold uppercase tracking-wider transition-all duration-200 border rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-accent disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-brand-accent text-brand-bg border-brand-accent hover:bg-transparent hover:text-brand-accent',
    secondary: 'bg-brand-surface-sec text-brand-text border-brand-border hover:bg-brand-border',
    outline: 'bg-transparent text-brand-text border-brand-border hover:border-brand-accent hover:text-brand-accent',
    danger: 'bg-brand-danger/20 text-brand-danger border-brand-danger/50 hover:bg-brand-danger hover:text-brand-text',
    success: 'bg-brand-success/20 text-brand-success border-brand-success/50 hover:bg-brand-success hover:text-brand-text',
  };

  const sizes = {
    sm: 'text-[10px] px-3 py-1.5 gap-1.5',
    md: 'text-xs px-4 py-2 gap-2',
    lg: 'text-sm px-6 py-3 gap-2.5',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
