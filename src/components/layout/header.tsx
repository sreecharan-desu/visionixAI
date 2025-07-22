"use client";

import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Header() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight font-headline">VisionixAI</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#features" onClick={handleNavClick} className="text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#demo" onClick={handleNavClick} className="text-muted-foreground transition-colors hover:text-foreground">
            Demo
          </a>
          <a href="#docs" onClick={handleNavClick} className="text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
}
