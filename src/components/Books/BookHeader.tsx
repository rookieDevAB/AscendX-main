import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, Share2, Download } from "lucide-react";

interface BookHeaderProps {
  title: string;
  onBack: () => void;
}

export function BookHeader({ title, onBack }: BookHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" title="Bookmark">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" title="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" title="Download">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}