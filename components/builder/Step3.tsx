'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { Upload, Music, Trash2, Eye, Image as ImageIcon, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step3Props {
  data: any;
  onChange: (updates: any) => void;
  onBack: () => void;
  onSave: (publish: boolean) => void;
  onSaveDraft?: () => void;
  isSaving: boolean;
}

export const Step3: React.FC<Step3Props> = ({
  data,
  onChange,
  onBack,
  onSave,
  onSaveDraft,
  isSaving,
}) => {
  const { t } = useLanguage();
  const [isUploadingMusic, setIsUploadingMusic] = useState(false);
  const [isUploadingAlbum, setIsUploadingAlbum] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(!!data.password);
  const [musicSource, setMusicSource] = useState<'url' | 'file'>(
    data.music_file_url ? 'file' : 'url'
  );

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingMusic(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('music').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('music').getPublicUrl(fileName);
      onChange({ music_file_url: publicUrl, music_url: '' });
    } catch (err: any) {
      console.error('Error uploading music:', err.message);
      alert('Failed to upload music file. Please try again.');
    } finally {
      setIsUploadingMusic(false);
    }
  };

  const handleAlbumUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingAlbum(true);
    try {
      const urls = [...(data.photo_album_urls || [])];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('albums').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('albums').getPublicUrl(fileName);
        urls.push(publicUrl);
      }
      onChange({ photo_album_urls: urls });
    } catch (err: any) {
      console.error('Error uploading album images:', err.message);
      alert('Failed to upload some album images. Please try again.');
    } finally {
      setIsUploadingAlbum(false);
    }
  };

  const removeAlbumImage = (indexToRemove: number) => {
    const urls = (data.photo_album_urls || []).filter(
      (_: string, i: number) => i !== indexToRemove
    );
    onChange({ photo_album_urls: urls });
  };

  const handlePreview = () => {
    localStorage.setItem('zykola_preview_data', JSON.stringify(data));
    const url = `/preview/${data.slug || 'preview'}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-6 text-start">

      {/* Feature toggles — each in its own card */}
      <div className="flex flex-col gap-4">

        {/* RSVP */}
        <div className="bg-white border border-borderBlush rounded-2xl p-4 md:p-5 shadow-sm">
          <Toggle
            checked={data.rsvp_enabled || false}
            onChange={(val) => onChange({ rsvp_enabled: val })}
            label={t('enableRSVP')}
            description="السماح للضيوف بتأكيد حضورهم وتحديد عدد المرافقين."
          />
        </div>

        {/* Comments & Signatures */}
        <div className="bg-white border border-borderBlush rounded-2xl p-4 md:p-5 shadow-sm">
          <Toggle
            checked={data.comments_enabled || false}
            onChange={(val) => onChange({ comments_enabled: val })}
            label="دفتر التهاني والتوقيعات"
            description="تفعيل دفتر يسمح للضيوف بكتابة تهنئة وعمل توقيع للعروسين."
          />
        </div>

        {/* Music */}
        <div className="bg-white border border-borderBlush rounded-2xl p-4 md:p-5 shadow-sm">
          <Toggle
            checked={data.music_enabled || false}
            onChange={(val) => onChange({ music_enabled: val })}
            label={t('enableMusic')}
            description="تشغيل مقطع موسيقي رومانسي هادئ عند فتح الدعوة."
          />
          <AnimatePresence>
            {data.music_enabled && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-borderBlush flex flex-col gap-4">
                  {/* Source toggle */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setMusicSource('url')}
                      className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border text-center transition-all min-h-[44px] ${
                        musicSource === 'url'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-borderBlush bg-white/40 text-textDark'
                      }`}
                    >
                      {t('musicUrl')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMusicSource('file')}
                      className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border text-center transition-all min-h-[44px] ${
                        musicSource === 'file'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-borderBlush bg-white/40 text-textDark'
                      }`}
                    >
                      {t('musicFile')}
                    </button>
                  </div>

                  {musicSource === 'url' ? (
                    <Input
                      label={t('musicUrl')}
                      value={data.music_url || ''}
                      onChange={(e) => onChange({ music_url: e.target.value, music_file_url: '' })}
                      placeholder="https://example.com/song.mp3"
                      className="text-left font-mono text-sm"
                      dir="ltr"
                    />
                  ) : (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-textDark/80">{t('musicFile')}</span>
                      <div className="border border-dashed border-borderBlush rounded-xl p-4 bg-white/20 text-center">
                        {isUploadingMusic ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary" />
                            <span className="text-xs text-textDark/60">جاري رفع الملف الموسيقي...</span>
                          </div>
                        ) : data.music_file_url ? (
                          <div className="flex items-center justify-between gap-3 bg-white/70 p-2.5 rounded-lg border border-borderBlush">
                            <div className="flex items-center gap-2 truncate">
                              <Music className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-xs text-textDark/80 truncate font-mono">
                                {data.music_file_url.split('/').pop()}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => onChange({ music_file_url: '' })}
                              className="text-red-500 hover:text-red-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center gap-1.5 justify-center py-4">
                            <Upload className="h-6 w-6 text-textDark/40" />
                            <span className="text-xs text-textDark/60">اضغط لرفع ملف صوتي (MP3)</span>
                            <input
                              type="file"
                              accept="audio/mp3,audio/*"
                              onChange={handleMusicUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Photo Album (Live) */}
        <div className="bg-[#FCF9F8] border border-borderBlush rounded-2xl p-4 md:p-5 shadow-sm flex flex-col gap-4">
          <div className="flex justify-end items-center gap-2 pb-2 text-primary">
            <h3 className="font-bold text-base text-textDark">ألبوم الصور المباشر</h3>
            <ImageIcon className="h-5 w-5 text-[#8B1A1A]" />
          </div>

          <Toggle
            checked={data.guest_album_enabled || false}
            onChange={(val) => onChange({ guest_album_enabled: val })}
            label="تفعيل ألبوم الصور"
            description="السماح للضيوف برفع صور مباشرة"
          />

          <AnimatePresence>
            {data.guest_album_enabled && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-3 border-t border-borderBlush/60 flex flex-col gap-6">
                  
                  {/* Approval System */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <button
                        type="button"
                        onClick={() => onChange({ guest_album_approval: 'auto' })}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                          (data.guest_album_approval || 'auto') === 'auto'
                            ? 'bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-sm'
                            : 'bg-white text-textDark border-[#E8D5D5] hover:bg-gray-50'
                        }`}
                      >
                        موافقة تلقائية
                      </button>
                      <button
                        type="button"
                        onClick={() => onChange({ guest_album_approval: 'manual' })}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                          data.guest_album_approval === 'manual'
                            ? 'bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-sm'
                            : 'bg-white text-textDark border-[#E8D5D5] hover:bg-gray-50'
                        }`}
                      >
                        موافقة يدوية
                      </button>
                    </div>
                    <span className="font-semibold text-textDark text-sm">نظام الموافقة</span>
                  </div>

                  {/* Stop Uploading Toggle */}
                  <div className="flex items-center justify-between w-full">
                    <button
                      type="button"
                      onClick={() => onChange({ guest_album_stopped: !data.guest_album_stopped })}
                      className={`flex h-7 w-12 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                        data.guest_album_stopped ? 'bg-[#8B1A1A] justify-end' : 'bg-[#E8D5D5] justify-start'
                      }`}
                    >
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="h-6 w-6 rounded-full bg-white shadow-sm"
                      />
                    </button>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-textDark text-sm flex items-center gap-1.5">
                        إيقاف الرفع
                        <Lock className="h-4 w-4 text-[#8B1A1A]" />
                      </span>
                      <span className="text-xs text-textDark/60 mt-0.5">منع رفع صور جديدة</span>
                    </div>
                  </div>

                  <div className="border-t border-borderBlush/40 pt-4 mt-2">
                    <span className="text-sm font-semibold text-textDark/80 mb-3 block">{t('albumPhotos')} (رفع مسبق)</span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {(data.photo_album_urls || []).map((url: string, index: number) => (
                        <div key={index} className="aspect-square relative rounded-xl overflow-hidden border border-borderBlush group shadow-sm bg-white">
                          <img src={url} alt={`Album img ${index}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeAlbumImage(index)}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      {isUploadingAlbum ? (
                        <div className="aspect-square flex flex-col items-center justify-center border border-dashed border-borderBlush rounded-xl bg-white/40">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary" />
                        </div>
                      ) : (
                        <label className="aspect-square flex flex-col items-center justify-center border border-dashed border-[#8B1A1A]/40 rounded-xl bg-[#8B1A1A]/5 hover:bg-[#8B1A1A]/10 cursor-pointer transition-colors text-center p-2">
                          <Upload className="h-5 w-5 text-[#8B1A1A]/60 mb-1" />
                          <span className="text-[10px] text-[#8B1A1A]/80 leading-tight">إضافة صور</span>
                          <input type="file" accept="image/*" multiple onChange={handleAlbumUpload} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white border border-borderBlush rounded-2xl p-4 md:p-5 shadow-sm">
        <Toggle
          checked={isPasswordEnabled}
          onChange={(val) => {
            setIsPasswordEnabled(val);
            if (!val) {
              onChange({ password: '' });
            }
          }}
          label="حماية بكلمة مرور"
          description="تأمين الدعوة بكلمة مرور بحيث لا يراها إلا من لديه الكلمة."
        />
        
        <AnimatePresence>
          {isPasswordEnabled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-borderBlush">
                <Input
                  type="password"
                  label={t('passwordProtect')}
                  value={data.password || ''}
                  onChange={(e) => onChange({ password: e.target.value })}
                  placeholder="أدخل كلمة المرور الخاصة بالدعوة"
                  className="text-left font-mono"
                  dir="ltr"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile fixed nav */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-borderBlush p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col gap-3"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <Button onClick={() => onSave(true)} isLoading={isSaving} fullWidth className="text-lg font-bold">
          {t('publishInvitation')}
        </Button>
        <div className="flex gap-3">
          {onSaveDraft && (
            <Button variant="outline" onClick={onSaveDraft} disabled={isSaving} fullWidth className="text-sm">
              {t('saveChanges')}
            </Button>
          )}
          <Button variant="outline" onClick={onBack} fullWidth>
            {t('back')}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={handlePreview}
            fullWidth
            className="flex items-center justify-center gap-2 border border-borderBlush"
          >
            <Eye className="h-5 w-5 text-primary" />
            <span>{t('preview')}</span>
          </Button>
        </div>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex flex-col gap-3 mt-6">
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="w-1/3">
            {t('back')}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={handlePreview}
            className="w-1/3 flex items-center justify-center gap-2 border border-borderBlush"
          >
            <Eye className="h-5 w-5 text-primary" />
            <span>{t('preview')}</span>
          </Button>
          {onSaveDraft && (
            <Button variant="outline" onClick={onSaveDraft} disabled={isSaving} className="w-1/3 text-sm">
              {t('saveChanges')}
            </Button>
          )}
        </div>
        <Button onClick={() => onSave(true)} isLoading={isSaving} className="w-full text-lg py-4 font-bold">
          {t('publishInvitation')}
        </Button>
      </div>
    </div>
  );
};
