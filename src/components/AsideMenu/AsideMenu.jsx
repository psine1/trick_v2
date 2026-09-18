import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import styles from './AsideMenu.module.css';
import Link from 'next/link';
import { useEffect } from 'react';

const sections = ['#header', '#services', '#about', '#careers'];

export default function AsideMenu() {
  const activeSection = useIntersectionObserver(sections);

  useEffect(() => {
    const linkElements = document.querySelectorAll(`.${styles.indicator}`);

    linkElements.forEach((link) => {
      link.classList.remove(styles.active);

      const hrefValue = link.getAttribute('href');
      if (hrefValue === `/${activeSection}` || hrefValue === `#${activeSection}`) {
        link.classList.add(styles.active);
      }
    });
  }, [activeSection]); 

  return (
    <div className='fixed hidden md:block z-50'>
      <aside className={styles.aside}>
        <ul className={styles.ul}>
          {sections.map((section, index) => (
            <li key={index}>
              <Link
                href={section === '#' ? '/' : section} 
                className={`${styles.indicator}`} 
              ></Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}