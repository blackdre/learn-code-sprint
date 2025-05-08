
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, Clock } from 'lucide-react';

// Mock leaderboard data
const leaderboardData = [
  {
    id: 1,
    username: "codeMaster",
    fullName: "Alex Johnson",
    avatar: "",
    score: 9850,
    rank: 1,
    badges: ["JavaScript Pro", "React Master"],
    streak: 42,
    country: "United States"
  },
  {
    id: 2,
    username: "devNinja",
    fullName: "Sarah Smith",
    avatar: "",
    score: 9720,
    rank: 2,
    badges: ["Algorithm Expert", "CSS Wizard"],
    streak: 36,
    country: "Canada"
  },
  {
    id: 3,
    username: "bugHunter",
    fullName: "Mike Chang",
    avatar: "",
    score: 9510,
    rank: 3,
    badges: ["Debugging Hero", "TypeScript Master"],
    streak: 28,
    country: "Australia"
  },
  {
    id: 4,
    username: "codeWizard",
    fullName: "Emma Wilson",
    avatar: "",
    score: 9350,
    rank: 4,
    badges: ["Full Stack Dev"],
    streak: 21,
    country: "United Kingdom"
  },
  {
    id: 5,
    username: "syntaxKing",
    fullName: "David Lee",
    avatar: "",
    score: 9120,
    rank: 5,
    badges: ["Python Expert", "Node Master"],
    streak: 19,
    country: "Germany"
  },
  {
    id: 6,
    username: "algorithmQueen",
    fullName: "Lisa Chen",
    avatar: "",
    score: 8950,
    rank: 6,
    badges: ["Data Structures Pro"],
    streak: 14,
    country: "Singapore"
  },
  {
    id: 7,
    username: "reactGuru",
    fullName: "James Wilson",
    avatar: "",
    score: 8780,
    rank: 7,
    badges: ["UI Master"],
    streak: 12,
    country: "India"
  },
  // Current user
  {
    id: 42,
    username: "yourUsername",
    fullName: "Your Name",
    avatar: "",
    score: 3650,
    rank: 42,
    badges: ["JavaScript Novice"],
    streak: 7,
    country: "Your Country",
    isCurrentUser: true
  }
];

