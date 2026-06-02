'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return null;
  }

  const items = [
    { value: timeLeft.days, label: t('countdownDays') },
    { value: timeLeft.hours, label: t('countdownHours') },
    { value: timeLeft.minutes, label: t('countdownMinutes') },
    { value: timeLeft.seconds, label: t('countdownSeconds') },
  ];

  return (
    <div className="flex justify-center items-center gap-3 md:gap-4 my-6" dir="ltr">
      {items.map((item, index) => (
        <div 
          key={index}
          className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm border border-borderBlush rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-sm"
        >
          <span className="text-xl md:text-2xl font-bold text-primary font-mono leading-none">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-xs text-textDark/60 font-semibold mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
