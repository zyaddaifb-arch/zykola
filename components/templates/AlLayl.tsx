'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

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

export const AlLayl: React.FC<TemplateProps> = ({
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
    <div className="min-h-screen bg-[#1a1a2e] text-[#f5f0e8] font-playfair relative overflow-hidden py-8 md:py-12 px-3 md:px-4 selection:bg-[#D4AF37]/20">
      {/* Stars background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="1" fill="%23D4AF37"/><circle cx="10" cy="20" r="0.7" fill="%23D4AF37" opacity="0.5"/><circle cx="70" cy="60" r="0.7" fill="%23D4AF37" opacity="0.6"/></svg>')`,
        }}
      />

      <div className="max-w-xl mx-auto bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-2xl relative z-10 text-center flex flex-col items-center">
        {/* Sparks */}
        <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-[#D4AF37] mb-3 md:mb-4 animate-pulse" />

        <div className="text-[#D4AF37] font-medium text-base md:text-lg tracking-wider mb-2 uppercase italic font-playfair">
          ليلة العمر
        </div>

        {/* Groom & Bride Name */}
        <div className="flex flex-col items-center gap-1 my-4 md:my-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#D4AF37] drop-shadow-sm font-playfair italic break-words">
            {groomName}
          </h1>
          <span className="text-[#D4AF37]/60 my-1 md:my-2 text-xl md:text-2xl font-serif">&amp;</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#D4AF37] drop-shadow-sm font-playfair italic break-words">
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
          <div className="w-full h-48 md:h-64 relative rounded-2xl overflow-hidden my-4 md:my-6 border-2 border-[#D4AF37]/50 shadow-lg">
            <img 
              src={coverImageUrl} 
              alt="Wedding Cover" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Message */}
        {message && (
          <div className="my-6 md:my-8 px-3 md:px-4 py-4 md:py-6 border-t border-b border-[#D4AF37]/20 text-base md:text-lg text-white/95 leading-relaxed font-serif italic max-w-md">
            &quot;{message}&quot;
          </div>
        )}

        {/* Date and Time Details */}
        <div className="my-4 md:my-6 flex flex-col gap-2 md:gap-3">
          <div className="text-xs md:text-sm uppercase tracking-wider text-white/50 font-sans">التاريخ والوقت</div>
          <div className="text-lg md:text-xl font-bold text-[#D4AF37]">
            {formatDate(dateStart)}
          </div>
          {dateEnd && (
            <div className="text-xs md:text-sm text-white/70">
              حتى: {formatDate(dateEnd)}
            </div>
          )}
        </div>

        {/* Venue details */}
        <div className="my-4 md:my-6 p-4 md:p-6 bg-white/5 rounded-2xl border border-[#D4AF37]/20 w-full flex flex-col gap-3 md:gap-4">
          <div className="text-xs md:text-sm uppercase tracking-wider text-white/50 font-sans">مكان الحفل</div>
          <div className="text-base md:text-lg font-bold text-[#f5f0e8]">{venueName}</div>
          {venueMapUrl && (
            <a 
              href={venueMapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 md:py-3 px-5 md:px-6 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1a1a2e] rounded-full font-bold transition-all hover:scale-[1.02] active:scale-[0.98] w-full shadow-md font-sans min-h-[44px] text-sm md:text-base"
            >
              عرض الموقع على الخريطة
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

        <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-[#D4AF37]/40 mt-6 md:mt-8" />
      </div>
    </div>
  );
};
