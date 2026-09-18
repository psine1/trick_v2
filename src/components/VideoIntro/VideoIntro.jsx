import React, { useRef, useEffect, useState } from 'react';
import styles from './VideoIntro.module.css';

const VideoIntro = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return undefined;
    }

    videoElement.muted = true;
    const playVideo = () => {
      videoElement.play().catch(() => {
        // iOS may require an explicit user gesture before playback.
      });
    };
    playVideo();

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handleSuspend = () => {
      console.log('Video is suspended. Show play button.');
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('suspend', handleSuspend);

    const handleBodyClick = () => {
      if (videoElement.paused || videoElement.ended) {
        playVideo();
      }
    };

    document.body.addEventListener('click', handleBodyClick);
    document.body.addEventListener('touchstart', handleBodyClick, { passive: true });

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('suspend', handleSuspend);
      document.body.removeEventListener('click', handleBodyClick);
      document.body.removeEventListener('touchstart', handleBodyClick);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
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
          <source src="/videos/header-03-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/header-03.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


      </div>

      <div className={styles.videoGradient}></div>
    </>
  );
};

export default VideoIntro;
