import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Brain, AlertCircle } from 'lucide-react';
import { ncertBooks } from "@/data/ncertBooks";
import { QuizData, QuizQuestion } from './Quiz';
import { Quiz } from './Quiz';

// Flatten all books from all languages
const allBooks = Object.values(ncertBooks).flatMap(languageBooks => languageBooks);

// Get unique subjects and classes
const subjects = [...new Set(allBooks.map(book => book.subject))];
const classes = [...new Set(allBooks.map(book => book.class))];

interface CustomQuizGeneratorProps {
  onBack?: () => void;
}

export const CustomQuizGenerator = ({ onBack }: CustomQuizGeneratorProps = {}) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizData | null>(null);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleGenerateQuiz = () => {
    if (!topic) {
      setError("Please enter a topic for your quiz");
      return;
    }

    setIsGenerating(true);
    setError("");

    // Simulate API call to generate quiz
    setTimeout(() => {
      // Create formatted questions that match the QuizQuestion interface
      const questions = generateMockQuestions(topic, questionCount);
      
      // Mock generated quiz
      const mockQuiz: QuizData = {
        id: 'custom-' + Date.now(),
        title: topic,
        description: description || `Quiz about ${topic}`,
        subject: subject || "General Knowledge",
        class: classLevel || "All",
        questions: questions
      };

      setGeneratedQuiz(mockQuiz);
      setIsGenerating(false);
    }, 2000);
  };

  const generateMockQuestions = (topicName: string, count: number): QuizQuestion[] => {
    const questions: QuizQuestion[] = [];
    
    for (let i = 0; i < count; i++) {
      questions.push({
        id: `q-${i + 1}`,
        text: `Sample question ${i + 1} about ${topicName}?`,
        options: [
          `Option A for question ${i + 1}`,
          `Option B for question ${i + 1}`,
          `Option C for question ${i + 1}`,
          `Option D for question ${i + 1}`
        ],
        correctOption: 0 // First option is always correct in this mock example
      });
    }
    
    return questions;
  };

  const handleResetForm = () => {
    setTopic("");
    setDescription("");
    setSubject("");
    setClassLevel("");
    setQuestionCount(5);
    setGeneratedQuiz(null);
    setStartQuiz(false);
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  const handleQuizComplete = (score: number, total: number) => {
    console.log(`Quiz completed with score: ${score}/${total}`);
    // Here you could save the score, show achievements, etc.
  };

  // If quiz has started, show the Quiz component
  if (startQuiz && generatedQuiz) {
    return (
      <Quiz 
        quiz={generatedQuiz} 
        onComplete={handleQuizComplete}
        onExit={() => setStartQuiz(false)}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          Create Custom Quiz
        </CardTitle>
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack}>
            Back to Quizzes
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!generatedQuiz ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Quiz Topic <span className="text-red-500">*</span></Label>
              <Input 
                id="topic" 
                placeholder="Enter the main topic for your quiz" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about what the quiz should cover"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subj) => (
                      <SelectItem key={subj} value={subj}>
                        {subj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="class">Class Level</Label>
                <Select value={classLevel} onValueChange={setClassLevel}>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        Class {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="questionCount">Number of Questions: {questionCount}</Label>
              </div>
              <Slider
                id="questionCount"
                min={3}
                max={10}
                step={1}
                value={[questionCount]}
                onValueChange={(value) => setQuestionCount(value[0])}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <h3 className="text-lg font-medium text-green-800">Quiz Generated Successfully!</h3>
              <p className="text-green-700">Your quiz "{generatedQuiz.title}" is ready with {generatedQuiz.questions.length} questions.</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Topic:</span>
                <span>{generatedQuiz.title}</span>
              </div>
              {generatedQuiz.description && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Description:</span>
                  <span>{generatedQuiz.description}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm font-medium">Subject:</span>
                <span>{generatedQuiz.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Class:</span>
                <span>{generatedQuiz.class === "All" ? "All Classes" : `Class ${generatedQuiz.class}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Questions:</span>
                <span>{generatedQuiz.questions.length}</span>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Sample Questions:</h4>
              <ol className="list-decimal pl-5 space-y-2">
                {generatedQuiz.questions.slice(0, 2).map((q, idx) => (
                  <li key={idx}>
                    <p>{q.text}</p>
                  </li>
                ))}
                {generatedQuiz.questions.length > 2 && (
                  <li className="text-muted-foreground">And {generatedQuiz.questions.length - 2} more questions...</li>
                )}
              </ol>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {!generatedQuiz ? (
          <Button 
            onClick={handleGenerateQuiz} 
            disabled={isGenerating || !topic}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Generate Quiz"
            )}
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleResetForm}>
              Create Another Quiz
            </Button>
            <Button onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};