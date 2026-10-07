import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableOfContents } from "@/components/Books/TableOfContents";
import { ChapterContent } from "@/components/Books/ChapterContent";
import { BookHeader } from "@/components/Books/BookHeader";
import { Quiz } from "@/components/Books/Quiz";
import { ncertBooks } from "@/data/ncertBooks";
import { Book } from "@/services/ncertService";

// Sample chapter data - in a real app, this would come from an API
const bookChapters = {
  'en1': [
    { id: 1, title: "Chapter 1: Introduction to Numbers", content: "This chapter introduces the concept of numbers, their types, and basic operations. You will learn about natural numbers, whole numbers, and integers." },
    { id: 2, title: "Chapter 2: Fractions", content: "This chapter covers different types of fractions, their representations, and operations like addition, subtraction, multiplication, and division of fractions." },
    { id: 3, title: "Chapter 3: Decimals", content: "Learn about decimal numbers, their representation, and operations. This chapter also covers the conversion between fractions and decimals." },
    { id: 4, title: "Chapter 4: Basic Geometry", content: "Introduction to basic geometric concepts like points, lines, angles, and shapes. You will learn to classify angles and understand properties of triangles and quadrilaterals." },
    { id: 5, title: "Chapter 5: Algebra", content: "Basic algebraic concepts are introduced in this chapter. Learn about variables, expressions, and simple equations." },
  ],
  'en5': [
    { id: 1, title: "Chapter 1: Real Numbers", content: "This chapter covers the properties of real numbers, including rational and irrational numbers. You will learn about HCF and LCM, Euclid's division algorithm, and the fundamental theorem of arithmetic." },
    { id: 2, title: "Chapter 2: Polynomials", content: "Learn about polynomials in one variable, zeros of polynomials, and the relationship between zeros and coefficients. The chapter also covers division of polynomials and the remainder theorem." },
    { id: 3, title: "Chapter 3: Linear Equations in Two Variables", content: "This chapter deals with linear equations in two variables, their graphical representation, and solutions. You will learn to solve pairs of linear equations using substitution, elimination, and cross-multiplication methods." },
    { id: 4, title: "Chapter 4: Quadratic Equations", content: "Study quadratic equations, their standard form, solutions, and applications. Learn to solve quadratic equations using factorization, completing the square, and the quadratic formula." },
    { id: 5, title: "Chapter 5: Arithmetic Progressions", content: "Introduction to arithmetic progressions, their general term, and sum of first n terms. The chapter includes applications of arithmetic progressions in solving real-life problems." },
  ],
  'en10': [
    { id: 1, title: "Chapter 1: Chemical Reactions and Equations", content: "This chapter introduces chemical reactions, their types, and how to write and balance chemical equations. You will learn about various types of chemical reactions like combination, decomposition, displacement, and double displacement reactions." },
    { id: 2, title: "Chapter 2: Acids, Bases, and Salts", content: "Learn about acids, bases, and salts, their properties, and reactions. The chapter covers concepts like pH scale, indicators, and neutralization reactions." },
    { id: 3, title: "Chapter 3: Metals and Non-metals", content: "Study the physical and chemical properties of metals and non-metals, their reactions, and the reactivity series. The chapter also covers corrosion and its prevention." },
    { id: 4, title: "Chapter 4: Carbon and its Compounds", content: "Introduction to carbon compounds, their versatile nature, and functional groups. Learn about hydrocarbons, their properties, and reactions." },
    { id: 5, title: "Chapter 5: Periodic Classification of Elements", content: "This chapter discusses the development of the periodic table, the modern periodic law, and the trends in the periodic table. You will learn about the classification of elements and their properties based on their position in the periodic table." },
  ],
  // Add more books as needed
};

interface Chapter {
  id: number;
  title: string;
  content: string;
}

// Flatten all books from all languages for easier lookup
const allBooks = Object.values(ncertBooks).flatMap(languageBooks => languageBooks);

const BookReader = () => {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState<number>(chapterId ? parseInt(chapterId) : 1);
  const [book, setBook] = useState<Book | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeTab, setActiveTab] = useState('content');
  
  // In a real app, you would fetch the book details from an API
  useEffect(() => {
    // Simulate fetching book data
    const fetchBook = () => {
      if (!bookId) return;
      
      // This would be replaced with an actual API call
      const foundBook = allBooks.find(b => b.id === bookId);
      setBook(foundBook);
      
      // Set chapters for this book
      const bookChaptersList = bookChapters[bookId as keyof typeof bookChapters] || [];
      setChapters(bookChaptersList);
    };
    
    fetchBook();
  }, [bookId]);
  
  // Update URL when chapter changes
  useEffect(() => {
    if (bookId) {
      navigate(`/ncert-books/${bookId}/${currentChapter}`, { replace: true });
    }
  }, [currentChapter, bookId, navigate]);
  
  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };
  
  const handleNextChapter = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1);
    }
  };
  
  const currentChapterData = chapters.find(chapter => chapter.id === currentChapter);
  
  if (!book) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading book...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <BookHeader 
          title={book.title} 
          onBack={() => navigate('/ncert-books')} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Chapter navigation sidebar */}
          <div className="md:col-span-1">
            <TableOfContents 
              chapters={chapters} 
              currentChapter={currentChapter} 
              onChapterSelect={(chapter) => {
                setCurrentChapter(chapter);
                setActiveTab('content');
              }} 
            />
          </div>
          
          {/* Chapter content */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
            {currentChapterData && (
              <ChapterContent 
                chapter={currentChapterData}
                hasNextChapter={currentChapter < chapters.length}
                hasPreviousChapter={currentChapter > 1}
                onNextChapter={handleNextChapter}
                onPreviousChapter={handlePreviousChapter}
              />
            )}
              </TabsContent>
              
              <TabsContent value="quiz">
                {bookId && (
                  <Quiz 
                    bookId={bookId} 
                    chapterId={currentChapter} 
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookReader;