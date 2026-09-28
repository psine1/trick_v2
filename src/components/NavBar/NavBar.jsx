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

      const menuElements = menuRef.current?.querySelectorAll('[data-element="btnMenu"]') || [];

      gsap.set(bgRef.current, {
        x: 0,
        xPercent: 102,
        autoAlpha: 0,
        force3D: true,
      });
      gsap.set(menuRef.current, { x: 0, xPercent: 0, autoAlpha: 0 });
      gsap.set(menuElements, { x: 0, y: 14, autoAlpha: 0, force3D: true });

      animationMenuRef.current = gsap.timeline({
        paused: true,
        defaults: { overwrite: 'auto' },
      })
        .to(bgRef.current, {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power3.out',
          force3D: true,
        }, 0)
        .to(menuRef.current, {
          autoAlpha: 1,
          duration: 0.12,
          ease: 'none',
        }, 0.06)
        .to(menuElements, {
          y: 0,
          autoAlpha: 1,
          duration: 0.3,
          stagger: 0.035,
          ease: 'power2.out',
          force3D: true,
        }, 0.14);
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
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
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
            <div className={`flex h-16 ${styles.navBarContent}`}>
              <div className="flex items-center justify-between grow relative md:px-6">
                <div className={`flex relative h-full flex-shrink-0 md:w-2/12 lg:w-2/12 px-6 md:px-0 items-center justify-start z-50 drop-shadow-lg md:filter-none ${styles.shadow}`}>
                  <Link href="/" onClick={() => {
                    handleIsSelect("");
                    setIsOpen(false);
                  }}>
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
                  className={`inline-flex items-center justify-center p-2 ${styles.toggleMenu} ${isOpen ? styles.toggleMenuOpen : ''}`}
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation"
                  aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                  <svg className={`h-6 w-6 ${styles.menuIcon}`} stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
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
              aria-label="Mobile navigation"
              className={`md:hidden ${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''} ease-in-out`}
            >
              <div className={styles.mobileMenuInner}>
                <div className={styles.mobileMenuContent}>
                  <div className={styles.menuEyebrow} data-element="btnMenu">
                    <span>MENU</span>
                    <span className={styles.menuEyebrowLine} aria-hidden="true"></span>
                    <span>TRICK STUDIOS</span>
                  </div>

                  <div className={styles.mobileMenuLinks}>
                    {NAV_LINKS.map((link, index) => {
                      const isActive = link.name === activeSection
                        || (link.name === 'jointrick' && pathname === '/jointrick');

                      return (
                        <Link
                          key={link.name}
                          onClick={handleLinkClick}
                          href={link.link}
                          data-element="btnMenu"
                          aria-current={isActive ? 'page' : undefined}
                          className={`${styles.mobileMenuLink} ${isActive ? styles.mobileMenuLinkActive : ''}`}
                        >
                          <span className={styles.mobileMenuIndex}>{String(index + 1).padStart(2, '0')}</span>
                          <span className={styles.mobileMenuLabel}>{link.title}</span>
                          <span className={styles.mobileMenuArrow} aria-hidden="true">
                            <svg viewBox="0 0 20 20" fill="none">
                              <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </Link>
                      );
                    })}
                    <button
                      type="button"
                      onClick={handleContactClick}
                      data-element="btnMenu"
                      className={styles.mobileMenuLink}
                    >
                      <span className={styles.mobileMenuIndex}>04</span>
                      <span className={styles.mobileMenuLabel}>CONTACT US</span>
                      <span className={styles.mobileMenuArrow} aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                <div className={styles.mobileMenuFooter} data-element="btnMenu">
                  <span className={styles.socialLabel}>FOLLOW US</span>
                  <div className={styles.socialLinks}>
                    <Link className={styles.socialLink} aria-label="Facebook" href="https://www.facebook.com/trickgamingstudios" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/images/icon-fb.svg"
                        alt=""
                        width={42}
                        height={42}
                        className={styles.socialImage}
                      />
                    </Link>
                    <Link className={styles.socialLink} aria-label="Instagram" href="https://www.instagram.com/trickgamingstudios" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/images/icon-ig.svg"
                        alt=""
                        width={42}
                        height={42}
                        className={styles.socialImage}
                      />
                    </Link>
                    <Link className={styles.socialLink} aria-label="LinkedIn" href="https://www.linkedin.com/company/trick-studios" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/images/icon-in.svg"
                        alt=""
                        width={42}
                        height={42}
                        className={styles.socialImage}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
