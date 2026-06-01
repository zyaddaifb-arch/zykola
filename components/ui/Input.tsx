'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 text-start">
        {label && (
          <label className="text-sm font-semibold text-textDark/80">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 min-h-[52px] rounded-xl border bg-white/70 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 text-textDark ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-borderBlush focus:border-primary focus:ring-primary/20'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-0.5 font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-textDark/60 mt-0.5">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
