'use client';

import React, { useState } from 'react';
import { MapPin, Share2, Check, Heart } from 'lucide-react';
import { Countdown } from '@/components/invitation/Countdown';

interface TemplateProps {
  templateId: string;
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
}

const themeConfigs: Record<string, { image: string, primary: string, accent: string, overlay: string }> = {
  'greek-door': { image: '/templates/theme-greek-door-Jv_FhrVA.png', primary: '#2D5B8C', accent: '#D4AF37', overlay: 'rgba(255,255,255,0.75)' },
  'alhambra-arch': { image: '/templates/theme-alhambra-arch-CsfUpPjg.png', primary: '#8B4513', accent: '#C9A84C', overlay: 'rgba(253,245,235,0.75)' },
  'rustic-arch': { image: '/templates/theme-rustic-arch-Crn5sfwp.png', primary: '#556B2F', accent: '#8B7355', overlay: 'rgba(255,255,255,0.8)' },
  'chandelier-garden': { image: '/templates/theme-chandelier-garden-CzFTSeH2.png', primary: '#4A5D23', accent: '#C9A84C', overlay: 'rgba(255,255,255,0.8)' },
  'cairo-citadel': { image: '/templates/theme-cairo-citadel-CT6ofPiE.png', primary: '#8B4513', accent: '#D4AF37', overlay: 'rgba(255,250,240,0.8)' },
  'andalusian-frame': { image: '/templates/theme-andalusian-frame-BbE8Ghv4.png', primary: '#1A365D', accent: '#C9A84C', overlay: 'rgba(255,255,255,0.85)' },
  'white-roses': { image: '/templates/theme-white-roses-BZgzK_Oo.png', primary: '#2F4F4F', accent: '#A9A9A9', overlay: 'rgba(255,255,255,0.8)' },
  'ottoman-palace': { image: '/templates/theme-ottoman-palace-ChaZgPiF.png', primary: '#191970', accent: '#D4AF37', overlay: 'rgba(20,20,40,0.75)' },
  'palace-night': { image: '/templates/theme-palace-night-BHYFwz7p.png', primary: '#F5FFFA', accent: '#D4AF37', overlay: 'rgba(10,15,35,0.8)' },
  'beach-sage': { image: '/templates/theme-beach-sage-C2FQsRAs.png', primary: '#2F4F4F', accent: '#8FBC8F', overlay: 'rgba(255,255,255,0.8)' },
  'boho-table': { image: '/templates/theme-boho-table-DUwgKJkv.png', primary: '#8B4513', accent: '#DEB887', overlay: 'rgba(255,250,240,0.8)' },
  'enchanted-lanterns': { image: '/templates/theme-enchanted-lanterns-BGn6R8HS.png', primary: '#FFFAF0', accent: '#FFD700', overlay: 'rgba(20,10,30,0.8)' },
  'plaster-frame': { image: '/templates/theme-plaster-frame-BlNagAaD.png', primary: '#696969', accent: '#BDB76B', overlay: 'rgba(255,255,255,0.8)' },
  'royal-curtains': { image: '/templates/theme-royal-curtains-DXMKvfIZ.png', primary: '#800000', accent: '#FFD700', overlay: 'rgba(255,250,240,0.85)' },
};

const Divider = ({ color }: { color: string }) => (
  <div className="flex items-center justify-center gap-2 w-full my-1 opacity-70">
    <span className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}80)` }} />
    <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
      <circle cx="30" cy="5" r="2" fill={color} />
      <circle cx="18" cy="5" r="1.2" fill={color} opacity="0.6" />
      <circle cx="42" cy="5" r="1.2" fill={color} opacity="0.6" />
    </svg>
    <span className="flex-1 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${color}80)` }} />
  </div>
);

const GlassCard = ({ children, overlay, accent, className = '' }: { children: React.ReactNode; overlay: string; accent: string; className?: string }) => (
  <div
    className={`relative rounded-2xl p-5 ${className}`}
    style={{
      background: overlay,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: `1px solid ${accent}40`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    }}
  >
    <span className="absolute top-2 right-2 text-[10px] opacity-60" style={{ color: accent }}>✦</span>
    <span className="absolute top-2 left-2 text-[10px] opacity-60" style={{ color: accent }}>✦</span>
    <span className="absolute bottom-2 right-2 text-[10px] opacity-60" style={{ color: accent }}>✦</span>
    <span className="absolute bottom-2 left-2 text-[10px] opacity-60" style={{ color: accent }}>✦</span>
    {children}
  </div>
);

