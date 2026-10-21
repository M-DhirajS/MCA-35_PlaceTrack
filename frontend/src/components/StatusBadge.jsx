import React from 'react';

export default function StatusBadge({ status }) {
  const getStatusClass = (val) => {
    switch (val) {
      case 'Pending':
        return 'pending';
      case 'In Progress':
        return 'in-progress';
      case 'Completed':
        return 'completed';
      default:
        return 'pending';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      <span className="status-dot"></span>
      {status || 'Pending'}
    </span>
  );
}
