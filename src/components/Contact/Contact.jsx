'use client'

import styles from './Contact.module.css';
import ContactForm from '../ContactForm/ContactForm';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


const Contact = ({ onClose }) => {

  const contactRef = useRef();
  const svgRef = useRef();

  useEffect(() => {

    let tl = gsap.timeline({});

    tl
      .fromTo(contactRef.current, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "<")
      ;

  }, []);

  return (
    <>
      <section ref={contactRef} className={`${styles.bgSections} ${styles.fixedContact} h-full`}>

        <div className=' relative flex flex-col justify-between h-56 md:h-full'>
          <div className={`mx-auto w-full h-auto flex justify-between px-5 pt-12 `}>
            <div className={`container mx-auto flex flex-col md:flex-row  md:px-14 px-2 `}>
              <Link class="w-full md:w-1/2 px-5" href="/">
                <Image
                  className={`${styles.logoBlend}`}
                  src="/images/logoColor.svg"
                  width={154}
                  height={200}
                  alt="logo Tricks"
                />
              </Link>

            </div>
            {!onClose ? <Link href={'/jointrick'} passHref target={"_self"}>
              <Image
                className={`${styles.close} pr-0 sm:pr-5 h-11	`}
                src="/images/closeBtn.svg"
                width={80}
                height={80}
                alt="logo Tricks"
              />
            </Link> : <Image
              onClick={onClose}
              className={`${styles.close} pr-0 sm:pr-5 h-11	`}
              src="/images/closeBtn.svg"
              width={80}
              height={80}
              alt="logo Tricks"
            />
            }


          </div>
          <div className={`flex flex-col pt-6 md:pt-2 md:h-full  items-center justify-center px-5 `}>

            <div className='container mx-auto flex flex-col md:flex-row'>
              <div className={`w-full md:w-1/2 px-5`}>

                <div>
                  <h3 className={`title-900 text-gradient1`}>Want to know more?</h3>
                  <h4 className='title-600'>Contact us!</h4>

                  <div className=' mt-6 md:mt-12 w-full md:w-8/12'>
                    <p className={`${styles.p} font-bold`}>
                      We want to hear from you!
                    </p>
                    <p className={`${styles.pSpan} font-bold`}>
                      Leave your message using this form and we&rsquo;ll get back to you as soon as we can.
                    </p>
                  </div>


                </div>
                <div></div>

              </div>

              <div className={`w-full md:w-1/2`}>
                <ContactForm />
              </div>


            </div>

          </div>

        </div>



      </section>

    </>
  );
};

export default Contact;