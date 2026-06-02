'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageProvider';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Heart, Plus, Calendar, Eye, Edit, ExternalLink, LogOut, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Invitation } from '@/types';

export default function DashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }
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
    if (confirm('هل أنت متأكد من حذف هذه الدعوة بشكل نهائي؟ لا يمكن التراجع عن هذا الإجراء.')) {
      try {
        setLoading(true);
        const { error } = await supabase.from('invitations').delete().eq('id', id);
        if (error) throw error;
        setInvitations(invitations.filter((inv) => inv.id !== id));
      } catch (err: any) {
        console.error('Error deleting invitation:', err.message);
        alert('حدث خطأ أثناء الحذف.');
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blush flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blush flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full flex flex-col gap-8 text-start">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 backdrop-blur-md border border-borderBlush p-6 rounded-3xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-textDark flex items-center gap-2">
              <span>{t('dashboardTitle')}</span>
              <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-normal">
                {invitations.length} / 1
              </span>
            </h1>
            <p className="text-sm text-textDark/60 mt-1">مرحباً بك، {user?.user_metadata?.name || user?.email}</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {invitations.length === 0 && (
              <Link href="/create" className="flex-1 sm:flex-initial">
                <Button className="w-full flex items-center gap-2 px-5">
                  <Plus className="h-5 w-5" />
                  <span>{t('createNew')}</span>
                </Button>
              </Link>
            )}

            <Button variant="outline" onClick={handleLogout} className="px-4 py-3.5 border border-borderBlush">
              <LogOut className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>

        {invitations.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-12 bg-white/40 border border-dashed border-borderBlush rounded-3xl text-center gap-4">
            <Heart className="h-12 w-12 text-textDark/30" />
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-textDark text-lg">لا توجد دعوات زفاف بعد</h3>
              <p className="text-sm text-textDark/50">لك الحق في إنشاء دعوة زفاف واحدة مجانية.</p>
            </div>
            <Link href="/create" className="mt-2">
              <Button className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                <span>إنشاء الدعوة</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto w-full">
            {invitations.map((inv) => (
              <div 
                key={inv.id} 
                className="bg-white/70 backdrop-blur-md border border-borderBlush rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 left-0 h-1.5 bg-primary`} />

                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-textDark">
                      {inv.groom_name} &amp; {inv.bride_name}
                    </h2>
                    <span className="text-sm text-textDark/50 flex items-center gap-1.5 mt-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(inv.date_start)}
                    </span>
                  </div>

                  <span className={`text-xs px-3 py-1.5 rounded-full font-bold border ${
                    inv.is_published 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }`}>
                    {inv.is_published ? t('published') : t('draft')}
                  </span>
                </div>

                <div className="p-4 bg-[#FDF5F5]/80 border border-borderBlush rounded-2xl flex items-center justify-between text-sm font-mono text-textDark/70 overflow-hidden">
                  <span className="truncate pr-2">
                    {typeof window !== 'undefined' ? `${window.location.origin}/` : ''}{inv.slug}
                  </span>
                  <a 
                    href={`/${inv.slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 shrink-0 font-bold"
                  >
                    <span>{t('preview')}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-2">
                  <Link href={`/dashboard/${inv.id}`} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2 border border-borderBlush py-3 sm:py-4 text-sm sm:text-base font-bold bg-white hover:bg-gray-50">
                      <Edit className="h-4 w-4" />
                      <span>{t('manage')}</span>
                    </Button>
                  </Link>

                  <a href={`/${inv.slug}`} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="primary" className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base font-bold">
                      <Eye className="h-4 w-4" />
                      <span>مشاهدة</span>
                    </Button>
                  </a>

                  <Button variant="outline" onClick={() => handleDelete(inv.id)} className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 py-3 sm:py-4 font-bold flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Trash2 className="h-4 w-4" />
                    <span>حذف</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
