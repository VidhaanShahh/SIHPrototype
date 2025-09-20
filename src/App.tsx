import React, { useState } from 'react';
import { UserDashboard } from './components/UserDashboard';
import { GovernmentDashboard } from './components/GovernmentDashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import { Button } from './components/ui/button';
import { Users, Building2, Moon, Sun } from 'lucide-react';

export default function App() {
  const [currentDashboard, setCurrentDashboard] = useState<'user' | 'government'>('user');
  const [isDarkMode, setIsDarkMode] = useState(true);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <LanguageProvider>
      {currentDashboard === 'user' ? (
        <UserDashboard onSwitchDashboard={setCurrentDashboard} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      ) : (
        <GovernmentDashboard onSwitchDashboard={setCurrentDashboard} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      )}
    </LanguageProvider>
  );
}