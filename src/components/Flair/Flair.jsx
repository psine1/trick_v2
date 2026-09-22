// components/Flair.js
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Flair.module.css"; 
import Image from "next/image";

const Flair = () => {
  const [isHovered, setIsHovered] = useState(false);
  const primaryFlairRef = useRef(null);
  const secondaryFlairRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) {
      return undefined;
    }

    const primaryFlair = primaryFlairRef.current;
    const secondaryFlair = secondaryFlairRef.current;
    gsap.set(primaryFlair, { xPercent: -50, yPercent: -50 });
    gsap.set(secondaryFlair, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(primaryFlair, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(primaryFlair, "y", { duration: 0.6, ease: "power3" });

    const xTo2 = gsap.quickTo(secondaryFlair, "x", { duration: 0.3, ease: "power3" });
    const yTo2 = gsap.quickTo(secondaryFlair, "y", { duration: 0.3, ease: "power3" });

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
      element.addEventListener("pointerenter", handleMouseOver);
      element.addEventListener("pointerleave", handleMouseOut);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf([primaryFlair, secondaryFlair]);
      draggableElements.forEach((element) => {
        element.removeEventListener("pointerenter", handleMouseOver);
        element.removeEventListener("pointerleave", handleMouseOut);
      });
    };
  }, []);

  return (
    <>
    <div
      ref={primaryFlairRef}
      className={`${styles.flair} flair flair--3 ${isHovered ? styles.hovered : ""}`}
    >    

    </div>


<div
ref={secondaryFlairRef}
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
