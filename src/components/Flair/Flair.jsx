// components/Flair.js
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./Flair.module.css"; 
import Image from "next/image";

const Flair = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.set(".flair", { xPercent: -50, yPercent: -50 });
    gsap.set(".flair2", { xPercent: -50, yPercent: -50 });

    let xTo = gsap.quickTo(".flair", "x", { duration: 0.6, ease: "power3" }),
        yTo = gsap.quickTo(".flair", "y", { duration: 0.6, ease: "power3" });

    let xTo2 = gsap.quickTo(".flair2", "x", { duration: 0.3, ease: "power3" }),
        yTo2 = gsap.quickTo(".flair2", "y", { duration: 0.3, ease: "power3" });        

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xTo2(e.clientX);
      yTo2(e.clientY);
    };

    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    const draggableElements = document.querySelectorAll(".draggable");

    draggableElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseout", handleMouseOut);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      draggableElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return (
    <>
    <div
      className={`${styles.flair} flair flair--3 ${isHovered ? styles.hovered : ""}`}
    >    

    </div>


<div
className={`${styles.flair2} flair2 flair--3 ${isHovered ? styles.hovered : ""}`}
>



{isHovered && <div className={`${styles.text}`}>
  
                  <Image
                    className={`${styles.characterImg}`}
                    src="/images/arrows.png"
                    alt="hexagonBg-image"
                    width={448}
                    height={568}
                  />  

  </div>}


</div>
    </>

  );
};

export default Flair;
