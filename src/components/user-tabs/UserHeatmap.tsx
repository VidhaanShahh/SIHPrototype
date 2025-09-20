import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Map,
  Eye,
  AlertTriangle,
  Zap,
  Droplets,
  Car,
  TreePine,
} from "lucide-react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
// @ts-ignore – leaflet.heat has no types
import "leaflet.heat";

// Mock geo dataset (real lat/lngs)
const heatmapZones = [
  {
    id: 1,
    name: "Downtown Core",
    intensity: 95,
    reports: 127,
    lat: 19.076,
    lng: 72.8777,
    category: "high",
    size: 80,
  },
  {
    id: 2,
    name: "Industrial Area",
    intensity: 78,
    reports: 89,
    lat: 19.186,
    lng: 72.9777,
    category: "medium",
    size: 60,
  },
  {
    id: 3,
    name: "Residential North",
    intensity: 45,
    reports: 34,
    lat: 19.216,
    lng: 72.8677,
    category: "low",
    size: 40,
  },
  {
    id: 4,
    name: "Shopping District",
    intensity: 82,
    reports: 98,
    lat: 19.046,
    lng: 72.9077,
    category: "high",
    size: 65,
  },
];

const issueCategories = [
  { id: "all", name: "All Issues", icon: Eye, color: "text-white" },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  { id: "utilities", name: "Utilities", icon: Zap, color: "text-yellow-400" },
  {
    id: "water",
    name: "Water & Sanitation",
    icon: Droplets,
    color: "text-blue-400",
  },
  { id: "traffic", name: "Traffic", icon: Car, color: "text-green-400" },
  {
    id: "environment",
    name: "Environment",
    icon: TreePine,
    color: "text-purple-400",
  },
];

const recentActivity = [
  {
    time: "2 min ago",
    type: "infrastructure",
    location: "Downtown Core",
    severity: "high",
  },
  {
    time: "15 min ago",
    type: "traffic",
    location: "Shopping District",
    severity: "medium",
  },
  {
    time: "32 min ago",
    type: "water",
    location: "Industrial Area",
    severity: "high",
  },
  {
    time: "1 hour ago",
    type: "environment",
    location: "Park District",
    severity: "low",
  },
  {
    time: "2 hours ago",
    type: "utilities",
    location: "University Area",
    severity: "medium",
  },
];

export function UserHeatmap() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeFilter, setTimeFilter] = useState("24h");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  // Initialize Leaflet map
  useEffect(() => {
    const map = L.map("map").setView([19.076, 72.8777], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Add custom circle markers for zones
    heatmapZones.forEach((zone) => {
      const color =
        zone.intensity >= 80
          ? "red"
          : zone.intensity >= 60
          ? "orange"
          : zone.intensity >= 40
          ? "yellow"
          : "green";

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:${zone.size}px;
          height:${zone.size}px;
          border-radius:50%;
          background:${color};
          opacity:0.6;
          border:2px solid white;
        "></div>`,
      });

      L.marker([zone.lat, zone.lng], { icon })
        .bindPopup(
          `<b>${zone.name}</b><br/>${zone.reports} reports<br/>${zone.intensity}% intensity`
        )
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Map className="h-5 w-5 mr-2 text-blue-400" />
              Interactive City Heatmap
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32 bg-black/30 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {issueCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-black/30 border-white/20 text-gray-300 hover:bg-white/10"
                  } transition-all duration-300`}
                >
                  <Icon className={`h-4 w-4 mr-1 ${category.color}`} />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Visualization */}
        <Card className="lg:col-span-2 bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white">Activity Density Map</CardTitle>
            <p className="text-gray-400 text-sm">
              Circles represent reported activity intensity
            </p>
          </CardHeader>
          <CardContent>
            <div
              id="map"
              className="w-full h-96 rounded-lg overflow-hidden border border-white/10"
            />
          </CardContent>
        </Card>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Zone Statistics */}
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Zone Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {heatmapZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer bg-black/30 border-white/10 hover:border-white/20`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {zone.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {zone.reports} reports
                      </div>
                    </div>
                    <Badge className={getSeverityColor(zone.category)}>
                      {zone.intensity}%
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div>
                    <div className="text-sm text-white">
                      {activity.location}
                    </div>
                    <div className="text-xs text-gray-400">
                      {activity.time}
                    </div>
                  </div>
                  <Badge className={getSeverityColor(activity.severity)}>
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
