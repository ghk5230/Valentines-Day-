'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PhotoLightboxProps {
  src: string | null;
  onClose: () => void;
}

export function PhotoLightbox({ src, onClose }: PhotoLightboxProps) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        >
          <motion.img
            src={src}
            alt="Full size photo"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.35, type: 'spring', bounce: 0.2 }}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl font-light
                       w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
            onClick={onClose}
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
