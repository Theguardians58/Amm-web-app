import React, { useState, useEffect } from 'react';
import { ViewState, Product, UserProfile, CartItem, Language, Review } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderSuccess } from './components/OrderSuccess';
import { ChatSection } from './components/ChatSection';
import { AIAssistant } from './components/AIAssistant';
import { ProfileSection } from './components/ProfileSection';
import { MOCK_PRODUCTS, CATEGORIES, TRANSLATIONS, MOCK_REVIEWS } from './constants';
import { ShieldCheck, Smile, Sparkles, ChefHat, Clock, Heart, UtensilsCrossed, Search, Menu as MenuIcon, FilterX } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDiscreet, setIsDiscreet] = useState(false);
  const [language, setLanguage] = useState<Language>('hi');
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    photoUrl: null,
    age: '',
    size: '',
    religion: ''
  });
  
  const t = TRANSLATIONS[language];

  // Shop State - Using IDs 'all', 'bra', etc.
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Global Website Loader
  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleDiscreet = () => {
    setIsDiscreet(!isDiscreet);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    alert(language === 'hi' ? 'Details save ho gayi!' : 'Details saved successfully!');
  };

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date' | 'likes'>) => {
    const review: Review = {
      ...newReview,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    setReviews(prev => [review, ...prev]);
  };

  // Cart Functions
  const addToCart = (product: Product, size: string, quantity: number = 1, color: string = 'default') => {
    setCart(prev => {
        const existing = prev.find(item => 
            item.product.id === product.id && 
            item.selectedSize === size && 
            (item.selectedColor || 'default') === color
        );
        
        if (existing) {
            return prev.map(item => 
                item.id === existing.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            );
        }
        return [...prev, {
            id: `${product.id}-${size}-${color}-${Date.now()}`,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: quantity
        }];
    });
  };

  const handleAddToCart = (product: Product, size: string, quantity: number = 1, color: string = 'default') => {
    addToCart(product, size, quantity, color);
    alert(language === 'hi' 
      ? `${product.name} (Size: ${size}, Qty: ${quantity}) tokri mein dal diya gaya hai!` 
      : `${product.name} (Size: ${size}, Qty: ${quantity}) added to cart!`
    );
  };

  const handleBuyNow = (product: Product, size: string, quantity: number = 1, color: string = 'default') => {
    addToCart(product, size, quantity, color);
    setView('cart');
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
        setCart([]);
        setView('order-success');
    }, 1000);
  };

  // Filter Logic
  const getFilteredProducts = () => {
    if (activeCategory === 'all') return MOCK_PRODUCTS;
    if (activeCategory === 'bra') return MOCK_PRODUCTS.filter(p => p.category === 'bra');
    if (activeCategory === 'panty') return MOCK_PRODUCTS.filter(p => p.category === 'panty');
    if (activeCategory === 'nighty') return MOCK_PRODUCTS.filter(p => p.category === 'nighty');
    if (activeCategory === 'intimate') return MOCK_PRODUCTS.filter(p => p.category === 'intimate');
    return MOCK_PRODUCTS;
  };

  const displayedProducts = getFilteredProducts();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center animate-fade-in">
         <div className="w-64 h-64 relative mb-4 flex items-center justify-center">
             <div className="absolute inset-0 bg-ammi-softPink/50 rounded-full blur-3xl animate-pulse"></div>
             <img 
                src="https://media.tenor.com/n6XKuq5mXkAAAAAC/victorias-secret-angel.gif" 
                alt="Loading..." 
                className="w-full h-full object-contain relative z-10"
             />
         </div>
         <p className="text-ammi-maroon font-bold text-2xl animate-pulse tracking-wide font-serif">Ammi's Kachhi</p>
         <p className="text-gray-400 text-sm mt-2">Preparing your comfort...</p>
      </div>
    );
  }

  if (isDiscreet) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] font-serif text-gray-800 transition-colors duration-500">
        {/* Fake Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 px-4 py-4 flex justify-between items-center z-10 shadow-sm">
            <div className="flex items-center gap-2 text-stone-600">
                <MenuIcon size={24} />
            </div>
            <div className="text-2xl font-bold text-orange-800 flex items-center gap-2">
                <ChefHat size={28} />
                <span className="tracking-tight">Rasoi Daily</span>
            </div>
            <div className="flex items-center gap-2 text-stone-600">
                <Search size={24} />
            </div>
        </header>

        <div className="max-w-3xl mx-auto p-4 space-y-8">
            {/* Featured Post */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-64 sm:h-80 bg-stone-200 relative overflow-hidden">
                     <img 
                        src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1200" 
                        alt="Chai" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                     />
                     <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        Editor's Pick
                     </div>
                     <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <Clock size={12} /> 10 min
                     </div>
                </div>
                <div className="p-6">
                    <span className="text-orange-600 text-xs font-bold tracking-widest uppercase mb-2 block">Morning Special</span>
                    <h2 className="text-3xl font-bold mb-3 text-stone-800 leading-tight">The Secret to Perfect Masala Chai</h2>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 max-w-xl">
                        Discover the authentic blend of cardamom, ginger, and cloves that makes Indian mornings magical. A comfort in every sip.
                    </p>
                    <div className="flex justify-between items-center border-t border-stone-100 pt-4 text-stone-400 text-xs font-medium">
                         <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-stone-300"></div>
                            <span>By Nani Ma</span>
                         </div>
                         <span className="flex items-center gap-1 text-rose-400"><Heart size={14} fill="currentColor" /> 1.2k</span>
                    </div>
                </div>
            </div>

            {/* List */}
            <div>
                <h3 className="font-bold text-stone-800 text-xl flex items-center gap-2 mb-4">
                    <UtensilsCrossed size={20} className="text-orange-600"/> Latest Recipes
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                        { title: "Crispy Aloo Pakora", time: "25 min", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400", desc: "The ultimate rain companion for your tea." },
                        { title: "Creamy Paneer Kofta", time: "45 min", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400", desc: "Restaurant style gravy at home." },
                        { title: "Instant Rava Idli", time: "20 min", img: "https://images.unsplash.com/photo-1589301760576-41f4739112d8?auto=format&fit=crop&q=80&w=400", desc: "Healthy, fluffy, and ready in minutes." },
                        { title: "Home Style Dal Fry", time: "30 min", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400", desc: "Comfort food that feels like a hug." }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-stone-100 cursor-pointer hover:bg-orange-50/30 transition-colors">
                            <div className="w-24 h-24 bg-stone-200 rounded-xl flex-shrink-0 overflow-hidden">
                                 <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-stone-800 text-lg leading-tight">{item.title}</h4>
                                </div>
                                <p className="text-xs text-stone-500 line-clamp-2 mt-1 mb-2">{item.desc}</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-orange-600 font-medium flex items-center gap-1">
                                        <Clock size={12} /> {item.time}
                                    </span>
                                    <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">Veg</span>
                                </div>
                            </div>
                        </div>
                     ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-orange-100 rounded-2xl p-6 md:p-10 text-center">
                <h4 className="font-bold text-orange-900 mb-2 text-lg">Join our Kitchen!</h4>
                <p className="text-orange-800/70 text-sm mb-6">Get secret recipes delivered to your inbox every week.</p>
                <div className="flex gap-2 max-w-md mx-auto">
                    <input type="email" placeholder="Email address" className="flex-1 px-4 py-3 rounded-xl border-none text-sm focus:ring-2 focus:ring-orange-300 outline-none" disabled />
                    <button className="bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold">Subscribe</button>
                </div>
            </div>

            {/* Footer / Exit */}
            <div className="pt-8 pb-12 text-center border-t border-stone-200 mt-8">
                 <div className="flex justify-center gap-6 text-sm text-stone-400 mb-4">
                    <span className="hover:text-stone-600 cursor-pointer">About Us</span>
                    <span className="hover:text-stone-600 cursor-pointer">Contact</span>
                    <span className="hover:text-stone-600 cursor-pointer">Privacy</span>
                 </div>
                 <p className="text-stone-300 text-xs mb-6">© 2024 Rasoi Daily Blog. All rights reserved.</p>
                 <button 
                    onClick={toggleDiscreet} 
                    className="text-xs text-stone-400 hover:text-stone-600 hover:underline transition-all border border-stone-200 px-4 py-2 rounded-full"
                 >
                    Exit Reader Mode
                 </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ammi-cream font-sans text-ammi-indigo flex flex-col">
      <Header 
        currentView={currentView} 
        setView={setView} 
        toggleDiscreet={toggleDiscreet} 
        userProfile={userProfile} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      {/* Responsive Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto pb-24 md:pb-12 pt-6 px-4 sm:px-6 lg:px-8">
        
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-ammi-maroon to-ammi-maroonLight text-white p-6 md:p-12 rounded-[2rem] shadow-xl shadow-rose-200 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 md:w-80 h-40 md:h-80 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-ammi-gold opacity-20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 max-w-2xl">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <p className="text-rose-100 text-base md:text-lg font-medium">Namaste,</p>
                      <h1 className="text-3xl md:text-5xl font-bold">{userProfile.name || (language === 'hi' ? 'Saheli' : 'Friend')}!</h1>
                   </div>
                   <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                      <Sparkles size={24} className="text-ammi-gold" />
                   </div>
                </div>
                
                <p className="mb-8 text-rose-50 text-sm md:text-lg leading-relaxed max-w-lg">
                  {t.home.welcome}
                </p>
                <button 
                  onClick={() => setView('shop')}
                  className="bg-white text-ammi-maroon font-bold py-4 px-10 rounded-xl text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  {t.home.btn_shop}
                </button>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-ammi-mehndi/30 transition-colors flex flex-col items-center text-center gap-3 group">
                <div className="bg-emerald-50 p-4 rounded-full group-hover:bg-emerald-100 transition-colors">
                   <ShieldCheck size={28} className="text-ammi-mehndi" />
                </div>
                <h3 className="font-bold text-sm md:text-base text-gray-800">{t.home.safety_title}</h3>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">{t.home.safety_desc}</p>
              </div>
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-ammi-maroon/30 transition-colors flex flex-col items-center text-center gap-3 group">
                <div className="bg-rose-50 p-4 rounded-full group-hover:bg-rose-100 transition-colors">
                   <Smile size={28} className="text-ammi-maroon" />
                </div>
                <h3 className="font-bold text-sm md:text-base text-gray-800">{t.home.size_title}</h3>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">{t.home.size_desc}</p>
              </div>
              {/* Added more visual cards for desktop balance */}
              <div className="hidden md:flex bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-ammi-gold/30 transition-colors flex-col items-center text-center gap-3 group">
                <div className="bg-amber-50 p-4 rounded-full group-hover:bg-amber-100 transition-colors">
                   <Heart size={28} className="text-ammi-gold" />
                </div>
                <h3 className="font-bold text-sm md:text-base text-gray-800">Community</h3>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">Safe space for all.</p>
              </div>
              <div className="hidden md:flex bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300/30 transition-colors flex-col items-center text-center gap-3 group">
                <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
                   <Clock size={28} className="text-blue-500" />
                </div>
                <h3 className="font-bold text-sm md:text-base text-gray-800">Fast Delivery</h3>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">Discreet shipping.</p>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-end mb-6 px-1">
                 <h2 className="text-xl md:text-2xl font-bold text-gray-800">{t.home.today_special}</h2>
                 <button onClick={() => setView('shop')} className="text-sm text-ammi-maroon font-bold hover:underline">{t.home.see_all}</button>
              </div>
              {/* Responsive Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PRODUCTS.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} onClick={handleProductClick} language={language} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SHOP VIEW */}
        {currentView === 'shop' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 px-1">{t.shop.title}</h2>
            
            {/* Categories */}
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl text-sm md:text-base font-medium whitespace-nowrap transition-all shadow-sm ${
                    activeCategory === cat.id 
                    ? 'bg-ammi-maroon text-white shadow-rose-200 scale-105' 
                    : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {cat[language]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.length > 0 ? (
                displayedProducts.map(p => (
                  <ProductCard key={p.id} product={p} onClick={handleProductClick} language={language} />
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center text-gray-400">
                  <FilterX size={64} className="mb-4 opacity-50"/>
                  <p className="text-lg">{t.shop.empty}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCT DETAIL VIEW */}
        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setView('shop')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onProductClick={handleProductClick}
            language={language}
            t={t}
            reviews={reviews}
            onAddReview={handleAddReview}
            userProfile={userProfile}
          />
        )}

        {/* CART VIEW */}
        {currentView === 'cart' && (
            <CartView 
                cartItems={cart}
                onRemove={handleRemoveFromCart}
                onCheckout={() => setView('checkout')}
                onBack={() => setView('shop')}
                t={t}
                language={language}
            />
        )}

        {/* CHECKOUT VIEW */}
        {currentView === 'checkout' && (
            <CheckoutView 
                cartItems={cart}
                userProfile={userProfile}
                onPlaceOrder={handlePlaceOrder}
                onBack={() => setView('cart')}
                t={t}
                onSaveProfile={handleSaveProfile}
                language={language}
            />
        )}

        {/* ORDER SUCCESS VIEW */}
        {currentView === 'order-success' && (
            <OrderSuccess 
                onContinueShopping={() => setView('home')}
                t={t}
            />
        )}

        {/* COMMUNITY VIEW */}
        {currentView === 'community' && (
            <div className="max-w-3xl mx-auto">
                <ChatSection 
                    t={t} 
                    userProfile={userProfile} 
                    onRedirectToProfile={() => setView('profile')} 
                />
            </div>
        )}

        {/* AI HELP VIEW */}
        <div style={{ display: currentView === 'ai-help' ? 'block' : 'none' }}>
           <div className="max-w-3xl mx-auto">
               <AIAssistant userProfile={userProfile} language={language} t={t} />
           </div>
        </div>

        {/* PROFILE VIEW */}
        {currentView === 'profile' && (
          <div className="max-w-2xl mx-auto">
             <ProfileSection profile={userProfile} onSave={handleSaveProfile} t={t} />
          </div>
        )}

      </main>

      {/* Show footer only on main navigation screens */}
      {['home', 'shop', 'community', 'ai-help'].includes(currentView) && <Footer />}
    </div>
  );
};

export default App;