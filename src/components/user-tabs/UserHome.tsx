import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowUp, Share2, MapPin, Clock, CheckCircle, AlertCircle, Users, Zap, Award, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../../contexts/LanguageContext';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Resolved': return 'bg-green-500/20 text-green-300 border-green-500/30 neon-glow-hover';
    case 'In Progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 neon-glow-hover';
    case 'Pending': return 'bg-red-500/20 text-red-300 border-red-500/30 neon-glow-hover';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Resolved': return <CheckCircle className="h-4 w-4" />;
    case 'In Progress': return <Clock className="h-4 w-4" />;
    case 'Pending': return <AlertCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50';
    case 'medium': return 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50';
    case 'low': return 'bg-green-500 shadow-lg shadow-green-500/50';
    default: return 'bg-gray-500';
  }
};

export function UserHome() {
  const { t, language } = useLanguage();

  const recentReports = [
    {
      id: 1,
      title: language === 'hi' ? "स्ट्रीट लाइट खराब" : "Broken Street Light",
      description: language === 'hi' 
        ? `${t.names.areas[1]} के पास मुख्य सड़क पर स्ट्रीट लाइट काम नहीं कर रही`
        : `Street light not working on main road near ${t.names.areas[1]}`,
      location: t.names.areas[1],
      status: "In Progress",
      statusText: language === 'hi' ? "प्रगति में" : t.active,
      upvotes: 47,
      timeAgo: language === 'hi' ? "3 घंटे पहले" : "3 hours ago",
      image: "https://images.unsplash.com/photo-1696245916884-73713e066842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBsaWdodCUyMHJlcGFpciUyMG5pZ2h0fGVufDF8fHx8MTc1ODIwMjMxMnww&ixlib=rb-4.1.0&q=80&w=1080",
      priority: "medium",
      ward: language === 'hi' ? "A वार्ड" : "Ward A",
      reportedBy: t.names.users[0]
    },
    {
      id: 2,
      title: language === 'hi' ? "सड़क में गड्ढा" : "Road Pothole",
      description: language === 'hi' 
        ? `${t.names.areas[2]} हाईवे पर बड़ा गड्ढा, वाहनों को नुकसान हो रहा`
        : `Large pothole on ${t.names.areas[2]} highway causing vehicle damage`,
      location: t.names.areas[2],
      status: "Pending",
      statusText: language === 'hi' ? "लंबित" : t.pending,
      upvotes: 89,
      timeAgo: language === 'hi' ? "6 घंटे पहले" : "6 hours ago",
      image: "https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwcG90aG9sZSUyMGRhbWFnZXxlbnwxfHx8fDE3NTgxNjgwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      priority: "high",
      ward: language === 'hi' ? "K पश्चिम वार्ड" : "K West Ward",
      reportedBy: t.names.users[1]
    },
    {
      id: 3,
      title: language === 'hi' ? "कचरा संग्रह नहीं हुआ" : "Garbage Collection Missed",
      description: language === 'hi' 
        ? `${t.names.areas[3]} के आवासीय क्षेत्र में 4 दिन से कचरा संग्रह नहीं हुआ`
        : `Garbage not collected for 4 days in ${t.names.areas[3]} residential area`,
      location: t.names.areas[3],
      status: "Resolved",
      statusText: language === 'hi' ? "हल हो गया" : t.resolved,
      upvotes: 23,
      timeAgo: language === 'hi' ? "1 दिन पहले" : "1 day ago",
      image: "https://images.unsplash.com/photo-1740635313618-35636018c870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxnYXJiYWdlJTIwY29sbGVjdGlvbiUyMHRydWNrfGVufDF8fHx8MTc1ODIwMjMxOHww&ixlib=rb-4.1.0&q=80&w=1080",
      priority: "medium",
      ward: language === 'hi' ? "H पूर्व वार्ड" : "H East Ward",
      reportedBy: t.names.users[2]
    },
    {
      id: 4,
      title: language === 'hi' ? "पानी का रिसाव" : "Water Leakage",
      description: language === 'hi' 
        ? `${t.names.areas[4]} कम्युनिटी सेंटर के पास पानी की पाइप फटी हुई है`
        : `Water pipe burst near ${t.names.areas[4]} Community Center`,
      location: t.names.areas[4],
      status: "In Progress",
      statusText: language === 'hi' ? "प्रगति में" : t.active,
      upvotes: 65,
      timeAgo: language === 'hi' ? "8 घंटे पहले" : "8 hours ago",
      image: "https://images.unsplash.com/photo-1708561159079-d4d9a40881f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBsZWFrJTIwYnVyc3R8ZW58MXx8fHwxNzU4MjAyMzIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      priority: "high",
      ward: language === 'hi' ? "L वार्ड" : "L Ward",
      reportedBy: t.names.users[3]
    }
  ];

  const handleUpvote = (reportId: number) => {
    console.log(`Upvoted report ${reportId}`);
  };

  const handleShare = (reportId: number) => {
    console.log(`Shared report ${reportId}`);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Section */}
      <Card className="relative glass-card hover:glass-card-hover neon-glow-hover transition-all duration-500 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating elements */}
        <div className="absolute top-4 right-20 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-6 left-16 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-8 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }}></div>
        
        <CardHeader className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <CardTitle className="text-2xl lg:text-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                {t.welcomeBack}, {t.names.users[0]},{t.names.users[1]}! 🙏
              </CardTitle>
              <p className="text-gray-400 text-base lg:text-lg">
                {language === 'hi' ? 'आपके क्षेत्र की नवीनतम रिपोर्ट्स के साथ अपडेट रहें' : 'Stay updated with latest reports from your area'}
              </p>
              <p className="text-sm text-gray-500">
                {language === 'hi' ? 'Mumbai Smart City - हमारा शहर, हमारी जिम्मेदारी' : 'Mumbai Smart City - Our City, Our Responsibility'}
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
              <div className="text-center glass-card p-4 rounded-lg neon-glow-hover group-hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-blue-400 mr-1" />
                  <div className="text-xl lg:text-2xl font-bold text-blue-400 animate-pulse">23</div>
                </div>
                <div className="text-xs lg:text-sm text-gray-400">{t.totalReports}</div>
                <div className="h-1 w-full bg-blue-400/20 rounded-full mt-2">
                  <div className="h-full w-3/4 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="text-center glass-card p-4 rounded-lg neon-glow-hover group-hover:scale-105 transition-all duration-300" style={{ transitionDelay: '100ms' }}>
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-1" />
                  <div className="text-xl lg:text-2xl font-bold text-green-400 animate-pulse">18</div>
                </div>
                <div className="text-xs lg:text-sm text-gray-400">{t.resolvedIssues}</div>
                <div className="h-1 w-full bg-green-400/20 rounded-full mt-2">
                  <div className="h-full w-4/5 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="text-center glass-card p-4 rounded-lg neon-glow-hover group-hover:scale-105 transition-all duration-300" style={{ transitionDelay: '200ms' }}>
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-purple-400 mr-1" />
                  <div className="text-xl lg:text-2xl font-bold text-purple-400 animate-pulse">342</div>
                </div>
                <div className="text-xs lg:text-sm text-gray-400">{t.civicScore}</div>
                <div className="h-1 w-full bg-purple-400/20 rounded-full mt-2">
                  <div className="h-full w-5/6 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="text-center glass-card p-4 rounded-lg neon-glow-hover group-hover:scale-105 transition-all duration-300" style={{ transitionDelay: '300ms' }}>
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-orange-400 mr-1" />
                  <div className="text-xl lg:text-2xl font-bold text-orange-400 animate-pulse">87%</div>
                </div>
                <div className="text-xs lg:text-sm text-gray-400">
                  {language === 'hi' ? 'सफलता दर' : 'Success Rate'}
                </div>
                <div className="h-1 w-full bg-orange-400/20 rounded-full mt-2">
                  <div className="h-full w-full bg-orange-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Recent Reports Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl lg:text-2xl font-semibold text-white flex items-center">
            <Users className="h-6 w-6 mr-3 text-blue-400 animate-pulse" />
            {t.recentActivity}
          </h2>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 animate-pulse">
            🇮🇳 {language === 'hi' ? 'मुंबई महानगरपालिका' : 'Mumbai Municipal Corporation'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {recentReports.map((report, index) => (
            <Card 
              key={report.id} 
              className="glass-card hover:glass-card-hover neon-glow-hover transition-all duration-500 group cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Status and Ward badges */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Badge className={`${getStatusColor(report.status)} backdrop-blur-sm`}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1">{report.statusText}</span>
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 backdrop-blur-sm">
                      {report.ward}
                    </Badge>
                  </div>
                  
                  {/* Priority indicator */}
                  <div className="absolute top-4 left-4">
                    <div className={`w-4 h-4 rounded-full ${getPriorityColor(report.priority)}`}>
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/50 rounded-t-lg transition-all duration-500"></div>
                </div>
                
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg lg:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-gray-400 text-sm lg:text-base line-clamp-2">
                      {report.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'hi' ? 'रिपोर्ट किया गया:' : 'Reported by:'} {report.reportedBy}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="font-medium">{report.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpvote(report.id)}
                        className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 neon-glow-hover transition-all duration-300 hover:scale-105"
                      >
                        <ArrowUp className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{report.upvotes}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(report.id)}
                        className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 neon-glow-hover transition-all duration-300 hover:scale-105"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{report.timeAgo}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <Card className="glass-card text-center p-6 border-dashed border-white/20">
        <p className="text-gray-400 text-sm">
          🏙️ {language === 'hi' 
            ? 'मुंबई स्मार्ट सिटी पहल के तहत • Mumbai Smart City Initiative के साथ मिलकर बनाएं बेहतर मुंबई'
            : 'Mumbai Smart City Initiative • Together, let\'s build a better Mumbai'
          }
        </p>
      </Card>
    </div>
  );
}