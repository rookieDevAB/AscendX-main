
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hello, {userName}!</h1>
        <p className="text-muted-foreground">
          Continue your learning journey. You've completed 67% of this week's goals!
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {mounted && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="w-10 h-10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
        <LanguageSelector />
        <Button className="btn-primary">Start Learning</Button>
      </div>
    </div>
  );
}
