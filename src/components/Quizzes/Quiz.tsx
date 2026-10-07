import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, AlertCircle, ArrowRight } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  questions: QuizQuestion[];
}

interface QuizProps {
  quiz: QuizData;
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
}

export const Quiz = ({ quiz, onComplete, onExit }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswered) {
      setSelectedOption(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctOption) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
      if (onComplete) {
        onComplete(score, quiz.questions.length);
      }
    }
  };

  // Display quiz results if completed
  if (isQuizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Quiz Completed: {quiz.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <div className="text-5xl font-bold mb-2">{score}/{quiz.questions.length}</div>
            <div className="text-2xl font-semibold text-muted-foreground">{percentage}%</div>
          </div>

          <Alert variant={percentage >= 70 ? "default" : "destructive"} className="mb-4">
            {percentage >= 70 ? (
              <>
                <BadgeCheck className="h-5 w-5" />
                <AlertTitle>Well done!</AlertTitle>
                <AlertDescription>
                  You've successfully completed the quiz with a good score.
                </AlertDescription>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Keep practicing</AlertTitle>
                <AlertDescription>
                  Review the material and try again to improve your score.
                </AlertDescription>
              </>
            )}
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onExit && (
            <Button onClick={onExit} variant="outline">
              Back to Quizzes
            </Button>
          )}
          <Button onClick={() => {
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
            setScore(0);
            setIsQuizCompleted(false);
          }}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle>{quiz.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1}/{quiz.questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">{currentQuestion.text}</div>
        
        <RadioGroup 
          value={selectedOption?.toString()} 
          onValueChange={(value) => handleOptionSelect(parseInt(value))}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-2 p-3 rounded-md border ${
                isAnswered && index === currentQuestion.correctOption 
                  ? 'bg-green-50 border-green-300' 
                  : isAnswered && index === selectedOption && index !== currentQuestion.correctOption
                    ? 'bg-red-50 border-red-300'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <RadioGroupItem 
                value={index.toString()} 
                id={`option-${index}`} 
                disabled={isAnswered}
              />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-grow cursor-pointer"
              >
                {option}
              </Label>
              {isAnswered && index === currentQuestion.correctOption && (
                <BadgeCheck className="h-5 w-5 text-green-500" />
              )}
              {isAnswered && index === selectedOption && index !== currentQuestion.correctOption && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onExit && (
          <Button onClick={onExit} variant="outline">
            Exit Quiz
          </Button>
        )}
        <div className="flex gap-2">
          {!isAnswered ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex + 1 < quiz.questions.length ? (
                <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
              ) : (
                'Complete Quiz'
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}; 