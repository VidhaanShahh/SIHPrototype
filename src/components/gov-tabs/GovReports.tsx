import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  ArrowUpDown
} from 'lucide-react';

const allReports = [
  {
    id: 'RPT-001',
    title: 'Broken Street Light on Main Street',
    category: 'Infrastructure',
    status: 'In Progress',
    priority: 'High',
    location: 'Main Street, Downtown',
    assignedTo: 'Infrastructure Team',
    submittedBy: 'John Doe',
    submittedDate: '2024-01-15',
    lastUpdated: '2024-01-16',
    upvotes: 24,
    description: 'Street light not working near pharmacy, causing safety concerns for pedestrians'
  },
  {
    id: 'RPT-002',
    title: 'Water Pipe Burst',
    category: 'Utilities',
    status: 'Resolved',
    priority: 'Urgent',
    location: 'Oak Avenue, Sector 7',
    assignedTo: 'Utilities Department',
    submittedBy: 'Sarah Wilson',
    submittedDate: '2024-01-14',
    lastUpdated: '2024-01-15',
    upvotes: 67,
    description: 'Major water leak causing flooding in residential area'
  },
  {
    id: 'RPT-003',
    title: 'Pothole on Highway',
    category: 'Infrastructure',
    status: 'Pending',
    priority: 'Medium',
    location: 'Highway 101, Mile 15',
    assignedTo: 'Unassigned',
    submittedBy: 'Mike Chen',
    submittedDate: '2024-01-13',
    lastUpdated: '2024-01-13',
    upvotes: 43,
    description: 'Large pothole causing vehicle damage and traffic slowdown'
  },
  {
    id: 'RPT-004',
    title: 'Traffic Light Malfunction',
    category: 'Traffic',
    status: 'In Progress',
    priority: 'High',
    location: 'Pine Street & Oak Avenue',
    assignedTo: 'Traffic Management',
    submittedBy: 'Lisa Johnson',
    submittedDate: '2024-01-12',
    lastUpdated: '2024-01-14',
    upvotes: 89,
    description: 'Traffic light stuck on red, causing major traffic congestion'
  },
  {
    id: 'RPT-005',
    title: 'Garbage Collection Delayed',
    category: 'Sanitation',
    status: 'Resolved',
    priority: 'Medium',
    location: 'Pine Street, Block C',
    assignedTo: 'Sanitation Services',
    submittedBy: 'Robert Davis',
    submittedDate: '2024-01-11',
    lastUpdated: '2024-01-12',
    upvotes: 18,
    description: 'Waste not collected for 3 days, causing sanitation issues'
  },
  {
    id: 'RPT-006',
    title: 'Air Quality Concern',
    category: 'Environment',
    status: 'Under Review',
    priority: 'Low',
    location: 'Industrial Zone, Sector 3',
    assignedTo: 'Environmental Unit',
    submittedBy: 'Emma Thompson',
    submittedDate: '2024-01-10',
    lastUpdated: '2024-01-11',
    upvotes: 12,
    description: 'Unusual smoke and odor from industrial area affecting nearby residents'
  }
];

export function GovReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('submittedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Under Review': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'submittedDate':
        aValue = new Date(a.submittedDate);
        bValue = new Date(b.submittedDate);
        break;
      case 'priority':
        const priorityOrder = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        break;
      case 'upvotes':
        aValue = a.upvotes;
        bValue = b.upvotes;
        break;
      default:
        aValue = a[sortBy as keyof typeof a];
        bValue = b[sortBy as keyof typeof b];
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const updateReportStatus = (reportId: string, newStatus: string) => {
    console.log(`Updating report ${reportId} status to ${newStatus}`);
    // Here you would typically update the backend
    alert(`Report ${reportId} status updated to ${newStatus}`);
  };

  const selectedReportData = allReports.find(r => r.id === selectedReport);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="h-5 w-5 mr-2 text-indigo-400" />
            Reports Management
          </CardTitle>
          <p className="text-gray-400 text-sm">View, filter, and manage all citizen reports</p>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black/30 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Traffic">Traffic</SelectItem>
                <SelectItem value="Sanitation">Sanitation</SelectItem>
                <SelectItem value="Environment">Environment</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center">
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                {sortedReports.length} reports
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-black/20">
                  <TableHead 
                    className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      Report ID
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center">
                      Title
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead 
                    className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('priority')}
                  >
                    <div className="flex items-center">
                      Priority
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">Assigned To</TableHead>
                  <TableHead 
                    className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('submittedDate')}
                  >
                    <div className="flex items-center">
                      Submitted
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('upvotes')}
                  >
                    <div className="flex items-center">
                      Upvotes
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedReports.map((report) => (
                  <TableRow 
                    key={report.id} 
                    className="border-white/10 hover:bg-black/20 transition-colors cursor-pointer"
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <TableCell className="text-white font-mono text-sm">{report.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-white font-medium">{report.title}</div>
                        <div className="text-gray-400 text-sm flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {report.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                        {report.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(report.priority)}>
                        {report.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{report.assignedTo}</TableCell>
                    <TableCell>
                      <div className="text-gray-300 text-sm">{report.submittedDate}</div>
                      <div className="text-gray-500 text-xs">by {report.submittedBy}</div>
                    </TableCell>
                    <TableCell className="text-gray-300">{report.upvotes}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Report Details Modal */}
      {selectedReportData && (
        <Card className="bg-black/20 backdrop-blur-xl border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Eye className="h-5 w-5 mr-2 text-indigo-400" />
                Report Details
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Report ID</div>
                <div className="text-white font-mono">{selectedReportData.id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <Badge className={getStatusColor(selectedReportData.status)}>
                  {selectedReportData.status}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-gray-400">Category</div>
                <div className="text-white">{selectedReportData.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Priority</div>
                <Badge className={getPriorityColor(selectedReportData.priority)}>
                  {selectedReportData.priority}
                </Badge>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-1">Description</div>
              <div className="text-white p-3 bg-black/30 rounded-lg border border-white/10">
                {selectedReportData.description}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Location</div>
                <div className="text-white flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-purple-400" />
                  {selectedReportData.location}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Assigned To</div>
                <div className="text-white">{selectedReportData.assignedTo}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              <Select 
                value={selectedReportData.status} 
                onValueChange={(value) => updateReportStatus(selectedReportData.id, value)}
              >
                <SelectTrigger className="w-48 bg-black/30 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                <CheckCircle className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}