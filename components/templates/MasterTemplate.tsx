'use client';

import React, { useCallback } from 'react';
import { Invitation } from '@/types';
import { Countdown } from '@/components/invitation/Countdown';
import { RSVPForm } from '@/components/invitation/RSVPForm';
import { GuestListView } from '@/components/invitation/GuestListView';
import { Comments } from '@/components/invitation/Comments';
import { PhotoAlbum } from '@/components/invitation/PhotoAlbum';

interface MasterTemplateProps {
  invitation: Invitation;
}

export const MasterTemplate: React.FC<MasterTemplateProps> = ({ invitation }) => {
  const {
    groom_name,
    bride_name,
    date_start,
    date_end,
    venue_name,
    venue_map_url,
    message,
    photo_album_urls,
    photo_album_enabled,
    comments_enabled,
    rsvp_enabled,
    template_id
  } = invitation;

  const handleWhatsAppShare = useCallback(() => {
    const text = `يسعدنا دعوتكم لحضور حفل زفاف ${groom_name} & ${bride_name}!\n\n${typeof window !== 'undefined' ? window.location.href : ''}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  }, [groom_name, bride_name]);

  const handleGoogleCalendar = useCallback(() => {
    if (!date_start) return;
    const start = new Date(date_start);
    const end = date_end ? new Date(date_end) : new Date(start.getTime() + 3 * 60 * 60 * 1000);
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `حفل زفاف ${groom_name} & ${bride_name}`,
      dates: `${start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      details: message || '',
      location: venue_name || '',
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  }, [groom_name, bride_name, date_start, date_end, message, venue_name]);

  // Format date to Arabic (e.g., الجمعة، 25 ديسمبر 2026)
  const formatArabicDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatArabicTime = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  const getTemplateImage = (id: string) => {
    switch (id) {
      case 'mediterranean-gate': return '/templates/theme-greek-door-Jv_FhrVA.png';
      case 'alhambra-arch': return '/templates/theme-alhambra-arch-CsfUpPjg.png';
      case 'rustic-garden-arch': return '/templates/theme-rustic-arch-Crn5sfwp.png';
      case 'chandelier-garden': return '/templates/theme-chandelier-garden-CzFTSeH2.png';
      case 'cairo-citadel': return '/templates/theme-cairo-citadel-CT6ofPiE.png';
      case 'andalusian-frame': return '/templates/theme-andalusian-frame-BbE8Ghv4.png';
      case 'white-roses': return '/templates/theme-white-roses-BZgzK_Oo.png';
      case 'ottoman-courtyard': return '/templates/theme-ottoman-palace-ChaZgPiF.png';
      case 'royal-palace-night': return '/templates/theme-palace-night-BHYFwz7p.png';
      default: return null;
    }
  };

  const bgImage = getTemplateImage(template_id);

  return (
    <div className="antialiased text-on-surface min-h-screen flex flex-col items-center py-12 relative w-full" dir="rtl">
      
      {/* Background Styling specifically for the master template */}
      <style dangerouslySetInnerHTML={{__html: `
        .master-template-bg {
          background-color: #fcf9f8;
          background-image: radial-gradient(#d4af37 0.5px, transparent 0.5px), radial-gradient(#d4af37 0.5px, #fcf9f8 0.5px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
          background-attachment: fixed;
          font-family: 'Cairo', sans-serif;
          color: #1b1c1c;
        }
        .font-calligraphy { font-family: 'Amiri', serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 8px 32px 0 rgba(0, 17, 58, 0.1);
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(212, 175, 55, 0.2);
          transition: all 0.3s ease;
        }
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.8);
          border-color: #d4af37;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
        }
        
        .divider-gold {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 3rem 0;
        }
        .divider-gold::before, .divider-gold::after {
          content: '';
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af37);
          width: 80px;
          margin: 0 15px;
        }
        .divider-gold::after {
          background: linear-gradient(270deg, transparent, #d4af37);
        }

        .shimmer-button {
          position: relative;
          overflow: hidden;
        }
        .shimmer-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          transform: rotate(30deg);
          animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(30deg); }
          100% { transform: translateX(100%) rotate(30deg); }
        }
      `}} />

      {/* Dynamic Background Image */}
      <div 
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundColor: '#fcf9f8'
        }}
      ></div>
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 -z-10 bg-white/40 backdrop-blur-[2px]"></div>

      {/* Language Switcher (Fixed) */}
      <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50 flex space-x-2 space-x-reverse glass-panel rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm">
        <button className="text-[#444650] hover:text-[#775a19] px-1.5 md:px-2 font-medium transition-colors">EN</button>
        <div className="w-px bg-[#775a19] opacity-30"></div>
        <button className="text-[#00113a] font-bold px-1.5 md:px-2 flex items-center gap-1.5">
          AR
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#775a19]"></span>
        </button>
      </div>

      <main className="w-full max-w-lg px-4 md:px-6 flex flex-col items-center space-y-10 md:space-y-12">
        {/* Header Section */}
        <header className="w-full flex flex-col items-center text-center pt-8 md:pt-12">
          <div className="text-[#775a19] text-xs md:text-sm mb-3 md:mb-4 flex items-center gap-2 md:gap-3 tracking-widest uppercase">
            <span className="font-display">تهاني</span>
          </div>
          <div className="font-calligraphy text-5xl md:text-7xl lg:text-8xl text-[#00113a] font-bold mb-4 md:mb-6 flex flex-col items-center drop-shadow-sm break-words max-w-full px-2">
            <span className="mb-1 md:mb-2">{groom_name}</span>
            <span className="text-3xl md:text-4xl lg:text-5xl text-[#775a19] font-display font-light my-2 md:my-4">&</span>
            <span>{bride_name}</span>
          </div>
          <div className="text-[#775a19] text-xs md:text-sm mt-4 md:mt-6 flex items-center gap-2 md:gap-3 tracking-widest uppercase">
            <span className="font-display">زفاف</span>
          </div>
          <div className="divider-gold w-full max-w-[200px] md:max-w-[250px] mt-6 md:mt-8">
            <svg className="mx-auto text-[#775a19]" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91Z"/></svg>
          </div>
        </header>

        {/* Event Details */}
        <section className="w-full relative">
          <div className="glass-panel rounded-2xl p-5 md:p-8 text-center relative overflow-hidden">
            <p className="text-[#00113a] font-medium text-base md:text-lg mb-6 md:mb-8 leading-loose px-2 md:px-4 font-display italic">
              {'"' + (message || 'يسعدنا ويشرفنا دعوتكم لحضور حفل زفافنا. نتمنى أن تشاركونا هذه اللحظات السعيدة وتكونون جزءاً من فرحتنا.') + '"'}
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white/40 border border-[#775a19]/20 rounded-xl p-3 md:p-4 flex justify-between items-center text-xs md:text-sm backdrop-blur-sm gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] md:text-xs text-[#444650] block text-right mb-0.5 md:mb-1 uppercase tracking-wider">التاريخ</span>
                  <span className="font-bold text-[#00113a] text-sm md:text-base break-words">{formatArabicDate(date_start)}</span>
                </div>
                <div className="text-[#775a19] bg-white p-2 md:p-3 rounded-full shadow-sm border border-[#775a19]/10 shrink-0">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
              </div>
              <div className="bg-white/40 border border-[#775a19]/20 rounded-xl p-3 md:p-4 flex justify-between items-center text-xs md:text-sm backdrop-blur-sm gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] md:text-xs text-[#444650] block text-right mb-0.5 md:mb-1 uppercase tracking-wider">الوقت</span>
                  <span className="font-bold text-[#00113a] text-sm md:text-base break-words">{formatArabicTime(date_start)} - {formatArabicTime(date_end)}</span>
                </div>
                <div className="text-[#775a19] bg-white p-2 md:p-3 rounded-full shadow-sm border border-[#775a19]/10 shrink-0">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
              </div>
              <div className="bg-white/40 border border-[#775a19]/20 rounded-xl p-3 md:p-4 flex justify-between items-center text-xs md:text-sm backdrop-blur-sm gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] md:text-xs text-[#444650] block text-right mb-0.5 md:mb-1 uppercase tracking-wider">المكان</span>
                  <span className="font-bold text-[#00113a] text-sm md:text-base break-words">{venue_name || 'قاعة الأحلام'}</span>
                </div>
                <div className="text-[#775a19] bg-white p-2 md:p-3 rounded-full shadow-sm border border-[#775a19]/10 shrink-0">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
              </div>
            </div>
            {venue_map_url && (
              <a href={venue_map_url} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-br from-[#d4af37] to-[#f3e5ab] text-[#00113a] rounded-xl py-3 md:py-4 mt-6 md:mt-8 font-bold text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 hover:opacity-90 transition shadow-[0_4px_15px_rgba(212,175,55,0.4)] shimmer-button min-h-[44px]">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                افتح في خرائط جوجل
              </a>
            )}
          </div>
        </section>



        {/* Countdown & Calendar */}
        <section className="w-full relative">
          <div className="glass-panel rounded-2xl p-5 md:p-8 text-center relative">
            <div className="flex items-center justify-center gap-2 md:gap-3 text-[#775a19] text-xs md:text-sm font-bold mb-6 md:mb-8 uppercase tracking-widest">
              العد التنازلي
            </div>
            
            <Countdown targetDate={date_start} />

            <div className="text-xs md:text-sm font-bold text-[#00113a] mb-3 md:mb-4 mt-6 md:mt-8 uppercase tracking-wider">أضف للتقويم</div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleGoogleCalendar}
                className="flex-1 bg-white border border-[#775a19]/20 text-[#00113a] rounded-xl py-3 px-3 md:px-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm min-h-[44px]"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple Calendar
              </button>
              <button
                type="button"
                onClick={handleGoogleCalendar}
                className="flex-1 bg-white border border-[#775a19]/20 text-[#00113a] rounded-xl py-3 px-3 md:px-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm min-h-[44px]"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.63 12.18c0 1.7 1.38 3.08 3.08 3.08s3.08-1.38 3.08-3.08-1.38-3.08-3.08-3.08-3.08 1.38-3.08 3.08z"/><path d="M21.5 0h-19C1.12 0 0 1.12 0 2.5v19C0 22.88 1.12 24 2.5 24h19c1.38 0 2.5-1.12 2.5-2.5v-19C24 1.12 22.88 0 21.5 0zM12 17.38c-2.86 0-5.19-2.33-5.19-5.19S9.14 7 12 7s5.19 2.33 5.19 5.19-2.32 5.19-5.19 5.19zm8-9.25c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                Google Calendar
              </button>
            </div>
          </div>
        </section>

        <div className="divider-gold w-full max-w-[200px] md:max-w-[250px]">
          <svg className="mx-auto text-[#775a19]" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91Z"/></svg>
        </div>

        {/* Photo Gallery */}
        {photo_album_enabled && (
          <>
            <section className="w-full glass-panel rounded-2xl p-5 md:p-8 text-center relative">
              <div className="flex items-center justify-center gap-2 md:gap-3 text-[#00113a] font-display font-bold text-lg md:text-2xl mb-1 md:mb-2">
                <h2>ألبوم الصور</h2>
              </div>
              <p className="text-xs md:text-sm text-[#444650] mb-6 md:mb-8 font-light">شاركوا لحظاتكم الجميلة</p>
              
              <PhotoAlbum urls={photo_album_urls} />

              <button className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#d4af37] to-[#f3e5ab] text-[#00113a] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:opacity-90 transition text-lg md:text-xl shimmer-button z-10">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </button>
            </section>
            <div className="divider-gold w-full max-w-[200px] md:max-w-[250px]">
              <svg className="mx-auto text-[#775a19]" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91Z"/></svg>
            </div>
          </>
        )}

        {/* RSVP / Guestbook Form */}
        {rsvp_enabled && (
          <>
            <section className="w-full glass-panel rounded-2xl p-5 md:p-8 text-center">
              <div className="flex items-center justify-center gap-2 md:gap-3 text-[#00113a] font-display font-bold text-lg md:text-2xl mb-1 md:mb-2">
                <h2>تأكيد الحضور وسجل الضيوف</h2>
              </div>
              <p className="text-xs md:text-sm text-[#444650] mb-6 md:mb-8 font-light">أكد حضورك واكتب كلمة للعروسين</p>
              <RSVPForm invitationId={invitation.id} />
              <GuestListView invitationId={invitation.id} />
            </section>
            <div className="divider-gold w-full max-w-[200px] md:max-w-[250px]">
              <svg className="mx-auto text-[#775a19]" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91Z"/></svg>
            </div>
          </>
        )}

        {/* Comments & Congratulations */}
        {comments_enabled && (
          <section className="w-full glass-panel rounded-2xl p-5 md:p-8">
            <div className="flex items-center gap-2 md:gap-3 text-[#00113a] font-display font-bold text-lg md:text-2xl mb-6 md:mb-8 justify-center">
              <h2>التهاني والتعليقات</h2>
            </div>
            <Comments invitationId={invitation.id} />
          </section>
        )}

        {/* Footer */}
        <footer className="w-full flex flex-col items-center text-center pt-8 md:pt-12 pb-12 md:pb-16">
          <div className="divider-gold w-full max-w-[200px] md:max-w-[250px]">
            <svg className="mx-auto text-[#775a19]" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91Z"/></svg>
          </div>
          <div className="text-[#775a19] text-xs md:text-sm mb-4 md:mb-6 tracking-widest uppercase font-display">زفاف</div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 md:mb-8 drop-shadow-sm px-2 w-full">
            <span className="font-calligraphy text-3xl md:text-5xl lg:text-6xl text-[#00113a] font-bold break-words max-w-full">{bride_name}</span>
            <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center shrink-0">
              <svg fill="none" height="24" viewBox="0 0 40 24" width="32" xmlns="http://www.w3.org/2000/svg" className="md:h-8 md:w-auto">
                <circle cx="14" cy="12" r="10" stroke="#d4af37" strokeWidth="2.5"></circle>
                <circle cx="26" cy="12" r="10" stroke="#d4af37" strokeWidth="2.5"></circle>
              </svg>
            </div>
            <span className="font-calligraphy text-3xl md:text-5xl lg:text-6xl text-[#00113a] font-bold break-words max-w-full">{groom_name}</span>
          </div>
          <div className="flex gap-2 md:gap-3 text-[#775a19] mb-6 md:mb-10">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91Z"/></svg>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91Z"/></svg>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91Z"/></svg>
          </div>
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full max-w-xs bg-gradient-to-br from-[#d4af37] to-[#f3e5ab] text-[#00113a] rounded-full py-3.5 md:py-4 text-sm md:text-base font-bold flex items-center justify-center gap-2 md:gap-3 hover:opacity-90 transition shadow-[0_4px_15px_rgba(212,175,55,0.4)] shimmer-button min-h-[44px]"
          >
            شارك عبر واتساب
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          </button>
        </footer>

      </main>
    </div>
  );
};
