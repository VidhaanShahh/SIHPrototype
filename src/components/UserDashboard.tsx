import logo from "../logos.jpeg";
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Home, 
  BarChart3, 
  Map, 
  Plus, 
  Trophy, 
  MessageCircle, 
  Building2, 
  Moon, 
  Sun,
  MapPin,
  Star,
  Mail,
  Phone,
  MapPin as LocationIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart
} from 'lucide-react';
import { UserHome } from './user-tabs/UserHome';
import { UserAnalytics } from './user-tabs/UserAnalytics';
import { UserHeatmap } from './user-tabs/UserHeatmap';
import { UserReportIssue } from './user-tabs/UserReportIssue';
import { UserLeaderboard } from './user-tabs/UserLeaderboard';
import { ChatBot } from './ChatBot';
import { DynamicBackground } from './DynamicBackground';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

interface UserDashboardProps {
  onSwitchDashboard: (dashboard: 'user' | 'government') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function UserDashboard({ onSwitchDashboard, isDarkMode, onToggleDarkMode }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [showChatBot, setShowChatBot] = useState(false);
  const { t } = useLanguage();

  const tabItems = [
    { value: 'home', icon: Home, label: t.home },
    { value: 'analytics', icon: BarChart3, label: t.analytics },
    { value: 'heatmap', icon: Map, label: t.heatmap },
    { value: 'report', icon: Plus, label: t.reportIssue },
    { value: 'leaderboard', icon: Trophy, label: t.leaderboard }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <DynamicBackground theme="user" />
      
      {/* Main Container with glassmorphism */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Enhanced Header with Mumbai branding */}
        <header className="glass-card border-b border-white/10 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {/* Enhanced logo with neon glow */}
                  <div className="flex items-center justify-center neon-glow-hover transition-all duration-300 hover:scale-110">
                  <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                  
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      CivicEye
                    </h1>
                    <p className="text-xs text-gray-400 hidden sm:block">Mumbai Smart City Initiative</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 neon-blue text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {t.names.areas[0]}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 animate-pulse text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Level 5 Citizen
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
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
                
                {/* Desktop government switch */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchDashboard('government')}
                  className="glass-card border-purple-500/50 text-purple-300 hover:glass-card-hover hover:border-purple-400 neon-glow-hover transition-all duration-300 hover:scale-105 hidden sm:flex"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  {t.switchTo} {t.governmentDashboard}
                </Button>
                
                {/* Mobile government switch */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchDashboard('government')}
                  className="glass-card border-purple-500/50 text-purple-300 hover:glass-card-hover hover:border-purple-400 neon-glow-hover transition-all duration-300 hover:scale-105 sm:hidden"
                >
                  <Building2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Navigation Tabs with responsive design */}
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Desktop Tabs */}
            <TabsList className="hidden sm:grid w-full grid-cols-5 glass-card border border-white/10 p-1 mb-8 neon-glow-hover">
              {tabItems.map(({ value, icon: Icon, label }) => (
                <TabsTrigger 
                  key={value}
                  value={value}
                  className="relative flex items-center justify-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:neon-blue text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:neon-blue hover:scale-105 transition-all duration-300 group rounded-lg"
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
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white neon-blue'
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
              <TabsContent value="home" className="animate-in fade-in duration-500">
                <UserHome />
              </TabsContent>
              
              <TabsContent value="analytics" className="animate-in fade-in duration-500">
                <UserAnalytics />
              </TabsContent>
              
              <TabsContent value="heatmap" className="animate-in fade-in duration-500">
                <UserHeatmap />
              </TabsContent>
              
              <TabsContent value="report" className="animate-in fade-in duration-500">
                <UserReportIssue />
              </TabsContent>
              
              <TabsContent value="leaderboard" className="animate-in fade-in duration-500">
                <UserLeaderboard />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer Section */}
        <footer className="glass-card border-t border-white/10 mt-auto">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <img src={logo} alt="CivicEye Logo" className="h-10 w-10 object-contain" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CivicEye
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Empowering citizens and government to work together for a cleaner, safer, and more efficient Mumbai.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Home</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Report Issue</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Leaderboard</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Heatmap</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Analytics</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <LocationIcon className="h-5 w-5 text-blue-400 mt-0.5" />
                    <p className="text-gray-300 text-sm">
                      Mumbai Municipal Corporation<br />
                      Dadar, Mumbai - 400028<br />
                      Maharashtra, India
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <p className="text-gray-300 text-sm">+91 22 1234 5678</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <p className="text-gray-300 text-sm">support@civiceye.in</p>
                  </div>
                </div>
              </div>

              {/* About & Legal */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">About & Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">FAQ</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Careers</a></li>
                </ul>
              </div>
            </div>

            {/* Copyright Notice */}
            <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm flex items-center">
                Made with <Heart className="h-4 w-4 mx-1 text-red-400 fill-current" /> for Mumbai
              </p>
              <p className="text-gray-400 text-sm mt-4 md:mt-0">
                © {new Date().getFullYear()} CivicEye. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Enhanced Floating ChatBot */}
      <Button
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 neon-glow-hover transition-all duration-300 hover:scale-110 z-50 group"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-pulse" />
        <span className="sr-only">{t.chatBot}</span>
      </Button>

      {/* Enhanced ChatBot with Mumbai context */}
      {showChatBot && (
        <ChatBot onClose={() => setShowChatBot(false)} />
      )}
    </div>
  );
}