'use client'
import NavBar from "@/components/NavBar/NavBar";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Preloader from "@/components/Preloader/Preloader";
import { useEffect, useState } from 'react';

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function RootLayout({ children }) {


  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    let isCancelled = false;
    let minimumDelayId;
    let fontTimeoutId;

    const minimumDelay = new Promise((resolve) => {
      minimumDelayId = window.setTimeout(resolve, 350);
    });
    const fontTimeout = new Promise((resolve) => {
      fontTimeoutId = window.setTimeout(resolve, 1500);
    });
    const fontsReady = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      fontTimeout,
    ]);

    Promise.all([fontsReady, minimumDelay]).then(() => {
      if (!isCancelled) {
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(minimumDelayId);
      window.clearTimeout(fontTimeoutId);
    };

  }, []);

  return (
    <>
        {loading ? (
          <Preloader />
        ) : (
          <div>
            <NavBar onOpenModal={openModal} />
            <main>
              {children}
            </main>
            <Footer/>
          </div>
        )}
        {!loading && isModalOpen && <Contact onClose={closeModal} />}
     </>
  )
}
