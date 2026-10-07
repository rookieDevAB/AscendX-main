import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Chapter {
  id: number;
  title: string;
  content: string;
}

interface TableOfContentsProps {
  chapters: Chapter[];
  currentChapter: number;
  onChapterSelect: (chapterId: number) => void;
}

export function TableOfContents({ chapters, currentChapter, onChapterSelect }: TableOfContentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredChapters = chapters.filter(chapter => 
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Table of Contents</h3>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chapters"
              className="pl-8 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {filteredChapters.length > 0 ? (
            filteredChapters.map((chapter) => (
              <Button 
                key={chapter.id}
                variant={chapter.id === currentChapter ? "default" : "ghost"}
                className="w-full justify-start text-sm py-2 h-auto"
                onClick={() => onChapterSelect(chapter.id)}
              >
                <span className="truncate">{chapter.title}</span>
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No chapters found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}