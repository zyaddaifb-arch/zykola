'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { DynamicTemplate } from '@/components/templates/DynamicTemplate';
import { MusicPlayer } from '@/components/invitation/MusicPlayer';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Heart, Info, MailOpen } from 'lucide-react';

export default function PreviewInvitationPage() {
  const { t } = useLanguage();

  const [invitation, setInvitation] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('zykola_preview_data');
    if (data) {
      setInvitation(JSON.parse(data));
    }
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setAudioPlay(true);
  };

  if (!invitation) {
    return (
      <div className="min-h-[100dvh] bg-blush flex items-center justify-center p-4">
        <div className="bg-white/70 border border-borderBlush rounded-3xl p-8 w-full max-w-sm text-center shadow-md flex flex-col items-center gap-3">
          <span className="text-3xl text-primary">⚠️</span>
          <h2 className="text-lg font-bold text-textDark">لا توجد بيانات معاينة متاحة.</h2>
          <Button onClick={() => window.close()} variant="outline" className="mt-2 w-full">
            إغلاق الصفحة
          </Button>
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="min-h-[100dvh] bg-[#FDF5F5] flex flex-col">
        {/* Preview banner */}
        <div className="bg-amber-500 text-white text-xs font-bold py-2.5 px-4 text-center flex items-center justify-center gap-1.5 sticky top-0 z-50">
          <Info className="h-4 w-4 shrink-0" />
          <span>{t('previewModeNotice')}</span>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 0 C40 15, 20 15, 30 30 C40 45, 20 45, 30 60" fill="none" stroke="%238B1A1A" stroke-width="0.5"/></svg>')`,
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="w-full max-w-sm bg-white border border-[#E8D5D5] p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center gap-5 relative z-10"
          >
            <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary">
              <MailOpen className="h-7 w-7 text-primary" />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-textDark/60 font-semibold">معاينة بطاقة الفرح</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-primary font-playfair mt-1">
                {invitation.groom_name || 'العريس'} &amp; {invitation.bride_name || 'العروسة'}
              </h1>
            </div>

            <p className="text-sm text-textDark/70 leading-relaxed">
              هذه هي شاشة مغلف الدخول الترحيبية التي سيراها زوار موقع دعوتكم.
            </p>

            <Button onClick={handleOpenEnvelope} className="w-full text-base md:text-lg py-4 font-bold rounded-full shadow-md">
              <span>افتح المعاينة</span>
              <Heart className="h-5 w-5 fill-white stroke-none" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const templateProps = {
    templateId: invitation.template_id || 'greek-door',
    groomName: invitation.groom_name || 'العريس',
    brideName: invitation.bride_name || 'العروسة',
    dateStart: invitation.date_start || new Date().toISOString(),
    dateEnd: invitation.date_end,
    venueName: invitation.venue_name || 'اسم القاعة',
    venueMapUrl: invitation.venue_map_url,
    message: invitation.message,
    coverImageUrl: invitation.cover_image_url,
    rsvpSection: invitation.rsvp_enabled ? (
      <div className="p-5 bg-white/50 border border-borderBlush rounded-2xl w-full flex flex-col gap-3 text-center">
        <h3 className="font-bold text-textDark text-lg border-b border-borderBlush pb-3">تأكيد الحضور (RSVP)</h3>
        <p className="text-sm text-textDark/60 leading-relaxed">
          هنا سيتمكن الضيوف من إدخال أسمائهم وتأكيد حضورهم وتحديد عدد المرافقين.
        </p>
        <Button disabled variant="outline" className="w-full mt-2 font-bold py-3.5">
          نموذج تأكيد الحضور (مغلق بالمعاينة)
        </Button>
      </div>
    ) : undefined,
    commentsSection: invitation.comments_enabled ? (
      <div className="p-5 bg-white/50 border border-borderBlush rounded-2xl w-full flex flex-col gap-3 text-center">
        <h3 className="font-bold text-textDark text-lg border-b border-borderBlush pb-3">دفتر التهاني والتبريكات</h3>
        <div className="p-4 bg-white/80 rounded-xl border border-borderBlush/50 text-right text-xs text-textDark/70">
          <span className="font-bold text-primary block mb-1">اسم الضيف (تجريبي)</span>
          تهانينا القلبية لكما بمناسبة الزفاف السعيد!
        </div>
      </div>
    ) : undefined,
    photoAlbumSection: undefined,
  };

  return (
    <div className="relative min-h-[100dvh]">
      <div className="bg-amber-500 text-white text-xs font-bold py-2.5 px-4 text-center flex items-center justify-center gap-1.5 sticky top-0 z-50">
        <Info className="h-4 w-4 shrink-0" />
        <span>{t('previewModeNotice')}</span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full min-h-screen"
      >
        <DynamicTemplate {...templateProps} />

        {invitation.music_enabled && (invitation.music_file_url || invitation.music_url) && (
          <MusicPlayer
            url={invitation.music_file_url || invitation.music_url || ''}
            autoPlayTrigger={audioPlay}
          />
        )}
      </motion.div>
    </div>
  );
}
