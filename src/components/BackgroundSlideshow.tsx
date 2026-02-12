'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/photos/20250803_095353.jpg',
  '/photos/20250803_095356.jpg',
  '/photos/20250803_100948.jpg',
];

const INTERVAL = 10000; // 10 seconds

export function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100"
        >
          <img
            src={IMAGES[currentIndex]}
            alt=""
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-pink-900/30 to-rose-900/40" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
