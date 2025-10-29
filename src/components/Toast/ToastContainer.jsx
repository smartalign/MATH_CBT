import React from 'react';
import { useToast } from '../../contexts/ToastContext';
import Toast from './Toast';
import './Toast.css';

/**
 * TOAST CONTAINER COMPONENT
 * Renders all active toasts in a fixed position on screen
 * Positioned at top-right corner with proper stacking
 */
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
