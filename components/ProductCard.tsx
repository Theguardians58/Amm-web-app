import React from 'react';
import { Product, Language } from '../types';
import { Star, ArrowRight } from 'lucide-react';
import { ImageWithLoader } from './ImageWithLoader';
import { getLocalizedProductName } from '../utils';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  language: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, language }) => {
  const description = language === 'en' ? product.description : product.hindiDescription;
  const productName = getLocalizedProductName(product.name, language);

  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-[1.5rem] shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all cursor-pointer group border border-transparent hover:border-gray-100"
    >
      <div className="relative h-56 overflow-hidden rounded-t-[1.5rem]">
        <ImageWithLoader 
          src={product.image} 
          alt={productName} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loaderSize={30}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ammi-maroon flex items-center gap-1 shadow-sm z-10">
          <Star size={12} fill="currentColor" />
          {product.comfortLevel}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3">
            <h3 className="font-bold text-gray-800 text-lg mb-1 leading-tight group-hover:text-ammi-maroon transition-colors">{productName}</h3>
            <p className="text-gray-500 text-xs line-clamp-2">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-ammi-indigo font-bold text-xl">₹{product.price}</span>
          <button className="bg-gray-50 text-ammi-indigo group-hover:bg-ammi-maroon group-hover:text-white px-3 py-2 rounded-xl transition-colors">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};