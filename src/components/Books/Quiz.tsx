import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeCheck, AlertCircle, ArrowRight, RefreshCcw } from 'lucide-react';
import { quizData } from '@/data/quizData';

interface QuizProps {
  bookId: string;
  chapterId: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const Quiz = ({ bookId, chapterId }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    // Get questions for this book chapter
    const chapterQuestions = quizData[bookId as keyof typeof quizData]?.[chapterId];
    if (chapterQuestions) {
      setQuestions(chapterQuestions);
    } else {
      // If no questions found, set empty array
      setQuestions([]);
    }
    
    // Reset quiz state when book or chapter changes
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizCompleted(false);
  }, [bookId, chapterId]);

  if (questions.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No quiz available for this chapter.</p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  if (isQuizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-4">
            <div className="text-5xl font-bold mb-2">{percentage}%</div>
            <p className="text-xl mb-4">You scored {score} out of {questions.length}</p>
            
            {percentage >= 70 ? (
              <Alert className="bg-green-50 border-green-200">
                <BadgeCheck className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Well done!</AlertTitle>
                <AlertDescription className="text-green-700">
                  You've mastered this chapter's content.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-orange-50 border-orange-200">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-800">Keep practicing</AlertTitle>
                <AlertDescription className="text-orange-700">
                  Review the chapter content and try again to improve your understanding.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRestartQuiz}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Chapter Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <h3 className="text-lg font-medium mt-1">{currentQuestion.question}</h3>
        </div>
        
        <RadioGroup value={selectedOption || ""} className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 p-3 rounded-md border ${
                isAnswered && option === currentQuestion.correctAnswer
                  ? 'bg-green-50 border-green-200'
                  : isAnswered && option === selectedOption
                  ? 'bg-red-50 border-red-200'
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                disabled={isAnswered}
              />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {isAnswered && (
          <Alert className="mt-4 bg-blue-50 border-blue-200">
            <AlertTitle className="text-blue-800">Explanation</AlertTitle>
            <AlertDescription className="text-blue-700">
              {currentQuestion.explanation}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isAnswered ? (
          <Button 
            onClick={handleSubmitAnswer} 
            disabled={selectedOption === null}
            className="w-full"
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNextQuestion} 
            className="w-full"
          >
            {currentQuestionIndex + 1 < questions.length ? (
              <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>Finish Quiz</>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}; 