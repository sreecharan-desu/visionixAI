
"use client";


import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";
import DocsPage from "./docs/page";


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
      <HeroSection scrollTo={scrollTo} />
      <DemoSection />

      <section id="docs" className="bg-black px-6 py-20">
        <DocsPage />
      </section>
      <Footer />
    </div>
  );
}