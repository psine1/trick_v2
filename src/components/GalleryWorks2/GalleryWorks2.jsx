import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Image from 'next/image';
import styles from './GalleryWorks2.module.css';
import FloatingParticles from '../FloatingParticles/FloatingParticles';
import { horizontalLoop } from '@/utils/gsapCustom';

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
  '/images/gelleryWorks/at-games-port.jpg',
  '/images/gelleryWorks/azra-games-port.jpg',
  '/images/gelleryWorks/free-rage-games-port.jpg',
  '/images/gelleryWorks/marvel-snap-port.jpg',
  '/images/gelleryWorks/play-to-win-port.jpg',
  '/images/gelleryWorks/superjump-port.jpg',
];

const images2 = [
  '/images/gelleryWorks/at-games-port.jpg',
  '/images/gelleryWorks/azra-games-port.jpg',
  '/images/gelleryWorks/free-rage-games-port.jpg',
  '/images/gelleryWorks/marvel-snap-port.jpg',
  '/images/gelleryWorks/play-to-win-port.jpg',
  '/images/gelleryWorks/superjump-port.jpg',
  '/images/gelleryWorks/cliente-05.jpg',
  '/images/gelleryWorks/cliente-06.jpg',
  '/images/gelleryWorks/cliente-07.jpg',
  '/images/gelleryWorks/cliente-08.jpg',
  '/images/gelleryWorks/cliente-09.jpg',
  '/images/gelleryWorks/cliente-10.jpg',
  '/images/gelleryWorks/cliente-11.jpg',
  '/images/gelleryWorks/cliente-12.jpg',
  '/images/gelleryWorks/cliente-13.jpg',
  '/images/gelleryWorks/cliente-03.jpg',
];

const overlay = [
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
  '/images/gelleryWorks/at-games-logo-overlay.png',
  '/images/gelleryWorks/azra-games-logo-overlay.png',
  '/images/gelleryWorks/free-rage-games-logo-overlay.png',
  '/images/gelleryWorks/marvel-snap-logo-overlay.png',
  '/images/gelleryWorks/play-to-win-logo-overlay.png',
  '/images/gelleryWorks/superjump-logo-overlay.png',
];

const overlay2 = [
  '/images/gelleryWorks/at-games-logo-overlay.png',
  '/images/gelleryWorks/azra-games-logo-overlay.png',
  '/images/gelleryWorks/free-rage-games-logo-overlay.png',
  '/images/gelleryWorks/marvel-snap-logo-overlay.png',
  '/images/gelleryWorks/play-to-win-logo-overlay.png',
  '/images/gelleryWorks/superjump-logo-overlay.png',
  '/images/gelleryWorks/overlay-05.png',
  '/images/gelleryWorks/overlay-06.png',
  '/images/gelleryWorks/overlay-07.png',
  '/images/gelleryWorks/overlay-08.png',
  '/images/gelleryWorks/overlay-09.png',
  '/images/gelleryWorks/overlay-10.png',
  '/images/gelleryWorks/overlay-11.png',
  '/images/gelleryWorks/overlay-12.png',
  '/images/gelleryWorks/overlay-13.png',
  '/images/gelleryWorks/overlay-03.png',
];

gsap.registerPlugin(Draggable);

const GalleryWorks2 = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let loop;
    let draggable;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('[data-element="item"]');
      if (items.length === 0) {
        return;
      }

      gsap.to(items, { scale: 0.95, duration: 0.75, ease: 'none' });
      loop = horizontalLoop(items, { repeat: -1, speed: 0.3 });

      const proxy = document.createElement('div');
      const wrapProgress = gsap.utils.wrap(0, 1);
      let startProgress = 0;

      draggable = Draggable.create(proxy, {
        trigger: containerRef.current,
        type: 'x',
        minimumMovement: 6,
        onPressInit() {
          startProgress = loop.progress();
          gsap.set(proxy, { x: 0 });
          loop.pause();
        },
        onDrag() {
          const firstItem = items[0];
          const lastItem = items[items.length - 1];
          const totalWidth = Math.max(
            lastItem.offsetLeft + lastItem.offsetWidth - firstItem.offsetLeft,
            1,
          );
          loop.progress(wrapProgress(startProgress - this.x / totalWidth));
        },
        onRelease() {
          loop.play();
        },
      })[0];
    }, containerRef);

    return () => {
      draggable?.kill();
      loop?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div ref={containerRef} data-element="container" className={`${styles.containerWrap} draggable`}>
        <div className={styles.sliderWrap}>
          <div data-element="loop" className={styles.loop}>
            {images.map((src, index) => (
              <div key={src} data-element="item" className={styles.item}>
                <Image
                  className={styles.itemInner}
                  src={src}
                  alt={`Client work ${index + 1}`}
                  width={500}
                  height={500}
                />

                <Image
                  className={`${styles.itemInner} ${styles.overlayImage}`}
                  src={overlay[index]}
                  alt=""
                  width={500}
                  height={500}
                />

                <div className={styles.itemInner2}>
                  <Image
                    src={images2[index]}
                    alt={`Client work alternate ${index + 1}`}
                    width={500}
                    height={500}
                  />

                  <Image
                    className={styles.overlayImage2}
                    src={overlay2[index]}
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <FloatingParticles />
      </div>

      <div className={styles.fix}></div>
    </>
  );
};

export default GalleryWorks2;
