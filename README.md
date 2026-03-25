# Resume Score Analyzer (Frontend-only)

A modern, responsive React web application that allows users to upload a PDF resume, simulates a backend analysis process, and displays a mocked resume score alongside extracted keywords and actionable improvement suggestions.

## Features

- **Beautiful UI/UX**: Designed with a premium dark-themed glassmorphism aesthetic using vanilla CSS and CSS variables.
- **Drag-and-Drop Resume Upload**: A sleek file upload zone that strictly accepts PDF files, complete with active drag states and error handling.
- **Simulated Analysis Engine**: A mock loading state that beautifully mimics the process of parsing a PDF, extracting text, and generating a score over a few seconds.
- **Interactive Results Dashboard**: Displays a visual circular progress score (0-100), tags for extracted keywords, and a clean list of improvement suggestions.

## Tech Stack

- **Framework**: React 18 (Bootstrapped with Vite)
- **Styling**: Vanilla CSS (Global variables, CSS animations, responsive layouts)
- **Icons**: `lucide-react`
- **Architecture**: Functional components with hooks (`useState`, `useEffect`, `useCallback`, `useRef`).

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Execution

1. **Clone or Navigate to the Directory**:
   ```bash
   cd resume-score-analyzer
   ```

2. **Install Dependencies**:
   This project uses Vite and React. The primary external dependency is `lucide-react` for icons.
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **View in Browser**:
   Open [http://localhost:5173](http://localhost:5173) in your web browser.

## Logic Explanation

Because this is a **frontend-only** application, no real server is processing the PDF files, nor are any NLP (Natural Language Processing) operations actually being performed. The application logic is architected as a state machine with three core modes, driven by a mock backend utility.

### Flow State Machine (`App.jsx`)
The main application maintains an `appState` variable that transitions between three distinct views:
1. `'upload'`: Renders `<UploadSection />`. Listens for file inputs.
2. `'analyzing'`: Renders `<AnalysisLoading />`. Displays animated steps to indicate progress.
3. `'results'`: Renders `<ResultsDashboard />`. Displays the final output.

### The Mock Analyzer (`src/utils/mockAnalyzer.js`)
When a user uploads a valid PDF, the app triggers the `analyzeResumeMock(file)` function. 
- **Simulated Latency**: It wraps its logic inside a `setTimeout()` within a Promise, artificially delaying the response by 2.5 seconds to mimic network and processing time.
- **Mock Data Generation**: Instead of parsing the actual binary of the PDF, it generates a random score between 60 and 90 using `Math.random()`. The keywords and suggestions are currently returned from a static placeholder list to demonstrate how the UI binds to data.
