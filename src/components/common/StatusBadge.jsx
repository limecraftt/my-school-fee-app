import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    paid: 'bg-green-100 text-green-800 border-green-200',
    unpaid: 'bg-red-100 text-red-800 border-red-200',
    'partially-paid': 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };
  
  const labels = {
    paid: 'Paid',
    unpaid: 'Unpaid',
    'partially-paid': 'Partial'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]} whitespace-nowrap`}>
      {labels[status]}
    </span>
  );
};

export default StatusBadge;