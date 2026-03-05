import React, { useState } from 'react';
import { CartItem, UserProfile, Language } from '../types';
import { ArrowLeft, CheckCircle2, Truck, Wallet, ShieldCheck, MapPin } from 'lucide-react';
import { getLocalizedProductName } from '../utils';

interface CheckoutViewProps {
  cartItems: CartItem[];
  userProfile: UserProfile;
  onPlaceOrder: () => void;
  onBack: () => void;
  t: any;
  onSaveProfile?: (profile: UserProfile) => void;
  language: Language;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ cartItems, userProfile, onPlaceOrder, onBack, t, onSaveProfile, language }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 499 ? 0 : 50;
  const total = subtotal + shipping;

  const [address, setAddress] = useState(userProfile.address || '');
  const [phone, setPhone] = useState(userProfile.phoneNumber || '');
  const [name, setName] = useState(userProfile.name || '');
  const [showMap, setShowMap] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(false);

  // Check if current details differ from profile
  const hasChanges = 
    name !== (userProfile.name || '') || 
    phone !== (userProfile.phoneNumber || '') || 
    address !== (userProfile.address || '');

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would reverse geocode these coordinates
          const { latitude, longitude } = position.coords;
          setAddress(`Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)} (Simulated Address)`);
          setShowMap(true);
        },
        (error) => {
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const handlePlaceOrderClick = () => {
    if (saveToProfile && hasChanges && onSaveProfile) {
      const updatedProfile = {
        ...userProfile,
        name: name,
        phoneNumber: phone,
        address: address
      };
      onSaveProfile(updatedProfile);
    }
    onPlaceOrder();
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden min-h-[80vh] animate-fade-in flex flex-col max-w-5xl mx-auto">
       {/* Header */}
       <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{t.checkout.title}</h2>
      </div>

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="p-6 lg:p-8 space-y-8 lg:col-span-2">
            {/* Address Section */}
            <div className="space-y-5">
                <h3 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                    <div className="bg-ammi-indigo/10 p-2 rounded-lg">
                        <Truck size={20} className="text-ammi-indigo" /> 
                    </div>
                    {t.checkout.delivery_title}
                </h3>
                <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input 
                            type="text" 
                            placeholder={t.checkout.ph_name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-ammi-maroon focus:bg-white transition-colors"
                        />
                        <input 
                            type="tel" 
                            placeholder={t.checkout.ph_phone}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-ammi-maroon focus:bg-white transition-colors"
                        />
                    </div>
                    
                    <div className="relative">
                        <textarea 
                            placeholder={t.checkout.ph_address}
                            rows={4}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-ammi-maroon focus:bg-white transition-colors resize-none mb-2"
                        />
                        <button 
                            onClick={handleUseCurrentLocation}
                            className="absolute bottom-4 right-4 bg-white text-ammi-maroon text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm hover:bg-rose-50 flex items-center gap-1 transition-colors"
                        >
                            <MapPin size={14} /> Use My Location
                        </button>
                    </div>

                    {showMap && (
                        <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
                            {/* Placeholder for Map */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="text-center">
                                    <MapPin size={32} className="text-ammi-maroon mx-auto mb-2 animate-bounce" />
                                    <p className="text-xs text-gray-500 font-medium">Location Pinned on Map</p>
                                </div>
                            </div>
                            <iframe 
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight={0} 
                                marginWidth={0} 
                                src="https://maps.google.com/maps?q=28.6139,77.2090&z=15&output=embed"
                                className="opacity-50 pointer-events-none"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-5">
                <h3 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                    <div className="bg-ammi-indigo/10 p-2 rounded-lg">
                        <Wallet size={20} className="text-ammi-indigo" /> 
                    </div>
                    {t.checkout.payment_title}
                </h3>
                
                <label className="flex items-center gap-4 p-5 border-2 border-ammi-maroon/20 bg-rose-50/50 rounded-2xl cursor-pointer hover:bg-rose-50 transition-colors">
                    <div className="w-6 h-6 rounded-full border-2 border-ammi-maroon flex items-center justify-center bg-white">
                        <div className="w-3 h-3 bg-ammi-maroon rounded-full"></div>
                    </div>
                    <div className="flex-1">
                        <span className="font-bold text-gray-900 block text-base">{t.checkout.cod}</span>
                        <span className="text-sm text-gray-600">{t.checkout.cod_desc}</span>
                    </div>
                </label>
            </div>
        </div>

        {/* Right Column / Bottom Action */}
        <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-100 p-6 lg:p-8 lg:col-span-1">
             <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-base text-gray-800 mb-4 pb-2 border-b border-gray-100">{t.checkout.summary}</h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-gray-600">
                                <span className="line-clamp-1 flex-1 pr-2">{item.quantity}x {getLocalizedProductName(item.product.name, language)} ({item.selectedSize})</span>
                                <span className="font-medium">₹{item.product.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-100 my-4 pt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipping</span>
                            <span className="text-green-600 font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-gray-900 pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>
                
                {/* Trust Badge */}
                <div className="flex items-center gap-2 justify-center text-sm text-green-700 bg-green-50 py-3 rounded-xl border border-green-100">
                    <ShieldCheck size={18} /> {t.checkout.secure}
                </div>

                {hasChanges && (
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <input 
                      type="checkbox" 
                      checked={saveToProfile}
                      onChange={(e) => setSaveToProfile(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-ammi-maroon focus:ring-ammi-maroon"
                    />
                    <span>Save these details to my profile</span>
                  </label>
                )}

                <button 
                    onClick={handlePlaceOrderClick}
                    disabled={!name || !phone || !address}
                    className="w-full bg-ammi-maroon text-white py-4 rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                    {t.checkout.btn_place}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};