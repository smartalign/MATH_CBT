import React, { createContext, useContext, useState, useCallback } from 'react';

// Create Context (no TypeScript typing here)
const ToastContext = createContext(undefined);

/**
 * ✅ TOAST PROVIDER (JavaScript Version)
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Show a new toast
  const showToast = useCallback((message, type, duration = 3000) => {
    const id = Date.now().toString();

    const newToast = {
      id,
      message,
      type,
      duration,
    };

    // Add toast
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  // Remove toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * ✅ Custom Hook for Using Toast
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
