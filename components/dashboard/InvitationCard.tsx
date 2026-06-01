'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, Link2, Edit3, Share2, Eye, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface InvitationCardProps {
  invitation: any;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ invitation }) => {
  const { isRtl } = useLanguage();
  const [copied, setCopied] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch { return dateStr; }
  };

  const handleCopy = async () => {
    const url = `${window.location.origin}/${invitation.slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `${window.location.origin}/${invitation.slug}`;
    const text = isRtl 
      ? `نتشرف بدعوتكم لحضور حفل زفافنا ومشاركتنا الفرحة 🤍\n\nتفضلوا بزيارة رابط الدعوة لتأكيد الحضور ومعرفة التفاصيل:\n${url}`
      : `We joyfully invite you to share our happiness as we celebrate our marriage 🤍\n\nPlease visit the invitation link to RSVP and find details:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E8D5D5] p-5 md:p-8 flex flex-col gap-5 md:gap-6 w-full">
      <div className="flex flex-row justify-between items-start gap-3">
        <h2 className="text-xl md:text-3xl font-playfair font-bold text-[#2D2D2D] leading-tight text-right">
          {invitation.groom_name} & {invitation.bride_name}
        </h2>
        {invitation.is_published ? (
          <span className={`bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs md:text-sm font-bold border border-green-200 shrink-0 whitespace-nowrap`}>
            {isRtl ? 'منشورة ✓' : 'Published ✓'}
          </span>
        ) : (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs md:text-sm font-bold border border-gray-200 shrink-0 whitespace-nowrap">
            {isRtl ? 'مسودة' : 'Draft'}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center gap-3 text-[#2D2D2D]/80">
          <div className="w-10 h-10 rounded-full bg-[#8B1A1A]/5 flex items-center justify-center shrink-0">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold text-base">{formatDate(invitation.date_start)}</span>
        </div>
        <div className="flex items-center gap-3 text-[#2D2D2D]/80">
          <div className="w-10 h-10 rounded-full bg-[#8B1A1A]/5 flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold text-base">{invitation.venue_name || (isRtl ? 'لم يحدد بعد' : 'Not set')}</span>
        </div>
        <div className="flex items-center gap-3 text-[#2D2D2D]/80">
          <div className="w-10 h-10 rounded-full bg-[#8B1A1A]/5 flex items-center justify-center shrink-0">
            <Link2 className="h-5 w-5 text-primary" />
          </div>
          <div 
            onClick={handleCopy}
            className="flex-1 font-mono text-sm bg-[#FDF5F5] px-4 py-2.5 rounded-xl border border-[#E8D5D5] cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between gap-3 truncate"
            title={isRtl ? 'نسخ الرابط' : 'Copy link'}
          >
            <span className="truncate" dir="ltr">{`${typeof window !== 'undefined' ? window.location.origin : ''}/${invitation.slug}`}</span>
            {copied ? <Check className="h-4 w-4 text-green-500 shrink-0" /> : <Copy className="h-4 w-4 text-primary shrink-0" />}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4 border-t border-[#E8D5D5] pt-6">
        <Link href={`/create?edit=${invitation.id}`} className="flex-1">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 border-2 border-[#E8D5D5] font-bold bg-white text-[#2D2D2D] hover:bg-gray-50">
            <Edit3 className="h-4 w-4" />
            <span>{isRtl ? 'تعديل الدعوة' : 'Edit Invitation'}</span>
          </Button>
        </Link>
        <Button onClick={handleWhatsApp} className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold border-none shadow-none">
          <Share2 className="h-4 w-4" />
          <span>{isRtl ? 'مشاركة واتساب' : 'Share on WhatsApp'}</span>
        </Button>
        <Link href={`/${invitation.slug}`} target="_blank" className="flex-1">
          <Button variant="ghost" className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-primary font-bold hover:bg-primary/5">
            <Eye className="h-4 w-4" />
            <span>{isRtl ? 'معاينة' : 'Preview'}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
