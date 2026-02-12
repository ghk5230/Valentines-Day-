'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginFormProps {
  content: {
    title: string;
    subtitle: string;
    hint: string;
    placeholder: string;
    buttonText: string;
    errorMessage: string;
  };
}

export function LoginForm({ content }: LoginFormProps) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim() || loading) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase: passphrase.trim() }),
      });

      if (res.ok) {
        router.push('/valentine');
        router.refresh();
      } else {
        setError(true);
        setShakeKey((k) => k + 1);
      }
    } catch {
      setError(true);
      setShakeKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key={shakeKey}
      initial={{ opacity: 0, y: 30 }}
      animate={
        error
          ? {
              opacity: 1,
              y: 0,
              x: [0, -8, 8, -8, 8, -4, 4, 0],
              transition: { x: { duration: 0.5 } },
            }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl shadow-rose-200/30 p-8 sm:p-10 border border-white/20">
        {/* Pulsing heart */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl mb-4 inline-block"
          >
            💝
          </motion.div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-rose-800">{content.title}</h1>
          <p className="text-pink-600 font-bold mt-2 text-sm">{content.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="passphrase" className="sr-only">
              Passphrase
            </label>
            <input
              id="passphrase"
              type="password"
              value={passphrase}
              onChange={(e) => {
                setPassphrase(e.target.value);
                setError(false);
              }}
              placeholder={content.placeholder}
              className="w-full px-5 py-4 rounded-2xl bg-rose-50/50 border-2 border-rose-200/50
                         focus:border-rose-400 focus:ring-4 focus:ring-rose-200/50
                         outline-none transition-all duration-300 text-stone-700 placeholder:text-stone-400
                         text-base"
              autoComplete="off"
              autoFocus
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-rose-600 text-sm text-center"
              >
                {content.errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !passphrase.trim()}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500
                       text-white font-semibold text-lg shadow-lg shadow-rose-300/50
                       hover:from-rose-600 hover:to-pink-600 active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 min-h-[52px]"
          >
            {loading ? (
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                Opening…
              </motion.span>
            ) : (
              content.buttonText
            )}
          </button>

          <p className="text-center text-stone-400 text-xs mt-4">{content.hint}</p>
        </form>
      </div>
    </motion.div>
  );
}
