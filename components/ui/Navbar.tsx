'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from './Button';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, isRtl } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();
  }, []);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-borderBlush sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 h-14 md:py-4 md:h-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-playfair font-bold text-xl md:text-2xl">
          <Heart className="h-5 w-5 md:h-6 md:w-6 fill-primary stroke-none" />
          <span>{isRtl ? 'زيكولا' : 'Zykola'}</span>
        </Link>

        {/* Desktop Links / Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Language Toggle Pill */}
          <div className="flex items-center bg-white border border-borderBlush rounded-full p-1 shadow-sm">
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold transition-colors ${
                isRtl ? 'bg-primary text-white' : 'text-textDark/60 hover:bg-gray-100'
              }`}
            >
              AR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold transition-colors ${
                !isRtl ? 'bg-primary text-white' : 'text-textDark/60 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
          </div>

          {mounted && !isLoggedIn && (
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/auth" className="hidden sm:block">
                <span className="text-sm font-semibold text-textDark hover:text-primary transition-colors px-2">
                  {t('navSignIn')}
                </span>
              </Link>
              <Link href="/auth">
                <Button className="rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm h-auto min-h-[44px]">
                  {t('navTryFree')}
                </Button>
              </Link>
            </div>
          )}

          {mounted && isLoggedIn && (
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/dashboard">
                <Button className="rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm h-auto min-h-[44px]">
                  {t('dashboardTitle')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
