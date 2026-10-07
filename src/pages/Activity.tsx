import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, BookOpen, Award, MessageSquare, CheckCircle2 } from "lucide-react";

// Sample activity data
const recentActivities = [
  {
    id: 1,
    type: "quiz_completed",
    title: "Spanish Verb Conjugation Quiz",
    timestamp: "2 hours ago",
    score: 85,
    xp: 120,
  },
  {
    id: 2,
    type: "lesson_completed",
    title: "Japanese Hiragana Basics",
    timestamp: "Yesterday",
    duration: 45,
    xp: 200,
  },
  {
    id: 3,
    type: "achievement_unlocked",
    title: "5-Day Streak",
    timestamp: "2 days ago",
    xp: 50,
  },
  {
    id: 4,
    type: "forum_post",
    title: "Question about French pronunciation",
    timestamp: "3 days ago",
    replies: 3,
    xp: 15,
  },
  {
    id: 5,
    type: "course_enrolled",
    title: "German for Beginners",
    timestamp: "1 week ago",
    xp: 10,
  },
];

const achievements = [
  {
    id: 1,
    title: "Early Bird",
    description: "Complete 5 lessons before 9 AM",
    progress: 3,
    total: 5,
    icon: "🌅",
    xp: 50,
  },
  {
    id: 2,
    title: "Vocabulary Master",
    description: "Learn 500 new words",
    progress: 342,
    total: 500,
    icon: "📚",
    xp: 200,
  },
  {
    id: 3,
    title: "Perfect Week",
    description: "Study every day for a week",
    progress: 5,
    total: 7,
    icon: "🔥",
    xp: 100,
  },
  {
    id: 4,
    title: "Grammar Guru",
    description: "Score 100% on 3 grammar quizzes",
    progress: 1,
    total: 3,
    icon: "🏆",
    xp: 150,
  },
];

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "quiz_completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "lesson_completed":
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    case "achievement_unlocked":
      return <Award className="h-5 w-5 text-yellow-500" />;
    case "forum_post":
      return <MessageSquare className="h-5 w-5 text-purple-500" />;
    case "course_enrolled":
      return <BookOpen className="h-5 w-5 text-indigo-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const Activity = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
          <p className="text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Your learning activities from the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="bg-muted rounded-full p-2">
                        <ActivityIcon type={activity.type} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                          </div>
                          <Badge variant="secondary">+{activity.xp} XP</Badge>
                        </div>
                        <div className="mt-2">
                          {activity.type === "quiz_completed" && (
                            <p className="text-sm">Score: {activity.score}%</p>
                          )}
                          {activity.type === "lesson_completed" && (
                            <p className="text-sm">Duration: {activity.duration} minutes</p>
                          )}
                          {activity.type === "forum_post" && (
                            <p className="text-sm">{activity.replies} replies</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Learning Streak</CardTitle>
                <CardDescription>
                  You're on a 5-day learning streak!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div 
                        key={day}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${day <= 5 ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-muted-foreground">days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>
                  Milestones and badges you've earned or are working towards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <Badge variant="outline">{achievement.xp} XP</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          
                          <div className="mt-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-right mt-1 text-muted-foreground">
                              {achievement.progress} / {achievement.total}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,450</div>
                  <p className="text-xs text-muted-foreground">+250 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">37.5 hrs</div>
                  <p className="text-xs text-muted-foreground">+4.2 hrs this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 this week</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Learning Distribution</CardTitle>
                <CardDescription>
                  How you've spent your study time across languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Spanish</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Japanese</span>
                      <span className="text-sm text-muted-foreground">30%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">French</span>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">German</span>
                      <span className="text-sm text-muted-foreground">10%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Collaborators</CardTitle>
                <CardDescription>
                  People you've studied with recently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <div key={id} className="flex flex-col items-center space-y-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{String.fromCharCode(64 + id)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">User {id}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Activity;