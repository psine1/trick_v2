import styles from './SvgStrokeCard.module.css';

const SvgStrokeCard = (props) => (
  <svg
  className={`${styles.svgStyles}`}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 545 280"  
    preserveAspectRatio="none" // Permite que el SVG pierda sus proporciones
    xmlSpace="preserve"
    clipPathUnits="objectBoundingBox"
    {...props}
  >
    <path
      className={`${styles.stroke}`}
      d="M4.4,279.2c-1.7,0-3.1-1.4-3.1-3.2V33.9c0-4.9,2-9.8,5.6-13.4L20.9,6.3c3.5-3.5,8.4-5.6,13.4-5.6h506.3
		c1.7,0,3.2,1.4,3.2,3.1v242.2c0,5-2,9.8-5.6,13.4l-14.1,14.1c-3.5,3.5-8.4,5.6-13.4,5.6H4.4z"
    />
  </svg>
);
export default SvgStrokeCard;