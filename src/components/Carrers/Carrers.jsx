import React from 'react';
import SectionName from '../SectionName/SectionName';
import MainButton from '../MainButton/MainButton';
import CarouselCarrers from '../CarouselCarrers/CarouselCarrers';
import styles from './Carrers.module.css';
import GalleryWorks2 from '../GalleryWorks2/GalleryWorks2';
import { pageData } from '@/app/data/data';

const Carrers = ({ section }) => {
  const { numSection, sectionName, paragraph, cta, linkUrl } = pageData[section];

  return (
    <div className={`${styles.bgSections} w-auto relative`}>
      <section className="w-full">
        <GalleryWorks2 />
      </section>

      <section id="careers" className={`relative ${styles.wrapCarrers} py-6`}>
        <div className="flex flex-col justify-between">
          <div className="container mx-auto flex flex-col items-center justify-center px-4 md:px-9 gap-4">
            <SectionName
              num={numSection}
              name={sectionName}
              color="text-white"
            />

            <div className="w-full gap-8">
              <div className="flex flex-col md:flex-row items-start md:gap-12 w-full">
                <div>
                  <h3 className="title-600">
                    <span className="text-white">Job </span>
                    <br />
                    <span className="title-900 text-gradient1">openings</span>
                  </h3>
                </div>

                <div>
                  <p className="text-white max-w-xl pt-4 md:pt-0">
                    {paragraph}
                  </p>
                  <div className="inline-block py-6">
                    <MainButton
                      buttonColor="buttonRose4"
                      textContent={cta}
                      targetOp="_self"
                      linkUrl={linkUrl}
                      colorStroke="#FFF"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-4 draggable">
            <CarouselCarrers />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carrers;
