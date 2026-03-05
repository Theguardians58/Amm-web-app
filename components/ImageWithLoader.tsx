import React, { useState } from 'react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loaderSize?: number;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ className, loaderSize = 24, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
           <img 
             src="https://media.tenor.com/n6XKuq5mXkAAAAAC/victorias-secret-angel.gif" 
             alt="Loading..."
             style={{ width: loaderSize, height: loaderSize }}
             className="opacity-80 object-contain"
           />
        </div>
      )}
      <img 
        {...props} 
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={(e) => {
            setIsLoaded(true);
            props.onLoad?.(e);
        }}
      />
    </div>
  );
};