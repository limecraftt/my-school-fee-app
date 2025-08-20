import React from 'react';
import { Users, ChevronRight } from 'lucide-react';

const GradeCard = ({ grade, stats, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 border border-gray-200 rounded-lg mx-4 mb-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-lg truncate">{grade.name}</h3>
        <p className="text-gray-600 text-sm">{grade.level}</p>
      </div>
      <ChevronRight className="text-gray-400 flex-shrink-0 ml-2" size={20} />
    </div>
    
    <div className="flex items-center gap-2 text-sm mb-4">
      <Users size={16} className="text-gray-400 flex-shrink-0" />
      <span className="font-medium">
        {stats.total} {stats.total === 1 ? 'student' : 'students'}
      </span>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
        {stats.paid} paid
      </span>
      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
        {stats.unpaid} unpaid
      </span>
      {stats.partial > 0 && (
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
          {stats.partial} partial
        </span>
      )}
    </div>

    {stats.total === 0 && (
      <div className="mt-3 text-center py-2">
        <p className="text-gray-500 text-sm">No students enrolled</p>
      </div>
    )}
  </div>
);

export default GradeCard;