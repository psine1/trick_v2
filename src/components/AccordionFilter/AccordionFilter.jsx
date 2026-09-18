import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './AccordionFilter.module.css';
import SvgStrokeCardAboutUs from '../SvgStrokeCardAboutUs/SvgStrokeCardAboutUs';

const AccordionFilter = ({ selectItem, isOpen, toggleAccordion, items, }) => {
    const contentRef = useRef(null);
    const openOloseRef = useRef(null);
    const rowRef = useRef(null);
    const animationRowRef = useRef(null);


    useEffect(() => {
        const contentElement = contentRef.current;

        if (isOpen) {
            gsap.to(contentElement, {
                height: contentElement.scrollHeight,
                duration: 0.5,
                ease: 'power2.inOut',
            });
            gsap.to(openOloseRef.current, { rotation: 180, duration: 0.75, ease: "power3.inOut" }, "<")

        } else {
            gsap.to(contentElement, {
                height: 0,
                duration: 0.5,
                ease: 'power2.inOut',
            });
            gsap.to(openOloseRef.current, { rotation: 0, duration: 0.75, ease: "power3.inOut" }, "<")

        }
    }, [isOpen]);


    const handleRowMouseEnter = () => {
        animationRowRef.current.play();
    };

    const handleRowMouseLeave = () => {
        animationRowRef.current.reverse();
    };


    return (
        <div className={`relative justify-end ${styles.shadow} ${styles.scrollDown}`} >
            <div className={`${!isOpen ? styles.accordionShadow : styles.accordionShadowExpand} absolute`}>
                <div className={`${!isOpen ? styles.accordionShadowBorder : styles.accordionShadowBorderExpand}`}>
                    <SvgStrokeCardAboutUs />
                </div>  
            </div>
            <div ref={rowRef} className={`${!isOpen ? styles.accordion : styles.accordionExpand} row1`} >
              
                <div className='container mx-auto px-5 md:px-5  md:py-5'>
                    <div className='flex justify-between items-center  md:items-center' onClick={() => toggleAccordion(!isOpen)}>
                        <div className='flex flex-col md:flex-row  md:justify-start gap-2 md:gap-8 px-2 space-y-1 sm:px-3'>
                            <button className={`${styles.accordionFiltersHeader} px-2 space-y-1 sm:px-3`} onClick={() => toggleAccordion(!isOpen)}>
                                <h3 className='text-left space-y-1'>{selectItem}</h3>
                            </button>
                        </div>
                        <div class="flex justify-between items-center md:items-center">
                            <div class={`rounded-lg text-black-400 hover:text-black-500 hover:border-gray-500`}>
                                <div class={`rounded-lg ${styles.accordionFiltersCant}`}>
                                    <span className={`${styles.accordionFiltersSpan}`}>{items.length}</span>
                                </div>

                            </div>
                            <button className="p-2 rounded-lg text-black-400 hover:text-black-500 hover:border-gray-500">
                                <svg ref={openOloseRef} stroke="currentColor" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.2 19.4L18.9899 16.19C18.4432 15.6432 17.5568 15.6432 17.0101 16.1899L13.8 19.4M32 11L32 25C32 28.866 28.866 32 25 32L11 32C7.13401 32 4 28.866 4 25L4 11C4 7.13401 7.13401 4 11 4L25 4C28.866 4 32 7.13401 32 11Z" stroke="#490CAB" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`${styles.accordionContent} flex flex-col`}
                        ref={contentRef}
                        
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {
                                items.length > 0 && items.map((filter, index) => (
                                    selectItem !== filter.value && <a key={index} className={`${styles.accordionFiltersSelect} block py-2 rounded-md hover:bg-gray-900 hover:bg-opacity-20`} onClick={() => toggleAccordion(!isOpen, filter.value)}> {filter.title} </a>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
            

        </div>
    );
};

export default AccordionFilter;