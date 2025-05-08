
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { courses } from '@/data/quizData';
import { BarChart, LineChart } from 'lucide-react';

const Dashboard = () => {
  // Calculate overall progress
  const totalQuestions = courses.reduce((acc, course) => acc + course.totalQuestions, 0);
  const completedQuestions = courses.reduce((acc, course) => acc + course.completedQuestions, 0);
  const overallProgress = Math.round((completedQuestions / totalQuestions) * 100);
  
  // Recent activity (mock data)
  const recentActivity = [
    { id: 1, activity: 'Completed "Variables and Data Types"', time: '2 hours ago' },
    { id: 2, activity: 'Started "Introduction to React" course', time: '1 day ago' },
    { id: 3, activity: 'Earned "JavaScript Basics" badge', time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Overall Progress Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm mb-2">
                <span>Progress</span>
                <span className="font-medium">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                {completedQuestions} of {totalQuestions} questions completed
              </p>
            </CardContent>
          </Card>
          
          {/* Streak Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Streak</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">7</span>
                <span className="text-muted-foreground text-sm">days</span>
                <div className="flex gap-1 mt-3">
                  {[...Array(7)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-6 rounded-full ${i < 5 ? 'bg-primary' : 'bg-secondary'}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Ranking Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Ranking</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">#42</span>
                <span className="text-muted-foreground text-sm">out of 156 students</span>
                <p className="mt-3 text-sm text-center">
                  Keep going! You're in the top 30%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Course Progress Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Course Progress</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Your progress across all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => {
                  const courseProgress = Math.round((course.completedQuestions / course.totalQuestions) * 100);
                  return (
                    <div key={course.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{course.title}</span>
                        <span className="font-medium">{courseProgress}%</span>
                      </div>
                      <Progress value={courseProgress} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Your latest actions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <p>{activity.activity}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
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

export default Dashboard;
