import styles from './BgGradient.module.css';
import Image from 'next/image';

const BgGradient = () => {
 

 
  return (
    <>
    <div className={`relative w-full`}></div>

    <div className='absolute w-full'>
                 <Image 
                      className={`w-full ${styles.bg}`} 
                      src={"/images/bgGradient.svg"}
                      alt="card-image"
                      width={581}
                      height={502}
                  />
                    </div>

    </>

  );
};



export default BgGradient;
