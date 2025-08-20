import React from 'react';
import Header from '../common/Header';
import GradeCard from '../cards/GradeCard';
import { useAppContext } from '../../context/AppContext';
import { VIEWS, initialGrades } from '../../utils/constants';
import { getStudentStats } from '../../utils/helpers';

const GradesView = () => {
  const { setCurrentView, navigateToGrade, students } = useAppContext();

  const getGradeStats = (gradeId) => {
    const gradeStudents = students.filter(student => student.grade === gradeId);
    const stats = getStudentStats(gradeStudents);
    return { ...stats, total: gradeStudents.length };
  };

  const juniorGrades = initialGrades.slice(0, 6);
  const seniorGrades = initialGrades.slice(6, 9);

  return (
    <>
      <Header 
        title="All Grades" 
        onBack={() => setCurrentView(VIEWS.DASHBOARD)} 
      />
      
      <div className="py-4">
        <div className="px-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Junior Secondary (Grades 1-6)
          </h3>
          <p className="text-sm text-gray-600">
            Primary education levels
          </p>
        </div>
        
        {juniorGrades.map(grade => (
          <GradeCard
            key={grade.id}
            grade={grade}
            stats={getGradeStats(grade.id)}
            onClick={() => navigateToGrade(grade)}
          />
        ))}

        <div className="px-4 mb-4 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Senior Secondary (Grades 7-9)
          </h3>
          <p className="text-sm text-gray-600">
            Secondary education levels
          </p>
        </div>
        
        {seniorGrades.map(grade => (
          <GradeCard
            key={grade.id}
            grade={grade}
            stats={getGradeStats(grade.id)}
            onClick={() => navigateToGrade(grade)}
          />
        ))}
      </div>
    </>
  );
};

export default GradesView;