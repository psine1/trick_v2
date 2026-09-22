import { useLayoutEffect, useRef } from 'react';
import styles from './TextAnimation.module.css';
import { horizontalLoop } from '@/utils/gsapCustom';

const TextAnimation = () => {
  const railRef = useRef(null);

  useLayoutEffect(() => {
    const scrollingText = railRef.current?.querySelectorAll('p') ?? [];
    if (scrollingText.length === 0) {
      return undefined;
    }

    const loop = horizontalLoop(scrollingText, {
      repeat: -1,
      speed: 4
    });

    return () => loop.kill();
  }, []);



  return (

    <>
      <div data-element="containerText" className={`${styles.containerWrap}`}>

        <div className={`${styles.texts}`}>
          <div ref={railRef} className={`rail ${styles.textItems}`}>
            <p> <span className={`${styles.intro} nerisLight fontSmallCaps`}> MAKING THE GAMES </span> <span className={`${styles.intro} nerisSemiBold fontSmallCaps text-gradient2`}>WE LIKE TO PLAY</span></p>
            <p><span className={`${styles.intro} nerisSemiBold fontSmallCaps`}> MAKING THE GAMES </span> <span className={`${styles.intro} nerisBlackItalic text-gradient1 fontSmallCaps`}>WE LIKE TO PLAY</span> </p>
            <p> <span className={`${styles.intro} nerisLight fontSmallCaps`}> MAKING THE GAMES </span> <span className={`${styles.intro} nerisSemiBold fontSmallCaps text-gradient2`}>WE LIKE TO PLAY</span></p>
            <p><span className={`${styles.intro} nerisSemiBold fontSmallCaps`}> MAKING THE GAMES </span> <span className={`${styles.intro} nerisBlackItalic text-gradient1 fontSmallCaps`}>WE LIKE TO PLAY</span> </p>

          </div>

          <div className={`${styles.textItems}`}>
            <p> <span className={`${styles.intro} nerisLight fontSmallCaps`}> MAKING THE GAMES </span> <span className={`${styles.intro} nerisSemiBold fontSmallCaps text-gradient2`}>WE LIKE TO PLAY</span></p>
            <p><span className={`${styles.intro} nerisSemiBold fontSmallCaps`}> MAKING THE GAMES </span> <span className={`${styles.intro} nerisBlackItalic text-gradient1 fontSmallCaps`}>WE LIKE TO PLAY</span> </p>
            <p> <span className={`${styles.intro} nerisLight fontSmallCaps`}> MAKING THE GAMES </span> <span className={`${styles.intro} nerisSemiBold fontSmallCaps text-gradient2`}>WE LIKE TO PLAY</span></p>
            <p><span className={`${styles.intro} nerisSemiBold fontSmallCaps`}> MAKING THE GAMES </span> <span className={`${styles.intro} nerisBlackItalic text-gradient1 fontSmallCaps`}>WE LIKE TO PLAY</span> </p>

          </div>
        </div>

      </div>
    </>
  );
};

export default TextAnimation;
