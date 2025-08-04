export const markdownContent = `
# VisionixAI Technical Documentation

This document offers an in-depth technical exploration of **VisionixAI**, a sophisticated command-line tool engineered for **real-time pose detection** and **zone-based activity analysis** from video streams, tailored for applications such as **security monitoring**, **retail analytics**, and **interactive installations**.

---

## 1. System Overview

**VisionixAI** seamlessly integrates a **Node.js Command Line Interface (CLI)** with a **Python-based machine learning core** to process video streams, detect human poses, and monitor activity within predefined grid zones. Its robust design ensures scalability and ease of use for diverse real-world applications.

### Core Features
- **CLI-Driven Operation**: Execute analysis and setup with the intuitive \`visionix\` command, ideal for scripting and automation.
- **Automated Environment Setup**: Run \`visionix setup-ml\` once to configure a Python virtual environment and install all dependencies effortlessly.
- **Pose Detection**: Harnesses **Google's MediaPipe** to track **33 body landmarks** with high precision in real-time.
- **Grid-Based Zone Tracking**: Divides video frames into a customizable grid (e.g., 3x3) to monitor human presence in specific zones.
- **Real-Time Activity Triggering**: Dynamically reports zone status as **ON** (active) or **OFF** (inactive) based on a user-defined timeout, enabling event-driven workflows.
- **Visual Feedback**: Overlays the video with a grid, highlights detected pose landmarks, and provides real-time console output for zone status.

### Technology Stack
- **CLI & Orchestration**: *Node.js* with \`child_process\` for robust process management.
- **ML & Video Processing**: *Python 3* for high-performance computation.
- **Computer Vision**: *OpenCV* (\`cv2\`) for frame processing.
- **Pose Estimation**: *MediaPipe* for accurate landmark detection.

---

## 2. System Architecture

VisionixAI is built on two core components: the **Node.js CLI Layer** and the **Python ML Core**. The CLI provides a user-friendly interface and manages processes, while the Python core handles intensive video processing and machine learning tasks.

- **Node.js CLI Layer (\`cli/\`)**: Parses commands, validates inputs (e.g., file paths), and orchestrates Python script execution.
- **Python ML Core (\`ml-core/\`)**: Executes video analysis, pose detection, zone tracking, and generates output.

### High-Level Interaction
1. **User Terminal**: Initiates analysis with \`visionix analyze video.mp4\`.
2. **Node.js CLI Layer**:
   - \`visionix.js\` interprets the command and video path.
   - Spawns \`start.py\`, passing the video path.
3. **Python ML Core**:
   - \`start.py\` invokes \`app.py: run_stream\`.
   - Processes frames using **OpenCV** and **MediaPipe**.
   - Outputs pose data and zone status to \`stdout\`.
4. Results are displayed in the user terminal.

### Component Breakdown
| **File Path**                     | **Language** | **Role**                                                                 |
|-----------------------------------|--------------|-------------------------------------------------------------------------|
| \`cli/bin/visionix.js\`             | JavaScript   | **Main CLI Entry Point**: Handles \`analyze\` and \`setup-ml\` commands.     |
| \`cli/bin/scripts/setup-ml.js\`     | JavaScript   | **ML Environment Setup**: Configures virtual environment and dependencies. |
| \`cli/lib/runner.js\`               | JavaScript   | Utility for spawning Python processes with resolved paths.               |
| \`cli/ml-core/start.py\`            | Python       | **Bootstrapper**: Receives video path and triggers core ML script.       |
| \`cli/ml-core/app.py\`              | Python       | **Core ML Logic**: Manages video reading, pose detection, and output.    |

---

## 3. Execution Workflows

### Workflow 1: First-Time Environment Setup
A one-time setup ensures the Python environment is ready for analysis.

#### Steps
1. User executes \`visionix setup-ml\`.
2. \`visionix.js\` delegates to \`setup-ml.js\`.
3. \`setup-ml.js\` creates a virtual environment and installs dependencies via \`pip\`.
4. Terminal displays real-time setup progress.

### Workflow 2: Running a Video Analysis
1. **User**: Initiates \`visionix analyze ./path/to/video.mp4\`.
2. **CLI**:
   - Validates the \`analyze\` command and video file existence.
   - Spawns \`start.py\` with the video path.
3. **Python**:
   - Receives video path via \`sys.argv\`.
   - Calls \`app.py: run_stream\`.
4. **Core**:
   - Loads video using **OpenCV**.
   - For each frame:
     - Detects poses with **MediaPipe**.
     - Identifies active zones.
     - Updates \`zone_last_seen\` timestamps.
     - Evaluates inactive zones.
     - Outputs **ON/OFF** status to the terminal.
5. Process terminates upon video completion.

---

## 4. ML Core Deep Dive (\`app.py\`)

### Configuration Parameters
- **Grid Size**: Fully configurable (e.g., \`GRID_ROWS = 5\`, \`GRID_COLS = 5\`).
- **Timeout**: \`UNSEEN_TIMEOUT = 2\` seconds to mark zones as inactive.

### Pose Detection & Zone Mapping
- Frames are converted to RGB using **OpenCV**.
- **MediaPipe** processes frames to detect **33 body landmarks**.
- Landmarks are mapped to grid zones to track activity.

### State Logic
- **Inactive**: No landmarks detected in a zone.
- **Active**: Landmarks present in a zone.
- **Timeout**: Zones revert to inactive after \`UNSEEN_TIMEOUT\` seconds without activity.
- **Output**: Displays zone status (e.g., \`Zone {i}-{j} active → Trigger: ON\` or \`Zone {i}-{j} inactive for {elapsed}s → Trigger: OFF\`).

### Headless Mode (Optional)
- Disable GUI window output (e.g., \`cv2.imshow\`) for headless environments, optimizing resource usage.

---

## 5. CLI and Process Management

### CLI Entry Point: \`visionix.js\`
- Ensures \`start.py\` and input video file exist, exiting with an error if either is missing.

### Process Spawning
- Employs \`-u\` flag for unbuffered Python output.
- Streams output to the terminal using \`{ stdio: 'inherit' }\` for real-time feedback.

---

## 6. Troubleshooting

| **Issue**                       | **Cause**                          | **Solution**                                      |
|---------------------------------|------------------------------------|--------------------------------------------------|
| \`start.py not found\`            | File misplaced or path incorrect   | Verify \`start.py\` is in \`ml-core/\`.              |
| \`Input video not found\`         | Invalid video path                 | Use a valid relative or absolute path.           |
| \`ModuleNotFoundError: cv2\`      | Python environment not configured   | Execute \`visionix setup-ml\`.                     |
| \`Cannot open video\`             | Incompatible video format           | Convert video to a supported format (e.g., H.264). |

---

This enriched documentation delivers a comprehensive guide to **VisionixAI**, detailing its architecture, workflows, and troubleshooting for optimal performance.
`;