
import { motion } from "framer-motion";
import { Terminal, Eye, Zap, Shield } from "lucide-react";

export default function HeroSection({ scrollTo }:any) {
  return (
    <section className="relative pt-48 pb-32 px-4 sm:px-8 text-center overflow-hidden bg-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-gray-900/10 to-black/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Premium badge */}
        <motion.div
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-gray-800/10 px-6 py-3"
          whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
        >
          <Eye className="h-4 w-4 text-white/70" />
          <span className="text-sm font-medium text-white/80 tracking-wide">
            Next-Gen Computer Vision Platform
          </span>
        </motion.div>

        {/* Main headline with enhanced typography */}
        <h1 className="mb-12 text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight">
          <span className="block">Intelligent</span>
          <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Zone Detection
          </span>
          <span className="block text-5xl md:text-6xl font-bold text-white/90 mt-3">
            Powered by AI
          </span>
        </h1>

        {/* Enhanced description */}
        <p className="mx-auto mb-14 max-w-4xl text-xl sm:text-2xl md:text-3xl text-white/80 leading-relaxed font-light">
          Transform any space into a smart environment with VisionixAI's advanced computer vision.{" "}
          <span className="text-white font-medium">Zero hardware installation</span> required—just
          pure AI-driven presence detection and automation.
        </p>

        {/* Feature highlights */}
        <div className="mb-16 flex flex-wrap justify-center gap-6 text-sm">
          {[
            { icon: Eye, text: "Real-time Detection" },
            { icon: Zap, text: "Instant Response" },
            { icon: Shield, text: "Privacy First" },
          ].map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Icon className="h-4 w-4 text-white/60" />
              <span className="text-white/70 font-medium">{text}</span>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-lg mx-auto">
          <motion.button
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-white to-gray-300 px-10 py-5 font-bold text-black text-lg shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo("install")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Terminal className="h-6 w-6 relative z-10" />
            <span className="relative z-10">Install CLI</span>
          </motion.button>

          <motion.button
            onClick={() => scrollTo("docs")}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-10 py-5 font-semibold text-white text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Documentation</span>
            <motion.span
              className="text-xl"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/40 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span>Enterprise Ready</span>
          <div className="w-1 h-1 bg-white/40 rounded-full" />
          <span>SOC 2 Compliant</span>
          <div className="w-1 h-1 bg-white/40 rounded-full" />
          <span>99.9% Uptime</span>
        </motion.div>
      </motion.div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
