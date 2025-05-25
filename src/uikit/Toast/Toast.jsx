import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import { createPortal } from "react-dom";

// Create Toast Context
const ToastContext = createContext(null);

// Toast Provider
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Generate unique ID for each toast
  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add a new toast
  const showToast = useCallback(({ type = "info", title, message, duration = 5000 }) => {
    const id = generateId();

    // Add toast to state
    setToasts(prev => [...prev, { id, type, title, message, duration }]);

    // Automatically remove toast after duration
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback(id => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { showToast, removeToast } = context;

  return {
    showToast,
    toast: showToast, // alias for convenience
    removeToast
  };
}

// Individual Toast component
export function Toast({ id, type = "info", title, message, onClose, className = "" }) {
  const [isVisible, setIsVisible] = useState(true);

  // Icons by type
  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    warning: <AlertTriangle className="text-amber-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />
  };

  // Background colors by type
  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
    info: "bg-blue-50 border-blue-200"
  };

  // Handle close
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    return () => clearTimeout();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`
        w-full max-w-sm rounded-lg shadow-lg border p-4 mb-3
        ${bgColors[type] || bgColors.info}
        ${className}
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[type] || icons.info}</div>

        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium text-gray-900">{title}</h3>}
          {message && <p className="mt-1 text-sm text-gray-600">{message}</p>}
        </div>

        <button onClick={handleClose} className="ml-4 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500">
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// Toast Container to render all toasts
export function ToastContainer({ position = "top-right" }) {
  const { toasts, removeToast } = useContext(ToastContext) || { toasts: [] };

  // Position styles
  const positionStyles = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-center": "top-0 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-0 left-1/2 transform -translate-x-1/2"
  };

  const containerContent = (
    <div
      className={`fixed z-50 p-4 max-w-sm w-full pointer-events-none ${positionStyles[position] || positionStyles["top-right"]}`}
    >
      <AnimatePresence>
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );

  // Use portal to render toasts at the end of document body
  return typeof document !== "undefined" ? createPortal(containerContent, document.body) : null;
}
