"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const commands = [
    { text: "$ npm install -g @visionix/cli", className: "text-primary" },
    { text: "✓ VisionixAI CLI installed successfully", className: "text-green-400" },
    { text: "$ visionix init --room classroom", className: "text-primary" },
    { text: "✓ Initializing room grid zones...", className: "text-green-400" },
    { text: "✓ Zones configured: 12x8 grid", className: "text-green-400" },
    { text: "$ visionix start --detect", className: "text-primary" },
    { text: "✓ Camera stream active", className: "text-green-400" },
    { text: "✓ Zone presence detection enabled", className: "text-green-400" },
    { text: "⚡ Device automation ready", className: "text-accent" },
];

export default function CliDemoSection() {
  const [lines, setLines] = useState<{ text: string; className: string }[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentCommandIndex = 0;
    let currentCharIndex = 0;
    
    const typeWriter = () => {
        if(currentCommandIndex >= commands.length) {
            setShowCursor(false);
            return;
        }

        const currentCommand = commands[currentCommandIndex];

        if(currentCharIndex < currentCommand.text.length) {
            const newText = currentCommand.text.substring(0, currentCharIndex + 1);
            
            setLines(prevLines => {
                const newLines = [...prevLines];
                newLines[currentCommandIndex] = { text: newText, className: currentCommand.className };
                return newLines;
            });

            currentCharIndex++;
            const delay = currentCommand.text.charAt(currentCharIndex - 1) === ' ' ? 80 : 30;
            setTimeout(typeWriter, delay);
        } else {
            currentCommandIndex++;
            currentCharIndex = 0;
            setTimeout(typeWriter, 500);
        }

        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };
    
    const initialTimeout = setTimeout(typeWriter, 1200);
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
        clearTimeout(initialTimeout);
        clearInterval(cursorInterval);
    }
  }, []);

  return (
    <motion.section
      id="demo"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
      className="py-20"
    >
      <h2 className="mb-16 text-center font-headline text-4xl font-bold md:text-5xl">See VisionixAI in Action</h2>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-border bg-card shadow-2xl shadow-primary/10">
          <div className="flex items-center gap-2 rounded-t-lg border-b border-border bg-muted/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="ml-4 font-mono text-sm text-muted-foreground">visionix-cli</span>
          </div>
          <div
            ref={terminalRef}
            className="min-h-[300px] overflow-y-auto rounded-b-lg bg-background p-6 font-code text-sm leading-relaxed"
            aria-live="polite"
          >
            <pre>
              {lines.map((line, index) => (
                <span key={index} className={line.className}>{line.text}<br/>
                </span>
              ))}
              {showCursor && <span className="inline-block w-[1ch] animate-pulse bg-primary/80">█</span>}
            </pre>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
