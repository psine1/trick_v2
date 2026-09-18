import React, { useEffect, useRef } from 'react';
import styles from './GalleryWorks.module.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ImagesGallery from '../ImagesGallery/ImagesGallery';
import FloatingParticles from '../FloatingParticles/FloatingParticles';



gsap.registerPlugin(ScrollTrigger);

const images = [
  '/images/gelleryWorks/cliente-01.jpg',
  '/images/gelleryWorks/cliente-02.jpg',
  '/images/gelleryWorks/cliente-03.jpg',
  '/images/gelleryWorks/cliente-04.jpg',
  '/images/gelleryWorks/cliente-05.jpg',
  '/images/gelleryWorks/cliente-06.jpg',
  '/images/gelleryWorks/cliente-07.jpg',
];


const images2 = [
  '/images/gelleryWorks/cliente-09.jpg',
  '/images/gelleryWorks/cliente-10.jpg',
  '/images/gelleryWorks/cliente-11.jpg',
  '/images/gelleryWorks/cliente-12.jpg',
  '/images/gelleryWorks/cliente-13.jpg',
  '/images/gelleryWorks/cliente-14.jpg',
];


const GalleryWorks = (className) => {
  const containerRef = useRef();

  useEffect(() => {
  
    setTimeout(() => { 

    const panels = gsap.utils.toArray(`[data-element="elem2"]`);

    let ctx = gsap.context(() => {
    gsap.to(panels,{
      x: "-1200",
      ease: "power1.out",
      scrollTrigger: {        
        trigger: containerRef.current,
 
        pin: false,
        smooth: 1,
        scrub: 5,
        markers: true,
      },
    });

    }, containerRef); 
    return () => ctx.revert(); // cleanup! 

    }, 500);


    
  }, []);


 
  return (
    <>
    <div className={`relative  w-full h-full`}>


      <div ref={containerRef}  className={`relative flex overflow-hidden w-full h-full`}>
        <div  className={`${styles.wrapper} relative w-full h-full`}>
          <ImagesGallery
            dataElement={`[data-element="elem2"]`}
            images={images}
          />
        </div>
      </div>

{
      <div ref={containerRef}  className={`relative flex overflow-hidden w-full h-full `}>
        <div  className={`${styles.wrapper} relative w-full h-full `}>
          <ImagesGallery
            dataElement={`[data-element="elem2"]`}
            classNameProp={'-translate-x-2/4'}
            images={images2}
          />        
        </div>
      </div>

       }

      <FloatingParticles />
    </div>

    </>

  );
};



export default GalleryWorks;
