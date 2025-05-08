
export interface Course {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  completedQuestions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Question {
  id: string;
  courseId: string;
  title: string;
  description: string;
  initialCode: string;
  language: string;
  solution: string;
}

export const courses: Course[] = [
  {
    id: 'js-basics',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language with hands-on coding challenges.',
    totalQuestions: 5,
    completedQuestions: 2,
    difficulty: 'beginner',
  },
  {
    id: 'react-intro',
    title: 'Introduction to React',
    description: 'Get started with React and build your first components and applications.',
    totalQuestions: 6,
    completedQuestions: 1,
    difficulty: 'intermediate',
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Data Structures',
    description: 'Master common algorithms and data structures used in programming interviews.',
    totalQuestions: 8,
    completedQuestions: 0,
    difficulty: 'advanced',
  },
  {
    id: 'css-master',
    title: 'CSS Mastery',
    description: 'Level up your CSS skills with advanced styling techniques and layouts.',
    totalQuestions: 4,
    completedQuestions: 3,
    difficulty: 'intermediate',
  },
];

export const questions: Question[] = [
  {
    id: 'js-1',
    courseId: 'js-basics',
    title: 'Variables and Data Types',
    description: 'Create a variable named "greeting" with the value "Hello, World!" and log it to the console.',
    initialCode: '// Write your code here\n\n',
    language: 'JavaScript',
    solution: 'console.log',
  },
  {
    id: 'js-2',
    courseId: 'js-basics',
    title: 'Functions',
    description: 'Create a function named "add" that takes two parameters and returns their sum.',
    initialCode: '// Write your code here\n\n// Example: add(2, 3) should return 5',
    language: 'JavaScript',
    solution: 'return',
  },
  {
    id: 'js-3',
    courseId: 'js-basics',
    title: 'Arrays',
    description: 'Create an array with the numbers 1 through 5, then write code to sum all the values.',
    initialCode: '// Create your array\nconst numbers = [];\n\n// Write code to sum all values\n',
    language: 'JavaScript',
    solution: 'reduce',
  },
  {
    id: 'react-1',
    courseId: 'react-intro',
    title: 'Creating Components',
    description: 'Create a React functional component named "Greeting" that renders a heading with the text "Hello, React!".',
    initialCode: '// Write your component here\n',
    language: 'React/JSX',
    solution: 'function Greeting',
  },
  {
    id: 'react-2',
    courseId: 'react-intro',
    title: 'Props',
    description: 'Update the Greeting component to accept a "name" prop and display "Hello, [name]!" instead of "Hello, React!".',
    initialCode: 'function Greeting() {\n  return <h1>Hello, React!</h1>;\n}\n',
    language: 'React/JSX',
    solution: 'props',
  },
  {
    id: 'algo-1',
    courseId: 'algorithms',
    title: 'Find Max Value',
    description: 'Write a function that finds the maximum value in an array of numbers.',
    initialCode: 'function findMax(arr) {\n  // Your code here\n}\n',
    language: 'JavaScript',
    solution: 'Math.max',
  }
];

export const getCurrentQuestion = (courseId: string) => {
  return questions.find(q => q.courseId === courseId);
};
