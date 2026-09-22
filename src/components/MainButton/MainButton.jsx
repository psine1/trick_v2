import React from 'react';
import styles from './MainButton.module.css';
import SvgStrokeButton from '../SvgStrokeButton/SvgStrokeButton';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const MainButton = ({ textContent, buttonColor = "buttonRose1", linkUrl, onClick, targetOp, colorStroke= "#C63AF8", isShadow = true }) => {

  const isLink = Boolean(linkUrl);

  const shadowStrokeRef = useRef();
  const animationShadowRef = useRef();
  const animationRef = useRef();
  const buttonRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    if(isShadow){
      animationShadowRef.current = gsap.timeline({ paused: true })
      .to(shadowStrokeRef.current, {
        x: 5,
        y: 5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
   
    animationRef.current = gsap.timeline({ paused: true })
      .to(buttonRef.current, {
        scale: 1.025,
        duration: 0.3,
        ease: 'power2.out',
      });
    }, buttonRef);

    return () => {
      animationRef.current = null;
      animationShadowRef.current = null;
      ctx.revert();
    };
  }, [isShadow]);


  const handleMouseEnter = () => {
    animationRef.current?.play();
    if(isShadow){
      animationShadowRef.current?.play();
    }
  
  };

  const handleMouseLeave = () => {
    animationRef.current?.reverse();
    
    if(isShadow){
      animationShadowRef.current?.reverse();
    }
  };



  if (isLink) {
    return (
      <Link href={linkUrl} passHref target={targetOp}>
        <div ref={buttonRef} className='relative flex justify-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div ref={shadowStrokeRef} className={` absolute ${styles.wrapStroke}`}>
            <div className={`${styles.wrapStrokeHover}`}>
              <SvgStrokeButton colorStroke={colorStroke}/>
            </div>
          </div>

          <button type="button" className={`relative py-3 ${styles.mainButton} ${styles[buttonColor]}`}>
            {textContent}
          </button>

          <div className={`${styles.wrapStroke} absolute `}>
            <div className={`${styles.wrapStroke}`}>
              <SvgStrokeButton colorStroke={colorStroke} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div ref={buttonRef} className='relative flex justify-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div ref={shadowStrokeRef} className={` absolute ${styles.wrapStroke} ${styles.button} `}>
          <div className={`${styles.wrapStrokeHover}`}>
            <SvgStrokeButton colorStroke={colorStroke}/>
          </div>
        </div>
        <button type="button" className={`relative py-3 ${styles.mainButton} ${styles.button} ${styles[buttonColor]}`} onClick={onClick}
        >
          {textContent}
        </button>

        <div className={` absolute `} >
          <div className={`${styles.wrapStroke} ${styles.button} `}>
            <SvgStrokeButton colorStroke={colorStroke} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainButton;
