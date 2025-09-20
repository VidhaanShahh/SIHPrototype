import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { 
  BarChart3, 
  Upload, 
  FileText, 
  CheckCircle, 
  Calendar, 
  Users, 
  TrendingUp,
  Camera,
  Download,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const existingSolutions = [
  {
    id: 'SOL-001',
    reportId: 'RPT-002',
    title: 'Water Pipe Burst Resolution',
    category: 'Utilities',
    description: 'Emergency repair team deployed with high-pressure pumps and replacement pipes. Water supply restored within 4 hours.',
    implementedBy: 'Utilities Department',
    implementedDate: '2024-01-15',
    cost: '$2,500',
    timeToResolve: '4 hours',
    citizenRating: 4.8,
    beforeImage: 'water leak before',
    afterImage: 'water repair after',
    impact: 'Restored water supply to 200+ households'
  },
  {
    id: 'SOL-002',
    reportId: 'RPT-005',
    title: 'Garbage Collection Schedule Optimization',
    category: 'Sanitation',
    description: 'Implemented new route optimization system and added 2 additional trucks to improve collection efficiency.',
    implementedBy: 'Sanitation Services',
    implementedDate: '2024-01-12',
    cost: '$8,500',
    timeToResolve: '2 days',
    citizenRating: 4.2,
    beforeImage: 'garbage pile',
    afterImage: 'clean street',
    impact: 'Reduced collection delays by 80%'
  },
  {
    id: 'SOL-003',
    reportId: 'RPT-004',
    title: 'Traffic Light System Upgrade',
    category: 'Traffic',
    description: 'Installed smart traffic management system with real-time monitoring and automatic fault detection.',
    implementedBy: 'Traffic Management',
    implementedDate: '2024-01-14',
    cost: '$15,000',
    timeToResolve: '6 hours',
    citizenRating: 4.6,
    beforeImage: 'broken traffic light',
    afterImage: 'new smart traffic light',
    impact: 'Reduced traffic congestion by 40%'
  }
];

const solutionStats = [
  { month: 'Jan', resolved: 42, cost: 45000, rating: 4.3 },
  { month: 'Feb', resolved: 38, cost: 52000, rating: 4.2 },
  { month: 'Mar', resolved: 51, cost: 48000, rating: 4.5 },
  { month: 'Apr', resolved: 45, cost: 39000, rating: 4.4 },
  { month: 'May', resolved: 58, cost: 62000, rating: 4.6 },
  { month: 'Jun', resolved: 62, cost: 55000, rating: 4.7 }
];

const categoryBreakdown = [
  { name: 'Infrastructure', value: 35, cost: 120000, color: '#3B82F6' },
  { name: 'Traffic', value: 25, cost: 85000, color: '#10B981' },
  { name: 'Utilities', value: 20, cost: 95000, color: '#8B5CF6' },
  { name: 'Sanitation', value: 15, cost: 45000, color: '#F59E0B' },
  { name: 'Environment', value: 5, cost: 25000, color: '#EF4444' }
];

export function GovSolutions() {
  const [isAddingSolution, setIsAddingSolution] = useState(false);
  const [newSolution, setNewSolution] = useState({
    reportId: '',
    title: '',
    description: '',
    cost: '',
    timeToResolve: '',
    beforeImage: null as File | null,
    afterImage: null as File | null
  });

  const handleAddSolution = () => {
    console.log('Adding new solution:', newSolution);
    // Here you would typically submit to backend
    alert('Solution added successfully!');
    setIsAddingSolution(false);
    setNewSolution({
      reportId: '',
      title: '',
      description: '',
      cost: '',
      timeToResolve: '',
      beforeImage: null,
      afterImage: null
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Infrastructure': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Utilities': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Traffic': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Sanitation': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Environment': return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-indigo-400" />
                Solutions & Analytics
              </CardTitle>
              <p className="text-gray-400 text-sm mt-1">Track implemented solutions and their effectiveness</p>
            </div>
            <Button
              onClick={() => setIsAddingSolution(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Add Solution
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-green-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Solutions</p>
                <p className="text-3xl font-bold text-white">296</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-2 text-sm text-green-400">+18% this month</div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Resolution</p>
                <p className="text-3xl font-bold text-white">4.2h</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mt-2 text-sm text-blue-400">-12% faster</div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Investment</p>
                <p className="text-3xl font-bold text-white">$1.2M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
            <div className="mt-2 text-sm text-purple-400">Budget efficient</div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Citizen Rating</p>
                <p className="text-3xl font-bold text-white">4.5</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="flex mt-2">
              {renderStars(4.5)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Solutions Trend */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white">Monthly Solutions & Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={solutionStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
                <Bar yAxisId="left" dataKey="resolved" fill="#10B981" name="Solutions" />
                <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#F59E0B" strokeWidth={3} name="Rating" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white">Solutions by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryBreakdown.map((entry, index) => (
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

      {/* Existing Solutions */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="h-5 w-5 mr-2 text-green-400" />
            Recent Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {existingSolutions.map((solution) => (
            <div key={solution.id} className="p-6 bg-black/30 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold mb-1">{solution.title}</h3>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={getCategoryColor(solution.category)}>
                      {solution.category}
                    </Badge>
                    <span className="text-gray-400 text-sm">Report: {solution.reportId}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{solution.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    {renderStars(solution.citizenRating)}
                    <span className="text-white ml-2">{solution.citizenRating}</span>
                  </div>
                  <div className="text-green-400 font-semibold">{solution.cost}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Implemented by:</span>
                    <span className="text-white">{solution.implementedBy}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Time to resolve:</span>
                    <span className="text-white">{solution.timeToResolve}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Impact:</span>
                    <span className="text-green-400">{solution.impact}</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Before</div>
                    <div className="w-full h-24 rounded border border-white/20 overflow-hidden">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/300x200?q=80&w=300&h=200&fit=crop&crop=center&auto=format&ixlib=rb-4.0.3&${encodeURIComponent(solution.beforeImage)}`}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">After</div>
                    <div className="w-full h-24 rounded border border-white/20 overflow-hidden">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/300x200?q=80&w=300&h=200&fit=crop&crop=center&auto=format&ixlib=rb-4.0.3&${encodeURIComponent(solution.afterImage)}`}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-gray-400 text-sm">Implemented on {solution.implementedDate}</span>
                <Button variant="outline" size="sm" className="border-gray-500/50 text-gray-300 hover:bg-gray-500/20">
                  <Download className="h-3 w-3 mr-1" />
                  Export Report
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add Solution Modal */}
      {isAddingSolution && (
        <Card className="bg-black/20 backdrop-blur-xl border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Upload className="h-5 w-5 mr-2 text-indigo-400" />
                Add New Solution
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddingSolution(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportId" className="text-white">Report ID</Label>
                <Input
                  id="reportId"
                  placeholder="RPT-XXX"
                  value={newSolution.reportId}
                  onChange={(e) => setNewSolution({...newSolution, reportId: e.target.value})}
                  className="bg-black/30 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="title" className="text-white">Solution Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of solution"
                  value={newSolution.title}
                  onChange={(e) => setNewSolution({...newSolution, title: e.target.value})}
                  className="bg-black/30 border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the solution implemented..."
                value={newSolution.description}
                onChange={(e) => setNewSolution({...newSolution, description: e.target.value})}
                className="bg-black/30 border-white/20 text-white min-h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cost" className="text-white">Implementation Cost</Label>
                <Input
                  id="cost"
                  placeholder="$0.00"
                  value={newSolution.cost}
                  onChange={(e) => setNewSolution({...newSolution, cost: e.target.value})}
                  className="bg-black/30 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="timeToResolve" className="text-white">Time to Resolve</Label>
                <Input
                  id="timeToResolve"
                  placeholder="e.g., 4 hours, 2 days"
                  value={newSolution.timeToResolve}
                  onChange={(e) => setNewSolution({...newSolution, timeToResolve: e.target.value})}
                  className="bg-black/30 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Before Image</Label>
                <div className="mt-2 border-2 border-dashed border-white/30 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Upload before image</p>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>
              <div>
                <Label className="text-white">After Image</Label>
                <div className="mt-2 border-2 border-dashed border-white/30 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Upload after image</p>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddingSolution(false)}
                className="border-gray-500/50 text-gray-300 hover:bg-gray-500/20"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSolution}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Add Solution
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}