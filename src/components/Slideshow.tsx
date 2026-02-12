'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowProps {
  photos: Array<{ filename: string; caption: string }>;
}

export function Slideshow({ photos }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    },
    [currentIndex],
  );

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const photo = photos[currentIndex];

  return (
    <section className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center font-serif text-3xl sm:text-4xl text-rose-800 mb-8"
      >
        Our Moments ✨
      </motion.h2>

      <div className="relative mx-auto max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 bg-rose-100">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={`/photos/${photo.filename}`}
              alt={photo.caption}
              className="w-full h-full object-cover animate-ken-burns"
              draggable={false}
            />
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-black/50 to-transparent">
              <p className="text-white font-serif text-base sm:text-lg drop-shadow-md">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next buttons */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 flex items-center justify-center rounded-full
                     bg-white/30 backdrop-blur-sm text-white
                     active:bg-white/50 transition-colors"
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 flex items-center justify-center rounded-full
                     bg-white/30 backdrop-blur-sm text-white
                     active:bg-white/50 transition-colors"
          aria-label="Next photo"
        >
          ›
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="p-1.5"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
