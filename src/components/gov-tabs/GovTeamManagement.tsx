import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Users, 
  UserPlus, 
  Settings, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const teams = [
  {
    id: 'team-infra',
    name: 'Infrastructure Team',
    lead: {
      name: 'Pramod Bide',
      email: 'david.r@city.gov',
      phone: '+1 (555) 123-4567',
      avatar: '/api/placeholder/40/40'
    },
    members: [
      { name: 'Sarah Chen', role: 'Senior Engineer', avatar: '/api/placeholder/40/40' },
      { name: 'Mike Johnson', role: 'Project Manager', avatar: '/api/placeholder/40/40' },
      { name: 'Lisa Wang', role: 'Field Supervisor', avatar: '/api/placeholder/40/40' },
      { name: 'Tom Brown', role: 'Technical Specialist', avatar: '/api/placeholder/40/40' }
    ],
    currentLoad: 12,
    maxCapacity: 15,
    specialties: ['Roads', 'Bridges', 'Buildings'],
    status: 'available',
    efficiency: 92,
    recentWork: 8,
    avgResolutionTime: '2.5 days',
    satisfaction: 4.6
  },
  {
    id: 'team-utilities',
    name: 'Utilities Department',
    lead: {
      name: 'Anand Godbole',
      email: 'emma.t@city.gov',
      phone: '+1 (555) 234-5678',
      avatar: '/api/placeholder/40/40'
    },
    members: [
      { name: 'Alex Kumar', role: 'Utilities Engineer', avatar: '/api/placeholder/40/40' },
      { name: 'Maria Garcia', role: 'System Analyst', avatar: '/api/placeholder/40/40' },
      { name: 'John Smith', role: 'Field Technician', avatar: '/api/placeholder/40/40' }
    ],
    currentLoad: 14,
    maxCapacity: 15,
    specialties: ['Water', 'Power', 'Gas'],
    status: 'busy',
    efficiency: 88,
    recentWork: 12,
    avgResolutionTime: '1.8 days',
    satisfaction: 4.4
  },
  {
    id: 'team-traffic',
    name: 'Traffic Management',
    lead: {
      name: 'Natasha Raul',
      email: 'robert.l@city.gov',
      phone: '+1 (555) 345-6789',
      avatar: '/api/placeholder/40/40'
    },
    members: [
      { name: 'Jennifer Park', role: 'Traffic Engineer', avatar: '/api/placeholder/40/40' },
      { name: 'Carlos Martinez', role: 'Signal Technician', avatar: '/api/placeholder/40/40' },
      { name: 'Amanda Davis', role: 'Traffic Analyst', avatar: '/api/placeholder/40/40' }
    ],
    currentLoad: 8,
    maxCapacity: 12,
    specialties: ['Traffic Lights', 'Road Signs', 'Congestion'],
    status: 'available',
    efficiency: 94,
    recentWork: 6,
    avgResolutionTime: '1.2 days',
    satisfaction: 4.8
  },
  {
    id: 'team-sanitation',
    name: 'Sanitation Services',
    lead: {
      name: 'Varsha Hole',
      email: 'patricia.w@city.gov',
      phone: '+1 (555) 456-7890',
      avatar: '/api/placeholder/40/40'
    },
    members: [
      { name: 'Mark Taylor', role: 'Route Supervisor', avatar: '/api/placeholder/40/40' },
      { name: 'Linda Adams', role: 'Operations Manager', avatar: '/api/placeholder/40/40' },
      { name: 'Kevin Brown', role: 'Equipment Specialist', avatar: '/api/placeholder/40/40' },
      { name: 'Nancy White', role: 'Quality Inspector', avatar: '/api/placeholder/40/40' }
    ],
    currentLoad: 15,
    maxCapacity: 15,
    specialties: ['Waste Collection', 'Recycling', 'Street Cleaning'],
    status: 'full',
    efficiency: 85,
    recentWork: 15,
    avgResolutionTime: '3.1 days',
    satisfaction: 4.1
  }
];

const teamPerformanceData = [
  { week: 'Week 1', infrastructure: 8, utilities: 12, traffic: 6, sanitation: 15 },
  { week: 'Week 2', infrastructure: 10, utilities: 14, traffic: 8, sanitation: 13 },
  { week: 'Week 3', infrastructure: 12, utilities: 11, traffic: 7, sanitation: 16 },
  { week: 'Week 4', infrastructure: 9, utilities: 13, traffic: 9, sanitation: 14 }
];

