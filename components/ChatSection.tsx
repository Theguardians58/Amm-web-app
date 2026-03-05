import React, { useState, useRef } from 'react';
import { Send, UserCircle2, Sparkles, Image as ImageIcon, X, ArrowRight } from 'lucide-react';
import { ChatMessage, UserProfile } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../constants';
import { ImageWithLoader } from './ImageWithLoader';

interface ChatSectionProps {
    t: any;
    userProfile?: UserProfile;
    onRedirectToProfile?: () => void;
}

export const ChatSection: React.FC<ChatSectionProps> = ({ t, userProfile, onRedirectToProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProfileComplete = userProfile && userProfile.name && userProfile.name.trim() !== '';

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset value to allow re-selection
    e.target.value = '';
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSend = () => {
    if (!inputText.trim() && !selectedImage) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: userProfile?.name || 'Aap (Anonymous)',
      text: inputText,
      imageUrl: selectedImage || undefined,
      timestamp: new Date(),
      isUser: true
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[650px] bg-white rounded-t-[2rem] md:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-ammi-mehndi to-emerald-600 p-6 text-white text-center relative overflow-hidden flex-shrink-0">
         <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-5 -mt-5"></div>
        <h2 className="text-xl font-bold flex items-center justify-center gap-2">
           <Sparkles size={18} /> {t.community.title}
        </h2>
        <p className="text-xs text-emerald-100 mt-1">{t.community.desc}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-gray-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm ${
              msg.isUser 
                ? 'bg-ammi-mehndi text-white rounded-br-none' 
                : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
            }`}>
              {!msg.isUser && (
                <div className="flex items-center gap-1 mb-2 text-xs font-bold text-ammi-mehndi uppercase tracking-wide">
                  <UserCircle2 size={12} />
                  {msg.sender}
                </div>
              )}
              
              {msg.imageUrl && (
                <div className="mb-2 rounded-lg overflow-hidden border border-black/10">
                   <img src={msg.imageUrl} alt="Shared" className="max-w-full h-auto max-h-60 object-cover" />
                </div>
              )}

              {msg.text && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      {isProfileComplete ? (
        <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-2 flex-shrink-0">
            {selectedImage && (
                <div className="relative inline-block self-start mb-2 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <button 
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 shadow-md hover:bg-black transition-colors"
                    >
                        <X size={12} />
                    </button>
                </div>
            )}
            <div className="flex items-end gap-3">
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3.5 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-ammi-mehndi transition-colors"
                    title="Add Image"
                >
                    <ImageIcon size={20} />
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageSelect} 
                    accept="image/*" 
                    className="hidden" 
                />

                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t.community.placeholder}
                    rows={1}
                    className="flex-1 bg-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all hover:bg-gray-50 focus:bg-white resize-none"
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <button 
                    onClick={handleSend}
                    disabled={!inputText.trim() && !selectedImage}
                    className="bg-ammi-mehndi text-white p-3.5 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
      ) : (
        <div className="p-6 bg-white border-t border-gray-100 flex-shrink-0">
             <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col items-center text-center gap-3">
                 <div className="bg-red-100 p-2 rounded-full text-red-600">
                     <UserCircle2 size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-800 text-sm">Join the Conversation</h3>
                    <p className="text-xs text-gray-500 mt-1">Please complete your profile details to start chatting with the community.</p>
                 </div>
                 <button 
                    onClick={onRedirectToProfile}
                    className="bg-ammi-maroon text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-rose-800 transition-colors flex items-center gap-2"
                 >
                    Complete Profile <ArrowRight size={14} />
                 </button>
             </div>
        </div>
      )}
    </div>
  );
};