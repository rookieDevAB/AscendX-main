import { useState } from 'react';
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { QuizList, CustomQuizGenerator, Quiz, QuizData } from "@/components/Quizzes";

const QuizCenter = () => {
  const [view, setView] = useState<'list' | 'quiz' | 'custom'>('list');
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

  const handleSelectQuiz = (quiz: QuizData) => {
    setSelectedQuiz(quiz);
    setView('quiz');
  };

  const handleCreateCustomQuiz = () => {
    setView('custom');
  };

  const handleQuizComplete = (score: number, total: number) => {
    // Handle quiz completion (could save scores, etc.)
    console.log(`Quiz completed with score: ${score}/${total}`);
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedQuiz(null);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz Center</h1>
          <p className="text-muted-foreground">
            Take quizzes, create your own, or generate AI-powered custom quizzes
          </p>
        </div>

        {view === 'list' && (
          <QuizList 
            onSelectQuiz={handleSelectQuiz} 
            onCreateCustomQuiz={handleCreateCustomQuiz} 
          />
        )}

        {view === 'quiz' && selectedQuiz && (
          <Quiz 
            quiz={selectedQuiz} 
            onComplete={handleQuizComplete}
            onExit={handleBackToList} 
          />
        )}

        {view === 'custom' && (
          <CustomQuizGenerator onBack={handleBackToList} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuizCenter; 