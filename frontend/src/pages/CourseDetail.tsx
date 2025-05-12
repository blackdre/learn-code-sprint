
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useCourses } from '@/contexts/CoursesContext';
import { questions } from '@/data/quizData';
import QuizQuestion from '@/components/QuizQuestion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Book, BookOpen, Video, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface CourseMaterial {
  id: string;
  title: string;
  type: 'reading' | 'video' | 'quiz';
  content: string;
  videoUrl?: string;
  completed: boolean;
  quizId?: string;
}

interface CourseSection {
  id: string;
  title: string;
  materials: CourseMaterial[];
}

// Mock course sections and materials data
const courseSectionsData: Record<string, CourseSection[]> = {
  'js-basics': [
    {
      id: 'section-1',
      title: 'Introduction to JavaScript',
      materials: [
        {
          id: 'js-intro-1',
          title: 'What is JavaScript?',
          type: 'reading',
          content: `
          <h2>Introduction to JavaScript</h2>
          <p>JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications, and nearly every website uses it for client-side page behavior.</p>
          <p>JavaScript is:</p>
          <ul>
            <li>High-level, interpreted programming language</li>
            <li>Conforms to the ECMAScript specification</li>
            <li>Multi-paradigm, supporting event-driven, functional, and imperative programming styles</li>
            <li>Used both on the client-side and server-side</li>
          </ul>
          <p>JavaScript was originally created by Brendan Eich at Netscape in 1995. It has since evolved into one of the world's most widely used programming languages.</p>
          `,
          completed: true
        },
        {
          id: 'js-intro-2',
          title: 'JavaScript in Web Development',
          type: 'video',
          content: 'Learn about the role of JavaScript in modern web development',
          videoUrl: 'https://www.youtube.com/embed/DHjqpvDnNGE',
          completed: false
        },
        {
          id: 'js-intro-quiz',
          title: 'JavaScript Basics Quiz',
          type: 'quiz',
          content: 'Test your understanding of JavaScript basics',
          quizId: 'js-1',
          completed: false
        }
      ]
    },
    {
      id: 'section-2',
      title: 'JavaScript Variables and Data Types',
      materials: [
        {
          id: 'js-variables-1',
          title: 'Variables in JavaScript',
          type: 'reading',
          content: `
          <h2>Variables in JavaScript</h2>
          <p>Variables are containers for storing data values. In JavaScript, there are three ways to declare variables:</p>
          <ul>
            <li><code>var</code> - The traditional way to declare variables (function scoped)</li>
            <li><code>let</code> - Introduced in ES6, allows you to declare block-scoped variables</li>
            <li><code>const</code> - Also introduced in ES6, used for variables whose values should not change</li>
          </ul>
          <h3>Examples:</h3>
          <pre>
// Using var
var name = "John";

// Using let
let age = 25;

// Using const
const PI = 3.14159;
          </pre>
          <p>It's generally recommended to use <code>const</code> by default, and only use <code>let</code> when you know the value will change.</p>
          `,
          completed: false
        },
        {
          id: 'js-datatypes-1',
          title: 'Data Types in JavaScript',
          type: 'reading',
          content: `
          <h2>Data Types in JavaScript</h2>
          <p>JavaScript has several built-in data types:</p>
          <h3>Primitive Data Types:</h3>
          <ul>
            <li><strong>String</strong>: Represents textual data. Example: <code>"Hello World"</code></li>
            <li><strong>Number</strong>: Represents numeric values. Example: <code>42</code> or <code>3.14</code></li>
            <li><strong>Boolean</strong>: Represents logical values. Example: <code>true</code> or <code>false</code></li>
            <li><strong>Undefined</strong>: Represents a variable that has been declared but not assigned a value.</li>
            <li><strong>Null</strong>: Represents the intentional absence of any object value.</li>
            <li><strong>Symbol</strong>: (ES6) Represents a unique identifier.</li>
            <li><strong>BigInt</strong>: Represents integers in the arbitrary precision format.</li>
          </ul>
          <h3>Reference Data Types:</h3>
          <ul>
            <li><strong>Object</strong>: Represents a collection of related data.</li>
            <li><strong>Array</strong>: A special type of object used for storing ordered collections.</li>
            <li><strong>Function</strong>: A callable object that executes a block of code.</li>
            <li><strong>Date</strong>: Represents dates and times.</li>
            <li><strong>RegExp</strong>: Represents regular expressions.</li>
          </ul>
          `,
          completed: false
        },
        {
          id: 'js-variables-video',
          title: 'Working with Variables',
          type: 'video',
          content: 'Learn how to work with variables and data types in JavaScript',
          videoUrl: 'https://www.youtube.com/embed/edlFjlzxkSI',
          completed: false
        },
        {
          id: 'js-datatypes-quiz',
          title: 'Variables and Data Types Quiz',
          type: 'quiz',
          content: 'Test your understanding of JavaScript variables and data types',
          quizId: 'js-2',
          completed: false
        }
      ]
    }
  ],
  'react-intro': [
    {
      id: 'section-1',
      title: 'Introduction to React',
      materials: [
        {
          id: 'react-intro-1',
          title: 'What is React?',
          type: 'reading',
          content: `
          <h2>Introduction to React</h2>
          <p>React is a JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer in web and mobile apps.</p>
          <p>Key features of React include:</p>
          <ul>
            <li>Virtual DOM for better performance</li>
            <li>Component-based architecture</li>
            <li>Declarative UI</li>
            <li>Unidirectional data flow</li>
            <li>JSX syntax</li>
          </ul>
          <p>React was developed by Facebook and released in 2013. It has since become one of the most popular frontend libraries.</p>
          `,
          completed: false
        },
        {
          id: 'react-intro-video',
          title: 'React Fundamentals',
          type: 'video',
          content: 'Learn the core concepts of React',
          videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
          completed: false
        }
      ]
    }
  ]
};

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const [currentTab, setCurrentTab] = useState('overview');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
  const [completedMaterials, setCompletedMaterials] = useState<string[]>([]);
  
  // Find the current course from the courseId
  const course = courses.find(c => c.id === courseId);
  
  // Get course sections from mock data
  const courseSections = courseId ? courseSectionsData[courseId] || [] : [];
  
  // Calculate overall progress
  const totalMaterials = courseSections.reduce((total, section) => total + section.materials.length, 0);
  const initialCompletedCount = courseSections.reduce((total, section) => {
    return total + section.materials.filter(material => material.completed).length;
  }, 0);
  
  const [completedCount, setCompletedCount] = useState(initialCompletedCount);
  const progress = totalMaterials > 0 ? Math.round((completedCount / totalMaterials) * 100) : 0;
  
  // Current section and material
  const currentSection = courseSections[currentSectionIndex] || null;
  const currentMaterial = currentSection?.materials[currentMaterialIndex] || null;
  
  // Mark material as completed
  const markAsCompleted = (materialId: string) => {
    if (!completedMaterials.includes(materialId)) {
      const newCompletedMaterials = [...completedMaterials, materialId];
      setCompletedMaterials(newCompletedMaterials);
      setCompletedCount(completedCount + 1);
    }
  };
  
  // Handle quiz completion
  const handleQuizCompleted = (questionId: string) => {
    if (currentMaterial && currentMaterial.type === 'quiz') {
      markAsCompleted(currentMaterial.id);
    }
  };
  
  // Navigation between materials
  const goToNextMaterial = () => {
    if (currentSection) {
      if (currentMaterialIndex < currentSection.materials.length - 1) {
        setCurrentMaterialIndex(currentMaterialIndex + 1);
      } else if (currentSectionIndex < courseSections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setCurrentMaterialIndex(0);
      }
    }
    
    if (currentMaterial && !completedMaterials.includes(currentMaterial.id)) {
      markAsCompleted(currentMaterial.id);
    }
  };
  
  const goToPreviousMaterial = () => {
    if (currentMaterialIndex > 0) {
      setCurrentMaterialIndex(currentMaterialIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      const prevSectionMaterialsLength = courseSections[currentSectionIndex - 1].materials.length;
      setCurrentMaterialIndex(prevSectionMaterialsLength - 1);
    }
  };
  
  // Navigate to specific material
  const navigateToMaterial = (sectionIndex: number, materialIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentMaterialIndex(materialIndex);
    setCurrentTab('learn');
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Course Not Found</CardTitle>
              <CardDescription>We couldn't find the course you're looking for.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/courses')} className="w-full">
                Back to Courses
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses')} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center mb-2">
              <h1 className="text-3xl font-bold mr-3">{course.title}</h1>
              <Badge className={`
                ${course.difficulty === 'beginner' ? 'bg-green-500' : 
                  course.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'}
              `}>
                {course.difficulty}
              </Badge>
            </div>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="flex flex-col mr-4">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="w-[100px] h-2" />
          </div>
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>
                      {totalMaterials} lessons • {Math.round(totalMaterials * 12)} min total length
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {courseSections.map((section, sectionIndex) => (
                      <div key={section.id} className="mb-6">
                        <h3 className="text-lg font-medium mb-3">{section.title}</h3>
                        <div className="space-y-2">
                          {section.materials.map((material, materialIndex) => {
                            const isCompleted = material.completed || completedMaterials.includes(material.id);
                            return (
                              <div 
                                key={material.id}
                                className="flex items-center p-3 rounded-md hover:bg-secondary cursor-pointer transition-colors"
                                onClick={() => navigateToMaterial(sectionIndex, materialIndex)}
                              >
                                <div className="mr-3">
                                  {isCompleted ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    material.type === 'reading' ? (
                                      <Book className="h-5 w-5 text-blue-500" />
                                    ) : material.type === 'video' ? (
                                      <Video className="h-5 w-5 text-red-500" />
                                    ) : (
                                      <BookOpen className="h-5 w-5 text-purple-500" />
                                    )
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{material.title}</h4>
                                  <div className="flex items-center mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {material.type === 'reading' ? 'Reading' : 
                                        material.type === 'video' ? 'Video' : 'Quiz'}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground ml-2">
                                      {material.type === 'reading' ? '~5 min' : 
                                        material.type === 'video' ? '~10 min' : '~15 min'}
                                    </span>
                                  </div>
                                </div>
                                {isCompleted && (
                                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Progress</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2">Stats</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-secondary rounded-md p-3">
                            <div className="text-muted-foreground text-sm">Completed</div>
                            <div className="text-xl font-bold">{completedCount}</div>
                          </div>
                          <div className="bg-secondary rounded-md p-3">
                            <div className="text-muted-foreground text-sm">Remaining</div>
                            <div className="text-xl font-bold">{totalMaterials - completedCount}</div>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => setCurrentTab('learn')}
                      >
                        {completedCount > 0 ? 'Continue Learning' : 'Start Learning'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="learn">
            {currentMaterial ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{currentMaterial.title}</h2>
                  <Badge variant="outline">
                    {currentMaterial.type === 'reading' ? 'Reading' : 
                      currentMaterial.type === 'video' ? 'Video' : 'Quiz'}
                  </Badge>
                </div>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    {currentMaterial.type === 'reading' && (
                      <div 
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: currentMaterial.content }}
                      />
                    )}
                    
                    {currentMaterial.type === 'video' && currentMaterial.videoUrl && (
                      <div className="aspect-video">
                        <iframe 
                          src={currentMaterial.videoUrl}
                          className="w-full h-full rounded-md"
                          title={currentMaterial.title}
                          allowFullScreen
                        />
                      </div>
                    )}
                    
                    {currentMaterial.type === 'quiz' && currentMaterial.quizId && (
                      <div>
                        <QuizQuestion 
                          question={questions.find(q => q.id === currentMaterial.quizId) || questions[0]}
                          onCompleted={handleQuizCompleted}
                          onNext={goToNextMaterial}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={goToPreviousMaterial}
                    disabled={currentSectionIndex === 0 && currentMaterialIndex === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  
                  {(currentMaterial.type !== 'quiz') && (
                    <Button onClick={goToNextMaterial}>
                      {completedMaterials.includes(currentMaterial.id) ? 'Next' : 'Mark as Completed'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No content available</h3>
                <p className="text-muted-foreground mb-6">This course doesn't have any learning material yet</p>
                <Button onClick={() => navigate('/courses')}>
                  Back to Courses
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
                <CardDescription>
                  Additional materials to help you master the content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start p-4 rounded-md border border-border">
                    <Book className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Course E-Book</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        A comprehensive guide covering all topics in this course
                      </p>
                      <Button variant="outline" size="sm">Download PDF</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 rounded-md border border-border">
                    <BookOpen className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Cheat Sheet</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Quick reference for key concepts and syntax
                      </p>
                      <Button variant="outline" size="sm">View Cheat Sheet</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 rounded-md border border-border">
                    <Video className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Supplementary Videos</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Additional video tutorials covering advanced topics
                      </p>
                      <Button variant="outline" size="sm">Browse Videos</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default CourseDetail;
