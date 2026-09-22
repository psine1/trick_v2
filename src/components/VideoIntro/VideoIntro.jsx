import React, { useRef, useEffect } from 'react';
import styles from './VideoIntro.module.css';
import useMediaQuery from '@/hooks/useMediaQuery';

const VideoIntro = () => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return undefined;
    }

    let isCancelled = false;
    videoElement.muted = true;
    videoElement.load();

    const removePlaybackFallback = () => {
      document.removeEventListener('pointerdown', playVideo);
    };

    const playVideo = async () => {
      try {
        await videoElement.play();
        removePlaybackFallback();
      } catch {
        if (!isCancelled) {
          // Muted autoplay is normally allowed. This is a one-time fallback for restrictive webviews.
          document.addEventListener('pointerdown', playVideo, { once: true, passive: true });
        }
      }
    };

    playVideo();

    return () => {
      isCancelled = true;
      removePlaybackFallback();
    };
  }, []);

  return (
    <>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          controlsList="nodownload nofullscreen"
          muted
          loop
          preload="auto"
          playsInline
          poster={isMobile ? '/videos/posterMob.jpg' : '/videos/poster.jpg'}
          autoPlay
        >
          <source src="/videos/header-03-mobile-2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


      </div>

      <div className={styles.videoGradient}></div>
    </>
  );
};

export default VideoIntro;
