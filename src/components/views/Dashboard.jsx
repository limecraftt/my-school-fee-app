import React from 'react';
import { Users, FileText, X } from 'lucide-react';
import Header from '../common/Header';
import { useAppContext } from '../../context/AppContext';
import { VIEWS, initialGrades } from '../../utils/constants';
import { getTotalStats, formatCurrency } from '../../utils/helpers';

const Dashboard = () => {
  const { students, setCurrentView } = useAppContext();
  const stats = getTotalStats(students);

  return (
    <>
      <Header title="School Fee Management System" />
      
      <div className="p-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Users className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">GATHUKIMUNDU SCHOOL</h2>
          <p className="text-gray-600 px-4 leading-relaxed">
            Efficiently manage and track student fee payments across all grades
          </p>
        </div>

        <button 
          onClick={() => setCurrentView(VIEWS.GRADES)}
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-4 px-4 rounded-lg font-medium mb-6 flex items-center justify-center transition-colors shadow-md"
        >
          <Users className="mr-3" size={20} />
          Manage Students
        </button>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Users className="text-gray-400 mr-3" size={24} />
                <span className="text-gray-600 font-medium">Total Students</span>
              </div>
            </div>
            <div className="ml-9">
              <span className="text-3xl font-bold text-gray-900">{stats.totalStudents}</span>
              <p className="text-sm text-gray-500 mt-1">Across {initialGrades.length} grades</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 font-medium">Fee Collection</span>
              <FileText className="text-green-500" size={24} />
            </div>
            <div>
              <span className="text-3xl font-bold text-green-600">
                {formatCurrency(stats.totalCollected)}
              </span>
              <p className="text-sm text-gray-500 mt-1">Total collected</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 font-medium">Outstanding</span>
              <X className="text-red-500" size={24} />
            </div>
            <div>
              <span className="text-3xl font-bold text-red-600">
                {formatCurrency(stats.totalOutstanding)}
              </span>
              <p className="text-sm text-gray-500 mt-1">Amount due</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;