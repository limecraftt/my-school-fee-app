import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const FilterDropdown = ({ title, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative px-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg text-left hover:bg-gray-100 active:bg-gray-200 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{selected || title}</span>
        <ChevronDown 
          size={20} 
          className={`transform transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`w-full text-left p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center justify-between ${
                selected === option ? 'bg-green-50 text-green-700' : ''
              } ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
              role="option"
              aria-selected={selected === option}
            >
              <span>{option}</span>
              {selected === option && <Check size={16} className="text-green-600 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;