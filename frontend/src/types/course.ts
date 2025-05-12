export interface Course {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  completedQuestions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}