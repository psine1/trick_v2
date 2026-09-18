import { useState, useEffect } from 'react';

const ScrollDirectionManager = ({ children }) => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setScrollDirection('Down');
    } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
      setScrollDirection('Up');
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`scrollDirection${scrollDirection}`}>
      {children}
    </div>
  );
};

export default ScrollDirectionManager;
