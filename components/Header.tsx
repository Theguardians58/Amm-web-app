import React, { useState, useEffect, useRef } from 'react';
import { Menu, EyeOff, Heart, MessageCircle, ShoppingBag, User, CircleUser, ShoppingCart, Globe } from 'lucide-react';
import { ViewState, UserProfile, Language } from '../types';
import { ImageWithLoader } from './ImageWithLoader';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  toggleDiscreet: () => void;
  userProfile: UserProfile;
  cartCount: number;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, toggleDiscreet, userProfile, cartCount, language, setLanguage, t }) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const scrollTimeout = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavVisible(false);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsNavVisible(true);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleLogoClick = () => {
    if (currentView === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  const getAiLabel = () => {
    // Default to 25 if age is not provided, matching AIAssistant logic
    const ageVal = userProfile.age ? parseInt(userProfile.age) : 25;
    
    if (!isNaN(ageVal)) {
        if (ageVal < 35) {
            return language === 'hi' ? 'Bhai Se' : 'Ask Brother';
        } else {
            return language === 'hi' ? 'Bete Se' : 'Ask Son';
        }
    }
    
    return language === 'hi' ? 'Bhai Se' : 'Ask Brother';
  };

  const navItems = [
    { id: 'home', icon: Heart, label: t.nav.home },
    { id: 'shop', icon: ShoppingBag, label: t.nav.shop },
    { id: 'community', icon: User, label: t.nav.community },
    { id: 'ai-help', icon: MessageCircle, label: getAiLabel() },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            {/* Logo / Home Button */}
            <button 
                onClick={handleLogoClick} 
                className="flex items-center gap-3 group"
            >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-lg shadow-rose-200 group-hover:scale-105 transition-transform border border-rose-100 bg-white">
                <ImageWithLoader 
                    src="https://cdn-icons-png.flaticon.com/512/9906/9906233.png" 
                    alt="Ammi's Kachhi Logo" 
                    className="w-full h-full object-contain p-1"
                    loaderSize={16}
                />
                </div>
                <span className="font-bold text-lg md:text-xl tracking-tight text-ammi-indigo group-hover:text-ammi-maroon transition-colors">Ammi's Kachhi</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 ml-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as ViewState)}
                        className={`text-sm font-medium transition-colors hover:text-ammi-maroon flex items-center gap-2 ${
                            currentView === item.id ? 'text-ammi-maroon font-bold' : 'text-gray-500'
                        }`}
                    >
                        <item.icon size={18} className={currentView === item.id ? 'fill-current' : ''} />
                        {item.label}
                    </button>
                ))}
            </nav>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            
            <button
              onClick={toggleLanguage}
              className="w-6 h-6 rounded-full border border-gray-200 text-gray-600 hover:text-ammi-maroon hover:border-ammi-maroon hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm"
              title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
            >
              <span className="font-bold text-[10px]">{language === 'hi' ? 'EN' : 'HI'}</span>
            </button>

            <button 
              onClick={() => setView('cart')}
              className="relative p-2.5 rounded-full text-gray-500 hover:text-ammi-maroon hover:bg-gray-50 transition-all"
              title={t.cart.title}
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-ammi-maroon text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setView('profile')}
              className="rounded-full transition-all focus:outline-none ml-1"
              title="Profile"
            >
              {userProfile.photoUrl ? (
                <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                    currentView === 'profile' 
                      ? 'border-ammi-maroon p-[1px]' 
                      : 'border-transparent hover:border-rose-200'
                  }`}>
                    <ImageWithLoader
                    src={userProfile.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                    loaderSize={16}
                    />
                </div>
              ) : (
                <div className={`p-2.5 rounded-full transition-all ${
                  currentView === 'profile' 
                    ? 'bg-ammi-softPink text-ammi-maroon' 
                    : 'text-gray-500 hover:text-ammi-maroon hover:bg-gray-50'
                }`}>
                  <CircleUser size={24} />
                </div>
              )}
            </button>
            
            <button 
              onClick={toggleDiscreet}
              className="p-2.5 rounded-full text-gray-400 hover:text-ammi-indigo hover:bg-gray-50 transition-all ml-1"
              title="Chupao (Hide)"
            >
              <EyeOff size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Nav for Mobile - Fixed position, hidden on md+ */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 py-3 text-xs shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-transform duration-300 ${isNavVisible && !['product-detail', 'cart', 'checkout'].includes(currentView) ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-around">
            {navItems.map((item) => (
                <button 
                    key={item.id}
                    onClick={() => setView(item.id as ViewState)}
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        currentView === item.id ? 'text-ammi-maroon font-bold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <item.icon size={22} className={currentView === item.id ? 'fill-current' : ''} />
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
      </nav>
    </>
  );
};