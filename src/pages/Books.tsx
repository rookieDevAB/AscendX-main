import { useState } from 'react';
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, BookOpen, Bookmark, Search, Star, Download } from "lucide-react";

// Sample books data
const books = [
  {
    id: 1,
    title: "Spanish Grammar Essentials",
    author: "Maria Rodriguez",
    language: "Spanish",
    level: "Intermediate",
    pages: 245,
    category: "Grammar",
    rating: 4.5,
    coverImage: "https://placehold.co/200x300/e9e9ff/333333?text=Spanish+Grammar",
    isRecommended: true,
    isOwned: true,
  },
  {
    id: 2,
    title: "Japanese Kanji for Beginners",
    author: "Hiroshi Tanaka",
    language: "Japanese",
    level: "Beginner",
    pages: 180,
    category: "Vocabulary",
    rating: 4.2,
    coverImage: "https://placehold.co/200x300/ffe9e9/333333?text=Kanji+Basics",
    isRecommended: true,
    isOwned: false,
  },
  {
    id: 3,
    title: "French Conversation Practice",
    author: "Sophie Dubois",
    language: "French",
    level: "Advanced",
    pages: 210,
    category: "Conversation",
    rating: 4.7,
    coverImage: "https://placehold.co/200x300/e9ffe9/333333?text=French+Conversation",
    isRecommended: false,
    isOwned: true,
  },
  {
    id: 4,
    title: "German Business Vocabulary",
    author: "Klaus Weber",
    language: "German",
    level: "Intermediate",
    pages: 156,
    category: "Vocabulary",
    rating: 4.0,
    coverImage: "https://placehold.co/200x300/fff9e9/333333?text=German+Business",
    isRecommended: false,
    isOwned: true,
  },
  {
    id: 5,
    title: "Mandarin Pronunciation Guide",
    author: "Li Wei",
    language: "Mandarin",
    level: "Beginner",
    pages: 120,
    category: "Pronunciation",
    rating: 4.8,
    coverImage: "https://placehold.co/200x300/ffe9f9/333333?text=Mandarin+Guide",
    isRecommended: true,
    isOwned: false,
  },
  {
    id: 6,
    title: "Italian Verb Conjugation",
    author: "Marco Rossi",
    language: "Italian",
    level: "Intermediate",
    pages: 185,
    category: "Grammar",
    rating: 4.3,
    coverImage: "https://placehold.co/200x300/e9f9ff/333333?text=Italian+Verbs",
    isRecommended: false,
    isOwned: false,
  },
];

type BookItem = (typeof books)[number];

const BookCard = ({ book }: { book: BookItem }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-48 object-cover"
        />
        {book.isRecommended && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            Recommended
          </Badge>
        )}
      </div>
      <CardContent className="flex-1 pt-4">
        <h3 className="font-medium text-lg">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        
        <div className="flex items-center mt-2 space-x-2">
          <Badge variant="outline">{book.language}</Badge>
          <Badge variant="outline">{book.level}</Badge>
        </div>
        
        <div className="flex items-center mt-4 text-sm">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span>{book.rating}</span>
          <span className="mx-2">•</span>
          <span>{book.pages} pages</span>
          <span className="mx-2">•</span>
          <span>{book.category}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        {book.isOwned ? (
          <Button className="w-full" variant="default">
            <BookOpen className="mr-2 h-4 w-4" />
            Read Now
          </Button>
        ) : (
          <Button className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Add to Library
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  
  // Filter books based on search and filters
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || book.language === languageFilter;
    const matchesLevel = levelFilter === 'all' || book.level === levelFilter;
    
    return matchesSearch && matchesLanguage && matchesLevel;
  });
  
  // Get unique languages and levels for filters
  const languages = ['all', ...new Set(books.map(book => book.language))];
  const levels = ['all', ...new Set(books.map(book => book.level))];
  
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Books & Resources</h1>
          <p className="text-muted-foreground">
            Explore language learning books and resources
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or author"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>
                      {language === 'all' ? 'All Languages' : language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Books</TabsTrigger>
            <TabsTrigger value="my-library">My Library</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Book className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No books found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="my-library">
            {filteredBooks.filter(book => book.isOwned).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks
                  .filter(book => book.isOwned)
                  .map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Your library is empty</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Add books to your library to access them here.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommended">
            {filteredBooks.filter(book => book.isRecommended).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks
                  .filter(book => book.isRecommended)
                  .map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No recommended books</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete more lessons to get personalized book recommendations.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Books;