import logo from "../logos.jpeg";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
  Heart,
} from "lucide-react";
import { UserHome } from "./user-tabs/UserHome";
import { UserAnalytics } from "./user-tabs/UserAnalytics";
import { UserHeatmap } from "./user-tabs/UserHeatmap";
import { UserReportIssue } from "./user-tabs/UserReportIssue";
import { UserLeaderboard } from "./user-tabs/UserLeaderboard";
import { ChatBot } from "./ChatBot";
import { DynamicBackground } from "./DynamicBackground";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

interface UserDashboardProps {
  onSwitchDashboard: (dashboard: "user" | "government") => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function UserDashboard({
  onSwitchDashboard,
  isDarkMode,
  onToggleDarkMode,
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [showChatBot, setShowChatBot] = useState(false);
  const { t } = useLanguage();

  const tabItems = [
    { value: "home", icon: Home, label: t.home },
    { value: "analytics", icon: BarChart3, label: t.analytics },
    { value: "heatmap", icon: Map, label: t.heatmap },
    { value: "report", icon: Plus, label: t.reportIssue },
    { value: "leaderboard", icon: Trophy, label: t.leaderboard },
  ];

  return (
    <div
      className={`${
        isDarkMode ? "dark bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white" : "light bg-white text-black"
      } min-h-screen relative overflow-hidden`}
    >
      {/* Enhanced Dynamic Background */}
      <DynamicBackground theme="user" />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
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
                  <div className="flex items-center justify-center neon-glow-hover transition-all duration-300 hover:scale-110 relative">
                    <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>

                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      CivicEye
                    </h1>
                    <p className="text-xs hidden sm:block">
                      Mumbai Smart City Initiative
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge
                    className={`text-xs ${
                      isDarkMode
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {t.names.areas[0]}
                  </Badge>
                  <Badge
                    className={`text-xs ${
                      isDarkMode
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-green-100 text-green-800 border border-green-200"
                    }`}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Level 5 Citizen
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Language Toggle */}
                <LanguageToggle />

                {/* Dark Mode Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleDarkMode}
                  className="glass-card transition-all duration-300 hover:scale-105"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>

                {/* Switch Dashboard */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchDashboard("government")}
                  className="hidden sm:flex transition-all duration-300 hover:scale-105"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  {t.switchTo} {t.governmentDashboard}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchDashboard("government")}
                  className="sm:hidden transition-all duration-300 hover:scale-105"
                >
                  <Building2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Desktop Tabs */}
            <TabsList
              className={`hidden sm:grid w-full grid-cols-5 p-1 mb-8 rounded-lg ${
                isDarkMode
                  ? "bg-white/10 border border-white/10"
                  : "bg-white border border-gray-200 shadow-md"
              }`}
            >
              {tabItems.map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={`relative flex items-center justify-center space-x-2 rounded-lg transition-all duration-300 group ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-blue-600"
                  } data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white`}
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
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : isDarkMode
                        ? "bg-white/10 text-white"
                        : "bg-white text-black border border-gray-200 shadow"
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
              <TabsContent value="home">
                <UserHome />
              </TabsContent>
              <TabsContent value="analytics">
                <UserAnalytics />
              </TabsContent>
              <TabsContent value="heatmap">
                <UserHeatmap />
              </TabsContent>
              <TabsContent value="report">
                <UserReportIssue />
              </TabsContent>
              <TabsContent value="leaderboard">
                <UserLeaderboard />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <footer
          className={`glass-card border-t mt-auto ${
            isDarkMode
              ? "bg-white/10 border-white/10 text-white"
              : "bg-white border-gray-200 text-black shadow-md"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <img src={logo} alt="CivicEye Logo" className="h-10 w-10 object-contain" />
                  <h3 className="text-xl font-bold">CivicEye</h3>
                </div>
                <p className="text-sm">
                  Empowering citizens and government to work together for a
                  cleaner, safer, and more efficient Mumbai.
                </p>
                <div className="flex space-x-4">
                  <a href="#">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Report Issue</a></li>
                  <li><a href="#">Leaderboard</a></li>
                  <li><a href="#">Heatmap</a></li>
                  <li><a href="#">Analytics</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Contact Us</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <LocationIcon className="h-5 w-5 mt-0.5" />
                    <p>
                      Mumbai Municipal Corporation<br />
                      Dadar, Mumbai - 400028<br />
                      Maharashtra, India
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5" />
                    <p>+91 22 1234 5678</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <p>support@civiceye.in</p>
                  </div>
                </div>
              </div>

              {/* About & Legal */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">About & Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="flex items-center">
                Made with <Heart className="h-4 w-4 mx-1 text-red-400 fill-current" /> for Mumbai
              </p>
              <p className="mt-4 md:mt-0">
                © {new Date().getFullYear()} CivicEye. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ChatBot Button */}
      <Button
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 z-50 group"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-pulse" />
        <span className="sr-only">{t.chatBot}</span>
      </Button>

      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </div>
  );
}
