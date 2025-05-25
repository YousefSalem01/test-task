import { toast, Toaster } from "react-hot-toast";

// Simple wrapper for toast types
export const showToast = {
  success: (message, options = {}) => toast.success(message, options),
  error: (message, options = {}) => toast.error(message, options),
  loading: (message, options = {}) => toast.loading(message, options),
  custom: (message, options = {}) => toast(message, options),
  dismiss: toastId => toast.dismiss(toastId),
  dismiss_all: () => toast.dismiss()
};

// Export the Toaster component directly
export { Toaster };

// useToast hook for convenience
export const useToast = () => {
  return {
    toast,
    showToast,
    dismiss: toast.dismiss
  };
};
