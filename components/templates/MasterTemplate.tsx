import React from 'react';
import { Invitation } from '@/types';
import { Countdown } from '@/components/invitation/Countdown';
import { RSVPForm } from '@/components/invitation/RSVPForm';
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
      <div className="fixed top-8 left-8 z-50 flex space-x-2 space-x-reverse glass-panel rounded-full px-4 py-2 text-sm">
        <button className="text-[#444650] hover:text-[#775a19] px-2 font-medium transition-colors">EN</button>
        <div className="w-px bg-[#775a19] opacity-30"></div>
        <button className="text-[#00113a] font-bold px-2 flex items-center gap-2">
          AR
          <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
        </button>
      </div>

      <main className="w-full max-w-lg px-6 flex flex-col items-center space-y-12">
        {/* Header Section */}
        <header className="w-full flex flex-col items-center text-center pt-12">
          <div className="text-[#775a19] text-sm mb-4 flex items-center gap-3 tracking-widest uppercase">
            <i className="fa-solid fa-star text-[10px]"></i>
            <span className="font-display">تهاني</span>
            <i className="fa-solid fa-star text-[10px]"></i>
          </div>
          <div className="font-calligraphy text-8xl text-[#00113a] font-bold mb-6 flex flex-col items-center drop-shadow-sm">
            <span className="mb-2">{groom_name}</span>
            <span className="text-5xl text-[#775a19] font-display font-light my-4">&</span>
            <span>{bride_name}</span>
          </div>
          <div className="text-[#775a19] text-sm mt-6 flex items-center gap-3 tracking-widest uppercase">
            <i className="fa-solid fa-circle text-[6px]"></i>
            <span className="font-display">زفاف</span>
            <i className="fa-solid fa-circle text-[6px]"></i>
          </div>
          <div className="divider-gold w-full max-w-[250px] mt-8">
            <i className="fa-solid fa-diamond text-[#775a19] text-[10px]"></i>
          </div>
        </header>

        {/* Event Details */}
        <section className="w-full relative">
          <div className="glass-panel rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[#775a19] opacity-60">
              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="currentColor"></path></svg>
            </div>
            <div className="absolute bottom-4 left-4 text-[#775a19] opacity-60">
              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="currentColor"></path></svg>
            </div>
            <p className="text-[#00113a] font-medium text-lg mb-8 leading-loose px-4 font-display italic">
              {'"' + (message || 'يسعدنا ويشرفنا دعوتكم لحضور حفل زفافنا. نتمنى أن تشاركونا هذه اللحظات السعيدة وتكونوا جزءاً من فرحتنا.') + '"'}
            </p>
            <div className="space-y-4">
              <div className="bg-white/40 border border-[#775a19]/20 rounded-xl p-4 flex justify-between items-center text-sm backdrop-blur-sm">
                <div>
                  <span className="text-xs text-[#444650] block text-right mb-1 uppercase tracking-wider">التاريخ</span>
                  <span className="font-bold text-[#00113a] text-base">{formatArabicDate(date_start)}</span>
                </div>
                <div className="text-[#775a19] bg-white p-3 rounded-full shadow-sm border border-[#775a19]/10">
                  <i className="fa-regular fa-calendar text-lg"></i>
                </div>
              </div>
              <div className="bg-white/40 border border-[#775a19]/20 rounded-xl p-4 flex justify-between items-center text-sm backdrop-blur-sm">
                <div>
                  <span className="text-xs text-[#444650] block text-right mb-1 uppercase tracking-wider">الوقت</span>
                  <span className="font-bold text-[#00113a] text-base">{formatArabicTime(date_start)} - {formatArabicTime(date_end)}</span>
                </div>
                <div className="text-[#775a19] bg-white p-3 rounded-full shadow-sm border border-[#775a19]/10">
                  <i className="fa-regular fa-clock text-lg"></i>
                </div>
              </div>
              <div className="bg-white/40 border border-[#775a19]/20 rounded-xl p-4 flex justify-between items-center text-sm backdrop-blur-sm">
                <div>
                  <span className="text-xs text-[#444650] block text-right mb-1 uppercase tracking-wider">المكان</span>
                  <span className="font-bold text-[#00113a] text-base">{venue_name || 'قاعة الأحلام'}</span>
                </div>
                <div className="text-[#775a19] bg-white p-3 rounded-full shadow-sm border border-[#775a19]/10">
                  <i className="fa-solid fa-location-dot text-lg"></i>
                </div>
              </div>
            </div>
            {venue_map_url && (
              <a href={venue_map_url} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-br from-[#d4af37] to-[#f3e5ab] text-[#00113a] rounded-xl py-4 mt-8 font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition shadow-[0_4px_15px_rgba(212,175,55,0.4)] shimmer-button">
                <i className="fa-solid fa-map-location-dot"></i>
                افتح في خرائط جوجل
              </a>
            )}
          </div>
        </section>



        {/* Countdown & Calendar */}
        <section className="w-full relative">
          <div className="glass-panel rounded-2xl p-8 text-center relative">
            <div className="flex items-center justify-center gap-3 text-[#775a19] text-sm font-bold mb-8 uppercase tracking-widest">
              <i className="fa-solid fa-circle text-[6px]"></i>
              العد التنازلي
              <i className="fa-solid fa-circle text-[6px]"></i>
            </div>
            
            <Countdown targetDate={date_start} />

            <div className="text-sm font-bold text-[#00113a] mb-4 mt-8 uppercase tracking-wider">أضف للتقويم</div>
            <div className="flex gap-4">
              <button className="flex-1 bg-white border border-[#775a19]/20 text-[#00113a] rounded-xl py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
                <i className="fa-brands fa-apple text-xl"></i>
                Apple Calendar
              </button>
              <button className="flex-1 bg-white border border-[#775a19]/20 text-[#00113a] rounded-xl py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
                <i className="fa-brands fa-google text-blue-500 text-lg"></i>
                Google Calendar
              </button>
            </div>
          </div>
        </section>

        <div className="divider-gold w-full max-w-[250px]">
          <i className="fa-solid fa-diamond text-[#775a19] text-[10px]"></i>
        </div>

        {/* Photo Gallery */}
        {photo_album_enabled && (
          <>
            <section className="w-full glass-panel rounded-2xl p-8 text-center relative">
              <div className="flex items-center justify-center gap-3 text-[#00113a] font-display font-bold text-2xl mb-2">
                <i className="fa-regular fa-image text-[#775a19]"></i>
                <h2>ألبوم الصور</h2>
              </div>
              <p className="text-sm text-[#444650] mb-8 font-light">شاركوا لحظاتكم الجميلة</p>
              
              <PhotoAlbum urls={photo_album_urls} />

              <button className="absolute -bottom-6 right-8 bg-gradient-to-br from-[#d4af37] to-[#f3e5ab] text-[#00113a] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:opacity-90 transition text-xl shimmer-button z-10">
                <i className="fa-solid fa-camera"></i>
              </button>
            </section>
            <div className="divider-gold w-full max-w-[250px]">
              <i className="fa-solid fa-diamond text-[#775a19] text-[10px]"></i>
            </div>
          </>
        )}

        {/* RSVP / Guestbook Form */}
        {rsvp_enabled && (
          <>
            <section className="w-full glass-panel rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center gap-3 text-[#00113a] font-display font-bold text-2xl mb-2">
                <i className="fa-solid fa-pen-nib text-[#775a19]"></i>
                <h2>تأكيد الحضور وسجل الضيوف</h2>
              </div>
              <p className="text-sm text-[#444650] mb-8 font-light">أكد حضورك واكتب كلمة للعروسين</p>
              <RSVPForm invitationId={invitation.id} />
            </section>
            <div className="divider-gold w-full max-w-[250px]">
              <i className="fa-solid fa-diamond text-[#775a19] text-[10px]"></i>
            </div>
          </>
        )}

        {/* Comments & Congratulations */}
        {comments_enabled && (
          <section className="w-full glass-panel rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 text-[#00113a] font-display font-bold text-2xl mb-8 justify-center">
              <i className="fa-regular fa-comments text-[#775a19]"></i>
              <h2>التهاني والتعليقات</h2>
            </div>
            <Comments invitationId={invitation.id} />
          </section>
        )}

        {/* Footer */}
        <footer className="w-full flex flex-col items-center text-center pt-12 pb-16">
          <div className="divider-gold w-full max-w-[250px]">
            <i className="fa-solid fa-diamond text-[#775a19] text-[10px]"></i>
          </div>
          <div className="text-[#775a19] text-sm mb-6 tracking-widest uppercase font-display">زفاف</div>
          <div className="flex items-center justify-center gap-6 mb-8 drop-shadow-sm">
            <span className="font-calligraphy text-6xl text-[#00113a] font-bold">{bride_name}</span>
            <div className="w-16 h-16 flex items-center justify-center">
              <svg fill="none" height="32" viewBox="0 0 40 24" width="50" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="12" r="10" stroke="#d4af37" strokeWidth="2.5"></circle>
                <circle cx="26" cy="12" r="10" stroke="#d4af37" strokeWidth="2.5"></circle>
              </svg>
            </div>
            <span className="font-calligraphy text-6xl text-[#00113a] font-bold">{groom_name}</span>
          </div>
          <div className="flex gap-3 text-[#775a19] mb-10">
            <i className="fa-solid fa-diamond text-[8px]"></i>
            <i className="fa-solid fa-diamond text-[8px]"></i>
            <i className="fa-solid fa-diamond text-[8px]"></i>
          </div>
          <button className="w-full max-w-xs bg-gradient-to-br from-[#d4af37] to-[#f3e5ab] text-[#00113a] rounded-full py-4 text-base font-bold flex items-center justify-center gap-3 hover:opacity-90 transition shadow-[0_4px_15px_rgba(212,175,55,0.4)] shimmer-button">
            شارك عبر واتساب
            <i className="fa-solid fa-share-nodes text-lg"></i>
          </button>
        </footer>

      </main>
    </div>
  );
};
