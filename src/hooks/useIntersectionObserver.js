import { useEffect, useState } from 'react';

const useIntersectionObserver = (sections) => {
  const [activeSection, setActiveSection] = useState('');
  const sectionsKey = sections.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // seccion visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // tomo el ID de la sección visible
        }
      });
    }, options);

    // observo cada sección
    const selectors = sectionsKey.split('|').filter(Boolean);
    selectors.forEach((section) => {
      const sectionElement = document.querySelector(section);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionsKey]);

  return activeSection;
};

export default useIntersectionObserver;
