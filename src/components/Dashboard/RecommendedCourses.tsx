
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CourseItem {
  id: number;
  title: string;
  description: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  progress?: number;
}

const courses: CourseItem[] = [
  {
    id: 1,
    title: "Introduction to Tamil",
    description: "Learn the basics of Tamil language with interactive lessons",
    language: "Tamil",
    difficulty: "beginner",
    progress: 15
  },
  {
    id: 2,
    title: "Intermediate Hindi",
    description: "Take your Hindi skills to the next level",
    language: "Hindi",
    difficulty: "intermediate",
    progress: 0
  },
  {
    id: 3,
    title: "Advanced Bengali Literature",
    description: "Explore classic and modern Bengali literature",
    language: "Bengali",
    difficulty: "advanced",
    progress: 0
  }
];

export function RecommendedCourses() {
  const navigate = useNavigate();
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recommended Courses</CardTitle>
        <CardDescription>Personalized suggestions based on your interests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="p-4 border rounded-md flex flex-col gap-2 card-hover"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-base">{course.title}</h4>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>
              <Badge 
                variant="outline" 
                className={`difficulty-badge difficulty-badge-${course.difficulty}`}
              >
                {course.difficulty}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <Badge className="bg-education-light-blue text-education-primary">
                {course.language}
              </Badge>
              
              {course.progress > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-education-primary rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{course.progress}%</span>
                </div>
              ) : (
                <Button onClick={() => navigate('/courses')} variant="outline" size="sm">Start</Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate('/courses')} variant="outline" className="w-full mt-2">View All Courses</Button>
      </CardFooter>
    </Card>
  );
}
