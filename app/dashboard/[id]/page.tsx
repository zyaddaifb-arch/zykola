'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageProvider';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Textarea } from '@/components/ui/Textarea';
import { 
  ArrowRight, Users, MessageSquare, Edit3, Share2, 
  Trash2, Search, Check, X, Copy, ExternalLink, Calendar 
} from 'lucide-react';
import Link from 'next/link';
import { Invitation, Guest, Comment } from '@/types';

type Tab = 'edit' | 'rsvp' | 'comments';

export default function EditInvitationPage() {
  const { t, isRtl } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const invitationId = params.id as string;

  const [activeTab, setActiveTab] = useState<Tab>('edit');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // Database Data
  const [formData, setFormData] = useState<any>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Search & Filtering State
  const [guestSearch, setGuestSearch] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }

      // Fetch Invitation
      const { data: invitation, error: invError } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', invitationId)
        .single();

      if (invError) throw invError;
      setFormData(invitation);

      // Fetch Guests
      const { data: guestList, error: guestError } = await supabase
        .from('guests')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false });

      if (guestError) throw guestError;
      setGuests(guestList || []);

      // Fetch Comments
      const { data: commentList, error: commentError } = await supabase
        .from('comments')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false });

      if (commentError) throw commentError;
      setComments(commentList || []);

    } catch (err: any) {
      console.error('Error fetching details:', err.message);
      alert('حدث خطأ في تحميل البيانات.');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [invitationId, router]);

  useEffect(() => {
    if (invitationId) {
      fetchData();
    }
  }, [invitationId, fetchData]);

  const updateField = (updates: any) => {
    setFormData((prev: any) => ({ ...prev, ...updates }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('invitations')
        .update({
          groom_name: formData.groom_name,
          bride_name: formData.bride_name,
          slug: formData.slug,
          date_start: formData.date_start,
          date_end: formData.date_end || null,
          venue_name: formData.venue_name,
          venue_map_url: formData.venue_map_url || null,
          message: formData.message || null,
          cover_image_url: formData.cover_image_url || null,
          template_id: formData.template_id,
          opening_style: formData.opening_style,
          password: formData.password || null,
          rsvp_enabled: formData.rsvp_enabled,
          comments_enabled: formData.comments_enabled,
          music_enabled: formData.music_enabled,
          music_url: formData.music_url || null,
          music_file_url: formData.music_file_url || null,
          photo_album_enabled: formData.photo_album_enabled,
          photo_album_urls: formData.photo_album_urls,
          is_published: formData.is_published,
        })
        .eq('id', invitationId);

      if (error) throw error;
      alert('تم حفظ التغييرات بنجاح!');
    } catch (err: any) {
      console.error('Error saving invitation:', err.message);
      alert('فشل حفظ البيانات: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInvitation = async () => {
    if (!window.confirm(t('deleteConfirm'))) return;

    try {
      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', invitationId);

      if (error) throw error;
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error deleting invitation:', err.message);
      alert('فشل حذف الدعوة.');
    }
  };

  const deleteGuest = async (guestId: string) => {
    if (!window.confirm('هل تريد حذف هذا الضيف من قائمة الحضور؟')) return;

    try {
      const { error } = await supabase
        .from('guests')
        .delete()
        .eq('id', guestId);

      if (error) throw error;
      setGuests((prev) => prev.filter((g) => g.id !== guestId));
    } catch (err: any) {
      console.error('Error deleting guest:', err.message);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!window.confirm('هل تريد حذف هذه التهنئة؟')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err: any) {
      console.error('Error deleting comment:', err.message);
    }
  };

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}/${formData.slug}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const inviteLink = `${window.location.origin}/${formData.slug}`;
    const textMessage = `يسعدنا دعوتكم لحضور حفل زفافنا! تفضلوا بزيارة موقع دعوتنا الإلكترونية لمعرفة التفاصيل وتأكيد الحضور:\n${inviteLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  // RSVP Stats
  const confirmedGuests = guests.filter((g) => g.status === 'confirmed');
  const declinedGuests = guests.filter((g) => g.status === 'declined');
  const totalCompanions = confirmedGuests.reduce((acc, g) => acc + (g.companions_count || 0), 0);
  const totalAttending = confirmedGuests.length + totalCompanions;

  // Guest search filtering
  const filteredGuests = guests.filter((g) => 
    g.name.toLowerCase().includes(guestSearch.toLowerCase())
  );

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

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full flex flex-col gap-6 text-start">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 backdrop-blur-md border border-borderBlush p-6 rounded-3xl shadow-sm w-full">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2.5 rounded-full border border-borderBlush hover:bg-white transition-colors">
              <ArrowRight className={`h-5 w-5 text-primary ${isRtl ? '' : 'rotate-180'}`} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-textDark">
                إدارة دعوة: {formData.groom_name} &amp; {formData.bride_name}
              </h1>
              <p className="text-xs text-textDark/60 mt-1">تعديل التصميم، متابعة الحضور والتعليقات.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button variant="outline" onClick={handleCopyLink} className="flex-1 sm:flex-initial py-3 text-sm border-borderBlush">
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? t('copied') : t('copyLink')}</span>
            </Button>
            <Button onClick={handleWhatsAppShare} className="flex-1 sm:flex-initial py-3 text-sm">
              <Share2 className="h-4 w-4" />
              <span>مشاركة واتساب</span>
            </Button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-borderBlush/60 w-full gap-2 overflow-x-auto">
          {[
            { id: 'edit', label: 'تعديل البيانات', icon: Edit3 },
            { id: 'rsvp', label: `المدعوين (${totalAttending})`, icon: Users },
            { id: 'comments', label: `التهاني (${comments.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 transition-all shrink-0 ${
                  isActive 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-textDark/60 hover:text-textDark'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="bg-white/60 backdrop-blur-md border border-borderBlush p-6 md:p-8 rounded-3xl shadow-sm w-full">
          {activeTab === 'edit' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t('groomName')}
                  value={formData.groom_name}
                  onChange={(e) => updateField({ groom_name: e.target.value })}
                />
                <Input
                  label={t('brideName')}
                  value={formData.bride_name}
                  onChange={(e) => updateField({ bride_name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t('customSlug')}
                  value={formData.slug}
                  onChange={(e) => updateField({ slug: e.target.value.toLowerCase() })}
                  dir="ltr"
                  className="text-left font-mono"
                />
                <Input
                  label={t('venueName')}
                  value={formData.venue_name}
                  onChange={(e) => updateField({ venue_name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="datetime-local"
                  label={t('startDate')}
                  value={formData.date_start ? formData.date_start.substring(0, 16) : ''}
                  onChange={(e) => updateField({ date_start: e.target.value })}
                  dir="ltr"
                  className="text-left"
                />
                <Input
                  type="datetime-local"
                  label={t('endDate')}
                  value={formData.date_end ? formData.date_end.substring(0, 16) : ''}
                  onChange={(e) => updateField({ date_end: e.target.value })}
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <Input
                label={t('venueMapUrl')}
                value={formData.venue_map_url || ''}
                onChange={(e) => updateField({ venue_map_url: e.target.value })}
                dir="ltr"
                className="text-left"
              />

              <Textarea
                label={t('welcomeMessage')}
                value={formData.message || ''}
                onChange={(e) => updateField({ message: e.target.value })}
              />

              <div className="flex flex-col gap-2 py-4 border-t border-b border-borderBlush/40">
                <Toggle
                  checked={formData.rsvp_enabled}
                  onChange={(val) => updateField({ rsvp_enabled: val })}
                  label={t('enableRSVP')}
                />
                <Toggle
                  checked={formData.comments_enabled}
                  onChange={(val) => updateField({ comments_enabled: val })}
                  label={t('enableComments')}
                />
                <Toggle
                  checked={formData.photo_album_enabled}
                  onChange={(val) => updateField({ photo_album_enabled: val })}
                  label={t('enablePhotoAlbum')}
                />
                <Toggle
                  checked={formData.is_published}
                  onChange={(val) => updateField({ is_published: val })}
                  label="نشر الدعوة (تظهر للزوار عند زيارة الرابط)"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <Button
                  variant="outline"
                  onClick={handleDeleteInvitation}
                  className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center gap-2 py-3 px-5"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{t('deleteInvitation')}</span>
                </Button>

                <Button
                  onClick={handleSaveChanges}
                  isLoading={isSaving}
                  className="w-full sm:w-auto px-10 font-bold py-3.5"
                >
                  {t('saveChanges')}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'rsvp' && (
            <div className="flex flex-col gap-6">
              {/* RSVP Statistics Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex flex-col text-center gap-1 shadow-sm">
                  <span className="text-xl md:text-2xl font-bold text-green-800">{totalAttending}</span>
                  <span className="text-xs text-green-700 font-semibold">{t('rsvpAttending')}</span>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex flex-col text-center gap-1 shadow-sm">
                  <span className="text-xl md:text-2xl font-bold text-red-700">{declinedGuests.length}</span>
                  <span className="text-xs text-red-600 font-semibold">{t('rsvpNotAttending')}</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex flex-col text-center gap-1 shadow-sm">
                  <span className="text-xl md:text-2xl font-bold text-gray-700">{confirmedGuests.length}</span>
                  <span className="text-xs text-gray-600 font-semibold">عائلات / أفراد</span>
                </div>
              </div>

              {/* Guest Search */}
              <div className="relative w-full">
                <Input
                  value={guestSearch}
                  onChange={(e) => setGuestSearch(e.target.value)}
                  placeholder="ابحث عن اسم ضيف في القائمة..."
                  className="pr-10"
                />
                <Search className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-textDark/40 ${isRtl ? 'left-3' : 'right-3'}`} />
              </div>

              {/* Guest List Table */}
              {filteredGuests.length === 0 ? (
                <div className="text-center py-10 text-textDark/50 text-sm">
                  لا يوجد ضيوف مسجلين يطابقون البحث.
                </div>
              ) : (
                <div className="overflow-x-auto w-full border border-borderBlush rounded-2xl bg-white/40">
                  <table className="min-w-full divide-y divide-borderBlush text-right">
                    <thead className="bg-[#FDF5F5]">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-textDark/70 uppercase">اسم الضيف</th>
                        <th className="px-6 py-4 text-xs font-bold text-textDark/70 uppercase text-center">الرد</th>
                        <th className="px-6 py-4 text-xs font-bold text-textDark/70 uppercase text-center">المرافقين</th>
                        <th className="px-6 py-4 text-xs font-bold text-textDark/70 uppercase text-center">تاريخ التأكيد</th>
                        <th className="px-6 py-4 text-xs font-bold text-textDark/70 uppercase text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderBlush bg-white/70">
                      {filteredGuests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-white/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-semibold text-textDark">{guest.name}</td>
                          <td className="px-6 py-4 text-sm text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                              guest.status === 'confirmed'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                            }`}>
                              {guest.status === 'confirmed' ? t('rsvpYes') : t('rsvpNo')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-center font-bold text-textDark/70">
                            {guest.status === 'confirmed' ? guest.companions_count : 0}
                          </td>
                          <td className="px-6 py-4 text-xs text-center font-mono text-textDark/50">
                            {new Date(guest.created_at).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-sm text-center">
                            <button
                              type="button"
                              onClick={() => deleteGuest(guest.id)}
                              className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="flex flex-col gap-6">
              {comments.length === 0 ? (
                <div className="text-center py-10 text-textDark/50 text-sm">
                  لا توجد تهاني من الضيوف بعد.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-5 bg-white/70 border border-borderBlush rounded-2xl flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-primary">{comment.guest_name}</span>
                          <span className="text-[10px] text-textDark/40 font-mono">
                            {new Date(comment.created_at).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-textDark/90 whitespace-pre-wrap leading-relaxed">{comment.message}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors shrink-0"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
