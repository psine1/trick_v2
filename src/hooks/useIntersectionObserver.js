import { useEffect, useState } from 'react';

const useIntersectionObserver = (sections) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
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
    sections.forEach((section) => {
      const sectionElement = document.querySelector(section);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => {
      // desconecto el observer cuando el componente se desmonte
      sections.forEach((section) => {
        const sectionElement = document.querySelector(section);
        if (sectionElement) {
          observer.unobserve(sectionElement);
        }
      });
    };
  }, [sections]);

  return activeSection;
};

export default useIntersectionObserver;
