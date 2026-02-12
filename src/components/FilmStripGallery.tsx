'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilmStripGalleryProps {
  onClose?: () => void;
}

const ALL_IMAGES = [
  '/photos/20250604_211854_-_Copy.jpg',
  '/photos/20250604_211923.jpg',
  '/photos/20250604_215545.jpg',
  '/photos/20250607_170451_-_Copy.jpg',
  '/photos/20250607_170515.jpg',
  '/photos/20250607_202930.jpg',
  '/photos/20250704_105045.jpg',
  '/photos/20250704_110642.jpg',
  '/photos/20250725_100040.jpg',
  '/photos/20250725_120611.jpg',
  '/photos/20250803_095353.jpg',
  '/photos/20250803_095356.jpg',
  '/photos/20250803_095521.jpg',
  '/photos/20250803_095546.jpg',
  '/photos/20250803_100132.jpg',
  '/photos/20250803_100136.jpg',
  '/photos/20250803_100212.jpg',
  '/photos/20250803_100436.jpg',
  '/photos/20250803_100948.jpg',
  '/photos/20250821_130753.jpg',
  '/photos/20250915_143013(1).jpg',
  '/photos/IMG-20250705-WA0043.jpg',
];

const VISIBLE_COUNT = 6;

export function FilmStripGallery({ onClose }: FilmStripGalleryProps) {
  const [page, setPage] = useState(0);

  // Total pages: cycle through sets of 6
  const totalPages = Math.ceil(ALL_IMAGES.length / VISIBLE_COUNT);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  // Current 6 images to display
  const startIdx = page * VISIBLE_COUNT;
  const visibleImages = ALL_IMAGES.slice(startIdx, startIdx + VISIBLE_COUNT);
  // If last page has fewer than 6, fill from the beginning
  if (visibleImages.length < VISIBLE_COUNT) {
    visibleImages.push(...ALL_IMAGES.slice(0, VISIBLE_COUNT - visibleImages.length));
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* ── Image slideshow grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {visibleImages.map((src, i) => {
                const tilts = [-2.5, 1.8, -1.5, 2.2, -1.8, 2.5];
                const tilt = tilts[i % tilts.length];
                return (
                  <motion.div
                    key={`${page}-${i}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    style={{ transform: `rotate(${tilt}deg)` }}
                    className="relative"
                  >
                    <div className="bg-gray-900 rounded-sm p-1 shadow-lg shadow-black/30">
                      <div className="flex justify-between px-1 py-0.5">
                        {Array.from({ length: 6 }).map((_, h) => (
                          <div key={`t-${h}`} className="w-1.5 h-1 bg-gray-700 rounded-[1px]" />
                        ))}
                      </div>
                      <div className="aspect-[3/4] overflow-hidden bg-gray-800">
                        <img
                          src={src}
                          alt={`Memory ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                      <div className="flex justify-between px-1 py-0.5">
                        {Array.from({ length: 6 }).map((_, h) => (
                          <div key={`b-${h}`} className="w-1.5 h-1 bg-gray-700 rounded-[1px]" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Page dots */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === page
                    ? 'bg-rose-500 scale-125'
                    : 'bg-rose-200 hover:bg-rose-300'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Message section below the slideshow ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-rose-800 mb-6">
            Dear Malootti 💕
          </h2>

          <div className="rounded-2xl p-6 sm:p-10 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 shadow-lg">
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-left">
              {`Enth Parayaana Maalu. This is the first time I'm giving someone something "handmade", I'm glad that its you. I'm still a bit disheartened and disappointed that I could not build this gift to the extend I envisioned, because you deserve the best. It may seem basic but know that it took considerable effort and debugging.

Now, excuses aside, I love you. Love you to the moon and back. I know things have not been as they should lately, I really pray that we settle our differences and uncertainities in the upcoming days and form the unbreakable bond we once dreamt of.

Happy Valentines Day my CAPYkutti, can't wait to recieve you at the airport and smother you with kisses. Cant wait for days we're gonna cuddle up, go binge eating and making memories.

I'm praying for you every day. So, see you soon.

PS: Sending you virtual flowers and chocolates since I couldn't come over`}
            </p>
          </div>
        </motion.div>

        {/* ── Capybara surprise at the bottom ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          className="flex flex-col items-center gap-4 pt-8 pb-12"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-rose-300/40 border-4 border-white">
            <img
              src="/photos/capybara.jpg"
              alt="CAPYkutti 🤎"
              className="max-w-sm w-full h-auto"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
