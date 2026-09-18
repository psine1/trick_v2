import styles from './SvgStrokeCardAboutUs.module.css';

const SvgStrokeCardAboutUs = (props) => (
  <svg
  className={`${styles.svgStyles}`}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 544 350"  
    preserveAspectRatio="none" // Permite que el SVG pierda sus proporciones
    xmlSpace="preserve"
    clipPathUnits="objectBoundingBox"
    {...props}
  >
    <path
      className={`${styles.stroke}`}
      d="M3.9,349.3c-1.8,0-3.2-1.4-3.2-3.2V33.9c0-5.1,2-9.8,5.6-13.4L20.5,6.3c3.6-3.6,8.3-5.6,13.4-5.6h506.3
		c1.8,0,3.2,1.4,3.2,3.2v312.2c0,5.1-2,9.8-5.6,13.4l-14.1,14.1c-3.6,3.6-8.3,5.6-13.4,5.6H3.9z"
    />
  </svg>
);
export default SvgStrokeCardAboutUs;