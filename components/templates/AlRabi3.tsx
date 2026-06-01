'use client';

import React, { useState } from 'react';
import { MapPin, Share2, Check } from 'lucide-react';
import { Countdown } from '@/components/invitation/Countdown';

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

const GreenDivider = () => (
  <div className="flex items-center justify-center gap-2 w-full my-1">
    <svg width="80" height="12" viewBox="0 0 80 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 6 Q20 0 40 6 Q60 12 80 6" stroke="#7C9A7E" strokeWidth="1" fill="none" opacity="0.6"/>
      <circle cx="40" cy="6" r="2.5" fill="#7C9A7E" opacity="0.8"/>
      <circle cx="25" cy="5" r="1.5" fill="#7C9A7E" opacity="0.5"/>
      <circle cx="55" cy="7" r="1.5" fill="#7C9A7E" opacity="0.5"/>
    </svg>
  </div>
);

const GreenDots = () => (
  <div className="flex items-center justify-center gap-4 my-2">
    <span className="w-1.5 h-1.5 rounded-full bg-[#7C9A7E] opacity-40" />
    <span className="w-2 h-2 rounded-full bg-[#7C9A7E] opacity-60" />
    <span className="w-1.5 h-1.5 rounded-full bg-[#7C9A7E] opacity-40" />
  </div>
);

