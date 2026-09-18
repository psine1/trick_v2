import styles from './OurValues.module.css';
import SectionName from '../SectionName/SectionName';
import CardAboutUs from '../CardAboutUs/CardAboutUs';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { pageData } from '@/app/data/data';
import { db } from '@/firebase/firebase';
import { getDocs, collection, query, where } from "firebase/firestore";

gsap.registerPlugin(ScrollTrigger);


const OurValues = () => {

    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef();
    const cardRefs = useRef([]);
    const sectionNameRef = useRef();
    const textSection = useRef();
    const [sectionData, setSectionData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryCollection = query(collection(db, "sections"), where("numSection", "==", "03"));
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


    useEffect(() => {

        setTimeout(() => {
            if(sectionData){
                let ctx = gsap.context(() => {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            start: isMobile ? "-=50%" : "-=70%",
                            end: isMobile ? "50%" : "20%",
                            trigger: containerRef.current,
                            pin: false,
                            smooth: isMobile ? 10 : 10,
                            scrub: isMobile ? 1 : 2,
                            markers: false,
                            ease: "power1.out",
                        },
                    });
    
                    if(isMobile){
                        tl
                        .fromTo(textSection.current, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "<")
                        .fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 })
                        .fromTo(cardRefs.current[0], { x: -600, autoAlpha: 0, rotation: 45 }, { x: 0, autoAlpha: 1, transformOrigin: "0% 100%", rotation: 0 }, "<+0.1")
                        .fromTo(cardRefs.current[1], { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
                        .fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
                        .fromTo(cardRefs.current[2], { x: -600, autoAlpha: 0, rotation: 45 }, { x: 0, autoAlpha: 1, transformOrigin: "0% 100%", rotation: 0 }, "<+0.2")
                        .fromTo(cardRefs.current[3], { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
                        .fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
                    }
                    else{
                        tl
                        .fromTo(textSection.current, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "<")
                        //.fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 })
                        .fromTo(cardRefs.current[1], { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.1")
                        .fromTo(cardRefs.current[0], { x: -600, autoAlpha: 0, rotation: 45 }, { x: 0, autoAlpha: 1, transformOrigin: "0% 100%", rotation: 0 }, "<+0.1")
                        .fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
                        .fromTo(cardRefs.current[3], { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
                        .fromTo(cardRefs.current[2], { x: -600, autoAlpha: 0, rotation: 45 }, { x: 0, autoAlpha: 1, transformOrigin: "0% 100%", rotation: 0 }, "<+0.2")
                        .fromTo("null", { x: 600, autoAlpha: 0, rotation: -45 }, { x: 0, autoAlpha: 1, transformOrigin: "100% 100%", rotation: 0 }, "<+0.2")
                    }
                   
    
                }, containerRef);
                let ctx2 = gsap.context(() => {
    
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            start: "0%",
                            end: "50%",
                            trigger: containerRef.current,
                            pin: false,
                            smooth: 10,
                            scrub: 2,
                            markers: false,
                            ease: "power1.out",
                        },
                    })

    
                }, containerRef);
                return () => {
                    ctx.revert(); // cleanup! 
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
                }
            }
        }, 0);

    }, [sectionData, isMobile]);

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
            <section ref={containerRef} id={'ourvalues'} className={`relative mx-auto flex min-h-full flex-col items-center justify-center px-4 md:px-9 py-9 gap-4  ${styles.bgOurValues}`}>
                <div className={`relative container`} >
                    <div className={`${styles.bkgLogo}`}></div>
                    <div className='w-full gap-8 '>
                        <div ref={textSection} className={`flex flex-col w-full md:w-1/2`}>
                            <h3 className={`title-900`}><span className={`text-gradient2`}>OUR </span> <br /> <span className={`title-600 text-black`}>VALUES</span></h3>
                            <p className='text-black max-w-xl py-6 md:py-9'>
                                {sectionData.paragraph}
                            </p>
                        </div>
                        <div className='relative  flex flex-wrap flex-col md:flex-row'>
                            {sectionData?.cards && sectionData.cards.length > 0 && sectionData.mobileCards.length > 0 && (
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

                </div>
            </section>
        </>
    );
};

export default OurValues;