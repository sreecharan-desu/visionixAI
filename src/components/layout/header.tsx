import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight font-headline">VisionixAI</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#demo" className="text-muted-foreground transition-colors hover:text-foreground">
            Demo
          </Link>
          <Link href="#docs" className="text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
