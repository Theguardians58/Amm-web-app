import React, { useState } from 'react';
import { Product, Language, Review, UserProfile } from '../types';
import { ArrowLeft, Info, Ruler, ThermometerSun, MapPin, Truck, CheckCircle2, ShoppingCart, Zap, Star } from 'lucide-react';
import { ImageWithLoader } from './ImageWithLoader';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { ReviewSection } from './ReviewSection';
import { getLocalizedProductName } from '../utils';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, quantity: number, color: string) => void;
  onBuyNow: (product: Product, size: string, quantity: number, color: string) => void;
  onProductClick?: (product: Product) => void;
  language: Language;
  t: any;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'likes'>) => void;
  userProfile: UserProfile;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, onBuyNow, onProductClick, language, t, reviews, onAddReview, userProfile }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('default');
  const [pincode, setPincode] = useState('');
  const [isPincodeChecked, setIsPincodeChecked] = useState(false);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(product.image);

  // Update active image when product changes
  React.useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  const description = language === 'en' ? product.description : product.hindiDescription;
  const productName = getLocalizedProductName(product.name, language);
  
  // Combine main image with additional images
  const allImages = [product.image, ...(product.images || [])];
  const colors = [
      { id: 'default', hex: '#F4F4F5', name: 'Classic White' },
      { id: 'black', hex: '#18181B', name: 'Midnight Black' },
      { id: 'nude', hex: '#E7E5E4', name: 'Nude' },
      { id: 'rose', hex: '#FECDD3', name: 'Soft Rose' },
  ];

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      setIsPincodeChecked(true);
    } else {
      alert(t.detail.error_pincode);
    }
  };

  const validateAndAction = (action: 'cart' | 'buy') => {
    if (!selectedSize) {
      setError(t.detail.error_size);
      // Scroll to size section
      document.getElementById('size-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setError('');
    
    if (action === 'cart') {
      onAddToCart(product, selectedSize, quantity, selectedColor); 
    } else {
      onBuyNow(product, selectedSize, quantity, selectedColor);
    }
  };

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 2);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden min-h-[80vh] animate-fade-in relative z-10 pb-20 lg:pb-0 lg:flex lg:items-stretch lg:min-h-[600px]">
      {/* Back Button - Fixed for mobile, Absolute for desktop */}
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 bg-white/30 lg:bg-gray-100 backdrop-blur-md p-3 rounded-full text-white lg:text-gray-700 hover:bg-white/50 lg:hover:bg-gray-200 transition-colors z-20 shadow-sm"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Image Section */}
      <div className="relative h-96 lg:h-auto lg:w-1/2 lg:flex-shrink-0 bg-gray-50 flex flex-col">
        <div className="flex-1 relative">
          <ImageWithLoader src={activeImage} alt={productName} className="w-full h-full object-cover" loaderSize={40} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none lg:hidden"></div>
        </div>
        
        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto bg-white/80 backdrop-blur-sm lg:bg-white border-t border-gray-100">
            {allImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImage === img ? 'border-ammi-maroon opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <ImageWithLoader src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" loaderSize={16} />
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 lg:p-10 space-y-8 -mt-10 lg:mt-0 bg-white rounded-t-[2rem] lg:rounded-none relative lg:w-1/2 lg:overflow-y-auto lg:max-h-[85vh]">
        {/* Header Info */}
        <div className="flex justify-between items-start pt-2 lg:pt-0">
          <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">{productName}</h1>
              <p className="text-sm md:text-base text-gray-500 mt-2 font-medium">{product.fabric}</p>
          </div>
          <div className="bg-ammi-softPink px-4 py-2 rounded-2xl">
              <p className="text-ammi-maroon font-bold text-xl md:text-2xl">₹{product.price}</p>
          </div>
        </div>

        {/* Ammi's Review */}
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 relative">
          <div className="absolute -top-3 left-6 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
             <Info size={12} /> {t.detail.review_title}
          </div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2 italic">
            "{description}"
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4">
           <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
              <Ruler size={24} className="mx-auto mb-2 text-ammi-indigo"/>
              <span className="text-[10px] uppercase tracking-wider block text-gray-400">{t.detail.fitting}</span>
              <span className="text-sm md:text-base font-bold text-gray-800">True</span>
           </div>
           <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
              <ThermometerSun size={24} className="mx-auto mb-2 text-ammi-maroon"/>
              <span className="text-[10px] uppercase tracking-wider block text-gray-400">{t.detail.season}</span>
              <span className="text-sm md:text-base font-bold text-gray-800">All</span>
           </div>
           <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
              <div className="mx-auto mb-2 font-bold text-ammi-mehndi text-xl flex items-center justify-center gap-1">
                  {product.comfortLevel}<span className="text-xs text-gray-400">/5</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider block text-gray-400">{t.detail.comfort}</span>
           </div>
        </div>

        {/* Color Selection */}
        <div>
            <h3 className="font-bold text-sm text-gray-800 mb-3">Color</h3>
            <div className="flex gap-3">
                {colors.map(color => (
                    <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedColor === color.id 
                            ? 'border-ammi-maroon scale-110' 
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={color.name}
                    >
                        <div 
                            className="w-8 h-8 rounded-full shadow-sm border border-gray-100" 
                            style={{ backgroundColor: color.hex }}
                        ></div>
                    </button>
                ))}
            </div>
        </div>

        {/* Size Selection */}
        <div id="size-section">
            <h3 className="font-bold text-sm text-gray-800 mb-4 flex items-center justify-between">
                <span>{t.detail.select_size}</span>
                <span className="text-ammi-maroon text-xs underline cursor-pointer flex items-center gap-1">
                    <Ruler size={12} /> {t.detail.chart}
                </span>
            </h3>
            <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                    <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setError(''); }}
                        className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all ${
                            selectedSize === size 
                            ? 'bg-ammi-maroon text-white border-ammi-maroon shadow-md transform scale-105' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-ammi-maroon/50'
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2 font-medium animate-pulse">{error}</p>}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Quantity</span>
            <div className="flex items-center gap-4 bg-white rounded-xl px-2 py-1 shadow-sm border border-gray-200">
                <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-ammi-maroon font-bold text-lg"
                >
                    -
                </button>
                <span className="font-bold text-gray-800 w-4 text-center">{quantity}</span>
                <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-ammi-maroon font-bold text-lg"
                >
                    +
                </button>
            </div>
        </div>

        {/* Delivery Checker */}
        <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/30">
            <div className="flex items-center gap-2 text-gray-800 font-bold text-sm mb-3">
                <MapPin size={18} className="text-ammi-maroon" /> 
                {t.detail.check_delivery}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <input 
                    type="number" 
                    placeholder="Pincode (e.g. 110001)" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ammi-maroon shadow-sm w-full"
                />
                <button 
                    onClick={handlePincodeCheck}
                    className="text-white bg-gray-800 font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors shadow-sm w-full sm:w-auto"
                >
                    {t.detail.btn_check}
                </button>
            </div>
            {isPincodeChecked && (
                <div className="flex items-center gap-2 mt-4 text-green-600 text-sm font-medium animate-fade-in">
                    <CheckCircle2 size={16} />
                    <span>{t.detail.success_delivery}</span>
                </div>
            )}
        </div>

        {/* Review Section */}
        <ReviewSection 
          productId={product.id}
          reviews={reviews}
          onAddReview={onAddReview}
          userProfile={userProfile}
          t={t}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">You might also like</h3>
                <div className="grid grid-cols-2 gap-4">
                    {relatedProducts.map(rp => (
                        <ProductCard 
                            key={rp.id} 
                            product={rp} 
                            onClick={(p) => onProductClick && onProductClick(p)} 
                            language={language} 
                        />
                    ))}
                </div>
            </div>
        )}

        {/* Action Buttons - Sticky on Mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:static lg:bg-transparent lg:border-none lg:p-0 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:shadow-none">
           <div className="flex gap-3 max-w-7xl mx-auto">
               <button 
                    onClick={() => validateAndAction('cart')}
                    className="flex-1 bg-rose-50 border border-rose-100 text-ammi-maroon py-3.5 rounded-full font-bold text-sm md:text-base shadow-sm hover:bg-rose-100 transition-all flex items-center justify-center gap-2 active:scale-95"
               >
                  <ShoppingCart size={20} />
                  {t.detail.add_cart}
               </button>
               <button 
                    onClick={() => validateAndAction('buy')}
                    className="flex-1 bg-ammi-maroon text-white py-3.5 rounded-full font-bold text-base md:text-lg shadow-lg shadow-rose-200 hover:bg-rose-800 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
               >
                  <Zap size={20} className="fill-current" />
                  {t.detail.buy_now}
               </button>
           </div>
        </div>
      </div>
    </div>
  );
};