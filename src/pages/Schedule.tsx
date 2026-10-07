import { useState } from 'react';
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, GraduationCap, Users } from "lucide-react";

// Sample data for scheduled classes
const scheduledClasses = [
  {
    id: 1,
    title: "Advanced Spanish Conversation",
    date: new Date(2023, 5, 15, 10, 0),
    duration: 60,
    instructor: "Maria Rodriguez",
    participants: 12,
    language: "Spanish",
    level: "Advanced",
  },
  {
    id: 2,
    title: "Japanese Beginner Grammar",
    date: new Date(2023, 5, 16, 14, 30),
    duration: 45,
    instructor: "Hiroshi Tanaka",
    participants: 8,
    language: "Japanese",
    level: "Beginner",
  },
  {
    id: 3,
    title: "French Pronunciation Workshop",
    date: new Date(2023, 5, 17, 9, 0),
    duration: 90,
    instructor: "Sophie Dubois",
    participants: 6,
    language: "French",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "German Business Vocabulary",
    date: new Date(2023, 5, 18, 16, 0),
    duration: 60,
    instructor: "Klaus Weber",
    participants: 10,
    language: "German",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "Mandarin Character Writing",
    date: new Date(2023, 5, 19, 11, 0),
    duration: 75,
    instructor: "Li Wei",
    participants: 5,
    language: "Mandarin",
    level: "Beginner",
  },
];

type ScheduledClass = (typeof scheduledClasses)[number];

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState<ScheduledClass | null>(null);

  // Filter classes for the selected date
  const classesForSelectedDate = date
    ? scheduledClasses.filter(
        (cls) =>
          cls.date.getDate() === date.getDate() &&
          cls.date.getMonth() === date.getMonth() &&
          cls.date.getFullYear() === date.getFullYear()
      )
    : [];

  // Format time from Date object
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Schedule</h1>
          <p className="text-muted-foreground">
            View and manage your upcoming language classes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view scheduled classes</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                // Highlight dates with scheduled classes
                modifiers={{
                  booked: scheduledClasses.map(cls => new Date(cls.date)),
                }}
                modifiersStyles={{
                  booked: { fontWeight: 'bold', backgroundColor: 'rgba(59, 130, 246, 0.1)' }
                }}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {date ? (
                  <>Classes on {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</>
                ) : (
                  "Scheduled Classes"
                )}
              </CardTitle>
              <CardDescription>
                {classesForSelectedDate.length
                  ? `You have ${classesForSelectedDate.length} class${classesForSelectedDate.length > 1 ? 'es' : ''} scheduled`
                  : "No classes scheduled for this date"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {classesForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {classesForSelectedDate.map((cls) => (
                    <div
                      key={cls.id}
                      className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-all"
                      onClick={() => setSelectedClass(cls)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{cls.title}</h3>
                          <div className="text-sm text-muted-foreground">{cls.instructor}</div>
                        </div>
                        <Badge className={`bg-education-${cls.level.toLowerCase()}`}>
                          {cls.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{formatTime(cls.date)} ({cls.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>{cls.participants} students</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Classes Scheduled</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-2">
                    There are no classes scheduled for this date. Select another date or enroll in more courses to see scheduled classes.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {selectedClass && (
          <Card>
            <CardHeader>
              <CardTitle>Class Details</CardTitle>
              <CardDescription>Information about the selected class</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{selectedClass.title}</h3>
                      <p className="text-muted-foreground">{selectedClass.language} - {selectedClass.level}</p>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{formatTime(selectedClass.date)} - {formatTime(new Date(selectedClass.date.getTime() + selectedClass.duration * 60000))}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span>Instructor: {selectedClass.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedClass.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Class Description</h4>
                      <p className="text-sm">
                        This {selectedClass.duration}-minute session will focus on {selectedClass.title.toLowerCase()} skills. 
                        The class is designed for {selectedClass.level.toLowerCase()} level students and will be conducted in {selectedClass.language}.
                      </p>
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">What to Prepare</h4>
                        <ul className="text-sm list-disc list-inside space-y-1">
                          <li>Complete pre-class assignments</li>
                          <li>Review vocabulary from previous session</li>
                          <li>Prepare questions for the instructor</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="materials">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Class materials will be available 24 hours before the scheduled class time.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Lesson Slides</h4>
                        <p className="text-sm text-muted-foreground mb-4">PDF presentation for the upcoming class</p>
                        <Badge variant="outline" className="text-muted-foreground">Available soon</Badge>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Practice Exercises</h4>
                        <p className="text-sm text-muted-foreground mb-4">Worksheet with practice problems</p>
                        <Badge variant="outline" className="text-muted-foreground">Available soon</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="participants">
                  <p className="text-sm text-muted-foreground mb-4">This class has {selectedClass.participants} enrolled students.</p>
                  <div className="border rounded-lg">
                    <div className="p-4 border-b">
                      <h4 className="font-medium">Participant List</h4>
                      <p className="text-sm text-muted-foreground">Names are hidden for privacy</p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm">Participant information will be visible during the class session.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Schedule;