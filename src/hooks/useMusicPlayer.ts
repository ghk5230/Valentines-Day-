'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

export interface Track {
  filename: string;
  title: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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
  const shuffledPlaylist = useMemo(() => shuffleArray(playlist), [playlist]);
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
      setTrackIndex((prev) => (prev + 1) % shuffledPlaylist.length);
    };
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [shuffledPlaylist.length]);

  // Update source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || shuffledPlaylist.length === 0) return;
    const src = `/music/${shuffledPlaylist[trackIndex].filename}`;
    audio.src = src;
    if (isPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, shuffledPlaylist]);

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
    setTrackIndex((prev) => (prev + 1) % shuffledPlaylist.length);
  }, [shuffledPlaylist.length]);

  const prevTrack = useCallback(() => {
    setTrackIndex((prev) => (prev - 1 + shuffledPlaylist.length) % shuffledPlaylist.length);
  }, [shuffledPlaylist.length]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }, []);

  // iOS requires audio.play() inside a user gesture handler
  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || shuffledPlaylist.length === 0) return;
    audio.src = `/music/${shuffledPlaylist[trackIndex].filename}`;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [shuffledPlaylist, trackIndex]);

  return {
    isPlaying,
    currentTrack: shuffledPlaylist[trackIndex] ?? { filename: '', title: 'No track' },
    volume,
    audioElement: audioRef.current,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    startPlayback,
  };
}
