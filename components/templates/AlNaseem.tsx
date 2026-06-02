'use client';

import React from 'react';
import { Heart } from 'lucide-react';

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

export const AlNaseem: React.FC<TemplateProps> = ({
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
    <div className="min-h-screen bg-[#FDF5F5] text-[#2D2D2D] font-playfair relative overflow-hidden py-12 px-4 selection:bg-secondary/20">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 0 C40 15, 20 15, 30 30 C40 45, 20 45, 30 60" fill="none" stroke="%23C9848A" stroke-width="0.5" opacity="0.3"/></svg>')`,
        }}
      />

      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md border border-[#E8D5D5] rounded-3xl p-8 md:p-12 shadow-xl relative z-10 text-center flex flex-col items-center">
        {/* Decorative Top Border */}
        <div className="w-16 h-1 bg-[#C9848A] rounded-full mb-6" />

        <div className="text-[#C9848A] font-medium text-lg tracking-wider mb-2 uppercase">
          دعوة زفاف
        </div>

        {/* Groom & Bride Name */}
        <div className="flex flex-col items-center gap-2 my-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#8B1A1A] drop-shadow-sm font-playfair">
            {groomName}
          </h1>
          <Heart className="h-8 w-8 text-[#C9848A] fill-[#C9848A]/20 animate-pulse my-2" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#8B1A1A] drop-shadow-sm font-playfair">
            {brideName}
          </h1>
        </div>

        {/* Countdown */}
        {countdownSection && (
          <div className="w-full my-6">
            {countdownSection}
          </div>
        )}

        {/* Cover Image */}
        {coverImageUrl && (
          <div className="w-full h-64 relative rounded-2xl overflow-hidden my-6 border-4 border-white shadow-md">
            <img 
              src={coverImageUrl} 
              alt="Wedding Cover" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Message */}
        {message && (
          <div className="my-8 px-4 py-6 border-t border-b border-[#E8D5D5] text-lg text-[#2D2D2D]/90 leading-relaxed font-serif italic max-w-md">
            &quot;{message}&quot;
          </div>
        )}

        {/* Date and Time Details */}
        <div className="my-6 flex flex-col gap-3">
          <div className="text-sm uppercase tracking-wider text-textDark/60">التاريخ والوقت</div>
          <div className="text-xl font-bold text-[#8B1A1A]">
            {formatDate(dateStart)}
          </div>
          {dateEnd && (
            <div className="text-sm text-textDark/70">
              إلى: {formatDate(dateEnd)}
            </div>
          )}
        </div>

        {/* Venue details */}
        <div className="my-6 p-6 bg-white/80 rounded-2xl border border-[#E8D5D5] w-full flex flex-col gap-4">
          <div className="text-sm uppercase tracking-wider text-textDark/60">مكان الحفل</div>
          <div className="text-lg font-bold text-[#2D2D2D]">{venueName}</div>
          {venueMapUrl && (
            <a 
              href={venueMapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#C9848A] hover:bg-[#C9848A]/90 text-white rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] w-full shadow-sm"
            >
              عرض الموقع على الخريطة
            </a>
          )}
        </div>

        {/* Photo Album */}
        {photoAlbumSection && (
          <div className="w-full my-8">
            {photoAlbumSection}
          </div>
        )}

        {/* RSVP Section */}
        {rsvpSection && (
          <div className="w-full my-8">
            {rsvpSection}
          </div>
        )}

        {/* Comments Section */}
        {commentsSection && (
          <div className="w-full my-8">
            {commentsSection}
          </div>
        )}

        {/* Music Player */}
        {musicPlayerSection && (
          <div className="w-full mt-4">
            {musicPlayerSection}
          </div>
        )}

        {/* Decorative Bottom Border */}
        <div className="w-16 h-1 bg-[#C9848A] rounded-full mt-8" />
      </div>
    </div>
  );
};
