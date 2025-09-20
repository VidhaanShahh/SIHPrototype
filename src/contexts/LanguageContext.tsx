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
  reportIssue: string;
  leaderboard: string;
  overview: string;
  assignment: string;
  reports: string;
  solutions: string;
  teamManagement: string;
  
  // User Dashboard
  welcomeBack: string;
  totalReports: string;
  resolvedIssues: string;
  activeReports: string;
  civicScore: string;
  recentActivity: string;
  quickActions: string;
  reportNewIssue: string;
  viewAnalytics: string;
  checkHeatmap: string;
  viewLeaderboard: string;
  issuesSolved: string;
  reportsSubmitted: string;
  communityRank: string;
  
  // Government Dashboard
  welcomeOfficer: string;
  pendingAssignments: string;
  completedTasks: string;
  teamMembers: string;
  cityIssues: string;
  quickAccess: string;
  assignTasks: string;
  viewReports: string;
  trackSolutions: string;
  manageTeam: string;
  
  // Common Actions
  submit: string;
  cancel: string;
  save: string;
  edit: string;
  delete: string;
  view: string;
  update: string;
  assign: string;
  complete: string;
  pending: string;
  active: string;
  resolved: string;
  
  // Indian Names
  names: {
    users: string[];
    officers: string[];
    areas: string[];
  };
  
  // Issue Types
  issueTypes: {
    infrastructure: string;
    sanitation: string;
    traffic: string;
    water: string;
    electricity: string;
    environment: string;
  };
  
  // Chat Bot
  chatBot: string;
  askQuestion: string;
  howCanIHelp: string;
  typeMessage: string;
  send: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Common UI
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    userDashboard: 'User Dashboard',
    governmentDashboard: 'Government Dashboard',
    switchTo: 'Switch to',
    
    // Navigation
    home: 'Home',
    analytics: 'Analytics',
    heatmap: 'Heatmap',
    reportIssue: 'Report Issue',
    leaderboard: 'Leaderboard',
    overview: 'Overview',
    assignment: 'Assignment',
    reports: 'Reports',
    solutions: 'Solutions',
    teamManagement: 'Team Management',
    
    // User Dashboard
    welcomeBack: 'Welcome back',
    totalReports: 'Total Reports',
    resolvedIssues: 'Resolved Issues',
    activeReports: 'Active Reports',
    civicScore: 'Civic Score',
    recentActivity: 'Recent Activity',
    quickActions: 'Quick Actions',
    reportNewIssue: 'Report New Issue',
    viewAnalytics: 'View Analytics',
    checkHeatmap: 'Check Heatmap',
    viewLeaderboard: 'View Leaderboard',
    issuesSolved: 'Issues Solved',
    reportsSubmitted: 'Reports Submitted',
    communityRank: 'Community Rank',
    
    // Government Dashboard
    welcomeOfficer: 'Welcome Officer',
    pendingAssignments: 'Pending Assignments',
    completedTasks: 'Completed Tasks',
    teamMembers: 'Team Members',
    cityIssues: 'City Issues',
    quickAccess: 'Quick Access',
    assignTasks: 'Assign Tasks',
    viewReports: 'View Reports',
    trackSolutions: 'Track Solutions',
    manageTeam: 'Manage Team',
    
    // Common Actions
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    update: 'Update',
    assign: 'Assign',
    complete: 'Complete',
    pending: 'Pending',
    active: 'Active',
    resolved: 'Resolved',
    
    // Indian Names
    names: {
      users: ['Aryan', 'Tanvi', 'Rahul Gupta', 'Sneha Joshi', 'Vikram Singh', 'Kavya Reddy', 'Aarav Kumar', 'Diya Agarwal'],
      officers: ['Inspector Rajesh Khanna', 'Officer Meera Nair', 'Superintendent Anil Verma', 'Inspector Pooja Sharma', 'Officer Sanjay Tiwari'],
      areas: ['Bandra West', 'Andheri East', 'Powai', 'Goregaon', 'Malad', 'Borivali', 'Thane', 'Kurla']
    },
    
    // Issue Types
    issueTypes: {
      infrastructure: 'Infrastructure',
      sanitation: 'Sanitation',
      traffic: 'Traffic',
      water: 'Water Supply',
      electricity: 'Electricity',
      environment: 'Environment'
    },
    
    // Chat Bot
    chatBot: 'AI Assistant',
    askQuestion: 'Ask a question',
    howCanIHelp: 'How can I help you today?',
    typeMessage: 'Type your message...',
    send: 'Send'
  },
  
  hi: {
    // Common UI
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    userDashboard: 'उपयोगकर्ता डैशबोर्ड',
    governmentDashboard: 'सरकारी डैशबोर्ड',
    switchTo: 'स्विच करें',
    
    // Navigation
    home: 'होम',
    analytics: 'एनालिटिक्स',
    heatmap: 'हीटमैप',
    reportIssue: 'समस्या रिपोर्ट करें',
    leaderboard: 'लीडरबोर्ड',
    overview: 'अवलोकन',
    assignment: 'असाइनमेंट',
    reports: 'रिपोर्ट्स',
    solutions: 'समाधान',
    teamManagement: 'टीम प्रबंधन',
    
    // User Dashboard
    welcomeBack: 'वापसी पर स्वागत है',
    totalReports: 'कुल रिपोर्ट्स',
    resolvedIssues: 'हल की गई समस्याएं',
    activeReports: 'सक्रिय रिपोर्ट्स',
    civicScore: 'नागरिक स्कोर',
    recentActivity: 'हाल की गतिविधि',
    quickActions: 'त्वरित कार्य',
    reportNewIssue: 'नई समस्या रिपोर्ट करें',
    viewAnalytics: 'एनालिटिक्स देखें',
    checkHeatmap: 'हीटमैप जांचें',
    viewLeaderboard: 'लीडरबोर्ड देखें',
    issuesSolved: 'हल की गई समस्याएं',
    reportsSubmitted: 'जमा की गई रिपोर्ट्स',
    communityRank: 'समुदायिक रैंक',
    
    // Government Dashboard
    welcomeOfficer: 'स्वागत है अधिकारी',
    pendingAssignments: 'लंबित असाइनमेंट',
    completedTasks: 'पूर्ण कार्य',
    teamMembers: 'टीम सदस्य',
    cityIssues: 'शहरी समस्याएं',
    quickAccess: 'त्वरित पहुंच',
    assignTasks: 'कार्य असाइन करें',
    viewReports: 'रिपोर्ट्स देखें',
    trackSolutions: 'समाधान ट्रैक करें',
    manageTeam: 'टीम प्रबंधित करें',
    
    // Common Actions
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    update: 'अपडेट करें',
    assign: 'असाइन करें',
    complete: 'पूर्ण',
    pending: 'लंबित',
    active: 'सक्रिय',
    resolved: 'हल हो गया',
    
    // Indian Names
    names: {
      users: ['आर्यन', 'तन्वी', 'राहुल गुप्ता', 'स्नेहा जोशी', 'विक्रम सिंह', 'काव्या रेड्डी', 'आरव कुमार', 'दिया अग्रवाल'],
      officers: ['इंस्पेक्टर राजेश खन्ना', 'ऑफिसर मीरा नायर', 'अधीक्षक अनिल वर्मा', 'इंस्पेक्टर पूजा शर्मा', 'ऑफिसर संजय तिवारी'],
      areas: ['बांद्रा वेस्ट', 'अंधेरी ईस्ट', 'पवई', 'गोरेगांव', 'मलाड', 'बोरिवली', 'ठाणे', 'कुर्ला']
    },
    
    // Issue Types
    issueTypes: {
      infrastructure: 'बुनियादी ढांचा',
      sanitation: 'स्वच्छता',
      traffic: 'यातायात',
      water: 'जल आपूर्ति',
      electricity: 'बिजली',
      environment: 'पर्यावरण'
    },
    
    // Chat Bot
    chatBot: 'AI सहायक',
    askQuestion: 'एक प्रश्न पूछें',
    howCanIHelp: 'आज मैं आपकी कैसे मदद कर सकता हूं?',
    typeMessage: 'अपना संदेश टाइप करें...',
    send: 'भेजें'
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
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};