import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="relative p-4">
    <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
        aria-label="Clear search"
      >
        <X size={16} />
      </button>
    )}
  </div>
);

export default SearchBar;