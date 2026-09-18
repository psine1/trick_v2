import React from 'react';
import styles from './CardServices.module.css';
import Image from 'next/image';
import SvgStrokeCard from '../SvgStrokeCard/SvgStrokeCard';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CardServices = ({title, content, imageSrc, innerCardText}) => {

  const [showHiddenElements, setShowHiddenElements] = useState(false);
  const hiddenRef = useRef(null);
  const visibleRef = useRef(null);
  const hexagonRef = useRef(null);
  const imageRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const moreRef = useRef(null);
  const closeCardRef = useRef(null);

  const animationRef = useRef(null);
  const cardRef = useRef(null);

    const shadowStrokeRef = useRef();
  const animationShadowRef = useRef();

  const handleClick = () => {
    setShowHiddenElements(!showHiddenElements);
  };

  useEffect(() => {

    animationShadowRef.current = gsap.timeline({ paused: true })
    .to(shadowStrokeRef.current, {
      x: 10,
      y: 15,
      duration: 0.3,
      ease: 'power2.out',
    })


    animationRef.current = gsap.timeline({ paused: true })
      .to(cardRef.current, {
        scale: 1.025,
        duration: 0.3,
        ease: 'power2.out',
      })
 


    let tl_ = gsap.timeline();
    if (showHiddenElements) {      
      tl_
      .to(hiddenRef.current, { autoAlpha: 0, display:"none", duration: 0.5, ease: "power3.inOut" })
      .to(moreRef.current, { autoAlpha: 0, display:"none", duration: 0.5, ease: "power3.inOut" }, "<")
      .to(hexagonRef.current, {scale: 2.5, transformOrigin: "100% 50%", duration: 0.5, ease: "power3.inOut"}, "<0.5")
      .to(imageRef.current, {x: 100, autoAlpha: 0, scale: 1.35, duration: 0.35, ease: "power3.inOut"}, "<+0.2")
      .to(rightRef.current, {
        duration: 0.01,
        className: 'w-1/12', 
        onComplete: () => {
          gsap.set(rightRef.current, { clearProps: 'w-1/12' });
        }
      })
      .to(closeCardRef.current, {
        duration: 0.01,
        className: `${styles.footerCard} w-full flex justify-between`, 
        onComplete: () => {
          gsap.set(closeCardRef.current, { clearProps: `${styles.footerCard} w-full flex justify-between` });
        }
      })
      .to(visibleRef.current, { autoAlpha: 1, display:"block", zIndex : "99999", duration: 0.5, ease: "power3.inOut"},">")

    } else {
      tl_
      .to(visibleRef.current, {autoAlpha: 0, display:"none", duration: 0.5, ease: "power3.inOut" })
      .to(rightRef.current, {
        duration: 0.01,
        className: 'w-4/12', 
        onComplete: () => {
          gsap.set(rightRef.current, { clearProps: 'w-4/12' });
        }
      })
      .to(closeCardRef.current, {
        duration: 0.01,
        className: `${styles.footerCard} w-6/12 flex justify-between`, 
        onComplete: () => {
          gsap.set(closeCardRef.current, { clearProps: `${styles.footerCard} w-6/12 flex justify-between` });
        }
      })
      .to(hexagonRef.current, {scale: 1, transformOrigin: "100% 50%", duration: 0.5, ease: "power3.out"}, "<0.5")
      .to(imageRef.current, {x: 0, autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out"}, "<+0.2")
      .to(hiddenRef.current, { autoAlpha: 1, display:"block", duration: 0.5, ease: "power3.inOut" }, "<+0.5")
      .to(moreRef.current, { autoAlpha: 1, display:"block", duration: 0.5, ease: "power3.inOut" }, "<")

    }
  }, [showHiddenElements]);



  const handleMouseEnter = () => {
    animationRef.current.play();
    animationShadowRef.current.play();
  };

  const handleMouseLeave = () => {
    animationRef.current.reverse();
    animationShadowRef.current.reverse();
  };

  


  return (
    <>
    <div ref={cardRef} className='relative' onClick={() => { handleClick(); handleMouseLeave();}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

    <div ref={shadowStrokeRef} className={` absolute ${styles.wrapStroke}  `}>
        <div className={`${styles.wrapStrokeHover}`}>
          <SvgStrokeCard  />
          </div>
      </div>  
      <div className={` relative ${styles.wrapCard}`}>
          <div className={`  ${styles.card} flex w-full h-56 sm:h-56 md:h-56 lg:h-64 xl:h-72 2xl:h-80 `}>
                  <div ref={leftRef} className={`${styles.content} w-6/12 h-full`} >
                      <div ref={hiddenRef} className="block">
                          <h1   className={`${styles.titleCard} pr-5 py-4 block`}>{title}</h1>
                          <p className={`${styles.textCard} pr-5`}>{content}</p>
                      </div>
                      <div ref={visibleRef} className="block h-full">
                        <div className='h-full flex flex-col justify-between'>                        
                              <p className={`${styles.textCard} text-white pr-5 py-4 ${styles.clickedText}`} >
                                {innerCardText}                              
                              </p>

                              <div ref={closeCardRef} className={`${styles.footerCard} w-6/12 flex justify-between`}>
                                  <button  className="text-blue-500">
                                    <Image
                                      className='' 
                                      src="/images/closeCard.svg"
                                      alt="card-image"
                                      width={36}    
                                      height={36}             
                                    />
                                  </button>
                                  <h3 className={`${styles.titleInner}`}>{title}</h3>
                              </div>
                          </div>

                      </div>

                      <div ref={moreRef} className={`${styles.footerCard} w-6/12`}>
                      <button  className="text-blue-500">
                        <Image
                          className='' 
                          src="/images/more.svg"
                          alt="card-image"
                          width={36}    
                          height={36}             
                        />
                      </button>
                      </div>
                  </div>

                    <div ref={rightRef} className={`${styles.imgRight} w-4/12 h-full`}>             
                    </div>

                    <div  className={`${styles.wrapImage}`}>
                        <Image
                            ref={hexagonRef}
                            className={`${styles.imgCard}`}
                                src="/images/hexagonBg.svg"
                                alt="hexagonBg-image"
                                width={305}
                                height={305}                        
                        />
                        <Image
                                ref={imageRef}
                                className={`${styles.characterImg}`}
                                src={imageSrc}
                                alt="hexagonBg-image"
                                width={448}
                                height={568}
                        />                        
                    </div>                               
          </div>
      </div>

      <div className={` absolute ${styles.wrapStroke}  `}>
        <div className={`${styles.wrapStroke}`}>
          <SvgStrokeCard  />
          </div>
      </div>

    
      
    </div>
  
    </>
  );
};

export default CardServices;