# Chat Conversation

Note: _This is purely the output of the chat conversation and does not contain any raw data, codebase snippets, etc. used to generate the output._

### User Input

Create a clean and scalable folder structure for this React (Vite) project.

Inside src create:

components/
pages/
hooks/
utils/
data/

Inside pages create:

Landing.jsx
Setup.jsx
Interview.jsx
Report.jsx

Inside components create:

common/
landing/
setup/
interview/
report/

Do not add any UI yet.

Only create the folders and empty React functional components with default exports.

Keep App.jsx untouched for now.

_Listed directory [abtalks-hackathon](file:///Users/nityavishnoi/Desktop/abtalks-hackathon) _

_Listed directory [interview-ai](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai) _

_Listed directory [abtalks-hackathon](file:///Users/nityavishnoi/Desktop/abtalks-hackathon) _

_Listed directory [src](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src) _

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Listed directory [src](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src) _

_Listed directory [components](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components) _

_Listed directory [pages](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages) _

### Planner Response

I have created the requested folder structure inside `src` for your React (Vite) project:

### Folder Structure Created

```
src/
├── components/
│   ├── common/
│   ├── landing/
│   ├── setup/
│   ├── interview/
│   └── report/
├── pages/
│   ├── [Landing.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Landing.jsx)
│   ├── [Setup.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Setup.jsx)
│   ├── [Interview.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Interview.jsx)
│   └── [Report.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Report.jsx)
├── hooks/
├── utils/
└── data/
```

- Each page file (`Landing.jsx`, `Setup.jsx`, `Interview.jsx`, `Report.jsx`) contains an empty React functional component with a default export.
- `App.jsx` remains untouched.

### User Input

Build a modern Interview Setup page for my React + Vite + Tailwind CSS application.

Requirements:

Design Style:

- Premium SaaS dashboard
- Dark theme
- Minimal and elegant
- Inspired by Linear, Vercel, and Cursor
- Rounded corners
- Soft shadows
- Plenty of spacing
- Fully responsive

Layout:

- Center a glassmorphism card on the screen.
- Keep the background dark with subtle gradients.
- Display the project logo/name at the top.

Inside the card include:

1. Page Title
   "Setup Your Interview"

2. Subtitle
   "Configure your interview before you begin."

3. Candidate Name

- Text input
- Placeholder: Enter your name

4. Interview Role
   Dropdown with:

- AI Engineer
- Backend AI Engineer
- ML Engineer
- Startup Engineer

5. Difficulty Level
   Three selectable cards:

- Easy
- Medium
- Hard

Highlight the selected card.

6. Interview Focus
   Multi-select chips:

- Prompt Engineering
- RAG
- Vector Databases
- MCP
- Deployment
- System Design

7. Estimated Duration
   Display:
   Approximately 20 minutes

8. Primary Button
   "Start Interview"

Button should navigate to:
/interview

No backend.

No API calls.

No state management beyond simple local React state.

Use reusable components where possible.

Use Tailwind CSS only.

Do not implement interview functionality.
Focus only on UI and clean component structure.

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Viewed [Landing.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Landing.jsx) _

_Viewed [package.json](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/package.json) _

_Viewed [App.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/App.jsx) _

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_User accepted the command `npm run build`_

### User Input

save the changes

_User accepted the command `git status`_

_User accepted the command `git add . && git commit -m "Build modern Interview Setup page and components"`_

### Planner Response

All changes have been saved to disk and committed to Git on branch `nitya`.

### Summary of Saved & Committed Changes:

1. **Setup Page ([Setup.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Setup.jsx))**:
   - Dark glassmorphism card UI with ambient glowing background accents.
   - Candidate name text input field with placeholder.
   - Interview role dropdown (`AI Engineer`, `Backend AI Engineer`, `ML Engineer`, `Startup Engineer`).
   - Selectable difficulty cards (`Easy`, `Medium`, `Hard`) with highlight states.
   - Multi-select topic chips (`Prompt Engineering`, `RAG`, `Vector Databases`, `MCP`, `Deployment`, `System Design`).
   - Estimated duration indicator ("Approximately 20 minutes").
   - Primary **Start Interview** button navigating to `/interview`.

2. **Reusable Components**:
   - [Logo.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/common/Logo.jsx)
   - [CandidateInput.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/setup/CandidateInput.jsx)
   - [RoleSelect.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/setup/RoleSelect.jsx)
   - [DifficultySelector.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/setup/DifficultySelector.jsx)
   - [FocusSelector.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/setup/FocusSelector.jsx)

3. **Git Commit**: `Build modern Interview Setup page and components` (`36eb8bf`)

### User Input

run this

_User accepted the command `npm run dev`_

_Viewed [Logo.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/common/Logo.jsx) _

_User accepted the command `npm run dev`_

### Planner Response

The Vite development server has been launched in the background.

You can access your application at:

- **Local:** `http://localhost:5173/setup` (Setup Page)
- **Landing Page:** `http://localhost:5173/`

### User Input

link the bages

_Viewed [Landing.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Landing.jsx) _

_Viewed [Interview.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Interview.jsx) _

_Viewed [Report.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Report.jsx) _

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_User accepted the command `npm run build`_

_User accepted the command `git add . && git commit -m "Link all page routes with seamless navigation"`_

### Planner Response

All pages are now linked together with React Router:

### Navigation Flow

```mermaid
graph LR
    A["Landing (/)"] -->|"Get Started"| B["Setup (/setup)"]
    B -->|"Start Interview"| C["Interview (/interview)"]
    C -->|"Finish & View Report"| D["Report (/report)"]
    D -->|"Start New Interview"| B
    D -->|"Home"| A
```

1. **[Landing.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Landing.jsx) (`/`)**:
   - **"Get Started"** button navigates to `/setup`.

2. **[Setup.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Setup.jsx) (`/setup`)**:
   - **"Start Interview"** form submission navigates to `/interview`.
   - **Logo** click navigates back to `/`.

3. **[Interview.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Interview.jsx) (`/interview`)**:
   - **"Finish & View Report"** button navigates to `/report`.
   - **"← Back to Setup"** button navigates to `/setup`.

4. **[Report.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Report.jsx) (`/report`)**:
   - **"Start New Interview"** button navigates to `/setup`.
   - **"Home"** button navigates to `/`.

### User Input

Build the Interview Dashboard page for my React + Vite + Tailwind CSS application.

This is the main screen of the application.

Create a professional three-column layout.

LEFT SIDEBAR

- Interview progress card
- Candidate information
- Progress tracker (Question 1–8)
- Current topic badge
- Interview timer
- Interview completion percentage

CENTER

- AI interviewer conversation
- Question card
- Difficulty badge
- Topic badge
- Large multiline answer input
- Submit Answer button
- Thinking animation placeholder
- Follow-up question placeholder

RIGHT SIDEBAR

- Live Evaluation panel
- Technical Accuracy
- Reasoning
- Communication
- Problem Solving
- Confidence

Display evaluation as animated progress bars using placeholder values.

Everything should use mock data only.

Do NOT implement backend logic or APIs.

Use reusable components inside:

components/interview/

Suggested components:

ProgressSidebar.jsx

QuestionCard.jsx

AnswerInput.jsx

EvaluationPanel.jsx

Timer.jsx

TopicBadge.jsx

Use Tailwind CSS.

Dark premium theme.

Responsive desktop-first layout.

The page should resemble a real technical interview platform rather than a chatbot.

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_User accepted the command `npm run build`_

_User accepted the command `git add . && git commit -m "Build modern 3-column Interview Dashboard page and components"`_

### Planner Response

The **Interview Dashboard** page (`/interview`) has been implemented with a modern, dark SaaS aesthetic inspired by Linear, Vercel, and Cursor.

---

### Layout Breakdown

```
 ┌──────────────────────┬───────────────────────────────────────────┬──────────────────────┐
 │ LEFT SIDEBAR         │ CENTER COLUMN                             │ RIGHT SIDEBAR        │
 │ • Candidate Profile  │ • AI Interviewer Question Card            │ • Live AI Evaluation │
 │ • Progress Tracker   │   - Topic & Difficulty Badges             │   - Overall Score    │
 │   (Q1–Q8 Status)     │   - Formatted Code Context                │   - Metric Bars:     │
 │ • Active Topic Badge │   - Thinking / Pro Tip Indicators         │     * Accuracy (88%) │
 │ • Live Timer &       │ • Candidate Answer Workspace              │     * Reasoning (92%)│
 │   Percentage Bar     │   - Multiline Input (Cmd+Enter Submit)    │     * Comms (78%)    │
 └──────────────────────┴───────────────────────────────────────────┴──────────────────────┘
```

---

### Components Created in `src/components/interview/`

1. **[ProgressSidebar.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/ProgressSidebar.jsx)**:
   - Candidate Info (Avatar, Name, Role, Difficulty)
   - Active Topic Badge
   - Live Countdown Timer (`Timer.jsx`) & 37% Progress Bar
   - Question Step Tracker (Q1–Q8 status indicators with score tags)

2. **[QuestionCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/QuestionCard.jsx)**:
   - AI Interviewer Status Header ("AI Interviewer Active")
   - Question Prompt & Code/Context Box (`config_context.js`)
   - Thinking state indicator & Pro-Tip suggestions

3. **[AnswerInput.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/AnswerInput.jsx)**:
   - Multiline candidate technical answer workspace
   - Word/Character counter & `Cmd + Enter` submit shortcut
   - Submit button with gradient hover and simulated evaluation state

4. **[EvaluationPanel.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/EvaluationPanel.jsx)**:
   - Overall alignment score (`87 / 100`)
   - Animated score breakdown:
     - **Technical Accuracy**: `88%`
     - **Reasoning & Trade-offs**: `92%`
     - **Communication Clarity**: `78%`
     - **Problem Solving**: `85%`
     - **Confidence Score**: `90%`
   - Real-time feedback snippet box

5. **[Timer.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/Timer.jsx)** & **[TopicBadge.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/TopicBadge.jsx)**:
   - Reusable countdown clock & color-coded topic pill components.

### User Input

push to git also run dev

_User accepted the command `git push origin nitya`_

### Planner Response

### Git Push & Dev Server Status

1. **Git Push**:
   - Successfully pushed all commits to remote branch `nitya` at `https://github.com/nitya0859/abtalks-hackathon.git`.
   - Latest commit: `1bc37d4` (`Build modern 3-column Interview Dashboard page and components`).

2. **Dev Server**:
   - The Vite dev server is running live at:
     - **Setup Page:** `http://localhost:5173/setup`
     - **Interview Dashboard:** `http://localhost:5173/interview`
     - **Landing Page:** `http://localhost:5173/`

### User Input

Build the Interview Dashboard page for my React + Vite + Tailwind CSS project.

This page represents a live AI technical interview.

Focus ONLY on creating the layout and reusable components.

Do NOT implement backend logic, AI APIs, scoring logic, or chat functionality.

Use mock placeholder data.

---

Design Style

- Premium SaaS application
- Dark theme
- Inspired by Linear, Cursor and Vercel
- Clean spacing
- Rounded cards
- Glassmorphism panels
- Purple accent color
- Fully responsive (desktop first)

---

Layout

Create a three-column dashboard.

LEFT SIDEBAR (approximately 20%)

Contains:

• Candidate Profile Card - Candidate Name - Selected Role - Difficulty

• Interview Progress - Progress ring - Question 3 of 8

• Topic Timeline

Example:

✓ Prompt Engineering

✓ RAG

● Vector Database

○ MCP

○ Deployment

• Timer Card

20:00

---

CENTER (approximately 55%)

Main Interview Area

Create:

AI Interviewer Header

Question Card

Inside Question Card:

Question Number

Topic Badge

Difficulty Badge

Technical Question Placeholder

Large Answer Textarea

Character Counter

Submit Answer Button

Below it create:

Thinking State Card

"AI is analyzing your response..."

Follow-up Question Placeholder

---

RIGHT SIDEBAR (approximately 25%)

Live Evaluation Card

Show animated progress bars for

Technical Accuracy

Reasoning

Communication

Problem Solving

Confidence

Below it

Interview Notes

Example:

✓ Strong explanation

⚠ Missing trade-offs

✓ Good architecture

---

Create reusable components.

Suggested structure

components/interview/

CandidateCard.jsx

ProgressSidebar.jsx

TopicTimeline.jsx

QuestionCard.jsx

AnswerBox.jsx

EvaluationPanel.jsx

InterviewNotes.jsx

TimerCard.jsx

ThinkingCard.jsx

Use Tailwind CSS only.

Use placeholder values.

No API calls.

No business logic.

No chat implementation.

Only build a polished UI.

_User accepted the command `npm run dev`_

_User accepted the command `git add .`_

_User accepted the command `git commit -m "New features added"`_

_User accepted the command `git push`_

_Listed directory [interview](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview) _

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_User accepted the command `npm run build`_

_User accepted the command `git add . && git commit -m "Build Interview Dashboard with 3-column layout and modular components" && git push origin nitya`_

_User accepted the command `npm run dev`_

### Planner Response

The **Interview Dashboard** page (`/interview`) has been updated with the requested 3-column layout, purple accent design theme, and modular components.

---

### Component Architecture (`src/components/interview/`)

1. **Left Sidebar (~20%)**:
   - **[CandidateCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/CandidateCard.jsx)**: Candidate Name ("Alex Rivera"), Role ("AI Engineer"), Difficulty ("Medium").
   - **[ProgressSidebar.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/ProgressSidebar.jsx)**: Contains the circular SVG **Progress Ring** (37.5% / Question 3 of 8).
   - **[TopicTimeline.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/TopicTimeline.jsx)**:
     - `✓ Prompt Engineering`
     - `✓ RAG`
     - `● Vector Database` (Active)
     - `○ MCP`
     - `○ Deployment`
   - **[TimerCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/TimerCard.jsx)**: Live countdown timer card (`20:00`).

2. **Center Main Interview Area (~55%)**:
   - **[QuestionCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/QuestionCard.jsx)**: AI Senior Architect header, Question Number, Topic Badge ("Vector Database"), Difficulty Badge ("Medium"), and Technical Question.
   - **[AnswerBox.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/AnswerBox.jsx)**: Multiline technical answer workspace, character counter, and purple gradient "Submit Answer" button.
   - **[ThinkingCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/ThinkingCard.jsx)**:
     - "AI is analyzing your response..." card with spinner pulse.
     - Follow-up question probe placeholder box.

3. **Right Sidebar (~25%)**:
   - **[EvaluationPanel.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/EvaluationPanel.jsx)**: Live AI Evaluation card with progress bars for:
     - Technical Accuracy (`88%`)
     - Reasoning (`92%`)
     - Communication (`78%`)
     - Problem Solving (`85%`)
     - Confidence (`90%`)
   - **[InterviewNotes.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/InterviewNotes.jsx)**: Live bulleted feedback notes (`✓ Strong explanation`, `⚠ Missing trade-offs`, `✓ Good architecture`).

---

### Dev Server Status

The development server is running in the background at **`http://localhost:5173/interview`**.

### User Input

Build the Final Interview Report page for my React + Vite + Tailwind CSS application.

This page appears after the interview ends.

Do NOT implement backend logic.

Use placeholder data only.

---

Design Style

Premium SaaS

Dark Theme

Linear / Cursor / Vercel inspired

Professional

Elegant

Responsive

Rounded cards

Subtle animations

Purple accent

---

Layout

Top Section

Display

Interview Complete

Overall Score

Large circular score

Example

87%

Hiring Recommendation badge

One of

Strong Hire

Hire

Borderline

No Hire

---

SECTION 1

Performance Summary

Display five metrics

Technical Accuracy

Reasoning

Communication

Problem Solving

Confidence

Use animated progress bars.

---

SECTION 2

Topic Breakdown

Display cards

Prompt Engineering

RAG

Vector Database

MCP

Deployment

Each card shows

Score

Status

Strength

Weakness

---

SECTION 3

Strengths

Display green cards

Examples

Excellent reasoning

Strong architecture design

Clear communication

Good debugging approach

---

SECTION 4

Areas to Improve

Display amber cards

Examples

Need deeper deployment knowledge

Missed latency trade-offs

Weak vector indexing explanation

---

SECTION 5

AI Interview Timeline

Display timeline

Question 1

Good

Question 2

Excellent

Question 3

Needs Improvement

Question 4

Good

Question 5

Excellent

---

SECTION 6

Learning Roadmap

Display recommendation cards

Review

Prompt Engineering

Practice

Vector Databases

Study

Model Context Protocol

Complete

Deployment Module

---

SECTION 7

Interview Summary

Generate a short paragraph summarizing the interview.

Example

"You demonstrated strong architectural reasoning and system design skills. Your understanding of retrieval systems and vector databases is solid, but deployment strategies require additional practice."

---

Bottom Actions

Buttons

Download Report

Retake Interview

Back to Dashboard

---

Use reusable components

components/report/

OverallScoreCard.jsx

PerformanceChart.jsx

TopicCard.jsx

StrengthCard.jsx

WeaknessCard.jsx

TimelineCard.jsx

LearningRoadmap.jsx

SummaryCard.jsx

ActionButtons.jsx

Use Tailwind CSS.

Use mock placeholder data.

No APIs.

No backend.

Focus on making this page feel like a real technical interview assessment report.

_User accepted the command `git add .`_

_User accepted the command `git commit -m "feat: build interview dashboard layout"`_

_User accepted the command `git push `_

_Listed directory [report](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report) _

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_User accepted the command `npm run build`_

_User accepted the command `git add . && git commit -m "Build Final Interview Report page and components"`_

_User accepted the command `npm run dev`_

### Planner Response

The **Final Interview Report** page (`/report`) has been created with all 7 requested assessment sections and modular components.

---

### Component Architecture (`src/components/report/`)

1. **Top Section ([OverallScoreCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/OverallScoreCard.jsx))**:
   - Header: _"Interview Assessment Complete"_
   - Large Circular SVG Score Ring (`87%`)
   - Highlighted Hiring Recommendation Badge (**"Strong Hire"**)

2. **Executive Summary ([SummaryCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/SummaryCard.jsx))**:
   - _"You demonstrated strong architectural reasoning and system design skills. Your understanding of retrieval systems and vector databases is solid, but deployment strategies require additional practice."_

3. **Section 1: Performance Summary ([PerformanceChart.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/PerformanceChart.jsx))**:
   - Animated progress bars for:
     - Technical Accuracy (`88%`)
     - Reasoning (`92%`)
     - Communication (`78%`)
     - Problem Solving (`85%`)
     - Confidence (`90%`)

4. **Section 2: Topic Breakdown ([TopicCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/TopicCard.jsx))**:
   - Domain breakdown cards for _Prompt Engineering_, _RAG Architecture_, _Vector Database_, _Model Context Protocol_, and _Deployment & Infra_ displaying score, status, strength, and weakness.

5. **Section 3 & 4: Strengths & Areas to Improve ([StrengthCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/StrengthCard.jsx) & [WeaknessCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/WeaknessCard.jsx))**:
   - **Strengths (Emerald Cards)**: Excellent reasoning, Strong architecture design, Clear communication, Good debugging approach.
   - **Areas to Improve (Amber Cards)**: Need deeper deployment knowledge, Missed latency trade-offs, Weak vector indexing explanation.

6. **Section 5: AI Interview Timeline ([TimelineCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/TimelineCard.jsx))**:
   - Question-by-question rating pills (`Q1: Good`, `Q2: Excellent`, `Q3: Needs Improvement`, `Q4: Good`, `Q5: Excellent`).

7. **Section 6: Personalized Learning Roadmap ([LearningRoadmap.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/LearningRoadmap.jsx))**:
   - Actionable cards: `Review` (Prompt Engineering), `Practice` (Vector Databases), `Study` (Model Context Protocol), `Complete` (Deployment Module).

8. **Bottom Actions ([ActionButtons.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/ActionButtons.jsx))**:
   - **Download Report** (Print/PDF export trigger)
   - **Retake Interview** (Navigates to `/setup`)
   - **Back to Dashboard** (Navigates to `/`)

---

### Live Application URLs

- **Report Page:** `http://localhost:5173/report`
- **Interview Dashboard:** `http://localhost:5173/interview`
- **Setup Page:** `http://localhost:5173/setup`
- **Landing Page:** `http://localhost:5173/`

### User Input

Refactor the entire React + Tailwind CSS project to be fully responsive without changing the existing design or functionality.

Goals:

- Preserve the current desktop UI exactly.
- Improve responsiveness for tablets and mobile devices.
- Do not redesign the application.
- Do not remove or rename existing components.

Responsive Requirements:

Global

- Use a mobile-first approach.
- Replace fixed widths/heights with responsive Tailwind utilities.
- Use max-w-\* instead of fixed pixel widths where possible.
- Ensure no horizontal scrolling.
- Add proper spacing on small screens.

Landing Page

- Scale heading and text using responsive typography.
- Center all content on mobile.
- Ensure buttons span full width on small screens when appropriate.

Setup Page

- Form card should use max-w-md on mobile and max-w-2xl on desktop.
- Difficulty cards stack vertically on mobile, 2-column on tablets, 3-column on desktop.
- Interview focus chips wrap naturally.
- Inputs and buttons take full width on mobile.

Interview Dashboard
Desktop:

- Keep existing 3-column layout.

Tablet:

- Left sidebar collapses above the main content.
- Right evaluation panel moves below the interview area.

Mobile:

- Convert layout into a single column.
- Order:
  1. Candidate Card
  2. Progress
  3. Question
  4. Answer Box
  5. Submit Button
  6. Live Evaluation
  7. Interview Notes
  8. Timer

- Hide non-essential decorative elements.
- Make the textarea fill available width.
- Prevent cards from overflowing.
- Make progress bars responsive.

Report Page

- Convert metric cards into responsive grids.
- Stack sections vertically on mobile.
- Buttons become full width on small screens.
- Charts and progress bars resize correctly.

Tailwind Requirements

- Use responsive prefixes:
  sm:
  md:
  lg:
  xl:

- Use utilities such as:
  flex-col lg:flex-row
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  w-full
  max-w-\*
  px-4 md:px-8
  text-3xl md:text-5xl
  hidden lg:block

Do not add new features.
Do not modify business logic.
Do not change routing.
Only improve responsiveness while keeping the existing visual design.

_User accepted the command `git commit -m "feat: build interview assessment report"`_

_User accepted the command `git push`_

_Viewed [Landing.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Landing.jsx) _

_Edited relevant file_

_Viewed [DifficultySelector.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/setup/DifficultySelector.jsx) _

_Edited relevant file_

_Viewed [Setup.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Setup.jsx) _

_Edited relevant file_

_Viewed [Interview.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Interview.jsx) _

_Viewed [ProgressSidebar.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/ProgressSidebar.jsx) _

_Viewed [EvaluationPanel.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/interview/EvaluationPanel.jsx) _

_Edited relevant file_

_Edited relevant file_

_Viewed [OverallScoreCard.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/OverallScoreCard.jsx) _

_Edited relevant file_

_Edited relevant file_

_Viewed [ActionButtons.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/components/report/ActionButtons.jsx) _

_Viewed [Report.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Report.jsx) _

_Edited relevant file_

_User accepted the command `npm run build`_

_User accepted the command `git add . && git commit -m "Refactor project for 100% mobile, tablet, and desktop responsiveness"`_

_User accepted the command `npm run dev`_

### Planner Response

The entire application has been refactored for **100% full mobile, tablet, and desktop responsiveness** while preserving all existing component names, designs, and router paths.

---

### Key Responsiveness Enhancements

1. **Global & Layout Security**:
   - Replaced fixed pixel constraints with fluid Tailwind max-width utilities (`w-full`, `max-w-md`, `max-w-2xl`, `max-w-[1700px]`).
   - Added `overflow-x-hidden` to top containers to prevent horizontal scrolling on mobile viewports.
   - Scaled container padding seamlessly across screens (`px-4 sm:px-6 md:px-8`).

2. **Landing Page ([Landing.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Landing.jsx))**:
   - Scaled typography (`text-3xl sm:text-5xl md:text-6xl`).
   - Full-width call-to-action button on mobile (`w-full sm:w-auto`).

3. **Setup Page ([Setup.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Setup.jsx))**:
   - Setup card scales dynamically (`w-full max-w-md md:max-w-2xl`).
   - Difficulty selection cards stack 1-column on mobile, 2-column on tablet, and 3-column on desktop (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3`).
   - Focus chips wrap naturally on smaller viewports (`flex-wrap`).

4. **Interview Dashboard ([Interview.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Interview.jsx))**:
   - **Desktop (`lg:` / `xl:`)**: 3-column dashboard preserved.
   - **Tablet (`md:` to `lg:`)**: 2-column responsive layout with sidebars collapsing smoothly above and below the interview area.
   - **Mobile**: Single-column stack ordering Candidate Card → Progress Ring → Question Card → Answer Workspace → Live Evaluation → Interview Notes → Timer.

5. **Final Assessment Report ([Report.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Report.jsx))**:
   - Score ring and SVG metrics resize dynamically (`w-28 h-28 sm:w-36 sm:h-36`).
   - Metric cards adapt across `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`.
   - Action buttons become full-width on mobile (`w-full sm:w-auto`).

---

### Dev Server Status

The dev server is running live at **`http://localhost:5173/`**.

### User Input

Transform my existing React + Vite + Tailwind CSS AI Interview application from a static UI into a fully functional frontend prototype.

IMPORTANT:

- Keep the current UI exactly as it is.
- Do NOT redesign any page.
- Do NOT remove existing components.
- Build functionality on top of the existing UI.
- Use clean React architecture.
- Use Context API for global interview state.
- Use mock data only.
- No backend yet.

========================================

1. Global Interview Context

Create InterviewContext.jsx using React Context API.

Store:

candidate

currentQuestion

totalQuestions

selectedTopics

difficulty

role

answers

liveScores

interviewNotes

timeRemaining

interviewCompleted

Provide hooks to update every value.

========================================

2. Candidate Setup

When the user clicks "Start Interview"

Validate:

- Candidate Name required
- Role required
- At least one topic selected

Store everything inside InterviewContext.

Navigate automatically to /interview.

========================================

3. Question Engine

Create:

src/data/questions.js

Store 8 interview questions.

Each question contains:

id

topic

difficulty

curriculumDay

question

expectedConcepts

Example topics:

Prompt Engineering

RAG

Vector Database

MCP

Deployment

System Design

========================================

4. Dynamic Interview

Load questions one by one.

Display

Question 1 / 8

Question 2 / 8

...

After clicking Submit Answer

Save the answer

Move to the next question

Update sidebar progress

Update progress percentage

Update current topic

Do not reload the page.

========================================

5. Timer

Create a countdown timer starting at 20 minutes.

Decrease every second.

If timer reaches zero

Automatically finish interview

Navigate to Report page.

========================================

6. Live Evaluation

Use mock scoring.

After every submitted answer

Generate random but realistic values for

Technical Accuracy

Reasoning

Communication

Problem Solving

Confidence

Update progress bars smoothly.

========================================

7. Interview Notes

Generate one new note after every answer.

Examples:

✓ Good explanation

✓ Strong architecture reasoning

⚠ Missed edge cases

⚠ Could explain trade-offs better

Append notes dynamically.

========================================

8. Follow-up Questions

After every submitted answer

Display a simulated follow-up question related to the current topic.

Example:

"Can you explain why you selected HNSW instead of IVF?"

Allow the candidate to answer.

Then continue to the next main question.

========================================

9. Finish Interview

After Question 8

or

Timer reaches zero

Navigate automatically to

/report

========================================

10. Report Generation

Generate report dynamically from collected interview data.

Calculate

Overall Score

Average Technical Accuracy

Average Reasoning

Average Communication

Average Problem Solving

Average Confidence

Determine recommendation

Strong Hire

Hire

Borderline

No Hire

Generate

Strengths

Weaknesses

Learning Recommendations

Interview Summary

using the collected mock scores.

========================================

11. Project Structure

Create reusable folders

context/

data/

hooks/

utils/

Keep Interview.jsx clean.

Move business logic into hooks and utilities.

========================================

Do not implement AI APIs yet.

Everything should work using React state and mock data.

The application should behave like a real interview even before connecting to an LLM.

Do not change the visual design.

_User accepted the command `npm run dev`_

_User accepted the command `git add .`_

_User accepted the command `git commit -m "style: make application fully responsive"`_

_User accepted the command `git push`_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Edited relevant file_

_Viewed [App.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/App.jsx) _

_Edited relevant file_

_Viewed [Setup.jsx](file:///Users/nityavishnoi/Desktop/abtalks-hackathon/interview-ai/src/pages/Setup.jsx) _

_Edited relevant file_

### User Input

push it to git hub

### User Input

continue

Get responses tailored to you

Log in to get answers based on saved chats, plus create images and upload files.

Log in
This is a copy of a shared ChatGPT chat. It won't be added to memory.

Report conversation

Uploaded an image
first let us work on the dashboard this
let the interviewee have more exploration of skills and interview role like not only 2-3
it should also contain others like where the interviewee can type the role
skill set should have more of a variety
interview type should be according to the interviewee like one option should contain recommended then other can be set by the user also what he wants
include education in the dashboard

Uploaded an image
import {
createContext,
useContext,
useState,
useEffect,
} from "react";

import { interviewQuestions } from "../data/questions";
import { generateInterviewReport } from "../utils/reportGenerator";

const InterviewContext = createContext(null);

const DEFAULT_SCORES = {
accuracy: 85,
reasoning: 88,
communication: 80,
problemSolving: 84,
confidence: 86,
};

const INITIAL_NOTES = [
{
id: 1,
type: "success",
text: "Candidate initialized interview session",
},
];

export const InterviewProvider = ({ children }) => {
const [candidateName, setCandidateName] = useState("Alex Rivera");
const [role, setRole] = useState("AI Engineer");
const [difficulty, setDifficulty] = useState("Medium");

const [selectedTopics, setSelectedTopics] = useState([
"Prompt Engineering",
"RAG",
"System Design",
]);

const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

const [answers, setAnswers] = useState({});
const [followUpAnswers, setFollowUpAnswers] = useState({});

const [isFollowUpPhase, setIsFollowUpPhase] = useState(false);
const [isThinking, setIsThinking] = useState(false);

const [liveScores, setLiveScores] = useState(DEFAULT_SCORES);
const [scoreHistory, setScoreHistory] = useState([DEFAULT_SCORES]);

const [interviewNotes, setInterviewNotes] = useState(INITIAL_NOTES);

const [timeRemaining, setTimeRemaining] = useState(1200);
const [isTimerRunning, setIsTimerRunning] = useState(false);

const [interviewCompleted, setInterviewCompleted] = useState(false);

const totalQuestions = interviewQuestions.length;

const currentQuestion =
interviewQuestions[currentQuestionIndex] || interviewQuestions[0];

/\*

TIMER
\*/
useEffect(() => {
if (
!isTimerRunning ||
timeRemaining <= 0 ||
interviewCompleted
) {
return;
}
const interval = setInterval(() => {
setTimeRemaining((prev) => {
if (prev <= 1) {
clearInterval(interval);
setIsTimerRunning(false);
setInterviewCompleted(true);
return 0;
}

    return prev - 1;

});
}, 1000);

return () => clearInterval(interval);
}, [isTimerRunning, timeRemaining, interviewCompleted]);

/\*

SETUP INTERVIEW
\*/
const setupInterview = ({
candidateName: name,
role: selectedRole,
difficulty: selectedDifficulty,
selectedTopics: topics,
}) => {
setCandidateName(name.trim() || "Alex Rivera");
setRole(selectedRole || "AI Engineer");
setDifficulty(selectedDifficulty || "Medium");
setSelectedTopics(
topics.length > 0
? topics
: ["Prompt Engineering", "RAG"]
);

setCurrentQuestionIndex(0);

setAnswers({});
setFollowUpAnswers({});

setIsFollowUpPhase(false);
setIsThinking(false);

setLiveScores(DEFAULT_SCORES);
setScoreHistory([DEFAULT_SCORES]);

setInterviewNotes([
{
id: Date.now(),
type: "success",
text: `Session configured for ${name} (${selectedRole})`,
},
]);

setTimeRemaining(1200);
setIsTimerRunning(true);
setInterviewCompleted(false);
};

/\*

MOCK EVALUATION
This is intentionally local for now.
We can connect a real AI evaluator later.
_/
const generateMockScoresAndNotes = (
questionObj,
answerLength
) => {
const delta = (value) =>
Math.min(
98,
Math.max(
70,
value + Math.floor(Math.random() _ 9) - 4
)
);
const newScores = {
accuracy: delta(liveScores.accuracy),

reasoning: delta(liveScores.reasoning),

communication: Math.min(
96,
Math.max(
72,
liveScores.communication +
(answerLength > 150 ? 3 : -2)
)
),

problemSolving: delta(
liveScores.problemSolving
),

confidence: delta(
liveScores.confidence
),
};

const notesPool = [
{
type: "success",
text: `Strong explanation of ${
      questionObj.expectedConcepts?.[0] ||
      "core concepts"
    }`,
},

{
type: "success",
text: `Good reasoning for ${questionObj.topic}`,
},

{
type: "warning",
text: `Could explain ${
      questionObj.expectedConcepts?.[1] ||
      "trade-offs"
    } in more detail`,
},

{
type: "warning",
text: `Consider discussing edge cases in ${questionObj.topic}`,
},
];

const randomNote =
notesPool[
Math.floor(
Math.random() * notesPool.length
)
];

return {
newScores,
newNoteObj: {
id: Date.now() + Math.random(),
type: randomNote.type,
text: randomNote.text,
},
};
};

/\*

SUBMIT MAIN ANSWER
Flow:
Answer
↓
Thinking
↓
Follow-up
\*/
const submitAnswer = (answerText) => {
if (!answerText.trim() || isThinking) {
return;
}
// Start AI analysis
setIsThinking(true);

// Make sure follow-up is not visible during analysis
setIsFollowUpPhase(false);

setTimeout(() => {
// Save answer
setAnswers((prev) => ({
...prev,
[currentQuestion.id]: answerText,
}));

// Generate mock evaluation
const {
newScores,
newNoteObj,
} = generateMockScoresAndNotes(
currentQuestion,
answerText.length
);

setLiveScores(newScores);

setScoreHistory((prev) => [
...prev,
newScores,
]);

setInterviewNotes((prev) => [
newNoteObj,
...prev,
]);

// Analysis finished
setIsThinking(false);

// Now show follow-up
setIsFollowUpPhase(true);
}, 1200);
};

/\*

SUBMIT FOLLOW-UP
Flow:
Follow-up
↓
Next Question
\*/
const submitFollowUp = (followUpText = "") => {
if (followUpText.trim()) {
setFollowUpAnswers((prev) => ({
...prev,
[currentQuestion.id]: followUpText,
}));
}
// Hide follow-up
setIsFollowUpPhase(false);

// Final question
if (
currentQuestionIndex >=
totalQuestions - 1
) {
finishInterview();
return;
}

// Move to next question
setCurrentQuestionIndex(
(prev) => prev + 1
);
};

/\*

JUMP TO QUESTION
_/
const jumpToQuestion = (index) => {
if (
index >= 0 &&
index < totalQuestions
) {
setCurrentQuestionIndex(index);
setIsFollowUpPhase(false);
setIsThinking(false);
}
};
/_

FINISH
_/
const finishInterview = () => {
setIsTimerRunning(false);
setIsThinking(false);
setIsFollowUpPhase(false);
setInterviewCompleted(true);
};
/_

RESET
\*/
const resetInterview = () => {
setCurrentQuestionIndex(0);
setAnswers({});
setFollowUpAnswers({});

setIsFollowUpPhase(false);
setIsThinking(false);

setLiveScores(DEFAULT_SCORES);
setScoreHistory([DEFAULT_SCORES]);

setInterviewNotes(INITIAL_NOTES);

setTimeRemaining(1200);

setIsTimerRunning(false);
setInterviewCompleted(false);
};

/\*

REPORT
\*/
const getReport = () => {
return generateInterviewReport({
candidateName,
role,
difficulty,
liveScores,
scoreHistory,
answers,
followUpAnswers,
questions: interviewQuestions,
notes: interviewNotes,
});
};
return (
<InterviewContext.Provider
value={{
candidateName,
role,
difficulty,
selectedTopics,

    currentQuestionIndex,
    totalQuestions,
    currentQuestion,

    answers,
    followUpAnswers,

    isFollowUpPhase,
    isThinking,

    liveScores,
    scoreHistory,
    interviewNotes,

    timeRemaining,
    isTimerRunning,
    interviewCompleted,

    setupInterview,
    submitAnswer,
    submitFollowUp,
    jumpToQuestion,
    finishInterview,
    resetInterview,
    getReport,

}}

> {children}
> </InterviewContext.Provider>
> );
> };

export const useInterview = () => {
const context = useContext(InterviewContext);

if (!context) {
throw new Error(
"useInterview must be used within InterviewProvider"
);
}

return context;
};

export default InterviewContext;

Uploaded an image
this is like this
update the topic timeline
also live evaluation should be dynamic
interview notes should be dynamic interview progress % should also be dynamic

Uploaded an image
still the live evaluation is by default also interview notes not working properly like I m not answering right but still

Uploaded an image
initially this is already set
remove it let the candidate select it
give complete code for it

Uploaded an image
Uploaded an image
answering lame so how can one follow up

Uploaded an image
after the dashboard the next page is not loading

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image
Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image
Uploaded an image

Uploaded an image
red line???

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image
red line??

Uploaded an image
my terminal is like this now what?

Uploaded an image

Uploaded an image

Uploaded an image
Uploaded an image
the answers are not changing

Uploaded an image
Uploaded an image
Uploaded an image
Uploaded an image
Uploaded an image
the live evaluation is still waiting also the report after it is also static

Uploaded an image

Uploaded an image
Uploaded an image
Uploaded an image
Uploaded an image

Uploaded an image
Uploaded an image
okay so everything is fine
but what is this topic breakdown thing
also the last roadmap thing

Uploaded an image
is is by default dark mode not good looking irritating bright gradient very basic kinda

Uploaded a file
Uploaded an image
like this I want the landing page
off-white background like the image I showed u
then on it o want the name like that in the video animated
then get started button as npx shadcn@latest add https://registry.watermelon.sh/r/button-31.json

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image
animation is there

Uploaded an image

Uploaded an image
great work but bg is not clear can we enrich the colour or what

Uploaded an image
changes in index.css left rest done

Uploaded an image

Uploaded an image
Uploaded an image
Uploaded an image
Uploaded a file
Uploaded a file
firstly the whole dashboard is going too long
so make the layout as it looks cleaner, well defined and allover the page not just centered
it could be like this sticky notes kinda animation
next the uploading resume thing could be like folder gallery kinda
coming to bg it could be like grid kinda color u see contrasting to off-white
also dashboard colour should also be impressive
do not go completely in off-white

Uploaded an image
Uploaded an image
Uploaded an image
Uploaded an image
stunning but do u want any other change like with the color ig

Generated image: Evoke Interview Setup Dashboard
Generated image: Evoke Interview Setup Dashboard
Generated image: Evoke Interview Setup Dashboard

Generated image: Pastel Interview Configuration Dashboard
Generated image: Pastel Interview Configuration Dashboard
Generated image: Pastel Interview Configuration Dashboard

Generated image
Generated image
Generated image

Uploaded an image

Uploaded an image
leave that error
talking about the website

Uploaded an image
these r the interview components some of them we modified now what

Uploaded an image

Uploaded an image
the live evaluatoion dashboard is not showing
also
y is the finish interview button working without answering a specific number of questions

Uploaded an image

Uploaded an image
Uploaded an image
Uploaded an image

Uploaded an image

Uploaded an image
Uploaded an image
Uploaded an image
change its ui tell me the codes u need and send the the replace verse
also make it the way other pages looked

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image
now tell the changes in the lines

Uploaded an image
Uploaded an image

Uploaded an image
red line on 10th

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image

Uploaded an image
why is this dashboard here live evaluation one

Uploaded an image
do it what is wrong with the live evaluation dashboard

Uploaded an image
number of questions not updating also the topic panel too rest fine

Uploaded an image
where have the topics gone

Uploaded an image
also again the dashboard of live evaluation is stuck here

Talk short not this long man

Got you 😭 I’ll keep it short from now on.

Since it’s already committed:

git checkout HEAD~1 -- src/context/InterviewContext.jsx
git add src/context/InterviewContext.jsx
git commit -m "Restore interview context"
git push
Only the Context file gets restored. Your other frontend changes stay.

Then we’ll fix the UI only.

Oye don't u have it in ur memory

I have the recent project context, yes — including the earlier working InterviewContext.jsx you pasted.

But I don't have a guaranteed exact snapshot of every previous file/commit. The code you pasted before the last change is in our conversation, though, so we can reconstruct it without guessing.

And you're right: we should use that rather than making you redo things.

/_ eslint-disable react-refresh/only-export-components _/

import {
createContext,
useContext,
useEffect,
useMemo,
useState,
} from "react";

import { generateInterviewReport } from "../utils/reportGenerator";

const InterviewContext = createContext(null);

// ============================================================
// CONFIG
// ============================================================

const API_BASE_URL =
import.meta.env.VITE_API_URL ||
"http://localhost:5001";

// ============================================================
// INTERVIEW CONFIGURATION
// ============================================================

// Maximum number of MAIN questions.
// Follow-up questions do NOT count toward this limit.
const MAIN_QUESTION_LIMIT = 6;

// Minimum number of MAIN questions that must be answered
// before the candidate can manually finish.
const MINIMUM_ANSWERED_QUESTIONS = 3;

// Interview duration = 20 minutes
const INTERVIEW_DURATION = 1200;

// ============================================================
// DEFAULT SCORES
// ============================================================

const DEFAULT_SCORES = {
accuracy: 0,
reasoning: 0,
communication: 0,
problemSolving: 0,
confidence: 0,
};

// ============================================================
// EMPTY QUESTION
// ============================================================

const EMPTY_QUESTION = {
id: "loading-question",
topic: "Interview",
difficulty: "Medium",
question: "",
expectedConcepts: [],
isFollowUp: false,
};

// ============================================================
// API HELPER
// ============================================================

const apiRequest = async (endpoint, body) => {
const response = await fetch(
${API_BASE_URL}${endpoint},
{
method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    }

);

let data;

try {
data = await response.json();
} catch {
throw new Error(
"The AI server returned an invalid response."
);
}

if (!response.ok) {
throw new Error(
data?.error ||
AI request failed with status ${response.status}.
);
}

if (data?.success === false) {
throw new Error(
data?.error ||
"AI request failed."
);
}

return data;
};

// ============================================================
// QUESTION NORMALIZER
// ============================================================

const normalizeQuestion = (
rawQuestion,
index = 0,
isFollowUp = false
) => {
// ----------------------------------------------------------
// NO QUESTION
// ----------------------------------------------------------

if (!rawQuestion) {
return {
...EMPTY_QUESTION,

      id: question-${index + 1},

      isFollowUp: Boolean(isFollowUp),
    };

}

// ----------------------------------------------------------
// AI RETURNED A PLAIN STRING
// ----------------------------------------------------------

if (typeof rawQuestion === "string") {
return {
id: question-${index + 1},

      topic: isFollowUp
        ? "Follow-up"
        : "Technical",

      difficulty: "Medium",

      question: rawQuestion,

      expectedConcepts: [],

      // IMPORTANT:
      // The frontend controls whether this is a follow-up.
      isFollowUp: Boolean(isFollowUp),
    };

}

// ----------------------------------------------------------
// AI RETURNED AN OBJECT
// ----------------------------------------------------------

return {
id:
rawQuestion.id ||
question-${index + 1},

    topic:
      rawQuestion.topic ||
      rawQuestion.skill ||
      (isFollowUp
        ? "Follow-up"
        : "Technical"),

    difficulty:
      rawQuestion.difficulty ||
      "Medium",

    question:
      rawQuestion.question ||
      rawQuestion.text ||
      rawQuestion.prompt ||
      "",

    expectedConcepts:
      Array.isArray(
        rawQuestion.expectedConcepts
      )
        ? rawQuestion.expectedConcepts
        : [],

    // ========================================================
    // IMPORTANT FIX
    // ========================================================
    //
    // DO NOT trust rawQuestion.isFollowUp from the AI.
    //
    // The frontend explicitly decides:
    //
    // false -> MAIN QUESTION
    // true  -> FOLLOW-UP
    //
    // This prevents the first/main question from appearing
    // as "FOLLOW-UP".
    //
    isFollowUp: Boolean(isFollowUp),

};
};

// ============================================================
// SCORE NORMALIZER
// ============================================================

const normalizeScores = (evaluation) => {
if (!evaluation) {
return {
...DEFAULT_SCORES,
};
}

const scores =
evaluation.scores ||
evaluation;

const getScore = (...keys) => {
for (const key of keys) {
const value =
Number(scores?.[key]);

      if (Number.isFinite(value)) {
        return Math.max(
          0,
          Math.min(
            100,
            Math.round(value)
          )
        );
      }
    }

    return 0;

};

return {
accuracy: getScore(
"accuracy",
"technicalAccuracy",
"technical_accuracy"
),

    reasoning: getScore(
      "reasoning",
      "reasoningAbility",
      "reasoning_ability"
    ),

    communication: getScore(
      "communication",
      "clarity"
    ),

    problemSolving: getScore(
      "problemSolving",
      "problem_solving",
      "problemSolvingAbility"
    ),

    confidence: getScore(
      "confidence"
    ),

};
};

// ============================================================
// EVALUATION NORMALIZER
// ============================================================

const normalizeEvaluation = (
evaluation,
question
) => {
const scores =
normalizeScores(evaluation);

return {
questionId:
question?.id || "",

    question:
      question?.question || "",

    topic:
      question?.topic || "Technical",

    difficulty:
      question?.difficulty || "Medium",

    isFollowUp:
      Boolean(question?.isFollowUp),

    scores,

    feedback:
      evaluation?.feedback ||
      evaluation?.overallFeedback ||
      evaluation?.summary ||
      evaluation?.comment ||
      "",

    strengths:
      Array.isArray(
        evaluation?.strengths
      )
        ? evaluation.strengths
        : [],

    improvements:
      Array.isArray(
        evaluation?.improvements
      )
        ? evaluation.improvements
        : [],

    evaluatedAt:
      new Date().toISOString(),

};
};

// ============================================================
// EVALUATION NOTE
// ============================================================

const createEvaluationNote = (
evaluation,
question
) => {
const feedback =
evaluation?.feedback ||
evaluation?.overallFeedback ||
evaluation?.summary ||
evaluation?.comment;

const strengths =
Array.isArray(
evaluation?.strengths
)
? evaluation.strengths
: [];

const improvements =
Array.isArray(
evaluation?.improvements
)
? evaluation.improvements
: [];

let text = "";

if (feedback) {
text = feedback;
} else if (
strengths.length > 0
) {
text = Strong points: ${strengths.join(
", "
)};
} else if (
improvements.length > 0
) {
text = Areas to improve: ${improvements.join(
", "
)};
} else {
text = Answer evaluated for ${
question?.topic ||
"the current topic"
}.;
}

const scores =
normalizeScores(evaluation);

const scoreValues =
Object.values(scores);

const average =
scoreValues.length > 0
? scoreValues.reduce(
(sum, value) =>
sum + value,
0
) / scoreValues.length
: 0;

return {
id:
Date.now() +
Math.random(),

    type:
      average >= 75
        ? "success"
        : average >= 50
        ? "info"
        : "warning",

    text,

};
};

// ============================================================
// PROVIDER
// ============================================================

export const InterviewProvider = ({
children,
}) => {
// ==========================================================
// CANDIDATE PROFILE
// ==========================================================

const [candidateName, setCandidateName] =
useState("");

const [educationLevel, setEducationLevel] =
useState("");

const [degree, setDegree] =
useState("");

const [fieldOfStudy, setFieldOfStudy] =
useState("");

const [institution, setInstitution] =
useState("");

const [graduationYear, setGraduationYear] =
useState("");

// ==========================================================
// RESUME
// ==========================================================

const [resumeFile, setResumeFile] =
useState(null);

const [resumeText, setResumeText] =
useState("");

// ==========================================================
// INTERVIEW CONFIGURATION
// ==========================================================

const [role, setRole] =
useState("");

const [customRole, setCustomRole] =
useState("");

const [difficulty, setDifficulty] =
useState("Medium");

const [selectedTopics, setSelectedTopics] =
useState([]);

const [customSkills, setCustomSkills] =
useState([]);

const [interviewType, setInterviewType] =
useState("");

const [
customInterviewPrompt,
setCustomInterviewPrompt,
] = useState("");

// ==========================================================
// QUESTIONS
// ==========================================================

const [questions, setQuestions] =
useState([]);

const [
currentQuestionIndex,
setCurrentQuestionIndex,
] = useState(0);

// ==========================================================
// ANSWERS
// ==========================================================

const [answers, setAnswers] =
useState({});

const [
followUpAnswers,
setFollowUpAnswers,
] = useState({});

// ==========================================================
// INTERVIEW STATE
// ==========================================================

const [
isFollowUpPhase,
setIsFollowUpPhase,
] = useState(false);

const [isThinking, setIsThinking] =
useState(false);

// ==========================================================
// EVALUATION
// ==========================================================

const [liveScores, setLiveScores] =
useState({
...DEFAULT_SCORES,
});

/\*

- scoreHistory stores evaluations for MAIN questions only.
-
- Follow-ups can still receive AI evaluation and feedback,
- but they are NOT stored as independent report evaluations.
  \*/

const [scoreHistory, setScoreHistory] =
useState([]);

const [
latestEvaluation,
setLatestEvaluation,
] = useState(null);

const [interviewNotes, setInterviewNotes] =
useState([]);

// ==========================================================
// TIMER
// ==========================================================

const [timeRemaining, setTimeRemaining] =
useState(INTERVIEW_DURATION);

const [
isTimerRunning,
setIsTimerRunning,
] = useState(false);

// ==========================================================
// COMPLETION
// ==========================================================

const [
interviewCompleted,
setInterviewCompleted,
] = useState(false);

/\*

- Possible values:
-
- "completed"
- "early"
- "time_limit"
  \*/

const [
interviewCompletionReason,
setInterviewCompletionReason,
] = useState("");

// ==========================================================
// ERROR
// ==========================================================

const [interviewError, setInterviewError] =
useState("");

// ==========================================================
// DERIVED VALUES
// ==========================================================

const effectiveRole =
role === "Other"
? customRole
: role;

const allSelectedSkills =
useMemo(
() => [
...(Array.isArray(
selectedTopics
)
? selectedTopics
: []),

        ...(Array.isArray(
          customSkills
        )
          ? customSkills
          : []),
      ],
      [
        selectedTopics,
        customSkills,
      ]
    );

// ==========================================================
// TOTAL QUESTIONS
// ==========================================================

// Always six MAIN questions.
// Follow-ups do NOT count.
const totalQuestions =
MAIN_QUESTION_LIMIT;

// ==========================================================
// CURRENT QUESTION
// ==========================================================

const currentQuestion =
questions[
currentQuestionIndex
] || EMPTY_QUESTION;

// ==========================================================
// QUESTION COUNTS
// ==========================================================

// Number of MAIN questions generated so far.
const mainQuestionCount =
questions.filter(
(question) =>
!question?.isFollowUp
).length;

// ==========================================================
// ANSWERED MAIN QUESTIONS
// ==========================================================

const answeredMainQuestionCount =
questions.filter(
(question) => {
if (question?.isFollowUp) {
return false;
}

        const answer =
          answers?.[question.id];

        if (typeof answer === "string") {
          return answer.trim().length > 0;
        }

        if (
          answer &&
          typeof answer === "object"
        ) {
          if (
            typeof answer.answer ===
            "string"
          ) {
            return (
              answer.answer.trim().length >
              0
            );
          }

          if (
            typeof answer.text ===
            "string"
          ) {
            return (
              answer.text.trim().length >
              0
            );
          }
        }

        return false;
      }
    ).length;

// ==========================================================
// EVALUATED QUESTIONS
// ==========================================================

const evaluatedQuestionCount =
scoreHistory.length;

const hasEvaluation =
evaluatedQuestionCount > 0;

// ==========================================================
// TIMER
// ==========================================================

useEffect(() => {
if (
!isTimerRunning ||
timeRemaining <= 0 ||
interviewCompleted
) {
return;
}

    const interval =
      setInterval(() => {
        setTimeRemaining(
          (previous) => {
            if (previous <= 1) {
              setIsTimerRunning(false);

              setIsThinking(false);

              setIsFollowUpPhase(false);

              setInterviewCompletionReason(
                "time_limit"
              );

              setInterviewCompleted(
                true
              );

              return 0;
            }

            return previous - 1;
          }
        );
      }, 1000);

    return () =>
      clearInterval(interval);

}, [
isTimerRunning,
timeRemaining,
interviewCompleted,
]);

// ==========================================================
// SAVE EVALUATION
// ==========================================================

const saveEvaluation = (
evaluation,
question
) => {
const normalizedEvaluation =
normalizeEvaluation(
evaluation,
question
);

    // --------------------------------------------------------
    // LIVE SCORE
    // --------------------------------------------------------

    setLiveScores(
      normalizedEvaluation.scores
    );

    // --------------------------------------------------------
    // LATEST EVALUATION
    // --------------------------------------------------------

    setLatestEvaluation(
      normalizedEvaluation
    );

    // --------------------------------------------------------
    // SCORE HISTORY
    // --------------------------------------------------------

    // Follow-ups are evaluated for feedback,
    // but are NOT added to main question history.

    if (!question?.isFollowUp) {
      setScoreHistory(
        (previous) => [
          ...previous,
          normalizedEvaluation,
        ]
      );
    }

    // --------------------------------------------------------
    // NOTES
    // --------------------------------------------------------

    const note =
      createEvaluationNote(
        evaluation,
        question
      );

    setInterviewNotes(
      (previous) => [
        note,
        ...previous,
      ]
    );

    return normalizedEvaluation;

};

// ==========================================================
// SETUP INTERVIEW
// ==========================================================

const setupInterview = async ({
candidateName: name,

    educationLevel:
      selectedEducationLevel,

    degree: selectedDegree,

    fieldOfStudy:
      selectedFieldOfStudy,

    institution:
      selectedInstitution,

    graduationYear:
      selectedGraduationYear,

    resumeFile:
      selectedResumeFile,

    resumeText:
      extractedResumeText,

    resume,

    role: selectedRole,

    customRole:
      selectedCustomRole,

    difficulty:
      selectedDifficulty,

    selectedTopics:
      topics,

    customSkills:
      skills,

    interviewType:
      selectedInterviewType,

    customInterviewPrompt:
      selectedCustomPrompt,

}) => {
// --------------------------------------------------------
// CANDIDATE
// --------------------------------------------------------

    setCandidateName(
      name?.trim() || ""
    );

    setEducationLevel(
      selectedEducationLevel || ""
    );

    setDegree(
      selectedDegree || ""
    );

    setFieldOfStudy(
      selectedFieldOfStudy || ""
    );

    setInstitution(
      selectedInstitution?.trim() || ""
    );

    setGraduationYear(
      selectedGraduationYear || ""
    );

    // --------------------------------------------------------
    // RESUME
    // --------------------------------------------------------

    setResumeFile(
      selectedResumeFile ||
        resume ||
        null
    );

    setResumeText(
      extractedResumeText || ""
    );

    // --------------------------------------------------------
    // CONFIGURATION
    // --------------------------------------------------------

    setRole(
      selectedRole || ""
    );

    setCustomRole(
      selectedCustomRole?.trim() || ""
    );

    setDifficulty(
      selectedDifficulty || "Medium"
    );

    const normalizedTopics =
      Array.isArray(topics)
        ? topics
        : [];

    const normalizedSkills =
      Array.isArray(skills)
        ? skills
        : [];

    setSelectedTopics(
      normalizedTopics
    );

    setCustomSkills(
      normalizedSkills
    );

    setInterviewType(
      selectedInterviewType || ""
    );

    setCustomInterviewPrompt(
      selectedCustomPrompt?.trim() || ""
    );

    // --------------------------------------------------------
    // RESET QUESTIONS
    // --------------------------------------------------------

    setQuestions([]);

    setCurrentQuestionIndex(0);

    // --------------------------------------------------------
    // RESET ANSWERS
    // --------------------------------------------------------

    setAnswers({});

    setFollowUpAnswers({});

    // --------------------------------------------------------
    // RESET INTERVIEW STATE
    // --------------------------------------------------------

    setIsFollowUpPhase(false);

    setIsThinking(true);

    // --------------------------------------------------------
    // RESET EVALUATION
    // --------------------------------------------------------

    setLiveScores({
      ...DEFAULT_SCORES,
    });

    setScoreHistory([]);

    setLatestEvaluation(null);

    setInterviewNotes([]);

    // --------------------------------------------------------
    // RESET TIMER
    // --------------------------------------------------------

    setTimeRemaining(
      INTERVIEW_DURATION
    );

    setIsTimerRunning(true);

    // --------------------------------------------------------
    // RESET COMPLETION
    // --------------------------------------------------------

    setInterviewCompleted(false);

    setInterviewCompletionReason("");

    setInterviewError("");

    // --------------------------------------------------------
    // GENERATE FIRST QUESTION
    // --------------------------------------------------------

    try {
      const response =
        await apiRequest(
          "/api/interview/start",
          {
            candidateName:
              name?.trim() || "",

            role:
              selectedRole || "",

            customRole:
              selectedCustomRole?.trim() ||
              "",

            difficulty:
              selectedDifficulty ||
              "Medium",

            selectedTopics:
              normalizedTopics,

            customSkills:
              normalizedSkills,

            interviewType:
              selectedInterviewType ||
              "",

            customInterviewPrompt:
              selectedCustomPrompt?.trim() ||
              "",

            resumeText:
              extractedResumeText ||
              "",
          }
        );

      // IMPORTANT:
      // Explicitly mark first question as MAIN.
      const generatedQuestion =
        normalizeQuestion(
          response?.question,
          0,
          false
        );

      if (
        !generatedQuestion.question
      ) {
        throw new Error(
          "The AI did not return a valid interview question."
        );
      }

      setQuestions([
        generatedQuestion,
      ]);

      setCurrentQuestionIndex(0);

      setInterviewNotes([
        {
          id: Date.now(),

          type: "success",

          text:
            "Interview started. Your first question is based on your profile, resume and selected skills.",
        },
      ]);
    } catch (error) {
      console.error(
        "❌ Failed to start AI interview:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to generate the interview question."
      );

      setIsTimerRunning(false);

      setInterviewCompleted(false);
    } finally {
      setIsThinking(false);
    }

};

// ==========================================================
// SUBMIT MAIN ANSWER
// ==========================================================

const submitAnswer = async (
answerText
) => {
if (
!answerText?.trim() ||
isThinking ||
isFollowUpPhase ||
!currentQuestion?.question
) {
return;
}

    const trimmedAnswer =
      answerText.trim();

    const question =
      currentQuestion;

    // --------------------------------------------------------
    // SAVE ANSWER
    // --------------------------------------------------------

    setAnswers(
      (previous) => ({
        ...previous,

        [question.id]:
          trimmedAnswer,
      })
    );

    setIsThinking(true);

    setInterviewError("");

    try {
      // ------------------------------------------------------
      // AI EVALUATION
      // ------------------------------------------------------

      const evaluationResponse =
        await apiRequest(
          "/api/interview/evaluate",
          {
            candidateName,

            role:
              effectiveRole,

            difficulty,

            question:
              question.question,

            answer:
              trimmedAnswer,

            topic:
              question.topic,

            expectedConcepts:
              question.expectedConcepts,

            resumeText,

            selectedTopics:
              allSelectedSkills,
          }
        );

      const evaluation =
        evaluationResponse?.evaluation ||
        evaluationResponse;

      // ------------------------------------------------------
      // SAVE EVALUATION
      // ------------------------------------------------------

      saveEvaluation(
        evaluation,
        question
      );

      // ------------------------------------------------------
      // GENERATE FOLLOW-UP
      // ------------------------------------------------------

      let followUpQuestion =
        null;

      try {
        const followUpResponse =
          await apiRequest(
            "/api/interview/follow-up",
            {
              role:
                effectiveRole,

              question:
                question.question,

              answer:
                trimmedAnswer,

              topic:
                question.topic,

              difficulty,
            }
          );

        const rawFollowUp =
          followUpResponse?.followUp;

        if (rawFollowUp) {
          followUpQuestion =
            normalizeQuestion(
              rawFollowUp,
              questions.length,
              true
            );
        }
      } catch (followUpError) {
        console.warn(
          "⚠️ Follow-up generation failed:",
          followUpError
        );
      }

      // ------------------------------------------------------
      // SHOW FOLLOW-UP
      // ------------------------------------------------------

      if (
        followUpQuestion?.question
      ) {
        const followUpIndex =
          questions.length;

        setQuestions(
          (previous) => [
            ...previous,
            followUpQuestion,
          ]
        );

        setCurrentQuestionIndex(
          followUpIndex
        );

        setIsFollowUpPhase(true);
      } else {
        // ----------------------------------------------------
        // NO FOLLOW-UP
        // ----------------------------------------------------

        await generateNextQuestion(
          question,
          trimmedAnswer
        );
      }
    } catch (error) {
      console.error(
        "❌ Answer evaluation failed:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to evaluate your answer."
      );
    } finally {
      setIsThinking(false);
    }

};

// ==========================================================
// GENERATE NEXT MAIN QUESTION
// ==========================================================

const generateNextQuestion = async (
previousQuestion,
previousAnswerOverride = ""
) => {
const mainQuestions =
questions.filter(
(question) =>
!question?.isFollowUp
);

    // --------------------------------------------------------
    // ALL SIX MAIN QUESTIONS COMPLETED
    // --------------------------------------------------------

    if (
      mainQuestions.length >=
      MAIN_QUESTION_LIMIT
    ) {
      finishInterview();
      return;
    }

    setIsThinking(true);

    setInterviewError("");

    try {
      const response =
        await apiRequest(
          "/api/interview/start",
          {
            candidateName,

            role:
              effectiveRole,

            customRole,

            difficulty,

            selectedTopics:
              allSelectedSkills,

            customSkills,

            interviewType,

            customInterviewPrompt,

            resumeText,

            previousQuestion:
              previousQuestion?.question ||
              "",

            previousTopic:
              previousQuestion?.topic ||
              "",

            previousAnswer:
              previousAnswerOverride ||
              answers[
                previousQuestion?.id
              ] ||
              followUpAnswers[
                previousQuestion?.id
              ] ||
              "",

            // Main question number.
            questionNumber:
              mainQuestions.length + 1,
          }
        );

      // IMPORTANT:
      // Explicitly mark generated question as MAIN.
      const nextQuestion =
        normalizeQuestion(
          response?.question,
          questions.length,
          false
        );

      if (
        !nextQuestion.question
      ) {
        throw new Error(
          "The AI did not return the next question."
        );
      }

      const nextIndex =
        questions.length;

      setQuestions(
        (previous) => [
          ...previous,
          nextQuestion,
        ]
      );

      setCurrentQuestionIndex(
        nextIndex
      );

      setIsFollowUpPhase(false);
    } catch (error) {
      console.error(
        "❌ Failed to generate next question:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to generate the next question."
      );
    } finally {
      setIsThinking(false);
    }

};

// ==========================================================
// SUBMIT FOLLOW-UP
// ==========================================================

const submitFollowUp = async (
followUpText = ""
) => {
if (
!followUpText?.trim() ||
isThinking ||
!currentQuestion?.question
) {
return;
}

    const trimmedFollowUp =
      followUpText.trim();

    const followUpQuestion =
      currentQuestion;

    // --------------------------------------------------------
    // SAVE FOLLOW-UP ANSWER
    // --------------------------------------------------------

    setFollowUpAnswers(
      (previous) => ({
        ...previous,

        [followUpQuestion.id]:
          trimmedFollowUp,
      })
    );

    setIsThinking(true);

    setInterviewError("");

    try {
      // ------------------------------------------------------
      // EVALUATE FOLLOW-UP
      // ------------------------------------------------------

      const evaluationResponse =
        await apiRequest(
          "/api/interview/evaluate",
          {
            candidateName,

            role:
              effectiveRole,

            difficulty,

            question:
              followUpQuestion.question,

            answer:
              trimmedFollowUp,

            topic:
              followUpQuestion.topic,

            expectedConcepts:
              followUpQuestion.expectedConcepts,

            resumeText,

            selectedTopics:
              allSelectedSkills,
          }
        );

      const evaluation =
        evaluationResponse?.evaluation ||
        evaluationResponse;

      // ------------------------------------------------------
      // SAVE FOLLOW-UP EVALUATION
      // ------------------------------------------------------

      saveEvaluation(
        evaluation,
        followUpQuestion
      );

      setIsFollowUpPhase(false);

      // ------------------------------------------------------
      // CHECK MAIN QUESTION COUNT
      // ------------------------------------------------------

      const mainQuestions =
        questions.filter(
          (question) =>
            !question?.isFollowUp
        );

      if (
        mainQuestions.length >=
        MAIN_QUESTION_LIMIT
      ) {
        finishInterview();
        return;
      }

      // ------------------------------------------------------
      // GENERATE NEXT MAIN QUESTION
      // ------------------------------------------------------

      await generateNextQuestion(
        followUpQuestion,
        trimmedFollowUp
      );
    } catch (error) {
      console.error(
        "❌ Follow-up evaluation failed:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to evaluate the follow-up answer."
      );
    } finally {
      setIsThinking(false);
    }

};

// ==========================================================
// JUMP TO QUESTION
// ==========================================================

const jumpToQuestion = (
index
) => {
if (
index < 0 ||
index >= questions.length
) {
return;
}

    setCurrentQuestionIndex(
      index
    );

    const selectedQuestion =
      questions[index];

    setIsFollowUpPhase(
      Boolean(
        selectedQuestion?.isFollowUp
      )
    );

    setIsThinking(false);

    setInterviewError("");

};

// ==========================================================
// FINISH INTERVIEW
// ==========================================================

const finishInterview = () => {
// --------------------------------------------------------
// COUNT ANSWERED MAIN QUESTIONS
// --------------------------------------------------------

    const answeredCount =
      questions.filter(
        (question) => {
          if (question?.isFollowUp) {
            return false;
          }

          const answer =
            answers?.[question.id];

          if (typeof answer === "string") {
            return (
              answer.trim().length > 0
            );
          }

          if (
            answer &&
            typeof answer === "object"
          ) {
            if (
              typeof answer.answer ===
              "string"
            ) {
              return (
                answer.answer.trim()
                  .length > 0
              );
            }

            if (
              typeof answer.text ===
              "string"
            ) {
              return (
                answer.text.trim()
                  .length > 0
              );
            }
          }

          return false;
        }
      ).length;

    // --------------------------------------------------------
    // MANDATORY MINIMUM
    // --------------------------------------------------------

    if (
      answeredCount <
      MINIMUM_ANSWERED_QUESTIONS
    ) {
      console.warn(
        Interview requires at least ${MINIMUM_ANSWERED_QUESTIONS} answered main questions.
      );

      return false;
    }

    // --------------------------------------------------------
    // STOP INTERVIEW
    // --------------------------------------------------------

    setIsTimerRunning(false);

    setIsThinking(false);

    setIsFollowUpPhase(false);

    // --------------------------------------------------------
    // COMPLETION REASON
    // --------------------------------------------------------

    if (
      answeredCount >=
      MAIN_QUESTION_LIMIT
    ) {
      setInterviewCompletionReason(
        "completed"
      );
    } else {
      setInterviewCompletionReason(
        "early"
      );
    }

    setInterviewCompleted(true);

    return true;

};

// ==========================================================
// RESET INTERVIEW
// ==========================================================

const resetInterview = () => {
// --------------------------------------------------------
// CANDIDATE
// --------------------------------------------------------

    setCandidateName("");

    setEducationLevel("");

    setDegree("");

    setFieldOfStudy("");

    setInstitution("");

    setGraduationYear("");

    // --------------------------------------------------------
    // RESUME
    // --------------------------------------------------------

    setResumeFile(null);

    setResumeText("");

    // --------------------------------------------------------
    // CONFIGURATION
    // --------------------------------------------------------

    setRole("");

    setCustomRole("");

    setDifficulty("Medium");

    setSelectedTopics([]);

    setCustomSkills([]);

    setInterviewType("");

    setCustomInterviewPrompt("");

    // --------------------------------------------------------
    // QUESTIONS
    // --------------------------------------------------------

    setQuestions([]);

    setCurrentQuestionIndex(0);

    // --------------------------------------------------------
    // ANSWERS
    // --------------------------------------------------------

    setAnswers({});

    setFollowUpAnswers({});

    // --------------------------------------------------------
    // INTERVIEW STATE
    // --------------------------------------------------------

    setIsFollowUpPhase(false);

    setIsThinking(false);

    // --------------------------------------------------------
    // EVALUATION
    // --------------------------------------------------------

    setLiveScores({
      ...DEFAULT_SCORES,
    });

    setScoreHistory([]);

    setLatestEvaluation(null);

    setInterviewNotes([]);

    // --------------------------------------------------------
    // TIMER
    // --------------------------------------------------------

    setTimeRemaining(
      INTERVIEW_DURATION
    );

    setIsTimerRunning(false);

    // --------------------------------------------------------
    // COMPLETION
    // --------------------------------------------------------

    setInterviewCompleted(false);

    setInterviewCompletionReason("");

    setInterviewError("");

};

// ==========================================================
// REPORT
// ==========================================================

const getReport = () => {
return generateInterviewReport({
// ------------------------------------------------------
// BASIC
// ------------------------------------------------------

      candidateName,

      role: effectiveRole,

      difficulty,

      // ------------------------------------------------------
      // COMPLETION
      // ------------------------------------------------------

      interviewCompletionReason,

      answeredMainQuestionCount,

      // ------------------------------------------------------
      // SCORES
      // ------------------------------------------------------

      liveScores,

      scoreHistory,

      // ------------------------------------------------------
      // ANSWERS
      // ------------------------------------------------------

      answers,

      followUpAnswers,

      // ------------------------------------------------------
      // QUESTIONS
      // ------------------------------------------------------

      questions,

      // ------------------------------------------------------
      // NOTES
      // ------------------------------------------------------

      notes:
        interviewNotes,

      // ------------------------------------------------------
      // CANDIDATE PROFILE
      // ------------------------------------------------------

      educationLevel,

      degree,

      fieldOfStudy,

      institution,

      graduationYear,

      // ------------------------------------------------------
      // RESUME
      // ------------------------------------------------------

      resumeFile,

      resumeText,

      // ------------------------------------------------------
      // CONFIGURATION
      // ------------------------------------------------------

      selectedTopics,

      customSkills,

      interviewType,

      customInterviewPrompt,
    });

};

// ==========================================================
// PROVIDER VALUE
// ==========================================================

return (
<InterviewContext.Provider
value={{
// ====================================================
// CANDIDATE
// ====================================================

        candidateName,

        educationLevel,

        degree,

        fieldOfStudy,

        institution,

        graduationYear,

        // ====================================================
        // RESUME
        // ====================================================

        resumeFile,

        resumeText,

        // ====================================================
        // CONFIGURATION
        // ====================================================

        role,

        customRole,

        effectiveRole,

        difficulty,

        selectedTopics,

        customSkills,

        allSelectedSkills,

        interviewType,

        customInterviewPrompt,

        // ====================================================
        // QUESTIONS
        // ====================================================

        questions,

        currentQuestionIndex,

        totalQuestions,

        currentQuestion,

        mainQuestionCount,

        answeredMainQuestionCount,

        // ====================================================
        // ANSWERS
        // ====================================================

        answers,

        followUpAnswers,

        isFollowUpPhase,

        // ====================================================
        // AI STATE
        // ====================================================

        isThinking,

        interviewError,

        // ====================================================
        // EVALUATION
        // ====================================================

        liveScores,

        scoreHistory,

        latestEvaluation,

        hasEvaluation,

        evaluatedQuestionCount,

        interviewNotes,

        // ====================================================
        // TIMER
        // ====================================================

        timeRemaining,

        isTimerRunning,

        // ====================================================
        // COMPLETION
        // ====================================================

        interviewCompleted,

        interviewCompletionReason,

        minimumAnsweredQuestions:
          MINIMUM_ANSWERED_QUESTIONS,

        // ====================================================
        // ACTIONS
        // ====================================================

        setupInterview,

        submitAnswer,

        submitFollowUp,

        jumpToQuestion,

        finishInterview,

        resetInterview,

        getReport,
      }}
    >
      {children}
    </InterviewContext.Provider>

);
};

// ============================================================
// CUSTOM HOOK
// ============================================================

export const useInterview = () => {
const context =
useContext(
InterviewContext
);

if (!context) {
throw new Error(
"useInterview must be used within InterviewProvider"
);
}

return context;
};

export default InterviewContext;

Now change it acc to the requirement so the backend work
Without hampering the other functioning or anything else no change

Yes. I’ll not touch the backend request structure, endpoints, evaluation flow, follow-ups, scoring, timer, or report logic.

The only safe changes needed in this file are:

Keep isFollowUp controlled by frontend.

Keep selectedTopics and customSkills intact for backend.

Make API_BASE_URL deployment-safe so your backend still works when frontend is deployed.

Keep the question count based on 6 main questions, while follow-ups don't affect it.

Replace your InterviewContext.jsx with this
/_ eslint-disable react-refresh/only-export-components _/

import {
createContext,
useContext,
useEffect,
useMemo,
useState,
} from "react";

import { generateInterviewReport } from "../utils/reportGenerator";

const InterviewContext = createContext(null);

// ============================================================
// CONFIG
// ============================================================

const API_BASE_URL = (
import.meta.env.VITE_API_URL ||
"http://localhost:5001"
).replace(/\/$/, "");

// ============================================================
// INTERVIEW CONFIGURATION
// ============================================================

const MAIN_QUESTION_LIMIT = 6;

const MINIMUM_ANSWERED_QUESTIONS = 3;

const INTERVIEW_DURATION = 1200;

// ============================================================
// DEFAULT SCORES
// ============================================================

const DEFAULT_SCORES = {
accuracy: 0,
reasoning: 0,
communication: 0,
problemSolving: 0,
confidence: 0,
};

// ============================================================
// EMPTY QUESTION
// ============================================================

const EMPTY_QUESTION = {
id: "loading-question",
topic: "Interview",
difficulty: "Medium",
question: "",
expectedConcepts: [],
isFollowUp: false,
};

// ============================================================
// API HELPER
// ============================================================

const apiRequest = async (endpoint, body) => {
const response = await fetch(
`${API_BASE_URL}${endpoint}`,
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(body),
}
);

let data;

try {
data = await response.json();
} catch {
throw new Error(
"The AI server returned an invalid response."
);
}

if (!response.ok) {
throw new Error(
data?.error ||
`AI request failed with status ${response.status}.`
);
}

if (data?.success === false) {
throw new Error(
data?.error ||
"AI request failed."
);
}

return data;
};

// ============================================================
// QUESTION NORMALIZER
// ============================================================

const normalizeQuestion = (
rawQuestion,
index = 0,
isFollowUp = false
) => {
if (!rawQuestion) {
return {
...EMPTY_QUESTION,
id: `question-${index + 1}`,
isFollowUp: Boolean(isFollowUp),
};
}

// AI returned a plain string
if (typeof rawQuestion === "string") {
return {
id: `question-${index + 1}`,

      topic: isFollowUp
        ? "Follow-up"
        : "Technical",

      difficulty: "Medium",

      question: rawQuestion,

      expectedConcepts: [],

      // Frontend decides this.
      isFollowUp: Boolean(isFollowUp),
    };

}

return {
id:
rawQuestion.id ||
`question-${index + 1}`,

    topic:
      rawQuestion.topic ||
      rawQuestion.skill ||
      (isFollowUp
        ? "Follow-up"
        : "Technical"),

    difficulty:
      rawQuestion.difficulty ||
      "Medium",

    question:
      rawQuestion.question ||
      rawQuestion.text ||
      rawQuestion.prompt ||
      "",

    expectedConcepts:
      Array.isArray(
        rawQuestion.expectedConcepts
      )
        ? rawQuestion.expectedConcepts
        : [],

    // IMPORTANT:
    // Do not let the AI accidentally turn a MAIN
    // question into a follow-up.
    isFollowUp: Boolean(isFollowUp),

};
};

// ============================================================
// SCORE NORMALIZER
// ============================================================

const normalizeScores = (evaluation) => {
if (!evaluation) {
return {
...DEFAULT_SCORES,
};
}

const scores =
evaluation.scores ||
evaluation;

const getScore = (...keys) => {
for (const key of keys) {
const value =
Number(scores?.[key]);

      if (Number.isFinite(value)) {
        return Math.max(
          0,
          Math.min(
            100,
            Math.round(value)
          )
        );
      }
    }

    return 0;

};

return {
accuracy: getScore(
"accuracy",
"technicalAccuracy",
"technical_accuracy"
),

    reasoning: getScore(
      "reasoning",
      "reasoningAbility",
      "reasoning_ability"
    ),

    communication: getScore(
      "communication",
      "clarity"
    ),

    problemSolving: getScore(
      "problemSolving",
      "problem_solving",
      "problemSolvingAbility"
    ),

    confidence: getScore(
      "confidence"
    ),

};
};

// ============================================================
// EVALUATION NORMALIZER
// ============================================================

const normalizeEvaluation = (
evaluation,
question
) => {
const scores =
normalizeScores(evaluation);

return {
questionId:
question?.id || "",

    question:
      question?.question || "",

    topic:
      question?.topic || "Technical",

    difficulty:
      question?.difficulty || "Medium",

    isFollowUp:
      Boolean(question?.isFollowUp),

    scores,

    feedback:
      evaluation?.feedback ||
      evaluation?.overallFeedback ||
      evaluation?.summary ||
      evaluation?.comment ||
      "",

    strengths:
      Array.isArray(
        evaluation?.strengths
      )
        ? evaluation.strengths
        : [],

    improvements:
      Array.isArray(
        evaluation?.improvements
      )
        ? evaluation.improvements
        : [],

    evaluatedAt:
      new Date().toISOString(),

};
};

// ============================================================
// EVALUATION NOTE
// ============================================================

const createEvaluationNote = (
evaluation,
question
) => {
const feedback =
evaluation?.feedback ||
evaluation?.overallFeedback ||
evaluation?.summary ||
evaluation?.comment;

const strengths =
Array.isArray(
evaluation?.strengths
)
? evaluation.strengths
: [];

const improvements =
Array.isArray(
evaluation?.improvements
)
? evaluation.improvements
: [];

let text = "";

if (feedback) {
text = feedback;
} else if (strengths.length > 0) {
text = `Strong points: ${strengths.join(
      ", "
    )}`;
} else if (improvements.length > 0) {
text = `Areas to improve: ${improvements.join(
      ", "
    )}`;
} else {
text = `Answer evaluated for ${
      question?.topic ||
      "the current topic"
    }.`;
}

const scores =
normalizeScores(evaluation);

const scoreValues =
Object.values(scores);

const average =
scoreValues.length > 0
? scoreValues.reduce(
(sum, value) =>
sum + value,
0
) / scoreValues.length
: 0;

return {
id:
Date.now() +
Math.random(),

    type:
      average >= 75
        ? "success"
        : average >= 50
        ? "info"
        : "warning",

    text,

};
};

// ============================================================
// PROVIDER
// ============================================================

export const InterviewProvider = ({
children,
}) => {
// ==========================================================
// CANDIDATE PROFILE
// ==========================================================

const [candidateName, setCandidateName] =
useState("");

const [educationLevel, setEducationLevel] =
useState("");

const [degree, setDegree] =
useState("");

const [fieldOfStudy, setFieldOfStudy] =
useState("");

const [institution, setInstitution] =
useState("");

const [graduationYear, setGraduationYear] =
useState("");

// ==========================================================
// RESUME
// ==========================================================

const [resumeFile, setResumeFile] =
useState(null);

const [resumeText, setResumeText] =
useState("");

// ==========================================================
// INTERVIEW CONFIGURATION
// ==========================================================

const [role, setRole] =
useState("");

const [customRole, setCustomRole] =
useState("");

const [difficulty, setDifficulty] =
useState("Medium");

const [selectedTopics, setSelectedTopics] =
useState([]);

const [customSkills, setCustomSkills] =
useState([]);

const [interviewType, setInterviewType] =
useState("");

const [
customInterviewPrompt,
setCustomInterviewPrompt,
] = useState("");

// ==========================================================
// QUESTIONS
// ==========================================================

const [questions, setQuestions] =
useState([]);

const [
currentQuestionIndex,
setCurrentQuestionIndex,
] = useState(0);

// ==========================================================
// ANSWERS
// ==========================================================

const [answers, setAnswers] =
useState({});

const [
followUpAnswers,
setFollowUpAnswers,
] = useState({});

// ==========================================================
// INTERVIEW STATE
// ==========================================================

const [
isFollowUpPhase,
setIsFollowUpPhase,
] = useState(false);

const [isThinking, setIsThinking] =
useState(false);

// ==========================================================
// EVALUATION
// ==========================================================

const [liveScores, setLiveScores] =
useState({
...DEFAULT_SCORES,
});

const [scoreHistory, setScoreHistory] =
useState([]);

const [
latestEvaluation,
setLatestEvaluation,
] = useState(null);

const [interviewNotes, setInterviewNotes] =
useState([]);

// ==========================================================
// TIMER
// ==========================================================

const [timeRemaining, setTimeRemaining] =
useState(INTERVIEW_DURATION);

const [
isTimerRunning,
setIsTimerRunning,
] = useState(false);

// ==========================================================
// COMPLETION
// ==========================================================

const [
interviewCompleted,
setInterviewCompleted,
] = useState(false);

const [
interviewCompletionReason,
setInterviewCompletionReason,
] = useState("");

// ==========================================================
// ERROR
// ==========================================================

const [interviewError, setInterviewError] =
useState("");

// ==========================================================
// DERIVED VALUES
// ==========================================================

const effectiveRole =
role === "Other"
? customRole
: role;

const allSelectedSkills =
useMemo(
() => [
...(Array.isArray(selectedTopics)
? selectedTopics
: []),

        ...(Array.isArray(customSkills)
          ? customSkills
          : []),
      ],
      [
        selectedTopics,
        customSkills,
      ]
    );

// ==========================================================
// QUESTION VALUES
// ==========================================================

const totalQuestions =
MAIN_QUESTION_LIMIT;

const currentQuestion =
questions[
currentQuestionIndex
] || EMPTY_QUESTION;

const mainQuestionCount =
questions.filter(
(question) =>
!question?.isFollowUp
).length;

const answeredMainQuestionCount =
questions.filter(
(question) => {
if (question?.isFollowUp) {
return false;
}

        const answer =
          answers?.[question.id];

        if (typeof answer === "string") {
          return answer.trim().length > 0;
        }

        if (
          answer &&
          typeof answer === "object"
        ) {
          if (
            typeof answer.answer ===
            "string"
          ) {
            return (
              answer.answer.trim().length >
              0
            );
          }

          if (
            typeof answer.text ===
            "string"
          ) {
            return (
              answer.text.trim().length >
              0
            );
          }
        }

        return false;
      }
    ).length;

const evaluatedQuestionCount =
scoreHistory.length;

const hasEvaluation =
evaluatedQuestionCount > 0;

// ==========================================================
// TIMER
// ==========================================================

useEffect(() => {
if (
!isTimerRunning ||
timeRemaining <= 0 ||
interviewCompleted
) {
return;
}

    const interval =
      setInterval(() => {
        setTimeRemaining(
          (previous) => {
            if (previous <= 1) {
              setIsTimerRunning(false);
              setIsThinking(false);
              setIsFollowUpPhase(false);

              setInterviewCompletionReason(
                "time_limit"
              );

              setInterviewCompleted(true);

              return 0;
            }

            return previous - 1;
          }
        );
      }, 1000);

    return () =>
      clearInterval(interval);

}, [
isTimerRunning,
timeRemaining,
interviewCompleted,
]);

// ==========================================================
// SAVE EVALUATION
// ==========================================================

const saveEvaluation = (
evaluation,
question
) => {
const normalizedEvaluation =
normalizeEvaluation(
evaluation,
question
);

    setLiveScores(
      normalizedEvaluation.scores
    );

    setLatestEvaluation(
      normalizedEvaluation
    );

    if (!question?.isFollowUp) {
      setScoreHistory(
        (previous) => [
          ...previous,
          normalizedEvaluation,
        ]
      );
    }

    const note =
      createEvaluationNote(
        evaluation,
        question
      );

    setInterviewNotes(
      (previous) => [
        note,
        ...previous,
      ]
    );

    return normalizedEvaluation;

};

// ==========================================================
// SETUP INTERVIEW
// ==========================================================

const setupInterview = async ({
candidateName: name,
educationLevel:
selectedEducationLevel,
degree: selectedDegree,
fieldOfStudy:
selectedFieldOfStudy,
institution:
selectedInstitution,
graduationYear:
selectedGraduationYear,
resumeFile:
selectedResumeFile,
resumeText:
extractedResumeText,
resume,
role: selectedRole,
customRole:
selectedCustomRole,
difficulty:
selectedDifficulty,
selectedTopics:
topics,
customSkills:
skills,
interviewType:
selectedInterviewType,
customInterviewPrompt:
selectedCustomPrompt,
}) => {
setCandidateName(
name?.trim() || ""
);

    setEducationLevel(
      selectedEducationLevel || ""
    );

    setDegree(
      selectedDegree || ""
    );

    setFieldOfStudy(
      selectedFieldOfStudy || ""
    );

    setInstitution(
      selectedInstitution?.trim() || ""
    );

    setGraduationYear(
      selectedGraduationYear || ""
    );

    setResumeFile(
      selectedResumeFile ||
        resume ||
        null
    );

    setResumeText(
      extractedResumeText || ""
    );

    setRole(
      selectedRole || ""
    );

    setCustomRole(
      selectedCustomRole?.trim() || ""
    );

    setDifficulty(
      selectedDifficulty || "Medium"
    );

    const normalizedTopics =
      Array.isArray(topics)
        ? topics
        : [];

    const normalizedSkills =
      Array.isArray(skills)
        ? skills
        : [];

    // KEEP TOPICS EXACTLY AS SELECTED.
    // These are also sent to the backend.
    setSelectedTopics(
      normalizedTopics
    );

    setCustomSkills(
      normalizedSkills
    );

    setInterviewType(
      selectedInterviewType || ""
    );

    setCustomInterviewPrompt(
      selectedCustomPrompt?.trim() || ""
    );

    // Reset questions
    setQuestions([]);
    setCurrentQuestionIndex(0);

    // Reset answers
    setAnswers({});
    setFollowUpAnswers({});

    // Reset interview state
    setIsFollowUpPhase(false);
    setIsThinking(true);

    // Reset evaluation
    setLiveScores({
      ...DEFAULT_SCORES,
    });

    setScoreHistory([]);
    setLatestEvaluation(null);
    setInterviewNotes([]);

    // Reset timer
    setTimeRemaining(
      INTERVIEW_DURATION
    );

    setIsTimerRunning(true);

    // Reset completion
    setInterviewCompleted(false);
    setInterviewCompletionReason("");
    setInterviewError("");

    // ========================================================
    // FIRST QUESTION
    // ========================================================

    try {
      const response =
        await apiRequest(
          "/api/interview/start",
          {
            candidateName:
              name?.trim() || "",

            role:
              selectedRole || "",

            customRole:
              selectedCustomRole?.trim() ||
              "",

            difficulty:
              selectedDifficulty ||
              "Medium",

            selectedTopics:
              normalizedTopics,

            customSkills:
              normalizedSkills,

            interviewType:
              selectedInterviewType ||
              "",

            customInterviewPrompt:
              selectedCustomPrompt?.trim() ||
              "",

            resumeText:
              extractedResumeText ||
              "",
          }
        );

      const generatedQuestion =
        normalizeQuestion(
          response?.question,
          0,
          false
        );

      if (
        !generatedQuestion.question
      ) {
        throw new Error(
          "The AI did not return a valid interview question."
        );
      }

      setQuestions([
        generatedQuestion,
      ]);

      setCurrentQuestionIndex(0);

      setInterviewNotes([
        {
          id: Date.now(),
          type: "success",
          text:
            "Interview started. Your first question is based on your profile, resume and selected skills.",
        },
      ]);
    } catch (error) {
      console.error(
        "❌ Failed to start AI interview:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to generate the interview question."
      );

      setIsTimerRunning(false);
      setInterviewCompleted(false);
    } finally {
      setIsThinking(false);
    }

};

// ==========================================================
// SUBMIT MAIN ANSWER
// ==========================================================

const submitAnswer = async (
answerText
) => {
if (
!answerText?.trim() ||
isThinking ||
isFollowUpPhase ||
!currentQuestion?.question
) {
return;
}

    const trimmedAnswer =
      answerText.trim();

    const question =
      currentQuestion;

    setAnswers(
      (previous) => ({
        ...previous,
        [question.id]:
          trimmedAnswer,
      })
    );

    setIsThinking(true);
    setInterviewError("");

    try {
      // ======================================================
      // EVALUATE
      // ======================================================

      const evaluationResponse =
        await apiRequest(
          "/api/interview/evaluate",
          {
            candidateName,

            role:
              effectiveRole,

            difficulty,

            question:
              question.question,

            answer:
              trimmedAnswer,

            topic:
              question.topic,

            expectedConcepts:
              question.expectedConcepts,

            resumeText,

            selectedTopics:
              allSelectedSkills,
          }
        );

      const evaluation =
        evaluationResponse?.evaluation ||
        evaluationResponse;

      saveEvaluation(
        evaluation,
        question
      );

      // ======================================================
      // FOLLOW-UP
      // ======================================================

      let followUpQuestion =
        null;

      try {
        const followUpResponse =
          await apiRequest(
            "/api/interview/follow-up",
            {
              role:
                effectiveRole,

              question:
                question.question,

              answer:
                trimmedAnswer,

              topic:
                question.topic,

              difficulty,
            }
          );

        const rawFollowUp =
          followUpResponse?.followUp;

        if (rawFollowUp) {
          followUpQuestion =
            normalizeQuestion(
              rawFollowUp,
              questions.length,
              true
            );
        }
      } catch (followUpError) {
        console.warn(
          "⚠️ Follow-up generation failed:",
          followUpError
        );
      }

      // ======================================================
      // SHOW FOLLOW-UP
      // ======================================================

      if (
        followUpQuestion?.question
      ) {
        const followUpIndex =
          questions.length;

        setQuestions(
          (previous) => [
            ...previous,
            followUpQuestion,
          ]
        );

        setCurrentQuestionIndex(
          followUpIndex
        );

        setIsFollowUpPhase(true);
      } else {
        await generateNextQuestion(
          question,
          trimmedAnswer
        );
      }
    } catch (error) {
      console.error(
        "❌ Answer evaluation failed:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to evaluate your answer."
      );
    } finally {
      setIsThinking(false);
    }

};

// ==========================================================
// GENERATE NEXT MAIN QUESTION
// ==========================================================

const generateNextQuestion = async (
previousQuestion,
previousAnswerOverride = ""
) => {
const mainQuestions =
questions.filter(
(question) =>
!question?.isFollowUp
);

    if (
      mainQuestions.length >=
      MAIN_QUESTION_LIMIT
    ) {
      finishInterview();
      return;
    }

    setIsThinking(true);
    setInterviewError("");

    try {
      const response =
        await apiRequest(
          "/api/interview/start",
          {
            candidateName,

            role:
              effectiveRole,

            customRole,

            difficulty,

            selectedTopics:
              allSelectedSkills,

            customSkills,

            interviewType,

            customInterviewPrompt,

            resumeText,

            previousQuestion:
              previousQuestion?.question ||
              "",

            previousTopic:
              previousQuestion?.topic ||
              "",

            previousAnswer:
              previousAnswerOverride ||
              answers[
                previousQuestion?.id
              ] ||
              followUpAnswers[
                previousQuestion?.id
              ] ||
              "",

            questionNumber:
              mainQuestions.length + 1,
          }
        );

      const nextQuestion =
        normalizeQuestion(
          response?.question,
          questions.length,
          false
        );

      if (
        !nextQuestion.question
      ) {
        throw new Error(
          "The AI did not return the next question."
        );
      }

      const nextIndex =
        questions.length;

      setQuestions(
        (previous) => [
          ...previous,
          nextQuestion,
        ]
      );

      setCurrentQuestionIndex(
        nextIndex
      );

      setIsFollowUpPhase(false);
    } catch (error) {
      console.error(
        "❌ Failed to generate next question:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to generate the next question."
      );
    } finally {
      setIsThinking(false);
    }

};

// ==========================================================
// SUBMIT FOLLOW-UP
// ==========================================================

const submitFollowUp = async (
followUpText = ""
) => {
if (
!followUpText?.trim() ||
isThinking ||
!currentQuestion?.question
) {
return;
}

    const trimmedFollowUp =
      followUpText.trim();

    const followUpQuestion =
      currentQuestion;

    setFollowUpAnswers(
      (previous) => ({
        ...previous,
        [followUpQuestion.id]:
          trimmedFollowUp,
      })
    );

    setIsThinking(true);
    setInterviewError("");

    try {
      const evaluationResponse =
        await apiRequest(
          "/api/interview/evaluate",
          {
            candidateName,

            role:
              effectiveRole,

            difficulty,

            question:
              followUpQuestion.question,

            answer:
              trimmedFollowUp,

            topic:
              followUpQuestion.topic,

            expectedConcepts:
              followUpQuestion.expectedConcepts,

            resumeText,

            selectedTopics:
              allSelectedSkills,
          }
        );

      const evaluation =
        evaluationResponse?.evaluation ||
        evaluationResponse;

      saveEvaluation(
        evaluation,
        followUpQuestion
      );

      setIsFollowUpPhase(false);

      const mainQuestions =
        questions.filter(
          (question) =>
            !question?.isFollowUp
        );

      if (
        mainQuestions.length >=
        MAIN_QUESTION_LIMIT
      ) {
        finishInterview();
        return;
      }

      await generateNextQuestion(
        followUpQuestion,
        trimmedFollowUp
      );
    } catch (error) {
      console.error(
        "❌ Follow-up evaluation failed:",
        error
      );

      setInterviewError(
        error?.message ||
          "Unable to evaluate the follow-up answer."
      );
    } finally {
      setIsThinking(false);
    }

};

// ==========================================================
// JUMP TO QUESTION
// ==========================================================

const jumpToQuestion = (
index
) => {
if (
index < 0 ||
index >= questions.length
) {
return;
}

    setCurrentQuestionIndex(
      index
    );

    const selectedQuestion =
      questions[index];

    setIsFollowUpPhase(
      Boolean(
        selectedQuestion?.isFollowUp
      )
    );

    setIsThinking(false);
    setInterviewError("");

};

// ==========================================================
// FINISH INTERVIEW
// ==========================================================

const finishInterview = () => {
const answeredCount =
questions.filter(
(question) => {
if (question?.isFollowUp) {
return false;
}

          const answer =
            answers?.[question.id];

          if (typeof answer === "string") {
            return (
              answer.trim().length > 0
            );
          }

          if (
            answer &&
            typeof answer === "object"
          ) {
            if (
              typeof answer.answer ===
              "string"
            ) {
              return (
                answer.answer.trim()
                  .length > 0
              );
            }

            if (
              typeof answer.text ===
              "string"
            ) {
              return (
                answer.text.trim()
                  .length > 0
              );
            }
          }

          return false;
        }
      ).length;

    if (
      answeredCount <
      MINIMUM_ANSWERED_QUESTIONS
    ) {
      console.warn(
        `Interview requires at least ${MINIMUM_ANSWERED_QUESTIONS} answered main questions.`
      );

      return false;
    }

    setIsTimerRunning(false);
    setIsThinking(false);
    setIsFollowUpPhase(false);

    if (
      answeredCount >=
      MAIN_QUESTION_LIMIT
    ) {
      setInterviewCompletionReason(
        "completed"
      );
    } else {
      setInterviewCompletionReason(
        "early"
      );
    }

    setInterviewCompleted(true);

    return true;

};

// ==========================================================
// RESET INTERVIEW
// ==========================================================

const resetInterview = () => {
setCandidateName("");
setEducationLevel("");
setDegree("");
setFieldOfStudy("");
setInstitution("");
setGraduationYear("");

    setResumeFile(null);
    setResumeText("");

    setRole("");
    setCustomRole("");
    setDifficulty("Medium");
    setSelectedTopics([]);
    setCustomSkills([]);
    setInterviewType("");
    setCustomInterviewPrompt("");

    setQuestions([]);
    setCurrentQuestionIndex(0);

    setAnswers({});
    setFollowUpAnswers({});

    setIsFollowUpPhase(false);
    setIsThinking(false);

    setLiveScores({
      ...DEFAULT_SCORES,
    });

    setScoreHistory([]);
    setLatestEvaluation(null);
    setInterviewNotes([]);

    setTimeRemaining(
      INTERVIEW_DURATION
    );

    setIsTimerRunning(false);

    setInterviewCompleted(false);
    setInterviewCompletionReason("");
    setInterviewError("");

};

// ==========================================================
// REPORT
// ==========================================================

const getReport = () => {
return generateInterviewReport({
candidateName,
role: effectiveRole,
difficulty,

      interviewCompletionReason,
      answeredMainQuestionCount,

      liveScores,
      scoreHistory,

      answers,
      followUpAnswers,

      questions,

      notes: interviewNotes,

      educationLevel,
      degree,
      fieldOfStudy,
      institution,
      graduationYear,

      resumeFile,
      resumeText,

      selectedTopics,
      customSkills,
      interviewType,
      customInterviewPrompt,
    });

};

// ==========================================================
// PROVIDER VALUE
// ==========================================================

return (
<InterviewContext.Provider
value={{
candidateName,
educationLevel,
degree,
fieldOfStudy,
institution,
graduationYear,

        resumeFile,
        resumeText,

        role,
        customRole,
        effectiveRole,
        difficulty,

        // IMPORTANT:
        // Keep these available to the UI AND backend.
        selectedTopics,
        customSkills,
        allSelectedSkills,

        interviewType,
        customInterviewPrompt,

        questions,
        currentQuestionIndex,
        totalQuestions,
        currentQuestion,
        mainQuestionCount,
        answeredMainQuestionCount,

        answers,
        followUpAnswers,
        isFollowUpPhase,

        isThinking,
        interviewError,

        liveScores,
        scoreHistory,
        latestEvaluation,
        hasEvaluation,
        evaluatedQuestionCount,
        interviewNotes,

        timeRemaining,
        isTimerRunning,

        interviewCompleted,
        interviewCompletionReason,

        minimumAnsweredQuestions:
          MINIMUM_ANSWERED_QUESTIONS,

        setupInterview,
        submitAnswer,
        submitFollowUp,
        jumpToQuestion,
        finishInterview,
        resetInterview,
        getReport,
      }}
    >
      {children}
    </InterviewContext.Provider>

);
};

// ============================================================
// CUSTOM HOOK
// ============================================================

export const useInterview = () => {
const context =
useContext(
InterviewContext
);

if (!context) {
throw new Error(
"useInterview must be used within InterviewProvider"
);
}

return context;
};

export default InterviewContext;
Important
Do not change your backend endpoints. These remain exactly:

POST /api/interview/start
POST /api/interview/evaluate
POST /api/interview/follow-up
And your frontend still sends the same backend data.

Also, the Live Evaluation dashboard appearing automatically is NOT caused by this Context file. That is controlled by Interview.jsx because it directly renders:

<EvaluationPanel />
So don't modify the backend/context to fix that particular UI issue.
