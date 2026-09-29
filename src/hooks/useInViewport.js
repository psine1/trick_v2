import { useEffect, useState } from 'react';

const useInViewport = (elementRef, options = {}) => {
  const { rootMargin = '0px', threshold = 0.01 } = options;
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      return undefined;
    }

    let isIntersecting = false;

    const updateVisibility = () => {
      setIsInViewport(isIntersecting && document.visibilityState !== 'hidden');
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updateVisibility();
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [elementRef, rootMargin, threshold]);

  return isInViewport;
};

export default useInViewport;
