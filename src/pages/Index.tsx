
import { Activity, BookOpen, Clock, User } from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { OverviewCard } from "@/components/Dashboard/OverviewCard";
import { ProgressChart } from "@/components/Dashboard/ProgressChart";
import { ProficiencyRadar } from "@/components/Dashboard/ProficiencyRadar";
import { RecommendedCourses } from "@/components/Dashboard/RecommendedCourses";
import { AiQuizWidget } from "@/components/Dashboard/AiQuizWidget";
import { StudyStreakCard } from "@/components/Dashboard/StudyStreakCard";

const Index = () => {
  return (
    <DashboardLayout>
      <DashboardHeader userName="Arjun" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <OverviewCard
          title="Total Learning Hours"
          value="37.5"
          description="Hours spent learning"
          icon={<Clock />}
          trend={{ value: 12, isPositive: true }}
        />
        <OverviewCard
          title="Courses in Progress"
          value="3"
          description="Active courses"
          icon={<BookOpen />}
          trend={{ value: 1, isPositive: true }}
        />
        <OverviewCard
          title="Completed Quizzes"
          value="24"
          description="Quizzes taken"
          icon={<Activity />}
          trend={{ value: 8, isPositive: true }}
        />
        <OverviewCard
          title="Proficiency Level"
          value="Intermediate"
          description="Overall skill level"
          icon={<User />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProgressChart />
        <ProficiencyRadar />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <RecommendedCourses />
        <div className="col-span-1 lg:col-span-3 space-y-6">
          <AiQuizWidget />
          <StudyStreakCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
