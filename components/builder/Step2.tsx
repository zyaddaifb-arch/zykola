'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { Palette, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step2Props {
  data: any;
  onChange: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const themes = [
  { id: 'greek-door', name: 'بوابة المتوسط', nameEn: 'Mediterranean Gate', image: '/templates/theme-greek-door-Jv_FhrVA.png' },
  { id: 'alhambra-arch', name: 'بوابة الحمراء', nameEn: 'Alhambra Arch', image: '/templates/theme-alhambra-arch-CsfUpPjg.png' },
  { id: 'rustic-arch', name: 'قوس الحديقة الريفي', nameEn: 'Rustic Garden Arch', image: '/templates/theme-rustic-arch-Crn5sfwp.png' },
  { id: 'chandelier-garden', name: 'حديقة الثريا', nameEn: 'Chandelier Garden', image: '/templates/theme-chandelier-garden-CzFTSeH2.png' },
  { id: 'cairo-citadel', name: 'قلعة القاهرة الذهبية', nameEn: 'Cairo Citadel', image: '/templates/theme-cairo-citadel-CT6ofPiE.png' },
  { id: 'andalusian-frame', name: 'الإطار الأندلسي', nameEn: 'Andalusian Frame', image: '/templates/theme-andalusian-frame-BbE8Ghv4.png' },
  { id: 'white-roses', name: 'حديقة الورد الأبيض', nameEn: 'White Roses', image: '/templates/theme-white-roses-BZgzK_Oo.png' },
  { id: 'ottoman-palace', name: 'ساحة القصر العثماني', nameEn: 'Ottoman Courtyard', image: '/templates/theme-ottoman-palace-ChaZgPiF.png' },
  { id: 'palace-night', name: 'ليلة القصر الملكي', nameEn: 'Royal Palace Night', image: '/templates/theme-palace-night-BHYFwz7p.png' },
  { id: 'beach-sage', name: 'شاطئ المريمية', nameEn: 'Beach Sage', image: '/templates/theme-beach-sage-C2FQsRAs.png' },
  { id: 'boho-table', name: 'الطاولة البوهيمية', nameEn: 'Boho Table', image: '/templates/theme-boho-table-DUwgKJkv.png' },
  { id: 'enchanted-lanterns', name: 'الفوانيس الساحرة', nameEn: 'Enchanted Lanterns', image: '/templates/theme-enchanted-lanterns-BGn6R8HS.png' },
  { id: 'plaster-frame', name: 'الإطار الكلاسيكي', nameEn: 'Plaster Frame', image: '/templates/theme-plaster-frame-BlNagAaD.png' },
  { id: 'royal-curtains', name: 'الستائر الملكية', nameEn: 'Royal Curtains', image: '/templates/theme-royal-curtains-DXMKvfIZ.png' },
];

const openingStyles = [
  { id: 'greek-door', label: 'الباب اليوناني', desc: 'باب أزرق يفتح على ضوء البحر الأبيض المتوسط', video: '/videos/greek_door.mp4' },
  { id: 'tulips', label: 'زهور التوليب', desc: 'افتتاح سينمائي بزهور التوليب', video: '/videos/tulip_flowers.mp4' },
  { id: 'royal-envelope', label: 'الظرف الملكي', desc: 'ظرف فاخر بختم شمعي يذوب', video: '/videos/royal_envelope.mp4' },
  { id: 'cinematic', label: 'افتتاحية سينمائية', desc: 'مشهد سينمائي فاخر بانتقال أبيض ناعم', video: '/videos/cinematic_opening.mp4' },
];

