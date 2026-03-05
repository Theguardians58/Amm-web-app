import React from 'react';
import { CartItem, Language } from '../types';
import { Trash2, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { ImageWithLoader } from './ImageWithLoader';
import { getLocalizedProductName } from '../utils';

interface CartViewProps {
  cartItems: CartItem[];
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
  onBack: () => void;
  t: any;
  language: Language;
}

export const CartView: React.FC<CartViewProps> = ({ cartItems, onRemove, onCheckout, onBack, t, language }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 499 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-fade-in bg-white rounded-[2rem] shadow-sm border border-gray-100 max-w-4xl mx-auto">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
            <ShoppingBag size={64} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{t.cart.empty_title}</h2>
        <p className="text-gray-500 text-base mb-10 max-w-xs mx-auto">{t.cart.empty_desc}</p>
        <button 
            onClick={onBack}
            className="bg-ammi-maroon text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-800 transition-all"
        >
            {t.cart.btn_shop_back}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden min-h-[80vh] animate-fade-in flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{t.cart.title} ({cartItems.length})</h2>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 flex-1">
        {/* Items List */}
        <div className="flex-1 p-6 space-y-6 lg:col-span-2 lg:border-r lg:border-gray-50">
            {cartItems.map((item) => (
                <div key={item.id} className="flex gap-5 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-ammi-maroon/20 transition-colors">
                    <div className="w-24 h-28 bg-white rounded-xl overflow-hidden flex-shrink-0">
                        <ImageWithLoader src={item.product.image} alt={getLocalizedProductName(item.product.name, language)} className="w-full h-full object-cover" loaderSize={20} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800 text-base md:text-lg line-clamp-1">{getLocalizedProductName(item.product.name, language)}</h3>
                                <button 
                                    onClick={() => onRemove(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors -mt-2 -mr-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div className="flex gap-2 mt-1">
                                <p className="text-sm text-gray-500">Size: <span className="font-bold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">{item.selectedSize}</span></p>
                                {item.selectedColor && item.selectedColor !== 'default' && (
                                    <p className="text-sm text-gray-500">Color: <span className="font-bold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 capitalize">{item.selectedColor}</span></p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                             <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                             </div>
                            <span className="font-bold text-ammi-maroon text-lg">₹{item.product.price * item.quantity}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Summary & Checkout - Sticky on desktop */}
        <div className="lg:col-span-1 p-6 bg-white border-t lg:border-t-0 border-gray-100 lg:bg-gray-50/50">
            <div className="sticky top-24">
                <h3 className="font-bold text-lg mb-6 text-gray-800 hidden lg:block">Order Details</h3>
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>{t.cart.subtotal}</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>{t.cart.delivery}</span>
                        <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>
                            {shipping === 0 ? "FREE" : `₹${shipping}`}
                        </span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between font-bold text-xl text-gray-900">
                        <span>{t.cart.total}</span>
                        <span>₹{total}</span>
                    </div>
                </div>
                
                <button 
                    onClick={onCheckout}
                    className="w-full bg-ammi-maroon text-white py-4 rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-800 transition-all flex items-center justify-center gap-2 group text-lg"
                >
                    {t.cart.btn_checkout} <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform"/>
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">Secure Checkout • Easy Returns</p>
            </div>
        </div>
      </div>
    </div>
  );
};