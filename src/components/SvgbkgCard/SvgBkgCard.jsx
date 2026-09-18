import styles from './SvgBkgCard.module.css';

const SvgBkgCard = () => {
  return (
<svg
  className={`${styles.backgroundSvg}`}
  viewBox="0 0 414 350"
  style={{ enableBackground: 'new 0 0 414 350' }}
  xmlSpace="preserve"
>
  <style type="text/css">
    {`.st0{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_1_);}`}
  </style>
  <defs>
    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="414" y2="100" gradientTransform="matrix(1 0 0 -1 0 100)">
      <stop offset="0%" style={{ stopColor: '#9747FF' }} />
      <stop offset="100%" style={{ stopColor: '#AC50FF' }} />
    </linearGradient>
  </defs>
  <path className="st0" d="M410.2,0c2.2,0,3.9,1.8,3.9,3.9v70v172.2v70c0,5.2-2.1,10.2-5.8,13.9l-14.1,14.1c-3.7,3.7-8.7,5.8-13.9,5.8
		H3.9c-2.2,0-3.9-1.8-3.9-3.9v-70V103.9v-70c0-5.2,2.1-10.2,5.8-13.9L19.9,5.8C23.6,2.1,28.6,0,33.9,0L410.2,0
		C410.2,0,410.2,0,410.2,0z"/>
</svg>
  );
};

export default SvgBkgCard;