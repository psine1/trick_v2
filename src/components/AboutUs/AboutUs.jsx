import styles from './AboutUs.module.css';
import SectionName from '../SectionName/SectionName';
import CardAboutUs from '../CardAboutUs/CardAboutUs';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { pageData } from '@/app/data/data';
import { db } from '@/firebase/firebase';
import { getDocs, collection, query, where } from "firebase/firestore";

gsap.registerPlugin(ScrollTrigger);


const AboutUs = ({ section }) => {

  const [isMobile, setIsMobile] = useState(false);
  const { title, paragraph, num, sectionName, numSection, content, cards, classNameProp, mobileCards } = pageData[section];


  const containerRef = useRef();
  const cardRefs = useRef([]);
    const sectionNameRef = useRef(); 
  const textSection = useRef();
  const [sectionData, setSectionData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryCollection = query(collection(db, "sections"), where("numSection", "==", "02"));
        const querySnapshot = await getDocs(queryCollection);
        const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (itemsData.length > 0) {
          setSectionData(itemsData[0]);
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    fetchData();
  }, []);


  useLayoutEffect(() => {
      if (!sectionData.cards?.length || !sectionData.mobileCards?.length) {
        return undefined;
      }

      const isMobile = window.innerWidth < 768;
      const ctx = gsap.context(() => {
          const visibleCards = cardRefs.current.filter(Boolean);

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
            .fromTo(sectionNameRef.current, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "<")
            .fromTo(textSection.current, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "<+0.2");

          visibleCards.forEach((card, index) => {
            tl.fromTo(
              card,
              { x: index % 2 === 0 ? -600 : 600, autoAlpha: 0, rotation: index % 2 === 0 ? 45 : -45 },
              { x: 0, autoAlpha: 1, transformOrigin: index % 2 === 0 ? "0% 100%" : "100% 100%", rotation: 0 },
              "<+0.2"
            );
          });

        }, containerRef);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh, { once: true });
      requestAnimationFrame(refresh);
      return () => {
        window.removeEventListener('load', refresh);
        ctx.revert();
      };
  }, [sectionData]);

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


    console.log('isMobile', isMobile)

  });


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