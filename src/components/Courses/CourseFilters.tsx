
import { Button } from "@/components/ui/button";

interface CourseFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export function CourseFilters({ currentFilter, onFilterChange }: CourseFiltersProps) {
  const filters = [
    { id: "all", label: "All Courses" },
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "saved", label: "Saved" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={currentFilter === filter.id ? "default" : "outline"}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
