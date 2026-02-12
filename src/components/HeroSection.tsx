'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  content: {
    greeting: string;
    name: string;
    message: string;
    startButtonText: string;
  };
  onStartMagic: () => void;
  magicStarted: boolean;
}

export function HeroSection({ content, onStartMagic, magicStarted }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.section
      animate={
        magicStarted
          ? { height: 0, opacity: 0, overflow: 'hidden' }
          : { height: 'auto', opacity: 1 }
      }
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="relative h-screen-safe flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100" />

      {/* Floating background hearts */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-rose-200 select-none"
              style={{
                left: `${(i * 7 + 3) % 100}%`,
                top: `${(i * 13 + 8) % 100}%`,
                fontSize: `${20 + (i % 4) * 8}px`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [-5, 5, -5],
                opacity: [0.08, 0.25, 0.08],
              }}
              transition={{
                duration: 6 + (i % 5),
                repeat: Infinity,
                delay: (i * 0.4) % 3,
                ease: 'easeInOut',
              }}
            >
              ♥
            </motion.span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-rose-400 font-medium text-sm uppercase tracking-[0.25em] mb-3"
        >
          {content.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-rose-800 mb-6 leading-tight"
        >
          {content.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-600 text-base sm:text-lg leading-relaxed mb-10 font-light px-2"
        >
          {content.message}
        </motion.p>

        {!magicStarted ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartMagic}
            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white
                       font-semibold text-lg rounded-full shadow-xl shadow-rose-300/50
                       hover:shadow-2xl hover:shadow-rose-400/50
                       active:from-rose-600 active:to-pink-600
                       transition-all duration-300 min-h-[52px]
                       animate-pulse-soft"
          >
            {content.startButtonText}
          </motion.button>
        ) : null}
      </div>
    </motion.section>
  );
}
