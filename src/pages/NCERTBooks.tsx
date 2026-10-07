import { useState } from 'react';
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, BookOpen, Bookmark, Search, Star, Download, GraduationCap, Globe } from "lucide-react";
import { ncertBooks } from "@/data/ncertBooks";

// Flatten the books from all languages into a single array for display
const allBooks = Object.values(ncertBooks).flatMap(languageBooks => 
  languageBooks.map(book => ({
    ...book,
    id: book.id,
  }))
);

type NCERTBook = (typeof allBooks)[number];

const NCERTBookCard = ({ book }: { book: NCERTBook }) => {
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
        <p className="text-sm text-muted-foreground">NCERT Publication</p>
        
        <div className="flex items-center mt-2 space-x-2">
          <Badge variant="outline">{book.subject}</Badge>
          <Badge variant="outline">Class {book.class}</Badge>
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
          <Button 
            className="w-full" 
            variant="default"
            onClick={() => window.location.href = `/ncert-books/${book.id}`}
          >
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

const NCERTBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  
  // Filter books based on search and filters
  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || book.subject === subjectFilter;
    const matchesClass = classFilter === 'all' || book.class === classFilter;
    
    return matchesSearch && matchesSubject && matchesClass;
  });
  
  // Get unique subjects and classes for filters
  const subjects = ['all', ...new Set(allBooks.map(book => book.subject))];
  const classes = ['all', ...new Set(allBooks.map(book => book.class))];
  
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NCERT Books</h1>
          <p className="text-muted-foreground">
            Access official NCERT textbooks for all classes and subjects
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
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
                <SelectTrigger className="w-full md:w-[180px]">
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
                  <NCERTBookCard key={book.id} book={book} />
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
                    <NCERTBookCard key={book.id} book={book} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Your library is empty</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Add NCERT books to your library to access them here.
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
                    <NCERTBookCard key={book.id} book={book} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No recommended books</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete more lessons to get personalized NCERT book recommendations.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NCERTBooks;