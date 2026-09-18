import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import styles from "./GradientAnim.module.css"; 

const GradientAnim = () => {
  const gradientRef = useRef(null);

  useEffect(() => {
    gsap.set(gradientRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(gradientRef.current, { autoAlpha: 0 });

    let xTo = gsap.quickTo(gradientRef.current, "x", { duration: 1, ease: "power3" }),
        yTo = gsap.quickTo(gradientRef.current, "y", { duration: 1, ease: "power3" });


    const handleMouseMove = (e) => {
      const servicesSection = document.querySelector("#services");
      if (servicesSection && servicesSection.contains(e.target)) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    const handleMouseOver = () => {
      gsap.to(gradientRef.current, { autoAlpha: 1, duration: 1 });

    }
    const handleMouseOut = () => {
      gsap.to(gradientRef.current, { autoAlpha: 0, duration: 1 });

    }

    const draggableElements = document.querySelectorAll("#services");

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
      <div ref={gradientRef} className={`${styles.gradientAnim}`}></div>
    </>
  );
};

export default GradientAnim;
