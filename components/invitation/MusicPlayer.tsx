'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  url: string;
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ url, autoPlayTrigger = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.loop = true;
    }
  }, [url]);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          console.log('Autoplay was blocked by browser. User interaction required.');
        });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Play blocked:', err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 pb-[env(safe-area-inset-bottom)] pointer-events-none">
      <audio ref={audioRef} />
      <motion.button
        type="button"
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-lg relative border border-white/20 focus:outline-none pointer-events-auto"
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-5 w-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
          </>
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </motion.button>
    </div>
  );
};
