import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="glass-card hover:glass-card-hover transition-all duration-300 border-white/20 hover:border-white/30 text-white hover:text-blue-300"
        >
          <Globe className="h-4 w-4 mr-2" />
          {t.language}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="glass-card border-white/20 text-white min-w-[120px]"
      >
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`cursor-pointer hover:bg-white/10 ${
            language === 'en' ? 'bg-white/20 text-blue-300' : ''
          }`}
        >
          <span className="mr-2">🇺🇸</span>
          {t.english}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('hi')}
          className={`cursor-pointer hover:bg-white/10 ${
            language === 'hi' ? 'bg-white/20 text-blue-300' : ''
          }`}
        >
          <span className="mr-2">🇮🇳</span>
          {t.hindi}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};