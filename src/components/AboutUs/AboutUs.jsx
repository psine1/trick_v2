import styles from './AboutUs.module.css';
import SectionName from '../SectionName/SectionName';
import CardAboutUs from '../CardAboutUs/CardAboutUs';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { pageData } from '@/app/data/data';
import { db } from '@/firebase/firebase';
import { getDocs, collection, query, where } from "firebase/firestore";
import useMediaQuery from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);


const AboutUs = ({ section }) => {

  const isMobile = useMediaQuery('(max-width: 900px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { paragraph, sectionName, numSection } = pageData[section];


  const containerRef = useRef();
  const cardRefs = useRef([]);
    const sectionNameRef = useRef(); 
  const textSection = useRef();
  const [sectionData, setSectionData] = useState({});

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const queryCollection = query(collection(db, "sections"), where("numSection", "==", "02"));
        const querySnapshot = await getDocs(queryCollection);
        const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (!isCancelled && itemsData.length > 0) {
          setSectionData(itemsData[0]);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching documents: ", error);
        }
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add(
        {
          isSmallViewport: '(max-width: 767px)',
          isDesktop: '(min-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        ({ conditions }) => {
          const { isSmallViewport, reduceMotion } = conditions;
          const animatedElements = [sectionNameRef.current, textSection.current].filter(Boolean);

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

          gsap.timeline({
            defaults: { ease: 'power1.out' },
            scrollTrigger: {
              trigger: containerRef.current,
              start: isSmallViewport ? 'top 88%' : 'top 78%',
              end: isSmallViewport ? 'top 58%' : 'top 45%',
              scrub: isSmallViewport ? 1 : 1.5,
              invalidateOnRefresh: true,
            },
          })
            .fromTo(sectionNameRef.current, { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
            .fromTo(textSection.current, { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, '<+0.12');
        },
      );
    }, containerRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const visibleCards = cardRefs.current.filter(Boolean);
    if (visibleCards.length === 0) {
      return undefined;
    }

    if (prefersReducedMotion) {
      gsap.set(visibleCards, {
        x: 0,
        y: 0,
        rotation: 0,
        autoAlpha: 1,
        clearProps: 'transform',
      });
      return () => gsap.killTweensOf(visibleCards);
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power1.out' },
        scrollTrigger: {
          trigger: visibleCards[0],
          start: 'top 92%',
          end: 'top 48%',
          scrub: isMobile ? 1 : 1.5,
          invalidateOnRefresh: true,
        },
      });

      visibleCards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        timeline.fromTo(
          card,
          {
            x: direction * (isMobile ? 240 : 600),
            autoAlpha: 0,
            rotation: direction * (isMobile ? 15 : 45),
          },
          {
            x: 0,
            autoAlpha: 1,
            rotation: 0,
            transformOrigin: direction < 0 ? '0% 100%' : '100% 100%',
          },
          index === 0 ? 0 : '<+0.08',
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion, sectionData.cards, sectionData.mobileCards]);


  return (
    <>
      <section ref={containerRef} id={'about'} className={`relative container mx-auto flex ${styles.section} flex-col items-center justify-center px-4 md:px-9 py-24 gap-4 ${styles.bgServices}`}>

        <div className={`${styles.bkgLogo}`}></div>

        <SectionName ref={sectionNameRef}
          num={numSection}
          name={sectionName}
          color={"text-black"}
        />

        <div className='w-full gap-8 '>

          <div ref={textSection} className={`flex flex-col w-full md:w-1/2`}>
            <h3 className={`title-900`}><span className='title-600 text-black' >WE ARE </span> <br /> <span className={`text-gradient1`}>TRICK</span></h3>
            <p className='text-black max-w-xl py-6 md:py-9'>
              {paragraph}
            </p>
          </div>


          <div className='relative  flex flex-wrap flex-col md:flex-row'>


            {sectionData.cards?.length > 0 && sectionData.mobileCards?.length > 0 && (
              <div className='relative  flex flex-wrap flex-col md:flex-row'>
                {!isMobile ? sectionData.cards.map((card, index) => (
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
                  sectionData.mobileCards.map((card, index) => (
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
        </div>



      </section>
    </>
  );
};

export default AboutUs;
