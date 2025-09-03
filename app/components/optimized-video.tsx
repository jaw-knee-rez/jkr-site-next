'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { PortfolioVideo } from '../types/portfolio';

interface OptimizedVideoProps extends PortfolioVideo {
  className?: string;
  priority?: boolean;
}

export default function OptimizedVideo({
  src,
  alt,
  caption,
  width,
  height,
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  className = '',
  priority = false
}: OptimizedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video loading
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setIsLoaded(true);
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (autoplay && videoRef.current && isLoaded) {
      videoRef.current.play().catch(console.error);
    }
  }, [autoplay, isLoaded]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-lg shadow-lg bg-black ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={width}
        height={height}
        loop={loop}
        muted={isMuted}
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        className="w-full h-auto object-cover"
        aria-label={alt}
      />

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Play/Pause overlay */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30"
        >
          <button
            onClick={togglePlay}
            className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8 text-white" />
            ) : (
              <PlayIcon className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </motion.div>
      )}

      {/* Video controls */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-4 right-4 flex gap-2"
        >
          <button
            onClick={toggleMute}
            className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-4 h-4 text-white" />
            ) : (
              <SpeakerWaveIcon className="w-4 h-4 text-white" />
            )}
          </button>
        </motion.div>
      )}

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
          <p className="text-sm font-medium">{caption}</p>
        </div>
      )}
    </div>
  );
}
