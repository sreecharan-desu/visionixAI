"use client";

import { presenceBasedAutomation, PresenceBasedAutomationInput } from "@/ai/flows/presence-based-automation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, Zap } from "lucide-react";
import { useCallback, useState, useTransition, useEffect } from "react";

const ZONES_GRID_SIZE = 4;
const totalZones = ZONES_GRID_SIZE * ZONES_GRID_SIZE;

const preProgrammedResponses = [
  { zoneId: "zone-0", response: "Activate Projector" },
  { zoneId: "zone-1", response: "Dim Lights" },
  { zoneId: "zone-2", response: "Start Presentation" },
  { zoneId: "zone-3", response: "Turn on Whiteboard" },
  { zoneId: "zone-4", response: "Adjust Thermostat to 21°C" },
  { zoneId: "zone-5", response: "Play Focus Music" },
  { zoneId: "zone-6", response: "Lock the door" },
  { zoneId: "zone-7", response: "Send notification to staff" },
  { zoneId: "zone-8", response: "Activate Welcome Screen" },
  { zoneId: "zone-9", response: "Log entry in security system" },
  { zoneId: "zone-10", response: "Start recording" },
  { zoneId: "zone-11", response: "Enable microphone array" },
  { zoneId: "zone-12", response: "Close blinds" },
  { zoneId: "zone-13", response: "Open blinds" },
  { zoneId: "zone-14", response: "Show agenda on screen" },
  { zoneId: "zone-15", response: "Power on conference system" },
];

type Zone = {
  zoneId: string;
  isPresent: boolean;
};

export default function AutomatedPresence() {
  const [zones, setZones] = useState<Zone[]>(
    Array.from({ length: totalZones }, (_, i) => ({ zoneId: `zone-${i}`, isPresent: false }))
  );
  const [triggeredResponses, setTriggeredResponses] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const runAutomation = useCallback((currentZones: Zone[]) => {
    if (currentZones.every(z => !z.isPresent)) return;
    startTransition(async () => {
      const input: PresenceBasedAutomationInput = {
        zoneDetections: currentZones,
        preProgrammedResponses: preProgrammedResponses,
      };
      const result = await presenceBasedAutomation(input);
      setTriggeredResponses(result.triggeredResponses);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prevZones => {
        const newZones = [...prevZones];
        const randomIndex = Math.floor(Math.random() * totalZones);
        newZones[randomIndex] = {
          ...newZones[randomIndex],
          isPresent: !newZones[randomIndex].isPresent,
        };
        return newZones;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    runAutomation(zones);
  }, [zones, runAutomation]);


  return (
    <div className="flex h-full flex-col gap-4">
      <div className={`grid grid-cols-4 gap-2`}>
        {zones.map((zone) => (
          <motion.div
            key={zone.zoneId}
            className={cn(
              "relative aspect-square rounded-md border-2 transition-colors",
              zone.isPresent
                ? "border-primary bg-primary/20"
                : "border-border bg-transparent"
            )}
          >
            <AnimatePresence>
            {zone.isPresent && (
                <motion.div 
                    className="flex h-full w-full items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                >
                    <Zap className="h-6 w-6 text-primary" />
                </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <div className="flex-grow rounded-lg border border-dashed border-border bg-background p-4">
        <div className="flex items-center justify-between">
            <h4 className="font-semibold text-muted-foreground">Triggered Responses</h4>
        </div>
        <div className="mt-2 h-32 overflow-y-auto">
            {isPending && triggeredResponses.length === 0 ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                <span>Analyzing presence...</span>
            </div>
            ) : triggeredResponses.length > 0 ? (
            <ul className="space-y-2">
                {triggeredResponses.map((response, index) => (
                <motion.li
                    key={index}
                    className="flex items-center gap-2 text-sm text-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Zap className="h-4 w-4 text-accent" />
                    <span>{response}</span>
                </motion.li>
                ))}
            </ul>
            ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                <p className="text-sm">No presence detected. Waiting for activity...</p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
