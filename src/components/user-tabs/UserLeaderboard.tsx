import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { 
  Trophy, 
  Crown, 
  Award, 
  Star, 
  Medal, 
  Zap, 
  Target, 
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

const leaderboardData = [
  {
    rank: 1,
    name: 'Aryan Shah',
    points: 2840,
    reports: 89,
    resolved: 78,
    streak: 15,
    avatar: '/api/placeholder/40/40',
    badges: ['Civic Hero', 'Problem Solver', 'Community Champion'],
    isCurrentUser: true
  },
  {
    rank: 2,
    name: 'Tanvi Sheth',
    points: 2650,
    reports: 76,
    resolved: 71,
    streak: 12,
    avatar: '/api/placeholder/40/40',
    badges: ['Reporter Pro', 'Consistency King', 'Local Guardian'],
    isCurrentUser: false
  },
  {
    rank: 3,
    name: 'Vidhaan Shah',
    points: 2420,
    reports: 68,
    resolved: 60,
    streak: 8,
    avatar: '/api/placeholder/40/40',
    badges: ['Issue Hunter', 'Quick Responder'],
    isCurrentUser: false
  },
  {
    rank: 4,
    name: 'Arav Khetwani',
    points: 2180,
    reports: 62,
    resolved: 55,
    streak: 6,
    avatar: '/api/placeholder/40/40',
    badges: ['Community Helper', 'Rising Star'],
    isCurrentUser: false
  },
  {
    rank: 23,
    name: 'Gaurang Satone',
    points: 1240,
    reports: 42,
    resolved: 35,
    streak: 4,
    avatar: '/api/placeholder/40/40',
    badges: ['New Contributor', 'First Report'],
    isCurrentUser: false
  }
];

const achievements = [
  {
    id: 'civic_hero',
    name: 'Civic Hero',
    description: 'Submit 100 reports',
    icon: Trophy,
    progress: 42,
    target: 100,
    unlocked: false,
    color: 'text-yellow-400'
  },
  {
    id: 'problem_solver',
    name: 'Problem Solver',
    description: 'Get 50 reports resolved',
    icon: Target,
    progress: 35,
    target: 50,
    unlocked: false,
    color: 'text-green-400'
  },
  {
    id: 'community_champion',
    name: 'Community Champion',
    description: 'Receive 100 upvotes',
    icon: Star,
    progress: 67,
    target: 100,
    unlocked: false,
    color: 'text-purple-400'
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Maintain 30-day streak',
    icon: Zap,
    progress: 4,
    target: 30,
    unlocked: false,
    color: 'text-blue-400'
  },
  {
    id: 'first_report',
    name: 'First Report',
    description: 'Submit your first report',
    icon: Medal,
    progress: 1,
    target: 1,
    unlocked: true,
    color: 'text-green-400'
  },
  {
    id: 'new_contributor',
    name: 'New Contributor',
    description: 'Submit 10 reports',
    icon: Award,
    progress: 10,
    target: 10,
    unlocked: true,
    color: 'text-blue-400'
  }
];

const weeklyStats = [
  { period: 'This Week', reports: 3, points: 120, position: '+2' },
  { period: 'Last Week', reports: 5, points: 200, position: '+5' },
  { period: 'This Month', reports: 12, points: 480, position: '+8' },
  { period: 'All Time', reports: 42, points: 1240, position: '23rd' }
];

export function UserLeaderboard() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements'>('leaderboard');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2: return <Medal className="h-6 w-6 text-gray-300" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-blue-500/20 border-blue-500/50';
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50';
      default: return 'bg-black/30 border-white/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
              Community Leaderboard
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('leaderboard')}
                className={activeTab === 'leaderboard' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'bg-black/30 border-white/20 text-gray-300 hover:bg-white/10'
                }
              >
                <Users className="h-4 w-4 mr-1" />
                Rankings
              </Button>
              <Button
                variant={activeTab === 'achievements' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('achievements')}
                className={activeTab === 'achievements' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'bg-black/30 border-white/20 text-gray-300 hover:bg-white/10'
                }
              >
                <Award className="h-4 w-4 mr-1" />
                Achievements
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {activeTab === 'leaderboard' && (
        <>
          {/* Top 3 Podium */}
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white text-center">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-center space-x-8">
                {/* 2nd Place */}
                <div className="text-center">
                  <div className="relative">
                    <div className="w-16 h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <Avatar className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-gray-400">
                      <AvatarImage src={leaderboardData[1].avatar} />
                      <AvatarFallback>{leaderboardData[1].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-4">
                    <p className="text-white font-semibold">{leaderboardData[1].name}</p>
                    <p className="text-gray-400 text-sm">{leaderboardData[1].points} pts</p>
                  </div>
                </div>

                {/* 1st Place */}
                <div className="text-center">
                  <div className="relative">
                    <div className="w-16 h-24 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg flex items-end justify-center pb-2">
                      <Crown className="h-6 w-6 text-yellow-800" />
                    </div>
                    <Avatar className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-yellow-400">
                      <AvatarImage src={leaderboardData[0].avatar} />
                      <AvatarFallback>{leaderboardData[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-4">
                    <p className="text-white font-semibold">{leaderboardData[0].name}</p>
                    <p className="text-yellow-400 text-sm">{leaderboardData[0].points} pts</p>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <Avatar className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-amber-600">
                      <AvatarImage src={leaderboardData[2].avatar} />
                      <AvatarFallback>{leaderboardData[2].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-4">
                    <p className="text-white font-semibold">{leaderboardData[2].name}</p>
                    <p className="text-gray-400 text-sm">{leaderboardData[2].points} pts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Full Leaderboard */}
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Full Rankings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:bg-black/40 ${getRankBackground(user.rank, user.isCurrentUser)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-semibold">{user.name}</h3>
                          {user.isCurrentUser && (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.badges.slice(0, 2).map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                              {badge}
                            </Badge>
                          ))}
                          {user.badges.length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                              +{user.badges.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">
                        {user.reports} reports • {user.resolved} resolved
                      </div>
                      <div className="flex items-center justify-end text-xs text-orange-400 mt-1">
                        <Zap className="h-3 w-3 mr-1" />
                        {user.streak} day streak
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Your Stats */}
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                Your Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {weeklyStats.map((stat) => (
                  <div key={stat.period} className="text-center p-4 bg-black/30 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-white">{stat.reports}</div>
                    <div className="text-sm text-gray-400 mb-1">Reports</div>
                    <div className="text-lg text-blue-400">{stat.points}</div>
                    <div className="text-xs text-gray-400 mb-2">Points</div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                      {stat.position}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">{stat.period}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'achievements' && (
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white">Achievements & Badges</CardTitle>
            <p className="text-gray-400 text-sm">Unlock badges by contributing to your community</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                const progressPercent = Math.min((achievement.progress / achievement.target) * 100, 100);
                
                return (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/50 shadow-lg'
                        : 'bg-black/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        achievement.unlocked ? 'bg-green-500/20' : 'bg-gray-500/20'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          achievement.unlocked ? achievement.color : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-semibold">{achievement.name}</h3>
                          {achievement.unlocked && (
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">
                              {achievement.progress}/{achievement.target}
                            </span>
                          </div>
                          <Progress 
                            value={progressPercent} 
                            className={`h-2 ${
                              achievement.unlocked ? 'bg-green-900' : 'bg-gray-700'
                            }`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}