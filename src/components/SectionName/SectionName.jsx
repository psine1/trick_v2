import React from 'react';


const SectionName = ({num, name, color}) => {
  return (
    <>
          <div className='w-full z-50'>
              <h5 className={`sectionName ${color}`}><span className={`highlight`}>{num} |</span> {name}</h5>
          </div>
    </>
  );
};

export default SectionName;