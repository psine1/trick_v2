"use client";
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import MainButton from '../MainButton/MainButton';
import MainLink from '../MainLink/MainLink';
import SvgbkgBarNav from '../SvgbkgBarNav/SvgbkgBarNav';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useMediaQuery from '@/hooks/useMediaQuery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger);

const NAV_SECTIONS = ['#header', '#services', '#about', '#careers', '#benefits', '#oportunity', '#headTest'];
const NAV_LINKS = [
  {
    name: 'services',
    link: '/#services',
    title: 'SERVICES'
  },
  {
    name: 'about',
    link: '/#about',
    title: 'ABOUT US'
  },
  {
    name: 'jointrick',
    link: '/jointrick',
    title: 'WORK WITH US'
  }
];

const NavBar = ({ onOpenModal }) => {
  const pathname = usePathname()

  const isMobile = useMediaQuery('(max-width: 900px)');
  const [isOpen, setIsOpen] = useState(false);
  const [isSelect, setIsSelect] = useState("");
  const [path, setPath] = useState("");
  const navBarRef = useRef();
  const shadowStrokeRef = useRef();
  const animationShadowRef = useRef();
  const menuRef = useRef();
  const bgRef = useRef();
  const animationMenuRef = useRef();

  const activeSection = useIntersectionObserver(NAV_SECTIONS);
  const logoText = useRef();
  const logoGradient = useRef();
  const logoIso = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.href.slice(window.location.href.lastIndexOf('/')))
    }
  }, [pathname]);


  useEffect(() => {
    const selectedLink = NAV_LINKS.find((link) => link.link === path);
    if (selectedLink) {
      setIsSelect(selectedLink.name);
    }
  }, [path]);

  useEffect(() => {
    const logoElement = logoText.current;
    if (!logoElement || !activeSection) {
      return undefined;
    }

    if (activeSection === 'header' || activeSection === 'headTest') {
      gsap.to(logoElement, {
        x: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    } else {
      gsap.to(logoElement, {
        x: -20,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    return () => gsap.killTweensOf(logoElement);
  }, [activeSection]);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animationShadowRef.current = gsap.timeline({ paused: true })
        .to(shadowStrokeRef.current, {
          x: 10,
          y: 10,
          duration: 0.3,
          ease: 'power2.out',
        });

      gsap.set([menuRef.current, bgRef.current], { xPercent: 120 });
      gsap.set(menuRef.current, { autoAlpha: 0 });
      gsap.set('[data-element="btnMenu"]', { x: 80, autoAlpha: 0 });

      animationMenuRef.current = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
      })
        .to([bgRef.current, menuRef.current], { xPercent: 0, duration: 0.65 }, 0)
        .to(menuRef.current, { autoAlpha: 1, duration: 0.01 }, 0)
        .to('[data-element="btnMenu"]', {
          x: 0,
          autoAlpha: 1,
          duration: 0.45,
          stagger: 0.06,
        }, 0.22);
    }, navBarRef);

    return () => {
      animationMenuRef.current = null;
      animationShadowRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const timeline = animationMenuRef.current;
    if (!timeline) {
      return;
    }

    if (isOpen) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((currentValue) => !currentValue);

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
      setIsOpen(false);
    }
  };

  const handleContactClick = () => {
    setIsOpen(false);
    onOpenModal();
  };

  const handleIsSelect = (section) => setIsSelect(section);

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
          <nav ref={navBarRef} className={`${styles.wrapNav}`}>
            <div className={`flex h-16`}>
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
                <div className={`relative justify-end ${styles.shadow}`}>
                  <div className={`z-20 hidden md:flex  ${styles.navBarRight} relative`}>
                    {
                      NAV_LINKS.map((link, index) => (
                        <div key={index}>
                          <MainLink link={link.link} title={link.title} isBorder={isSelect === link.name} isLast={NAV_LINKS.length == index + 1} onClick={() => handleIsSelect(link.name)} />
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
                <button
                  type="button"
                  onClick={toggleMenu}
                  className={`inline-flex items-center justify-center p-2 ${styles.toggleMenu}`}
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation"
                  aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
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
            <div ref={bgRef} className={`${styles.bgMenu} ease-in-out`} aria-hidden="true"></div>
            <div
              id="mobile-navigation"
              ref={menuRef}
              aria-hidden={!isOpen}
              className={`md:hidden ${styles.mobileMenu} py-12 ease-in-out`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {
                  NAV_LINKS.map((link, index) => (
                    <Link key={index} onClick={handleLinkClick} href={link.link} data-element="btnMenu" className="block px-3 py-2 rounded-md hover:bg-gray-900 hover:bg-opacity-20">
                      {link.title}
                    </Link>
                  )
                  )
                }
                <button
                  type="button"
                  onClick={handleContactClick}
                  data-element="btnMenu"
                  className="block w-full px-3 py-2 text-left rounded-md hover:bg-gray-900 hover:bg-opacity-20"
                >
                  CONTACT US
                </button>
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
