'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import {
  Heart, Sparkles, Flower2, ArrowLeft, CheckCircle2,
  Share2, Globe, Lock, Music, Image, Users
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

const features = [
  { icon: Globe,   label: 'رابط مميز خاص بكم', desc: 'شاركوا الدعوة ببساطة عبر رابط واحد أنيق' },
  { icon: Lock,    label: 'حماية بكلمة مرور', desc: 'للخصوصية التامة — فقط المدعوون يرون دعوتكم' },
  { icon: Music,   label: 'موسيقى ترحيبية', desc: 'اختاروا لحنًا رومانسيًا يفتح مع الدعوة' },
  { icon: Image,   label: 'ألبوم صور حي', desc: 'الضيوف يشاركون لحظاتهم مباشرةً في الدعوة' },
  { icon: Users,   label: 'تأكيد الحضور', desc: 'تتبّع قائمة ضيوفك بسهولة من لوحة التحكم' },
  { icon: Share2,  label: 'مشاركة فورية', desc: 'واتساب، انستجرام، أو رابط مباشر بنقرة واحدة' },
];

const templates = [
  {
    id: 'mediterranean-gate',
    name: 'البوابة المتوسطية',
    desc: 'أبواب يونانية كلاسيكية وأعمدة رخامية',
    gradient: 'from-[#8B1A1A]/80 via-[#C9A84C]/40 to-[#FDF5F5]',
    accent: '#C9A84C',
    icon: Heart,
    tags: ['كلاسيكي', 'فاخر'],
  },
  {
    id: 'royal-palace-night',
    name: 'قصر الليل الملكي',
    desc: 'جمال ليلي ساحر مع ذهب متلألئ',
    gradient: 'from-[#0d0820] via-[#1a1435] to-[#C9A84C]/60',
    accent: '#C9A84C',
    icon: Sparkles,
    tags: ['ملكي', 'ليلي'],
  },
  {
    id: 'alhambra-arch',
    name: 'قوس الحمراء',
    desc: 'روح الأندلس وعمارة إسلامية أصيلة',
    gradient: 'from-[#3D1F00]/80 via-[#7C5A2E]/50 to-[#F5E8CC]',
    accent: '#D4A843',
    icon: Flower2,
    tags: ['أندلسي', 'تراثي'],
  },
];

const steps = [
  { n: '١', title: 'اختر التصميم', desc: 'من مجموعة قوالب فخمة مصممة للمناسبات العربية' },
  { n: '٢', title: 'أضف تفاصيلك', desc: 'أسماء العروسين، التاريخ، المكان، والرسالة' },
  { n: '٣', title: 'شارك الدعوة', desc: 'برابط واحد جميل يصل للجميع على أي جهاز' },
];

