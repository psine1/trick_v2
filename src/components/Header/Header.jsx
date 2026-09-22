import React, { useLayoutEffect, useRef } from 'react';
import styles from './Header.module.css';
import VideoIntro from '../VideoIntro/VideoIntro';
import MainButton from '../MainButton/MainButton';

import gsap from 'gsap';

const Header = () => {
  const headerRef = useRef();
  const innerHeaderRef = useRef();

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const btnRef = useRef(null);
  const gradientRef = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add(
        {
          isMobile: '(max-width: 767px)',
          isDesktop: '(min-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        ({ conditions }) => {
          const { isMobile, reduceMotion } = conditions;
          const animatedElements = [
            innerHeaderRef.current,
            text1Ref.current,
            text2Ref.current,
            text3Ref.current,
            btnRef.current,
          ].filter(Boolean);

          if (reduceMotion) {
            gsap.set(animatedElements, {
              x: 0,
              y: 0,
              rotation: 0,
              autoAlpha: 1,
              clearProps: 'transform',
            });
            return;
          }

          gsap.set(innerHeaderRef.current, { scale: 1, autoAlpha: 0, rotation: 0 });
          gsap.set(text1Ref.current, { x: isMobile ? 140 : 500, autoAlpha: 0 });
          gsap.set(text2Ref.current, { y: isMobile ? 140 : 500, autoAlpha: 0 });
          gsap.set(text3Ref.current, { y: isMobile ? 140 : 500, autoAlpha: 0 });
          gsap.set(btnRef.current, { x: isMobile ? -60 : -100, autoAlpha: 0 });

          gsap.timeline({
            defaults: { duration: 0.75, ease: 'power2.out' },
          })
            .to(innerHeaderRef.current, { scale: 1, rotation: 0, autoAlpha: 1 }, 0)
            .to(text1Ref.current, { x: 0, autoAlpha: 1 }, 0.75)
            .to(text2Ref.current, { y: 0, autoAlpha: 1 }, 0.95)
            .to(text3Ref.current, { y: 0, autoAlpha: 1 }, 1.15)
            .to(btnRef.current, { x: 0, autoAlpha: 1 }, 1.9);
        },
      );
    }, headerRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);


  return (
    <>
       

    <header ref={headerRef} id="header" className={`  flex justify-center h-5/6 items-center relative py-0 md:py-2 `}>
          <div ref={innerHeaderRef} className={` ${styles.header} relative`}>
            
            <div className={`${styles.bgHeader}`}></div>
            <div ref={gradientRef} className={`${styles.gradientHeader}`}></div>
            <div className={`${styles.wrapHeader} justify-center mx-auto content-center px-1`}>

              <div className=' gap-2 flex '>
                  <div className={ ` w-full mx-auto `}>          
                    <div className={ `${styles.clipped} items-end	`}>  
                        <div className='flex relative overflow-hidden flex-col md:flex-row  content-between pb-24 md:py-8 md:p-8 w-full justify-between '>
                            <div className={`self-center md:self-start text-center md:text-left`}>
                              <p ref={text1Ref} className={`${styles.textHeader}`}>WE GREW UP <br />PLAYING VIDEOGAMES</p>
                              <h1 ref={text2Ref} className={`${styles.titleHeaderTop}`}><span className={`text-white`}>NOW WE</span></h1>
                              <h1 ref={text3Ref} className={`${styles.titleHeaderBottom}`}>MAKE THEM</h1>
                            </div>
                            <div ref={btnRef} className='self-center md:self-end px-14 pt-6 md:pt-0'>
                              <MainButton 
                                  textContent={`GET STARTED`}
                                  buttonColor= "buttonRose4"
                                  linkUrl={"#services"}
                                  targetOp={"_self"}
                                  className={`p-8`}
                                  colorStroke={'#FFF'}/>                        
                            </div>
                        </div> 
                      <VideoIntro />
                    </div>
                  </div>
              </div> 

            </div>
          </div>
    </header>
    </>
  );
};

export default Header;
