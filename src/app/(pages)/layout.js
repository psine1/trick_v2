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
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);

  }, []);

  return (
    <>
        {loading && <Preloader />}
        <div className={`  transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <NavBar onOpenModal={openModal} />
          <main>
            {children}
          </main>
          <Footer/>

        </div>
        {isModalOpen && <Contact onClose={closeModal} />}
     </>
  )
}
