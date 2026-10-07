import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Progress from "./pages/Progress";
import Courses from "./pages/Courses";
import Quizzes from "./pages/Quizzes";
import QuizCenter from "./pages/QuizCenter";
import Activity from "./pages/Activity";
import Schedule from "./pages/Schedule";
import Books from "./pages/Books";
import NCERTBooks from "./pages/NCERTBooks";
import BookReader from "./pages/BookReader";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quiz-center" element={<QuizCenter />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/books" element={<Books />} />
            <Route path="/ncert-books" element={<NCERTBooks />} />
            <Route path="/ncert-books/:bookId" element={<BookReader />} />
            <Route path="/ncert-books/:bookId/:chapterId" element={<BookReader />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
