import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AddStudentModal = () => {
  const { modals, closeModal, addStudent, selectedGrade } = useAppContext();
  const { addStudent: addStudentModal } = modals;
  const [name, setName] = useState('');
  const [fee, setFee] = useState('');

  useEffect(() => {
    if (addStudentModal.isOpen) {
      setName('');
      setFee('5000'); // Default fee
    }
  }, [addStudentModal.isOpen]);

  if (!addStudentModal.isOpen) return null;

  const gradeId = addStudentModal.gradeId || selectedGrade?.id;
  const gradeName = selectedGrade?.name || `Grade ${gradeId}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && fee && gradeId) {
      addStudent(gradeId, name.trim(), parseFloat(fee));
      closeModal('addStudent');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal('addStudent');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Add New Student</h3>
          <button 
            onClick={() => closeModal('addStudent')}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {gradeName && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Adding to:</span> {gradeName}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              placeholder="Enter student's full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Term Fee (KSh)
            </label>
            <input
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              min="1"
              step="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              placeholder="Enter fee amount"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => closeModal('addStudent')}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || !fee}
              className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;