'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { Sparkles, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step2Props {
  data: any;
  onChange: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2: React.FC<Step2Props> = ({ data, onChange, onNext, onBack }) => {
  const { t } = useLanguage();

  const animations = [
    { id: 'greek_door', name: 'الباب اليوناني', desc: 'باب أزرق يفتح على ضوء البحر الأبيض المتوسط', video: '/videos/greek_door.mp4', isNew: true },
    { id: 'tulip_flowers', name: 'زهور التوليب', desc: 'افتتاح سينمائي بزهور التوليب', video: '/videos/tulip_flowers.mp4', isNew: true },
    { id: 'royal_envelope', name: 'الظرف الملكي', desc: 'ظرف فاخر بختم شمعي يذوب', video: '/videos/royal_envelope.mp4', isNew: true },
    { id: 'cinematic_opening', name: 'افتتاحية سينمائية', desc: 'مشهد سينمائي فاخر بانتقال أبيض ناعم', video: '/videos/cinematic_opening.mp4', isNew: true },
  ];

  const templates = [
    { id: 'mediterranean-gate', nameAr: 'بوابة المتوسط', nameEn: 'Mediterranean Gate', image: '/templates/theme-greek-door-Jv_FhrVA.png', colors: ['bg-blue-500', 'bg-pink-500', 'bg-white'] },
    { id: 'alhambra-arch', nameAr: 'بوابة الحمراء', nameEn: 'Alhambra Arch', image: '/templates/theme-alhambra-arch-CsfUpPjg.png', colors: ['bg-[#8B4513]', 'bg-[#556B2F]', 'bg-[#F5DEB3]'] },
    { id: 'rustic-garden-arch', nameAr: 'قوس الحديقة الريفي', nameEn: 'Rustic Garden Arch', image: '/templates/theme-rustic-arch-Crn5sfwp.png', colors: ['bg-[#DAA520]', 'bg-[#8FBC8F]', 'bg-[#FFF8DC]'] },
    { id: 'chandelier-garden', nameAr: 'حديقة الثريا', nameEn: 'Chandelier Garden', image: '/templates/theme-chandelier-garden-CzFTSeH2.png', colors: ['bg-[#BDB76B]', 'bg-[#2E8B57]', 'bg-[#F0FFFF]'] },
    { id: 'cairo-citadel', nameAr: 'قلعة القاهرة الذهبية', nameEn: 'Cairo Citadel', image: '/templates/theme-cairo-citadel-CT6ofPiE.png', colors: ['bg-[#D2691E]', 'bg-[#556B2F]', 'bg-[#FFFACD]'] },
    { id: 'andalusian-frame', nameAr: 'الإطار الأندلسي', nameEn: 'Andalusian Frame', image: '/templates/theme-andalusian-frame-BbE8Ghv4.png', colors: ['bg-[#CD853F]', 'bg-[#4682B4]', 'bg-[#FDF5E6]'] },
    { id: 'white-roses', nameAr: 'حديقة الورد الأبيض', nameEn: 'White Roses', image: '/templates/theme-white-roses-BZgzK_Oo.png', colors: ['bg-[#DAA520]', 'bg-[#8FBC8F]', 'bg-[#FFFAFA]'] },
    { id: 'ottoman-courtyard', nameAr: 'ساحة القصر العثماني', nameEn: 'Ottoman Courtyard', image: '/templates/theme-ottoman-palace-ChaZgPiF.png', colors: ['bg-[#FFD700]', 'bg-[#CD5C5C]', 'bg-[#2F4F4F]'] },
    { id: 'royal-palace-night', nameAr: 'ليلة القصر الملكي', nameEn: 'Royal Palace Night', image: '/templates/theme-palace-night-BHYFwz7p.png', colors: ['bg-[#F0E68C]', 'bg-[#87CEEB]', 'bg-[#191970]'] },
  ];

  return (
    <div className="flex flex-col gap-10 text-start" dir="rtl">
      
      {/* Interactive Experience Settings */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary h-6 w-6" />
          <h2 className="text-xl font-bold text-textDark">إعدادات التجربة التفاعلية</h2>
        </div>

        <div className="flex items-center justify-between bg-white/50 border border-borderBlush p-4 rounded-xl">
          <div>
            <h3 className="font-bold text-textDark">أنيميشن الافتتاح</h3>
            <p className="text-xs text-textDark/60 mt-1">تجربة فتح سينمائية عند دخول الدعوة</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={data.animation_enabled ?? true}
              onChange={(e) => onChange({ animation_enabled: e.target.checked })}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {(data.animation_enabled ?? true) && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              نمط الافتتاح
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {animations.map((anim) => {
                const isSelected = data.opening_style === anim.id;
                return (
                  <button
                    key={anim.id}
                    onClick={() => onChange({ opening_style: anim.id })}
                    className={`relative flex flex-col items-center bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md ${
                      isSelected ? 'border-primary ring-1 ring-primary/50' : 'border-[#E8D5D5] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full aspect-video relative bg-gray-100">
                      <video 
                        src={anim.video} 
                        className="w-full h-full object-cover"
                        loop 
                        muted 
                        playsInline
                        preload="metadata"
                        onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                        onTouchStart={(e) => {
                          const video = e.currentTarget;
                          video.paused ? video.play() : video.pause();
                        }}
                      />
                      {anim.isNew && (
                        <div className="absolute top-2 right-2 bg-gradient-to-l from-primary to-[#c94a4a] text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3" /> جديد
                        </div>
                      )}
                    </div>
                    <div className="p-3 text-center w-full bg-[#fdfaf8]">
                      <h4 className="font-bold text-sm text-textDark mb-1">{anim.name}</h4>
                      <p className="text-[10px] text-textDark/60 leading-tight">{anim.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Invitation Theme Settings */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Palette className="text-primary h-6 w-6" />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-textDark">ثيم الدعوة</h2>
            <p className="text-xs text-textDark/60 mt-1">اختر التصميم اللي يعكس روح حفلتك</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => {
            const isSelected = data.template_id === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => onChange({ template_id: tpl.id })}
                className={`relative flex flex-col bg-[#fdfaf8] rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isSelected ? 'border-primary ring-2 ring-primary shadow-md' : 'border-[#E8D5D5]'
                }`}
              >
                <div className="w-full p-3 h-80 relative">
                  <img 
                    src={tpl.image} 
                    alt={tpl.nameAr}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5">
                    {tpl.colors.map((c, i) => (
                      <span key={i} className={`w-2.5 h-2.5 rounded-full ${c} border border-black/10 shadow-sm`} />
                    ))}
                  </div>
                </div>
                <div className="pb-4 pt-1 text-center">
                  <h4 className="font-bold text-textDark text-lg">{tpl.nameAr}</h4>
                  <p className="text-xs text-textDark/50 font-medium mt-0.5">{tpl.nameEn}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 border-t border-borderBlush pt-8">
        <Button variant="outline" onClick={onBack} className="w-1/3 py-6 text-lg rounded-full">
          {t('back')}
        </Button>
        <Button onClick={onNext} className="w-2/3 py-6 text-lg font-bold rounded-full">
          {t('next')}
        </Button>
      </div>

    </div>
  );
};
