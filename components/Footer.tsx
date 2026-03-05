import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 text-center text-gray-400 text-xs">
      <p className="mb-3 font-medium">© 2024 Ammi's Kachhi. All rights reserved.</p>
      <div className="flex justify-center gap-6">
        <span className="hover:text-ammi-maroon cursor-pointer transition-colors">Privacy Policy</span>
        <span className="text-gray-200">•</span>
        <span className="hover:text-ammi-maroon cursor-pointer transition-colors">Safety Tips</span>
        <span className="text-gray-200">•</span>
        <span className="hover:text-ammi-maroon cursor-pointer transition-colors">Contact</span>
      </div>
    </footer>
  );
};