'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
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
  });

  useEffect(() => {
    const initPage = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }
      setUser(session.user);

      if (editId) {
        try {
          const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('id', editId)
            .single();
          
          if (error) throw error;
          if (data && data.user_id === session.user.id) {
            setFormData({
              groom_name: data.groom_name || '',
              bride_name: data.bride_name || '',
              slug: data.slug || '',
              date_start: data.date_start || '',
              date_end: data.date_end || '',
              venue_name: data.venue_name || '',
              venue_map_url: data.venue_map_url || '',
              message: data.message || '',
              cover_image_url: data.cover_image_url || '',
              template_id: data.template_id || 'greek-door',
              opening_style: data.opening_style || 'greek-door',
              font_style: data.font_style || '',
              password: data.password || '',
              is_published: data.is_published || false,
              rsvp_enabled: data.rsvp_enabled || false,
              comments_enabled: data.comments_enabled || false,
              music_enabled: data.music_enabled || false,
              music_url: data.music_url || '',
              music_file_url: data.music_file_url || '',
              photo_album_enabled: data.photo_album_enabled || false,
              photo_album_urls: data.photo_album_urls || [],
            });
          }
        } catch (err: any) {
          console.error('Error fetching invitation for edit:', err.message);
        }
      }

      setLoading(false);
    };
    initPage();
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
      if (!editId) {
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
      } else {
        // When editing, only check slug if they changed it
        const { data: currentInv } = await supabase.from('invitations').select('slug').eq('id', editId).single();
        if (currentInv && currentInv.slug !== formData.slug) {
          const { data: existingSlugs } = await supabase.from('invitations').select('id').eq('slug', formData.slug);
          if (existingSlugs && existingSlugs.length > 0) {
            alert('الرابط المخصص مستخدم بالفعل، يرجى اختيار رابط آخر.');
            setIsSaving(false);
            return;
          }
        }
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

      if (editId) {
        const { error: updateError } = await supabase
          .from('invitations')
          .update(invitationPayload)
          .eq('id', editId);
        
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('invitations')
          .insert(invitationPayload);

        if (insertError) throw insertError;
      }

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

      <main className="flex-grow max-w-3xl mx-auto px-4 py-5 md:py-8 w-full flex flex-col gap-6 pb-28 md:pb-8">
        <div className="bg-white/60 backdrop-blur-md border border-borderBlush p-4 md:p-8 rounded-3xl shadow-md w-full">
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
