'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import NavBar from "@/components/NavBar/NavBar";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Preloader from "@/components/Preloader/Preloader";
import { useEffect, useState } from 'react';

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.refresh();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Simula un retraso para mostrar el preloader
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);

  }, []);


  

  return (
    <html className="scroll-smooth" lang="en">
      <Head>
        <title>Trick Studios</title>
        <meta name="description" content="We grew up playing videogames, Now we make them" />
      </Head>
      <body className={inter.className}>
        {loading && <Preloader />}
        <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <NavBar onOpenModal={openModal} />
          <main>
            {children}
          </main>
          <Footer className={`-z-10`} />
        </div>
        {isModalOpen && <Contact onClose={closeModal} />}

      </body>
    </html>
  );
}
