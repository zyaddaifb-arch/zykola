'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2 text-start">
        {label && (
          <label className="text-sm font-bold text-textDark/70 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-textDark/35">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={[
              'w-full px-4 py-3.5 min-h-[52px] rounded-2xl',
              'bg-white border transition-all duration-200',
              'text-textDark placeholder-textDark/30',
              'focus:outline-none focus:ring-2',
              'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
              error
                ? 'border-red-300 focus:border-red-400 focus:ring-red-400/15 bg-red-50/30'
                : 'border-[#EAD8D8] focus:border-primary/40 focus:ring-primary/12 hover:border-[#D4B8B8]',
              icon ? 'pr-11' : '',
              className,
            ].join(' ')}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
            <span>⚠</span> {error}
          </span>
        )}
        {helperText && !error && (
          <span className="text-xs text-textDark/45 leading-relaxed">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
