import React from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/views/Dashboard';
import GradesView from './components/views/GradesView';
import StudentsView from './components/views/StudentsView';
import PaymentModal from './components/modals/PaymentModal';
import ReceiptModal from './components/modals/ReceiptModal';
import AddStudentModal from './components/modals/AddStudentModal';
import RemoveStudentModal from './components/modals/RemoveStudentModal';
import { useAppContext } from './context/AppContext';
import { VIEWS } from './utils/constants';

// App Content Component
const AppContent = () => {
  const { currentView } = useAppContext();

  const renderCurrentView = () => {
    switch (currentView) {
      case VIEWS.DASHBOARD:
        return <Dashboard />;
      case VIEWS.GRADES:
        return <GradesView />;
      case VIEWS.STUDENTS:
        return <StudentsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
      
      {/* Modals */}
      <PaymentModal />
      <ReceiptModal />
      <AddStudentModal />
      <RemoveStudentModal />
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;