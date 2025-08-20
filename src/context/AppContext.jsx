import React, { useState, createContext, useContext } from 'react';
import { VIEWS, sampleStudents } from '../utils/constants';
import { generateRollNumber, generateReceiptNumber, getCurrentDate } from '../utils/helpers';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [students, setStudents] = useState(sampleStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentFilter, setStudentFilter] = useState('All Students');
  const [termFilter, setTermFilter] = useState('All Terms');

  // Modal states
  const [modals, setModals] = useState({
    payment: { isOpen: false, student: null },
    receipt: { isOpen: false, student: null },
    addStudent: { isOpen: false, gradeId: null },
    removeStudent: { isOpen: false, student: null }
  });

  // Get students for a specific grade
  const getGradeStudents = (gradeId) => {
    return students.filter(student => student.grade === gradeId);
  };

  // Record a payment for a student
  const recordPayment = (studentId, amount, term) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          const newPaid = student.paid + amount;
          const newDue = student.fee - newPaid;
          const newStatus = newDue === 0 ? 'paid' : 'partially-paid';
          
          const payment = {
            id: 'PAY' + Date.now(),
            amount,
            date: getCurrentDate(),
            term,
            receiptNumber: generateReceiptNumber()
          };

          return {
            ...student,
            paid: newPaid,
            due: newDue,
            status: newStatus,
            lastPayment: payment.date,
            payments: [...student.payments, payment]
          };
        }
        return student;
      })
    );
  };

  // Remove a student from the system
  const removeStudent = (studentId) => {
    setStudents(prev => prev.filter(student => student.id !== studentId));
  };

  // Add a new student
  const addStudent = (gradeId, name, fee) => {
    const rollNumber = generateRollNumber(gradeId, students);
    
    const newStudent = {
      id: rollNumber,
      name,
      grade: gradeId,
      rollNumber,
      fee,
      paid: 0,
      due: fee,
      status: 'unpaid',
      lastPayment: null,
      payments: []
    };

    setStudents(prev => [...prev, newStudent]);
  };

  // Modal management functions
  const openModal = (modalType, data = {}) => {
    setModals(prev => ({
      ...prev,
      [modalType]: { isOpen: true, ...data }
    }));
  };

  const closeModal = (modalType) => {
    setModals(prev => ({
      ...prev,
      [modalType]: { isOpen: false, student: null, gradeId: null }
    }));
  };

  // Navigation helper
  const navigateToGrade = (grade) => {
    setSelectedGrade(grade);
    setCurrentView(VIEWS.STUDENTS);
    setSearchTerm('');
    setStudentFilter('All Students');
    setTermFilter('All Terms');
  };

  const value = {
    // State
    currentView,
    selectedGrade,
    students,
    searchTerm,
    studentFilter,
    termFilter,
    modals,

    // Actions
    setCurrentView,
    setSelectedGrade,
    setSearchTerm,
    setStudentFilter,
    setTermFilter,
    recordPayment,
    removeStudent,
    addStudent,
    openModal,
    closeModal,
    navigateToGrade,

    // Computed
    getGradeStudents
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};