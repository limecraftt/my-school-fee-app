import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';

const RemoveStudentModal = () => {
  const { modals, closeModal, removeStudent } = useAppContext();
  const { removeStudent: removeStudentModal } = modals;

  if (!removeStudentModal.isOpen || !removeStudentModal.student) return null;

  const { student } = removeStudentModal;

  const handleConfirm = () => {
    removeStudent(student.id);
    closeModal('removeStudent');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal('removeStudent');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Remove Student</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to remove <strong>{student.name}</strong> from the system? 
            This action cannot be undone.
          </p>
        </div>

        {student.paid > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">Payment Warning</p>
                <p className="text-xs text-yellow-700 leading-relaxed">
                  This student has paid {formatCurrency(student.paid)}. 
                  Please ensure any necessary refunds are handled before removing.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => closeModal('removeStudent')}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 active:bg-red-700 transition-colors"
          >
            Remove Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveStudentModal;