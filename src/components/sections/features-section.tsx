import PresenceAutomation from '@/components/presence-automation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const features = [
    "Real-time presence detection",
    "Configurable room zones",
    "Hardware-independent solution",
    "AI-powered automation logic",
    "Easy-to-use CLI for setup",
    "Scalable and efficient",
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="grid gap-16 md:grid-cols-2 md:gap-8">
        <div className="space-y-8">
          <div className="text-left">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Automate with Insight</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              VisionixAI transforms any camera into a smart sensor. Define zones within a room, and let our AI trigger actions based on who is where, and when.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Card className="flex flex-col bg-card/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Live Automation Demo</CardTitle>
            <CardDescription>Click on zones to simulate presence and see AI-driven responses.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <PresenceAutomation />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
