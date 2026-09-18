import styles from './SvgStrokeInput.module.css';





const SvgStrokeInput = (props) => {


  


  return (
  
  <>
  <svg
  className={`${styles.svgStyles}`}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 254 48"  
    preserveAspectRatio="none" // Permite que el SVG pierda sus proporciones
    xmlSpace="preserve"
    clipPathUnits="objectBoundingBox"
    {...props}
  >
    <path
      className={`${styles.stroke}`}
      d="M252.2,1c0.5,0,0.8,0.4,0.8,0.8v30.3c0,2.2-0.9,4.3-2.4,5.8l-6.6,6.6c-1.5,1.6-3.6,2.4-5.8,2.4H1.8C1.4,47,1,46.6,1,46.2
		V15.8c0-2.2,0.9-4.3,2.4-5.8L10,3.4C11.6,1.9,13.6,1,15.8,1H252.2 M252.2,0H15.8C13.4,0,11,1,9.3,2.7L2.7,9.3C1,11.1,0,13.4,0,15.8
		v30.3c0,1,0.8,1.8,1.8,1.8h236.3c2.4,0,4.8-1,6.5-2.7l6.6-6.6c1.7-1.7,2.7-4.1,2.7-6.5V1.8C254,0.8,253.2,0,252.2,0L252.2,0z"/>
  </svg>



  </>
  

)}

export default SvgStrokeInput;