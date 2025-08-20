import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { TERMS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';

const PaymentModal = () => {
  const { modals, closeModal, recordPayment } = useAppContext();
  const { payment } = modals;
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('Term 1');

  useEffect(() => {
    if (payment.isOpen) {
      setAmount('');
      setTerm('Term 1');
    }
  }, [payment.isOpen]);

  if (!payment.isOpen || !payment.student) return null;

  const { student } = payment;

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentAmount = parseFloat(amount);
    if (paymentAmount > 0 && paymentAmount <= student.due) {
      recordPayment(student.id, paymentAmount, term);
      closeModal('payment');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal('payment');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Record Payment</h3>
          <button 
            onClick={() => closeModal('payment')}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Student:</span> {student.name}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Roll:</span> {student.rollNumber}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Amount Due:</span> 
            <span className="text-red-600 font-semibold ml-1">
              {formatCurrency(student.due)}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Payment Amount (KSh)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={student.due}
              min="1"
              step="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              placeholder="Enter amount"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum: {formatCurrency(student.due)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Term
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            >
              {TERMS.map(termOption => (
                <option key={termOption} value={termOption}>
                  {termOption}
                </option>
              ))}
            </select>
          </div>

          {amount && parseFloat(amount) > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <span className="font-medium">After payment:</span>
              </p>
              <p className="text-sm text-blue-600">
                Paid: {formatCurrency(student.paid + parseFloat(amount))}
              </p>
              <p className="text-sm text-blue-600">
                Remaining: {formatCurrency(student.due - parseFloat(amount))}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => closeModal('payment')}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > student.due}
              className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;