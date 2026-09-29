import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './LogoSlider.module.css';
import useInViewport from '@/hooks/useInViewport';

const images = [
  '/images/logos/logo1.png',
  '/images/logos/logo2.png',
  '/images/logos/logo3.png',
  '/images/logos/logo4.png',
  '/images/logos/logo5.png',
  '/images/logos/logo6.png',
  '/images/logos/logo7.png',
  '/images/logos/logo8.png',
  '/images/logos/logo9.png',
  '/images/logos/logo10.png',
  '/images/logos/logo11.png',
  '/images/logos/logo12.png',
  '/images/logos/logo13.png',
  '/images/logos/logo14.png',
  '/images/logos/logo15.png',
  '/images/logos/logo16.png',
  ];

const LogoSlider = () => {
  const containerRef = useRef(null);
  const isInViewport = useInViewport(containerRef);

  return (
    <div
      ref={containerRef}
      data-paused={!isInViewport}
      className={` ${styles.scrollContainer} relative grid h-32 w-full  overflow-x-hidden whitespace-nowrap border-b border-white`}
    >

    <div data-first className={`${styles.scroll} flex w-full justify-around items-center gap-16 whitespace-nowrap px-4`}>
  {images.map((src, index) => (
    <div key={index} className="h-16 w-28">
      <Image src={src} alt={`Image ${index + 1}`} width={150} height={150} />
    </div>
  ))}
</div>
     

    <div  className={`${styles.scroll} flex w-full justify-around items-center gap-16 whitespace-nowrap px-4`}>
        {images.map((src, index) => (
                  <div key={index} className={`h-16 w-28  self-center`}>
                    <Image src={src} alt={`Image ${index + 1}`} width={150} height={150} />
                  </div>
            
          ))}
      </div>
    

    <div data-last className={`${styles.scroll} flex w-full justify-around items-center gap-16 whitespace-nowrap px-4`}>
        {images.map((src, index) => (
                  <div key={index} className={`h-16 w-28  self-center`}>
                    <Image src={src} alt={`Image ${index + 1}`} width={150} height={150} />
                  </div>
            
          ))}
      </div>
  </div>
  );
};

export default LogoSlider;
