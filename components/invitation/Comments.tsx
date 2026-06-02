'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Calendar, Heart, Send, Sparkles } from 'lucide-react';
import { Comment } from '@/types';

interface CommentsProps {
  invitationId: string;
}

const AVATAR_COLORS = ['#8B1A1A', '#C9848A', '#D4AF37', '#7C9A7E', '#1a1a2e', '#775a19'];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function formatTimeAgo(dateStr: string): string {
  try {
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} يوم`;
    return d.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export const Comments: React.FC<CommentsProps> = ({ invitationId }) => {
  const { t } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const { data, error: fetchErr } = await supabase
        .from('comments')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false });

      if (fetchErr) throw fetchErr;
      setComments(data || []);
    } catch (err: any) {
      console.error('Error fetching comments:', err.message);
    } finally {
      setFetching(false);
    }
  }, [invitationId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(t('requiredField'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertErr } = await supabase
        .from('comments')
        .insert({
          invitation_id: invitationId,
          guest_name: name.trim(),
          message: message.trim(),
        });

      if (insertErr) throw insertErr;

      setName('');
      setMessage('');
      fetchComments();
    } catch (err: any) {
      console.error('Error saving comment:', err.message);
      setError('فشل حفظ تعليقك. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 text-start">
      {/* Comments list */}
      {fetching ? (
        <div className="flex justify-center py-8">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d4af37] animate-spin" />
          </div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 px-4">
          <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="h-6 w-6 text-[#d4af37]" />
          </div>
          <p className="text-[#444650] text-sm font-medium">لا توجد تهاني بعد</p>
          <p className="text-[#444650]/60 text-xs mt-1">كن أول من يبارك للعروسين</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
          {comments.map((c, i) => (
            <div
              key={c.id}
              className="group p-4 bg-white/80 rounded-xl border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all shadow-sm hover:shadow-md"
              style={{
                animation: `fadeInUp 0.4s ease-out ${i * 0.05}s both`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
                  style={{ backgroundColor: getAvatarColor(c.guest_name) }}
                >
                  {getInitials(c.guest_name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-bold text-sm text-[#00113a] truncate">{c.guest_name}</span>
                    <span className="text-[10px] text-[#444650]/50 flex items-center gap-1 shrink-0 font-mono">
                      <Calendar className="h-3 w-3" />
                      {formatTimeAgo(c.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-[#444650]/90 whitespace-pre-wrap leading-relaxed mt-1">
                    {c.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment form - Premium styling */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-t border-[#d4af37]/15 pt-5 mt-1">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="h-4 w-4 text-[#d4af37]" />
          <h4 className="font-semibold text-sm text-[#00113a]">{t('commentsLeave')}</h4>
        </div>
        <div className="space-y-2.5">
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder={t('commentsNamePlaceholder')}
            className="border-[#d4af37]/20 focus:border-[#d4af37]/50 bg-white/60"
            required
          />
          <Textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError('');
            }}
            placeholder={t('commentsMsgPlaceholder')}
            rows={3}
            className="border-[#d4af37]/20 focus:border-[#d4af37]/50 bg-white/60 resize-none"
            required
          />
        </div>
        {error && (
          <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium bg-red-50 px-3 py-2 rounded-lg">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            {error}
          </div>
        )}
        <Button
          type="submit"
          isLoading={loading}
          className="w-full mt-1 py-2.5 text-sm font-bold bg-gradient-to-l from-[#8B1A1A] to-[#a52a2a] hover:from-[#7A1717] hover:to-[#8B1A1A] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            {t('commentsSubmit')}
            <Send className="h-3.5 w-3.5" />
          </span>
        </Button>
      </form>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
