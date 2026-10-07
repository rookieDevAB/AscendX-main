
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Basic Hindi",
    progress: 45,
    lessons: 12,
    category: "in-progress",
  },
  {
    id: 2,
    title: "Tamil for Beginners",
    progress: 0,
    lessons: 10,
    category: "saved",
  },
  {
    id: 3,
    title: "Telugu Basics",
    progress: 100,
    lessons: 15,
    category: "completed",
  },
  // Add more courses as needed
];

interface CourseGridProps {
  filter: string;
}

export function CourseGrid({ filter }: CourseGridProps) {
  const filteredCourses = filter === "all" 
    ? courses 
    : courses.filter(course => course.category === filter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BookText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{course.lessons} lessons</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <div 
                  className="h-full bg-purple-600 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
