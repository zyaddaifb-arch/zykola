'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from './Button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="w-full bg-white/40 backdrop-blur-md border-b border-borderBlush sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-playfair font-bold text-2xl">
          <Heart className="h-6 w-6 fill-primary stroke-none" />
          <span>{t('logo')}</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="text-sm px-4 py-2 font-medium"
          >
            {language === 'ar' ? 'English' : 'عربي'}
          </Button>
        </div>
      </div>
    </header>
  );
};
