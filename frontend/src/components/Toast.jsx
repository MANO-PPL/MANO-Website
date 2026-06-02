import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'error') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {/* Toast container */}
      <div className="fixed top-0 left-0 right-0 z-[200] pointer-events-none flex flex-col items-center">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const iconMap = {
  success: <CheckCircle2 className="shrink-0" />,
  error: <AlertCircle className="shrink-0" />,
  info: <Info className="shrink-0" />,
};

const colorMap = {
  success: {
    border: 'border-emerald-500/30',
    bg: 'from-emerald-500/20 to-emerald-500/5',
    icon: 'text-emerald-400',
    bar: 'bg-emerald-400',
  },
  error: {
    border: 'border-red-500/30',
    bg: 'from-red-500/20 to-red-500/5',
    icon: 'text-red-400',
    bar: 'bg-red-400',
  },
  info: {
    border: 'border-blue-500/30',
    bg: 'from-blue-500/20 to-blue-500/5',
    icon: 'text-blue-400',
    bar: 'bg-blue-400',
  },
};

const ToastItem = ({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);
  const colors = colorMap[toast.type] || colorMap.error;

  useEffect(() => {
    const start = Date.now();
    const duration = 4000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining > 0) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="pointer-events-auto w-[92vw] sm:w-[420px] lg:w-[480px] mt-4 sm:mt-6"
    >
      <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl border ${colors.border} bg-gradient-to-r ${colors.bg} backdrop-blur-2xl shadow-2xl`}>
        {/* Content */}
        <div className="flex items-start gap-3 p-3 sm:p-4 lg:p-5">
          <div className={`${colors.icon} mt-0.5 w-5 h-5 sm:w-6 sm:h-6`}>
            {iconMap[toast.type]}
          </div>
          <p className="flex-1 text-white text-sm sm:text-base lg:text-base font-medium leading-snug">
            {toast.message}
          </p>
          <button
            onClick={onClose}
            className="shrink-0 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 sm:h-1 w-full bg-white/5">
          <div
            className={`h-full ${colors.bar} transition-none`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
