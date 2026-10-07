import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, BookX } from "lucide-react";
import { TextToSpeech } from "./TextToSpeech";

interface Chapter {
  id: number;
  title: string;
  content: string;
}

interface ChapterContentProps {
  chapter: Chapter;
  hasNextChapter: boolean;
  hasPreviousChapter: boolean;
  onNextChapter: () => void;
  onPreviousChapter: () => void;
}

export function ChapterContent({ 
  chapter, 
  hasNextChapter, 
  hasPreviousChapter, 
  onNextChapter, 
  onPreviousChapter 
}: ChapterContentProps) {
  const [showTTS, setShowTTS] = useState(false);
  
  // Combine all text content for text-to-speech
  const fullChapterText = `${chapter.title}. ${chapter.content} 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
    Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.`;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{chapter.title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTTS(!showTTS)}
            >
              {showTTS ? (
                <>
                  <BookX className="h-4 w-4 mr-2" />
                  Hide Audio
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Aloud
                </>
              )}
            </Button>
          </div>
          
          {showTTS && (
            <div className="mb-4">
              <TextToSpeech text={fullChapterText} chapterTitle={chapter.title} />
            </div>
          )}
          
          <div className="prose max-w-none">
            <p>{chapter.content}</p>
            
            {/* This would be replaced with actual chapter content */}
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </p>
            <p className="mt-4">
              Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Chapter navigation buttons */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPreviousChapter}
          disabled={!hasPreviousChapter}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous Chapter
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onNextChapter}
          disabled={!hasNextChapter}
        >
          Next Chapter
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}