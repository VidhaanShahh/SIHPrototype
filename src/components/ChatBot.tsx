import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { X, Send, Bot, User, HelpCircle, MessageSquare, Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatBotProps {
  onClose: () => void;
}

export function ChatBot({ onClose }: ChatBotProps) {
  const { t, language } = useLanguage();

  // Language-specific content
  const quickQuestions = language === 'hi' ? [
    "मुद्दा कैसे रिपोर्ट करें?",
    "रिपोर्ट के बाद क्या होता है?",
    "अपनी रिपोर्ट कैसे ट्रैक करें?",
    "पॉइंट्स कैसे कमाएं?",
    "विभिन्न श्रेणियां क्या हैं?"
  ] : [
    "How to report an issue?",
    "What happens after reporting?",
    "How to track my reports?",
    "How to earn points?",
    "What are the categories?"
  ];

  const botResponses: Record<string, { content: string; suggestions?: string[] }> = language === 'hi' ? {
    "मुद्दा कैसे रिपोर्ट करें": {
      content: "मुद्दा रिपोर्ट करने के लिए: 1) 'रिपोर्ट' टैब पर क्लिक करें, 2) बुनियादी जानकारी भरें, 3) श्रेणी और प्राथमिकता चुनें, 4) स्थान और तस्वीरें जोड़ें, 5) समीक्षा करें और सबमिट करें। हर वैध रिपोर्ट के लिए आपको पॉइंट्स मिलेंगे! 🏆",
      suggestions: ["कौन सी श्रेणियां उपलब्ध हैं?", "समीक्षा में कितना समय लगता है?", "क्या मैं रिपोर्ट संपादित कर सकता हूं?"]
    },
    "रिपोर्ट के बाद क्या होता है": {
      content: "सबमिशन के बाद: 1) आपकी रिपोर्ट को एक यूनीक ID मिलती है, 2) सरकारी अधिकारी 24-48 घंटों में इसकी समीक्षा करते हैं, 3) इसे संबंधित विभागों को सौंपा जाता है, 4) आपको प्रगति की अपडेट मिलेगी, 5) समाधान पर आपको पॉइंट्स मिलते हैं! ✨",
      suggestions: ["स्थिति कैसे ट्रैक करें?", "मेरी रिपोर्ट की समीक्षा कौन करता है?", "अगर कुछ नहीं होता तो?"]
    }
  } : {
    "how to report an issue": {
      content: "To report an issue: 1) Click 'Report Issue' tab, 2) Fill basic information, 3) Select category and priority, 4) Add location and photos, 5) Review and submit. You'll earn points for every valid report! 🏆",
      suggestions: ["What categories are available?", "How long does review take?", "Can I edit my report?"]
    },
    "what happens after reporting": {
      content: "After submission: 1) Your report gets a unique ID, 2) Government officials review it within 24-48 hours, 3) It's assigned to relevant departments, 4) You receive progress updates, 5) You earn points when resolved! ✨",
      suggestions: ["How to track status?", "Who reviews my report?", "What if nothing happens?"]
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: t.howCanIHelp,
      timestamp: new Date(),
      suggestions: quickQuestions.slice(0, 3)
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Check for exact matches first
    if (botResponses[normalizedMessage]) {
      return botResponses[normalizedMessage];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(botResponses)) {
      if (normalizedMessage.includes(key.toLowerCase().split(' ')[0]) || key.toLowerCase().includes(normalizedMessage.split(' ')[0])) {
        return response;
      }
    }
    
    // Default response
    return {
      content: language === 'hi' 
        ? "मैं आपकी मदद के लिए यहां हूं! यहां कुछ सामान्य प्रश्न हैं जिनका मैं जवाब दे सकता हूं, या CivicEye के उपयोग के बारे में कुछ भी पूछने के लिए स्वतंत्र महसूस करें। 🙋‍♂️"
        : "I'm here to help! Here are some common questions I can answer, or feel free to ask anything about using CivicEye. 🙋‍♂️",
      suggestions: quickQuestions.slice(0, 4)
    };
  };

  const sendMessage = async (messageContent?: string) => {
    const content = messageContent || currentMessage.trim();
    if (!content) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(content);
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 w-[350px] sm:w-96 h-[500px] glass-card neon-glow-hover z-50 animate-in slide-in-from-bottom-4 duration-300">
      <CardHeader className="pb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <CardTitle className="text-white flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-2 neon-blue animate-pulse">
              <Bot className="h-4 w-4 text-white animate-bounce" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.chatBot}
              </span>
              <div className="text-xs text-gray-400 font-normal">Mumbai AI Assistant</div>
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0 neon-glow-hover"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 relative z-10">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse neon-glow-hover"></div>
          <span className="text-sm text-gray-400">
            {language === 'hi' ? 'ऑनलाइन और मदद के लिए तैयार' : 'Online and ready to help'}
          </span>
          <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-[400px] p-0 relative">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white neon-blue hover:scale-105'
                        : 'glass-card text-gray-100 hover:glass-card-hover'
                    }`}
                  >
                    {/* Fixed text wrapping */}
                    <p className="text-sm leading-relaxed break-words whitespace-pre-wrap overflow-hidden">
                      {message.content}
                    </p>
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickQuestion(suggestion)}
                          className="text-xs glass-card border-white/20 text-gray-300 hover:glass-card-hover hover:text-white mr-1 mb-1 neon-glow-hover transition-all duration-300 hover:scale-105 break-words whitespace-normal text-left h-auto min-h-[32px]"
                        >
                          <HelpCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="break-words">{suggestion}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-1 flex items-center">
                    {message.type === 'user' ? (
                      <User className="h-3 w-3 mr-1 flex-shrink-0" />
                    ) : (
                      <Bot className="h-3 w-3 mr-1 flex-shrink-0" />
                    )}
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-card text-gray-100 p-3 rounded-lg max-w-[85%]">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce neon-blue"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce neon-purple" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-sm text-gray-400 ml-2">
                      {language === 'hi' ? 'सहायक टाइप कर रहा है...' : 'Assistant is typing...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-4 py-2 border-t border-white/10 glass-card">
          <div className="flex flex-wrap gap-1 mb-2">
            {quickQuestions.slice(0, 2).map((question, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer text-xs bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 neon-glow-hover transition-all duration-300 hover:scale-105 break-words whitespace-normal max-w-full"
                onClick={() => handleQuickQuestion(question)}
              >
                <Zap className="h-3 w-3 mr-1 animate-pulse flex-shrink-0" />
                <span className="break-words">{question}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.typeMessage}
              className="glass-card border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:neon-blue break-words"
              disabled={isTyping}
              autoFocus
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 neon-glow-hover transition-all duration-300 hover:scale-105 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}