import React, { useState, useEffect } from 'react';

// Global toast emitter
let toastEmitter = null;

export const showToast = (message, type = 'info', duration = 3500) => {
  if (toastEmitter) {
    toastEmitter({ message, type, duration, id: Date.now() + Math.random() });
  }
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastEmitter = (newToast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.duration);
    };

    return () => {
      toastEmitter = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let iconClass = 'fa-circle-info';
        if (toast.type === 'success') iconClass = 'fa-circle-check';
        if (toast.type === 'error') iconClass = 'fa-circle-xmark';
        if (toast.type === 'warning') iconClass = 'fa-triangle-exclamation';

        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <i className={`fas ${iconClass}`} style={{ fontSize: '1.25rem' }}></i>
            <div style={{ flexGrow: 1, fontSize: '0.9rem', fontWeight: 500 }}>
              {toast.message}
            </div>
            <button
              style={{ color: 'var(--text-muted)', padding: '2px' }}
              onClick={() => removeToast(toast.id)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
