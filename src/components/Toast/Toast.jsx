import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import './Toast.css';

const Toast = ({ toast, onClose }) => {
  // ✅ Hooks must ALWAYS come first
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Now safe to check for invalid input AFTER hooks

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!toast) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="toast-icon" />;
      case 'error':
        return <XCircle className="toast-icon" />;
      case 'warning':
        return <AlertTriangle className="toast-icon" />;
      case 'info':
        return <Info className="toast-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={`toast toast-${toast.type} ${isVisible ? 'toast-visible' : ''}`}>
      <div className="toast-icon-wrapper">{getIcon()}</div>
      <div className="toast-message">{toast.message}</div>
      <button className="toast-close" onClick={handleClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
