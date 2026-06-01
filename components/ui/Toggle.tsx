'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
}) => {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex flex-col text-start max-w-[75%]">
        {label && <span className="font-semibold text-textDark text-base">{label}</span>}
        {description && (
          <span className="text-sm text-textDark/60 mt-0.5">{description}</span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`flex h-7 w-12 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          checked ? 'bg-primary justify-end' : 'bg-borderBlush justify-start'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="h-6 w-6 rounded-full bg-white shadow-md"
        />
      </button>
    </div>
  );
};
