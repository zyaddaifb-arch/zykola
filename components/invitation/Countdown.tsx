'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Calendar } from 'lucide-react';

interface CountdownProps {
  targetDate: string;
  accentColor?: string;
  bgColor?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  accentColor = '#B8860B',
  bgColor = 'rgba(255,255,255,0.5)',
}) => {
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

  const buildGoogleCalendarUrl = () => {
    try {
      const start = new Date(targetDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${start}/${start}&text=حفل+الزفاف`;
    } catch { return '#'; }
  };

  const buildAppleCalendarUrl = () => {
    try {
      const d = new Date(targetDate);
      const pad = (n: number) => String(n).padStart(2, '0');
      const dtStr = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
      const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${dtStr}\nDTEND:${dtStr}\nSUMMARY:حفل الزفاف\nEND:VEVENT\nEND:VCALENDAR`;
      return 'data:text/calendar;charset=utf8,' + encodeURIComponent(ics);
    } catch { return '#'; }
  };

  const items = timeLeft ? [
    { value: timeLeft.days, label: 'يوم' },
    { value: timeLeft.hours, label: 'ساعة' },
    { value: timeLeft.minutes, label: 'دقيقة' },
    { value: timeLeft.seconds, label: 'ثانية' },
  ] : null;

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* Section title */}
      <div
        className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase"
        style={{ color: accentColor }}
      >
        <span>✦</span>
        <span>العد التنازلي</span>
        <span>✦</span>
      </div>

      {/* Countdown boxes */}
      {items ? (
        <div className="flex justify-center items-center gap-3" dir="ltr">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="flex items-center justify-center rounded-xl w-[68px] h-[68px] shadow-sm"
                style={{
                  background: bgColor,
                  border: `1.5px solid ${accentColor}40`,
                }}
              >
                <span
                  className="text-2xl font-bold font-mono leading-none"
                  style={{ color: accentColor }}
                >
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[11px] mt-1.5 font-medium" style={{ color: accentColor + 'CC' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm font-semibold" style={{ color: accentColor }}>
          🎉 لقد حان موعد الفرح!
        </p>
      )}

      {/* Calendar add buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto sm:justify-center">
        <a
          href={buildAppleCalendarUrl()}
          download="wedding.ics"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-3 rounded-full border transition-all hover:opacity-80 min-h-[44px]"
          style={{ borderColor: accentColor + '60', color: accentColor, background: 'rgba(255,255,255,0.6)' }}
        >
          <Calendar className="h-3.5 w-3.5" />
          Apple Calendar
        </a>
        <a
          href={buildGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-3 rounded-full border transition-all hover:opacity-80 min-h-[44px]"
          style={{ borderColor: accentColor + '60', color: accentColor, background: 'rgba(255,255,255,0.6)' }}
        >
          <Calendar className="h-3.5 w-3.5" />
          Google Calendar
        </a>
      </div>
    </div>
  );
};
