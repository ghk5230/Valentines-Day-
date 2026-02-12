'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PETALS = ['🌸', '🩷', '💗', '🌺', '♥', '✿', '❀'];

interface Petal {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
}

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
      left: Math.random() * 100,
      size: 12 + Math.random() * 16,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 15,
      sway: 30 + Math.random() * 60,
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none opacity-60"
          style={{
            left: `${p.left}%`,
            top: -30,
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, p.sway, -p.sway / 2, p.sway / 3, 0],
            rotate: [0, 360],
            opacity: [0, 0.7, 0.5, 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
