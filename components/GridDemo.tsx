
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function GridDemo({ currentGrid }:any) {
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
}
