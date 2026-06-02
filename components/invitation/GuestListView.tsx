'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Guest } from '@/types';
import { Check, X } from 'lucide-react';

interface GuestListViewProps {
  invitationId: string;
}

export const GuestListView: React.FC<GuestListViewProps> = ({ invitationId }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchGuests = async () => {
      try {
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .eq('invitation_id', invitationId)
          .order('created_at', { ascending: true });

        if (!cancelled && !error && data) {
          setGuests(data);
        }
      } catch (err) {
        console.error('Error fetching guests:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchGuests();

    // Poll for new guests every 10 seconds
    const interval = setInterval(fetchGuests, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [invitationId]);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#775a19]" />
      </div>
    );
  }

  if (guests.length === 0) return null;

  const confirmedGuests = guests.filter(g => g.status === 'confirmed');
  const declinedGuests = guests.filter(g => g.status === 'declined');

  return (
    <div className="w-full mt-6">
      <div className="bg-white/40 border border-[#775a19]/20 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
        <h4 className="font-bold text-[#00113a] text-sm md:text-base mb-4 text-center">
          قائمة الحضور
        </h4>

        {/* Stats mini-cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-green-50/80 border border-green-200 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs font-bold text-green-700">الحضور</span>
            </div>
            <span className="text-lg font-bold text-green-800">{confirmedGuests.length}</span>
          </div>
          <div className="bg-red-50/80 border border-red-200 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <X className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs font-bold text-red-600">الاعتذار</span>
            </div>
            <span className="text-lg font-bold text-red-700">{declinedGuests.length}</span>
          </div>
        </div>

        {/* Guest table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-[#775a19]/10">
                <th className="py-2 px-2 text-[10px] md:text-xs font-bold text-[#444650] uppercase tracking-wider">الاسم</th>
                <th className="py-2 px-2 text-[10px] md:text-xs font-bold text-[#444650] uppercase tracking-wider text-center">الحالة</th>
                <th className="py-2 px-2 text-[10px] md:text-xs font-bold text-[#444650] uppercase tracking-wider text-center">المرافقين</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#775a19]/5">
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-white/30 transition-colors">
                  <td className="py-2.5 px-2 text-sm font-semibold text-[#00113a]">{guest.name}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold transition-all hover:scale-105 ${
                      guest.status === 'confirmed'
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}>
                      {guest.status === 'confirmed' ? 'حاضر' : 'معتذر'}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center text-sm font-bold text-[#444650]">
                    {guest.status === 'confirmed' ? guest.companions_count : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
