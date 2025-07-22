"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Check, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("npm install -g @visionix/cli");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="py-24 text-center md:py-32"
    >
        <div className="mb-8 inline-block rounded-full border border-primary/50 bg-primary/10 px-4 py-2">
          <span className="text-sm text-primary">Zone-Based Computer Vision Automation</span>
        </div>
        <h1 className="font-headline text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          Smart Actions Through
          <br />
          <span className="text-primary">Visual Presence</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
          VisionixAI detects presence in room zones and triggers automated responses — no sensors, no hardware dependencies. Just pure computer vision.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={copyToClipboard} className="w-full sm:w-auto">
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Check className="h-5 w-5" /> Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="install"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Copy className="h-5 w-5" /> Install CLI
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#docs">
                View Documentation <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
    </motion.section>
  );
}
