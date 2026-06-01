'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, Edit3, Palette, Share2, Film, CheckCircle, Music, Camera, Lock, Heart } from 'lucide-react';

export default function LandingPage() {
  const { t, isRtl } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { id: '1', key: 'themeGardenStairs', img: '/backgrounds/garden-stairs.jpg' },
    { id: '2', key: 'themeIslamicArch', img: '/backgrounds/islamic-arch.jpg' },
    { id: '3', key: 'themeMoroccanSunset', img: '/backgrounds/moroccan-sunset.jpg' },
    { id: '4', key: 'themeFlowerDoor', img: '/backgrounds/flower-door.jpg' },
    { id: '5', key: 'themeSunsetGate', img: '/backgrounds/sunset-gate.jpg' },
    { id: '6', key: 'themeNightRoses', img: '/backgrounds/night-roses.jpg' }
  ];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className={`min-h-screen bg-[#FDF5F5] flex flex-col selection:bg-primary/20 ${!mounted ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
      <Navbar />

      {/* ── Section 1: Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B1A1A 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* Text Content */}
          <div className="flex-1 flex flex-col items-start gap-6 text-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-primary/20 shadow-sm"
            >
              {t('heroBadge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[32px] md:text-6xl lg:text-7xl font-extrabold text-[#2D2D2D] font-playfair leading-[1.2] md:leading-[1.1]"
            >
              {t('heroTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-[#2D2D2D]/70 font-medium max-w-lg leading-relaxed"
            >
              {t('heroSubtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2 w-full sm:w-auto"
            >
              <Link href="/create" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto py-3 md:py-4 px-6 md:px-8 text-base md:text-lg font-bold shadow-xl shadow-primary/20 rounded-full group h-auto min-h-[52px]">
                  <span>{t('createNow')}</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto py-3 md:py-4 px-6 md:px-8 text-base md:text-lg font-bold rounded-full border-2 border-[#E8D5D5] bg-transparent h-auto min-h-[52px]">
                {t('seeDemo')}
              </Button>
            </motion.div>
          </div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex justify-center w-full"
          >
            <div className="relative w-[280px] h-[580px] rounded-[40px] border-[8px] border-[#2D2D2D] bg-[#2D2D2D] shadow-2xl overflow-hidden shrink-0">
              <div className="absolute top-0 inset-x-0 h-6 bg-[#2D2D2D] z-20 rounded-b-xl w-32 mx-auto" />
              <div className="relative w-full h-full bg-[#FDF5F5] overflow-hidden">
                <Image src="/backgrounds/night-roses.jpg" alt="Preview" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-12 inset-x-0 text-center text-white p-4">
                  <p className="font-playfair text-3xl font-bold mb-2">أحمد & سارة</p>
                  <p className="text-sm opacity-80">24 نوفمبر 2025</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Stats Bar ───────────────────────────────────── */}
      <section className="bg-[#8B1A1A] py-8 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/20 text-center">
          <div className="flex-1 flex flex-col gap-1 w-full pt-4 md:pt-0">
            <span className="text-3xl md:text-4xl font-bold font-playfair">{isRtl ? '+1000' : '1000+'}</span>
            <span className="text-sm opacity-80 font-medium">{t('stats1000').replace('+1000', '').replace('1000+', '').trim()}</span>
          </div>
          <div className="flex-1 flex flex-col gap-1 w-full pt-4 md:pt-0">
            <span className="text-3xl md:text-4xl font-bold font-playfair">98%</span>
            <span className="text-sm opacity-80 font-medium">{t('stats98').replace('98%', '').trim()}</span>
          </div>
          <div className="flex-1 flex flex-col gap-1 w-full pt-4 md:pt-0">
            <span className="text-3xl md:text-4xl font-bold font-playfair">6</span>
            <span className="text-sm opacity-80 font-medium">{t('stats6').replace('6', '').trim()}</span>
          </div>
        </div>
      </section>

      {/* ── Section 3: Themes Showcase ─────────────────────────────── */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] font-playfair">{t('themesTitle')}</h2>
            <p className="text-[#2D2D2D]/60 font-medium max-w-xl mx-auto">{t('themesSubtitle')}</p>
          </div>

          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {themes.map((theme) => (
              <motion.div
                key={theme.id}
                whileHover={{ scale: 1.03 }}
                className="relative w-[300px] h-[400px] md:w-[260px] md:h-[360px] shrink-0 rounded-2xl overflow-hidden shadow-lg snap-start md:snap-center cursor-pointer group"
              >
                <Image src={theme.img} alt={t(theme.key as any)} fill className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0505]/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 inset-x-0 text-center">
                  <h3 className="text-white font-bold text-xl tracking-wide">{t(theme.key as any)}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Cinematic Opening ───────────────────────────── */}
      <section className="bg-[#3D0000] py-24 px-4 text-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-[#FDF5F5]">{t('cinemaTitle')}</h2>
            <p className="text-white/70 font-medium max-w-xl mx-auto">{t('cinemaSubtitle')}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {[
              { img: '/backgrounds/flower-door.jpg', label: t('cinemaClassic') },
              { img: '/backgrounds/sunset-gate.jpg', label: t('cinemaDramatic') },
              { img: '/backgrounds/islamic-arch.jpg', label: t('cinemaCinematic') },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-6">
                <div className="relative w-[220px] h-[460px] rounded-[30px] border-[6px] border-[#2D2D2D] bg-[#2D2D2D] overflow-hidden shadow-2xl">
                  <Image src={item.img} alt={item.label} fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <Film className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                <span className="font-bold text-lg text-[#FDF5F5]/90">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Guest Experience ────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col gap-6 text-start">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] font-playfair leading-tight">{t('controlTitle')}</h2>
            <p className="text-[#2D2D2D]/70 font-medium text-lg">{t('controlSubtitle')}</p>
            
            <div className="flex flex-col gap-4 mt-4">
              {[t('controlFeat1'), t('controlFeat2'), t('controlFeat3'), t('controlFeat4'), t('controlFeat5'), t('controlFeat6')].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-[#E8D5D5] p-4 rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#8B1A1A]/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-4 w-4 text-[#8B1A1A]" />
                  </div>
                  <span className="font-semibold text-[#2D2D2D]">{feat.replace('✓ ', '')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-[#E8D5D5] p-6 flex flex-col gap-6 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between border-b border-[#E8D5D5] pb-4">
                <h3 className="font-bold text-lg">{t('rsvpSummary')}</h3>
                <span className="bg-[#8B1A1A]/10 text-[#8B1A1A] px-3 py-1 rounded-full text-xs font-bold">مباشر</span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex justify-between items-center">
                  <span className="font-bold text-green-800">أكدوا الحضور</span>
                  <span className="text-2xl font-black text-green-700">42</span>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-2xl flex justify-between items-center">
                  <span className="font-bold text-yellow-800">بانتظار الرد</span>
                  <span className="text-2xl font-black text-yellow-700">8</span>
                </div>
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex justify-between items-center">
                  <span className="font-bold text-red-800">اعتذروا</span>
                  <span className="text-2xl font-black text-red-700">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Any Language ────────────────────────────────── */}
      <section className="bg-white border-y border-[#E8D5D5] py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] font-playfair">{t('langTitle')}</h2>
            <p className="text-[#2D2D2D]/60 font-medium">{t('langSubtitle')}</p>
          </div>

          <div className="flex bg-[#FDF5F5] p-2 rounded-full border border-[#E8D5D5] shadow-sm mb-4">
            <div className="px-8 py-2.5 rounded-full bg-[#8B1A1A] text-white font-bold text-sm shadow-md">عربي</div>
            <div className="px-8 py-2.5 rounded-full text-[#2D2D2D]/60 font-bold text-sm">English</div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
            <div className="w-full md:w-64 bg-[#FDF5F5] border border-[#E8D5D5] rounded-3xl p-6 shadow-md text-right font-cairo">
              <h4 className="text-[#8B1A1A] font-bold text-2xl mb-2">دعوة زفاف</h4>
              <p className="text-sm text-[#2D2D2D]/70 leading-relaxed">نتشرف بدعوتكم لحضور حفل زفافنا ومشاركتنا فرحتنا في هذه الليلة السعيدة.</p>
              <div className="mt-4 h-10 bg-[#8B1A1A] rounded-xl w-full flex items-center justify-center text-white font-bold text-sm">تأكيد الحضور</div>
            </div>
            
            <div className="w-full md:w-64 bg-white border border-[#E8D5D5] rounded-3xl p-6 shadow-md text-left font-inter">
              <h4 className="text-[#8B1A1A] font-bold text-2xl mb-2">Wedding</h4>
              <p className="text-sm text-[#2D2D2D]/70 leading-relaxed">We joyfully invite you to share our happiness as we celebrate our marriage.</p>
              <div className="mt-4 h-10 bg-[#8B1A1A] rounded-xl w-full flex items-center justify-center text-white font-bold text-sm">RSVP</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: How It Works ────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#FDF5F5]">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] font-playfair">{t('stepsTitle')}</h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
            <div className="hidden md:block absolute top-10 left-16 right-16 h-0.5 border-t-2 border-dashed border-[#E8D5D5] -z-10" />
            
            {[
              { num: '1', title: t('step1Title'), icon: Edit3 },
              { num: '2', title: t('step2Title'), icon: Palette },
              { num: '3', title: t('step3Title'), icon: Share2 },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center gap-5 w-full md:w-1/3 bg-white md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none shadow-sm md:shadow-none border md:border-none border-[#E8D5D5]">
                  <div className="w-20 h-20 bg-[#8B1A1A] rounded-full flex items-center justify-center text-white text-3xl font-black font-playfair shadow-lg shadow-[#8B1A1A]/30 relative">
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-[#8B1A1A] rounded-full flex items-center justify-center text-sm border border-[#E8D5D5]">
                      <Icon className="h-4 w-4" />
                    </span>
                    {step.num}
                  </div>
                  <h3 className="font-bold text-xl text-[#2D2D2D]">{step.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 8: Features ────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white border-t border-[#E8D5D5]">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] font-playfair">{t('featuresTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Film, title: t('feat1') },
              { icon: Palette, title: t('feat2') },
              { icon: CheckCircle, title: t('feat3') },
              { icon: Music, title: t('feat4') },
              { icon: Camera, title: t('feat5') },
              { icon: Lock, title: t('feat6') },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#FDF5F5] border border-[#E8D5D5] rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8D5D5] flex items-center justify-center text-[#8B1A1A] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-[#2D2D2D]">{f.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 9: Testimonials ────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#FDF5F5]">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] font-playfair">{t('testiTitle')}</h2>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { name: t('testi1Name'), text: t('testi1Text') },
              { name: t('testi2Name'), text: t('testi2Text') },
              { name: t('testi3Name'), text: t('testi3Text') },
            ].map((testi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8D5D5] shadow-sm flex flex-col gap-6 relative min-w-[280px] md:min-w-0 snap-start shrink-0"
              >
                <div className="text-[#8B1A1A] opacity-20 absolute top-6 right-6 font-playfair text-6xl leading-none">"</div>
                <div className="flex gap-1 text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                </div>
                <p className="text-[#2D2D2D]/80 font-medium leading-relaxed italic z-10">{testi.text}</p>
                <div className="mt-auto pt-4 border-t border-[#E8D5D5]">
                  <h4 className="font-bold text-[#8B1A1A]">{testi.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 10: Final CTA ──────────────────────────────────── */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[#3D0000] -z-20" />
        <div className="absolute inset-0 opacity-20 -z-10" style={{ backgroundImage: 'url(/backgrounds/sunset-gate.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold font-playfair leading-tight">{t('ctaTitle')}</h2>
          <p className="text-lg md:text-xl text-white/80 font-medium">{t('ctaSubtitle')}</p>
          <Link href="/create">
            <Button className="mt-4 bg-white text-[#8B1A1A] hover:bg-gray-100 py-5 px-10 text-xl font-bold shadow-2xl rounded-full">
              {t('createNow').replace('←', '').replace('→', '').trim()}
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-[#2D2D2D] text-white/60 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center gap-2 text-white font-playfair font-bold text-2xl">
            <Heart className="h-6 w-6 fill-white stroke-none" />
            <span>{isRtl ? 'زيكولا' : 'Zykola'}</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">{t('footerPrivacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footerTerms')}</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} Zykola. All rights reserved.</p>
          <p className="text-[#E8D5D5]">{t('footerMadeWith')}</p>
        </div>
      </footer>
    </div>
  );
}
