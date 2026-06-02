'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageProvider';
import { Navbar } from '@/components/ui/Navbar';
import {
  Heart, Plus, Calendar, Eye, Edit3,
  ExternalLink, LogOut, Trash2, Sparkles,
  MapPin, Check, Clock
} from 'lucide-react';
import Link from 'next/link';
import { Invitation } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/auth'); return; }
      setUser(session.user);
      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setInvitations(data || []);
      } catch (err: any) {
        console.error('Error fetching invitations:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدعوة نهائياً؟')) return;
    setDeleting(id);
    try {
      const { error } = await supabase.from('invitations').delete().eq('id', id);
      if (error) throw error;
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    } catch (err: any) {
      alert('حدث خطأ أثناء الحذف.');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('ar-EG', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return dateStr; }
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'عزيزي';
  const inv = invitations[0]; // single invitation

  if (loading) {
    return (
      <div className="min-h-screen bg-blush flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <span className="text-sm text-textDark/50 font-medium">جارٍ التحميل...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blush flex flex-col" dir="rtl">
      <Navbar />

      {/* Decorative top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

      <main className="flex-grow max-w-3xl mx-auto px-4 py-10 w-full flex flex-col gap-8">

        {/* ── Welcome Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-textDark/45 font-medium tracking-wide">
              <Heart className="h-3.5 w-3.5 text-primary fill-primary/40" />
              <span>لوحة التحكم</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-textDark font-playfair">
              أهلاً، <span className="text-primary">{userName}</span>
            </h1>
            <p className="text-sm text-textDark/50">
              {inv ? 'دعوتك جاهزة للمشاركة مع أحبائك' : 'ابدأ بإنشاء دعوة زفافك الرقمية'}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-textDark/50 hover:text-red-600 px-4 py-2.5 rounded-xl border border-[#EAD8D8] bg-white hover:bg-red-50 hover:border-red-200 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>خروج</span>
          </button>
        </motion.div>

        {/* ── Empty State ─── */}
        {!inv ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="card-luxury rounded-3xl p-12 flex flex-col items-center text-center gap-6"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#FBF6E8] to-[#F5E8CC] border border-[#C9A84C]/30 flex items-center justify-center">
                <Heart className="h-12 w-12 text-primary fill-primary/20 animate-pulse-soft" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#C9A84C] rounded-full flex items-center justify-center shadow-md">
                <Plus className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-textDark font-playfair">أنشئ دعوتك الأولى</h2>
              <p className="text-textDark/50 text-sm leading-relaxed max-w-xs">
                دعوة رقمية فاخرة تعكس قصة حبكم — جاهزة للمشاركة في دقائق
              </p>
            </div>

            <Link href="/create">
              <button className="btn-gold shimmer-overlay flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold">
                <Sparkles className="h-4 w-4" />
                <span>ابدأ الإنشاء</span>
              </button>
            </Link>

            <div className="flex items-center gap-6 text-xs text-textDark/35 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" />
                مجاني تماماً
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" />
                جاهز في دقائق
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" />
                يعمل على الموبايل
              </span>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="flex flex-col gap-5"
            >
              {/* Main Invitation Card */}
              <div className="card-luxury rounded-3xl overflow-hidden">
                {/* Gold top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#C9A84C] via-[#EDD97A] to-[#C9A84C]" />

                <div className="p-6 md:p-8 flex flex-col gap-6">
                  {/* Names + Status */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-textDark/40 font-medium">
                        <Heart className="h-3.5 w-3.5 text-primary fill-primary/40" />
                        <span>دعوة زفاف</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-textDark font-playfair leading-tight">
                        {inv.groom_name} <span className="text-primary text-xl">&</span> {inv.bride_name}
                      </h2>
                    </div>
                    <span className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full font-bold border ${
                      inv.is_published
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {inv.is_published ? '✓ منشورة' : '○ مسودة'}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 bg-blush/80 border border-[#EAD8D8]/60 rounded-2xl p-4">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#EAD8D8] flex items-center justify-center shrink-0">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-textDark/40 uppercase tracking-wider block">التاريخ</span>
                        <span className="text-sm font-bold text-textDark">{formatDate(inv.date_start)}</span>
                      </div>
                    </div>
                    {inv.venue_name && (
                      <div className="flex items-center gap-3 bg-blush/80 border border-[#EAD8D8]/60 rounded-2xl p-4">
                        <div className="w-9 h-9 rounded-xl bg-white border border-[#EAD8D8] flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-textDark/40 uppercase tracking-wider block">المكان</span>
                          <span className="text-sm font-bold text-textDark truncate block max-w-[150px]">{inv.venue_name}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active Features Pills */}
                  <div className="flex flex-wrap gap-2">
                    {inv.rsvp_enabled && (
                      <span className="text-xs px-3 py-1.5 bg-primary/8 text-primary border border-primary/15 rounded-full font-semibold">تأكيد الحضور</span>
                    )}
                    {inv.comments_enabled && (
                      <span className="text-xs px-3 py-1.5 bg-primary/8 text-primary border border-primary/15 rounded-full font-semibold">دفتر التهاني</span>
                    )}
                    {inv.music_enabled && (
                      <span className="text-xs px-3 py-1.5 bg-primary/8 text-primary border border-primary/15 rounded-full font-semibold">موسيقى</span>
                    )}
                    {inv.photo_album_enabled && (
                      <span className="text-xs px-3 py-1.5 bg-primary/8 text-primary border border-primary/15 rounded-full font-semibold">ألبوم الصور</span>
                    )}
                    {inv.password && (
                      <span className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-semibold">🔒 محمية</span>
                    )}
                  </div>

                  {/* Share Link */}
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#FBF6E8] to-[#F5E8CC] border border-[#C9A84C]/25 rounded-2xl p-4">
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#C9A84C]/70 uppercase tracking-wider block mb-1">رابط الدعوة</span>
                      <span className="text-sm font-mono text-textDark/70 truncate block">
                        {typeof window !== 'undefined' ? `${window.location.origin}/` : ''}{inv.slug}
                      </span>
                    </div>
                    <a
                      href={`/${inv.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#C9A84C] hover:text-[#8B6914] transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>فتح</span>
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <Link href={`/dashboard/${inv.id}`} className="col-span-1">
                      <button className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white border border-[#EAD8D8] text-textDark font-bold text-sm hover:border-primary/30 hover:text-primary hover:bg-primary/3 transition-all shadow-sm">
                        <Edit3 className="h-4 w-4" />
                        <span>تعديل</span>
                      </button>
                    </Link>

                    <a href={`/${inv.slug}`} target="_blank" rel="noopener noreferrer" className="col-span-1">
                      <button className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-all shadow-md">
                        <Eye className="h-4 w-4" />
                        <span>مشاهدة</span>
                      </button>
                    </a>

                    <button
                      onClick={() => handleDelete(inv.id)}
                      disabled={deleting === inv.id}
                      className="col-span-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white border border-red-100 text-red-500 font-bold text-sm hover:bg-red-50 hover:border-red-200 transition-all shadow-sm disabled:opacity-50"
                    >
                      {deleting === inv.id ? (
                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'الضيوف', val: '—', icon: '👥', desc: 'قريباً' },
                  { label: 'الزيارات', val: '—', icon: '👁', desc: 'قريباً' },
                  { label: 'التهاني', val: '—', icon: '💌', desc: 'قريباً' },
                ].map((stat, i) => (
                  <div key={i} className="card-luxury rounded-2xl p-4 flex flex-col items-center text-center gap-1.5">
                    <span className="text-xl">{stat.icon}</span>
                    <span className="text-lg font-bold text-textDark/40">{stat.val}</span>
                    <span className="text-xs font-semibold text-textDark/50">{stat.label}</span>
                    <span className="text-[10px] text-textDark/30">{stat.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
