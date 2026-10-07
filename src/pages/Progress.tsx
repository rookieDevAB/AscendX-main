
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyProgress } from "@/components/Progress/WeeklyProgress";
import { MonthlyProgress } from "@/components/Progress/MonthlyProgress";
import { AchievementTracker } from "@/components/Progress/AchievementTracker";

const Progress = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Progress</h1>
          <p className="text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </div>

        <div className="grid gap-6">
          <WeeklyProgress />
          <div className="grid md:grid-cols-2 gap-6">
            <MonthlyProgress />
            <AchievementTracker />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Progress;
