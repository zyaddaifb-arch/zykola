'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Palette, Share2, CheckCircle, Clock,
  Image, BookOpen, Star, Crown,
  Users, Eye, MessageSquare, Play,
  Heart, Sparkles, Phone,
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
      <h2 className={`text-3xl md:text-4xl font-bold font-amiri ${gold ? 'text-white' : 'text-[#2D2D2D]'} text-center leading-relaxed`}>
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream text-[#2D2D2D] font-cairo overflow-hidden" dir="rtl">

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-8 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/[0.03] blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gold/[0.04] blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-gold/10 rounded-full" />
          <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border border-gold/10 rotate-45" />
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 text-center lg:text-right"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 text-gold text-sm tracking-widest uppercase">
              <span className="h-px w-8 bg-gold/40" />
              منصة زفاف رقمية
              <span className="h-px w-8 bg-gold/40" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-amiri text-primary leading-tight">
              دعوة فرحك
              <br />
              <span className="text-gold">تحفة فنية</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed lg:mx-0 mx-auto">
              صمّم دعوة زفافك الرقمية الفاخرة بكل سهولة، وشاركها مع من تحب
              برابط مخصص وبطابع فخم ومميز يناسب ذوقك.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-2">
              <a
                href="/create"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm shadow-lg shadow-primary/25 hover:bg-[#7A1717] transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                ابدأ مجاناً
                <Heart className="h-4 w-4 fill-white/20" />
              </a>
              <a
                href="#themes"
                className="inline-flex items-center gap-2 border-2 border-primary/20 text-primary px-8 py-4 rounded-full font-bold text-sm hover:bg-primary/5 transition-all"
              >
                شاهد مثال
                <Play className="h-4 w-4" />
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                بدون بطاقة ائتمان
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                إعداد سريع
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                تصاميم حصرية
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-64 h-64 border border-gold/20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-48 h-48 border border-gold/10 rounded-full" />
              <div className="relative w-64 h-[500px] bg-[#1a1a2e] rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 z-10 flex items-center justify-center">
                  <span className="w-16 h-1.5 bg-gray-700 rounded-full" />
                </div>
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('/templates/theme-royal-curtains-DXMKvfIZ.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 right-6 text-right text-white">
                  <p className="font-amiri text-lg font-bold">سارة & محمد</p>
                  <p className="text-xs text-gold/80 font-amiri">زفاف</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== THEMES ===== */}
      <AnimatedSection id="themes" className="py-20 px-4 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>ثيمات حصرية تبهج بالفخامة</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <h3 className="text-white font-amiri text-xl font-bold">{theme.name}</h3>
                  <div className="flex items-center gap-2 mt-2 text-gold/80 text-xs">
                    <span className="h-px w-6 bg-gold/40" />
                    ثيم حصري
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-gold/90 text-[#2D1B1B] text-[10px] font-bold px-2.5 py-1 rounded-full">
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

        <div className="max-w-6xl mx-auto relative z-10">
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
                  <h3 className="text-white font-amiri text-sm font-bold text-center px-2">{item.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== DASHBOARD CONTROL ===== */}
      <AnimatedSection className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
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
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">منشورة</span>
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
                  <span className="block text-2xl font-bold font-amiri text-primary">١٬٢٤٣</span>
                  <span className="text-xs text-gray-500">عدد الضيوف</span>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <Eye className="h-6 w-6 text-gold mx-auto mb-2" />
                  <span className="block text-2xl font-bold font-amiri text-gold">١٢٬٥٠٠</span>
                  <span className="text-xs text-gray-500">المشاهدات</span>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <MessageSquare className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <span className="block text-2xl font-bold font-amiri text-green-600">٨٧٪</span>
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

      {/* ===== LANGUAGE TOGGLE ===== */}
      <AnimatedSection className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>دعوتك بأي لغة</SectionTitle>
          <p className="text-gray-500 -mt-6 mb-10 text-sm">
            قدّم دعوتك بالعربية أو الإنجليزية أو كلاهما معاً
          </p>

          <motion.div variants={fadeUp} custom={0} className="max-w-md mx-auto mb-10">
            <div className="bg-gray-100 rounded-full p-1 w-fit mx-auto flex shadow-inner">
              <div className="bg-white rounded-full px-6 py-2.5 text-sm font-bold text-primary shadow-sm">العربية</div>
              <div className="px-6 py-2.5 text-sm text-gray-400 cursor-pointer">English</div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="relative max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/[0.02] rounded-full" />
              <div className="relative z-10">
                <div className="text-gold text-xs mb-4 tracking-widest uppercase">بطاقة دعوة زفاف</div>
                <div className="font-amiri text-3xl font-bold text-primary mb-1">سارة</div>
                <div className="text-gold font-amiri text-lg mb-1">&</div>
                <div className="font-amiri text-3xl font-bold text-primary mb-6">محمد</div>
                <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6" />
                <div className="text-sm text-gray-600 space-y-2">
                  <p>الجمعة، ٢٥ ديسمبر ٢٠٢٦</p>
                  <p className="text-gold">٨:٠٠ مساءً — ١٢:٠٠ صباحاً</p>
                  <p>قاعة الأحلام، الرياض</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -left-3 -right-3 h-3 bg-gold/10 rounded-b-2xl blur-sm" />
          </motion.div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== 3 STEPS ===== */}
      <AnimatedSection className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>٣ خطوات فقط</SectionTitle>
          <p className="text-center text-gray-500 -mt-6 mb-12 text-sm">
            ابدأ في دقائق بثلاث خطوات بسيطة
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-5 mt-2">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-amiri text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <DecorativeDivider />

      {/* ===== FEATURES ===== */}
      <AnimatedSection className="py-20 px-4 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>مزايا تخلي دعوتك لا تُنسى</SectionTitle>
          <p className="text-center text-gray-500 -mt-6 mb-12 text-sm">
            كل ما تحتاجه لصنع دعوة زفاف رقمية متكاملة
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    <h3 className="font-amiri text-base font-bold text-gray-800 mb-1">{ft.title}</h3>
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
      <AnimatedSection className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>قالوا عن نفرح</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
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
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs font-amiri">
                    {t.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-gray-800 font-amiri">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={3} className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { num: '١٤٬٠٠٠+', label: 'دعوة منشورة' },
              { num: '٩٨٪', label: 'رضا العملاء' },
              { num: '١٬٠٠٠+', label: 'عميل سعيد' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-2xl font-bold font-amiri text-primary">{s.num}</span>
                <span className="text-[10px] text-gray-500">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#2D1B1B] text-white/70 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
            <div>
              <h3 className="text-2xl font-bold font-amiri text-gold mb-3">زيكولا</h3>
              <p className="text-xs text-white/50 leading-relaxed max-w-xs mx-auto md:mx-0">
                منصة رقمية لصناعة دعوات الزفاف الفاخرة بكل سهولة وإتقان.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-4">روابط سريعة</h4>
              <div className="flex flex-col gap-2 text-xs">
                <a href="#" className="hover:text-gold transition-colors">الرئيسية</a>
                <a href="#themes" className="hover:text-gold transition-colors">الثيمات</a>
                <a href="#" className="hover:text-gold transition-colors">المزايا</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-4">تواصل معنا</h4>
              <div className="flex flex-col gap-2 text-xs">
                <a href="#" className="hover:text-gold transition-colors">واتساب</a>
                <a href="#" className="hover:text-gold transition-colors">بريد إلكتروني</a>
                <a href="#" className="hover:text-gold transition-colors">إنستغرام</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} زيكولا — جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </div>
  );
}
