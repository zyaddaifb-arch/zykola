'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'gold';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const base = [
    'relative inline-flex items-center justify-center gap-2',
    'px-6 py-3.5 min-h-[46px] rounded-full',
    'font-bold text-[15px] leading-none',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
    'disabled:opacity-50 disabled:pointer-events-none',
    'select-none',
  ].join(' ');

  const variants: Record<string, string> = {
    primary: [
      'bg-primary text-white',
      'shadow-[0_2px_12px_rgba(139,26,26,0.25)]',
      'hover:bg-[#7A1717] hover:shadow-[0_4px_20px_rgba(139,26,26,0.35)]',
      'active:scale-[0.98]',
    ].join(' '),

    secondary: [
      'bg-secondary text-white',
      'shadow-sm',
      'hover:bg-secondary/90',
      'active:scale-[0.98]',
    ].join(' '),

    outline: [
      'bg-white text-primary',
      'border border-[#EAD8D8]',
      'shadow-sm',
      'hover:border-primary/30 hover:bg-primary/4',
      'active:scale-[0.98]',
    ].join(' '),

    ghost: [
      'bg-transparent text-primary',
      'shadow-none',
      'hover:bg-primary/6',
      'active:scale-[0.98]',
    ].join(' '),

    dark: [
      'bg-[#1a1a2e] text-white',
      'shadow-md',
      'hover:bg-[#1a1a2e]/90',
      'active:scale-[0.98]',
    ].join(' '),

    gold: [
      'text-[#3D2500] font-bold',
      'bg-gradient-to-br from-[#C9A84C] via-[#EDD97A] to-[#C9A84C]',
      'bg-[length:200%_200%]',
      'shadow-[0_4px_20px_rgba(201,168,76,0.35)]',
      'hover:shadow-[0_8px_32px_rgba(201,168,76,0.5)] hover:-translate-y-0.5',
      'active:scale-[0.98]',
    ].join(' '),
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...(props as any)}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-current absolute"
          fill="none" viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </motion.button>
  );
};