// Weekly challenges leaderboard
const weeklyLeaderboardData = [
  {
    id: 101,
    username: "speedCoder",
    fullName: "Ryan Park",
    avatar: "",
    score: 850,
    rank: 1,
    timeToComplete: "14m 32s"
  },
  {
    id: 102,
    username: "hackMaster",
    fullName: "Olivia Wang",
    avatar: "",
    score: 820,
    rank: 2,
    timeToComplete: "15m 05s"
  },
  {
    id: 103,
    username: "codeNinja",
    fullName: "Ethan Brown",
    avatar: "",
    score: 780,
    rank: 3,
    timeToComplete: "16m 22s"
  },
  {
    id: 104,
    username: "yourUsername",
    fullName: "Your Name",
    avatar: "",
    score: 610,
    rank: 8,
    timeToComplete: "21m 48s",
    isCurrentUser: true
  }
];

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState('all-time');
  
  // Get the leaderboard based on the selected time frame
  const displayedLeaderboard = timeFrame === 'weekly' ? weeklyLeaderboardData : leaderboardData;
  
  // Find the current user
  const currentUser = displayedLeaderboard.find(user => user.isCurrentUser);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-8">
          See how you rank against other CodeQuiz users
        </p>

        <Tabs defaultValue="all-time" className="w-full mb-8" onValueChange={setTimeFrame}>
          <TabsList>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Challenge</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Top 3 Podium (only shown for all-time) */}
        {timeFrame === 'all-time' && (
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            {/* 2nd Place */}
            <div className="flex flex-col items-center order-1">
              <div className="bg-gradient-to-b from-gray-300 to-gray-400 w-20 h-20 rounded-full flex items-center justify-center mb-2">
                <Medal className="h-10 w-10 text-white" />
              </div>
              <div className="bg-secondary h-28 w-full rounded-t-lg flex flex-col items-center justify-end p-3">
                <Avatar className="h-12 w-12 mb-1 border-2 border-gray-300">
                  <div className="flex h-full w-full items-center justify-center bg-muted text-lg font-semibold">
                    {leaderboardData[1].username.charAt(0).toUpperCase()}
                  </div>
                </Avatar>
                <p className="text-sm font-medium">{leaderboardData[1].username}</p>
                <p className="text-xs text-muted-foreground">{leaderboardData[1].score} pts</p>
              </div>
            </div>
            
            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-6 order-0">
              <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 w-24 h-24 rounded-full flex items-center justify-center mb-2 ring-2 ring-yellow-400 ring-opacity-50">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <div className="bg-secondary h-36 w-full rounded-t-lg flex flex-col items-center justify-end p-3">
                <Badge className="bg-yellow-500 mb-1">Champion</Badge>
                <Avatar className="h-14 w-14 mb-1 border-2 border-yellow-500">
                  <div className="flex h-full w-full items-center justify-center bg-muted text-lg font-semibold">
                    {leaderboardData[0].username.charAt(0).toUpperCase()}
                  </div>
                </Avatar>
                <p className="font-medium">{leaderboardData[0].username}</p>
                <p className="text-sm text-muted-foreground">{leaderboardData[0].score} pts</p>
              </div>
            </div>
            
            {/* 3rd Place */}
            <div className="flex flex-col items-center order-2">
              <div className="bg-gradient-to-b from-amber-600 to-amber-800 w-18 h-18 rounded-full flex items-center justify-center mb-2">
                <Award className="h-9 w-9 text-white" />
              </div>
              <div className="bg-secondary h-24 w-full rounded-t-lg flex flex-col items-center justify-end p-3">
                <Avatar className="h-10 w-10 mb-1 border-2 border-amber-700">
                  <div className="flex h-full w-full items-center justify-center bg-muted text-lg font-semibold">
                    {leaderboardData[2].username.charAt(0).toUpperCase()}
                  </div>
                </Avatar>
                <p className="text-sm font-medium">{leaderboardData[2].username}</p>
                <p className="text-xs text-muted-foreground">{leaderboardData[2].score} pts</p>
              </div>
            </div>
          </div>
        )}
      
        <Card>
          <CardHeader>
            <CardTitle>{timeFrame === 'weekly' ? 'Weekly Challenge Rankings' : 'Global Rankings'}</CardTitle>
            <CardDescription>
              {timeFrame === 'weekly' 
                ? 'Top performers in this week\'s coding challenge' 
                : 'Top coders based on all-time performance and points'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-3 pl-4 pr-2 w-16">Rank</th>
                    <th className="text-left font-medium py-3 px-2">User</th>
                    {timeFrame === 'weekly' && (
                      <th className="text-left font-medium py-3 px-2 hidden md:table-cell">Time</th>
                    )}
                    {timeFrame === 'all-time' && (
                      <th className="text-left font-medium py-3 px-2 hidden md:table-cell">Streak</th>
                    )}
                    <th className="text-right font-medium py-3 pl-2 pr-4">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedLeaderboard.map((user) => (
                    <tr 
                      key={user.id} 
                      className={`border-b last:border-0 ${user.isCurrentUser ? 'bg-primary-foreground/10' : ''}`}
                    >
                      <td className="py-3 pl-4 pr-2">
                        <div className="flex items-center">
                          {user.rank <= 3 ? (
                            <span className={`
                              h-6 w-6 flex items-center justify-center rounded-full text-xs font-bold
                              ${user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-300' : 'bg-amber-700'} 
                              text-white
                            `}>
                              {user.rank}
                            </span>
                          ) : (
                            <span className="px-1">{user.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-xs text-muted-foreground">{user.fullName}</p>
                          </div>
                          {user.isCurrentUser && (
                            <Badge className="ml-2 text-xs">You</Badge>
                          )}
                        </div>
                      </td>
                      {timeFrame === 'weekly' && (
                        <td className="py-3 px-2 hidden md:table-cell">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm">{user.timeToComplete}</span>
                          </div>
                        </td>
                      )}
                      {timeFrame === 'all-time' && (
                        <td className="py-3 px-2 hidden md:table-cell">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{user.streak} days</span>
                          </div>
                        </td>
                      )}
                      <td className="py-3 pl-2 pr-4 text-right">
                        <span className="font-bold">{user.score}</span>
                        <span className="text-muted-foreground text-sm ml-1">pts</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Current User's Position (if not in top list) */}
            {timeFrame === 'all-time' && !displayedLeaderboard.slice(0, 7).find(u => u.isCurrentUser) && (
              <div className="mt-6 pt-4 border-t border-border">
                <h3 className="text-sm font-medium mb-2">Your Position</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="bg-primary-foreground/10">
                      <td className="py-3 pl-4 pr-2 w-16">
                        <span className="px-1">{currentUser?.rank}</span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              {currentUser?.username.charAt(0).toUpperCase()}
                            </div>
                          </Avatar>
                          <div>
                            <p className="font-medium">{currentUser?.username}</p>
                            <p className="text-xs text-muted-foreground">{currentUser?.fullName}</p>
                          </div>
                          <Badge className="ml-2 text-xs">You</Badge>
                        </div>
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{currentUser?.streak} days</span>
                        </div>
                      </td>
                      <td className="py-3 pl-2 pr-4 text-right">
                        <span className="font-bold">{currentUser?.score}</span>
                        <span className="text-muted-foreground text-sm ml-1">pts</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
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
