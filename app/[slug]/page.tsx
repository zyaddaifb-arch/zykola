'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageProvider';
import { DynamicTemplate } from '@/components/templates/DynamicTemplate';
import { RSVPForm } from '@/components/invitation/RSVPForm';
import { Comments } from '@/components/invitation/Comments';
import { PhotoAlbum } from '@/components/invitation/PhotoAlbum';
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

  // Gate Envelope State
  const [isOpen, setIsOpen] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('invitations')
          .select('*')
          .eq('slug', slug)
          .single();

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
        console.error('Error fetching invitation:', err.message);
        setError('حدث خطأ أثناء تحميل الدعوة.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchInvitation();
    }
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

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setAudioPlay(true);
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
      <div className="min-h-screen bg-blush flex items-center justify-center p-4">
        <div className="bg-white/70 border border-borderBlush rounded-3xl p-8 max-w-sm text-center shadow-md flex flex-col items-center gap-3">
          <span className="text-3xl text-primary">⚠️</span>
          <h2 className="text-lg font-bold text-textDark">{error}</h2>
          <Button onClick={() => router.push('/')} variant="outline" className="mt-2">
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
      <div className="min-h-screen bg-[#FDF5F5] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/80 border border-borderBlush p-8 rounded-3xl shadow-xl flex flex-col items-center gap-4 text-center">
          <Lock className="h-10 w-10 text-primary mb-2" />
          <h2 className="text-xl font-bold text-textDark">{t('passwordProtect')}</h2>
          <p className="text-xs text-textDark/60">{t('passwordRequired')}</p>
          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-3 mt-2">
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
  if (!isOpen) {
    const videoMap: Record<string, string> = {
      'greek-door': '/videos/greek_door.mp4',
      'tulips': '/videos/tulip_flowers.mp4',
      'royal-envelope': '/videos/royal_envelope.mp4',
      'cinematic': '/videos/cinematic_opening.mp4',
    };
    
    const openingVideo = invitation.animation_enabled !== false 
      ? videoMap[invitation.opening_style || 'greek-door'] 
      : null;

    if (openingVideo) {
      return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden h-[100dvh] w-screen">
          <video
            id="opening-video"
            src={openingVideo}
            className="w-full h-full object-cover"
            playsInline
            onEnded={() => setIsOpen(true)}
            onError={() => {
              console.error("Failed to load video");
              setIsOpen(true);
            }}
          />
          
          <AnimatePresence>
            {!audioPlay && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="flex flex-col gap-2 mb-8">
                  <span className="text-white/80 text-sm uppercase tracking-[4px] font-semibold">دعوة زفاف</span>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white font-playfair drop-shadow-lg">
                    {invitation.groom_name} &amp; {invitation.bride_name}
                  </h1>
                </div>

                <Button 
                  onClick={() => {
                    const video = document.getElementById('opening-video') as HTMLVideoElement;
                    if (video) video.play();
                    setAudioPlay(true);
                  }} 
                  className="px-8 py-4 text-lg font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-white text-black hover:bg-gray-100 transition-all"
                >
                  <span className="mr-2">افتح الدعوة</span>
                  <MailOpen className="h-5 w-5 inline-block" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {audioPlay && (
            <button 
              onClick={() => setIsOpen(true)}
              className="absolute top-6 right-6 text-white/70 text-sm font-semibold hover:text-white transition-colors bg-black/40 min-w-[44px] min-h-[44px] flex items-center justify-center px-4 rounded-full backdrop-blur-md z-10"
            >
              تخطي
            </button>
          )}
        </div>
      );
    }

    // Fallback if no animation enabled
    return (
      <div className="min-h-screen bg-[#FDF5F5] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative backdrop */}
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
          className="w-full max-w-md bg-white border border-[#E8D5D5] p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center gap-6 relative z-10"
        >
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary">
            <MailOpen className="h-8 w-8 text-primary" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wider text-textDark/60 font-semibold">بطاقة دعوة فرح</span>
            <h1 className="text-3xl font-extrabold text-primary font-playfair mt-1">
              {invitation.groom_name} &amp; {invitation.bride_name}
            </h1>
          </div>

          <p className="text-sm text-textDark/70 leading-relaxed px-4">
            نتشرف بدعوتكم لمشاركتنا فرحة العمر وتفاصيل يومنا السعيد.
          </p>

          <Button onClick={handleOpenEnvelope} className="w-full text-lg py-4 font-bold rounded-full shadow-md">
            <span>افتح الدعوة</span>
            <Heart className="h-5 w-5 fill-white stroke-none" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Render Template with active sections
  const templateProps = {
    templateId: invitation.template_id || 'greek-door',
    groomName: invitation.groom_name,
    brideName: invitation.bride_name,
    dateStart: invitation.date_start,
    dateEnd: invitation.date_end,
    venueName: invitation.venue_name,
    venueMapUrl: invitation.venue_map_url,
    message: invitation.message,
    coverImageUrl: invitation.cover_image_url,
    rsvpSection: invitation.rsvp_enabled ? <RSVPForm invitationId={invitation.id} /> : undefined,
    commentsSection: invitation.comments_enabled ? <Comments invitationId={invitation.id} /> : undefined,
    photoAlbumSection: invitation.photo_album_enabled ? <PhotoAlbum urls={invitation.photo_album_urls} /> : undefined,
  };

  return (
    <motion.div
      initial={invitation.opening_style === 'slide' ? { y: '100%' } : { opacity: 0 }}
      animate={invitation.opening_style === 'slide' ? { y: 0 } : { opacity: 1 }}
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
  );
}
