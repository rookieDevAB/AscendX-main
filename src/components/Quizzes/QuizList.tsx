import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, Clock, Star, Plus } from "lucide-react";
import { QuizData } from './Quiz';

// Example quiz data (replace with real data)
const exampleQuizzes: QuizData[] = [
  {
    id: "quiz-1",
    title: "Introduction to Biology",
    description: "Basic concepts of cell biology, genetics and evolution",
    subject: "Biology",
    class: "Class 10",
    questions: [] // Questions would be populated here
  },
  {
    id: "quiz-2",
    title: "Chemical Reactions and Equations",
    description: "Learn about different types of chemical reactions",
    subject: "Chemistry",
    class: "Class 10",
    questions: [] // Questions would be populated here
  },
  {
    id: "quiz-3",
    title: "Understanding Motion",
    description: "Concepts of distance, displacement, velocity and acceleration",
    subject: "Physics",
    class: "Class 9",
    questions: [] // Questions would be populated here
  },
  {
    id: "quiz-4",
    title: "Indian Freedom Movement",
    description: "Important events and figures in India's struggle for independence",
    subject: "History",
    class: "Class 8",
    questions: [] // Questions would be populated here
  },
  {
    id: "quiz-5",
    title: "Quadratic Equations",
    description: "Solving quadratic equations and their applications",
    subject: "Mathematics",
    class: "Class 10",
    questions: [] // Questions would be populated here
  }
];

interface QuizListProps {
  onSelectQuiz?: (quiz: QuizData) => void;
  onCreateCustomQuiz?: () => void;
}

export const QuizList = ({ onSelectQuiz, onCreateCustomQuiz }: QuizListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // Get unique subjects for filtering
  const subjects = Array.from(new Set(exampleQuizzes.map(quiz => quiz.subject)));
  
  // Filter quizzes based on search query and selected subject
  const filteredQuizzes = exampleQuizzes.filter(quiz => {
    const matchesSearch = 
      searchQuery === '' || 
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === null || quiz.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  const handleQuizSelect = (quiz: QuizData) => {
    if (onSelectQuiz) {
      onSelectQuiz(quiz);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Available Quizzes</CardTitle>
        <CardDescription>
          Select from our pre-made quizzes or create your own custom quiz
        </CardDescription>
        <div className="flex items-center space-x-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search" 
              placeholder="Search quizzes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={onCreateCustomQuiz} variant="outline" className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Custom Quiz
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setSelectedSubject(null)}>
              All Subjects
            </TabsTrigger>
            {subjects.map(subject => (
              <TabsTrigger 
                key={subject} 
                value={subject}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <QuizGrid quizzes={filteredQuizzes} onSelectQuiz={handleQuizSelect} />
          </TabsContent>
          
          {subjects.map(subject => (
            <TabsContent key={subject} value={subject} className="space-y-4">
              <QuizGrid 
                quizzes={exampleQuizzes.filter(quiz => quiz.subject === subject)} 
                onSelectQuiz={handleQuizSelect} 
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface QuizGridProps {
  quizzes: QuizData[];
  onSelectQuiz: (quiz: QuizData) => void;
}

const QuizGrid = ({ quizzes, onSelectQuiz }: QuizGridProps) => {
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No quizzes found. Try a different search or create a custom quiz.
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="overflow-hidden hover:border-primary transition-colors">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{quiz.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{quiz.description}</p>
                </div>
              </div>
              
              <div className="flex items-center mt-4 text-sm text-muted-foreground">
                <div className="flex items-center mr-4">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>{quiz.subject}</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4" />
                  <span>{quiz.class}</span>
                </div>
                <div className="flex items-center ml-4">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{quiz.questions.length || 10} questions</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  onClick={() => onSelectQuiz(quiz)} 
                  className="w-full"
                  variant="outline"
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
