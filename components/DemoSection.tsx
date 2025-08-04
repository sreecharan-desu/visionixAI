
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import GridDemo from "./GridDemo";

export default function DemoSection() {
  const [terminalText, setTerminalText] = useState("");
  const [currentGrid, setCurrentGrid] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  return (
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
          <GridDemo currentGrid={currentGrid} />
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
  );
}
