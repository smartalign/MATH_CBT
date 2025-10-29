import React from 'react';
import Toast from './Toast';
import { useToast } from '../../context/ToastContext';

const ToastList = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

export default ToastList;
