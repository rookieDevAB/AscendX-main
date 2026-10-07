
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { CourseGrid } from "@/components/Courses/CourseGrid";
import { CourseFilters } from "@/components/Courses/CourseFilters";
import { useState } from "react";

const Courses = () => {
  const [filter, setFilter] = useState("all");
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Courses</h1>
          <p className="text-muted-foreground">
            Explore our curated collection of regional language courses
          </p>
        </div>

        <CourseFilters currentFilter={filter} onFilterChange={setFilter} />
        <CourseGrid filter={filter} />
      </div>
    </DashboardLayout>
  );
};

export default Courses;
