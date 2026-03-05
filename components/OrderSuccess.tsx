import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

interface OrderSuccessProps {
  onContinueShopping: () => void;
  t: any;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ onContinueShopping, t }) => {
  // Simple confetti effect logic could go here, or handled by CSS animation
  
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 min-h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm animate-bounce">
            <CheckCircle2 size={48} className="text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.success.title}</h1>
        <h2 className="text-lg font-medium text-ammi-maroon mb-4">{t.success.subtitle}</h2>
        
        <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
            {t.success.desc}
        </p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-100 text-sm text-gray-600">
            <p>{t.success.estimated}</p>
            <p className="font-bold text-gray-900 flex items-center justify-center gap-2 mt-1">
                <Sparkles size={16} className="text-ammi-gold"/> {t.success.days}
            </p>
        </div>

        <button 
            onClick={onContinueShopping}
            className="w-full bg-ammi-indigo text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
            {t.success.btn_continue} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};