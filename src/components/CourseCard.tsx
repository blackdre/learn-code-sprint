
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Book, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    totalQuestions: number;
    completedQuestions: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const progress = Math.round((course.completedQuestions / course.totalQuestions) * 100);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full transition-transform hover:translate-y-[-5px] hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Book className="h-4 w-4 text-primary mr-2" />
            <CardTitle className="text-lg font-medium">{course.title}</CardTitle>
          </div>
          <div className={`${getDifficultyColor(course.difficulty)} text-white text-xs px-2 py-1 rounded-full`}>
            {course.difficulty}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm">{course.description}</p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="ghost" className="w-full justify-between">
          Start Course <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
