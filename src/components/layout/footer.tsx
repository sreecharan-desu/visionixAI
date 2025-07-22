import Link from 'next/link';
import { Bot, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="z-10 mt-20 w-full border-t border-border py-8">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} VisionixAI. All rights reserved.</p>
        </div>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="transition-colors hover:text-foreground">Documentation</Link>
          <Link href="https://github.com/VisionixAI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-foreground">
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <span className="hidden sm:inline">MIT License</span>
        </nav>
      </div>
    </footer>
  );
}
