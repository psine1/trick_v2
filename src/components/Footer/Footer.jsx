import styles from './Footer.module.css';
import LogoSlider from '../LogoSlider/LogoSlider';
import Logo from '../Logo/Logo';
import Link from 'next/link';

const Footer = (className) => {

  

  return (
    <>
    <section  className={`relative w-full  ${styles.className}   `}>

      <div className={`${styles.bgFooter} flex flex-col items-center justify-center`}>

          <LogoSlider />
          <div className='container h-full flex flex-col md:flex-row gap-6 justify-between content-center items-center py-9 px-9 md:border-x md:border-b md:rounded-b-3xl'>
            <Logo />
            <p className={`text-white ${styles.mail}`}> <Link href={'mailto:play@trickgs.com'} target={"_blank"}> play<span className='text-purple'>@</span>trickgs.com</Link></p>
          </div>

      </div>

    </section>
          </>

  );
};

export default Footer;
