
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function AiQuizWidget() {
  const navigate = useNavigate();
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>AI-Powered Quizzes</CardTitle>
        <CardDescription>Personalized adaptive learning experiences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="custom">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Create Custom Quiz</h4>
              <p className="text-xs text-muted-foreground">Generate quizzes based on your preferences</p>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="border rounded p-2 text-center cursor-pointer hover:border-education-primary">
                  <Badge className="bg-difficulty-beginner/20 text-difficulty-beginner hover:bg-difficulty-beginner/30">Beginner</Badge>
                </div>
                <div className="border rounded p-2 text-center cursor-pointer hover:border-education-primary">
                  <Badge className="bg-difficulty-intermediate/20 text-difficulty-intermediate hover:bg-difficulty-intermediate/30">Intermediate</Badge>
                </div>
                <div className="border rounded p-2 text-center cursor-pointer hover:border-education-primary">
                  <Badge className="bg-difficulty-advanced/20 text-difficulty-advanced hover:bg-difficulty-advanced/30">Advanced</Badge>
                </div>
                <div className="border rounded p-2 text-center cursor-pointer hover:border-education-primary">
                  <Badge className="bg-difficulty-expert/20 text-difficulty-expert hover:bg-difficulty-expert/30">Expert</Badge>
                </div>
              </div>
            </div>
            
            <Button onClick={() => navigate('/quiz-center')} className="w-full btn-secondary">Generate Quiz</Button>
          </TabsContent>
          
          <TabsContent value="daily" className="mt-4">
            <div className="flex justify-center items-center flex-col gap-3 py-6">
              <div className="w-24 h-24 rounded-full bg-education-light-purple flex items-center justify-center animate-pulse-subtle">
                <span className="text-2xl font-semibold text-education-secondary">New!</span>
              </div>
              <h4 className="text-center text-sm font-medium mt-2">Today's Quiz Ready!</h4>
              <p className="text-xs text-center text-muted-foreground">5 minutes · 10 questions</p>
              <Button onClick={() => navigate('/quiz-center')} className="mt-2 btn-secondary">Start Quiz</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="practice" className="mt-4">
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Practice weak areas based on your performance</p>
              
              <div onClick={() => navigate('/quiz-center')} className="border rounded-md p-3 hover:border-education-primary cursor-pointer">
                <div className="flex justify-between">
                  <h5 className="text-sm font-medium">Grammar Practice</h5>
                  <Badge variant="outline">5 min</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Focus on past tense conjugations</p>
              </div>
              
              <div onClick={() => navigate('/quiz-center')} className="border rounded-md p-3 hover:border-education-primary cursor-pointer">
                <div className="flex justify-between">
                  <h5 className="text-sm font-medium">Vocabulary Builder</h5>
                  <Badge variant="outline">8 min</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Common household terms and phrases</p>
              </div>
              
              <Button onClick={() => navigate('/quiz-center')} className="w-full btn-secondary mt-2">View All Practice Sets</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
