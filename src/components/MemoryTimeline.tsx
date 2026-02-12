'use client';

import { motion } from 'framer-motion';

interface TimelineEntry {
  date: string;
  title: string;
  text: string;
  photo: string;
}

interface MemoryTimelineProps {
  entries: TimelineEntry[];
}

export function MemoryTimeline({ entries }: MemoryTimelineProps) {
  return (
    <section className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center font-serif text-3xl sm:text-4xl text-rose-800 mb-12"
      >
        Our Story 📖
      </motion.h2>

      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-rose-200"
          style={{ left: '1.25rem' }}
          aria-hidden="true"
        />

        {entries.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative pl-12 mb-12 last:mb-0"
          >
            {/* Dot on the line */}
            <div
              className="absolute w-4 h-4 bg-rose-400 rounded-full border-4 border-rose-50 z-10"
              style={{ left: 'calc(1.25rem - 0.5rem)', top: '1.5rem' }}
              aria-hidden="true"
            />

            {/* Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-rose-100/50 border border-rose-50">
              <div className="aspect-[3/2] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-rose-100 to-pink-100">
                <img
                  src={`/photos/${entry.photo}`}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <span className="text-rose-400 text-sm font-medium">{entry.date}</span>
              <h3 className="font-serif text-xl text-rose-800 mt-1">{entry.title}</h3>
              <p className="text-stone-500 mt-2 text-sm leading-relaxed">{entry.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
