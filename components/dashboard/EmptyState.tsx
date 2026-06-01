'use client';
import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const EmptyState: React.FC = () => {
  const { isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center gap-6 w-full max-w-md mx-auto">
      <div className="w-24 h-24 rounded-full bg-[#8B1A1A]/10 flex items-center justify-center">
        <Heart className="h-12 w-12 text-[#8B1A1A]" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-[#2D2D2D] text-2xl font-playfair">
          {isRtl ? 'لم تنشئ دعوتك بعد' : 'You haven’t created your invitation yet'}
        </h3>
        <p className="text-[#2D2D2D]/60 text-base font-medium">
          {isRtl ? 'أنشئ دعوتك الآن وشاركها مع ضيوفك في دقائق' : 'Create your invitation now and share it with guests in minutes'}
        </p>
      </div>
      <Link href="/create" className="mt-4 w-full">
        <Button className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-primary/20 bg-primary text-white hover:opacity-90">
          <span>{isRtl ? 'أنشئ دعوتك الآن' : 'Create Your Invitation'}</span>
          <ArrowIcon className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};
