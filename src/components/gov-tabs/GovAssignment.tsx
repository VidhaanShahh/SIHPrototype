import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  UserCheck, 
  Clock, 
  AlertTriangle, 
  Users, 
  ArrowRight, 
  MapPin, 
  Calendar,
  CheckCircle,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const unassignedReports = [
  {
    id: 'RPT-001',
    title: 'Broken Street Light on Main Street',
    description: 'Street light not working near pharmacy, causing safety concerns',
    location: 'Main Street, Downtown',
    category: 'infrastructure',
    priority: 'high',
    submittedBy: 'Aryan Shah',
    submittedDate: '2024-01-15',
    upvotes: 24,
    image: 'street light repair'
  },
  {
    id: 'RPT-002', 
    title: 'Water Pipe Burst',
    description: 'Major water leak causing flooding in residential area',
    location: 'Oak Avenue, Sector 7',
    category: 'utilities',
    priority: 'urgent',
    submittedBy: 'Tanvi Sheth',
    submittedDate: '2024-01-15',
    upvotes: 67,
    image: 'water leak'
  },
  {
    id: 'RPT-003',
    title: 'Pothole on Highway',
    description: 'Large pothole causing vehicle damage and traffic slowdown',
    location: 'Highway 101, Mile 15',
    category: 'infrastructure',
    priority: 'medium',
    submittedBy: 'Vidhaan Shah',
    submittedDate: '2024-01-14',
    upvotes: 43,
    image: 'road pothole'
  },
  {
    id: 'RPT-004',
    title: 'Garbage Collection Delayed',
    description: 'Waste not collected for 3 days, causing sanitation issues',
    location: 'Pine Street, Block C',
    category: 'sanitation',
    priority: 'medium',
    submittedBy: 'Arav Khetwani',
    submittedDate: '2024-01-14',
    upvotes: 18,
    image: 'garbage collection'
  }
];

const teams = [
  {
    id: 'team-infra',
    name: 'Infrastructure Team',
    lead: 'Pramod Bide',
    members: 8,
    currentLoad: 12,
    maxCapacity: 15,
    specialties: ['Roads', 'Bridges', 'Buildings'],
    status: 'available'
  },
  {
    id: 'team-utilities',
    name: 'Utilities Department',
    lead: 'Anand Godbole',
    members: 6,
    currentLoad: 14,
    maxCapacity: 15,
    specialties: ['Water', 'Power', 'Gas'],
    status: 'busy'
  },
  {
    id: 'team-traffic',
    name: 'Traffic Management',
    lead: 'Natasha Raul',
    members: 5,
    currentLoad: 8,
    maxCapacity: 12,
    specialties: ['Traffic Lights', 'Road Signs', 'Congestion'],
    status: 'available'
  },
  {
    id: 'team-sanitation',
    name: 'Sanitation Services',
    lead: 'Varsha Hole',
    members: 10,
    currentLoad: 15,
    maxCapacity: 15,
    specialties: ['Waste Collection', 'Recycling', 'Street Cleaning'],
    status: 'full'
  },
  {
    id: 'team-environment',
    name: 'Environmental Unit',
    lead: 'Nikahat Mulla',
    members: 4,
    currentLoad: 3,
    maxCapacity: 8,
    specialties: ['Pollution', 'Green Spaces', 'Air Quality'],
    status: 'available'
  }
];

export function GovAssignment() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'infrastructure': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'utilities': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'traffic': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'sanitation': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'environment': return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'busy': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'full': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const assignReport = () => {
    if (selectedReport && selectedTeam) {
      console.log(`Assigning report ${selectedReport} to team ${selectedTeam}`);
      // Here you would typically update the backend
      alert(`Report ${selectedReport} assigned to ${teams.find(t => t.id === selectedTeam)?.name}`);
      setSelectedReport(null);
      setSelectedTeam('');
    }
  };

  const filteredReports = unassignedReports.filter(report => {
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || report.priority === filterPriority;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <UserCheck className="h-5 w-5 mr-2 text-indigo-400" />
            Report Assignment Center
          </CardTitle>
          <p className="text-gray-400 text-sm">Assign incoming reports to appropriate teams for resolution</p>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-black/30 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 bg-black/30 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-48 bg-black/30 border-white/20 text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {filteredReports.length} reports pending assignment
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unassigned Reports */}
        <Card className="lg:col-span-2 bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-yellow-400" />
              Pending Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedReport === report.id
                    ? 'bg-indigo-500/20 border-indigo-500 shadow-lg shadow-indigo-500/25'
                    : 'bg-black/30 border-white/10 hover:border-white/20 hover:bg-black/40'
                }`}
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/20">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/200x200?q=80&w=200&h=200&fit=crop&crop=center&auto=format&ixlib=rb-4.0.3&${encodeURIComponent(report.image)}`}
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{report.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{report.description}</p>
                        <div className="flex items-center text-sm text-gray-400 mt-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {report.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority}
                        </Badge>
                        <div className="text-xs text-gray-400 mt-1">ID: {report.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center space-x-3">
                        <Badge className={getCategoryColor(report.category)}>
                          {report.category}
                        </Badge>
                        <span className="text-xs text-gray-400">{report.upvotes} upvotes</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {report.submittedDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Selection */}
        <div className="space-y-6">
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                Available Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedTeam === team.id
                      ? 'bg-purple-500/20 border-purple-500 shadow-lg'
                      : 'bg-black/30 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setSelectedTeam(team.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium text-sm">{team.name}</h3>
                    <Badge className={getTeamStatusColor(team.status)}>
                      {team.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Lead: {team.lead} • {team.members} members
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Workload: {team.currentLoad}/{team.maxCapacity}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {team.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Assignment Action */}
          {selectedReport && (
            <Card className="bg-black/20 backdrop-blur-xl border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ArrowRight className="h-5 w-5 mr-2 text-indigo-400" />
                  Assign Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <div className="text-sm text-white font-medium">Selected Report:</div>
                  <div className="text-xs text-gray-400">{selectedReport}</div>
                </div>
                
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="bg-black/30 border-white/20 text-white">
                    <SelectValue placeholder="Select team..." />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id} disabled={team.status === 'full'}>
                        {team.name} ({team.currentLoad}/{team.maxCapacity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={assignReport}
                  disabled={!selectedTeam}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white disabled:opacity-50"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Assign Report
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}