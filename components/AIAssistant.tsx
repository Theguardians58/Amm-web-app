import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Smile } from 'lucide-react';
import { Chat } from "@google/genai";
import { createChatSession, sendMessageToAmmi } from '../services/geminiService';
import { UserProfile, Language } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'beta';
  text: string;
}

interface AIAssistantProps {
  userProfile: UserProfile;
  language: Language;
  t: any;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ userProfile, language, t }) => {
  const chatRef = useRef<Chat | null>(null);
  
  const getInitialHonorific = (): string => {
    const age = parseInt(userProfile.age) || 25;
    const religion = userProfile.religion;
    
    if (language === 'en') {
       if (religion === 'Hindu') return age < 35 ? 'Sister' : 'Mother';
       if (religion === 'Muslim') return age < 35 ? 'Sister' : 'Mother';
       if (religion === 'Christian') return age < 35 ? 'Sister' : 'Mom';
       if (religion === 'Sikh') return age < 35 ? 'Sister' : 'Mother';
       return age < 35 ? 'Miss' : 'Ma\'am';
    }

    if (religion === 'Hindu') return age < 35 ? 'Didi' : 'Mummy';
    if (religion === 'Muslim') return age < 35 ? 'Aapi' : 'Ammi';
    if (religion === 'Christian') return age < 35 ? 'Sis' : 'Mom';
    if (religion === 'Sikh') return age < 35 ? 'Bhen' : 'Bebe';
    
    return age < 35 ? 'Didi' : 'Aunty';
  };

  const getRelation = (honorific: string): string => {
    const age = parseInt(userProfile.age);
    if (!isNaN(age)) {
        if (age < 35) return 'chota bhai';
        return 'beta';
    }
    // Fallback if age is not set
    const sisterHonorifics = ['Didi', 'Aapi', 'Sis', 'Bhen', 'Sister', 'Miss'];
    return sisterHonorifics.includes(honorific) ? 'chota bhai' : 'beta';
  };

  const honorific = getInitialHonorific();
  const relation = getRelation(honorific);
  
  const getRelationDisplay = (rel: string) => {
      if (rel === 'beta') return language === 'hi' ? 'Beta' : 'Son';
      if (rel === 'chota bhai') return language === 'hi' ? 'Chota Bhai' : 'Brother';
      return language === 'hi' ? 'Beta' : 'Son';
  };

  const relationDisplay = getRelationDisplay(relation);
  const loadingTextRelation = relation === 'beta' 
    ? (language === 'hi' ? 'Beta' : 'Son') 
    : (language === 'hi' ? 'Bhai' : 'Brother');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = createChatSession(userProfile, language);
    
    const newHonorific = getInitialHonorific();
    const introTemplate = language === 'hi' ? t.ai.intro_hi : t.ai.intro_en;
    const introText = introTemplate.replace('{honorific}', newHonorific);

    setMessages([{ 
      id: Date.now().toString(), 
      sender: 'beta', 
      text: introText
    }]);
  }, [userProfile.religion, userProfile.age, userProfile.name, language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToAmmi(chatRef.current, input, userProfile, language);
    
    const aiMsg: Message = { 
      id: (Date.now() + 1).toString(), 
      sender: 'beta', 
      text: responseText 
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[650px] bg-white rounded-t-[2rem] md:rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
      {/* AI Header */}
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-4">
        <div className="bg-ammi-softPink p-2 rounded-2xl text-ammi-maroon relative shadow-sm">
          <Bot size={24} />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[2px]">
             <Smile size={10} className="text-ammi-gold fill-current"/>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{relationDisplay}</h2>
          <div className="flex items-center gap-1">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <p className="text-xs text-gray-400">Online • Shop Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50/50" ref={scrollRef}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-ammi-maroon text-white rounded-br-none' 
                : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'
            }`}>
              {msg.sender === 'beta' && (
                <div className="flex items-center gap-1 mb-2 text-ammi-maroon font-bold text-xs uppercase tracking-wide">
                  <User size={12} /> {relationDisplay}
                </div>
              )}
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                 <span className="w-2 h-2 bg-ammi-maroonLight rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-ammi-maroonLight rounded-full animate-bounce delay-100"></span>
                 <span className="w-2 h-2 bg-ammi-maroonLight rounded-full animate-bounce delay-200"></span>
              </div>
              <span className="text-xs text-gray-400 mt-2 block">
                {t.ai.typing.replace('{relation}', loadingTextRelation)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.ai.placeholder.replace('{honorific}', honorific)}
            className="w-full bg-gray-100 hover:bg-gray-50 focus:bg-white rounded-2xl pl-5 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-2 top-2 bg-ammi-maroon text-white p-2.5 rounded-xl hover:bg-rose-800 transition-all disabled:opacity-50 disabled:hover:bg-ammi-maroon shadow-md shadow-rose-200"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-3">
           Not medical advice. I am an AI assistant.
        </p>
      </div>
    </div>
  );
};