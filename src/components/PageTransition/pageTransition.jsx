import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PageTransition = ({ isTransitioning }) => {
  const transitionRef = useRef(null);

  useEffect(() => {
    const trans = transitionRef.current;
    const tl = gsap.timeline({ paused: true });

    if (trans) {
      tl.to(trans, {
        opacity: 1,
        duration: 0.1,
      })
      .to(trans, {
        scale: 1000,
        duration: 1,
      })
      .to(trans, {
        scale: 1,
        duration: 1,
        backgroundColor: '#276fbf',
      })
      .to(trans, {
        opacity: 0,
        duration: 0.1,
      });

      if (isTransitioning) {
        tl.play();
      }
    }
  }, [isTransitioning]);

  return (
    <div
      ref={transitionRef}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '5px',
        height: '5px',
        backgroundColor: '#ff6b35',
        opacity: 0,
        transform: 'scale(1)',
        zIndex: 9999,
        pointerEvents: 'none',
        transformOrigin: 'center',
        borderRadius: '50%',
        marginLeft: '-2.5px',  
        marginTop: '-2.5px',  
      }}
    />
  );
};

export default PageTransition;
