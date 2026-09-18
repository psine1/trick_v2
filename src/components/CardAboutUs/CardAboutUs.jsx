import styles from './CardAboutUs.module.css';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import React, { forwardRef } from 'react';
import SvgStrokeCardAboutUs from '../SvgStrokeCardAboutUs/SvgStrokeCardAboutUs';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const CardAboutUs = forwardRef(({ num, title, content, imageSrc, classNameProp }, ref) => {


  const cardRef = useRef(null);
  const animationRef = useRef(null);
  const bgCardRef = useRef(null);
  const oldImgRef = useRef(null);
  const wrapBgCardRef = useRef(null);
  const shadowStrokeRef = useRef();
  const animationShadowRef = useRef();
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {


    animationShadowRef.current = gsap.timeline({ paused: true })
      .to(shadowStrokeRef.current, {
        x: 10,
        y: 5,
        duration: 0.3,
        ease: 'power2.out',
      })



    gsap.set(bgCardRef.current, { autoAlpha: 0 })

    animationRef.current = gsap.timeline({ paused: true })
      .to(cardRef.current, {
        scale: 1.025,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(bgCardRef.current, {
        autoAlpha: 1,
        scale: 1.15,
        duration: 0.3,
        ease: 'power2.out',
      }, "<")
      .to(wrapBgCardRef.current, {
        autoAlpha: 1,
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      }, "<")


  }, []);

  const handleMouseEnter = () => {
    if(animationRef.current){
      animationRef.current.play();
      animationShadowRef.current.play();
    }
    
  };

  const handleMouseLeave = () => {
    animationRef.current.reverse();
    animationShadowRef.current.reverse();
  };


  const handleTap = () => {
    const isHovered = cardRef.current.classList.contains('hovered');
    isHovered ? animationRef.current.reverse() : animationRef.current.play();
    cardRef.current.classList.toggle('hovered');
  };

  return (
    <>


      <div ref={ref} className={`${classNameProp} relative `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTap}
      >

        <div ref={cardRef} className='relative'>

          <div ref={shadowStrokeRef} className={` absolute ${styles.wrapStroke}  `}>
            <div className={`${styles.wrapStrokeHover}`}>
              <SvgStrokeCardAboutUs />
            </div>
          </div>


          <div className={`relative ${styles.wrapCard}`}>

            <div className={`${styles.card} relative flex w-full min-h-56	sm:min-h-60 md:min-h-64 lg:min-h-72 xl:min-h-80 2xl:min-h-96 `}>

              <div className={`${styles.content} relative w-10/12 min-h-full flex `} >
                <div ref={wrapBgCardRef} className={`${styles.wrapBgCard} absolute flex justify-center w-full h-full`}>
                  <Image ref={bgCardRef}
                    className={`w-full h-full`}
                    src={imageSrc}
                    alt="card-image"
                    layout="fill"
                  />
                </div>

                <h1 className={`${styles.titleCard} pr-5 `}>{num}<sup className={`${styles.sign}`}>+</sup></h1>

                <div ref={footerRef} className={`${styles.footerCard} block w-full`}>
                  <h3 className={`text-white nerisSemiBold pb-2`}>
                    {title}
                  </h3>
                  <p ref={contentRef} className={`self-center justify-center pb-2 text-white nerisLight`}>{content}</p>
                </div>
              </div>

              <div ref={oldImgRef} className={`${styles.imgRight} flex justify-center items-start w-2/12 h-full`}>
                <Image
                  className={`pt-8 w-2/4`}
                  src="/images/iconCard.svg"
                  alt="card-image"
                  width={53}
                  height={53}
                />
              </div>

            </div>
          </div>

        </div>

      </div>



    </>
  );
});

CardAboutUs.displayName = 'CardAboutUs';


export default CardAboutUs;