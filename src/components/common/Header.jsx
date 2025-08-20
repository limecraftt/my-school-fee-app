import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Header = ({ title, onBack, rightAction }) => (
  <div className="bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
    <div className="flex items-center">
      {onBack && (
        <button 
          onClick={onBack} 
          className="mr-3 p-2 -ml-2 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className="text-lg font-semibold truncate">{title}</h1>
    </div>
    {rightAction && (
      <div className="flex-shrink-0 ml-4">
        {rightAction}
      </div>
    )}
  </div>
);

export default Header;