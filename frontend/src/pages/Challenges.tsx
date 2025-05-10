
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { questions } from '@/data/quizData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Trophy, Flame, Star, ArrowRight, Lock } from 'lucide-react';

// Define challenge difficulty levels with corresponding colors
const difficultyColors = {
  easy: "bg-green-500",
  medium: "bg-yellow-500",
  hard: "bg-red-500"
};

// Mock challenges data
const challenges = [
  {
    id: "ch1",
    title: "FizzBuzz Challenge",
    description: "Write a function that returns 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, and 'FizzBuzz' for multiples of both.",
    difficulty: "easy",
    timeLimit: "10 minutes",
    points: 50,
    tags: ["algorithms", "conditionals"],
    completed: true
  },
  {
    id: "ch2",
    title: "Palindrome Checker",
    description: "Create a function to check if a string is a palindrome (reads the same forwards and backwards).",
    difficulty: "medium",
    timeLimit: "15 minutes",
    points: 100,
    tags: ["strings", "algorithms"],
    completed: false
  },
  {
    id: "ch3",
    title: "Binary Search Implementation",
    description: "Implement a binary search algorithm to efficiently find an element in a sorted array.",
    difficulty: "hard",
    timeLimit: "20 minutes",
    points: 200,
    tags: ["algorithms", "search", "recursion"],
    completed: false
  },
  {
    id: "ch4",
    title: "React Component Lifecycles",
    description: "Implement a React component that demonstrates the various lifecycle methods and hooks.",
    difficulty: "medium",
    timeLimit: "25 minutes",
    points: 150,
    tags: ["react", "hooks"],
    completed: false
  },
  {
    id: "ch5",
    title: "CSS Grid Layout Challenge",
    description: "Create a responsive grid layout using CSS Grid with specific requirements.",
    difficulty: "easy",
    timeLimit: "15 minutes",
    points: 75,
    tags: ["css", "layout"],
    completed: true
  },
];

// Weekly challenges data
const weeklyChallenge = {
  id: "wc1",
  title: "Space Invaders Clone",
  description: "Build a simplified version of the classic Space Invaders game using JavaScript.",
  difficulty: "hard",
  deadline: "Ends in 3 days",
  participants: 156,
  points: 500
};

const Challenges = () => {
  const [currentTab, setCurrentTab] = useState("all");
  
  const filteredChallenges = currentTab === "completed" 
    ? challenges.filter(ch => ch.completed) 
    : currentTab === "incomplete"
    ? challenges.filter(ch => !ch.completed)
    : challenges;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-2">Coding Challenges</h1>
        <p className="text-muted-foreground mb-8">
          Test your skills with timed coding challenges
        </p>
        
        {/* Weekly Challenge Card */}
        <Card className="mb-8 border-2 border-primary/30 bg-gradient-to-br from-background to-secondary/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-2">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-yellow-500">WEEKLY CHALLENGE</span>
                </div>
                <CardTitle className="text-xl">{weeklyChallenge.title}</CardTitle>
                <CardDescription className="mt-1">{weeklyChallenge.description}</CardDescription>
              </div>
              <Badge className="bg-red-500">{weeklyChallenge.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm">{weeklyChallenge.deadline}</span>
              </div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm">{weeklyChallenge.participants} participants</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span className="text-sm">{weeklyChallenge.points} points</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Join Challenge
            </Button>
          </CardFooter>
        </Card>
        
        {/* Challenges List */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Challenges</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
          </TabsList>
          
          <TabsContent value={currentTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredChallenges.map(challenge => (
                <Card key={challenge.id} className={`transition-all ${challenge.completed ? 'opacity-80' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge className={difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-xs">{challenge.timeLimit}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span className="text-xs">{challenge.points} points</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {challenge.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    {challenge.completed ? (
                      <Button variant="outline" className="w-full">
                        Review Solution
                      </Button>
                    ) : (
                      <Button className="w-full justify-between">
                        Start Challenge
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              
              {/* Locked Challenge Teaser */}
              <Card className="border-dashed opacity-70">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Advanced Algorithms</CardTitle>
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Complete more challenges to unlock this advanced section</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="text-xs">Earn 300 more points to unlock</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="secondary" disabled className="w-full">
                    Locked
                  </Button>
                </CardFooter>
              </Card>
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

export default Challenges;
