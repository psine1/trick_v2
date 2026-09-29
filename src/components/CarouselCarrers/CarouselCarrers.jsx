import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';  // Importar estilos de paginación
import 'swiper/css/autoplay';    // Importar estilos de autoplay (opcional)
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import styles from './CarouselCarrers.module.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import useInViewport from '@/hooks/useInViewport';

// Import Swiper styles
import 'swiper/css';

const CarouselCarrers = () => {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const isInViewport = useInViewport(containerRef);

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) {
      return;
    }

    if (isInViewport) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [isInViewport]);

  return (
    <>  
    <div ref={containerRef} className={`${styles.swiperPaginationOverride} `}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay.stop();
        }}
        spaceBetween={60}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={3} // Visible en pantallas grandes
        speed={700}
        pagination={{
          clickable: true, // Hacer los bullets clicables
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // Continuar autoplay al interactuar con el slider
          pauseOnMouseEnter: true,
          waitForTransition: true,
        }}
        loop={true}
        modules={[EffectCoverflow, Pagination, Autoplay]} // Agregar los módulos
        className="swiper-container"
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            centeredSlides: true,
            coverflowEffect: {
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            },
          },
          640: {
            slidesPerView: 2,
            centeredSlides: true,
            coverflowEffect: {
              rotate: 30,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: false,
            },
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: false,
            coverflowEffect: {
              rotate: 30,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            },
          },
        }}
      >
        <SwiperSlide className={`${styles.shadow}`}>
          <Image
            className={styles.path}
            src="/images/slider/img1.jpg"
            alt="Slide 1"
            width={700}
            height={700}
            priority={true}
          />
        </SwiperSlide>
        <SwiperSlide className={`${styles.shadow}`}>
          <Image
            className={styles.path}
            src="/images/slider/img2.jpg"
            alt="Slide 2"
            width={700}
            height={700}
          />
        </SwiperSlide>
        <SwiperSlide className={`${styles.shadow}`}>
          <Image
            className={styles.path}
            src="/images/slider/img3.jpg"
            alt="Slide 3"
            width={700}
            height={700}
          />
        </SwiperSlide>
        <SwiperSlide className={`${styles.shadow}`}>
          <Image
            className={styles.path}
            src="/images/slider/img4.jpg"
            alt="Slide 4"
            width={700}
            height={700}
          />
        </SwiperSlide>
        <SwiperSlide className={`${styles.shadow}`}>
          <Image
            className={styles.path}
            src="/images/slider/img5.jpg"
            alt="Slide 5"
            width={700}
            height={700}
          />
        </SwiperSlide>
      </Swiper>
    </div>
    </>
  );
};

export default CarouselCarrers;
