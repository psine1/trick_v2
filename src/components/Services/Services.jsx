import styles from './Services.module.css';
import CardServices2 from '../CardServices2/CardServices2';
import SectionName from '../SectionName/SectionName';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { pageData } from '@/app/data/data';
import GradientAnim from '../GradientAnim/GradientAnim';

gsap.registerPlugin(ScrollTrigger);


const Services = ({section }) => {

  const { title, paragraph, sectionName, numSection, content, cards } = pageData[section];


  const containerRef = useRef();

  const cardRefs = useRef([]);
  const sectionNameRef = useRef();
  const textSection = useRef();


  useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        let tl = gsap.timeline({ 
          scrollTrigger: {
            start: "-=100%",
            end: "20%",
            trigger: containerRef.current,
            pin: false,
            smooth: 10,
            scrub: 2,
            markers: false,
            ease: "power1.out",
          },
        });
      
        tl
        .fromTo(sectionNameRef.current, {y: 100, autoAlpha: 0}, { y: 0, autoAlpha: 1, ease: "power1.out"}, "<")
        .fromTo(textSection.current, {y: 50, autoAlpha: 0}, { y: 0, autoAlpha: 1, ease: "power1.out"}, "<+0.2")
        .fromTo(cardRefs.current[1], {x: 800, autoAlpha: 0, rotation: 0}, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0, ease: "power1.out"}, "<")
        .fromTo(cardRefs.current[0], {x: -800, autoAlpha: 0, rotation: 0}, { x: 0, autoAlpha: 1, transformOrigin: "0% 100%", rotation: 0, ease: "power1.out"}, "<")

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    }, []);
    

  return (
    <>
    <section ref={containerRef} id={"services"} className={`services ${styles.section} w-full relative`}>
    <GradientAnim/>

      <div className='relative container mx-auto flex  flex-col items-center justify-center gap-4 px-4 md:px-9 py-24'>

            <SectionName ref={sectionNameRef}
              num={numSection}
              name={sectionName}
            />

            <div ref={textSection} className={`w-full flex flex-col`}>            
              <h3 className={`title-300 text-white`}>full <span className={`title-600 text-white`}>service</span> <br/>
               <span className={` title-900 text-violet`}>game development</span>
              </h3>
              <p className={` text-white max-w-xl  py-6 md:py-9 ${styles.description}`}>{paragraph}</p>
            </div>



              {cards.length > 0 && (
              <div className='relative w-full flex flex-col md:flex-row gap-8 '>   
                    {cards.map((card, index) => (
                        <div
                          ref={(el) => (cardRefs.current[index] = el)}
                          className="w-full md:w-1/2"
                          key={index}
                        >
                          <CardServices2
                            title={card.title}
                            content={card.content}
                            imageSrc={card.imageSrc}
                            innerCardText={card.innerCardText}
                            cardNameRef={cardRefs.current[index]}
                          />
                        </div>
                      ))}


                      
                  </div>
                )}

      </div>
    </section>
    </>
  );
};

export default Services;