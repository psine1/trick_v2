'use client'  
import Flair from "@/components/Flair/Flair";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import HeaderCarrers from "@/components/HeaderCarrers/HeaderCarrers";
import Oportunity from "@/components/Oportunity/Oportunity";
import Benefits from "@/components/Benefits/Benefits";
import OurValues from "@/components/OurValues/OurValues";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  
  return (
      <>  
          <HeaderCarrers />
          <OurValues />
          <Benefits />
          <Oportunity />
          <Flair />
      </>
  ); 
}
