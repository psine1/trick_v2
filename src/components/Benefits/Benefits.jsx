import styles from './Benefits.module.css';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
const Benefits = ({ }) => {
  const [isMobile, setIsMobile] = useState(false);

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
  });

  const benefits = [
    {
      title: "Contractor mode - Long term",
      description: "Flexible and committed, ready for long-term projects. Let’s build together!",
      icon: "/images/icon5.png",
      style: ""
    },
    {
      title: "Full time flexible working hours for work-life balance",
      description: "Benefit from full-time flexible hours that support a balanced work-life integration.",
      icon: "/images/icon7.png",
    },
    {
      title: "Paid vacations",
      description: "Enjoy paid vacations to recharge and refresh, ensuring you return to work rejuvenated and motivated.",
      icon: "/images/icon6.png",
      style: ""
    },
    {
      title: "Collaboration with talented professionals on diverse projects",
      description: "Work alongside skilled professionals on a variety of exciting projects, fostering creativity and innovation.",
      icon: "/images/icon8.png",
    },

  ];

  return (
    <section id='benefits' className={`${styles.bgBenefits} py-2 md:py-12`}>
      <div className="container mx-auto px-4">
        <h2 className={`${styles.titleBenefits} nerisBoldItalic text-white mb-8`}>BENEFITS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className={`bg-white px-6 py-6 md:py-9 rounded-lg shadow-lg flex items-center flex-col md:flex-row space-x-2 ${styles.path} ${benefit.classNameProp}`} style={{ transform: isMobile ? 'none' : benefit.style }}>
              <div className="w-28 h-28 flex-shrink-0 mb-2">
                <Image src={benefit.icon} className="w-full h-full" alt="Icon" width={160} height={160} objectFit="contain" />
              </div>
              <div>
                <h3 className={`${styles.titleCard} nerisSemiBold pb-2`}>{benefit.title}</h3>
                <p className={`${styles.contentCard} text-gray-600`}>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Benefits;