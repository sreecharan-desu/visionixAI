
export default function Footer() {
  return (
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
  );
}
