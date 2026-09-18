import { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ sections }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div >
      {sections.map((section, index) => (
        <div key={index}>          
            <div
              className={`${styles.accordion} ${openIndex === index ? styles.active : ''}  `}
              onClick={() => handleClick(index)}
            >
              <div className={`${styles.bgAccordion} container mx-auto`}>
                <span className={`  block ${styles.titleOp}`}> {section.title}</span>
                <button className={`bgViolet text-white font-bold py-2 px-4 min-w-36 rounded block ${styles.path}`}> test </button>
                <div className={`  block ${styles.titleOp} justify-self-end`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                </div>
            </div>
          </div>

          <div
            className={`${styles.panel} py-9 ${openIndex === index ? `${styles.panelOpen}` : ''} container mx-auto `}
          >
            <p className='container mx-auto pt-12 '>{section.content}</p>
            <div className='py-12'>
            <button className={`bgViolet text-white font-bold py-2 px-4 min-w-36 rounded block ${styles.path}`}> test </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
