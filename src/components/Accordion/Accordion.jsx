import { useState } from 'react';
import AccordionItem from './AccordionItem/AccordionItem';
import styles from './Accordion.module.css'; 


const Accordion = ({ items, filter }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${styles.test} `}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          filterName={item.filterName}
          cta={item.cta}
          isOpen={openIndex === index}
          toggleAccordion={() => handleToggle(index)}
          className={index % 2 === 0 ? `row1` : `row2`}
          linkUrl={item.linkUrl}
          targetOp={item.linkUrl ? "_blank": "_self"}
          filter={filter}
        />
      ))}
    </div>
  );
};

export default Accordion;
