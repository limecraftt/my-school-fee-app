import React from 'react';
import { X, Printer } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';

const ReceiptModal = () => {
  const { modals, closeModal } = useAppContext();
  const { receipt } = modals;

  if (!receipt.isOpen || !receipt.student) return null;

  const { student } = receipt;

  const handlePrint = () => {
    window.print();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal('receipt');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Payment Receipts</h3>
          <button 
            onClick={() => closeModal('receipt')}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          {student.payments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No payment history found</p>
              <p className="text-sm text-gray-400">This student hasn't made any payments yet.</p>
            </div>
          ) : (
            student.payments.map((payment, index) => (
              <div key={payment.id} className="print-area">
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <div className="text-center mb-6 border-b border-gray-200 pb-4">
                    <h4 className="text-xl font-bold text-gray-900">GATHUKIMUNDU SCHOOL</h4>
                    <p className="text-sm text-gray-600 mt-1">Payment Receipt</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Receipt No:</span>
                      <span className="font-semibold text-gray-900">{payment.receiptNumber}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Student Name:</span>
                      <span className="font-semibold text-gray-900">{student.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Amount Paid:</span>
                      <span className="font-bold text-green-600 text-lg">
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Date:</span>
                      <span className="font-semibold text-gray-900">{payment.date}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Term:</span>
                      <span className="font-semibold text-gray-900">{payment.term}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePrint}
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Printer size={16} />
                    Print Receipt
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;