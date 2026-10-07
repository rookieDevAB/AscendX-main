
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const activePattern = [true, true, false, true, true, false, false]; // Sample data

export function StudyStreakCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Streak</CardTitle>
        <CardDescription>5 days streak this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {weekdays.map((day, index) => (
            <div key={day} className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  activePattern[index]
                    ? "bg-education-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {activePattern[index] ? "✓" : ""}
              </div>
              <span className="text-xs mt-1">{day}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            <span className="font-medium text-education-primary">2 days</span> until your next achievement!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
