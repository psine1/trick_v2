import React from 'react';
import styles from './Logo.module.css';
import Image from "next/image";

const Logo = () => {
  return (
    <>
         <Image      
            className={`${styles.logoBlend}`}          
            src="images/trick-logo-white.svg"
            width={154}
            height={200}
            alt="logo Tricks"
          /> 
    </>
  );
};

export default Logo;