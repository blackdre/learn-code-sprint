
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface QuizQuestionProps {
  question: {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    language: string;
    solution: string;
  };
  onCompleted: (questionId: string) => void;
  onNext: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onCompleted, onNext }) => {
  const [completed, setCompleted] = useState(false);

  const handleCodeSubmit = (code: string) => {
    // In a real app, this would be a much more sophisticated check
    const success = code.includes(question.solution);
    
    if (success && !completed) {
      setCompleted(true);
      onCompleted(question.id);
    }
    
    return {
      success,
      feedback: success 
        ? "Great job! Your solution is correct." 
        : "Not quite right. Try again!"
    };
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{question.title}</CardTitle>
          {completed && (
            <span className="flex items-center text-green-500 text-sm">
              <Check className="h-4 w-4 mr-1" />
              Completed
            </span>
          )}
        </div>
        <CardDescription className="mt-2">
          {question.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeEditor 
          initialCode={question.initialCode}
          language={question.language}
          onSubmit={handleCodeSubmit}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNext} variant="outline">
          Next Question
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
