"use client";

import { motion } from "framer-motion";

export default function AnimatedGridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      <motion.div
        className="absolute inset-0 z-0 h-full w-full opacity-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1), transparent 50%),
            radial-gradient(circle at 0% 0%, hsl(var(--accent) / 0.1), transparent 40%),
            radial-gradient(circle at 100% 100%, hsl(var(--primary) / 0.1), transparent 30%)
          `,
        }}
      />
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
