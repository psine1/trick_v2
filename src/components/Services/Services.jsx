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
      const media = gsap.matchMedia();
      const ctx = gsap.context(() => {
        media.add(
          {
            isMobile: '(max-width: 767px)',
            reduceMotion: '(prefers-reduced-motion: reduce)',
          },
          ({ conditions }) => {
            const { isMobile, reduceMotion } = conditions;
            const cardsToAnimate = cardRefs.current.filter(Boolean);
            const animatedElements = [sectionNameRef.current, textSection.current, ...cardsToAnimate];

            if (reduceMotion) {
              gsap.set(animatedElements, { x: 0, y: 0, rotation: 0, autoAlpha: 1 });
              return;
            }

            const timeline = gsap.timeline({
              defaults: { ease: 'power1.out' },
              scrollTrigger: {
                trigger: containerRef.current,
                start: isMobile ? 'top 88%' : 'top 78%',
                end: isMobile ? 'top 48%' : 'top 38%',
                scrub: isMobile ? 0.35 : 0.8,
                fastScrollEnd: true,
                invalidateOnRefresh: true,
              },
            });

            timeline
              .fromTo(sectionNameRef.current, { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
              .fromTo(textSection.current, { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, '<+0.12');

            cardsToAnimate.forEach((card, index) => {
              const direction = index % 2 === 0 ? -1 : 1;
              timeline.fromTo(
                card,
                { x: direction * (isMobile ? 120 : 600), autoAlpha: 0, rotation: 0 },
                {
                  x: 0,
                  autoAlpha: 1,
                  rotation: 0,
                  transformOrigin: direction < 0 ? '0% 100%' : '100% 100%',
                },
                '<+0.08',
              );
            });
          },
        );
      }, containerRef);

      return () => {
        media.revert();
        ctx.revert();
      };
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
