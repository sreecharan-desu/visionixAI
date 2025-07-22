import AnimatedGridBackground from '@/components/animated-grid-background';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import CliDemoSection from '@/components/sections/cli-demo-section';
import FeaturesSection from '@/components/sections/features-section';
import HeroSection from '@/components/sections/hero-section';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-background font-body text-foreground">
      <AnimatedGridBackground />
      <Header />
      <main className="z-10 mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <CliDemoSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
