import React from 'react';
import styles from './Header.module.css';
import VideoIntro from '../VideoIntro/VideoIntro';
import MainButton from '../MainButton/MainButton';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';


const Header = ({  }) => {


  
  const headerRef = useRef(); 
  const innerHeaderRef = useRef(); 

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const btnRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {

  
    let ctx = gsap.context(() => {

      gsap.set(innerHeaderRef.current, {scale: 1, autoAlpha: 0, rotation: 0})
      gsap.set(text1Ref.current, {x: 500, autoAlpha: 0})
      gsap.set(text2Ref.current, {y: 500, autoAlpha: 0})
      gsap.set(text3Ref.current, {y: 500, autoAlpha: 0})
      gsap.set(btnRef.current, {x:-100, autoAlpha: 0})

      let tl = gsap.timeline({});
    
      tl
      .to(innerHeaderRef.current, 0.75, { scale:1, rotation: 0, autoAlpha: 1, ease: "power2.out"}, "<")
      .to(text1Ref.current, 0.75, { x: 0, autoAlpha: 1, ease: "power2.out"}, ">")
      .to(text2Ref.current, 0.75, { y: 0, autoAlpha: 1, ease: "power2.out"}, "<+0.2")
      .to(text3Ref.current, 0.75, { y: 0, autoAlpha: 1, ease: "power2.out"}, "<+0.2")
      .to(btnRef.current, 0.75, { x: 0, autoAlpha: 1, ease: "power2.out"}, ">")





    }, headerRef); 

    return () => {
      ctx.revert(); // cleanup! 

    } 
  
  
        
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