export const Step2: React.FC<Step2Props> = ({ data, onChange, onNext, onBack }) => {
  const { t } = useLanguage();
  const groomName = data.groom_name || 'Ahmed';
  const brideName = data.bride_name || 'Sara';

  const isAnimationEnabled = data.animation_enabled !== false;

  return (
    <div className="flex flex-col gap-8 text-start w-full">
      
      {/* Interactive Experience Settings */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-borderBlush/40 pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-primary"><Sparkles className="h-5 w-5" /></span>
              <h2 className="text-lg font-bold text-textDark">إعدادات التجربة التفاعلية</h2>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white/50 p-4 rounded-xl border border-borderBlush/50">
          <div className="flex flex-col">
            <span className="font-bold text-textDark">أنيميشن الافتتاح</span>
            <span className="text-xs text-textDark/60">تجربة فتح سينمائية عند دخول الدعوة</span>
          </div>
          <button
            onClick={() => onChange({ animation_enabled: !isAnimationEnabled })}
            className={`w-12 h-6 rounded-full transition-colors relative ${isAnimationEnabled ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${isAnimationEnabled ? 'left-1' : 'right-1'}`} />
          </button>
        </div>

        <AnimatePresence>
          {isAnimationEnabled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <div className="flex items-center gap-2 mt-2">
                <span className="text-primary"><Palette className="h-4 w-4" /></span>
                <label className="text-base font-bold text-textDark">نمط الافتتاح</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {openingStyles.map((style) => {
                  const isSelected = data.opening_style === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => onChange({ opening_style: style.id })}
                      className={`relative flex flex-col items-center p-2 rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                          : 'border-borderBlush bg-white hover:border-primary/40'
                      }`}
                    >
                      <div className="w-full h-32 rounded-xl overflow-hidden mb-3 relative bg-gray-100">
                        <video src={style.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                          <Sparkles className="h-3 w-3" /> جديد
                        </div>
                      </div>
                      <span className="font-bold text-sm text-textDark mb-1">{style.label}</span>
                      <span className="text-[10px] text-textDark/50 mb-2">{style.desc}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Selection */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-borderBlush/40 pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-primary"><Palette className="h-5 w-5" /></span>
              <h2 className="text-lg font-bold text-textDark">ثيم الدعوة</h2>
            </div>
            <span className="text-xs text-textDark/60">اختر التصميم اللي يعكس روح حفلتك</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map((theme) => {
            const isSelected = data.template_id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onChange({ template_id: theme.id })}
                className={`relative flex flex-col items-center rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'border-2 border-primary shadow-lg bg-white'
                    : 'border border-borderBlush bg-[#FCF8F8] hover:border-primary/40 hover:shadow-md'
                }`}
              >
                <div className="w-full aspect-[2/3] p-2">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" />
                    
                    {/* Theme Text Overlay (Simulated) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
                       {/* This simulates what the invitation will look like with the background */}
                       <span className="text-[10px] opacity-70 mb-2 font-bold text-center w-full" style={{ color: '#4A3B32' }}>بكل الحب ندعوكم</span>
                       <span className="text-lg font-bold font-playfair" style={{ color: '#C9A84C' }}>{brideName}</span>
                       <div className="flex items-center gap-1 my-1">
                         <span className="text-[10px]" style={{ color: '#4A3B32' }}>✦</span>
                         <span className="text-sm font-serif" style={{ color: '#4A3B32' }}>&amp;</span>
                         <span className="text-[10px]" style={{ color: '#4A3B32' }}>✦</span>
                       </div>
                       <span className="text-lg font-bold font-playfair" style={{ color: '#C9A84C' }}>{groomName}</span>
                    </div>

                    {/* Checkmark */}
                    {isSelected && (
                      <div className="absolute top-2 left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full py-2 flex flex-col items-center bg-[#FCF8F8] rounded-b-2xl">
                  <span className="font-bold text-sm text-textDark">{theme.name}</span>
                  <span className="text-[10px] text-textDark/50">{theme.nameEn}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-borderBlush p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col gap-3" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <Button onClick={onNext} fullWidth>
          {t('next')}
        </Button>
        <Button variant="outline" onClick={onBack} fullWidth>
          {t('back')}
        </Button>
      </div>

      <div className="hidden md:flex gap-4 mt-4">
        <Button variant="outline" onClick={onBack} className="w-1/3">
          {t('back')}
        </Button>
        <Button onClick={onNext} className="w-2/3">
          {t('next')}
        </Button>
      </div>
    </div>
  );
};
