'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import {
  Palette, Share2, CheckCircle, Clock,
  Image, BookOpen, Star, Crown,
  Users, Eye, MessageSquare, Play,
  Heart, Sparkles, Globe,
} from 'lucide-react';

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionTitle({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 mb-12">
      <div className="flex items-center gap-3">
        <span className="h-px w-12 bg-gradient-to-l from-gold/60 to-transparent" />
        <Sparkles className={`h-4 w-4 ${gold ? 'text-gold' : 'text-primary'}`} />
        <span className="h-px w-12 bg-gradient-to-r from-gold/60 to-transparent" />
      </div>
      <h2 className={`text-3xl md:text-4xl font-bold font-reemkufi ${gold ? 'text-white' : 'text-[#2D2D2D]'} text-center leading-relaxed`}>
        {children}
      </h2>
    </div>
  );
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <span className="h-px w-16 bg-gradient-to-l from-gold/40 to-transparent" />
      <span className="text-gold text-xs">◆</span>
      <span className="h-px w-16 bg-gradient-to-r from-gold/40 to-transparent" />
    </div>
  );
}

const themes = [
  { name: 'البحر المتوسط', image: '/templates/theme-greek-door-Jv_FhrVA.png' },
  { name: 'قصر الحمراء', image: '/templates/theme-alhambra-arch-CsfUpPjg.png' },
  { name: 'ثريا الحديقة', image: '/templates/theme-chandelier-garden-CzFTSeH2.png' },
  { name: 'الورود البيضاء', image: '/templates/theme-white-roses-BZgzK_Oo.png' },
  { name: 'قلعة القاهرة', image: '/templates/theme-cairo-citadel-CT6ofPiE.png' },
  { name: 'القصر العثماني', image: '/templates/theme-ottoman-palace-ChaZgPiF.png' },
];

const openingStyles = [
  { name: 'باب يوناني', image: '/backgrounds/flower-door.jpg' },
  { name: 'ظرف ملكي', image: '/backgrounds/night-roses.jpg' },
  { name: 'افتتاحية سينمائية', image: '/backgrounds/moroccan-sunset.jpg' },
  { name: 'زهور التوليب', image: '/backgrounds/garden-stairs.jpg' },
  { name: 'بوابة sunset', image: '/backgrounds/sunset-gate.jpg' },
];

const steps = [
  { icon: Palette, title: 'اختر الثيم', desc: 'تصفح تشكيلتنا الفاخرة من الثيمات واختر ما يناسب ذوقك.' },
  { icon: Heart, title: 'أضف التفاصيل', desc: 'أكتب أسماءكم، تاريخ الزفاف، المكان، وأي رسالة تريدون مشاركتها.' },
  { icon: Share2, title: 'شارك عبر واتساب', desc: 'شارك الرابط المخصص مع ضيوفك بضغطة زر واحدة.' },
];

const features = [
  { icon: Crown, title: 'دعوة فاخرة', desc: 'تصاميم فخمة بتفاصيل ذهبية وأنيقة تليق بليلة العمر.' },
  { icon: Share2, title: 'مشاركة واتساب', desc: 'مشاركة فورية عبر واتساب مع رابط مخصص لكل دعوة.' },
  { icon: CheckCircle, title: 'تأكيد حضور', desc: 'حضورك يؤكد بضغطة زر ونظام ذكي لحساب عدد الضيوف.' },
  { icon: Clock, title: 'عداد تنازلي', desc: 'عداد حي لتذكير الضيوف بعد الأيام المتبقية.' },
  { icon: Image, title: 'معرض صور', desc: 'ألبوم صور مشترك للعروسين يوثق اللحظات الجميلة.' },
  { icon: BookOpen, title: 'سجل ضيوف', desc: 'دفتر زوار رقمي لكتابة التهاني والرسائل.' },
];

const testimonials = [
  { name: 'نورة وأحمد', text: 'صممنا دعوة زفافنا بكل سهولة، النتيجة كانت رائعة والجميع أعجب بها.' },
  { name: 'سارة ومحمد', text: 'التصاميم فاخرة جداً، والعداد التنازلي كان رائعاً، ضيوفنا تفاعلوا كثيراً.' },
  { name: 'هدى وعمر', text: 'أسعار مناسبة وتصاميم تفوق الخيال، ساعدنا كثيراً في تنظيم الحفل.' },
];

