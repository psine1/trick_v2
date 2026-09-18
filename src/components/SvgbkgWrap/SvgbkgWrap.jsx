import styles from './SvgbkgWrap.module.css';

const SvgbkgWrap = () => {
    return (
        <>
            <svg
                className={`${styles.backgroundSvg}`}
                width="654"
                height="112"
                viewBox="0 0 654 112"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 30.7204V108.423C0 110.398 1.60307 112 3.58055 112H623.341C628.089 112 632.643 110.115 636 106.761L648.844 93.9279C651.782 90.9929 653.593 87.143 654 83.0486V3.57747C654 1.60169 651.78 0 649.042 0L42.5726 4.86629e-06C35.9983 4.86629e-06 29.6932 1.88456 25.0445 5.23908L7.26036 18.0721C2.61163 21.4267 0 25.9764 0 30.7204Z" fill="url(#paint0_linear_163_680)" />
                <defs>
                    <linearGradient id="paint0_linear_163_680" x1="558.155" y1="39.7419" x2="524.283" y2="207.312" gradientUnits="userSpaceOnUse">
                        <stop offset="0.2" stop-color="#02D0D9" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                </defs>

            </svg>
        </>


    );
};

export default SvgbkgWrap;