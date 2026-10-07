
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

const achievements = [
  { title: "First Quiz Complete", date: "Apr 20, 2025", completed: true },
  { title: "7-Day Streak", date: "Apr 18, 2025", completed: true },
  { title: "Complete Beginner Course", date: "In Progress", completed: false },
  { title: "Practice Speaking", date: "Not Started", completed: false },
];

export function AchievementTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${achievement.completed ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                <CircleCheck className={`w-5 h-5 ${achievement.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
              </div>
              <div>
                <div className="font-medium">{achievement.title}</div>
                <div className="text-sm text-muted-foreground">{achievement.date}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
