'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  dx: number;
  dy: number;
}

const EMOJIS = ['❤️', '💕', '💗', '💖', '💝', '🌹', '✨', '💘'];

export function HeartBurst() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHearts: Heart[] = Array.from({ length: 7 }, () => ({
      id: idRef.current++,
      x,
      y,
      size: 18 + Math.random() * 20,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      dx: (Math.random() - 0.5) * 140,
      dy: -(60 + Math.random() * 120),
    }));

    setHearts((prev) => [...prev.slice(-25), ...newHearts]);

    // Clean up after animation completes
    const ids = newHearts.map((h) => h.id);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !ids.includes(h.id)));
    }, 2500);
  }, []);

  return (
    <section className="py-12 px-4">
      <div
        ref={containerRef}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Tap anywhere to send hearts"
        className="relative mx-auto max-w-lg rounded-3xl overflow-hidden cursor-pointer select-none
                   bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100
                   p-10 sm:p-14 text-center active:scale-[0.99] transition-transform
                   min-h-[180px] border border-rose-100"
      >
        <p className="font-serif text-xl sm:text-2xl text-rose-600 mb-2 relative z-10 pointer-events-none">
          Tap to Send Love
        </p>
        <p className="text-stone-400 text-sm relative z-10 pointer-events-none">
          Go on, tap anywhere! 💗
        </p>

        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              initial={{ x: heart.x, y: heart.y, scale: 0, opacity: 1 }}
              animate={{
                x: heart.x + heart.dx,
                y: heart.y + heart.dy,
                scale: 1.2,
                opacity: 0,
                rotate: (Math.random() - 0.5) * 60,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 + Math.random() * 0.5, ease: 'easeOut' }}
              className="absolute top-0 left-0 pointer-events-none"
              style={{ fontSize: heart.size }}
            >
              {heart.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
