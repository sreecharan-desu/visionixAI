
# VisionixAI

**Zone-Based Computer Vision Automation**  
Smart actions through visual presence detection — no sensors, just sight.

---

## Overview

**VisionixAI** is a computer vision automation platform that detects human presence in spatial zones and automates device control — without relying on physical sensors like PIR or IR.

Designed for classrooms, offices, and smart spaces, VisionixAI helps conserve energy by automatically controlling devices based on human presence in predefined zones.

---

## How It Works

1. Divide a physical space into grid-based visual zones.
2. Stream video input via the CLI or connected camera.
3. Detect human presence in each zone using AI models.
4. Trigger device actions based on occupancy state.

Example: If a zone remains unoccupied for a few seconds, lights and fans are turned off. When someone enters, power is restored.

---

## Components (In Development)

| Component      | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| CLI Tool       | Streams video, detects zones, and emits presence signals.                  |
| Core CV Model  | Real-time zone occupancy detection using YOLO or MediaPipe.                |
| API Layer      | REST API to enable integrations with apps, dashboards, and IoT hardware.   |

---

## Use Cases

- Smart classrooms that shut down systems when students leave.
- Office environments with automated lighting per room or desk.
- Integration with IoT systems for real-time, camera-based presence detection.

---

## Tech Stack

- Computer Vision: YOLOv8, MediaPipe
- Backend: Python / Node.js (API layer)
- CLI Tool: Node.js or Shell-based interface
- DevOps: Dockerized pipeline and CI workflows

---

## Installation & Usage (Coming Soon)

