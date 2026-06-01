'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { Navbar } from '@/components/ui/Navbar';
import { supabase } from '@/lib/supabase';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { InvitationCard } from '@/components/dashboard/InvitationCard';
import { RSVPStats } from '@/components/dashboard/RSVPStats';
import { GuestList } from '@/components/dashboard/GuestList';

export default function DashboardPage() {
  const { isRtl } = useLanguage();
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [invitation, setInvitation] = useState<any>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }
      setUser(session.user);

      try {
        const { data: invs, error: invError } = await supabase
          .from('invitations')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (invError) throw invError;

        if (invs && invs.length > 0) {
          const inv = invs[0];
          setInvitation(inv);

          const { data: guestData, error: guestError } = await supabase
            .from('guests')
            .select('*')
            .eq('invitation_id', inv.id)
            .order('created_at', { ascending: false });

          if (guestError) throw guestError;
          setGuests(guestData || []);
        }
      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF5F5] flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5F5] flex flex-col font-cairo">
      <Navbar />

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        {!invitation ? (
          <div className="h-full flex items-center justify-center flex-grow">
            <EmptyState />
          </div>
        ) : (
          <div className="flex flex-col gap-8 w-full animate-fadeIn">
            <InvitationCard invitation={invitation} />
            
            {/* RSVP Section */}
            <div className="flex flex-col gap-6 bg-white border border-[#E8D5D5] rounded-[32px] p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-xl md:text-3xl text-[#2D2D2D] font-playfair border-b border-[#E8D5D5] pb-4 md:pb-5">
                {isRtl ? 'تأكيدات الحضور' : 'Guest RSVPs'}
              </h3>
              
              {invitation.rsvp_enabled ? (
                <div className="flex flex-col gap-8 w-full mt-2">
                  <RSVPStats guests={guests} />
                  <GuestList guests={guests} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-[#FDF5F5] rounded-2xl border border-[#E8D5D5] gap-4">
                  <div className="text-4xl opacity-50 mb-2">📜</div>
                  <p className="font-bold text-[#2D2D2D]/70 text-lg">
                    {isRtl ? 'تأكيد الحضور غير مفعّل في دعوتك' : 'RSVP is not enabled on your invitation'}
                  </p>
                  <a href={`/create?edit=${invitation.id}`} className="text-primary font-bold text-sm bg-white border border-[#E8D5D5] px-6 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                    {isRtl ? 'تفعيله من إعدادات الدعوة' : 'Enable it in invitation settings'}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
