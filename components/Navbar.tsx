
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GithubIcon } from "lucide-react";

export default function Navbar({ scrollTo, scrollToTop }:any) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-lg border-b border-white/15 shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-5">
        {/* Logo + Title */}
        <motion.button
          onClick={scrollToTop}
          className="flex items-center space-x-3 focus:outline-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative h-10 w-10 cursor-pointer">
            <Image
              src="/favicon.ico"
              alt="VisionixAI Logo"
              fill
              className="object-contain filter brightness-125"
            />
          </div>
          <span className="text-xl font-bold tracking-wider cursor-pointer text-white">
            VisionixAI
          </span>
        </motion.button>

        {/* Nav Links + GitHub Icon */}
        <div className="flex items-center space-x-8">
          <motion.button
            onClick={() => scrollTo("demo")}
            className="text-lg font-medium text-white/70 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, color: "#FFFFFF" }}
          >
            Demo
          </motion.button>
          <motion.button
            onClick={() => scrollTo("docs")}
            className="text-lg font-medium text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05, color: "#FFFFFF" }}
          >
            Docs
          </motion.button>
          <motion.a
            href="https://github.com/visionixAI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255,255,255,0.3)" }}
          >
            <GithubIcon className="h-6 w-6 text-white" />
          </motion.a>
        </div>
      </div>
    </nav>
  );
}
