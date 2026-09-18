import styles from './HeaderCarrers.module.css';
import Image from 'next/image';
import SvgbkgWrap from '../SvgbkgWrap/SvgbkgWrap';
import SvgStrokeCardAboutUs from '../SvgStrokeCardAboutUs/SvgStrokeCardAboutUs';

const HeaderCarrers = ({ }) => {



  const handleButtonClick = () => {
    location.href = "#filters";
  };
  return (
    <>
      <header id="headTest" className={` flex justify-between h-screen flex-col	overflow-hidden items-center md:px-5 px-2 relative ${styles.header}`}>

        <div className='container flex flex-col-reverse md:flex-row justify-between content-center items-center pt-24'>
          <div className='flex w-full md:w-1/2 flex-col z-50'>
            <h3 className={` ${styles.titleCarrer1} nerisBoldItalic text-white pl-9`}>JOIN</h3>
            <div className='relative flex' >
              <div className={`${styles.shadowWrapTitle} absolute`}>
                <SvgbkgWrap />
              </div>
              <div className={`${styles.wrapTitle} `}><span className={`text-gradient2 ${styles.titleCarrer2} `}>TRICK STUDIOS</span></div>
            </div>
            <p className={`text-white pt-3 md:px-5 px-5 ${styles.descriptionCareer}`}>
              Join our innovative team and work on exciting projects that push the boundaries of game development.
            </p>

            <div className={` ${styles.navOpeningMobile}  `} onClick={handleButtonClick}>
                <div className={` absolute ${styles.wrapStroke}  `}>
                  <div className={`${styles.wrapStrokeSelectHover}`}>
                    <SvgStrokeCardAboutUs />
                  </div>
                </div>
                <div className={`${styles.path}`}>
                  <div className={`${styles.pathBorder}`}>
                    <span className={`${styles.titleFilter} nerisSemiBold pb-2`}>SEE OPENINGS</span>
                    <button className={`${styles.titleButton} p-2 rounded-lg text-black-400 hover:text-black-500 hover:border-gray-500`} onClick={handleButtonClick}>
                      <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_3403_1628)">
                          <path d="M22.9997 1.99994L14.9893 10.0103L6.47888 1.49988" stroke="#C63AF8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <filter id="filter0_d_3403_1628" x="0.978516" y="-0.00012207" width="27.5215" height="19.5105" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3403_1628" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3403_1628" result="shape" />
                          </filter>
                        </defs>
                      </svg>

                    </button>
                  </div>
                </div>
              </div>
          </div>
          <div className='flex w-6/12 flex-col relative'>
            <div className={`${styles.image} absolute md:relative`}>
              <Image
                className={`w-full h-full ${styles.mask}`}
                src={"/images/imgHeaderWorkWithUs.png"}
                alt="card-image"
                width={581}
                height={502}
              />
              <div className={` absolute ${styles.navOpening}  `} onClick={handleButtonClick}>
                <div className={` absolute ${styles.wrapStroke}  `}>
                  <div className={`${styles.wrapStrokeSelectHover}`}>
                    <SvgStrokeCardAboutUs />
                  </div>
                </div>
                <div className={`${styles.path}`}>
                  <div className={`${styles.pathBorder}`}>
                    <span className={`${styles.titleFilter} nerisSemiBold pb-2`}>SEE OPENINGS</span>
                    <button className={`${styles.titleButton} p-2 rounded-lg text-black-400 hover:text-black-500 hover:border-gray-500`} onClick={handleButtonClick}>
                      <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_3403_1628)">
                          <path d="M22.9997 1.99994L14.9893 10.0103L6.47888 1.49988" stroke="#C63AF8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <filter id="filter0_d_3403_1628" x="0.978516" y="-0.00012207" width="27.5215" height="19.5105" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3403_1628" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3403_1628" result="shape" />
                          </filter>
                        </defs>
                      </svg>

                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderCarrers;