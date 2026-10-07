# AscendX 🚀
### AI-Powered Adaptive Learning & Interactive Education Dashboard

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**AscendX** is a modern, responsive, and intelligent educational platform designed to elevate self-paced learning. Combining interactive multilingual textbook readers, AI-powered quiz engines, real-time progress analytics, and class scheduling, AscendX provides students with an adaptive environment tailored to their academic growth.

---

## 🌟 Key Features

### 📊 1. Intelligent Learning Dashboard
- **Key Metrics & Trends**: Track learning hours, enrolled courses, completed quizzes, and proficiency level with month-over-month trend indicators.
- **Weekly Progress & Skill Radar**: Visualize study time distribution and multi-dimensional language/subject proficiency using interactive Recharts charts.
- **Study Streak Tracker**: Visual daily habit tracker motivating consistent study momentum.
- **Quick-Action AI Quiz Widget**: One-click access to daily quizzes, targeted practice drills, and custom AI assessments.

### 📚 2. Multilingual NCERT Curriculum & E-Reader
- **Extensive Textbook Catalog**: Access categorized NCERT textbooks spanning Classes 6–12 across multiple languages (English, Hindi, Sanskrit, Urdu, etc.) and subjects (Mathematics, Science, Social Sciences, Languages).
- **Interactive Chapter Reader**: Read curriculum chapters with responsive table-of-contents navigation, instant text search, and chapter bookmarks.
- **Integrated Text-to-Speech (TTS)**: Built-in audio narration powered by the Web Speech API with play, pause, resume, and rate controls.
- **Chapter Assessments**: Integrated end-of-chapter quizzes testing concept retention.

### 🧠 3. Comprehensive Quiz Center & AI Generator
- **NCERT Quiz Browser**: Browse pre-configured quizzes organized by book, subject, and class.
- **Custom Quiz Generator**: Generate customized quizzes on any topic with tunable parameters (difficulty level, class grade, subject, and question count).
- **Interactive Quiz Player**: Instant feedback on answers, question progression bar, score calculation, and performance breakdown.

### 🎓 4. Course Management & Catalog
- **Filterable Catalog**: Search and filter courses by target language, subject, difficulty (Beginner, Intermediate, Advanced, Expert), and popularity.
- **Progress Tracking**: Resume learning with instant module progress indicators.

### 📈 5. Detailed Analytics & Achievements
- **Weekly & Monthly Insights**: Granular breakdown of hours logged, test scores, and completion rates.
- **Achievement Tracker**: Gamified badges and milestones celebrating continuous learning and quiz mastery.

### 📅 6. Schedule & Study Planner
- **Interactive Calendar**: View upcoming live sessions, webinars, and instructor-led classes.
- **Detailed Session Cards**: Session timings, participant counts, language tags, and instructor profiles.

### 🌗 7. Modern UI/UX & Dark Mode
- Built with **shadcn/ui** and **Tailwind CSS** with full light/dark theme toggle support via `next-themes`.
- Fully responsive across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI Primitives) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **State & Data** | [TanStack React Query v5](https://tanstack.com/query) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |

---

## 📁 Project Structure

```text
AscendX-main/
├── public/                 # Static assets, favicon, robots.txt
├── src/
│   ├── components/         # Reusable UI & Feature components
│   │   ├── Books/          # BookHeader, ChapterContent, Quiz, TableOfContents, TextToSpeech
│   │   ├── Charts/         # BaseChart wrapper
│   │   ├── Courses/        # CourseFilters, CourseGrid
│   │   ├── Dashboard/      # DashboardHeader, LanguageSelector, OverviewCard, ProgressChart,
│   │   │                   # ProficiencyRadar, RecommendedCourses, StudyStreakCard, AiQuizWidget
│   │   ├── Layout/         # DashboardLayout with collapsible sidebar navigation
│   │   ├── Progress/       # WeeklyProgress, MonthlyProgress, AchievementTracker
│   │   ├── Quizzes/        # Quiz, QuizList, QuizCreator, CustomQuizGenerator
│   │   └── ui/             # shadcn/ui component primitives (Button, Dialog, Card, etc.)
│   ├── data/               # Static dataset records (NCERT books, Quizzes)
│   ├── hooks/              # Custom React hooks (use-mobile, use-toast)
│   ├── lib/                # Utility helpers (cn class merger)
│   ├── pages/              # Application route pages
│   │   ├── Index.tsx       # Main dashboard overview
│   │   ├── Courses.tsx     # Course browsing & enrollment
│   │   ├── Quizzes.tsx     # NCERT quiz catalog
│   │   ├── QuizCenter.tsx  # Interactive quiz taking & AI quiz creation
│   │   ├── NCERTBooks.tsx  # NCERT digital library browser
│   │   ├── BookReader.tsx  # In-depth reader with TTS & chapter quizzes
│   │   ├── Books.tsx       # Language learning book library
│   │   ├── Progress.tsx    # Progress analytics & achievements
│   │   ├── Schedule.tsx    # Class schedule & calendar
│   │   ├── Activity.tsx    # Recent activity stream
│   │   └── NotFound.tsx    # 404 fallback page
│   ├── services/           # Service integrations (ncertService, huggingFaceService)
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Root routing and context providers
│   ├── index.css           # Global Tailwind stylesheet and design tokens
│   └── main.tsx            # Application entry point
├── .env.example            # Environment variables template
├── package.json            # Project manifest & dependencies
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build & bundle splitting configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (or yarn / pnpm)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rookieDevAB/AscendX-main.git
   cd AscendX-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (Optional):**
   ```bash
   cp .env.example .env
   ```
   Add your Hugging Face API key in `.env` if you wish to use Hugging Face NCERT dataset integration:
   ```env
   VITE_HUGGINGFACE_API_KEY=your_token_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite local development server on port 8080 |
| `npm run build` | Builds optimized production bundle with manual chunk splitting |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint across the codebase |

---

## 🗺️ Application Routes

| Path | Description |
|---|---|
| `/` | **Dashboard** — Primary overview with KPIs, learning charts, and streak tracker |
| `/courses` | **Courses** — Searchable catalog of language and academic courses |
| `/quizzes` | **NCERT Quizzes** — Quizzes mapped directly to NCERT textbooks |
| `/quiz-center` | **Quiz Center** — Full quiz experience with AI generator and custom creator |
| `/ncert-books` | **NCERT Library** — Multilingual digital library with class/subject filters |
| `/ncert-books/:bookId/:chapterId` | **Book Reader** — Interactive reader with chapter navigation and TTS |
| `/books` | **Language Library** — Curated language learning book collection |
| `/progress` | **Progress** — Comprehensive weekly/monthly study analytics |
| `/schedule` | **Schedule** — Calendar-based timetable for live classes and study sessions |
| `/activity` | **Activity** — Student activity log, XP gains, and discussion history |

---

## 🛡️ Code Quality & Clean Code Standards

- **TypeScript Strict Typing**: Clean TypeScript interfaces with zero `any` types across components and pages.
- **Dead Code Eliminated**: Duplicate components and unused legacy dependencies removed.
- **Chunk-Splitted Production Build**: Configured Rollup `manualChunks` in `vite.config.ts` separating vendor and chart dependencies for fast initial page load.
- **Clean ESLint Auditing**: Zero linting errors.
- **Secure Environment Management**: Sensitive `.env` files ignored from Git tracking with `.env.example` provided.

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
