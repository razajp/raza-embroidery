import { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const { colors } = useTheme();
  const [toasts, setToasts] = useState([]);

  const addToast = ({ message, type = "info", duration = 3000 }) => {
    const id = Date.now();
    // Add toast initially hidden
    setToasts((prev) => [...prev, { id, message, type, visible: false }]);

    // Show toast after next tick for animation
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: true } : t))
      );
    }, 10);

    // Hide toast after duration
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
    }, duration);

    // Remove toast after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration + 300); // match transition duration
  };

  const getToastColor = (type) => {
    switch (type) {
      case "success":
        return colors.success || "#22c55e";
      case "error":
        return colors.error || "#ef4444";
      case "warning":
        return colors.warning || "#facc15";
      default:
        return colors.text || "#0284c7";
    }
  };

  const getToastIcon = (type, size = 16) => {
    switch (type) {
      case "success":
        return <CheckCircle size={size} className="mr-2" />;
      case "error":
        return <XCircle size={size} className="mr-2" />;
      case "warning":
        return <AlertTriangle size={size} className="mr-2" />;
      default:
        return <Info size={size} className="mr-2" />;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-7 right-7 flex flex-col items-end gap-2 z-[9999] pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center px-4 py-2 rounded-xl shadow-md text-white text-sm pointer-events-none ${
              toast.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
            style={{ backgroundColor: getToastColor(toast.type) }}
          >
            {getToastIcon(toast.type)}
            <span className="ms-1">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
