'use client';

import React, { useState } from 'react';
import { MapPin, Share2, Check, Heart } from 'lucide-react';
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

const Divider = () => (
  <div className="flex items-center justify-center gap-2 w-full my-1 opacity-70">
    <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
    <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
      <circle cx="30" cy="5" r="2" fill="#C9A84C" />
      <circle cx="18" cy="5" r="1.2" fill="#C9A84C" opacity="0.6" />
      <circle cx="42" cy="5" r="1.2" fill="#C9A84C" opacity="0.6" />
    </svg>
    <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
  </div>
);

const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`relative rounded-2xl p-5 ${className}`}
    style={{
      background: 'rgba(253, 245, 235, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(201, 168, 76, 0.3)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.5)',
    }}
  >
    <span className="absolute top-2 right-2 text-[#C9A84C] text-[10px] opacity-50">✦</span>
    <span className="absolute top-2 left-2 text-[#C9A84C] text-[10px] opacity-50">✦</span>
    <span className="absolute bottom-2 right-2 text-[#C9A84C] text-[10px] opacity-50">✦</span>
    <span className="absolute bottom-2 left-2 text-[#C9A84C] text-[10px] opacity-50">✦</span>
    {children}
  </div>
);

export const AlNaseem: React.FC<TemplateProps> = ({
  groomName, brideName, dateStart, dateEnd, venueName, venueMapUrl,
  message, coverImageUrl, rsvpSection, commentsSection, photoAlbumSection, musicPlayerSection,
}) => {
  const [copied, setCopied] = useState(false);

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); }
    catch { return d; }
  };
  const formatTime = (d: string) => {
    try { return new Date(d).toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit', hour12: true }); }
    catch { return ''; }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `دعوة زفاف ${groomName} و ${brideName}`, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen relative" style={{ fontFamily: 'var(--font-cairo), sans-serif' }} dir="rtl">

      {/* Full-screen background image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/templates/naseem-bg.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(30,5,5,0.65) 0%, rgba(60,10,10,0.55) 50%, rgba(30,5,5,0.70) 100%)'
        }} />
      </div>

      {/* Top Share Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(139,26,26,0.92)', backdropFilter: 'blur(8px)' }}>
        <span className="text-white/75 text-xs font-medium">قم بالمشاركة لنشر دعوتك</span>
        <button onClick={handleShare}
          className="flex items-center gap-2 text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 transition-all">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          <span>{copied ? 'تم النسخ!' : 'شارك الدعوة'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-4 pb-16 pt-10 flex flex-col items-center gap-6">

        {/* Decorative dots */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex gap-4"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/50" /><span className="w-2 h-2 rounded-full bg-[#C9A84C]/70" /><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/50" /></div>
          <div className="flex gap-4"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/30" /><span className="w-2 h-2 rounded-full bg-[#C9A84C]/50" /><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/30" /></div>
        </div>

        {/* زفاف label */}
        <div className="flex items-center gap-2 text-sm tracking-[6px] font-semibold text-[#C9A84C] drop-shadow-lg">
          <span className="text-xs">✦</span><span>زفاف</span><span className="text-xs">✦</span>
        </div>

        {/* Names */}
        <div className="flex flex-col items-center gap-1 text-center drop-shadow-xl">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-playfair), serif', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            {groomName}
          </h1>
          <div className="flex items-center gap-3 my-1">
            <span className="w-12 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
            <Heart className="h-5 w-5 text-[#C9A84C] fill-[#C9A84C]/40 drop-shadow-lg" />
            <span className="w-12 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-playfair), serif', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            {brideName}
          </h1>
        </div>

        {/* Message */}
        {message && (
          <GlassCard className="w-full text-center">
            <p className="text-sm leading-loose text-[#3D2B1F] italic">
              <span className="text-xl text-[#C9A84C] not-italic">"</span>
              {message}
              <span className="text-xl text-[#C9A84C] not-italic">"</span>
            </p>
          </GlassCard>
        )}

        <Divider />

        {/* Date & Venue Card */}
        <GlassCard className="w-full">
          <div className="flex flex-col gap-3">
            <div className="text-center text-xs tracking-widest font-bold text-[#C9A84C] mb-1">التاريخ والمكان</div>
            {[
              { emoji: '📅', text: formatDate(dateStart) },
              { emoji: '🕐', text: `${formatTime(dateStart)}${dateEnd ? ` — ${formatTime(dateEnd)}` : ''}` },
              { emoji: '📍', text: venueName },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <span className="text-base">{item.emoji}</span>
                <span className="text-sm font-semibold text-[#3D2B1F] text-right flex-1">{item.text}</span>
              </div>
            ))}
            {venueMapUrl && (
              <a href={venueMapUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                style={{ background: '#C9A84C', boxShadow: '0 2px 12px rgba(201,168,76,0.4)' }}>
                <MapPin className="h-4 w-4" />
                افتح في خرائط جوجل
              </a>
            )}
          </div>
        </GlassCard>

        <Divider />

        {/* Countdown Card */}
        <GlassCard className="w-full">
          <Countdown targetDate={dateStart} accentColor="#C9A84C" bgColor="rgba(255,255,255,0.7)" />
        </GlassCard>

        <Divider />

        {/* Names + Rings */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs tracking-[5px] font-bold text-[#C9A84C] drop-shadow">
            <span>✦</span><span>زفاف</span><span>✦</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-white drop-shadow-xl"
              style={{ fontFamily: 'var(--font-playfair), serif' }}>{brideName}</span>
            <span className="text-3xl drop-shadow-xl">💍</span>
            <span className="text-3xl font-bold text-white drop-shadow-xl"
              style={{ fontFamily: 'var(--font-playfair), serif' }}>{groomName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-16 h-[1px] bg-[#C9A84C]/40" />
            <span className="text-[#C9A84C]/70 text-xs">✦</span>
            <span className="w-16 h-[1px] bg-[#C9A84C]/40" />
          </div>
        </div>

        {/* Cover image (optional) */}
        {coverImageUrl && (
          <div className="w-full h-56 rounded-2xl overflow-hidden shadow-2xl border border-[#C9A84C]/30">
            <img src={coverImageUrl} alt="Wedding" className="w-full h-full object-cover" />
          </div>
        )}

        {photoAlbumSection && <><Divider /><div className="w-full">{photoAlbumSection}</div></>}
        {rsvpSection && <><Divider /><div className="w-full">{rsvpSection}</div></>}
        {commentsSection && <><Divider /><div className="w-full">{commentsSection}</div></>}
        {musicPlayerSection && <div className="w-full mt-2">{musicPlayerSection}</div>}

        {/* Share Button */}
        <button onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] mt-2"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #8B1A1A)', boxShadow: '0 6px 24px rgba(0,0,0,0.35)' }}>
          {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
          <span>{copied ? 'تم نسخ الرابط!' : 'شارك مع الأصناب'}</span>
        </button>

        <div className="flex gap-4"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40" /><span className="w-2 h-2 rounded-full bg-[#C9A84C]/60" /><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40" /></div>
      </div>
    </div>
  );
};
