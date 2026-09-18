import styles from './ItemsWork.module.css';
import { useState, useEffect, forwardRef } from 'react';
import Image from 'next/image';

const images = [
  '/images/gelleryWorks/cliente-01.jpg',
  '/images/gelleryWorks/cliente-02.jpg',
  '/images/gelleryWorks/cliente-03.jpg',
  '/images/gelleryWorks/cliente-04.jpg',
  '/images/gelleryWorks/cliente-05.jpg',
  '/images/gelleryWorks/cliente-06.jpg',
  '/images/gelleryWorks/cliente-07.jpg',
  '/images/gelleryWorks/cliente-08.jpg',
  '/images/gelleryWorks/cliente-09.jpg',
  '/images/gelleryWorks/cliente-10.jpg',
  '/images/gelleryWorks/cliente-11.jpg',
  '/images/gelleryWorks/cliente-12.jpg',
  '/images/gelleryWorks/cliente-13.jpg',
  '/images/gelleryWorks/cliente-14.jpg',
];


const overlayImages = [
  '/images/gelleryWorks/overlay-01.png',
  '/images/gelleryWorks/overlay-02.png',
  '/images/gelleryWorks/overlay-03.png',
  '/images/gelleryWorks/overlay-04.png',
  '/images/gelleryWorks/overlay-05.png',
  '/images/gelleryWorks/overlay-06.png',
  '/images/gelleryWorks/overlay-07.png',
  '/images/gelleryWorks/overlay-08.png',
  '/images/gelleryWorks/overlay-09.png',
  '/images/gelleryWorks/overlay-10.png',
  '/images/gelleryWorks/overlay-11.png',
  '/images/gelleryWorks/overlay-12.png',
  '/images/gelleryWorks/overlay-13.png',
  '/images/gelleryWorks/overlay-14.png',
];


const shuffleWithoutAdjacentRepeats = (array) => {
  let shuffled = array.sort(() => Math.random() - 0.5);
  for (let i = 1; i < shuffled.length; i++) {
    if (shuffled[i] === shuffled[i - 1]) {
      const swapIndex = i + 1 < shuffled.length ? i + 1 : 0;
      [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
    }
  }
  return shuffled;
};

const ItemsWork = forwardRef(({ reverse = false, ...props }, ref) => {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [shuffledOverlays, setShuffledOverlays] = useState([]);

  useEffect(() => {
    const shuffledImgs = shuffleWithoutAdjacentRepeats([...images]);
    const shuffledOvrs = shuffleWithoutAdjacentRepeats([...overlayImages]);
    setShuffledImages(reverse ? shuffledImgs.reverse() : shuffledImgs);
    setShuffledOverlays(reverse ? shuffledOvrs.reverse() : shuffledOvrs);
  }, [reverse]);

  return (
    <div>
      <ul className={`${styles.cards}`} ref={ref} {...props}>
        {shuffledImages.map((src, index) => (
          <li key={index} className={`${styles.card}`}>
            <div className={styles.imageWrapper}>
              <Image src={src} alt={`Image ${index + 1}`} width={500} height={500} />
              <div
                className={`${styles.overlay}`}
                style={{ backgroundImage: `url(${shuffledOverlays[index]})` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

ItemsWork.displayName = 'ItemsWork';

export default ItemsWork;