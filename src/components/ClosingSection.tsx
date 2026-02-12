'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ClosingSectionProps {
  content: {
    message: string;
    signature: string;
    name: string;
  };
}

export function ClosingSection({ content }: ClosingSectionProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <section className="py-24 px-4 text-center pb-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        {/* Decorative hearts */}
        <div className="flex justify-center gap-3 text-2xl mb-6 opacity-60" aria-hidden="true">
          💕 💖 💕
        </div>

        <h2 className="font-serif text-5xl sm:text-6xl text-rose-600 mb-4">{content.message}</h2>

        <p className="text-rose-400 font-serif text-xl italic mb-2">{content.signature}</p>

        <p className="text-stone-400 text-sm mb-2">{content.name}</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        onClick={handleLogout}
        className="mt-16 px-6 py-3 text-sm text-stone-400 hover:text-stone-600
                   border border-stone-200 hover:border-stone-300 rounded-full
                   transition-colors min-h-[44px]"
      >
        Leave this garden 🚪
      </motion.button>
    </section>
  );
}
