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
      <div className="min-h-screen bg-gradient-to-br from-[#FDF5F5] via-[#FAF6F0] to-[#FDF5F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d4af37] animate-spin" />
          </div>
          <span className="text-xs text-[#444650]/60 font-medium tracking-wider">جاري تحميل الدعوة...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100dvh] bg-gradient-to-br from-[#FDF5F5] via-[#FAF6F0] to-[#FDF5F5] flex items-center justify-center p-3 md:p-4">
        <div className="bg-white/90 backdrop-blur-xl border border-[#d4af37]/20 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-sm text-center shadow-xl flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
          </div>
          <h2 className="text-base md:text-lg font-bold text-[#00113a]">{error}</h2>
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
      <div className="min-h-screen bg-gradient-to-br from-[#FDF5F5] via-[#FAF6F0] to-[#FDF5F5] flex items-center justify-center p-3 md:p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 0 C40 15, 20 15, 30 30 C40 45, 20 45, 30 60" fill="none" stroke="%23C9A84C" stroke-width="0.5"/></svg>')`,
        }} />
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-[#d4af37]/20 p-6 md:p-8 rounded-3xl md:rounded-4xl shadow-2xl flex flex-col items-center gap-4 md:gap-5 text-center relative z-10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20">
            <Lock className="h-7 w-7 text-[#d4af37]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg md:text-xl font-bold text-[#00113a] font-display">{t('passwordProtect')}</h2>
            <p className="text-xs text-[#444650]/70 max-w-xs">{t('passwordRequired')}</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-3 mt-1 md:mt-2">
            <Input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••"
              className="text-center font-mono text-lg border-[#d4af37]/20 focus:border-[#d4af37]/50 bg-white/60"
              dir="ltr"
              required
              autoFocus
            />
            {passwordError && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-red-500 font-medium bg-red-50 px-3 py-2 rounded-lg">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {passwordError}
              </div>
            )}
            <Button type="submit" className="w-full font-bold mt-1 py-3.5 bg-gradient-to-l from-[#8B1A1A] to-[#a52a2a] hover:from-[#7A1717] hover:to-[#8B1A1A] shadow-lg hover:shadow-xl transition-all">
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
      <div className="min-h-[100dvh] bg-gradient-to-br from-[#FDF5F5] via-[#FAF6F0] to-[#FDF5F5] flex items-center justify-center p-3 md:p-4 relative overflow-hidden" dir="rtl">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 0 C40 15, 20 15, 30 30 C40 45, 20 45, 30 60" fill="none" stroke="%23C9A84C" stroke-width="0.5"/></svg>')`,
            }}
          />
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-[#d4af37]/[0.03] blur-3xl" />
          <div className="absolute bottom-1/4 -right-10 w-52 h-52 rounded-full bg-[#8B1A1A]/[0.03] blur-3xl" />
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-[#d4af37]/20 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center gap-5 md:gap-7 relative z-10"
        >
          {/* Top gold accent line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />

          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20">
            <MailOpen className="h-7 w-7 md:h-9 md:w-9 text-[#d4af37]" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#775a19]/70 font-semibold">بطاقة دعوة فرح</span>
            <h1 className="text-xl md:text-3xl font-extrabold text-[#00113a] font-display mt-1 break-words leading-tight">
              {invitation.groom_name}
              <span className="text-[#d4af37] mx-2 text-lg md:text-2xl font-light">&amp;</span>
              {invitation.bride_name}
            </h1>
          </div>

          <p className="text-xs md:text-sm text-[#444650]/80 leading-relaxed px-2 md:px-6 max-w-sm">
            نتشرف بدعوتكم لمشاركتنا فرحة العمر وتفاصيل يومنا السعيد.
          </p>

          <Button 
            onClick={handleOpenInvitation} 
            className="w-full text-base md:text-lg py-3.5 md:py-4 font-bold rounded-full shadow-lg bg-gradient-to-l from-[#8B1A1A] to-[#a52a2a] hover:from-[#7A1717] hover:to-[#8B1A1A] hover:shadow-xl transition-all active:scale-[0.98]"
          >
            <span>افتح الدعوة</span>
            <Heart className="h-4 w-4 md:h-5 md:w-5 fill-white/30 stroke-none" />
          </Button>

          {/* Bottom gold accent line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
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
          className="absolute bottom-10 px-8 py-3 md:py-3 bg-white/15 backdrop-blur-xl text-white rounded-full text-sm font-medium hover:bg-white/25 transition-all min-h-[44px] border border-white/10"
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
