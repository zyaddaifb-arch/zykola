'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flower, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LandingPage() {
  const { t, isRtl } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();
  }, []);

  const templatesPreview = [
    {
      name: 'قالب النسيم',
      desc: 'نعومة الورد وهدوء الألوان للقصص الرومانسية الكلاسيكية الرقيقة.',
      color: 'from-[#FDF5F5] to-[#C9848A]',
      icon: Heart,
    },
    {
      name: 'قالب الليل',
      desc: 'فخامة ملكية متلألئة بالذهب الداكن في ليلة العمر الفريدة.',
      color: 'from-[#1a1a2e] to-[#D4AF37]',
      icon: Sparkles,
    },
    {
      name: 'قالب الربيع',
      desc: 'بساطة مبهجة وألوان طبيعية تفيض بالجمال والحيوية والأناقة.',
      color: 'from-[#F5F0E8] to-[#7C9A7E]',
      icon: Flower,
    },
  ];

  return (
    <div className="min-h-screen bg-blush flex flex-col selection:bg-primary/20">
      <Navbar />

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 relative overflow-hidden">
        <div className="absolute top-1/4 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-16 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-2 shadow-sm border border-borderBlush"
          >
            <Heart className="h-8 w-8 text-primary fill-primary/10 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-5xl md:text-6xl font-extrabold text-primary font-playfair tracking-tight"
          >
            {t('logo')}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-lg md:text-xl text-textDark/80 font-medium max-w-lg leading-relaxed"
          >
            {t('slogan')}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-4 w-full sm:w-auto"
          >
            <Link href={isLoggedIn ? '/dashboard' : '/create'}>
              <Button className="w-full sm:w-64 py-4 text-lg font-bold shadow-lg flex items-center justify-center gap-2 group rounded-full">
                <span>{t('startNow')}</span>
                <ArrowLeft className={`h-5 w-5 transition-transform ${isRtl ? 'group-hover:-translate-x-1' : 'rotate-180 group-hover:translate-x-1'}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-white/45 border-t border-b border-borderBlush py-16 px-4">
        <div className="max-w-5xl mx-auto text-center flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-textDark">تصاميم مميزة تليق بليلتك الخاصة</h2>
            <p className="text-sm text-textDark/60">اختر من بين ثلاثة قوالب فخمة ومبسطة صممت خصيصاً لمشاركتها بسهولة وسرعة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templatesPreview.map((tpl, i) => {
              const Icon = tpl.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-borderBlush rounded-3xl p-6 text-start flex flex-col gap-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r ${tpl.color}`} />
                  
                  <span className="p-2.5 rounded-xl bg-[#FDF5F5] text-primary w-fit border border-borderBlush/40 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-textDark text-lg">{tpl.name}</h3>
                    <p className="text-xs text-textDark/65 leading-relaxed">{tpl.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-xs text-textDark/40 border-t border-borderBlush/40">
        &copy; {new Date().getFullYear()} {t('logo')} - جميع الحقوق محفوظة
      </footer>
    </div>
  );
}
