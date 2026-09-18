import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './AccordionItem.module.css';
import MainButton from '@/components/MainButton/MainButton';

const AccordionItem = ({ title, content, filterName, cta, isOpen, toggleAccordion, className, linkUrl, targetOp, filter }) => {
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
      gsap.to(openOloseRef.current, { rotation: 45, duration: 0.75, ease: "power3.inOut" }, "<")

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
    <div ref={rowRef} className={`${styles.accordion} ${className}`} >
      <div className='container mx-auto px-5 md:px-5  md:py-5'>

        <div className='flex justify-between items-start md:items-center' onClick={toggleAccordion}>
          <div className='flex flex-col md:flex-row  md:justify-start gap-2 md:gap-8'>
            <button className={`${styles.accordionHeader}`} onClick={toggleAccordion}>
              <h3 className='text-left'>{title}</h3>
            </button>
            <div className=' self-start md:self-center pb-6 md:pb-0'  style={{ display: filter == 'All' ? 'flex' : 'none' }}>
              <MainButton textContent={filterName} buttonColor="buttonRose2" className={`p-8`}  isShadow={false}  />
            </div>
          </div>
          <div >
            <button className="p-2 rounded-lg bg-white border border-black-400 text-black-400 hover:text-black-500 hover:border-gray-500 mt-4">
              <svg ref={openOloseRef} className="w-6 h-6" fill="#FFFFFF" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${styles.accordionContent} flex flex-col`}
          ref={contentRef}
          style={{ height: 0, overflow: 'hidden' }}
        >
          <div className={`${styles.accordionInnerContent} pb-6 pt-6`} dangerouslySetInnerHTML={{ __html: content }}></div>
          <div className='self-start md:self-start px-0 py-9'>
            <MainButton
              
              linkUrl={linkUrl ? linkUrl : '/contact'}
              targetOp={targetOp}
              textContent={cta ? cta : 'Apply Now'}
              buttonColor="buttonRose3"
              className={`p-8`}
              isShadow={false}
              colorStroke={'#490CAB'} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccordionItem;
