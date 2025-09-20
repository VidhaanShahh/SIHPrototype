import React from 'react';

interface DynamicBackgroundProps {
  theme?: 'user' | 'government';
}

export function DynamicBackground({ theme = 'user' }: DynamicBackgroundProps) {
  const isUser = theme === 'user';
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Enhanced gradient background with Mumbai-inspired colors */}
      <div className={`absolute inset-0 opacity-60 ${
        isUser 
          ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/25 to-indigo-900/30' 
          : 'bg-gradient-to-br from-indigo-900/30 via-slate-900/25 to-purple-900/30'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
      </div>
      
      {/* Secondary gradient overlay with neon glow */}
      <div className={`absolute inset-0 opacity-40 ${
        isUser
          ? 'bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent'
          : 'bg-gradient-radial from-indigo-500/10 via-slate-500/5 to-transparent'
      }`}></div>
      
      {/* Enhanced floating orbs with neon glow */}
      <div className={`absolute top-20 left-20 w-40 h-40 ${
        isUser ? 'bg-blue-500/15' : 'bg-indigo-500/15'
      } rounded-full blur-2xl animate-float neon-blue`} style={{ animationDuration: '8s' }}></div>
      
      <div className={`absolute top-40 right-32 w-32 h-32 ${
        isUser ? 'bg-purple-500/15' : 'bg-slate-500/15'
      } rounded-full blur-2xl animate-float neon-purple`} style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      
      <div className={`absolute bottom-32 left-1/3 w-48 h-48 ${
        isUser ? 'bg-indigo-500/12' : 'bg-purple-500/12'
      } rounded-full blur-3xl animate-drift`} style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
      
      <div className={`absolute top-1/2 right-1/4 w-36 h-36 ${
        isUser ? 'bg-cyan-500/15' : 'bg-indigo-500/15'
      } rounded-full blur-2xl animate-float`} style={{ animationDuration: '9s', animationDelay: '1s' }}></div>
      
      <div className={`absolute bottom-20 right-20 w-28 h-28 ${
        isUser ? 'bg-purple-400/15' : 'bg-slate-400/15'
      } rounded-full blur-xl animate-drift neon-purple`} style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
      
      {/* Moving gradient streaks */}
      <div className={`absolute inset-0 opacity-30 ${
        isUser 
          ? 'bg-gradient-to-r from-transparent via-blue-500/8 to-transparent' 
          : 'bg-gradient-to-l from-transparent via-indigo-500/8 to-transparent'
      } transform -skew-x-12 animate-pulse`} style={{ animationDuration: '3s' }}></div>
      
      {/* Enhanced grid pattern with glowing effect */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.3) 2px, transparent 0),
          radial-gradient(circle at 75px 75px, rgba(147, 51, 234, 0.2) 1px, transparent 0)
        `,
        backgroundSize: '50px 50px, 100px 100px',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {/* Mumbai-themed particle constellation */}
        <div className={`absolute top-1/4 left-1/4 w-3 h-3 ${
          isUser ? 'bg-blue-400' : 'bg-indigo-400'
        } rounded-full animate-ping`} style={{ animationDelay: '0s' }}></div>
        
        <div className={`absolute top-3/4 right-1/4 w-2 h-2 ${
          isUser ? 'bg-purple-400' : 'bg-slate-400'
        } rounded-full animate-ping`} style={{ animationDelay: '2s' }}></div>
        
        <div className={`absolute bottom-1/4 left-3/4 w-4 h-4 ${
          isUser ? 'bg-indigo-400' : 'bg-purple-400'
        } rounded-full animate-ping`} style={{ animationDelay: '4s' }}></div>
        
        <div className={`absolute top-1/3 right-1/3 w-2.5 h-2.5 ${
          isUser ? 'bg-cyan-400' : 'bg-indigo-400'
        } rounded-full animate-ping`} style={{ animationDelay: '1.5s' }}></div>
        
        <div className={`absolute bottom-1/3 left-1/2 w-3.5 h-3.5 ${
          isUser ? 'bg-blue-300' : 'bg-slate-300'
        } rounded-full animate-ping`} style={{ animationDelay: '3.5s' }}></div>
        
        <div className={`absolute top-1/6 left-1/6 w-1.5 h-1.5 ${
          isUser ? 'bg-purple-300' : 'bg-indigo-300'
        } rounded-full animate-ping`} style={{ animationDelay: '5s' }}></div>
        
        <div className={`absolute bottom-1/6 right-1/6 w-2.5 h-2.5 ${
          isUser ? 'bg-blue-500' : 'bg-purple-500'
        } rounded-full animate-ping`} style={{ animationDelay: '6s' }}></div>
      </div>
      
      {/* Enhanced pulsing network lines with Mumbai skyline inspiration */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: isUser ? '#3B82F6' : '#4F46E5', stopOpacity: 0.2 }} />
            <stop offset="50%" style={{ stopColor: isUser ? '#8B5CF6' : '#7C3AED', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: isUser ? '#06B6D4' : '#6366F1', stopOpacity: 0.2 }} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: isUser ? '#8B5CF6' : '#7C3AED', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: isUser ? '#3B82F6' : '#4F46E5', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        
        {/* Main network connections */}
        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" />
        </line>
        
        <line x1="80%" y1="10%" x2="20%" y2="90%" stroke="url(#gradient1)" strokeWidth="1.5" opacity="0.4">
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur="5s" repeatCount="indefinite" begin="1s" />
        </line>
        
        <line x1="30%" y1="70%" x2="70%" y2="30%" stroke="url(#gradient2)" strokeWidth="2" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="6s" repeatCount="indefinite" begin="2s" />
        </line>
        
        <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="url(#gradient2)" strokeWidth="1" opacity="0.3">
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite" begin="3s" />
        </line>
        
        <line x1="50%" y1="15%" x2="50%" y2="85%" stroke="url(#gradient1)" strokeWidth="1.5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="7s" repeatCount="indefinite" begin="0.5s" />
        </line>
        
        {/* Interconnected nodes */}
        <circle cx="20%" cy="30%" r="3" fill={isUser ? '#3B82F6' : '#4F46E5'} opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="80%" cy="70%" r="2" fill={isUser ? '#8B5CF6' : '#7C3AED'} opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" begin="1s" />
        </circle>
        
        <circle cx="60%" cy="40%" r="2.5" fill={isUser ? '#06B6D4' : '#6366F1'} opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" begin="2s" />
        </circle>
      </svg>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 animate-shimmer"></div>
      </div>
    </div>
  );
}