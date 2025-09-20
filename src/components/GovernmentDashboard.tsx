import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  Users, 
  FileText, 
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
    <div
      className={`min-h-screen relative overflow-hidden ${
        isDarkMode
          ? "dark bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white"
          : "light bg-white text-black"
      }`}
    >
      {/* Enhanced Dynamic Background for Government */}
      <DynamicBackground theme="government" />
      
      {/* Main Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header
          className={`glass-card border-b sticky top-0 z-50 ${
            isDarkMode
              ? "bg-white/10 border-white/10 text-white"
              : "bg-white border-gray-200 text-black shadow-md"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {/* Logo */}
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
                    <p className="text-xs hidden sm:block">
                      Mumbai Municipal Corporation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`text-xs ${
                      isDarkMode
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                        : "bg-indigo-100 text-indigo-800 border border-indigo-200"
                    }`}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    BMC Control Room
                  </Badge>
                  <Badge
                    className={`text-xs ${
                      isDarkMode
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-green-100 text-green-800 border border-green-200"
                    }`}
                  >
                    <Award className="w-3 h-3 mr-1" />
                    Admin Access
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div
                  className={`hidden lg:flex items-center space-x-2 px-3 py-1 rounded-lg ${
                    isDarkMode
                      ? "glass-card text-white"
                      : "bg-white border border-gray-200 text-black shadow-md"
                  }`}
                >
                  <UserCheck className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm">
                    {t.welcomeOfficer} {t.names.officers[0].split(' ')[0]}
                  </span>
                </div>
                
                {/* Language Toggle */}
                <LanguageToggle />
                
                {/* Dark mode toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleDarkMode}
                  className="glass-card transition-all duration-300 hover:scale-105"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                
                {/* Desktop user switch */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchDashboard('user')}
                  className={`hidden sm:flex transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "glass-card border-indigo-500/50 text-indigo-300"
                      : "bg-white border border-gray-200 text-black shadow-md"
                  }`}
                >
                  <User className="h-4 w-4 mr-2" />
                  {t.switchTo} {t.userDashboard}
                </Button>
                
                {/* Mobile user switch */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchDashboard('user')}
                  className={`sm:hidden transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "glass-card border-indigo-500/50 text-indigo-300"
                      : "bg-white border border-gray-200 text-black shadow-md"
                  }`}
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Desktop Tabs */}
            <TabsList
              className={`hidden sm:grid w-full grid-cols-5 p-1 mb-8 rounded-lg ${
                isDarkMode
                  ? "bg-white/10 border border-white/10 text-white"
                  : "bg-white border border-gray-200 text-black shadow-md"
              }`}
            >
              {tabItems.map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={`relative flex items-center justify-center space-x-2 rounded-lg transition-all duration-300 group ${
                    isDarkMode
                      ? "text-white hover:text-indigo-300"
                      : "text-black hover:text-indigo-600"
                  } data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white`}
                >
                  <Icon className="h-4 w-4 group-hover:animate-pulse" />
                  <span className="font-medium">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Mobile Tabs */}
            <div className="sm:hidden mb-6">
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {tabItems.map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => setActiveTab(value)}
                    className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-lg transition-all duration-300 ${
                      activeTab === value
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : isDarkMode
                        ? "bg-white/10 text-white"
                        : "bg-white border border-gray-200 text-black shadow-md"
                    }`}
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              <TabsContent value="overview">
                <GovOverview />
              </TabsContent>
              <TabsContent value="assignment">
                <GovAssignment />
              </TabsContent>
              <TabsContent value="reports">
                <GovReports />
              </TabsContent>
              <TabsContent value="solutions">
                <GovSolutions />
              </TabsContent>
              <TabsContent value="teams">
                <GovTeamManagement />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
