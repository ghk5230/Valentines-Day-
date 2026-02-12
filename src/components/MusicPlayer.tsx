'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  isPlaying: boolean;
  currentTrack: { filename: string; title: string };
  volume: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onVolumeChange: (v: number) => void;
}

export function MusicPlayer({
  isPlaying,
  currentTrack,
  volume,
  onTogglePlay,
  onNext,
  onPrev,
  onVolumeChange,
}: MusicPlayerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      className="fixed bottom-6 right-4 z-50 pb-safe"
      style={{ paddingRight: 'max(0px, env(safe-area-inset-right))' }}
    >
      <AnimatePresence mode="wait">
        {!expanded ? (
          /* ── Collapsed: floating vinyl disc ──────────────────── */
          <motion.button
            key="collapsed"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={() => setExpanded(true)}
            className="relative w-14 h-14 rounded-full shadow-xl shadow-rose-300/40
                       bg-gradient-to-br from-rose-500 to-pink-600 text-white
                       flex items-center justify-center
                       active:scale-90 transition-transform"
            aria-label="Open music player"
          >
            {/* Spinning disc ring */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
              className="absolute inset-0 rounded-full border-2 border-white/20"
            >
              <div className="absolute top-1 left-1/2 w-1 h-1 rounded-full bg-white/40 -translate-x-1/2" />
            </motion.div>

            {/* Icon */}
            <span className="text-lg relative z-10">
              {isPlaying ? '♫' : '♪'}
            </span>

            {/* Pulse ring when playing */}
            {isPlaying && (
              <motion.div
                animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-rose-400"
              />
            )}
          </motion.button>
        ) : (
          /* ── Expanded: compact pill player ───────────────────── */
          <motion.div
            key="expanded"
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-rose-200/50
                       border border-rose-100/60 overflow-hidden w-56"
          >
            {/* Header — tap to collapse */}
            <button
              onClick={() => setExpanded(false)}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-left
                         hover:bg-rose-50/50 transition-colors"
            >
              <span className="text-base">🎵</span>
              <span className="text-xs font-medium text-rose-700 truncate flex-1">
                {currentTrack?.title || 'No track'}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2.5" className="text-rose-300 flex-shrink-0">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Divider */}
            <div className="h-px bg-rose-100/80" />

            {/* Controls */}
            <div className="flex items-center justify-center gap-1 py-2 px-2">
              <button
                onClick={onPrev}
                className="w-10 h-10 flex items-center justify-center text-rose-500
                           hover:text-rose-700 active:scale-90 transition-all rounded-full
                           hover:bg-rose-50"
                aria-label="Previous track"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                </svg>
              </button>

              <button
                onClick={onTogglePlay}
                className="w-11 h-11 flex items-center justify-center
                           bg-gradient-to-br from-rose-500 to-pink-500 text-white
                           rounded-full active:scale-90 transition-all
                           shadow-md shadow-rose-300/40"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={onNext}
                className="w-10 h-10 flex items-center justify-center text-rose-500
                           hover:text-rose-700 active:scale-90 transition-all rounded-full
                           hover:bg-rose-50"
                aria-label="Next track"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-2 px-3 pb-2.5">
              <button
                onClick={() => onVolumeChange(volume > 0 ? 0 : 0.7)}
                className="text-xs text-rose-400 active:scale-90 transition-transform w-5 text-center"
                aria-label={volume > 0 ? 'Mute' : 'Unmute'}
              >
                {volume > 0 ? '🔊' : '🔇'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1"
                aria-label="Volume"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
