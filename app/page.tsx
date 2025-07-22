"use client";

import { useEffect, useState } from "react";
import { CheckCircle, GithubIcon, Terminal, Zap } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import DocsPage from "./docs/page";

export default function VisionixAI() {
  // Smooth scroll helpers
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Typing effect
  const [terminalText, setTerminalText] = useState("");
  useEffect(() => {
    const text = "$ npm install -g @visionix/cli";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTerminalText(text.slice(0, i + 1));
        i++;
      } else clearInterval(timer);
    }, 90);
    return () => clearInterval(timer);
  }, []);

  // Grid animation
  const [currentGrid, setCurrentGrid] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setCurrentGrid((p) => (p + 1) % 3);
        setIsAnalyzing(false);
      }, 1400);
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  const GridDemo = () => {
    const active = [8, 13, 18][currentGrid];
    return (
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className={`aspect-square border border-white/10 rounded-md transition-all duration-500 ${
              i === active
                ? "bg-white/10 shadow-[0_0_12px_#ffffff30] backdrop-blur-sm"
                : "bg-white/5 hover:bg-white/10"
            }`}
            whileHover={{ scale: i === active ? 1 : 1.05 }}
          >
            {i === active && (
              <div className="flex h-full w-full items-center justify-center animate-pulse">
                <Zap className="w-5 h-5 text-white/80" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="relative min-h-screen bg-black text-white
        bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),
             linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
        bg-[size:1.5rem_1.5rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-black/50 scroll-smooth"
    >
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo + Title */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="relative h-8 w-8 cursor-pointer">
              <Image
                src="/favicon.ico"
                alt="VisionixAI Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-wide cursor-pointer text-white">
              VisionixAI
            </span>
          </button>

          {/* Nav Links + GitHub Icon */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => scrollTo("demo")}
              className="text-white/70 hover:text-white transition cursor-pointer"
            >
              Demo
            </button>
            <button
              onClick={() => scrollTo("docs")}
              className="text-white/70 hover:text-white transition cursor-pointer"
            >
              Docs
            </button>
            <a
              href="https://github.com/visionixAI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
            >
              <GithubIcon className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-32 px-6 text-center">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/10 px-4 py-1 text-sm text-white/70 tracking-wide">
            Zone-Based Computer Vision Automation
          </span>

          <h1 className="mb-8 text-6xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Smart Actions Through <br />
            <span className="bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent">
              Visual Presence
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-xl text-white/70 leading-relaxed md:text-2xl">
            VisionixAI detects presence in room zones and triggers automated
            responses—no sensors, no hardware. Just pure computer vision.
          </p>

          <div className="mx-auto flex max-w-sm flex-col gap-4 sm:flex-row sm:max-w-none sm:justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-md bg-white px-7 py-4 font-semibold text-black transition"
            >
              <Terminal className="h-5 w-5" />
              Install CLI
            </motion.button>
            <motion.button
              onClick={() => scrollTo("docs")}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-md border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              View Documentation →
            </motion.button>
          </div>
        </motion.div>

      </section>

      {/* DEMO SECTION */}
      <motion.section
        id="demo"
        className="mx-auto max-w-6xl px-6 py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-16 text-center text-4xl font-bold">
          See VisionixAI in Action
        </h2>

        {/* CLI Terminal */}
        <div className="mx-auto mb-16 max-w-3xl">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black/80 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="h-2 w-2 rounded-full bg-red-500/50" />
              <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
              <div className="h-2 w-2 rounded-full bg-green-500/50" />
              <span className="ml-3 text-xs text-white/60">visionix-cli</span>
            </div>
            <div className="p-5 font-mono text-sm text-white/80 tracking-wide">
              {terminalText}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>

        {/* FEATURES & GRID */}
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold">Automate with Insight</h3>
            <p className="text-white/70 leading-relaxed">
              VisionixAI transforms any camera into a smart sensor. Define zones
              within a room, and let our AI trigger actions based on who is
              where, and when.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Real-time presence detection",
                "Configurable room zones",
                "Hardware-independent solution",
                "AI-powered automation logic",
                "Easy-to-use CLI for setup",
                "Scalable and efficient",
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 text-white/80" />
                  <span className="text-sm font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-lg border border-white/10 bg-black/70 p-6 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="mb-4 text-lg font-semibold">
              Live Automation Demo
            </h4>
            <GridDemo />
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
              <span>Triggered Responses</span>
              {isAnalyzing && (
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  Analyzing presence...
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* DOCS SECTION */}
      <section id="docs" className="bg-black px-6 py-20">
        <DocsPage />
      </section>
{/* FOOTER */}
<footer className="border-t border-white/20 bg-black/50 backdrop-blur-md py-4">
  <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
    {/* Left: Crafted line */}
    <div className="flex flex-wrap items-center text-white/70 text-sm space-x-1">
      <span>Crafted with</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 text-red-500 animate-[pulse_1.5s_infinite]"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>by</span>
      <a
        href="https://sreecharandesu.in"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white transition"
      >
        Sreecharan Desu
      </a>
      
    </div>

    {/* Right: Copyright */}
    <div className="text-white/60 text-xs">
      © {new Date().getFullYear()} VisionixAI. All rights reserved.
    </div>
  </div>
</footer>


    </div>
  );
}
