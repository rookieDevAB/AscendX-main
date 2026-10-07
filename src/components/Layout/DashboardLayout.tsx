import { ReactNode } from "react";
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BookOpen, Home, BarChart, Book, Calendar, User, Search, Settings, GraduationCap, Brain, Library, Activity } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <div className="px-4 py-3">
              <h2 className="text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-800">AscendX</h2>
              <p className="text-xs text-muted-foreground">Adaptive learning platform</p>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/" className="flex items-center gap-x-2 font-medium">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/courses" className="flex items-center gap-x-2 font-medium">
                        <BookOpen className="h-4 w-4" />
                        <span>Courses</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/quizzes" className="flex items-center gap-x-2 font-medium">
                        <Book className="h-4 w-4" />
                        <span>NCERT Quizzes</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/quiz-center" className="flex items-center gap-x-2 font-medium">
                        <Brain className="h-4 w-4" />
                        <span>Quiz Center</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/progress" className="flex items-center gap-x-2 font-medium">
                        <BarChart className="h-4 w-4" />
                        <span>Progress</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/schedule" className="flex items-center gap-x-2 font-medium">
                        <Calendar className="h-4 w-4" />
                        <span>Schedule</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/ncert-books" className="flex items-center gap-x-2 font-medium">
                        <GraduationCap className="h-4 w-4" />
                        <span>NCERT Books</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/books" className="flex items-center gap-x-2 font-medium">
                        <Library className="h-4 w-4" />
                        <span>Language Library</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/activity" className="flex items-center gap-x-2 font-medium">
                        <Activity className="h-4 w-4" />
                        <span>Activity Log</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>User</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/profile" className="flex items-center gap-x-2 font-medium">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/search" className="flex items-center gap-x-2 font-medium">
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/settings" className="flex items-center gap-x-2 font-medium">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 p-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <SidebarTrigger />
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">Welcome, Student</div>
              <div className="h-8 w-8 rounded-full bg-education-primary text-white flex items-center justify-center">
                <span className="text-xs font-medium">S</span>
              </div>
            </div>
          </header>
          
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
