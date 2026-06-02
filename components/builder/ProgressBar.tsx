'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';

interface ProgressBarProps {
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const { t, isRtl } = useLanguage();
  const steps = [
    { num: 1, label: t('basicInfo') },
    { num: 2, label: t('designTemplate') },
    { num: 3, label: t('features') },
  ];

  return (
    <div className="w-full mb-8">
      {/* Visual Bar */}
      <div className="relative w-full h-2 bg-borderBlush rounded-full overflow-hidden mb-3">
        <div 
          className="absolute top-0 bottom-0 bg-primary transition-all duration-300 rounded-full"
          style={{
            width: `${(currentStep / 3) * 100}%`,
            [isRtl ? 'right' : 'left']: 0,
          }}
        />
      </div>

      {/* Steps labels */}
      <div className="flex justify-between items-center px-1">
        {steps.map((s) => (
          <div 
            key={s.num} 
            className={`flex flex-col items-center gap-1.5 transition-all duration-200 ${
              currentStep >= s.num ? 'text-primary font-bold' : 'text-textDark/45'
            }`}
          >
            <span className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-xs font-semibold border ${
              currentStep >= s.num 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white text-textDark/40 border-borderBlush'
            }`}>
              {s.num}
            </span>
            <span className="text-[10px] md:text-xs md:text-sm font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