const portfolioExamples = [
  { name: 'سارة & محمد', theme: 'القصر العثماني', image: '/templates/theme-ottoman-palace-ChaZgPiF.png', date: '١٥ مايو ٢٠٢٦' },
  { name: 'نورة & أحمد', theme: 'قلعة القاهرة', image: '/templates/theme-cairo-citadel-CT6ofPiE.png', date: '٢٨ مارس ٢٠٢٦' },
  { name: 'مريم & علي', theme: 'البحر المتوسط', image: '/templates/theme-greek-door-Jv_FhrVA.png', date: '١٠ أبريل ٢٠٢٦' },
  { name: 'هدى & عمر', theme: 'ثريا الحديقة', image: '/templates/theme-chandelier-garden-CzFTSeH2.png', date: '٢٢ يونيو ٢٠٢٦' },
  { name: 'ليلى & كريم', theme: 'الورود البيضاء', image: '/templates/theme-white-roses-BZgzK_Oo.png', date: '٥ يوليو ٢٠٢٦' },
  { name: 'دينا & يوسف', theme: 'قصر الحمراء', image: '/templates/theme-alhambra-arch-CsfUpPjg.png', date: '١٨ أغسطس ٢٠٢٦' },
];

export default function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-[#2D2D2D] font-cairo overflow-hidden" dir="rtl">

      {/* Floating language dropdown */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setLangOpen((p) => !p)}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-primary hover:shadow-xl transition-all"
        >
          <Globe className="h-5 w-5" />
        </button>
        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-14 left-0 bg-white rounded-xl shadow-xl border border-gray-100 p-1 min-w-[120px]"
            >
              <button
                onClick={() => { setLanguage('ar'); setLangOpen(false); }}
                className={`w-full text-right px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${language === 'ar' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                العربية
              </button>
              <button
                onClick={() => { setLanguage('en'); setLangOpen(false); }}
                className={`w-full text-right px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${language === 'en' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                English
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-8 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-10 w-72 h-72 rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute bottom-20 -right-10 w-96 h-96 rounded-full bg-gold/[0.05] blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-20 h-20 border border-gold/20 rounded-full" />
          <div className="absolute bottom-1/4 right-1/3 w-28 h-28 border border-gold/10 rotate-45" />
          <div className="absolute top-2/3 -left-4 w-16 h-16 bg-gold/[0.03] rounded-xl rotate-12" />
          <div className="absolute top-1/4 right-1/6 w-8 h-8 bg-primary/[0.03] rounded-full" />
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6 text-center lg:text-right"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-gold text-sm tracking-widest uppercase"
            >
              <span className="h-px w-8 bg-gradient-to-l from-gold/60 to-transparent" />
              منصة زفاف رقمية فاخرة
              <span className="h-px w-8 bg-gradient-to-r from-gold/60 to-transparent" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-reemkufi text-primary leading-tight"
            >
              <span className="relative inline-block">
                <span className="absolute -top-2 -right-2 text-gold/20 text-7xl sm:text-8xl lg:text-9xl select-none">ز</span>
                <span className="relative">زيكولا</span>
              </span>
              <br />
              <span className="text-gold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">حيث يصبح الفرح</span>
              <br />
              <span className="bg-gradient-to-l from-gold to-primary bg-clip-text text-transparent">تحفة فنية</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed lg:mx-0 mx-auto"
            >
              صمّم دعوة زفافك الرقمية الفاخرة بكل سهولة، وشاركها مع من تحب
              برابط مخصص وبطابع فخم ومميز يناسب ذوقك.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mt-2"
            >
              <a
                href="/create"
                className="group inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm shadow-lg shadow-primary/25 hover:bg-[#7A1717] transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                ابدأ مجاناً
                <Heart className="h-4 w-4 fill-white/20 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#themes"
                className="group inline-flex items-center gap-2 border-2 border-primary/20 text-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-primary/5 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                شاهد مثال
                <Play className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-6 mt-4 text-xs text-gray-500"
            >
              {[
                { label: 'بدون بطاقة ائتمان', icon: '✓' },
                { label: 'إعداد سريع', icon: '✓' },
                { label: 'تصاميم حصرية', icon: '✓' },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-1.5 group cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold group-hover:scale-125 transition-transform" />
                  {item.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-6 -right-6 w-72 h-72 border border-gold/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-6 -left-6 w-56 h-56 border border-gold/10 rounded-full"
              />
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative w-64 h-[500px] bg-[#1a1a2e] rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden flex items-center justify-center"
              >
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 z-10 flex items-center justify-center">
                  <span className="w-16 h-1.5 bg-gray-700 rounded-full" />
                </div>
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('/templates/theme-royal-curtains-DXMKvfIZ.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 right-6 text-right text-white">
                  <p className="font-reemkufi text-lg font-bold">سارة & محمد</p>
                  <p className="text-xs text-gold/80 font-reemkufi">زفاف</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== THEMES ===== */}
      <AnimatedSection id="themes" className="py-20 px-4 bg-white/60">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>ثيمات حصرية تبهج بالفخامة</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {themes.map((theme, i) => (
              <motion.div
                key={theme.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer aspect-[3/4]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${theme.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-5">
                  <h3 className="text-white font-reemkufi text-xl font-bold">{theme.name}</h3>
                  <div className="flex items-center gap-2 mt-2 text-gold/80 text-xs group-hover:text-gold transition-colors">
                    <span className="h-px w-6 bg-gold/40 group-hover:w-10 transition-all" />
                    ثيم حصري
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-gold/90 text-[#2D1B1B] text-[10px] font-bold px-2.5 py-1 rounded-full transition-all group-hover:scale-110 group-hover:bg-gold inline-block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== OPENING MOMENT ===== */}
      <AnimatedSection className="py-20 px-4 bg-burgundy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gold/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <SectionTitle gold>لحظة الافتتاح</SectionTitle>
          <p className="text-center text-gold/60 mb-10 -mt-6 text-sm">
            كل دعوة تبدأ بلحظة ساحرة تأسر القلوب
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {openingStyles.map((item, i) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer border border-gold/10 hover:border-gold/40 transition-all"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-all">
                    <Play className="h-5 w-5 fill-gold/80" />
                  </span>
                  <h3 className="text-white font-reemkufi text-sm font-bold text-center px-2">{item.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== DASHBOARD CONTROL ===== */}
      <AnimatedSection className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>كل شيء تحت سيطرتك</SectionTitle>
          <p className="text-center text-gray-500 -mt-6 mb-12 text-sm">
            لوحة تحكم ذكية تدير بها كل تفاصيل دعوتك
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeUp} custom={0} className="relative">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#2D2D2D] px-5 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-white/40 text-xs">لوحة التحكم — زيكولا</span>
                </div>
                <div className="grid grid-cols-4 gap-px bg-gray-100">
                  <div className="col-span-1 bg-gray-50 p-3 flex flex-col gap-2 text-xs text-gray-500">
                    <span className="text-primary font-bold">دعواتي</span>
                    <span>إنشاء جديد</span>
                    <span>الإحصائيات</span>
                    <span>الإعدادات</span>
                  </div>
                  <div className="col-span-3 bg-white p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <span className="text-sm font-bold text-gray-800">دعوة سارة ومحمد</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full transition-all hover:scale-105 hover:bg-green-200 inline-block">منشورة</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>المشاهدات</span>
                      <span className="font-bold text-primary">١٬٢٤٣</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>تأكيد الحضور</span>
                      <span className="font-bold text-green-600">٨٧</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>التعليقات</span>
                      <span className="font-bold text-gold">٣٢</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="block text-2xl font-bold font-reemkufi text-primary">١٬٢٤٣</span>
                  <span className="text-xs text-gray-500">عدد الضيوف</span>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <Eye className="h-6 w-6 text-gold mx-auto mb-2" />
                  <span className="block text-2xl font-bold font-reemkufi text-gold">١٢٬٥٠٠</span>
                  <span className="text-xs text-gray-500">المشاهدات</span>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <MessageSquare className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <span className="block text-2xl font-bold font-reemkufi text-green-600">٨٧٪</span>
                  <span className="text-xs text-gray-500">الردود</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center leading-relaxed">
                تابع إحصائيات دعوتك لحظة بلحظة، من عدد المشاهدات إلى تأكيدات الحضور،
                كل شيء منظّم في لوحة تحكم واحدة.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== 3 STEPS ===== */}
      <AnimatedSection className="py-20 px-4 bg-white/60">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>٣ خطوات فقط</SectionTitle>
          <p className="text-center text-gray-500 -mt-6 mb-12 text-sm">
            ابدأ في دقائق بثلاث خطوات بسيطة
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6 }}
                  className={`bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all relative group ${isLast ? 'md:col-span-2 md:max-w-sm md:mx-auto' : ''}`}
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-md transition-all group-hover:scale-110 group-hover:shadow-lg">
                    {i + 1}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-5 mt-2">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-reemkufi text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== FEATURES ===== */}
      <AnimatedSection id="features" className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>مزايا تخلي دعوتك لا تُنسى</SectionTitle>
          <p className="text-center text-gray-500 -mt-6 mb-12 text-sm">
            كل ما تحتاجه لصنع دعوة زفاف رقمية متكاملة
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((ft, i) => {
              const Icon = ft.icon;
              return (
                <motion.div
                  key={ft.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex gap-4 items-start"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-reemkufi text-base font-bold text-gray-800 mb-1">{ft.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{ft.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== TESTIMONIALS ===== */}
      <AnimatedSection className="py-20 px-4 bg-white/60">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>آراء العملاء</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {testimonials.map((t, i) => {
              const isLast = i === testimonials.length - 1;
              return (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  custom={i}
                  className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all ${isLast ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''}`}
                >
                  <div className="flex gap-1 mb-4 text-gold">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs font-reemkufi">
                      {t.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-gray-800 font-reemkufi">{t.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} custom={3} className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { num: '١٤٬٠٠٠+', label: 'دعوة منشورة' },
              { num: '٩٨٪', label: 'رضا العملاء' },
              { num: '١٬٠٠٠+', label: 'عميل سعيد' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-2xl font-bold font-reemkufi text-primary">{s.num}</span>
                <span className="text-[10px] text-gray-500">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ===== PORTFOLIO EXAMPLES ===== */}
      <AnimatedSection className="py-20 px-4 bg-white/60">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>نماذج من دعوات الزفاف</SectionTitle>
          <p className="text-center text-gray-500 -mt-6 mb-12 text-sm">
            تصفح بعض الدعوات التي صممها عملاؤنا بأنماط مختلفة
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolioExamples.map((item, i) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer aspect-[3/4]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-gold/90 text-[#2D1B1B] text-[10px] font-bold px-2 py-0.5 rounded-full transition-transform group-hover:scale-105">
                      {item.theme}
                    </span>
                  </div>
                  <h3 className="text-white font-reemkufi text-lg font-bold">{item.name}</h3>
                  <p className="text-gold/60 text-[10px] mt-1">{item.date}</p>
                </div>
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/90 text-primary text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    معاينة
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={6} className="text-center mt-10">
            <a
              href="/create"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm shadow-lg shadow-primary/25 hover:bg-[#7A1717] transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              اصنع دعوتك الآن
              <Heart className="h-4 w-4 fill-white/20" />
            </a>
          </motion.div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#2D1B1B] text-white/70 px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-right">
            <div className="md:col-span-1">
              <h3 className="text-3xl font-bold font-reemkufi text-gold mb-3">زيكولا</h3>
              <p className="text-xs text-white/50 leading-relaxed max-w-xs mx-auto md:mx-0">
                منصة رقمية لصناعة دعوات الزفاف الرقمية الفاخرة بكل سهولة وإتقان.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold/20 hover:text-gold transition-all hover:-translate-y-0.5">
                  <i className="fab fa-whatsapp" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold/20 hover:text-gold transition-all hover:-translate-y-0.5">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold/20 hover:text-gold transition-all hover:-translate-y-0.5">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold/20 hover:text-gold transition-all hover:-translate-y-0.5">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-5">روابط سريعة</h4>
              <div className="flex flex-col gap-3 text-xs">
                <a href="#" className="hover:text-gold transition-all hover:translate-x-0.5">الرئيسية</a>
                <a href="#themes" className="hover:text-gold transition-all hover:translate-x-0.5">الثيمات</a>
                <a href="#features" className="hover:text-gold transition-all hover:translate-x-0.5">المزايا</a>
                <a href="#" className="hover:text-gold transition-all hover:translate-x-0.5">الأسئلة الشائعة</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-5">الدعم</h4>
              <div className="flex flex-col gap-3 text-xs">
                <a href="#" className="hover:text-gold transition-all hover:translate-x-0.5">اتصل بنا</a>
                <a href="#" className="hover:text-gold transition-all hover:translate-x-0.5">سياسة الخصوصية</a>
                <a href="#" className="hover:text-gold transition-all hover:translate-x-0.5">الشروط والأحكام</a>
                <a href="#" className="hover:text-gold transition-all hover:translate-x-0.5">المساعدة</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-5">تواصل معنا</h4>
              <div className="flex flex-col gap-3 text-xs">
                <a href="#" className="flex items-center gap-2 hover:text-gold transition-all group">
                  <i className="fab fa-whatsapp w-4 text-center group-hover:scale-110 transition-transform" />
                  واتساب
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-gold transition-all group">
                  <i className="far fa-envelope w-4 text-center group-hover:scale-110 transition-transform" />
                  info@zykola.com
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-gold transition-all group">
                  <i className="fab fa-instagram w-4 text-center group-hover:scale-110 transition-transform" />
                  @zykola
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} زيكولا — جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
