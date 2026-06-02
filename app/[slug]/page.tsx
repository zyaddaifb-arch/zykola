'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageProvider';
import { MasterTemplate } from '@/components/templates/MasterTemplate';
import { MusicPlayer } from '@/components/invitation/MusicPlayer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, MailOpen } from 'lucide-react';
import { Invitation } from '@/types';

export default function PublicInvitationPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Password Protection State
  const [passwordInput, setPasswordInput] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Gate Envelope / Animation State
  const [isOpen, setIsOpen] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    const fetchInvitation = async () => {
      try {
        const result = await Promise.race([
          supabase.from('invitations').select('*').eq('slug', slug).single(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 15000)
          ),
        ]);

        if (cancelled) return;

        const { data, error: fetchError } = result as any;

        if (fetchError || !data) {
          setError('لم يتم العثور على هذه الدعوة. يرجى التحقق من الرابط.');
          setLoading(false);
          return;
        }

        if (!data.is_published) {
          setError('هذه الدعوة لم تنشر بعد.');
          setLoading(false);
          return;
        }

        setInvitation(data);
        if (!data.password) {
          setIsPasswordVerified(true);
        }
      } catch (err: any) {
        if (cancelled) return;
        console.error('Error fetching invitation:', err.message);
        setError(err.message === 'timeout' ? 'تعذر تحميل الدعوة، يرجى التحقق من اتصالك بالإنترنت.' : 'حدث خطأ أثناء تحميل الدعوة.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchInvitation();

    return () => { cancelled = true; };
  }, [slug]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (invitation && passwordInput === invitation.password) {
      setIsPasswordVerified(true);
      setPasswordError('');
    } else {
      setPasswordError(t('passwordError'));
    }
  };

  const handleOpenInvitation = () => {
    if (invitation?.animation_enabled && invitation?.opening_style) {
      setIsPlayingVideo(true);
      // Fallback: auto open after 6 seconds if video doesn't fire ended event
      setTimeout(() => {
        setIsPlayingVideo(false);
        setIsOpen(true);
        setAudioPlay(true);
      }, 6000);
    } else {
      setIsOpen(true);
      setAudioPlay(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blush flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100dvh] bg-blush flex items-center justify-center p-3 md:p-4">
        <div className="bg-white/70 border border-borderBlush rounded-2xl md:rounded-3xl p-5 md:p-8 max-w-sm text-center shadow-md flex flex-col items-center gap-3">
          <h2 className="text-base md:text-lg font-bold text-textDark">{error}</h2>
          <Button onClick={() => router.push('/')} variant="outline" className="mt-2 w-full">
            الذهاب للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  if (!invitation) return null;

  // Render Password Lock Screen if not verified
  if (!isPasswordVerified) {
    return (
      <div className="min-h-screen bg-[#FDF5F5] flex items-center justify-center p-3 md:p-4">
        <div className="w-full max-w-md bg-white/80 border border-borderBlush p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-xl flex flex-col items-center gap-3 md:gap-4 text-center">
          <Lock className="h-8 w-8 md:h-10 md:w-10 text-primary mb-1 md:mb-2" />
          <h2 className="text-lg md:text-xl font-bold text-textDark">{t('passwordProtect')}</h2>
          <p className="text-xs text-textDark/60">{t('passwordRequired')}</p>
          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-3 mt-1 md:mt-2">
            <Input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••"
              className="text-center font-mono text-lg"
              dir="ltr"
              required
              autoFocus
            />
            {passwordError && (
              <span className="text-xs text-red-500 font-semibold">{passwordError}</span>
            )}
            <Button type="submit" className="w-full font-bold mt-1 py-3.5">
              {t('passwordSubmit')}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Render Gate / Envelope Screen if verified but not clicked open
  if (!isOpen && !isPlayingVideo) {
    return (
      <div className="min-h-[100dvh] bg-[#FDF5F5] flex items-center justify-center p-3 md:p-4 relative overflow-hidden" dir="rtl">
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
          className="w-full max-w-md bg-white border border-[#E8D5D5] p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col items-center text-center gap-4 md:gap-6 relative z-10"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary">
            <MailOpen className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] md:text-xs uppercase tracking-wider text-textDark/60 font-semibold">بطاقة دعوة فرح</span>
            <h1 className="text-xl md:text-3xl font-extrabold text-primary font-playfair mt-1 break-words">
              {invitation.groom_name} &amp; {invitation.bride_name}
            </h1>
          </div>

          <p className="text-xs md:text-sm text-textDark/70 leading-relaxed px-2 md:px-4">
            نتشرف بدعوتكم لمشاركتنا فرحة العمر وتفاصيل يومنا السعيد.
          </p>

          <Button onClick={handleOpenInvitation} className="w-full text-base md:text-lg py-3.5 md:py-4 font-bold rounded-full shadow-md">
            <span>افتح الدعوة</span>
            <Heart className="h-4 w-4 md:h-5 md:w-5 fill-white stroke-none" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Render Video Animation Screen
  if (isPlayingVideo) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <video 
          src={`/videos/${invitation.opening_style}.mp4`} 
          className="w-full h-full object-cover"
          autoPlay 
          muted={false}
          playsInline
          onEnded={() => {
            setIsPlayingVideo(false);
            setIsOpen(true);
            setAudioPlay(true);
          }}
        />
        <button 
          onClick={() => {
            setIsPlayingVideo(false);
            setIsOpen(true);
            setAudioPlay(true);
          }}
          className="absolute bottom-10 px-6 py-3 md:py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium hover:bg-white/30 transition-colors min-h-[44px]"
        >
          تخطي
        </button>
      </div>
    );
  }

  // Render Master Template
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full min-h-screen"
    >
      <MasterTemplate invitation={invitation} />

      {invitation.music_enabled && (invitation.music_file_url || invitation.music_url) && (
        <MusicPlayer 
          url={invitation.music_file_url || invitation.music_url || ''} 
          autoPlayTrigger={audioPlay}
        />
      )}
    </motion.div>
  );
}
