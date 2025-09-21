import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

export interface Translations {
  // Common UI
  language: string;
  english: string;
  hindi: string;
  darkMode: string;
  lightMode: string;
  userDashboard: string;
  governmentDashboard: string;
  switchTo: string;

  // Navigation
  home: string;
  analytics: string;
  heatmap: string;
  // reportIssue: string;
  leaderboard: string;
  reportIssue :string;

  // User Dashboard
  welcomeBack: string;
  userLevel: string;

  // Chat Bot
  chatBot: string;

  // Footer
  madeWith: string;
  forMumbai: string;

  // Indian Names
  names: {
    users: string[];
    officers: string[];
    areas: string[];
  };

  // Analytics / User Dashboard Keys
  totalReports: string;
  resolved: string;
  pending: string;
  fromLastMonth: string;
  resolutionRate: string;
  pendingReview: string;
  totalPoints: string;
  rank: string;
  thisMonth: string;
  monthlyReportActivity: string;
  submitted: string;
  issueCategories: string;
  weeklyContributionTrend: string;

  //heatmap
  // User Heatmap
interactiveCityHeatmap: string;
activityDensityMap: string;
clickZonesInfo: string;

allIssues: string;
infrastructure: string;
utilities: string;
waterSanitation: string;
traffic: string;
environment: string;

recentActivity: string;
zoneStatistics: string;

lowActivity: string;
mediumActivity: string;
highActivity: string;

reports: string;
intensity: string;

lastHour: string;
last24Hours: string;
last7Days: string;
last30Days: string;

twoMinutesAgo: string;
fifteenMinutesAgo: string;
thirtyTwoMinutesAgo: string;
oneHourAgo: string;
twoHoursAgo: string;

//userhome
// User Home / Dashboard
TotalReports: string;
resolvedIssues: string;
civicScore: string;
successRate: string;
active: string;
Pending: string;
Resolved: string;
reportedBy: string;
stayUpdated: string;
ourCityResponsibility: string;
mumbaiMunicipalCorporation: string;
hoursAgo: string;
daysAgo: string;

 //government
    welcomeOfficer: string;
  
    overview: string;
    assignment: string;
    solutions: string;
    teamManagement: string;


 steps: {
    step: string;
    of: string;
    basicInfo: string;
    basicInfoDesc: string;
    categoryPriority: string;
    categoryPriorityDesc: string;
    locationImages: string;
    locationImagesDesc: string;
    reviewSubmit: string;
    reviewSubmitDesc: string;
  };

  categories: {
    infrastructure: string;
    utilities: string;
    water: string;
    traffic: string;
    environment: string;
  };

  descriptions: {
    infrastructure: string;
    utilities: string;
    water: string;
    traffic: string;
    environment: string;
  };

  priority: {
    low: string;
    medium: string;
    high: string;
    urgent: string;
  };

  fields: {
    title: string;
    description: string;
    category: string;
    priority: string;
    location: string;
    uploadImages: string;
  };

  placeholders: {
    title: string;
    description: string;
    location: string;
    dragDrop: string;
  };

  actions: {
    previous: string;
    nextStep: string;
    submitReport: string;
    useCurrentLocation: string;
    chooseFiles: string;
  };

  messages: {
    reportSubmitted: string;
  };

  reportIssues:{
    title: string;
    subtitle: string;
  };

  userLeaderboard: {
    communityLeaderboard: string;
    rankings: string;
    achievements: string;
    topContributors: string;
    fullRankings: string;
    you: string;
    reports: string;
    resolved: string;
    dayStreak: string;
    yourPerformance: string;
    achievementsAndBadges: string;
    achievementsSubtitle: string;
    unlocked: string;
    progress: string;
    ThisWeek: string;
    LastWeek: string;
    ThisMonth: string;
    AllTime: string;
    points: string;

   

    // Badges
    civicHero: string;
    problemSolver: string;
    communityChampion: string;
    streakMaster: string;
    firstReport: string;
    newContributor: string;
    reporterPro: string;
    consistencyKing: string;
    localGuardian: string;
    issueHunter: string;
    quickResponder: string;
    communityHelper: string;
    risingStar: string;
  };



}

