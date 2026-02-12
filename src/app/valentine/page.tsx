'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { siteContent } from '@/content/content';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { HeroSection } from '@/components/HeroSection';
import { FilmStripGallery } from '@/components/FilmStripGallery';
import { MusicPlayer } from '@/components/MusicPlayer';
import { FallingPetals } from '@/components/FallingPetals';
import { DebugPanel } from '@/components/DebugPanel';

function ValentineContent() {
  const [magicStarted, setMagicStarted] = useState(false);
  const searchParams = useSearchParams();
  const debug = searchParams.get('debug') === '1';

  const player = useMusicPlayer(siteContent.playlist);

  const handleStartMagic = () => {
    // iOS: audio.play() MUST be called inside a user-gesture handler
    player.startPlayback();
    setMagicStarted(true);
  };

  return (
    <div className="relative min-h-screen-safe">
      <HeroSection
        content={siteContent.hero}
        onStartMagic={handleStartMagic}
        magicStarted={magicStarted}
      />

      {magicStarted && (
        <>
          {/* Falling petals overlay */}
          <FallingPetals />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Film strip gallery + love letter + countdown + capybara */}
            <FilmStripGallery />
          </motion.div>
        </>
      )}

      {/* Music player (fixed bottom bar) */}
      {magicStarted && (
        <MusicPlayer
          isPlaying={player.isPlaying}
          currentTrack={player.currentTrack}
          volume={player.volume}
          onTogglePlay={player.togglePlay}
          onNext={player.nextTrack}
          onPrev={player.prevTrack}
          onVolumeChange={player.setVolume}
        />
      )}

      {/* Debug overlay */}
      {debug && <DebugPanel audioElement={player.audioElement} />}
    </div>
  );
}

export default function ValentinePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen-safe flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-100">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl"
          >
            ❤️
          </motion.div>
        </div>
      }
    >
      <ValentineContent />
    </Suspense>
  );
}
