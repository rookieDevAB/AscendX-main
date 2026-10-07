import { useState } from 'react';
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, BookOpen, Award, PenTool } from "lucide-react";
import { ncertBooks } from "@/data/ncertBooks";
import { quizData } from '@/data/quizData';
import { useNavigate } from 'react-router-dom';

// Flatten all books from all languages
const allBooks = Object.values(ncertBooks).flatMap(languageBooks => languageBooks);

// Get books that have quizzes
const booksWithQuizzes = allBooks.filter(book => 
  quizData[book.id as keyof typeof quizData]
);

const getChapterCount = (bookId: string) => {
  const bookQuizzes = quizData[bookId as keyof typeof quizData];
  if (!bookQuizzes) return 0;
  
  return Object.keys(bookQuizzes).length;
};

const getQuestionCount = (bookId: string) => {
  const bookQuizzes = quizData[bookId as keyof typeof quizData];
  if (!bookQuizzes) return 0;
  
  let count = 0;
  Object.values(bookQuizzes).forEach(chapterQuiz => {
    count += chapterQuiz.length;
  });
  
  return count;
};

type QuizBook = (typeof allBooks)[number];

const QuizCard = ({ book }: { book: QuizBook }) => {
  const navigate = useNavigate();
  const chapterCount = getChapterCount(book.id);
  const questionCount = getQuestionCount(book.id);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="mb-2">{book.subject}</Badge>
          <Badge variant="outline">Class {book.class}</Badge>
        </div>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>NCERT Publication</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <PenTool className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{chapterCount} Chapters</span>
          </div>
          <div className="flex items-center">
            <Brain className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{questionCount} Questions</span>
          </div>
        </div>
        <p className="text-sm">Test your knowledge on {book.subject} concepts from class {book.class}.</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => navigate(`/ncert-books/${book.id}/1`)}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Start Learning
        </Button>
      </CardFooter>
    </Card>
  );
};

const Quizzes = () => {
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  
  // Get unique subjects and classes
  const subjects = ['all', ...new Set(booksWithQuizzes.map(book => book.subject))];
  const classes = ['all', ...new Set(booksWithQuizzes.map(book => book.class))];
  
  // Filter books
  const filteredBooks = booksWithQuizzes.filter(book => {
    const matchesSubject = subjectFilter === 'all' || book.subject === subjectFilter;
    const matchesClass = classFilter === 'all' || book.class === classFilter;
    return matchesSubject && matchesClass;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Practice Quizzes</h1>
          <p className="text-muted-foreground">
              Test your knowledge with chapter-based quizzes for NCERT books
          </p>
        </div>

          <div className="flex flex-wrap gap-2">
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map(classNum => (
                  <SelectItem key={classNum} value={classNum}>
                    {classNum === 'all' ? 'All Classes' : `Class ${classNum}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <QuizCard key={book.id} book={book} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Award className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No quizzes found</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters to find quizzes for different subjects or classes.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Quizzes;