const workloadTrend = [
  { day: 'Mon', workload: 78 },
  { day: 'Tue', workload: 85 },
  { day: 'Wed', workload: 92 },
  { day: 'Thu', workload: 88 },
  { day: 'Fri', workload: 94 },
  { day: 'Sat', workload: 67 },
  { day: 'Sun', workload: 54 }
];

export function GovTeamManagement() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'busy': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'full': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-400';
    if (efficiency >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const selectedTeamData = teams.find(t => t.id === selectedTeam);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-indigo-400" />
                Team Management
              </CardTitle>
              <p className="text-gray-400 text-sm mt-1">Monitor team performance and manage workload distribution</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-500/50 text-gray-300 hover:bg-gray-500/20"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teams.map((team) => (
          <Card 
            key={team.id} 
            className={`bg-black/20 backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
              selectedTeam === team.id 
                ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/20' 
                : 'border-white/10 hover:border-white/20'
            }`}
            onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">{team.name}</h3>
                <Badge className={getStatusColor(team.status)}>
                  {team.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={team.lead.avatar} />
                    <AvatarFallback>{team.lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm text-white">{team.lead.name}</div>
                    <div className="text-xs text-gray-400">Team Lead</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Workload</span>
                    <span className="text-white">{team.currentLoad}/{team.maxCapacity}</span>
                  </div>
                  <Progress value={(team.currentLoad / team.maxCapacity) * 100} className="h-2 bg-gray-700" />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Efficiency</span>
                  <span className={getEfficiencyColor(team.efficiency)}>{team.efficiency}%</span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {team.specialties.slice(0, 2).map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                      {specialty}
                    </Badge>
                  ))}
                  {team.specialties.length > 2 && (
                    <Badge variant="secondary" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                      +{team.specialties.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-green-400" />
              Weekly Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
                <Bar dataKey="infrastructure" fill="#3B82F6" name="Infrastructure" />
                <Bar dataKey="utilities" fill="#8B5CF6" name="Utilities" />
                <Bar dataKey="traffic" fill="#10B981" name="Traffic" />
                <Bar dataKey="sanitation" fill="#F59E0B" name="Sanitation" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Workload Trend */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
              Daily Workload Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workloadTrend}>
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
                  dataKey="workload" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Team View */}
      {selectedTeamData && (
        <Card className="bg-black/20 backdrop-blur-xl border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2 text-indigo-400" />
                {selectedTeamData.name} - Detailed View
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTeam(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Team Lead Details */}
            <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Award className="h-4 w-4 mr-2 text-indigo-400" />
                Team Lead
              </h3>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedTeamData.lead.avatar} />
                  <AvatarFallback className="text-lg">{selectedTeamData.lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-white font-medium">{selectedTeamData.lead.name}</h4>
                  <div className="flex items-center text-sm text-gray-400 mt-1">
                    <Mail className="h-3 w-3 mr-1" />
                    {selectedTeamData.lead.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mt-1">
                    <Phone className="h-3 w-3 mr-1" />
                    {selectedTeamData.lead.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">Recent Work</div>
                    <div className="text-2xl font-bold text-white">{selectedTeamData.recentWork}</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">Avg Resolution</div>
                    <div className="text-2xl font-bold text-white">{selectedTeamData.avgResolutionTime}</div>
                  </div>
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">Efficiency</div>
                    <div className={`text-2xl font-bold ${getEfficiencyColor(selectedTeamData.efficiency)}`}>
                      {selectedTeamData.efficiency}%
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">Satisfaction</div>
                    <div className="text-2xl font-bold text-white">{selectedTeamData.satisfaction}</div>
                  </div>
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-400" />
                Team Members ({selectedTeamData.members.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTeamData.members.map((member, index) => (
                  <div key={index} className="p-3 bg-black/30 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white font-medium">{member.name}</div>
                        <div className="text-gray-400 text-sm">{member.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h3 className="text-white font-semibold mb-3">Team Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTeamData.specialties.map((specialty, index) => (
                  <Badge key={index} className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}