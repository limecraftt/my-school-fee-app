import React from 'react';
import { Users, Plus } from 'lucide-react';
import Header from '../common/Header';
import SearchBar from '../common/SearchBar';
import FilterDropdown from '../common/FilterDropdown';
import StudentCard from '../cards/StudentCard';
import { useAppContext } from '../../context/AppContext';
import { VIEWS } from '../../utils/constants';
import { filterStudents, getStudentStats } from '../../utils/helpers';

const StudentsView = () => {
  const { 
    selectedGrade, 
    setCurrentView, 
    students, 
    searchTerm, 
    setSearchTerm, 
    studentFilter, 
    setStudentFilter, 
    getGradeStudents,
    openModal 
  } = useAppContext();

  if (!selectedGrade) {
    return null;
  }

  const gradeStudents = getGradeStudents(selectedGrade.id);
  const filteredStudents = filterStudents(gradeStudents, searchTerm, studentFilter);
  const stats = getStudentStats(gradeStudents);

  return (
    <>
      <Header 
        title={`${selectedGrade.name} Students`}
        onBack={() => setCurrentView(VIEWS.GRADES)}
        rightAction={
          <button
            onClick={() => openModal('addStudent', { gradeId: selectedGrade.id })}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-3 rounded-lg transition-colors shadow-md"
            aria-label="Add new student"
          >
            <Plus size={20} />
          </button>
        }
      />
      
      <div className="mb-4">
        <div className="px-4 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-400" />
              <span className="font-medium">{gradeStudents.length} students</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {stats.paid} paid
              </span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                {stats.unpaid} unpaid
              </span>
              {stats.partial > 0 && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  {stats.partial} partial
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by name or roll number..."
      />

      <FilterDropdown
        title="All Students"
        options={['All Students', 'Paid', 'Unpaid', 'Partially Paid']}
        selected={studentFilter}
        onSelect={setStudentFilter}
      />

      {filteredStudents.length === 0 ? (
        <div className="text-center py-12 px-4">
          {gradeStudents.length === 0 ? (
            <div>
              <Users size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No students in this grade yet.</p>
              <button
                onClick={() => openModal('addStudent', { gradeId: selectedGrade.id })}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Add First Student
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-2">No students found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStudentFilter('All Students');
                }}
                className="text-blue-500 text-sm hover:text-blue-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="pb-6">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onPayment={(student) => openModal('payment', { student })}
              onViewReceipt={(student) => openModal('receipt', { student })}
              onRemove={(student) => openModal('removeStudent', { student })}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default StudentsView;