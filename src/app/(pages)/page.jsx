'use client'
import Header from "@/components/Header/Header";
import Services from "@/components/Services/Services";
import Flair from "@/components/Flair/Flair";
import TextAnimation from "@/components/TextAnimation/TextAnimation";
import AboutUs from "@/components/AboutUs/AboutUs";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Carrers from "@/components/Carrers/Carrers";
import AsideMenu from "@/components/AsideMenu/AsideMenu";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  return (<>  
  
        <div className={` overflow-hidden w-screen relative`}>
          <Header />
          <Services section="section1"  />    
          <TextAnimation />
          <AboutUs section="section2" />            
          <Carrers section="section3" />        
          <Flair />

        </div>
        <AsideMenu />


    </>
  );
}