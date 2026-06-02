'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from './Button';
import { Heart, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-[#EAD8D8]/80 shadow-[0_2px_20px_rgba(139,26,26,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300" />
            <Heart className="h-5 w-5 text-primary fill-primary/30 relative z-10" />
          </div>
          <span className="font-playfair font-bold text-2xl text-primary tracking-tight">
            {t('logo')}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn && (
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-sm font-semibold text-textDark/70 hover:text-primary px-4 py-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200">
                <LayoutDashboard className="h-4 w-4" />
                <span>لوحتي</span>
              </button>
            </Link>
          )}

          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="text-sm font-bold text-textDark/60 hover:text-primary px-3.5 py-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200 border border-transparent hover:border-borderBlush"
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>

          {isLoggedIn ? (
            <button
              onClick={async () => { await supabase.auth.signOut(); window.location.href = '/auth'; }}
              className="flex items-center gap-2 text-sm font-semibold text-textDark/60 hover:text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-all border border-borderBlush"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <Link href="/auth">
              <Button className="text-sm px-5 py-2.5 font-bold shadow-none border border-primary/20">
                ابدأ مجاناً
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2.5 rounded-xl text-textDark hover:bg-primary/5 transition-colors"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-borderBlush px-5 py-4 flex flex-col gap-2"
          >
            {isLoggedIn && (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-sm font-semibold text-textDark py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                لوحتي
              </Link>
            )}
            <button
              onClick={() => { setLanguage(language === 'ar' ? 'en' : 'ar'); setMenuOpen(false); }}
              className="text-right text-sm font-bold text-textDark/60 py-3 px-4 rounded-xl hover:bg-primary/5 transition-all"
            >
              {language === 'ar' ? 'English' : 'عربي'}
            </button>
            {isLoggedIn ? (
              <button
                onClick={async () => { await supabase.auth.signOut(); window.location.href = '/auth'; }}
                className="flex items-center gap-3 text-sm font-semibold text-red-600 py-3 px-4 rounded-xl hover:bg-red-50 transition-all"
              >
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </button>
            ) : (
              <Link href="/auth" onClick={() => setMenuOpen(false)}>
                <Button className="w-full font-bold py-3">ابدأ مجاناً</Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