const OrnamentBorder = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative bg-white/70 rounded-2xl p-6 ${className}`} style={{
    border: '1px solid rgba(124,154,126,0.3)',
    boxShadow: '0 2px 20px rgba(124,154,126,0.08), inset 0 0 0 1px rgba(255,255,255,0.8)',
  }}>
    <span className="absolute top-2 right-2 text-[#7C9A7E] text-xs opacity-50">✦</span>
    <span className="absolute top-2 left-2 text-[#7C9A7E] text-xs opacity-50">✦</span>
    <span className="absolute bottom-2 right-2 text-[#7C9A7E] text-xs opacity-50">✦</span>
    <span className="absolute bottom-2 left-2 text-[#7C9A7E] text-xs opacity-50">✦</span>
    {children}
  </div>
);

export const AlRabi3: React.FC<TemplateProps> = ({
  groomName, brideName, dateStart, dateEnd, venueName, venueMapUrl,
  message, coverImageUrl, rsvpSection, commentsSection, photoAlbumSection, musicPlayerSection,
}) => {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('ar-EG', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
    } catch { return dateStr; }
  };

  const formatTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit', hour12: true });
    } catch { return ''; }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `دعوة زفاف ${groomName} و ${brideName}`, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#F0F4EE', fontFamily: 'var(--font-cairo), sans-serif' }} dir="rtl">
      {/* Top Share Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3" style={{ background: '#4A7C4E' }}>
        <span className="text-white/80 text-xs font-medium">هذه معاينة فقط — شارك دعوتك</span>
        <button onClick={handleShare}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          <span>{copied ? 'تم النسخ!' : 'شارك الدعوة'}</span>
        </button>
      </div>

      <div className="max-w-md mx-auto px-4 pb-16 pt-8 flex flex-col items-center gap-6">

        <GreenDots />
        <GreenDots />

        <div className="flex items-center gap-2 text-sm tracking-[6px] font-semibold" style={{ color: '#7C9A7E' }}>
          <span className="text-xs">✦</span>
          <span>دعوة زفاف ربيعية</span>
          <span className="text-xs">✦</span>
        </div>

        {/* Names */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-6xl font-bold leading-tight" style={{ color: '#4A7C4E', fontFamily: 'var(--font-playfair), serif', textShadow: '0 2px 4px rgba(74,124,78,0.1)' }}>
            {groomName}
          </h1>
          <div className="flex items-center gap-3 my-2">
            <span className="w-10 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, #7C9A7E)' }} />
            <span className="text-lg font-medium" style={{ color: '#7C9A7E80' }}>مع</span>
            <span className="w-10 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #7C9A7E)' }} />
          </div>
          <h1 className="text-6xl font-bold leading-tight" style={{ color: '#4A7C4E', fontFamily: 'var(--font-playfair), serif', textShadow: '0 2px 4px rgba(74,124,78,0.1)' }}>
            {brideName}
          </h1>
        </div>

        {coverImageUrl && (
          <div className="w-full h-56 rounded-2xl overflow-hidden shadow-lg" style={{ border: '1px solid rgba(124,154,126,0.3)' }}>
            <img src={coverImageUrl} alt="Wedding" className="w-full h-full object-cover" />
          </div>
        )}

        {message && (
          <div className="text-center text-sm leading-loose px-4" style={{ color: '#3D5C3F' }}>
            <span className="text-lg" style={{ color: '#7C9A7E' }}>"</span>
            {message}
            <span className="text-lg" style={{ color: '#7C9A7E' }}>"</span>
          </div>
        )}

        <GreenDivider />

        {/* Date & Venue Card */}
        <OrnamentBorder className="w-full">
          <div className="flex flex-col gap-3">
            {[
              { emoji: '📅', text: formatDate(dateStart) },
              { emoji: '🕐', text: `${formatTime(dateStart)}${dateEnd ? ` — ${formatTime(dateEnd)}` : ''}` },
              { emoji: '📍', text: venueName },
            ].map((item, i) => (
              <div key={i} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(124,154,126,0.2)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,154,126,0.1)' }}>
                  <span className="text-sm">{item.emoji}</span>
                </div>
                <span className="text-sm font-semibold text-right flex-1" style={{ color: '#3D5C3F' }}>{item.text}</span>
              </div>
            ))}
            {venueMapUrl && (
              <a href={venueMapUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: '#7C9A7E', color: '#fff' }}>
                <MapPin className="h-4 w-4" />
                افتح في خرائط جوجل
              </a>
            )}
          </div>
        </OrnamentBorder>

        <GreenDivider />

        <OrnamentBorder className="w-full">
          <Countdown targetDate={dateStart} accentColor="#7C9A7E" bgColor="rgba(255,255,255,0.8)" />
        </OrnamentBorder>

        <GreenDivider />

        {/* Names + Rings */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-sm tracking-[6px] font-semibold" style={{ color: '#7C9A7E' }}>
            <span className="text-xs">✦</span><span>زفاف</span><span className="text-xs">✦</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-3xl font-bold" style={{ color: '#4A7C4E', fontFamily: 'var(--font-playfair), serif' }}>{brideName}</span>
            <span className="text-3xl opacity-70">💍</span>
            <span className="text-3xl font-bold" style={{ color: '#4A7C4E', fontFamily: 'var(--font-playfair), serif' }}>{groomName}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-16 h-[1px]" style={{ background: 'rgba(124,154,126,0.4)' }} />
            <span className="text-xs" style={{ color: 'rgba(124,154,126,0.6)' }}>✦</span>
            <span className="w-16 h-[1px]" style={{ background: 'rgba(124,154,126,0.4)' }} />
          </div>
        </div>

        {photoAlbumSection && <><GreenDivider /><div className="w-full">{photoAlbumSection}</div></>}
        {rsvpSection && <><GreenDivider /><div className="w-full">{rsvpSection}</div></>}
        {commentsSection && <><GreenDivider /><div className="w-full">{commentsSection}</div></>}
        {musicPlayerSection && <div className="w-full mt-2">{musicPlayerSection}</div>}

        <button onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] mt-4"
          style={{ background: '#7C9A7E', color: '#fff', boxShadow: '0 4px 20px rgba(124,154,126,0.3)' }}>
          {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
          <span>{copied ? 'تم نسخ الرابط!' : 'شارك مع الأصناب'}</span>
        </button>

        <GreenDots />
      </div>
    </div>
  );
};
