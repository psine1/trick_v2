import styles from './SvgStrokeButton.module.css';

const SvgStrokeButton = ({colorStroke},props) => (

  <svg
  className={`${styles.svgStyles}`}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 178 42"  
    preserveAspectRatio="none" // Permite que el SVG pierda sus proporciones
    xmlSpace="preserve"
    clipPathUnits="objectBoundingBox"
    {...props}
  >
    <path
      style={{stroke: colorStroke}}
      className={`${styles.stroke}`}
      d="M176.8,1c0.1,0,0.2,0.1,0.2,0.2v13.5v0.6v0.1v0.1v0.2v13.5c0,1.8-0.6,3.3-1.8,4.6l-4.9,5.2
		c-1.3,1.3-2.8,2-4.5,2H1.2C1.1,41,1,40.8,1,40.8V26.9v-0.4v-0.2V12.3C1,10.6,1.7,9,2.9,7.8L7.4,3c1.3-1.3,2.8-2,4.5-2H176.8
		 M176.8,0H11.9c-2,0-3.8,0.8-5.2,2.3L2.1,7.1C0.7,8.5,0,10.4,0,12.3v13.9c0,0.1,0,0.2,0,0.2s0,0.3,0,0.4v13.9C0,41.4,0.5,42,1.2,42
		h164.5c2,0,3.8-0.8,5.2-2.3l4.9-5.2c1.4-1.5,2.1-3.3,2.1-5.3V15.8c0-0.1,0-0.1,0-0.2v-0.1v-0.1c0-0.2,0-0.4,0-0.6V1.2
		C178,0.6,177.5,0,176.8,0L176.8,0z"
    />
  </svg>
);
export default SvgStrokeButton;