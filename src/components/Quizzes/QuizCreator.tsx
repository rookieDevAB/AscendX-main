import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2, ArrowRight, Save } from "lucide-react";
import { QuizData, QuizQuestion } from './Quiz';

interface QuizCreatorProps {
  onSave: (quiz: QuizData) => void;
  onCancel: () => void;
}

export const QuizCreator = ({ onSave, onCancel }: QuizCreatorProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [quizDetails, setQuizDetails] = useState<Omit<QuizData, 'id' | 'questions'>>({
    title: '',
    description: '',
    subject: '',
    class: '',
  });
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: '1',
      text: '',
      options: ['', '', '', ''],
      correctOption: 0,
    }
  ]);

  const handleQuizDetailsChange = (field: keyof typeof quizDetails, value: string) => {
    setQuizDetails({
      ...quizDetails,
      [field]: value,
    });
  };

  const handleQuestionChange = <K extends keyof QuizQuestion>(index: number, field: K, value: QuizQuestion[K]) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    const updatedOptions = [...updatedQuestions[questionIndex].options];
    updatedOptions[optionIndex] = value;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions,
    };
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      correctOption: parseInt(value),
    };
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: (questions.length + 1).toString(),
        text: '',
        options: ['', '', '', ''],
        correctOption: 0,
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, idx) => idx !== index);
      setQuestions(updatedQuestions);
    }
  };

  const handleSave = () => {
    const quiz: QuizData = {
      id: `quiz-${Date.now()}`,
      ...quizDetails,
      questions,
    };
    onSave(quiz);
  };

  const isDetailsValid = () => {
    return (
      quizDetails.title.trim() !== '' &&
      quizDetails.subject.trim() !== '' &&
      quizDetails.class.trim() !== ''
    );
  };

  const isQuestionsValid = () => {
    return questions.every(q => 
      q.text.trim() !== '' && 
      q.options.every(opt => opt.trim() !== '')
    );
  };

  const goToQuestions = () => {
    if (isDetailsValid()) {
      setActiveTab("questions");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Quiz</CardTitle>
        <CardDescription>
          Fill in the details and add questions to create your custom quiz
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Quiz Details</TabsTrigger>
            <TabsTrigger value="questions" disabled={!isDetailsValid()}>Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Quiz Title *</Label>
                <Input 
                  id="title" 
                  placeholder="Enter quiz title" 
                  value={quizDetails.title}
                  onChange={(e) => handleQuizDetailsChange('title', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter a brief description of the quiz" 
                  value={quizDetails.description || ''}
                  onChange={(e) => handleQuizDetailsChange('description', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input 
                    id="subject" 
                    placeholder="Enter subject" 
                    value={quizDetails.subject}
                    onChange={(e) => handleQuizDetailsChange('subject', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Class/Grade *</Label>
                  <Input 
                    id="class" 
                    placeholder="Enter class or grade" 
                    value={quizDetails.class}
                    onChange={(e) => handleQuizDetailsChange('class', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button onClick={goToQuestions} disabled={!isDetailsValid()}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="questions">
            <div className="space-y-6">
              {questions.map((question, questionIndex) => (
                <Card key={questionIndex} className="border-dashed">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Question {questionIndex + 1}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeQuestion(questionIndex)}
                        disabled={questions.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                      <Textarea 
                        id={`question-${questionIndex}`} 
                        placeholder="Enter your question"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-4">
                      <Label>Options</Label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex gap-2 items-center">
                          <div className="w-8 flex-none text-center">{String.fromCharCode(65 + optionIndex)}.</div>
                          <Input 
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`correct-answer-${questionIndex}`}>Correct Option</Label>
                      <Select 
                        value={question.correctOption.toString()}
                        onValueChange={(value) => handleCorrectOptionChange(questionIndex, value)}
                      >
                        <SelectTrigger id={`correct-answer-${questionIndex}`}>
                          <SelectValue placeholder="Select correct option" />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options.map((_, optionIndex) => (
                            <SelectItem key={optionIndex} value={optionIndex.toString()}>
                              Option {String.fromCharCode(65 + optionIndex)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full" onClick={addQuestion}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={!isDetailsValid() || !isQuestionsValid() || activeTab !== "questions"}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}; 