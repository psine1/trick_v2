import React from 'react';
import styles from './Filters.module.css';
import { useRef,useState,useEffect } from 'react';
import CartFilter from '../CartFilter/CartFilter';
import AccordionFilter from '../AccordionFilter/AccordionFilter';

const Filters = ({ items, selectItem, setItem }) => {

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(null);

  const filterCardRefs = useRef([]);

  const handleToggle = (status, selectItem) => {
    setIsOpen(status);
    if(selectItem){
      setItem(selectItem)
    }
  };

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
      <section id='filters' className={`${styles.bgFilters} py-4 md:py-5`}> 
        <div className="container mx-auto px-4">
          {
            isMobile ?
              <AccordionFilter
                selectItem={selectItem}
                isOpen={isOpen}
                toggleAccordion={handleToggle}
                items={items} 
                setItem={handleToggle} /> 
                :
              <div className={`relative grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 32xl:grid-cols-10 sm:gap-22 lg:gap-22 xl:gap-22 32xl:gap-22`}>
                {items.map((filter, index) => (
                  <div className={`relative `} ref={(el) => (filterCardRefs.current[index] = el)} key={index} >
                    <CartFilter
                      title={filter.title}
                      value={filter.value}
                      seleted={selectItem}
                      setItem={setItem}
                    />
                  </div>
                ))}
              </div>
          }

        </div>
      </section>
    </>
  );
};

export default Filters;