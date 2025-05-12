
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import QuizQuestion from '@/components/QuizQuestion';
import { questions, getCurrentQuestion } from '@/data/quizData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCourses } from '@/contexts/CoursesContext';

const Index = () => {
  const {courses} = useCourses();
  const [completedQuestionIds, setCompletedQuestionIds] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const handleQuestionCompleted = (questionId: string) => {
    if (!completedQuestionIds.includes(questionId)) {
      setCompletedQuestionIds([...completedQuestionIds, questionId]);
    }
  };
  
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => 
      prev < questions.length - 1 ? prev + 1 : prev
    );
  };
  
  // Update the courses with our completed questions count
  const updatedCourses = courses.map(course => ({
    ...course,
    completedQuestions: completedQuestionIds.filter(id => 
      questions.find(q => q.id === id)?.courseId === course.id
    ).length
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to CodeQuiz</h1>
        <p className="text-muted-foreground mb-8">
          Master programming skills through interactive coding challenges
        </p>
        
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="practice">Practice Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {updatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="practice">
            <div className="max-w-3xl mx-auto">
              <QuizQuestion 
                question={questions[currentQuestionIndex]}
                onCompleted={handleQuestionCompleted}
                onNext={handleNextQuestion}
              />
              
              <div className="flex space-x-2 mb-8">
                {questions.slice(0, 5).map((_, index) => (
                  <div 
                    key={index}
                    className={`h-2 flex-1 rounded-full ${
                      index === currentQuestionIndex 
                        ? 'bg-primary animate-pulse-light' 
                        : index < currentQuestionIndex 
                          ? 'bg-primary' 
                          : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-bold">CodeQuiz LMS</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CodeQuiz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
