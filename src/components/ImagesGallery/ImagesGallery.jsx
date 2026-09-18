// ImagesGallery.jsx
import React, { useEffect, useRef } from 'react';
import styles from './ImagesGallery.module.css';
import Image from 'next/image';

const ImagesGallery = ({ images, classNameProp }) => {
  const container1Ref = useRef();

  useEffect(() => {
    const container1 = container1Ref.current;
    const imageElements = container1.querySelectorAll('.image');

    function duplicateImages(times) {
      for (let i = 0; i < times - 1; i++) {
        imageElements.forEach(image => {
          const clone = image.cloneNode(true);
          container1.appendChild(clone);
        });
      }
    }

    const handleDuplicateImages = () => {
      duplicateImages(3);
    };

    setTimeout(handleDuplicateImages, 500);
  }, []);

  return (
    <div className="relative w-full">
      <div ref={container1Ref} className={`${styles.wrapper} w-full`}>
        {images.map((src, index) => (
          <div data-element="elem2" key={index} className={`${styles.box} image ${classNameProp}`}>
            <Image src={src} alt={`Image ${index + 1}`} width={500} height={500} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesGallery;
