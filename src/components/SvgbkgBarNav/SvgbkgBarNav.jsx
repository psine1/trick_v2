import styles from './SvgbkgBarNav.module.css';

const SvgbkgBarNav = (props) => (
  <svg
    height="71"
   // width="696"
    //width="598"
    width="100%"
    className={`${styles.svgStyles}`}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 856 65"  
    preserveAspectRatio="none" // Permite que el SVG pierda sus proporciones
    xmlSpace="preserve"
    clipPathUnits="objectBoundingBox"
    
    {...props}
  >
    <path
      className={`${styles.stroke}`}
      d="M852.4,1c1.2,0,2.1,0.9,2.1,2.1v20.2c0,0.3,0,0.6,0,0.9l0,0.1l0,0.1c0,0.1,0,0.2,0,0.3V45c0,3-1.2,5.9-3.3,8
		l-7.6,7.7c-2.1,2.1-5.1,3.4-8.1,3.4H583.1c0,0-0.1,0-0.1,0l0,0l0,0c-0.1,0-0.2,0-0.4,0H256.1c0,0-0.1,0-0.1,0l0,0l0,0
		c-0.1,0-0.2,0-0.4,0H3.1C1.9,64,1,63.1,1,61.9V41.1c0-0.2,0-0.4,0-0.5l0-0.1l0-0.1c0-0.1,0-0.1,0-0.2V19.4c0-3,1.2-5.9,3.3-8l7-7.1
		C13.4,2.2,16.3,1,19.4,1H852.4 M852.4,0h-833c-3.3,0-6.5,1.3-8.8,3.7l-7,7.1C1.3,13,0,16.2,0,19.4v20.8c0,0.1,0,0.2,0,0.3
		c0,0.2,0,0.4,0,0.6v20.8C0,63.6,1.4,65,3.1,65h252.4c0.1,0,0.3,0,0.4,0c0.1,0,0.1,0,0.2,0h326.4c0.1,0,0.3,0,0.4,0
		c0.1,0,0.1,0,0.2,0h252.4c3.3,0,6.5-1.3,8.8-3.7l7.6-7.7c2.3-2.3,3.6-5.4,3.6-8.7V24.8c0-0.2,0-0.3,0-0.5c0-0.3,0-0.7,0-1V3.1
		C855.5,1.4,854.1,0,852.4,0L852.4,0z"
    />
  </svg>
);
export default SvgbkgBarNav;