'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export interface Track {
  filename: string;
  title: string;
}

export interface MusicPlayerState {
  isPlaying: boolean;
  currentTrack: Track;
  volume: number;
  audioElement: HTMLAudioElement | null;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (v: number) => void;
  startPlayback: () => void;
}

export function useMusicPlayer(playlist: Track[]): MusicPlayerState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolumeState] = useState(0.7);

  // Create audio element once (client only)
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0.7;
    audioRef.current = audio;

    // When track ends, go to next
    const handleEnded = () => {
      setTrackIndex((prev) => (prev + 1) % playlist.length);
    };
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [playlist.length]);

  // Update source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;
    const src = `/music/${playlist[trackIndex].filename}`;
    audio.src = src;
    if (isPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, playlist]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const nextTrack = useCallback(() => {
    setTrackIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const prevTrack = useCallback(() => {
    setTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }, []);

  // iOS requires audio.play() inside a user gesture handler
  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;
    audio.src = `/music/${playlist[trackIndex].filename}`;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [playlist, trackIndex]);

  return {
    isPlaying,
    currentTrack: playlist[trackIndex] ?? { filename: '', title: 'No track' },
    volume,
    audioElement: audioRef.current,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    startPlayback,
  };
}
