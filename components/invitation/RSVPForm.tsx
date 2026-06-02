'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

interface RSVPFormProps {
  invitationId: string;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ invitationId }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'confirmed' | 'declined' | null>(null);
  const [companions, setCompanions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t('requiredField'));
      return;
    }
    if (!status) {
      setError(t('rsvpStatusRequired'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prevent duplicate: check if guest with same name already RSVPed
      const { data: existing } = await supabase
        .from('guests')
        .select('id')
        .eq('invitation_id', invitationId)
        .eq('name', name.trim());

      if (existing && existing.length > 0) {
        setError(t('rsvpDuplicateError'));
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('guests')
        .insert({
          invitation_id: invitationId,
          name: name.trim(),
          status,
          companions_count: status === 'confirmed' ? companions : 0,
        });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting RSVP:', err.message);
      setError(t('rsvpSaveError'));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center flex flex-col items-center gap-2 animate-fadeIn w-full">
        <span className="text-2xl">🎉</span>
        <h3 className="font-bold text-green-800 text-lg">{t('rsvpSuccess')}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white/50 border border-borderBlush rounded-2xl w-full flex flex-col gap-4 text-start">
      <h3 className="font-bold text-textDark text-lg border-b border-borderBlush pb-3 text-center">
        {t('rsvpConfirm')}
      </h3>

      <Input
        label={t('name')}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError('');
        }}
        placeholder="مثال: محمد أحمد"
        required
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-textDark/80">
          {t('rsvpWillAttend')}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setStatus('confirmed');
              if (error) setError('');
            }}
            className={`py-3 px-4 min-h-[52px] rounded-xl border flex items-center justify-center text-center font-bold transition-all ${
              status === 'confirmed'
                ? 'border-green-600 bg-green-50 text-green-800 ring-2 ring-green-500/20'
                : 'border-borderBlush bg-white/50 text-textDark hover:bg-white/80'
            }`}
          >
            {t('rsvpYes')}
          </button>
          <button
            type="button"
            onClick={() => {
              setStatus('declined');
              if (error) setError('');
            }}
            className={`py-3 px-4 min-h-[52px] rounded-xl border flex items-center justify-center text-center font-bold transition-all ${
              status === 'declined'
                ? 'border-red-500 bg-red-50 text-red-700 ring-2 ring-red-500/20'
                : 'border-borderBlush bg-white/50 text-textDark hover:bg-white/80'
            }`}
          >
            {t('rsvpNo')}
          </button>
        </div>
      </div>

      {status === 'confirmed' && (
        <div className="flex flex-col gap-1.5 animate-fadeIn">
          <label className="text-sm font-semibold text-textDark/80">
            {t('rsvpCompanions')}
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCompanions(Math.max(0, companions - 1))}
              className="w-[52px] h-[52px] flex items-center justify-center bg-white border border-borderBlush rounded-xl text-2xl font-bold text-textDark hover:bg-gray-50 shrink-0"
            >
              -
            </button>
            <div className="flex-1 h-[52px] flex items-center justify-center bg-white/50 border border-borderBlush rounded-xl">
              <span className="text-xl font-bold font-mono">{companions}</span>
            </div>
            <button
              type="button"
              onClick={() => setCompanions(Math.min(10, companions + 1))}
              className="w-[52px] h-[52px] flex items-center justify-center bg-white border border-borderBlush rounded-xl text-2xl font-bold text-textDark hover:bg-gray-50 shrink-0"
            >
              +
            </button>
          </div>
        </div>
      )}

      {error && (
        <span className="text-xs text-red-500 font-medium text-center">{error}</span>
      )}

      <Button type="submit" isLoading={loading} className="w-full mt-2 font-bold py-3.5">
        {t('rsvpConfirm')}
      </Button>
    </form>
  );
};
