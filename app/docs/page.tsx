"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Code } from "lucide-react";

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]">
      {/* Background glows */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-[160px] z-0" />
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[160px] z-0" />
      {/* Navigation */}
     

      {/* Content */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-6">VisionixAI Documentation</h1>
          <p className="text-white/70 mb-12 leading-relaxed text-lg">
            Learn how to set up and use our powerful computer vision automation tool to create smart, responsive environments.
          </p>

          <div className="space-y-16">
            {/* Getting Started */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <p className="text-white/60 mb-6">
                Install the VisionixAI CLI to begin automating with computer vision.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-3 text-white/80">
                  <Code className="w-4 h-4" />
                  <span className="text-sm font-semibold">Install CLI</span>
                </div>
                <pre className="bg-white/5 p-4 rounded-md text-sm text-white/80 font-mono">
                  npm install -g @visionix/cli
                </pre>
              </div>
            </div>

            {/* Configuration */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
              <p className="text-white/60 mb-6">
                Configure your room zones and automation triggers using the CLI or configuration files.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-3 text-white/80">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-semibold">Example Configuration</span>
                </div>
                <pre className="bg-white/5 p-4 rounded-md text-sm text-white/80 font-mono overflow-x-auto">
{`{
  "zones": [
    { "id": 1, "name": "Living Room", "coords": [100, 100, 200, 200] },
    { "id": 2, "name": "Kitchen", "coords": [300, 100, 400, 200] }
  ],
  "triggers": [
    { "zoneId": 1, "action": "turn_on_light", "condition": "presence_detected" }
  ]
}`}
                </pre>
              </div>
            </div>

            {/* API Reference */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
              <p className="text-white/60 mb-6">
                Explore the VisionixAI CLI commands and API endpoints for advanced usage.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-lg">
                <div className="flex items-center gap-2 mb-3 text-white/80">
                  <Code className="w-4 h-4" />
                  <span className="text-sm font-semibold">CLI Commands</span>
                </div>
                <ul className="text-white/70 text-sm space-y-2 pl-4 list-disc">
                  <li>
                    <code className="text-white">visionix init</code> — Initialize a new project
                  </li>
                  <li>
                    <code className="text-white">visionix start</code> — Start the VisionixAI server
                  </li>
                  <li>
                    <code className="text-white">visionix config</code> — Manage configuration settings
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DocsPage;
