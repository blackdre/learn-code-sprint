
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Trophy } from 'lucide-react';

interface LeaderboardUser {
  id: number;
  username: string;
  fullName: string;
  avatar: string;
  score: number;
  rank: number;
  badges: string[];
  country: string;
  isCurrentUser?: boolean;
}

interface ChallengeUser {
  id: number;
  username: string;
  fullName: string;
  avatar: string;
  score: number;
  rank: number;
  timeToComplete: string;
  isCurrentUser?: boolean;
}

// Sample leaderboard data
const globalLeaderboardUsers: LeaderboardUser[] = [
  {
    id: 1,
    username: 'codeMaster',
    fullName: 'Alex Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    score: 9750,
    rank: 1,
    badges: ['Expert', 'Mentor', '100 Days'],
    country: 'United States'
  },
  {
    id: 2,
    username: 'devNinja',
    fullName: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    score: 9320,
    rank: 2,
    badges: ['Advanced', '50 Days'],
    country: 'Canada'
  },
  {
    id: 3,
    username: 'jsWizard',
    fullName: 'Miguel Lopez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
    score: 8790,
    rank: 3,
    badges: ['Skilled', 'Helper'],
    country: 'Spain'
  },
  {
    id: 4,
    username: 'You',
    fullName: 'Your Name',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    score: 7250,
    rank: 4,
    badges: ['Intermediate', '30 Days'],
    country: 'Your Country',
    isCurrentUser: true
  },
  {
    id: 5,
    username: 'pythonDev',
    fullName: 'Priya Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    score: 6800,
    rank: 5,
    badges: ['Beginner'],
    country: 'India'
  },
];

// Sample challenge leaderboard data
const challengeLeaderboardUsers: ChallengeUser[] = [
  {
    id: 1,
    username: 'speedCoder',
    fullName: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    score: 100,
    rank: 1,
    timeToComplete: '00:45:12'
  },
  {
    id: 2,
    username: 'algorithmAce',
    fullName: 'Emma Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    score: 98,
    rank: 2,
    timeToComplete: '00:48:35'
  },
  {
    id: 3,
    username: 'You',
    fullName: 'Your Name',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    score: 95,
    rank: 3,
    timeToComplete: '00:52:18',
    isCurrentUser: true
  },
  {
    id: 4,
    username: 'debugMaster',
    fullName: 'Oliver Garcia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
    score: 92,
    rank: 4,
    timeToComplete: '00:53:40'
  },
  {
    id: 5,
    username: 'codeArtist',
    fullName: 'Sophia Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    score: 90,
    rank: 5,
    timeToComplete: '00:55:22'
  },
];

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState('global');
  
  // Filter users based on search query
  const filterUsersBySearch = (users: LeaderboardUser[] | ChallengeUser[]) => {
    if (!searchQuery) return users;
    
    return users.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Filter global leaderboard by time
  const filteredGlobalUsers = filterUsersBySearch(globalLeaderboardUsers);
  const filteredChallengeUsers = filterUsersBySearch(challengeLeaderboardUsers);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">
              See how you stack up against other coders
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="font-bold">Your Rank: 4</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select 
            value={timeFilter} 
            onValueChange={setTimeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Badges</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGlobalUsers.map((user) => (
                  <TableRow key={user.id} className={user.isCurrentUser ? "bg-muted/50" : ""}>
                    <TableCell className="font-medium">
                      {user.rank === 1 && <span className="text-yellow-500 font-bold">🏆 {user.rank}</span>}
                      {user.rank === 2 && <span className="text-gray-400 font-bold">🥈 {user.rank}</span>}
                      {user.rank === 3 && <span className="text-amber-600 font-bold">🥉 {user.rank}</span>}
                      {user.rank > 3 && <span>{user.rank}</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.username} />
                          <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {user.username}
                            {user.isCurrentUser && <Badge variant="outline" className="ml-2">You</Badge>}
                          </div>
                          <div className="text-sm text-muted-foreground">{user.fullName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{user.score.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="friends">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Connect with friends</h3>
              <p className="text-muted-foreground mb-6">Add friends to see how you compare with them</p>
              <Button>Find Friends</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="challenges">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Time to Complete</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChallengeUsers.map((user) => (
                  <TableRow key={user.id} className={user.isCurrentUser ? "bg-muted/50" : ""}>
                    <TableCell className="font-medium">
                      {user.rank === 1 && <span className="text-yellow-500 font-bold">🏆 {user.rank}</span>}
                      {user.rank === 2 && <span className="text-gray-400 font-bold">🥈 {user.rank}</span>}
                      {user.rank === 3 && <span className="text-amber-600 font-bold">🥉 {user.rank}</span>}
                      {user.rank > 3 && <span>{user.rank}</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.username} />
                          <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {user.username}
                            {user.isCurrentUser && <Badge variant="outline" className="ml-2">You</Badge>}
                          </div>
                          <div className="text-sm text-muted-foreground">{user.fullName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.timeToComplete}</TableCell>
                    <TableCell className="text-right font-medium">{user.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

export default Leaderboard;
