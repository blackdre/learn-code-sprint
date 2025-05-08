
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, User, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">CodeQuiz</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Courses
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Challenges
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Leaderboard
          </a>
        </nav>
        
        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            My Progress
          </Button>
          <Button size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <a href="#" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors">
                Dashboard
              </a>
              <a href="#" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors">
                Courses
              </a>
              <a href="#" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors">
                Challenges
              </a>
              <a href="#" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors">
                Leaderboard
              </a>
              <a href="#" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors">
                My Progress
              </a>
              <a href="#" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors">
                Sign In
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
