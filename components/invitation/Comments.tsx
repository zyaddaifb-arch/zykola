'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Calendar } from 'lucide-react';
import { Comment } from '@/types';

interface CommentsProps {
  invitationId: string;
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
      fetchComments(); // Refresh comments list
    } catch (err: any) {
      console.error('Error saving comment:', err.message);
      setError('فشل حفظ تعليقك. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('ar-EG', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-start">
      <div className="p-6 bg-white/50 border border-borderBlush rounded-2xl flex flex-col gap-4">
        <h3 className="font-bold text-textDark text-lg border-b border-borderBlush pb-3 text-center flex items-center justify-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>{t('commentsTitle')}</span>
        </h3>

        {/* Comment list */}
        {fetching ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 text-textDark/50 text-sm">
            لا توجد تهاني بعد. كن أول من يبارك للعروسين!
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-thin">
            {comments.map((c) => (
              <div key={c.id} className="p-4 bg-white/80 rounded-xl border border-borderBlush/50 flex flex-col gap-1 shadow-sm">
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold text-sm text-primary">{c.guest_name}</span>
                  <span className="text-[10px] text-textDark/40 flex items-center gap-1 font-mono">
                    <Calendar className="h-3 w-3" />
                    {formatDate(c.created_at)}
                  </span>
                </div>
                <p className="text-sm text-textDark/90 whitespace-pre-wrap mt-1 leading-relaxed">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Comment form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 border-t border-borderBlush/40 pt-4">
          <h4 className="font-semibold text-sm text-textDark/80">{t('commentsLeave')}</h4>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder={t('commentsNamePlaceholder')}
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
            required
          />
          {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
          <Button type="submit" isLoading={loading} className="w-full mt-1 py-2.5 text-sm font-bold">
            {t('commentsSubmit')}
          </Button>
        </form>
      </div>
    </div>
  );
};
