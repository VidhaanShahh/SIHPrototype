import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Home,
  UserCheck,
  Moon, 
  Sun,
  User,
  Shield,
  MapPin,
  Award
} from 'lucide-react';
import { GovOverview } from './gov-tabs/GovOverview';
import { GovAssignment } from './gov-tabs/GovAssignment';
import { GovReports } from './gov-tabs/GovReports';
import { GovSolutions } from './gov-tabs/GovSolutions';
import { GovTeamManagement } from './gov-tabs/GovTeamManagement';
import { DynamicBackground } from './DynamicBackground';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

interface GovernmentDashboardProps {
  onSwitchDashboard: (dashboard: 'user' | 'government') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function GovernmentDashboard({ onSwitchDashboard, isDarkMode, onToggleDarkMode }: GovernmentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();

  const tabItems = [
    { value: 'overview', icon: Home, label: t.overview },
    { value: 'assignment', icon: UserCheck, label: t.assignment },
    { value: 'reports', icon: FileText, label: t.reports },
    { value: 'solutions', icon: BarChart3, label: t.solutions },
    { value: 'teams', icon: Users, label: t.teamManagement }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Enhanced Dynamic Background for Government */}
      <DynamicBackground theme="government" />
      
      {/* Main Container with glassmorphism */}
      <div className="relative z-10 min-h-screen">
        {/* Enhanced Header with Mumbai Government branding */}
        <header className="glass-card border-b border-white/10 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {/* Enhanced government logo with security theme */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center neon-glow-hover transition-all duration-300 hover:scale-110">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-slate-400 bg-clip-text text-transparent">
                      CivicEye Gov
                    </h1>
                    <p className="text-xs text-gray-400 hidden sm:block">Mumbai Municipal Corporation</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 neon-blue text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    BMC Control Room
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 animate-pulse text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    Admin Access
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden lg:flex items-center space-x-2 text-gray-300 glass-card px-3 py-1 rounded-lg">
                  <UserCheck className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm">{t.welcomeOfficer} {t.names.officers[0].split(' ')[0]}</span>
                </div>
                
                {/* Language Toggle */}
                <LanguageToggle />
                
                {/* Dark mode toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleDarkMode}
                  className="glass-card text-gray-300 hover:text-white hover:glass-card-hover neon-glow-hover transition-all duration-300 hover:scale-105"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                
                {/* Desktop user switch */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchDashboard('user')}
                  className="glass-card border-indigo-500/50 text-indigo-300 hover:glass-card-hover hover:border-indigo-400 neon-glow-hover transition-all duration-300 hover:scale-105 hidden sm:flex"
                >
                  <User className="h-4 w-4 mr-2" />
                  {t.switchTo} {t.userDashboard}
                </Button>
                
                {/* Mobile citizen switch */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchDashboard('user')}
                  className="glass-card border-indigo-500/50 text-indigo-300 hover:glass-card-hover hover:border-indigo-400 neon-glow-hover transition-all duration-300 hover:scale-105 sm:hidden"
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Navigation Tabs with responsive design */}
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Desktop Tabs */}
            <TabsList className="hidden sm:grid w-full grid-cols-5 glass-card border border-white/10 p-1 mb-8 neon-glow-hover">
              {tabItems.map(({ value, icon: Icon, label }) => (
                <TabsTrigger 
                  key={value}
                  value={value}
                  className="relative flex items-center justify-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:neon-blue text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 hover:neon-blue hover:scale-105 transition-all duration-300 group rounded-lg"
                >
                  <Icon className="h-4 w-4 group-hover:animate-pulse" />
                  <span className="font-medium">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Mobile Tabs - Horizontal scroll */}
            <div className="sm:hidden mb-6">
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {tabItems.map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => setActiveTab(value)}
                    className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-lg transition-all duration-300 ${
                      activeTab === value
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white neon-blue'
                        : 'glass-card text-gray-300 hover:text-white hover:glass-card-hover'
                    }`}
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content with enhanced animations */}
            <div className="space-y-6">
              <TabsContent value="overview" className="animate-in fade-in duration-500">
                <GovOverview />
              </TabsContent>
              
              <TabsContent value="assignment" className="animate-in fade-in duration-500">
                <GovAssignment />
              </TabsContent>
              
              <TabsContent value="reports" className="animate-in fade-in duration-500">
                <GovReports />
              </TabsContent>
              
              <TabsContent value="solutions" className="animate-in fade-in duration-500">
                <GovSolutions />
              </TabsContent>
              
              <TabsContent value="teams" className="animate-in fade-in duration-500">
                <GovTeamManagement />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}