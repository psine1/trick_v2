import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './FloatingParticles.module.css';

const imagePaths = [
  "/images/gelleryWorks/particle1.png",
  "/images/gelleryWorks/particle2.png",
];

const getRandomImage = () => imagePaths[Math.floor(Math.random() * imagePaths.length)];
let  particleRandom = gsap.utils.random(-100, 100, 20, true);

const generateRandomParticles = (count) => {
  return Array.from({ length: count }, () => ({
    size: Math.random() * 150 + 80, 
    left: Math.random() * 100, 
    top: Math.random() * 100, 
    duration: Math.random() * 7 + 2, 
    zIndex: Math.random() < 0.5 ? -1 : -11, 
    image: getRandomImage(), 
  }));
};

const Particle = ({ size, left, top, duration, zIndex, image, isActive }) => {
  const particleRef = useRef(null);
  const tweenRef = useRef(null);

  useLayoutEffect(() => {
    tweenRef.current = gsap.to(particleRef.current, {
      y: particleRandom, 
      x: particleRandom,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: duration,
      paused: true,
    });

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [duration]);

  useEffect(() => {
    if (isActive) {
      tweenRef.current?.play();
    } else {
      tweenRef.current?.pause();
    }
  }, [isActive]);

  return (
    <div
      ref={particleRef}
      className={styles.particle}
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        zIndex: zIndex, 
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

const FloatingParticles = ({ isActive = true }) => {
  const particles = useMemo(() => generateRandomParticles(8), []);

  return (
    <div className={styles.particlesContainer}>
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} isActive={isActive} />
      ))}
    </div>
  );
};

export default FloatingParticles;
