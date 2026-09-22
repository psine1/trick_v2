import React from 'react';
import styles from './CardServices2.module.css';
import Image from 'next/image';
import SvgStrokeCard from '../SvgStrokeCard/SvgStrokeCard';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const CardServices2 = ({title, content, imageSrc, innerCardText}) => {

  const [showHiddenElements, setShowHiddenElements] = useState(false);
  const imageRef = useRef(null);

  const animationRef = useRef(null);
  const cardNameRef = useRef(null);

  const shadowStrokeRef = useRef();
  const animationShadowRef = useRef();

  const clickedCard = useRef();
  const buttonRef = useRef();
  const buttonRef1 = useRef();
  const buttonColorRef = useRef();

  const text1 = useRef();
  const text2 = useRef();

  

  
  const handleClick = () => {
    setShowHiddenElements(!showHiddenElements);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    animationShadowRef.current = gsap.timeline({ paused: true })
    .to(shadowStrokeRef.current, {
      x: 10,
      y: 15,
      duration: 0.3,
      ease: 'power2.out',
    })


    animationRef.current = gsap.timeline({ paused: true })
      .to(cardNameRef.current, {
        scale: 1.025,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(buttonColorRef.current, {
        scale: 1.15,
        backgroundColor: "#e8e8e8",
        duration: 0.3,
        ease: 'power2.out',
      }, "<")
 


    gsap.set([clickedCard.current, text1.current, text2.current], { autoAlpha: 0 });
    }, cardNameRef);

    return () => {
      animationRef.current = null;
      animationShadowRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline();
    if (showHiddenElements) {      
      timeline
      //.to(shadowStrokeRef.current, {x: 10,y: 15,duration: 0.3,ease: 'power2.out',})
      .to(clickedCard.current, { autoAlpha: 1, duration: 0.75, ease: "power3.inOut" })
      .to(buttonRef.current, { rotation: 45, duration: 0.75, ease: "power3.inOut" }, "<")
      .to(buttonRef1.current, { rotation: 45, fill:"#FFFFFF", duration: 0.75, ease: "power3.inOut" }, "<")
      .fromTo(text2.current, {autoAlpha: 0, x: -100, scale: 1}, { autoAlpha: 1, x: 0, scale: 1, duration: 2, rotation: 0.01, transformOrigin: "50% 50%", ease: "power3.inOut" }, '<')
      .fromTo(text1.current, {autoAlpha: 0, y: 50}, { autoAlpha: 1, y: 0,  duration: 0.75, ease: "power3.inOut" }, '<+0.2')

      

    } else {
      timeline
      //.to(shadowStrokeRef.current, {x: 0,y: 0,duration: 0,ease: 'power2.out',})
      .to(clickedCard.current, {autoAlpha: 0, duration: 0.75, ease: "power3.inOut" })
      .to(buttonRef.current, { rotation: 0, duration: 0.75, ease: "power3.inOut" }, "<")
      .to(buttonRef1.current, { rotation: 0, fill:"transparent", duration: 0.75, ease: "power3.inOut" }, "<")
      .to(text1.current, { autoAlpha: 0, y: 0,  duration: 0.75, ease: "power3.inOut" }, '<')
      .to(text2.current, { autoAlpha: 0, x: 0, duration: 0.75, ease: "power3.inOut" }, '<')
    }

    return () => timeline.kill();
  }, [showHiddenElements]);



  const handleMouseEnter = () => {
    animationRef.current?.play();
    animationShadowRef.current?.play();
  };

  const handleMouseLeave = () => {
    animationRef.current?.reverse();
    animationShadowRef.current?.reverse();
  };

  


  return (
    <>

    <div ref={cardNameRef} className='relative w-full h-full cursor-pointer	' onClick={() => { handleClick();handleMouseLeave();}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

        <div className={` flex rounded-lg  flex-col justify-between  `} >

            <div ref={shadowStrokeRef} className={` absolute ${styles.wrapStroke}  `}>
              <div className={`${styles.wrapStrokeHover}`}>
                <SvgStrokeCard  />
              </div>
          </div>  

          <div className={`flex ${styles.wrapCard} bg-white ${styles.wrapStroke}`}>            

              <div className="w-2/3 flex flex-col p-8 justify-around">
                <div>
                  <h2 className={`mb-2 ${styles.titleCard}` }>{title}</h2>
                  <p className={`mb-4 ${styles.textCard}`}>{content}</p>
                </div>
                
                <div className='justify-self-end'>
                  <button type="button" ref={buttonColorRef} className="p-2 rounded-lg border border-black-400 text-black-400 hover:text-black-500 hover:border-black-500 mt-4">
                    <svg ref={buttonRef} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>

              </div>

              <div className="w-1/3 py-6">
                <div>
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

          <div ref={clickedCard} className={`absolute w-full h-full ${styles.bgCard} ${styles.wrapStroke}`}>

                <div className="w-full h-full flex flex-col p-6 justify-between">
                  <div>              
                    <p ref={text1} className={`mb-4 ${styles.titleCardOpen} text-white`}>{innerCardText}</p>
                  </div>
                  
                  <div className='justify-self-end flex items-center justify-between'>    
                    <div>          
                    <button type="button" className="p-2 rounded-lg bg-white border border-black-400 text-black-400 hover:text-black-500 hover:border-gray-500 mt-4">
                      <svg ref={buttonRef1} className="w-6 h-6" fill="#FFFFFF" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                    </div>      
                    <h2 ref={text2} className={`pt-8 mb-0 ${styles.footerTitle}` }>{title}</h2>
                  </div>

                </div>

          </div>

          <div className={` absolute ${styles.wrapStroke}  `}>
              <div className={`${styles.wrapStroke}`}>
                <SvgStrokeCard  />
                </div>
            </div>

        </div>
  </div>
  
    </>
  );
};

export default CardServices2;
