'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Calendar, PenLine, Trash2, RotateCcw } from 'lucide-react';
import { Comment } from '@/types';

interface CommentsProps {
  invitationId: string;
}

const QUICK_MESSAGES = [
  'ألف مبروك للعروسين! 🎉',
  'بارك الله لكما وبارك عليكما وجمع بينكما في خير 💍',
  'أتمنى لكما حياة مليئة بالسعادة والمحبة ❤️',
  'مبروك! دمتما للبعض نعمة وسعادة 🌸',
  'يسعدني أن أكون جزءاً من هذا اليوم الجميل 🥰',
  'ربنا يتمم عليكم بالخير ويسعد أيامكم 🤍',
  'كل عام وأنتما بخير وألف مبروك 🌺',
];

interface CommentWithSignature extends Comment {
  signature?: string;
}

export const Comments: React.FC<CommentsProps> = ({ invitationId }) => {
  const { t } = useLanguage();
  const [comments, setComments] = useState<CommentWithSignature[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [showSignature, setShowSignature] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

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

  // ─── Canvas Drawing ───────────────────────────────────────────────────
  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx || !lastPos.current) return;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPos.current = pos;
    setHasDrawn(true);
  };

  const stopDraw = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const getSignatureData = (): string | null => {
    if (!hasDrawn || !canvasRef.current) return null;
    return canvasRef.current.toDataURL('image/png');
  };

  // ─── Submit ───────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(t('requiredField'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const signature = getSignatureData();
      const { error: insertErr } = await supabase
        .from('comments')
        .insert({
          invitation_id: invitationId,
          guest_name: name.trim(),
          message: message.trim(),
          ...(signature ? { signature } : {}),
        });

      if (insertErr) throw insertErr;

      setName('');
      setMessage('');
      clearCanvas();
      setShowSignature(false);
      fetchComments();
    } catch (err: any) {
      console.error('Error saving comment:', err.message);
      setError('فشل حفظ تعليقك. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('ar-EG', {
        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
      });
    } catch { return ''; }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-start" dir="rtl">
      <div className="p-6 bg-white/50 border border-borderBlush rounded-2xl flex flex-col gap-4">
        <h3 className="font-bold text-textDark text-lg border-b border-borderBlush pb-3 text-center flex items-center justify-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>دفتر التهاني</span>
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
          <div className="max-h-[350px] overflow-y-auto pr-1 flex flex-col gap-3">
            {comments.map((c) => (
              <div key={c.id} className="p-4 bg-white/80 rounded-xl border border-borderBlush/50 flex flex-col gap-2 shadow-sm">
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold text-sm text-primary">{c.guest_name}</span>
                  <span className="text-[10px] text-textDark/40 flex items-center gap-1 font-mono">
                    <Calendar className="h-3 w-3" />
                    {formatDate(c.created_at)}
                  </span>
                </div>
                <p className="text-sm text-textDark/90 whitespace-pre-wrap leading-relaxed">{c.message}</p>
                {c.signature && (
                  <div className="mt-2 pt-2 border-t border-borderBlush/40">
                    <span className="text-[10px] text-textDark/40 mb-1 block flex items-center gap-1">
                      <PenLine className="h-3 w-3" /> التوقيع
                    </span>
                    <img
                      src={c.signature}
                      alt="توقيع الضيف"
                      className="max-h-16 max-w-[200px] object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Comment form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2 border-t border-borderBlush/40 pt-4">
          <h4 className="font-semibold text-sm text-textDark/80">اترك تهنئتك للعروسين ✨</h4>

          <Input
            value={name}
            onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
            placeholder="اسمك"
            required
          />

          {/* Quick Messages */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-textDark/50 font-medium">رسائل جاهزة — اضغط لتحديد</span>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {QUICK_MESSAGES.map((qm, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMessage(qm)}
                  className={`shrink-0 text-[11px] px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                    message === qm
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-textDark border-borderBlush hover:border-primary/40'
                  }`}
                >
                  {qm}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            value={message}
            onChange={(e) => { setMessage(e.target.value); if (error) setError(''); }}
            placeholder="رسالة تهنئتك..."
            rows={3}
            required
          />

          {/* Signature Toggle */}
          <button
            type="button"
            onClick={() => setShowSignature((v) => !v)}
            className="flex items-center gap-2 text-sm text-primary font-semibold self-start hover:underline"
          >
            <PenLine className="h-4 w-4" />
            {showSignature ? 'إخفاء التوقيع' : 'أضف توقيعك الشخصي (اختياري)'}
          </button>

          {showSignature && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-textDark/60">ارسم توقيعك بإصبعك أو الماوس</span>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> مسح
                </button>
              </div>
              <canvas
                ref={canvasRef}
                width={340}
                height={120}
                className="w-full h-28 border-2 border-dashed border-borderBlush rounded-xl bg-white touch-none cursor-crosshair"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
              />
            </div>
          )}

          {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
          <Button type="submit" isLoading={loading} className="w-full mt-1 py-2.5 text-sm font-bold">
            إرسال التهنئة 💌
          </Button>
        </form>
      </div>
    </div>
  );
};
