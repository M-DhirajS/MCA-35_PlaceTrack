import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast({ notification, onClose }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const { type, message } = notification;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} color="#10b981" />;
      case 'error':
        return <AlertCircle size={20} color="#ef4444" />;
      default:
        return <Info size={20} color="#3b82f6" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast ${type || 'info'}`} role="alert">
        {getIcon()}
        <span className="toast-message">{message}</span>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
