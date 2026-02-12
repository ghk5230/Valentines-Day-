'use client';

import { motion } from 'framer-motion';

interface FloatingPolaroidsProps {
  photos: Array<{ filename: string; caption: string }>;
}

export function FloatingPolaroids({ photos }: FloatingPolaroidsProps) {
  const displayPhotos = photos.slice(0, 6);

  return (
    <section className="py-16 px-4 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center font-serif text-3xl sm:text-4xl text-rose-800 mb-10"
      >
        Snapshots of Us 📸
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
        {displayPhotos.map((photo, i) => {
          const rotation = i % 2 === 0 ? -2 : 2.5;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: rotation * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: rotation }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              className="bg-white rounded-lg p-2.5 sm:p-3 shadow-lg shadow-rose-100/60
                         transition-shadow hover:shadow-xl cursor-pointer"
            >
              <div className="aspect-[3/4] rounded overflow-hidden mb-2 bg-gradient-to-br from-rose-100 to-pink-100">
                <img
                  src={`/photos/${photo.filename}`}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <p className="text-stone-500 text-xs text-center font-serif italic truncate">
                {photo.caption}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