export const DynamicTemplate: React.FC<TemplateProps> = ({
  templateId, groomName, brideName, dateStart, dateEnd, venueName, venueMapUrl,
  message, coverImageUrl, rsvpSection, commentsSection, photoAlbumSection, musicPlayerSection,
}) => {
  const [copied, setCopied] = useState(false);
  
  // Fallback to greek-door if template not found
  const config = themeConfigs[templateId] || themeConfigs['greek-door'];
  const { image, primary, accent, overlay } = config;
  
  // Determine if it's a dark background theme based on overlay alpha/color
  const isDarkOverlay = overlay.startsWith('rgba(10') || overlay.startsWith('rgba(20');
  const textColor = isDarkOverlay ? '#FFF' : primary;

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
        <img src={image} alt="background" className="w-full h-full object-cover" />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Top Share Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: `linear-gradient(to right, ${primary}e6, ${primary}cc)`, backdropFilter: 'blur(8px)' }}>
        <span className="text-white/80 text-xs font-medium">قم بالمشاركة لنشر دعوتك</span>
        <button onClick={handleShare}
          className="flex items-center gap-2 text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-all">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          <span>{copied ? 'تم النسخ!' : 'شارك الدعوة'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-4 pb-16 pt-10 flex flex-col items-center gap-6">

        {/* Decorative dots */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex gap-4"><span className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: accent }} /><span className="w-2 h-2 rounded-full opacity-70" style={{ backgroundColor: accent }} /><span className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: accent }} /></div>
          <div className="flex gap-4"><span className="w-1.5 h-1.5 rounded-full opacity-30" style={{ backgroundColor: accent }} /><span className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: accent }} /><span className="w-1.5 h-1.5 rounded-full opacity-30" style={{ backgroundColor: accent }} /></div>
        </div>

        {/* زفاف label */}
        <div className="flex items-center gap-2 text-sm tracking-[6px] font-semibold drop-shadow-md" style={{ color: primary }}>
          <span className="text-xs">✦</span><span>زفاف</span><span className="text-xs">✦</span>
        </div>

        {/* Names */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-[36px] md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif', color: primary, textShadow: '0 2px 10px rgba(255,255,255,0.3)' }}>
            {groomName}
          </h1>
          <div className="flex items-center gap-3 my-1">
            <span className="w-12 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
            <Heart className="h-5 w-5" style={{ color: accent, fill: `${accent}40` }} />
            <span className="w-12 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
          </div>
          <h1 className="text-[36px] md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif', color: primary, textShadow: '0 2px 10px rgba(255,255,255,0.3)' }}>
            {brideName}
          </h1>
        </div>

        {/* Message */}
        {message && (
          <GlassCard overlay={overlay} accent={accent} className="w-full text-center">
            <p className="text-sm leading-loose italic" style={{ color: textColor }}>
              <span className="text-xl not-italic mr-1" style={{ color: accent }}>"</span>
              {message}
              <span className="text-xl not-italic ml-1" style={{ color: accent }}>"</span>
            </p>
          </GlassCard>
        )}

        <Divider color={accent} />

        {/* Date & Venue Card */}
        <GlassCard overlay={overlay} accent={accent} className="w-full">
          <div className="flex flex-col gap-3">
            <div className="text-center text-xs tracking-widest font-bold mb-1" style={{ color: accent }}>التاريخ والمكان</div>
            {[
              { emoji: '📅', text: formatDate(dateStart) },
              { emoji: '🕐', text: `${formatTime(dateStart)}${dateEnd ? ` — ${formatTime(dateEnd)}` : ''}` },
              { emoji: '📍', text: venueName },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ background: isDarkOverlay ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)', border: `1px solid ${accent}30` }}>
                <span className="text-base">{item.emoji}</span>
                <span className="text-sm font-semibold text-right flex-1" style={{ color: textColor }}>{item.text}</span>
              </div>
            ))}
            {venueMapUrl && (
              <a href={venueMapUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 mt-1"
                style={{ background: accent, boxShadow: `0 4px 15px ${accent}50` }}>
                <MapPin className="h-4 w-4" />
                افتح في خرائط جوجل
              </a>
            )}
          </div>
        </GlassCard>

        <Divider color={accent} />

        {/* Countdown Card */}
        <GlassCard overlay={overlay} accent={accent} className="w-full">
          <Countdown targetDate={dateStart} accentColor={accent} bgColor={isDarkOverlay ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)'} />
        </GlassCard>

        <Divider color={accent} />

        {/* Names + Rings */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs tracking-[5px] font-bold" style={{ color: accent }}>
            <span>✦</span><span>زفاف</span><span>✦</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair), serif', color: primary }}>{brideName}</span>
            <span className="text-3xl drop-shadow-lg">💍</span>
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair), serif', color: primary }}>{groomName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-16 h-[1px]" style={{ background: `${accent}60` }} />
            <span className="text-xs" style={{ color: accent }}>✦</span>
            <span className="w-16 h-[1px]" style={{ background: `${accent}60` }} />
          </div>
        </div>

        {/* Cover image (optional) */}
        {coverImageUrl && (
          <div className="w-full h-56 rounded-2xl overflow-hidden shadow-2xl mt-4" style={{ border: `1px solid ${accent}50` }}>
            <img src={coverImageUrl} alt="Wedding" className="w-full h-full object-cover" />
          </div>
        )}

        {photoAlbumSection && <><Divider color={accent} /><div className="w-full text-white">{photoAlbumSection}</div></>}
        {rsvpSection && <><Divider color={accent} /><div className="w-full text-white">{rsvpSection}</div></>}
        {commentsSection && <><Divider color={accent} /><div className="w-full text-white">{commentsSection}</div></>}
        {musicPlayerSection && <div className="w-full mt-2">{musicPlayerSection}</div>}

        {/* Share Button */}
        <button onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] mt-4"
          style={{ background: primary, boxShadow: `0 6px 24px ${primary}60` }}>
          {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
          <span>{copied ? 'تم نسخ الرابط!' : 'شارك مع الأصناب'}</span>
        </button>

        <div className="flex gap-4 mt-2"><span className="w-1.5 h-1.5 rounded-full opacity-40" style={{ backgroundColor: accent }} /><span className="w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: accent }} /><span className="w-1.5 h-1.5 rounded-full opacity-40" style={{ backgroundColor: accent }} /></div>
      </div>
    </div>
  );
};
