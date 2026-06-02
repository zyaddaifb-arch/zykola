'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/Navbar';
import { Heart } from 'lucide-react';

export default function AuthPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError(t('requiredField'));
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (signInError) throw signInError;
        router.push('/dashboard');
      } else {
        if (!name.trim()) {
          setError(t('requiredField'));
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              name: name.trim(),
            },
          },
        });
        if (signUpError) throw signUpError;
        
        // Auto-login after sign up
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (signInError) throw signInError;
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Auth error:', err.message);
      setError(err.message || 'حدث خطأ ما. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blush flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-3 md:p-4">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-borderBlush rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-xl flex flex-col items-center">
          <Heart className="h-8 w-8 md:h-10 md:w-10 text-primary fill-primary/10 mb-3 md:mb-4 animate-pulse" />
          
          <h2 className="text-xl md:text-2xl font-bold text-textDark mb-4 md:mb-6">
            {isLogin ? t('login') : t('register')}
          </h2>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 text-start">
            {!isLogin && (
              <Input
                label={t('name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: أحمد محمد"
                required
              />
            )}

            <Input
              type="email"
              label={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="text-left"
              dir="ltr"
              required
            />

            <Input
              type="password"
              label={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="text-left font-mono"
              dir="ltr"
              required
            />

            {error && (
              <span className="text-xs font-semibold text-red-500 text-center">{error}</span>
            )}

            <Button type="submit" isLoading={loading} className="w-full mt-2 font-bold py-3.5">
              {isLogin ? t('login') : t('register')}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm text-primary hover:underline mt-6 font-medium"
          >
            {isLogin ? t('noAccount') : t('haveAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}
