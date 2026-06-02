'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageProvider';
import { Input } from '@/components/ui/Input';
import { Heart, Mail, Lock, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard');
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError(t('requiredField')); return; }
    setLoading(true);
    try {
      if (isLogin) {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: email.trim(), password: password.trim(),
        });
        if (err) throw err;
        router.push('/dashboard');
      } else {
        if (!name.trim()) { setError(t('requiredField')); setLoading(false); return; }
        const { error: err } = await supabase.auth.signUp({
          email: email.trim(), password: password.trim(),
          options: { data: { name: name.trim() } },
        });
        if (err) throw err;
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: email.trim(), password: password.trim(),
        });
        if (signInErr) throw signInErr;
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ ما. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blush flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-b from-primary/6 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#C9A84C]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Floating elements */}
      <div className="absolute top-20 left-12 w-2.5 h-2.5 rounded-full bg-[#C9A84C]/30 animate-float-slow" />
      <div className="absolute top-32 right-16 w-2 h-2 rounded-full bg-primary/20 animate-float-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-24 left-20 w-3 h-3 rounded-full bg-[#C9A84C]/20 animate-float-slow" style={{ animationDelay: '4s' }} />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
          <Heart className="h-5 w-5 text-primary fill-primary/30" />
        </div>
        <span className="font-playfair font-bold text-2xl text-primary">زيكولا</span>
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-[#EAD8D8]/80 rounded-3xl shadow-[0_4px_40px_rgba(139,26,26,0.08)] overflow-hidden">
          {/* Top gold bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#C9A84C] via-[#EDD97A] to-[#C9A84C]" />

          <div className="p-8 md:p-10 flex flex-col gap-7">
            {/* Header */}
            <div className="text-center flex flex-col gap-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FBF6E8] to-[#F5E8CC] border border-[#C9A84C]/25 flex items-center justify-center mx-auto shadow-sm">
                <Sparkles className="h-7 w-7 text-[#C9A84C]" />
              </div>
              <h1 className="text-2xl font-bold text-textDark font-playfair mt-1">
                {isLogin ? 'أهلاً بعودتك' : 'ابدأ رحلتك'}
              </h1>
              <p className="text-sm text-textDark/50">
                {isLogin
                  ? 'سجّل دخولك لإدارة دعوة زفافك'
                  : 'أنشئ حسابك مجاناً وابدأ الآن'}
              </p>
            </div>

            {/* Toggle */}
            <div className="bg-[#FDF5F5] border border-[#EAD8D8]/60 rounded-2xl p-1 flex">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                  isLogin
                    ? 'bg-white text-primary shadow-sm border border-[#EAD8D8]/60'
                    : 'text-textDark/50 hover:text-textDark/70'
                }`}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                  !isLogin
                    ? 'bg-white text-primary shadow-sm border border-[#EAD8D8]/60'
                    : 'text-textDark/50 hover:text-textDark/70'
                }`}
              >
                حساب جديد
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <Input
                      label="الاسم الكريم"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="أحمد محمد"
                      icon={<User className="h-4 w-4" />}
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Input
                type="email"
                label="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                icon={<Mail className="h-4 w-4" />}
                className="text-left"
                dir="ltr"
                required
              />

              <Input
                type="password"
                label="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" />}
                className="text-left font-mono"
                dir="ltr"
                required
              />

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold shimmer-overlay w-full py-4 rounded-2xl text-base font-bold mt-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#3D2500]/30 border-t-[#3D2500] rounded-full animate-spin" />
                ) : (
                  <>
                    <Heart className="h-4 w-4 fill-current" />
                    <span>{isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-textDark/35 mt-5 leading-relaxed">
          بالمتابعة أنت توافق على شروط الاستخدام وسياسة الخصوصية
        </p>
      </motion.div>
    </div>
  );
}
