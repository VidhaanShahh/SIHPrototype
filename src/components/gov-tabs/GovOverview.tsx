import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Calendar,
  BarChart3,
  MapPin,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';

const overviewStats = [
  { title: 'Total Reports', value: '1,247', change: '+12%', icon: FileText, color: 'text-blue-400' },
  { title: 'Resolved', value: '892', change: '+8%', icon: CheckCircle, color: 'text-green-400' },
  { title: 'In Progress', value: '234', change: '+15%', icon: Clock, color: 'text-yellow-400' },
  { title: 'Pending', value: '121', change: '-5%', icon: AlertTriangle, color: 'text-red-400' }
];

const monthlyData = [
  { month: 'Jan', submitted: 145, resolved: 128, pending: 17 },
  { month: 'Feb', submitted: 168, resolved: 152, pending: 16 },
  { month: 'Mar', submitted: 189, resolved: 174, pending: 15 },
  { month: 'Apr', submitted: 203, resolved: 186, pending: 17 },
  { month: 'May', submitted: 225, resolved: 198, pending: 27 },
  { month: 'Jun', submitted: 247, resolve: 215, pending: 32 }
];

const categoryData = [
  { name: 'Infrastructure', value: 35, color: '#3B82F6' },
  { name: 'Traffic', value: 25, color: '#10B981' },
  { name: 'Sanitation', value: 20, color: '#8B5CF6' },
  { name: 'Utilities', value: 15, color: '#F59E0B' },
  { name: 'Environment', value: 5, color: '#EF4444' }
];

const resolutionData = [
  { day: 'Mon', resolved: 45, target: 50 },
  { day: 'Tue', resolved: 52, target: 50 },
  { day: 'Wed', resolved: 38, target: 50 },
  { day: 'Thu', resolved: 61, target: 50 },
  { day: 'Fri', resolved: 48, target: 50 },
  { day: 'Sat', resolved: 35, target: 50 },
  { day: 'Sun', resolved: 42, target: 50 }
];

const recentActivity = [
  { type: 'resolved', description: 'Street light repair completed on Main St', time: '2 hours ago', severity: 'resolved' },
  { type: 'assigned', description: 'Pothole report assigned to Road Maintenance', time: '4 hours ago', severity: 'assigned' },
  { type: 'submitted', description: 'New water leak reported in Sector 7', time: '6 hours ago', severity: 'pending' },
  { type: 'resolved', description: 'Traffic signal fixed at Oak Avenue', time: '8 hours ago', severity: 'resolved' },
  { type: 'escalated', description: 'Waste management issue escalated', time: '12 hours ago', severity: 'urgent' }
];

const topPerformingTeams = [
  { name: 'Infrastructure Team', resolved: 156, pending: 12, efficiency: 92 },
  { name: 'Traffic Management', resolved: 134, pending: 8, efficiency: 94 },
  { name: 'Sanitation Dept', resolved: 98, pending: 15, efficiency: 87 },
  { name: 'Utilities Team', resolved: 87, pending: 6, efficiency: 93 },
];

export function GovOverview() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'assigned': return <Users className="h-4 w-4 text-blue-400" />;
      case 'submitted': return <FileText className="h-4 w-4 text-yellow-400" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'resolved': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'assigned': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'urgent': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Government Dashboard Overview
              </CardTitle>
              <p className="text-gray-400 mt-2">Monitor and manage civic issues across the city</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <Activity className="h-3 w-3 mr-1" />
                System Active
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">{stat.value}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400">{stat.change}</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-indigo-400" />
              Monthly Report Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="submitted" 
                  stroke="#6366F1" 
                  fillOpacity={1} 
                  fill="url(#colorSubmitted)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#colorResolved)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issue Categories */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-purple-400" />
              Issue Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Resolution Progress */}
        <Card className="lg:col-span-2 bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-400" />
              Daily Resolution Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Resolved"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#6B7280" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-black/30 hover:bg-black/40 transition-colors">
                <div className="mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
                <Badge className={getSeverityColor(activity.severity)}>
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-400" />
            Team Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topPerformingTeams.map((team, index) => (
              <div key={index} className="p-4 bg-black/30 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <h3 className="text-white font-semibold mb-2">{team.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Resolved</span>
                    <span className="text-green-400">{team.resolved}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Pending</span>
                    <span className="text-yellow-400">{team.pending}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Efficiency</span>
                      <span className="text-white">{team.efficiency}%</span>
                    </div>
                    <Progress value={team.efficiency} className="h-2 bg-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}