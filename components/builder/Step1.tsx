'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { slugify } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Upload, Sparkles } from 'lucide-react';

interface Step1Props {
  data: any;
  onChange: (updates: any) => void;
  onNext: () => void;
}

export const Step1: React.FC<Step1Props> = ({ data, onChange, onNext }) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleGenerateSlug = () => {
    const groom = data.groom_name || '';
    const bride = data.bride_name || '';
    if (groom || bride) {
      const generated = slugify(`${groom} ${bride}`);
      onChange({ slug: generated });
      if (errors.slug) {
        setErrors((prev: any) => ({ ...prev, slug: '' }));
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('covers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('covers')
        .getPublicUrl(filePath);

      onChange({ cover_image_url: publicUrl });
    } catch (err: any) {
      console.error('Error uploading image:', err.message);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!data.groom_name?.trim()) newErrors.groom_name = t('requiredField');
    if (!data.bride_name?.trim()) newErrors.bride_name = t('requiredField');
    if (!data.slug?.trim()) newErrors.slug = t('requiredField');
    if (!data.date_start) newErrors.date_start = t('requiredField');
    if (!data.venue_name?.trim()) newErrors.venue_name = t('requiredField');
    
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      newErrors.slug = 'الرابط يجب أن يحتوي على أحرف وأرقام وشرطات فقط باللغة الإنجليزية';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-6 text-start">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t('groomName')}
          value={data.groom_name || ''}
          onChange={(e) => {
            onChange({ groom_name: e.target.value });
            if (errors.groom_name) setErrors((prev: any) => ({ ...prev, groom_name: '' }));
          }}
          error={errors.groom_name}
          placeholder="مثال: أحمد"
        />
        <Input
          label={t('brideName')}
          value={data.bride_name || ''}
          onChange={(e) => {
            onChange({ bride_name: e.target.value });
            if (errors.bride_name) setErrors((prev: any) => ({ ...prev, bride_name: '' }));
          }}
          error={errors.bride_name}
          placeholder="مثال: سارة"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-3">
          <div className="flex-1 w-full">
            <Input
              label={t('customSlug')}
              value={data.slug || ''}
              onChange={(e) => {
                onChange({ slug: e.target.value.toLowerCase() });
                if (errors.slug) setErrors((prev: any) => ({ ...prev, slug: '' }));
              }}
              error={errors.slug}
              placeholder="ahmed-sara"
              className="text-left"
              dir="ltr"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateSlug}
            className="w-full md:w-auto h-[52px] md:h-[52px] rounded-xl flex items-center justify-center gap-1.5 border border-borderBlush"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{t('generateSlug')}</span>
          </Button>
        </div>
        <span className="text-xs text-textDark/60 px-1 break-all">
          رابط موقعك: {typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://zykola.com/'}{data.slug || '{الرابط}'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="datetime-local"
          label={t('startDate')}
          value={data.date_start || ''}
          onChange={(e) => {
            onChange({ date_start: e.target.value });
            if (errors.date_start) setErrors((prev: any) => ({ ...prev, date_start: '' }));
          }}
          error={errors.date_start}
          className="text-left"
        />
        <Input
          type="datetime-local"
          label={t('endDate')}
          value={data.date_end || ''}
          onChange={(e) => onChange({ date_end: e.target.value })}
          className="text-left"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t('venueName')}
          value={data.venue_name || ''}
          onChange={(e) => {
            onChange({ venue_name: e.target.value });
            if (errors.venue_name) setErrors((prev: any) => ({ ...prev, venue_name: '' }));
          }}
          error={errors.venue_name}
          placeholder="مثال: قاعة النور، فندق شيراتون"
        />
        <Input
          label={t('venueMapUrl')}
          value={data.venue_map_url || ''}
          onChange={(e) => onChange({ venue_map_url: e.target.value })}
          placeholder="مثال: https://maps.google.com/?q=..."
          className="text-left"
          dir="ltr"
        />
      </div>

      <Textarea
        label={t('welcomeMessage')}
        value={data.message || ''}
        onChange={(e) => onChange({ message: e.target.value })}
        placeholder="اكتب رسالة ترحيبية دافئة لضيوفك الكرام..."
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-textDark/80">
          {t('coverImage')}
        </label>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-borderBlush rounded-2xl p-6 bg-white/40 hover:bg-white/60 transition-colors relative min-h-[160px]">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
              <span className="text-sm text-textDark/60">جاري رفع الصورة...</span>
            </div>
          ) : data.cover_image_url ? (
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-32 h-20 relative rounded-lg overflow-hidden border border-borderBlush">
                <img 
                  src={data.cover_image_url} 
                  alt="Uploaded cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="outline"
                type="button"
                onClick={() => onChange({ cover_image_url: '' })}
                className="text-xs px-3 py-1.5"
              >
                إزالة الصورة
              </Button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center gap-2 w-full h-full justify-center text-center">
              <Upload className="h-8 w-8 text-textDark/40" />
              <span className="text-sm text-textDark/60">{t('uploadCover')}</span>
              <span className="text-xs text-textDark/40">PNG, JPG, JPEG (بحد أقصى 5 ميجا)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-borderBlush p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <Button onClick={handleNext} fullWidth>
          {t('next')}
        </Button>
      </div>
      <div className="hidden md:block mt-4">
        <Button onClick={handleNext} fullWidth>
          {t('next')}
        </Button>
      </div>
    </div>
  );
};
