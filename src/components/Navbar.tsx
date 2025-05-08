
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, User, Menu, LayoutDashboard, Book, Flame, Trophy } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">CodeQuiz</h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Book className="h-4 w-4" />
            Courses
          </Link>
          <Link to="/challenges" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Flame className="h-4 w-4" />
            Challenges
          </Link>
          <Link to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </Link>
        </nav>
        
        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">
              <BookOpen className="h-4 w-4 mr-2" />
              My Progress
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/signin">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">
              Sign Up
            </Link>
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
              <Link to="/dashboard" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link to="/courses" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors flex items-center gap-2">
                <Book className="h-4 w-4" />
                Courses
              </Link>
              <Link to="/challenges" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Challenges
              </Link>
              <Link to="/leaderboard" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Link>
              <Link to="/dashboard" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                My Progress
              </Link>
              <Link to="/signin" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors flex items-center gap-2">
                <User className="h-4 w-4" />
                Sign In
              </Link>
              <Link to="/signup" className="px-2 py-1 hover:bg-secondary rounded-md transition-colors">
                Sign Up
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
