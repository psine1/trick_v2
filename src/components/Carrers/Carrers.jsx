import React, { useEffect, useRef, useState } from 'react';
import SectionName from '../SectionName/SectionName';
import MainButton from '../MainButton/MainButton';
import CarouselCarrers from '../CarouselCarrers/CarouselCarrers';
import styles from './Carrers.module.css';
import GalleryWorks2 from '../GalleryWorks2/GalleryWorks2';
import { pageData } from '@/app/data/data';
import CardAboutUs from '../CardAboutUs/CardAboutUs';
import gsap from 'gsap';

const Carrers = ({ section }) => {

  const { numSection, sectionName, title, paragraph, cta, linkUrl, cards, mobileCards } = pageData[section];
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef([]);
  const containerRef = useRef();
  
  useEffect(() => {
    /*setTimeout(() => {
      let ctx = gsap.context(() => {
        let tl = gsap.timeline({
          scrollTrigger: {
            start: isMobile ? "-=50%" : "-=30%",
            end: isMobile ? "50%" : "10%",
            trigger: containerRef.current,
            pin: false,
            smooth: isMobile ? 10 : 10,
            scrub: isMobile ? 1 : 2,
            markers: false,
            ease: "power1.out",
          },
        });

        tl
          .fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 })
          .fromTo(cardRefs.current[0], { x: -600, autoAlpha: 0, rotation: 45 }, { x: 0, autoAlpha: 1, transformOrigin: "0% 100%", rotation: 0 }, "<+0.2")
          .fromTo(cardRefs.current[1], { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
          .fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
          .fromTo(cardRefs.current[2], { x: -600, autoAlpha: 0, rotation: 45 }, { x: 0, autoAlpha: 1, transformOrigin: "0% 100%", rotation: 0 }, "<+0.2")
          .fromTo(cardRefs.current[3], { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
          .fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")

      }, containerRef);

      let ctx2 = gsap.context(() => {
        let tl = gsap.timeline({
          scrollTrigger: {
            start: "0%",
            end: "10%",
            trigger: containerRef.current,
            pin: false,
            smooth: 10,
            scrub: 2,
            markers: false,
            ease: "power1.out",
          },
        });

        tl
      }, containerRef);
      return () => {
        ctx.revert(); // cleanup! 
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    }, 0);*/
  }, []);

  useEffect(() => {

    setTimeout(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 900);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      console.log('isMobile', isMobile)
    }, [isMobile]);

  });

  return (
    <>
      <div ref={containerRef} className={`${styles.bgSections} w-auto relative`}>

        <section className=' w-full '>
          <GalleryWorks2 />

        </section>

        <section id={'careers'} className={`relative ${styles.wrapCarrers}  py-6 `}>

          <div className='flex flex-col justify-between	'>

            <div className='container mx-auto flex flex-col items-center justify-center px-4 md:px-9   gap-4'>
              <SectionName
                num={numSection}
                name={sectionName}
                color={"text-white"}
              />
              <div className='w-full gap-8'>
                <div className={`flex flex-col md:flex-row items-start md:gap-12 w-full md:w-full`}>
                  <div>
                    <h3 className={`title-600`}>
                      <span className={`text-white`}>Job </span>
                      <br />
                      <span className={`title-900 text-gradient1 `}>openings</span></h3>
                  </div>

                  <div className=' '>
                    <p className={` text-white max-w-xl pt-4 md:pt-0`}>
                      {paragraph}
                    </p>
                    <div className='inline-block py-6'>
                      <MainButton
                        buttonColor="buttonRose4"
                        textContent={cta}
                        targetOp={"_self"}

                        linkUrl={linkUrl}
                        colorStroke={'#FFF'} />
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/*
              <div className={`${styles.bgCard} container mx-auto relative  flex flex-wrap flex-col md:flex-row px-4 md:px-9 gap-4`}>
                {cards.length > 0 && mobileCards.length > 0 && (
                  <div className='relative  flex flex-wrap flex-col md:flex-row'>
                    {!isMobile ? cards.map((card, index) => (
                      <div
                        ref={(el) => (cardRefs.current[index] = el)}
                        className={card.classNameProp}
                        key={index}
                      >
                        <CardAboutUs
                          title={card.title}
                          content={card.content}
                          num={card.num}
                          imageSrc={card.imageSrc}
                          innerCardText={card.innerCardText}
                          cardNameRef={cardRefs.current[index]}
                        />
                      </div>
                    )) :
                      mobileCards.map((card, index) => (
                        <div
                          ref={(el) => (cardRefs.current[index] = el)}
                          className={card.classNameProp}
                          key={index}
                        >
                          <CardAboutUs
                            title={card.title}
                            content={card.content}
                            num={card.num}
                            imageSrc={card.imageSrc}
                            innerCardText={card.innerCardText}
                            cardNameRef={cardRefs.current[index]}
                          />
                        </div>
                      ))}

                  </div>
                )}

              </div>
            */}


            <div className='w-full py-4 draggable'>
              <CarouselCarrers />
            </div>



          </div>

        </section>

      </div>
    </>
  );
};

export default Carrers;