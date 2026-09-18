import React, { useRef, useEffect } from 'react';
import styles from './VideoIntro.module.css';

const VideoIntro = () => {
  const videoRef = useRef(null); 

  useEffect(() => {
    const videoElement = videoRef.current;

    videoElement.muted = true;
    videoElement.play();

    if (videoElement) {
      const handleSuspend = () => {
        console.log('Video is suspended. Show play button.');
      };

      const handlePlay = () => {
        console.log('Video is played. Remove play button UI.');
      };

      videoElement.addEventListener('suspend', handleSuspend); 
      videoElement.addEventListener('play', handlePlay);

      const handleBodyClick = () => {
        if (videoElement.currentTime > 0 && !videoElement.paused && !videoElement.ended && videoElement.readyState > 2) {
        } else {
          videoElement.play();
        }
      };

      document.body.addEventListener('click', handleBodyClick);
      document.body.addEventListener('touchstart', handleBodyClick);

      return () => {
        videoElement.removeEventListener('suspend', handleSuspend);
        videoElement.removeEventListener('play', handlePlay);
        document.body.removeEventListener('click', handleBodyClick);
        document.body.removeEventListener('touchstart', handleBodyClick);
      };
    }
  }, []); 

  return (
    <>
      <video
        ref={videoRef} 
        className={styles.video}
        controlsList="nodownload nofullscreen"
        autoPlay 
        muted
        loop
        preload="auto"
        playsInline
      >
        <source src={'/videos/header-03.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.videoGradient}></div>
    </>
  );
};

export default VideoIntro;