import React from 'react';
import { Trash2 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/helpers';

const StudentCard = ({ student, onPayment, onViewReceipt, onRemove }) => (
  <div className="bg-white p-4 border border-gray-200 rounded-lg mx-4 mb-3 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-lg truncate">{student.name}</h3>
        <p className="text-gray-600 text-sm">Roll: {student.rollNumber}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <StatusBadge status={student.status} />
        <button
          onClick={() => onRemove(student)}
          className="text-red-500 hover:text-red-700 active:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
          title="Remove student"
          aria-label={`Remove ${student.name}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
    
    <div className="space-y-2 text-sm mb-4 bg-gray-50 p-3 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium">Fee:</span>
        <span className="font-semibold">{formatCurrency(student.fee)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium">Paid:</span>
        <span className="text-green-600 font-semibold">{formatCurrency(student.paid)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium">Due:</span>
        <span className="text-red-600 font-semibold">{formatCurrency(student.due)}</span>
      </div>
      {student.lastPayment && (
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-gray-600 font-medium">Last payment:</span>
          <span className="text-sm text-gray-700">{student.lastPayment}</span>
        </div>
      )}
    </div>

    <div className="flex gap-3">
      {student.due > 0 && (
        <button
          onClick={() => onPayment(student)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Record Payment
        </button>
      )}
      {student.payments.length > 0 && (
        <button
          onClick={() => onViewReceipt(student)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          View Receipts
        </button>
      )}
    </div>

    {student.due === 0 && student.payments.length === 0 && (
      <div className="text-center py-3 text-gray-500 text-sm">
        No payment history available
      </div>
    )}
  </div>
);

export default StudentCard;