'use client';
import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';

interface RSVPStatsProps {
  guests: any[];
}

export const RSVPStats: React.FC<RSVPStatsProps> = ({ guests }) => {
  const { isRtl } = useLanguage();

  const confirmed = guests.filter(g => g.status === 'confirmed').length;
  const pending = guests.filter(g => g.status === 'pending' || !g.status).length;
  const declined = guests.filter(g => g.status === 'declined').length;

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 w-full">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-3 md:p-5 flex flex-col items-center justify-center gap-1 shadow-sm text-center transform transition-transform hover:scale-[1.02]">
        <span className="text-xs md:text-sm font-semibold text-green-800/70">{isRtl ? 'Confirmed' : 'Confirmed'}</span>
        <span className="text-2xl md:text-4xl font-black text-green-700 font-playfair">{confirmed}</span>
        <span className="text-sm md:text-base font-bold text-green-800">{isRtl ? 'سيحضر ✓' : 'Will Attend ✓'}</span>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 md:p-5 flex flex-col items-center justify-center gap-1 shadow-sm text-center transform transition-transform hover:scale-[1.02]">
        <span className="text-xs md:text-sm font-semibold text-yellow-800/70">{isRtl ? 'Pending' : 'Pending'}</span>
        <span className="text-2xl md:text-4xl font-black text-yellow-700 font-playfair">{pending}</span>
        <span className="text-sm md:text-base font-bold text-yellow-800">{isRtl ? 'لم يرد ⏳' : 'No Reply ⏳'}</span>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-2xl p-3 md:p-5 flex flex-col items-center justify-center gap-1 shadow-sm text-center transform transition-transform hover:scale-[1.02]">
        <span className="text-xs md:text-sm font-semibold text-red-800/70">{isRtl ? 'Declined' : 'Declined'}</span>
        <span className="text-2xl md:text-4xl font-black text-red-700 font-playfair">{declined}</span>
        <span className="text-sm md:text-base font-bold text-red-800">{isRtl ? 'اعتذر ✗' : 'Declined ✗'}</span>
      </div>
    </div>
  );
};
