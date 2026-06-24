import React, { useEffect, useRef } from 'react';

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({ src, className = '', style = {} }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rAFRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  const fadeTo = (targetOpacity: number, durationMs: number = 500) => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    // Read current opacity or default to 0
    const currentOpacity = parseFloat(video.style.opacity || '0');
    const startOpacity = isNaN(currentOpacity) ? 0 : currentOpacity;
    const opacityDiff = targetOpacity - startOpacity;
    
    if (opacityDiff === 0) return;

    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current);
    }

    const startTime = performance.now();

    const animateFade = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      // Linear ease
      const nextOpacity = startOpacity + opacityDiff * progress;
      if (videoRef.current) {
        videoRef.current.style.opacity = nextOpacity.toString();
      }

      if (progress < 1) {
        rAFRef.current = requestAnimationFrame(animateFade);
      }
    };

    rAFRef.current = requestAnimationFrame(animateFade);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initial opacity state is 0
    video.style.opacity = '0';

    const handleLoadedData = () => {
      if (!video) return;
      video.style.opacity = '0';
      video.play().catch((err) => console.log('Autoplay blocked or play interrupted:', err));
      fadeTo(1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video) return;
      const duration = video.duration;
      const currentTime = video.currentTime;

      if (!duration || isNaN(duration)) return;

      // FADE_OUT_LEAD = 0.55 seconds
      const timeRemaining = duration - currentTime;
      if (!fadingOutRef.current && timeRemaining <= 0.55 && timeRemaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };

    const handleEnded = () => {
      if (!video) return;
      video.style.opacity = '0';
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch((err) => console.log('Play on loop failed:', err));
        fadingOutRef.current = false;
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If the video is already loaded or playing (e.g. from cache)
    if (video.readyState >= 3) {
      handleLoadedData();
    }

    return () => {
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current);
      }
      if (video) {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{
        ...style,
        transition: 'none', // Strict constraint: no CSS transitions on video opacity!
      }}
    />
  );
};

export default FadingVideo;