export default function LandingPage() {
  const { t, isRtl } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
  }, []);

  return (
    <div className="min-h-screen bg-blush flex flex-col selection:bg-primary/20 overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-20 pb-28 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 bg-petals pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-b from-primary/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#C9A84C]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        {/* Floating petals */}
        <div className="absolute top-24 left-8 w-3 h-3 rounded-full bg-[#C9A84C]/30 animate-float-slow" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-12 w-2 h-2 rounded-full bg-primary/20 animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-16 w-4 h-4 rounded-full bg-[#C9A84C]/20 animate-float-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-48 right-8 w-2 h-2 rounded-full bg-primary/15 animate-float-slow" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-7">
          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EAD8D8] shadow-sm text-xs font-bold text-[#8B1A1A] tracking-wide">
              <Heart className="h-3.5 w-3.5 fill-primary" />
              <span>دعوات زفاف رقمية فاخرة</span>
              <Heart className="h-3.5 w-3.5 fill-primary" />
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div {...fadeUp(0.08)} className="flex flex-col gap-3">
            <h1 className="text-6xl md:text-7xl font-extrabold font-playfair text-primary leading-[1.1] tracking-tight">
              {t('logo')}
            </h1>
            <div className="ornament-divider text-xs mx-auto w-48">
              <span>زيكولا</span>
            </div>
            <p className="text-xl md:text-2xl text-textDark/75 font-medium leading-relaxed max-w-lg">
              {t('slogan')}
            </p>
          </motion.div>

          {/* Sub-description */}
          <motion.p {...fadeUp(0.16)} className="text-base text-textDark/55 leading-relaxed max-w-md">
            أنشئ دعوة زفافك الرقمية في دقائق، وشاركها مع أحبائك برابط واحد جميل — بلا طباعة، بلا تكلفة.
          </motion.p>

          {/* CTA */}
          <motion.div {...fadeUp(0.22)} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link href={isLoggedIn ? '/dashboard' : '/auth'}>
              <button className="btn-gold shimmer-overlay flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold min-w-[200px] justify-center">
                <span>{isLoggedIn ? 'لوحة التحكم' : 'ابدأ مجاناً'}</span>
                <ArrowLeft className={`h-5 w-5 transition-transform ${isRtl ? '' : 'rotate-180'}`} />
              </button>
            </Link>
            <Link href={isLoggedIn ? '/create' : '/auth'}>
              <button className="flex items-center gap-2 px-6 py-4 rounded-full text-sm font-bold text-textDark/70 border border-[#EAD8D8] bg-white hover:bg-white hover:text-primary hover:border-primary/30 transition-all min-w-[160px] justify-center shadow-sm">
                <Sparkles className="h-4 w-4" />
                <span>استعرض التصاميم</span>
              </button>
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div {...fadeUp(0.28)}>
            <div className="flex items-center gap-6 text-xs text-textDark/45 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                مجاني تماماً
              </span>
              <span className="w-px h-4 bg-borderBlush" />
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                بدون إعلانات
              </span>
              <span className="w-px h-4 bg-borderBlush" />
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                يعمل على الموبايل
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section className="py-20 px-5 bg-white/50 border-y border-[#EAD8D8]/60">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-primary/60 uppercase tracking-widest block mb-3">كيف يعمل</span>
            <h2 className="text-3xl md:text-4xl font-bold text-textDark font-playfair">
              ثلاث خطوات فقط
            </h2>
            <p className="text-textDark/55 mt-3 text-base">لإنشاء دعوة رقمية لن يتوقعوها</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent pointer-events-none" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-4 relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FBF6E8] to-[#F5E8CC] border border-[#C9A84C]/30 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-[#C9A84C] font-playfair">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-textDark text-lg">{step.title}</h3>
                  <p className="text-sm text-textDark/55 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ────────────────────────────── */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-primary/60 uppercase tracking-widest block mb-3">التصاميم</span>
            <h2 className="text-3xl md:text-4xl font-bold text-textDark font-playfair">
              قوالب تليق بليلتكم
            </h2>
            <p className="text-textDark/55 mt-3 text-base">كل قالب مصمم باحترافية لتعكس شخصيتكم وأذواقكم</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {templates.map((tpl, i) => {
              const Icon = tpl.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="card-luxury rounded-3xl overflow-hidden group cursor-pointer"
                >
                  {/* Template visual */}
                  <div className={`h-44 bg-gradient-to-br ${tpl.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23FFFFFF'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    {/* Tags */}
                    <div className="absolute bottom-3 right-3 flex gap-1.5">
                      {tpl.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/30 text-white backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <h3 className="font-bold text-textDark text-lg">{tpl.name}</h3>
                    <p className="text-sm text-textDark/55 leading-relaxed">{tpl.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────── */}
      <section className="py-20 px-5 bg-white/50 border-y border-[#EAD8D8]/60">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-primary/60 uppercase tracking-widest block mb-3">المزايا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-textDark font-playfair">
              كل ما تحتاجه في مكان واحد
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="flex items-start gap-4 p-5 bg-white border border-[#EAD8D8]/70 rounded-2xl hover:border-primary/20 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FBF6E8] border border-[#C9A84C]/20 flex items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#C9A84C] group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-textDark text-sm">{feat.label}</span>
                    <span className="text-xs text-textDark/55 leading-relaxed">{feat.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────── */}
      <section className="py-24 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#C9A84C]/8 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center gap-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FBF6E8] to-[#F5E8CC] border border-[#C9A84C]/30 flex items-center justify-center shadow-lg"
          >
            <Heart className="h-10 w-10 text-primary fill-primary/30 animate-pulse-soft" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold font-playfair text-textDark leading-tight">
              ابدأ قصتكم <span className="text-gradient">اليوم</span>
            </h2>
            <p className="text-base text-textDark/55 leading-relaxed">
              دعوتكم جاهزة في أقل من ١٠ دقائق — مجاناً تماماً، بلا بطاقة ائتمان.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Link href={isLoggedIn ? '/create' : '/auth'}>
              <button className="btn-gold shimmer-overlay flex items-center gap-3 px-10 py-4.5 rounded-full text-lg font-bold shadow-xl">
                <Heart className="h-5 w-5 fill-current" />
                <span>أنشئ دعوتك الآن</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="py-8 border-t border-[#EAD8D8]/60">
        <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-textDark/40">
          <div className="flex items-center gap-2">
            <Heart className="h-3.5 w-3.5 fill-primary/40 text-primary/40" />
            <span className="font-playfair font-bold text-primary/50 text-sm">{t('logo')}</span>
          </div>
          <span>© {new Date().getFullYear()} زيكولا — جميع الحقوق محفوظة</span>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-textDark/60 transition-colors">الخصوصية</span>
            <span className="cursor-pointer hover:text-textDark/60 transition-colors">التواصل</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