const translations: Record<Language, Translations> = {
  en: {
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    userDashboard: 'User Dashboard',
    governmentDashboard: 'Government Dashboard',
    switchTo: 'Switch to',
    home: 'Home',
    analytics: 'Analytics',
    heatmap: 'Heatmap',
    reportIssue: 'Report Issue',
    leaderboard: 'Leaderboard',
    welcomeBack: 'Welcome back',
    userLevel: 'Level 5 Citizen',
    chatBot: 'AI Assistant',
    madeWith: 'Made with',
    forMumbai: 'for Mumbai',
    names: {
      users: ['Aryan', 'Tanvi', 'Rahul Gupta', 'Sneha Joshi', 'Vikram Singh', 'Kavya Reddy', 'Aarav Kumar', 'Diya Agarwal'],
      officers: ['Inspector Rajesh Khanna', 'Officer Meera Nair', 'Superintendent Anil Verma', 'Inspector Pooja Sharma', 'Officer Sanjay Tiwari'],
      areas: ['Bandra West', 'Andheri East', 'Powai', 'Goregaon', 'Malad', 'Borivali', 'Thane', 'Kurla'],
    },

    

    // Analytics keys
    totalReports: 'Total Reports',
    resolved: 'Resolved',
    pending: 'Pending',
    fromLastMonth: 'from last month',
    resolutionRate: 'Resolution rate',
    pendingReview: 'Pending review',
    totalPoints: 'Total Points',
    rank: 'Rank',
    thisMonth: 'this month',
    monthlyReportActivity: 'Monthly Report Activity',
    submitted: 'Submitted',
    issueCategories: 'Issue Categories',
    weeklyContributionTrend: 'Weekly Contribution Trend',

    //heatmap
    interactiveCityHeatmap: 'Interactive City Heatmap',
    activityDensityMap: 'Activity Density Map',
    clickZonesInfo: 'Click on zones to view detailed information',
    allIssues: 'All Issues',
    infrastructure: 'Infrastructure',
    utilities: 'Utilities',
    waterSanitation: 'Water & Sanitation',
    traffic: 'Traffic',
    environment: 'Environment',
    recentActivity: 'Recent Activity',
    zoneStatistics: 'Zone Statistics',
    lowActivity: 'Low Activity',
    mediumActivity: 'Medium Activity',
    highActivity: 'High Activity',
    reports: 'Reports',
    intensity: 'intensity',
    lastHour: 'Last Hour',
    last24Hours: 'Last 24h',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    twoMinutesAgo: '2 min ago',
    fifteenMinutesAgo: '15 min ago',
    thirtyTwoMinutesAgo: '32 min ago',
    oneHourAgo: '1 hour ago',
    twoHoursAgo: '2 hours ago',

    //userhome
    TotalReports: 'Total Reports',
    resolvedIssues: 'Resolved Issues',
    civicScore: 'Civic Score',
    successRate: 'Success Rate',
    active: 'In Progress',
    Pending: 'Pending',
    Resolved: 'Resolved',
    reportedBy: 'Reported by',
    stayUpdated: 'Stay updated with latest reports from your area',
    ourCityResponsibility: 'Mumbai Smart City - Our City, Our Responsibility',
    mumbaiMunicipalCorporation: 'Mumbai Municipal Corporation',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',

  welcomeOfficer: "Welcome Officer",
  overview: "Overview",
  assignment: "Assignments",
  solutions: "Solutions",
  teamManagement: "Team Management",

    

    steps: {
    step: 'Step',
    of: 'of',
    basicInfo: 'Basic Information',
    basicInfoDesc: "Let's start with the basics about your issue",
    categoryPriority: 'Category & Priority',
    categoryPriorityDesc: 'Help us categorize and prioritize your report',
    locationImages: 'Location & Evidence',
    locationImagesDesc: 'Add location and visual evidence for your report',
    reviewSubmit: 'Review & Submit',
    reviewSubmitDesc: 'Please review your report before submitting',
  },

  categories: {
    infrastructure: 'Infrastructure',
    utilities: 'Utilities',
    water: 'Water & Sanitation',
    traffic: 'Traffic',
    environment: 'Environment',
  },

  descriptions: {
    infrastructure: 'Roads, bridges, buildings',
    utilities: 'Power, gas, internet',
    water: 'Water supply, drainage, waste',
    traffic: 'Traffic lights, signs, congestion',
    environment: 'Pollution, green spaces',
  },

  priority: {
    low: 'Low Priority',
    medium: 'Medium Priority',
    high: 'High Priority',
    urgent: 'Urgent',
  },

  fields: {
    title: 'Issue Title',
    description: 'Detailed Description',
    category: 'Issue Category',
    priority: 'Priority Level',
    location: 'Location',
    uploadImages: 'Upload Images (Optional)',
  },

  placeholders: {
    title: 'Brief description of the issue',
    description: 'Provide more details about the issue...',
    location: 'Enter address or landmark',
    dragDrop: 'Drag and drop images here, or click to select',
  },

  actions: {
    previous: 'Previous',
    nextStep: 'Next Step',
    submitReport: 'Submit Report',
    useCurrentLocation: 'Use Current Location',
    chooseFiles: 'Choose Files',
  },

  messages: {
    reportSubmitted: 'Report submitted successfully!',
  },

  reportIssues:{
    title: 'Report an Issue',
    subtitle: 'Help us improve your city by reporting local problems',
  },




   userLeaderboard: {
      communityLeaderboard: "Community Leaderboard",
      rankings: "Rankings",
      achievements: "Achievements",
      topContributors: "Top Contributors",
      fullRankings: "Full Rankings",
      you: "You",
      reports: "Reports",
      resolved: "Resolved",
      dayStreak: "day streak",
      yourPerformance: "Your Performance",
      achievementsAndBadges: "Achievements & Badges",
      achievementsSubtitle: "Unlock badges by contributing to your community",
      unlocked: "Unlocked",
      progress: "Progress",
      ThisWeek: "This Week",
      LastWeek: "Last Week",
      ThisMonth: "This Month",
      AllTime: "All Time",
      points: "pts",
      civicHero: "Civic Hero",
      problemSolver: "Problem Solver",
      communityChampion: "Community Champion",
      streakMaster: "Streak Master",
      firstReport: "First Report",
      newContributor: "New Contributor",
      reporterPro: "Reporter Pro",
      consistencyKing: "Consistency King",
      localGuardian: "Local Guardian",
      issueHunter: "Issue Hunter",
      quickResponder: "Quick Responder",
      communityHelper: "Community Helper",
      risingStar: "Rising Star",
    },


  },

  hi: {
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    userDashboard: 'उपयोगकर्ता डैशबोर्ड',
    governmentDashboard: 'सरकारी डैशबोर्ड',
    switchTo: 'स्विच करें',
    home: 'होम',
    analytics: 'एनालिटिक्स',
    heatmap: 'हीटमैप',
    reportIssue: 'समस्या रिपोर्ट करें',
    leaderboard: 'लीडरबोर्ड',
    welcomeBack: 'वापसी पर स्वागत है',
    userLevel: 'लेवल 5 नागरिक',
    chatBot: 'AI सहायक',
    madeWith: 'बनाया गया',
    forMumbai: 'मुंबई के लिए',
    names: {
      users: ['आर्यन', 'तन्वी', 'राहुल गुप्ता', 'स्नेहा जोशी', 'विक्रम सिंह', 'काव्या रेड्डी', 'आरव कुमार', 'दिया अग्रवाल'],
      officers: ['इंस्पेक्टर राजेश खन्ना', 'ऑफिसर मीरा नायर', 'अधीक्षक अनिल वर्मा', 'इंस्पेक्टर पूजा शर्मा', 'ऑफिसर संजय तिवारी'],
      areas: ['बांद्रा वेस्ट', 'अंधेरी ईस्ट', 'पवई', 'गोरेगांव', 'मलाड', 'बोरिवली', 'ठाणे', 'कुर्ला'],
    },

    // Analytics keys
    totalReports: 'कुल रिपोर्ट्स',
    resolved: 'हल की गई',
    pending: 'ज़रूरियाँ',
    fromLastMonth: 'पिछले महीने से',
    resolutionRate: 'समाधान दर',
    pendingReview: 'समीक्षा लंबित',
    totalPoints: 'कुल अंक',
    rank: 'रैंक',
    thisMonth: 'इस महीने',
    monthlyReportActivity: 'मासिक रिपोर्ट गतिविधि',
    submitted: 'जमा किया गया',
    issueCategories: 'समस्या श्रेणियाँ',
    weeklyContributionTrend: 'साप्ताहिक योगदान रुझान',

    //heatmap
    interactiveCityHeatmap: 'इंटरैक्टिव सिटी हीटमैप',
    activityDensityMap: 'गतिविधि घनत्व मानचित्र',
    clickZonesInfo: 'विस्तृत जानकारी देखने के लिए क्षेत्रों पर क्लिक करें',
    allIssues: 'सभी समस्याएँ',
    infrastructure: 'बुनियादी ढांचा',
    utilities: 'सुविधाएँ',
    waterSanitation: 'जल और स्वच्छता',
    traffic: 'यातायात',
    environment: 'पर्यावरण',
    recentActivity: 'हाल की गतिविधि',
    zoneStatistics: 'क्षेत्रीय आँकड़े',
    lowActivity: 'कम गतिविधि',
    mediumActivity: 'मध्यम गतिविधि',
    highActivity: 'उच्च गतिविधि',
    reports: 'रिपोर्ट्स',
    intensity: 'तीव्रता',
    lastHour: 'पिछला 1 घंटा',
    last24Hours: 'पिछले 24 घंटे',
    last7Days: 'पिछले 7 दिन',
    last30Days: 'पिछले 30 दिन',
    twoMinutesAgo: '2 मिनट पहले',
    fifteenMinutesAgo: '15 मिनट पहले',
    thirtyTwoMinutesAgo: '32 मिनट पहले',
    oneHourAgo: '1 घंटे पहले',
    twoHoursAgo: '2 घंटे पहले',

    //userhome
    TotalReports: 'कुल रिपोर्ट्स',
    resolvedIssues: 'सुलझाई गई समस्याएँ',
    civicScore: 'सिविक स्कोर',
    successRate: 'सफलता दर',
    active: 'प्रगति में',
    Pending: 'लंबित',
    Resolved: 'हल हो गया',
    reportedBy: 'रिपोर्ट किया गया',
    stayUpdated: 'आपके क्षेत्र की नवीनतम रिपोर्ट्स के साथ अपडेट रहें',
    ourCityResponsibility: 'Mumbai Smart City - हमारा शहर, हमारी जिम्मेदारी',
    mumbaiMunicipalCorporation: 'मुंबई महानगरपालिका',
    hoursAgo: 'घंटे पहले',
    daysAgo: 'दिन पहले',

  welcomeOfficer: "अधिकारियों का स्वागत है",
  overview: "समीक्षा",
  assignment: "सौंपे गए कार्य",
  solutions: "समाधान",
  teamManagement: "टीम प्रबंधन",
  

    
    //report
     steps: {
    step: 'चरण',
    of: 'का',
    basicInfo: 'मूल जानकारी',
    basicInfoDesc: 'आइए आपके मुद्दे के बारे में बुनियादी जानकारी से शुरू करें',
    categoryPriority: 'श्रेणी और प्राथमिकता',
    categoryPriorityDesc: 'सहायता करें कि हम आपके रिपोर्ट को सही श्रेणी और प्राथमिकता दें',
    locationImages: 'स्थान और साक्ष्य',
    locationImagesDesc: 'अपने रिपोर्ट के लिए स्थान और दृश्य प्रमाण जोड़ें',
    reviewSubmit: 'समीक्षा और सबमिट',
    reviewSubmitDesc: 'सबमिट करने से पहले कृपया अपनी रिपोर्ट की समीक्षा करें',
  },

  categories: {
    infrastructure: 'बुनियादी ढांचा',
    utilities: 'सुविधाएँ',
    water: 'जल और स्वच्छता',
    traffic: 'यातायात',
    environment: 'पर्यावरण',
  },

  descriptions: {
    infrastructure: 'सड़कें, पुल, इमारतें',
    utilities: 'बिजली, गैस, इंटरनेट',
    water: 'जल आपूर्ति, नालियाँ, कचरा',
    traffic: 'ट्रैफिक लाइट, संकेत, भीड़',
    environment: 'प्रदूषण, हरित क्षेत्र',
  },

  priority: {
    low: 'निम्न प्राथमिकता',
    medium: 'मध्यम प्राथमिकता',
    high: 'उच्च प्राथमिकता',
    urgent: 'तत्काल',
  },

  fields: {
    title: 'मुद्दा शीर्षक',
    description: 'विस्तृत विवरण',
    category: 'मुद्दा श्रेणी',
    priority: 'प्राथमिकता स्तर',
    location: 'स्थान',
    uploadImages: 'छवियाँ अपलोड करें (वैकल्पिक)',
  },

  placeholders: {
    title: 'मुद्दे का संक्षिप्त विवरण',
    description: 'मुद्दे के बारे में अधिक विवरण प्रदान करें...',
    location: 'पता या लैंडमार्क दर्ज करें',
    dragDrop: 'छवियाँ यहाँ ड्रैग और ड्रॉप करें, या चयन करने के लिए क्लिक करें',
  },

  actions: {
    previous: 'पिछला',
    nextStep: 'अगला चरण',
    submitReport: 'रिपोर्ट सबमिट करें',
    useCurrentLocation: 'वर्तमान स्थान का उपयोग करें',
    chooseFiles: 'फ़ाइलें चुनें',
  },

  messages: {
    reportSubmitted: 'रिपोर्ट सफलतापूर्वक सबमिट हो गई!',
  },

  reportIssues:{
  title: 'समस्या रिपोर्ट करें',
  subtitle :'स्थानीय समस्याओं की रिपोर्ट करके अपने शहर को बेहतर बनाने में मदद करें',
  },

  userLeaderboard: {
      communityLeaderboard: "समुदाय लीडरबोर्ड",
      rankings: "रैंकिंग",
      achievements: "उपलब्धियाँ",
      topContributors: "शीर्ष योगदानकर्ता",
      fullRankings: "पूरा रैंकिंग",
      you: "आप",
      reports: "रिपोर्ट्स",
      resolved: "सुलझाए गए",
      dayStreak: "दिन की श्रृंखला",
      yourPerformance: "आपका प्रदर्शन",
      achievementsAndBadges: "उपलब्धियाँ और बैज",
      achievementsSubtitle: "अपने समुदाय में योगदान देकर बैज अनलॉक करें",
      unlocked: "अनलॉक किया गया",
      progress: "प्रगति",
      ThisWeek: "इस सप्ताह",
      LastWeek: "पिछले सप्ताह",
      ThisMonth: "इस महीने",
      AllTime: "सभी समय",
      points: "अंक",
      civicHero: "सिविक हीरो",
      problemSolver: "समस्या समाधानकर्ता",
      communityChampion: "समुदाय चैंपियन",
      streakMaster: "स्ट्रीक मास्टर",
      firstReport: "पहली रिपोर्ट",
      newContributor: "नया योगदानकर्ता",
      reporterPro: "रिपोर्टर प्रो",
      consistencyKing: "लगातार उत्कृष्ट",
      localGuardian: "स्थानीय रक्षक",
      issueHunter: "समस्या शिकारी",
      quickResponder: "तेज़ उत्तरदाता",
      communityHelper: "समुदाय सहायक",
      risingStar: "उभरता सितारा",
    },



  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

interface LanguageProviderProps { children: ReactNode }

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');

  React.useEffect(() => { localStorage.setItem('lang', language); }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};