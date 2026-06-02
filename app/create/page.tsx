'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageProvider';
import { Navbar } from '@/components/ui/Navbar';
import { ProgressBar } from '@/components/builder/ProgressBar';
import { Step1 } from '@/components/builder/Step1';
import { Step2 } from '@/components/builder/Step2';
import { Step3 } from '@/components/builder/Step3';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateInvitationPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    groom_name: '',
    bride_name: '',
    slug: '',
    date_start: '',
    date_end: '',
    venue_name: '',
    venue_map_url: '',
    message: '',
    cover_image_url: '',
    template_id: 'al-naseem',
    opening_style: 'fade',
    font_style: '',
    password: '',
    is_published: false,
    rsvp_enabled: false,
    comments_enabled: false,
    music_enabled: false,
    music_url: '',
    music_file_url: '',
    photo_album_enabled: false,
    photo_album_urls: [],
    guest_album_enabled: false,
    guest_album_approval: 'auto',
    guest_album_stopped: false,
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const updateFormData = (updates: any) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSave = async (publish: boolean) => {
    if (!user) return;
    setIsSaving(true);

    try {
      const { data: existingSlugs, error: slugCheckError } = await supabase
        .from('invitations')
        .select('id')
        .eq('slug', formData.slug);

      if (slugCheckError) throw slugCheckError;

      if (existingSlugs && existingSlugs.length > 0) {
        alert('الرابط المخصص مستخدم بالفعل، يرجى اختيار رابط آخر.');
        setIsSaving(false);
        return;
      }

      const invitationPayload = {
        ...formData,
        user_id: user.id,
        is_published: publish,
        date_end: formData.date_end || null,
        venue_map_url: formData.venue_map_url || null,
        message: formData.message || null,
        cover_image_url: formData.cover_image_url || null,
        font_style: formData.font_style || null,
        password: formData.password || null,
        music_url: formData.music_url || null,
        music_file_url: formData.music_file_url || null,
      };

      const { error: insertError } = await supabase
        .from('invitations')
        .insert(invitationPayload);

      if (insertError) throw insertError;

      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error creating invitation:', err.message);
      alert('فشل حفظ الدعوة: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blush flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blush flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-4 py-8 w-full flex flex-col gap-6">
        <div className="bg-white/60 backdrop-blur-md border border-borderBlush p-6 md:p-8 rounded-3xl shadow-md w-full">
          <ProgressBar currentStep={step} />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step1
                    data={formData}
                    onChange={updateFormData}
                    onNext={handleNext}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step2
                    data={formData}
                    onChange={updateFormData}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step3
                    data={formData}
                    onChange={updateFormData}
                    onBack={handleBack}
                    onSave={handleSave}
                    isSaving={isSaving}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
