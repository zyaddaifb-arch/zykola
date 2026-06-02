'use client';

import React from 'react';
import { Flower } from 'lucide-react';

interface TemplateProps {
  groomName: string;
  brideName: string;
  dateStart: string;
  dateEnd?: string;
  venueName: string;
  venueMapUrl?: string;
  message?: string;
  coverImageUrl?: string;
  rsvpSection?: React.ReactNode;
  commentsSection?: React.ReactNode;
  photoAlbumSection?: React.ReactNode;
  musicPlayerSection?: React.ReactNode;
  countdownSection?: React.ReactNode;
}

export const AlRabi3: React.FC<TemplateProps> = ({
  groomName,
  brideName,
  dateStart,
  dateEnd,
  venueName,
  venueMapUrl,
  message,
  coverImageUrl,
  rsvpSection,
  commentsSection,
  photoAlbumSection,
  musicPlayerSection,
  countdownSection,
}) => {
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#2D2D2D] font-playfair relative overflow-hidden py-8 md:py-12 px-3 md:px-4 selection:bg-[#7C9A7E]/20">
      {/* Background leaves */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><path d="M10 20 C20 15, 30 15, 40 20 C45 30, 35 40, 20 40 C15 30, 5 25, 10 20 Z" fill="none" stroke="%237C9A7E" stroke-width="0.5" opacity="0.3"/><path d="M70 80 C80 75, 90 75, 100 80 C105 90, 95 100, 80 100 C75 90, 65 85, 70 80 Z" fill="none" stroke="%237C9A7E" stroke-width="0.5" opacity="0.2"/></svg>')`,
        }}
      />

      <div className="max-w-xl mx-auto bg-white/60 backdrop-blur-md border border-[#7C9A7E]/30 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-xl relative z-10 text-center flex flex-col items-center">
        {/* Flower icon */}
        <Flower className="h-6 w-6 md:h-8 md:w-8 text-[#7C9A7E] mb-3 md:mb-4 animate-pulse" />

        <div className="text-[#7C9A7E] font-medium text-base md:text-lg tracking-wider mb-2 uppercase font-sans">
          دعوة زفاف ربيعية
        </div>

        {/* Groom & Bride Name */}
        <div className="flex flex-col items-center gap-1 md:gap-2 my-4 md:my-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#7C9A7E] drop-shadow-sm font-playfair break-words">
            {groomName}
          </h1>
          <span className="text-[#7C9A7E]/60 my-1 text-lg md:text-xl font-semibold font-sans">مع</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#7C9A7E] drop-shadow-sm font-playfair break-words">
            {brideName}
          </h1>
        </div>

        {/* Countdown */}
        {countdownSection && (
          <div className="w-full my-4 md:my-6">
            {countdownSection}
          </div>
        )}

        {/* Cover Image */}
        {coverImageUrl && (
          <div className="w-full h-48 md:h-64 relative rounded-2xl overflow-hidden my-4 md:my-6 border-4 border-white shadow-md">
            <img 
              src={coverImageUrl} 
              alt="Wedding Cover" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Message */}
        {message && (
          <div className="my-6 md:my-8 px-3 md:px-4 py-4 md:py-6 border-t border-b border-[#7C9A7E]/20 text-base md:text-lg text-[#2D2D2D]/90 leading-relaxed font-serif italic max-w-md">
            &quot;{message}&quot;
          </div>
        )}

        {/* Date and Time Details */}
        <div className="my-4 md:my-6 flex flex-col gap-2 md:gap-3">
          <div className="text-xs md:text-sm uppercase tracking-wider text-[#7C9A7E] font-sans">تاريخ يوم الفرح</div>
          <div className="text-lg md:text-xl font-bold text-[#7C9A7E]">
            {formatDate(dateStart)}
          </div>
          {dateEnd && (
            <div className="text-xs md:text-sm text-textDark/70 font-sans">
              حتى: {formatDate(dateEnd)}
            </div>
          )}
        </div>

        {/* Venue details */}
        <div className="my-4 md:my-6 p-4 md:p-6 bg-white/80 rounded-2xl border border-[#7C9A7E]/20 w-full flex flex-col gap-3 md:gap-4">
          <div className="text-xs md:text-sm uppercase tracking-wider text-[#7C9A7E] font-sans">مكان الاحتفال</div>
          <div className="text-base md:text-lg font-bold text-[#2D2D2D]">{venueName}</div>
          {venueMapUrl && (
            <a 
              href={venueMapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 md:py-3 px-5 md:px-6 bg-[#7C9A7E] hover:bg-[#7C9A7E]/90 text-white rounded-full font-bold transition-all hover:scale-[1.02] active:scale-[0.98] w-full shadow-sm font-sans min-h-[44px] text-sm md:text-base"
            >
              عرض الموقع الجغرافي
            </a>
          )}
        </div>

        {/* Photo Album */}
        {photoAlbumSection && (
          <div className="w-full my-6 md:my-8">
            {photoAlbumSection}
          </div>
        )}

        {/* RSVP Section */}
        {rsvpSection && (
          <div className="w-full my-6 md:my-8">
            {rsvpSection}
          </div>
        )}

        {/* Comments Section */}
        {commentsSection && (
          <div className="w-full my-6 md:my-8">
            {commentsSection}
          </div>
        )}

        {/* Music Player */}
        {musicPlayerSection && (
          <div className="w-full mt-4 font-sans">
            {musicPlayerSection}
          </div>
        )}

        <Flower className="h-5 w-5 md:h-6 md:w-6 text-[#7C9A7E]/40 mt-6 md:mt-8" />
      </div>
    </div>
  );
};
