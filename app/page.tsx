"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/footer";
import DocsPage from "@/app/docs/page";
import { markdownContent } from "@/lib/markDown";

export default function VisionixAI() {
  // Smooth scroll helpers
  const scrollTo = (id:any) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="relative min-h-screen bg-black text-white
        bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),
             linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
        bg-[size:1.5rem_1.5rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-black/50 scroll-smooth"
    >
      <Navbar scrollTo={scrollTo} scrollToTop={scrollToTop} />
         <div className="min-h-screen bg-black text-white bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]">
      {/* Background glows */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-[160px] z-0" />
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[160px] z-0" />
       <HeroSection scrollTo={scrollTo} />
            
      <section id="install" className="bg-black px-6 py-20">
          <DemoSection/>

      </section>
    </div>
     
      <section id="docs" className="bg-black px-6 py-20">
        <DocsPage />
      </section>
      <Footer />
    </div>
  );
}