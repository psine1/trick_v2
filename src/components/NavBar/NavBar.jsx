"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import MainButton from '../MainButton/MainButton';
import MainLink from '../MainLink/MainLink';
import SvgbkgBarNav from '../SvgbkgBarNav/SvgbkgBarNav';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { redirect, usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger);


const NavBar = ({ onOpenModal }) => {
  const sections = ['#header', '#services', '#about', '#careers', '#benefits', '#oportunity', '#headTest'];
  const pathname = usePathname()

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelect, setIsSelect] = useState("");
  const [path, setPath] = useState("");
  const [links, setLinks] = useState([
    /* {
         name: 'home',
         link: '/',
         title: 'HOME'
     },*/
    {
      name: 'services',
      link: '/#services',
      title: 'SERVICES'
    },
    {
      name: 'about',
      link: '/#about',
      title: 'ABOUT US'
    },/*
  {
    name: 'careers',
    link: '/#careers',
    title: 'CAREERS'
  },*/
    {
      name: 'jointrick',
      link: '/jointrick',
      title: 'WORK WITH US'
    }
  ]);
  const navBarRef = useRef();
  const shadowStrokeRef = useRef();
  const animationShadowRef = useRef();
  const menuRef = useRef();
  const bgRef = useRef();
  const animationMenuRef = useRef();

  const activeSection = useIntersectionObserver(sections);
  const animationlogo = useRef();
  const logoText = useRef();
  const logoGradient = useRef();
  const logoIso = useRef();

  useEffect(() => {
    if (location) {
      setPath(location?.href?.slice(location?.href?.lastIndexOf("/")))
    }
  }, [pathname]);


  useEffect(() => {
    links.map(link => {
      if (link.link == path) {
        setIsSelect(link.name)
      }
    })
  }, [path]);

  useEffect(() => {
    if (logoText.current) {
      animationlogo.current = gsap.timeline({ paused: true })
        .to(logoText.current, {
          x: -50,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
    }
  }, []);
  useEffect(() => {
    if (logoText.current) {
      animationlogo.current = gsap.timeline({ paused: true })
        .to(logoText.current, {
          x: -50,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
    }
  }, []);


  useEffect(() => {

    if (activeSection === 'header' || activeSection === 'headTest') {
      gsap.to(logoText.current, {
        x: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      console.log(activeSection)


    } else {
      gsap.to(logoText.current, {
        x: -20,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      console.log(activeSection)
    }

  }, [activeSection]);

  useEffect(() => {

    setTimeout(() => {


      const handleResize = () => {
        setIsMobile(window.innerWidth <= 900);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const screenWidth = window.innerWidth;
      const distance = screenWidth + 400;

      if (shadowStrokeRef.current && menuRef.current) {
        animationShadowRef.current = gsap.timeline({ paused: true })
          .to(shadowStrokeRef.current, {
            x: 10,
            y: 10,
            duration: 0.3,
            ease: 'power2.out',
          });

        animationMenuRef.current = gsap.timeline({ paused: true })
          .fromTo(menuRef.current, { x: distance * 3 }, { x: 0, y: 0, duration: 1, ease: 'power2.out' })
          .fromTo(bgRef.current, { x: distance * 3 }, { x: 0, y: 0, duration: 1, ease: 'power2.out' }, "<")
          .fromTo(`[data-element="btnMenu"]`, { x: 200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.75, stagger: 0.1, ease: 'power2.out' }, "<+0.7");
      }


      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('resize', handleResize);
      };



    }, [isMobile]);

  }, [500]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);


  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        //     setScrollDirection('down'); 
      } else if (scrollY < lastScrollY) {
        //    setScrollDirection('up');  
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);



  const toggleMenu = () => {
    if (animationMenuRef.current) {
      if (isOpen) {

        animationMenuRef.current.reverse().eventCallback("onReverseComplete", () => {
          setIsOpen(false);

        });
      } else {

        setIsOpen(true);
        animationMenuRef.current.play();
      }
    }
  };

  const handleMouseEnter = () => {
    if (animationShadowRef.current) {
      animationShadowRef.current.play();

    }
  };

  const handleMouseLeave = () => {
    if (animationShadowRef.current) {
      animationShadowRef.current.reverse();
    }
  };


  const handleLinkClick = () => {
    if (isMobile) {
      toggleMenu();

    }
  };

  const handleIsSelect = (section, link) => {

    setIsSelect(section)
  };

  return (
    <>



      <div
        className={`max-w-7xl container flex justify-center content-center navBar `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`pt-4 md:pt-6 fixed md:absolute flex justify-center content-center ${styles.navFixed} `}
        >
          <nav className={`${styles.wrapNav}`}>
            <div ref={navBarRef} className={`flex h-16`}>
              <div className="flex items-center justify-between grow relative md:px-6">
                <div className={`flex relative h-full flex-shrink-0 md:w-2/12 lg:w-2/12 px-6 md:px-0 items-center justify-start z-50 drop-shadow-lg md:filter-none ${styles.shadow}`}>
                  <Link href="/" onClick={() => handleIsSelect("")}>
                    <Image ref={logoText}
                      className={`${styles.logoBlend} hidden md:block relative md:absolute top-0 left-0`}
                      src={isMobile ? '/images/logoMobile.svg' : '/images/logo-white.svg'}
                      width={179}
                      height={76}
                      alt="logo Tricks"
                    />
                    <Image ref={logoGradient}
                      className={`${styles.logoBlend} relative md:absolute top-0 left-0`}
                      src={isMobile ? '/images/logoMobile.svg' : '/images/logo-white-gradient.svg'}
                      style={{ display: `${isMobile ? 'block' : 'none'}` }}
                      width={179}
                      height={76}
                      alt="logo Tricks"
                    />
                    <Image ref={logoIso}
                      className={`${styles.logoBlend} hidden md:block relative md:absolute top-0 left-0`}
                      src={isMobile ? '/images/logoMobile.svg' : '/images/logo-white-iso.svg'}
                      width={179}
                      height={76}
                      alt="logo Tricks"
                    />
                  </Link>
                </div>
                <div className={`relative justify-end ${styles.shadow} ${scrollDirection === 'down' ? styles.scrollDown : scrollDirection === 'up' ? styles.scrollUp : ''}`}>
                  <div className={`z-20 hidden md:flex  ${styles.navBarRight} relative`}>
                    {
                      links.map((link, index) => (
                        <div key={index}>
                          <MainLink link={link.link} title={link.title} isBorder={isSelect === link.name} isLast={links.length == index + 1} onClick={() => handleIsSelect(link.name, link.link)} />
                        </div>
                      )
                      )
                    }

                    <div>
                      <MainButton textContent="Contact Us"
                        buttonColor="buttonRose1"
                        onClick={onOpenModal}
                        className={`p-4`} />
                    </div>
                  </div>
                  <div ref={shadowStrokeRef} className={`${styles.shadowNavBar} absolute`}>
                    <SvgbkgBarNav />
                  </div>
                </div>
              </div>
              <div className="-mr-2 px-6 flex md:hidden z-50 justify-center items-center drop-shadow-lg">
                <button onClick={toggleMenu} className={`inline-flex items-center justify-center p-2 ${styles.toggleMenu}`}>
                  <svg className="h-6 w-6" stroke="#FFFFFFE5" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div ref={bgRef} className={`${styles.bgMenu} ease-in-out`}></div>
            <div ref={menuRef} className={`${isOpen ? 'block' : 'hidden'} md:hidden ${styles.mobileMenu} py-12 ease-in-out`}>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {
                  links.map((link, index) => (
                    <Link key={index} onClick={handleLinkClick} href={link.link} data-element="btnMenu" className="block px-3 py-2 rounded-md hover:bg-gray-900 hover:bg-opacity-20">
                      {link.title}
                    </Link>
                  )
                  )
                }
                <Link onClick={onOpenModal} href="" data-element="btnMenu" className="block px-3 py-2 rounded-md hover:bg-gray-900 hover:bg-opacity-20">
                  CONTACT US
                </Link>
              </div>
              <div className={`flex p-5 gap-4`} data-element="btnMenu">
                <Link href="https://www.facebook.com/trickgamingstudios" target="_blank">
                  <Image
                    src="/images/icon-fb.svg"
                    alt="Facebook"
                    width={50}
                    height={50}
                    className={styles.socialImage}
                  />
                </Link>
                <Link href="https://www.instagram.com/trickgamingstudios" target="_blank">
                  <Image
                    src="/images/icon-ig.svg"
                    alt="Instagram"
                    width={50}
                    height={50}
                    className={styles.socialImage}
                  />
                </Link>
                <Link href="https://www.linkedin.com/company/trick-studios" target="_blank">
                  <Image
                    src="/images/icon-in.svg"
                    alt="LinkedIn"
                    width={50}
                    height={50}
                    className={styles.socialImage}
                  />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;